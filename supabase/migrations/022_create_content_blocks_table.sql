/*
  # Create content_blocks table
  1. New Table: content_blocks (id uuid, page text, section text, title text, content text, sort_order integer, is_active boolean, created_at timestamp, updated_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users, write policy for admins
*/
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  title text,
  content text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content blocks are viewable by authenticated users" ON content_blocks FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Content blocks are editable by admins" ON content_blocks FOR ALL TO authenticated USING (
  exists(
    select 1 from auth.users u 
    join user_roles ur on u.id = ur.user_id 
    where u.id = auth.uid() and ur.role = 'admin'
  )
);
