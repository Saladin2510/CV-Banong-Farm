<template>
  <div class="min-h-screen font-sans antialiased">
    <!-- Admin Command Center View -->
    <div v-if="currentView === 'admin'">
      <CommandCenter @switchView="switchView" />
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

      <!-- 5. Interactive Product Quantity / Detail Modal -->
      <ProductModal 
        :isOpen="isModalOpen" 
        :product="selectedProduct" 
        @close="isModalOpen = false" 
      />
    </div>

    <!-- Floating Role Switcher Pill (Memudahkan Beralih Antara Mode User & Mode Admin Seketika) -->
    <div class="fixed bottom-5 left-5 z-[999] flex items-center bg-black/90 backdrop-blur-lg text-white p-1.5 pl-3.5 pr-1.5 rounded-full border border-white/20 shadow-2xl text-xs select-none">
      <span class="flex items-center gap-2 text-white/80 mr-3">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-telemetry-code text-[11px]">
          Mode Aktif: 
          <strong class="text-white">{{ currentView === 'admin' ? 'Pusat Komando (Admin)' : 'Pengunjung (User)' }}</strong>
        </span>
      </span>
      <button 
        @click="switchView(currentView === 'admin' ? 'landing' : 'admin')"
        class="h-7 px-3 rounded-full font-semibold transition-all flex items-center gap-1.5 active:scale-95 text-xs shadow-sm"
        :class="currentView === 'admin' ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-cc-orange text-white hover:bg-cc-orange-strong'"
        :title="currentView === 'admin' ? 'Beralih ke Tampilan Pengunjung Publik' : 'Beralih ke Pusat Komando Admin'"
      >
        <span class="material-symbols-outlined text-[15px]">swap_horiz</span>
        <span>{{ currentView === 'admin' ? 'Ke Mode User' : 'Masuk Jadi Admin' }}</span>
      </button>
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
import CommandCenter from './components/admin/CommandCenter.vue'

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

const checkHash = () => {
  if (window.location.hash.toLowerCase().includes('admin')) {
    currentView.value = 'admin'
  } else {
    currentView.value = 'landing'
  }
}

onMounted(() => {
  checkHash()
  window.addEventListener('hashchange', checkHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', checkHash)
})
</script>
