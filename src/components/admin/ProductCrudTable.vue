<template>
  <div id="products-crud" class="bg-white rounded-xl p-5 border border-cc-outline shadow-sm flex flex-col gap-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-cc-orange-strong text-[20px]">inventory</span>
          <h2 class="text-lg font-bold text-[#1b1c1a] uppercase tracking-tight">
            Katalog &amp; CRUD Produk
          </h2>
        </div>
        <p class="text-xs text-[#797067] mt-0.5">
          Manajemen inventaris hasil bumi aktif dengan penyesuaian langsung
        </p>
      </div>

      <!-- Add New Product Button -->
      <button 
        @click="$emit('openAddModal')"
        class="h-9 px-4 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto active:scale-95"
        type="button"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>+ Tambah Produk Baru</span>
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
            ? 'bg-[#1b1c1a] text-white font-semibold shadow-xs' 
            : 'bg-slate-100 text-[#594136] hover:bg-slate-200'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Table Container with Horizontal Scroll Protection -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[560px]">
        <thead>
          <tr class="bg-orange-50/60 border-b border-slate-200">
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold">
              Nama Produk
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold">
              Kategori
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold">
              Stok Saat Ini
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold">
              Harga Satuan
            </th>
            <th class="px-4 py-2.5 font-telemetry-code text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm">
          <tr 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="hover:bg-[#fbf9f6] transition-colors"
          >
            <!-- Product Name & Icon -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-md bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <span class="material-symbols-outlined text-[18px]">{{ product.icon || 'eco' }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold text-[#1b1c1a] leading-tight">
                    {{ product.name }}
                  </span>
                  <span class="font-telemetry-code text-[10px] text-[#797067]">
                    ID: #PRD-{{ product.id }} • Terjual: {{ (product.soldCount || 0).toLocaleString('id-ID') }} kg
                  </span>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="px-4 py-3">
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#594136] text-xs font-medium">
                {{ product.category }}
              </span>
            </td>

            <!-- Real-time Stock Bar with Color Threshold -->
            <td class="px-4 py-3">
              <div class="flex flex-col gap-1 max-w-[140px]">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-telemetry-code text-xs text-[#1b1c1a] font-bold">
                    {{ product.stock.toLocaleString('id-ID') }} kg
                  </span>
                  <span 
                    :class="[
                      'font-telemetry-code text-[10px] font-bold px-1.5 py-0.2 rounded',
                      getStockRatio(product) < 0.25 ? 'bg-red-100 text-red-700' :
                      getStockRatio(product) < 0.5 ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    ]"
                  >
                    {{ Math.round(getStockRatio(product) * 100) }}%
                  </span>
                </div>
                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
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
            <td class="px-4 py-3 font-telemetry-code text-xs text-[#1b1c1a] font-semibold">
              Rp {{ product.price.toLocaleString('id-ID') }}/kg
            </td>

            <!-- Action Buttons: Edit & Hapus -->
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button 
                  @click="$emit('openEditModal', product)"
                  class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[#1b1c1a] text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95"
                  type="button"
                  title="Edit Data Produk"
                >
                  <span class="material-symbols-outlined text-[14px]">edit</span>
                  <span>Edit</span>
                </button>
                <button 
                  @click="$emit('openDeleteModal', product)"
                  class="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95"
                  type="button"
                  title="Hapus Produk"
                >
                  <span class="material-symbols-outlined text-[14px]">delete</span>
                  <span>Hapus</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="!filteredProducts.length">
            <td colspan="5" class="text-center py-8 text-[#797067]">
              <div class="flex flex-col items-center justify-center gap-2">
                <span class="material-symbols-outlined text-4xl text-slate-300">inventory_2</span>
                <span class="text-sm font-medium">Tidak ada produk ditemukan</span>
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

const categories = ['Semua', 'Buah-buahan', 'Sayur & Cabai', 'Biji Kopi', 'Rimpang']

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
