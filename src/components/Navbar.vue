<template>
  <header class="fixed top-0 w-full z-50 bg-surface-pure/90 dark:bg-[#070D1E]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-colors duration-300">
    <div class="h-20 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-16">
      
      <!-- Brand Logo & Title -->
      <a href="#" class="flex items-center gap-space-12 group">
        <img 
          alt="CV Banong Farms Logo" 
          class="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105" 
          src="/assets/logo.png" 
        />
        <div class="flex flex-col">
          <span class="font-headline-md text-headline-md text-primary dark:text-white leading-tight tracking-tight font-bold transition-colors">
            CV Banong Farms
          </span>
          <span class="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">
            Ajibarang, Jawa Tengah
          </span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center gap-space-32">
        <a 
          v-for="item in navItems" 
          :key="item.id"
          :href="item.href"
          @click="activeNav = item.id"
          :class="[
            'font-label-lg text-label-lg transition-all duration-200',
            activeNav === item.id 
              ? 'text-primary dark:text-secondary-container font-semibold border-b-2 border-primary dark:border-secondary-container pb-0.5' 
              : 'text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-secondary-container font-medium'
          ]"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Right Actions: Dark Mode Toggle + CTA + User Profile -->
      <div class="hidden md:flex items-center gap-space-16">
        <!-- Dark Mode Toggle Button -->
        <button
          @click="toggleTheme"
          :aria-label="isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'"
          :title="isDark ? 'Mode Terang' : 'Mode Gelap'"
          class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-secondary-container hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center shadow-xs active:scale-95 border border-slate-200 dark:border-slate-700"
        >
          <span class="material-symbols-outlined text-[20px] transition-transform duration-300" :class="{ 'rotate-180': isDark }">
            {{ isDark ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        <a 
          href="https://wa.me/6281234567890?text=Halo%20CV%20Banong%20Farms,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20layanan" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-space-20 py-space-8 rounded-full bg-secondary-container text-primary hover:bg-accent-hover active:scale-95 transition-all font-label-md text-label-md font-bold shadow-sm"
        >
          Hubungi Kami
        </a>
        <button 
          aria-label="Profil Pengguna" 
          class="w-8.5 h-8.5 rounded-full bg-primary dark:bg-slate-800 flex items-center justify-center text-on-primary hover:bg-navy-dark dark:hover:bg-slate-700 transition-all shadow-xs hover:scale-105 active:scale-95 border dark:border-slate-700"
        >
          <span class="material-symbols-outlined text-[18px]">person</span>
        </button>
      </div>

      <!-- Mobile Right Controls (Toggle + Hamburger) -->
      <div class="md:hidden flex items-center gap-2">
        <button
          @click="toggleTheme"
          :aria-label="isDark ? 'Mode Terang' : 'Mode Gelap'"
          class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-secondary-container hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <span class="material-symbols-outlined text-[20px]">
            {{ isDark ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 rounded-lg text-primary dark:text-white hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <span class="material-symbols-outlined text-[26px]">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-surface-pure/95 dark:bg-[#0A1128]/95 backdrop-blur-2xl border-b border-surface-container-high dark:border-slate-800 px-gutter-mobile py-space-20 shadow-xl"
      >
        <div class="flex flex-col gap-y-4">
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="item.href"
            @click="activeNav = item.id; isMobileMenuOpen = false"
            :class="[
              'py-2 px-3 rounded-lg font-label-lg transition-colors',
              activeNav === item.id 
                ? 'bg-primary-fixed/20 dark:bg-slate-800 text-primary dark:text-secondary-container font-bold' 
                : 'text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-800'
            ]"
          >
            {{ item.name }}
          </a>
          <div class="pt-4 border-t border-surface-container dark:border-slate-800 flex flex-col gap-3">
            <a 
              href="https://wa.me/6281234567890?text=Halo%20CV%20Banong%20Farms" 
              target="_blank"
              class="w-full text-center py-3 rounded-full bg-secondary-container text-primary font-bold shadow-sm"
            >
              Hubungi Kami via WA
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeNav = ref('katalog')
const isMobileMenuOpen = ref(false)
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const navItems = [
  { id: 'katalog', name: 'Katalog', href: '#katalog-produk' },
  { id: 'lokasi', name: 'Lokasi', href: '#lokasi-farm' },
  { id: 'tentang', name: 'Tentang', href: '#tentang-kami' },
  { id: 'kontak', name: 'Kontak', href: '#kontak' },
]
</script>
