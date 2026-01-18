/*
  # Create availability_weeks table
  1. New Table: availability_weeks (id uuid, week_start date, week_end date, is_available boolean, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS availability_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL,
  week_end date NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE availability_weeks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Availability weeks read own data" ON availability_weeks FOR SELECT TO authenticated USING (true);
