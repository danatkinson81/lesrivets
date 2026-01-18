/*
  # Create booking_addons table
  1. New Table: booking_addons (id uuid, booking_id uuid, type text, ref_id uuid, name_snapshot text, unit_label_snapshot text, quantity integer, unit_price_gbp numeric, line_total_gbp numeric, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS booking_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'bait_product', 'bait_bundle', 'bait_boat'
  ref_id uuid,
  name_snapshot text NOT NULL,
  unit_label_snapshot text,
  quantity integer NOT NULL DEFAULT 1,
  unit_price_gbp numeric(10,2) NOT NULL DEFAULT 0,
  line_total_gbp numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking addons read own data" ON booking_addons FOR SELECT TO authenticated USING (exists(
  SELECT 1 FROM bookings b WHERE b.id = booking_addons.booking_id AND b.user_id = auth.uid()
));
