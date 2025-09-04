-- Update the handle_new_user function to properly extract user metadata
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
    NEW.raw_user_meta_data ->> 'firstName',
    NEW.raw_user_meta_data ->> 'lastName', 
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

-- Backfill existing users' profile data from auth.users raw_user_meta_data
UPDATE public.profiles 
SET 
  first_name = COALESCE(profiles.first_name, au.raw_user_meta_data ->> 'firstName'),
  last_name = COALESCE(profiles.last_name, au.raw_user_meta_data ->> 'lastName'),
  company = COALESCE(profiles.company, au.raw_user_meta_data ->> 'company'),
  position = COALESCE(profiles.position, au.raw_user_meta_data ->> 'position'), 
  industry = COALESCE(profiles.industry, au.raw_user_meta_data ->> 'industry'),
  phone = COALESCE(profiles.phone, au.raw_user_meta_data ->> 'phone'),
  bio = COALESCE(profiles.bio, au.raw_user_meta_data ->> 'bio')
FROM auth.users au
WHERE profiles.id = au.id
  AND au.raw_user_meta_data IS NOT NULL;