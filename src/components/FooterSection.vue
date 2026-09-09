<template>
  <footer class="w-full bg-primary-container dark:bg-[#060D1D] text-surface-pure pt-space-64 pb-space-32 border-t border-transparent dark:border-slate-800/80 transition-colors duration-300" id="kontak">
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
      
      <!-- 4 Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-40 pb-space-48 border-b border-surface-pure/10 animate-fade-in">
        
        <!-- Col 1: Logo, Tagline, Socials -->
        <div class="flex flex-col space-y-space-16">
          <div class="flex items-center gap-space-12">
            <img 
              alt="CV Banong Farms" 
              class="h-11 w-auto object-contain drop-shadow" 
              src="/assets/logo.png" 
            />
            <span class="font-headline-md text-headline-md text-surface-pure font-bold tracking-tight">
              CV Banong Farms
            </span>
          </div>

          <p class="font-body-md text-body-md text-primary-fixed leading-relaxed">
            Agribisnis berkelanjutan berkualitas tinggi dari Ajibarang, Banyumas. Menghadirkan gizi segar, alami, dan terpercaya bagi masyarakat luas.
          </p>

          <div class="flex items-center gap-space-12 pt-space-8">
            <a 
              href="https://instagram.com" 
              target="_blank"
              aria-label="Instagram" 
              class="w-9 h-9 rounded-full bg-surface-pure/10 hover:bg-secondary-container hover:text-on-secondary-container transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-[20px]">photo_camera</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank"
              aria-label="Facebook" 
              class="w-9 h-9 rounded-full bg-surface-pure/10 hover:bg-secondary-container hover:text-on-secondary-container transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank"
              aria-label="YouTube" 
              class="w-9 h-9 rounded-full bg-surface-pure/10 hover:bg-secondary-container hover:text-on-secondary-container transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-[20px]">play_circle</span>
            </a>
          </div>
        </div>

        <!-- Col 2: Navigasi Cepat -->
        <div class="flex flex-col">
          <h4 class="font-headline-md text-headline-md font-semibold text-secondary-container mb-space-16">
            Navigasi Cepat
          </h4>
          <ul class="flex flex-col space-y-space-12 font-body-md text-body-md text-primary-fixed">
            <li>
              <a href="#katalog-produk" class="hover:text-surface-pure transition-colors flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Katalog Produk</span>
              </a>
            </li>
            <li>
              <a href="#lokasi-farm" class="hover:text-surface-pure transition-colors flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Lokasi Farm</span>
              </a>
            </li>
            <li>
              <a href="#tentang-kami" class="hover:text-surface-pure transition-colors flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Sertifikasi Organik</span>
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/628999192861" 
                target="_blank" 
                rel="noopener noreferrer"
                class="hover:text-surface-pure transition-colors flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[16px] text-secondary-container">chevron_right</span>
                <span>Hubungi Tim</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Informasi Kontak -->
        <div class="flex flex-col">
          <h4 class="font-headline-md text-headline-md font-semibold text-secondary-container mb-space-16">
            Informasi Kontak
          </h4>
          <div class="flex flex-col space-y-space-16 font-body-md text-body-md text-primary-fixed">
            <div class="flex items-start gap-space-12">
              <span class="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">call</span>
              <div>
                <div class="font-semibold text-surface-pure">WhatsApp Hotline</div>
                <a href="https://wa.me/628999192861" target="_blank" class="hover:underline text-secondary-fixed">
                  +62 899-9192-861
                </a>
              </div>
            </div>

            <div class="flex items-start gap-space-12">
              <span class="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">mail</span>
              <div>
                <div class="font-semibold text-surface-pure">Email Resmi</div>
                <a href="mailto:halo@banongfarms.id" class="hover:underline text-secondary-fixed">
                  halo@banongfarms.id
                </a>
              </div>
            </div>

            <div class="flex items-start gap-space-12">
              <span class="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">schedule</span>
              <div>
                <div class="font-semibold text-surface-pure">Jam Operasional Farm</div>
                <div>07.00 - 17.00 WIB (Setiap Hari)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 4: Google Maps Interactive Preview Mockup -->
        <div class="flex flex-col" id="lokasi-farm">
          <h4 class="font-headline-md text-headline-md font-semibold text-secondary-container mb-space-16">
            Lokasi Peternakan
          </h4>
          <div class="relative w-full rounded-xl overflow-hidden bg-navy-dark shadow-md flex flex-col border border-surface-pure/15">
            <!-- Location Map Container -->
            <div 
              class="w-full h-36 bg-cover bg-center relative" 
              style="background-image: url('/assets/hero-bg.png');"
            >
              <div class="absolute inset-0 bg-primary-container/60 backdrop-blur-[1px]"></div>
              
              <!-- STATIC Pin Marker (NO UP AND DOWN ANIMATION) -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex flex-col items-center">
                  <span class="material-symbols-outlined text-alert-badge text-[36px] drop-shadow-md">location_on</span>
                  <span class="px-2 py-0.5 rounded bg-surface-pure text-primary font-label-sm text-label-sm font-bold shadow-md -mt-1">
                    CV Banong Farms
                  </span>
                </div>
              </div>
            </div>

            <!-- Location Details & Action Footer -->
            <div class="p-space-12 bg-navy-dark flex flex-col gap-2">
              <div class="font-label-sm text-label-sm text-primary-fixed">
                Ajibarang, Banyumas, Jawa Tengah
              </div>
              <a 
                href="https://maps.google.com/?q=Ajibarang+Banyumas+Jawa+Tengah" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-secondary-container hover:bg-accent-hover text-primary font-label-sm text-label-sm font-bold transition-all shadow-xs"
              >
                <span>Buka di Maps</span>
                <span class="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Copyright Bar -->
      <div class="pt-space-24 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-primary-fixed">
        <div>
          © 2025 CV Banong Farms Ajibarang. Hak Cipta Dilindungi.
        </div>
        <div class="flex items-center gap-space-24">
          <a href="#" class="hover:text-surface-pure transition-colors">Kebijakan Privasi</a>
          <a href="#" class="hover:text-surface-pure transition-colors">Syarat &amp; Ketentuan</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
</script>
