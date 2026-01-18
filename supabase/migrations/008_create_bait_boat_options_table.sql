/*
  # Create bait_boat_options table
  1. New Table: bait_boat_options (id uuid, name text, description text, price_per_day numeric, max_guests integer, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_boat_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_per_day numeric(10,2) NOT NULL,
  max_guests integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_boat_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait boat options read own data" ON bait_boat_options FOR SELECT TO authenticated USING (true);
