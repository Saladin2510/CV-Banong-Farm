<template>
  <div class="min-h-screen w-full bg-[#050B17] text-slate-100 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative overflow-hidden select-none font-sans">
    
    <!-- Subtle Ambient Backdrop (Static, ultra-lightweight) -->
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#022448]/35 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#fcd400]/5 rounded-full blur-[140px] pointer-events-none"></div>

    <!-- Top Brand Header -->
    <div class="flex items-center justify-between w-full max-w-md mx-auto z-10">
      <div class="flex items-center gap-3">
        <img 
          src="/assets/logo.png" 
          alt="CV Banong Farms" 
          class="h-9 w-auto object-contain"
          onerror="this.src='/favicon.ico'"
        />
        <div class="flex flex-col">
          <span class="text-xs font-black tracking-widest text-white uppercase font-sans">
            CV BANONG <span class="text-[#fcd400]">FARMS</span>
          </span>
          <span class="text-[10px] text-slate-400 font-medium tracking-tight">
            Portal Operasional Farm &amp; Katalog
          </span>
        </div>
      </div>

      <button 
        @click="$emit('switchView', 'landing')"
        type="button"
        class="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-900/60"
      >
        <span>&larr;</span>
        <span>Ke Website</span>
      </button>
    </div>

    <!-- Main Headline & Form Area (Centered & Elegant) -->
    <div class="max-w-md w-full mx-auto my-auto py-8 z-10">
      
      <!-- Editorial Title -->
      <div class="space-y-3 mb-8">
        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.12]">
          Kelola Operasional <br />
          Peternakan, 
          <span class="italic font-serif font-normal bg-gradient-to-r from-[#fcd400] via-[#ffe16d] to-[#e6c200] bg-clip-text text-transparent">
            Lebih Cerdas
          </span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Sistem terpadu untuk mengelola inventaris pakan, pembaruan stok, dan verifikasi pesanan peternak dalam satu platform.
        </p>
      </div>

      <!-- Alert Error Notification -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div 
          v-if="errorMessage" 
          class="mb-6 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5 shadow-sm"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
          <span>{{ errorMessage }}</span>
        </div>
      </transition>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        
        <!-- Email Input -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Email Administrator
          </label>
          <input 
            v-model="email"
            type="email" 
            required
            placeholder="admin@banongfarms.com"
            class="w-full h-12 px-4 rounded-xl bg-[#0B132B]/90 border border-slate-800/90 hover:border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#fcd400] focus:ring-1 focus:ring-[#fcd400]/40 transition-all font-sans"
          />
        </div>

        <!-- Password Input -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Kata Sandi
          </label>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              required
              placeholder="••••••••••••"
              class="w-full h-12 pl-4 pr-11 rounded-xl bg-[#0B132B]/90 border border-slate-800/90 hover:border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#fcd400] focus:ring-1 focus:ring-[#fcd400]/40 transition-all font-sans"
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#fcd400] transition-colors cursor-pointer"
              aria-label="Lihat kata sandi"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember Me & Help Link -->
        <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input 
              v-model="rememberMe" 
              type="checkbox" 
              class="w-4 h-4 rounded border-slate-700 bg-[#0B132B] text-[#fcd400] focus:ring-[#fcd400]/40 focus:ring-offset-0 cursor-pointer accent-[#fcd400]"
            />
            <span class="hover:text-slate-300">Ingat saya</span>
          </label>
          <a 
            href="https://wa.me/6285726080086?text=Halo%20Admin%20CV%20Banong%20Farms,%20saya%20memerlukan%20bantuan%20akses%20akun%20admin." 
            target="_blank" 
            class="text-slate-400 hover:text-[#fcd400] transition-colors"
          >
            Lupa kata sandi?
          </a>
        </div>

        <!-- Primary Submit Button (Banong Golden Yellow) -->
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#fcd400] via-[#ffe16d] to-[#e6c200] hover:brightness-105 active:scale-[0.99] text-[#022448] font-black text-sm tracking-wide shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isLoading" class="w-5 h-5 animate-spin text-[#022448]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>Masuk Dashboard</span>
        </button>

      </form>

      <!-- Quick Help Note -->
      <p class="mt-6 text-center text-xs text-slate-500">
        Akses khusus staf resmi CV Banong Farms Ajibarang.
      </p>

    </div>

    <!-- Bottom Copyright Footer -->
    <div class="text-[11px] text-slate-500 font-sans text-center z-10">
      Hak Cipta &copy; 2026 CV Banong Farms. Seluruh hak cipta dilindungi.
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const emit = defineEmits(['loginSuccess', 'switchView'])

const adminStore = useAdminStore()
const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Mohon isi email dan kata sandi.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await adminStore.loginAdmin(email.value, password.value)
    if (res.success) {
      emit('loginSuccess')
    } else {
      errorMessage.value = res.message || 'Email atau kata sandi tidak cocok.'
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan sistem: ' + (err.message || err)
  } finally {
    isLoading.value = false
  }
}
</script>
