<template>
  <div id="wa-orders" class="bg-white rounded-xl p-5 border border-cc-outline shadow-sm flex flex-col gap-4">
    <!-- Header -->
    <div class="flex items-start justify-between border-b border-slate-100 pb-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-600 text-[20px]">mark_chat_unread</span>
          <h2 class="text-lg font-bold text-[#1b1c1a] uppercase tracking-tight">
            Live Pesanan WhatsApp
          </h2>
        </div>
        <p class="text-xs text-[#797067] mt-0.5">
          Tiket pesanan masuk real-time dari mitra grosir &amp; ritel terverifikasi
        </p>
      </div>

      <span class="font-telemetry-code text-xs text-[#797067] bg-slate-100 px-2 py-0.5 rounded font-semibold">
        {{ adminStore.whatsappOrders.value.length }} AKTIF
      </span>
    </div>

    <!-- Quick Simulation Action Strip -->
    <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span class="text-xs text-emerald-900 font-medium">
          Sinkronisasi Stok Otomatis Aktif
        </span>
      </div>

      <button 
        @click="adminStore.simulateIncomingOrder()"
        class="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-telemetry-code text-xs font-semibold shadow-xs transition-all flex items-center gap-1 active:scale-95 shrink-0"
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
        class="bg-emerald-100 border border-emerald-300 rounded-lg p-3 flex items-start gap-2.5 shadow-sm"
      >
        <span class="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">check_circle</span>
        <div class="flex flex-col text-xs leading-snug">
          <span class="font-bold text-emerald-950 font-telemetry-code">
            SINKRONISASI STOK BERHASIL: {{ adminStore.lastSyncToast.value.orderId }}
          </span>
          <span class="text-emerald-800 mt-0.5">
            <strong>{{ adminStore.lastSyncToast.value.qty }} kg {{ adminStore.lastSyncToast.value.productName }}</strong> 
            telah dipotong dari inventaris. Sisa stok: 
            <strong class="font-telemetry-code">{{ adminStore.lastSyncToast.value.remainingStock.toLocaleString('id-ID') }} kg</strong>.
          </span>
        </div>
      </div>
    </transition>

    <!-- Live Feed Items List -->
    <div class="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
      <article 
        v-for="order in adminStore.whatsappOrders.value" 
        :key="order.id"
        class="p-3 bg-[#fbf9f6] rounded-lg border border-cc-outline flex flex-col gap-1.5 hover:border-cc-orange/50 hover:bg-white transition-all shadow-xs"
      >
        <div class="flex items-center justify-between">
          <span class="font-telemetry-code text-xs text-cc-orange-strong font-bold">
            {{ order.id }}
          </span>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Stok Terupdate Otomatis
          </span>
        </div>

        <div class="flex flex-col">
          <span class="text-sm text-[#1b1c1a] font-semibold">
            {{ order.customer }}
          </span>
          <span class="text-xs text-[#594136]">
            {{ order.qty.toLocaleString('id-ID') }} kg {{ order.productName }}
          </span>
        </div>

        <div class="flex items-center justify-between pt-1.5 border-t border-slate-100 text-xs">
          <span class="text-[#797067] font-telemetry-code text-[11px]">
            {{ order.timeAgo }}
          </span>
          <span class="font-telemetry-code text-sm font-bold text-[#1b1c1a]">
            Rp {{ order.totalPrice.toLocaleString('id-ID') }}
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
