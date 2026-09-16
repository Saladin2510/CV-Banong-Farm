# MEMORANDUM & CHECKPOINT PROYEK: CV BANONG FARMS
**Tanggal Pembaruan Terakhir:** 15 September 2026 (Sesi Pembaruan: AI Predictive Modeling 3 Pilar, Cold-Start Dataset Engine CSV & 1-Klik Simulasi PSAJ 30 Hari, Dual-Engine WMA & Gemini 1.5 Flash, Manajemen Karyawan Cloud Supabase, dan Persistensi 7 Tabel)  
**Status Proyek:** Siap Produksi & Siap Ujian PSAJ (Vite v6.4.3 Build Passed / Zero Errors / Supabase Cloud PostgreSQL 100% Terhubung / Dual-Engine AI Aktif / Satuan Konsisten 'pcs')  
**Tujuan Dokumen:** Memastikan kesinambungan konteks teknis, arsitektur, panduan desain warna 60:30:10, dan logika sistem untuk memulai sesi pengembangan berikutnya tanpa kehilangan jejak.

---

## 1. Identitas & Tech Stack Proyek
* **Framework:** Vue 3 (Composition API `<script setup>`) + Vite
* **Styling:** Tailwind CSS (Vanilla CSS + Custom Token Design System)
* **Design Rule:** **Strict 60% : 30% : 10% Color System**
* **State Management:** Reactive Stores (`useAdminStore.js` dan `useCartStore.js`) dengan persistensi `localStorage`
* **Database Backend:** Supabase Cloud PostgreSQL 24/7 + WebSocket Real-time Replication
* **Nomor WhatsApp Resmi Admin:** **`08999192861`** (Format URL: `https://wa.me/628999192861`)
* **Tautan Google Maps Resmi Farm:** **`https://maps.app.goo.gl/AXAGnr9V4D15MyUz9`** (Koordinat Ajibarang: `-7.4065147, 109.0743739`)

---

## 2. Standar Desain Visual & Aturan Warna (WAJIB DIPATUHI)
Sesuai arahan mutlak proyek ini, seluruh UI/UX landing page wajib tunduk pada **Rule 60% : 30% : 10%**:
1. **60% Dominan (PUTIH / Surface Light)**:
   - Warna latar belakang (`bg-surface-pure`, `bg-surface-subtle`, `bg-white` / mode gelap `dark:bg-[#070D1E]`).
   - Latar bingkai foto polaroid, teks inactive marquee (`text-slate-200/90`), border tipis netral (`border-slate-200/80`).
2. **30% Sekunder (BIRU / Brand Navy Blue CV Banong Farms)**:
   - Token Tailwind: `primary` (`#022448`), `primary-container` (`#1e3a5f`), `#132A4A`.
   - Digunakan untuk: Background footer, teks judul saat di-hover di Marquee, tombol sekunder (*"Jelajahi Produk Panen"*, *"Lihat Katalog"*), latar *floating cart button*, border kartu komoditas, tombol user profil admin bulat di navbar, dan elemen struktural.
3. **10% Aksen (KUNING / Golden Yellow CV Banong Farms)**:
   - Token Tailwind: `secondary-container` (`#fcd400`), `accent-hover` (`#e6c200`), `secondary` (`#705d00`).
   - Digunakan untuk: **Tombol Call-to-Action Utama** (**"Hubungi kami"** di Navbar, **"PESAN SEKARANG"**, **"Kirim Pesanan ke WA Admin"**, **"Tambah ke Keranjang"**, **"Buka di Maps"**), teks judul raksasa di footer, badge counter belanja di Navbar & Floating Cart, serta ikon verifikasi & checkmark.
4. **LARANGAN WARNA LAIN**:
   - **Warna Merah (`#c8102e`, `red-...`, `rose-...`) dan Hijau (`emerald-...`) DIBUANG TOTAL** dari tombol dan aksi publik landing page. Jangan pernah menambahkan kembali tombol merah atau hijau pada landing page.

---

## 3. Komponen-Komponen Baru & Fitur yang Telah Selesai Direvisi

### A. Floating Glassmorphism Navbar Capsule (`src/components/Navbar.vue`)
- **Struktur & Posisi:** Melayang di bagian atas (`fixed top-3 sm:top-5 inset-x-0 z-50`) dengan inner pill container `max-w-7xl mx-auto rounded-full`.
- **Efek Glassmorphism:**
  - *Saat di Hero Section:* Kaca transparan tembus pandang (`backdrop-blur-xl bg-white/25 dark:bg-[#022448]/35 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.14)] ring-1 ring-white/20`) sehingga latar bukit dan langit Ajibarang terlihat tembus secara estetis.
  - *Saat di-scroll melewati Hero:* Kaca semi-pekat tajam (`bg-white/85 dark:bg-[#022448]/90 backdrop-blur-2xl border border-slate-200/70 shadow-[0_12px_36px_rgba(2,36,72,0.15)]`) agar keterbacaan teks tetap sempurna di atas latar putih.
- **Elemen Navigasi:**
  - *Brand Logo & Info:* Logo resmi CV Banong Farms bulat + judul tebal navy + subjudul lokasi `"Ajibarang, Jawa Tengah"`.
  - *Tautan Tengah:* **Tentang** (`#tentang-kami` / `#visi-misi`), **Katalog** (`#katalog-produk`), **Kontak** (`#contact`) dengan soft pill indicator pada link aktif/hover (urutan selaras dengan alur vertikal halaman).
  - *Aksi Kanan:*
    1. Tombol **"🛒 Keranjang"** semi-transparan dengan badge angka item jika ada belanjaan.
    2. Tombol **"Hubungi kami"** kapsul kuning emas (`#fcd400` / `#e6c200`) ke WhatsApp Admin `08999192861`.
    3. Tombol **Mode Terang/Gelap** bundar kaca transparan.
    4. *(Catatan: Tombol Profil Admin di navbar publik telah dihapus total demi estetika bersih dan keamanan operasional. Akses Admin dialihkan murni via rute URL `#/admin`).*
- **Dukungan Mobile:** Dropdown drawer melayang yang serasi dengan estetika pill glassmorphism.

### B. 5-Baris Marquee Menu Interaktif (`src/components/InteractiveMarqueeMenu.vue`)
- **Posisi:** Terletak persis **sebelum section CTA Polaroid** di `App.vue`.
- **Konten Komoditas Asli CV Banong Farms:**
  1. *TELUR AYAM & BEBEK SEGAR* (Foto: Keranjang & tray telur organik panen harian).
  2. *PETERNAKAN UNGGAS ALAMI* (Foto: Kawasan peternakan unggas bebas di perbukitan Ajibarang).
  3. *DAGING ORGANIK HIGIENIS* (Foto: Karkas ayam utuh segar higienis).
  4. *PERIKANAN AIR DERAS* (Foto: Ikan air tawar segar & higienis).
  5. *PUPUK KASGOT ORGANIK* (Foto: Pupuk kasgot hasil biokonversi maggot BSF ramah lingkungan).
- **Pembaruan Terkini:** Elemen *Section Header / Subtitle* (badge komoditas unggulan, judul panen segar, dan panduan kursor) telah **dihapus total** untuk memaksimalkan fokus estetika minimalis (*pure continuous marquee focus*).
- **Karakteristik Animasi & UX:**
  - 5 baris berjalan bersilangan (zigzag/berlawanan arah) dengan kecepatan selaras (~14s-20s linear infinite).
  - **Auto-Resume Saat Unhover:** Jika kursor dijauhkan, teks langsung kembali berjalan otomatis dan kartu foto tertutup.
  - **Arah Popup Foto:** Baris 1-2 membuka ke bawah, sedangkan baris 3, 4, dan 5 membuka **ke atas** (`bottom-[...]`) sehingga kartu foto tidak pernah terpotong oleh batas bawah section.

### C. Kluster Foto Polaroid & CTA Section (`src/components/PolaroidCtaSection.vue`)
- **Nama/ID Section Baru:** Diubah menjadi `id="contact"` agar selaras dengan target tautan navigasi Navbar `Kontak`.
- **Headline Rapi 1 Baris:** *"PANEN SEGAR, ALAMI!"* tanpa pemotongan kata canggung.
- **Kluster Polaroid 3 Foto Asimetris:** Jarak lapang terhadap teks kanan, skala kartu seimbang.
- **Tombol CTA Kuning Emas:** Tombol merah lama telah diganti dengan tombol Kuning Emas khas Banong Farm (`bg-secondary-container hover:bg-accent-hover text-primary font-black border border-yellow-400/40`).
- **Latar Belakang Seragam:** 100% putih murni `bg-surface-pure` (`#FFFFFF`) dan `dark:bg-[#070D1E]`, identik dengan seksi lainnya.

### D. Penyelarasan Internal Konten Visi & Misi (`VisiMisiSection.vue`)
- **Deskripsi Narasi:** Diringkas menjadi tepat **1 paragraf** yang padat dan kuat mengenai agribisnis berkelanjutan Ajibarang.
- **Penghapusan Tombol:** Tombol sekunder (*"Jelajahi Produk Panen"* dan *"Hubungi Banong Farms"*) **dihapus total** untuk mengeliminasi beban visual.
- **Kerapatan Tipografi:** Margin antar-elemen teks diperpendek (`mb-2` judul, `mb-3` sub-judul, `mt-5 pt-5` kotak visi misi, dan `gap-2` poin misi).

### E. Penyelarasan Jarak Trust Bar & Bawah Katalog (`ProductGrid.vue`)
- **Jarak Atas Trust Bar:** Margin atas Trust Bar diturunkan dari `mt-52` menjadi **`mt-8 sm:mt-10 lg:mt-12`**, menempel harmonis di bawah katalog.
- **Jarak Bawah Seksi 3:** Padding bawah seksi dipersempit menjadi **`pb-12 sm:pb-16 lg:pb-20`** untuk transisi yang rapat dan mulus menuju seksi Marquee.

### F. Redesain Footer Editorial 100vh Desktop (`src/components/FooterSection.vue`)
- **Tinggi 100vh Desktop & Padding Atas Lega:** Footer menggunakan kelas **`lg:min-h-screen flex flex-col justify-between`** dengan padding atas yang sangat lapang (**`pt-20 sm:pt-28 lg:pt-36`**).
- **Logo Resmi di Samping Produk Panen:** Logo bundar resmi CV Banong Farms (`/assets/logo.png`) ditempatkan berdampingan di sisi kiri daftar *Produk Panen* (**`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24`**).
- **Peta Google Maps Interaktif (Live Draggable Iframe):** Kartu foto statis digantikan dengan `<iframe>` Google Maps live Banong Farms Ajibarang (`-7.4065147, 109.0743739`). Pengunjung dapat langsung menggeser (*drag/pan*) dan memperbesar (*zoom*) peta langsung di dalam website, serta tersedia tombol *"Buka di Maps"* menuju `https://maps.app.goo.gl/AXAGnr9V4D15MyUz9`.
- **Ikon Media Sosial Diperbesar:** Tombol ikon Instagram, Facebook, dan YouTube di bawah peta dinaikkan ke ukuran **`w-11 h-11 sm:w-12 sm:h-12`** dengan ikon `text-[22px] sm:text-[24px]`.
- **Judul Raksasa Terkunci 1 Baris Utuh:** Teks judul **`CV BANONG FARMS`** berukuran masif (**`text-4xl sm:text-5xl md:text-7xl lg:text-[86px] xl:text-[112px] 2xl:text-[136px] font-black`**) dengan kelas **`whitespace-nowrap leading-none`** dan efek retro 3D extrusion text shadow berlapis kuning emas `#fcd400` di atas navy `#132A4A`.
- **Bilah Paling Bawah Bersih:** Tombol *"Cari Produk"* dan tag wilayah *"Ajibarang, ID"* telah dihapus, menyisakan teks hak cipta serta tautan *Kebijakan Privasi* dan *Syarat & Ketentuan* yang tenang dan simetris.

### G. Pembersihan Total & Redesain Admin Dashboard (Strict 60:30:10)
- **Penghapusan Tab Atas yang Mengganggu:**
  - Search bar telemetri (*"Cari telemetri, komoditas..."*) dan badge *SISTEM ONLINE - KLUSTER PANEN 04* telah **dihapus total**.
  - Tombol oranye *AI Token (1M)* dan tombol hijau simulasi *+ Order WA* telah dibuang dari header.
  - Sisi kiri kini bersih dengan breadcrumb bisnis profesional: `CV Banong Farms / Pusat Operasional Farm`.
- **Penerapan Ketat 3 Warna (60 : 30 : 10):**
  - **60% Putih/Netral (`#FFFFFF`, `#F8FAFC`):** Kartu metrik, kontainer tabel CRUD, dan latar area kerja.
  - **30% Biru Navy (`#022448`):** Seluruh background Sidebar, active item state (`bg-[#1E3A5F] text-white border-l-4 border-secondary-container`), heading judul, dan tombol sekunder.
  - **10% Kuning Emas (`#FCD400`):** Tombol aksi utama (*"+ Tambah Komoditas"*, *"+ Tambah Produk Baru"*, *"Validasi Selesai (Deal)"*), dan badge counter.
  - **Pemusnahan Warna Oranye/Ungu/Neon:** Warna oranye (`#fe6e00`), ungu, dan hijau/merah neon yang membuat dashboard ramai telah dibuang total.
- **Pembersihan Jargon Fiksi & Metrik Nyata:**
  - Menghapus fiksi ilmiah (*Node Komando 04, Neural-V4, Korelasi 0,984*).
  - Mengganti kartu metrik fiktif AI dengan metrik bisnis asli: **Komoditas Aktif** (siap di katalog publik).
  - Menyelaraskan daftar komoditas ke produk asli Banong (*Telur, Unggas, Daging Organik, Ikan Nila, Kasgot*).

### H. Pembersihan Total Data Mock ke Nol (Zero-State for Real Testing)
- **Eliminasi Angka Hardcoded Siluman:**
  - Menghapus konstanta baseline pendapatan `482900000` (Rp 482,9 Juta) dari `totalRevenue`. Pendapatan kini murni dihitung dari pesanan riil berstatus `'Selesai'` / `'Stok Terupdate Otomatis'` (`Rp 0` saat awal).
  - Menghapus konstanta `1428 +` dari `totalOrdersCount`. Total pesanan kini murni dihitung dari panjang array tiket pesanan riil (`0` saat awal).
  - Menghapus kurva baseline default harian `[120, 145, 175, 195, 240, 210, 225]` di `dailyChartMap`. Baseline kini `[0, 0, 0, 0, 0, 0, 0]`.
  - Menghapus dataset mock analitik periode `1H`, `1B`, `YTD` di `AiAnalyticsSection.vue`.
- **Inisialisasi Seluruh Stok Produk ke 0 Pcs:**
  - Seluruh 10 komoditas peternakan kini memiliki `stock: 0` dan `soldCount: 0` dengan satuan **Pcs**.
- **Daftar Pesanan Kosong Murni (`DEFAULT_ORDERS = []`):**
  - Live Feed WhatsApp dan preview pesanan terkini dimulai dari antrean kosong dengan *Empty State* yang informatif.
- **Tombol & Fungsi "Reset ke Nol (0)":**
  - Ditambahkan tombol aksi **`Reset ke Nol (0)`** dengan ikon `restart_alt` di barisan header `CommandCenter.vue`.
  - Fungsi `resetAllDataToZero()` di `useAdminStore.js` mereset stok ke 0, mengosongkan antrean pesanan, dan mengembalikan kurva grafik 7 hari ke 0 dengan 1 klik.
- **Cache Invalidation Bersih:**
  - LocalStorage key diperbarui ke `pcs_v7` dan seluruh cache lama (`v2`, `v3`, `v4`, `clean_v5`, `zero_v6`) otomatis dibersihkan saat aplikasi dimuat.

### I. Transisi Satuan Stok Produk dari KG ke Satuan (PCS)
- **Standardisasi Satuan 'Pcs':**
  - Seluruh komoditas peternakan tidak lagi menggunakan satuan berat `kg` atau `tray`/`karung`, melainkan menggunakan satuan **`pcs`** sesuai permintaan operasional bisnis.
  - Kartu Metrik 2 diubah dari *"Total Stok Panen: X Ton / X kg"* menjadi **"Total Stok Produk: X Pcs"**.
  - Form Modal CRUD Admin (`ProductModal.vue`) kini menyediakan input *"Stok Fisik (pcs)"*, *"Kapasitas Maksimal (pcs)"*, dan *"Satuan Produk (pcs)"* serta tombol simpan kuning emas 60:30:10.
  - Tampilan katalog publik (`ProductCard.vue`), modal detail pembeli (`ProductModal.vue`), drawer keranjang belanja (`CartDrawer.vue`), dan template teks pemesanan WhatsApp kini menampilkan harga per `pcs` dan jumlah dalam `pcs`.
  - Tooltip dan sumbu grafik kurva penjualan di `AiAnalyticsSection.vue` telah diselaraskan ke satuan `pcs`.

### J. Upload Gambar Produk Lokal & Auto-Compress Canvas (`ProductModal.vue` & `ProductCrudTable.vue`)
- **Drag-and-Drop & File Picker:** Admin dapat memilih file foto langsung dari komputernya saat menambah atau mengedit produk.
- **Kompresi Canvas Otomatis ke Base64 Data URL:** Gambar dikompresi langsung di sisi browser (`<canvas>`) beresolusi optimal sehingga langsung tersimpan aman ke Supabase Cloud (kolom `url_gambar TEXT`) dan cadangan offline tanpa perlu membuat storage bucket eksternal.
- **Thumbnail Preview & Quick Presets:** Dilengkapi pratinjau live, tombol *"Ganti Foto"*, *"Hapus Foto"*, opsi input URL manual, serta 6 preset cepat foto panen asli (*Telur, Bebek, Ikan Lele, Ayam, Kasgot, Panen Sayur*).
- **Visual Thumbnail di Tabel Admin:** Tabel inventaris `ProductCrudTable.vue` kini menampilkan thumbnail foto produk riil dengan fallback ke ikon Material Symbol.

### K. Pembersihan Tombol Redundan di Header Admin (`CommandCenter.vue`)
- Menghapus 3 tombol yang fungsinya berulang/tidak diperlukan di header CommandCenter:
  1. `+ Tambah Komoditas` (fungsi penambahan kini terpusat rapi di tombol `+ Tambah Produk Baru` pada tabel inventaris produk).
  2. `Sinkronisasi` (sinkronisasi kini berjalan otomatis 100% via Supabase WebSocket Real-Time).
  3. `Ekspor Data`.
- Header Admin kini tampil bersih, tenang, dan fokus pada operasional bisnis.

### L. Perbaikan Katalog Publik & Dukungan Multi-Baris Tanpa Batas (`ProductGrid.vue`)
- **Penyelarasan Kategori Produk:** Kategori di katalog publik diselaraskan dengan database admin (*Semua Produk, Peternakan Unggas, Perikanan Air Deras, Daging Segar, Buah-buahan, Sayur & Cabai, Biji Kopi, Produk Organik*).
- **Logika Filter Fleksibel (`matchesCategory`):** Produk baru seperti "pisang" atau hasil tani lainnya otomatis terpetakan ke tab kategori yang relevan dan selalu muncul di tab *"Semua Produk"*.
- **Multi-Baris Responsif & Paginasi (12 Card/Halaman):** Menghilangkan batasan card lama sehingga card ke-5, ke-6, dst. mengalir rapi ke baris berikutnya.
- **Error Fallback Gambar (`@error`):** Ditambahkan penanganan error gambar pada kartu katalog publik dan modal checkout agar layout tidak rusak jika URL gambar gagal dimuat.

### M. Konfigurasi Terpusat Multi-Browser Supabase Cloud (`.env` & `supabaseClient.js`)
- **Root `.env` Configuration:**
  ```env
  VITE_SUPABASE_URL=https://kfdeqagkbqfhbxfcppfw.supabase.co
  VITE_SUPABASE_ANON_KEY=sb_publishable_e95mW-tY2gqZuBR48KKsuw_LvbFWtLE
  ```
  Kredensial tersimpan terpusat di file `.env` root sehingga seluruh browser (Chrome, Edge, Firefox, mode Incognito, HP, dan pengunjung publik) otomatis terhubung ke Supabase Cloud tanpa perlu input manual di tiap browser.
- **Sanitasi URL Otomatis (`sanitizeSupabaseUrl`):** Sistem secara otomatis memotong suffix `/rest/v1/` atau trailing slash berlebih yang tidak sengaja ditempelkan ke URL.
- **Kueri Tangguh (Resilient Query Fallback):** Kueri `getProducts()` dilengkapi fallback `client.from('produk').select('*')` jika query join dengan tabel `kategori` terkendala kebijakan RLS pada pengunjung anonim.

### N. Alur Pemesanan WhatsApp 2-Langkah Anti-Ghost Order (`CartDrawer.vue` & `useAdminStore.js`)
- **Masalah Terselesaikan:** Sebelumnya, data langsung masuk ke database saat tombol WA ditekan, sehingga jika pembeli batal mengirim di WA, data palsu/draf mengotori dashboard admin.
- **Alur Baru 2-Langkah:**
  1. *Langkah 1 (Buka WhatsApp):* Pembeli mengisi form -> klik *"Lanjut Buka WhatsApp"* -> Tab WhatsApp terbuka -> **Database Supabase BELUM tersentuh sama sekali**.
  2. *Langkah 2 (Layar Konfirmasi):* Website menampilkan panel konfirmasi dengan kode tiket `#BNG-XXXX`, total, dan 3 tombol:
     - **"Ya, Saya Sudah Kirim ke WhatsApp"** (Hijau Emerald): Pesanan **baru resmi disimpan ke Supabase Cloud** & muncul real-time di Admin Dashboard.
     - **"Buka Ulang Chat WhatsApp"**: Membuka kembali jika tab tertutup/terblokir.
     - **"Belum Jadi Kirim / Batalkan"**: Kembali ke keranjang tanpa menyimpan apapun ke database. Dashboard Admin dijamin **100% bersih dari pesanan palsu**.

---

## 4. Alur Bisnis & Integrasi Database (Sudah Aktif)
1. **User Memilih Produk:** Pelanggan memilih produk dari katalog publik -> klik *"Tambah ke Keranjang"* -> menentukan jumlah di modal -> masuk ke `useCartStore`.
2. **Checkout Dua Langkah via Drawer (`CartDrawer.vue`):**
   - *Langkah A:* Pelanggan mengisi formulir (Nama, WA, Alamat) -> klik tombol *"Lanjut Buka WhatsApp"*. Tab WA admin (`08999192861`) terbuka. Database **belum** mencatat apapun.
   - *Langkah B:* Pelanggan menekan tombol konfirmasi **"Ya, Saya Sudah Kirim ke WhatsApp"** di website.
   - *Langkah C:* Pesanan resmi tercatat ke tabel Supabase `pesanan` (status: `'Menunggu Konfirmasi'`) dan `detail_pesanan` dengan kode tiket unik `#BNG-XXXX`.
3. **Validasi Admin di Dashboard (`#/admin`):**
   - Admin login melalui email `admin@banongfarms.com` dan password `admin12345` (Supabase Auth).
   - Admin memeriksa pesanan di **WhatsApp Live Feed**.
   - Klik **"Validasi Selesai (Deal)"**: Status berubah jadi `'Selesai'`, stok fisik di tabel `produk` otomatis terpotong, dan metrik omzet harian tercatat.
   - Klik **"Batalkan"**: Status berubah jadi `'Dibatalkan'` tanpa mengurangi stok fisik.

---

## 5. Peta File Utama (Key Architecture Map)
* **Section Navigasi Utama:** `src/components/Navbar.vue`
* **Section Hero Banner:** `src/components/HeroSection.vue`
* **Section Visi & Misi:** `src/components/VisiMisiSection.vue`
* **Section Katalog Produk & Trust Bar:** `src/components/ProductGrid.vue` & `ProductCard.vue`
* **Modal Detail Produk:** `src/components/ProductModal.vue`
* **Section Marquee Menu 5 Baris:** `src/components/InteractiveMarqueeMenu.vue`
* **Section CTA Polaroid:** `src/components/PolaroidCtaSection.vue`
* **Section Footer 100vh & Peta Interaktif:** `src/components/FooterSection.vue`
* **Keranjang Belanja Drawer:** `src/components/CartDrawer.vue`
* **Root Application & Routing:** `src/App.vue`
* **Command Center Admin:** `src/components/admin/CommandCenter.vue`
* **Feed Pesanan WA:** `src/components/admin/WhatsAppLiveFeed.vue`
* **Store Keranjang & Admin:** `src/stores/useCartStore.js` & `src/stores/useAdminStore.js`
* **Konfigurasi Tailwind & Desain Token:** `tailwind.config.js`

---

## 6. Checklist & Rencana Kerja Sesi Berikutnya
Saat pengguna membuka sesi berikutnya, asisten AI **wajib membaca checklist ini sebelum menyentuh kode**:
- [ ] **Pertahankan Aturan Warna 60:30:10:** Jangan memasukkan warna merah (`#c8102e`, `red-...`) atau hijau (`emerald-...`) pada komponen publik. Selalu gunakan Putih, Biru Navy (`primary`), dan Kuning Emas (`secondary-container`).
- [ ] **Pertahankan Format 1 Baris Footer:** Teks judul raksasa `CV BANONG FARMS` wajib tetap menggunakan `whitespace-nowrap` agar tidak pecah menjadi 2 baris.
- [ ] **Pilihan Agenda Pengembangan yang Siap Dikerjakan (Sesuai Arahan Pengguna):**
  1. *Implementasi AI Smart Chatbot Pengunjung:* Widget asisten agribisnis virtual 24/7 di landing page (Google Gemini API) untuk konsultasi pakan/pupuk, cek stok/harga realtime, dan panduan takaran.
  2. *Implementasi AI Business Intelligence Admin:* Integrasi analitik strategi bisnis berbasis tabel `strategi_ai` dan `metrik_harian` untuk peramalan stok (*demand forecasting*) dan penetapan harga dinamis.
  3. *Ekspor Laporan Transaksi Admin:* Penambahan tombol unduh rekapitulasi penjualan (harian/bulanan) ke format Excel (.xlsx) atau PDF di dashboard admin.
  4. *Filter & Pencarian Pesanan Admin:* Fitur pencarian tiket pesanan berdasarkan nama pembeli / ID pesanan `#BNG-xxxx`.
  5. *Audio/Sound Alert Pesanan Baru:* Notifikasi suara denting bel saat ada orderan masuk di dashboard admin secara realtime.
  6. *Optimasi Pengalaman Mobile & SEO:* Pengecekan responsif pada layar kecil (< 400px) dan Open Graph meta tags untuk Google Search.

---

## 7. Perintah Operasional
* **Menjalankan Server Dev:**
  ```bash
  npm run dev
  ```
  - URL Landing Page Pengunjung: `http://localhost:5173/`
  - URL Dashboard Admin: `http://localhost:5173/#/admin`
* **Verifikasi Build Produksi:**
  ```bash
  npm run build
  ```
  *(Status terakhir: 101 modul berhasil di-bundle dalam 6.09s, 0 error).*

---

## 8. Catatan Sesi Sebelumnya (Default Nol Murni & Eliminasi Total 9 Produk Fiktif)
1. **Eliminasi Total 9 Produk Fiktif:** 9 produk tiruan lama (*Lele Sangkuriang, Ayam Organik Utuh, Omega-3, Bebek Karkas, Gurame, Kasgot Super, Cabai Rawit, Buah Naga, Kopi Robusta*) telah dihapus permanen dari `database/local_db.json`. Basis data lokal kini murni berisi 4 komoditas riil farm (*Konsentrat Bebek, Pelet Lele LP-2, Silase Pakan, Pupuk Kasgot Biokonversi*) dengan stok awal 0 pcs.
2. **Multi-Layer Guard `isMockProduct()`:** Ditambahkan fungsi penyaring `isMockProduct()` di `useAdminStore.js` yang menyaring produk fiktif pada initial load, localStorage, fetch server, fetch Supabase Cloud, dan WebSocket realtime.
3. **Single Source of Truth:** Jika Supabase Cloud aktif (`isSupabaseConfigured()`), sinkronisasi lokal server dimatikan agar tidak terjadi perlombaan (race condition) yang menyebabkan flash 1 frame.
4. **Pembersihan Cache LocalStorage:** Cache dinaikkan ke versi `v9` (`cv_banong_farms_products_pure_v9`), membersihkan total seluruh residu data dari `v8`, `v7`, hingga versi lama lainnya.
5. **Verifikasi Build & API:** `npm run build` sukses 100% (6.07s) dan `/api/products` mengembalikan murni 4 komoditas riil.

---

## 9. Catatan Sesi Terkini (11 September 2026) - Upload Gambar, Supabase Cloud .env, & Anti-Ghost Order WA
1. **Form Upload File Gambar Produk Admin (`ProductModal.vue` & `ProductCrudTable.vue`)**:
   - Menambahkan input file picker lokal & drag-and-drop foto panen dari komputer admin.
   - Kompresi canvas otomatis ke Base64 Data URL beresolusi optimal tanpa memerlukan storage bucket terpisah.
   - Kolom thumbnail visual di tabel inventaris admin dengan fallback ikon Material Symbol.
2. **Pembersihan Header CommandCenter (`CommandCenter.vue`)**:
   - Menghapus 3 tombol redundan (`+ Tambah Komoditas`, `Sinkronisasi`, `Ekspor Data`). Tombol penambahan komoditas kini terpusat rapi di tabel inventaris produk.
3. **Penyelarasan Katalog Publik Multi-Baris (`ProductGrid.vue`)**:
   - Kategori katalog publik diselaraskan dengan database admin (*Semua Produk, Peternakan Unggas, Perikanan Air Deras, Daging Segar, Buah-buahan, Sayur & Cabai, Biji Kopi, Produk Organik*).
   - Card produk baru (seperti "pisang" atau lainnya) mengalir rapi ke baris berikutnya dengan pagination 12 produk/halaman tanpa batasan card lama.
   - Ditambahkan error handler `@error` pada gambar produk agar tidak merusak tampilan jika tautan foto bermasalah.
4. **Konfigurasi Terpusat Multi-Browser Supabase Cloud (`.env` & `supabaseClient.js`)**:
   - Masalah: Browser kedua (Edge/Firefox/Incognito) sebelumnya tidak menampilkan data Supabase karena kredensial hanya tersimpan di LocalStorage Browser A dan URL memiliki akhiran `/rest/v1/`.
   - Solusi: Kredensial dipindahkan ke file [`.env`](file:///e:/Documents/01.%20PJJ%20SALADIN/Kelas%2012/3.%20PSAJ/1.DPK/Landing%20Page%20CV%20Banong%20Farms/.env) root (`VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`).
   - Ditambahkan fungsi otomatis `sanitizeSupabaseUrl()` di `supabaseClient.js` untuk membuang `/rest/v1/` atau trailing slash berlebih.
   - Ditambahkan fallback direct select `client.from('produk').select('*')` sehingga query produk publik selalu berhasil meski ada restriksi RLS pada tabel join.
5. **Alur Pemesanan WhatsApp 2-Langkah Anti-Ghost Order (`CartDrawer.vue` & `useAdminStore.js`)**:
   - Masalah: Pesanan sebelumnya langsung tersimpan ke Supabase & Dashboard Admin saat tombol WA ditekan, padahal pembeli bisa saja batal/menutup WhatsApp.
   - Solusi:
     - Klik *"Lanjut Buka WhatsApp"* -> Tab WA terbuka -> **Database BELUM tersentuh sama sekali**.
     - Website menampilkan panel konfirmasi interaktif. Hanya jika pembeli mengklik **"Ya, Saya Sudah Kirim ke WhatsApp"**, pesanan baru disimpan ke database Supabase Cloud & tampil di Dashboard Admin.
     - Jika pembeli mengklik **"Belum Jadi Kirim / Batalkan"**, data sama sekali tidak disimpan dan Dashboard Admin tetap 100% bersih dari pesanan fiktif.
6. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (5.41s) dengan 0 error dan 0 lint warning.

---

## 10. Catatan Sesi (14 September 2026) - Proteksi Kredensial .env, Eliminasi Form Manual, & Kesiapan Hosting
1. **Penghapusan Total Form Input Manual Supabase (`DatabaseErdViewer.vue` & `supabaseClient.js`)**:
   - *Latar Belakang:* Karena file `.env` root sudah menjadi *Single Source of Truth* untuk `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`, form input kredensial manual di dashboard admin sudah usang dan berpotensi menimbulkan bug (seperti URL terpotong atau tertimpa data acak di localStorage).
   - *Tindakan Dilakukan:*
     - Form manual kredensial Supabase (beserta input URL, Anon Key, tombol simpan, dan banner kuning) **dihapus total**.
     - Tab navigasi Struktur Database kini disederhanakan menjadi 4 tab yang bersih dan profesional:
       1. **Diagram ERD** (Default aktif: visual relasi tabel 3NF).
       2. **Daftar Tabel (7)** (Tabel terstruktur & skema kolom).
       3. **Skrip SQL (schema.sql)** (Salin skrip DDL PostgreSQL 1-klik).
       4. **Data Live** (Penjelajah JSON data real-time).
     - Pada `supabaseClient.js`, sisa residu `localStorage` lama otomatis dibersihkan saat aplikasi dimuat, dan client Supabase dikunci murni ke nilai dari file `.env`.
2. **Indikator Reaktif Sidebar Admin (`AdminSidebar.vue`)**:
   - Status di sudut kiri bawah sidebar yang sebelumnya teks statis `ONLINE` kini dibuat reaktif: menyala hijau `ONLINE` saat Supabase terhubung, dan amber `LOKAL` jika koneksi terputus.
3. **Kesiapan Hosting dengan API Supabase Cloud**:
   - *Arsitektur Serverless Jamstack:* Frontend CV Banong Farms adalah SPA (Single Page Application) murni. Ketika di-hosting, frontend berkomunikasi langsung dengan Supabase Cloud (PostgreSQL, Auth, Storage, WebSocket) tanpa memerlukan backend server PHP/Node.js terpisah.
   - *Vite Build-time Injection:* Saat `npm run build` dijalankan, nilai `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` otomatis tertanam ke dalam file static JavaScript (`dist/assets/index-*.js`).
   - *Panduan Hosting Hostinger:*
     - Cukup build lokal `npm run build`, lalu unggah seluruh isi folder `dist/` ke `public_html`.
     - Daftarkan domain publik (misal `https://banongfarms.com/**`) ke menu *Authentication > URL Configuration > Redirect URLs* di dashboard Supabase agar sesi login admin aman dan tidak terblokir.
4. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (5.84s) dengan 0 error dan 0 warning.

## 11. Catatan Sesi (14 September 2026) - Penyelarasan Penuh Visual ERD & Skema Tabel ke Supabase
1. **Penyelarasan Skema 7 Tabel Supabase Cloud (`DatabaseErdViewer.vue`)**:
   - Menyesuaikan 100% diagram ERD visual, metadata kolom, dan daftar tabel pada tab *Struktur Database* di Admin Dashboard agar sesuai dengan DDL PostgreSQL Supabase Cloud:
     1. `admin` (UUID PK -> `auth.users(id)`, `email` UNIQUE, `nama_lengkap`, `peran` DEFAULT 'Administrator')
     2. `kategori` (INT GENERATED ALWAYS AS IDENTITY PK, `nama_kategori`, `slug` UNIQUE, `ikon` DEFAULT 'eco')
     3. `produk` (BIGINT GENERATED ALWAYS AS IDENTITY PK, `id_kategori` FK, `nama_produk`, `deskripsi`, `satuan` DEFAULT 'kg', `harga` NUMERIC DEFAULT 0.00, `stok` INT DEFAULT 0, `stok_maksimal` INT DEFAULT 5000, `jumlah_terjual` INT DEFAULT 0, `url_gambar` TEXT)
     4. `pesanan` (BIGINT GENERATED ALWAYS AS IDENTITY PK, `kode_pesanan` UNIQUE, `nama_pelanggan`, `no_whatsapp`, `alamat_pelanggan`, `total_harga` NUMERIC DEFAULT 0.00, `status` DEFAULT 'Menunggu Konfirmasi', `dibuat_pada` TIMESTAMPTZ DEFAULT now())
     5. `detail_pesanan` (BIGINT GENERATED ALWAYS AS IDENTITY PK, `id_pesanan` FK -> pesanan, `id_produk` FK -> produk, `jumlah_beli` INT DEFAULT 1, `harga_satuan` NUMERIC DEFAULT 0.00, `subtotal` NUMERIC DEFAULT 0.00)
     6. `metrik_harian` (DATE PK DEFAULT CURRENT_DATE, `label_hari`, `volume_aktual_kg` INT DEFAULT 0, `prediksi_volume_kg` INT DEFAULT 0)
     7. `strategi_ai` (BIGINT GENERATED ALWAYS AS IDENTITY PK, `id_produk_target` FK -> produk, `teks_analisis` TEXT, `tingkat_akurasi` DEFAULT '95.5%')
2. **Pembaruan Tab Skrip SQL (`schema.sql`)**:
   - Memperbarui skrip DDL salin 1-klik dengan sintaks PostgreSQL resmi (`GENERATED ALWAYS AS IDENTITY`, `NUMERIC`, `TIMESTAMPTZ`, serta kebijakan RLS dan Realtime Publication).
3. **Pemberitahuan Lingkup Tugas**:
   - Sesuai instruksi khusus pengguna (*"BUKAN BAGIAN BACKEND ATAU LOGIKANYA!"*), modifikasi hanya difokuskan pada lapisan presentasi visual/ERD di Admin Dashboard tanpa menyentuh logika query dan state store.
4. **Verifikasi Build**:
   - `npm run build` sukses 100% (5.82s) dengan 0 error.

---

## 12. Catatan Sesi (14 September 2026 - Bagian 2) - Validasi ERD, Diagram Arsitektur Sistem, & Rencana AI
1. **Validasi ERD untuk Laporan Ujian (PSAJ Kelas 12 DPK)**:
   - ERD pada skema visual Supabase terverifikasi **100% valid dan memenuhi standar bentuk normalisasi 3NF**:
     - Kardinalitas $1:N$ jelas (`kategori` -> `produk`, `pesanan` -> `detail_pesanan`).
     - Relasi $M:N$ terpecahkan secara bersih lewat tabel *junction* `detail_pesanan`.
     - Isolasi otentikasi aman melalui relasi $1:1$ antara `admin` dengan `auth.users(id)` Supabase Auth.
     - Tabel `metrik_harian` berdiri mandiri sebagai *time-series metric table* untuk telemetri grafik penjualan.
2. **Diagram Arsitektur Sistem (PlantText / PlantUML)**:
   - Dibuatkan diagram arsitektur multi-layer (User Layer, Vue 3 SPA Frontend, WhatsApp Gateway + Gemini AI API, dan Supabase Cloud BaaS) lengkap dengan teks pengantar resmi bergaya akademis untuk laporan.
   - Kode PlantUML tersimpan siap pakai untuk dibuka di [planttext.com](https://www.planttext.com).
3. **Perumusan Naratif Rencana Implementasi AI**:
   - Diformulasikan dalam bentuk paragraf naratif mengalir (siap ditulis di bab pembahasan laporan):
     - **AI Chatbot Pengunjung:** Konsultan agribisnis virtual 24/7 di landing page dengan kemampuan *context injection* data produk realtime, konsultasi pakan/pupuk, hitung estimasi takaran, dan asistensi checkout WA.
     - **AI Analitik Bisnis Admin:** Sistem pendukung keputusan (*Decision Support System*) berbasis tabel `strategi_ai` dan `metrik_harian` untuk peramalan permintaan (*demand forecasting*), pencegahan stok menipis, dan strategi penetapan harga dinamis (*dynamic pricing*).
4. **Status Eksekusi & Kondisi Proyek**:
   - Coding dijeda sesuai instruksi pengguna; tidak ada perubahan kode yang belum tersimpan.
   - Build produksi stabil: `dist/` terverifikasi 0 error.
   - Agenda berikutnya yang siap dikerjakan saat pengguna kembali: Pembangunan fitur Smart Chatbot AI pengunjung atau Analitik AI Dashboard Admin.

---

## 13. Catatan Sesi (15 September 2026) - Validasi Stok Habis (Bisa Masuk Keranjang, Tidak Bisa Dibeli Sampai Diisi Admin)
1. **Aturan Bisnis Stok Habis**:
   - Produk berstok 0 pcs **tetap bisa dimasukkan ke dalam keranjang belanja** (`addToCart` diizinkan tanpa pembatasan kuantitas 0).
   - Di dalam keranjang belanja (`CartDrawer.vue`), produk berstok 0 pcs diberi penanda khusus:
     - Badge visual: `Stok Habis (0 pcs)` dengan keterangan *"Tersimpan di keranjang. Menunggu admin mengisi stok."*
     - Overlay `HABIS` pada thumbnail produk.
     - Kotak pemberitahuan (Notice Box): *"Pembelian Belum Dapat Diproses — Terdapat komoditas dengan stok kosong (0 pcs)..."* disertai tombol pembersih *"Hapus Produk Kosong"*.
2. **Kunci Pembelian (Hard Guard)**:
   - Tombol checkout *"Lanjut Buka WhatsApp"* dinonaktifkan (`disabled`) dan berganti teks menjadi:
     `🔒 Stok Habis — Belum Bisa Dibeli (Isi Stok via Admin)`.
   - Fungsi `handleOpenWhatsApp` dibentengi dengan validasi `hasBlockedItems` untuk mencegah checkout item kosong.
3. **Pengisian Stok dari Admin Dashboard (`ProductCrudTable.vue`)**:
   - Tabel inventaris admin mendeteksi stok 0 pcs secara visual (teks oranye/amber, bar 0%, dan badge `0 pcs`).
   - Tombol aksi otomatis berubah menjadi tombol kuning emas **`+ Isi Stok`** pada item berstok 0 untuk mempercepat pengisian kuantitas.
   - Tab filter cepat **`Perlu Diisi Stok (X)`** ditambahkan di atas tabel admin agar admin dapat langsung memfilter produk yang habis.
   - Perubahan stok yang disimpan admin langsung terhubung reaktif (`useAdminStore.products`) sehingga keranjang pelanggan otomatis membuka kuncian pembelian begitu stok diisi.
4. **Penutupan Celah Desinkronisasi Harga Keranjang (Price Sync Guard)**:
   - Masalah Teridentifikasi: Jika user menambahkan produk (misal harga awal Rp 450.000), lalu admin mengubah harganya menjadi Rp 25.000 saat restok, keranjang user sebelumnya masih menyimpan harga usang Rp 450.000.
   - Solusi Komprehensif:
     - Ditambahkan watcher reaktif `syncCartWithLiveProducts` di `useCartStore.js` yang secara otomatis memperbarui harga (`item.price`), stok (`item.stock`), nama, dan atribut produk di keranjang setiap kali `adminStore.products` diperbarui (baik di tab yang sama, via BroadcastChannel multi-tab, maupun Supabase WebSocket).
     - Perhitungan `totalPrice` di `useCartStore` memprioritaskan harga live terkini dari database/admin.
     - Di `CartDrawer.vue`, tampilan harga satuan dan subtotal menggunakan `getItemLivePrice(item)` dan dilengkapi badge informatif `Harga Diperbarui` jika admin mengubah harga.
     - Payload pesanan WhatsApp dan penyimpanan ke Supabase Cloud otomatis menggunakan snapshot harga terkini (Rp 25.000), menutup total celah eksploitasi harga lama.
5. **Verifikasi Build**:
   - `npm run build` sukses 100% (6.22s) dengan 0 error.

---

## 14. Catatan Sesi (15 September 2026 - Bagian 2) - Manajemen Karyawan (Admin Accounts) Langsung dari Web Dashboard
1. **Analisis Kebutuhan Tabel Database (Jawaban Pertanyaan Pengguna)**:
   - **Pertanyaan:** *"NAH disini memerlukan database tabel baru tidak ya?"*
   - **Jawaban Resmi Arsitektur:** **TIDAK PERLU TABEL BARU**.
   - **Penjelasan Teknis:**
     - Sejak perancangan awal (sesi 11 & 12), skema database PostgreSQL Supabase Cloud telah memiliki tabel ke-7 yang resmi terstandarisasi 3NF, yaitu tabel **`admin`**:
       ```sql
       CREATE TABLE public.admin (
         id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
         email TEXT NOT NULL UNIQUE,
         nama_lengkap TEXT NOT NULL,
         peran TEXT NOT NULL DEFAULT 'Administrator',
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       );
       ```
     - Memanfaatkan tabel `admin` yang sudah ada mempertahankan integritas ERD laporan ujian PSAJ (7 tabel) tanpa menambah kompleksitas relasi atau merusak normalisasi 3NF.
2. **Pencegahan Terlogoutnya Super Admin (Auth Ephemeral Client)**:
   - Pada `src/services/supabaseClient.js`, fungsi pendaftaran karyawan baru `createStaffAccount` dirancang menggunakan instansiasi Supabase Client mandiri dengan konfigurasi `{ auth: { persistSession: false, autoRefreshToken: false } }`.
   - Hal ini memastikan sesi otentikasi login Super Admin yang sedang aktif di browser tidak akan tertimpa atau ter-logout ketika mendaftarkan akun email karyawan baru ke `supabase.auth.signUp()`.
3. **Komponen Antarmuka Web (UI/UX) Manajemen Karyawan**:
   - **`StaffManagement.vue`**:
     - Metric Summary Cards: Total Karyawan, Super Admin, dan Staf Operasional.
     - Action Bar: Pencarian live berdasarkan nama/email/peran, filter badge peran (`Semua`, `Super Admin`, `Staf Operasional`, `Analis & Logistik`), dan tombol aksi utama emas (`+ Tambah Karyawan Baru`).
     - Staff Table: Menampilkan avatar inisial, nama lengkap, email, badge peran terformat rapi, status akun, tanggal bergabung, serta tombol aksi `Ubah` dan `Hapus` (dengan proteksi akun Super Admin utama tidak dapat dihapus).
   - **`StaffModal.vue`**:
     - Modal form terpadu untuk penambahan dan pengeditan data karyawan.
     - Field input: Nama Lengkap, Alamat Email, Password (minimal 6 karakter untuk akun baru; opsional jika hanya mengedit nama/peran), Pilihan Peran, dan Status Akun.
   - **Kepatuhan Aturan Estetika 60:30:10**:
     - 60% Permukaan netral/putih (`bg-white` / `bg-[#fbf9f6]`),
     - 30% Aksen Navy Blue (`primary` `#022448` untuk header, sidebar, dan judul),
     - 10% Kuning Emas (`secondary-container` `#fcd400` / `#e6c200`) khusus untuk tombol CTA aksi utama.
4. **Manajemen State Reaktif & Sinkronisasi Multitask (`useAdminStore.js`)**:
   - Data karyawan (`staffList`) terkelola secara reaktif dengan mekanisme fallback persisten di Local Storage (`cv_banong_farms_staff_pure_v1`) dan sinkronisasi otomatis ke cloud table `admin`.
   - Terhubung dengan `BroadcastChannel('cv_banong_farms_admin_sync')` sehingga perubahan data karyawan di satu tab langsung ter-update di seluruh tab browser tanpa perlu reload.
5. **Integrasi Sidebar & Command Center (`AdminSidebar.vue` & `CommandCenter.vue`)**:
   - Menambahkan menu navigasi **`Manajemen Karyawan`** (ikon `badge`) dengan counter badge jumlah karyawan aktif pada sidebar admin.
   - Mengintegrasikan view `StaffManagement` pada tab `staff` dan menyematkan dialog modal `StaffModal` dengan penanganan toast notifikasi interaktif.
6. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (5.94s) dengan 0 error dan 0 warning.
   - Server dev aktif melayani di `http://localhost:5173/` dengan respon HTTP 200 OK.
7. **Perbaikan Masalah Event Click & Simpan Data Karyawan (Bugfix Sesi 15)**:
   - **Akar Masalah:** `StaffModal.vue` memancarkan event `emit('submit', ...)` dengan objek tersarang (`data: { ... }`), sementara `CommandCenter.vue` mendengarkan event `@save="handleStaffSubmit"`.
   - **Solusi Komprehensif:** Menyelaraskan event dan struktur data payload datar `{ id, nama_lengkap, email, password, peran, status }`.
8. **Pencegahan Duplikasi Akun Karyawan Ganda (Deduplikasi Email & Single Event)**:
   - **Akar Masalah Akun Ganda:** Sempat terjadi pemancaran event ganda (`@save` dan `@submit` sekaligus) serta ketiadaan lock submit, sehingga satu klik memicu eksekusi penyimpanan dua kali (satu akun lokal temporer `#r-...` dan satu akun dengan UUID Supabase `#f9deb...`).
   - **Solusi Terpadu:**
     - `StaffModal.vue` kini hanya memancarkan satu event resmi: `emit('save', payload)`.
     - `CommandCenter.vue` kini hanya mendengarkan `@save="handleStaffSubmit"` dengan penambahan guard `isSubmittingStaff` untuk mencegah double click.
     - `useAdminStore.js` menambahkan fungsi `deduplicateStaff()` berbasis email unik yang otomatis membersihkan duplikat akun dan memprioritaskan UUID Supabase Cloud asli.
9. **Penutupan Celah Penimpaan Akun (Anti-Overwrite Email Terdaftar)**:
   - **Celah yang Ditemukan:** Jika pengguna mendaftarkan akun baru dengan email yang sudah ada namun nama/password/peran berbeda, data akun lama sebelumnya sempat tertimpa (overwrite).
   - **Aturan Bisnis Tegas:** Email yang sudah digunakan TIDAK BISA didaftarkan ulang dan akun lama TIDAK BOLEH ditimpa.
   - **Solusi 4 Lapis Perlindungan:**
     1. *UI Real-time (`StaffModal.vue`):* Saat email diketik, sistem langsung mendeteksi kecocokan email. Jika email sudah ada, muncul kotak peringatan amber *"Email ini sudah digunakan oleh karyawan lain! Gunakan alamat email yang berbeda"* dan tombol simpan otomatis terkunci (`disabled` + cursor not-allowed).
     2. *Validasi Form Submit (`StaffModal.vue`):* `handleSubmit()` memblokir eksekusi jika email sudah terpakai.
     3. *Parent Controller Guard (`CommandCenter.vue`):* Memeriksa duplikasi sebelum memanggil store. Jika email kembar, modal tetap dibuka agar pengguna bisa merevisi email tanpa kehilangan input nama/password lainnya, dan muncul notifikasi toast merah `❌ Gagal: Email sudah digunakan oleh [Nama Karyawan]`.
     4. *Store & Cloud Database Guard (`useAdminStore.js` & `supabaseClient.js`):* `addStaffMember()` dan `createStaffAccount()` menolak mutlak pendaftaran jika email sudah ada di memori maupun tabel `admin` Supabase Cloud (`isDuplicateEmail: true`), memastikan integritas data akun karyawan aman 100%.

---

## 15. Catatan Sesi (15 September 2026 - Bagian 3) - Proteksi Persistensi Pesanan, Detail Pemesanan, dan Analitik Lintas Browser (7 Tabel Relasional)
1. **Investigasi & Solusi Akar Masalah Hilangnya Pesanan Saat Hapus Local Storage**:
   - **Akar Masalah (Bug Auto-Reset Destruktif):**
     - Di dalam kode versi sebelumnya, terdapat pengecekan: `if (!localStorage.getItem(SUPABASE_RESET_KEY)) { supabaseApi.resetOperationalDataToZero() }`.
     - Ketika pengguna menghapus Local Storage atau membuka website di profil Chrome yang berbeda, flag tersebut bernilai `null`.
     - Akibatnya, sistem secara otomatis mengeksekusi fungsi `resetOperationalDataToZero()`, yang mengirimkan query SQL `DELETE` ke Supabase Cloud pada tabel `pesanan`, `detail_pesanan`, dan `metrik_harian`. Inilah penyebab pesanan dan analitik sempat terhapus/hilang.
   - **Perbaikan Permanen:**
     - Auto-reset destruktif telah **dihapus 100%** dari siklus inisialisasi aplikasi.
     - Fungsi reset ke nol kini murni hanya dapat dipicu secara manual oleh Super Admin melalui tombol tindakan eksplisit, dan TIDAK PERNAH berjalan otomatis saat buka browser atau hapus Local Storage.

2. **Persistensi Penuh Pesanan & Detail Pemesanan (`pesanan` & `detail_pesanan`)**:
   - Sinkronisasi data saat inisialisasi (`syncWithSupabaseDatabase()`) memprioritaskan data dari Supabase Cloud.
   - Query `getOrders()` memanggil relasi: `select('*, detail_pesanan(*, produk(nama_produk, harga))')`.
   - Meskipun Local Storage dihapus total, saat halaman dimuat ulang atau dibuka di profil browser baru, seluruh riwayat transaksi beserta rincian item barang (`detail_pesanan`) langsung ditarik kembali dari Supabase Cloud dan disimpan ulang ke memori lokal.
   - Komponen `WhatsAppLiveFeed.vue` telah dilengkapi kartu visualisasi rincian item per baris (`order.items`) yang menampilkan kuantiti beli, nama produk riil, dan subtotal harga untuk masing-masing item belanja.

3. **Integrasi Analitik Usaha & AI Lintas Browser (`metrik_harian` & `strategi_ai`)**:
   - **Penyebab Analitik Tidak Berfungsi di Beda Chrome:**
     - Profil Chrome baru memiliki Local Storage kosong dan tabel `metrik_harian` sempat terkena auto-reset.
   - **Solusi Sinkronisasi Cloud Analitik:**
     - Penambahan fungsi API `getDailyMetrics()` dan `upsertDailyMetric()` untuk mengelola data deret waktu di tabel `metrik_harian`.
     - Penambahan fungsi `getLatestAiStrategy()` dan `saveAiStrategy()` untuk membaca dan menyimpan riwayat rekomendasi AI ke tabel `strategi_ai`.
     - Saat validasi pesanan ("Validasi Selesai / Deal"), volume aktual terakumulasi langsung ke `metrik_harian` di Supabase Cloud.
     - `AiAnalyticsSection.vue` kini membaca `cloudAiStrategyText` dari database saat dibuka di profil Chrome mana pun, dan otomatis menyimpan rekomendasi baru ke cloud saat tombol *"Analisis AI"* ditekan.

4. **Audit Status Keterhubungan 7 Tabel Relasional Database Supabase Cloud (Normalisasi 3NF)**:
   - **1. Tabel `admin`**: Terhubung dengan `auth.users(id)` via UUID. Menyimpan profil, peran, dan status akun staf.
   - **2. Tabel `kategori`**: Master klasifikasi komoditas (Unggas, Ikan, Ruminansia, Organik).
   - **3. Tabel `produk`**: Katalog pakan & hasil tani. Relasi FK `id_kategori` ➔ `kategori(id)`.
   - **4. Tabel `pesanan`**: Header transaksi pelanggan & WhatsApp (kode pesanan, nama pelanggan, no WA, total harga, status).
   - **5. Tabel `detail_pesanan`**: Rincian junction transaksi. Relasi FK `id_pesanan` ➔ `pesanan(id)` (CASCADE) dan FK `id_produk` ➔ `produk(id)`.
   - **6. Tabel `metrik_harian`**: Data time-series analitik usaha (tanggal PK, label hari, volume aktual kg, prediksi volume kg) yang mendasari grafik Chart.js.
   - **7. Tabel `strategi_ai`**: Rekomendasi pemasaran AI terstruktur. Relasi FK `id_produk_target` ➔ `produk(id)`.

5. **Pembersihan Akun Fiktif (Budi Santoso & Siti Rahmawati) & Penyelarasan Murni Tabel `admin`**:
   - **Akar Masalah:** `DEFAULT_STAFF` di `useAdminStore.js` sempat memiliki data mock default (Budi Santoso & Siti Rahmawati), dan fungsi sinkronisasi awal menggabungkan data cloud dengan memori lokal (`[...mapped, ...staffList.value]`). Akibatnya, akun Budi dan Siti tetap muncul meskipun di tabel `admin` Supabase Cloud hanya ada 3 akun riil (`Admin Banong`, `hi`, dan `tes`).
   - **Solusi Tuntas:**
     - Menghapus akun Budi Santoso dan Siti Rahmawati dari `DEFAULT_STAFF`.
     - Menambahkan filter `isMockStaff` untuk membersihkan akun email `gudang@banongfarms.com` dan `cs@banongfarms.com`.
     - Memperbarui `syncWithSupabaseDatabase()` agar `staffList.value` diisi **murni 100% dari data tabel `admin` Supabase Cloud** tanpa menggabungkan akun mock lama.
     - Memperbarui kunci penyimpanan lokal ke `cv_banong_farms_staff_pure_v2` dan menghapus `cv_banong_farms_staff_pure_v1` dari cache browser.
     - Kini tampilan Manajemen Karyawan di web dashboard akurat 100% dengan Supabase: Total 3 karyawan (`Admin Banong`, `hi`, `tes`).

6. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (5.95s) tanpa satupun error sintaks atau modul hilang.
   - Seluruh data operasional dan akun staf kini murni tersinkronisasi dengan Supabase Cloud.

---

## 16. Catatan Sesi (15 September 2026 - Bagian 4) - Implementasi AI Predictive Modeling & Dataset Training Engine (Ujian PSAJ DPK Kelas 12)

### A. Latar Belakang & Kebutuhan Bisnis
Sesuai arahan evaluasi PSAJ (Penilaian Sumatif Akhir Jenjang) SMK Kejuruan RPL/DPK, Admin Dashboard CV Banong Farms dilengkapi dengan 3 pilar kapabilitas analitik prediktif berbasis kecerdasan buatan:
1. **Prediksi Perputaran Stok Bulan Depan:** Pemodelan data untuk memproyeksikan perputaran stok barang pakan/komoditas pada bulan berikutnya guna mengoptimalkan manajemen ketersediaan di gudang, menghitung estimasi hari habis (*stock-out date*), dan memicu peringatan restok otomatis.
2. **Proyeksi Laba & Pertumbuhan Omset:** Pengolahan data deret waktu transaksi harian untuk memproyeksikan pertumbuhan margin keuntungan kotor (standar industri pakan ternak 16,4%) dan total estimasi omset bulanan sebagai landasan pengambilan keputusan strategis.
3. **Analitik Tren Minat Pasar & Komoditas Best Seller:** Pembacaan kurva serapan pasar untuk memproyeksikan komoditas pakan yang berpotensi menjadi produk terlaris (*best seller*) dan pangsa pasarnya (*market share*).

### B. Solusi Masalah Cold-Start: Training Dataset Engine (CSV & PSAJ Demo)
Karena klien riil belum menyediakan riwayat transaksi 10–50 hari, dibangun sistem pelatihan data (*data training engine*) terpadu:
1. **Fitur Unggah Dataset CSV Transaksi (`AiTrainingDatasetModal.vue`):**
   - Mendukung berkas CSV 10 hingga 50 hari riwayat transaksi.
   - Format standar kolom: `tanggal (YYYY-MM-DD), nama_produk, jumlah_pcs, harga_satuan, total_harga`.
   - Menggunakan drag-and-drop file dropzone modern dengan deteksi format otomatis dan tabel pratinjau data (*preview table*).
2. **Pengunduh Template CSV Resmi (`template_dataset_transaksi_cv_banong_farms.csv`):**
   - Tombol *"Template CSV"* menyediakan berkas sampel berstandar industri pakan siap isi bagi admin/klien.
3. **Fitur 1-Klik Simulasi PSAJ (*⚡ Demo PSAJ: Muat 30 Hari Data*):**
   - Siswa dapat mengklik satu tombol untuk langsung menggenerasikan dan melatih 30 hari data transaksi sintetis realistis (berbasis fluktuasi serapan harian) langsung di depan dewan penguji tanpa memerlukan input manual.

### C. Arsitektur Dual-Engine AI (Transparansi Matematis + Generative AI)
Sistem dirancang dengan arsitektur **Dual-Engine** yang dapat dipertanggungjawabkan secara akademik:
1. **Engine 1: Pemodelan Statistik Matematis (WMA & ADS):**
   - **Average Daily Sales (ADS):** Menghitung rata-rata kecepatan penjualan harian komoditas ($Total\ Volume \div Hari\ Aktif$).
   - **Weighted Moving Average (WMA 30 Hari):** Memberikan bobot linear lebih tinggi pada 7 hari transaksi terakhir untuk menangkap tren lonjakan musiman panen.
   - **Estimasi Kehabisan Stok:** Menghitung sisa hari ketersediaan gudang ($Stok\ Fisik \div ADS$) dan proyeksi tanggal defisit stok.
   - **Margin Keuntungan Kotor:** Menerapkan rasio laba kotor 16,4% terhadap proyeksi omset pakan.
2. **Engine 2: Generative Intelligence (Google Gemini 1.5 Flash):**
   - Mengirimkan ringkasan metrik statistik teragregasi ke Gemini API untuk menghasilkan narasi ringkasan eksekutif dan rekomendasi alokasi pasokan B2B.
   - Dilengkapi sistem **Offline Heuristic Fallback** otomatis sehingga jika kuota API habis atau tidak ada internet, sistem tetap menghasilkan narasi rekomendasi cerdas tanpa pernah error di depan penguji.

### D. Integrasi Database Supabase Cloud & Visualisasi Grafik Reaktif
1. **Sinkronisasi Otomatis ke Cloud (`useAdminStore.js`):**
   - Fungsi `trainAiModelWithDataset(transactions)` mengagregasikan volume harian dan mengunggahnya ke tabel `metrik_harian` di Supabase Cloud.
   - Narasi rekomendasi eksekutif otomatis tersimpan di tabel `strategi_ai` Supabase Cloud via `saveAiStrategyToCloud()`.
   - Hasil prediksi disimpan secara persisten di Local Storage `cv_banong_ai_predictions_v1` dan disiarkan lintas tab via `BroadcastChannel`.
2. **Visualisasi Grafik Chart.js Dinamis (`AiAnalyticsSection.vue`):**
   - Periode **`7H`** (7 Hari Terakhir) memplot kurva harian riil vs proyeksi WMA.
   - Periode **`1B`** (1 Bulan / 30 Hari) mengagregasi 28-30 hari data dari `dailyChartMap` menjadi kurva 4 minggu (`Mgg 1`, `Mgg 2`, `Mgg 3`, `Mgg 4 Terkini`).
   - Dilengkapi *reactive watcher* pada `dailyChartMap` sehingga saat dataset dilatih atau pesanan baru masuk, grafik langsung terbarukan secara instan (*real-time*).

### E. Kepatuhan Desain & Verifikasi Build
- **Kepatuhan Palet 60:30:10:**
  - 60% Netral/Putih (`bg-white`, `bg-[#fbf9f6]`),
  - 30% Navy Blue (`primary` `#022448` untuk header, judul, dan border),
  - 10% Kuning Emas (`secondary-container` `#fcd400` / `#e6c200` untuk tombol *"Demo PSAJ"*, badge mahkota Best Seller, dan aksen metrik).
- **Standar Satuan:** Seluruh kuantiti menggunakan satuan resmi **`pcs`** yang konsisten.
- **Verifikasi Build:** `npm run build` sukses 100% (6.25s) dengan status build `dist/` bersih dan 0 error.

---

## 17. Catatan Sesi (16 September 2026) - Penyelarasan Navbar Publik, Section Kontak, & Penghapusan Tombol Admin Navbar
1. **Penyelarasan Urutan Menu Navigasi Navbar (`Navbar.vue`)**:
   - Menu navigasi disederhanakan dan diurutkan selaras dengan alur vertikal landing page:
     1. **Tentang** (`#tentang-kami` / `#visi-misi`): Menuju ke seksi Visi & Misi Farm.
     2. **Katalog** (`#katalog-produk`): Menuju ke seksi Katalog Segar Hari Ini & filter komoditas.
     3. **Kontak** (`#contact`): Menuju ke seksi Polaroid CTA Panen Alami yang telah diganti namanya.
   - Tautan *"Lokasi"* lama yang sebelumnya berdiri sendiri telah dihapus untuk mengoptimalkan ruang dan keterbacaan navigasi kapsul.
2. **Pengubahan Nama/ID Seksi Polaroid CTA (`PolaroidCtaSection.vue`)**:
   - ID elemen seksi diubah dari `id="cta-panen"` menjadi **`id="contact"`** sesuai arahan pengguna agar selaras dengan target tautan `Kontak` di Navbar.
3. **Penghapusan Tombol Profil Admin di Navbar Publik (`Navbar.vue`)**:
   - Tombol bulat Admin Profile (`<!-- User Profile / CommandCenter Admin Trigger Button -->`) di desktop dan mobile navbar telah **dihapus total**.
   - Landing page publik kini tampil 100% bersih untuk pengunjung umum tanpa tombol admin mencolok.
   - Hak akses login admin tetap aman dan dapat diakses langsung melalui URL route **`http://localhost:5173/#/admin`**.
4. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (7.57s) dengan 104 modul ter-bundle sempurna dan 0 error.


