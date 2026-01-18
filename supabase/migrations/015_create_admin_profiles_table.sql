/*
  # Create admin_profiles table
  1. New Table: admin_profiles (id uuid, user_id uuid, full_name text, role text, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin profiles read own data" ON admin_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin profiles insert own data" ON admin_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin profiles update own data" ON admin_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
