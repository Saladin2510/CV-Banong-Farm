<template>
  <section 
    id="komoditas-marquee"
    @mouseleave="activeRow = null"
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-12 sm:py-16 lg:py-20 transition-colors duration-300 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 select-none"
  >
    <!-- Background Ambient Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-emerald-500/4 dark:bg-emerald-500/8 blur-[160px] rounded-full pointer-events-none"></div>

    <!-- Section Header / Subtitle -->
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop text-center mb-6 sm:mb-9 relative z-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-200/80 dark:border-emerald-900/50 shadow-2xs">
        <span class="material-symbols-outlined text-[16px]">agriculture</span>
        <span>Komoditas Unggulan Peternakan</span>
      </div>
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase mt-2.5">
        Panen Segar <span class="text-emerald-600 dark:text-emerald-500">CV Banong Farms</span>
      </h2>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
        Arahkan kursor pada baris komoditas untuk melihat hasil panen alami langsung dari Ajibarang
      </p>
    </div>

    <!-- 5-Row Marquee Stacking Container -->
    <div 
      class="relative w-full flex flex-col py-1"
      @mouseleave="activeRow = null"
    >
      
      <!-- Each of the 5 Marquee Rows -->
      <div
        v-for="(row, idx) in rows"
        :key="row.id"
        @mouseenter="activeRow = idx"
        @mouseleave="activeRow = null"
        @click="activeRow = idx"
        class="relative w-full py-3 sm:py-3.5 lg:py-4 cursor-pointer group transition-colors duration-200"
        :class="[
          idx < rows.length - 1 ? 'border-b border-dashed border-slate-200/90 dark:border-slate-800/90' : ''
        ]"
      >
        <!-- Marquee Track Wrapper (Double tracks for seamless infinite roll) -->
        <div 
          class="flex whitespace-nowrap will-change-transform"
          :class="[
            row.direction === 'left' ? 'marquee-left' : 'marquee-right',
            activeRow === idx ? 'marquee-paused' : ''
          ]"
        >
          <!-- Track A (Repeated 6 times) -->
          <div class="flex items-center gap-6 sm:gap-10 lg:gap-14 shrink-0 pr-6 sm:pr-10 lg:pr-14">
            <span 
              v-for="n in 6" 
              :key="'track-a-' + n"
              class="font-black uppercase tracking-wider text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[64px] leading-none transition-colors duration-200 font-sans"
              :class="[
                activeRow === idx 
                  ? 'text-[#C8102E] dark:text-[#EF4444] scale-[1.01]' 
                  : 'text-slate-200/90 dark:text-slate-800/90 hover:text-slate-400'
              ]"
            >
              {{ row.text }}
            </span>
          </div>

          <!-- Track B (Exact Duplicate for Seamless Infinite Loop) -->
          <div class="flex items-center gap-6 sm:gap-10 lg:gap-14 shrink-0 pr-6 sm:pr-10 lg:pr-14" aria-hidden="true">
            <span 
              v-for="n in 6" 
              :key="'track-b-' + n"
              class="font-black uppercase tracking-wider text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[64px] leading-none transition-colors duration-200 font-sans"
              :class="[
                activeRow === idx 
                  ? 'text-[#C8102E] dark:text-[#EF4444] scale-[1.01]' 
                  : 'text-slate-200/90 dark:text-slate-800/90'
              ]"
            >
              {{ row.text }}
            </span>
          </div>
        </div>

      </div>

      <!-- Floating Animated Image Popups (Ukuran Proporsional & Pas Sesuai Referensi) -->
      <!-- Row 1: TELUR AYAM & BEBEK SEGAR (Position: RIGHT, Clockwise +10deg, Extends Downwards) -->
      <transition name="pop-card">
        <div 
          v-if="activeRow === 0"
          class="absolute top-[2%] sm:top-[3%] right-[6%] sm:right-[12%] lg:right-[15%] pointer-events-none z-30"
        >
          <div class="p-1.5 sm:p-2 bg-white rounded-xs border-[3px] sm:border-[3.5px] border-slate-900 shadow-[0_22px_45px_rgba(0,0,0,0.36)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform rotate-[10deg] w-40 sm:w-48 md:w-54 lg:w-60 xl:w-64">
            <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/assets/farm-eggs-marquee.jpg" 
                alt="Telur Ayam & Bebek Organik CV Banong Farms" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Telur Segar Harian
            </div>
          </div>
        </div>
      </transition>

      <!-- Row 2: PETERNAKAN UNGGAS ALAMI (Position: LEFT, Counter-Clockwise -9deg, Extends Downwards) -->
      <transition name="pop-card">
        <div 
          v-if="activeRow === 1"
          class="absolute top-[10%] sm:top-[12%] left-[5%] sm:left-[10%] lg:left-[13%] pointer-events-none z-30"
        >
          <div class="p-1.5 sm:p-2 bg-white rounded-xs border-[3px] sm:border-[3.5px] border-slate-900 shadow-[0_22px_45px_rgba(0,0,0,0.36)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform -rotate-[9deg] w-40 sm:w-48 md:w-54 lg:w-60 xl:w-64">
            <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/assets/farm-poultry-marquee.jpg" 
                alt="Peternakan Unggas Bebas & Alami Ajibarang" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Unggas Organik Ajibarang
            </div>
          </div>
        </div>
      </transition>

      <!-- Row 3: DAGING ORGANIK HIGIENIS (Position: RIGHT, Clockwise +10deg, Arah Ke Atas / Anchored from Bottom) -->
      <transition name="pop-card">
        <div 
          v-if="activeRow === 2"
          class="absolute bottom-[28%] sm:bottom-[30%] lg:bottom-[32%] right-[6%] sm:right-[12%] lg:right-[15%] pointer-events-none z-30"
        >
          <div class="p-1.5 sm:p-2 bg-white rounded-xs border-[3px] sm:border-[3.5px] border-slate-900 shadow-[0_22px_45px_rgba(0,0,0,0.36)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform rotate-[10deg] w-40 sm:w-48 md:w-54 lg:w-60 xl:w-64">
            <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/assets/product-chicken.png" 
                alt="Daging Ayam & Bebek Potong Segar Harian" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Daging Segar Pilihan
            </div>
          </div>
        </div>
      </transition>

      <!-- Row 4: PERIKANAN AIR DERAS (Position: LEFT, Counter-Clockwise -9deg, Arah Ke Atas / Anchored from Bottom) -->
      <transition name="pop-card">
        <div 
          v-if="activeRow === 3"
          class="absolute bottom-[15%] sm:bottom-[17%] lg:bottom-[18%] left-[5%] sm:left-[10%] lg:left-[13%] pointer-events-none z-30"
        >
          <div class="p-1.5 sm:p-2 bg-white rounded-xs border-[3px] sm:border-[3.5px] border-slate-900 shadow-[0_22px_45px_rgba(0,0,0,0.36)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform -rotate-[9deg] w-40 sm:w-48 md:w-54 lg:w-60 xl:w-64">
            <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/assets/product-fish.png" 
                alt="Perikanan Air Deras Ikan Lele & Gurame Segar" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Ikan Air Deras Segar
            </div>
          </div>
        </div>
      </transition>

      <!-- Row 5: PUPUK KASGOT ORGANIK (Position: RIGHT, Clockwise +10deg, Arah Ke Atas / Anchored from Bottom) -->
      <transition name="pop-card">
        <div 
          v-if="activeRow === 4"
          class="absolute bottom-[2%] sm:bottom-[3%] lg:bottom-[4%] right-[6%] sm:right-[12%] lg:right-[15%] pointer-events-none z-30"
        >
          <div class="p-1.5 sm:p-2 bg-white rounded-xs border-[3px] sm:border-[3.5px] border-slate-900 shadow-[0_22px_45px_rgba(0,0,0,0.36)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transform rotate-[10deg] w-40 sm:w-48 md:w-54 lg:w-60 xl:w-64">
            <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src="/assets/product-fertilizer.png" 
                alt="Pupuk Kasgot Super Organik & Ramah Lingkungan" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="mt-1.5 text-center text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Pupuk Hayati Organik
            </div>
          </div>
        </div>
      </transition>

    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'

// Row definition strictly for CV Banong Farms with alternating zigzag directions
const rows = [
  { id: 0, text: 'TELUR AYAM & BEBEK SEGAR', direction: 'left' },
  { id: 1, text: 'PETERNAKAN UNGGAS ALAMI', direction: 'right' },
  { id: 2, text: 'DAGING ORGANIK HIGIENIS', direction: 'left' },
  { id: 3, text: 'PERIKANAN AIR DERAS', direction: 'right' },
  { id: 4, text: 'PUPUK KASGOT ORGANIK', direction: 'left' }
]

// When null, ALL rows run continuously at unified fast speed and NO image is shown.
// Only when hovered, activeRow is set to idx, which pauses that row, turns it red, and pops up its photo!
const activeRow = ref(null)
</script>

<style scoped>
/* Unified and brisk marquee speed across all rows */
@keyframes rollLeft {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes rollRight {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

/* 14 seconds: Brisk, smooth, engaging, and synchronized across all rows */
.marquee-left {
  animation: rollLeft 14s linear infinite;
}

.marquee-right {
  animation: rollRight 14s linear infinite;
}

.marquee-paused {
  animation-play-state: paused !important;
}

/* Card Popup Spring Transition */
.pop-card-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pop-card-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.pop-card-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(12px);
}

.pop-card-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.pop-card-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.pop-card-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(-8px);
}
</style>
