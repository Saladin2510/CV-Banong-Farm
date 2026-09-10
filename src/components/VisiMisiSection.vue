<template>
  <section 
    id="tentang-kami" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-36 sm:py-52 lg:py-72 xl:py-80 transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Subtle Background Ambient Accents (Blue & Yellow) -->
    <div class="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10">
      
      <!-- Top Breadcrumb / Category Tracker (Style like Whello reference) -->
      <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-3 sm:mb-4 font-telemetry-code">
        <span>Sentra Agribisnis Ajibarang</span>
        <span class="text-slate-300 dark:text-slate-600">/</span>
        <span class="text-primary dark:text-secondary-container font-bold">Tentang CV Banong Farms</span>
      </div>

      <!-- Main Split Layout (Grid 12 cols: 6 or 7 cols Left, 5 or 6 cols Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        
        <!-- LEFT COLUMN: Content & Vision / Mission Narrative -->
        <div class="lg:col-span-7 flex flex-col justify-center">
          
          <!-- Big Section Title (Style like "Discover our DNA") -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-primary dark:text-secondary-container tracking-tight leading-tight mb-2 sm:mb-2.5">
            Discover our DNA
          </h2>

          <!-- Bold Lead Statement -->
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3 sm:mb-3.5">
            CV Banong Farms hadir untuk ketahanan &amp; kemandirian pangan sejati.
          </h3>

          <!-- Narrative Paragraph (Cukup 1 Paragraf Saja Sesuai Arahan) -->
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            CV Banong Farms menghadirkan agribisnis berkelanjutan di tanah Ajibarang, Banyumas dengan memadukan kearifan peternak lokal, sanitasi veteriner modern, dan biokonversi sirkular ramah lingkungan untuk menghasilkan pangan hewani murni, sehat, halal, dan beretika langsung ke meja Anda.
          </p>

          <!-- Visi & Misi Key Highlights (Lebih Rapat & Padat) -->
          <div class="mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3.5 sm:space-y-4">
            
            <!-- Visi Card (Compact & Sleek) -->
            <div class="p-3.5 sm:p-4 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 dark:border-primary/40">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px]">visibility</span>
                <span class="text-xs uppercase font-extrabold tracking-wider text-primary dark:text-white font-telemetry-code">
                  Visi Utama
                </span>
              </div>
              <p class="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                "Menjadi sentra agribisnis dan peternakan terintegrasi terkemuka di Jawa Tengah yang berdaya saing tinggi, berkelanjutan, serta menghadirkan produk pangan bergizi murni yang aman, halal, dan terjangkau bagi masyarakat."
              </p>
            </div>

            <!-- Misi 4 Bullet Grid (Yellow Checkmark Accents) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Pangan segar &amp; pakan bernutrisi bebas hormon sintetis.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Pertanian zero-waste berbasis biokonversi maggot BSF &amp; kasgot.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Kemitraan berdaya bersama kelompok peternak lokal Banyumas.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Distribusi rantai dingin harian &amp; panen sampai &lt; 12 jam.</span>
              </div>
            </div>

          </div>

        </div>

        <!-- RIGHT COLUMN: 3 Staggered Vertical Rounded Image Strips (Whello Triptych Gallery) -->
        <div class="lg:col-span-5 relative">
          
          <!-- Background accent halo -->
          <div class="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-secondary-container/10 to-primary/5 rounded-3xl blur-2xl pointer-events-none"></div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4 items-center relative z-10">
            
            <!-- Column 1: Pak Peternak dengan Keranjang Telur Organik -->
            <div class="flex flex-col gap-3 transform translate-y-3 sm:translate-y-5">
              <div class="h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group">
                <img 
                  src="/assets/visi-farmer-eggs.jpg" 
                  alt="Peternak Organik Telur CV Banong Farms Ajibarang"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 2: Ahli Agribisnis Memeriksa Peternakan (Slightly shifted / taller) -->
            <div class="flex flex-col gap-3 transform -translate-y-3 sm:-translate-y-5">
              <div class="h-[310px] sm:h-[410px] lg:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group">
                <img 
                  src="/assets/visi-farmer-check.jpg" 
                  alt="Ahli Peternakan CV Banong Farms Memeriksa Ayam Sehat"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 3: Lanskap Peternakan & Gunung Slamet Ajibarang -->
            <div class="flex flex-col gap-3 transform translate-y-1 sm:translate-y-2">
              <div class="h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group">
                <img 
                  src="/assets/hero-bg.png" 
                  alt="Lanskap Peternakan Terbuka CV Banong Farms di Ajibarang"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
// Pure presentation component with zero external dependencies
</script>
