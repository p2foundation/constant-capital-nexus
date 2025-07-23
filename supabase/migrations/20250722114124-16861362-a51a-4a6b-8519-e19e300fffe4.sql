-- Add 'manual_confirmation' to the user_activities activity_type check constraint
ALTER TABLE public.user_activities DROP CONSTRAINT user_activities_activity_type_check;

ALTER TABLE public.user_activities ADD CONSTRAINT user_activities_activity_type_check 
CHECK (activity_type = ANY (ARRAY['login'::text, 'logout'::text, 'profile_update'::text, 'account_access'::text, 'manual_confirmation'::text]));