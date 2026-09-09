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
      <div class="bg-white dark:bg-[#161b22] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md overflow-hidden flex flex-col p-6 transition-colors">
        <div class="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
          <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <h3 class="text-base font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
            Konfirmasi Hapus Produk
          </h3>
        </div>

        <p class="text-sm text-[#594136] dark:text-slate-300 leading-relaxed mb-4">
          Apakah Anda yakin ingin menghapus komoditas 
          <strong class="text-[#1b1c1a] dark:text-white font-bold">{{ product?.name }}</strong> 
          dari katalog inventaris?
          <span v-if="product && product.stock > 0" class="block mt-1 text-xs text-red-600 dark:text-red-400 font-telemetry-code">
            Peringatan: Masih terdapat {{ product.stock.toLocaleString('id-ID') }} kg stok fisik di gudang.
          </span>
        </p>

        <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button 
            type="button" 
            @click="$emit('close')"
            class="h-9 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1b1c1a] dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button 
            type="button" 
            @click="$emit('confirm', product?.id)"
            class="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
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
