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
          <!-- Top Breadcrumb Pill Sesuai Style Web -->
          <div class="cred-hero-text inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container text-xs font-bold mb-3 border border-primary/20 dark:border-white/20 font-telemetry-code w-fit shadow-xs will-change-transform">
            <span class="material-symbols-outlined text-[15px] text-primary dark:text-secondary-container">verified</span>
            <span>BUKTI KUALITAS &amp; KEMITRAAN RESMI</span>
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
            <span class="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight text-primary dark:text-secondary-container leading-none font-telemetry-code tabular-nums">
              {{ counterDisplay }}
            </span>

            <!-- 4 Lingkaran Foto Panen Bertumpuk -->
            <div class="flex -space-x-2.5 sm:-space-x-3 p-0.5 items-center">
              <img 
                src="/assets/store/karung_1.jpeg" 
                alt="Pakan Karungan Berkualitas" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Pakan Pabrikan Teruji"
              />
              <img 
                src="/assets/store/vaksin_obat-obatan_produk.jpeg" 
                alt="Obat &amp; Vitamin Medion" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Obat &amp; Vaksin Resmi"
              />
              <img 
                src="/assets/store/pakan_hewan_burung.jpeg" 
                alt="Pakan Burung Lengkap" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Pakan Burung Berkicau"
              />
              <img 
                src="/assets/store/pakan_hewan_kucing.jpeg" 
                alt="Pet Food Lengkap" 
                class="cred-avatar inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover shadow-xs hover:scale-110 will-change-transform"
                title="Makanan Kucing &amp; Hewan Peliharaan"
              />
            </div>
          </div>

          <!-- Keterangan Subtitle di Bawah Angka -->
          <span class="cred-hero-text mt-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 font-telemetry-code uppercase will-change-transform">
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
                src="/assets/store/banner.jpeg" 
                alt="Plang Resmi Banong Farms Agen Pakan Ternak PT New Hope Indonesia Cirebon" 
                class="cert-inner-img w-full h-[340px] sm:h-[400px] lg:h-[460px] object-cover object-center will-change-transform transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <!-- Gradient Vignette Lembut di Bagian Bawah Gambar -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none"></div>

              <!-- Overlay Card di Bagian Bawah Gambar -->
              <div class="cert-overlay-card absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/40 dark:border-slate-800 will-change-transform">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h4 class="font-extrabold font-outfit text-sm sm:text-base text-primary dark:text-white leading-tight">
                      Agen Resmi PT. New Hope Indonesia
                    </h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      New Hope Cirebon · Bring You New Life
                    </p>
                    
                    <!-- Rating & Jumlah Review Pelanggan -->
                    <div class="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-amber-500">
                      <span class="material-symbols-outlined text-[15px] fill-current">star</span>
                      <span class="text-slate-800 dark:text-slate-200">5.0</span>
                      <span class="text-slate-400 font-normal text-[11px]">(Pilihan utama peternak Banyumas Barat)</span>
                    </div>
                  </div>

                  <!-- Badge Verifikasi Hijau -->
                  <div class="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0" title="Terverifikasi Resmi">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                  </div>
                </div>

                <!-- Tautan Kontak & Medsos Resmi -->
                <div class="flex items-center gap-2.5 pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 text-[11px]">
                  <a 
                    href="https://wa.me/628999192861" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span class="material-symbols-outlined text-[14px]">chat</span>
                    <span>WhatsApp Toko</span>
                  </a>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <span class="text-slate-600 dark:text-slate-300 font-medium">
                    Senin–Sabtu 07.30–16.00
                  </span>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                    <span>100% Asli</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          <!-- SISI KANAN: Penjelasan Narasi & 2 Kartu Fitur Tambahan -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            
            <!-- Narasi Atas: Judul & Deskripsi Mendalam Manusiawi -->
            <div class="cred-narrative space-y-3 sm:space-y-3.5 will-change-transform">
              <h3 class="text-2xl sm:text-3xl font-black font-outfit text-primary dark:text-white tracking-tight leading-tight">
                Keberhasilan Ternak Dimulai dari Nutrisi Pakan yang Tepat &amp; Konsisten
              </h3>
              
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Sebagai praktisi yang memulai usaha dari kandang puyuh sejak 2015, kami menyadari betul bahwa pakan memakan lebih dari 70% biaya operasional peternak. Ketidakstabilan nutrisi pakan berakibat fatal pada penurunan produksi telur dan lambatnya pertambahan bobot daging. Itulah mengapa CV Banong Farms bermitra resmi dengan PT. New Hope Indonesia Cirebon guna menjamin pakan yang Anda terima memiliki FCR hemat dan konsistensi mutu standar pabrikan.
              </p>
              
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Kami juga melengkapi kebutuhan kandang Anda dengan bibit unggul pilihan (DOQ puyuh, DOC ayam, DOD bebek), multivitamin Medion, vaksin resmi pencegah wabah, serta perlengkapan kandang kokoh. Seluruh produk dapat dibeli dalam kemasan karung sak 50kg maupun eceran kiloan dengan takaran timbangan yang jujur.
              </p>
            </div>

            <!-- 2 Kartu Pendukung di Bawah Narasi -->
            <div class="cred-feature-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1 will-change-transform">
              
              <!-- Kartu 1: Armada Toko Sendiri -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-shadow duration-300 group will-change-transform">
                <div class="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/30 text-primary dark:text-secondary-container flex items-center justify-center mb-3">
                  <span class="material-symbols-outlined text-[22px]">local_shipping</span>
                </div>

                <h4 class="font-bold font-outfit text-sm sm:text-base text-primary dark:text-white mb-1.5 leading-snug">
                  Armada Pengiriman Sendiri
                </h4>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pengantaran langsung ke kandang Anda di Ajibarang, Cilongok, Pekuncen, dan sekitarnya tanpa repot angkut sendiri.
                </p>
              </div>

              <!-- Kartu 2: Pengalaman Praktisi Lapangan -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-shadow duration-300 group will-change-transform">
                <div class="w-10 h-10 rounded-xl bg-secondary-container/20 dark:bg-secondary-container/15 text-primary dark:text-secondary-container flex items-center justify-center mb-3">
                  <span class="material-symbols-outlined text-[22px]">support_agent</span>
                </div>

                <h4 class="font-bold font-outfit text-sm sm:text-base text-primary dark:text-white mb-1.5 leading-snug">
                  Konsultasi Pengalaman Sejak 2015
                </h4>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Siap berdiskusi mengenai dosis pakan, pencegahan penyakit, jadwal vaksinasi, dan pemilihan bibit unggul yang tepat.
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
