/*
  # Seed packages data
  1. Insert sample packages
*/
INSERT INTO packages (slug, name, description, includes_accommodation, active) VALUES
('house-lake-exclusive', 'House + Lake Exclusive', 'Weekly block with accommodation and exclusive lake access', true, true),
('lake-exclusive', 'Lake Exclusive', 'Weekly block with exclusive lake access only', false, true);
