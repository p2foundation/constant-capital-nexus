
-- 1. Restrict reward_transactions INSERT
DROP POLICY IF EXISTS "System can insert transactions" ON public.reward_transactions;
CREATE POLICY "Service role can insert transactions"
ON public.reward_transactions
FOR INSERT
TO service_role
WITH CHECK (true);

-- 2. Restrict reward_achievements INSERT
DROP POLICY IF EXISTS "System can insert achievements" ON public.reward_achievements;
CREATE POLICY "Service role can insert achievements"
ON public.reward_achievements
FOR INSERT
TO service_role
WITH CHECK (true);

-- 3. Restrict user_rewards INSERT
DROP POLICY IF EXISTS "System can insert user rewards" ON public.user_rewards;
CREATE POLICY "Service role can insert user rewards"
ON public.user_rewards
FOR INSERT
TO service_role
WITH CHECK (true);

-- 4. Profile Avatars: enforce path ownership on upload
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
CREATE POLICY "Users can upload to their own avatar folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'Profile Avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'Profile Avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'Profile Avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 5. Admin DELETE policies for managed buckets
CREATE POLICY "Admins can delete research reports"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'Research Reports'
  AND public.get_user_role() = ANY (ARRAY['Admin','Developer','Analyst'])
);

CREATE POLICY "Admins can delete report images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'Report Images'
  AND public.get_user_role() = ANY (ARRAY['Admin','Developer','Analyst'])
);

CREATE POLICY "Admins can delete content images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'Content Images'
  AND public.get_user_role() = ANY (ARRAY['Admin','Developer','Analyst'])
);
