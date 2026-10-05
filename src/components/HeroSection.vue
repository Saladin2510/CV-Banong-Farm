<template>
  <section 
    id="hero"
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

    <!-- Hero Content Container (Responsive Layout with In-Flow Dots & Clean Spacing) -->
    <div 
      ref="heroContentRef"
      class="relative z-10 w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 md:pb-36 flex flex-col items-start justify-center my-auto pointer-events-auto will-change-transform"
    >
      
      <!-- Text Slider Container: CSS Grid Stack for Zero Layout Shift & Pure Simultaneous Crossfade -->
      <div class="w-full max-w-3xl grid grid-cols-1 grid-rows-1 items-start">
        <div 
          v-for="(slide, idx) in slides" 
          :key="idx"
          class="col-start-1 row-start-1 flex flex-col items-start transition-opacity duration-700 ease-in-out select-none will-change-[opacity]"
          :class="currentSlide === idx ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'"
        >
          <!-- Live Status Pill -->
          <div class="hero-reveal-item inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-surface-pure/15 backdrop-blur-md mb-3 md:mb-space-16 border border-white/15 shadow-md">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container"></span>
            </span>
            <span class="font-label-sm text-[11px] sm:text-label-sm text-secondary-fixed tracking-wider uppercase font-semibold">
              {{ slide.badge }}
            </span>
          </div>

          <!-- Dynamic Slide Typography -->
          <h1 class="hero-reveal-item font-display-hero text-[28px] xs:text-[32px] sm:text-[42px] md:text-display-hero text-on-primary font-extrabold tracking-tight leading-[1.15] md:leading-none drop-shadow-lg">
            <span class="text-secondary-container">
              {{ slide.titleHighlight }}
            </span><br/>
            <span class="text-surface-pure">
              {{ slide.titleRest }}
            </span>
          </h1>

          <p class="hero-reveal-item mt-3 md:mt-4 font-body-lg text-xs sm:text-base md:text-body-lg text-primary-fixed max-w-xl leading-relaxed text-slate-100 drop-shadow">
            {{ slide.description }}
          </p>
        </div>
      </div>

      <!-- Stable CTA Buttons (Stationary & Always Accessible) -->
      <div class="hero-reveal-item mt-5 sm:mt-7 flex items-center gap-3 sm:gap-space-16 flex-wrap">
        <a 
          href="#katalog-produk" 
          class="inline-flex items-center justify-center gap-2 px-5 sm:px-space-32 py-3 sm:py-4 rounded-full bg-secondary-container text-primary font-label-lg text-xs sm:text-label-lg font-bold shadow-2xl hover:bg-accent-hover transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          <span>Jelajahi Produk Pakan &amp; Ternak</span>
          <span class="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
        </a>

        <a 
          href="#tentang-kami" 
          class="inline-flex items-center justify-center gap-1.5 px-4 sm:px-space-24 py-3 sm:py-4 rounded-full bg-surface-pure/15 hover:bg-surface-pure/25 text-surface-pure font-label-md text-xs md:text-label-md backdrop-blur-md transition-all transform hover:-translate-y-0.5 border border-white/20 shadow-md"
        >
          <span class="material-symbols-outlined text-[16px] md:text-[18px]">verified</span>
          <span>Pengalaman Sejak 2015</span>
        </a>
      </div>

      <!-- In-Flow Slider Dot Indicators & Slide Counter (Prevents ANY Collision with Content on Mobile/Tablet/Desktop) -->
      <div class="hero-reveal-item mt-5 sm:mt-7 flex items-center gap-3">
        <div class="flex items-center gap-2">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            @click.stop="goToSlide(index)"
            :aria-label="`Pergi ke slide ${index + 1}`"
            :class="[
              'transition-all duration-500 rounded-full cursor-pointer',
              currentSlide === index 
                ? 'w-7 sm:w-10 h-2 bg-secondary-container shadow-md' 
                : 'w-2 h-2 bg-surface-pure/50 hover:bg-surface-pure/80'
            ]"
          ></button>
        </div>
        <span class="text-[11px] sm:text-xs font-mono text-slate-300 font-bold ml-1 tracking-wider">
          0{{ currentSlide + 1 }} / 0{{ slides.length }}
        </span>
      </div>

      <!-- Metric Counter Strip (Responsive 3-Column Grid on Mobile, Flex on Desktop) -->
      <div class="hero-reveal-item mt-4 sm:mt-5 pt-3.5 sm:pt-5 grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-8 border-t border-surface-pure/20 w-full max-w-3xl">
        <div class="min-w-0">
          <div class="font-headline-lg text-xs xs:text-sm sm:text-headline-lg font-bold text-secondary-container truncate sm:overflow-visible">Mitra Resmi</div>
          <div class="font-label-sm text-[9px] xs:text-[10px] sm:text-label-sm text-primary-fixed leading-tight truncate sm:overflow-visible">PT. New Hope Cirebon</div>
        </div>
        <div class="hidden sm:block w-px h-8 bg-surface-pure/20"></div>
        <div class="min-w-0">
          <div class="font-headline-lg text-xs xs:text-sm sm:text-headline-lg font-bold text-surface-pure truncate sm:overflow-visible">Grosir &amp; Ecer</div>
          <div class="font-label-sm text-[9px] xs:text-[10px] sm:text-label-sm text-primary-fixed leading-tight truncate sm:overflow-visible">Sak &amp; Kiloan Pas</div>
        </div>
        <div class="hidden sm:block w-px h-8 bg-surface-pure/20"></div>
        <div class="min-w-0">
          <div class="font-headline-lg text-xs xs:text-sm sm:text-headline-lg font-bold text-surface-pure truncate sm:overflow-visible">Armada Sendiri</div>
          <div class="font-label-sm text-[9px] xs:text-[10px] sm:text-label-sm text-primary-fixed leading-tight truncate sm:overflow-visible">Kirim Ajibarang dsk</div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows (Hidden on Mobile to Prevent Text Clipping, Elegant on Tablet & Desktop) -->
    <div class="hidden sm:flex absolute inset-y-0 left-4 right-4 lg:left-8 lg:right-8 z-20 items-center justify-between pointer-events-none">
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

    <!-- CRITICAL BOTTOM EDGE MASK: Sweeping Curved Divider SVG (Responsive Height to Avoid Mobile Clipping) -->
    <div class="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg 
        class="relative block w-full h-16 sm:h-24 md:h-32 lg:h-44 text-surface-pure dark:text-[#070D1E] transition-colors duration-300" 
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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroContentRef = ref(null)
const currentSlide = ref(0)
let timer = null
let ctx = null

const slides = [
  {
    image: '/assets/hero-bg.png',
    badge: 'MITRA RESMI PT. NEW HOPE INDONESIA · CIREBON',
    titleHighlight: 'Pakan Nutrisi Unggul,',
    titleRest: 'Ternak Tumbuh Sehat & Maksimal.',
    description: 'Pusat pakan pabrikan berstandar internasional dari PT. New Hope Indonesia. Menyediakan pakan komplit broiler, layer, bebek, puyuh, hingga pakan ikan dengan FCR hemat dan nutrisi teruji.'
  },
  {
    image: '/assets/hero-bg2.jpg',
    badge: 'BIBIT UNGGUL, OBAT & ALAT KANDANG',
    titleHighlight: 'Sedia DOQ, DOC, DOD,',
    titleRest: 'Hingga Vaksin & Vitamin Medion Lengkap.',
    description: 'Bibit unggas sehat berdaya tahan tinggi, vitamin Medion, antibiotik resmi, serta perlengkapan kandang lengkap. Solusi satu pintu sarana produksi peternakan modern di Ajibarang.'
  },
  {
    image: '/assets/hero-bg3.jpg',
    badge: 'ARMADA TOKO SENDIRI · GROSIR & ECER',
    titleHighlight: 'Dari Pengalaman Nyata di Kandang,',
    titleRest: 'Siap Kirim Langsung ke Kandang Anda.',
    description: 'Berangkat dari peternak puyuh sejak 2015, kami memahami kebutuhan Anda. Melayani pembelian sak maupun eceran kiloan dengan pengiriman sigap ke Ajibarang, Cilongok, Pekuncen, hingga luar daerah.'
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

  ctx = gsap.context(() => {
    // 1. Kinetic Staggered Reveal saat halaman pertama dimuat
    gsap.from('.hero-reveal-item', {
      y: 45,
      opacity: 0,
      duration: 1.15,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.15
    })

    // 2. Parallax Scroll Scrub saat pengguna scroll keluar dari Hero
    if (heroContentRef.value) {
      gsap.to(heroContentRef.value, {
        y: -110,
        opacity: 0.15,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      })
    }
  })
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (ctx) ctx.revert()
})
</script>
