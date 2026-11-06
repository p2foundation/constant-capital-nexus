ALTER TABLE public.research_reports
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS submitted_by uuid,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS review_note text;

CREATE OR REPLACE FUNCTION public.enforce_report_review()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN NEW; END IF; -- server jobs
  IF NEW.status NOT IN ('draft','pending_review','published','rejected') THEN
    RAISE EXCEPTION 'Invalid report status %', NEW.status;
  END IF;
  IF TG_OP = 'INSERT' THEN
    NEW.submitted_by := uid;
    IF NEW.status NOT IN ('draft','pending_review') THEN NEW.status := 'pending_review'; END IF;
    NEW.reviewed_by := NULL; NEW.reviewed_at := NULL; NEW.review_note := NULL;
    RETURN NEW;
  END IF;
  NEW.submitted_by := OLD.submitted_by;
  IF NEW.status IN ('published','rejected') AND NEW.status IS DISTINCT FROM OLD.status THEN
    IF NOT public.can_approve_content() THEN
      RAISE EXCEPTION 'Only a manager can publish or reject reports';
    END IF;
    IF OLD.submitted_by = uid THEN
      RAISE EXCEPTION 'A different reviewer must approve your own report';
    END IF;
    NEW.reviewed_by := uid; NEW.reviewed_at := now();
  ELSIF NEW.status = OLD.status AND OLD.status IN ('published','rejected') AND NOT public.can_approve_content() THEN
    -- writer edited a reviewed report: send it back for review
    NEW.status := 'pending_review';
    NEW.reviewed_by := OLD.reviewed_by; NEW.reviewed_at := OLD.reviewed_at;
  ELSE
    NEW.reviewed_by := OLD.reviewed_by; NEW.reviewed_at := OLD.reviewed_at;
    IF NOT public.can_approve_content() THEN NEW.review_note := OLD.review_note; END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS research_reports_review ON public.research_reports;
CREATE TRIGGER research_reports_review BEFORE INSERT OR UPDATE ON public.research_reports
FOR EACH ROW EXECUTE FUNCTION public.enforce_report_review();

DROP POLICY IF EXISTS "Only published reports are public" ON public.research_reports;
CREATE POLICY "Only published reports are public" ON public.research_reports
AS RESTRICTIVE FOR SELECT TO anon, authenticated
USING (status = 'published' OR public.can_edit_content());

CREATE INDEX IF NOT EXISTS research_reports_status_idx ON public.research_reports(status);