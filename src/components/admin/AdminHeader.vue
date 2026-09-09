<template>
  <header class="fixed top-0 left-64 right-0 h-16 bg-black/75 backdrop-blur-xl border-b border-white/10 z-40 px-6 flex items-center justify-between select-none">
    <!-- Left: Search & Telemetry Status -->
    <div class="flex items-center gap-4 flex-1 max-w-xl">
      <div class="relative w-full">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-[18px]">
          search
        </span>
        <input 
          v-model="searchQuery"
          @input="$emit('search', searchQuery)"
          type="text" 
          placeholder="Cari telemetri, komoditas, kode seri..." 
          class="w-full h-9 pl-9 pr-4 bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-cc-orange focus:bg-white/15 transition-colors"
        />
      </div>

      <!-- Harvest Cluster Status Badge -->
      <div class="hidden xl:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/50 px-3 py-1 rounded-full whitespace-nowrap">
        <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
        <span class="font-telemetry-code text-[11px] text-emerald-300 uppercase tracking-wide font-semibold">
          SISTEM ONLINE - KLUSTER PANEN 04
        </span>
      </div>
    </div>

    <!-- Right: Quick Actions & Profile -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- AI Model & Token Configuration Button -->
      <button 
        @click="$emit('openAiSettings')"
        title="Konfigurasi Kunci Token AI (Google Gemini / OpenAI)"
        class="inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 font-telemetry-code text-xs font-semibold shadow transition-all active:scale-95"
      >
        <span class="material-symbols-outlined text-[16px] text-cc-orange">psychology</span>
        <span class="hidden md:inline">AI Token (1M)</span>
        <span class="md:hidden">AI</span>
      </button>

      <!-- Simulated Quick WhatsApp Order Trigger -->
      <button 
        @click="handleSimulateOrder"
        title="Simulasi Pesanan WhatsApp Baru Masuk (Otomatis Kurangi Stok)"
        class="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-telemetry-code text-xs font-semibold shadow transition-all active:scale-95"
      >
        <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
        <span>+ Order WA</span>
      </button>

      <!-- Dark Mode Toggle Button for Admin Panel -->
      <button 
        @click="toggleTheme"
        :title="isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'"
        class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
        type="button"
      >
        <span class="material-symbols-outlined text-[20px] transition-transform duration-300" :class="{ 'rotate-180 text-amber-400': isDark }">
          {{ isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <!-- Notification Bell with Notification Counter -->
      <div class="relative">
        <button 
          @click="showNotifications = !showNotifications"
          class="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors" 
          type="button"
          title="Notifikasi Telemetri"
        >
          <span class="material-symbols-outlined text-[22px]">notifications</span>
          <span 
            v-if="adminStore.whatsappOrders.value.length" 
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cc-orange ring-2 ring-black"
          ></span>
        </button>

        <!-- Dropdown Notifications -->
        <div 
          v-if="showNotifications" 
          class="absolute right-0 mt-2 w-80 bg-[#1e1b18] border border-white/15 rounded-xl shadow-2xl p-3 z-50 flex flex-col gap-2"
        >
          <div class="flex items-center justify-between pb-2 border-b border-white/10">
            <span class="font-telemetry-code text-xs text-white font-bold uppercase">Log Telemetri Sinkron</span>
            <span class="text-[11px] text-white/50">{{ adminStore.whatsappOrders.value.length }} Total Tiket</span>
          </div>
          <div class="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
            <div 
              v-for="order in adminStore.whatsappOrders.value.slice(0, 4)" 
              :key="order.id"
              class="p-2 rounded bg-white/5 border border-white/10 flex flex-col text-xs"
            >
              <div class="flex justify-between items-center font-telemetry-code text-[11px]">
                <span class="text-cc-orange font-bold">{{ order.id }}</span>
                <span class="text-emerald-400">Stok -{{ order.qty }} kg</span>
              </div>
              <span class="text-white font-medium truncate mt-0.5">{{ order.customer }}</span>
              <span class="text-white/60 text-[11px]">{{ order.productName }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-6 w-px bg-white/15"></div>

      <!-- Admin Profile & Supabase Auth Info -->
      <div class="flex items-center gap-2.5 pl-1">
        <div class="text-right hidden sm:flex flex-col leading-tight">
          <span class="text-xs text-white font-bold truncate max-w-[140px]">
            {{ adminStore.adminUser.value?.nama_lengkap || 'Admin CV Banong' }}
          </span>
          <span class="font-telemetry-code text-[10px] text-emerald-400 font-semibold truncate max-w-[140px]">
            {{ adminStore.adminUser.value?.email || 'admin@banongfarms.com' }}
          </span>
        </div>
        <img 
          alt="Avatar Admin CV Banong Farms" 
          class="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/40 shadow-md" 
          src="/assets/admin-avatar.png"
          onerror="this.src='/assets/logo.png'"
        />
      </div>

      <!-- Logout Button (Supabase Auth) -->
      <button
        @click="handleLogout"
        class="ml-1 px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
        title="Keluar dari Sesi Admin (Logout)"
        type="button"
      >
        <span class="material-symbols-outlined text-[16px]">logout</span>
        <span class="hidden md:inline">Keluar</span>
      </button>

      <!-- Direct Exit to Public Website -->
      <button
        @click="$emit('switchView', 'landing')"
        class="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        title="Buka Halaman Utama Publik"
        type="button"
      >
        <span class="material-symbols-outlined text-[20px]">open_in_new</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const emit = defineEmits(['switchView', 'search', 'openAiSettings', 'logout'])

const adminStore = useAdminStore()
const searchQuery = ref('')
const showNotifications = ref(false)
const isDark = ref(false)

const handleLogout = async () => {
  await adminStore.logoutAdmin()
  emit('switchView', 'landing')
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const handleSimulateOrder = () => {
  adminStore.simulateIncomingOrder()
}
</script>
