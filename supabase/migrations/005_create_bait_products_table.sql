/*
  # Create bait_products table
  1. New Table: bait_products (id uuid, name text, description text, price numeric, stock_quantity integer, category text, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS bait_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  stock_quantity integer DEFAULT 0,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bait_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait products read own data" ON bait_products FOR SELECT TO authenticated USING (true);
