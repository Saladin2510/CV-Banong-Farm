<template>
  <section 
    ref="sectionRef"
    id="tentang-kami" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-24 lg:py-32 transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Navigation Anchors (#tentang-kami, #visi-misi, #tentang) -->
    <span id="visi-misi" class="absolute -top-32 pointer-events-none opacity-0"></span>
    <span id="tentang" class="absolute -top-32 pointer-events-none opacity-0"></span>

    <!-- Ambient Subtle Brand Backing Glows -->
    <div class="absolute top-20 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/15 blur-[130px] rounded-full pointer-events-none"></div>
    <div class="absolute top-1/2 right-10 w-96 h-96 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[130px] rounded-full pointer-events-none"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 w-full space-y-24 sm:space-y-32 lg:space-y-40">
      
      <!-- ========================================================================= -->
      <!-- A. ABOUT HERO SECTION (Split Layout + Overlapping Layered Visual)        -->
      <!-- ========================================================================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column: Breadcrumb, Strong Heading & Corporate Narrative -->
        <div class="lg:col-span-6 flex flex-col justify-center">
          
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" class="hero-load-item flex items-center gap-2 text-xs font-semibold font-sans mb-4 text-slate-500 dark:text-slate-400">
            <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Beranda</a>
            <span class="text-slate-300 dark:text-slate-700">/</span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-primary dark:text-secondary-container font-bold text-xs border border-secondary-container/40">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
              Tentang Kami
            </span>
          </nav>

          <!-- Main Hero Headline (Kuning Sesuai Logo CV Banong Farms) -->
          <h1 class="hero-load-item text-3xl xs:text-4xl sm:text-5xl lg:text-[52px] font-black font-outfit text-primary dark:text-white leading-[1.12] tracking-tight mb-6">
            Membangun Kemitraan, <br class="hidden sm:inline" />
            <span class="text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.20)] dark:drop-shadow-none">Memajukan Peternak.</span>
          </h1>

          <!-- Concise Narrative Paragraph -->
          <p class="hero-load-item text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-8 max-w-xl">
            Di CV Banong Farms, kami meyakini bahwa keberhasilan peternak berakar dari kestabilan nutrisi pakan dan pendampingan yang jujur. Berawal dari budidaya mandiri di Ajibarang sejak 2015, kami bertransformasi menjadi mitra resmi pabrikan guna menyediakan solusi sarana peternakan berstandar tinggi yang tahan uji.
          </p>

          <!-- Primary Actions -->
          <div class="hero-load-item flex flex-wrap items-center gap-4">
            <a 
              href="#katalog-produk" 
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-secondary-container text-primary font-sans font-bold text-sm shadow-md hover:bg-accent-hover transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Jelajahi Produk Pakan</span>
              <svg class="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <div class="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/70 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span class="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span>Agen Resmi PT. New Hope Indonesia</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Layered Overlapping Image Composition + Rotating Stamp Badge -->
        <div class="lg:col-span-6 relative">
          <div class="relative w-full max-w-lg mx-auto lg:max-w-none">
            
            <!-- Main Hero Image Frame -->
            <div class="hero-load-image relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-[4/3] sm:aspect-[16/11]">
              <img 
                src="/assets/tentang-toko-modern.jpg" 
                alt="Toko Sarana Peternakan Modern CV Banong Farms Ajibarang"
                class="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <!-- Overlapping Circular Rotating Brand Stamp Badge -->
            <div class="hero-load-stamp absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20">
              <div class="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-[#071120] p-1.5 shadow-2xl border border-slate-200/90 dark:border-slate-700 flex items-center justify-center">
                <!-- Outer Rotating SVG Text Ring -->
                <svg class="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                  <path 
                    id="stampTextPath" 
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
                    fill="none" 
                  />
                  <text class="text-[9.5px] font-bold font-sans tracking-[0.22em] uppercase fill-slate-800 dark:fill-slate-200">
                    <textPath href="#stampTextPath">
                      • CV BANONG FARMS • SEJAK 2015 • MITRA RESMI
                    </textPath>
                  </text>
                </svg>

                <!-- Center Golden Arrow Circle (Kuning Emas Logo) -->
                <div class="absolute inset-0 m-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-inner">
                  <svg class="w-5 h-5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Overlapping Decorative Field Card -->
            <div class="hidden sm:flex absolute -top-4 -right-4 z-10 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#132A4A]/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-slate-700">
              <div class="w-9 h-9 rounded-xl bg-primary text-secondary-container flex items-center justify-center font-bold text-xs">
                FCR
              </div>
              <div class="text-left">
                <div class="text-[11px] font-bold font-sans text-primary dark:text-white leading-tight">Nutrisi Teruji</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 font-medium font-sans">Formula Standar Pabrikan</div>
              </div>
            </div>

          </div>
        </div>

      </div>


      <!-- ========================================================================= -->
      <!-- B. COMPANY OVERVIEW & AUTHENTIC METRICS                                    -->
      <!-- ========================================================================= -->
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Editorial Introduction Statement (Ukuran Pas & Ringkas) -->
        <p class="overview-statement text-base sm:text-lg lg:text-[20px] font-sans text-slate-700 dark:text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
          Di CV Banong Farms, kami menyediakan 
          <span class="text-primary dark:text-secondary-container font-bold underline decoration-secondary-container/60 decoration-2 underline-offset-4">nutrisi pakan standar pabrikan</span> 
          dan pendampingan kandang langsung demi 
          <span class="text-primary dark:text-white font-bold">keberhasilan panen peternak Banyumas Raya.</span>
        </p>

        <!-- 4 Authentic Company Statistics with Roulette Slot Reel Animation (Dipicu Saat Discroll) -->
        <div 
          ref="statsSectionRef"
          class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-slate-200/80 dark:border-slate-800"
        >
          
          <div 
            v-for="stat in rouletteStats" 
            :key="stat.id"
            @mouseenter="spinCard(stat)"
            @click="spinCard(stat)"
            class="stat-card flex flex-col items-center p-4 rounded-2xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-default group select-none"
            title="Angka berputar otomatis saat di-scroll"
          >
            <!-- Roulette Number Frame (1.2em Presisi Tanpa Terpotong) -->
            <div 
              :class="stat.colorClass"
              class="h-[1.2em] overflow-hidden flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-black font-outfit tracking-tight tabular-nums select-none"
            >
              <div 
                v-for="(col, cIdx) in stat.columns" 
                :key="cIdx"
                class="relative h-[1.2em] overflow-hidden inline-flex flex-col shrink-0"
              >
                <!-- Digit Column: Animated Roulette Strip -->
                <div 
                  v-if="col.isDigit"
                  class="flex flex-col shrink-0 will-change-transform"
                  :style="{
                    transform: isRouletteActive && !col.resetting ? `translateY(-${col.targetIndex * 1.2}em)` : 'translateY(0em)',
                    transitionProperty: col.resetting ? 'none' : 'transform',
                    transitionDuration: col.resetting ? '0s' : `${col.duration}s`,
                    transitionTimingFunction: 'cubic-bezier(0.12, 0.82, 0.2, 1)'
                  }"
                >
                  <span 
                    v-for="(digit, dIdx) in col.strip" 
                    :key="dIdx"
                    class="h-[1.2em] flex items-center justify-center leading-[1.2em] shrink-0"
                  >
                    {{ digit }}
                  </span>
                </div>

                <!-- Non-digit symbol: Static (., +, %) -->
                <span 
                  v-else 
                  class="h-[1.2em] flex items-center justify-center leading-[1.2em] shrink-0"
                >
                  {{ col.char }}
                </span>
              </div>
            </div>

            <span class="text-xs sm:text-sm font-semibold font-sans text-slate-600 dark:text-slate-300 mt-2 text-center">
              {{ stat.label }}
            </span>
            <span class="text-[11px] font-sans text-slate-400 dark:text-slate-500 mt-0.5 text-center">
              {{ stat.sublabel }}
            </span>
          </div>

        </div>

      </div>


      <!-- ========================================================================= -->
      <!-- C. OUR MISSION (Two Column: Layered Visual Left, Content Right)          -->
      <!-- ========================================================================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Layered Composition with 2 Overlapping Farm Visuals -->
        <div class="lg:col-span-6 relative order-2 lg:order-1">
          <div class="relative w-full max-w-lg mx-auto lg:max-w-none pr-8 pb-8 sm:pr-12 sm:pb-12">
            
            <!-- Primary Backing Frame (Gudang Pakan Modern) -->
            <div class="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 aspect-[4/3] bg-slate-100 dark:bg-slate-800">
              <img 
                src="/assets/tentang-gudang-pakan.jpg" 
                alt="Gudang Distribusi Pakan Ternak New Hope CV Banong Farms"
                class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            <!-- Smaller Front Layered Frame (Armada Antar Toko) -->
            <div class="absolute bottom-0 right-0 w-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#070D1E] aspect-[4/3] bg-slate-200 dark:bg-slate-700">
              <img 
                src="/assets/polaroid-armada-antar.jpg" 
                alt="Armada Pengiriman Kandang Banong Farms"
                class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

          </div>
        </div>

        <!-- Right: Heading, Description & 4 Core Mission Checklist Points -->
        <div class="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/30 text-primary dark:text-secondary-container text-xs font-semibold border border-primary/20 dark:border-secondary-container/30 shadow-2xs w-fit mb-3 font-sans">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            <span class="tracking-wider uppercase text-[11px] font-bold">Misi Kami</span>
          </div>

          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-primary dark:text-white tracking-tight leading-tight mb-4">
            Komitmen Nyata untuk <br class="hidden sm:inline" />
            <span class="text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.20)] dark:drop-shadow-none">Keberlanjutan Peternak.</span>
          </h2>

          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-6">
            Misi kami adalah menghadirkan sarana peternakan unggul yang melampaui sekadar transaksi jual-beli. Kami berkomitmen membangun ekosistem peternakan yang sehat, transparan, dan berdaya saing tinggi melalui 4 pilar pelayanan utama:
          </p>

          <!-- 4 Mission Checklist Points with Yellow Brand Accent (Zero Oren) -->
          <div class="space-y-3.5">
            
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs sm:text-sm font-bold font-sans text-primary dark:text-white">Penyediaan Ransum Asli Standar Pabrik</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">Menjamin pasokan pakan New Hope (HP100, HL83, HB200) dengan protein stabil dan segel resmi.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs sm:text-sm font-bold font-sans text-primary dark:text-white">Pendampingan FCR &amp; Solusi Penyakit Lapangan</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">Konsultasi manajemen pakan, pencegahan mortalitas, dan efisiensi biaya panen berbasis data nyata kandang.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs sm:text-sm font-bold font-sans text-primary dark:text-white">Integritas Timbangan Jujur Sak &amp; Kiloan</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">Melayani pembelian partai sak 50kg maupun eceran kiloan dengan jaminan timbangan digital presisi.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs sm:text-sm font-bold font-sans text-primary dark:text-white">Kesiapan Armada Antar Langsung ke Depan Kandang</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">Pengiriman terjadwal dan cepat ke Ajibarang, Cilongok, Pekuncen, dan area Banyumas Raya.</p>
              </div>
            </div>

          </div>

        </div>

      </div>


      <!-- ========================================================================= -->
      <!-- D. OUR VISION (Alternating Layout: Content Left, Layered Visual Right)   -->
      <!-- ========================================================================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Heading, Description & Vision Principles -->
        <div class="lg:col-span-6 flex flex-col justify-center">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/30 text-primary dark:text-secondary-container text-xs font-semibold border border-primary/20 dark:border-secondary-container/30 shadow-2xs w-fit mb-3 font-sans">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            <span class="tracking-wider uppercase text-[11px] font-bold">Visi Kami</span>
          </div>

          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-primary dark:text-white tracking-tight leading-tight mb-4">
            Jangkar Ketahanan Agribisnis <br class="hidden sm:inline" />
            <span class="text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.20)] dark:drop-shadow-none">Banyumas Masa Depan.</span>
          </h2>

          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-6">
            Visi CV Banong Farms adalah menjadi jangkar ketahanan pakan dan sarana peternakan paling terpercaya di Banyumas Barat, mewujudkan ekosistem peternakan yang mandiri, berdaya saing tinggi, dan memberi hasil panen optimal bagi seluruh mitra peternak.
          </p>

          <!-- Key Principles of the Vision (Kuning Emas Logo) -->
          <div class="space-y-3.5">
            
<<<<<<< HEAD
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs sm:text-sm font-bold font-sans text-primary dark:text-white">Ekosistem Kemitraan Peternak yang Berkelanjutan</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">Mendampingi regenerasi peternak lokal melalui teknologi pakan presisi dan kestabilan suplai komoditas.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 class="text-xs sm:text-sm font-bold font-sans text-primary dark:text-white">Standarisasi Keamanan Cold-Chain Farmasi</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">Menjaga potensi dan viabilitas vaksin Medion melalui fasilitas penyimpanan dingin resmi terstandar.</p>
              </div>
            </div>

          </div>

        </div>

        <!-- Right: Alternating Layered Visual Composition -->
        <div class="lg:col-span-6 relative">
          <div class="relative w-full max-w-lg mx-auto lg:max-w-none pl-8 pb-8 sm:pl-12 sm:pb-12">
            
            <!-- Primary Backing Frame (Kawasan Kandang Unggas Alami) -->
            <div class="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 aspect-[4/3] bg-slate-100 dark:bg-slate-800">
              <img 
                src="/assets/tentang-kandang-unggas.jpg" 
                alt="Budidaya Unggas dan Ternak Sehat CV Banong Farms"
                class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
=======
            <!-- Column 1: Tampak Depan Toko CV Banong Farms (Bagian Kiri) -->
            <div class="triptych-col triptych-col-1 flex flex-col gap-3 will-change-transform">
              <div class="triptych-frame triptych-frame-1 h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/tampak_depan_toko_slice1.png" 
                  alt="Tampak Depan Toko CV Banong Farms (Bagian Kiri)"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 2: Tampak Depan Toko CV Banong Farms (Bagian Tengah - Pintu Masuk) -->
            <div class="triptych-col triptych-col-2 flex flex-col gap-3 will-change-transform -mt-2 sm:-mt-4">
              <div class="triptych-frame triptych-frame-2 h-[310px] sm:h-[410px] lg:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/tampak_depan_toko_slice2.png" 
                  alt="Tampak Depan Toko CV Banong Farms (Bagian Tengah)"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 3: Tampak Depan Toko CV Banong Farms (Bagian Kanan - Stok Pakan) -->
            <div class="triptych-col triptych-col-3 flex flex-col gap-3 will-change-transform">
              <div class="triptych-frame triptych-frame-3 h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/tampak_depan_toko_slice3.png" 
                  alt="Tampak Depan Toko CV Banong Farms (Bagian Kanan)"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
>>>>>>> e55a44cb53341012a6cc415356aceb73a496eb28
            </div>

            <!-- Smaller Front Layered Frame (Pemeriksaan Kualitas Unggas) -->
            <div class="absolute bottom-0 left-0 w-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#070D1E] aspect-[4/3] bg-slate-200 dark:bg-slate-700">
              <img 
                src="/assets/visi-farmer-check.jpg" 
                alt="Pemeriksaan Rutin Kesehatan Unggas dan Telur"
                class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

          </div>
        </div>

      </div>


      <!-- ========================================================================= -->
      <!-- E. OUR CORE VALUES (3 Clean Editorial Cards with Yellow Accents)         -->
      <!-- ========================================================================= -->
      <div class="pt-8 border-t border-slate-200/80 dark:border-slate-800">
        
        <div class="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-primary dark:text-secondary-container text-xs font-semibold border border-slate-200 dark:border-slate-700 mb-2 font-sans">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            <span class="tracking-wider uppercase text-[11px] font-bold">Prinsip Kerja Kami</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black font-outfit text-primary dark:text-white tracking-tight">
            Nilai Integritas CV Banong Farms
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <!-- Value 1 -->
          <div class="value-card p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/70 hover:border-secondary-container dark:hover:border-secondary-container transition-all duration-300 hover:shadow-lg group">
            <div class="w-11 h-11 rounded-xl bg-primary text-secondary-container flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-16.5-.52l.006 1.05a36.42 36.42 0 000 6.9c.143 1.01.317 2.01.52 3m0-10.97c-.347.05-.69.105-1.03.165m17.01 0c.34.06.683.115 1.03.165" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-bold font-sans text-primary dark:text-white mb-2">Kejujuran Timbangan</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Takaran sak 50kg segel pabrik maupun eceran kiloan selalu melalui kalibrasi timbangan pas tanpa pengurangan gramatur.
            </p>
          </div>

          <!-- Value 2 -->
          <div class="value-card p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/70 hover:border-secondary-container dark:hover:border-secondary-container transition-all duration-300 hover:shadow-lg group">
            <div class="w-11 h-11 rounded-xl bg-primary text-secondary-container flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-bold font-sans text-primary dark:text-white mb-2">Kemitraan Resmi Pabrik</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Jalur distribusi langsung PT. New Hope Indonesia memutus rantai calo dan menjamin ransum pakan selalu fresh produksi terbaru.
            </p>
          </div>

          <!-- Value 3 -->
          <div class="value-card p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/70 hover:border-secondary-container dark:hover:border-secondary-container transition-all duration-300 hover:shadow-lg group">
            <div class="w-11 h-11 rounded-xl bg-primary text-secondary-container flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v10.875" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-bold font-sans text-primary dark:text-white mb-2">Keandalan Armada Toko</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Armada mandiri yang siap antar secara terjadwal langsung ke depan kandang peternak tanpa membebankan logistik rumit.
            </p>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const statsSectionRef = ref(null)
const isRouletteActive = ref(false)

// Generator strip reel roulette untuk tiap karakter (0-9 berputar bertingkat, simbol statis)
const createStatItem = (id, targetStr, label, sublabel, colorClass) => {
  const chars = targetStr.split('')
  const columns = chars.map((char, colIdx) => {
    const isDigit = /\d/.test(char)
    if (!isDigit) {
      return {
        isDigit: false,
        char,
        strip: [char],
        targetIndex: 0,
        duration: 0,
        resetting: false
      }
    }
    const targetDigit = parseInt(char, 10)
    // Multi-revolusi roulette (2 hingga 4 putaran penuh 0-9 sebelum berhenti di target)
    const loops = 2 + (colIdx % 3)
    const strip = []
    for (let l = 0; l < loops; l++) {
      for (let d = 0; d <= 9; d++) {
        strip.push(d)
      }
    }
    strip.push(targetDigit)
    const total = strip.length
    const targetIndex = total - 1 // Indeks presisi digit target
    // Durasi bertingkat (staggered) agar angka berhenti berurutan layaknya drum mesin slot/roulette asli
    const duration = 1.35 + colIdx * 0.2

    return {
      isDigit: true,
      char,
      strip,
      targetIndex,
      duration,
      resetting: false
    }
  })

  return {
    id,
    targetStr,
    label,
    sublabel,
    colorClass,
    columns
  }
}

// 4 Statistik Resmi CV Banong Farms dengan Animasi Reel Roulette
const rouletteStats = reactive([
  createStatItem(
    'year',
    '2015',
    'Awal Budidaya Mandiri',
    'Rintisan Ternak Puyuh',
    'text-primary dark:text-secondary-container'
  ),
  createStatItem(
    'bags',
    '14.000+',
    'Sak Pakan Tersalurkan',
    'Grosir & Eceran Pas',
    'text-primary dark:text-white'
  ),
  createStatItem(
    'quality',
    '100%',
    'Standar Pabrik Asli',
    'Segel Utuh New Hope',
    'text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.20)] dark:drop-shadow-none'
  ),
  createStatItem(
    'regions',
    '4',
    'Wilayah Pengantaran',
    'Armada Toko Banyumas',
    'text-primary dark:text-white'
  )
])

// Fungsi putar ulang roulette saat kartu di-hover atau diklik pengguna (setelah animasi awal selesai)
const spinCard = (stat) => {
  if (!isRouletteActive.value) return
  stat.columns.forEach(col => {
    if (col.isDigit) {
      col.resetting = true
    }
  })
  setTimeout(() => {
    stat.columns.forEach(col => {
      if (col.isDigit) {
        col.resetting = false
      }
    })
  }, 40)
}

let scrollObserver = null
let scrollHandler = null
let lenisScrollHandler = null
let scrollTriggerInstance = null

// Page Load & Scroll Trigger
onMounted(() => {
  // 1. Staggered Entrance for Hero Elements on Mount
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero-load-item', {
    y: 28,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    delay: 0.2
  })

  tl.from('.hero-load-image', {
    scale: 0.94,
    opacity: 0,
    duration: 1.0,
    ease: 'power2.out'
  }, '-=0.6')

  tl.from('.hero-load-stamp', {
    scale: 0.4,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.5')

  // 2. Trigger Roulette Animation HANYA saat pengguna scroll dari atas ke bawah
  const activateRoulette = () => {
    if (isRouletteActive.value) return
    isRouletteActive.value = true

    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill()
      scrollTriggerInstance = null
    }
    if (scrollObserver) {
      scrollObserver.disconnect()
      scrollObserver = null
    }
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
      scrollHandler = null
    }
    if (lenisScrollHandler && window.__lenis) {
      window.__lenis.off('scroll', lenisScrollHandler)
      lenisScrollHandler = null
    }
  }

  // Pemicu 1: GSAP ScrollTrigger (Sangat sinkron dengan smooth scroll Lenis & native viewport)
  if (statsSectionRef.value) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: statsSectionRef.value,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        activateRoulette()
      }
    })
  }

  // Pemicu 2: Lenis Event Listener langsung (Bila Lenis aktif di App.vue)
  if (window.__lenis) {
    lenisScrollHandler = () => {
      if (!isRouletteActive.value && statsSectionRef.value) {
        const rect = statsSectionRef.value.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.88) {
          activateRoulette()
        }
      }
    }
    window.__lenis.on('scroll', lenisScrollHandler)
  }

  // Pemicu 3: IntersectionObserver (Standar Web API)
  if ('IntersectionObserver' in window && statsSectionRef.value) {
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateRoulette()
        }
      })
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    })
    scrollObserver.observe(statsSectionRef.value)
  }

  // Pemicu 4: Window Native Scroll Listener
  scrollHandler = () => {
    if (!isRouletteActive.value && statsSectionRef.value) {
      const rect = statsSectionRef.value.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.88) {
        activateRoulette()
      }
    }
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })

  // Pemicu Cadangan: Jika pengguna me-refresh halaman tepat saat posisi sudah berada di seksi statistik
  if (statsSectionRef.value) {
    const rect = statsSectionRef.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      setTimeout(() => {
        activateRoulette()
      }, 350)
    }
  }
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
  if (scrollObserver) {
    scrollObserver.disconnect()
    scrollObserver = null
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    scrollHandler = null
  }
  if (lenisScrollHandler && window.__lenis) {
    window.__lenis.off('scroll', lenisScrollHandler)
    lenisScrollHandler = null
  }
})
</script>

<style scoped>
/* Smooth micro-interactions & safe reduced-motion compliance */
@media (prefers-reduced-motion: reduce) {
  .hero-load-stamp svg {
    animation: none !important;
  }
  .will-change-transform {
    transition-duration: 0.01s !important;
  }
}
</style>
          