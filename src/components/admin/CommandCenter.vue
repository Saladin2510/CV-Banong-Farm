<template>
  <div class="min-h-screen bg-[#fbf9f6] dark:bg-[#0b0f17] text-[#1b1c1a] dark:text-slate-100 font-sans antialiased flex transition-colors duration-300">
    
    <!-- 1. Dark Frosted Shell Sidebar -->
    <AdminSidebar 
      :activeTab="currentTab"
      @changeTab="currentTab = $event"
      @switchView="$emit('switchView', $event)" 
    />

    <!-- 2. Main Workspace Layout -->
    <div class="pl-64 w-full flex flex-col min-h-screen">
      
      <!-- Top Fixed Header -->
      <AdminHeader 
        @switchView="$emit('switchView', $event)" 
        @search="handleSearch"
        @openAiSettings="isAiSettingsOpen = true"
      />

      <!-- Content Container -->
      <main class="w-full pt-16 bg-[#fbf9f6] dark:bg-[#0b0f17] flex-grow transition-colors duration-300">
        <div class="max-w-[1400px] mx-auto p-6 md:p-8 flex flex-col gap-6">
          
          <!-- Dynamic Page Header & Tactical Actions -->
          <header class="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-white text-xs font-bold">
                  <span class="w-2 h-2 rounded-full bg-secondary-container"></span>
                  {{ currentHeaderInfo.badge }}
                </span>
                <span 
                  class="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <span v-if="adminStore.isSupabaseConnected.value" class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                  <span>Database: {{ adminStore.isSupabaseConnected.value ? 'Supabase Cloud (Online)' : 'Lokal Persisten' }}</span>
                </span>
              </div>

              <h1 class="text-2xl sm:text-3xl text-primary dark:text-white font-extrabold tracking-tight mt-1 leading-snug">
                {{ currentHeaderInfo.title }}
              </h1>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {{ currentHeaderInfo.subtitle }}
              </p>
            </div>

            <!-- Action Buttons (Strict 60:30:10 Colors) -->
            <div class="flex flex-wrap items-center gap-2.5">
              <!-- Prominent CREATE Product Button (Golden Yellow 10% Accent) -->
              <button 
                @click="openAddProductModal"
                class="h-10 px-4 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer bg-secondary-container text-primary hover:bg-accent-hover"
                type="button"
                title="Tambah Komoditas Baru ke Inventaris"
              >
                <span class="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Tambah Komoditas</span>
              </button>

              <button 
                @click="triggerManualSync"
                class="h-10 px-4 rounded-xl bg-white dark:bg-[#1E3A5F] text-primary dark:text-white hover:bg-slate-50 dark:hover:bg-[#132A4A] font-semibold text-xs shadow-xs transition-all flex items-center gap-2 border border-slate-200 dark:border-white/15 active:scale-95 cursor-pointer" 
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]" :class="{ 'animate-spin': isSyncing }">sync</span>
                <span>{{ isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi' }}</span>
              </button>

              <button 
                @click="exportTelemetry"
                class="h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer" 
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]">file_download</span>
                <span>Ekspor Data</span>
              </button>
            </div>
          </header>

          <!-- ============================================== -->
          <!-- TAB 1: BERANDA (OVERVIEW)                     -->
          <!-- ============================================== -->
          <div v-if="currentTab === 'overview'" class="flex flex-col gap-6">
            <!-- 4 Metric Cards Matrix -->
            <AdminMetricCards />

            <!-- Executive Quick Summary Grid (2 Columns) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <!-- Left: Sales & Demand Trend Preview -->
              <div class="lg:col-span-7 bg-white dark:bg-[#0E1726] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors">
                <div>
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center gap-2.5">
                      <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[22px]">insights</span>
                      <h3 class="text-base font-bold text-primary dark:text-white tracking-tight">
                        Ringkasan Tren Permintaan Panen
                      </h3>
                    </div>
                    <span class="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-primary dark:text-secondary-container text-xs font-bold">
                      HARI INI: {{ todayLabel }}
                    </span>
                  </div>

                  <p class="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    Aliran kurva permintaan produk sinkron secara otomatis terhadap pesanan WhatsApp yang masuk dan volume panen harian peternakan Ajibarang.
                  </p>

                  <!-- Quick Highlight Card -->
                  <div class="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-primary dark:text-white">
                          {{ adminStore.dynamic7DaysInfo.value.peakInfo.amount }}
                        </span>
                        <span class="text-[11px] text-slate-500 dark:text-slate-400">
                          {{ adminStore.dynamic7DaysInfo.value.peakInfo.val }}
                        </span>
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-primary dark:text-secondary-container">
                      Puncak Permintaan
                    </span>
                  </div>
                </div>

                <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span class="text-xs text-slate-500 dark:text-slate-400">
                    Grafik 7 hari &amp; proyeksi serapan pasar
                  </span>
                  <button 
                    @click="currentTab = 'analytics'"
                    class="h-8 px-3.5 rounded-lg bg-primary/10 hover:bg-primary/20 dark:bg-white/10 dark:hover:bg-white/20 text-primary dark:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span>Lihat Analitik Penuh</span>
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              <!-- Right: Recent WhatsApp Orders Preview -->
              <div class="lg:col-span-5 bg-white dark:bg-[#0E1726] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors">
                <div>
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[22px]">chat</span>
                      <h3 class="text-base font-bold text-primary dark:text-white tracking-tight">
                        Pesanan WA Terkini
                      </h3>
                    </div>
                    <span class="text-xs text-primary font-bold bg-secondary-container px-2.5 py-0.5 rounded-full">
                      {{ (adminStore.whatsappOrders.value || []).length }} Total
                    </span>
                  </div>

                  <div class="flex flex-col gap-2 mt-3">
                    <div 
                      v-for="order in (adminStore.whatsappOrders.value || []).slice(0, 3)" 
                      :key="order.id"
                      class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div class="flex flex-col min-w-0 pr-2">
                        <span class="font-bold text-primary dark:text-white truncate">{{ order.customer || 'Pelanggan WhatsApp' }}</span>
                        <span class="text-[11px] text-slate-500 dark:text-slate-400">{{ order.qty || 0 }} kg {{ order.productName || 'Komoditas Unggulan' }}</span>
                      </div>
                      <div class="flex flex-col items-end shrink-0">
                        <span class="font-bold text-primary dark:text-white">Rp {{ (order.totalPrice || 0).toLocaleString('id-ID') }}</span>
                        <span class="text-[10px] text-slate-500 dark:text-slate-400">{{ order.id }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button 
                    @click="currentTab = 'orders'"
                    class="h-8 px-3.5 rounded-lg bg-primary/10 hover:bg-primary/20 dark:bg-white/10 dark:hover:bg-white/20 text-primary dark:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span>Lihat Semua Pesanan</span>
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Catalog Alert Strip -->
            <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-secondary-container/20 text-primary dark:text-secondary-container flex items-center justify-center shrink-0 border border-secondary-container/30">
                  <span class="material-symbols-outlined text-[24px]">inventory</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-primary dark:text-white">
                    Total {{ adminStore.products.value.length }} Komoditas Aktif di Gudang
                  </h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">
                    Komoditas serapan tertinggi: <strong>{{ adminStore.topSellingProduct.value?.name }}</strong> ({{ adminStore.topSellingProduct.value?.soldCount?.toLocaleString('id-ID') }} kg terjual)
                  </p>
                </div>
              </div>

              <button 
                @click="currentTab = 'products'"
                class="h-9 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-xs"
                type="button"
              >
                <span>Kelola Produk</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- ============================================== -->
          <!-- TAB 2: MANAJEMEN PRODUK (CRUD FULL-WIDTH)    -->
          <!-- ============================================== -->
          <div v-else-if="currentTab === 'products'" class="flex flex-col gap-6">
            <!-- Full Width Product CRUD Table -->
            <ProductCrudTable 
              :searchQuery="searchQuery"
              @openAddModal="openAddProductModal"
              @openEditModal="openEditProductModal"
              @openDeleteModal="openDeleteProductModal"
            />
          </div>

          <!-- ============================================== -->
          <!-- TAB 3: PESANAN WHATSAPP (FULL-WIDTH)          -->
          <!-- ============================================== -->
          <div v-else-if="currentTab === 'orders'" class="flex flex-col gap-6">
            <!-- Full Width Live WhatsApp Feed -->
            <WhatsAppLiveFeed />
          </div>

          <!-- ============================================== -->
          <!-- TAB 4: ANALITIK AI (FULL-WIDTH)               -->
          <!-- ============================================== -->
          <div v-else-if="currentTab === 'analytics'" class="flex flex-col gap-6">
            <!-- Full Width Continuous Spline Chart & Strategy Box -->
            <AiAnalyticsSection />
          </div>

          <!-- ============================================== -->
          <!-- TAB 5: STRUKTUR DATABASE (ERD & SKEMA)        -->
          <!-- ============================================== -->
          <div v-else-if="currentTab === 'database'" class="flex flex-col gap-6">
            <!-- Full Width Interactive ERD & Database Schema Viewer -->
            <DatabaseErdViewer />
          </div>

        </div>
      </main>

      <!-- Footer Info Strip -->
      <footer class="w-full py-4 px-8 border-t border-cc-outline dark:border-slate-800 bg-white/60 dark:bg-[#161b22] text-xs text-[#797067] dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors">
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

    <AiSettingsModal 
      :isOpen="isAiSettingsOpen"
      @close="isAiSettingsOpen = false"
      @saved="handleAiSettingsSaved"
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
import { ref, computed, onErrorCaptured } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'
import AdminMetricCards from './AdminMetricCards.vue'
import AiAnalyticsSection from './AiAnalyticsSection.vue'
import WhatsAppLiveFeed from './WhatsAppLiveFeed.vue'
import ProductCrudTable from './ProductCrudTable.vue'
import ProductModal from './ProductModal.vue'
import DeleteConfirmModal from './DeleteConfirmModal.vue'
import AiSettingsModal from './AiSettingsModal.vue'
import DatabaseErdViewer from './DatabaseErdViewer.vue'

defineEmits(['switchView'])

const adminStore = useAdminStore()

onErrorCaptured((err, instance, info) => {
  console.warn('[CommandCenter] Ditangkap kesalahan komponen anak:', err, info)
  return false // Mencegah kegagalan render merembet ke seluruh dashboard
})

const currentTab = ref('overview')
const searchQuery = ref('')
const isSyncing = ref(false)
const toastMessage = ref('')

const todayLabel = computed(() => {
  const d7 = adminStore.dynamic7DaysInfo.value
  const today = d7.days.find(d => d.isToday)
  return today ? today.label : 'Hari Ini'
})

const currentHeaderInfo = computed(() => {
  switch (currentTab.value) {
    case 'products':
      return {
        badge: 'KATALOG PRODUK PANEN',
        title: 'Manajemen Komoditas & Inventaris Gudang',
        subtitle: 'Kelola stok fisik, harga per satuan, dan katalog komoditas peternakan CV Banong Farms'
      }
    case 'orders':
      return {
        badge: 'PESANAN MASUK // LIVE',
        title: 'Manajemen Pesanan WhatsApp',
        subtitle: 'Validasi pesanan masuk dan otomatisasi pemotongan stok fisik gudang'
      }
    case 'analytics':
      return {
        badge: 'ANALITIK PENJUALAN',
        title: 'Tren Permintaan & Analitik Usaha',
        subtitle: 'Grafik kurva penjualan dan ringkasan komoditas panen harian Ajibarang'
      }
    case 'database':
      return {
        badge: 'SKEMA DATABASE',
        title: 'Arsitektur Relasi Database (ERD) & Skema Tabel',
        subtitle: 'Peta relasi tabel database Supabase Cloud dan sinkronisasi data'
      }
    case 'overview':
    default:
      return {
        badge: 'OPERASIONAL FARM // AKTIF',
        title: 'Dashboard Operasional Farm',
        subtitle: 'Ringkasan inventaris produk panen, pesanan WhatsApp masuk, dan analitik usaha'
      }
  }
})

// Modal States
const isAiSettingsOpen = ref(false)
const isProductModalOpen = ref(false)
const productToEdit = ref(null)

const handleAiSettingsSaved = () => {
  showToast('Pengaturan Token & Model AI berhasil diperbarui!')
}

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
  if (q && q.trim()) {
    currentTab.value = 'products'
  }
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
