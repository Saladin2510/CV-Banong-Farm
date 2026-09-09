<template>
  <div class="min-h-screen font-sans antialiased">
    <!-- Admin View with Supabase Auth Guard -->
    <div v-if="currentView === 'admin'">
      <!-- If authenticated: show Command Center -->
      <CommandCenter 
        v-if="adminStore.isAuthenticated.value" 
        @switchView="switchView" 
        @logout="handleAdminLogout"
      />
      <!-- If not authenticated: show Supabase Auth Login Screen -->
      <AdminLoginView 
        v-else 
        @loginSuccess="switchView('admin')" 
        @switchView="switchView" 
      />
    </div>

    <!-- Public Landing Page View -->
    <div v-else class="min-h-screen bg-surface-pure dark:bg-[#070D1E] text-on-surface dark:text-slate-100 flex flex-col transition-colors duration-300">
      <!-- Sticky Navbar -->
      <Navbar @openAdmin="switchView('admin')" />

      <!-- Main Content -->
      <main class="w-full bg-surface-pure dark:bg-[#070D1E] flex-grow transition-colors duration-300">
        <!-- 1. Hero Section with SVG Curve Mask -->
        <HeroSection />

        <!-- 2. Visi & Misi Section (Bagus, Simple, Modern) -->
        <VisiMisiSection />

        <!-- 3. Interactive Product Catalog & Trust Bar -->
        <ProductGrid @openModal="handleOpenModal" />

        <!-- 4. Interactive 5-Row Zigzag Marquee Komoditas CV Banong Farms (Sebelum CTA) -->
        <InteractiveMarqueeMenu />

        <!-- 5. Polaroid CTA Section (Sesuai Desain Referensi) -->
        <PolaroidCtaSection />
      </main>

      <!-- 3. Informative Footer -->
      <FooterSection />

      <!-- 4. Floating AI Chatbot Mascot Widget -->
      <ChatbotMascot />

      <!-- 5. Interactive Product Checkout Modal -->
      <ProductModal 
        :isOpen="isModalOpen" 
        :product="selectedProduct" 
        @close="isModalOpen = false" 
      />

      <!-- 6. Floating Cart Trigger (Visible on bottom-left when items are in cart, drawer is closed, and scrolled past hero section) -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-x-4 scale-90"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 -translate-x-4 scale-90"
      >
        <button 
          v-if="cartStore.totalItems.value > 0 && !cartStore.isCartOpen.value && isCartVisible"
          @click="cartStore.openCart()"
          class="fixed bottom-6 left-5 sm:bottom-6 sm:left-8 z-40 flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/50 backdrop-blur-md group"
          title="Buka Keranjang Belanja"
          type="button"
        >
          <div class="relative flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px] group-hover:rotate-6 transition-transform">shopping_cart</span>
            <span class="absolute -top-2 -right-2 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px] font-telemetry-code shadow-xs">
              {{ cartStore.totalItems.value }}
            </span>
          </div>
          <div class="flex flex-col text-left">
            <span class="text-[9px] uppercase font-bold text-emerald-100 tracking-wider font-telemetry-code leading-tight">Keranjang</span>
            <span class="font-extrabold font-telemetry-code leading-none">
              {{ formatPrice(cartStore.totalPrice.value) }}
            </span>
          </div>
        </button>
      </transition>

      <!-- 7. Sliding Cart Drawer & WhatsApp Checkout -->
      <CartDrawer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import VisiMisiSection from './components/VisiMisiSection.vue'
import ProductGrid from './components/ProductGrid.vue'
import PolaroidCtaSection from './components/PolaroidCtaSection.vue'
import InteractiveMarqueeMenu from './components/InteractiveMarqueeMenu.vue'
import FooterSection from './components/FooterSection.vue'
import ChatbotMascot from './components/ChatbotMascot.vue'
import ProductModal from './components/ProductModal.vue'
import CartDrawer from './components/CartDrawer.vue'
import CommandCenter from './components/admin/CommandCenter.vue'
import AdminLoginView from './components/admin/AdminLoginView.vue'
import { useAdminStore } from './stores/useAdminStore'
import { useCartStore } from './stores/useCartStore'

const adminStore = useAdminStore()
const cartStore = useCartStore()

const formatPrice = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val || 0).replace('Rp', 'Rp ')
}
const currentView = ref('landing')
const isModalOpen = ref(false)
const selectedProduct = ref(null)

const handleOpenModal = (product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const switchView = (view) => {
  currentView.value = view
  if (view === 'admin') {
    window.location.hash = '#/admin'
  } else {
    window.location.hash = '#/'
  }
}

const handleAdminLogout = async () => {
  await adminStore.logoutAdmin()
  switchView('landing')
}

const checkHash = () => {
  if (window.location.hash.toLowerCase().includes('admin')) {
    currentView.value = 'admin'
  } else {
    currentView.value = 'landing'
  }
}

const isCartVisible = ref(false)

const handleScroll = () => {
  // Sembunyikan saat posisi hero section (<= 420px)
  const isPastHero = window.scrollY > 420

  // Sembunyikan saat posisi footer section
  let isNearFooter = false
  const footer = document.getElementById('kontak') || document.querySelector('footer')
  if (footer) {
    const rect = footer.getBoundingClientRect()
    isNearFooter = rect.top <= window.innerHeight
  } else {
    const scrollBottom = window.innerHeight + window.scrollY
    const docHeight = document.documentElement.scrollHeight
    isNearFooter = scrollBottom >= docHeight - 300
  }

  isCartVisible.value = isPastHero && !isNearFooter
}

onMounted(async () => {
  checkHash()
  window.addEventListener('hashchange', checkHash)
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  await adminStore.checkAuthSession()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', checkHash)
  window.removeEventListener('scroll', handleScroll)
})
</script>
