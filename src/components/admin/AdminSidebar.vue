<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-black/75 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col justify-between select-none">
    <div class="flex flex-col">
      <!-- Header / Logo -->
      <div class="h-16 px-4 flex items-center gap-3 border-b border-white/10">
        <img 
          alt="CV Banong Farms Logo" 
          class="h-8 w-auto object-contain shrink-0 drop-shadow" 
          src="/assets/logo.png" 
        />
        <div class="flex flex-col justify-center leading-tight min-w-0">
          <span class="text-[15px] text-white uppercase tracking-tight font-bold truncate">
            CV Banong
          </span>
          <span class="font-telemetry-code text-[11px] text-white/70 uppercase tracking-wider truncate">
            Farms Command
          </span>
        </div>
      </div>

      <!-- Navigation Section Label -->
      <div class="px-4 pt-5 pb-2">
        <span class="font-telemetry-code text-[11px] text-white/60 uppercase tracking-wider font-semibold">
          Navigasi Operasional
        </span>
      </div>

      <!-- Nav Items -->
      <nav class="flex flex-col gap-1.5 px-2">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          @click="$emit('changeTab', item.id)"
          type="button"
          :class="[
            'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer text-left',
            activeTab === item.id 
              ? 'bg-cc-orange text-white font-bold shadow-lg shadow-cc-orange/25 ring-1 ring-white/20' 
              : 'text-white/70 hover:bg-white/10 hover:text-white font-medium'
          ]"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="material-symbols-outlined text-[20px] shrink-0" :class="{ 'text-white': activeTab === item.id, 'text-cc-orange-warm': activeTab !== item.id }">
              {{ item.icon }}
            </span>
            <span class="truncate">{{ item.label }}</span>
          </div>

          <!-- Notification/Counter Badges -->
          <span 
            v-if="item.badge !== undefined" 
            :class="[
              'px-2 py-0.5 rounded-full font-telemetry-code text-[10px] font-bold shrink-0 ml-1.5',
              activeTab === item.id 
                ? 'bg-white/20 text-white' 
                : item.badgeColor || 'bg-white/10 text-white/80'
            ]"
          >
            {{ item.badge }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Bottom Telemetry Status & Return to Landing -->
    <div class="p-3.5 border-t border-white/10 flex flex-col gap-3">
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-telemetry-code text-[11px] text-white/70 uppercase">Database Sinkron</span>
        </div>
        <span class="font-telemetry-code text-[11px] text-emerald-400 font-semibold">v2.5 // LIVE</span>
      </div>

      <!-- Back to Public Landing Page Button -->
      <button 
        @click="$emit('switchView', 'landing')" 
        class="w-full h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-telemetry-code text-xs flex items-center justify-center gap-2 transition-all border border-white/15 cursor-pointer"
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
    badge: adminStore.products.value.length,
    badgeColor: 'bg-amber-500/20 text-amber-300'
  },
  { 
    id: 'orders', 
    label: 'Pesanan WA', 
    icon: 'chat',
    badge: adminStore.whatsappOrders.value.length,
    badgeColor: 'bg-emerald-500/20 text-emerald-300'
  },
  { 
    id: 'analytics', 
    label: 'Analitik AI', 
    icon: 'insights',
    badge: 'ONLINE',
    badgeColor: 'bg-purple-500/20 text-purple-300'
  },
  { 
    id: 'database', 
    label: 'Struktur Database', 
    icon: 'database',
    badge: '7 Tabel',
    badgeColor: 'bg-blue-500/20 text-blue-300'
  }
])
</script>
