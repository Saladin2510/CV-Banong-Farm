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

        <!-- 2. Interactive Product Catalog & Trust Bar -->
        <ProductGrid @openModal="handleOpenModal" />
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

      <!-- 6. Floating Cart Trigger (Visible when items are in cart) -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-90"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-90"
      >
        <button 
          v-if="cartStore.totalItems.value > 0"
          @click="cartStore.openCart()"
          class="fixed bottom-24 right-6 z-[90] flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
          title="Buka Keranjang Belanja"
          type="button"
        >
          <div class="relative flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span class="absolute -top-2 -right-2 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px] font-telemetry-code shadow-xs">
              {{ cartStore.totalItems.value }}
            </span>
          </div>
          <span class="font-bold font-telemetry-code">
            {{ formatPrice(cartStore.totalPrice.value) }}
          </span>
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
import ProductGrid from './components/ProductGrid.vue'
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

onMounted(async () => {
  checkHash()
  window.addEventListener('hashchange', checkHash)
  await adminStore.checkAuthSession()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', checkHash)
})
</script>
