<template>
  <section aria-label="Metrik Utama Operasional" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    
    <!-- Card 1: Pesanan WA Masuk -->
    <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 shadow-xs hover:shadow-md flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
            Pesanan WA Masuk
          </span>
          <span class="text-3xl text-primary dark:text-white tracking-tight mt-1.5 font-extrabold">
            {{ adminStore.totalOrdersCount.value.toLocaleString('id-ID') }}
          </span>
        </div>
        <div class="w-11 h-11 rounded-xl bg-secondary-container/20 flex items-center justify-center text-primary dark:text-secondary-container shrink-0 border border-secondary-container/30">
          <span class="material-symbols-outlined text-[24px]">chat</span>
        </div>
      </div>
      
      <div class="mt-4 pt-3 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-full bg-secondary-container text-primary font-bold text-xs">
            +12,4%
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400">Pertumbuhan pesanan</span>
        </div>
        <span class="text-[11px] text-slate-600 dark:text-slate-300 font-medium pt-0.5">
          Terhubung langsung ke WhatsApp Admin
        </span>
      </div>
    </div>

    <!-- Card 2: Total Stok Panen -->
    <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 shadow-xs hover:shadow-md flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
            Total Stok Panen
          </span>
          <span class="text-3xl text-primary dark:text-white tracking-tight mt-1.5 font-extrabold">
            {{ adminStore.totalStockTon.value }} <span class="text-base font-normal text-slate-500 dark:text-slate-400">Ton</span>
          </span>
        </div>
        <div class="w-11 h-11 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white shrink-0 border border-primary/20">
          <span class="material-symbols-outlined text-[24px]">inventory_2</span>
        </div>
      </div>

      <div class="mt-4 pt-3 flex flex-col gap-1.5 border-t border-slate-100 dark:border-slate-800">
        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-500 dark:text-slate-400">Kapasitas Gudang Terisi</span>
          <span class="text-primary dark:text-white font-bold">
            {{ adminStore.totalCapacityPercent.value }}%
          </span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            class="bg-secondary-container h-full rounded-full transition-all duration-500" 
            :style="{ width: `${adminStore.totalCapacityPercent.value}%` }"
          ></div>
        </div>
        <span class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
          Telur • Unggas • Daging • Ikan • Kasgot
        </span>
      </div>
    </div>

    <!-- Card 3: Total Pendapatan -->
    <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 shadow-xs hover:shadow-md flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
            Total Pendapatan
          </span>
          <span class="text-3xl text-primary dark:text-white tracking-tight mt-1.5 font-extrabold">
            Rp {{ adminStore.totalRevenueJuta.value }} <span class="text-base font-normal text-slate-500 dark:text-slate-400">Juta</span>
          </span>
        </div>
        <div class="w-11 h-11 rounded-xl bg-secondary-container/20 flex items-center justify-center text-primary dark:text-secondary-container shrink-0 border border-secondary-container/30">
          <span class="material-symbols-outlined text-[24px]">payments</span>
        </div>
      </div>

      <div class="mt-4 pt-3 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-full bg-secondary-container text-primary font-bold text-xs">
            +18,2%
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400">Target berjalan</span>
        </div>
        <span class="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate pt-0.5">
          Akumulasi transaksi komoditas panen
        </span>
      </div>
    </div>

    <!-- Card 4: Komoditas Aktif (Real Metric - No Fake AI Neural) -->
    <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 shadow-xs hover:shadow-md flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
            Komoditas Aktif
          </span>
          <span class="text-3xl text-primary dark:text-white tracking-tight mt-1.5 font-extrabold">
            {{ adminStore.products.value.length }} <span class="text-base font-normal text-slate-500 dark:text-slate-400">Produk</span>
          </span>
        </div>
        <div class="w-11 h-11 rounded-xl bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white shrink-0 border border-primary/20">
          <span class="material-symbols-outlined text-[24px]">inventory</span>
        </div>
      </div>

      <div class="mt-4 pt-3 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between gap-1">
          <span class="px-2 py-0.5 rounded-full bg-primary/10 dark:bg-white/15 text-primary dark:text-white text-xs font-bold leading-tight">
            Katalog Publik Siap
          </span>
          <span class="w-2 h-2 rounded-full bg-secondary-container shrink-0"></span>
        </div>
        <span class="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight pt-0.5 truncate">
          Tersedia &amp; terhubung form pemesanan
        </span>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useAdminStore } from '../../stores/useAdminStore'

const adminStore = useAdminStore()
</script>

