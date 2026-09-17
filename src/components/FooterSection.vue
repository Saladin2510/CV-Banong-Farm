<template>
  <footer 
    ref="footerRef"
    class="w-full bg-[#F8FAFC] dark:bg-[#070D1E] text-slate-800 dark:text-slate-100 pt-16 sm:pt-20 lg:pt-20 xl:pt-24 pb-4 sm:pb-6 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden flex flex-col justify-between lg:h-screen lg:min-h-[100dvh] lg:max-h-screen" 
    id="kontak"
    :style="dotGridStyle"
  >
    <!-- Kontainer Konten Utama (100% tinggi di desktop) -->
    <div class="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10 lg:h-full">
      
      <!-- Bagian Atas: Brand Besar CV Banong Farms, Navigasi Cepat, & Peta Google Maps Interaktif -->
      <div class="flex flex-col lg:flex-row items-start justify-between gap-6 xl:gap-10 pb-4 lg:pb-6 border-b border-slate-200/80 dark:border-slate-800/80 w-full shrink-0">
        
        <!-- Kolom 1: Brand Raksasa "CV Banong Farms" & Informasi Peternakan (Lebar dan Leluasa) -->
        <div class="w-full lg:flex-1 lg:max-w-xl">
          <!-- Logo Resmi & Status Badge -->
          <div class="flex items-center gap-2.5 mb-2.5">
            <a href="#" class="shrink-0 transition-transform duration-200 hover:scale-105" aria-label="Kembali ke atas">
              <img 
                alt="Logo Resmi CV Banong Farms" 
                class="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-sm" 
                src="/assets/logo.png" 
              />
            </a>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Peternakan &amp; Agribisnis Modern</span>
            </span>
          </div>

          <!-- NAMA CV BANONG FARMS BESAR & LEGA -->
          <h2 class="text-3xl sm:text-4xl lg:text-4xl xl:text-[44px] font-black font-outfit text-slate-900 dark:text-white tracking-tight leading-tight">
            CV Banong Farms
          </h2>

          <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Pusat peternakan unggas, domba, kambing, budidaya perikanan air tawar, dan pupuk organik kasgot berkualitas unggul dari Ajibarang, Banyumas.
          </p>

          <!-- WhatsApp & Jam Operasional -->
          <div class="mt-3.5 flex flex-wrap items-center gap-2.5 text-xs">
            <a 
              href="https://wa.me/628999192861" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span class="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp: 0899-9192-861</span>
            </a>
            <div class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium">
              <span class="material-symbols-outlined text-[15px] text-slate-500">schedule</span>
              <span>07.00 - 17.00 WIB</span>
            </div>
          </div>
        </div>

        <!-- Kolom 2: Navigasi Cepat (2 Kolom Rapi Berpanah "→") -->
        <div class="w-full sm:w-auto shrink-0 pt-1 lg:pt-2">
          <h4 class="font-bold text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 font-outfit">
            Navigasi Cepat
          </h4>
          <div class="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-2.5 text-xs sm:text-sm">
            <div class="flex flex-col space-y-2.5">
              <a 
                href="#tentang-kami" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Tentang Kami</span>
              </a>
              
              <a 
                href="#reputasi" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Reputasi Mutu</span>
              </a>

              <a 
                href="#katalog-produk" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Katalog Produk</span>
              </a>

              <a 
                href="#komoditas-marquee" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Komoditas Panen</span>
              </a>
            </div>

            <div class="flex flex-col space-y-2.5">
              <a 
                href="https://wa.me/628999192861" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Pesan via WA</span>
              </a>

              <a 
                href="#kontak" 
                @click.prevent="openWhatsAppConsultation"
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Konsultasi</span>
              </a>

              <a 
                href="https://maps.app.goo.gl/AXAGnr9V4D15MyUz9" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Lokasi Maps</span>
              </a>

              <a 
                href="mailto:halo@banongfarms.id" 
                class="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              >
                <span class="text-slate-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1 font-mono">→</span>
                <span>Kirim Email</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Kolom 3: PETA GOOGLE MAPS INTERAKTIF (Ukuran Nyaman & Proporsional) -->
        <div class="w-full lg:w-72 xl:w-80 shrink-0 pt-1 lg:pt-2">
          <div class="relative w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0c1e34] shadow-md border border-slate-200/90 dark:border-slate-700/80 flex flex-col">
            <!-- Iframe Google Maps Asli Banong Farms (Live, Bisa Digeser / Zoom) -->
            <div class="w-full h-32 lg:h-36 relative bg-slate-200 dark:bg-[#061527]">
              <iframe
                title="Peta Interaktif CV Banong Farms Ajibarang"
                class="w-full h-full border-0"
                src="https://maps.google.com/maps?q=-7.4065147,109.0743739+(Banong+Farms)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Strip Bawah Peta -->
            <div class="p-2.5 bg-white dark:bg-[#0c1e34] flex items-center justify-between gap-2 border-t border-slate-200/80 dark:border-white/10">
              <span class="text-[11px] text-slate-700 dark:text-slate-200 font-semibold truncate flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Banong Farms Ajibarang</span>
              </span>
              <a 
                href="https://maps.app.goo.gl/AXAGnr9V4D15MyUz9" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1 py-1 px-2.5 rounded-lg bg-secondary-container hover:bg-accent-hover text-primary text-[11px] font-bold transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
              >
                <span>Buka di Maps</span>
                <span class="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bagian Tengah: THE FLOATING 3D SQUIRCLE TILES DENGAN IKON HEWAN-HEWAN CV BANONG (Ukuran Pas & Proporsional) -->
      <div 
        ref="tilesContainerRef"
        @pointermove="handleTilesPointerMove"
        @pointerleave="handleTilesPointerLeave"
        class="w-full py-1 lg:py-2 relative select-none flex-1 flex items-center justify-center min-h-[260px] lg:min-h-0"
      >
        
        <!-- Background Ambient Glow Lembut -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-56 bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Tampilan Desktop & Tablet: Floating Organic Scattered Layout (Ukuran Proporsional & Elegan) -->
        <div class="hidden md:block relative w-full h-full min-h-[260px] lg:min-h-[300px] xl:min-h-[320px]">
          <div 
            v-for="(tile, index) in animalTiles" 
            :key="tile.id"
            :ref="el => setTileRef(el, index)"
            :style="{
              left: tile.left,
              top: tile.top
            }"
            class="animal-tile-item absolute transform cursor-pointer group will-change-transform"
            @click="handleTileClick(tile)"
          >
            <!-- 3D Squircle Card Tile (Proporsional: ~112px) -->
            <div 
              :class="[
                tile.rotationClass,
                'w-24 h-24 sm:w-26 sm:h-26 lg:w-28 lg:h-28 xl:w-[116px] xl:h-[116px] rounded-[24px] sm:rounded-[26px] lg:rounded-[28px] xl:rounded-[30px] p-3 sm:p-3.5 lg:p-4 flex flex-col items-center justify-center transition-all duration-300',
                'bg-white dark:bg-[#111C35] border border-slate-200/80 dark:border-slate-700/80',
                'shadow-[0_18px_36px_-10px_rgba(0,0,0,0.12),0_8px_16px_-6px_rgba(0,0,0,0.06),inset_0_1.5px_0_rgba(255,255,255,0.95)]',
                'dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7),0_10px_20px_-6px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]',
                'group-hover:shadow-[0_28px_56px_-12px_rgba(0,0,0,0.22)] dark:group-hover:shadow-[0_28px_56px_-12px_rgba(0,0,0,0.85)]'
              ]"
            >
              <!-- Ikon Hewan / Komoditas (Proporsional: ~64px) -->
              <div class="w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-[68px] xl:h-[68px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <component :is="tile.iconComponent" />
              </div>
            </div>

            <!-- Floating Label Tooltip on Hover -->
            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-40 transform translate-y-1 group-hover:translate-y-0">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md border border-white/10">
                {{ tile.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Tampilan Mobile: Carousel / Staggered Flow Responsive yang Rapi -->
        <div class="block md:hidden">
          <div class="flex items-center justify-between mb-2.5 px-1 text-xs text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1.5 font-medium">
              <span class="material-symbols-outlined text-[15px] text-emerald-500">pets</span>
              <span>Representasi Hewan &amp; Ternak CV Banong</span>
            </span>
            <span class="text-[11px] text-slate-400">Ketuk untuk rincian</span>
          </div>

          <div class="grid grid-cols-4 gap-2.5 py-1">
            <div 
              v-for="tile in animalTiles.slice(0, 8)" 
              :key="'m-' + tile.id"
              @click="handleTileClick(tile)"
              class="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
            >
              <div 
                :class="[
                  tile.rotationClass,
                  'w-14 h-14 rounded-[18px] p-1.5 flex items-center justify-center',
                  'bg-white dark:bg-[#111C35] border border-slate-200/80 dark:border-slate-700/80',
                  'shadow-[0_10px_20px_-8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_10px_20px_-8px_rgba(0,0,0,0.5)]'
                ]"
              >
                <div class="w-9 h-9 flex items-center justify-center">
                  <component :is="tile.iconComponent" />
                </div>
              </div>
              <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center truncate max-w-[65px]">
                {{ tile.shortName }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bagian Bawah: Baris Hak Cipta & Kebijakan (Persis Referensi) -->
      <div class="pt-3 lg:pt-4 pb-1 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 shrink-0">
        <div>
          © 2026 CV Banong Farms. Seluruh hak cipta dilindungi undang-undang.
        </div>
        
        <div class="flex flex-wrap items-center gap-5 text-xs">
          <a href="#" class="hover:text-slate-900 dark:hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" class="hover:text-slate-900 dark:hover:text-white transition-colors">Syarat &amp; Ketentuan</a>
          <a 
            href="https://maps.app.goo.gl/AXAGnr9V4D15MyUz9" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Peta Google Maps</span>
            <span class="material-symbols-outlined text-[13px]">open_in_new</span>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, computed, h, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerRef = ref(null)
const tilesContainerRef = ref(null)
const tileRefs = ref([])

const setTileRef = (el, index) => {
  if (el) tileRefs.value[index] = el
}

// Style Dot-Grid Halus seperti pada Gambar Referensi
const dotGridStyle = computed(() => {
  return {
    backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.28) 1.25px, transparent 1.25px)',
    backgroundSize: '24px 24px'
  }
})

// Komponen Ikon Hewan Vektor Khusus CV Banong Farms (Desain Bersih, Berwarna, Mewakili Komoditas Riil)
const IconAyam = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Jengger & Badan Ayam
  h('circle', { cx: '32', cy: '34', r: '18', fill: '#F59E0B' }),
  h('path', { d: 'M32 10 C29 10 27 13 28 16 C25 15 23 18 25 21 C22 22 23 26 27 26 L37 26 C41 26 42 22 39 21 C41 18 39 15 36 16 C37 13 35 10 32 10 Z', fill: '#EF4444' }),
  h('circle', { cx: '32', cy: '30', r: '13', fill: '#FBBF24' }),
  h('circle', { cx: '27', cy: '28', r: '2.5', fill: '#1E293B' }),
  h('circle', { cx: '28', cy: '27', r: '0.8', fill: '#FFFFFF' }),
  h('path', { d: 'M23 30 L16 33 L23 35 Z', fill: '#EA580C' }), // Paruh
  h('path', { d: 'M25 36 C25 39 28 40 28 37 Z', fill: '#EF4444' }), // Gelambir
  h('path', { d: 'M38 30 C45 32 47 40 40 46 C37 42 36 36 38 30 Z', fill: '#D97706' }) // Sayap
])

const IconBebek = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Bebek Petelur / Itik
  h('ellipse', { cx: '35', cy: '38', rx: '17', ry: '13', fill: '#FDE047' }),
  h('circle', { cx: '25', cy: '25', r: '11', fill: '#FACC15' }),
  h('ellipse', { cx: '13', cy: '27', rx: '8', ry: '4', fill: '#FB923C' }), // Paruh bebek
  h('circle', { cx: '23', cy: '23', r: '2.5', fill: '#0F172A' }),
  h('circle', { cx: '24', cy: '22', r: '0.8', fill: '#FFFFFF' }),
  h('path', { d: 'M33 34 C41 34 45 42 38 46 C33 46 30 40 33 34 Z', fill: '#EAB308' }), // Sayap
  h('path', { d: 'M18 49 C26 49 32 52 46 49 C50 48 52 50 48 53 C36 55 22 55 14 51 Z', fill: '#38BDF8', opacity: '0.6' }) // Riak air
])

const IconDomba = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Domba Garut Bulu Lebat
  h('ellipse', { cx: '32', cy: '36', rx: '19', ry: '15', fill: '#F1F5F9' }),
  // Lingkaran bulu wol
  h('circle', { cx: '18', cy: '32', r: '7', fill: '#E2E8F0' }),
  h('circle', { cx: '46', cy: '32', r: '7', fill: '#E2E8F0' }),
  h('circle', { cx: '24', cy: '22', r: '7', fill: '#E2E8F0' }),
  h('circle', { cx: '40', cy: '22', r: '7', fill: '#E2E8F0' }),
  h('circle', { cx: '32', cy: '19', r: '7', fill: '#F1F5F9' }),
  // Wajah Domba
  h('ellipse', { cx: '32', cy: '34', rx: '9', ry: '11', fill: '#334155' }),
  h('ellipse', { cx: '22', cy: '29', rx: '5', ry: '3', fill: '#475569', transform: 'rotate(-20 22 29)' }), // Telinga kiri
  h('ellipse', { cx: '42', cy: '29', rx: '5', ry: '3', fill: '#475569', transform: 'rotate(20 42 29)' }), // Telinga kanan
  h('circle', { cx: '29', cy: '33', r: '1.5', fill: '#FFFFFF' }),
  h('circle', { cx: '35', cy: '33', r: '1.5', fill: '#FFFFFF' }),
  h('path', { d: 'M30 39 C31 41 33 41 34 39', stroke: '#CBD5E1', 'stroke-width': '1.5', 'stroke-linecap': 'round' })
])

const IconKambing = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Kambing Jawa / Etawa
  // Tanduk
  h('path', { d: 'M27 22 C24 13 18 12 16 14 C17 18 22 22 26 25', fill: '#94A3B8', stroke: '#64748B', 'stroke-width': '1.5' }),
  h('path', { d: 'M37 22 C40 13 46 12 48 14 C47 18 42 22 38 25', fill: '#94A3B8', stroke: '#64748B', 'stroke-width': '1.5' }),
  // Kepala Kambing
  h('path', { d: 'M25 24 L39 24 L37 44 C37 47 27 47 27 44 Z', fill: '#EA580C' }),
  h('ellipse', { cx: '18', cy: '28', rx: '7', ry: '3', fill: '#C2410C', transform: 'rotate(-30 18 28)' }), // Telinga panjang jatuh
  h('ellipse', { cx: '46', cy: '28', rx: '7', ry: '3', fill: '#C2410C', transform: 'rotate(30 46 28)' }),
  h('circle', { cx: '29', cy: '32', r: '2', fill: '#0F172A' }),
  h('circle', { cx: '35', cy: '32', r: '2', fill: '#0F172A' }),
  h('ellipse', { cx: '32', cy: '42', rx: '4', ry: '2.5', fill: '#FED7AA' }), // Hidung
  h('path', { d: 'M31 46 L33 46 L32 50 Z', fill: '#FFFFFF' }) // Jenggot kambing
])

const IconSapi = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Sapi Ternak Sehat
  // Tanduk
  h('path', { d: 'M23 20 C20 15 15 17 17 21 C19 22 22 23 24 23 Z', fill: '#FDE047' }),
  h('path', { d: 'M41 20 C44 15 49 17 47 21 C45 22 42 23 40 23 Z', fill: '#FDE047' }),
  // Telinga
  h('ellipse', { cx: '17', cy: '25', rx: '6', ry: '3.5', fill: '#F8FAFC', stroke: '#E2E8F0', transform: 'rotate(-15 17 25)' }),
  h('ellipse', { cx: '47', cy: '25', rx: '6', ry: '3.5', fill: '#F8FAFC', stroke: '#E2E8F0', transform: 'rotate(15 47 25)' }),
  // Kepala & Belang
  h('ellipse', { cx: '32', cy: '30', rx: '14', ry: '12', fill: '#FFFFFF' }),
  h('path', { d: 'M23 23 C22 28 27 30 28 25 C28 22 25 21 23 23 Z', fill: '#0F172A' }), // Belang hitam
  h('circle', { cx: '26', cy: '29', r: '2.5', fill: '#0F172A' }),
  h('circle', { cx: '38', cy: '29', r: '2.5', fill: '#0F172A' }),
  // Moncong Pink
  h('ellipse', { cx: '32', cy: '41', rx: '10', ry: '7', fill: '#F472B6' }),
  h('circle', { cx: '29', cy: '41', r: '1.5', fill: '#831843' }),
  h('circle', { cx: '35', cy: '41', r: '1.5', fill: '#831843' })
])

const IconIkan = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Ikan Air Tawar / Nila
  h('path', { d: 'M14 32 C20 22 36 21 46 29 C49 25 54 22 55 24 C53 28 53 36 55 40 C54 42 49 39 46 35 C36 43 20 42 14 32 Z', fill: '#0284C7' }),
  h('path', { d: 'M28 24 C34 20 40 24 38 27 Z', fill: '#38BDF8' }), // Sirip atas
  h('circle', { cx: '22', cy: '30', r: '3', fill: '#FFFFFF' }),
  h('circle', { cx: '21', cy: '30', r: '1.5', fill: '#0F172A' }),
  h('path', { d: 'M28 34 C30 36 34 36 36 34', stroke: '#BAE6FD', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
  h('circle', { cx: '12', cy: '24', r: '2', fill: '#38BDF8', opacity: '0.6' }), // Gelembung
  h('circle', { cx: '9', cy: '18', r: '1.5', fill: '#38BDF8', opacity: '0.6' })
])

const IconTelur = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Telur Bebek Segar (Biru Muda) & Telur Ayam (Cokelat Keemasan)
  h('ellipse', { cx: '39', cy: '35', rx: '13', ry: '17', fill: '#F59E0B', transform: 'rotate(15 39 35)' }),
  h('ellipse', { cx: '24', cy: '37', rx: '12', ry: '16', fill: '#67E8F9', transform: 'rotate(-10 24 37)' }),
  // Kilauan Cahaya Telur
  h('ellipse', { cx: '21', cy: '30', rx: '3', ry: '6', fill: '#FFFFFF', opacity: '0.5', transform: 'rotate(-10 21 30)' }),
  h('ellipse', { cx: '36', cy: '28', rx: '3', ry: '6', fill: '#FFFFFF', opacity: '0.5', transform: 'rotate(15 36 28)' })
])

const IconKelinci = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Kelinci Sehat
  // Telinga Panjang
  h('ellipse', { cx: '26', cy: '18', rx: '4', ry: '12', fill: '#FFFFFF', stroke: '#E2E8F0' }),
  h('ellipse', { cx: '26', cy: '18', rx: '2', ry: '8', fill: '#F472B6' }),
  h('ellipse', { cx: '38', cy: '18', rx: '4', ry: '12', fill: '#FFFFFF', stroke: '#E2E8F0' }),
  h('ellipse', { cx: '38', cy: '18', rx: '2', ry: '8', fill: '#F472B6' }),
  // Kepala
  h('circle', { cx: '32', cy: '36', r: '14', fill: '#FFFFFF' }),
  h('circle', { cx: '26', cy: '34', r: '2.5', fill: '#0F172A' }),
  h('circle', { cx: '38', cy: '34', r: '2.5', fill: '#0F172A' }),
  h('polygon', { points: '32,38 30,41 34,41', fill: '#F472B6' }), // Hidung segitiga
  h('path', { d: 'M18 38 L26 39 M18 42 L26 41 M46 38 L38 39 M46 42 L38 41', stroke: '#94A3B8', 'stroke-width': '1.2' }) // Kumis
])

const IconLebah = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Lebah Madu Ekosistem
  h('ellipse', { cx: '26', cy: '21', rx: '6', ry: '10', fill: '#BAE6FD', opacity: '0.7', transform: 'rotate(-25 26 21)' }),
  h('ellipse', { cx: '38', cy: '21', rx: '6', ry: '10', fill: '#BAE6FD', opacity: '0.7', transform: 'rotate(25 38 21)' }),
  // Tubuh Lebah Belang Kuning Hitam
  h('ellipse', { cx: '32', cy: '35', rx: '13', ry: '16', fill: '#FACC15' }),
  h('path', { d: 'M20 32 L44 32 M19 38 L45 38', stroke: '#0F172A', 'stroke-width': '4', 'stroke-linecap': 'round' }),
  h('circle', { cx: '27', cy: '28', r: '2', fill: '#0F172A' }),
  h('circle', { cx: '37', cy: '28', r: '2', fill: '#0F172A' }),
  h('path', { d: 'M32 50 L34 54 L30 54 Z', fill: '#0F172A' }) // Sengat
])

const IconKasgotOrganik = () => h('svg', { viewBox: '0 0 64 64', fill: 'none', class: 'w-full h-full drop-shadow-xs' }, [
  // Daun Segar & Siklus Pupuk Kasgot BSF
  h('path', { d: 'M18 46 C16 30 28 16 46 16 C48 34 36 48 18 46 Z', fill: '#10B981' }),
  h('path', { d: 'M20 44 C26 36 34 28 44 20', stroke: '#047857', 'stroke-width': '2.5', 'stroke-linecap': 'round' }),
  h('circle', { cx: '38', cy: '36', r: '6', fill: '#F59E0B' }), // Butiran nutrisi pupuk
  h('circle', { cx: '28', cy: '26', r: '4', fill: '#F59E0B' })
])

// Konfigurasi Posisi Organik & Rotasi Kartu Tile (Menyebar Dinamis Seperti Gambar ChronoTask)
const animalTiles = [
  {
    id: 'ayam',
    name: 'Ayam Kampung Segar',
    shortName: 'Ayam',
    iconComponent: IconAyam,
    left: '2%',
    top: '34%',
    rotationClass: '-rotate-12',
    delay: '0s',
    duration: '5.2s'
  },
  {
    id: 'telur',
    name: 'Telur Ayam & Bebek',
    shortName: 'Telur',
    iconComponent: IconTelur,
    left: '11%',
    top: '6%',
    rotationClass: 'rotate-8',
    delay: '0.8s',
    duration: '4.8s'
  },
  {
    id: 'bebek',
    name: 'Bebek & Entok',
    shortName: 'Bebek',
    iconComponent: IconBebek,
    left: '16%',
    top: '46%',
    rotationClass: '-rotate-6',
    delay: '1.4s',
    duration: '5.6s'
  },
  {
    id: 'domba',
    name: 'Domba Garut Pilihan',
    shortName: 'Domba',
    iconComponent: IconDomba,
    left: '28%',
    top: '38%',
    rotationClass: 'rotate-12',
    delay: '0.4s',
    duration: '5.0s'
  },
  {
    id: 'sapi',
    name: 'Sapi Ternak Sehat',
    shortName: 'Sapi',
    iconComponent: IconSapi,
    left: '39%',
    top: '8%',
    rotationClass: '-rotate-3',
    delay: '1.1s',
    duration: '6.0s'
  },
  {
    id: 'ikan',
    name: 'Ikan Air Tawar Nila',
    shortName: 'Ikan Nila',
    iconComponent: IconIkan,
    left: '49%',
    top: '48%',
    rotationClass: 'rotate-10',
    delay: '1.8s',
    duration: '5.4s'
  },
  {
    id: 'kambing',
    name: 'Kambing Etawa & Jawa',
    shortName: 'Kambing',
    iconComponent: IconKambing,
    left: '59%',
    top: '6%',
    rotationClass: '-rotate-8',
    delay: '0.6s',
    duration: '4.9s'
  },
  {
    id: 'kelinci',
    name: 'Kelinci Pedaging & Hias',
    shortName: 'Kelinci',
    iconComponent: IconKelinci,
    left: '69%',
    top: '42%',
    rotationClass: 'rotate-6',
    delay: '1.5s',
    duration: '5.7s'
  },
  {
    id: 'lebah',
    name: 'Lebah Madu Peternakan',
    shortName: 'Lebah',
    iconComponent: IconLebah,
    left: '79%',
    top: '8%',
    rotationClass: 'rotate-12',
    delay: '0.2s',
    duration: '5.1s'
  },
  {
    id: 'kasgot',
    name: 'Kasgot & Pupuk Organik',
    shortName: 'Kasgot BSF',
    iconComponent: IconKasgotOrganik,
    left: '84%',
    top: '44%',
    rotationClass: '-rotate-10',
    delay: '1.9s',
    duration: '5.5s'
  }
]

// Navigasi cepat saat ubin hewan diklik
const handleTileClick = (tile) => {
  const el = document.getElementById('katalog-produk')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const openWhatsAppConsultation = () => {
  window.open('https://wa.me/628999192861?text=Halo%20CV%20Banong%20Farms,%20saya%20ingin%20berkonsultasi%20mengenai%20produk%20peternakan%20dan%20hasil%20panen.', '_blank')
}

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Entrance Pop-In Elastis Bergelombang saat Footer Masuk Layar
    gsap.from(tileRefs.value, {
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      scale: 0,
      opacity: 0,
      y: 70,
      rotation: () => gsap.utils.random(-30, 30),
      duration: 1.2,
      ease: 'elastic.out(1.1, 0.55)',
      stagger: {
        amount: 0.5,
        from: 'random'
      }
    })

    // 2. Continuous Organic Buoyancy (Mengambang Alami Bebas Jank)
    tileRefs.value.forEach((tileEl, idx) => {
      if (!tileEl) return
      gsap.to(tileEl, {
        y: '+=8',
        rotation: '+=' + (idx % 2 === 0 ? 2 : -2),
        duration: 3 + (idx * 0.35) % 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: idx * 0.12
      })
    })
  }, footerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

// 3. Interactive 3D Magnetic & Tilt Physics saat Kursor Mouse Bergerak di Desktop
const handleTilesPointerMove = (e) => {
  if (!tilesContainerRef.value || window.matchMedia('(pointer: coarse)').matches) return

  const mouseX = e.clientX
  const mouseY = e.clientY

  tileRefs.value.forEach((tile) => {
    if (!tile) return
    const rect = tile.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = mouseX - centerX
    const dy = mouseY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 260

    if (dist < maxDist) {
      const force = (1 - dist / maxDist)
      const moveX = -(dx / dist) * force * 24
      const moveY = -(dy / dist) * force * 24
      const tiltX = (dy / maxDist) * 18
      const tiltY = -(dx / maxDist) * 18

      gsap.to(tile, {
        x: moveX,
        y: moveY,
        rotateX: tiltX,
        rotateY: tiltY,
        scale: 1.08,
        transformPerspective: 800,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    } else {
      gsap.to(tile, {
        x: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      })
    }
  })
}

const handleTilesPointerLeave = () => {
  if (!tileRefs.value.length) return
  gsap.to(tileRefs.value, {
    x: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.8,
    ease: 'elastic.out(1, 0.4)',
    stagger: 0.02,
    overwrite: 'auto'
  })
}
</script>

<style scoped>
/* Transisi kartu hover halus */
.animal-tile-item {
  transform-style: preserve-3d;
  perspective: 1000px;
}
</style>
