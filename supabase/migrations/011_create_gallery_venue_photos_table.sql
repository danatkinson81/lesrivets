/*
  # Create gallery_venue_photos table
  1. New Table: gallery_venue_photos (id uuid, title text, description text, image_url text, category text, is_active boolean, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS gallery_venue_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  category text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_venue_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery venue photos read own data" ON gallery_venue_photos FOR SELECT TO authenticated USING (is_active = true);
