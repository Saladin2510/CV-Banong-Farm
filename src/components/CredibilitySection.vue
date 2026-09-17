<template>
  <section 
    ref="credSectionRef"
    id="reputasi" 
    class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-20 lg:py-0 lg:min-h-screen lg:h-screen lg:flex lg:items-center transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
  >
    <!-- Anchor identifier for backwards compatibility #kelayakan -->
    <span id="kelayakan" class="absolute -top-32 pointer-events-none opacity-0"></span>

    <!-- Background Ambient Glow Halus Selaras dengan VisiMisiSection -->
    <div class="absolute top-1/3 left-10 w-80 h-80 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-80 h-80 bg-secondary-container/10 dark:bg-secondary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

    <!-- Kontainer Lebar Maksimal SAMA PERSIS dengan VisiMisiSection dan ProductGrid (1280px) -->
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10 w-full">
      
      <!-- 1. Baris Atas: Headline & Metrik 14rb+ (Layout Persis Sesuai Gambar Referensi) -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
        
        <!-- Sisi Kiri: Badge Pill, Judul Utama & Subjudul -->
        <div class="max-w-xl">
          <!-- Top Breadcrumb Pill Sesuai Style Web -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container text-xs font-bold mb-3 border border-primary/20 dark:border-white/20 font-telemetry-code">
            <span class="material-symbols-outlined text-[15px] text-primary dark:text-secondary-container">verified</span>
            <span>Standar Mutu &amp; Kelayakan Resmi</span>
          </div>

          <!-- Judul Utama: Reputasi -->
          <h2 class="text-3xl sm:text-4xl lg:text-[44px] font-black font-outfit text-primary dark:text-white tracking-tight leading-tight">
            Reputasi
          </h2>

          <!-- Subjudul 1 Baris -->
          <p class="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Berizin resmi NIB, higienis, dan teruji laboratorium untuk menjamin pangan sehat keluarga setiap hari.
          </p>
        </div>

        <!-- Sisi Kanan: Metrik Besar + 4 Avatar Tumpuk + Keterangan (Persis Gambar Referensi "115k") -->
        <div class="flex flex-col items-start lg:items-end shrink-0 pt-2 lg:pt-0">
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Angka Metrik Besar Dinamis dengan Counter Rolling Animasi GSAP -->
            <span class="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight text-primary dark:text-secondary-container leading-none font-telemetry-code tabular-nums">
              {{ counterDisplay }}
            </span>

            <!-- 4 Lingkaran Foto Panen Bertumpuk -->
            <div class="flex -space-x-2.5 sm:-space-x-3 overflow-hidden p-0.5">
              <img 
                src="/assets/product-eggs.png" 
                alt="Panen Telur Segar" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover bg-amber-50 shadow-xs transition-transform hover:scale-110 duration-200"
                title="Panen Telur Ayam &amp; Bebek Segar Harian"
              />
              <img 
                src="/assets/product-chicken.png" 
                alt="Unggas Sehat Alami" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover bg-emerald-50 shadow-xs transition-transform hover:scale-110 duration-200"
                title="Ayam Kampung Bebas Hormon Sintetis"
              />
              <img 
                src="/assets/product-duck.png" 
                alt="Bebek &amp; Itik Pilihan" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover bg-blue-50 shadow-xs transition-transform hover:scale-110 duration-200"
                title="Bebek &amp; Entok Sehat Alami"
              />
              <img 
                src="/assets/product-fish.png" 
                alt="Ikan Air Tawar Segar" 
                class="inline-block w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-white dark:ring-[#070D1E] object-cover bg-cyan-50 shadow-xs transition-transform hover:scale-110 duration-200"
                title="Ikan Nila Air Deras Ajibarang"
              />
            </div>
          </div>

          <!-- Keterangan Subtitle di Bawah Angka -->
          <span class="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 font-telemetry-code uppercase">
            Dipercaya 1.400+ Pelanggan &amp; Mitra
          </span>
        </div>

      </div>

      <!-- 2. Kontainer Kartu Utama (Clean Card Selaras dengan Desain Web & Referensi) -->
      <div class="bg-white dark:bg-[#0c1a30] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md dark:shadow-2xl border border-slate-200/90 dark:border-slate-800">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <!-- SISI KIRI: Showcase Sertifikat Resmi & Piala Keunggulan (Pengganti Foto Dokter Sesuai Permintaan) -->
          <div class="lg:col-span-5 relative w-full flex flex-col items-center">
            
            <!-- Bingkai Foto Sertifikat & Piala Keunggulan (Interactive 3D Depth Tilt & Curtain Mask Reveal) -->
            <div 
              ref="certCardRef"
              @pointermove="handleCertPointerMove"
              @pointerleave="handleCertPointerLeave"
              class="cert-curtain-mask relative w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 group shadow-lg will-change-[clip-path,transform]"
            >
              <img 
                src="/assets/sertifikat_kelayakan_cv_banong.jpg" 
                alt="Sertifikat Kelayakan Mutu dan Higienis CV Banong Farms" 
                class="cert-inner-img w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover object-center will-change-transform transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <!-- Gradient Vignette Lembut di Bagian Bawah Gambar -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

              <!-- Overlay Card di Bagian Bawah Gambar (Persis Layout Kartu Dokter di Gambar Referensi) -->
              <div class="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-lg border border-white/40 dark:border-slate-800">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h4 class="font-extrabold font-outfit text-sm sm:text-base text-primary dark:text-white leading-tight">
                      Sertifikasi Mutu &amp; Higienis
                    </h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      Izin Usaha NIB: 018/KMF/BPOM-AGRI/2023
                    </p>
                    
                    <!-- Rating & Jumlah Review Pelanggan -->
                    <div class="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-amber-500">
                      <span class="material-symbols-outlined text-[15px] fill-current">star</span>
                      <span class="text-slate-800 dark:text-slate-200">4.9</span>
                      <span class="text-slate-400 font-normal text-[11px]">(1.428 ulasan pembeli puas)</span>
                    </div>
                  </div>

                  <!-- Badge Verifikasi Hijau -->
                  <div class="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0" title="Terverifikasi Resmi">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                  </div>
                </div>

                <!-- Tautan Kontak & Medsos Resmi (Persis Ikon Medsos di Kartu Referensi) -->
                <div class="flex items-center gap-2.5 pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 text-[11px]">
                  <a 
                    href="https://wa.me/628999192861" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span class="material-symbols-outlined text-[14px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="hover:text-pink-500 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span class="material-symbols-outlined text-[14px]">photo_camera</span>
                    <span>Instagram</span>
                  </a>
                  <span class="text-slate-300 dark:text-slate-700">•</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                    <span>100% Halal</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          <!-- SISI KANAN: Penjelasan Narasi & 2 Kartu Fitur Tambahan (Persis Referensi Gambar) -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            
            <!-- Narasi Atas: Judul Award-Winning & Deskripsi Mendalam -->
            <div class="space-y-3.5">
              <h3 class="text-2xl sm:text-3xl font-black font-outfit text-primary dark:text-white tracking-tight leading-tight">
                Standar Higienis Teruji &amp; Kredibilitas yang Dapat Anda Percaya
              </h3>
              
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                CV Banong Farms beroperasi dengan kepatuhan standar mutu peternakan modern di bawah pengawasan veteriner terpadu dan izin legalitas Nomor Induk Berusaha (NIB). Kami memastikan setiap butir telur segar harian, karkas unggas higienis, domba, kambing, serta ikan air tawar dipanen dari lingkungan sehat alami bebas suntikan hormon sintetis dan tanpa residu antibiotik berbahaya.
              </p>
              
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Dengan pendekatan agribisnis sirkular terpadu dan pemanfaatan larva Black Soldier Fly (BSF) sebagai pengurai limbah organik, kami menjamin nutrisi pakan berprotein murni yang menghasilkan produk pangan lezat, sehat, dan berdaya simpan lebih tahan lama secara alami untuk keluarga Anda.
              </p>
            </div>

            <!-- 2 Kartu Pendukung di Bawah Narasi (Persis Kartu "Optimize Payroll" & "Streamline Compliance") -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
              
              <!-- Kartu 1: Pakan Alami & Bebas Kimia (Sesuai Kartu Kiri Bawah di Gambar) -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                <!-- Icon Box di Pojok Kiri Atas Kartu -->
                <div class="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/30 text-primary dark:text-secondary-container flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <span class="material-symbols-outlined text-[22px]">eco</span>
                </div>

                <h4 class="font-bold font-outfit text-sm sm:text-base text-primary dark:text-white mb-1.5 leading-snug">
                  Pakan Alami Bebas Hormon
                </h4>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pakan racikan dedak alami, hijauan jagung, dan larva maggot BSF berprotein tinggi menghasilkan daging dan telur padat nutrisi yang bebas bahan pengawet sintesis.
                </p>
              </div>

              <!-- Kartu 2: Pengawasan Veteriner & Sanitasi (Sesuai Kartu Kanan Bawah di Gambar) -->
              <div class="cred-feature-card bg-slate-50 dark:bg-[#071120] rounded-2xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                <!-- Icon Box di Pojok Kiri Atas Kartu -->
                <div class="w-10 h-10 rounded-xl bg-secondary-container/20 dark:bg-secondary-container/15 text-primary dark:text-secondary-container flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <span class="material-symbols-outlined text-[22px]">health_and_safety</span>
                </div>

                <h4 class="font-bold font-outfit text-sm sm:text-base text-primary dark:text-white mb-1.5 leading-snug">
                  Sanitasi &amp; Uji Veteriner
                </h4>

                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pemeriksaan berkala kesehatan hewan, sterilisasi kandang biosekuriti, dan sirkulasi air kolam deras menjamin keamanan biologis pangan sesuai standar dinas terkait.
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
    ScrollTrigger.matchMedia({
      // Desktop & Laptop: Full Pinned Storytelling Sequence (~2 kali putaran scroll)
      "(min-width: 1024px)": () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: credSectionRef.value,
            start: "top top",
            end: "+=160%", // Membutuhkan ~2 kali scroll wheel/swipe
            pin: true,
            scrub: 1.1,
            anticipatePin: 1
          }
        })

        // Awal: Tirai tertutup, inner image sedikit membesar, kartu fitur tersembunyi
        tl.set('.cert-curtain-mask', { clipPath: 'inset(100% 0% 0% 0%)' })
        tl.set('.cert-inner-img', { scale: 1.25 })
        tl.set('.cred-feature-card', { y: 55, opacity: 0 })

        const counterObj = { val: 0 }

        // FASE 1 (Scroll putaran 1: Tirai piagam terbuka penuh + zoom-out halus + Counter berputar proporsional)
        tl.to('.cert-curtain-mask', {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.45,
          ease: 'power2.inOut'
        })
        tl.to('.cert-inner-img', {
          scale: 1,
          duration: 0.45,
          ease: 'power2.out'
        }, "<")
        tl.to(counterObj, {
          val: 14,
          duration: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            counterDisplay.value = Math.floor(counterObj.val) + 'rb+'
          }
        }, "<")

        // FASE 2 (Scroll putaran 2: 2 Kartu fitur pendukung meluncur naik dan mengunci ke posisi ideal)
        tl.to('.cred-feature-card', {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.35,
          ease: 'power2.out'
        })

        // FASE 3: Tahan sejenak tampilan sempurna sebelum unpin
        tl.to({}, { duration: 0.25 })
      },

      // Mobile / Tablet (< 1024px): Scroll trigger reveal alami tanpa pin
      "(max-width: 1023px)": () => {
        const counterObj = { val: 0 }
        gsap.to(counterObj, {
          val: 14,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: credSectionRef.value,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            counterDisplay.value = Math.floor(counterObj.val) + 'rb+'
          }
        })

        gsap.fromTo('.cert-curtain-mask',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: credSectionRef.value,
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        )

        gsap.from('.cred-feature-card', {
          scrollTrigger: {
            trigger: credSectionRef.value,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.out'
        })
      }
    })
  }, credSectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

// 3. 3D Gyroscopic & Magnetic Depth Tilt pada Piagam Sertifikat
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
</script>
