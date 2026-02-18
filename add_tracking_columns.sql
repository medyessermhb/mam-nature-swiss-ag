-- Add tracking columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS tracking_number text,
ADD COLUMN IF NOT EXISTS tracking_link text;

-- Make sure RLS doesn't block updates (though we use service role for updates, safe to have)
-- (No extra policy needed as we already have policies or use service role)
