<template>
  <div class="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans antialiased flex">
    
    <!-- 1. Dark Frosted Shell Sidebar -->
    <AdminSidebar @switchView="$emit('switchView', $event)" />

    <!-- 2. Main Workspace Layout -->
    <div class="pl-64 w-full flex flex-col min-h-screen">
      
      <!-- Top Fixed Header -->
      <AdminHeader 
        @switchView="$emit('switchView', $event)" 
        @search="handleSearch"
      />

      <!-- Content Container -->
      <main class="w-full pt-16 bg-[#fbf9f6] flex-grow">
        <div class="max-w-[1400px] mx-auto p-6 md:p-8 flex flex-col gap-6">
          
          <!-- Page Header & Tactical Actions -->
          <header class="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-3 border-b border-cc-outline">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-telemetry-code text-[11px] uppercase font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  NODE KOMANDO 04 // REAL-TIME
                </span>
                <span class="text-[#797067] font-telemetry-code text-[11px]">
                  LATENSI: 14ms SINKRON
                </span>
                <span class="text-[#797067] font-telemetry-code text-[11px] hidden sm:inline">
                  • JENDELA: 24 JAM TERAKHIR
                </span>
              </div>

              <h1 class="text-2xl sm:text-3xl text-[#1b1c1a] font-extrabold uppercase tracking-tight mt-1 leading-snug">
                Pusat Komando Operasional
              </h1>
              <p class="text-xs sm:text-sm text-[#594136]">
                Kluster Banong-Barat • Matriks Penyaluran Prediktif &amp; Agribisnis Terintegrasi
              </p>
            </div>

            <!-- Quick Ops Tactical Buttons -->
            <div class="flex flex-wrap items-center gap-2.5">
              <button 
                @click="triggerManualSync"
                class="h-10 px-4 rounded-lg bg-white text-[#1b1c1a] hover:bg-slate-50 font-medium text-xs shadow-sm transition-all flex items-center gap-2 border border-cc-outline active:scale-95" 
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]" :class="{ 'animate-spin': isSyncing }">sync</span>
                <span>{{ isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi Manual' }}</span>
              </button>

              <button 
                @click="exportTelemetry"
                class="h-10 px-4 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-2 active:scale-95" 
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]">file_download</span>
                <span>Ekspor Telemetri</span>
              </button>
            </div>
          </header>

          <!-- 3. Metric Cards Matrix (4 Cards) -->
          <AdminMetricCards />

          <!-- 4. Middle Section: AI Analytics Continuous Area Chart & Strategy Box -->
          <AiAnalyticsSection />

          <!-- 5. Bottom Section: Live WhatsApp Feed (5 cols) & Products CRUD (7 cols) -->
          <section class="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            <div class="xl:col-span-5">
              <WhatsAppLiveFeed />
            </div>

            <div class="xl:col-span-7">
              <ProductCrudTable 
                :searchQuery="searchQuery"
                @openAddModal="openAddProductModal"
                @openEditModal="openEditProductModal"
                @openDeleteModal="openDeleteProductModal"
              />
            </div>
          </section>

        </div>
      </main>

      <!-- Footer Info Strip -->
      <footer class="w-full py-4 px-8 border-t border-cc-outline bg-white/60 text-xs text-[#797067] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span class="font-telemetry-code">
          © 2026 CV Banong Farms Ajibarang • Command Console Telemetri Agribisnis Modern
        </span>
        <div class="flex items-center gap-4 font-telemetry-code text-[11px]">
          <span class="flex items-center gap-1 text-emerald-700 font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Server Operasional Aktif
          </span>
          <span>Banyumas, Jawa Tengah</span>
        </div>
      </footer>
    </div>

    <!-- Modals -->
    <ProductModal 
      :isOpen="isProductModalOpen"
      :productToEdit="productToEdit"
      @close="isProductModalOpen = false"
      @save="handleSaveProduct"
    />

    <DeleteConfirmModal 
      :isOpen="isDeleteModalOpen"
      :product="productToDelete"
      @close="isDeleteModalOpen = false"
      @confirm="handleConfirmDelete"
    />

    <!-- General Toast Feedback -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div 
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 bg-[#1b1c1a] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 text-xs"
      >
        <span class="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'
import AdminMetricCards from './AdminMetricCards.vue'
import AiAnalyticsSection from './AiAnalyticsSection.vue'
import WhatsAppLiveFeed from './WhatsAppLiveFeed.vue'
import ProductCrudTable from './ProductCrudTable.vue'
import ProductModal from './ProductModal.vue'
import DeleteConfirmModal from './DeleteConfirmModal.vue'

defineEmits(['switchView'])

const adminStore = useAdminStore()

const searchQuery = ref('')
const isSyncing = ref(false)
const toastMessage = ref('')

// Modal States
const isProductModalOpen = ref(false)
const productToEdit = ref(null)

const isDeleteModalOpen = ref(false)
const productToDelete = ref(null)

const showToast = (msg) => {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 4000)
}

const handleSearch = (q) => {
  searchQuery.value = q
}

const triggerManualSync = () => {
  isSyncing.value = true
  setTimeout(() => {
    isSyncing.value = false
    showToast('Sinkronisasi data telemetri panen dan stok selesai 100%.')
  }, 900)
}

const exportTelemetry = () => {
  const telemetryData = {
    cluster: 'Kluster Banong-Barat 04',
    timestamp: new Date().toISOString(),
    totalProducts: adminStore.products.value.length,
    totalStockTon: adminStore.totalStockTon.value,
    totalOrders: adminStore.totalOrdersCount.value,
    revenueJuta: adminStore.totalRevenueJuta.value,
    topProduct: adminStore.topSellingProduct.value?.name,
    inventory: adminStore.products.value,
    recentWhatsAppOrders: adminStore.whatsappOrders.value
  }

  const blob = new Blob([JSON.stringify(telemetryData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `CV_Banong_Farms_Telemetri_${Date.now()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  showToast('File telemetri operasional berhasil diekspor!')
}

// Product CRUD Handlers
const openAddProductModal = () => {
  productToEdit.value = null
  isProductModalOpen.value = true
}

const openEditProductModal = (product) => {
  productToEdit.value = { ...product }
  isProductModalOpen.value = true
}

const openDeleteProductModal = (product) => {
  productToDelete.value = product
  isDeleteModalOpen.value = true
}

const handleSaveProduct = (formData) => {
  if (formData.id) {
    // Edit existing product
    adminStore.updateProduct(formData.id, formData)
    showToast(`Data produk "${formData.name}" berhasil diperbarui.`)
  } else {
    // Add new product
    adminStore.addProduct(formData)
    showToast(`Produk baru "${formData.name}" berhasil ditambahkan ke inventaris.`)
  }
  isProductModalOpen.value = false
}

const handleConfirmDelete = (productId) => {
  if (productId) {
    const deleted = adminStore.deleteProduct(productId)
    showToast(`Komoditas "${deleted?.name || 'Produk'}" berhasil dihapus.`)
  }
  isDeleteModalOpen.value = false
}
</script>
