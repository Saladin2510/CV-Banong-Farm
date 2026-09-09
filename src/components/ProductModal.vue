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
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="relative w-full max-w-lg bg-surface-pure dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border dark:border-slate-800 transition-colors">
        <!-- Close Button -->
        <button 
          @click="close"
          class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <!-- Product Image Header -->
        <div class="relative w-full h-56 bg-surface-container-low dark:bg-slate-950 overflow-hidden">
          <img 
            :src="product.image" 
            :alt="product.title" 
            class="w-full h-full object-cover"
          />
          <div 
            :class="[
              'absolute bottom-3 left-3 px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold shadow-md border',
              product.inStock 
                ? 'bg-white/90 dark:bg-slate-900/90 text-primary dark:text-white border-primary/20 dark:border-slate-600' 
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-700'
            ]"
          >
            {{ product.stockBadge }}
          </div>
        </div>

        <!-- Details Content -->
        <div class="p-6 flex flex-col overflow-y-auto">
          <div class="text-on-surface-variant dark:text-slate-400 font-label-sm text-label-sm uppercase tracking-wide">
            {{ product.category }}
          </div>
          <h3 class="font-headline-lg text-headline-lg text-primary dark:text-white font-bold mt-1">
            {{ product.title }}
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mt-2">
            {{ product.description }}
          </p>

          <div class="mt-4 p-4 rounded-xl bg-surface-subtle dark:bg-slate-800/80 flex items-center justify-between border border-surface-container-high dark:border-slate-700">
            <div>
              <div class="text-xs text-on-surface-variant dark:text-slate-400">Harga Satuan:</div>
              <div class="font-headline-md text-headline-md text-primary dark:text-secondary-container font-bold">
                {{ formatPrice(product.price) }} / {{ product.unit }}
              </div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-3 bg-surface-pure dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-surface-container-high dark:border-slate-700">
              <button 
                @click="quantity > 1 ? quantity-- : null"
                class="w-7 h-7 rounded bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container dark:hover:bg-slate-700 text-primary dark:text-white font-bold flex items-center justify-center transition-colors disabled:opacity-40"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <span class="font-semibold text-primary dark:text-white w-6 text-center">{{ quantity }}</span>
              <button 
                @click="quantity++"
                class="w-7 h-7 rounded bg-surface-container-low dark:bg-slate-800 hover:bg-surface-container dark:hover:bg-slate-700 text-primary dark:text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="mt-4 flex items-center justify-between text-sm">
            <span class="text-on-surface-variant dark:text-slate-400 font-medium">Estimasi Total:</span>
            <span class="font-headline-md text-headline-md text-primary dark:text-secondary-container font-extrabold">
              {{ formatPrice(product.price * quantity) }}
            </span>
          </div>

          <!-- WhatsApp Order Button (60-30-10 Accent Conversion) -->
          <a 
            :href="whatsappOrderUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-98 tracking-wide"
          >
            <span class="material-symbols-outlined text-[22px]">chat</span>
            <span>Pesan {{ quantity }} {{ product.unit }} via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  product: Object
})

const emit = defineEmits(['close'])

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

const whatsappOrderUrl = computed(() => {
  if (!props.product) return '#'
  const total = formatPrice(props.product.price * quantity.value)
  const text = encodeURIComponent(
    `Halo CV Banong Farms,\n\nSaya ingin memesan:\n- Produk: ${props.product.title}\n- Jumlah: ${quantity.value} ${props.product.unit}\n- Total: ${total}\n\nMohon informasi ketersediaan dan proses pengiriman ke Ajibarang/sekitarnya. Terima kasih!`
  )
  return `https://wa.me/6281234567890?text=${text}`
})
</script>
