-- Admins/Developers can delete career applications (e.g. data-removal requests)
CREATE POLICY "Admins can delete career applications"
  ON public.career_applications
  FOR DELETE
  TO authenticated
  USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));