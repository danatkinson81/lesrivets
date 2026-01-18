/*
  # Create booking_bait_boat_days table
  1. New Table: booking_bait_boat_days (id uuid, booking_id uuid, boat_option_id uuid, booking_date date, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS booking_bait_boat_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  boat_option_id uuid REFERENCES bait_boat_options(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_bait_boat_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking bait boat days read own data" ON booking_bait_boat_days FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = user_id));
