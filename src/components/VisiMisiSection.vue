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
          
          <!-- Section Badge Pill (Clean & Non-Stiff) -->
          <div class="visi-hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700 shadow-2xs w-fit will-change-transform">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span class="tracking-wider uppercase text-[11px] font-bold">Profil &amp; Perjalanan Usaha</span>
          </div>

          <!-- Section Title -->
          <h2 class="visi-hero-text text-3xl sm:text-4xl lg:text-[44px] font-black font-outfit text-primary dark:text-white tracking-tight leading-tight mb-2.5 origin-bottom-left will-change-transform">
            Tentang Kami
          </h2>

          <!-- Subtitle / Value Proposition -->
          <h3 class="visi-hero-text text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug mb-3 will-change-transform">
            Dedikasi Menyediakan Pakan Berkualitas &amp; Sarana Ternak Terpercaya Sejak 2015.
          </h3>

          <!-- Structured Narrative (Concise, Legible, Professional Agribusiness Tone) -->
          <div class="visi-hero-text space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed will-change-transform">
            <p>
              CV Banong Farms didirikan atas dasar pengalaman langsung budidaya ternak di Ajibarang pada tahun 2015. Berangkat dari pemahaman teknis di lapangan mengenai pentingnya kestabilan nutrisi pakan dan daya tahan bibit unggul, kami mendirikan toko fisik sarana peternakan modern untuk melayani sesama peternak.
            </p>
            <p>
              Dipercaya sebagai agen resmi pakan ternak PT. New Hope Indonesia Cirebon, kami menghadirkan pasokan pakan berstandar pabrikan, bibit unggas pilihan, obat dan multivitamin Medion, serta perlengkapan kandang lengkap yang siap diantar langsung ke lokasi peternak.
            </p>
          </div>

          <!-- 3 Value Pillars (Compact Structured Cards) -->
          <div class="visi-hero-text grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 transition-all hover:border-amber-400/50">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span class="material-symbols-outlined text-amber-500 text-[18px]">verified</span>
                <span>Resmi Pabrikan</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Pakan asli standar PT. New Hope Indonesia dengan nutrisi teruji dan konsisten.
              </p>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 transition-all hover:border-amber-400/50">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span class="material-symbols-outlined text-amber-500 text-[18px]">scale</span>
                <span>Takaran Jujur</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Melayani pembelian partai sak grosir maupun eceran kiloan dengan timbangan presisi.
              </p>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 transition-all hover:border-amber-400/50">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span class="material-symbols-outlined text-amber-500 text-[18px]">local_shipping</span>
                <span>Armada Toko</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Layanan pengantaran terjadwal ke kandang di Ajibarang, Cilongok, dan sekitarnya.
              </p>
            </div>
          </div>

          <!-- Visi & Misi Balanced Cards -->
          <div class="visi-hero-text pt-2 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <!-- Visi Card -->
            <div class="visi-card p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 flex flex-col justify-between">
              <div>
                <span class="text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Visi Usaha
                </span>
                <p class="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  Menjadi mitra utama peternak dalam menyediakan pakan berkualitas tinggi dan sarana ternak terpercaya untuk hasil panen yang optimal dan berkelanjutan.
                </p>
              </div>
            </div>

            <!-- Misi Card -->
            <div class="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70">
              <span class="text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Misi Usaha
              </span>
              <div class="space-y-1.5">
                <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                  <span class="misi-icon material-symbols-outlined text-amber-500 text-[16px] shrink-0 mt-0.5 inline-block will-change-transform">check</span>
                  <span>Menyediakan pakan ternak pabrikan original dengan harga yang kompetitif.</span>
                </div>
                <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                  <span class="misi-icon material-symbols-outlined text-amber-500 text-[16px] shrink-0 mt-0.5 inline-block will-change-transform">check</span>
                  <span>Memberikan pendampingan nutrisi berbasis pengalaman praktisi kandang.</span>
                </div>
                <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                  <span class="misi-icon material-symbols-outlined text-amber-500 text-[16px] shrink-0 mt-0.5 inline-block will-change-transform">check</span>
                  <span>Memastikan kestabilan stok dan kecepatan pengantaran armada mandiri.</span>
                </div>
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
            
            <!-- Column 1: Gudang Distribusi Pakan Ternak Modern -->
            <div class="triptych-col triptych-col-1 flex flex-col gap-3 will-change-transform">
              <div class="triptych-frame triptych-frame-1 h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/tentang-gudang-pakan.jpg" 
                  alt="Gudang Distribusi Pakan Ternak Modern CV Banong Farms Ajibarang"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 2: Toko Sarana Peternakan & Konsultasi Modern (Center elevated) -->
            <div class="triptych-col triptych-col-2 flex flex-col gap-3 will-change-transform -mt-2 sm:-mt-4">
              <div class="triptych-frame triptych-frame-2 h-[310px] sm:h-[410px] lg:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/tentang-toko-modern.jpg" 
                  alt="Toko Sarana Peternakan Modern & Konsultasi CV Banong Farms"
                  class="triptych-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Column 3: Peternakan Sehat & Berkelanjutan Sejak 2015 -->
            <div class="triptych-col triptych-col-3 flex flex-col gap-3 will-change-transform">
              <div class="triptych-frame triptych-frame-3 h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 group relative will-change-transform">
                <img 
                  src="/assets/tentang-kandang-unggas.jpg" 
                  alt="Budidaya Unggas Sehat dan Optimal CV Banong Farms"
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

