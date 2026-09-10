<template>
  <header class="fixed top-0 left-64 right-0 h-16 bg-primary/95 dark:bg-[#060D1E]/95 backdrop-blur-xl border-b border-white/10 z-40 px-6 flex items-center justify-between select-none">
    <!-- Left: Clean Professional Breadcrumb (No Search / No Kluster Panen 04) -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-secondary-container border border-white/15">
        <span class="material-symbols-outlined text-[20px]">dashboard</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span class="text-white/60 font-medium hidden sm:inline">Admin Dashboard</span>
        <span class="text-white/40 hidden sm:inline">/</span>
        <span class="text-white font-bold tracking-tight">Pusat Operasional Farm</span>
      </div>
    </div>

    <!-- Right: Quick Actions & Profile (Clean 60:30:10 Palette) -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Dark Mode Toggle Button -->
      <button 
        @click="toggleTheme"
        :title="isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'"
        class="w-9 h-9 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center cursor-pointer border border-white/10"
        type="button"
      >
        <span class="material-symbols-outlined text-[19px] transition-transform duration-300" :class="{ 'rotate-180 text-secondary-container': isDark }">
          {{ isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <!-- Notification Bell -->
      <div class="relative">
        <button 
          @click="showNotifications = !showNotifications"
          class="relative w-9 h-9 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center border border-white/10 cursor-pointer" 
          type="button"
          title="Notifikasi Pesanan Masuk"
        >
          <span class="material-symbols-outlined text-[20px]">notifications</span>
          <span 
            v-if="adminStore.whatsappOrders.value.length" 
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container ring-2 ring-primary"
          ></span>
        </button>

        <!-- Dropdown Notifications -->
        <div 
          v-if="showNotifications" 
          class="absolute right-0 mt-2 w-80 bg-primary-container border border-white/15 rounded-xl shadow-2xl p-3 z-50 flex flex-col gap-2 backdrop-blur-xl"
        >
          <div class="flex items-center justify-between pb-2 border-b border-white/10">
            <span class="text-xs text-white font-bold uppercase tracking-wider">Pesanan Masuk</span>
            <span class="text-[11px] text-secondary-container font-semibold">{{ adminStore.whatsappOrders.value.length }} Tiket</span>
          </div>
          <div class="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
            <div 
              v-for="order in adminStore.whatsappOrders.value.slice(0, 4)" 
              :key="order.id"
              class="p-2 rounded-lg bg-white/10 border border-white/10 flex flex-col text-xs"
            >
              <div class="flex justify-between items-center text-[11px]">
                <span class="text-secondary-container font-bold">{{ order.id }}</span>
                <span class="text-white/80 font-medium">{{ order.qty }} kg</span>
              </div>
              <span class="text-white font-semibold truncate mt-0.5">{{ order.customer }}</span>
              <span class="text-white/70 text-[11px]">{{ order.productName }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-6 w-px bg-white/15"></div>

      <!-- Admin Profile Info -->
      <div class="flex items-center gap-2.5 pl-1">
        <div class="text-right hidden sm:flex flex-col leading-tight">
          <span class="text-xs text-white font-bold truncate max-w-[140px]">
            {{ adminStore.adminUser.value?.nama_lengkap || 'Admin CV Banong' }}
          </span>
          <span class="text-[10px] text-secondary-container font-semibold truncate max-w-[140px]">
            {{ adminStore.adminUser.value?.email || 'admin@banongfarms.com' }}
          </span>
        </div>
        <img 
          alt="Avatar Admin CV Banong Farms" 
          class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-white/20 shadow-sm" 
          src="/assets/admin-avatar.png"
          onerror="this.src='/assets/logo.png'"
        />
      </div>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="ml-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
        title="Keluar dari Sesi Admin (Logout)"
        type="button"
      >
        <span class="material-symbols-outlined text-[16px]">logout</span>
        <span class="hidden md:inline">Keluar</span>
      </button>

      <!-- Direct Exit to Public Website -->
      <button
        @click="$emit('switchView', 'landing')"
        class="w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/10"
        title="Buka Landing Page Publik"
        type="button"
      >
        <span class="material-symbols-outlined text-[19px]">open_in_new</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const emit = defineEmits(['switchView', 'logout'])

const adminStore = useAdminStore()
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
</script>

