<template>
  <section 
    id="cta-panen"
    class="relative w-full bg-surface-subtle dark:bg-[#060D1E] py-16 sm:py-20 lg:py-24 transition-colors duration-300 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80"
  >
    <!-- Soft Decorative Ambient Glows (Blue & Yellow) -->
    <div class="absolute -top-12 left-1/4 w-80 h-80 bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none"></div>
    <div class="absolute -bottom-10 right-1/4 w-80 h-80 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[140px] rounded-full pointer-events-none"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10">
      <!-- Grid dengan jarak/gap lapang dengan kolom teks kanan (gap-12 lg:gap-16 xl:gap-24) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
        
        <!-- LEFT COLUMN: Kluster Polaroid Skala Proporsional & Variasi Jarak Asimetris (lg:col-span-6) -->
        <div class="lg:col-span-6 flex items-center justify-center lg:justify-start">
          <div class="relative w-full max-w-[450px] sm:max-w-[490px] lg:max-w-[520px] h-[350px] sm:h-[390px] lg:h-[420px] select-none">
            
            <!-- Polaroid 1 (Left - Posisi Rapat & Menempel Erat ke Foto Tengah, Tilted -16deg, Berada Lebih Rendah) -->
            <div 
              class="absolute top-8 sm:top-10 lg:top-12 left-1 sm:left-2 lg:left-2 w-38 sm:w-48 lg:w-52 bg-white p-2 sm:p-2.5 pb-7 sm:pb-9 rounded-xs shadow-[0_15px_35px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.65)] transform -rotate-[16deg] hover:-rotate-[8deg] hover:scale-105 hover:z-30 transition-all duration-500 ease-out cursor-pointer z-10 border border-slate-200/90 group"
              title="Kreasi Kuliner Banyumas"
            >
              <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
                <img 
                  src="/assets/polaroid-culinary.jpg" 
                  alt="Olahan Ayam & Telur CV Banong Farms di Dapur Banyumas" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div class="mt-2 text-center text-[10px] sm:text-[11px] text-slate-600 font-semibold tracking-wide">
                Dapur &amp; Kuliner Segar
              </div>
            </div>

            <!-- Polaroid 3 (Right - Posisi Lebih Terbuka & Renggang ke Kanan, Proporsi Pas & Tidak Terlalu Panjang ke Atas, Tilted +12deg) -->
            <div 
              class="absolute top-3 sm:top-4 lg:top-4 right-0 sm:-right-1 lg:-right-2 w-42 sm:w-50 lg:w-56 bg-white p-2 sm:p-2.5 pb-7 sm:pb-9 rounded-xs shadow-[0_15px_35px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.65)] transform rotate-[12deg] hover:rotate-[6deg] hover:scale-105 hover:z-30 transition-all duration-500 ease-out cursor-pointer z-10 border border-slate-200/90 group"
              title="Momen Santap Bersama"
            >
              <div class="w-full aspect-[4/5] overflow-hidden bg-slate-100">
                <img 
                  src="/assets/polaroid-friends.jpg" 
                  alt="Momen Bahagia Menikmati Makanan Segar di Ajibarang" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div class="mt-2 text-center text-[10px] sm:text-[11px] text-slate-600 font-semibold tracking-wide">
                Santap Bahagia Bersama
              </div>
            </div>

            <!-- Polaroid 2 (Center - Di Bagian Bawah Depan z-20, Digeser Merapat ke Foto Kiri (Jarak Rapat ke Kiri, Jarak Lebih Renggang ke Kanan), Tilted -4deg) -->
            <div 
              class="absolute bottom-0 sm:bottom-1 lg:bottom-2 left-[24%] sm:left-[23%] lg:left-[22%] w-48 sm:w-64 lg:w-70 bg-white p-2.5 sm:p-3 pb-8 sm:pb-10 rounded-xs shadow-[0_25px_50px_rgba(0,0,0,0.28)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform -rotate-[4deg] hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 ease-out cursor-pointer z-20 border border-slate-200/90 group"
              title="Santapan Sehat Keluarga"
            >
              <div class="w-full aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src="/assets/polaroid-family.jpg" 
                  alt="Keluarga Sehat Menikmati Santapan Segar CV Banong Farms" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div class="mt-2.5 text-center text-[11px] sm:text-xs text-slate-900 font-extrabold tracking-wide">
                Keluarga Sehat &amp; Alami
              </div>
            </div>

          </div>
        </div>

        <!-- RIGHT COLUMN: CTA Content (Teks 1 Baris Sangat Rapi & Nyaman, Berjarak Luas) -->
        <div class="lg:col-span-6 flex flex-col justify-center text-left">
          
          <!-- Headline 1 Baris Penuh (Sangat Nyaman Dilihat, Bebas Terpotong) -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight font-sans whitespace-normal sm:whitespace-nowrap">
            Panen Segar, <span class="text-primary dark:text-secondary-container">Alami!</span>
          </h2>

          <!-- Descriptive Subtitle Singkat & Mengalir -->
          <p class="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mt-3 sm:mt-4">
            Lengkapi kehangatan meja makan keluarga dan kebutuhan dapur usaha Anda dengan pasokan telur, ayam, bebek, dan ikan segar harian langsung dari peternakan Ajibarang.
          </p>

          <!-- Action Buttons Group (Yellow 10% Accent CTA, White/Navy Secondary) -->
          <div class="mt-6 sm:mt-7 flex flex-wrap items-center gap-3.5">
            <!-- Bold Primary Button: PESAN SEKARANG (Gold Yellow Accent with Navy text) -->
            <a 
              href="https://wa.me/628999192861?text=Halo%20Admin%20CV%20Banong%20Farms,%20saya%20ingin%20memesan%20panen%20segar%20(telur/ayam/ikan)."
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-yellow-500/25 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer font-telemetry-code border border-yellow-400/40"
            >
              <span>PESAN SEKARANG</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>

            <!-- Secondary Button: LIHAT KATALOG (Clean White/Navy) -->
            <a 
              href="#katalog-produk"
              class="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-primary dark:text-slate-200 font-bold text-xs sm:text-sm border border-primary/20 dark:border-slate-700 shadow-xs active:scale-95 transition-all duration-300 cursor-pointer font-telemetry-code"
            >
              LIHAT KATALOG
            </a>
          </div>

          <!-- Trust Badges Row (Yellow Icon Accents) -->
          <div class="mt-7 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-telemetry-code">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px]">verified</span>
              <span>100% Halal</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px]">schedule</span>
              <span>Kirim &lt; 12 Jam</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px]">pin_drop</span>
              <span>Ajibarang</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Pure presentation CTA section with scaled Polaroid imagery and wide-spaced 1-line headline
</script>
