CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid DEFAULT auth.uid())
 RETURNS text LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE user_role TEXT; caller_role TEXT;
BEGIN
  IF user_id IS NULL THEN RETURN NULL; END IF;
  IF auth.role() <> 'service_role' AND user_id IS DISTINCT FROM auth.uid() THEN
    SELECT role::TEXT INTO caller_role FROM public.profiles WHERE id = auth.uid();
    IF coalesce(caller_role,'') NOT IN ('Admin','Developer') THEN RETURN NULL; END IF;
  END IF;
  SELECT role::TEXT INTO user_role FROM public.profiles WHERE id = user_id;
  RETURN user_role;
END; $function$;