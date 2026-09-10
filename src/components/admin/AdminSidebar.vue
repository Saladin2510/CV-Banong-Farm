<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-primary text-white border-r border-white/10 z-50 flex flex-col justify-between select-none">
    <div class="flex flex-col">
      <!-- Header / Logo -->
      <div class="h-16 px-4 flex items-center gap-3 border-b border-white/10">
        <img 
          alt="CV Banong Farms Logo" 
          class="h-9 w-auto object-contain shrink-0 drop-shadow" 
          src="/assets/logo.png" 
        />
        <div class="flex flex-col justify-center leading-tight min-w-0">
          <span class="text-[15px] text-white tracking-tight font-bold truncate">
            CV Banong Farms
          </span>
          <span class="text-[11px] text-secondary-container font-semibold tracking-wider uppercase truncate">
            Admin Dashboard
          </span>
        </div>
      </div>

      <!-- Navigation Section Label -->
      <div class="px-4 pt-5 pb-2">
        <span class="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
          Menu Operasional
        </span>
      </div>

      <!-- Nav Items -->
      <nav class="flex flex-col gap-1.5 px-3">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          @click="$emit('changeTab', item.id)"
          type="button"
          :class="[
            'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer text-left',
            activeTab === item.id 
              ? 'bg-[#1E3A5F] text-white font-bold shadow-md border-l-4 border-secondary-container ring-1 ring-white/15' 
              : 'text-slate-300 hover:bg-white/10 hover:text-white font-medium'
          ]"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span 
              class="material-symbols-outlined text-[20px] shrink-0" 
              :class="activeTab === item.id ? 'text-secondary-container' : 'text-slate-400'"
            >
              {{ item.icon }}
            </span>
            <span class="truncate">{{ item.label }}</span>
          </div>

          <!-- Counter Badges -->
          <span 
            v-if="item.badge !== undefined" 
            :class="[
              'px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-1.5',
              activeTab === item.id 
                ? 'bg-secondary-container text-primary font-black shadow-xs' 
                : 'bg-white/15 text-white'
            ]"
          >
            {{ item.badge }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Bottom Status & Return to Landing -->
    <div class="p-4 border-t border-white/10 flex flex-col gap-3">
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span class="text-[11px] text-white/70 font-medium">Database Supabase</span>
        </div>
        <span class="text-[11px] text-secondary-container font-bold">ONLINE</span>
      </div>

      <!-- Back to Public Landing Page Button -->
      <button 
        @click="$emit('switchView', 'landing')" 
        class="w-full h-9 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-white/15 cursor-pointer shadow-xs active:scale-95"
        title="Beralih ke Landing Page Publik"
        type="button"
      >
        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        <span>Ke Landing Page</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'overview'
  }
})

defineEmits(['switchView', 'changeTab'])

const adminStore = useAdminStore()

const navItems = computed(() => [
  { 
    id: 'overview', 
    label: 'Beranda (Overview)', 
    icon: 'grid_view' 
  },
  { 
    id: 'products', 
    label: 'Manajemen Produk', 
    icon: 'inventory_2',
    badge: adminStore.products.value.length
  },
  { 
    id: 'orders', 
    label: 'Pesanan WA', 
    icon: 'chat',
    badge: adminStore.whatsappOrders.value.length
  },
  { 
    id: 'analytics', 
    label: 'Analitik Usaha', 
    icon: 'insights',
    badge: 'Aktif'
  },
  { 
    id: 'database', 
    label: 'Struktur Database', 
    icon: 'database',
    badge: '7 Tabel'
  }
])
</script>

