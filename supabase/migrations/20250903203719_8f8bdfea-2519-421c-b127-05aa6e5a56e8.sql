-- Fix the handle_new_user function to use correct field names
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    company, 
    position, 
    industry, 
    phone, 
    bio,
    role
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name', 
    NEW.raw_user_meta_data ->> 'company',
    NEW.raw_user_meta_data ->> 'position',
    NEW.raw_user_meta_data ->> 'industry',
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'bio',
    'User'
  );
  RETURN NEW;
END;
$$;

-- Backfill missing first_name and last_name for existing users
UPDATE public.profiles 
SET 
  first_name = COALESCE(profiles.first_name, au.raw_user_meta_data ->> 'first_name'),
  last_name = COALESCE(profiles.last_name, au.raw_user_meta_data ->> 'last_name')
FROM auth.users au
WHERE profiles.id = au.id
  AND au.raw_user_meta_data IS NOT NULL
  AND (profiles.first_name IS NULL OR profiles.last_name IS NULL);