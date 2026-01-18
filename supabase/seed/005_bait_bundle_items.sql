/*
  # Seed bait_bundle_items data
  1. Insert sample bait bundle items
*/
INSERT INTO bait_bundle_items (bundle_id, bait_product_id, quantity) VALUES
((SELECT id FROM bait_bundles WHERE name = 'Beginner Starter Pack'), (SELECT id FROM bait_products WHERE name = 'Boilies (Scopex)'), 2),
((SELECT id FROM bait_bundles WHERE name = 'Beginner Starter Pack'), (SELECT id FROM bait_products WHERE name = 'Pellets'), 1),
((SELECT id FROM bait_bundles WHERE name = 'Beginner Starter Pack'), (SELECT id FROM bait_products WHERE name = 'Particle Mix Bucket'), 1),
((SELECT id FROM bait_bundles WHERE name = 'Advanced Angler Pack'), (SELECT id FROM bait_products WHERE name = 'Boilies (Scopex)'), 3),
((SELECT id FROM bait_bundles WHERE name = 'Advanced Angler Pack'), (SELECT id FROM bait_products WHERE name = 'Pellets'), 2),
((SELECT id FROM bait_bundles WHERE name = 'Advanced Angler Pack'), (SELECT id FROM bait_products WHERE name = 'Frozen Midge'), 1),
((SELECT id FROM bait_bundles WHERE name = 'Summer Special'), (SELECT id FROM bait_products WHERE name = 'Pellets'), 2),
((SELECT id FROM bait_bundles WHERE name = 'Summer Special'), (SELECT id FROM bait_products WHERE name = 'Particle Mix Bucket'), 1),
((SELECT id FROM bait_bundles WHERE name = 'Summer Special'), (SELECT id FROM bait_products WHERE name = 'Worms'), 1);
