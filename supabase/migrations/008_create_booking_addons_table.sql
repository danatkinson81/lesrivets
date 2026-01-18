/*
  # Create booking_addons table
  1. New Tables: booking_addons (id, booking_id, type enum('bait_product','bait_bundle','bait_boat'), ref_id uuid nullable, name_snapshot text, unit_label_snapshot text, quantity int, unit_price_gbp numeric, line_total_gbp numeric)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS booking_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  type text NOT NULL,
  ref_id uuid,
  name_snapshot text NOT NULL,
  unit_label_snapshot text,
  quantity int NOT NULL DEFAULT 1,
  unit_price_gbp numeric(10,2) NOT NULL,
  line_total_gbp numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking addons are viewable by owner" ON booking_addons FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = (SELECT user_id FROM admin_profiles WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT user_id FROM admin_profiles WHERE role = 'admin' OR role = 'staff')));
