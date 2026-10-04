<template>
  <header class="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-primary/95 dark:bg-[#060D1E]/95 backdrop-blur-xl border-b border-white/10 z-40 px-3 sm:px-6 flex items-center justify-between select-none transition-all duration-300">
    <!-- Left: Hamburger Button (Mobile/Tablet) + Breadcrumb -->
    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
      <!-- Hamburger Toggle Button -->
      <button 
        @click="$emit('toggleSidebar')"
        class="lg:hidden w-9 h-9 rounded-lg text-white hover:bg-white/10 flex items-center justify-center cursor-pointer border border-white/15 shrink-0 transition-colors"
        type="button"
        title="Buka Menu Navigasi"
        aria-label="Toggle Navigation Menu"
      >
        <span class="material-symbols-outlined text-[22px]">menu</span>
      </button>

      <div class="w-8 h-8 rounded-lg bg-white/10 hidden sm:flex items-center justify-center text-secondary-container border border-white/15 shrink-0">
        <span class="material-symbols-outlined text-[19px]">dashboard</span>
      </div>
      <div class="flex items-center text-sm truncate">
        <span class="text-white font-bold tracking-tight text-sm sm:text-base truncate">Admin Dashboard</span>
      </div>
    </div>

    <!-- Right: Quick Actions & Profile (Clean 60:30:10 Palette) -->
    <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
      <!-- Dark Mode Toggle Button -->
      <button 
        @click="toggleTheme"
        :title="isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'"
        class="w-8 h-8 sm:w-9 sm:h-9 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center cursor-pointer border border-white/10 shrink-0"
        type="button"
      >
        <span class="material-symbols-outlined text-[18px] sm:text-[19px] transition-transform duration-300" :class="{ 'rotate-180 text-secondary-container': isDark }">
          {{ isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <!-- Notification Bell -->
      <div class="relative">
        <button 
          @click="showNotifications = !showNotifications"
          class="relative w-8 h-8 sm:w-9 sm:h-9 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center border border-white/10 cursor-pointer shrink-0" 
          type="button"
          title="Notifikasi Pesanan Masuk"
        >
          <span class="material-symbols-outlined text-[19px] sm:text-[20px]">notifications</span>
          <span 
            v-if="adminStore.whatsappOrders.value.length" 
            class="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 rounded-full bg-secondary-container ring-2 ring-primary"
          ></span>
        </button>

        <!-- Backdrop overlay to dismiss notification on outside click -->
        <div 
          v-if="showNotifications" 
          @click="showNotifications = false" 
          class="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs sm:bg-transparent"
        ></div>

        <!-- Dropdown Notifications (Fixed centered on Mobile, Absolute on Tablet/Desktop) -->
        <div 
          v-if="showNotifications" 
          class="fixed left-3 right-3 top-16 mt-1 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 sm:max-w-sm bg-primary-container border border-white/15 rounded-2xl shadow-2xl p-3.5 z-50 flex flex-col gap-2.5 backdrop-blur-xl"
        >
          <div class="flex items-center justify-between pb-2 border-b border-white/10">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary-container text-[18px]">notifications_active</span>
              <span class="text-xs text-white font-bold uppercase tracking-wider">Pesanan Masuk</span>
            </div>
            <span class="text-[11px] text-secondary-container font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">
              {{ adminStore.whatsappOrders.value.length }} Pesanan
            </span>
          </div>
          <div class="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
            <div 
              v-for="order in adminStore.whatsappOrders.value.slice(0, 5)" 
              :key="order.id"
              class="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex flex-col text-xs transition-colors"
            >
              <div class="flex justify-between items-center text-[11px]">
                <span class="text-secondary-container font-bold font-telemetry-code">{{ order.id }}</span>
                <span class="text-white/80 font-medium">{{ order.qty }} {{ order.unit || 'pcs' }}</span>
              </div>
              <span class="text-white font-semibold truncate mt-0.5">{{ order.customer }}</span>
              <span class="text-white/70 text-[11px] truncate">{{ order.productName }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-5 sm:h-6 w-px bg-white/15 hidden xs:block"></div>

      <!-- Admin Profile Info -->
      <div class="flex items-center gap-2 pl-0.5 sm:pl-1">
        <div class="text-right hidden sm:flex flex-col leading-tight">
          <span class="text-xs text-white font-bold truncate max-w-[120px] md:max-w-[150px]">
            {{ adminStore.adminUser.value?.nama_lengkap || 'Admin CV Banong' }}
          </span>
          <span class="text-[10px] text-secondary-container font-semibold truncate max-w-[120px] md:max-w-[150px]">
            {{ adminStore.adminUser.value?.email || 'admin@banongfarms.com' }}
          </span>
        </div>
        <!-- Neutral Gray Avatar Icon -->
        <div 
          class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-400/30 border border-white/25 flex items-center justify-center text-white shadow-xs shrink-0 select-none"
          title="Akun Admin"
        >
          <span class="material-symbols-outlined text-[18px] sm:text-[20px]">person</span>
        </div>
      </div>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
        title="Keluar dari Sesi Admin (Logout)"
        type="button"
      >
        <span class="material-symbols-outlined text-[16px]">logout</span>
        <span class="hidden sm:inline">Keluar</span>
      </button>

      <!-- Direct Exit to Public Website -->
      <button
        @click="$emit('switchView', 'landing')"
        class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/10 shrink-0"
        title="Buka Landing Page Publik"
        type="button"
      >
        <span class="material-symbols-outlined text-[18px] sm:text-[19px]">open_in_new</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const emit = defineEmits(['switchView', 'logout', 'toggleSidebar'])

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

