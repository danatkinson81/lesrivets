/*
  # Create booking addons tables
  1. New Tables: 
    - bait_products (id uuid, name text, description text, price numeric, stock_quantity integer, category text)
    - bait_bundles (id uuid, name text, description text, products jsonb, created_at timestamp)
    - booking_addons (id uuid, booking_id uuid, type text, ref_id uuid, name_snapshot text, unit_label_snapshot text, quantity int, unit_price_gbp numeric, line_total_gbp numeric)
    - booking_bait_boat_days (id uuid, booking_id uuid, date date)
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

CREATE TABLE IF NOT EXISTS bait_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  products jsonb NOT NULL, -- Array of {product_id, quantity}
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS booking_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'bait_product', 'bait_bundle', 'bait_boat'
  ref_id uuid, -- references bait_products.id, bait_bundles.id, or NULL
  name_snapshot text NOT NULL,
  unit_label_snapshot text,
  quantity int NOT NULL DEFAULT 1,
  unit_price_gbp numeric(10,2) NOT NULL,
  line_total_gbp numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS booking_bait_boat_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bait_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bait_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_bait_boat_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bait products read own data" ON bait_products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Bait bundles read own data" ON bait_bundles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Booking addons read own data" ON booking_addons FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = user_id));
CREATE POLICY "Booking bait boat days read own data" ON booking_bait_boat_days FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = user_id));
