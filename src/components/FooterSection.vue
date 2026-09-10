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
                <span>Buka di Maps</span>
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

      <!-- Bagian Bawah: JUDUL BESAR RAKSASA (1 BARIS UTUH DIPERBESAR SEDIKIT LAGI) -->
      <div class="py-8 sm:py-10 lg:py-14 flex items-center justify-center w-full overflow-hidden select-none">
        <h2 
          class="font-black text-center tracking-tighter text-secondary-container text-4xl sm:text-5xl md:text-7xl lg:text-[86px] xl:text-[112px] 2xl:text-[136px] leading-none uppercase whitespace-nowrap transition-transform duration-300 hover:scale-[1.01]"
          style="text-shadow: 2px 2px 0 #051426, 4px 4px 0 #051426, 6px 6px 0 #051426, 8px 8px 0 #051426, 11px 11px 0 #051426;"
        >
          CV BANONG FARMS
        </h2>
      </div>

      <!-- Baris Paling Bawah: Hak Cipta & Kebijakan Bersih (Search & Ajibarang ID Dihapus) -->
      <div class="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div>
          © 2026 CV Banong Farms. Seluruh Hak Cipta Dilindungi.
        </div>
        <div class="flex flex-wrap items-center gap-5 sm:gap-6 text-slate-300 text-xs">
          <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" class="hover:text-white transition-colors">Syarat &amp; Ketentuan</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
</script>
