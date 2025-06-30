
-- Create a function to delete users completely (profiles and auth)
-- This will be called by the edge function with admin privileges
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow admins to call this function
  IF public.get_user_role() NOT IN ('Admin', 'Developer') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Delete from profiles table first (due to foreign key)
  DELETE FROM public.profiles WHERE id = target_user_id;
  
  -- Note: We cannot delete from auth.users via SQL due to security restrictions
  -- This will be handled by the edge function using the Admin API
  
  RETURN TRUE;
END;
$$;

-- Add a status column to profiles table for user activation/deactivation
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Create index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON public.profiles(is_active);
