<template>
  <div class="min-h-screen bg-surface-pure font-sans text-on-surface antialiased flex flex-col">
    <!-- Sticky Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="w-full pt-20 bg-surface-pure flex-grow">
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
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ProductGrid from './components/ProductGrid.vue'
import FooterSection from './components/FooterSection.vue'
import ChatbotMascot from './components/ChatbotMascot.vue'
import ProductModal from './components/ProductModal.vue'

const isModalOpen = ref(false)
const selectedProduct = ref(null)

const handleOpenModal = (product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}
</script>
