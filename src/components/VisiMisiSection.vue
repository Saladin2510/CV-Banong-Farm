<template>
  <section 
    id="tentang-kami" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-20 lg:py-28 transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Subtle Background Ambient Accents -->
    <div class="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary-container/10 dark:bg-amber-400/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10">
      
      <!-- Top Breadcrumb / Category Tracker (Style like Whello reference) -->
      <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 sm:mb-8 font-telemetry-code">
        <span>Sentra Agribisnis Ajibarang</span>
        <span class="text-slate-300 dark:text-slate-600">/</span>
        <span class="text-emerald-600 dark:text-emerald-400 font-bold">Tentang CV Banong Farms</span>
      </div>

      <!-- Main Split Layout (Grid 12 cols: 6 or 7 cols Left, 5 or 6 cols Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        <!-- LEFT COLUMN: Content & Vision / Mission Narrative -->
        <div class="lg:col-span-7 flex flex-col justify-center">
          
          <!-- Big Section Title (Style like "Discover our DNA") -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-sky-600 dark:text-sky-400 tracking-tight leading-tight mb-4">
            Discover our DNA
          </h2>

          <!-- Bold Lead Statement -->
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-4">
            CV Banong Farms hadir untuk ketahanan &amp; kemandirian pangan sejati.
          </h3>

          <!-- Narrative Paragraphs -->
          <div class="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Potensi agribisnis ramah lingkungan di tanah Ajibarang, Banyumas begitu melimpah. Namun di balik itu, tantangan kualitas nutrisi, integritas sanitasi peternakan, dan keaslian bahan pangan menuntut integritas nyata. CV Banong Farms menggabungkan kearifan peternak lokal, sanitasi veteriner modern, dan biokonversi sirkular untuk menghasilkan pangan hewani yang murni, sehat, dan beretika.
            </p>
            <p>
              Seluruh dedikasi peternak, inovasi pakan non-kimia, dan rantai pasok dingin harian kami hanya berfokus pada satu tujuan utama: <span class="font-semibold text-slate-800 dark:text-slate-100">menjamin produk panen segar bermutu tinggi langsung tiba di dapur keluarga maupun mitra usaha Anda.</span>
            </p>
          </div>

          <!-- Visi & Misi Key Highlights (Modern Accordion-like / Feature Cards) -->
          <div class="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-4">
            
            <!-- Visi Card -->
            <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">visibility</span>
                <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-300 font-telemetry-code">
                  Visi Utama
                </span>
              </div>
              <p class="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                "Menjadi sentra agribisnis dan peternakan terintegrasi terkemuka di Jawa Tengah yang berdaya saing tinggi, berkelanjutan, serta menghadirkan produk pangan bergizi murni yang aman, halal, dan terjangkau bagi masyarakat."
              </p>
            </div>

            <!-- Misi 4 Bullet Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Pangan segar &amp; pakan bernutrisi bebas hormon sintetis.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Pertanian zero-waste berbasis biokonversi maggot BSF &amp; kasgot.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Kemitraan berdaya bersama kelompok peternak lokal Banyumas.</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Distribusi rantai dingin harian &amp; panen sampai &lt; 12 jam.</span>
              </div>
            </div>

          </div>

          <!-- Action CTA Links with Circular Arrow Icons (Whello Style) -->
          <div class="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <!-- CTA 1: Jelajahi Katalog -->
            <a 
              href="#katalog-produk" 
              class="inline-flex items-center gap-3.5 group cursor-pointer"
            >
              <span class="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Jelajahi Produk Panen
              </span>
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-emerald-600/30 transition-all duration-300">
                <span class="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>

            <!-- CTA 2: Hubungi Kami via WhatsApp -->
            <a 
              href="https://wa.me/628999192861?text=Halo%20Admin%20CV%20Banong%20Farms,%20saya%20ingin%20tahu%20lebih%20lanjut%20mengenai%20peternakan%20dan%20produk%20Anda."
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3.5 group cursor-pointer"
            >
              <span class="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                Hubungi Banong Farms
              </span>
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-amber-500/30 transition-all duration-300">
                <span class="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>
          </div>

        </div>

        <!-- RIGHT COLUMN: 3 Staggered Vertical Rounded Image Strips (Whello Triptych Gallery) -->
        <div class="lg:col-span-5 relative">
          
          <!-- Background accent halo -->
          <div class="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 via-amber-400/5 to-sky-500/10 rounded-3xl blur-2xl pointer-events-none"></div>

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
