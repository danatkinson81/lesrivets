/*
  # Create bait_bundle_items table
  1. New Table: bait_bundle_items (id uuid, bundle_id uuid, product_id uuid, quantity integer, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_bundle_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid REFERENCES bait_bundles(id) ON DELETE CASCADE,
  product_id uuid REFERENCES bait_products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bait_bundle_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait bundle items read own data" ON bait_bundle_items FOR SELECT TO authenticated USING (true);
