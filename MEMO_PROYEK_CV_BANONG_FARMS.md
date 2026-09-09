# MEMORANDUM & CHECKPOINT PROYEK: CV BANONG FARMS
**Tanggal Pembaruan Terakhir:** 9 September 2026  
**Status Proyek:** Siap Produksi (Build Passed / Zero Errors)  
**Tujuan Dokumen:** Memastikan kesinambungan konteks teknis, arsitektur, dan logika sistem untuk sesi pengembangan berikutnya.

---

## 1. Identitas & Tech Stack Proyek
* **Framework:** Vue 3 (Composition API `<script setup>`) + Vite
* **Styling:** Tailwind CSS (Desain Glassmorphism, 60-30-10 Color System, Dark/Light Mode adaptif)
* **State Management:** Reactive Stores (`useAdminStore.js` dan `useCartStore.js`) dengan sinkronisasi `localStorage`
* **Database Backend:** Supabase Cloud PostgreSQL 24/7 + WebSocket Real-time Replication
* **Nomor WhatsApp Resmi Admin:** **`08999192861`** (Format URL: `https://wa.me/628999192861`)

---

## 2. Struktur Database Supabase Cloud (7 Tabel Bahasa Indonesia)
Semua tabel telah distandarisasi ke bahasa Indonesia (tabel lama bahasa Inggris sudah dihapus):
1. **`admin`**: Akun & profil pengelola dashboard.
2. **`kategori`**: Kategori komoditas (Unggas, Daging, Ikan, dsb.).
3. **`produk`**: Katalog pakan/hasil panen (`id`, `nama`, `kategori`, `stok`, `harga`, `satuan`, `jumlah_terjual`, `gambar`, `deskripsi`).
4. **`pesanan`**: Header transaksi (`id`, `kode_pesanan`, `nama_pelanggan`, `no_whatsapp`, `alamat_pelanggan`, `total_harga`, `status`).
5. **`detail_pesanan`**: Item-item dalam tiap transaksi (`id`, `id_pesanan`, `id_produk`, `jumlah_beli`, `harga_satuan`, `subtotal`).
6. **`metrik_harian`**: Data omzet harian & grafik tren AI 7 hari terakhir.
7. **`strategi_ai`**: Rekomendasi analitik cerdas untuk stok & harga.

---

## 3. Fitur Utama yang Telah Selesai & Berjalan Sempurna

### A. Alur Pemesanan Produk Pelanggan (User Flow)
1. **Katalog & Modal Detail:**
   - Tombol lama *"Pesan via WA"* telah diganti menjadi **"Tambah ke Keranjang"**.
   - Pelanggan dapat mengatur jumlah kuantitas (`-` dan `+`) langsung dari modal detail produk.
   - Terdapat tombol keranjang dengan badge jumlah barang di Navbar (desktop & mobile) serta Floating Cart Pill di pojok kanan bawah.
2. **Keranjang Belanja (`CartDrawer.vue`):**
   - Menampung berbagai item belanja sekaligus dengan perhitungan harga otomatis.
   - Dilengkapi **Formulir Pengiriman Pelanggan**:
     - *Nama Lengkap / Nama Usaha*
     - *Nomor WhatsApp Aktif*
     - *Alamat Lengkap Pengiriman*
3. **Eksekusi Simultan Saat Submit:**
   - **Ke Database Supabase:** Dicatat ke tabel `pesanan` dengan status awal **`'Menunggu Konfirmasi'`** (stok fisik **belum berkurang**) dan rincian item masuk ke `detail_pesanan`.
   - **Ke WhatsApp Resmi (`08999192861`):** Otomatis membuka tab WA dengan pesan siap kirim berformat rapi (nomor tiket `#BNG-xxxx`, identitas pembeli, daftar item & harga, total belanja).
   - Keranjang belanja dikosongkan dan drawer tertutup otomatis.

### B. Proteksi & Login Admin (Auth Guard)
- Rute `#/admin` dilindungi oleh Supabase Auth.
- Jika admin belum login, sistem otomatis menampilkan **`AdminLoginView.vue`** (Form Login Email & Password).
- Jika sudah terautentikasi, Command Center terbuka penuh, menampilkan nama/email admin yang aktif dan tombol **Logout**.

### C. Alur Validasi Pesanan & Pemotongan Stok Otomatis (Admin Flow)
- Di tab **Pesanan WhatsApp Live Feed (`WhatsAppLiveFeed.vue`)**, admin dapat memfilter tiket:
  - *Semua*
  - *Menunggu Validasi*
  - *Selesai*
  - *Dibatalkan*
- Tombol Aksi Admin:
  - **"Validasi Selesai (Deal)":** Mengubah status pesanan ke `'Selesai'`, memotong stok produk di tabel `produk` sesuai kuantitas yang dibeli, menambah `jumlah_terjual`, mencatat transaksi ke `metrik_harian`, dan memperbarui tampilan katalog publik secara realtime.
  - **"Batalkan":** Mengubah status ke `'Dibatalkan'` tanpa mengurangi stok fisik.

---

## 4. Peta File Penting (Architecture Map)
* **Klien Supabase & Auth:** `src/services/supabaseClient.js`
* **Store Keranjang Belanja:** `src/stores/useCartStore.js`
* **Store Admin & Telemetri:** `src/stores/useAdminStore.js`
* **Komponen Keranjang & Form:** `src/components/CartDrawer.vue`
* **Komponen Login Admin:** `src/components/admin/AdminLoginView.vue`
* **Komponen Live Feed Pesanan:** `src/components/admin/WhatsAppLiveFeed.vue`
* **Komponen Header Admin:** `src/components/admin/AdminHeader.vue`
* **Kartu Produk Publik:** `src/components/ProductCard.vue` & `ProductModal.vue`
* **Navigasi & Footer Publik:** `src/components/Navbar.vue` & `FooterSection.vue`
* **Root Application:** `src/App.vue`

---

## 5. Rencana & Ide Pengembangan Berikutnya (Untuk Sesi Lanjutan)
Saat melanjutkan sesi berikutnya, beberapa fitur opsional yang siap dieksekusi:
1. **Fitur Ekspor Laporan:** Tombol unduh laporan riwayat transaksi dalam format CSV/Excel atau PDF untuk pembukuan CV Banong Farms.
2. **Filter & Pencarian Lanjutan di Admin:** Pencarian pesanan berdasarkan nama pembeli atau kode tiket, serta filter rentang tanggal custom.
3. **Notifikasi Suara/Audio Alert:** Menambahkan efek suara bel saat pesanan baru dari website masuk ke dashboard admin.
4. **Manajemen Admin Multi-User:** Antarmuka untuk menambah akun pengelola/staf gudang baru.

---

## 6. Perintah Operasional
* **Menjalankan Server Dev:**
  ```bash
  npm run dev
  ```
  *(Akses web: `http://localhost:5173/` | Akses admin: `http://localhost:5173/#/admin`)*
* **Kompilasi Siap Hosting:**
  ```bash
  npm run build
  ```
