/*
  # Seed availability_weeks data
  1. Insert sample availability weeks
*/
INSERT INTO availability_weeks (package_id, week_start_date, week_end_date, price_gbp, is_available, notes) VALUES
((SELECT id FROM packages WHERE slug = 'house-lake-exclusive'), '2025-06-01', '2025-06-07', 1200.00, true, 'Summer season'),
((SELECT id FROM packages WHERE slug = 'house-lake-exclusive'), '2025-06-08', '2025-06-14', 1200.00, true, 'Summer season'),
((SELECT id FROM packages WHERE slug = 'house-lake-exclusive'), '2025-06-15', '2025-06-21', 1200.00, true, 'Summer season'),
((SELECT id FROM packages WHERE slug = 'lake-exclusive'), '2025-06-01', '2025-06-07', 800.00, true, 'Summer season'),
((SELECT id FROM packages WHERE slug = 'lake-exclusive'), '2025-06-08', '2025-06-14', 800.00, true, 'Summer season'),
((SELECT id FROM packages WHERE slug = 'lake-exclusive'), '2025-06-15', '2025-06-21', 800.00, true, 'Summer season');
