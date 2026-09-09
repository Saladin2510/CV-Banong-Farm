<template>
  <div class="min-h-screen bg-[#070D1E] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden select-none">
    <!-- Ambient Background Lighting -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Login Card Container -->
    <div class="relative w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 z-10">
      
      <!-- Top Brand Header -->
      <div class="flex flex-col items-center text-center gap-3">
        <div class="relative">
          <img 
            src="/assets/logo.png" 
            alt="CV Banong Farms" 
            class="h-16 w-auto object-contain drop-shadow-lg"
            onerror="this.src='/favicon.ico'"
          />
          <span class="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-telemetry-code uppercase font-bold tracking-wider mx-auto">
            <span class="material-symbols-outlined text-[14px]">shield</span>
            PORTAL OTENTIKASI SUPABASE
          </span>
          <h1 class="text-2xl font-black tracking-tight text-white uppercase mt-1">
            CV Banong Farms
          </h1>
          <p class="text-xs text-slate-400">
            Masuk ke Command Center untuk mengelola katalog, memvalidasi pesanan WA, dan memantau analitik AI.
          </p>
        </div>
      </div>

      <!-- Alert Error Notification -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div 
          v-if="errorMessage" 
          class="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5 shadow-sm"
        >
          <span class="material-symbols-outlined text-rose-400 text-[18px] shrink-0 mt-0.5">error</span>
          <div class="flex flex-col leading-relaxed">
            <span class="font-bold">Akses Ditolak</span>
            <span>{{ errorMessage }}</span>
          </div>
        </div>
      </transition>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <!-- Email Field -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-slate-300 font-telemetry-code flex items-center justify-between">
            <span>EMAIL ADMINISTRATOR</span>
            <span class="text-[11px] text-slate-500 font-normal">Supabase Auth</span>
          </label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              mail
            </span>
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="admin@banongfarms.com"
              class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-slate-300 font-telemetry-code flex items-center justify-between">
            <span>KATA SANDI</span>
            <span class="text-[11px] text-slate-500 font-normal">Terkunci Aman</span>
          </label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              lock
            </span>
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              required
              placeholder="••••••••••••"
              class="w-full h-11 pl-10 pr-11 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
              title="Lihat kata sandi"
            >
              <span class="material-symbols-outlined text-[18px]">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="isLoading"
          class="mt-2 w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="material-symbols-outlined text-[20px] animate-spin">
            progress_activity
          </span>
          <span v-else class="material-symbols-outlined text-[20px]">
            login
          </span>
          <span>{{ isLoading ? 'Memverifikasi Kredensial...' : 'Masuk ke Command Center' }}</span>
        </button>
      </form>

      <!-- Security Status & Return Link -->
      <div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <button 
          @click="$emit('switchView', 'landing')"
          type="button"
          class="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Kembali ke Website</span>
        </button>

        <span class="font-telemetry-code text-[11px] text-emerald-400 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          ENKRIPSI JWT 256-BIT
        </span>
      </div>

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
