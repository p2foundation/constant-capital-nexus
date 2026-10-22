DROP POLICY IF EXISTS "Anyone can read free research report files" ON storage.objects;
CREATE POLICY "Signed-in users can read free research report files" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'research_reports' AND auth.uid() IS NOT NULL AND EXISTS (
  SELECT 1 FROM public.report_files f JOIN public.research_reports r ON r.id = f.report_id
  WHERE f.file_path = objects.name AND COALESCE(r.is_premium, false) = false));

DROP POLICY IF EXISTS "Public read access for profile avatars" ON storage.objects;
CREATE POLICY "Users can list their own avatars" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'profile_avatars' AND owner_id = (select auth.uid()::text));

DROP POLICY IF EXISTS "Public read access for report images" ON storage.objects;
CREATE POLICY "Staff can list report images" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'report_images' AND public.can_edit_content());