ALTER TABLE public.research_reports
  ADD COLUMN IF NOT EXISTS submitted_by_name text,
  ADD COLUMN IF NOT EXISTS reviewed_by_name text;

CREATE OR REPLACE FUNCTION public.enforce_report_review()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); uname text;
BEGIN
  IF uid IS NULL THEN RETURN NEW; END IF;
  IF NEW.status NOT IN ('draft','pending_review','published','rejected') THEN
    RAISE EXCEPTION 'Invalid report status %', NEW.status;
  END IF;
  SELECT nullif(trim(coalesce(first_name,'') || ' ' || coalesce(last_name,'')), '') INTO uname FROM public.profiles WHERE id = uid;
  IF TG_OP = 'INSERT' THEN
    NEW.submitted_by := uid; NEW.submitted_by_name := uname;
    IF NEW.status NOT IN ('draft','pending_review') THEN NEW.status := 'pending_review'; END IF;
    NEW.reviewed_by := NULL; NEW.reviewed_by_name := NULL; NEW.reviewed_at := NULL; NEW.review_note := NULL;
    RETURN NEW;
  END IF;
  NEW.submitted_by := OLD.submitted_by; NEW.submitted_by_name := OLD.submitted_by_name;
  IF NEW.status IN ('published','rejected') AND NEW.status IS DISTINCT FROM OLD.status THEN
    IF NOT public.can_approve_content() THEN
      RAISE EXCEPTION 'Only a manager can publish or reject reports';
    END IF;
    IF OLD.submitted_by = uid THEN
      RAISE EXCEPTION 'A different reviewer must approve your own report';
    END IF;
    NEW.reviewed_by := uid; NEW.reviewed_by_name := uname; NEW.reviewed_at := now();
  ELSE
    NEW.reviewed_by := OLD.reviewed_by; NEW.reviewed_by_name := OLD.reviewed_by_name; NEW.reviewed_at := OLD.reviewed_at;
    IF NEW.status = OLD.status AND OLD.status IN ('published','rejected') AND NOT public.can_approve_content() THEN
      NEW.status := 'pending_review';
    END IF;
    IF NOT public.can_approve_content() THEN NEW.review_note := OLD.review_note; END IF;
  END IF;
  RETURN NEW;
END $$;
REVOKE EXECUTE ON FUNCTION public.enforce_report_review() FROM PUBLIC, anon, authenticated;