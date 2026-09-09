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
