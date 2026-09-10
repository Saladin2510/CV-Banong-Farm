<template>
  <footer class="w-full bg-[#132A4A] dark:bg-[#071326] text-white pt-20 sm:pt-28 lg:pt-36 pb-6 sm:pb-8 border-t border-transparent dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden lg:min-h-screen flex flex-col justify-between" id="kontak">
    <!-- Kontainer Lebar Maksimal Layar (100vh Desktop dengan Distribusi Vertikal Sempurna) -->
    <div class="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
      
      <!-- Bagian Atas: 4 Kolom Navigasi & Image Hook Card -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-8 sm:pb-10 border-b border-white/10 animate-fade-in">
        
        <!-- Kolom 1: Produk Panen -->
        <div class="lg:col-span-3 flex flex-col">
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
                <span>Karkas Ayam Kampung Organik</span>
              </a>
            </li>
            <li>
              <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                <span>Domba Bakalan &amp; Aqiqah</span>
              </a>
            </li>
            <li>
              <a href="#katalog-produk" class="hover:text-white hover:underline transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0"></span>
                <span>Perikanan Air Deras Nila</span>
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
                Visi &amp; Misi Farm
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
                Hubungi Tim Admin
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
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">WhatsApp Hotline</div>
                <a href="https://wa.me/628999192861" target="_blank" rel="noopener noreferrer" class="hover:underline text-white font-medium">
                  +62 899-9192-861
                </a>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">mail</span>
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Email Resmi</div>
                <a href="mailto:halo@banongfarms.id" class="hover:underline text-white font-medium">
                  halo@banongfarms.id
                </a>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">schedule</span>
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Jam Operasional Farm</div>
                <div class="text-slate-200">07.00 - 17.00 WIB (Setiap Hari)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom 4: IMAGE HOOK CARD (Foto Peternakan & Link Google Maps Resmi) -->
        <div class="lg:col-span-4 flex flex-col items-start lg:items-end">
          
          <!-- Image Hook Card: Foto Peternakan Ajibarang dengan Pin & Link Maps Resmi -->
          <div class="relative w-full max-w-sm rounded-2xl overflow-hidden bg-[#0a1829] shadow-xl border border-white/20 flex flex-col group">
            <!-- Background Image Hook -->
            <div 
              class="w-full h-36 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105" 
              style="background-image: url('/assets/hero-bg.png');"
            >
              <div class="absolute inset-0 bg-[#022448]/50 backdrop-blur-[0.5px]"></div>
              
              <!-- Static Pin Marker -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex flex-col items-center">
                  <span class="material-symbols-outlined text-[#ef4444] text-[34px] drop-shadow-md">location_on</span>
                  <span class="px-2 py-0.5 rounded bg-white text-[#022448] text-[11px] font-bold shadow-md -mt-1">
                    CV Banong Farms
                  </span>
                </div>
              </div>

              <!-- Badge Hook -->
              <div class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#022448]/80 backdrop-blur-md border border-white/20 text-[10px] text-white font-semibold">
                📍 Ajibarang, Banyumas
              </div>
            </div>

            <!-- Card Bottom Strip dengan Link Google Maps Resmi -->
            <div class="p-3 bg-[#0c1e34] flex items-center justify-between gap-2">
              <span class="text-xs text-slate-300 font-medium truncate">
                Kawasan Peternakan Alami
              </span>
              <a 
                href="https://maps.app.goo.gl/AXAGnr9V4D15MyUz9" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1 py-1.5 px-3.5 rounded-lg bg-secondary-container hover:bg-accent-hover text-primary text-xs font-bold transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
              >
                <span>Buka di Maps</span>
                <span class="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
          </div>

          <!-- Social Icons Row -->
          <div class="flex items-center gap-3 pt-3">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white flex items-center justify-center transition-all shadow-xs"
            >
              <span class="material-symbols-outlined text-[17px]">photo_camera</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white flex items-center justify-center transition-all shadow-xs"
            >
              <span class="material-symbols-outlined text-[17px]">public</span>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white flex items-center justify-center transition-all shadow-xs"
            >
              <span class="material-symbols-outlined text-[17px]">play_circle</span>
            </a>
          </div>

        </div>

      </div>

      <!-- Bagian Bawah: JUDUL BESAR RAKSASA (1 BARIS UTUH DENGAN EFEK 3D OPTIMIZELY) -->
      <div class="py-8 sm:py-10 lg:py-14 flex items-center justify-center w-full overflow-hidden select-none">
        <h2 
          class="font-black text-center tracking-tighter text-secondary-container text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[98px] 2xl:text-[120px] leading-none uppercase whitespace-nowrap transition-transform duration-300 hover:scale-[1.01]"
          style="text-shadow: 2px 2px 0 #051426, 4px 4px 0 #051426, 6px 6px 0 #051426, 8px 8px 0 #051426, 11px 11px 0 #051426;"
        >
          CV BANONG FARMS
        </h2>
      </div>

      <!-- Baris Paling Bawah: Search Pill, Location Tag & Legal Info -->
      <div class="pt-5 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        
        <!-- Sisi Kiri: Tombol Search & Tag Wilayah -->
        <div class="flex items-center gap-2.5">
          <a 
            href="#katalog-produk" 
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-secondary-container hover:text-primary text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <span class="material-symbols-outlined text-[15px]">search</span>
            <span>Cari Produk</span>
          </a>
          <div class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
            <span>Ajibarang, ID 🇮🇩</span>
          </div>
        </div>

        <!-- Sisi Kanan: Hak Cipta & Kebijakan -->
        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 text-[11px] sm:text-xs">
          <span>© 2026 CV Banong Farms. Seluruh Hak Cipta Dilindungi.</span>
          <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" class="hover:text-white transition-colors">Syarat &amp; Ketentuan</a>
        </div>

      </div>

    </div>
  </footer>
</template>

<script setup>
</script>
