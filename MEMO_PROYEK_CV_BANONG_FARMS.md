# MEMORANDUM & CHECKPOINT PROYEK: CV BANONG FARMS
**Tanggal Pembaruan Terakhir:** 10 September 2026 (Sesi Pagi - Spacing & Viewport UX Enhancement)  
**Status Proyek:** Siap Produksi (Build Passed / Zero Errors / Code Quality Verified)  
**Tujuan Dokumen:** Memastikan kesinambungan konteks teknis, arsitektur, panduan desain warna, dan logika sistem untuk memulai sesi pengembangan berikutnya tanpa kehilangan jejak.

---

## 1. Identitas & Tech Stack Proyek
* **Framework:** Vue 3 (Composition API `<script setup>`) + Vite
* **Styling:** Tailwind CSS (Vanilla CSS + Custom Token Design System)
* **Design Rule:** **Strict 60% : 30% : 10% Color System**
* **State Management:** Reactive Stores (`useAdminStore.js` dan `useCartStore.js`) dengan persistensi `localStorage`
* **Database Backend:** Supabase Cloud PostgreSQL 24/7 + WebSocket Real-time Replication
* **Nomor WhatsApp Resmi Admin:** **`08999192861`** (Format URL: `https://wa.me/628999192861`)

---

## 2. Standar Desain Visual & Aturan Warna (WAJIB DIPATUHI)
Sesuai arahan mutlak pada sesi ini, seluruh UI/UX landing page wajib tunduk pada **Rule 60% : 30% : 10%**:
1. **60% Dominan (PUTIH / Surface Light)**:
   - Warna latar belakang (`bg-surface-pure`, `bg-surface-subtle`, `bg-white`).
   - Latar bingkai foto polaroid, teks inactive marquee (`text-slate-200/90`), border tipis netral (`border-slate-200/80`).
2. **30% Sekunder (BIRU / Brand Navy Blue CV Banong Farms)**:
   - Token Tailwind: `primary` (`#022448`), `primary-container` (`#1e3a5f`).
   - Digunakan untuk: Teks judul saat di-hover di Marquee, tombol sekunder (*"Jelajahi Produk Panen"*, *"Lihat Katalog"*), latar *floating cart button*, border kartu komoditas, dan elemen struktural.
3. **10% Aksen (KUNING / Golden Yellow CV Banong Farms)**:
   - Token Tailwind: `secondary-container` (`#fcd400`), `accent-hover` (`#e6c200`), `secondary` (`#705d00`).
   - Digunakan untuk: **Tombol Call-to-Action Utama** (**"PESAN SEKARANG"**, **"Kirim Pesanan ke WA Admin"**, **"Tambah ke Keranjang"**, **"Hubungi Banong Farms"**), badge counter belanja di Navbar & Floating Cart, serta ikon verifikasi & checkmark.
4. **LARANGAN WARNA LAIN**:
   - **Warna Merah (`#c8102e`, `red-...`, `rose-...`) dan Hijau (`emerald-...`) DIBUANG TOTAL** dari landing page publik. Jangan pernah menambahkan kembali tombol merah atau hijau pada landing page.

---

## 3. Komponen-Komponen Baru & Fitur yang Telah Selesai Hari Ini

### A. 5-Baris Marquee Menu Interaktif (`src/components/InteractiveMarqueeMenu.vue`)
- **Posisi:** Terletak persis **sebelum section CTA Polaroid** di `App.vue`.
- **Konten Autentik CV Banong Farms (Bukan Makanan/Resto):**
  1. *TELUR AYAM & BEBEK SEGAR* (Foto: Keranjang & tray telur organik panen harian).
  2. *PETERNAKAN UNGGAS ALAMI* (Foto: Kawasan peternakan unggas bebas di perbukitan Ajibarang).
  3. *DAGING ORGANIK HIGIENIS* (Foto: Karkas ayam utuh segar higienis).
  4. *PERIKANAN AIR DERAS* (Foto: Ikan air tawar segar & higienis).
  5. *PUPUK KASGOT ORGANIK* (Foto: Pupuk kasgot hasil biokonversi maggot BSF ramah lingkungan).
  - **Pembaruan Header:** Elemen *Section Header / Subtitle* (badge komoditas unggulan, judul panen segar, dan panduan kursor) telah **dihapus total** untuk memaksimalkan kesan minimalis, elegan, dan lapang (*pure continuous marquee focus*).
- **Karakteristik Animasi & UX:**
  - 5 baris berjalan bersilangan (zigzag/berlawanan arah) dengan kecepatan selaras (~14s-20s linear infinite).
  - Ukuran teks proporsional (`text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[64px]`).
  - **Auto-Resume Saat Unhover:** Jika kursor dijauhkan, teks langsung kembali berjalan otomatis dan kartu foto tertutup (tidak ada state yang nyangkut).
  - **Arah Popup Foto:** Baris 1-2 membuka ke bawah, sedangkan baris 3, 4, dan 5 membuka **ke atas** (`bottom-[...]`) sehingga kartu foto **tidak pernah terpotong** oleh batas bawah section.
  - **Ukuran Kartu Foto:** Skala proporsional Goldilocks (`w-40 sm:w-48 md:w-54 lg:w-60 xl:w-64`).

### B. Kluster Foto Polaroid & CTA Section (`src/components/PolaroidCtaSection.vue`)
- **Headline Rapi 1 Baris:** *"PANEN SEGAR, ALAMI!"* dengan tata letak satu baris penuh yang sangat nyaman dibaca tanpa pemotongan canggung.
- **Kluster Polaroid 3 Foto Asimetris:**
  - Jarak lapang terhadap teks kanan (`gap-12 lg:gap-16 xl:gap-24`).
  - Variasi jarak asimetris: Foto kiri menempel rapat dengan foto tengah, sedangkan foto kanan lebih renggang.
  - Skala kartu seimbang dan tidak terlalu menjulang tinggi ke atas.
- **Tombol CTA Kuning Emas:** Tombol merah lama telah diganti dengan tombol Kuning Emas khas Banong Farm (`bg-secondary-container hover:bg-accent-hover text-primary font-black border border-yellow-400/40`).
- **Glow & Badges:** Glow halus biru-kuning dan badge verifikasi berikon kuning emas.

### C. Pembersihan Warna pada Komponen Lain
- **`VisiMisiSection.vue`:** Seluruh warna hijau emerald dan sky blue telah diubah menjadi kombinasi Navy Blue (`primary`) dan Kuning Emas (`secondary-container`).
- **`Navbar.vue` & `App.vue`:** Tombol keranjang belanja dan floating cart button pojok kiri bawah menggunakan latar Biru Navy dengan badge counter Kuning Emas.
- **`CartDrawer.vue` & `ProductModal.vue`:** Tombol checkout kirim pesanan WA dan tambah ke keranjang menggunakan Kuning Emas (`bg-secondary-container text-primary font-black`).

### D. Revisi Spacing Antarseksi & Viewport UX (150% - 180% Dramatic Negative Space)
- **Tujuan:** Menghilangkan total kesan penumpukan teks dalam satu layar viewport. Setiap seksi berdiri mandiri dan megah, memberikan pengalaman visual yang sangat lapang, tenang, dan premium (editorial magazine style).
- **Detail Penyesuaian Spacing Ekstrem (150% - 180%):**
  1. `VisiMisiSection.vue`: Padding vertikal dinaikkan drastis menjadi **`py-36 sm:py-52 lg:py-72 xl:py-80`** (144px s.d. 320px).
  2. `ProductGrid.vue`: Padding vertikal dinaikkan drastis menjadi **`py-36 sm:py-52 lg:py-72 xl:py-80`**, Trust Bar dipisah ke bawah dengan jarak masif `mt-28 sm:mt-40 lg:mt-52`.
  3. `InteractiveMarqueeMenu.vue`: Padding vertikal dinaikkan menjadi **`py-36 sm:py-52 lg:py-72 xl:py-80`**, padding tiap baris digandakan menjadi `py-6 sm:py-8 lg:py-10`.
  4. `PolaroidCtaSection.vue`: Padding vertikal dinaikkan menjadi **`py-36 sm:py-52 lg:py-72 xl:py-80`**.
  5. `FooterSection.vue`: Padding diperluas menjadi **`pt-32 sm:pt-44 lg:pt-56 pb-16 sm:pb-24 lg:pb-32`**.

### E. Penyelarasan Internal Konten Visi & Misi (`VisiMisiSection.vue`)
- **Tujuan:** Menghilangkan kelonggaran berlebih di *dalam* teks konten seksi Visi & Misi agar ritme membaca lebih padat, ringkas, dan fokus.
- **Perubahan Spesifik:**
  1. **Deskripsi Narasi:** Diringkas menjadi tepat **1 paragraf** yang padat dan kuat mengenai agribisnis berkelanjutan, kearifan lokal Ajibarang, sanitasi veteriner, dan jaminan kesegaran pangan < 12 jam.
  2. **Penghapusan Tombol:** Tombol sekunder (*"Jelajahi Produk Panen"* dan *"Hubungi Banong Farms"*) **dihapus total** dari seksi Visi & Misi untuk mengeliminasi beban visual di bagian bawah teks.
  3. **Kerapatan Tipografi:** Margin antar-elemen teks diperpendek (`mb-2` judul, `mb-3` sub-judul, `mt-5 pt-5` kotak visi misi, dan `gap-2` poin misi) sehingga kolom kiri seimbang dan serasi secara vertikal dengan 3 bingkai foto di kolom kanan.

### F. Penyelarasan Jarak Trust Bar & Bawah Katalog (`ProductGrid.vue`)
- **Tujuan:** Menghilangkan jurang pemisah kosong antara katalog produk dengan Trust Bar peternakan etika, serta merapatkan jarak bagian bawah seksi katalog terhadap seksi marquee di bawahnya.
- **Perubahan Spesifik:**
  1. **Jarak Atas Trust Bar:** Margin atas Trust Bar diturunkan drastis dari `mt-28 sm:mt-40 lg:mt-52` menjadi **`mt-8 sm:mt-10 lg:mt-12`** (serta margin pagination `mt-8 sm:mt-10`), sehingga Trust Bar menyatu erat sebagai penutup katalog yang kohesif dan proporsional.
  2. **Jarak Bawah Seksi 3:** Padding bawah seksi `ProductGrid` dipersempit dari `pb-80` menjadi **`pb-12 sm:pb-16 lg:pb-20`**, menghasilkan transisi yang rapat dan mulus menuju seksi Marquee tanpa kehampaan vertikal yang berlebihan.

### G. Penyeragaman Warna Latar Belakang Seluruh Seksi (100% Seamless Surface)
- **Tujuan:** Menjamin konsistensi visual 100% pada seluruh seksi konten tanpa perbedaan kontras latar abu-abu/putih yang mengganggu mata.
- **Perubahan Spesifik:**
  1. `PolaroidCtaSection.vue`: Warna latar belakang diubah dari `bg-surface-subtle` (`#F8FAFC`) dan `dark:bg-[#060D1E]` menjadi **`bg-surface-pure` (`#FFFFFF`) dan `dark:bg-[#070D1E]`**, persis identik dengan seksi-seksi sebelumnya.
  2. `ProductGrid.vue`: Mode gelap diselaraskan dari `dark:bg-[#0A1128]` menjadi **`dark:bg-[#070D1E]`** agar transisi antar-seksi dalam mode gelap maupun terang 100% mulus (*seamless*).

### H. Redesain Footer Editorial 100vh Desktop: Logo Resmi di Samping Produk Panen, Peta Interaktif & Judul Raksasa (`FooterSection.vue`)
- **Tujuan:** Mengintegrasikan logo resmi CV Banong Farms di samping Kolom 1 (*Produk Panen*), melengkapi peta interaktif live Google Maps, tombol medsos berukuran besar, bilah bawah bersih, dan judul raksasa 1 baris utuh dalam layout 100vh desktop.
- **Perubahan Spesifik:**
  1. **Logo Resmi di Samping Kolom 1:** Logo bundar resmi CV Banong Farms (`/assets/logo.png`) ditempatkan persis di sebelah kiri daftar *Produk Panen* (`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow`), dilengkapi efek hover interaktif dan tautan kembali ke atas.
  2. **Peta Google Maps Interaktif (Live Draggable Iframe):** `<iframe>` Google Maps interaktif resmi CV Banong Farms di koordinat Ajibarang (`-7.4065147, 109.0743739`) yang bisa digeser dan di-zoom langsung di website, lengkap dengan tombol *"Buka di Maps"*.
  3. **Ikon Sosial Media Diperbesar:** Tombol media sosial berukuran **`w-11 h-11 sm:w-12 sm:h-12`** dengan ikon `text-[22px] sm:text-[24px]` di bawah peta.
  4. **Pembersihan Bilah Bawah:** Tombol *"Cari Produk"* dan tag *"Ajibarang, ID"* telah dihapus. Bilah paling bawah kini bersih berisi hak cipta dan legalitas.
  5. **Judul Raksasa 1 Baris Utuh:** Teks **`CV BANONG FARMS`** berukuran masif (**`text-4xl sm:text-5xl md:text-7xl lg:text-[86px] xl:text-[112px] 2xl:text-[136px] font-black`**) dengan **`whitespace-nowrap leading-none`** dan efek retro 3D extrusion text shadow kuning emas `#fcd400`.
  6. **Tinggi 100vh Desktop & Padding Atas Lega:** Footer berdimensi `lg:min-h-screen flex flex-col justify-between` dengan padding atas `pt-20 sm:pt-28 lg:pt-36`.

---

## 4. Alur Bisnis & Integrasi Database (Sudah Aktif)
1. **User Memilih Produk:** Pelanggan memilih produk dari katalog publik -> klik *"Tambah ke Keranjang"* -> menentukan jumlah di modal -> masuk ke `useCartStore`.
2. **Submit Pesanan via Drawer:** Pelanggan mengisi formulir (Nama, WA, Alamat) -> klik tombol Kuning *"Kirim Pesanan ke WA Admin"*:
   - Pesanan otomatis tersimpan di tabel Supabase `pesanan` (status: `'Menunggu Konfirmasi'`) dan `detail_pesanan`.
   - Tab WhatsApp resmi admin (`08999192861`) terbuka dengan pesan tiket format rapi.
3. **Validasi Admin di Dashboard (`#/admin`):**
   - Admin login melalui email/password Supabase Auth.
   - Admin memeriksa pesanan di **WhatsApp Live Feed**.
   - Klik **"Validasi Selesai (Deal)"**: Status berubah jadi `'Selesai'`, stok fisik di tabel `produk` otomatis terpotong, dan metrik omzet harian tercatat.

---

## 5. Peta File Utama (Key Architecture Map)
* **Section Marquee 5 Baris:** `src/components/InteractiveMarqueeMenu.vue`
* **Section CTA Polaroid:** `src/components/PolaroidCtaSection.vue`
* **Section Visi & Misi:** `src/components/VisiMisiSection.vue`
* **Root Application:** `src/App.vue`
* **Katalog Produk & Filter:** `src/components/ProductGrid.vue` & `ProductCard.vue`
* **Modal Detail Produk:** `src/components/ProductModal.vue`
* **Keranjang Belanja Drawer:** `src/components/CartDrawer.vue`
* **Navigasi Atas & Footer:** `src/components/Navbar.vue` & `FooterSection.vue`
* **Command Center Admin:** `src/components/admin/CommandCenter.vue`
* **Feed Pesanan WA:** `src/components/admin/WhatsAppLiveFeed.vue`
* **Store Keranjang & Admin:** `src/stores/useCartStore.js` & `src/stores/useAdminStore.js`
* **Konfigurasi Tailwind & Warna:** `tailwind.config.js`

---

## 6. Checklist Pengingat untuk Memulai Sesi Berikutnya
Saat pengguna membuka sesi berikutnya, asisten AI berikutnya **wajib membaca checklist ini sebelum menyentuh kode**:
- [ ] **Pertahankan Aturan Warna 60:30:10:** Jangan memasukkan warna merah (`#c8102e`, `red-...`) atau hijau (`emerald-...`) pada komponen publik. Selalu gunakan Putih, Biru Navy (`primary`), dan Kuning Emas (`secondary-container`).
- [ ] **Pertahankan Posisi & Kecepatan Marquee:** Marquee tetap berada persis sebelum CTA Polaroid, dengan arah popup baris 3-5 mengarah ke atas agar tidak terpotong.
- [ ] **Ide Fitur Lanjutan yang Siap Dikerjakan (Jika Diinstruksikan Pengguna):**
  1. *Ekspor Laporan Transaksi:* Menambahkan tombol download rekap penjualan bulanan/mingguan ke format Excel (.xlsx) atau PDF di dashboard admin.
  2. *Filter Tanggal & Pencarian Pesanan:* Fitur cari pesanan berdasarkan nama pembeli / kode tiket `#BNG-xxxx` di dashboard admin.
  3. *Audio/Sound Alert Pesanan Baru:* Notifikasi suara denting bel saat ada orderan masuk di dashboard admin.
  4. *Multi-admin Role:* Pengaturan hak akses (Super Admin vs Staf Gudang).

---

## 7. Perintah Operasional
* **Menjalankan Server Lokal:**
  ```bash
  npm run dev
  ```
  - URL Pengunjung: `http://localhost:5173/`
  - URL Dashboard Admin: `http://localhost:5173/#/admin`
* **Verifikasi Build Produksi:**
  ```bash
  npm run build
  ```
  *(Status terakhir: 101 modul berhasil di-bundle, 0 error).*
