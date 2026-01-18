/*
  # Create bookings system
  1. New Table: bookings (id uuid, user_id uuid, package_id uuid, date date, time time, guests integer, status text, special_requests text, created_at timestamp)
  2. New Table: booking_dates (id uuid, booking_id uuid, date date, created_at timestamp)
  3. New Table: booking_packages (id uuid, name text, description text, price numeric, duration integer, created_at timestamp)
  4. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS booking_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  duration integer NOT NULL, -- in hours
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id uuid REFERENCES booking_packages(id) ON DELETE CASCADE,
  status text DEFAULT 'awaiting_payment',
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS booking_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking packages read own data" ON booking_packages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Bookings read own data" ON bookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Bookings insert own data" ON bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Booking dates read own data" ON booking_dates FOR SELECT TO authenticated USING (EXISTS (
  SELECT 1 FROM bookings b WHERE b.id = booking_id AND b.user_id = auth.uid()
));
