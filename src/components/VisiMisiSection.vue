<template>
  <section 
    ref="visiSectionRef"
    id="tentang-kami" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-20 lg:py-24 xl:py-28 min-h-auto lg:min-h-screen lg:flex lg:items-center transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Anchor identifier for #visi-misi and #tentang -->
    <span id="visi-misi" class="absolute -top-32 pointer-events-none opacity-0"></span>
    <span id="tentang" class="absolute -top-32 pointer-events-none opacity-0"></span>

    <!-- Subtle Background Ambient Accents (Blue & Yellow) -->
    <div class="visi-ambient-1 absolute top-1/4 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none will-change-transform"></div>
    <div class="visi-ambient-2 absolute bottom-10 right-10 w-96 h-96 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[120px] rounded-full pointer-events-none will-change-transform"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 w-full">
      
      <!-- Main Split Layout (Grid 12 cols: 7 cols Left, 5 cols Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        
        <!-- LEFT COLUMN: Content & Vision / Mission Narrative -->
        <div class="lg:col-span-7 flex flex-col justify-center">
          
          <!-- Live Status Pill (Persis Style Hero Section) -->
          <div class="visi-hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container text-xs font-bold mb-3 border border-primary/20 dark:border-white/20 font-telemetry-code shadow-xs w-fit will-change-transform">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary-container"></span>
            </span>
            <span class="tracking-wider uppercase font-semibold">
              Dedikasi &amp; Visi Terpadu
            </span>
          </div>

          <!-- Section Title (Tegak, Bold, Bersih Tanpa Skew Persis Hero Slider) -->
          <h2 class="visi-hero-text text-3xl sm:text-4xl lg:text-5xl font-black font-outfit text-primary dark:text-secondary-container tracking-tight leading-tight mb-3 origin-bottom-left will-change-transform">
            Tentang Kami
          </h2>

          <!-- Bold Lead Statement -->
          <h3 class="visi-hero-text text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3 sm:mb-3.5 will-change-transform">
            Mewujudkan kemandirian pangan sehat dan berkelanjutan dari bumi Ajibarang.
          </h3>

          <!-- Narrative Paragraph -->
          <p class="visi-hero-text text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed will-change-transform">
            CV Banong Farms menghadirkan ekosistem peternakan dan agribisnis terpadu di Ajibarang, Banyumas. Kami memadukan dedikasi peternak lokal, tata kelola kebersihan modern, dan pemanfaatan sumber daya ramah lingkungan untuk menghasilkan produk pangan hewani yang murni, bergizi, halal, dan terpercaya bagi masyarakat.
          </p>

          <!-- Visi & Misi Key Highlights -->
          <div class="visi-hero-text mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3.5 sm:space-y-4">
            
            <!-- Visi Card (Compact & Sleek) -->
            <div class="visi-card p-3.5 sm:p-4 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 dark:border-primary/40 will-change-transform transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px]">visibility</span>
                <span class="text-xs uppercase font-extrabold tracking-wider text-primary dark:text-white font-telemetry-code">
                  Visi Utama
                </span>
              </div>
              <p class="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                "Menjadi sentra agribisnis dan peternakan terpadu terpercaya di Jawa Tengah yang berdaya saing tinggi, berkelanjutan, serta konsisten menghadirkan produk pangan sehat, halal, dan terjangkau bagi seluruh lapisan masyarakat."
              </p>
            </div>

            <!-- Misi 4 Bullet Grid (Yellow Checkmark Accents) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="misi-icon material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5 inline-block origin-center will-change-transform">check_circle</span>
                <span>Pangan segar alami berkualitas tanpa bahan pengawet sintetis.</span>
              </div>
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="misi-icon material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5 inline-block origin-center will-change-transform">check_circle</span>
                <span>Pengelolaan peternakan ramah lingkungan dan bebas limbah.</span>
              </div>
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="misi-icon material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5 inline-block origin-center will-change-transform">check_circle</span>
                <span>Kemitraan berdaya bersama kelompok peternak lokal Banyumas.</span>
              </div>
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="misi-icon material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5 inline-block origin-center will-change-transform">check_circle</span>
                <span>Jaminan distribusi cepat panen tiba dalam waktu kurang dari 12 jam.</span>
              </div>
            </div>

          </div>

        </div>

        <!-- RIGHT COLUMN: 3 Staggered Vertical Rounded Image Strips (Whello Triptych Gallery) -->
        <div 
          ref="triptychContainerRef"
          class="lg:col-span-5 relative"
          @mousemove="handleTriptychMouseMove"
          @mouseleave="handleTriptychMouseLeave"
        >
          
          <!-- Background accent halo -->
          <div class="triptych-glow absolute -inset-4 bg-gradient-to-tr from-primary/10 via-secondary-container/10 to-primary/5 rounded-3xl blur-2xl pointer-events-none will-change-transform"></div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4 items-center relative z-10">
            
            <!-- Column 1: Pak Peternak dengan Keranjang Telur Organik -->
            <div class="triptych-col triptych-col-1 flex flex-col gap-3 will-change-transform">
              <div class="triptych-frame triptych-frame-1 h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/visi-farmer-eggs.jpg" 
                  alt="Peternak Organik Telur CV Banong Farms Ajibarang"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 2: Ahli Agribisnis Memeriksa Peternakan (Slightly taller / elevated center) -->
            <div class="triptych-col triptych-col-2 flex flex-col gap-3 will-change-transform -mt-2 sm:-mt-4">
              <div class="triptych-frame triptych-frame-2 h-[310px] sm:h-[410px] lg:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/visi-farmer-check.jpg" 
                  alt="Ahli Peternakan CV Banong Farms Memeriksa Ayam Sehat"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 3: Lanskap Peternakan & Gunung Slamet Ajibarang -->
            <div class="triptych-col triptych-col-3 flex flex-col gap-3 will-change-transform">
              <div class="triptych-frame triptych-frame-3 h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/hero-bg.png" 
                  alt="Lanskap Peternakan Terbuka CV Banong Farms di Ajibarang"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
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
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const visiSectionRef = ref(null)
const triptychContainerRef = ref(null)
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. MASTER ENTRANCE REVEAL TIMELINE (Terkoordinasi Sempurna Saat Seksi Masuk Viewport)
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: visiSectionRef.value,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    })

    // (a) Kinetic Staggered Reveal Persis Seperti Text Hero Slider
    // (y: 45px -> 0, opacity: 0 -> 1, duration: 1.15s, stagger: 0.1s, ease: 'power3.out')
    entranceTl.from('.visi-hero-text', {
      y: 45,
      opacity: 0,
      duration: 1.15,
      stagger: 0.1,
      ease: 'power3.out'
    })

    // (b) 4 Item Misi & Ikon Centang Berputar Mikro
    entranceTl.from('.misi-item', {
      y: 18,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: 'power2.out'
    }, '-=0.55')

    entranceTl.from('.misi-icon', {
      scale: 0,
      rotate: -35,
      stagger: 0.08,
      duration: 0.45,
      ease: 'back.out(2)'
    }, '<')

    // (c) 3 Strip Triptych Foto: Curtain Mask Wipe Unveil + Inner Image Scale Down
    entranceTl.from('.triptych-frame', {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
      duration: 1.15,
      stagger: 0.14,
      ease: 'power3.inOut'
    }, '-=0.9')

    entranceTl.from('.triptych-img', {
      scale: 1.25,
      duration: 1.25,
      stagger: 0.14,
      ease: 'power3.out'
    }, '<')

    // (d) Ambient Halo Glow di Belakang Galeri
    entranceTl.from('.triptych-glow', {
      scale: 0.5,
      opacity: 0,
      duration: 1.3,
      ease: 'power2.out'
    }, '-=1.1')


    // 2. MULTI-PLANE CONTINUOUS SCROLL PARALLAX (Selembut Sutra, Bebas Lag, Tanpa Pinning)
    // Menggunakan scrub: 0.3 yang tersinkronisasi 1:1 dengan Lenis tanpa akumulasi delay
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        // Kolom 1 (Kiri): Meluncur naik perlahan seiring scroll
        gsap.to('.triptych-col-1', {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: visiSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })

        // Kolom 2 (Tengah): Meluncur turun sebagai kontras kedalaman ruang (depth layering)
        gsap.to('.triptych-col-2', {
          y: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: visiSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })

        // Kolom 3 (Kanan): Meluncur naik dengan laju harmonis
        gsap.to('.triptych-col-3', {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: visiSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })

        // Background Ambient Glow Parallax
        gsap.to('.triptych-glow', {
          y: 40,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: visiSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })

        gsap.to('.visi-ambient-1', {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: visiSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })
      }
    })
  }, visiSectionRef.value)
})

// 3. INTERACTIVE 3D MAGNETIC DEPTH TILT PADA TRIPTYCH GALLERY (Khusus Desktop Pointer)
const handleTriptychMouseMove = (e) => {
  if (!triptychContainerRef.value || window.matchMedia('(pointer: coarse)').matches) return
  const rect = triptychContainerRef.value.getBoundingClientRect()
  const mouseX = (e.clientX - rect.left) / rect.width - 0.5
  const mouseY = (e.clientY - rect.top) / rect.height - 0.5

  // Frame 1: Tilt halus ke arah kursor
  gsap.to('.triptych-frame-1', {
    rotateY: mouseX * 12,
    rotateX: -mouseY * 10,
    transformPerspective: 1000,
    duration: 0.45,
    ease: 'power2.out',
    overwrite: 'auto'
  })

  // Frame 2 (Tengah): Respons kedalaman utama
  gsap.to('.triptych-frame-2', {
    rotateY: mouseX * 8,
    rotateX: -mouseY * 8,
    transformPerspective: 1000,
    duration: 0.5,
    ease: 'power2.out',
    overwrite: 'auto'
  })

  // Frame 3: Tilt harmonis berlawanan
  gsap.to('.triptych-frame-3', {
    rotateY: mouseX * -10,
    rotateX: -mouseY * 10,
    transformPerspective: 1000,
    duration: 0.45,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

const handleTriptychMouseLeave = () => {
  if (!triptychContainerRef.value) return
  gsap.to('.triptych-frame-1, .triptych-frame-2, .triptych-frame-3', {
    rotateX: 0,
    rotateY: 0,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

