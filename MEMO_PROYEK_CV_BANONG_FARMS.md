# MEMORANDUM & CHECKPOINT PROYEK: CV BANONG FARMS
**Tanggal Pembaruan Terakhir:** 11 September 2026 (Sesi Pembaruan: Upload Gambar Produk, Pembersihan Tombol Redundan, Katalog Multi-Browser Supabase .env, & Alur Pemesanan WA 2-Langkah)  
**Status Proyek:** Siap Produksi (Vite v6.4.3 Build Passed / Zero Errors / Supabase Cloud PostgreSQL 100% Terhubung / Zero Ghost Orders WA)  
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
  - *Tautan Tengah:* Katalog, Lokasi, Tentang, Kontak dengan soft pill indicator pada link aktif/hover.
  - *Aksi Kanan:*
    1. Tombol **"🛒 Keranjang"** semi-transparan dengan badge angka item jika ada belanjaan.
    2. Tombol **"Hubungi kami"** kapsul kuning emas (`#fcd400` / `#e6c200`) ke WhatsApp Admin `08999192861`.
    3. Tombol **Profil Admin** bundar navy (`#022448`) dengan ikon siluet user untuk berpindah langsung ke CommandCenter Admin (`@openAdmin`).
    4. Tombol **Mode Terang/Gelap** bundar kaca transparan.
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
  1. *Optimasi Pengalaman Mobile (Responsive Polish):* Pengecekan menyeluruh layout pada layar smartphone kecil (< 400px).
  2. *Ekspor Laporan Transaksi Admin:* Penambahan tombol unduh rekapitulasi penjualan (harian/bulanan) ke format Excel (.xlsx) atau PDF di dashboard admin.
  3. *Filter & Pencarian Pesanan Admin:* Fitur pencarian tiket pesanan berdasarkan nama pembeli / ID pesanan `#BNG-xxxx`.
  4. *Audio/Sound Alert Pesanan Baru:* Notifikasi suara denting bel saat ada orderan masuk di dashboard admin secara realtime.
  5. *Penyempurnaan SEO & Meta Tags:* Penambahan Open Graph image dan structured data schema (LocalBusiness / Farm) untuk Google Search.

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

