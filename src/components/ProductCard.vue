<template>
  <div 
    class="group flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-surface-container-high/60"
  >
    <!-- Product Image & Stock Badge -->
    <div class="relative w-full aspect-square overflow-hidden bg-surface-container-low cursor-pointer" @click="$emit('select', product)">
      <img 
        :src="product.image" 
        :alt="product.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      
      <!-- Dynamic Stock Pill -->
      <div 
        :class="[
          'absolute top-3 right-3 px-space-12 py-space-4 rounded-full font-label-sm text-label-sm font-semibold shadow-sm backdrop-blur-md',
          product.inStock 
            ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' 
            : 'bg-secondary-container text-on-secondary-container'
        ]"
      >
        {{ product.stockBadge }}
      </div>
    </div>

    <!-- Product Info & Actions -->
    <div class="p-space-20 flex flex-col flex-grow justify-between">
      <div>
        <div class="text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-wide font-medium">
          {{ product.category }}
        </div>
        <h3 
          @click="$emit('select', product)"
          class="font-headline-md text-headline-md text-primary font-semibold leading-snug cursor-pointer hover:text-navy-muted transition-colors line-clamp-2"
        >
          {{ product.title }}
        </h3>
        <div class="mt-space-12 font-headline-lg text-headline-lg text-primary font-bold">
          {{ formatPrice(product.price) }} 
          <span class="font-body-sm text-body-sm font-normal text-on-surface-variant">/ {{ product.unit }}</span>
        </div>
      </div>

      <div class="mt-space-20 pt-space-12 border-t border-surface-container-high">
        <a 
          :href="getWhatsAppLink(product)" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full inline-flex items-center justify-center gap-space-8 py-space-12 px-space-16 rounded-lg bg-whatsapp-green hover:bg-whatsapp-hover text-surface-pure font-label-md text-label-md font-semibold transition-all duration-200 shadow-sm active:scale-98"
        >
          <span class="material-symbols-outlined text-[18px]">chat</span>
          <span>Pesan via WA</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value).replace('Rp', 'Rp ')
}

const getWhatsAppLink = (product) => {
  const message = encodeURIComponent(`Halo CV Banong Farms, saya ingin memesan ${product.title} (${formatPrice(product.price)} / ${product.unit}). Apakah produk ini masih tersedia?`)
  return `https://wa.me/6281234567890?text=${message}`
}
</script>
