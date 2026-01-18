/*
  # Seed bait_boat_options data
  1. Insert sample bait boat options
*/
INSERT INTO bait_boat_options (name, pricing_mode, price_gbp, max_units_available, active, terms_md) VALUES
('Standard Bait Boat', 'per_week', 150.00, 2, true, 'Bait boat hire includes 24-hour access. Please return by 6pm on your final day.'),
('Premium Bait Boat', 'per_day', 50.00, 1, true, 'Premium bait boat with GPS tracking. Daily hire available. Return by 6pm.');
