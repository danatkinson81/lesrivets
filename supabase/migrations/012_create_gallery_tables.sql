/*
  # Create gallery tables
  1. New Tables: gallery_venue_photos (id uuid, title text, description text, image_url text, category text, is_active boolean, created_at timestamp)
  2. New Tables: gallery_fish_submissions (id uuid, photo_url text, species text, weight numeric, date date, angler_name text, status text, created_at timestamp)
  3. Security: Enable RLS, add read policy for authenticated users
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

CREATE TABLE IF NOT EXISTS gallery_fish_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_url text NOT NULL,
  species text,
  weight numeric,
  date date,
  angler_name text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_venue_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_fish_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery venue photos read own data" ON gallery_venue_photos FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Gallery fish submissions read own data" ON gallery_fish_submissions FOR SELECT TO authenticated USING (status = 'approved');
