<template>
  <div id="wa-orders" class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[22px]">mark_chat_unread</span>
          <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
            Manajemen &amp; Validasi Pesanan WA
          </h2>
          <span class="font-telemetry-code text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
            {{ pendingCount }} MENUNGGU VALIDASI
          </span>
        </div>
        <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
          Pesanan masuk dari formulir website. Validasi "Selesai" untuk memotong stok gudang &amp; mencatat ke Laporan Keuangan.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.id"
          @click="activeFilter = tab.id"
          type="button"
          :class="[
            'px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 font-telemetry-code',
            activeFilter === tab.id 
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          <span>{{ tab.label }}</span>
          <span v-if="tab.count !== undefined" class="text-[10px] px-1.5 py-0.2 rounded-full" :class="tab.badgeClass">
            {{ tab.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- Quick Simulation Action Strip -->
    <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <div class="flex flex-col">
          <span class="text-xs text-emerald-900 dark:text-emerald-300 font-bold">
            Alur Transaksi: Form Pelanggan ➔ Database Supabase ➔ Validasi Admin
          </span>
          <span class="text-[11px] text-emerald-800 dark:text-emerald-400">
            Stok produk baru akan terpotong saat admin menekan tombol "Validasi Selesai (Deal)".
          </span>
        </div>
      </div>

      <button 
        @click="adminStore.simulateIncomingOrder()"
        class="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-telemetry-code text-xs font-semibold shadow-xs transition-all flex items-center gap-1 active:scale-95 shrink-0 cursor-pointer self-start sm:self-auto"
        type="button"
        title="Simulasikan tiket pesanan baru dari website"
      >
        <span class="material-symbols-outlined text-[16px]">add_circle</span>
        <span>+ Simulasi Pesanan Baru</span>
      </button>
    </div>

    <!-- Live Toast Sync Alert -->
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
        :class="[
          'border rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm text-xs',
          adminStore.lastSyncToast.value.isCompleted
            ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200'
            : adminStore.lastSyncToast.value.isCancelled
              ? 'bg-rose-100 dark:bg-rose-950 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200'
              : 'bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200'
        ]"
      >
        <span class="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
          {{ adminStore.lastSyncToast.value.isCompleted ? 'check_circle' : adminStore.lastSyncToast.value.isCancelled ? 'cancel' : 'notification_important' }}
        </span>
        <div class="flex flex-col leading-snug">
          <span class="font-bold font-telemetry-code">
            {{ adminStore.lastSyncToast.value.isCompleted ? 'VALIDASI BERHASIL (SELESAI)' : adminStore.lastSyncToast.value.isCancelled ? 'PESANAN DIBATALKAN' : 'PESANAN BARU MASUK' }} : {{ adminStore.lastSyncToast.value.orderId }}
          </span>
          <span class="mt-0.5">
            {{ adminStore.lastSyncToast.value.customer }} - 
            <span v-if="adminStore.lastSyncToast.value.isCompleted">
              Stok dipotong <strong>{{ adminStore.lastSyncToast.value.qty }} pcs</strong>. Sisa stok: <strong>{{ (adminStore.lastSyncToast.value.remainingStock || 0).toLocaleString('id-ID') }} pcs</strong>. Laporan harian terupdate!
            </span>
            <span v-else-if="adminStore.lastSyncToast.value.isCancelled">
              Pesanan ditolak tanpa mengurangi sisa stok komoditas.
            </span>
            <span v-else>
              Memerlukan validasi admin untuk memotong stok.
            </span>
          </span>
        </div>
      </div>
    </transition>

    <!-- Empty State -->
    <div 
      v-if="!filteredOrders || filteredOrders.length === 0" 
      class="p-10 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-2"
    >
      <span class="material-symbols-outlined text-slate-400 text-[40px]">inbox</span>
      <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tidak Ada Pesanan Pada Kategori Ini</p>
      <p class="text-xs text-slate-500 dark:text-slate-400">Gunakan tombol "+ Simulasi Pesanan Baru" atau lakukan checkout dari formulir website.</p>
    </div>

    <!-- Live Orders List Cards -->
    <div v-else class="flex flex-col gap-3.5 max-h-[580px] overflow-y-auto pr-1">
      <article 
        v-for="order in filteredOrders" 
        :key="order.id"
        class="p-4 bg-[#fbf9f6] dark:bg-[#0d1117] rounded-xl border border-cc-outline dark:border-slate-800 flex flex-col gap-3 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800/60 transition-all shadow-xs"
      >
        <!-- Top Row: Order Code & Status -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="text-sm text-primary dark:text-secondary-container font-extrabold tracking-tight">
              {{ order.id }}
            </span>
            <span class="text-slate-400 text-xs">•</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">
              {{ order.timeAgo || 'Baru saja' }}
            </span>
          </div>

          <!-- Status Badge -->
          <span 
            :class="[
              'px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 border font-telemetry-code',
              order.status === 'Selesai' || order.status === 'Stok Terupdate Otomatis'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : order.status === 'Dibatalkan'
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 animate-pulse'
            ]"
          >
            <span 
              class="w-1.5 h-1.5 rounded-full"
              :class="[
                order.status === 'Selesai' || order.status === 'Stok Terupdate Otomatis'
                  ? 'bg-emerald-500'
                  : order.status === 'Dibatalkan'
                    ? 'bg-rose-500'
                    : 'bg-amber-500'
              ]"
            ></span>
            <span>{{ order.status || 'Menunggu Konfirmasi' }}</span>
          </span>
        </div>

        <!-- Middle Row: Customer Info & Product Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          <!-- Customer Box -->
          <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col gap-1">
            <span class="text-[11px] uppercase font-bold text-slate-400 font-telemetry-code">Informasi Pemesan</span>
            <span class="text-sm font-bold text-[#1b1c1a] dark:text-white">
              {{ order.customer || 'Pelanggan CV Banong' }}
            </span>
            
            <!-- WhatsApp Phone Link -->
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[#594136] dark:text-slate-300 font-telemetry-code">
                {{ order.phone || 'Nomor WA Terlampir' }}
              </span>
              <a 
                v-if="order.phone"
                :href="`https://wa.me/${formatWaNumber(order.phone)}`" 
                target="_blank" 
                class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold hover:bg-emerald-200 transition-colors"
                title="Buka Chat WhatsApp Pelanggan"
              >
                <span class="material-symbols-outlined text-[12px]">chat</span>
                <span>Chat WA</span>
              </a>
            </div>

            <!-- Address -->
            <p class="text-[11px] text-[#797067] dark:text-slate-400 mt-1 line-clamp-2">
              <span class="material-symbols-outlined text-[12px] align-middle mr-0.5">location_on</span>
              {{ order.address || 'Alamat dikonfirmasi via WhatsApp' }}
            </p>
          </div>

          <!-- Product & Total Box -->
          <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase font-bold text-slate-400 font-telemetry-code">Rincian Komoditas</span>
              <span class="text-sm font-bold text-[#1b1c1a] dark:text-white">
                {{ order.productName || 'Pakan Ternak Banong' }}
              </span>
              <span class="text-xs text-[#594136] dark:text-slate-300 font-telemetry-code">
                Jumlah Beli: <strong>{{ (order.qty || 1).toLocaleString('id-ID') }} pcs</strong>
              </span>
            </div>

            <div class="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400">Total Tagihan:</span>
              <span class="font-telemetry-code text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {{ (order.totalPrice || 0).toLocaleString('id-ID') }}
              </span>
            </div>
          </div>

        </div>

        <!-- Bottom Action Strip (Validasi: Deal / Batal) -->
        <div 
          v-if="order.status === 'Menunggu Konfirmasi' || !order.status"
          class="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2"
        >
          <span class="text-[11px] text-amber-700 dark:text-amber-400 flex items-center gap-1 font-medium">
            <span class="material-symbols-outlined text-[14px]">warning</span>
            Validasi pesanan ini untuk mengurangi stok produk terkait di gudang.
          </span>

          <div class="flex items-center gap-2">
            <!-- Tombol Batal -->
            <button 
              @click="handleValidate(order.id, 'cancel')"
              type="button"
              class="h-8 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
              title="Batalkan pesanan ini tanpa mengurangi stok gudang"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
              <span>Batalkan</span>
            </button>

            <!-- Tombol Selesai (Deal) -->
            <button 
              @click="handleValidate(order.id, 'complete')"
              type="button"
              class="h-8 px-4 rounded-xl bg-secondary-container text-primary hover:bg-accent-hover active:scale-95 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              title="Validasi berhasil (Deal): Potong stok produk & catat ke Laporan Keuangan"
            >
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Validasi Selesai (Deal)</span>
            </button>
          </div>
        </div>

        <!-- Completed Indicator -->
        <div 
          v-else-if="order.status === 'Selesai' || order.status === 'Stok Terupdate Otomatis'"
          class="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-700 dark:text-emerald-400"
        >
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">verified</span>
            Stok produk sudah dipotong &amp; tercatat ke metrik harian telemetri.
          </span>
          <span class="font-telemetry-code font-bold">TRANSAKSI TUNTAS</span>
        </div>

      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const adminStore = useAdminStore()
const activeFilter = ref('all')

const pendingCount = computed(() => {
  return (adminStore.whatsappOrders.value || []).filter(o => o.status === 'Menunggu Konfirmasi' || !o.status).length
})

const completedCount = computed(() => {
  return (adminStore.whatsappOrders.value || []).filter(o => o.status === 'Selesai' || o.status === 'Stok Terupdate Otomatis').length
})

const cancelledCount = computed(() => {
  return (adminStore.whatsappOrders.value || []).filter(o => o.status === 'Dibatalkan').length
})

const filterTabs = computed(() => [
  { id: 'all', label: 'Semua', count: (adminStore.whatsappOrders.value || []).length, badgeClass: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' },
  { id: 'pending', label: 'Menunggu Validasi', count: pendingCount.value, badgeClass: 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200' },
  { id: 'completed', label: 'Selesai', count: completedCount.value, badgeClass: 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200' },
  { id: 'cancelled', label: 'Dibatalkan', count: cancelledCount.value, badgeClass: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400' }
])

const filteredOrders = computed(() => {
  const orders = adminStore.whatsappOrders.value || []
  if (activeFilter.value === 'pending') {
    return orders.filter(o => o.status === 'Menunggu Konfirmasi' || !o.status)
  }
  if (activeFilter.value === 'completed') {
    return orders.filter(o => o.status === 'Selesai' || o.status === 'Stok Terupdate Otomatis')
  }
  if (activeFilter.value === 'cancelled') {
    return orders.filter(o => o.status === 'Dibatalkan')
  }
  return orders
})

const formatWaNumber = (phone) => {
  if (!phone) return '628999192861'
  let clean = phone.replace(/\D/g, '')
  if (clean.startsWith('0')) clean = '62' + clean.slice(1)
  return clean
}

const handleValidate = async (orderId, action) => {
  const res = await adminStore.validateOrder({ orderId, action })
  if (res && !res.success) {
    alert(res.message)
  }
}
</script>
