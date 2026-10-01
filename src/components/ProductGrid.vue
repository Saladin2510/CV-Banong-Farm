<template>
  <section class="relative w-full bg-surface-pure dark:bg-[#070D1E] py-16 sm:py-20 lg:py-24 transition-colors duration-300 border-b border-slate-100 dark:border-slate-800/80" id="katalog-produk">
    <!-- Anchor identifier for #katalog -->
    <span id="katalog" class="absolute -top-32 pointer-events-none opacity-0"></span>
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
      
      <!-- Section Header -->
      <div class="mb-8 sm:mb-12 animate-fade-in-up">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container text-xs font-bold mb-3 border border-primary/20 dark:border-white/20 font-telemetry-code">
          <span class="material-symbols-outlined text-[15px] text-primary dark:text-secondary-container">verified</span>
          <span>SARANA PETERNAKAN &amp; PAKAN TERLENGKAP</span>
        </div>
        <div class="overflow-hidden py-1">
          <h2 class="product-skew-title font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary dark:text-white font-black tracking-tight origin-bottom-left will-change-transform">
            Katalog Pakan &amp; Sarana Peternakan
          </h2>
        </div>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Pilihan pakan pabrikan PT. New Hope Indonesia, pakan ikan, pakan burung &amp; kucing, bibit unggul DOQ/DOC/DOD, obat &amp; vitamin Medion resmi, hingga alat kandang. Tersedia sak karungan grosir dan eceran kiloan siap kirim dengan armada toko.
        </p>
      </div>

      <!-- Search Bar & Filter Controls -->
      <div class="mb-6 sm:mb-8 space-y-3.5 animate-fade-in">
        <!-- Main Search Bar Row -->
        <div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          <!-- Search Input Box -->
          <div class="relative flex-1 max-w-2xl">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[22px] pointer-events-none">
              search
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari pakan (HP100, HL83), bibit (DOQ, DOC), obat Medion, merk..."
              class="w-full pl-11 pr-28 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary dark:focus:border-secondary-container focus:ring-4 focus:ring-primary/10 dark:focus:ring-secondary-container/10 transition-all shadow-xs"
              @keydown.esc="clearSearch"
              aria-label="Cari pakan atau sarana peternakan"
            />
            
            <!-- Clear Button & Result Count Badge -->
            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                v-if="searchQuery"
                @click="clearSearch"
                type="button"
                class="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Hapus pencarian (Esc)"
              >
                <span class="material-symbols-outlined text-[18px]">close</span>
              </button>
              <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-telemetry-code bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md shrink-0">
                {{ filteredProducts.length }} Produk
              </span>
            </div>
          </div>

          <!-- Sorting Dropdown -->
          <div class="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline font-telemetry-code">Urutkan:</span>
            <div class="relative">
              <select
                v-model="sortBy"
                class="appearance-none pl-3 pr-8 py-2.5 sm:py-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary dark:focus:border-secondary-container cursor-pointer shadow-xs"
                aria-label="Urutkan produk"
              >
                <option value="default">Rekomendasi Toko</option>
                <option value="price-asc">Harga: Terendah → Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi → Terendah</option>
                <option value="stock-desc">Stok Terbanyak</option>
                <option value="name-asc">Nama Produk (A - Z)</option>
              </select>
              <span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>

        </div>

        <!-- Quick Search Suggestion Tags -->
        <div class="flex items-center gap-1.5 flex-wrap text-xs">
          <span class="text-[11px] text-slate-400 dark:text-slate-500 font-medium mr-1 flex items-center gap-1 font-telemetry-code">
            <span class="material-symbols-outlined text-[14px] text-secondary-container">trending_up</span>
            Populer:
          </span>
          <button
            v-for="tag in quickSearchTags"
            :key="tag"
            @click="applyQuickTag(tag)"
            type="button"
            :class="[
              'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer active:scale-95 shadow-2xs',
              searchQuery.toLowerCase() === tag.toLowerCase()
                ? 'bg-primary dark:bg-secondary-container text-white dark:text-primary font-bold shadow-xs'
                : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Category Filter Tabs (Scrollable on Mobile) -->
      <div class="flex items-center gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2.5 scrollbar-none overscroll-x-contain -mx-4 px-4 sm:mx-0 sm:px-0 animate-fade-in">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="setCategory(cat.id)"
          :class="[
            'px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 whitespace-nowrap active:scale-95 shrink-0 shadow-xs cursor-pointer',
            selectedCategory === cat.id
              ? 'bg-primary dark:bg-secondary-container text-white dark:text-primary font-bold shadow-md translate-y-[-1px]'
              : 'bg-surface-container-low dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-700 font-medium'
          ]"
        >
          {{ cat.name }}
          <span class="ml-1 text-[11px] opacity-75">
            ({{ getCategoryCount(cat.id) }})
          </span>
        </button>
      </div>

      <!-- Empty / Syncing State -->
      <div v-if="filteredProducts.length === 0" class="py-16 text-center flex flex-col items-center justify-center animate-fade-in">
        <div class="w-16 h-16 rounded-full bg-surface-container-low dark:bg-slate-800 flex items-center justify-center text-primary dark:text-secondary-container mb-4 shadow-xs">
          <span class="material-symbols-outlined text-[32px]">
            {{ searchQuery ? 'search_off' : 'inventory_2' }}
          </span>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-primary dark:text-white font-bold mb-1">
          {{ searchQuery ? 'Produk Tidak Ditemukan' : 'Belum Ada Produk di Kategori Ini' }}
        </h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 max-w-sm mb-4">
          {{ searchQuery 
            ? `Tidak ada produk yang cocok dengan kata kunci "${searchQuery}". Silakan coba kata kunci lain atau hapus filter pencarian.` 
            : 'Stok sarana peternakan untuk kategori ini sedang disiapkan di gudang toko. Silakan cek kategori lain atau hubungi kami langsung via WhatsApp untuk ketersediaan barang.' 
          }}
        </p>
        <div class="flex items-center gap-2">
          <button
            v-if="searchQuery"
            @click="clearSearch"
            type="button"
            class="px-4 py-2 rounded-xl bg-primary dark:bg-secondary-container text-white dark:text-primary text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Hapus Pencarian
          </button>
          <button
            v-if="selectedCategory !== 'all'"
            @click="setCategory('all')"
            type="button"
            class="px-4 py-2 rounded-xl bg-surface-container-low dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-surface-container dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            Lihat Semua Kategori
          </button>
        </div>
      </div>

      <!-- 4-Column Product Grid (Staggered GSAP Reveal) -->
      <div
        v-else
        ref="productGridRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-9"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="product-card-item h-full flex flex-col will-change-transform"
        >
          <ProductCard
            :product="product"
            @select="handleProductSelect"
            class="h-full"
          />
        </div>
      </div>

      <!-- 8/8 Section Switcher / Pagination Navigation (Dekat & Rapi) -->
      <div v-if="totalPages > 1" class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-surface-subtle dark:bg-slate-900/70 border border-surface-container-high/80 dark:border-slate-800 animate-fade-in">
        <div class="text-on-surface-variant dark:text-slate-400 font-label-md text-xs sm:text-sm">
          Menampilkan <span class="font-bold text-primary dark:text-white">{{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }}</span> - 
          <span class="font-bold text-primary dark:text-white">{{ Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length) }}</span> dari 
          <span class="font-bold text-primary dark:text-white">{{ filteredProducts.length }}</span> produk (Halaman {{ currentPage }} dari {{ totalPages }})
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-surface-container-high dark:border-slate-700 bg-surface-pure dark:bg-slate-800 text-primary dark:text-white text-xs font-semibold hover:bg-surface-container-low dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
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
            class="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-surface-container-high dark:border-slate-700 bg-surface-pure dark:bg-slate-800 text-primary dark:text-white text-xs font-semibold hover:bg-surface-container-low dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
            aria-label="Halaman berikutnya"
          >
            <span>Berikutnya</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard.vue'
import { useAdminStore } from '../stores/useAdminStore'

gsap.registerPlugin(ScrollTrigger)

const emit = defineEmits(['openModal'])

const adminStore = useAdminStore()
const selectedCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('default')
const currentPage = ref(1)
const ITEMS_PER_PAGE = 12
const productGridRef = ref(null)

let ctx = null

const quickSearchTags = [
  'New Hope HP100',
  'Layer HL83',
  'DOQ Puyuh',
  'DOC Broiler',
  'Vita Stress',
  'Vaksin Medivac',
  'HI-PRO-VITE 781',
  'Bolt Kucing'
]

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const applyQuickTag = (tag) => {
  if (searchQuery.value.toLowerCase() === tag.toLowerCase()) {
    searchQuery.value = ''
  } else {
    searchQuery.value = tag
  }
  currentPage.value = 1
}

const categories = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'pakan', name: 'Pakan Ternak & Unggas' },
  { id: 'bibit', name: 'Bibit Unggul (DOQ/DOC/DOD)' },
  { id: 'obat', name: 'Obat, Vitamin & Vaksin' },
  { id: 'ikan_pet', name: 'Pakan Ikan & Pet Food' },
  { id: 'alat', name: 'Alat & Perlengkapan Kandang' }
]

const matchesCategory = (p, catId) => {
  if (catId === 'all') return true
  if (p.categoryId === catId) return true
  const catName = (p.category || p.category_name || '').toLowerCase()
  if (catId === 'pakan') return (catName.includes('pakan ternak') || catName.includes('unggas')) && !catName.includes('ikan') && !catName.includes('pet')
  if (catId === 'bibit') return catName.includes('bibit')
  if (catId === 'obat') return catName.includes('obat') || catName.includes('vaksin') || catName.includes('vitamin')
  if (catId === 'ikan_pet') return catName.includes('ikan') || catName.includes('pet')
  if (catId === 'alat') return catName.includes('alat') || catName.includes('kandang')
  return false
}

const products = computed(() => {
  return (adminStore.products.value || []).map(p => ({
    ...p,
    title: p.title || p.name,
    inStock: (Number(p.stock) || 0) > 0,
    stockBadge: (Number(p.stock) || 0) === 0 
      ? 'Stok Habis' 
      : ((Number(p.stock) || 0) <= 50 ? `Sisa ${p.stock} ${p.unit || 'pcs'}` : 'Tersedia')
  }))
})

const getCategoryCount = (catId) => {
  return products.value.filter(p => matchesCategory(p, catId)).length
}

const filteredProducts = computed(() => {
  let list = products.value.filter(p => matchesCategory(p, selectedCategory.value))

  const q = (searchQuery.value || '').trim().toLowerCase()
  if (q) {
    const terms = q.split(/\s+/).filter(Boolean)
    list = list.filter(p => {
      const name = (p.name || p.title || p.nama_produk || '').toLowerCase()
      const brand = (p.brand || '').toLowerCase()
      const cat = (p.category || p.category_name || '').toLowerCase()
      const target = (p.target || '').toLowerCase()
      const desc = (p.deskripsi || p.description || '').toLowerCase()
      const unit = (p.unit || p.satuan || '').toLowerCase()

      return terms.every(term =>
        name.includes(term) ||
        brand.includes(term) ||
        cat.includes(term) ||
        target.includes(term) ||
        desc.includes(term) ||
        unit.includes(term)
      )
    })
  }

  // Sort
  if (sortBy.value === 'price-asc') {
    list = [...list].sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
  } else if (sortBy.value === 'price-desc') {
    list = [...list].sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
  } else if (sortBy.value === 'stock-desc') {
    list = [...list].sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0))
  } else if (sortBy.value === 'name-asc') {
    list = [...list].sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''))
  }

  return list
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE) || 1
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredProducts.value.slice(start, start + ITEMS_PER_PAGE)
})

const animateCards = () => {
  nextTick(() => {
    if (!productGridRef.value) return
    const cards = productGridRef.value.querySelectorAll('.product-card-item')
    if (!cards || cards.length === 0) return

    // Staggered grid cards fade-in dari 0 ke 1 dan bergeser naik 50px dengan jeda 0.15s (power3.out premium easing)
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    )
  })
}

const setCategory = (catId) => {
  selectedCategory.value = catId
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  const el = document.getElementById('katalog-produk')
  if (el) {
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -30, duration: 1.1 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const handleProductSelect = (product) => {
  emit('openModal', product)
}

watch([selectedCategory, searchQuery, sortBy], () => {
  currentPage.value = 1
  animateCards()
})

watch(currentPage, () => {
  animateCards()
})

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Kinetic Typography Skew Reveal untuk Judul Katalog
    gsap.from('.product-skew-title', {
      y: 55,
      skewY: 6,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#katalog-produk',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })

    // 2. Reveal untuk Section Header Badge
    gsap.from('#katalog-produk .max-w-container-max > .mb-10 > .inline-flex', {
      y: 25,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#katalog-produk',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })

    // 3. Cascading 50px reveal kartu produk saat pertama kali masuk viewport
    ScrollTrigger.create({
      trigger: '#katalog-produk',
      start: 'top 78%',
      once: true,
      onEnter: () => animateCards()
    })
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
