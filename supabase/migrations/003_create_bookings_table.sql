/*
  # Create bookings table
  1. New Table: bookings (id uuid, user_id uuid, package_id uuid, date date, time time, guests integer, status text, special_requests text, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
  3. Enums: booking_status (pending, confirmed, cancelled)
*/
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id uuid REFERENCES packages(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  status booking_status DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bookings read own data" ON bookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Bookings insert own data" ON bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Bookings update own data" ON bookings FOR UPDATE TO authenticated USING (auth.uid() = user_id);
