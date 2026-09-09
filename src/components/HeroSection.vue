<template>
  <section 
    class="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-primary text-on-primary select-none flex flex-col justify-between cursor-grab active:cursor-grabbing"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <!-- Background Slides (Stacked Pre-Rendered Layers with Smooth Opacity Crossfade - NO Stretching) -->
    <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div 
        v-for="(slide, idx) in slides" 
        :key="idx"
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out pointer-events-none"
        :style="{ backgroundImage: `url('${slide.image}')` }"
        :class="currentSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'"
      ></div>
      <!-- Gradient Dark Scrim Overlay (Permanent, zero flicker) -->
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-black/60 backdrop-brightness-90 z-[1]"></div>
    </div>

    <!-- Hero Content Container (100vh Responsive Layout) -->
    <div class="relative z-10 w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-24 md:pt-28 pb-28 sm:pb-32 md:pb-40 flex flex-col items-start justify-center my-auto pointer-events-auto">
      <transition 
        name="hero-fade" 
        mode="out-in"
      >
        <div :key="currentSlide" class="flex flex-col items-start max-w-3xl animate-fade-in-up">
          <!-- Live Status Pill -->
          <div class="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-surface-pure/15 backdrop-blur-md mb-3 md:mb-space-16 border border-white/15 shadow-md">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container"></span>
            </span>
            <span class="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase font-semibold">
              {{ slides[currentSlide].badge }}
            </span>
          </div>

          <!-- Dynamic Slide Typography -->
          <h1 class="font-display-hero text-[32px] sm:text-[42px] md:text-display-hero text-on-primary font-extrabold tracking-tight leading-tight md:leading-none drop-shadow-lg">
            <span class="text-secondary-container">
              {{ slides[currentSlide].titleHighlight }}
            </span><br/>
            <span class="text-surface-pure">
              {{ slides[currentSlide].titleRest }}
            </span>
          </h1>

          <p class="mt-3 md:mt-space-16 font-body-lg text-sm sm:text-base md:text-body-lg text-primary-fixed max-w-xl leading-relaxed text-slate-100 drop-shadow">
            {{ slides[currentSlide].description }}
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
      </transition>

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

    <!-- Navigation Arrows (Click or Geser/Swipe) -->
    <div class="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
      <button 
        @click.stop="prevSlide(); resetTimer()" 
        aria-label="Slide sebelumnya" 
        class="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-surface-pure flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-xl border border-white/15 hover:scale-105"
      >
        <span class="material-symbols-outlined text-[22px] sm:text-[26px]">chevron_left</span>
      </button>

      <button 
        @click.stop="nextSlide(); resetTimer()" 
        aria-label="Slide berikutnya" 
        class="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-surface-pure flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-xl border border-white/15 hover:scale-105"
      >
        <span class="material-symbols-outlined text-[22px] sm:text-[26px]">chevron_right</span>
      </button>
    </div>

    <!-- Slider Dot Indicators (Positioned above tall curve) -->
    <div class="absolute bottom-20 sm:bottom-28 md:bottom-32 lg:bottom-36 left-0 right-0 z-20 flex justify-center items-center gap-2.5">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        @click.stop="goToSlide(index)"
        :aria-label="`Pergi ke slide ${index + 1}`"
        :class="[
          'transition-all duration-500 rounded-full',
          currentSlide === index 
            ? 'w-10 h-2.5 bg-secondary-container shadow-md' 
            : 'w-2.5 h-2.5 bg-surface-pure/50 hover:bg-surface-pure/80'
        ]"
      ></button>
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
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let timer = null

const slides = [
  {
    image: '/assets/hero-bg.png',
    badge: 'Peternakan Modern · Ajibarang',
    titleHighlight: 'CV Banong Farms',
    titleRest: 'Hadirkan Kesegaran Alami',
    description: 'Peternakan & Agribisnis Berkelanjutan Ajibarang. Menghasilkan produk pangan segar, bebas bahan aditif, dan dikelola secara ramah lingkungan.'
  },
  {
    image: '/assets/hero-bg2.jpg',
    badge: 'Panen Segar Harian · Kualitas Unggul',
    titleHighlight: 'Produk Ternak Organik',
    titleRest: 'Kualitas Alami Terjamin',
    description: 'Dikelola secara etis dengan pakan nutrisi alami, bebas pestisida dan bahan kimia sintetis untuk kesehatan keluarga Anda.'
  },
  {
    image: '/assets/hero-bg3.jpg',
    badge: 'Inovasi Agribisnis · Banyumas',
    titleHighlight: 'Pangan Sehat Keluarga',
    titleRest: 'Langsung dari Sumbernya',
    description: 'Pengiriman cepat rantai dingin dari peternakan Ajibarang langsung ke meja makan dan mitra usaha kuliner Anda.'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetTimer()
}

const resetTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(nextSlide, 6000)
}

// Swipe / Geser support for touch and mouse
let touchStartX = 0
let touchEndX = 0
let isDragging = false

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].clientX
  checkSwipe(touchStartX, touchEndX)
}

const handleMouseDown = (e) => {
  isDragging = true
  touchStartX = e.clientX
}

const handleMouseUp = (e) => {
  if (!isDragging) return
  isDragging = false
  touchEndX = e.clientX
  checkSwipe(touchStartX, touchEndX)
}

const checkSwipe = (start, end) => {
  const diff = start - end
  const threshold = 40 // minimum 40px drag to slide
  if (diff > threshold) {
    nextSlide()
    resetTimer()
  } else if (diff < -threshold) {
    prevSlide()
    resetTimer()
  }
}

onMounted(() => {
  resetTimer()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
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
