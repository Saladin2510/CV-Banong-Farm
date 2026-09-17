<template>
  <section 
    ref="visiSectionRef"
    id="tentang-kami" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-20 lg:py-0 lg:min-h-screen lg:h-screen lg:flex lg:items-center transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Anchor identifier for #visi-misi and #tentang -->
    <span id="visi-misi" class="absolute -top-32 pointer-events-none opacity-0"></span>
    <span id="tentang" class="absolute -top-32 pointer-events-none opacity-0"></span>
    <!-- Subtle Background Ambient Accents (Blue & Yellow) -->
    <div class="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 w-full">
      
      <!-- Main Split Layout (Grid 12 cols: 7 cols Left, 5 cols Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        
        <!-- LEFT COLUMN: Content & Vision / Mission Narrative -->
        <div class="lg:col-span-7 flex flex-col justify-center">
          
          <!-- Big Section Title (100% Clean Bahasa Indonesia) -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-primary dark:text-secondary-container tracking-tight leading-tight mb-2 sm:mb-2.5">
            Tentang Kami
          </h2>

          <!-- Bold Lead Statement -->
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3 sm:mb-3.5">
            Mewujudkan kemandirian pangan sehat dan berkelanjutan dari bumi Ajibarang.
          </h3>

          <!-- Narrative Paragraph -->
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            CV Banong Farms menghadirkan ekosistem peternakan dan agribisnis terpadu di Ajibarang, Banyumas. Kami memadukan dedikasi peternak lokal, tata kelola kebersihan modern, dan pemanfaatan sumber daya ramah lingkungan untuk menghasilkan produk pangan hewani yang murni, bergizi, halal, dan terpercaya bagi masyarakat.
          </p>

          <!-- Visi & Misi Key Highlights -->
          <div class="mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3.5 sm:space-y-4">
            
            <!-- Visi Card (Compact & Sleek) -->
            <div class="visi-card p-3.5 sm:p-4 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 dark:border-primary/40 will-change-transform">
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
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Pangan segar alami berkualitas tanpa bahan pengawet sintetis.</span>
              </div>
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Pengelolaan peternakan ramah lingkungan dan bebas limbah.</span>
              </div>
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Kemitraan berdaya bersama kelompok peternak lokal Banyumas.</span>
              </div>
              <div class="misi-item flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 will-change-transform">
                <span class="material-symbols-outlined text-secondary-container dark:text-secondary-container text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Jaminan distribusi cepat panen tiba dalam waktu kurang dari 12 jam.</span>
              </div>
            </div>

          </div>

        </div>

        <!-- RIGHT COLUMN: 3 Staggered Vertical Rounded Image Strips (Whello Triptych Gallery) -->
        <div class="lg:col-span-5 relative">
          
          <!-- Background accent halo -->
          <div class="triptych-glow absolute -inset-4 bg-gradient-to-tr from-primary/10 via-secondary-container/10 to-primary/5 rounded-3xl blur-2xl pointer-events-none will-change-transform"></div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4 items-center relative z-10">
            
            <!-- Column 1: Pak Peternak dengan Keranjang Telur Organik -->
            <div class="triptych-col-1 flex flex-col gap-3 transform translate-y-3 sm:translate-y-5 will-change-transform">
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
            <div class="triptych-col-2 flex flex-col gap-3 transform -translate-y-3 sm:-translate-y-5 will-change-transform">
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
            <div class="triptych-col-3 flex flex-col gap-3 transform translate-y-1 sm:translate-y-2 will-change-transform">
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
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const visiSectionRef = ref(null)
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      // Desktop & Laptop: Full Pinned Storytelling Sequence (memerlukan 2-3 kali putaran scroll)
      "(min-width: 1024px)": () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: visiSectionRef.value,
            start: "top top",
            end: "+=180%", // Setara 2-3 kali scroll wheel/swipe
            pin: true,
            scrub: 1.1,
            anticipatePin: 1
          }
        })

        // Posisi awal elemen tersembunyi halus
        tl.set('.visi-card', { opacity: 0, y: 45, scale: 0.96 })
        tl.set('.misi-item', { opacity: 0, x: -25 })
        tl.set('.triptych-col-1', { y: 160, opacity: 0.15 })
        tl.set('.triptych-col-2', { y: -160, opacity: 0.15 })
        tl.set('.triptych-col-3', { y: 160, opacity: 0.15 })
        tl.set('.triptych-glow', { scale: 0.5, opacity: 0.2 })

        // FASE 1: Scroll putaran 1 -> Kartu Visi Utama terbuka naik dan membesar
        tl.to('.visi-card', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out'
        })

        // FASE 2: Scroll putaran 2 -> Checklist 4 Misi ter-reveal dan 3 strip triptych foto meluncur bersilangan
        tl.to('.misi-item', {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: 'power2.out'
        }, "-=0.1")

        tl.to('.triptych-col-1, .triptych-col-3', {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out'
        }, "<")

        tl.to('.triptych-col-2', {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out'
        }, "<")

        tl.to('.triptych-glow', {
          scale: 1.1,
          opacity: 0.85,
          duration: 0.55,
          ease: 'power2.out'
        }, "<")

        // FASE 3: Scroll putaran 3 -> Tahan sejenak tampilan sempurna sebelum unpin
        tl.to({}, { duration: 0.3 })
      },

      // Mobile / Tablet (< 1024px): Reveal responsif alami tanpa pin agar nyaman di layar kecil
      "(max-width: 1023px)": () => {
        gsap.from('#tentang-kami .lg\\:col-span-7 > *', {
          y: 35,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#tentang-kami',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      }
    })
  }, visiSectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
