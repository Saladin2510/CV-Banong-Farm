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
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col p-6">
        <div class="flex items-center gap-3 text-red-600 mb-3">
          <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <h3 class="text-base font-bold text-[#1b1c1a] uppercase tracking-tight">
            Konfirmasi Hapus Produk
          </h3>
        </div>

        <p class="text-sm text-[#594136] leading-relaxed mb-4">
          Apakah Anda yakin ingin menghapus komoditas 
          <strong class="text-[#1b1c1a]">{{ product?.name }}</strong> 
          dari katalog inventaris?
          <span v-if="product && product.stock > 0" class="block mt-1 text-xs text-red-600 font-telemetry-code">
            Peringatan: Masih terdapat {{ product.stock.toLocaleString('id-ID') }} kg stok fisik di gudang.
          </span>
        </p>

        <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button 
            type="button" 
            @click="$emit('close')"
            class="h-9 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1b1c1a] text-xs font-medium transition-colors"
          >
            Batal
          </button>
          <button 
            type="button" 
            @click="$emit('confirm', product?.id)"
            class="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">delete</span>
            <span>Hapus Permanen</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  }
})

defineEmits(['close', 'confirm'])
</script>
