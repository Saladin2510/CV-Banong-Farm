<template>
  <section 
    ref="ctaSectionRef"
    id="contact"
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-300 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80"
  >
    <!-- Soft Decorative Ambient Glows (Blue & Yellow) -->
    <div class="cta-ambient-glow absolute -top-12 left-1/4 w-80 h-80 bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none will-change-transform"></div>
    <div class="cta-ambient-glow absolute -bottom-10 right-1/4 w-80 h-80 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[140px] rounded-full pointer-events-none will-change-transform"></div>

    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10">
      
      <!-- 1. Header Khusus Mobile & Tablet (Tampil di atas foto agar hierarki informasi jelas) -->
      <div class="block lg:hidden text-center sm:text-left mb-7 sm:mb-9">
        <!-- Badge Pill -->
        <div class="cta-mobile-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700 shadow-2xs w-fit mx-auto sm:mx-0 will-change-transform">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
          <span class="tracking-wider uppercase text-[11px] font-bold">Pilihan Mitra Peternak Tangguh</span>
        </div>

        <!-- Headline -->
        <h2 class="cta-mobile-item text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight font-outfit will-change-transform">
          Pakan Berkualitas, Bibit Sehat, <br class="hidden sm:inline"/>
          <span class="text-primary dark:text-secondary-container">Hasil Panen Ternak Lebih Maksimal.</span>
        </h2>

        <!-- Subtitle -->
        <p class="cta-mobile-item text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mt-3 mx-auto sm:mx-0 will-change-transform">
          Penuhi kebutuhan pakan pabrikan PT. New Hope Indonesia, bibit unggas pilihan, multivitamin Medion, serta alat kandang di CV Banong Farms. Melayani grosir sak dan eceran kiloan dengan pengantaran langsung armada toko ke kandang Anda.
        </p>
      </div>

      <!-- 2. Grid Responsif: Di Desktop 2 Kolom Seimbang (Kiri: Foto Polaroid, Kanan: Konten Teks & CTA) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-center">
        
        <!-- KOLOM GALERI POLAROID -->
        <div class="lg:col-span-6 flex items-center justify-center w-full">
          <div class="polaroid-stage relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[520px] h-[270px] sm:h-[330px] md:h-[360px] lg:h-[390px] xl:h-[410px] select-none mx-auto">
            
            <!-- Polaroid 1 (Left - Konsultasi Nutrisi & Pakan) -->
            <div 
              class="polaroid-left absolute top-2 sm:top-4 lg:top-6 left-1 sm:left-3 lg:left-4 w-[118px] sm:w-[155px] md:w-[175px] lg:w-[195px] xl:w-[205px] z-10 hover:z-30 will-change-transform"
              title="Konsultasi Nutrisi &amp; Pakan Ternak"
            >
              <div class="bg-white p-1.5 sm:p-2.5 pb-4 sm:pb-6 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.7)] transform -rotate-[7deg] hover:-rotate-[2deg] hover:scale-105 transition-transform duration-300 cursor-pointer border border-slate-200/90 group">
                <div class="w-full aspect-[3/4] overflow-hidden bg-slate-100">
                  <img 
                    src="/assets/store/obat-obatan_unggas.jpeg" 
                    alt="Konsultasi Kebutuhan Nutrisi, Vitamin &amp; Obat Ternak Medion CV Banong Farms" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div class="mt-1 sm:mt-1.5 text-center text-[9px] sm:text-[11px] text-slate-700 font-bold tracking-wide">
                  Nutrisi &amp; Obat Medion
                </div>
              </div>
            </div>

            <!-- Polaroid 3 (Right - Stok Pakan Pabrikan Melimpah) -->
            <div 
              class="polaroid-right absolute top-1 sm:top-2 lg:top-4 right-1 sm:right-3 lg:right-4 w-[122px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[210px] z-10 hover:z-30 will-change-transform"
              title="Stok Pakan Pabrikan Selalu Siap"
            >
              <div class="bg-white p-1.5 sm:p-2.5 pb-4 sm:pb-6 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.7)] transform rotate-[6deg] hover:rotate-[2deg] hover:scale-105 transition-transform duration-300 cursor-pointer border border-slate-200/90 group">
                <div class="w-full aspect-[4/5] overflow-hidden bg-slate-100">
                  <img 
                    src="/assets/store/karung_2.jpeg" 
                    alt="Stok Karungan Pakan Pabrikan PT New Hope Indonesia di Toko CV Banong Farms" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div class="mt-1 sm:mt-1.5 text-center text-[9px] sm:text-[11px] text-slate-700 font-bold tracking-wide">
                  Stok Pakan Selalu Siap
                </div>
              </div>
            </div>

            <!-- Polaroid 2 (Center Hero - Armada Antar Toko Sendiri) -->
            <div 
              class="polaroid-center absolute bottom-2 sm:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 w-[165px] sm:w-[215px] md:w-[245px] lg:w-[270px] xl:w-[285px] z-20 hover:z-30 will-change-transform"
              title="Armada Pengantaran Mandiri CV Banong Farms"
            >
              <div class="bg-white p-2 sm:p-3 pb-5 sm:pb-7 rounded-xs shadow-[0_18px_40px_rgba(0,0,0,0.24)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.85)] transform -rotate-[1.5deg] hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer border border-slate-200/90 group">
                <div class="w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src="/assets/truk_barang.jpeg" 
                    alt="Armada Truk Pengiriman Mandiri CV Banong Farms Langsung Antar ke Kandang Peternak" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div class="mt-1.5 sm:mt-2 text-center text-[10px] sm:text-xs text-slate-900 font-bold tracking-wide">
                  Armada Pengantaran Toko ke Kandang
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- KOLOM TEKS CTA & AKSI -->
        <div class="lg:col-span-6 flex flex-col justify-center text-center sm:text-left">
          
          <!-- Header Khusus Desktop (Hidden di Mobile & Tablet karena sudah ada di atas) -->
          <div class="hidden lg:block">
            <!-- Badge Pill -->
            <div class="cta-desktop-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3 sm:mb-4 border border-slate-200 dark:border-slate-700 shadow-2xs w-fit will-change-transform">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
              <span class="tracking-wider uppercase text-[11px] font-bold">Pilihan Mitra Peternak Tangguh</span>
            </div>

            <!-- Headline Desktop -->
            <h2 class="cta-desktop-item text-3xl lg:text-[38px] xl:text-[42px] font-black text-slate-900 dark:text-white tracking-tight leading-tight font-outfit will-change-transform">
              Pakan Berkualitas, Bibit Sehat, <br/>
              <span class="text-primary dark:text-secondary-container">Hasil Panen Ternak Lebih Maksimal.</span>
            </h2>

            <!-- Descriptive Subtitle Desktop -->
            <p class="cta-desktop-item text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mt-3.5 will-change-transform">
              Penuhi kebutuhan pakan pabrikan PT. New Hope Indonesia, bibit unggas pilihan, multivitamin Medion, serta alat kandang di CV Banong Farms. Melayani grosir sak dan eceran kiloan dengan pengantaran langsung armada toko ke kandang Anda.
            </p>
          </div>

          <!-- Action Buttons Group (Hubungi WhatsApp & Lihat Katalog) -->
          <div class="cta-action-row mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 will-change-transform">
            <!-- Primary Button: Hubungi Toko via WhatsApp (Kuning Logo CV Banong Farms) -->
            <a 
              href="https://wa.me/6285726080086?text=Selamat%20pagi%2Fsiang%2Fsore%20Admin%20CV%20Banong%20Farms%2C%20mohon%20izin%20bertanya%20mengenai%20ketersediaan%20stok%20dan%20informasi%20pemesanan%20produk%20sarana%20peternakan.%20Terima%20kasih."
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-colors duration-200 inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Pesan Pakan via WhatsApp</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>

            <!-- Secondary Button: Lihat Katalog Produk -->
            <a 
              href="#katalog-produk"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 shadow-2xs active:scale-95 transition-colors duration-200 cursor-pointer font-sans text-center"
            >
              Lihat Katalog Produk
            </a>
          </div>

          <!-- Trust Badges Row -->
          <div class="mt-7 pt-5 sm:mt-8 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-xs text-slate-700 dark:text-slate-300 font-sans">
            <div class="cta-trust-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs will-change-transform">
              <span class="material-symbols-outlined text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.15)] dark:drop-shadow-none text-[16px] shrink-0">verified</span>
              <span class="font-medium">Produk Pabrikan 100% Asli</span>
            </div>
            <div class="cta-trust-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs will-change-transform">
              <span class="material-symbols-outlined text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.15)] dark:drop-shadow-none text-[16px] shrink-0">inventory_2</span>
              <span class="font-medium">Grosir Sak &amp; Ecer Kiloan</span>
            </div>
            <div class="cta-trust-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs will-change-transform">
              <span class="material-symbols-outlined text-secondary-container drop-shadow-[0_1px_1px_rgba(2,36,72,0.15)] dark:drop-shadow-none text-[16px] shrink-0">local_shipping</span>
              <span class="font-medium">Armada Toko Area Banyumas</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ctaSectionRef = ref(null)
let ctx = null

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    const ctaTl = gsap.timeline({ paused: true })

    const attachBiDirectionalTrigger = (tl, trigger, startPos = 'top 80%') => {
      ScrollTrigger.create({
        trigger,
        start: startPos,
        end: 'bottom top',
        onEnter: () => tl.restart(),
        onLeave: () => tl.pause(0),
        onEnterBack: () => tl.restart()
      })
      ScrollTrigger.create({
        trigger,
        start: 'top bottom',
        onLeaveBack: () => tl.pause(0)
      })
      if (ScrollTrigger.isInViewport(trigger, 0.15)) {
        tl.play()
      }
    }

    // 1. Mobile Header Reveal (Jika layar mobile/tablet)
    ctaTl.from('.cta-mobile-item', {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out'
    })

    // 2. 3 Kartu Polaroid Menyebar (Fan-Out) dari Tengah dengan Efek Pegas
    ctaTl.from('.polaroid-left', {
      x: 55,
      y: 35,
      rotate: 12,
      scale: 0.82,
      opacity: 0,
      duration: 0.9,
      ease: 'back.out(1.6)'
    }, '-=0.4')
    .from('.polaroid-right', {
      x: -55,
      y: 35,
      rotate: -12,
      scale: 0.82,
      opacity: 0,
      duration: 0.9,
      ease: 'back.out(1.6)'
    }, '-=0.72')
    .from('.polaroid-center', {
      y: 45,
      scale: 0.85,
      opacity: 0,
      duration: 0.95,
      ease: 'back.out(1.7)'
    }, '-=0.68')

    // 3. Teks & Tombol CTA Desktop Meluncur Halus
    ctaTl.from('.cta-desktop-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.cta-action-row', {
      y: 24,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out'
    }, '-=0.45')
    .from('.cta-trust-pill', {
      y: 18,
      scale: 0.92,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.4)'
    }, '-=0.4')

    attachBiDirectionalTrigger(ctaTl, ctaSectionRef.value, 'top 80%')

    // 4. Parallax Multi-Plane Lembut pada Foto Polaroid saat Di-scroll (Desktop)
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        gsap.to('.polaroid-left', {
          y: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4
          }
        })
        gsap.to('.polaroid-right', {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4
          }
        })
        gsap.to('.polaroid-center', {
          y: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4
          }
        })
      }
    })
  }, ctaSectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
