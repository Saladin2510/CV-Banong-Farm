# MEMORANDUM & CHECKPOINT PROYEK: CV BANONG FARMS
**Tanggal Pembaruan Terakhir:** 9 September 2026 (Sesi Malam)  
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
