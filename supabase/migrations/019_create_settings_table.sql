/*
  # Create settings table
  1. New Table: settings (id uuid, key text, value text, description text, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users, write policy for admins
*/
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are viewable by authenticated users" ON settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Settings are editable by admins" ON settings FOR ALL TO authenticated USING (
  exists(
    select 1 from auth.users u 
    join user_roles ur on u.id = ur.user_id 
    where u.id = auth.uid() and ur.role = 'admin'
  )
);
