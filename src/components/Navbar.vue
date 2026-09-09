<template>
  <header 
    class="fixed top-0 w-full z-50 backdrop-blur-xl transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform"
    :class="[
      isNavbarHidden ? '-translate-y-full pointer-events-none' : 'translate-y-0 pointer-events-auto',
      isWhiteNav 
        ? 'bg-white/95 border-b border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.06)]' 
        : 'bg-[#022448]/95 dark:bg-[#060D1E]/95 border-b border-white/10 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(2,36,72,0.22)]'
    ]"
  >
    <div class="h-20 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-16">
      
      <!-- Brand Logo & Title -->
      <a href="#" class="flex items-center gap-space-12 group">
        <img 
          alt="CV Banong Farms Logo" 
          class="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105" 
          src="/assets/logo.png" 
        />
        <div class="flex flex-col">
          <span 
            class="font-headline-md text-headline-md leading-tight tracking-tight font-bold transition-colors duration-300"
            :class="isWhiteNav ? 'text-primary' : 'text-white'"
          >
            CV Banong Farms
          </span>
          <span 
            class="font-label-sm text-label-sm transition-colors duration-300"
            :class="isWhiteNav ? 'text-on-surface-variant' : 'text-slate-300'"
          >
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
          class="font-label-lg text-label-lg transition-all duration-300 pb-0.5"
          :class="[
            activeNav === item.id 
              ? (isWhiteNav 
                  ? 'text-primary font-bold border-b-2 border-primary' 
                  : 'text-secondary-container font-semibold border-b-2 border-secondary-container')
              : (isWhiteNav 
                  ? 'text-on-surface-variant hover:text-primary font-medium' 
                  : 'text-slate-200 hover:text-secondary-container font-medium')
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
          class="w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center shadow-xs active:scale-95"
          :class="isWhiteNav 
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80' 
            : 'bg-white/10 text-secondary-container hover:bg-white/20 border border-white/15'"
        >
          <span class="material-symbols-outlined text-[20px] transition-transform duration-300" :class="{ 'rotate-180': isDark }">
            {{ isDark ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        <a 
          href="https://wa.me/6281234567890?text=Halo%20CV%20Banong%20Farms,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20layanan" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-space-20 py-space-8 rounded-full bg-secondary-container text-primary hover:bg-accent-hover active:scale-95 transition-all font-label-md text-label-md font-bold shadow-md"
        >
          Hubungi Kami
        </a>
      </div>

      <!-- Mobile Right Controls (Toggle + Hamburger) -->
      <div class="md:hidden flex items-center gap-2">
        <button
          @click="toggleTheme"
          :aria-label="isDark ? 'Mode Terang' : 'Mode Gelap'"
          class="p-2 rounded-lg transition-colors"
          :class="isWhiteNav 
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80' 
            : 'bg-white/10 text-secondary-container hover:bg-white/20 border border-white/15'"
        >
          <span class="material-symbols-outlined text-[20px]">
            {{ isDark ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 rounded-lg transition-colors"
          :class="isWhiteNav 
            ? 'text-primary hover:bg-slate-100' 
            : 'text-white hover:bg-white/10'"
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
        class="md:hidden backdrop-blur-2xl border-b px-gutter-mobile py-space-20 shadow-2xl transition-colors duration-300"
        :class="isWhiteNav 
          ? 'bg-white/98 border-slate-200/80' 
          : 'bg-[#022448]/98 dark:bg-[#060D1E]/98 border-white/10 dark:border-slate-800'"
      >
        <div class="flex flex-col gap-y-4">
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="item.href"
            @click="activeNav = item.id; isMobileMenuOpen = false"
            class="py-2.5 px-3 rounded-lg font-label-lg transition-colors"
            :class="[
              activeNav === item.id 
                ? (isWhiteNav 
                    ? 'bg-slate-100 text-primary font-bold border-l-4 border-primary' 
                    : 'bg-white/15 text-secondary-container font-bold border-l-4 border-secondary-container')
                : (isWhiteNav 
                    ? 'text-slate-700 hover:bg-slate-50' 
                    : 'text-slate-200 hover:bg-white/10')
            ]"
          >
            {{ item.name }}
          </a>
          <div 
            class="pt-4 border-t flex flex-col gap-3"
            :class="isWhiteNav ? 'border-slate-200' : 'border-white/15 dark:border-slate-800'"
          >
            <a 
              href="https://wa.me/6281234567890?text=Halo%20CV%20Banong%20Farms" 
              target="_blank" 
              class="w-full text-center py-3 rounded-full bg-secondary-container text-primary font-bold shadow-md hover:bg-accent-hover"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineEmits(['openAdmin'])

const activeNav = ref('katalog')
const isMobileMenuOpen = ref(false)
const isDark = ref(false)
const isNavbarHidden = ref(false)
const isHeroSection = ref(true)

const isWhiteNav = computed(() => isHeroSection.value && !isDark.value)

let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      const heroThreshold = window.innerHeight - 120

      // Cek apakah posisi scroll masih berada di dalam Hero Section
      isHeroSection.value = currentScrollY < heroThreshold

      // Selalu munculkan navbar jika berada di puncak halaman (<= 60px)
      if (currentScrollY <= 60) {
        isNavbarHidden.value = false
        lastScrollY = currentScrollY
        ticking = false
        return
      }

      // Jangan sembunyikan jika menu mobile drawer sedang dibuka
      if (isMobileMenuOpen.value) {
        isNavbarHidden.value = false
        lastScrollY = currentScrollY
        ticking = false
        return
      }

      const delta = currentScrollY - lastScrollY

      // Scroll ke BAWAH: sembunyikan navbar dengan tenang saat scroll turun (> 100px & pergerakan jelas > 8px)
      if (delta > 8 && currentScrollY > 100) {
        isNavbarHidden.value = true
      } 
      // Scroll ke ATAS sedikit saja (delta < -3px): munculkan navbar dengan sangat halus dan elegan
      else if (delta < -3) {
        isNavbarHidden.value = false
      }

      lastScrollY = currentScrollY
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  lastScrollY = window.scrollY
  isHeroSection.value = window.scrollY < (window.innerHeight - 120)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
