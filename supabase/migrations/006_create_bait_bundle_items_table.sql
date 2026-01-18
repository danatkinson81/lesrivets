/*
  # Create bait_bundle_items table
  1. New Tables: bait_bundle_items (id, bundle_id, bait_product_id, quantity)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_bundle_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid REFERENCES bait_bundles(id) ON DELETE CASCADE,
  bait_product_id uuid REFERENCES bait_products(id) ON DELETE CASCADE,
  quantity int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_bundle_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait bundle items are viewable by everyone" ON bait_bundle_items FOR SELECT TO authenticated USING (true);
