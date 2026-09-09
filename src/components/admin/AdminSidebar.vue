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
      <nav class="flex flex-col gap-1 px-2">
        <a 
          v-for="item in navItems" 
          :key="item.id"
          :href="item.href"
          @click.prevent="activeNav = item.id; scrollToSection(item.href)"
          :class="[
            'flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200',
            activeNav === item.id 
              ? 'bg-cc-orange text-white font-semibold shadow-md shadow-cc-orange/20' 
              : 'text-white/70 hover:bg-white/10 hover:text-white font-medium'
          ]"
        >
          <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </div>

    <!-- Bottom Telemetry Status & Return to Landing -->
    <div class="p-3.5 border-t border-white/10 flex flex-col gap-3">
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-telemetry-code text-[11px] text-white/70 uppercase">Link Telemetri</span>
        </div>
        <span class="font-telemetry-code text-[11px] text-emerald-400 font-semibold">v2.4.9</span>
      </div>

      <!-- Back to Public Landing Page Button -->
      <button 
        @click="$emit('switchView', 'landing')" 
        class="w-full h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-telemetry-code text-xs flex items-center justify-center gap-2 transition-all border border-white/15"
        title="Beralih ke Landing Page Publik"
      >
        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        <span>Ke Landing Page</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['switchView'])

const activeNav = ref('overview')

const navItems = [
  { id: 'overview', label: 'Beranda (Overview)', icon: 'grid_view', href: '#overview' },
  { id: 'products-crud', label: 'Manajemen Produk', icon: 'inventory_2', href: '#products-crud' },
  { id: 'wa-orders', label: 'Pesanan WA', icon: 'chat', href: '#wa-orders' },
  { id: 'ai-analytics', label: 'Analitik AI', icon: 'analytics', href: '#ai-analytics' }
]

const scrollToSection = (href) => {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
