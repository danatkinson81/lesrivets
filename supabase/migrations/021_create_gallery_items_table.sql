/*
  # Create gallery_items table
  1. New Table: gallery_items (id uuid, type text, title text, description text, image_url text, category text, is_approved boolean, created_by uuid, created_at timestamp, updated_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users, write policy for admins and staff
*/
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- 'venue', 'fish'
  title text,
  description text,
  image_url text,
  category text,
  is_approved boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are viewable by authenticated users" ON gallery_items FOR SELECT TO authenticated USING (is_approved = true);
CREATE POLICY "Gallery items are editable by admins and staff" ON gallery_items FOR ALL TO authenticated USING (
  exists(
    select 1 from auth.users u 
    join user_roles ur on u.id = ur.user_id 
    where u.id = auth.uid() and ur.role in ('admin', 'staff')
  )
);
