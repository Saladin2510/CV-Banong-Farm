<template>
  <div 
    class="group flex flex-col justify-between bg-white dark:bg-[#0c1a30] rounded-[20px] sm:rounded-[28px] p-2 sm:p-3.5 shadow-[0_6px_22px_rgba(2,36,72,0.06)] hover:shadow-[0_20px_42px_rgba(2,36,72,0.14)] transition-all duration-300 transform sm:hover:-translate-y-1.5 border border-slate-200/80 dark:border-slate-800"
  >
    <!-- Top Section: Inset Rounded Image Box + Text Info -->
    <div>
      <!-- Inset Image Container (Dribbble Reference Style, Compact on Mobile 2-Col) -->
      <div 
        class="relative w-full aspect-square sm:aspect-[4/3] rounded-[14px] sm:rounded-[20px] overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer"
        @click="$emit('select', product)"
      >
        <img 
          :src="product.image || '/assets/store/karung_1.jpeg'" 
          :alt="product.title || product.name" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          @error="$event.target.src = '/assets/store/karung_1.jpeg'"
        />

        <!-- Subtle Bottom Vignette for Micro Dots Visibility -->
        <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none"></div>

        <!-- Top-Left Pill Badge (Stock Status Pill) -->
        <div 
          :class="[
            'absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-sans font-bold tracking-tight shadow-xs backdrop-blur-md border transition-colors',
            product.inStock 
              ? 'bg-white/95 dark:bg-[#070D1E]/90 text-primary dark:text-white border-white/60 dark:border-slate-700/80' 
              : 'bg-amber-100/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-700'
          ]"
        >
          {{ product.stockBadge }}
        </div>

        <!-- Bottom-Center 3 Micro Dots Indicator -->
        <div class="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-black/20 backdrop-blur-[2px]">
          <span class="w-1.5 sm:w-2 h-1 sm:h-1.5 rounded-full bg-secondary-container shadow-2xs"></span>
          <span class="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/75"></span>
          <span class="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/55"></span>
        </div>
      </div>

      <!-- Product Details (Below Inset Image) -->
      <div class="px-1 sm:px-1.5 pt-2.5 sm:pt-3.5">
        <!-- Category Label -->
        <div class="text-[10px] sm:text-xs font-sans font-bold text-primary/70 dark:text-secondary-container tracking-wide mb-0.5 sm:mb-1 truncate">
          {{ product.category }}
        </div>

        <!-- Product Name -->
        <h3 
          @click="$emit('select', product)"
          class="font-sans font-extrabold text-xs sm:text-base text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-primary dark:hover:text-secondary-container transition-colors line-clamp-2 min-h-[2.5em]"
        >
          {{ product.title || product.name }}
        </h3>

        <!-- Price & Unit -->
        <div class="mt-1.5 sm:mt-2 flex flex-wrap items-baseline gap-x-1 gap-y-0">
          <span class="font-outfit font-bold text-sm sm:text-[18px] text-primary dark:text-white tracking-tight">
            {{ formatPrice(product.price) }}
          </span>
          <span class="font-sans text-[10px] sm:text-xs font-normal text-slate-500 dark:text-slate-400">
            / {{ product.unit }}
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Action Pill Button (Kuning Brand #fcd400 Sesuai Tombol Lainnya) -->
    <div class="px-0.5 sm:px-1 pt-2.5 sm:pt-3.5 pb-0.5">
      <button 
        @click.stop="handleAddToCart(product)"
        type="button"
        class="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-2.5 sm:px-5 rounded-full bg-secondary-container hover:bg-accent-hover text-primary font-sans text-[11px] sm:text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
      >
        <span class="material-symbols-outlined text-[15px] sm:text-[18px]">shopping_bag</span>
        <span class="truncate">Tambah ke Keranjang</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/useCartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const cartStore = useCartStore()

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value).replace('Rp', 'Rp ')
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product, 1)
  cartStore.openCart()
}
</script>
