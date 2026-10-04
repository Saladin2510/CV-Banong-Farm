<template>
  <div id="products-crud" class="bg-white dark:bg-[#0E1726] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-4 sm:gap-5 transition-colors">
    <!-- Header with Clean Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[22px]">inventory_2</span>
          <h2 class="text-base sm:text-lg font-bold text-primary dark:text-white uppercase tracking-tight">
            Katalog &amp; Manajemen Produk Sarana Peternakan
          </h2>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Kelola 74 produk pakan, bibit unggul, obat &amp; alat kandang: Tambah Produk, Ubah Stok/Harga, dan Pantau Ketersediaan Gudang.
        </p>
      </div>

      <!-- Add New Product Button (Golden Yellow 10% Accent) -->
      <button 
        @click="$emit('openAddModal')"
        class="h-10 px-4 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto active:scale-95 bg-secondary-container text-primary hover:bg-accent-hover cursor-pointer shrink-0"
        type="button"
        title="Tambah Produk Baru ke Katalog"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>+ Tambah Produk Baru</span>
      </button>
    </div>

    <!-- Integrated Search Bar & Count Badge -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
      <div class="relative flex-1 max-w-md">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
          search
        </span>
        <input 
          v-model="localSearchQuery" 
          type="text" 
          placeholder="Cari pakan (HP100, HL83), bibit, obat, ID..." 
          class="w-full h-9 pl-9 pr-8 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary dark:focus:border-secondary-container transition-colors"
        />
        <button 
          v-if="localSearchQuery" 
          @click="localSearchQuery = ''"
          type="button"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500 dark:text-slate-400">
        <span class="font-semibold text-primary dark:text-secondary-container">{{ filteredProducts.length }}</span>
        <span>dari 74 produk ditampilkan</span>
      </div>
    </div>

    <!-- Category Filter Bar with Zero Stock Indicator -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0',
          selectedCategory === cat 
            ? 'bg-primary text-white shadow-xs' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
      >
        {{ cat }}
      </button>

      <!-- Quick Restock Filter Tab -->
      <button
        v-if="zeroStockCount > 0"
        @click="selectedCategory = 'Stok Habis'"
        :class="[
          'px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ml-1 border shrink-0',
          selectedCategory === 'Stok Habis' 
            ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 hover:bg-amber-100 border-amber-300 dark:border-amber-800'
        ]"
        title="Tampilkan hanya produk yang stoknya 0 pcs"
      >
        <span class="material-symbols-outlined text-[15px]">warning</span>
        <span>Perlu Diisi Stok ({{ zeroStockCount }})</span>
      </button>
    </div>

    <!-- ======================================================== -->
    <!-- DESKTOP & TABLET VIEW: High-Density Table (hidden on md) -->
    <!-- ======================================================== -->
    <div class="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
      <table class="w-full text-left border-collapse min-w-[560px]">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-700">
            <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
              Nama Produk
            </th>
            <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
              Kategori
            </th>
            <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
              Stok Saat Ini
            </th>
            <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
              Harga Satuan
            </th>
            <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
          <tr 
            v-for="product in filteredProducts" 
            :key="'table-' + product.id"
            :class="[
              'transition-colors',
              product.stock <= 0 
                ? 'bg-amber-50/30 dark:bg-amber-950/15 hover:bg-amber-50/60 dark:hover:bg-amber-950/30' 
                : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
            ]"
          >
            <!-- Product Name & Thumbnail Image -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-secondary-container/20 text-primary dark:text-secondary-container flex items-center justify-center shrink-0 border border-secondary-container/30 overflow-hidden">
                  <img 
                    v-if="product.image" 
                    :src="product.image" 
                    :alt="product.name" 
                    class="w-full h-full object-cover"
                    @error="$event.target.style.display = 'none'"
                  />
                  <span v-else class="material-symbols-outlined text-[19px]">{{ product.icon || 'eco' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-primary dark:text-white leading-tight">
                    {{ product.name }}
                  </span>
                  <span class="text-[11px] text-slate-500 dark:text-slate-400 font-telemetry-code">
                    ID: #PRD-{{ product.id }} • Terjual: {{ (product.soldCount || 0).toLocaleString('id-ID') }} {{ product.unit || 'pcs' }}
                  </span>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="px-4 py-3">
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                {{ product.category }}
              </span>
            </td>

            <!-- Real-time Stock Bar with Clean Colors -->
            <td class="px-4 py-3">
              <div class="flex flex-col gap-1 max-w-[140px]">
                <div class="flex justify-between items-center text-xs">
                  <span 
                    :class="[
                      'text-xs font-bold font-telemetry-code',
                      product.stock <= 0 ? 'text-amber-700 dark:text-amber-400' : 'text-primary dark:text-white'
                    ]"
                  >
                    {{ product.stock.toLocaleString('id-ID') }} {{ product.unit || 'pcs' }}
                  </span>
                  <span 
                    :class="[
                      'text-[10px] font-bold px-1.5 py-0.2 rounded font-telemetry-code',
                      product.stock <= 0 
                        ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    ]"
                  >
                    {{ product.stock <= 0 ? '0 pcs' : `${Math.round(getStockRatio(product) * 100)}%` }}
                  </span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500" 
                    :class="product.stock <= 0 ? 'bg-amber-500' : 'bg-secondary-container'"
                    :style="{ width: `${product.stock <= 0 ? 0 : Math.min(100, Math.round(getStockRatio(product) * 100))}%` }"
                  ></div>
                </div>
              </div>
            </td>

            <!-- Unit Price -->
            <td class="px-4 py-3 text-xs text-primary dark:text-slate-200 font-bold font-telemetry-code">
              Rp {{ product.price.toLocaleString('id-ID') }}/{{ product.unit || 'pcs' }}
            </td>

            <!-- Action Buttons: Edit & Hapus -->
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button 
                  @click="$emit('openEditModal', product)"
                  :class="[
                    'px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer',
                    product.stock <= 0 
                      ? 'bg-secondary-container hover:bg-accent-hover text-primary font-bold shadow-xs border border-yellow-400/40' 
                      : 'bg-primary/10 hover:bg-primary/20 text-primary dark:text-white border border-primary/20'
                  ]"
                  type="button"
                  :title="product.stock <= 0 ? 'Isi Stok Produk Sekarang' : 'Ubah Data Produk'"
                >
                  <span class="material-symbols-outlined text-[15px]">{{ product.stock <= 0 ? 'add_circle' : 'edit' }}</span>
                  <span>{{ product.stock <= 0 ? 'Isi Stok' : 'Ubah' }}</span>
                </button>
                <button 
                  @click="$emit('openDeleteModal', product)"
                  class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                  type="button"
                  title="Hapus Produk dari Inventaris"
                >
                  <span class="material-symbols-outlined text-[15px]">delete</span>
                  <span>Hapus</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="!filteredProducts.length">
            <td colspan="5" class="text-center py-8 text-slate-500 dark:text-slate-400">
              <div class="flex flex-col items-center justify-center gap-2">
                <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">inventory_2</span>
                <span class="text-sm font-medium">Tidak ada produk ditemukan dalam kategori ini</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ======================================================== -->
    <!-- MOBILE VIEW: Professional Interactive Cards (block on md) -->
    <!-- ======================================================== -->
    <div class="block md:hidden flex flex-col gap-3">
      <div 
        v-for="product in filteredProducts" 
        :key="'mobile-' + product.id"
        :class="[
          'p-3.5 rounded-2xl border transition-all flex flex-col gap-3 shadow-xs',
          product.stock <= 0 
            ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-800/60' 
            : 'bg-white dark:bg-[#111928] border-slate-200/80 dark:border-slate-800'
        ]"
      >
        <!-- Top: Product Thumbnail, Title, Category -->
        <div class="flex items-start gap-3">
          <div class="w-14 h-14 rounded-xl bg-secondary-container/20 text-primary dark:text-secondary-container flex items-center justify-center shrink-0 border border-secondary-container/30 overflow-hidden">
            <img 
              v-if="product.image" 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-full object-cover"
              @error="$event.target.style.display = 'none'"
            />
            <span v-else class="material-symbols-outlined text-[22px]">{{ product.icon || 'eco' }}</span>
          </div>

          <div class="flex-1 min-w-0 flex flex-col gap-0.5">
            <div class="flex items-center justify-between gap-1">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
                {{ product.category }}
              </span>
              <span class="text-[10px] text-slate-400 font-telemetry-code">#PRD-{{ product.id }}</span>
            </div>

            <h4 class="font-bold text-sm text-primary dark:text-white leading-snug line-clamp-2 mt-0.5">
              {{ product.name }}
            </h4>

            <div class="flex items-baseline gap-1 mt-1">
              <span class="text-sm font-extrabold text-primary dark:text-white font-telemetry-code">
                Rp {{ product.price.toLocaleString('id-ID') }}
              </span>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">/ {{ product.unit || 'pcs' }}</span>
            </div>
          </div>
        </div>

        <!-- Middle: Stock Level Card -->
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex flex-col gap-1.5 text-xs">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span 
                class="w-2 h-2 rounded-full" 
                :class="product.stock <= 0 ? 'bg-amber-500 animate-ping' : (product.stock < 10 ? 'bg-amber-400' : 'bg-emerald-500')"
              ></span>
              Sisa Stok Gudang:
            </span>
            <span 
              :class="[
                'font-bold font-telemetry-code',
                product.stock <= 0 ? 'text-amber-600 dark:text-amber-400' : 'text-primary dark:text-white'
              ]"
            >
              {{ product.stock.toLocaleString('id-ID') }} {{ product.unit || 'pcs' }}
              <span v-if="product.stock <= 0" class="ml-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold">(HABIS)</span>
            </span>
          </div>

          <!-- Stock Progress Bar -->
          <div class="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-300" 
              :class="product.stock <= 0 ? 'bg-amber-500' : 'bg-secondary-container'"
              :style="{ width: `${product.stock <= 0 ? 0 : Math.min(100, Math.round(getStockRatio(product) * 100))}%` }"
            ></div>
          </div>

          <div class="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span>Terjual: {{ (product.soldCount || 0).toLocaleString('id-ID') }} {{ product.unit || 'pcs' }}</span>
            <span>Kapasitas: {{ Math.round(getStockRatio(product) * 100) }}%</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-2 pt-0.5">
          <button 
            @click="$emit('openEditModal', product)"
            :class="[
              'h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer',
              product.stock <= 0 
                ? 'bg-secondary-container hover:bg-accent-hover text-primary shadow-xs border border-yellow-400/40' 
                : 'bg-primary/10 hover:bg-primary/20 text-primary dark:text-white border border-primary/20 dark:border-white/20'
            ]"
            type="button"
          >
            <span class="material-symbols-outlined text-[16px]">{{ product.stock <= 0 ? 'add_circle' : 'edit' }}</span>
            <span>{{ product.stock <= 0 ? 'Isi Stok' : 'Ubah Data' }}</span>
          </button>

          <button 
            @click="$emit('openDeleteModal', product)"
            class="h-9 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            type="button"
          >
            <span class="material-symbols-outlined text-[16px]">delete</span>
            <span>Hapus</span>
          </button>
        </div>
      </div>

      <!-- Mobile Empty State -->
      <div 
        v-if="!filteredProducts.length" 
        class="py-10 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">inventory_2</span>
        <span class="text-sm font-medium text-slate-600 dark:text-slate-400">Tidak ada produk ditemukan</span>
        <button 
          v-if="localSearchQuery" 
          @click="localSearchQuery = ''" 
          type="button"
          class="text-xs text-primary dark:text-secondary-container font-bold underline cursor-pointer mt-1"
        >
          Hapus pencarian
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

defineEmits(['openAddModal', 'openEditModal', 'openDeleteModal'])

const adminStore = useAdminStore()
const selectedCategory = ref('Semua')
const localSearchQuery = ref('')

const categories = [
  'Semua', 
  'Pakan Ternak & Unggas', 
  'Bibit Unggul', 
  'Obat, Vitamin & Vaksin', 
  'Pakan Ikan & Pet Food', 
  'Alat & Perlengkapan Kandang'
]

const zeroStockCount = computed(() => {
  return adminStore.products.value.filter(p => (Number(p.stock) || 0) <= 0).length
})

const filteredProducts = computed(() => {
  const query = (localSearchQuery.value || props.searchQuery || '').toLowerCase().trim()
  return adminStore.products.value.filter(p => {
    let matchesCategory = true
    if (selectedCategory.value === 'Stok Habis') {
      matchesCategory = (Number(p.stock) || 0) <= 0
    } else if (selectedCategory.value !== 'Semua') {
      matchesCategory = p.category === selectedCategory.value
    }
    
    if (!matchesCategory) return false
    if (!query) return true

    const name = (p.name || '').toLowerCase()
    const cat = (p.category || '').toLowerCase()
    const id = String(p.id || '')
    const brand = (p.brand || '').toLowerCase()

    return name.includes(query) || cat.includes(query) || id.includes(query) || brand.includes(query)
  })
})

const getStockRatio = (product) => {
  const max = product.maxStock || Math.max(product.stock, 5000)
  return Math.min(1, product.stock / max)
}
</script>
