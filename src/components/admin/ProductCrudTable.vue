<template>
  <div id="products-crud" class="bg-white dark:bg-[#0E1726] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-5 transition-colors">
    <!-- Header with Clean Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[22px]">inventory_2</span>
          <h2 class="text-lg font-bold text-primary dark:text-white uppercase tracking-tight">
            Katalog &amp; Manajemen Produk Panen
          </h2>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Kelola daftar produk panen: Tambah Produk, Ubah Stok/Harga, dan Pantau Ketersediaan Gudang.
        </p>
      </div>

      <!-- Add New Product Button (Golden Yellow 10% Accent) -->
      <button 
        @click="$emit('openAddModal')"
        class="h-10 px-4 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2 self-start sm:self-auto active:scale-95 bg-secondary-container text-primary hover:bg-accent-hover cursor-pointer"
        type="button"
        title="Tambah Produk Baru ke Katalog"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>+ Tambah Produk Baru</span>
      </button>
    </div>

    <!-- Category Filter Bar with Zero Stock Indicator -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer',
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
          'px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ml-2 border',
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

    <!-- Table Container with Horizontal Scroll Protection -->
    <div class="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
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
            :key="product.id"
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

const categories = [
  'Semua', 
  'Peternakan Unggas', 
  'Perikanan Air Deras', 
  'Daging Segar', 
  'Sayur & Cabai', 
  'Buah-buahan', 
  'Biji Kopi', 
  'Produk Organik'
]

const zeroStockCount = computed(() => {
  return adminStore.products.value.filter(p => (Number(p.stock) || 0) <= 0).length
})

const filteredProducts = computed(() => {
  return adminStore.products.value.filter(p => {
    let matchesCategory = true
    if (selectedCategory.value === 'Stok Habis') {
      matchesCategory = (Number(p.stock) || 0) <= 0
    } else if (selectedCategory.value !== 'Semua') {
      matchesCategory = p.category === selectedCategory.value
    }
    const matchesSearch = !props.searchQuery || 
      p.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(props.searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const getStockRatio = (product) => {
  const max = product.maxStock || Math.max(product.stock, 5000)
  return Math.min(1, product.stock / max)
}
</script>
