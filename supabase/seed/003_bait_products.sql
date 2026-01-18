/*
  # Seed bait_products data
  1. Insert sample bait products
*/
INSERT INTO bait_products (name, description, unit_label, price_gbp, active, preorder_required, preorder_deadline_days, is_frozen, handling_notes, sort_order) VALUES
('Boilies (Scopex)', 'Premium quality boilies with natural scent', 'kg', 15.00, true, true, 3, false, 'Keep refrigerated', 1),
('Pellets', 'High protein pellets for carp', 'kg', 12.00, true, false, 0, false, 'Store in dry place', 2),
('Particle Mix Bucket', 'Pre-mixed particle blend', 'bucket', 25.00, true, true, 2, false, 'Keep cool', 3),
('Frozen Midge', 'Fresh frozen midge for carp', 'kg', 20.00, true, true, 1, true, 'Keep frozen', 4),
('Worms', 'Fresh earthworms', 'pack', 8.00, true, false, 0, false, 'Store in cool place', 5);
