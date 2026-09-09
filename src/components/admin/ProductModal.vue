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
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#fbf9f6]">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-cc-orange text-[22px]">
              {{ isEditMode ? 'edit_square' : 'add_circle' }}
            </span>
            <h3 class="text-base font-bold text-[#1b1c1a] uppercase tracking-tight">
              {{ isEditMode ? 'Edit Data Produk' : 'Tambah Produk Baru' }}
            </h3>
          </div>
          <button 
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleSubmit" class="p-6 flex flex-col gap-4 text-sm">
          <!-- Product Name -->
          <div class="flex flex-col gap-1.5">
            <label class="font-medium text-[#1b1c1a] text-xs uppercase font-telemetry-code">
              Nama Produk <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.name" 
              type="text" 
              required
              placeholder="Contoh: Pisang Cavendish Super"
              class="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cc-orange focus:ring-1 focus:ring-cc-orange transition-colors"
            />
          </div>

          <!-- Category & Icon -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="font-medium text-[#1b1c1a] text-xs uppercase font-telemetry-code">
                Kategori <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="formData.category" 
                class="h-10 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-cc-orange focus:ring-1 focus:ring-cc-orange transition-colors"
              >
                <option value="Buah-buahan">Buah-buahan</option>
                <option value="Sayur & Cabai">Sayur & Cabai</option>
                <option value="Biji Kopi">Biji Kopi</option>
                <option value="Rimpang">Rimpang</option>
                <option value="Peternakan">Peternakan</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-medium text-[#1b1c1a] text-xs uppercase font-telemetry-code">
                Ikon Telemetri
              </label>
              <select 
                v-model="formData.icon" 
                class="h-10 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-cc-orange focus:ring-1 focus:ring-cc-orange transition-colors"
              >
                <option value="eco">Eco / Daun</option>
                <option value="local_fire_department">Cabai / Panas</option>
                <option value="coffee">Kopi</option>
                <option value="nutrition">Buah / Nutrisi</option>
                <option value="spa">Rimpang / Herbal</option>
                <option value="egg">Telur Ternak</option>
                <option value="set_meal">Ikan Segar</option>
              </select>
            </div>
          </div>

          <!-- Stock & Max Capacity -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="font-medium text-[#1b1c1a] text-xs uppercase font-telemetry-code">
                Stok Fisik (kg) <span class="text-red-500">*</span>
              </label>
              <input 
                v-model.number="formData.stock" 
                type="number" 
                min="0"
                required
                placeholder="1000"
                class="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cc-orange focus:ring-1 focus:ring-cc-orange transition-colors font-telemetry-code"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-medium text-[#1b1c1a] text-xs uppercase font-telemetry-code">
                Kapasitas Maksimal (kg)
              </label>
              <input 
                v-model.number="formData.maxStock" 
                type="number" 
                min="100"
                placeholder="15000"
                class="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cc-orange focus:ring-1 focus:ring-cc-orange transition-colors font-telemetry-code"
              />
            </div>
          </div>

          <!-- Price per kg -->
          <div class="flex flex-col gap-1.5">
            <label class="font-medium text-[#1b1c1a] text-xs uppercase font-telemetry-code">
              Harga Satuan (Rp/kg) <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-telemetry-code text-xs">Rp</span>
              <input 
                v-model.number="formData.price" 
                type="number" 
                min="100"
                required
                placeholder="25000"
                class="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cc-orange focus:ring-1 focus:ring-cc-orange transition-colors font-telemetry-code"
              />
            </div>
          </div>

          <!-- Modal Action Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
            <button 
              type="button" 
              @click="$emit('close')"
              class="h-10 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1b1c1a] font-medium transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              class="h-10 px-5 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[18px]">save</span>
              <span>{{ isEditMode ? 'Simpan Perubahan' : 'Tambah Produk' }}</span>
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
  category: 'Buah-buahan',
  icon: 'eco',
  stock: 1000,
  maxStock: 5000,
  price: 20000
})

watch(() => props.productToEdit, (val) => {
  if (val) {
    formData.value = {
      name: val.name || '',
      category: val.category || 'Buah-buahan',
      icon: val.icon || 'eco',
      stock: val.stock !== undefined ? val.stock : 1000,
      maxStock: val.maxStock || 10000,
      price: val.price || 20000
    }
  } else {
    formData.value = {
      name: '',
      category: 'Buah-buahan',
      icon: 'eco',
      stock: 1000,
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
