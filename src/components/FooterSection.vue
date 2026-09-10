<template>
  <footer class="w-full bg-[#132A4A] dark:bg-[#071326] text-white pt-10 sm:pt-12 pb-6 sm:pb-8 border-t border-transparent dark:border-slate-800/80 transition-colors duration-300" id="kontak">
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
      
      <!-- 4 Columns Grid (Tata Letak Asli: Logo & Text Sama Besar, 1 Baris Saja Tanpa Wrap) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-6 sm:pb-8 border-b border-white/10 animate-fade-in">
        
        <!-- Col 1: Logo & Nama Website Sama Besar (1 Baris Saja), Deskripsi, dan Sosial Media -->
        <div class="lg:col-span-5 flex flex-col space-y-3 sm:space-y-4">
          <!-- Logo & Tulisan Nama Website: Sama Besar & 1 Baris Saja Sesuai Arahan User -->
          <div class="flex items-center gap-2.5 sm:gap-3">
            <img 
              alt="CV Banong Farms" 
              class="h-8 sm:h-9 md:h-10 lg:h-[30px] xl:h-[34px] w-auto object-contain drop-shadow shrink-0" 
              src="/assets/logo.png" 
            />
            <span class="text-xl sm:text-2xl md:text-3xl lg:text-[28px] xl:text-[34px] font-black text-white tracking-tight whitespace-nowrap leading-none font-sans select-none">
              CV Banong Farms
            </span>
          </div>

          <p class="text-xs sm:text-sm text-slate-200 dark:text-slate-300 leading-relaxed pr-2 sm:pr-4">
            Agribisnis berkelanjutan berkualitas tinggi dari Ajibarang, Banyumas. Menghadirkan gizi segar, alami, dan terpercaya bagi masyarakat luas.
          </p>

          <!-- Ikon Sosial Media Bulat Sesuai Desain Asli -->
          <div class="flex items-center gap-3 pt-1">
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram" 
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center shadow-xs"
            >
              <span class="material-symbols-outlined text-[18px]">photo_camera</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook" 
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center shadow-xs"
            >
              <span class="material-symbols-outlined text-[18px]">public</span>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube" 
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary-container hover:text-primary text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center shadow-xs"
            >
              <span class="material-symbols-outlined text-[18px]">play_circle</span>
            </a>
          </div>
        </div>

        <!-- Col 2: Navigasi Cepat -->
        <div class="lg:col-span-2 flex flex-col">
          <h4 class="font-semibold text-secondary-container text-base sm:text-lg mb-3 sm:mb-4">
            Navigasi Cepat
          </h4>
          <ul class="flex flex-col space-y-2.5 text-xs sm:text-sm text-slate-200">
            <li>
              <a href="#katalog-produk" class="hover:text-white transition-colors flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Katalog Produk</span>
              </a>
            </li>
            <li>
              <a href="#lokasi-farm" class="hover:text-white transition-colors flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Lokasi Farm</span>
              </a>
            </li>
            <li>
              <a href="#tentang-kami" class="hover:text-white transition-colors flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Sertifikasi Organik</span>
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/628999192861" 
                target="_blank" 
                rel="noopener noreferrer"
                class="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Hubungi Tim</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Informasi Kontak -->
        <div class="lg:col-span-2 flex flex-col">
          <h4 class="font-semibold text-secondary-container text-base sm:text-lg mb-3 sm:mb-4">
            Informasi Kontak
          </h4>
          <div class="flex flex-col space-y-3 text-xs sm:text-sm text-slate-200">
            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">call</span>
              <div>
                <div class="font-medium text-white text-xs">WhatsApp Hotline</div>
                <a href="https://wa.me/628999192861" target="_blank" rel="noopener noreferrer" class="hover:underline text-slate-200 hover:text-white font-medium">
                  +62 899-9192-861
                </a>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">mail</span>
              <div>
                <div class="font-medium text-white text-xs">Email Resmi</div>
                <a href="mailto:halo@banongfarms.id" class="hover:underline text-slate-200 hover:text-white">
                  halo@banongfarms.id
                </a>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-secondary-container text-[18px] mt-0.5">schedule</span>
              <div>
                <div class="font-medium text-white text-xs">Jam Operasional Farm</div>
                <div class="text-slate-300">07.00 - 17.00 WIB (Setiap Hari)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 4: Lokasi Peternakan (Mockup Peta & Tombol Buka di Maps) -->
        <div class="lg:col-span-3 flex flex-col" id="lokasi-farm">
          <h4 class="font-semibold text-secondary-container text-base sm:text-lg mb-3 sm:mb-4">
            Lokasi Peternakan
          </h4>
          <div class="relative w-full rounded-xl overflow-hidden bg-[#0a1829] shadow-md flex flex-col border border-white/15">
            <!-- Map Background Image -->
            <div 
              class="w-full h-32 bg-cover bg-center relative" 
              style="background-image: url('/assets/hero-bg.png');"
            >
              <div class="absolute inset-0 bg-[#022448]/60 backdrop-blur-[1px]"></div>
              
              <!-- Static Pin Marker -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex flex-col items-center">
                  <span class="material-symbols-outlined text-[#ef4444] text-[32px] drop-shadow-md">location_on</span>
                  <span class="px-2 py-0.5 rounded bg-white text-[#022448] text-[11px] font-bold shadow-md -mt-1">
                    CV Banong Farms
                  </span>
                </div>
              </div>
            </div>

            <!-- Details & Action Button -->
            <div class="p-3 bg-[#0c1e34] flex flex-col gap-2">
              <div class="text-xs text-slate-300">
                Ajibarang, Banyumas, Jawa Tengah
              </div>
              <a 
                href="https://maps.google.com/?q=Ajibarang+Banyumas+Jawa+Tengah" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-secondary-container hover:bg-accent-hover text-primary text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Buka di Maps</span>
                <span class="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Baris Hak Cipta di Bawah (Kompak & Bersih) -->
      <div class="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
        <div>
          © 2026 CV Banong Farms Ajibarang. Hak Cipta Dilindungi.
        </div>
        <div class="flex items-center gap-5 text-slate-300">
          <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" class="hover:text-white transition-colors">Syarat &amp; Ketentuan</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
</script>
