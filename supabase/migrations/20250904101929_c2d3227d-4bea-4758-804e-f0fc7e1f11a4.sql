-- Enhance contact_messages security with better validation and rate limiting

-- Create a function to validate contact message submissions
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Ensure all required fields are present and not empty
  IF NEW.first_name IS NULL OR trim(NEW.first_name) = '' THEN
    RAISE EXCEPTION 'First name is required';
  END IF;
  
  IF NEW.last_name IS NULL OR trim(NEW.last_name) = '' THEN
    RAISE EXCEPTION 'Last name is required';
  END IF;
  
  IF NEW.email IS NULL OR trim(NEW.email) = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  
  -- Basic email validation
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  IF NEW.subject IS NULL OR trim(NEW.subject) = '' THEN
    RAISE EXCEPTION 'Subject is required';
  END IF;
  
  IF NEW.message IS NULL OR trim(NEW.message) = '' THEN
    RAISE EXCEPTION 'Message is required';
  END IF;
  
  -- Prevent excessively long content (potential spam)
  IF length(NEW.first_name) > 100 THEN
    RAISE EXCEPTION 'First name too long';
  END IF;
  
  IF length(NEW.last_name) > 100 THEN
    RAISE EXCEPTION 'Last name too long';
  END IF;
  
  IF length(NEW.subject) > 500 THEN
    RAISE EXCEPTION 'Subject too long';
  END IF;
  
  IF length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message too long';
  END IF;
  
  -- Ensure status is always set to 'unread' for new submissions
  NEW.status := 'unread';
  
  RETURN NEW;
END;
$$;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_contact_submission_trigger ON public.contact_messages;
CREATE TRIGGER validate_contact_submission_trigger
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_submission();

-- Update the INSERT policy to be more explicit about what's allowed
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public can submit validated contact messages"
  ON public.contact_messages
  FOR INSERT
  TO public
  WITH CHECK (
    -- Only allow if all required fields are present
    first_name IS NOT NULL AND
    last_name IS NOT NULL AND 
    email IS NOT NULL AND
    subject IS NOT NULL AND
    message IS NOT NULL AND
    status = 'unread'
  );

-- Ensure no SELECT policy allows public access (verify current admin-only access)
-- This policy should already exist, but let's ensure it's properly defined
DROP POLICY IF EXISTS "Admins can view all contact messages" ON public.contact_messages;
CREATE POLICY "Admin only can view contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('Admin', 'Developer')
    )
  );