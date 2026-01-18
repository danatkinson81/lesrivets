/*
  # Create content_blocks table
  1. New Table: content_blocks (id uuid, block_name text, content text, is_active boolean, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_name text NOT NULL UNIQUE,
  content text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content blocks read own data" ON content_blocks FOR SELECT TO authenticated USING (is_active = true);
