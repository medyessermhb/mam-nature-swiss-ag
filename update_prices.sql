-- Delete Auto Backwash variants and Manual Particle Filter
DELETE FROM product_prices 
WHERE id IN (
  'mam-nature-water-treatment-complete-set-auto', 
  'mam-nature-water-treatment-complete-set-plus-auto', 
  'mam-nature-eco-set-auto', 
  'mam-nature-eco-set-plus-auto',
  'water-particle-filter-manual'
);

-- Upsert prices for standard products
-- Note: Values are taken from src/data/prices.ts which matches the user's "Normal" listing.
-- Particle & Lime Set is calculated as (Particle Filter + Water Lime) - 10%
-- Columns assumed: id, price_ma (Morocco), price_ch (Switzerland), price_eu (Europe)

INSERT INTO product_prices (id, price_ma, price_ch, price_eu) VALUES
  ('mam-nature-eco-set', 12299, 1070, 1150),
  ('mam-nature-eco-set-plus', 19989, 1787, 1916),
  ('mam-nature-water-treatment-complete-set-plus', 37507, 3378, 3598),
  ('mam-nature-water-treatment-complete-set', 31241, 2780, 2998),
  ('swiss-hydrogen-booster', 2292.40, 206.80, 220.00),
  ('the-swiss-water-dynamizer', 20816.16, 1848, 1998),
  ('mam-nature-water-fine-filter', 6750, 598, 648),
  ('water-particle-filter', 2479.96, 218, 238),
  ('water-fine-filter-cartridge', 2709, 250, 240),
  ('mam-nature-essential-set', 8580, 760, 820),
  ('mam-nature-essential-plus', 10250, 910, 980),
  ('mam-nature-water-lime', 2270, 210, 217),
  ('mam-nature-particle-lime-set', 4274.96, 385.20, 409.50)
ON CONFLICT (id) DO UPDATE SET
  price_ma = EXCLUDED.price_ma,
  price_ch = EXCLUDED.price_ch,
  price_eu = EXCLUDED.price_eu;
