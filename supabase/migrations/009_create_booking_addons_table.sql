/*
  # Create booking_addons table
  1. New Table: booking_addons (id uuid, booking_id uuid, addon_type text, addon_id uuid, quantity integer, price numeric, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
  3. Enums: addon_type (bait_product, bait_bundle, bait_boat)
*/
CREATE TYPE addon_type AS ENUM ('bait_product', 'bait_bundle', 'bait_boat');

CREATE TABLE IF NOT EXISTS booking_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  addon_type addon_type NOT NULL,
  addon_id uuid NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking addons read own data" ON booking_addons FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = user_id));
