/*
  # Create payments table
  1. New Tables: payments (id, booking_id, method='bank_transfer', amount_gbp, received_at, recorded_by, notes)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  method text NOT NULL DEFAULT 'bank_transfer',
  amount_gbp numeric(10,2) NOT NULL,
  received_at timestamptz DEFAULT now(),
  recorded_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payments are viewable by owner" ON payments FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = (SELECT user_id FROM admin_profiles WHERE user_id = auth.uid()) OR auth.uid() IN (SELECT user_id FROM admin_profiles WHERE role = 'admin' OR role = 'staff')));
