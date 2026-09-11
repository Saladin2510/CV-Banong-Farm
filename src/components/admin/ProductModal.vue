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

          <!-- Product Image Upload / Select -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[17px] text-primary dark:text-secondary-container">image</span>
                Foto / Gambar Produk <span class="text-xs font-normal text-slate-400 dark:text-slate-500">(Tampil di Kartu Katalog)</span>
              </label>
              <button 
                v-if="formData.image" 
                type="button" 
                @click="removeImage" 
                class="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span class="material-symbols-outlined text-[15px]">delete</span>
                Hapus Foto
              </button>
            </div>

            <!-- Upload Area & Preview Container -->
            <div class="flex flex-col sm:flex-row gap-3 items-stretch">
              <!-- Live Preview Box -->
              <div 
                v-if="formData.image" 
                class="w-full sm:w-28 h-28 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 overflow-hidden relative group shrink-0 flex items-center justify-center shadow-xs"
              >
                <img 
                  :src="formData.image" 
                  alt="Preview Produk" 
                  class="w-full h-full object-cover" 
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    type="button" 
                    @click="triggerFileInput" 
                    class="p-1.5 rounded-lg bg-white/90 text-slate-800 hover:bg-white text-xs font-bold transition-all shadow-xs cursor-pointer" 
                    title="Ganti Foto"
                  >
                    <span class="material-symbols-outlined text-[18px]">cached</span>
                  </button>
                </div>
              </div>

              <!-- Drag/Click Upload Dropzone -->
              <div 
                @click="triggerFileInput" 
                @dragover.prevent="isDragging = true" 
                @dragleave.prevent="isDragging = false" 
                @drop.prevent="handleDrop"
                :class="[
                  'flex-1 border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[90px]',
                  isDragging 
                    ? 'border-primary dark:border-secondary-container bg-primary/5 dark:bg-white/5' 
                    : 'border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-secondary-container bg-slate-50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800'
                ]"
              >
                <input 
                  ref="fileInputRef" 
                  type="file" 
                  accept="image/*" 
                  @change="handleFileChange" 
                  class="hidden" 
                />
                <span class="material-symbols-outlined text-[26px] text-primary dark:text-secondary-container mb-0.5">
                  cloud_upload
                </span>
                <span class="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {{ formData.image ? 'Klik untuk mengganti file foto' : 'Pilih / Seret File Foto dari Komputer' }}
                </span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Format JPG, PNG, WEBP (Otomatis dikonversi ke resolusi kartu)
                </span>
              </div>
            </div>

            <!-- Optional Preset / Direct URL Input Toggle -->
            <div class="mt-1 flex flex-col gap-2">
              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span class="font-medium">Atau pilih dari foto panen bawaan:</span>
                <button 
                  type="button" 
                  @click="showUrlInput = !showUrlInput" 
                  class="text-primary dark:text-secondary-container hover:underline font-semibold"
                >
                  {{ showUrlInput ? 'Sembunyikan URL' : '+ Masukkan URL Gambar' }}
                </button>
              </div>

              <!-- Quick Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  v-for="preset in presetImages"
                  :key="preset.path"
                  type="button"
                  @click="formData.image = preset.path"
                  :class="[
                    'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all shrink-0 flex items-center gap-1.5 cursor-pointer',
                    formData.image === preset.path 
                      ? 'border-primary bg-primary/10 text-primary dark:text-secondary-container font-bold' 
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  ]"
                >
                  <img :src="preset.path" class="w-4 h-4 rounded-full object-cover" />
                  <span>{{ preset.label }}</span>
                </button>
              </div>

              <!-- Direct URL input if needed -->
              <div v-if="showUrlInput" class="flex gap-2">
                <input 
                  v-model="formData.image" 
                  type="url" 
                  placeholder="https://contoh.com/gambar-produk.jpg" 
                  class="flex-1 h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>
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
const fileInputRef = ref(null)
const isDragging = ref(false)
const showUrlInput = ref(false)

const presetImages = [
  { label: 'Telur', path: '/assets/product-eggs.png' },
  { label: 'Bebek', path: '/assets/product-duck.png' },
  { label: 'Ikan Lele', path: '/assets/product-fish.png' },
  { label: 'Ayam Segar', path: '/assets/product-chicken.png' },
  { label: 'Kasgot/Pupuk', path: '/assets/product-fertilizer.png' },
  { label: 'Kebun/Panen', path: '/assets/farm-poultry-marquee.jpg' }
]

const formData = ref({
  name: '',
  category: 'Peternakan Unggas',
  icon: 'egg',
  unit: 'pcs',
  stock: 0,
  maxStock: 5000,
  price: 20000,
  image: ''
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
      price: val.price || 20000,
      image: val.image || ''
    }
  } else {
    formData.value = {
      name: '',
      category: 'Peternakan Unggas',
      icon: 'egg',
      unit: 'pcs',
      stock: 0,
      maxStock: 5000,
      price: 20000,
      image: ''
    }
  }
}, { immediate: true })

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const handleFileChange = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    processImageFile(file)
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files?.[0]
  if (file && file.type.startsWith('image/')) {
    processImageFile(file)
  }
}

const processImageFile = (file) => {
  const reader = new FileReader()
  reader.onload = (event) => {
    // Compress image slightly if large using canvas
    const img = new Image()
    img.onload = () => {
      const maxDim = 800
      let { width, height } = img
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      formData.value.image = canvas.toDataURL('image/jpeg', 0.85)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  formData.value.image = ''
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleSubmit = () => {
  if (!formData.value.name.trim()) return
  // Fallback preset if image not provided
  let finalImage = formData.value.image
  if (!finalImage) {
    const cat = formData.value.category.toLowerCase()
    if (cat.includes('ikan')) finalImage = '/assets/product-fish.png'
    else if (cat.includes('daging')) finalImage = '/assets/product-chicken.png'
    else if (cat.includes('unggas')) finalImage = '/assets/product-eggs.png'
    else finalImage = '/assets/product-fertilizer.png'
  }

  emit('save', {
    ...formData.value,
    image: finalImage,
    id: props.productToEdit ? props.productToEdit.id : undefined
  })
}
</script>
