CREATE POLICY "Applicants upload own account documents" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'account-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Applicants update own account documents" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'account-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Applicants and admins read account documents" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'account-documents' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.get_user_role() IN ('Admin','Developer')));

DROP POLICY "Users can update their own draft applications" ON public.account_opening_applications;
CREATE POLICY "Users can update their own draft applications" ON public.account_opening_applications FOR UPDATE TO authenticated
USING (auth.uid() = user_id AND status = 'draft')
WITH CHECK (auth.uid() = user_id AND status IN ('draft','submitted'));