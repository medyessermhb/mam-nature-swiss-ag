-- EMERGENCY DEBUG RLS FIX
-- Run this to clear all blocks on INSERTS for the orders table

-- 1. Ensure RLS is enabled (or toggle it to reset state specific to Table)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 2. Drop ALL existing policies (Aggressive cleanup to remove any hidden blockers)
DROP POLICY IF EXISTS "Enable insert for everyone" ON orders;
DROP POLICY IF EXISTS "Enable select for users based on user_id" ON orders;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON orders;
DROP POLICY IF EXISTS "Enable select for own orders" ON orders;
DROP POLICY IF EXISTS "Enable update for own orders" ON orders;
DROP POLICY IF EXISTS "Allow all operations for everyone" ON orders;
-- Drop any other potential policies users might have made
DROP POLICY IF EXISTS "Public Insert" ON orders;
DROP POLICY IF EXISTS "Authenticated Select" ON orders;

-- 3. Create a SINGLE, simple policy for INSERT that allows EVERYTHING
CREATE POLICY "Allow Public Insert" 
ON orders 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Create simple Select policy for authenticated users (to view their orders)
CREATE POLICY "Allow Authenticated Select" 
ON orders 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 5. Grant permissions to anon role (just in case they were revoked)
GRANT INSERT ON TABLE orders TO anon;
GRANT SELECT ON TABLE orders TO anon;
GRANT UPDATE ON TABLE orders TO anon;
