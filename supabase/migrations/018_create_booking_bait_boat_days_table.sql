/*
  # Create booking_bait_boat_days table
  1. New Table: booking_bait_boat_days (id uuid, booking_id uuid, date date, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS booking_bait_boat_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_bait_boat_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking bait boat days read own data" ON booking_bait_boat_days FOR SELECT TO authenticated USING (exists(
  SELECT 1 FROM bookings b WHERE b.id = booking_bait_boat_days.booking_id AND b.user_id = auth.uid()
));
