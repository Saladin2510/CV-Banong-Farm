<template>
  <section 
    ref="credSectionRef"
    id="reputasi" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-20 lg:py-24 xl:py-28 min-h-auto lg:min-h-screen lg:flex lg:items-center transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Anchor identifier for backwards compatibility #kelayakan -->
    <span id="kelayakan" class="absolute -top-32 pointer-events-none opacity-0"></span>

    <!-- Background Ambient Glow Halus Selaras dengan VisiMisiSection -->
    <div class="cred-ambient-glow absolute top-1/3 left-10 w-80 h-80 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none will-change-transform"></div>
    <div class="cred-ambient-glow absolute bottom-10 right-10 w-80 h-80 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[120px] rounded-full pointer-events-none will-change-transform"></div>

    <!-- Kontainer Lebar Maksimal SAMA PERSIS dengan VisiMisiSection dan ProductGrid (1280px) -->
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 w-full">
      
      <!-- 1. Baris Atas: Headline & Metrik 14rb+ (Layout Persis Sesuai Gambar Referensi) -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
        
        <!-- Sisi Kiri: Badge Pill, Judul Utama & Subjudul (Animasi Hero Slider Stagger) -->
        <div class="max-w-xl">
          <!-- Top Badge Pill (Clean & Non-Stiff) -->
          <div class="cred-hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700 shadow-2xs w-fit will-change-transform">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span class="tracking-wider uppercase text-[11px] font-bold">Kemitraan Pabrikan &amp; Standar Mutu</span>
          </div>

          <!-- Judul Utama: Reputasi & Legalitas Resmi -->
          <h2 class="cred-hero-text text-3xl sm:text-4xl lg:text-[44px] font-black font-outfit text-primary dark:text-white tracking-tight leading-tight origin-bottom-left will-change-transform">
            Reputasi Pabrikan &amp; Kemitraan Terpercaya
          </h2>

          <!-- Subjudul 1 Baris Persuasif & Manusiawi -->
          <p class="cred-hero-text mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed will-change-transform">
            Menghubungkan peternak Banyumas Raya dengan pakan berstandar internasional dari PT. New Hope Indonesia Cirebon, produk kesehatan Medion resmi, serta keandalan armada antar toko.
          </p>
        </div>

        <!-- Sisi Kanan: Metrik Besar + 4 Avatar Tumpuk + Keterangan -->
        <div class="flex flex-col items-start lg:items-end shrink-0 pt-2 lg:pt-0">
          <div class="cred-hero-text flex items-center gap-3 sm:gap-4 will-change-transform">
            <!-- Angka Metrik Besar Dinamis dengan Counter Rolling Animasi GSAP -->
            <span class="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight text-primary dark:text-white leading-none tabular-nums">
              {{ counterDisplay }}
            </span>

            <!-- 4 Lingkaran Foto Peternak Mitra Bertumpuk (Wajah Orang / Peternak Nyata) -->
            <div class="flex -space-x-2.5 sm:-space-x-3 p-0.5 items-center">
              <img 
                src="/assets/avatar-peternak-1.jpg" 
                alt="Peternak Ayam Petelur Mitra Banong Farms" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Bpk. Santoso (Peternak Puyuh & Layer)"
              />
              <img 
                src="/assets/avatar-peternak-2.jpg" 
                alt="Peternak & Pengusaha Ternak Mitra - Ibu Lani" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Ibu Lani (Peternak Mandiri Cilongok)"
              />
              <img 
                src="/assets/avatar-peternak-3.jpg" 
                alt="Peternak Muda Mitra Banong Farms" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Mas Dimas (Peternak Bebek & Broiler)"
              />
              <img 
                src="/assets/avatar-peternak-4.jpg" 
                alt="Peternak Senior Banyumas" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Bpk. Haryanto (Peternak Senior Pekuncen)"
              />
            </div>
          </div>

          <!-- Keterangan Subtitle di Bawah Angka -->
          <span class="cred-hero-text mt-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase will-change-transform font-sans">
            Sak Pakan &amp; Sarana Ternak Tersalurkan
          </span>
        </div>

      </div>

      <!-- 2. Kontainer Kartu Utama (Clean Card Selaras dengan Desain Web & Referensi) -->
      <div class="bg-white dark:bg-[#0c1a30] rounded-3xl p-5 sm:p-8 lg:p-10 shadow-md dark:shadow-2xl border border-slate-200/90 dark:border-slate-800">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <!-- SISI KIRI: Showcase Banner Resmi Kemitraan New Hope -->
          <div class="lg:col-span-5 relative w-full flex flex-col items-center">
            
            <!-- Bingkai Foto Banner Kemitraan (Interactive 3D Depth Tilt & Curtain Mask Reveal) -->
            <div 
              ref="certCardRef"
              @pointermove="handleCertPointerMove"
              @pointerleave="handleCertPointerLeave"
              class="cert-card-frame relative w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 group shadow-lg will-change-transform"
            >
              <img 
                src="/assets/sertifikat-kemitraan-resmi.jpg" 
                alt="Sertifikat Distributor Resmi PT New Hope Indonesia - CV Banong Farms" 
                class="cert-inner-img w-full h-[340px] sm:h-[400px] lg:h-[460px] object-cover object-top will-change-transform transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <!-- Gradient Vignette Lembut di Bagian Bawah Gambar -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none"></div>

              <!-- Overlay Card di Bagian Bawah Gambar -->
              <div class="cert-overlay-card absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-lg border border-white/40 dark:border-slate-800 will-change-transform">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h4 class="font-extrabold font-outfit text-sm sm:text-base text-primary dark:text-white leading-tight">
                      Agen Resmi PT. New Hope Indonesia
                    </h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      New Hope Cirebon · Bring You New Life
                    </p>
                    
                    <!-- Rating 5.0 -->
                    <div class="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-amber-500">
                      <span class="material-symbols-outlined text-[15px] fill-current">star</span>
                      <span class="text-slate-900 dark:text-white font-bold">5.0</span>
                      <span class="text-slate-500 dark:text-slate-400 font-normal text-[11px]">(Pilihan utama peternak Banyumas Barat)</span>
                    </div>
                  </div>
                </div>

                <!-- Tautan Kontak & Jam Operasional Resmi -->
                <div class="flex items-center gap-2.5 pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 text-[11px]">
                  <a 
                    href="https://wa.me/628999192861" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="hover:text-primary dark:hover:text-secondary-container transition-colors flex items-center gap-1 font-medium"
                  >
                    <span class="material-symbols-outlined text-[14px]">chat</span>
                    <span>Hubungi Toko</span>
                  </a>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <span class="text-slate-600 dark:text-slate-300 font-medium">
                    Senin–Sabtu 07.30–16.00
                  </span>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <span class="text-slate-800 dark:text-slate-200 font-bold">
                    100% Asli
                  </span>
                </div>
              </div>

            </div>

          </div>

          <!-- SISI KANAN: Penjelasan Narasi & 4 Kartu Fitur Terstruktur -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
            
            <!-- Narasi Atas: Judul & Deskripsi Mendalam Manusiawi -->
            <div class="cred-narrative space-y-2.5 will-change-transform">
              <h3 class="text-2xl sm:text-3xl font-black font-outfit text-primary dark:text-white tracking-tight leading-tight">
                Efisiensi FCR &amp; Hasil Panen Dimulai dari Pakan yang Tepat
              </h3>
              
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Dalam usaha peternakan unggas maupun ruminansia, pakan menyumbang lebih dari 70% total biaya operasional. Kualitas nutrisi yang tidak konsisten berisiko fatal pada penurunan produksi telur dan lambatnya pertambahan bobot harian ternak.
              </p>
              
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Sebagai agen resmi PT. New Hope Indonesia Cirebon, CV Banong Farms menjamin pakan yang Anda terima memiliki standar mutu pabrikan yang konsisten, protein presisi, dan rasio konversi pakan (FCR) yang hemat. Kami juga melengkapi sarana kandang dengan bibit unggul terpilih, multivitamin dan vaksin resmi dari Medion, serta timbangan takaran yang jujur.
              </p>
            </div>

            <!-- 4 Kartu Fitur Terstruktur (Grid 2x2 Rapi) -->
            <div class="cred-feature-grid grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 will-change-transform">
              
              <!-- Kartu 1: Pakan Segar Pabrikan -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-amber-400/50 transition-colors">
                <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                  <span class="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1 leading-snug">
                  Pakan Segar dari Pabrik
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pasokan berkala langsung dari produsen New Hope menjamin aroma dan kualitas nutrisi tetap terjaga.
                </p>
              </div>

              <!-- Kartu 2: Grosir Sak & Eceran Kiloan -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-amber-400/50 transition-colors">
                <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                  <span class="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1 leading-snug">
                  Grosir Sak &amp; Ecer Kiloan
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Melayani pembelian partai sak 50kg maupun eceran kiloan dengan takaran timbangan yang akurat.
                </p>
              </div>

              <!-- Kartu 3: Armada Toko Sendiri -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-amber-400/50 transition-colors">
                <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                  <span class="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1 leading-snug">
                  Armada Pengantaran Toko
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pengantaran langsung ke kandang di Ajibarang, Cilongok, Pekuncen, dan sekitarnya tanpa repot.
                </p>
              </div>

              <!-- Kartu 4: Konsultasi Praktisi Lapangan -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-amber-400/50 transition-colors">
                <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                  <span class="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1 leading-snug">
                  Konsultasi Nutrisi &amp; Vaksin
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Diskusi terbuka seputar dosis pakan, jadwal vaksinasi, dan pencegahan penyakit bersama praktisi.
                </p>
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

const credSectionRef = ref(null)
const certCardRef = ref(null)
const counterDisplay = ref('0')

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. MASTER ENTRANCE REVEAL TIMELINE (Terkoordinasi Saat Seksi Masuk Viewport)
    // start: 'top 75%' - Mengalir alami, 100% bebas dari scroll-lock atau pinning tersendat
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: credSectionRef.value,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    })

    // (a) Kinetic Staggered Reveal Gaya Hero Slider pada Header Kiri & Metrik Kanan
    // (y: 40px -> 0, opacity: 0 -> 1, duration: 1.0s, stagger: 0.1s, ease: 'power3.out')
    entranceTl.from('.cred-hero-text', {
      y: 40,
      opacity: 0,
      duration: 1.0,
      stagger: 0.1,
      ease: 'power3.out'
    })

    // (b) Rolling Counter Ticker: Berputar halus dari 0 ke 14rb+
    const counterObj = { val: 0 }
    entranceTl.to(counterObj, {
      val: 14,
      duration: 2.0,
      ease: 'power2.out',
      onUpdate: () => {
        counterDisplay.value = Math.floor(counterObj.val) + 'rb+'
      }
    }, '<')

    // (c) 4 Avatar Panen Bertumpuk: Pop-in elastis bergantian (Bebas CSS transition conflict)
    entranceTl.from('.cred-avatar', {
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: 'back.out(1.8)'
    }, '-=1.6')

    // (d) Showcase Sertifikat: Curtain Mask Wipe Reveal + Zoom Out
    entranceTl.from('.cert-card-frame', {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
      duration: 1.15,
      ease: 'power3.inOut'
    }, '-=1.2')

    entranceTl.from('.cert-inner-img', {
      scale: 1.2,
      duration: 1.25,
      ease: 'power3.out'
    }, '<')

    entranceTl.from('.cert-overlay-card', {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.5')

    // (e) Sisi Kanan: Narasi Komitmen
    entranceTl.from('.cred-narrative', {
      y: 25,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out'
    }, '-=0.7')

    // (f) 2 Kartu Fitur Elevasi Halus (Murni dikontrol entranceTl, bebas tabrakan properti GSAP)
    entranceTl.from('.cred-feature-card', {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.65,
      ease: 'back.out(1.15)'
    }, '-=0.45')


    // 2. CONTINUOUS SCROLL PARALLAX (Tersinkronisasi 1:1 dengan Lenis, Tanpa Tabrakan Properti)
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        // Piagam sertifikat meluncur naik perlahan
        gsap.to('.cert-card-frame', {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: credSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })

        // Grid pembungkus fitur di kanan bergeser lembut (animate container .cred-feature-grid, BUKAN card-nya!)
        gsap.to('.cred-feature-grid', {
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: credSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })

        // Background Ambient Glow Parallax
        gsap.to('.cred-ambient-glow', {
          y: 40,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: credSectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3
          }
        })
      }
    })
  }, credSectionRef.value)
})

// 3. INTERACTIVE 3D GYROSCOPIC TILT PADA PIAGAM SERTIFIKAT (Khusus Desktop Pointer)
const handleCertPointerMove = (e) => {
  if (!certCardRef.value || window.matchMedia('(pointer: coarse)').matches) return
  const rect = certCardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(certCardRef.value, {
    rotateY: (x / rect.width) * 10,
    rotateX: -(y / rect.height) * 10,
    transformPerspective: 1000,
    duration: 0.35,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

const handleCertPointerLeave = () => {
  if (!certCardRef.value) return
  gsap.to(certCardRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.7,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
