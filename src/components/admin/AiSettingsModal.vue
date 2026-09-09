<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
    <div 
      class="bg-white dark:bg-[#161b22] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] transition-colors"
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-[#1e1b18] text-white flex items-center justify-between border-b border-white/10">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-cc-orange/20 text-cc-orange flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">psychology</span>
          </div>
          <div>
            <h3 class="font-bold text-sm sm:text-base leading-tight">Pengaturan Token &amp; Model AI</h3>
            <p class="text-[11px] text-white/60">Integrasi Chatbot Si Banong &amp; Analisis Pemasaran</p>
          </div>
        </div>
        <button 
          @click="$emit('close')" 
          class="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          type="button"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto flex flex-col gap-5 text-xs sm:text-sm text-[#1b1c1a] dark:text-slate-100 bg-white dark:bg-[#161b22]">
        
        <!-- 1M Token Package Status Banner -->
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 rounded-xl p-4 border border-orange-200/80 dark:border-orange-800/60 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-cc-orange text-[20px]">token</span>
              <span class="font-bold text-cc-orange-strong font-telemetry-code text-xs uppercase">
                Kapasitas Token: 1.000.000 (1M Token)
              </span>
            </div>
            <span 
              :class="[
                'px-2 py-0.5 rounded-full font-telemetry-code text-[10px] font-bold',
                hasActiveKey ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              ]"
            >
              {{ hasActiveKey ? '● API KEY TERHUBUNG' : '○ MODE FALLBACK OFFLINE' }}
            </span>
          </div>
          <p class="text-xs text-[#594136] dark:text-slate-300 leading-relaxed">
            1 Juta Token mencakup ± 750.000 kata. Cukup untuk melayani <strong>~25.000 percakapan</strong> pelanggan dengan Si Banong serta <strong>~5.000 analisis tren pemasaran harian</strong> secara real-time.
          </p>
        </div>

        <!-- Provider Switcher -->
        <div>
          <label class="block font-bold text-xs text-[#594136] dark:text-slate-300 mb-1.5 uppercase font-telemetry-code">
            Pilih Provider AI
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button 
              type="button"
              @click="selectProvider('gemini')"
              :class="[
                'p-3 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer',
                selectedProvider === 'gemini' 
                  ? 'border-cc-orange bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-cc-orange/20 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0d1117] hover:border-slate-300 dark:hover:border-slate-600'
              ]"
            >
              <div class="flex items-center justify-between w-full">
                <span class="font-bold text-xs text-slate-900 dark:text-white">Google Gemini</span>
                <span class="material-symbols-outlined text-[16px] text-cc-orange" v-if="selectedProvider === 'gemini'">check_circle</span>
              </div>
              <span class="text-[11px] text-[#797067] dark:text-slate-400">Model: gemini-1.5-flash</span>
              <span class="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 font-telemetry-code">Sangat Hemat &amp; Cepat</span>
            </button>

            <button 
              type="button"
              @click="selectProvider('openai')"
              :class="[
                'p-3 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer',
                selectedProvider === 'openai' 
                  ? 'border-cc-orange bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-cc-orange/20 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0d1117] hover:border-slate-300 dark:hover:border-slate-600'
              ]"
            >
              <div class="flex items-center justify-between w-full">
                <span class="font-bold text-xs text-slate-900 dark:text-white">OpenAI</span>
                <span class="material-symbols-outlined text-[16px] text-cc-orange" v-if="selectedProvider === 'openai'">check_circle</span>
              </div>
              <span class="text-[11px] text-[#797067] dark:text-slate-400">Model: gpt-4o-mini</span>
              <span class="text-[10px] font-semibold text-blue-700 dark:text-blue-400 font-telemetry-code">Kualitas Bahasa Alami</span>
            </button>
          </div>
        </div>

        <!-- API Key Input -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="font-bold text-xs text-[#594136] dark:text-slate-300 uppercase font-telemetry-code">
              {{ selectedProvider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key' }}
            </label>
            <a 
              :href="selectedProvider === 'gemini' ? 'https://aistudio.google.com/app/apikey' : 'https://platform.openai.com/api-keys'" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-[11px] text-cc-orange hover:underline flex items-center gap-0.5"
            >
              <span>Dapatkan Key</span>
              <span class="material-symbols-outlined text-[12px]">open_in_new</span>
            </a>
          </div>

          <div class="relative">
            <input 
              v-model="apiKeyInput"
              :type="showKey ? 'text' : 'password'"
              :placeholder="selectedProvider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'"
              class="w-full h-11 px-3.5 pr-20 font-telemetry-code text-xs bg-slate-50 dark:bg-[#0d1117] border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cc-orange focus:ring-2 focus:ring-cc-orange/20 transition-colors"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button 
                type="button"
                @click="showKey = !showKey"
                class="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors cursor-pointer"
                title="Tampilkan / Sembunyikan Kunci"
              >
                <span class="material-symbols-outlined text-[18px]">
                  {{ showKey ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>
          <p class="text-[11px] text-[#797067] dark:text-slate-400 mt-1">
            Kunci disimpan aman secara lokal di browser Anda (LocalStorage) dan digunakan langsung saat memanggil API.
          </p>
        </div>

        <!-- Test Connection Feedback Box -->
        <div v-if="testStatus.message" :class="[
          'p-3 rounded-lg border text-xs flex items-center gap-2',
          testStatus.success 
            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
        ]">
          <span class="material-symbols-outlined text-[18px]">
            {{ testStatus.success ? 'verified' : 'error' }}
          </span>
          <span class="flex-1">{{ testStatus.message }}</span>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 bg-slate-50 dark:bg-[#1c2128] border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
        <button 
          type="button"
          @click="testConnection"
          :disabled="isTesting || !apiKeyInput.trim()"
          class="h-10 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-[#1b1c1a] dark:text-slate-200 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]" :class="{ 'animate-spin': isTesting }">
            {{ isTesting ? 'sync' : 'network_check' }}
          </span>
          <span>{{ isTesting ? 'Menguji...' : 'Uji Koneksi Token' }}</span>
        </button>

        <div class="flex items-center gap-2">
          <button 
            v-if="hasActiveKey"
            type="button"
            @click="clearKey"
            class="h-10 px-3.5 rounded-lg text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
          >
            Hapus Kunci
          </button>
          <button 
            type="button"
            @click="saveSettings"
            class="h-10 px-5 rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 text-white cursor-pointer"
            style="background-color: #fe6e00; color: #ffffff;"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  getActiveAiProvider, 
  setActiveAiProvider, 
  getStoredApiKey, 
  setStoredApiKey 
} from '../../services/aiService'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'saved'])

const selectedProvider = ref(getActiveAiProvider())
const apiKeyInput = ref(getStoredApiKey(selectedProvider.value))
const showKey = ref(false)
const isTesting = ref(false)
const testStatus = ref({ message: '', success: false })

const hasActiveKey = computed(() => !!apiKeyInput.value.trim())

const selectProvider = (provider) => {
  selectedProvider.value = provider
  apiKeyInput.value = getStoredApiKey(provider)
  testStatus.value = { message: '', success: false }
}

watch(() => props.isOpen, (val) => {
  if (val) {
    selectedProvider.value = getActiveAiProvider()
    apiKeyInput.value = getStoredApiKey(selectedProvider.value)
    testStatus.value = { message: '', success: false }
  }
})

const testConnection = async () => {
  if (!apiKeyInput.value.trim()) return
  isTesting.value = true
  testStatus.value = { message: '', success: false }

  const key = apiKeyInput.value.trim()
  const provider = selectedProvider.value

  try {
    if (provider === 'gemini') {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Halo Banong, tes status token aktif.' }] }],
          generationConfig: { maxOutputTokens: 10 }
        })
      })

      if (resp.ok) {
        testStatus.value = {
          success: true,
          message: 'Koneksi Google Gemini 1.5 Flash Berhasil! Token 1M siap digunakan.'
        }
      } else {
        const errData = await resp.json().catch(() => ({}))
        testStatus.value = {
          success: false,
          message: `Gagal: ${errData.error?.message || 'API Key Gemini tidak valid atau kuota habis.'}`
        }
      }
    } else {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Ping' }],
          max_tokens: 5
        })
      })

      if (resp.ok) {
        testStatus.value = {
          success: true,
          message: 'Koneksi OpenAI GPT-4o-mini Berhasil! Token aktif.'
        }
      } else {
        const errData = await resp.json().catch(() => ({}))
        testStatus.value = {
          success: false,
          message: `Gagal: ${errData.error?.message || 'API Key OpenAI tidak valid.'}`
        }
      }
    }
  } catch (err) {
    testStatus.value = {
      success: false,
      message: `Koneksi gagal: ${err.message}`
    }
  } finally {
    isTesting.value = false
  }
}

const clearKey = () => {
  setStoredApiKey(selectedProvider.value, '')
  apiKeyInput.value = ''
  testStatus.value = {
    success: true,
    message: 'Kunci berhasil dihapus. Sistem kembali ke mode fallback cerdas internal.'
  }
  emit('saved')
}

const saveSettings = () => {
  setActiveAiProvider(selectedProvider.value)
  setStoredApiKey(selectedProvider.value, apiKeyInput.value.trim())
  emit('saved')
  emit('close')
}
</script>
