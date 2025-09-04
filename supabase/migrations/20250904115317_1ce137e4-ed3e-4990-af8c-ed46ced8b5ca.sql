-- Fix critical security vulnerability in settings table
-- Remove public access and restrict to admin users only

-- Drop the insecure public SELECT policy
DROP POLICY IF EXISTS "Anyone can view settings" ON public.settings;

-- Create secure admin-only SELECT policy  
CREATE POLICY "Admin only can view settings"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (
    get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text])
  );

-- Ensure the existing admin management policy is properly defined
DROP POLICY IF EXISTS "Admin/Dev can manage settings" ON public.settings;
CREATE POLICY "Admin only can manage settings"
  ON public.settings
  FOR ALL
  TO authenticated
  USING (
    get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text])
  )
  WITH CHECK (
    get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text])
  );