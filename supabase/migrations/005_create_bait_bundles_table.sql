/*
  # Create bait_bundles table
  1. New Tables: bait_bundles (id, name, description, price_gbp, active, sort_order)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_gbp numeric(10,2) NOT NULL,
  active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait bundles are viewable by everyone" ON bait_bundles FOR SELECT TO authenticated USING (active = true);
