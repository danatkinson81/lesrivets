/*
  # Create bait_products table
  1. New Tables: bait_products (id, name, description, unit_label, price_gbp, active, preorder_required boolean, preorder_deadline_days int, is_frozen boolean, handling_notes text, sort_order)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  unit_label text NOT NULL,
  price_gbp numeric(10,2) NOT NULL,
  active boolean DEFAULT true,
  preorder_required boolean DEFAULT false,
  preorder_deadline_days int DEFAULT 0,
  is_frozen boolean DEFAULT false,
  handling_notes text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait products are viewable by everyone" ON bait_products FOR SELECT TO authenticated USING (active = true);
