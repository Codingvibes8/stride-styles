-- StrideAndStyle — Supabase schema + seed data
-- Run this in the Supabase SQL editor (https://supabase.com/dashboard → SQL Editor)

-- Products table (matches lib/types.ts Product interface)
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  price         NUMERIC(10, 2) NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('shoes', 'clothing')),
  subcategory   TEXT NOT NULL DEFAULT '',
  images        TEXT[] NOT NULL DEFAULT '{}',
  sizes         TEXT[] NOT NULL DEFAULT '{}',
  colors        TEXT[] NOT NULL DEFAULT '{}',
  stock         INTEGER NOT NULL DEFAULT 0,
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

-- Seed data — shoes
INSERT INTO products (name, description, price, category, subcategory, images, sizes, colors, stock, featured) VALUES
(
  'Air Stride Pro',
  'Lightweight running shoe with responsive cushioning and breathable mesh upper.',
  129.99, 'shoes', 'running',
  ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
  ARRAY['7', '8', '9', '10', '11', '12'],
  ARRAY['Black', 'White', 'Red'],
  50, TRUE
),
(
  'Urban Walker',
  'Clean minimal silhouette for everyday wear. Premium leather upper with cushioned insole.',
  89.99, 'shoes', 'casual',
  ARRAY['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800'],
  ARRAY['7', '8', '9', '10', '11'],
  ARRAY['White', 'Navy', 'Tan'],
  35, TRUE
),
(
  'TrailBlaze X',
  'Rugged trail runner with aggressive outsole grip and waterproof protection.',
  149.99, 'shoes', 'trail',
  ARRAY['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
  ARRAY['8', '9', '10', '11', '12'],
  ARRAY['Olive', 'Black', 'Gray'],
  20, TRUE
),
(
  'Classic Court Low',
  'Timeless low-top sneaker inspired by classic basketball style. Vulcanized rubber sole.',
  69.99, 'shoes', 'lifestyle',
  ARRAY['https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800'],
  ARRAY['6', '7', '8', '9', '10', '11', '12'],
  ARRAY['White', 'Black', 'Red', 'Blue'],
  80, FALSE
),
(
  'Flex Sprint 2',
  'Competition-ready sprint flat with carbon fibre plate and snug sock-like fit.',
  199.99, 'shoes', 'running',
  ARRAY['https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800'],
  ARRAY['7', '8', '9', '10', '11'],
  ARRAY['Neon Yellow', 'Blue', 'Pink'],
  15, FALSE
),
(
  'Hike Masters',
  'Sturdy mid-cut hiking boot with Gore-Tex lining and Vibram outsole.',
  174.99, 'shoes', 'hiking',
  ARRAY['https://images.unsplash.com/photo-1520316587275-5e4f06f355e3?w=800'],
  ARRAY['8', '9', '10', '11', '12', '13'],
  ARRAY['Brown', 'Dark Gray'],
  25, FALSE
);
