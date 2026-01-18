/*
  # Create availability_weeks table
  1. New Table: availability_weeks (id uuid, week_start date, week_end date, is_available boolean, price_gbp numeric, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users, write policy for admins
*/
CREATE TABLE IF NOT EXISTS availability_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL,
  week_end date NOT NULL,
  is_available boolean DEFAULT true,
  price_gbp numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE availability_weeks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Availability weeks are viewable by authenticated users" ON availability_weeks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Availability weeks are editable by admins" ON availability_weeks FOR ALL TO authenticated USING (
  exists(
    select 1 from auth.users u 
    join user_roles ur on u.id = ur.user_id 
    where u.id = auth.uid() and ur.role = 'admin'
  )
);
