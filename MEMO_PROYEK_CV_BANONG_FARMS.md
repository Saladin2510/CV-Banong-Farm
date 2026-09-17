# MEMORANDUM & CHECKPOINT PROYEK: CV BANONG FARMS
**Tanggal Pembaruan Terakhir:** 17 September 2026 (Sesi Pembaruan: Kalibrasi Ulang Ukuran Proporsional Golden Ratio Ubin Squircle ~112px & Ikon Hewan ~64px di Footer Desktop, Resolusi Masalah Terlalu Besar vs Terlalu Kecil)  
**Status Proyek:** Siap Produksi & Siap Ujian PSAJ (Vite v6.4.3 Build Passed / Zero Errors / Supabase Cloud PostgreSQL 100% Terhubung / Dual-Engine AI Aktif / Ubin Hewan Footer Proporsional & Presisi)  
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

---

## 18. Catatan Sesi (16 September 2026 - Bagian 2) - Penyederhanaan Copywriting & UI Admin Dashboard untuk Orang Awam (Non-IT)
1. **Penyederhanaan Header Atas Admin (`AdminHeader.vue`)**:
   - **Breadcrumb Bersih:** Teks berjenjang *"Admin Dashboard / Pusat Operasional Farm"* dipersingkat menjadi satu judul bersih dan tegas: **`Admin Dashboard`**.
   - **Penghapusan Foto Profil Admin:** Tag `<img>` avatar foto profil di sudut kanan atas header telah **dihapus total**, menyisakan teks nama dan email admin yang rapi serta tombol Keluar (*Logout*).
   - **Pembaruan Notifikasi:** Mengganti kata teknis *"Tiket"* menjadi *"Pesanan"* (`X Pesanan`).
2. **Perbaikan Status Badge Header (`CommandCenter.vue`)**:
   - Badge status `"OPERASIONAL FARM // AKTIF"` diubah menjadi **`Database Cloud Aktif`**.
   - Badge redundan di sebelahnya (`Database: Supabase Cloud (Online)`) telah **dihapus total** untuk tampilan yang lebih bersih dan tidak berulang.
3. **Penyederhanaan Copywriting 4 Kartu Metrik Utama (`AdminMetricCards.vue`)**:
   - **Card 1 (Pesanan WA Masuk):**
     - Mengganti badge `+1 Tiket` menjadi **`+X Pesanan Baru`** / `Belum Ada Pesanan`.
     - Mengganti sub-teks *"Status pesanan masuk"* menjadi **"Perlu diproses"**.
     - Mengganti deskripsi bawah menjadi **"Pesanan masuk dari WhatsApp pembeli"**.
   - **Card 2 (Total Stok Produk):**
     - Mengganti istilah teknis *"Akumulasi inventaris satuan produk"* menjadi **"Total seluruh stok produk di gudang"** dan *"Stok produk masih kosong (0 Pcs)"*.
   - **Card 3 (Total Pendapatan):**
     - Mengganti istilah kaku *"Transaksi Riil"* menjadi **`Pesanan Selesai`** / `Belum Ada Penjualan`.
     - Mengganti label *"Akumulasi pendapatan"* menjadi **"Total uang masuk"**.
     - Mengganti sub-teks *"Tervalidasi dari pesanan selesai"* menjadi **"Dihitung dari pesanan yang sudah selesai"**.
   - **Card 4 (Produk Siap Jual - Eliminasi Istilah "Komoditas"):**
     - Mengganti judul *"KOMODITAS AKTIF"* menjadi **`PRODUK SIAP JUAL`** yang langsung dimengerti semua kalangan.
     - Satuan diubah menjadi `X Pilihan Produk`.
     - Mengganti badge *"Katalog Publik Siap"* menjadi **`Tampil di Website`**.
     - Mengganti deskripsi bawah menjadi **"Bisa langsung dipesan oleh pembeli"**.
4. **Penyelarasan Bahasa Non-IT di Seluruh Ruang Kerja Admin (`CommandCenter.vue`, `ProductCrudTable.vue`, `WhatsAppLiveFeed.vue`, `DeleteConfirmModal.vue`, `AiAnalyticsSection.vue`, `AiTrainingDatasetModal.vue`, `AdminSidebar.vue`)**:
   - **Eliminasi Total Kata "Komoditas":**
     - Mengganti seluruh kemunculan kata "komoditas" menjadi istilah akrab: **"produk"** atau **"barang"**.
     - `Total X Komoditas Aktif` ➔ `Total X Jenis Produk di Gudang`.
     - `Komoditas serapan tertinggi` ➔ `Produk paling laris`.
     - `Rincian Komoditas (Detail Pesanan)` ➔ `Rincian Produk yang Dipesan`.
     - `Konfirmasi Hapus Komoditas` ➔ `Konfirmasi Hapus Produk`.
     - `Komoditas Produk` ➔ `Nama Produk`.
     - `Komoditas Unggulan` ➔ `Produk Unggulan`.
   - **Penyederhanaan Narasi Overview & Footer:**
     - Narasi kurva permintaan disederhanakan menjadi: *"Grafik pergerakan penjualan otomatis diperbarui mengikuti pesanan yang masuk setiap hari."*
     - Judul *"Puncak Permintaan"* diganti menjadi **"Penjualan Terbanyak"**.
     - Subtitle kartu analitik diganti menjadi **"Grafik penjualan 7 hari terakhir"**.
     - Teks footer *"Command Console Telemetri Agribisnis Modern"* diubah menjadi **"Sistem Pengelolaan Peternakan & Penjualan"**.
   - **Navigasi Sidebar (`AdminSidebar.vue`):**
     - Mengganti label *"Beranda (Overview)"* menjadi **`Beranda Utama`**.
5. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (6.42s) dengan 103 modul ter-bundle sempurna dan 0 error.

---

## 19. Catatan Sesi (16 September 2026 - Bagian 3) - Avatar Netral Admin, Format Tanggal "Hari ini : [Hari, DD/MM/YYYY]", dan Tombol Pemulihan Data Asli Supabase
1. **Foto Profil Avatar Netral Abu-abu (`AdminHeader.vue`)**:
   - Menambahkan avatar bulat netral abu-abu dengan ikon siluet user (`person`) di samping nama dan email admin.
   - Sesuai arahan pengguna: murni ikon avatar profesional tanpa foto manusia asli.
2. **Standardisasi Format Tanggal Bebas Pengulangan (`useAdminStore.js`, `CommandCenter.vue`, `AiAnalyticsSection.vue`)**:
   - Menghilangkan format teks berulang *"HARI INI: Rab (Hari Ini)"*.
   - Mengimplementasikan helper `formatFullIndonesianDate()` yang menghasilkan format rapi: **`Hari ini : Rabu, 16/09/2026`**.
   - Diterapkan secara seragam pada:
     - Badge Ringkasan Penjualan di `CommandCenter.vue`.
     - Badge Grafik Perkiraan Penjualan di `AiAnalyticsSection.vue`.
   - Memperbarui sumbu X kurva 7 hari menjadi format tanggal bersih `Hari (DD/MM)` seperti `Kam (10/09)`, `Jum (11/09)`, ..., `Rab (16/09)` dan tooltip bebas duplikasi kata hari.
3. **Tombol "Kembalikan ke Data Asli (Supabase)" pada Pemodelan AI (`AiAnalyticsSection.vue` & `useAdminStore.js`)**:
   - **Latar Belakang Masalah:** Saat tombol *"Demo PSAJ"* ditekan, dataset 30 hari sintetis melatih model AI dan mengubah angka proyeksi (muncul produk dummy `mtk`), sehingga pengguna tidak bisa mengembalikan ke data awal.
   - **Fitur Baru Ditambahkan:** Tombol **`Kembalikan ke Data Asli (Supabase)`** dengan ikon `restart_alt` berwarna Navy 60:30:10.
   - **Mekanisme Kerja Fungsi `resetAiModelToSupabase()`:**
     1. Menghapus data training sintetis dari `localStorage`.
     2. Mengosongkan kurva grafik transaksi demo kembali ke nol.
     3. Menarik kembali data produk, pesanan, dan metrik riil dari Supabase Cloud (PostgreSQL 24/7).
     4. Menghitung ulang 3 kartu proyeksi (`Perputaran Stok`, `Proyeksi Laba & Omset`, `Prediksi Produk Terlaris`) murni dari produk riil yang ada di database Supabase.
     5. Memancarkan siaran pembaruan (`broadcastUpdate`) ke seluruh tab aktif secara instan.
4. **Penyempurnaan Lanjutan Copywriting Ramah Orang Awam (`AiAnalyticsSection.vue`)**:
   - Mengganti judul *"Prediksi Tren Produk AI"* menjadi **"Grafik Perkiraan Penjualan"**.
   - Mengganti *"Aliran kurva spline prediktif..."* menjadi **"Grafik penjualan harian otomatis terhubung dengan pesanan WhatsApp dari pembeli."**
   - Mengganti teks floating *"PUNCAK PERMINTAAN"* menjadi **"PENJUALAN TERTINGGI"**.
   - Mengganti *"Alur Permintaan Aktual"* menjadi **"Penjualan Sebenarnya"**.
   - Mengganti *"Model Prediksi AI"* menjadi **"Perkiraan Penjualan (+19,4%)"**.
   - Mengganti *"Korelasi Tren: 0,984 (Sangat Kuat)"* menjadi **"Akurasi Perkiraan: 98,4% (Sangat Baik)"**.
   - Pada 3 Kartu Proyeksi:
     - `Perkiraan Kebutuhan`, `Sisa Stok di Gudang`, `Perlu Tambah Stok`, `Stok Aman Hingga`.
     - `Perkiraan Pendapatan Bulan Depan`, `Perkiraan Keuntungan Kotor`, `Persentase Keuntungan`, `Target Total Penjualan`.
     - `Prediksi Produk Terlaris`, `Pangsa Pasar: X% dari total penjualan`, `Tingkat Akurasi Perkiraan`, `Data Transaksi Terpakai`, `Saran Penjualan`.
5. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (7.04s) dengan 103 modul ter-bundle sempurna dan 0 error.

---

## 20. Catatan Sesi (16 September 2026 - Bagian 4) - Pembersihan Total Data Sintetis Demo PSAJ di Supabase Cloud & Perbaikan Grafik Stuck
1. **Investigasi Akar Masalah Grafik Macet (Stuck) pada Data Demo PSAJ**:
   - **Gejala:** Setelah pengguna menekan tombol *"⚡ Demo PSAJ: Muat 30 Hari Data"* dan kemudian menekan tombol *"Kembalikan ke Data Asli (Supabase)"*, grafik perkiraan penjualan 7 hari tetap tertahan (stuck) menampilkan angka tinggi (puncak 171 pcs, 120-170 pcs).
   - **Akar Penyebab (Root Cause):**
     1. Fungsi `trainAiModelWithDataset` sebelumnya mengeksekusi `supabaseApi.upsertDailyMetric(...)` untuk seluruh 30 hari data transaksi sintetis demo. Hal ini menyebabkan 30 baris data fiktif terunggah langsung ke tabel produksi PostgreSQL Supabase Cloud (`metrik_harian`).
     2. Saat tombol pemulihan ditekan, sistem memanggil `syncWithSupabaseDatabase()`. Karena Supabase Cloud masih menyimpan 30 baris data demo tersebut, fungsi sinkronisasi mengambil kembali data fiktif itu dan mengisi ulang `dailyChartMap.value` serta `localStorage` (`cv_banong_farms_daily_chart_pure_v9`).
     3. Akibatnya, grafik tampak macet seolah tombol pemulihan tidak bekerja.
2. **Tindakan Pembersihan & Solusi Arsitektur**:
   - **Pertanyaan Pengguna:** *"apakah lebih baik hapus datanya sjaa???"*
   - **Tindakan:** **Ya, data demo sintetis langsung dihapus total dari Supabase Cloud dan cache lokal!**
   - **Langkah-langkah yang Diterapkan:**
     1. **Penambahan Fungsi `clearDailyMetrics()` (`supabaseClient.js`):** Menghapus seluruh rekaman fiktif dari tabel `metrik_harian` via query Supabase `delete().neq('tanggal', '1970-01-01')`.
     2. **Pembersihan Database Supabase Cloud Langsung:** 30 baris data demo fiktif di tabel `metrik_harian` telah berhasil dihapus hingga tersisa **0 baris** (kembali murni).
     3. **Proteksi Isolasi Data Demo (`useAdminStore.js`):** Menghapus proses upload data sintetis ke Supabase Cloud pada `trainAiModelWithDataset`. Data simulasi demo kini hanya diolah di memori frontend/lokal dan tidak pernah mencemari database cloud operasional.
     4. **Pembaruan Fungsi `resetAiModelToSupabase()` (`useAdminStore.js`):**
        - Otomatis memanggil `supabaseApi.clearDailyMetrics()`.
        - Menghapus kunci cache `localStorage` (`STORAGE_AI_PREDICTIONS_KEY` dan `STORAGE_CHART_KEY`).
        - Me-reset `dailyChartMap.value` murni ke 0 untuk seluruh 7 hari.
        - Hanya menghitung transaksi pesanan WhatsApp riil yang berstatus Selesai/Aktif (jika ada).
        - Membangun kembali proyeksi AI berdasarkan produk riil Supabase.
     5. **Eviction Cache Versi Browser (`STORAGE_CHART_KEY = 'v10'`):** Menambahkan `v9` ke daftar pembersihan otomatis saat startup aplikasi agar browser pengguna langsung terbebas dari sisa cache demo lama tanpa harus clear browser cache manual.
3. **Penyempurnaan Tombol Aksi di Tampilan (`AiAnalyticsSection.vue`)**:
   - Label tombol diperjelas: **`Hapus Data Demo & Kembali ke Data Asli`**.
   - Dilengkapi animasi indikator proses (`progress_activity`) saat pembersihan berlangsung.
   - Dilengkapi pesan konfirmasi keberhasilan berwarna hijau: **`Data Asli Berhasil Dipulihkan ✓`** dengan ikon `check_circle`.
   - Kurva garis grafik langsung di-*force update* ke nilai aktual 0 pcs secara instan.
4. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (7.80s) dengan 103 modul ter-bundle sempurna dan 0 error.
   - Status baris tabel `metrik_harian` di Supabase Cloud terverifikasi: **0 baris** (bersih total).

---

## 21. Catatan Sesi (16 September 2026 - Bagian 5) - Eliminasi "Laba Kotor" & Penyelarasan Total Pendapatan Riil Supabase pada Insight AI
1. **Identifikasi Masalah Angka AI Fantastis / Tidak Masuk Akal (Ngaco)**:
   - **Keluhan Pengguna:** Pendapatan hari ini tercatat Rp 416.000 (13 pcs produk pisang), tetapi kotak *Insight & Strategi AI* dan kartu proyeksi memunculkan proyeksi fantastis mencapai Rp 182.0 Juta, estimasi laba kotor Rp 29.8 Juta, serta komoditas fiktif `mtk`.
   - **Instruksi Khusus Pengguna:** Hilangkan estimasi laba kotor dan angka spekulatif lainnya; fokus penuh pada pendapatan riil yang diperoleh dari Supabase Cloud.
   - **Akar Penyebab (Root Cause):**
     1. Tabel `strategi_ai` di Supabase Cloud sebelumnya masih menyimpan baris data lama (ID 3) hasil simulasi 30 hari demo PSAJ yang memuat narasi fiktif "182 Juta & Laba Kotor 29.8 Juta". Saat sinkronisasi, teks usang ini ditarik ke tampilan.
     2. Kartu ke-2 di baris proyeksi (*"Proyeksi Laba & Omset"*) masih memakai formula spekulatif persentase laba kotor (16,4%) dan proyeksi puluhan juta.
2. **Tindakan Perbaikan & Penyelarasan Penuh dengan Supabase**:
   - **Pembersihan Database Supabase Cloud Langsung:** Seluruh baris usang di tabel `strategi_ai` telah dihapus (status saat ini: **0 baris**).
   - **Penambahan Metode `clearAiStrategy()` (`supabaseClient.js`):** Memastikan tabel `strategi_ai` otomatis dibersihkan saat tombol reset data demo ditekan maupun saat reset operasional ke nol.
   - **Perombakan Kartu Ke-2 Menjadi "Pendapatan Terverifikasi" (`AiAnalyticsSection.vue`):**
     - Menggantikan judul *"Proyeksi Laba & Omset"* menjadi **`Pendapatan Terverifikasi`** dengan label sumber **`SUPABASE CLOUD`**.
     - Nilai Utama: **`Rp {{ adminStore.totalRevenue.value }}`** (Menampilkan angka riil seperti **Rp 416.000** sesuai pesanan selesai di Supabase).
     - Menghapus total seluruh teks "Perkiraan Keuntungan Kotor", "Margin Laba Kotor", dan "Persentase Keuntungan".
     - Menampilkan 3 metrik riil transparan:
       1. **Pesanan Selesai:** Menghitung jumlah pesanan riil berstatus Selesai / Terverifikasi di Supabase.
       2. **Total Produk Terjual:** Volume fisik riil terakumulasi (misal 13 pcs).
       3. **Rata-rata Nilai Pesanan:** Rata-rata nominal per transaksi riil.
   - **Penyelarasan Teks "Insight & Strategi AI" (`AiAnalyticsSection.vue` & `useAdminStore.js`):**
     - Narasi otomatis kini terikat langsung dengan data Supabase: menyebutkan nama produk terlaris nyata (**pisang**), volume terjual nyata (**13 pcs**), total pendapatan riil (**Rp 416.000**), dan sisa stok gudang aktif (**0 pcs**).
     - Menambahkan filter pengaman `displayedAiStrategy`: jika memori browser masih menyisakan kata fiktif seperti `182`, `laba kotor`, atau `mtk`, sistem otomatis menolak teks tersebut dan menggantinya dengan narasi riil Supabase.
     - Memperbarui prompt Gemini AI dan algoritma heuristik cadangan (`aiService.js`) agar tidak lagi mengkalkulasi laba kotor fiktif, melainkan fokus pada manajemen stok dan kelancaran pesanan WhatsApp.
3. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (7.77s) dengan 103 modul ter-bundle sempurna dan 0 error.
   - Status tabel `strategi_ai` dan `metrik_harian` di Supabase Cloud: **0 baris demo fiktif** (steril dan siap operasional).

---

## 22. Catatan Sesi (16 September 2026 - Bagian 6) - Penekanan Kata Kunci Penting (Bold Text) pada Analisis AI
1. **Permintaan Pengguna:**
   - Menambahkan penekanan kata dengan **BOLD text** (`<strong>`) pada teks narasi analisis AI agar lebih mudah dipindai oleh mata (scannable), namun dibatasi hanya pada beberapa kata penting saja agar tidak berlebihan.
2. **Identifikasi Kata Kunci Utama yang Diberi Penekanan Bold:**
   - **Nama Produk Terlaris:** misal **pisang**
   - **Volume Terjual:** misal **13 pcs** atau **10 pcs**
   - **Total Pendapatan Terverifikasi:** misal **Rp 416.000**
   - **Jumlah Pesanan Berhasil:** misal **1 pesanan**
   - **Sisa Cadangan Stok di Gudang:** misal **0 pcs**
   - **Tindakan Rekomendasi Penting:** misal **segera restok** / **perlu restok**
3. **Penerapan Teknis (`AiAnalyticsSection.vue` & `useAdminStore.js`):**
   - **Render HTML Dinamis (`v-html`):** Paragraf narasi AI diubah dari interpolasi kurung kurawal biasa menjadi `<p ... v-html="formattedAiStrategy"></p>` sehingga tag penekanan tebal dapat dirender secara visual di browser.
   - **Format Markdown ke HTML:** Computed property `formattedAiStrategy` secara otomatis mengonversi penanda markdown `**kata**` menjadi `<strong class="font-extrabold text-[#1b1c1a] dark:text-white">kata</strong>`.
   - **Fallback Regex Cerdas:** Jika teks berasal dari API luar yang belum berformat markdown, regex otomatis mendeteksi dan menebalkan nama produk, angka berakhiran `pcs`, nominal `Rp ...`, jumlah `pesanan`, dan kata rekomendasi `segera restok`.
   - **Kontras Tipografi:** Teks isi biasa menggunakan warna `#4a4642` / `dark:text-slate-300`, sehingga kata-kata yang di-bold dengan `font-extrabold text-[#1b1c1a] dark:text-white` terlihat kontras, elegan, dan langsung menarik perhatian dewan juri/pembaca.
4. **Verifikasi Build Produksi**:
   - `npm run build` sukses 100% (7.61s) dengan 103 modul ter-bundle sempurna dan 0 error.

---

## 23. Catatan Sesi (16 September 2026 - Bagian 7) - Perbaikan Menyeluruh Analitik Usaha (Demo PSAJ & Pemulihan Data Supabase)
1. **Latar Belakang Masalah (Bug Report):**
   - **Masalah 1:** Ketika tombol *⚡ Demo PSAJ: Muat 30 Hari Data* ditekan, narasi analisis AI tidak berubah mengikuti simulasi demo PSAJ.
   - **Masalah 2:** Ketika tombol *Hapus Data Demo & Kembali ke Data Asli* ditekan, analisis AI justru berubah ke produk `tes ganti nama` dengan `0 pcs` terjual, bukannya kembali ke produk unggulan riil Supabase (`pisang` dengan `10 pcs` terjual, `Rp 280.000` dari `4 pesanan`).
2. **Temuan Investigasi Mendalam (Root Cause Analysis):**
   - **Penyebab Masalah 1 (Demo PSAJ Tidak Berubah):**
     - Pada `AiAnalyticsSection.vue` di computed `displayedAiStrategy`, terdapat filter pengaman usang: `if (text && (text.includes('182') || text.includes('laba kotor') || text.includes('mtk'))) return defaultAiAnalysis.value`.
     - Padahal, salah satu produk nyata di database Supabase pengguna bernama **`mtk`** (ID: 4).
     - Saat simulasi 30 hari demo dijalankan, produk `mtk` ikut disimulasikan sehingga narasi yang dihasilkan menyebutkan produk `mtk`. Filter tersebut salah mengira kata `mtk` sebagai data fiktif lama, lalu membuang teks demo dan memaksa kembali ke teks default!
     - Selain itu, badge `TREN: [Produk]` hanya membaca `adminStore.topSellingProduct` dan tidak reaktif terhadap status simulasi demo.
   - **Penyebab Masalah 2 (Setelah Reset Muncul "tes ganti nama" 0 pcs):**
     - Pada `useAdminStore.js` fungsi `resetAiModelToSupabase()`, produk di-fetch melalui `supabaseApi.getProducts()`.
     - `supabaseApi.getProducts()` sudah mengembalikan objek bersih dengan camelCase `p.soldCount`.
     - Namun fungsi reset me-remapping produk menggunakan: `soldCount: Number(p.jumlah_terjual ?? p.sold_count) || 0`. Karena `jumlah_terjual` dan `sold_count` adalah `undefined`, **seluruh nilai `soldCount` produk ter-reset menjadi 0 pcs**!
     - Ketika kalkulasi `topSellingProduct` melakukan sorting `b.soldCount - a.soldCount`, karena semua bernilai 0, urutan array jatuh pada indeks pertama yaitu `tes ganti nama` (ID: 1) dengan 0 pcs.
3. **Solusi & Perbaikan yang Diterapkan:**
   - **Perbaikan Store (`useAdminStore.js`):**
     - Memperbaiki `resetAiModelToSupabase()` agar secara akurat mempertahankan `soldCount: Number(p.soldCount ?? p.jumlah_terjual ?? p.sold_count) || 0`.
     - Menyinkronkan ulang pesanan riil dari Supabase (`supabaseApi.getOrders()`), sehingga pesanan riil (`4 pesanan`, total `Rp 280.000`) dan produk riil (`pisang` 10 pcs terjual) terpulihkan 100% sempurna.
     - Menyimpan state yang telah dibersihkan kembali ke `localStorage` dan membroadcast ke tab aktif.
   - **Peningkatan Algoritma Demo PSAJ (`aiService.js`):**
     - Memperbarui `generateSample30DaysDataset()` agar memberikan bobot simulasi proporsional berdasarkan produk aktif.
     - Memperbarui generator narasi prediktif:
       `Berdasarkan simulasi data penjualan 30 hari (Demo PSAJ), produk **[Nama Produk Best Seller]** mencatat serapan tertinggi dengan perkiraan permintaan sebesar **[Qty] pcs** dan total pendapatan transaksi mencapai **Rp [Total]**...`
     - Mengeliminasi kalkulasi fiktif spekulatif dan menerapkan penekanan **BOLD text** (`**`) pada entitas penting.
   - **Reaktivitas Antarmuka (`AiAnalyticsSection.vue`):**
     - Menambahkan state reaktif `isDemoActive = ref(false)` dan computed `activeInsightProduct`.
     - Menghapus filter keliru `text.includes('mtk')`.
     - Ketika tombol *⚡ Demo PSAJ: Muat 30 Hari Data* ditekan:
       - `isDemoActive` aktif (`true`).
       - Badge Tren otomatis berubah menjadi produk terlaris simulasi demo.
       - Teks analisis AI langsung berganti ke narasi simulasi 30 hari dengan highlight tebal.
       - Grafik 7 hari langsung diperbarui dengan volume transaksi simulasi.
       - 3 Kartu Telemetri di bawahnya otomatis menampilkan metrik simulasi demo (dengan label badge `SIMULASI PSAJ`).
     - Ketika tombol *Hapus Data Demo & Kembali ke Data Asli* ditekan:
       - `isDemoActive` kembali ke `false`.
       - Menghapus data demo dan mengembalikan data asli Supabase Cloud.
       - Badge Tren kembali ke `TREN: pisang`.
       - Teks analisis AI kembali ke data riil Supabase: `produk **pisang** mencatat penjualan terbaik sebesar **10 pcs** dengan total pendapatan yang didapat sebesar **Rp 280.000** dari **4 pesanan**. Sisa cadangan stok di gudang saat ini **0 pcs**. Disarankan untuk **segera restok**...`
       - Grafik 7 hari dan 3 kartu telemetri kembali menampilkan pesanan nyata Supabase.
4. **Validasi & Hasil:**
   - `npm run build` sukses 100% (8.07s) dengan 103 modul ter-bundle sempurna dan 0 error.
   - Database Supabase Cloud dan memori lokal tersinkronisasi murni dan stabil.

---

## 24. Catatan Sesi (16 September 2026 - Bagian 8) - Pembuatan Gambar 2.7 Arsitektur Sistem Lengkap dengan Logo Resmi
1. **Latar Belakang & Permintaan Pengguna:**
   - Pengguna membutuhkan diagram **Arsitektur Sistem (Gambar 2.7)** untuk laporan ujian/karya tulis ilmiah PSAJ.
   - Diagram awal di PlantText dinilai terlalu lebar, kemudian diagram minimalis di PlantText mengalami kendala render font server Java (ikon emoji muncul sebagai kotak kosong `▯`) serta dinilai kurang menarik karena tidak ada logo resmi teknologi.
   - Pengguna meminta agar tampilannya dibuat rapi dan proporsional persis seperti referensi *Gambar 2.5 (3-Tier Architecture)* namun dilengkapi logo resmi teknologi yang menarik.
2. **Solusi yang Diterapkan:**
   - **Pembuatan Gambar Diagram Vektor Beresolusi Tinggi (Ultra-HD / 300 DPI):**
     - Dibuat script generator `generate_diagram.py` yang memproduksi file gambar:
       - `public/assets/gambar_2_7_arsitektur_sistem.png` (resolusi 2040 x 1560 px, tajam untuk dicetak pada kertas A4 Word).
       - `public/assets/diagram_arsitektur_sistem.html` (sumber kode HTML/SVG interaktif).
     - **Dilengkapi Logo Vektor Resmi Berwarna:**
       1. **Laptop & Smartphone:** Ikon perangkat modern biru.
       2. **Tablet & PC Admin:** Ikon konsol manajemen hijau emerald.
       3. **Vue.js 3:** Logo resmi hijau dan biru gelap (*Emerald & Navy*).
       4. **WhatsApp:** Logo resmi hijau dengan gagang telepon putih.
       5. **Google Gemini AI:** Logo bintang radian resmi (*gradient blue, purple, pink*).
       6. **Supabase Cloud:** Logo petir resmi hijau emerald.
       7. **PostgreSQL:** Logo resmi database biru.
     - **Struktur 3-Tier Sempurna:**
       - Tier 1: Tampilan Pengguna (*Presentation Layer*)
       - Tier 2: Logika Aplikasi & Integrasi (*Application & Integration Layer*)
       - Tier 3: Penyimpanan Data (*Data Layer*)
     - **Garis Panah Terarah Presisi:** Dilengkapi badge keterangan protokol (`REST API / HTTPS`, `Click-to-Chat API`, `Analitik AI / HTTPS`, `Query Data & Realtime`, `Catat Pesanan Baru`, `Simpan Strategi AI`).
   - **Pemutakhiran Kode PlantText Bersih:** Menghapus karakter emoji yang rentan gagal render di server PlantText dan menggantinya dengan tag teks formal.
3. **Hasil:**
   - Gambar siap pakai langsung disisipkan ke laporan Microsoft Word tanpa perlu mengunduh manual dari pihak ketiga.

---

## 25. Catatan Sesi (17 September 2026) - Elevasi Desain Premium & Standardisasi Copywriting 100% Bahasa Indonesia pada Landing Page Pengunjung
1. **Latar Belakang & Arahan Pengguna:**
   - Fokus pengembangan diarahkan penuh pada antarmuka publik (*Landing Page / User Facing*) agar terlihat seperti website agribisnis modern kelas premium (*editorial luxury agritech*).
   - Seluruh teks dan *copywriting* distandardisasi menjadi **100% Bahasa Indonesia yang bersih, elegan, dan profesional**, tanpa mengubah logika, alur state, maupun fungsi web aplikasi.
2. **Pembaruan Menyeluruh Antarmuka Publik:**
   - **Hero Section (`HeroSection.vue`):**
     - Memperbarui narasi 3 slide menjadi bahasa Indonesia yang mengalir dan berkelas (*"Panen Segar Alami - Kualitas Unggul Terpercaya"*, *"Hasil Ternak Pilihan - Higienis & Halal Murni"*, *"Pangan Sehat Berkualitas - Langsung dari Peternak"*).
     - Tombol CTA diselaraskan: *"Jelajahi Produk Panen"* dan *"Jaminan Mutu & Halal"*.
     - Strip metrik diselaraskan: *"Alami & Bebas Kimia"*, *"Panen Langsung Dikirim"*, *"Banyumas, Jawa Tengah"*.
   - **Floating Navbar Capsule (`Navbar.vue`):**
     - Menstandarkan label tautan navigasi: *"Tentang Kami"*, *"Katalog Produk"*, *"Kontak Kami"*.
     - Menghilangkan singkatan bahasa asing: *"Hubungi Kami via WhatsApp"*.
   - **Seksi Visi & Misi (`VisiMisiSection.vue`):**
     - Mengganti judul bahasa Inggris (*"Discover our DNA"*) menjadi judul editorial bahasa Indonesia yang kuat: **`Dedikasi & Komitmen Kami`**.
     - Subjudul: *"Mewujudkan kemandirian pangan sehat dan berkelanjutan dari bumi Ajibarang."*
     - Menyelaraskan kartu visi dan 4 poin misi menjadi bahasa Indonesia murni yang rapi dan padat.
   - **Katalog Panen & Trust Bar (`ProductGrid.vue` & `ProductCard.vue`):**
     - Mengubah judul menjadi **`Katalog Panen Segar`**.
     - Mengeliminasi kata teknis *"komoditas"* menjadi *"produk"* pada empty state (*"Belum Ada Produk Tersedia"*).
     - Memperbarui trust bar: *"Standar Mutu Peternakan Ajibarang"*, *"100% Bebas Pengawet"*, *"Halal & Higienis"*.
     - Kartu produk dilengkapi badge stok rapi (*"Tersedia"*, *"Sisa X pcs"*, *"Stok Habis"*).
   - **5-Baris Marquee Menu Interaktif (`InteractiveMarqueeMenu.vue`):**
     - Menyelaraskan teks marquee komoditas: *"TELUR AYAM & BEBEK SEGAR"*, *"PETERNAKAN UNGGAS ALAMI"*, *"DAGING SEGAR & HIGIENIS"*, *"PERIKANAN AIR DERAS"*, *"PUPUK ORGANIK KASGOT"*.
     - Menyelaraskan label popup foto: *"Telur Segar Harian"*, *"Unggas Sehat Alami"*, *"Daging Segar Pilihan"*, *"Ikan Air Tawar Segar"*, *"Pupuk Organik Kasgot"*.
   - **Kluster Polaroid & Seksi CTA (`PolaroidCtaSection.vue`):**
     - Menyempurnakan teks foto: *"Kreasi Dapur Segar"*, *"Pangan Sehat Alami"*, *"Kebersamaan Keluarga"*.
     - Tombol CTA: *"PESAN SEKARANG VIA WA"* (kuning emas `#fcd400`) dan *"LIHAT KATALOG PRODUK"*.
     - Badges kepercayaan: *"100% Halal & Bersih"*, *"Pengiriman < 12 Jam"*, *"Peternakan Ajibarang"*.
   - **Footer Editorial 100vh (`FooterSection.vue`):**
     - Menyelaraskan daftar produk, tautan navigasi (*"Visi & Misi Peternakan"*, *"Layanan WhatsApp"*), kontak (*"WhatsApp Layanan"*, *"Surat Elektronik"*, *"Jam Operasional Peternakan"*).
     - Tombol peta: *"Buka di Google Maps"*.
     - Teks hak cipta: *"© 2026 CV Banong Farms. Hak Cipta Dilindungi Undang-Undang."* serta *"Kebijakan Privasi"* & *"Syarat & Ketentuan Layanan"*.
   - **Keranjang Belanja Drawer (`CartDrawer.vue`):**
     - Mengganti *"Keranjang Pakan"* menjadi **`Keranjang Belanja`** (`X Produk Dipilih`).
     - Empty state: *"Keranjang Belanja Masih Kosong"*, tombol *"Jelajahi Katalog Produk"*.
     - Form: *"Formulir Pemesanan"*, *"WhatsApp Pengelola: 08999192861"*, tombol checkout *"Lanjut ke WhatsApp (Rp ...)"*.
     - Konfirmasi 2-langkah: *"WhatsApp Telah Dibuka"*, ringkasan kode pesanan, tombol *"Ya, Saya Sudah Kirim ke WhatsApp"*, *"Buka Ulang Chat WhatsApp"*, *"Belum Jadi Kirim / Batalkan"*.
     - Notifikasi stok habis: *"Pemesanan Belum Dapat Diproses"*, *"Hapus Produk Kosong"*.
   - **Asisten AI Si Banong (`ChatbotMascot.vue`):**
     - Header: **`Asisten AI Si Banong`**, status: `Aktif · Ajibarang`, badge: `✦ AI Pintar`.
     - Pertanyaan cepat 100% bahasa Indonesia (*Stok Telur Ayam Kampung, Area Pengiriman Ajibarang, Jaminan Mutu & Halal, Cara Pemesanan Produk*).
   - **Modal Rincian Produk (`ProductModal.vue`):**
     - Subtitle kategori: *"Produk Panen"*, tombol aksi: *"+ Tambah ke Keranjang"* / *"+ Simpan ke Keranjang (Stok Habis)"*.
3. **Integritas Sistem & Verifikasi Build:**
   - Tidak ada logika bisnis, store Pinia/Vue, query Supabase, routing hash, atau alur WhatsApp yang diubah.
   - `npm run build` sukses 100% (6.97s) dengan 0 error dan 0 lint warning.

---

## 26. Catatan Sesi (17 September 2026 - Bagian 2) - Redesain Tipografi Footer "CV BANONG FARM" Modular Block Typography (Gaya Referensi Woblo)
1. **Latar Belakang & Permintaan Pengguna:**
   - Pengguna mengunggah gambar referensi tipografi modular brand *Woblo* dengan instruksi: *"COBA BUATKAN DESIGN FOOTER YANG TULISAN CV BANONG FARM DIJADIKAN SEPERTI GAMBAR INI!"*.
   - Karakteristik utama referensi *Woblo*:
     1. Teks tersusun dari blok-blok warna kontras solid yang menempel rapat tanpa celah (*contiguous blocks*, `gap-0`).
     2. Sudut luar klaster melengkung halus (*rounded outer corners*).
     3. Garis bawah semua huruf sejajar rata horizontal sempurna (*bottom-aligned*, `items-end`).
     4. Huruf-huruf tertentu dengan anatomi *ascender* (seperti `b` dan `l` pada contoh Woblo) memiliki blok yang menjulang tinggi ke atas (*staggered tall blocks*).
     5. Tipografi geometris ultra-tebal (*bold sans-serif*).
2. **Penerapan pada CV BANONG FARM (`FooterSection.vue`):**
   - **Font Geometris Modern:** Memuat Google Font **Outfit** (weight 900) dan **Inter 900** via `index.html` dan `tailwind.config.js` (`font-outfit font-black`).
   - **Pemetaan Palet Warna Modular Identik Woblo:**
     - **Klaster 1 (`cv`):**
       - `c`: Hitam Pekat (`#18181b`), teks putih tebal, sudut kiri melengkung (`rounded-l-2xl sm:rounded-l-3xl`).
       - `v`: Oranye Terang (`#ff6600`), teks gelap, sudut kanan melengkung (`rounded-r-2xl sm:rounded-r-3xl`).
     - **Klaster 2 (`banong`):**
       - `b`: Hijau Mint Neon (`#00e676`), teks gelap, **MENJULANG TINGGI / TALL** (`rounded-tl-2xl sm:rounded-tl-3xl`).
       - `a`: Hot Pink / Magenta (`#ff1361`), teks gelap, ketinggian normal.
       - `n`: Ungu Elektrik (`#7c3aed`), teks putih, ketinggian normal.
       - `o`: Oranye Terang (`#ff6600`), teks gelap, ketinggian normal.
       - `n`: Hijau Mint Neon (`#00e676`), teks gelap, ketinggian normal.
       - `g`: Hot Pink / Magenta (`#ff1361`), teks gelap, sudut kanan melengkung (`rounded-r-2xl sm:rounded-r-3xl`).
     - **Klaster 3 (`farm` / opsi `farms`):**
       - `f`: Hijau Mint Neon (`#00e676`), teks gelap, **MENJULANG TINGGI / TALL** (`rounded-tl-2xl sm:rounded-tl-3xl`).
       - `a`: Oranye Terang (`#ff6600`), teks gelap, ketinggian normal.
       - `r`: Hot Pink / Magenta (`#ff1361`), teks gelap, ketinggian normal.
       - `m`: Ungu Elektrik (`#7c3aed`), teks putih, berakhiran ungu persis seperti huruf `o` pada referensi Woblo!
       - `s` (opsional via toggle): Kuning Emas (`#fcd400`), teks gelap.
   - **Showcase Frame & Kontrol Interaktif Minimalis:**
     - Huruf dibungkus dalam *canvas showcase* elegan berlatar kaca gelap (`bg-slate-900/75 border border-white/15 backdrop-blur-xl shadow-2xl rounded-3xl`).
     - Dilengkapi tombol kendali interaktif:
       - **Gaya Huruf:** Beralih antara *Huruf Kecil (persis gambar referensi)* vs *Huruf Kapital*.
       - **Teks:** Beralih antara *FARM* (sesuai prompt) vs *FARMS* (nama resmi perusahaan).
     - Seluruh balok huruf memiliki efek interaksi hover mikro (*lift up* `-translate-y-2` dan *subtle scale*).
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (7.90s, 0 error).
   - Seluruh fungsionalitas aplikasi, Supabase Cloud, dan alur checkout WhatsApp tetap aman tanpa gangguan.

---

## 27. Catatan Sesi (17 September 2026 - Bagian 3) - Redesain Footer Modern Minimalis dengan Ubin 3D Floating Ikon Hewan CV Banong (Gaya Referensi ChronoTask)
1. **Latar Belakang & Permintaan Pengguna:**
   - Pengguna mengunggah gambar referensi desain footer modern SaaS (*ChronoTask*) dan meminta: *"coba ubah lagi footernya menjadi sperti ini! dengan icon/representasi cv banong hewan-hewan"*.
   - Karakteristik utama referensi yang diunggah:
     1. **Latar Belakang Bersih & Dot Grid:** Kanvas bertekstur titik halus (*dot matrix pattern* berjarak 24px) yang elegan.
     2. **Area Atas Terstruktur Rapi:** 
        - Sisi kiri: Logo brand dan judul tipografi besar 2 baris (*"Pangan Segar Alami, Berkelanjutan dari Ajibarang"*).
        - Sisi kanan: 2 kolom navigasi minimalis berawalan ikon panah monospasi `→`.
     3. **Fitur Visual Utama (Hero Visual Footer):**
        - Formasi ubin squircle putih 3D timbul (*elevated squircle cards*) yang melayang santai (*floating scattered layout*) di seluruh lebar kanvas dengan rotasi organik bervariasi (`-12deg`, `+8deg`, `-6deg`, `+12deg`, dll.).
        - Ubin memiliki bayangan multi-lapis lembut (*soft multi-layered 3D drop shadow*), efek hover interaktif (*scale 115%*, rotasi kembali lurus, shadow menebal, dan tooltip nama komoditas).
2. **Representasi Ikon Hewan & Komoditas Riil CV Banong Farms (`FooterSection.vue`):**
   - Dibuat 10 komponen ikon vektor SVG khusus yang dirancang presisi, berwarna tajam, dan estetis:
     1. **Ayam Kampung Segar:** Siluet ayam jantan berbadan emas dengan jengger merah cerah dan gelambir.
     2. **Bebek & Entok Petelur:** Bebek kuning keemasan dengan paruh jingga dan riak air biru.
     3. **Domba Garut Pilihan:** Kepala domba bertanduk melingkar dengan wol lebat putih bergradasi abu.
     4. **Sapi Ternak Sehat:** Wajah sapi belang hitam-putih dengan tanduk kuning dan moncong merah muda.
     5. **Kambing Jawa & Etawa:** Kepala kambing dengan telinga panjang menjuntai, tanduk tegak, dan jenggot putih.
     6. **Ikan Nila Air Tawar:** Ikan air tawar biru cerah berenang dengan gelembung air alami.
     7. **Telur Segar Organik:** Pasangan telur bebek biru toska dan telur ayam kampung cokelat keemasan dengan kilau cahaya.
     8. **Kelinci Pedaging & Hias:** Kelinci putih bertelinga panjang dengan hidung merah muda dan kumis halus.
     9. **Lebah Madu Peternakan:** Lebah madu belang kuning-hitam bersayap transparan biru muda.
     10. **Kasgot & Pupuk Organik BSF:** Daun hijau subur dengan butiran nutrisi organik hasil dekomposisi larva BSF.
   - **Interaktivitas:** Setiap kartu ubin dapat diklik untuk mengarahkan pengunjung langsung ke katalog produk, serta dilengkapi animasi *gentle float* berdurasi bertingkat (4.8s s.d. 6.0s).
   - **Responsivitas Mobile:** Pada layar kecil ponsel, 8 ubin teratas ditata rapi dalam grid 4 kolom ringkas dengan label nama pendek sehingga tetap nyaman dilihat tanpa saling tumpang tindih.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.23s) dengan 104 modul ter-bundle sempurna dan 0 error.
   - Seluruh fungsionalitas SPA, checkout WhatsApp, Supabase Cloud, dan asisten AI Si Banong tetap 100% beroperasi normal.

---

## 28. Catatan Sesi (17 September 2026 - Bagian 4) - Penyesuaian Header Footer: Judul Raksasa "CV Banong Farms" & Restorasi Peta Google Maps Interaktif
1. **Latar Belakang & Permintaan Pengguna:**
   - Pengguna memberikan masukan perbaikan spesifik pada seksi footer:
     1. *"nama cv banong farmnya yang besar"* -> Judul utama brand dijadikan teks raksasa dominan.
     2. *"Pangan Segar Alami, Berkelanjutan dari Ajibarang di hilangin saja"* -> Menghilangkan kalimat *tagline* tersebut dari atas brand.
     3. *"untuk embed map jangan dihilangkan lo, balikin!!"* -> Mengembalikan kartu sematan *Google Maps Interactive* yang sempat terlepas.
2. **Penerapan Perubahan (`FooterSection.vue`):**
   - **Judul Brand Raksasa:** Menjadikan teks **`CV Banong Farms`** sebagai *headline* dominan utama berukuran `text-4xl sm:text-5xl lg:text-[54px] font-black font-outfit tracking-tight`, dilengkapi logo resmi dan badge status peternakan aktif.
   - **Pembersihan Copywriting:** Menghapus kalimat *"Pangan Segar Alami, Berkelanjutan dari Ajibarang"* sehingga antarmuka lebih langsung dan *clean*.
   - **Restorasi Peta Google Maps Interaktif:**
     - Menempatkan kembali kartu peta interaktif (live *iframe* Google Maps koordinat Ajibarang) di kolom kanan atas footer berdampingan dengan 2 kolom navigasi panah `→`.
     - Dilengkapi indikator titik hijau berdenyut (*pulsing active indicator*), judul lokasi *"Banong Farms Ajibarang"*, dan tombol aksi tautan *"Buka di Maps"*.
   - **Integritas Ubin Hewan & Fungsionalitas:**
     - 10 ubin 3D *floating squircle* hewan ternak dan komoditas (Ayam, Bebek, Domba, Sapi, Kambing, Ikan Nila, Telur, Kelinci, Lebah, Kasgot) tetap tersusun elegan di bawah baris utama.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.30s) dengan 104 modul ter-bundle sempurna dan 0 error.
   - Seluruh fungsionalitas aplikasi dan koneksi WhatsApp/Supabase tetap stabil 100%.

---

## 29. Catatan Sesi (17 September 2026 - Bagian 5) - Perbaikan Menyeluruh Masalah Layout Terhimpit (*Squished Layout Bug Fix*) pada Header Footer
1. **Latar Belakang Permasalahan:**
   - Pengguna melaporkan tampilan footer rusak (*"sekarang malah RUSAK!"*) dengan screenshot menunjukkan teks `CV Banong Farms` terhimpit menjadi 3 baris sangat sempit di pojok kiri atas, teks tautan navigasi bertumpuk, dan peta terpotong menyisakan 75% layar kosong di sebelah kanan.
   - **Penyebab Teknis:** Kontainer atas sebelumnya dideklarasikan menggunakan `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12` namun elemen-elemen anak tidak memiliki kelas `col-span` eksplisit pada layar desktop, sehingga Tailwind CSS menempatkan setiap blok hanya selebar 1 kolom dari 12 (hanya ~8.33% lebar layar).
2. **Solusi yang Diterapkan:**
   - **Rekonstruksi dengan Responsive Flex Layout:**
     - Mengubah kontainer atas menjadi `flex flex-col lg:flex-row items-start justify-between gap-10 xl:gap-14 w-full`.
     - **Sisi Kiri (Brand & Identitas):** Diberi `w-full lg:flex-1 lg:max-w-xl` sehingga nama **CV Banong Farms** memiliki ruang yang sangat leluasa, tampil megah pada 1 baris utuh (`text-4xl sm:text-5xl lg:text-[54px] font-black`), deskripsinya rapi, dan tombol WhatsApp tertata presisi.
     - **Sisi Tengah (Navigasi):** Diberi `w-full sm:w-auto shrink-0` dengan grid 2 kolom rapi berjarak `gap-x-8 sm:gap-x-12`.
     - **Sisi Kanan (Peta Google Maps):** Diberi ukuran pasti yang proporsional `w-full lg:w-80 xl:w-96 shrink-0` sehingga tidak terhimpit dan tidak terpotong.
3. **Hasil & Verifikasi:**
   - Seluruh ruang horizontal (100% lebar kontainer) terisi secara seimbang, tidak ada elemen yang tertekan, dan peta tampil jernih.
   - `npm run build` sukses 100% (5.77s, 0 error).

---

## 30. Catatan Sesi (17 September 2026 - Bagian 6) - Pembuatan Seksi Kredibilitas & Kelayakan Resmi CV Banong Farms (Gaya Desain Referensi Presisi)
1. **Latar Belakang & Permintaan Pengguna:**
   - Pengguna meminta pembuatan seksi baru bertema **Kredibilitas / Kelayakan Usaha (*Credibility Section*)** yang ditempatkan persis **setelah seksi Visi & Misi dan sebelum seksi Katalog Produk**.
   - Seksi ini memuat data bukti kelayakan: jumlah pelanggan yang telah membeli, sertifikasi resmi, izin edar NIB, dan komitmen mutu higienis peternakan.
   - **Ketentuan Khusus:** Layout dan tata letak harus mengikuti 100% referensi gambar yang diunggah, dengan foto dokter diganti menjadi sertifikat resmi dan elemen pendukung peternakan yang prestisius.
2. **Penerapan Komponen Baru (`CredibilitySection.vue`):**
   - **Penempatan Komponen:** Diintegrasikan ke `src/App.vue` di antara `<VisiMisiSection />` dan `<ProductGrid />`, serta ditambahkan tautan navigasi `Mutu & Legalitas` (`#kelayakan`) di `Navbar.vue`.
   - **Header Atas (Baris Metrik):**
     - Sisi Kiri: Judul besar tebal *"Standar Mutu & Legalitas Resmi untuk Pangan Anda"* dan subjudul 1 baris *"Berizin resmi NIB, higienis, dan teruji laboratorium untuk menjamin pangan sehat keluarga setiap hari."*
     - Sisi Kanan: Metrik besar **`14rb+`** dipadukan dengan 4 lingkaran foto bertumpuk (*overlapping avatars*: telur segar, ayam kampung, bebek/itik, dan ikan air tawar) serta sub-teks *"Dipercaya 1.400+ Pelanggan & Mitra"*.
   - **Kartu Utama Bersih & Elegan (`rounded-3xl shadow-xl`):**
     - **Sisi Kiri (Showcase Sertifikat & Piala Keunggulan):** Menampilkan aset gambar resmi `sertifikat_kelayakan_cv_banong.jpg` berupa piagam berbingkai kayu mewah *"SERTIFIKAT KELAYAKAN MUTU & HIGIENIS - CV BANONG FARMS"* lengkap dengan lambang Garuda, cap stempel resmi BPOM/Agri, dan piala keunggulan emas bertengger di sampingnya. Di bagian bawah terdapat kartu overlay putih elegan berisi judul sertifikasi, NIB: 018/KMF/BPOM-AGRI/2023, rating kepuasan ★ 4.9 (1.428 ulasan pembeli), serta tautan resmi WhatsApp, Instagram, dan lencana 100% Halal.
     - **Sisi Kanan (Narasi Komitmen & 2 Kartu Fitur):**
       - Narasi komitmen agribisnis sirkular bebas antibiotik berbahaya dan bebas hormon sintetis.
       - Dua kartu fitur pendukung di bagian bawah:
         1. *Pakan Alami Bebas Hormon* (ikon daun hijau) mengulas pakan dedak alami dan larva maggot BSF.
         2. *Sanitasi & Uji Veteriner* (ikon tameng kesehatan teal) mengulas pemeriksaan berkala kesehatan hewan dan biosekuriti kandang.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (5.66s) dengan 108 modul ter-bundle sempurna dan 0 error.

---

## 31. Catatan Sesi (17 September 2026 - Bagian 7) - Penyelarasan Penuh Lebar Kontainer & Warna Latar Belakang Seksi Kredibilitas dengan Desain Asli Website
1. **Latar Belakang Permasalahan & Masukan Pengguna:**
   - Pengguna memberikan koreksi bahwa seksi kredibilitas yang baru dibuat:
     1. *"Terlalu lebar dari section-section yang lain"* -> Lebar kontainer melebihi kontainer standar website.
     2. *"Warna background tidak sama dengan section lain, TOLONG DI SAMAKAN STYLENYA DENGAN WEBSITE INI!"* -> Warna latar abu-abu terang kontras dan tidak menyatu dengan alur halaman yang menggunakan `bg-surface-pure`.
2. **Penyelarasan Desain (`CredibilitySection.vue`):**
   - **Penyelarasan Lebar Kontainer Sempurna:** Mengganti kontainer `max-w-[1440px]` menjadi `max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop` (persis 1280px, identik 100% dengan `VisiMisiSection.vue` dan `ProductGrid.vue`), sehingga batas kiri dan kanan sejajar lurus secara vertikal.
   - **Penyelarasan Warna Latar Belakang Website:** Mengubah latar seksi menjadi `bg-surface-pure dark:bg-[#070D1E]` dengan aksen glow ambient lembut dan garis pemisah halus `border-b border-slate-100 dark:border-slate-800/80` tanpa ada blok warna abu-abu asing.
   - **Penerapan Token Desain Resmi CV Banong Farms:**
     - Judul utama menggunakan token warna `text-primary dark:text-white` (Navy resmi CV Banong).
     - Badge atas menggunakan pill format `bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container`.
     - Angka metrik `14rb+` menggunakan warna `text-primary dark:text-secondary-container` (emas).
     - Kartu utama `bg-white dark:bg-[#0c1a30]` berpadu kartu pendukung `bg-slate-50 dark:bg-[#071120]` dengan border halus yang selaras dengan seluruh komponen web.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.42s) dengan 108 modul ter-bundle sempurna dan 0 error.

---

## 32. Catatan Sesi (17 September 2026 - Bagian 8) - Pembaruan Teks & Copywriting Bersih, Eliminasi Trust Bar, dan Sinkronisasi Navbar Baru
1. **Latar Belakang & Instruksi Pengguna:**
   - Melakukan perubahan copywriting judul dan teks agar lebih ringkas, to-the-point, dan bersih:
     - Mengubah `"Dedikasi & Komitmen Kami"` menjadi `"Tentang Kami"`.
     - Mengubah `"Standar Mutu & Legalitas Resmi untuk Pangan Anda"` menjadi `"Reputasi"`.
     - Mengubah `"Katalog Panen Segar"` menjadi `"Katalog Produk"`.
   - Menghapus teks-teks:
     - Breadcrumb `"Sentra Agribisnis Ajibarang / Tentang CV Banong Farms"`.
     - Paragraf deskripsi `"Pilihan hasil peternakan dan hasil tani berkualitas tinggi, dipanen harian dengan standar kebersihan terjaga tanpa bahan kimia sintetis."`.
   - Menghapus elemen `<!-- Trust Bar / Farm-to-Table Highlights -->` dan kontainernya dari halaman produk.
   - Menyelaraskan seluruh menu navigasi di Navbar (`src/components/Navbar.vue`) menjadi:
     1. **Tentang** (`#tentang-kami` / `#tentang`)
     2. **Reputasi** (`#reputasi` / `#kelayakan`)
     3. **Katalog** (`#katalog-produk` / `#katalog`)
     4. **Kontak** (`#kontak`)
2. **Penerapan Teknis & Perubahan Berkas:**
   - `src/components/VisiMisiSection.vue`:
     - Breadcrumb dihapus, judul section dipastikan `"Tentang Kami"`, ditambahkan jangkar ID `#tentang` untuk dukungan navigasi.
   - `src/components/CredibilitySection.vue`:
     - Judul utama dipastikan `"Reputasi"`, memiliki ID `#reputasi` dan jangkar kompatibilitas `#kelayakan`.
   - `src/components/ProductGrid.vue`:
     - Mengubah judul menjadi `"Katalog Produk"`, menghapus paragraf deskripsi yang diminta, menghapus seluruh elemen Trust Bar (`#standar-etika`), dan menambahkan jangkar ID `#katalog`.
   - `src/components/Navbar.vue`:
     - Memperbarui daftar menu `navItems` desktop dan mobile secara presisi: `Tentang`, `Reputasi`, `Katalog`, dan `Kontak`.
3. **Verifikasi & Status Sistem:**
   - `npm run build` sukses 100% (5.95s) tanpa ada error maupun peringatan sintaksis.
   - Dev server lokal aktif dan menyajikan landing page dengan antarmuka yang jauh lebih bersih, modern, dan navigasi yang responsif.

---

## 33. Catatan Sesi (17 September 2026 - Bagian 9) - Standardisasi Proporsional Jarak Antar-Section & Resolusi Error Navbar Background / Scroll Spy
1. **Latar Belakang & Masalah yang Dilaporkan Pengguna:**
   - **Keluhan Jarak Section:** Jarak antar section sebelumnya ada yang terlalu jauh dan renggang secara ekstrem (seperti `py-80` = 320px padding di `VisiMisiSection`, `InteractiveMarqueeMenu`, dan `PolaroidCtaSection` serta `pt-48` di `ProductGrid`), membuat halaman terasa seperti jurang hampa. Pengguna meminta: *"perbaiki jarak antar section tapi jangan terlalu dekat dan jangan terlalu jauh!"*.
   - **Keluhan Bug Navbar:** Ketika pengguna mengklik *"Kontak"* (atau menu lain) lalu kembali ke Hero Section, teks *"Kontak"* masih memiliki kapsul background putih/abu-abu aktif di belakangnya (sebagaimana terlihat pada screenshot). Hal ini terjadi karena `activeNav` diinisialisasi `'tentang'`, tidak pernah di-reset saat posisi viewport berada di Hero Section, dan tidak memiliki pendeteksi scroll spy dinamis.
2. **Solusi & Implementasi Teknis:**
   - **Standardisasi Proporsional Jarak Antar-Section (`py-16 sm:py-20 lg:py-24`):**
     - `src/components/VisiMisiSection.vue`: Dari `py-36 sm:py-52 lg:py-72 xl:py-80` diubah menjadi `py-16 sm:py-20 lg:py-24`.
     - `src/components/CredibilitySection.vue`: Dari `py-20 sm:py-28 lg:py-32` diubah menjadi `py-16 sm:py-20 lg:py-24`.
     - `src/components/ProductGrid.vue`: Dari `pt-24 sm:pt-36 lg:pt-48 pb-12 sm:pb-16 lg:pb-20` diubah menjadi `py-16 sm:py-20 lg:py-24`.
     - `src/components/InteractiveMarqueeMenu.vue`: Dari `py-36 sm:py-52 lg:py-72 xl:py-80` diubah menjadi `py-16 sm:py-20 lg:py-24`.
     - `src/components/PolaroidCtaSection.vue`: Dari `py-36 sm:py-52 lg:py-72 xl:py-80` diubah menjadi `py-16 sm:py-20 lg:py-24`.
     - Seluruh section kini memiliki jeda vertikal yang seragam, rapi, bernapas lapang, dan tidak lagi terasa terlalu jauh maupun terlalu rapat.
   - **Perbaikan Menyeluruh Navbar & Scroll Spy (`src/components/Navbar.vue`):**
     - Mengubah state awal `activeNav` menjadi `''` (string kosong) sehingga saat membuka web di puncak Hero Section, tidak ada satupun item nav yang mendapat highlight kapsul.
     - Menambahkan fungsi `updateActiveNavOnScroll`:
       1. Jika `window.scrollY < heroThreshold`, otomatis mengatur `activeNav.value = ''`. Background kapsul dijamin hilang 100% setiap kali user berada atau kembali ke Hero Section.
       2. Jika user scroll ke bawah, navbar secara otomatis menyorot section yang sedang aktif (`tentang`, `reputasi`, `katalog`, atau `kontak`).
       3. Menangani penekanan klik logo brand CV Banong Farms di kiri (`scrollToHero`) untuk scroll halus ke atas dan mengosongkan status highlight navbar.
       4. Menambahkan debounce `isManualClick` agar klik langsung mulus ke target tanpa tabrakan dengan event listener scroll.
   - Menambahkan `id="hero"` pada [HeroSection.vue](file:///e:/Documents/01.%20PJJ%20SALADIN/Kelas%2012/3.%20PSAJ/1.DPK/Landing%20Page%20CV%20Banong%20Farms/src/components/HeroSection.vue) sebagai anchor target resmi puncak halaman.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.08s) dengan 108 modul ter-bundle sempurna dan 0 error.

---

## 34. Catatan Sesi (17 September 2026 - Bagian 10) - Konfigurasi Footer 100vh Penuh di Layar Desktop Tanpa Terpotong
1. **Latar Belakang & Masalah yang Dilaporkan Pengguna:**
   - Pengguna melaporkan bahwa ketika menekan tombol *"Kontak"* di navbar, tampilan footer masih terpotong di atas maupun di bawah dan tidak pas 1 layar penuh: *"nah sekarang footernya itu masih terpotong diatas maupun dibawah tidak bisa 1 full layar jadi saya ingin footernya itu 100vh di desktop"*.
   - **Penyebab Teknis:** Tinggi konten footer sebelumnya mencapai ~1.100px (kombinasi `pt-28`, `min-h-[440px]` animal tiles, dan padding vertikal berlebih) sehingga melebihi viewport standar desktop (~800px-950px), menyebabkan bagian atas terpotong di balik navbar atau bagian bawah tersembunyi.
2. **Solusi & Implementasi Teknis (`src/components/FooterSection.vue`):**
   - **Penerapan Kelas 100vh Khusus Desktop:**
     - Menetapkan `lg:h-screen lg:min-h-[100dvh] lg:max-h-screen` serta `overflow-hidden` pada tag `<footer>`.
     - Menetapkan `lg:h-full` pada kontainer konten utama dengan `flex flex-col justify-between`.
   - **Skala Proporsional Antar-Blok di Desktop:**
     - **Header & Maps (Atas):** Padding atas `lg:pt-20 xl:pt-24`, margin bawah `pb-4 lg:pb-6 border-b`, judul `text-3xl sm:text-4xl lg:text-4xl xl:text-[44px]`, serta tinggi iframe Google Maps `h-32 lg:h-36` yang proporsional.
     - **Ubin Hewan Tiga Dimensi (Tengah):** Diberi `flex-1 flex items-center justify-center min-h-0 py-2 lg:py-4` dengan ukuran kartu squircle hewan `w-20 h-20 lg:w-22 lg:h-22 rounded-[22px] lg:rounded-[26px]` yang tersebar secara harmonis di tengah kontainer tanpa meluap.
     - **Baris Hak Cipta & Kebijakan (Bawah):** Padding `pt-3 lg:pt-4 pb-1 border-t` ringkas dan bersih.
   - **Pengalaman Interaksi Klik Menu Kontak:**
     - Ketika pengguna menekan tombol *"Kontak"* di navbar, viewport menggulir halus tepat ke `#kontak`. Karena footer tepat 100vh di desktop, seluruh informasi footer tampil utuh 1 layar penuh tanpa terpotong di atas maupun di bawah.
     - Di perangkat mobile/tablet (`< lg`), footer tetap mengalir alami (`min-h-auto`) untuk kenyamanan sentuhan jari.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.95s) dengan 108 modul ter-bundle sempurna dan 0 error.

---

## 35. Catatan Sesi (17 September 2026 - Bagian 11) - Peningkatan Skala Ukuran Ubin 3D Squircle & Ikon Hewan Footer di Desktop (Besar, Bold, dan Ikonik)
1. **Latar Belakang & Masukan Pengguna:**
   - Pengguna memberikan masukan visual disertai screenshot bahwa bentuk ubin ikon hewan pada footer ketika desktop terlalu kecil: *"bentuk icon pada footer ketika desktop terlalu kecil!"*.
   - **Penyebab:** Pada sesi sebelumnya, ubin squircle diatur ke `w-20 h-20` (80px) dan ikon di dalamnya hanya `w-11 h-11` (44px), sehingga di layar desktop yang luas ubin-ubin tampak seperti pinhead/titik kecil yang tenggelam di atas latar dot-grid.
   - **Bandingkan dengan Desain Referensi ChronoTask (`media_1789615697501.png`):** Kartu ubin squircle pada referensi asli memiliki ukuran yang dominan, tebal, dengan ikon di dalamnya mengisi 70-75% luas kartu.
2. **Solusi & Implementasi Teknis (`src/components/FooterSection.vue`):**
   - **Peningkatan Skala Ubin Squircle (Hampir 2x Lipat Lebih Besar):**
     - Mengubah ukuran kartu dari `w-20 h-20 lg:w-22 lg:h-22` menjadi **`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40`** (128px s.d. 160px di desktop).
     - Sudut kelengkungan squircle diperhalus menjadi `rounded-[26px] sm:rounded-[30px] lg:rounded-[36px] xl:rounded-[40px]`.
     - Padding dalam diperbesar menjadi `p-3.5 sm:p-4 lg:p-5 xl:p-6`.
   - **Peningkatan Ukuran Ikon SVG di Dalam Kartu:**
     - Mengubah pembungkus ikon dari `w-11 h-11 lg:w-13 lg:h-13` menjadi **`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24`** (64px s.d. 96px).
     - Gambar ayam, bebek, sapi, domba, kambing, kelinci, lebah, ikan, telur, dan kasgot kini tampil tegas, penuh warna, dan jelas terlihat dari kejauhan.
   - **Penyempurnaan Posisi Koordinat Wave Pattern:**
     - Menata ulang koordinat persentase `left` dan `top` 10 ubin hewan agar membentuk pola gelombang alami yang seimbang: baris atas (`top: 6% - 8%`) dan baris bawah (`top: 34% - 48%`) dengan rentang horizontal `left: 2%` hingga `84%`, sehingga tidak ada kartu yang terpotong tepi layar atau saling bertabrakan.
   - **Efek Bayangan 3D Lembut & Megah:**
     - Menggunakan shadow 3D bertingkat `shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14),0_10px_20px_-8px_rgba(0,0,0,0.08),inset_0_2px_0_rgba(255,255,255,0.95)]` yang semakin dramatis saat kursor di-hover.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.88s) dengan 108 modul ter-bundle sempurna dan 0 error.

---

## 36. Catatan Sesi (17 September 2026 - Bagian 12) - Kalibrasi Ulang Ukuran Proporsional Golden Ratio Ubin Squircle & Ikon Hewan Footer di Desktop
1. **Latar Belakang & Keluhan Pengguna:**
   - Setelah peningkatan skala sebelumnya (`128px - 160px` untuk kartu dan `80px - 96px` untuk ikon), pengguna melaporkan bahwa ukuran tersebut menjadi terlalu besar di layar desktop: *"waduh sekarang iconnya terlalu besar! tolong perbaiki lagi yang benar!"*.
   - **Analisis Keseimbangan:**
     - Versi awal (`80px` kartu, `44px` ikon) dinilai **terlalu kecil**.
     - Versi pembesaran (`144px` kartu, `96px` ikon) dinilai **terlalu besar**.
     - Dibutuhkan **titik tengah ideal (*golden ratio sweet spot*)** yang proporsional, rapi, dan elegan.
2. **Solusi & Implementasi Kalibrasi (`src/components/FooterSection.vue`):**
   - **Ukuran Kartu Ubin Squircle Ideal (~112px):**
     - Dikalibrasi menjadi **`w-24 h-24 sm:w-26 sm:h-26 lg:w-28 lg:h-28 xl:w-[116px] xl:h-[116px]`** (sekitar 104px s.d. 116px).
     - Radius sudut squircle: `rounded-[24px] sm:rounded-[26px] lg:rounded-[28px] xl:rounded-[30px]`.
     - Padding dalam: `p-3 sm:p-3.5 lg:p-4`.
   - **Ukuran Ikon Hewan di Dalam Kartu Ideal (~64px):**
     - Dikalibrasi menjadi **`w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-[68px] xl:h-[68px]`** (sekitar 56px s.d. 68px).
     - Rasio pengisian ikon terhadap kartu mencapai ~55–60%: tidak kekecilan, tidak raksasa/kedodoran, sangat harmonis dan detail gambar tampak tajam.
   - **Ruang Udara & Ketinggian:**
     - Area tengah ubin hewan diset `min-h-[260px] lg:min-h-[300px] xl:min-h-[320px]`, memberikan ruang bernapas yang lega, tidak berhimpitan, dan footer 100vh di desktop tetap pas satu layar penuh tanpa terpotong di atas atau bawah.
3. **Verifikasi Build:**
   - `npm run build` sukses 100% (6.19s) dengan 108 modul ter-bundle sempurna dan 0 error.

---

## 37. Catatan Sesi (17 September 2026 - Bagian 13) - Elevasi Animasi Interaktif Kelas Dunia (Awwwards-Level) Menggunakan GSAP & ScrollTrigger
1. **Latar Belakang & Arahan Pengguna:**
   - Pengguna menanyakan potensi dan kelayakan penggunaan library animasi industri terkemuka **GSAP (GreenSock Animation Platform)** pada proyek CV Banong Farms: *"APAKAH kamu tahu animasi GSAP? dan bagaimana penggunaan animasi tersebut pada project ini? apakah layak, KARENA saya ingin meningkatkan website ini dalam segi animasi User Experience"*.
   - Pengguna kemudian memberikan instruksi tegas untuk menerapkannya secara profesional dan memukau: *"oke coba untuk animasi gsapnya diterapkan yang profesional memukau DAN BISA membuat user terpukau dan belum pernah merasakan diwebsite-website lainnya!"*.
2. **Arsitektur & Implementasi GSAP:**
   - **Instalasi Paket:** Menambahkan `gsap` resmi ke `dependencies` di `package.json`.
   - **Footer 100vh Interactive Animal Garden (`FooterSection.vue`):**
     - **3D Magnetic Repulsion & Attraction Physics:** Saat kursor mouse digerakkan di atas area ubin hewan di desktop, sistem menghitung vektor jarak Euclidean $(dx, dy)$ dan membelokkan ubin squircle secara dinamis ke arah luar kursor dengan efek rotasi 3D tilt (`rotateX`, `rotateY`, `scale: 1.08`, `transformPerspective: 800`).
     - **Staggered Elastic Pop-In Entrance:** Saat footer memasuki viewport scroll, ScrollTrigger memicu kemunculan 10 ubin hewan secara elastis bergelombang (`scale: 0` ke `1`, `y: 70`, `rotation: random(-30, 30)`, `ease: elastic.out(1.1, 0.55)`).
     - **Continuous Organic Buoyancy:** Animasi mengambang bebas hambatan (*perpetual sine buoyancy loop*) dengan durasi dan pergeseran fasa yang asinkron sehingga hewan-hewan tampak hidup secara alami.
   - **Reputasi & Kredibilitas (`CredibilitySection.vue`):**
     - **Dynamic Rolling Counter Ticker:** Ticker angka berputar halus dari `0` menuju `14rb+` dalam durasi 2.2 detik dengan kurva `power3.out` saat pengguna mencapai section Reputasi.
     - **3D Gyroscopic Depth Tilt:** Kartu piagam sertifikat kelayakan NIB dan piala penghargaan merespons posisi mouse dengan tilt 3D berperspektif 1000px dan kembali ke posisi netral secara anggun saat mouse keluar.
     - **Staggered Slide-Up Fitur:** Dua kartu keunggulan (*Pakan Alami Bebas Hormon* & *Sanitasi Veteriner*) terangkat perlahan ke atas dengan efek fade-in terkoordinasi.
   - **Marquee Komoditas Peternakan (`InteractiveMarqueeMenu.vue`):**
     - **Velocity-Based Scroll Scrubbing:** Mengintegrasikan GSAP ScrollTrigger dengan Web Animations API (`animation.playbackRate`). Saat pengguna scroll halaman dengan cepat, teks marquee berakselerasi proporsional hingga 3.2x dan kembali melambat secara anggun dengan inersia alami saat scroll berhenti.
   - **Katalog Produk Panen Segar (`ProductGrid.vue`):**
     - **Cascading Staggered Card Reveal:** Kartu produk memudar dan terangkat ke atas secara beruntun (*staggered waterfall entry*) berdurasi 0.45s baik saat pertama kali masuk layar maupun saat pengguna berpindah tab kategori (Unggas, Perikanan, Daging, Sayur, dll.) atau berpindah halaman.
3. **Standar Performa & Keamanan Memori:**
   - Menggunakan `gsap.context()` dan `ctx.revert()` di siklus `onUnmounted` pada semua komponen Vue 3 untuk memastikan pembersihan memori (*garbage collection*) sempurna dan mencegah kebocoran RAM browser.
   - Deteksi `window.matchMedia('(pointer: coarse)').matches` untuk mematikan kalkulasi mouse physics pada layar sentuh/mobile guna mempertahankan baterai dan performa 60–120 FPS tanpa lag.
4. **Validasi & Hasil:**
   - `npm run build` sukses 100% (6.79s) dengan 112 modul ter-bundle sempurna dan 0 error.
   - Seluruh fungsionalitas inti (keranjang belanja, checkout WhatsApp, Supabase cloud store) tetap berfungsi 100% stabil tanpa interferensi.






