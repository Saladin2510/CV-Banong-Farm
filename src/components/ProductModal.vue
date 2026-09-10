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
      v-if="isOpen && product" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      @click.self="close"
    >
      <div class="relative w-full max-w-lg bg-surface-pure dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-surface-container-high dark:border-slate-800 transition-colors">
        <!-- Close Button -->
        <button 
          @click="close"
          class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <!-- Product Image Header -->
        <div class="relative w-full h-56 bg-surface-container-low dark:bg-slate-950 overflow-hidden shrink-0">
          <img 
            :src="product.image" 
            :alt="product.title || product.name" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div class="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div class="flex flex-col">
              <span class="text-xs uppercase tracking-wider text-secondary-container font-bold font-telemetry-code">
                {{ product.category || 'Pakan Ternak' }}
              </span>
              <h3 class="text-xl font-bold text-white leading-snug">
                {{ product.title || product.name }}
              </h3>
            </div>

            <span 
              :class="[
                'px-3 py-1 rounded-full text-xs font-semibold shadow-md shrink-0 border font-telemetry-code',
                (product.stock > 0) 
                  ? 'bg-primary/90 text-secondary-container border-blue-400/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              ]"
            >
              Stok: {{ (product.stock || 0).toLocaleString('id-ID') }} {{ product.unit || 'kg' }}
            </span>
          </div>
        </div>

        <!-- Product Details & Add to Cart -->
        <div class="p-6 flex flex-col gap-4">
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ product.description || 'Komoditas dan pakan ternak berkualitas tinggi diproduksi dengan standar higienis dan nutrisi teruji dari CV Banong Farms Ajibarang.' }}
          </p>

          <!-- Quantity Controls & Price Summary -->
          <div class="p-4 rounded-xl bg-surface-subtle dark:bg-slate-800/80 border border-surface-container-high dark:border-slate-700 flex items-center justify-between">
            <div>
              <div class="text-[11px] text-on-surface-variant dark:text-slate-400">Harga Satuan:</div>
              <div class="font-bold text-base text-primary dark:text-white font-telemetry-code">
                {{ formatPrice(product.price) }} / {{ product.unit || 'kg' }}
              </div>
            </div>

            <!-- Quantity Stepper -->
            <div class="flex items-center gap-2 bg-surface-pure dark:bg-slate-900 px-3 py-1 rounded-lg border border-surface-container-high dark:border-slate-700">
              <button 
                type="button"
                @click="quantity > 1 ? quantity-- : null"
                class="w-7 h-7 rounded bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container text-primary dark:text-white font-bold flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <input 
                v-model.number="quantity" 
                type="number" 
                min="1" 
                :max="product.stock || 9999"
                class="w-12 text-center font-bold text-sm bg-transparent text-primary dark:text-white focus:outline-none font-telemetry-code"
              />
              <button 
                type="button"
                @click="quantity < (product.stock || 9999) ? quantity++ : null"
                class="w-7 h-7 rounded bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container text-primary dark:text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <!-- Total Calculation Row -->
          <div class="flex items-center justify-between px-1 text-sm">
            <span class="text-on-surface-variant dark:text-slate-400 font-medium">Subtotal ({{ quantity }} {{ product.unit || 'pcs' }}):</span>
            <span class="font-extrabold text-xl text-primary dark:text-secondary-container font-telemetry-code">
              {{ formatPrice(product.price * quantity) }}
            </span>
          </div>

          <!-- Action Button: Tambah ke Keranjang -->
          <button 
            type="button"
            @click="handleAddToCart"
            class="mt-2 w-full h-12 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 tracking-wide"
          >
            <span class="material-symbols-outlined text-[22px]">add_shopping_cart</span>
            <span>+ Tambah ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCartStore } from '../stores/useCartStore'

const props = defineProps({
  isOpen: Boolean,
  product: Object
})

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const quantity = ref(1)

watch(() => props.product, () => {
  quantity.value = 1
})

const close = () => {
  emit('close')
}

const formatPrice = (value) => {
  if (!value) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value).replace('Rp', 'Rp ')
}

const handleAddToCart = () => {
  if (!props.product) return
  cartStore.addToCart(props.product, quantity.value)
  emit('close')
  cartStore.openCart()
}
</script>
