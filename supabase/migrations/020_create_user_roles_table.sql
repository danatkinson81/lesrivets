/*
  # Create user_roles table
  1. New Table: user_roles (id uuid, user_id uuid, role text, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users, write policy for admins
*/
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL, -- 'admin', 'staff'
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User roles are viewable by authenticated users" ON user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "User roles are editable by admins" ON user_roles FOR ALL TO authenticated USING (
  exists(
    select 1 from auth.users u 
    join user_roles ur on u.id = ur.user_id 
    where u.id = auth.uid() and ur.role = 'admin'
  )
);
