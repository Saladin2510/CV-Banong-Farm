-- ====================================================================
-- DATABASE SCHEMA: CV BANONG FARMS AJIBARANG
-- Sistem Telemetri, Katalog Komoditas, & Aliran Pesanan WhatsApp Real-Time
-- Engine: MySQL 8.0+ / MariaDB 10.4+ (Standar Hostinger cPanel / phpMyAdmin)
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `ai_strategies`;
DROP TABLE IF EXISTS `daily_chart_metrics`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `admin_users`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------------------
-- 1. TABEL: categories (Master Kategori Komoditas)
-- --------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `icon` VARCHAR(50) DEFAULT 'eco',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 2. TABEL: products (Master Katalog Komoditas & Inventaris Gudang)
-- --------------------------------------------------------------------
CREATE TABLE `products` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NULL,
  `sku` VARCHAR(50) NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `category_name` VARCHAR(100) NOT NULL DEFAULT 'Hasil Tani',
  `price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `stock` INT NOT NULL DEFAULT 0,
  `max_stock` INT NOT NULL DEFAULT 5000,
  `unit` VARCHAR(30) NOT NULL DEFAULT 'kg',
  `sold_count` INT NOT NULL DEFAULT 0,
  `icon` VARCHAR(50) DEFAULT 'eco',
  `image_url` VARCHAR(255) DEFAULT '/assets/product-fertilizer.png',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_prod_category` (`category_id`),
  INDEX `idx_prod_stock` (`stock`),
  INDEX `idx_prod_sold` (`sold_count`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) 
    REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 3. TABEL: orders (Tiket Pesanan Masuk WhatsApp & Web)
-- --------------------------------------------------------------------
CREATE TABLE `orders` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(30) NULL,
  `customer_address` TEXT NULL,
  `total_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Stok Terupdate Otomatis',
  `source` VARCHAR(50) NOT NULL DEFAULT 'WhatsApp B2B',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_order_created` (`created_at`),
  INDEX `idx_order_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 4. TABEL: order_items (Detail Komoditas per Transaksi)
-- --------------------------------------------------------------------
CREATE TABLE `order_items` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `order_id` BIGINT NOT NULL,
  `product_id` BIGINT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `qty` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `subtotal` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  INDEX `idx_item_order` (`order_id`),
  INDEX `idx_item_product` (`product_id`),
  CONSTRAINT `fk_items_order` FOREIGN KEY (`order_id`) 
    REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_items_product` FOREIGN KEY (`product_id`) 
    REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 5. TABEL: daily_chart_metrics (Volume Harian & Data Kurva Prediksi 7 Hari)
-- --------------------------------------------------------------------
CREATE TABLE `daily_chart_metrics` (
  `date_key` DATE PRIMARY KEY,
  `day_label` VARCHAR(30) NOT NULL,
  `actual_volume_kg` INT NOT NULL DEFAULT 0,
  `predicted_volume_kg` INT NOT NULL DEFAULT 0,
  `peak_amount_kg` INT NOT NULL DEFAULT 0,
  `peak_revenue` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `peak_buyer` VARCHAR(150) NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 6. TABEL: ai_strategies (Log Rekomendasi Pemasaran & Kuota Token 1M)
-- --------------------------------------------------------------------
CREATE TABLE `ai_strategies` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `target_product_id` BIGINT NULL,
  `provider` VARCHAR(30) NOT NULL DEFAULT 'gemini',
  `model_name` VARCHAR(50) NOT NULL DEFAULT 'gemini-1.5-flash',
  `analysis_text` TEXT NOT NULL,
  `accuracy_rate` VARCHAR(10) DEFAULT '96,2%',
  `risk_level` VARCHAR(50) DEFAULT 'Rendah (0,12)',
  `priority_action` VARCHAR(100) DEFAULT 'Prioritas Utama B2B',
  `tokens_used` INT DEFAULT 0,
  `generated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_ai_product` FOREIGN KEY (`target_product_id`) 
    REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 7. TABEL: admin_users (Otoritas Akun Petugas & Super Admin)
-- --------------------------------------------------------------------
CREATE TABLE `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(30) NOT NULL DEFAULT 'Super Admin',
  `operator_id` VARCHAR(30) DEFAULT 'OP-ID #8821',
  `avatar_url` VARCHAR(255) DEFAULT '/assets/admin-avatar.png',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login_at` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- SEED DATA AWAL (MASTER & TRANSAKSI)
-- ====================================================================

-- 1. Kategori
INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`) VALUES
(1, 'Peternakan Unggas', 'unggas', 'egg', 'Produk telur bio-organik & puyuh berstandar tinggi'),
(2, 'Perikanan Air Deras', 'ikan', 'set_meal', 'Budidaya ikan air tawar sistem sirkulasi air pegunungan'),
(3, 'Daging Segar', 'daging', 'nutrition', 'Daging ayam & bebek karkas segar higienis'),
(4, 'Sayur & Cabai', 'sayur', 'local_fire_department', 'Cabai rawit & hortikultura organik petik segar'),
(5, 'Buah-buahan', 'buah', 'eco', 'Buah naga merah & pepaya California manis alami'),
(6, 'Biji Kopi', 'kopi', 'coffee', 'Biji kopi Robusta lereng Slamet petik merah pilihan'),
(7, 'Produk Organik', 'organik', 'spa', 'Pupuk kasgot & olahan biokonversi ramah lingkungan');

-- 2. Produk Master
INSERT INTO `products` (`id`, `category_id`, `sku`, `name`, `category_name`, `price`, `stock`, `max_stock`, `unit`, `sold_count`, `icon`, `image_url`, `description`) VALUES
(1, 1, 'BANONG-EGG-01', 'Telur Bebek Bio-Organik', 'Peternakan Unggas', 38000.00, 1250, 2500, 'tray', 480, 'egg', '/assets/product-eggs.png', 'Telur bebek organik dari peternakan sistem angon alami di Ajibarang. Kuning telur jingga cerah alami, kaya gizi dan bebas antibiotika sintetis.'),
(2, 2, 'BANONG-FISH-01', 'Ikan Lele Sangkuriang Segar', 'Perikanan Air Deras', 26000.00, 2400, 5000, 'kg', 820, 'set_meal', '/assets/product-fish.png', 'Lele Sangkuriang dibudidayakan di kolam air deras mengalir. Daging padat, gurih, dan tidak berbau lumpur.'),
(3, 3, 'BANONG-CHK-01', 'Ayam Organik Utuh Segar', 'Daging Segar', 48000.00, 850, 2000, 'ekor', 650, 'nutrition', '/assets/product-chicken.png', 'Ayam karkas organik utuh yang dibesarkan dengan pakan alami tanpa hormon pertumbuhan. Daging tebal, empuk, dan segar.'),
(4, 1, 'BANONG-EGG-02', 'Telur Ayam Omega-3 Gold', 'Peternakan Unggas', 42000.00, 3200, 6000, 'tray', 1450, 'egg', '/assets/product-eggs.png', 'Telur ayam ras dengan nutrisi Omega-3 tinggi dari pakan alami biji rami dan rumput laut.'),
(5, 3, 'BANONG-DCK-01', 'Daging Bebek Karkas Organik', 'Daging Segar', 62000.00, 420, 1200, 'ekor', 310, 'nutrition', '/assets/product-duck.png', 'Daging bebek potong segar harian dari peternakan Ajibarang. Gurih dan rendah kolesterol.'),
(6, 2, 'BANONG-FISH-02', 'Fillet Ikan Gurame Segar', 'Perikanan Air Deras', 48000.00, 650, 1500, 'kg', 420, 'set_meal', '/assets/product-gurame.png', 'Fillet ikan gurame segar tanpa duri dari kolam air deras Ajibarang. Higienis dan dikemas vakum.'),
(7, 7, 'BANONG-ORG-01', 'Pupuk Kasgot Super Organik', 'Produk Organik', 25000.00, 4800, 8000, 'karung 10kg', 1100, 'eco', '/assets/product-fertilizer.png', 'Pupuk organik hayati hasil biokonversi limbah maggot BSF. Memperbaiki struktur tanah dan menyuburkan tanaman.'),
(8, 4, 'BANONG-CHL-01', 'Cabai Rawit Merah Super', 'Sayur & Cabai', 30000.00, 6800, 16000, 'kg', 5120, 'local_fire_department', '/assets/product-chicken.png', 'Cabai rawit merah petik segar langsung dari kebun Ajibarang. Pedas pekat alami, bebas residu pestisida kimia.'),
(9, 5, 'BANONG-FRT-01', 'Buah Naga Merah Super', 'Buah-buahan', 22000.00, 14200, 18000, 'kg', 3850, 'eco', '/assets/product-fertilizer.png', 'Buah naga daging merah manis alami dipanen pada kematangan optimal di perkebunan terintegrasi Banyumas.'),
(10, 6, 'BANONG-COF-01', 'Kopi Robusta Java', 'Biji Kopi', 48000.00, 21500, 24000, 'kg', 2900, 'coffee', '/assets/product-fertilizer.png', 'Biji kopi Robusta petik merah dari lereng pegunungan Banyumas. Proses natural dengan aroma mantap khas rempah.');

-- 3. Pesanan Awal WhatsApp
INSERT INTO `orders` (`id`, `order_code`, `customer_name`, `customer_phone`, `customer_address`, `total_amount`, `status`, `source`) VALUES
(1, '#WA-8831', 'PT Sumber Segar Jaya (DKI Jakarta)', '081299881122', 'Kawasan Industri Pulo Gadung, Jakarta Timur', 4560000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(2, '#WA-8830', 'CV Agro Makmur Mandiri (Bandung)', '081388772233', 'Jl. Soekarno Hatta No. 45, Bandung', 36000000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(3, '#WA-8829', 'Koperasi Tani Berkah (Sukabumi)', '085611223344', 'Jl. Raya Cisaat, Sukabumi', 10000000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(4, '#WA-8828', 'Resto Boga Lestari (Surabaya)', '082144556677', 'Jl. Kertajaya Indah, Surabaya', 28800000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B');

-- 4. Rincian Pesanan
INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `qty`, `unit_price`, `subtotal`) VALUES
(1, 1, 'Telur Bebek Bio-Organik', 120, 38000.00, 4560000.00),
(2, 8, 'Cabai Rawit Merah Super', 1200, 30000.00, 36000000.00),
(3, 7, 'Pupuk Kasgot Super Organik', 400, 25000.00, 10000000.00),
(4, 10, 'Kopi Robusta Java', 600, 48000.00, 28800000.00);

-- 5. Data Awal Metrik Harian Telemetri 7 Hari
INSERT INTO `daily_chart_metrics` (`date_key`, `day_label`, `actual_volume_kg`, `predicted_volume_kg`, `peak_amount_kg`, `peak_revenue`, `peak_buyer`) VALUES
(CURDATE() - INTERVAL 6 DAY, 'H-6', 120, 110, 120, 3840000.00, 'Distributor Jabodetabek'),
(CURDATE() - INTERVAL 5 DAY, 'H-5', 145, 130, 145, 4640000.00, 'Distributor Pantura'),
(CURDATE() - INTERVAL 4 DAY, 'H-4', 175, 160, 175, 5600000.00, 'Mitra Restoran Barlingmas'),
(CURDATE() - INTERVAL 3 DAY, 'H-3', 195, 190, 195, 6240000.00, 'Grosir Jawa Tengah'),
(CURDATE() - INTERVAL 2 DAY, 'H-2', 240, 230, 240, 7680000.00, 'Konsorsium Mitra B2B'),
(CURDATE() - INTERVAL 1 DAY, 'H-1', 210, 220, 210, 6720000.00, 'Supermarket Fresh Mart'),
(CURDATE(), 'Hari Ini', 225, 235, 225, 7200000.00, 'Kanal WA: Mitra Hari Ini');

-- 6. Pengguna Admin Default
INSERT INTO `admin_users` (`id`, `username`, `email`, `password_hash`, `full_name`, `role`, `operator_id`) VALUES
(1, 'admin_banong', 'admin@banongfarms.com', '$2y$10$abcdefghijklmnopqrstuvwxz1234567890', 'Direktur Operasional CV Banong', 'Super Admin', 'OP-ID #8821');
