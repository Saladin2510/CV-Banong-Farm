<template>
  <section aria-label="Metrik Utama Operasional" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    
    <!-- Card 1: Pesanan WA Masuk -->
    <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-cc-outline dark:border-slate-800 hover:border-cc-orange/50 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="font-telemetry-code text-xs text-[#797067] dark:text-slate-400 uppercase font-semibold">
            Pesanan WA Masuk
          </span>
          <span class="text-3xl text-[#1b1c1a] dark:text-white tracking-tight mt-1 font-extrabold">
            {{ adminStore.totalOrdersCount.value.toLocaleString('id-ID') }}
          </span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-cc-orange shrink-0">
          <span class="material-symbols-outlined text-[22px]">chat</span>
        </div>
      </div>
      
      <div class="mt-4 pt-2 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            +12,4%
          </span>
          <span class="text-xs text-[#797067] dark:text-slate-400">vs siklus lalu</span>
        </div>
        <span class="font-telemetry-code text-[11px] text-cc-orange-strong font-semibold leading-tight pt-0.5">
          WA LANGSUNG: 88,4% TERARAHKAN OTOMATIS
        </span>
      </div>
    </div>

    <!-- Card 2: Update Stok Real-time -->
    <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-cc-outline dark:border-slate-800 hover:border-cc-orange/50 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="font-telemetry-code text-xs text-[#797067] dark:text-slate-400 uppercase font-semibold">
            Update Stok Real-time
          </span>
          <span class="text-3xl text-[#1b1c1a] dark:text-white tracking-tight mt-1 font-extrabold">
            {{ adminStore.totalStockTon.value }} <span class="text-base font-normal text-[#797067] dark:text-slate-400">Ton</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
          <span class="material-symbols-outlined text-[22px]">inventory_2</span>
        </div>
      </div>

      <div class="mt-4 pt-2 flex flex-col gap-1.5 border-t border-slate-100 dark:border-slate-800">
        <div class="flex justify-between items-center text-xs">
          <span class="text-[#797067] dark:text-slate-400">Kapasitas Gudang Dingin</span>
          <span class="font-telemetry-code text-[#1b1c1a] dark:text-white font-bold">
            {{ adminStore.totalCapacityPercent.value }}%
          </span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            class="bg-cc-orange h-full rounded-full transition-all duration-500" 
            :style="{ width: `${adminStore.totalCapacityPercent.value}%` }"
          ></div>
        </div>
        <span class="text-[11px] text-[#797067] dark:text-slate-400 truncate">
          Buah Naga • Cabai Rawit • Kopi Robusta
        </span>
      </div>
    </div>

    <!-- Card 3: Total Pendapatan -->
    <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-cc-outline dark:border-slate-800 hover:border-cc-orange/50 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="font-telemetry-code text-xs text-[#797067] dark:text-slate-400 uppercase font-semibold">
            Total Pendapatan
          </span>
          <span class="text-3xl text-[#1b1c1a] dark:text-white tracking-tight mt-1 font-extrabold">
            Rp {{ adminStore.totalRevenueJuta.value }} <span class="text-base font-normal text-[#797067] dark:text-slate-400">Juta</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#1b1c1a] dark:text-slate-200 shrink-0">
          <span class="material-symbols-outlined text-[22px]">payments</span>
        </div>
      </div>

      <div class="mt-4 pt-2 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            +18,2%
          </span>
          <span class="text-xs text-[#797067] dark:text-slate-400">target berjalan</span>
        </div>
        <span class="font-telemetry-code text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold truncate pt-0.5">
          TERKUMPUL: 92% OPTIMAL
        </span>
      </div>
    </div>

    <!-- Card 4: Skor Pemasaran AI -->
    <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-cc-outline dark:border-slate-800 hover:border-cc-orange/50 transition-all">
      <div class="flex items-start justify-between gap-2">
        <div class="flex flex-col">
          <span class="font-telemetry-code text-xs text-[#797067] dark:text-slate-400 uppercase font-semibold">
            Skor Pemasaran AI
          </span>
          <span class="text-3xl text-[#1b1c1a] dark:text-white tracking-tight mt-1 font-extrabold">
            94,8 <span class="text-base font-normal text-[#797067] dark:text-slate-400">/ 100</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
          <span class="material-symbols-outlined text-[22px]">auto_graph</span>
        </div>
      </div>

      <div class="mt-4 pt-2 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between gap-1">
          <span class="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-telemetry-code text-[10px] uppercase font-bold leading-tight">
            NEURAL-V4 OPTIMAL
          </span>
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
        </div>
        <span class="font-telemetry-code text-[11px] text-cc-orange-strong font-semibold leading-tight pt-0.5 truncate">
          LONJAKAN PERMINTAAN TINGGI (Panen #8)
        </span>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useAdminStore } from '../../stores/useAdminStore'

const adminStore = useAdminStore()
</script>
