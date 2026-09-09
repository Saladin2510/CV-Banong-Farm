<template>
  <section class="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-primary text-on-primary select-none flex flex-col justify-between">
    <!-- Fixed High-Quality Background Image (No slide/stretching animation) -->
    <div 
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style="background-image: url('/assets/hero-bg.png');"
    >
      <!-- Gradient Dark Scrim Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-black/60 backdrop-brightness-90"></div>
    </div>

    <!-- Hero Content Container (100vh Responsive Layout) -->
    <div class="relative z-10 w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-24 md:pt-28 pb-28 sm:pb-32 md:pb-40 flex flex-col items-start justify-center my-auto">
      <div class="flex flex-col items-start max-w-3xl animate-fade-in-up">
        <!-- Live Status Pill -->
        <div class="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-surface-pure/15 backdrop-blur-md mb-3 md:mb-space-16 border border-white/15 shadow-md">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container"></span>
          </span>
          <span class="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase font-semibold">
            Peternakan Modern · Ajibarang
          </span>
        </div>

        <!-- Static High-Impact Headline -->
        <h1 class="font-display-hero text-[32px] sm:text-[42px] md:text-display-hero text-on-primary font-extrabold tracking-tight leading-tight md:leading-none drop-shadow-lg">
          <span class="text-secondary-container">
            CV Banong Farms
          </span><br/>
          <span class="text-surface-pure">
            Hadirkan Kesegaran Alami
          </span>
        </h1>

        <p class="mt-3 md:mt-space-16 font-body-lg text-sm sm:text-base md:text-body-lg text-primary-fixed max-w-xl leading-relaxed text-slate-100 drop-shadow">
          Peternakan &amp; Agribisnis Berkelanjutan Ajibarang. Menghasilkan produk pangan segar, bebas bahan aditif, dan dikelola secara ramah lingkungan.
        </p>

        <!-- CTA Buttons (60-30-10 Accent Conversion) -->
        <div class="mt-6 md:mt-space-32 flex items-center gap-3 sm:gap-space-16 flex-wrap">
          <a 
            href="#katalog-produk" 
            class="inline-flex items-center justify-center gap-space-8 px-6 md:px-space-32 py-3.5 md:py-4 rounded-full bg-secondary-container text-primary font-label-lg text-sm md:text-label-lg font-bold shadow-2xl hover:bg-accent-hover transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>Jelajahi Produk</span>
            <span class="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
          </a>

          <a 
            href="#tentang-kami" 
            class="inline-flex items-center justify-center gap-space-8 px-5 md:px-space-24 py-3.5 md:py-4 rounded-full bg-surface-pure/15 hover:bg-surface-pure/25 text-surface-pure font-label-md text-xs md:text-label-md backdrop-blur-md transition-all transform hover:-translate-y-0.5 border border-white/20 shadow-md"
          >
            <span class="material-symbols-outlined text-[16px] md:text-[18px]">verified</span>
            <span>Garansi Mutu Organik</span>
          </a>
        </div>
      </div>

      <!-- Metric Counter Strip -->
      <div class="mt-5 md:mt-8 pt-4 md:pt-5 flex items-center gap-4 sm:gap-space-32 flex-wrap border-t border-surface-pure/20 w-full max-w-3xl">
        <div>
          <div class="font-headline-lg text-lg sm:text-headline-lg font-bold text-secondary-container">100%</div>
          <div class="font-label-sm text-xs sm:text-label-sm text-primary-fixed">Alami &amp; Non-Kimia</div>
        </div>
        <div class="w-px h-6 sm:h-8 bg-surface-pure/20"></div>
        <div>
          <div class="font-headline-lg text-lg sm:text-headline-lg font-bold text-surface-pure">&lt; 12 Jam</div>
          <div class="font-label-sm text-xs sm:text-label-sm text-primary-fixed">Panen ke Meja Anda</div>
        </div>
        <div class="w-px h-6 sm:h-8 bg-surface-pure/20"></div>
        <div>
          <div class="font-headline-lg text-lg sm:text-headline-lg font-bold text-surface-pure">Ajibarang</div>
          <div class="font-label-sm text-xs sm:text-label-sm text-primary-fixed">Banyumas, Jawa Tengah</div>
        </div>
      </div>
    </div>

    <!-- CRITICAL BOTTOM EDGE MASK: TALLER Sweeping Curved Divider SVG with Dark Mode Support -->
    <div class="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg 
        class="relative block w-full h-24 sm:h-32 md:h-40 lg:h-48 text-surface-pure dark:text-[#0A1128] transition-colors duration-300" 
        viewBox="0 0 1440 200" 
        preserveAspectRatio="none"
      >
        <path d="M0,40 C420,160 1020,160 1440,40 L1440,200 L0,200 Z" fill="currentColor"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.hero-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.hero-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
