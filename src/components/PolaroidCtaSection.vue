<template>
  <section 
    id="contact"
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-300 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80"
  >
    <!-- Soft Decorative Ambient Glows (Blue & Yellow) -->
    <div class="absolute -top-12 left-1/4 w-80 h-80 bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none"></div>
    <div class="absolute -bottom-10 right-1/4 w-80 h-80 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[140px] rounded-full pointer-events-none"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10">
      
      <!-- 1. Header Khusus Mobile & Tablet (Tampil di atas foto agar hierarki informasi jelas) -->
      <div class="block lg:hidden text-center sm:text-left mb-7 sm:mb-9">
        <!-- Badge Pill -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700 shadow-2xs w-fit mx-auto sm:mx-0">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span class="tracking-wider uppercase text-[11px] font-bold">Pilihan Mitra Peternak Tangguh</span>
        </div>

        <!-- Headline -->
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight font-outfit">
          Pakan Berkualitas, Bibit Sehat, <br class="hidden sm:inline"/>
          <span class="text-primary dark:text-secondary-container">Hasil Panen Ternak Lebih Maksimal.</span>
        </h2>

        <!-- Subtitle -->
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mt-3 mx-auto sm:mx-0">
          Penuhi kebutuhan pakan pabrikan PT. New Hope Indonesia, bibit unggas pilihan, multivitamin Medion, serta alat kandang di CV Banong Farms. Melayani grosir sak dan eceran kiloan dengan pengantaran langsung armada toko ke kandang Anda.
        </p>
      </div>

      <!-- 2. Grid Responsif: Di Desktop 2 Kolom Seimbang (Kiri: Foto Polaroid, Kanan: Konten Teks & CTA) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-center">
        
        <!-- KOLOM GALERI POLAROID -->
        <div class="lg:col-span-6 flex items-center justify-center w-full">
          <div class="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[520px] h-[270px] sm:h-[330px] md:h-[360px] lg:h-[390px] xl:h-[410px] select-none mx-auto">
            
            <!-- Polaroid 1 (Left - Konsultasi Nutrisi & Pakan) -->
            <div 
              class="absolute top-2 sm:top-4 lg:top-6 left-1 sm:left-3 lg:left-4 w-[118px] sm:w-[155px] md:w-[175px] lg:w-[195px] xl:w-[205px] bg-white p-1.5 sm:p-2.5 pb-4 sm:pb-6 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.7)] transform -rotate-[7deg] hover:-rotate-[3deg] hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer z-10 border border-slate-200/90 group"
              title="Konsultasi Nutrisi &amp; Pakan Ternak"
            >
              <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
                <img 
                  src="/assets/polaroid-nutrisi-vitamin.jpg" 
                  alt="Konsultasi Kebutuhan Nutrisi dan Vitamin Ternak CV Banong Farms" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div class="mt-1 sm:mt-1.5 text-center text-[9px] sm:text-[11px] text-slate-700 font-bold tracking-wide">
                Konsultasi Nutrisi Pakan
              </div>
            </div>

            <!-- Polaroid 3 (Right - Hasil Panen Ternak Berlimpah) -->
            <div 
              class="absolute top-1 sm:top-2 lg:top-4 right-1 sm:right-3 lg:right-4 w-[122px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[210px] bg-white p-1.5 sm:p-2.5 pb-4 sm:pb-6 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.7)] transform rotate-[6deg] hover:rotate-[2deg] hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer z-10 border border-slate-200/90 group"
              title="Hasil Peternakan Sehat &amp; Berkelanjutan"
            >
              <div class="w-full aspect-[4/5] overflow-hidden bg-slate-100">
                <img 
                  src="/assets/polaroid-panen-optimal.jpg" 
                  alt="Hasil Panen dan Budidaya Unggas Mitra CV Banong Farms" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div class="mt-1 sm:mt-1.5 text-center text-[9px] sm:text-[11px] text-slate-700 font-bold tracking-wide">
                Hasil Panen Optimal
              </div>
            </div>

            <!-- Polaroid 2 (Center Hero - Armada Antar Toko Sendiri) -->
            <div 
              class="absolute bottom-2 sm:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 w-[165px] sm:w-[215px] md:w-[245px] lg:w-[270px] xl:w-[285px] bg-white p-2 sm:p-3 pb-5 sm:pb-7 rounded-xs shadow-[0_18px_40px_rgba(0,0,0,0.24)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.85)] transform -rotate-[1.5deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer z-20 border border-slate-200/90 group"
              title="Armada Pengantaran Mandiri CV Banong Farms"
            >
              <div class="w-full aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src="/assets/polaroid-armada-antar.jpg" 
                  alt="Armada Pengiriman Mandiri CV Banong Farms Langsung Antar ke Kandang Peternak" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div class="mt-1.5 sm:mt-2 text-center text-[10px] sm:text-xs text-slate-900 font-bold tracking-wide">
                Armada Pengantaran Toko ke Kandang
              </div>
            </div>

          </div>
        </div>

        <!-- KOLOM TEKS CTA & AKSI -->
        <div class="lg:col-span-6 flex flex-col justify-center text-center sm:text-left">
          
          <!-- Header Khusus Desktop (Hidden di Mobile & Tablet karena sudah ada di atas) -->
          <div class="hidden lg:block">
            <!-- Badge Pill -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3 sm:mb-4 border border-slate-200 dark:border-slate-700 shadow-2xs w-fit">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span class="tracking-wider uppercase text-[11px] font-bold">Pilihan Mitra Peternak Tangguh</span>
            </div>

            <!-- Headline Desktop -->
            <h2 class="text-3xl lg:text-[38px] xl:text-[42px] font-black text-slate-900 dark:text-white tracking-tight leading-tight font-outfit">
              Pakan Berkualitas, Bibit Sehat, <br/>
              <span class="text-primary dark:text-secondary-container">Hasil Panen Ternak Lebih Maksimal.</span>
            </h2>

            <!-- Descriptive Subtitle Desktop -->
            <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mt-3.5">
              Penuhi kebutuhan pakan pabrikan PT. New Hope Indonesia, bibit unggas pilihan, multivitamin Medion, serta alat kandang di CV Banong Farms. Melayani grosir sak dan eceran kiloan dengan pengantaran langsung armada toko ke kandang Anda.
            </p>
          </div>

          <!-- Action Buttons Group (Hubungi WhatsApp & Lihat Katalog) -->
          <div class="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <!-- Primary Button: Hubungi Toko via WhatsApp -->
            <a 
              href="https://wa.me/628999192861?text=Halo%20Admin%20CV%20Banong%20Farms,%20saya%20ingin%20memesan%20pakan/bibit/obat%20ternak."
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Pesan Pakan via WhatsApp</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>

            <!-- Secondary Button: Lihat Katalog Produk -->
            <a 
              href="#katalog-produk"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 shadow-2xs active:scale-95 transition-all duration-200 cursor-pointer font-sans text-center"
            >
              Lihat Katalog Produk
            </a>
          </div>

          <!-- Trust Badges Row -->
          <div class="mt-7 pt-5 sm:mt-8 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-xs text-slate-700 dark:text-slate-300 font-sans">
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              <span class="material-symbols-outlined text-amber-500 text-[16px] shrink-0">verified</span>
              <span class="font-medium">Produk Pabrikan 100% Asli</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              <span class="material-symbols-outlined text-amber-500 text-[16px] shrink-0">inventory_2</span>
              <span class="font-medium">Grosir Sak &amp; Ecer Kiloan</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              <span class="material-symbols-outlined text-amber-500 text-[16px] shrink-0">local_shipping</span>
              <span class="font-medium">Armada Toko Area Banyumas</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Section CTA Polaroid dengan tata letak proporsional adaptif (Mobile, Tablet, Desktop)
</script>
