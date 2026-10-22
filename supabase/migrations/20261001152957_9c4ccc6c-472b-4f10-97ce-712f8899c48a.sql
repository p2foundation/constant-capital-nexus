CREATE POLICY "Anyone can read free research report files" ON storage.objects FOR SELECT
USING (bucket_id = 'research_reports' AND EXISTS (
  SELECT 1 FROM public.report_files f JOIN public.research_reports r ON r.id = f.report_id
  WHERE f.file_path = storage.objects.name AND coalesce(r.is_premium,false) = false));
DROP POLICY IF EXISTS "Admins can delete research reports" ON storage.objects;
CREATE POLICY "Admins can delete research reports" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'research_reports' AND public.get_user_role() IN ('Admin','Developer','Analyst'));