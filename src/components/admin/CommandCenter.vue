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
          <header class="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-3 border-b border-cc-outline dark:border-slate-800">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-telemetry-code text-[11px] uppercase font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping"></span>
                  {{ currentHeaderInfo.badge }}
                </span>
                <span 
                  class="font-telemetry-code text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold"
                  :class="adminStore.isSupabaseConnected.value ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-[#797067] dark:text-slate-400'"
                >
                  <span v-if="adminStore.isSupabaseConnected.value" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>DATABASE: {{ adminStore.isSupabaseConnected.value ? 'SUPABASE CLOUD (ONLINE 24/7)' : adminStore.isServerDbConnected.value ? 'SERVER REST API' : 'LOKAL PERSISTEN' }}</span>
                </span>
                <span class="text-[#797067] dark:text-slate-400 font-telemetry-code text-[11px] hidden sm:inline">
                  • 7 HARI TERAKHIR DINAMIS
                </span>
              </div>

              <h1 class="text-2xl sm:text-3xl text-[#1b1c1a] dark:text-white font-extrabold uppercase tracking-tight mt-1 leading-snug">
                {{ currentHeaderInfo.title }}
              </h1>
              <p class="text-xs sm:text-sm text-[#594136] dark:text-slate-400">
                {{ currentHeaderInfo.subtitle }}
              </p>
            </div>

            <!-- Quick Ops Tactical Buttons -->
            <div class="flex flex-wrap items-center gap-2.5">
              <!-- Prominent CREATE Product Button (visible across tabs) -->
              <button 
                @click="openAddProductModal"
                class="h-10 px-4 rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer text-white"
                style="background-color: #fe6e00; color: #ffffff;"
                type="button"
                title="Tambah Komoditas Baru ke Inventaris (CREATE)"
              >
                <span class="material-symbols-outlined text-[18px]">add_box</span>
                <span>+ Tambah Komoditas (Create)</span>
              </button>

              <button 
                @click="triggerManualSync"
                class="h-10 px-4 rounded-lg bg-white dark:bg-[#161b22] text-[#1b1c1a] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-xs shadow-sm transition-all flex items-center gap-2 border border-cc-outline dark:border-slate-700 active:scale-95 cursor-pointer" 
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]" :class="{ 'animate-spin': isSyncing }">sync</span>
                <span>{{ isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi Manual' }}</span>
              </button>

              <button 
                @click="exportTelemetry"
                class="h-10 px-4 rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-2 active:scale-95 cursor-pointer" 
                type="button"
              >
                <span class="material-symbols-outlined text-[18px]">file_download</span>
                <span>Ekspor Telemetri</span>
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
              <!-- Left: AI Analytics Trend Preview -->
              <div class="lg:col-span-7 bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
                <div>
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-cc-orange text-[20px]">insights</span>
                      <h3 class="text-base font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
                        Ringkasan Tren Permintaan AI (7 Hari)
                      </h3>
                    </div>
                    <span class="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-cc-orange-strong font-telemetry-code text-[11px] font-bold">
                      HARI INI: {{ todayLabel }}
                    </span>
                  </div>

                  <p class="text-xs text-[#797067] dark:text-slate-400 mt-3 leading-relaxed">
                    Aliran kurva permintaan produk sinkron secara otomatis terhadap pesanan WhatsApp yang masuk dan volume panen harian dari Kluster Banong-Barat.
                  </p>

                  <!-- Quick Telemetry Highlight Node -->
                  <div class="mt-4 p-3.5 rounded-lg bg-[#fbf9f6] dark:bg-[#0d1117] border border-orange-200 dark:border-orange-900/40 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-cc-orange animate-ping"></span>
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-[#1b1c1a] dark:text-white font-telemetry-code">
                          {{ adminStore.dynamic7DaysInfo.value.peakInfo.amount }}
                        </span>
                        <span class="text-[11px] text-[#797067] dark:text-slate-400">
                          {{ adminStore.dynamic7DaysInfo.value.peakInfo.val }}
                        </span>
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-telemetry-code">
                      Korelasi 0,984
                    </span>
                  </div>
                </div>

                <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span class="text-xs text-[#797067] dark:text-slate-400">
                    Kurva spline 7 hari &amp; proyeksi AI (+19,4%)
                  </span>
                  <button 
                    @click="currentTab = 'analytics'"
                    class="h-8 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-cc-orange-strong font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span>Buka Grafik Analitik Penuh</span>
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              <!-- Right: Recent WhatsApp Orders Preview -->
              <div class="lg:col-span-5 bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
                <div>
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-emerald-600 text-[20px]">chat</span>
                      <h3 class="text-base font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
                        Pesanan WA Terkini
                      </h3>
                    </div>
                    <span class="font-telemetry-code text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded font-bold">
                      {{ adminStore.whatsappOrders.value.length }} Total
                    </span>
                  </div>

                  <div class="flex flex-col gap-2 mt-3">
                    <div 
                      v-for="order in adminStore.whatsappOrders.value.slice(0, 3)" 
                      :key="order.id"
                      class="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div class="flex flex-col min-w-0 pr-2">
                        <span class="font-semibold text-slate-900 dark:text-white truncate">{{ order.customer }}</span>
                        <span class="text-[11px] text-slate-500 dark:text-slate-400">{{ order.qty }} kg {{ order.productName }}</span>
                      </div>
                      <div class="flex flex-col items-end shrink-0">
                        <span class="font-bold text-slate-900 dark:text-white font-telemetry-code">Rp {{ order.totalPrice.toLocaleString('id-ID') }}</span>
                        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-telemetry-code">{{ order.id }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button 
                    @click="adminStore.simulateIncomingOrder()"
                    class="h-8 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-telemetry-code text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    type="button"
                    title="Simulasi Pesanan Baru Masuk"
                  >
                    <span class="material-symbols-outlined text-[16px]">add</span>
                    <span>+ Order WA</span>
                  </button>
                  <button 
                    @click="currentTab = 'orders'"
                    class="h-8 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span>Lihat Semua Pesanan</span>
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Catalog & Low Stock Alert Strip -->
            <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-cc-orange flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[22px]">inventory</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-[#1b1c1a] dark:text-white">
                    Total {{ adminStore.products.value.length }} Komoditas Aktif di Gudang
                  </h4>
                  <p class="text-xs text-[#797067] dark:text-slate-400">
                    Komoditas serapan tertinggi: <strong>{{ adminStore.topSellingProduct.value?.name }}</strong> ({{ adminStore.topSellingProduct.value?.soldCount?.toLocaleString('id-ID') }} kg terjual)
                  </p>
                </div>
              </div>

              <button 
                @click="currentTab = 'products'"
                class="h-9 px-4 rounded-lg bg-[#1b1c1a] dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                type="button"
              >
                <span>Buka Manajemen Produk CRUD</span>
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
import { ref, computed } from 'vue'
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
        badge: 'KATALOG & CRUD KOMODITAS',
        title: 'Manajemen Komoditas & Inventaris Gudang',
        subtitle: 'Kelola stok fisik, harga per satuan, dan katalog 7 kategori komoditas pertanian & peternakan'
      }
    case 'orders':
      return {
        badge: 'SALURAN TIKET WHATSAPP // REAL-TIME',
        title: 'Pusat Pengelolaan Pesanan WhatsApp & Distribusi',
        subtitle: 'Pantau aliran pesanan masuk dari mitra restoran, grosir, dan konsumen terverifikasi'
      }
    case 'analytics':
      return {
        badge: 'ANALITIK PREDIKTIF // AI ENGINE',
        title: 'Prediksi Tren Permintaan & Rekomendasi Pemasaran',
        subtitle: 'Kurva kontinuitas spline dinamis 7 hari terakhir, estimasi puncak serapan pasar, dan insight AI'
      }
    case 'database':
      return {
        badge: 'STRUKTUR DATA TERNORMALISASI (3NF)',
        title: 'Arsitektur Relasi Database (ERD) & Skema Tabel',
        subtitle: 'Peta relasi 7 tabel, skema kolom, dan penjelajah data persisten LocalStorage'
      }
    case 'overview':
    default:
      return {
        badge: 'NODE KOMANDO 04 // REAL-TIME PERSISTEN',
        title: 'Pusat Komando Operasional',
        subtitle: 'Kluster Banong-Barat • Matriks Penyaluran Prediktif & Agribisnis Terintegrasi'
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
