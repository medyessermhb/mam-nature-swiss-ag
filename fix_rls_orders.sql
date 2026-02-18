-- DROP existing policies to prevent conflicts
DROP POLICY IF EXISTS "Enable insert for everyone" ON orders;
DROP POLICY IF EXISTS "Enable select for users based on user_id" ON orders;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON orders;
DROP POLICY IF EXISTS "Enable read access for all users" ON orders;
DROP POLICY IF EXISTS "Enable insert access for all users" ON orders;
DROP POLICY IF EXISTS "Enable update access for all users" ON orders;
DROP POLICY IF EXISTS "Policy for orders" ON orders; -- Generic catch-all

-- Enable RLS (ensure it's on)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 1. INSERT: Allow everyone (including unauthenticated guests) to create orders
CREATE POLICY "Enable insert for everyone" 
ON orders FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Enable select for own orders" 
ON orders FOR SELECT 
TO public 
USING (
    auth.uid() = user_id 
    OR 
    lower(customer_email) = lower(auth.jwt() ->> 'email')
);

-- 3. UPDATE: Allow authenticated users to update their own orders
CREATE POLICY "Enable update for own orders" 
ON orders FOR UPDATE 
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
