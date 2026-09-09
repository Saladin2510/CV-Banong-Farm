<template>
  <div id="products-crud" class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
    <!-- Header with Prominent CRUD Badge -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-cc-orange-strong text-[20px]">inventory</span>
          <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
            Katalog &amp; Manajemen CRUD Produk
          </h2>
          <span class="hidden md:inline-flex px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-telemetry-code text-[10px] font-bold">
            CREATE • READ • UPDATE • DELETE
          </span>
        </div>
        <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
          Kelola komoditas panen aktif: Tambah (Create), Ubah Stok/Harga (Update), Hapus (Delete).
        </p>
      </div>

      <!-- Add New Product Button (CREATE) -->
      <button 
        @click="$emit('openAddModal')"
        class="h-10 px-4 rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto active:scale-95 text-white cursor-pointer"
        style="background-color: #fe6e00; color: #ffffff;"
        type="button"
        title="Buka Form Tambah Produk Baru (Create)"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>+ Tambah Produk Baru (Create)</span>
      </button>
    </div>

    <!-- Category Filter Bar -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap',
          selectedCategory === cat 
            ? 'bg-[#1b1c1a] dark:bg-cc-orange text-white font-semibold shadow-xs' 
            : 'bg-slate-100 dark:bg-slate-800 text-[#594136] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Table Container with Horizontal Scroll Protection -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[560px]">
        <thead>
          <tr class="bg-orange-50/60 dark:bg-[#1c2128] border-b border-slate-200 dark:border-slate-700">
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] dark:text-white uppercase tracking-wider font-bold">
              Nama Produk
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] dark:text-white uppercase tracking-wider font-bold">
              Kategori
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] dark:text-white uppercase tracking-wider font-bold">
              Stok Saat Ini
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] dark:text-white uppercase tracking-wider font-bold">
              Harga Satuan
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] dark:text-white uppercase tracking-wider font-bold text-right">
              Aksi CRUD
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
          <tr 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="hover:bg-[#fbf9f6] dark:hover:bg-slate-800/50 transition-colors"
          >
            <!-- Product Name & Icon -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[18px]">{{ product.icon || 'eco' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold text-[#1b1c1a] dark:text-white leading-tight">
                    {{ product.name }}
                  </span>
                  <span class="font-telemetry-code text-[10px] text-[#797067] dark:text-slate-400">
                    ID: #PRD-{{ product.id }} • Terjual: {{ (product.soldCount || 0).toLocaleString('id-ID') }} {{ product.unit || 'kg' }}
                  </span>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="px-4 py-3">
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#594136] dark:text-slate-300 text-xs font-medium">
                {{ product.category }}
              </span>
            </td>

            <!-- Real-time Stock Bar with Color Threshold -->
            <td class="px-4 py-3">
              <div class="flex flex-col gap-1 max-w-[140px]">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-telemetry-code text-xs text-[#1b1c1a] dark:text-white font-bold">
                    {{ product.stock.toLocaleString('id-ID') }} {{ product.unit || 'kg' }}
                  </span>
                  <span 
                    :class="[
                      'font-telemetry-code text-[10px] font-bold px-1.5 py-0.2 rounded',
                      getStockRatio(product) < 0.25 ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300' :
                      getStockRatio(product) < 0.5 ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' :
                      'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    ]"
                  >
                    {{ Math.round(getStockRatio(product) * 100) }}%
                  </span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    :class="[
                      'h-full rounded-full transition-all duration-500',
                      getStockRatio(product) < 0.25 ? 'bg-red-500' :
                      getStockRatio(product) < 0.5 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    ]" 
                    :style="{ width: `${Math.min(100, Math.round(getStockRatio(product) * 100))}%` }"
                  ></div>
                </div>
              </div>
            </td>

            <!-- Unit Price -->
            <td class="px-4 py-3 font-telemetry-code text-xs text-[#1b1c1a] dark:text-slate-200 font-semibold">
              Rp {{ product.price.toLocaleString('id-ID') }}/{{ product.unit || 'kg' }}
            </td>

            <!-- Action Buttons: Edit (Update) & Hapus (Delete) -->
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button 
                  @click="$emit('openEditModal', product)"
                  class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#1b1c1a] dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                  type="button"
                  title="Update Data Produk (Ubah)"
                >
                  <span class="material-symbols-outlined text-[14px]">edit</span>
                  <span>Edit</span>
                </button>
                <button 
                  @click="$emit('openDeleteModal', product)"
                  class="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40 text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                  type="button"
                  title="Hapus Produk dari Inventaris (Delete)"
                >
                  <span class="material-symbols-outlined text-[14px]">delete</span>
                  <span>Hapus</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="!filteredProducts.length">
            <td colspan="5" class="text-center py-8 text-[#797067] dark:text-slate-400">
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

const filteredProducts = computed(() => {
  return adminStore.products.value.filter(p => {
    const matchesCategory = selectedCategory.value === 'Semua' || p.category === selectedCategory.value
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
