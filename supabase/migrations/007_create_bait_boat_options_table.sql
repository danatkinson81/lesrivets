/*
  # Create bait_boat_options table
  1. New Tables: bait_boat_options (id, name, pricing_mode enum('per_week','per_day'), price_gbp, max_units_available int, active, terms_md)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_boat_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  pricing_mode text NOT NULL DEFAULT 'per_week',
  price_gbp numeric(10,2) NOT NULL,
  max_units_available int NOT NULL DEFAULT 1,
  active boolean DEFAULT true,
  terms_md text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_boat_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait boat options are viewable by everyone" ON bait_boat_options FOR SELECT TO authenticated USING (active = true);
