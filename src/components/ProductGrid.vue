<template>
  <section class="w-full bg-surface-pure py-space-48 lg:py-space-64" id="katalog-produk">
    <div class="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-32 gap-space-16 animate-fade-in-up">
        <div>
          <div class="inline-flex items-center gap-space-8 px-space-12 py-space-4 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm font-semibold mb-space-8 border border-secondary-container/30">
            <span class="material-symbols-outlined text-[16px] text-secondary">eco</span>
            <span>Langsung dari Peternakan Ajibarang</span>
          </div>
          <h2 class="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-bold tracking-tight">
            Katalog Segar Hari Ini
          </h2>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-md">
          Produk hasil panen harian peternakan ramah lingkungan. Dikelola higienis tanpa hormon &amp; bahan aditif sintetis.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 mb-space-32 overflow-x-auto pb-2 scrollbar-none animate-fade-in">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          :class="[
            'px-5 py-2.5 rounded-full font-label-md text-label-md transition-all duration-300 whitespace-nowrap active:scale-95 shadow-xs',
            selectedCategory === cat.id
              ? 'bg-primary text-on-primary font-semibold shadow-md translate-y-[-1px]'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-medium'
          ]"
        >
          {{ cat.name }}
          <span class="ml-1 text-xs opacity-75">
            ({{ getCategoryCount(cat.id) }})
          </span>
        </button>
      </div>

      <!-- 4-Column Product Grid with Fade Animation -->
      <transition-group
        tag="div"
        name="product-grid"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-24"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @select="handleProductSelect"
        />
      </transition-group>

      <!-- Trust Bar / Farm-to-Table Highlights -->
      <div 
        class="mt-space-64 p-space-32 rounded-xl bg-surface-subtle flex flex-col lg:flex-row items-center justify-between gap-space-24 shadow-xs border border-surface-container-high/70 animate-fade-in-up" 
        id="tentang-kami"
      >
        <div class="flex items-center gap-space-20">
          <div class="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 shadow-xs border border-primary-container/20">
            <span class="material-symbols-outlined text-primary text-[28px]">agriculture</span>
          </div>
          <div>
            <div class="font-headline-md text-headline-md text-primary font-bold">
              Peternakan Beretika di Ajibarang
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Pakan alami, sanitasi berstandar veteriner, dan pengiriman rantai dingin langsung ke rumah tangga maupun mitra kuliner.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-space-16 flex-shrink-0 flex-wrap sm:flex-nowrap">
          <span class="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold bg-surface-pure px-3.5 py-2 rounded-full border border-surface-container shadow-xs">
            <span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
            Tanpa Pengawet
          </span>
          <span class="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold bg-surface-pure px-3.5 py-2 rounded-full border border-surface-container shadow-xs">
            <span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
            Halal &amp; Higienis
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'

const emit = defineEmits(['openModal'])

const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'unggas', name: 'Peternakan Unggas' },
  { id: 'daging', name: 'Daging Segar' },
  { id: 'ikan', name: 'Perikanan Air Deras' },
  { id: 'organik', name: 'Produk Organik' }
]

const products = [
  {
    id: 1,
    title: 'Telur Ayam Kampung Premium',
    category: 'Peternakan Unggas',
    categoryId: 'unggas',
    price: 32000,
    unit: 'tray',
    stockBadge: 'Sisa 8 pack',
    inStock: false,
    image: '/assets/product-eggs.png',
    description: 'Telur ayam kampung organik dari peternakan sistem bebas sangkar di Ajibarang. Dipanen harian, kaya akan nutrisi dan omega-3.'
  },
  {
    id: 2,
    title: 'Ayam Organik Utuh Segar',
    category: 'Daging Segar',
    categoryId: 'daging',
    price: 48000,
    unit: 'ekor',
    stockBadge: 'Tersedia',
    inStock: true,
    image: '/assets/product-chicken.png',
    description: 'Ayam karkas organik utuh yang dibesarkan dengan pakan alami tanpa hormon pertumbuhan. Daging tebal, empuk, dan segar.'
  },
  {
    id: 3,
    title: 'Ikan Nila Segar Kolam Bersih',
    category: 'Perikanan Air Deras',
    categoryId: 'ikan',
    price: 35000,
    unit: 'kg',
    stockBadge: 'Sisa 12 kg',
    inStock: false,
    image: '/assets/product-fish.png',
    description: 'Ikan nila hitam pilihan dari kolam air deras mengalir Ajibarang. Daging gurih, tidak berbau lumpur, dan dipanen langsung sesuai pesanan.'
  },
  {
    id: 4,
    title: 'Telur Bebas Antibiotik (Harian)',
    category: 'Peternakan Unggas',
    categoryId: 'unggas',
    price: 28500,
    unit: 'kg',
    stockBadge: 'Sisa 5 tray',
    inStock: false,
    image: '/assets/product-eggs.png',
    description: 'Telur ayam ras konsumsi harian berkualitas tinggi, dipelihara dengan standar kesehatan ketat tanpa residu antibiotika.'
  },
  {
    id: 5,
    title: 'Daging Bebek Karkas Organik',
    category: 'Daging Segar',
    categoryId: 'daging',
    price: 62000,
    unit: 'ekor',
    stockBadge: 'Sisa 4 ekor',
    inStock: false,
    image: '/assets/product-duck.png',
    description: 'Daging bebek potong segar harian dari peternakan Ajibarang. Daging gurih, rendah lemak, dan cocok untuk restoran atau konsumsi keluarga.'
  },
  {
    id: 6,
    title: 'Fillet Ikan Gurame Segar',
    category: 'Perikanan Air Deras',
    categoryId: 'ikan',
    price: 55000,
    unit: 'kg',
    stockBadge: 'Tersedia',
    inStock: true,
    image: '/assets/product-gurame.png',
    description: 'Fillet ikan gurame segar tanpa duri dari kolam air deras Ajibarang. Higienis, dikemas vakum rantai dingin siap olah.'
  },
  {
    id: 7,
    title: 'Pupuk Kasgot Super Organik',
    category: 'Produk Organik',
    categoryId: 'organik',
    price: 25000,
    unit: 'karung 10kg',
    stockBadge: 'Tersedia',
    inStock: true,
    image: '/assets/product-fertilizer.png',
    description: 'Pupuk organik hayati hasil pengolahan limbah maggot peternakan berkelanjutan. Sangat cocok untuk tanaman buah, sayur, dan hias.'
  },
  {
    id: 8,
    title: 'Dada Ayam Fillet Segar',
    category: 'Daging Segar',
    categoryId: 'daging',
    price: 52000,
    unit: 'kg',
    stockBadge: 'Sisa 10 kg',
    inStock: false,
    image: '/assets/product-chicken.png',
    description: 'Potongan dada ayam fillet tanpa kulit dan tulang. Tinggi protein, cocok untuk diet sehat dan katering.'
  },
  {
    id: 9,
    title: 'Telur Bebek Bio-Organik',
    category: 'Peternakan Unggas',
    categoryId: 'unggas',
    price: 38000,
    unit: 'tray',
    stockBadge: 'Sisa 6 pack',
    inStock: false,
    image: '/assets/product-eggs.png',
    description: 'Telur bebek pilihan dari bebek angon alami. Kuning telur pekat dan kaya nutrisi untuk martabak atau telur asin.'
  },
  {
    id: 10,
    title: 'Ikan Lele Sangkuriang Segar',
    category: 'Perikanan Air Deras',
    categoryId: 'ikan',
    price: 26000,
    unit: 'kg',
    stockBadge: 'Tersedia',
    inStock: true,
    image: '/assets/product-fish.png',
    description: 'Ikan lele sangkuriang konsumsi dari kolam bioflok bersih. Daging manis tanpa rasa tanah.'
  },
  {
    id: 11,
    title: 'Hati & Ampela Ayam Segar',
    category: 'Daging Segar',
    categoryId: 'daging',
    price: 18000,
    unit: 'pack',
    stockBadge: 'Panen Besok',
    inStock: false,
    image: '/assets/product-chicken.png',
    description: 'Hati dan ampela ayam segar harian yang sudah dibersihkan secara higienis.'
  },
  {
    id: 12,
    title: 'Telur Ayam Omega-3 Gold',
    category: 'Peternakan Unggas',
    categoryId: 'unggas',
    price: 42000,
    unit: 'tray',
    stockBadge: 'Stok Terbatas',
    inStock: false,
    image: '/assets/product-eggs.png',
    description: 'Telur ayam bernutrisi tinggi yang diperkaya omega-3 alami dari pakan biji-bijian pilihan.'
  }
]

const getCategoryCount = (catId) => {
  if (catId === 'all') return products.length
  return products.filter(p => p.categoryId === catId).length
}

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products
  return products.filter(p => p.categoryId === selectedCategory.value)
})

const handleProductSelect = (product) => {
  emit('openModal', product)
}
</script>

<style scoped>
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.4s ease;
}
.product-grid-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.product-grid-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
