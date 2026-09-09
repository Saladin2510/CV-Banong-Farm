-- ====================================================================
-- SUPABASE CLOUD POSTGRESQL SCHEMA: CV BANONG FARMS AJIBARANG
-- Real-Time Cloud Database & Webhook Replication
-- Dibuat khusus untuk dijalankan di: Supabase SQL Editor (supabase.com)
-- ====================================================================

-- 1. Bersihkan tabel lama jika ada
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS daily_chart_metrics CASCADE;
DROP TABLE IF EXISTS ai_strategies CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- --------------------------------------------------------------------
-- 2. TABEL: categories (Master Kategori Komoditas)
-- --------------------------------------------------------------------
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50) DEFAULT 'eco',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. TABEL: products (Master Katalog Komoditas & Stok Fisik)
-- --------------------------------------------------------------------
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  sku VARCHAR(50) UNIQUE,
  name VARCHAR(255) NOT NULL,
  category_name VARCHAR(100) NOT NULL DEFAULT 'Hasil Tani',
  price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  max_stock INT NOT NULL DEFAULT 5000,
  unit VARCHAR(30) NOT NULL DEFAULT 'kg',
  sold_count INT NOT NULL DEFAULT 0,
  icon VARCHAR(50) DEFAULT 'eco',
  image_url VARCHAR(255) DEFAULT '/assets/product-fertilizer.png',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. TABEL: orders (Tiket Pesanan Masuk WhatsApp & Web)
-- --------------------------------------------------------------------
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_code VARCHAR(50) NOT NULL UNIQUE,
  customer_name VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(30),
  customer_address TEXT,
  total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  status VARCHAR(50) NOT NULL DEFAULT 'Stok Terupdate Otomatis',
  source VARCHAR(50) NOT NULL DEFAULT 'WhatsApp B2B',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. TABEL: order_items (Rincian Komoditas per Pesanan)
-- --------------------------------------------------------------------
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  qty INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0.00
);

-- --------------------------------------------------------------------
-- 6. TABEL: daily_chart_metrics (Volume Harian Telemetri 7 Hari)
-- --------------------------------------------------------------------
CREATE TABLE daily_chart_metrics (
  date_key DATE PRIMARY KEY,
  day_label VARCHAR(30) NOT NULL,
  actual_volume_kg INT NOT NULL DEFAULT 0,
  predicted_volume_kg INT NOT NULL DEFAULT 0,
  peak_amount_kg INT NOT NULL DEFAULT 0,
  peak_revenue DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  peak_buyer VARCHAR(150),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. TABEL: ai_strategies (Log Rekomendasi Pemasaran & Kuota 1M Token)
-- --------------------------------------------------------------------
CREATE TABLE ai_strategies (
  id BIGSERIAL PRIMARY KEY,
  target_product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  provider VARCHAR(30) NOT NULL DEFAULT 'gemini',
  model_name VARCHAR(50) NOT NULL DEFAULT 'gemini-1.5-flash',
  analysis_text TEXT NOT NULL,
  accuracy_rate VARCHAR(10) DEFAULT '96,2%',
  risk_level VARCHAR(50) DEFAULT 'Rendah (0,12)',
  priority_action VARCHAR(100) DEFAULT 'Prioritas Utama B2B',
  tokens_used INT DEFAULT 0,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Mengizinkan akses baca & tulis untuk aplikasi CV Banong Farms
-- ====================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_chart_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_strategies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Akses Publik Baca Kategori" ON categories FOR SELECT USING (true);
CREATE POLICY "Akses Publik Baca Produk" ON products FOR SELECT USING (true);
CREATE POLICY "Akses Publik Tambah Produk" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update Produk" ON products FOR UPDATE USING (true);
CREATE POLICY "Akses Publik Hapus Produk" ON products FOR DELETE USING (true);

CREATE POLICY "Akses Publik Baca Pesanan" ON orders FOR SELECT USING (true);
CREATE POLICY "Akses Publik Buat Pesanan" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update Pesanan" ON orders FOR UPDATE USING (true);

CREATE POLICY "Akses Publik Baca Item" ON order_items FOR SELECT USING (true);
CREATE POLICY "Akses Publik Buat Item" ON order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Akses Publik Baca Metrik" ON daily_chart_metrics FOR SELECT USING (true);
CREATE POLICY "Akses Publik Simpan Metrik" ON daily_chart_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update Metrik" ON daily_chart_metrics FOR UPDATE USING (true);

CREATE POLICY "Akses Publik Baca AI" ON ai_strategies FOR SELECT USING (true);
CREATE POLICY "Akses Publik Simpan AI" ON ai_strategies FOR INSERT WITH CHECK (true);

-- ====================================================================
-- AKTIFKAN SUPABASE REALTIME REPLICATION
-- Mengaktifkan sinkronisasi WebSocket live seketika saat data berubah
-- ====================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE daily_chart_metrics;

-- ====================================================================
-- SEED DATA AWAL (MASTER KOMODITAS & DATA TRANSAKSI)
-- ====================================================================

INSERT INTO categories (id, name, slug, icon, description) VALUES
(1, 'Peternakan Unggas', 'unggas', 'egg', 'Produk telur bio-organik & puyuh berstandar tinggi'),
(2, 'Perikanan Air Deras', 'ikan', 'set_meal', 'Budidaya ikan air tawar sistem sirkulasi air pegunungan'),
(3, 'Daging Segar', 'daging', 'nutrition', 'Daging ayam & bebek karkas segar higienis'),
(4, 'Sayur & Cabai', 'sayur', 'local_fire_department', 'Cabai rawit & hortikultura organik petik segar'),
(5, 'Buah-buahan', 'buah', 'eco', 'Buah naga merah & pepaya California manis alami'),
(6, 'Biji Kopi', 'kopi', 'coffee', 'Biji kopi Robusta lereng Slamet petik merah pilihan'),
(7, 'Produk Organik', 'organik', 'spa', 'Pupuk kasgot & olahan biokonversi ramah lingkungan')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, category_id, sku, name, category_name, price, stock, max_stock, unit, sold_count, icon, image_url, description) VALUES
(1, 1, 'BANONG-EGG-01', 'Telur Bebek Bio-Organik', 'Peternakan Unggas', 38000.00, 1250, 2500, 'tray', 480, 'egg', '/assets/product-eggs.png', 'Telur bebek organik dari peternakan sistem angon alami di Ajibarang. Kuning telur jingga cerah alami, kaya gizi dan bebas antibiotika sintetis.'),
(2, 2, 'BANONG-FISH-01', 'Ikan Lele Sangkuriang Segar', 'Perikanan Air Deras', 26000.00, 2400, 5000, 'kg', 820, 'set_meal', '/assets/product-fish.png', 'Lele Sangkuriang dibudidayakan di kolam air deras mengalir. Daging padat, gurih, dan tidak berbau lumpur.'),
(3, 3, 'BANONG-CHK-01', 'Ayam Organik Utuh Segar', 'Daging Segar', 48000.00, 850, 2000, 'ekor', 650, 'nutrition', '/assets/product-chicken.png', 'Ayam karkas organik utuh yang dibesarkan dengan pakan alami tanpa hormon pertumbuhan. Daging tebal, empuk, dan segar.'),
(4, 1, 'BANONG-EGG-02', 'Telur Ayam Omega-3 Gold', 'Peternakan Unggas', 42000.00, 3200, 6000, 'tray', 1450, 'egg', '/assets/product-eggs.png', 'Telur ayam ras dengan nutrisi Omega-3 tinggi dari pakan alami biji rami dan rumput laut.'),
(5, 3, 'BANONG-DCK-01', 'Daging Bebek Karkas Organik', 'Daging Segar', 62000.00, 420, 1200, 'ekor', 310, 'nutrition', '/assets/product-duck.png', 'Daging bebek potong segar harian dari peternakan Ajibarang. Gurih dan rendah kolesterol.'),
(6, 2, 'BANONG-FISH-02', 'Fillet Ikan Gurame Segar', 'Perikanan Air Deras', 48000.00, 650, 1500, 'kg', 420, 'set_meal', '/assets/product-gurame.png', 'Fillet ikan gurame segar tanpa duri dari kolam air deras Ajibarang. Higienis dan dikemas vakum.'),
(7, 7, 'BANONG-ORG-01', 'Pupuk Kasgot Super Organik', 'Produk Organik', 25000.00, 4800, 8000, 'karung 10kg', 1100, 'eco', '/assets/product-fertilizer.png', 'Pupuk organik hayati hasil biokonversi limbah maggot BSF. Memperbaiki struktur tanah dan menyuburkan tanaman.'),
(8, 4, 'BANONG-CHL-01', 'Cabai Rawit Merah Super', 'Sayur & Cabai', 30000.00, 6800, 16000, 'kg', 5120, 'local_fire_department', '/assets/product-chicken.png', 'Cabai rawit merah petik segar langsung dari kebun Ajibarang. Pedas pekat alami, bebas residu pestisida kimia.'),
(9, 5, 'BANONG-FRT-01', 'Buah Naga Merah Super', 'Buah-buahan', 22000.00, 14200, 18000, 'kg', 3850, 'eco', '/assets/product-fertilizer.png', 'Buah naga daging merah manis alami dipanen pada kematangan optimal di perkebunan terintegrasi Banyumas.'),
(10, 6, 'BANONG-COF-01', 'Kopi Robusta Java', 'Biji Kopi', 48000.00, 21500, 24000, 'kg', 2900, 'coffee', '/assets/product-fertilizer.png', 'Biji kopi Robusta petik merah dari lereng pegunungan Banyumas. Proses natural dengan aroma mantap khas rempah.')
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock, price = EXCLUDED.price;

INSERT INTO orders (id, order_code, customer_name, customer_phone, customer_address, total_amount, status, source) VALUES
(1, '#WA-8831', 'PT Sumber Segar Jaya (DKI Jakarta)', '081299881122', 'Kawasan Industri Pulo Gadung, Jakarta Timur', 4560000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(2, '#WA-8830', 'CV Agro Makmur Mandiri (Bandung)', '081388772233', 'Jl. Soekarno Hatta No. 45, Bandung', 36000000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(3, '#WA-8829', 'Koperasi Tani Berkah (Sukabumi)', '085611223344', 'Jl. Raya Cisaat, Sukabumi', 10000000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(4, '#WA-8828', 'Resto Boga Lestari (Surabaya)', '082144556677', 'Jl. Kertajaya Indah, Surabaya', 28800000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence agar penambahan produk berikutnya otomatis aman
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
