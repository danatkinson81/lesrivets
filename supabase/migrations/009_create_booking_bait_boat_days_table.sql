/*
  # Create booking_bait_boat_days table
  1. New Tables: booking_bait_boat_days (id, booking_id, date)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS booking_bait_boat_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE booking_bait_boat_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking bait boat days are viewable by owner" ON booking_bait_boat_days FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = (SELECT user_id FROM admin_profiles WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT user_id FROM admin_profiles WHERE role = 'admin' OR role = 'staff')));
