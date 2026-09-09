<template>
  <div id="wa-orders" class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
    <!-- Header -->
    <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[20px]">mark_chat_unread</span>
          <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
            Live Pesanan WhatsApp
          </h2>
        </div>
        <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
          Tiket pesanan masuk real-time dari mitra grosir &amp; ritel terverifikasi
        </p>
      </div>

      <span class="font-telemetry-code text-xs text-[#797067] dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold border border-slate-200 dark:border-slate-700">
        {{ (adminStore.whatsappOrders.value || []).length }} AKTIF
      </span>
    </div>

    <!-- Quick Simulation Action Strip -->
    <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg p-3 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span class="text-xs text-emerald-900 dark:text-emerald-300 font-medium">
          Sinkronisasi Stok Otomatis Aktif
        </span>
      </div>

      <button 
        @click="adminStore.simulateIncomingOrder()"
        class="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-telemetry-code text-xs font-semibold shadow-xs transition-all flex items-center gap-1 active:scale-95 shrink-0 cursor-pointer"
        type="button"
        title="Klik untuk mensimulasikan pesanan WhatsApp baru yang otomatis mengurangi stok produk terkait"
      >
        <span class="material-symbols-outlined text-[16px]">add_circle</span>
        <span>+ Simulasi Order Masuk</span>
      </button>
    </div>

    <!-- Live Toast Sync Alert (Appears when new WA order comes in) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="adminStore.lastSyncToast.value"
        class="bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 rounded-lg p-3 flex items-start gap-2.5 shadow-sm"
      >
        <span class="material-symbols-outlined text-emerald-700 dark:text-emerald-300 text-[18px] shrink-0 mt-0.5">check_circle</span>
        <div class="flex flex-col text-xs leading-snug">
          <span class="font-bold text-emerald-950 dark:text-emerald-200 font-telemetry-code">
            SINKRONISASI STOK BERHASIL: {{ adminStore.lastSyncToast.value.orderId }}
          </span>
          <span class="text-emerald-800 dark:text-emerald-300 mt-0.5">
            <strong>{{ adminStore.lastSyncToast.value.qty || 0 }} kg {{ adminStore.lastSyncToast.value.productName || 'Komoditas' }}</strong> 
            telah dipotong dari inventaris. Sisa stok: 
            <strong class="font-telemetry-code">{{ (adminStore.lastSyncToast.value.remainingStock || 0).toLocaleString('id-ID') }} kg</strong>.
          </span>
        </div>
      </div>
    </transition>

    <!-- Empty State -->
    <div 
      v-if="!adminStore.whatsappOrders.value || adminStore.whatsappOrders.value.length === 0" 
      class="p-8 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-2"
    >
      <span class="material-symbols-outlined text-slate-400 text-[36px]">inbox</span>
      <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Belum Ada Tiket Pesanan Masuk</p>
      <p class="text-xs text-slate-500 dark:text-slate-400">Klik tombol "+ Simulasi Order Masuk" di atas untuk menambahkan pesanan baru.</p>
    </div>

    <!-- Live Feed Items List -->
    <div v-else class="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
      <article 
        v-for="order in adminStore.whatsappOrders.value" 
        :key="order.id"
        class="p-3 bg-[#fbf9f6] dark:bg-[#0d1117] rounded-lg border border-cc-outline dark:border-slate-800 flex flex-col gap-1.5 hover:border-cc-orange/50 hover:bg-white dark:hover:bg-slate-800/60 transition-all shadow-xs"
      >
        <div class="flex items-center justify-between">
          <span class="font-telemetry-code text-xs text-cc-orange-strong font-bold">
            {{ order.id }}
          </span>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
            {{ order.status || 'Stok Terupdate Otomatis' }}
          </span>
        </div>

        <div class="flex flex-col">
          <span class="text-sm text-[#1b1c1a] dark:text-white font-semibold">
            {{ order.customer || 'Pelanggan WhatsApp' }}
          </span>
          <span class="text-xs text-[#594136] dark:text-slate-300">
            {{ (order.qty || 0).toLocaleString('id-ID') }} kg {{ order.productName || 'Komoditas Unggulan' }}
          </span>
        </div>

        <div class="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span class="text-[#797067] dark:text-slate-400 font-telemetry-code text-[11px]">
            {{ order.timeAgo || 'Baru saja' }}
          </span>
          <span class="font-telemetry-code text-sm font-bold text-[#1b1c1a] dark:text-white">
            Rp {{ (order.totalPrice || 0).toLocaleString('id-ID') }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '../../stores/useAdminStore'

const adminStore = useAdminStore()
</script>
