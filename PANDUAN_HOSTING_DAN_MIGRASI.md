# PANDUAN DEPLOYMENT HOSTINGER & MIGRASI HOSTING GRATIS
## Proyek: CV Banong Farms Landing Page & E-Commerce

Dokumen ini berisi rangkuman langkah operasional deployment, panduan berhenti/perpanjang langganan Hostinger, serta panduan memindahkan hosting ke platform gratis (Vercel / Cloudflare Pages) dengan tetap menggunakan domain resmi **`cvbanongfarms.site`**.

---

### 1. Ringkasan Aset & Layanan
* **Domain:** `cvbanongfarms.site` (Masa Aktif: **1 Tahun Penuh**, Rp 17.500)
* **Hosting Awal:** Hostinger Paket **Premium** (Masa Aktif: **1 Bulan**, ~Rp 109.900)
* **Database & Auth:** **Supabase Cloud** (Permanen di Cloud, tidak bergantung pada hosting)
* **Arsitektur:** Client-side SPA (Vite + Vue 3 + Tailwind CSS)

---

### 2. Cara Mematikan Perpanjangan Otomatis (Agar Tidak Kena Auto-Debit Bulan ke-2)
1. Buka dan login ke dashboard **Hostinger hPanel**: [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Klik menu foto profil di pojok kanan atas, lalu pilih **Tagihan (Billing)** atau menu **Subscriptions (Langganan)**.
3. Temukan paket **Web Hosting Premium**.
4. Klik tombol opsi (titik tiga) lalu pilih **Nonaktifkan Perpanjangan Otomatis (Disable Auto-Renewal)**.
5. Selesai. Setelah 30 hari, paket hosting akan berhenti dengan aman tanpa memotong saldo e-wallet atau kartu Anda.

---

### 3. Cara Memperpanjang (Jika Ingin Tetap Pakai Hostinger)
1. Masuk ke **hPanel Hostinger**.
2. Pada baris layanan hosting, klik tombol kuning/merah bertuliskan **Perpanjang Layanan (Renew)**.
3. Pilih periode perpanjangan (1 bulan / 1 tahun) dan lakukan pembayaran melalui QRIS, Virtual Account, atau e-Wallet.
4. Website langsung aktif kembali tanpa perlu upload ulang berkas kodingan.

---

### 4. Roadmap Beralih ke Hosting Gratis (Bulan 2 s/d Bulan 12)
Karena domain `cvbanongfarms.site` sudah Anda miliki selama 1 tahun, Anda bisa memindahkan hosting ke **Vercel** atau **Cloudflare Pages** agar website tetap online **100% GRATIS** tanpa bayar hosting lagi selama sisa 11 bulan.

#### Langkah 1: Push Kodingan ke GitHub
1. Pastikan seluruh source code proyek sudah ter-push ke akun GitHub Anda.

#### Langkah 2: Deploy di Vercel (Gratis Selamanya)
1. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub.
2. Klik **Add New... > Project**, lalu pilih repositori proyek ini.
3. Konfigurasi build otomatis terdeteksi (Framework: Vite, Build Command: `npm run build`, Output Directory: `dist`).
4. Buka menu **Environment Variables**, tambahkan:
   * `VITE_SUPABASE_URL` = URL Supabase proyek Anda
   * `VITE_SUPABASE_ANON_KEY` = Anon Key Supabase Anda
5. Klik tombol **Deploy**. Dalam ~1 menit, web Anda sudah live di Vercel.

#### Langkah 3: Sambungkan Domain `cvbanongfarms.site` ke Vercel
1. Di dashboard proyek Vercel, masuk ke menu **Settings > Domains**.
2. Masukkan nama domain: `cvbanongfarms.site`.
3. Vercel akan menampilkan petunjuk DNS Record (misal CNAME ke `cname.vercel-dns.com` atau A Record ke IP Vercel `76.76.21.21`).
4. Buka **hPanel Hostinger**, masuk ke menu **Domains > cvbanongfarms.site > DNS / Nameservers**.
5. Masukkan CNAME atau A Record dari Vercel tadi ke tabel DNS Hostinger.
6. Tunggu beberapa menit, domain `https://cvbanongfarms.site` akan langsung aktif mengarah ke Vercel secara gratis dan dilengkapi SSL HTTPS otomatis.

---

### 5. Catatan Penting Mengenai Database Supabase
* **Supabase Cloud** berjalan di server mandiri terpisah.
* Kapan pun hosting Anda berpindah (dari Hostinger ke Vercel, atau sebaliknya), **seluruh 74 data produk, stok pakan, obat/vitamin, serta riwayat pesanan TIDAK AKAN HILANG**.
