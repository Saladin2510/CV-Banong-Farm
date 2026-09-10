<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
      @click.self="$emit('close')"
    >
      <div class="bg-white dark:bg-[#161b22] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg overflow-hidden flex flex-col transition-colors">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-[#fbf9f6] dark:bg-[#1c2128]">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-cc-orange text-[22px]">
              {{ isEditMode ? 'edit_square' : 'add_circle' }}
            </span>
            <h3 class="text-base font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
              {{ isEditMode ? 'Edit Data Produk' : 'Tambah Produk Baru (Create)' }}
            </h3>
          </div>
          <button 
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
            type="button"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleSubmit" class="p-6 flex flex-col gap-4 text-sm bg-white dark:bg-[#161b22]">
          <!-- Product Name -->
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
              Nama Produk <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.name" 
              type="text" 
              required
              placeholder="Contoh: Pisang Cavendish Super"
              class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cc-orange focus:ring-2 focus:ring-cc-orange/20 transition-colors text-sm shadow-xs"
            />
          </div>

          <!-- Category & Icon -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Kategori <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="formData.category" 
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white focus:outline-none focus:border-cc-orange focus:ring-2 focus:ring-cc-orange/20 transition-colors text-sm shadow-xs cursor-pointer"
              >
                <option value="Peternakan Unggas">Peternakan Unggas</option>
                <option value="Perikanan Air Deras">Perikanan Air Deras</option>
                <option value="Daging Segar">Daging Segar</option>
                <option value="Sayur & Cabai">Sayur & Cabai</option>
                <option value="Buah-buahan">Buah-buahan</option>
                <option value="Biji Kopi">Biji Kopi</option>
                <option value="Produk Organik">Produk Organik</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Ikon Telemetri
              </label>
              <select 
                v-model="formData.icon" 
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white focus:outline-none focus:border-cc-orange focus:ring-2 focus:ring-cc-orange/20 transition-colors text-sm shadow-xs cursor-pointer"
              >
                <option value="egg">Telur Ternak (egg)</option>
                <option value="set_meal">Ikan Segar (set_meal)</option>
                <option value="nutrition">Daging Segar (nutrition)</option>
                <option value="local_fire_department">Cabai / Sayur (fire)</option>
                <option value="eco">Buah / Organik (eco)</option>
                <option value="coffee">Biji Kopi (coffee)</option>
                <option value="spa">Herbal / Rimpang (spa)</option>
              </select>
            </div>
          </div>

          <!-- Stock, Max Capacity & Unit -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Stok Fisik (pcs) <span class="text-red-500">*</span>
              </label>
              <input 
                v-model.number="formData.stock" 
                type="number" 
                min="0"
                required
                placeholder="100"
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors font-telemetry-code text-sm shadow-xs"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Kapasitas Maksimal (pcs)
              </label>
              <input 
                v-model.number="formData.maxStock" 
                type="number" 
                min="10"
                placeholder="5000"
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors font-telemetry-code text-sm shadow-xs"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Satuan Produk
              </label>
              <input 
                v-model="formData.unit" 
                type="text" 
                placeholder="pcs"
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors font-telemetry-code text-sm shadow-xs"
              />
            </div>
          </div>

          <!-- Price per unit -->
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
              Harga Satuan (Rp/{{ formData.unit || 'pcs' }}) <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-telemetry-code text-xs font-bold">Rp</span>
              <input 
                v-model.number="formData.price" 
                type="number" 
                min="100"
                required
                placeholder="25000"
                class="w-full h-11 pl-11 pr-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors font-telemetry-code text-sm shadow-xs"
              />
            </div>
          </div>

          <!-- Modal Action Buttons -->
          <div class="flex items-center justify-end gap-3 pt-5 border-t border-slate-200 dark:border-slate-700 mt-2">
            <button 
              type="button" 
              @click="$emit('close')"
              class="h-11 px-5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors text-xs"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="h-11 px-6 rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer text-xs bg-secondary-container text-primary hover:bg-accent-hover"
            >
              <span class="material-symbols-outlined text-[18px]">save</span>
              <span>{{ isEditMode ? 'Simpan Perubahan' : 'Tambah Produk Baru' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  productToEdit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isEditMode = computed(() => !!props.productToEdit)

const formData = ref({
  name: '',
  category: 'Peternakan Unggas',
  icon: 'egg',
  unit: 'pcs',
  stock: 0,
  maxStock: 5000,
  price: 20000
})

watch(() => props.productToEdit, (val) => {
  if (val) {
    formData.value = {
      name: val.name || '',
      category: val.category || 'Peternakan Unggas',
      icon: val.icon || 'egg',
      unit: val.unit || 'pcs',
      stock: val.stock !== undefined ? val.stock : 0,
      maxStock: val.maxStock || 5000,
      price: val.price || 20000
    }
  } else {
    formData.value = {
      name: '',
      category: 'Peternakan Unggas',
      icon: 'egg',
      unit: 'pcs',
      stock: 0,
      maxStock: 5000,
      price: 20000
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (!formData.value.name.trim()) return
  emit('save', {
    ...formData.value,
    id: props.productToEdit ? props.productToEdit.id : undefined
  })
}
</script>
