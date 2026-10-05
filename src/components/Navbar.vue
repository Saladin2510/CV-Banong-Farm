<template>
  <!-- Mobile Backdrop Overlay when menu is open -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isMobileMenuOpen"
      @click="isMobileMenuOpen = false"
      class="fixed inset-0 z-40 bg-black/40 dark:bg-black/65 backdrop-blur-xs md:hidden"
    ></div>
  </transition>

  <header 
    class="fixed top-2.5 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform"
    :class="[
      isNavbarHidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
    ]"
  >
    <div class="max-w-7xl mx-auto w-full flex flex-col items-center">
      <!-- Floating Glassmorphism Capsule (STRICTLY FIXED HEIGHT & ALWAYS ROUNDED-FULL) -->
      <div 
        class="pointer-events-auto w-full h-14 sm:h-[68px] px-3.5 sm:px-6 rounded-full flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300"
        :class="[
          isHeroSection
            ? 'bg-white/30 dark:bg-[#022448]/45 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.14)] ring-1 ring-white/20'
            : 'bg-white/90 dark:bg-[#022448]/90 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_12px_36px_rgba(2,36,72,0.15)] ring-1 ring-black/5'
        ]"
      >
        <!-- Left: Brand Logo & Title -->
        <a href="#hero" @click="scrollToHero" class="flex items-center gap-2 sm:gap-3 group shrink-0 cursor-pointer">
          <div class="relative flex items-center justify-center">
            <img 
              alt="CV Banong Farms Logo" 
              class="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs" 
              src="/assets/logo.png" 
            />
          </div>
          <div class="flex flex-col">
            <span 
              class="font-bold text-[14px] sm:text-[17px] leading-tight tracking-tight text-primary dark:text-white transition-colors duration-300"
            >
              CV Banong Farms
            </span>
            <span 
              class="text-[10px] sm:text-xs font-medium text-primary/75 dark:text-slate-300 leading-tight transition-colors duration-300"
            >
              Poultry Shop · Ajibarang
            </span>
          </div>
        </a>

        <!-- Center: Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 lg:gap-2 mx-auto">
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="item.href"
            @click="handleNavClick(item.id, item.href, $event)"
            class="px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200"
            :class="[
              activeNav === item.id 
                ? 'bg-white/40 dark:bg-white/15 text-primary dark:text-secondary-container font-bold shadow-xs border border-white/40 dark:border-white/10' 
                : 'text-primary/85 dark:text-slate-200 hover:text-primary dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
            ]"
          >
            {{ item.name }}
          </a>
        </nav>

        <!-- Right: Desktop Actions (Cart + CTA + User Profile + Theme Toggle) -->
        <div class="hidden md:flex items-center gap-2 sm:gap-2.5 shrink-0">
          <!-- Shopping Cart Trigger Button -->
          <button
            @click="cartStore.openCart()"
            class="relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/25 hover:bg-white/45 dark:bg-white/10 dark:hover:bg-white/20 border border-white/40 dark:border-white/15 text-primary dark:text-white font-semibold text-xs sm:text-sm backdrop-blur-md shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            title="Buka Keranjang Belanja"
            type="button"
          >
            <span class="material-symbols-outlined text-[18px] sm:text-[19px]">shopping_cart</span>
            <span>Keranjang</span>
            <span 
              v-if="cartStore.totalItems.value > 0"
              class="ml-0.5 px-1.5 py-0.2 rounded-full bg-secondary-container text-primary text-[10px] font-telemetry-code font-black shadow-xs"
            >
              {{ cartStore.totalItems.value }}
            </span>
          </button>

          <!-- CTA Hubungi kami Button (Golden Yellow 10% Accent) -->
          <a 
            href="https://wa.me/628999192861?text=Halo%20CV%20Banong%20Farms,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20layanan" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-secondary-container text-primary hover:bg-accent-hover active:scale-95 transition-all text-xs sm:text-sm font-bold shadow-sm hover:shadow-md whitespace-nowrap"
          >
            Hubungi kami
          </a>

          <!-- Dark Mode Toggle Button -->
          <button
            @click="toggleTheme"
            :aria-label="isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'"
            :title="isDark ? 'Mode Terang' : 'Mode Gelap'"
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/35 dark:bg-white/10 dark:hover:bg-white/20 text-primary dark:text-secondary-container flex items-center justify-center border border-white/30 dark:border-white/15 transition-all active:scale-95 shadow-xs shrink-0 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px] sm:text-[20px] transition-transform duration-300" :class="{ 'rotate-180': isDark }">
              {{ isDark ? 'light_mode' : 'dark_mode' }}
            </span>
          </button>
        </div>

        <!-- Mobile Controls (< md) -->
        <div class="md:hidden flex items-center gap-1.5 shrink-0">
          <!-- Mobile Cart Button -->
          <button
            @click="cartStore.openCart()"
            class="relative p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 text-primary dark:text-white border border-white/30 transition-all active:scale-95 cursor-pointer shadow-xs"
            title="Keranjang"
            type="button"
          >
            <span class="material-symbols-outlined text-[19px]">shopping_cart</span>
            <span 
              v-if="cartStore.totalItems.value > 0"
              class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary-container text-primary text-[9px] font-black flex items-center justify-center font-telemetry-code shadow-xs"
            >
              {{ cartStore.totalItems.value }}
            </span>
          </button>

          <!-- Mobile Hamburger Toggle Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 text-primary dark:text-white border border-white/30 transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Toggle Navigation Menu"
            type="button"
          >
            <span class="material-symbols-outlined text-[20px] transition-transform duration-200" :class="{ 'rotate-90': isMobileMenuOpen }">
              {{ isMobileMenuOpen ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu (FLOATING CARD OUTSIDE CAPSULE - ZERO DISTORTION) -->
      <transition
        enter-active-class="transition duration-250 ease-out"
        enter-from-class="opacity-0 -translate-y-2.5 scale-[0.98]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2.5 scale-[0.98]"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden mt-2 w-full p-4 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-300 flex flex-col gap-2 pointer-events-auto"
          :class="isHeroSection 
            ? 'bg-white/95 dark:bg-[#022448]/95 border-white/40 dark:border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.25)]' 
            : 'bg-white/98 dark:bg-[#022448]/98 border-slate-200/80 dark:border-slate-800 shadow-[0_16px_40px_rgba(2,36,72,0.2)]'"
        >
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="item.href"
            @click="handleNavClick(item.id, item.href, $event)"
            class="py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between"
            :class="[
              activeNav === item.id 
                ? 'bg-primary/10 dark:bg-white/15 text-primary dark:text-secondary-container font-bold shadow-xs' 
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
            ]"
          >
            <span>{{ item.name }}</span>
            <span v-if="activeNav === item.id" class="w-1.5 h-1.5 rounded-full bg-secondary-container shadow-xs"></span>
          </a>

          <div class="pt-2.5 mt-1 border-t border-slate-200/70 dark:border-white/15 flex items-center justify-between gap-2.5">
            <a 
              href="https://wa.me/628999192861?text=Halo%20CV%20Banong%20Farms,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20layanan" 
              target="_blank" 
              class="flex-1 text-center py-2.5 px-3 rounded-full bg-secondary-container text-primary font-bold text-xs shadow-md hover:bg-accent-hover active:scale-95 transition-all truncate"
            >
              Hubungi Kami via WhatsApp
            </a>

            <button
              @click="toggleTheme"
              class="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-primary dark:text-secondary-container border border-slate-200 dark:border-white/15 flex items-center justify-center transition-all active:scale-95 shadow-xs shrink-0 cursor-pointer"
              :title="isDark ? 'Mode Terang' : 'Mode Gelap'"
              type="button"
            >
              <span class="material-symbols-outlined text-[18px]">
                {{ isDark ? 'light_mode' : 'dark_mode' }}
              </span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/useCartStore'

defineEmits(['openAdmin'])

const cartStore = useCartStore()

// State active nav: default KOSONG agar tidak ada background aktif saat berada di Hero Section
const activeNav = ref('')
const isMobileMenuOpen = ref(false)
const isDark = ref(false)
const isNavbarHidden = ref(false)
const isHeroSection = ref(true)

let lastScrollY = 0
let ticking = false
let isManualClick = false
let clickTimeout = null

const navItems = [
  { id: 'tentang', name: 'Tentang', href: '#tentang-kami' },
  { id: 'reputasi', name: 'Reputasi', href: '#reputasi' },
  { id: 'katalog', name: 'Katalog', href: '#katalog-produk' },
  { id: 'kontak', name: 'Kontak', href: '#kontak' },
]

// Kembali ke puncak Hero Section dan kosongkan pill aktif
const scrollToHero = (e) => {
  if (e) e.preventDefault()
  activeNav.value = ''
  isMobileMenuOpen.value = false
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1.2 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Handler klik tautan navigasi
const handleNavClick = (id, href, event) => {
  if (event) event.preventDefault()
  activeNav.value = id
  isMobileMenuOpen.value = false

  // Kunci scroll spy sesaat agar transisi scroll selesai
  isManualClick = true
  if (clickTimeout) clearTimeout(clickTimeout)
  clickTimeout = setTimeout(() => {
    isManualClick = false
  }, 1200)

  if (href && href.startsWith('#')) {
    const targetEl = document.querySelector(href)
    if (targetEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, { offset: -20, duration: 1.25 })
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}

// Scroll Spy: Deteksi posisi viewport secara dinamis
const updateActiveNavOnScroll = () => {
  const currentScrollY = window.__lenis ? window.__lenis.scroll : window.scrollY
  const heroThreshold = window.innerHeight - 150

  // 1. Jika posisi scroll berada di dalam Hero Section (puncak layar):
  // Hilangkan background/highlight pada semua menu navigasi!
  if (currentScrollY < heroThreshold) {
    isHeroSection.value = true
    activeNav.value = ''
    return
  }

  isHeroSection.value = false

  // Jika sedang dalam scroll animasi hasil klik menu, pertahankan target yang diklik
  if (isManualClick) return

  // 2. Cek apakah sudah berada di bagian paling bawah halaman (Kontak / Footer)
  const scrollPosition = window.innerHeight + currentScrollY
  const documentHeight = document.documentElement.scrollHeight
  if (scrollPosition >= documentHeight - 250) {
    activeNav.value = 'kontak'
    return
  }

  // 3. Deteksi section yang sedang aktif di viewport
  const navOffset = 220
  const sections = [
    { id: 'tentang', el: document.getElementById('tentang-kami') || document.getElementById('tentang') },
    { id: 'reputasi', el: document.getElementById('reputasi') || document.getElementById('kelayakan') },
    { id: 'katalog', el: document.getElementById('katalog-produk') || document.getElementById('katalog') },
    { id: 'kontak', el: document.getElementById('kontak') || document.getElementById('contact') }
  ]

  let matchedId = ''
  for (const sec of sections) {
    if (sec.el) {
      const rect = sec.el.getBoundingClientRect()
      if (rect.top <= navOffset && rect.bottom > navOffset) {
        matchedId = sec.id
        break
      }
    }
  }

  if (matchedId) {
    activeNav.value = matchedId
  }
}

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY

      // Periksa section aktif dan status hero section
      updateActiveNavOnScroll()

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

      // Scroll ke BAWAH: sembunyikan navbar saat scroll turun (> 100px & delta > 8px)
      if (delta > 8 && currentScrollY > 100) {
        isNavbarHidden.value = true
      } 
      // Scroll ke ATAS sedikit saja (delta < -3px): munculkan navbar dengan halus
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
  isHeroSection.value = window.scrollY < (window.innerHeight - 150)
  updateActiveNavOnScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (clickTimeout) clearTimeout(clickTimeout)
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
</script>

