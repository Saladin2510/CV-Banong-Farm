<template>
  <section class="w-full bg-surface-pure dark:bg-[#0A1128] py-space-48 lg:py-space-64 transition-colors duration-300" id="katalog-produk">
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-32 gap-space-16 animate-fade-in-up">
        <div>
          <div class="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-slate-200 font-label-sm text-label-sm font-semibold mb-space-8 border border-primary/20 dark:border-white/20">
            <span class="material-symbols-outlined text-[16px] text-primary dark:text-secondary-container">verified</span>
            <span>Langsung dari Peternakan Ajibarang</span>
          </div>
          <h2 class="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary dark:text-white font-bold tracking-tight">
            Katalog Segar Hari Ini
          </h2>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 max-w-md">
          Produk hasil panen harian peternakan ramah lingkungan. Dikelola higienis tanpa hormon &amp; bahan aditif sintetis.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 mb-space-32 overflow-x-auto pb-2 scrollbar-none animate-fade-in">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="setCategory(cat.id)"
          :class="[
            'px-5 py-2.5 rounded-full font-label-md text-label-md transition-all duration-300 whitespace-nowrap active:scale-95 shadow-xs',
            selectedCategory === cat.id
              ? 'bg-primary dark:bg-secondary-container text-on-primary dark:text-primary font-bold shadow-md translate-y-[-1px]'
              : 'bg-surface-container-low dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-700 font-medium'
          ]"
        >
          {{ cat.name }}
          <span class="ml-1 text-xs opacity-75">
            ({{ getCategoryCount(cat.id) }})
          </span>
        </button>
      </div>

      <!-- 4-Column Product Grid (Max 8 products per page view) -->
      <transition-group
        tag="div"
        name="product-grid"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-24"
      >
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @select="handleProductSelect"
        />
      </transition-group>

      <!-- 8/8 Section Switcher / Pagination Navigation -->
      <div v-if="totalPages > 1" class="mt-space-40 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-subtle dark:bg-slate-900/70 border border-surface-container-high/80 dark:border-slate-800 animate-fade-in">
        <div class="text-on-surface-variant dark:text-slate-400 font-label-md text-xs sm:text-sm">
          Menampilkan <span class="font-bold text-primary dark:text-white">{{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }}</span> - 
          <span class="font-bold text-primary dark:text-white">{{ Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length) }}</span> dari 
          <span class="font-bold text-primary dark:text-white">{{ filteredProducts.length }}</span> produk (Halaman {{ currentPage }} dari {{ totalPages }})
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="inline-flex items-center gap-1 px-3.5 py-2 rounded-full border border-surface-container-high dark:border-slate-700 bg-surface-pure dark:bg-slate-800 text-primary dark:text-white text-xs font-semibold hover:bg-surface-container-low dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
            aria-label="Halaman sebelumnya"
          >
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Sebelumnya</span>
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="p in totalPages"
              :key="p"
              @click="goToPage(p)"
              :class="[
                'w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all shadow-xs active:scale-95',
                currentPage === p
                  ? 'bg-primary dark:bg-secondary-container text-white dark:text-primary shadow-md scale-105'
                  : 'bg-surface-pure dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-700 border border-surface-container-high dark:border-slate-700'
              ]"
            >
              {{ p }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="inline-flex items-center gap-1 px-3.5 py-2 rounded-full border border-surface-container-high dark:border-slate-700 bg-surface-pure dark:bg-slate-800 text-primary dark:text-white text-xs font-semibold hover:bg-surface-container-low dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
            aria-label="Halaman berikutnya"
          >
            <span>Berikutnya</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      <!-- Trust Bar / Farm-to-Table Highlights -->
      <div 
        class="mt-space-64 p-space-32 rounded-xl bg-surface-subtle dark:bg-slate-900/70 flex flex-col lg:flex-row items-center justify-between gap-space-24 shadow-xs border border-surface-container-high/70 dark:border-slate-800 animate-fade-in-up" 
        id="tentang-kami"
      >
        <div class="flex items-center gap-space-20">
          <div class="w-14 h-14 rounded-full bg-primary-fixed dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-xs border border-primary-container/20 dark:border-slate-700">
            <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[28px]">agriculture</span>
          </div>
          <div>
            <div class="font-headline-md text-headline-md text-primary dark:text-white font-bold">
              Peternakan Beretika di Ajibarang
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mt-0.5">
              Pakan alami, sanitasi berstandar veteriner, dan pengiriman rantai dingin langsung ke rumah tangga maupun mitra kuliner.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-space-16 flex-shrink-0 flex-wrap sm:flex-nowrap">
          <span class="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary dark:text-slate-200 font-semibold bg-surface-pure dark:bg-slate-800 px-3.5 py-2 rounded-full border border-surface-container dark:border-slate-700 shadow-xs">
            <span class="material-symbols-outlined text-secondary dark:text-secondary-fixed text-[20px]">check_circle</span>
            Tanpa Pengawet
          </span>
          <span class="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary dark:text-slate-200 font-semibold bg-surface-pure dark:bg-slate-800 px-3.5 py-2 rounded-full border border-surface-container dark:border-slate-700 shadow-xs">
            <span class="material-symbols-outlined text-secondary dark:text-secondary-fixed text-[20px]">check_circle</span>
            Halal &amp; Higienis
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useAdminStore } from '../stores/useAdminStore'

const emit = defineEmits(['openModal'])

const adminStore = useAdminStore()
const selectedCategory = ref('all')
const currentPage = ref(1)
const ITEMS_PER_PAGE = 8

const categories = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'unggas', name: 'Peternakan Unggas' },
  { id: 'daging', name: 'Daging Segar' },
  { id: 'ikan', name: 'Perikanan Air Deras' },
  { id: 'organik', name: 'Produk Organik' }
]

const products = computed(() => {
  return adminStore.products.value.map(p => ({
    ...p,
    title: p.title || p.name,
    inStock: (Number(p.stock) || 0) > 0,
    stockBadge: (Number(p.stock) || 0) === 0 
      ? 'Stok Habis' 
      : ((Number(p.stock) || 0) <= 50 ? `Sisa ${p.stock} ${p.unit || 'kg'}` : 'Tersedia')
  }))
})

const getCategoryCount = (catId) => {
  if (catId === 'all') return products.value.length
  return products.value.filter(p => p.categoryId === catId).length
}

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value
  return products.value.filter(p => p.categoryId === selectedCategory.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE) || 1
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredProducts.value.slice(start, start + ITEMS_PER_PAGE)
})

const setCategory = (catId) => {
  selectedCategory.value = catId
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  const el = document.getElementById('katalog-produk')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleProductSelect = (product) => {
  emit('openModal', product)
}
</script>

<style scoped>
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.4s ease;
}
.product-grid-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.product-grid-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
