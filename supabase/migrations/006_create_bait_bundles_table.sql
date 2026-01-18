/*
  # Create bait_bundles table
  1. New Table: bait_bundles (id uuid, name text, description text, price numeric, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait bundles read own data" ON bait_bundles FOR SELECT TO authenticated USING (true);
