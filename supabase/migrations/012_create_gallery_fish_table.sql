/*
  # Create gallery_fish table
  1. New Table: gallery_fish (id uuid, name text, description text, image_url text, weight numeric, length numeric, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS gallery_fish (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text NOT NULL,
  weight numeric(10,2),
  length numeric(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_fish ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery fish read own data" ON gallery_fish FOR SELECT TO authenticated USING (true);
