<template>
  <section class="relative w-full -mt-20 overflow-hidden bg-primary text-on-primary select-none">
    <!-- Background Image Slider Container -->
    <div 
      class="relative w-full min-h-[660px] lg:min-h-[760px] bg-cover bg-center flex items-center transition-all duration-1000 ease-in-out transform"
      :style="{ backgroundImage: `url('${slides[currentSlide].image}')` }"
    >
      <!-- Gradient Dark Scrim Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/75 to-black/50 backdrop-brightness-90 transition-all duration-700"></div>

      <!-- Hero Content Container -->
      <div class="relative z-10 w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-28 pb-36 flex flex-col items-start justify-center">
        
        <transition 
          name="hero-fade" 
          mode="out-in"
        >
          <div :key="currentSlide" class="flex flex-col items-start max-w-3xl animate-fade-in-up">
            <!-- Live Status Pill -->
            <div class="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-surface-pure/15 backdrop-blur-md mb-space-16 border border-white/15 shadow-md">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container"></span>
              </span>
              <span class="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase font-semibold">
                {{ slides[currentSlide].badge }}
              </span>
            </div>

            <!-- Dynamic Slide Typography -->
            <h1 class="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-primary font-extrabold tracking-tight leading-none drop-shadow-lg">
              <span class="text-secondary-container">
                {{ slides[currentSlide].titleHighlight }}
              </span><br/>
              <span class="text-surface-pure">
                {{ slides[currentSlide].titleRest }}
              </span>
            </h1>

            <p class="mt-space-16 font-body-lg text-body-lg text-primary-fixed max-w-xl leading-relaxed text-slate-100 drop-shadow">
              {{ slides[currentSlide].description }}
            </p>

            <!-- CTA Buttons -->
            <div class="mt-space-32 flex items-center gap-space-16 flex-wrap">
              <a 
                href="#katalog-produk" 
                class="inline-flex items-center justify-center gap-space-8 px-space-32 py-space-16 rounded-full bg-primary-container text-surface-pure font-label-lg text-label-lg shadow-2xl hover:bg-navy-dark transition-all transform hover:-translate-y-1 active:translate-y-0 border border-white/20"
              >
                <span>Jelajahi Produk</span>
                <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
              </a>

              <a 
                href="#tentang-kami" 
                class="inline-flex items-center justify-center gap-space-8 px-space-24 py-space-16 rounded-full bg-surface-pure/15 hover:bg-surface-pure/25 text-surface-pure font-label-md text-label-md backdrop-blur-md transition-all transform hover:-translate-y-0.5 border border-white/20 shadow-md"
              >
                <span class="material-symbols-outlined text-[18px]">verified</span>
                <span>Garansi Mutu Organik</span>
              </a>
            </div>
          </div>
        </transition>

        <!-- Metric Counter Strip -->
        <div class="mt-space-48 pt-space-24 flex items-center gap-space-32 flex-wrap border-t border-surface-pure/20 w-full max-w-3xl">
          <div>
            <div class="font-headline-lg text-headline-lg font-bold text-secondary-container">100%</div>
            <div class="font-label-sm text-label-sm text-primary-fixed">Alami &amp; Non-Kimia</div>
          </div>
          <div class="w-px h-8 bg-surface-pure/20"></div>
          <div>
            <div class="font-headline-lg text-headline-lg font-bold text-surface-pure">&lt; 12 Jam</div>
            <div class="font-label-sm text-label-sm text-primary-fixed">Panen ke Meja Anda</div>
          </div>
          <div class="w-px h-8 bg-surface-pure/20"></div>
          <div>
            <div class="font-headline-lg text-headline-lg font-bold text-surface-pure">Ajibarang</div>
            <div class="font-label-sm text-label-sm text-primary-fixed">Banyumas, Jawa Tengah</div>
          </div>
        </div>
      </div>

      <!-- Slider Controls (Left & Right Arrows) -->
      <div class="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <button 
          @click="prevSlide" 
          aria-label="Slide sebelumnya" 
          class="pointer-events-auto w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-surface-pure flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-xl border border-white/15 hover:scale-105"
        >
          <span class="material-symbols-outlined text-[26px]">chevron_left</span>
        </button>

        <button 
          @click="nextSlide" 
          aria-label="Slide berikutnya" 
          class="pointer-events-auto w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-surface-pure flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-xl border border-white/15 hover:scale-105"
        >
          <span class="material-symbols-outlined text-[26px]">chevron_right</span>
        </button>
      </div>

      <!-- Slider Dot Indicators -->
      <div class="absolute bottom-20 left-0 right-0 z-20 flex justify-center items-center gap-2.5">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          @click="currentSlide = index"
          :aria-label="`Pergi ke slide ${index + 1}`"
          :class="[
            'transition-all duration-500 rounded-full',
            currentSlide === index 
              ? 'w-10 h-2.5 bg-secondary-container shadow-md' 
              : 'w-2.5 h-2.5 bg-surface-pure/50 hover:bg-surface-pure/80'
          ]"
        ></button>
      </div>
    </div>

    <!-- CRITICAL BOTTOM EDGE MASK: Sweeping Curved Divider SVG -->
    <div class="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg 
        class="relative block w-full h-16 lg:h-28 text-surface-pure" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
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

onMounted(() => {
  timer = setInterval(nextSlide, 7000)
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
