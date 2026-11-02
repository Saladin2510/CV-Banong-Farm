# MEMORANDUM PERENCANAAN: APLIKASI KASIR (POINT OF SALE / POS)
## CV BANONG FARMS

**Status Dokumen:** Eksplorasi & Analisis Awal  
**Catatan Penting:** *Dokumen ini merupakan catatan diskusi konseptual. Tidak ada kode dalam proyek website utama yang diubah selama tahap ini.*

---

### 1. Latar Belakang & Kebutuhan Pemilik
Pemilik CV Banong Farms berencana menghadirkan aplikasi kasir khusus untuk operasional toko fisik dengan kebutuhan utama:
1. **Pencatatan Penjualan:** Melayani transaksi kasir harian secara cepat dan akurat.
2. **Manajemen Stok Otomatis:** Memotong stok produk (telur, pakan, bibit, produk olahan) secara otomatis begitu transaksi selesai.
3. **Pemantauan Jarak Jauh (Remote Monitoring):** Pemilik dapat melihat omzet harian, grafik penjualan, shift kasir, dan sisa stok dari luar toko (misal lewat smartphone/laptop pribadi tanpa harus berada di lokasi fisik).

---

### 2. Klarifikasi Terminologi: Point of Sale (POS)
Aplikasi sistem kasir toko ritel seperti yang diinginkan pemilik adalah **Point of Sale (POS)**. 

Komponen standar sistem POS modern meliputi:
* **Terminal Kasir (Front-Office):** Antarmuka transaksi cepat, hitung diskon/kembalian, input barcode, dan cetak struk (*receipt printer*).
* **Manajemen Inventori & Produk:** Pencatatan harga beli, harga jual, dan alert stok menipis.
* **Dashboard Pemilik (Back-Office / Remote View):** Laporan ringkasan harian, laba rugi kotor, riwayat transaksi, dan rekapitulasi kas.

---

### 3. Analisis Komparasi: Versi Desktop (Visual Studio / C#) vs Versi Website (Cloud / PWA)

| Parameter Evaluasi | Versi Desktop Form (Visual Studio / C#) | Versi Website / Cloud-Based POS |
| :--- | :--- | :--- |
| **Pemantauan Jarak Jauh (Owner Dashboard)** | **Sulit & Kompleks.** <br>Jika database disimpan lokal di PC toko, pemilik di luar toko tidak bisa melihat data via HP kecuali menyewa IP Publik Statis, konfigurasi router/port forwarding, atau VPN khusus. | **Sangat Mudah & Alami (Rekomendasi).** <br>Data tersimpan di Cloud (seperti Supabase). Pemilik cukup login melalui browser HP/tablet kapan saja dari mana saja untuk memantau omzet *real-time*. |
| **Keterhubungan Data (Ekosistem)** | Data kasir terisolasi di PC toko. Sulit disinkronkan dengan website profil atau katalog online CV Banong. | **Satu Sumber Data Terpusat.** <br>Bisa berbagi database yang sama dengan website CV Banong Farms sehingga inventaris fisik dan digital selalu sinkron. |
| **Fleksibilitas Perangkat Toko** | Terbatas hanya pada komputer/laptop dengan OS Windows. | Bisa dibuka di PC kasir Windows, laptop, tablet Android kasir, atau bahkan iPad meja kasir. |
| **Integrasi Perangkat Kasir (Printer Struk / Barcode)** | Akses langsung ke port USB/Serial sangat mudah tanpa dialog konfirmasi print. | Butuh sedikit setup (fitur *Kiosk Mode / Silent Print* di browser, atau printer struk via Bluetooth / Wi-Fi Network). |
| **Pembaruan & Perbaikan (Maintenance)** | Jika ada perbaikan bug atau penambahan fitur, harus compile dan install ulang file `.exe` di PC toko. | Pembaruan instan; kasir cukup me-refresh halaman website. |
| **Ketergantungan Internet** | 100% Offline (bisa beroperasi tanpa internet). | Membutuhkan internet (bisa diminimalisir menggunakan teknologi *Progressive Web App* / penyimpanan *IndexedDB* lokal saat koneksi terputus). |

---

### 4. Kesimpulan Rekomendasi
Untuk memenuhi syarat mutlak pemilik, yaitu **"dapat memantau dari jarak jauh"**:
* **Pilihan Terbaik:** **Web-Based Cloud POS (atau Progressive Web App / PWA)**.
* **Alasan Utama:** 
  1. Pemilik CV Banong dapat membuka dashboard analitik di HP kapan saja secara instan.
  2. Data dapat langsung terintegrasi dengan ekosistem database cloud yang sudah mulai dirancang untuk CV Banong Farms (Supabase).
  3. Biaya pemeliharaan lebih hemat dan tidak bergantung pada 1 unit komputer fisik saja.

---

### 5. Hal yang Perlu Diidentifikasi Selanjutnya Sebelum Pengerjaan
1. **Infrastruktur Toko:** Apakah toko fisik CV Banong memiliki koneksi internet Wi-Fi yang aktif sepanjang jam operasional?
2. **Perangkat Kasir yang Dimiliki/Direncanakan:** 
   * Jenis komputer kasir (PC Desktop, Laptop, atau Tablet Layar Sentuh).
   * Tipe printer struk (Thermal Printer USB, Bluetooth 58mm/80mm, atau Printer Jaringan LAN).
   * Alat pemindai barcode (*barcode scanner* USB atau kamera).
3. **Skala Pengguna:** Apakah ada pembagian peran (*role*) antara Kasir (hanya bisa input transaksi) dan Pemilik/Owner (bisa melihat laporan keuangan, ubah harga, dan pantau stok)?
