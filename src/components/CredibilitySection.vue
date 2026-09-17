<template>
  <section 
    id="kelayakan" 
    class="w-full py-16 sm:py-20 lg:py-24 bg-surface-subtle dark:bg-[#070D1E] transition-colors duration-300 relative overflow-hidden"
  >
    <!-- Kontainer Maksimal Sesuai Grid Desain -->
    <div class="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      
      <!-- 1. Baris Atas: Headline Besar & Metrik 115k + Avatar Tumpuk (Persis Referensi Gambar) -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
        
        <!-- Sisi Kiri: Judul Utama & Subtitle 1 Baris -->
        <div class="max-w-2xl">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Standar Mutu &amp; Legalitas Resmi untuk Pangan Anda
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Berizin resmi NIB, higienis, dan teruji laboratorium untuk menjamin pangan sehat keluarga setiap hari.
          </p>
        </div>

        <!-- Sisi Kanan: Metrik Besar + Avatar Bertumpuk + Keterangan (Persis Referensi "115k Trusted by Hospital") -->
        <div class="flex flex-col items-start lg:items-end shrink-0 pt-2 lg:pt-0">
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Angka Metrik Raksasa -->
            <span class="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight text-slate-900 dark:text-white leading-none">
              14rb+
            </span>

            <!-- 4 Lingkaran Bertumpuk (Overlapping Avatars/Photos) -->
            <div class="flex -space-x-2.5 sm:-space-x-3 overflow-hidden p-0.5">
              <img 
                src="/assets/product-eggs.png" 
                alt="Panen Telur Segar" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover bg-amber-50 shadow-xs"
                title="Panen Telur Ayam & Bebek Segar Harian"
              />
              <img 
                src="/assets/product-chicken.png" 
                alt="Unggas Sehat Alami" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover bg-emerald-50 shadow-xs"
                title="Ayam Kampung Bebas Hormon Sintetis"
              />
              <img 
                src="/assets/product-duck.png" 
                alt="Bebek & Itik Pilihan" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover bg-blue-50 shadow-xs"
                title="Bebek & Entok Sehat Alami"
              />
              <img 
                src="/assets/product-fish.png" 
                alt="Ikan Air Tawar Segar" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover bg-cyan-50 shadow-xs"
                title="Ikan Nila Air Deras Ajibarang"
              />
            </div>
          </div>

          <!-- Keterangan Subtitle di Bawah Angka -->
          <span class="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 font-outfit uppercase">
            Dipercaya 1.400+ Pelanggan &amp; Mitra
          </span>
        </div>

      </div>

      <!-- 2. Kontainer Kartu Utama (Desain Bersih, Elegan & Modern Sesuai Referensi) -->
      <div class="bg-white dark:bg-[#0c182c] rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-12 shadow-xl dark:shadow-2xl border border-slate-200/80 dark:border-slate-800/80">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- SISI KIRI: Showcase Sertifikat Resmi & Piala Keunggulan (Pengganti Foto Dokter Sesuai Permintaan) -->
          <div class="lg:col-span-5 relative w-full flex flex-col items-center">
            
            <!-- Bingkai Foto Sertifikat & Piala Keunggulan -->
            <div class="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:to-[#081224] border border-slate-200/70 dark:border-slate-800 shadow-md group">
              <!-- Foto Sertifikat Resmi + Piala Asli CV Banong Farms -->
              <img 
                src="/assets/sertifikat_kelayakan_cv_banong.jpg" 
                alt="Sertifikat Kelayakan Mutu dan Higienis CV Banong Farms" 
                class="w-full h-[400px] sm:h-[460px] md:h-[500px] lg:h-[520px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <!-- Gradient Vignette Lembut di Bagian Bawah Gambar -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              <!-- Overlay Card di Bagian Bawah Gambar (Persis Seperti Overlay Nama Dokter pada Gambar Referensi) -->
              <div class="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 shadow-xl border border-white/40 dark:border-slate-800">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h4 class="font-extrabold font-outfit text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                      Sertifikasi Mutu &amp; Higienis
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      Izin Usaha NIB: 018/KMF/BPOM-AGRI/2023
                    </p>
                    
                    <!-- Rating & Jumlah Review Pelanggan -->
                    <div class="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-500">
                      <span class="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span class="text-slate-800 dark:text-slate-200">4.9</span>
                      <span class="text-slate-400 font-normal">(1.428 ulasan pembeli puas)</span>
                    </div>
                  </div>

                  <!-- Badge Verifikasi Hijau -->
                  <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0" title="Terverifikasi Resmi">
                    <span class="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>

                <!-- Tautan Kontak & Medsos Resmi (Persis Ikon Medsos di Kartu Referensi) -->
                <div class="flex items-center gap-3 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 text-xs">
                  <a 
                    href="https://wa.me/628999192861" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="hover:text-emerald-500 transition-colors flex items-center gap-1 font-medium"
                    title="WhatsApp Resmi CV Banong"
                  >
                    <span class="material-symbols-outlined text-[15px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="hover:text-pink-500 transition-colors flex items-center gap-1 font-medium"
                    title="Instagram Resmi CV Banong"
                  >
                    <span class="material-symbols-outlined text-[15px]">photo_camera</span>
                    <span>Instagram</span>
                  </a>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                    <span>100% Halal</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          <!-- SISI KANAN: Penjelasan Narasi & 2 Kartu Fitur Tambahan (Persis Referensi Gambar) -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-8 sm:space-y-10">
            
            <!-- Narasi Atas: Judul Award-Winning & Deskripsi Mendalam -->
            <div class="space-y-4">
              <h3 class="text-2xl sm:text-3xl lg:text-[34px] font-black font-outfit text-slate-900 dark:text-white tracking-tight leading-tight">
                Standar Higienis Teruji &amp; Kredibilitas yang Dapat Anda Percaya
              </h3>
              
              <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                CV Banong Farms beroperasi dengan kepatuhan standar mutu peternakan modern di bawah pengawasan veteriner terpadu dan izin legalitas Nomor Induk Berusaha (NIB). Kami memastikan setiap butir telur segar harian, karkas unggas higienis, domba, kambing, serta ikan air tawar dipanen dari lingkungan sehat alami bebas suntikan hormon sintetis dan tanpa residu antibiotik berbahaya.
              </p>
              
              <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Dengan pendekatan agribisnis sirkular terpadu dan pemanfaatan larva Black Soldier Fly (BSF) sebagai pengurai limbah organik, kami menjamin nutrisi pakan berprotein murni yang menghasilkan produk pangan lezat, sehat, dan berdaya simpan lebih tahan lama secara alami untuk keluarga Anda.
              </p>
            </div>

            <!-- 2 Kartu Pendukung di Bawah Narasi (Persis Kartu "Optimize Payroll" & "Streamline Compliance") -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              
              <!-- Kartu 1: Pakan Alami & Bebas Kimia (Sesuai Kartu Kiri Bawah di Gambar) -->
              <div class="bg-[#F8FAFC] dark:bg-[#071120] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                <!-- Icon Box di Pojok Kiri Atas Kartu -->
                <div class="w-11 h-11 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span class="material-symbols-outlined text-[24px]">eco</span>
                </div>

                <h4 class="font-bold font-outfit text-base sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                  Pakan Alami Bebas Hormon
                </h4>

                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pakan racikan dedak alami, hijauan jagung, dan larva maggot BSF berprotein tinggi menghasilkan daging dan telur padat nutrisi yang bebas bahan pengawet sintesis.
                </p>
              </div>

              <!-- Kartu 2: Pengawasan Veteriner & Sanitasi (Sesuai Kartu Kanan Bawah di Gambar) -->
              <div class="bg-[#F8FAFC] dark:bg-[#071120] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                <!-- Icon Box di Pojok Kiri Atas Kartu -->
                <div class="w-11 h-11 rounded-xl bg-teal-100/70 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span class="material-symbols-outlined text-[24px]">health_and_safety</span>
                </div>

                <h4 class="font-bold font-outfit text-base sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                  Sanitasi &amp; Uji Veteriner
                </h4>

                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pemeriksaan berkala kesehatan hewan, sterilisasi kandang biosekuriti, dan sirkulasi air kolam deras menjamin keamanan biologis pangan sesuai standar dinas terkait.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Credibility & Trust Section untuk CV Banong Farms
</script>
