<template>
  <footer class="w-full bg-[#132A4A] dark:bg-[#071326] text-white pt-20 sm:pt-28 lg:pt-36 pb-6 sm:pb-8 border-t border-transparent dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden lg:min-h-screen flex flex-col justify-between" id="kontak">
    <!-- Kontainer Lebar Maksimal Layar (100vh Desktop dengan Distribusi Vertikal Sempurna) -->
    <div class="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
      
      <!-- Bagian Atas: 4 Kolom Navigasi, Logo Resmi & Peta Interaktif -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-8 sm:pb-10 border-b border-white/10 animate-fade-in">
        
        <!-- Kolom 1: Logo Resmi di Samping Produk Panen -->
        <div class="lg:col-span-4 flex items-start gap-4 sm:gap-6">
          <!-- Logo Resmi CV Banong Farms -->
          <a href="#" class="shrink-0 transition-transform duration-300 hover:scale-105" aria-label="Kembali ke atas">
            <img 
              alt="CV Banong Farms" 
              class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow" 
              src="/assets/logo.png" 
            />
          </a>

          <!-- Daftar Produk Panen -->
          <div class="flex flex-col">
            <h4 class="font-bold text-secondary-container text-sm sm:text-base uppercase tracking-wider mb-4 font-headline-md">
              Produk Panen
            </h4>
            <ul class="flex flex-col space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li>
                <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                  <span>Telur Ayam &amp; Bebek Segar</span>
                </a>
              </li>
              <li>
                <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                  <span>Daging Ayam Kampung Segar</span>
                </a>
              </li>
              <li>
                <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                  <span>Domba &amp; Kambing Sehat</span>
                </a>
              </li>
              <li>
                <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                  <span>Ikan Air Tawar Segar</span>
                </a>
              </li>
              <li>
                <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                  <span>Pupuk Kasgot Organik BSF</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Kolom 2: Navigasi Cepat -->
        <div class="lg:col-span-2 flex flex-col">
          <h4 class="font-bold text-secondary-container text-sm sm:text-base uppercase tracking-wider mb-4 font-headline-md">
            Navigasi Cepat
          </h4>
          <ul class="flex flex-col space-y-2.5 text-xs sm:text-sm text-slate-200">
            <li>
              <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors">
                Katalog Produk
              </a>
            </li>
            <li>
              <a href="#tentang-kami" class="hover:text-white hover:underline transition-colors">
                Tentang Banong Farms
              </a>
            </li>
            <li>
              <a href="#visi-misi" class="hover:text-white hover:underline transition-colors">
                Visi &amp; Misi Peternakan
              </a>
            </li>
            <li>
              <a 
                href="https://maps.app.goo.gl/AXAGnr9V4D15MyUz9" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="hover:text-white hover:underline transition-colors"
              >
                Lokasi Peternakan
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/628999192861" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="hover:text-white hover:underline transition-colors"
              >
                Layanan WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <!-- Kolom 3: Kontak & Jam Operasional -->
        <div class="lg:col-span-3 flex flex-col">
          <h4 class="font-bold text-secondary-container text-sm sm:text-base uppercase tracking-wider mb-4 font-headline-md">
            Informasi Kontak
          </h4>
          <div class="flex flex-col space-y-3.5 text-xs sm:text-sm text-slate-200">
            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">call</span>
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">WhatsApp Layanan</div>
                <a href="https://wa.me/628999192861" target="_blank" rel="noopener noreferrer" class="hover:underline text-white font-medium">
                  +62 899-9192-861
                </a>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">mail</span>
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Surat Elektronik</div>
                <a href="mailto:halo@banongfarms.id" class="hover:underline text-white font-medium">
                  halo@banongfarms.id
                </a>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">schedule</span>
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Jam Operasional Peternakan</div>
                <div class="text-slate-200">07.00 - 17.00 WIB (Setiap Hari)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom 4: PETA INTERAKTIF (Bisa Digeser / Zoom) & Ikon Medsos Lebih Besar -->
        <div class="lg:col-span-3 flex flex-col items-start lg:items-end">
          
          <!-- Peta Google Maps Interaktif (Live Iframe yang Bisa Digeser-geser Langsung di Web) -->
          <div class="relative w-full max-w-sm rounded-2xl overflow-hidden bg-[#0a1829] shadow-xl border border-white/20 flex flex-col">
            <!-- Iframe Google Maps Asli Banong Farms -->
            <div class="w-full h-40 relative bg-[#061527]">
              <iframe
                title="Peta Interaktif CV Banong Farms Ajibarang"
                class="w-full h-full border-0"
                src="https://maps.google.com/maps?q=-7.4065147,109.0743739+(Banong+Farms)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Card Bottom Strip dengan Tombol Buka di Maps -->
            <div class="p-3 bg-[#0c1e34] flex items-center justify-between gap-2 border-t border-white/10">
              <span class="text-xs text-slate-200 font-semibold truncate flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Banong Farms Ajibarang</span>
              </span>
              <a 
                href="https://maps.app.goo.gl/AXAGnr9V4D15MyUz9" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1 py-1.5 px-3.5 rounded-lg bg-secondary-container hover:bg-accent-hover text-primary text-xs font-bold transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
              >
                <span>Buka di Google Maps</span>
                <span class="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
          </div>

          <!-- Ikon Medsos Lebih Besar Sesuai Permintaan User -->
          <div class="flex items-center gap-3 pt-3.5">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1 shadow-md cursor-pointer"
            >
              <span class="material-symbols-outlined text-[22px] sm:text-[24px]">photo_camera</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1 shadow-md cursor-pointer"
            >
              <span class="material-symbols-outlined text-[22px] sm:text-[24px]">public</span>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1 shadow-md cursor-pointer"
            >
              <span class="material-symbols-outlined text-[22px] sm:text-[24px]">play_circle</span>
            </a>
          </div>

        </div>

      </div>

      <!-- Bagian Bawah: WOBLO-STYLE MODULAR BLOCK TYPOGRAPHY -->
      <div class="py-8 sm:py-12 lg:py-14 w-full select-none">
        
        <!-- Showcase Canvas (Frame Elegan Mirip Referensi Desain Woblo) -->
        <div class="w-full rounded-3xl bg-slate-900/75 dark:bg-slate-950/80 border border-white/15 p-5 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center">
          
          <!-- Ambient Glow Halus di Belakang Huruf -->
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <!-- Top Header Strip Showcase (Mirip Header Minimalis di Atas Logo Woblo pada Gambar) -->
          <div class="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/10 text-xs text-slate-300 relative z-10">
            
            <!-- Left: Identitas Brand & Status Operasional -->
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00e676] animate-pulse"></span>
              <span class="font-bold tracking-wide text-white font-outfit uppercase text-[11px] sm:text-xs">
                CV BANONG FARMS • AGRIBISNIS BERKELANJUTAN
              </span>
            </div>

            <!-- Right: Interactive Style Controls (Beralih Huruf Kecil/Kapital & FARM/FARMS) -->
            <div class="flex items-center gap-2 sm:gap-3">
              <button 
                type="button"
                @click="isUppercase = !isUppercase"
                class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all backdrop-blur-md border border-white/15 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
                title="Klik untuk beralih antara huruf kecil (gaya 100% seperti gambar) atau huruf kapital"
              >
                <span class="material-symbols-outlined text-[15px]">text_fields</span>
                <span>{{ isUppercase ? 'Gaya: Huruf Kapital' : 'Gaya: Huruf Kecil (Seperti Gambar)' }}</span>
              </button>

              <button 
                type="button"
                @click="includeS = !includeS"
                class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all backdrop-blur-md border border-white/15 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
                title="Beralih antara CV Banong Farm atau CV Banong Farms"
              >
                <span class="material-symbols-outlined text-[15px]">tune</span>
                <span>{{ includeS ? 'Teks: FARMS' : 'Teks: FARM' }}</span>
              </button>
            </div>

          </div>

          <!-- THE GIANT COLORFUL CONTIGUOUS BLOCK LETTERS (WOBLO STYLE) -->
          <div 
            @click="isUppercase = !isUppercase"
            class="flex items-end justify-center flex-wrap gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 cursor-pointer group relative z-10 py-2"
            title="Klik pada huruf untuk beralih antara gaya huruf kecil (seperti gambar) atau kapital"
          >
            <!-- Cluster 1: CV -->
            <div class="flex items-end shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
              <div 
                v-for="(item, idx) in cvLetters" 
                :key="'cv-' + idx"
                :class="[
                  item.bg,
                  item.text,
                  item.rounded,
                  item.isTall 
                    ? 'h-16 sm:h-24 md:h-36 lg:h-44 xl:h-52 2xl:h-56' 
                    : 'h-13 sm:h-18 md:h-28 lg:h-36 xl:h-40 2xl:h-44',
                  item.hoverShadow,
                  'w-8 sm:w-12 md:w-18 lg:w-22 xl:w-26 2xl:w-28 flex items-center justify-center font-black font-outfit leading-none text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] select-none'
                ]"
              >
                <span>{{ isUppercase ? item.upper : item.lower }}</span>
              </div>
            </div>

            <!-- Cluster 2: BANONG -->
            <div class="flex items-end shadow-2xl">
              <div 
                v-for="(item, idx) in banongLetters" 
                :key="'banong-' + idx"
                :class="[
                  item.bg,
                  item.text,
                  item.rounded,
                  item.isTall 
                    ? 'h-16 sm:h-24 md:h-36 lg:h-44 xl:h-52 2xl:h-56' 
                    : 'h-13 sm:h-18 md:h-28 lg:h-36 xl:h-40 2xl:h-44',
                  item.hoverShadow,
                  'w-8 sm:w-12 md:w-18 lg:w-22 xl:w-26 2xl:w-28 flex items-center justify-center font-black font-outfit leading-none text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] select-none'
                ]"
              >
                <span>{{ isUppercase ? item.upper : item.lower }}</span>
              </div>
            </div>

            <!-- Cluster 3: FARM (or FARMS) -->
            <div class="flex items-end shadow-2xl">
              <div 
                v-for="(item, idx) in farmLetters" 
                :key="'farm-' + idx"
                :class="[
                  item.bg,
                  item.text,
                  item.rounded,
                  item.isTall 
                    ? 'h-16 sm:h-24 md:h-36 lg:h-44 xl:h-52 2xl:h-56' 
                    : 'h-13 sm:h-18 md:h-28 lg:h-36 xl:h-40 2xl:h-44',
                  item.hoverShadow,
                  'w-8 sm:w-12 md:w-18 lg:w-22 xl:w-26 2xl:w-28 flex items-center justify-center font-black font-outfit leading-none text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] select-none'
                ]"
              >
                <span>{{ isUppercase ? item.upper : item.lower }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Caption Tip (Bantuan Interaksi) -->
          <div class="pt-6 sm:pt-8 mt-4 sm:mt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 relative z-10">
            <span class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[14px] text-secondary-container">touch_app</span>
              <span>Tip: Klik blok huruf untuk beralih antara gaya huruf kecil (seperti referensi gambar) dan huruf kapital.</span>
            </span>
            <span class="text-slate-400 font-medium">Ajibarang, Banyumas, Jawa Tengah</span>
          </div>

        </div>

      </div>

      <!-- Baris Paling Bawah: Hak Cipta & Kebijakan Bersih -->
      <div class="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div>
          © 2026 CV Banong Farms. Hak Cipta Dilindungi Undang-Undang.
        </div>
        <div class="flex flex-wrap items-center gap-5 sm:gap-6 text-slate-300 text-xs">
          <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" class="hover:text-white transition-colors">Syarat &amp; Ketentuan Layanan</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const isUppercase = ref(false) // Default huruf kecil seperti gambar referensi Woblo
const includeS = ref(false) // Default 'farm' sesuai permintaan user ("CV BANONG FARM")

const cvLetters = computed(() => [
  { 
    lower: 'c', upper: 'C', 
    bg: 'bg-[#18181b]', 
    text: 'text-white', 
    isTall: false, 
    rounded: 'rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(24,24,27,0.5)]'
  },
  { 
    lower: 'v', upper: 'V', 
    bg: 'bg-[#ff6600]', 
    text: 'text-[#0f172a]', 
    isTall: false, 
    rounded: 'rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(255,102,0,0.5)]'
  }
])

const banongLetters = computed(() => [
  { 
    lower: 'b', upper: 'B', 
    bg: 'bg-[#00e676]', 
    text: 'text-[#0f172a]', 
    isTall: true, 
    rounded: 'rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(0,230,118,0.5)]'
  },
  { 
    lower: 'a', upper: 'A', 
    bg: 'bg-[#ff1361]', 
    text: 'text-[#0f172a]', 
    isTall: false, 
    rounded: '',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(255,19,97,0.5)]'
  },
  { 
    lower: 'n', upper: 'N', 
    bg: 'bg-[#7c3aed]', 
    text: 'text-white', 
    isTall: false, 
    rounded: '',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(124,58,237,0.5)]'
  },
  { 
    lower: 'o', upper: 'O', 
    bg: 'bg-[#ff6600]', 
    text: 'text-[#0f172a]', 
    isTall: false, 
    rounded: '',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(255,102,0,0.5)]'
  },
  { 
    lower: 'n', upper: 'N', 
    bg: 'bg-[#00e676]', 
    text: 'text-[#0f172a]', 
    isTall: false, 
    rounded: '',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(0,230,118,0.5)]'
  },
  { 
    lower: 'g', upper: 'G', 
    bg: 'bg-[#ff1361]', 
    text: 'text-[#0f172a]', 
    isTall: false, 
    rounded: 'rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl',
    hoverShadow: 'hover:shadow-[0_12px_24px_rgba(255,19,97,0.5)]'
  }
])

const farmLetters = computed(() => {
  const base = [
    { 
      lower: 'f', upper: 'F', 
      bg: 'bg-[#00e676]', 
      text: 'text-[#0f172a]', 
      isTall: true, 
      rounded: 'rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl',
      hoverShadow: 'hover:shadow-[0_12px_24px_rgba(0,230,118,0.5)]'
    },
    { 
      lower: 'a', upper: 'A', 
      bg: 'bg-[#ff6600]', 
      text: 'text-[#0f172a]', 
      isTall: false, 
      rounded: '',
      hoverShadow: 'hover:shadow-[0_12px_24px_rgba(255,102,0,0.5)]'
    },
    { 
      lower: 'r', upper: 'R', 
      bg: 'bg-[#ff1361]', 
      text: 'text-[#0f172a]', 
      isTall: false, 
      rounded: '',
      hoverShadow: 'hover:shadow-[0_12px_24px_rgba(255,19,97,0.5)]'
    },
    { 
      lower: 'm', upper: 'M', 
      bg: 'bg-[#7c3aed]', 
      text: 'text-white', 
      isTall: false, 
      rounded: includeS.value ? '' : 'rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl',
      hoverShadow: 'hover:shadow-[0_12px_24px_rgba(124,58,237,0.5)]'
    }
  ]
  if (includeS.value) {
    base.push({ 
      lower: 's', upper: 'S', 
      bg: 'bg-[#fcd400]', 
      text: 'text-[#0f172a]', 
      isTall: false, 
      rounded: 'rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl',
      hoverShadow: 'hover:shadow-[0_12px_24px_rgba(252,212,0,0.5)]'
    })
  }
  return base
})
</script>
