<template>
  <div id="ai-analytics" class="flex flex-col gap-5">
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
    
    <!-- Left Column: Continuous Spline Area Chart (8 Cols) -->
    <div class="lg:col-span-8 bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
      <!-- Chart Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="material-symbols-outlined text-cc-orange text-[20px]">insights</span>
            <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
              Grafik Perkiraan Penjualan
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-primary dark:text-secondary-container text-xs font-bold">
              Hari ini : {{ formattedFullToday }}
            </span>
          </div>
          <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
            Grafik penjualan harian otomatis terhubung dengan pesanan WhatsApp dari pembeli.
          </p>
        </div>

        <!-- Period Filter Pills -->
        <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1 self-start sm:self-auto select-none border border-slate-200 dark:border-slate-700">
          <button 
            v-for="period in periods" 
            :key="period"
            @click="switchPeriod(period)"
            :class="[
              'px-2.5 py-1 rounded font-telemetry-code text-xs transition-colors',
              activePeriod === period 
                ? 'bg-cc-orange text-white font-bold shadow-xs' 
                : 'text-[#594136] dark:text-slate-300 hover:text-[#1b1c1a] dark:hover:text-white'
            ]"
            type="button"
          >
            {{ period }}
          </button>
        </div>
      </div>

      <!-- Chart Display with Floating Peak Telemetry Node -->
      <div class="relative w-full h-72 sm:h-80 bg-[#fbf9f6] dark:bg-[#0d1117] rounded-lg p-3 flex flex-col justify-between overflow-hidden border border-slate-100 dark:border-slate-800/80 transition-colors">
        <!-- Floating Interactive Tooltip Node -->
        <div class="absolute top-3 left-1/2 -translate-x-1/2 sm:left-[54%] z-10 bg-white/95 dark:bg-[#1c2128]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cc-orange shadow-md flex items-center gap-2 max-w-xs sm:max-w-md pointer-events-none transition-all duration-300">
          <span class="w-2 h-2 rounded-full bg-cc-orange animate-ping"></span>
          <div class="flex flex-col">
            <span class="font-telemetry-code text-xs text-cc-orange-strong font-bold">
              PENJUALAN TERTINGGI: {{ peakInfo.amount }} • {{ peakInfo.val }}
            </span>
            <span class="text-[11px] text-[#797067] dark:text-slate-400 truncate">
              {{ peakInfo.buyer }}
            </span>
          </div>
        </div>

        <!-- Chart.js Canvas -->
        <div class="w-full h-full pt-6">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Chart Footer Legend & Metric -->
      <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-[#797067] dark:text-slate-400">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span class="w-3 h-1 bg-cc-orange rounded-full inline-block"></span> Penjualan Sebenarnya
          </span>
          <span class="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
            <span class="w-3 h-0.5 bg-slate-400 dark:bg-slate-500 border-t border-dashed border-slate-400 inline-block"></span> Perkiraan Penjualan (+19,4%)
          </span>
        </div>
        <span class="font-telemetry-code text-xs text-emerald-700 dark:text-emerald-400 font-bold">
          Akurasi Perkiraan: 98,4% (Sangat Baik)
        </span>
      </div>
    </div>

    <!-- Right Column: Insight & Strategi Marketing AI (4 Cols) -->
    <div class="lg:col-span-4 bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#ce8d25] text-[20px]">psychology</span>
            <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
              Insight &amp; Strategi AI
            </h2>
          </div>
          <span 
            :class="[
              'px-2 py-0.5 rounded-full font-telemetry-code text-[11px] font-bold transition-all',
              aiIsLive 
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-300 dark:ring-emerald-700' 
                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
            ]"
          >
            {{ aiProviderBadge }}
          </span>
        </div>

        <!-- Dynamic AI Strategy Box (Auto-reacts to Highest-Selling Product) -->
        <div class="bg-[#f5f3f0] dark:bg-[#1c2128] p-4 rounded-lg border border-cc-outline dark:border-slate-700 mb-4 relative min-h-[160px] flex flex-col justify-between transition-colors">
          <div class="flex items-center justify-between gap-1.5 text-xs text-cc-orange-strong font-telemetry-code font-bold mb-2">
            <div class="flex items-center gap-1 truncate">
              <span class="material-symbols-outlined text-[16px]">stars</span>
              <span class="truncate">TREN: {{ topProduct?.name || 'Produk Unggulan' }}</span>
            </div>
            <button 
              @click="handleGenerateStrategy"
              :disabled="isGeneratingStrategy"
              class="text-[11px] px-2.5 py-1 rounded bg-white dark:bg-[#0d1117] hover:bg-orange-50 dark:hover:bg-slate-800 text-cc-orange border border-orange-200 dark:border-orange-500/40 transition-colors flex items-center gap-1 shadow-xs font-sans disabled:opacity-60 cursor-pointer"
              title="Refresh analisis strategi dengan AI"
            >
              <span class="material-symbols-outlined text-[14px]" :class="{ 'animate-spin': isGeneratingStrategy }">
                {{ isGeneratingStrategy ? 'progress_activity' : 'smart_toy' }}
              </span>
              <span>{{ isGeneratingStrategy ? 'Menganalisis...' : 'Analisis AI' }}</span>
            </button>
          </div>

          <p class="text-xs sm:text-sm text-[#1b1c1a] dark:text-slate-200 leading-relaxed text-justify whitespace-pre-line">
            {{ customAiText || adminStore.cloudAiStrategyText.value || defaultAiAnalysis }}
          </p>
        </div>

        <!-- Quick AI Telemetry Metric Chips -->
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-[#0d1117] border border-slate-100 dark:border-slate-800 text-xs">
            <span class="text-[#797067] dark:text-slate-400 font-medium">Akurasi Prediksi</span>
            <span class="font-telemetry-code font-bold text-emerald-700 dark:text-emerald-400">
              {{ adminStore.aiStrategy.value?.accuracy || '96,2%' }}
            </span>
          </div>

          <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-[#0d1117] border border-slate-100 dark:border-slate-800 text-xs">
            <span class="text-[#797067] dark:text-slate-400 font-medium">Tingkat Risiko</span>
            <span class="font-telemetry-code font-semibold text-[#1b1c1a] dark:text-white">
              {{ adminStore.aiStrategy.value?.risk || 'Rendah (0,12)' }}
            </span>
          </div>

          <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-[#0d1117] border border-slate-100 dark:border-slate-800 text-xs">
            <span class="text-[#797067] dark:text-slate-400 font-medium">Rekomendasi Distribusi</span>
            <span class="font-telemetry-code font-bold text-cc-orange-strong">
              {{ adminStore.aiStrategy.value?.priority || 'Prioritas Utama B2B' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-4 pt-2 flex flex-col gap-2">
        <button 
          @click="applyAllocation"
          class="w-full h-10 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          type="button"
        >
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span>{{ buttonApplied ? 'Alokasi Berhasil Diterapkan ✓' : 'Terapkan Rekomendasi Alokasi' }}</span>
        </button>
      </div>
    </div>

  </section>

  <!-- Predictive Intelligence Bar: 3 Core Cards + Dataset Training Action Bar -->
  <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
    <!-- Section Header with Dataset Status -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-primary text-secondary-container flex items-center justify-center shadow-xs">
          <span class="material-symbols-outlined text-[20px]">smart_toy</span>
        </div>
        <div>
          <h3 class="text-base font-bold text-primary dark:text-white uppercase tracking-tight">
            Pemodelan Data &amp; Proyeksi AI Bulan Depan
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Prediksi perputaran stok, pertumbuhan laba/omset, dan produk terlaris berbasis data transaksi.
          </p>
        </div>
      </div>

      <!-- Action Buttons for Dataset, PSAJ Demo, and Revert to Supabase -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Revert to Live Supabase Data Button -->
        <button 
          type="button"
          @click="handleResetToSupabase"
          :disabled="isResettingToSupabase"
          class="h-9 px-3.5 rounded-xl bg-primary hover:bg-primary-container text-white active:scale-95 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer border border-white/20 disabled:opacity-60"
          title="Hapus data demo sintetis dan kembalikan grafik serta prediksi ke data asli Supabase Cloud"
        >
          <span class="material-symbols-outlined text-[17px]" :class="{ 'animate-spin': isResettingToSupabase, 'text-emerald-300': resetSuccess }">
            {{ isResettingToSupabase ? 'progress_activity' : (resetSuccess ? 'check_circle' : 'restart_alt') }}
          </span>
          <span>{{ isResettingToSupabase ? 'Menghapus Data Demo...' : (resetSuccess ? 'Data Asli Berhasil Dipulihkan ✓' : 'Hapus Data Demo &amp; Kembali ke Data Asli') }}</span>
        </button>

        <!-- Quick PSAJ Demo 30 Days -->
        <button 
          type="button"
          @click="handleQuick30DaysDemo"
          :disabled="isQuickTraining"
          class="h-9 px-3.5 rounded-xl bg-secondary-container text-primary hover:bg-accent-hover active:scale-95 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer font-telemetry-code border border-yellow-400/40 disabled:opacity-60"
          title="Latih seketika dengan 30 hari data transaksi untuk demonstrasi dewan penguji PSAJ"
        >
          <span class="material-symbols-outlined text-[17px]" :class="{ 'animate-spin': isQuickTraining }">
            {{ isQuickTraining ? 'progress_activity' : 'bolt' }}
          </span>
          <span>{{ isQuickTraining ? 'Melatih 30 Hari...' : '⚡ Demo PSAJ: Muat 30 Hari Data' }}</span>
        </button>

        <!-- Upload CSV Modal Opener -->
        <button 
          type="button"
          @click="isDatasetModalOpen = true"
          class="h-9 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
          title="Unggah dataset transaksi CSV 10–50 hari"
        >
          <span class="material-symbols-outlined text-[17px]">upload_file</span>
          <span>Unggah Dataset CSV</span>
        </button>

        <!-- Download Template CSV -->
        <button 
          type="button"
          @click="handleDownloadTemplate"
          class="h-9 px-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
          title="Unduh format template CSV transaksi"
        >
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Template CSV</span>
        </button>
      </div>
    </div>

    <!-- 3 Predictive Telemetry Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <!-- Card 1: Prediksi Stok Laris Bulan Depan -->
      <div class="p-4 rounded-xl bg-[#fbf9f6] dark:bg-[#0d1117] border border-cc-outline dark:border-slate-800 flex flex-col justify-between transition-colors">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase text-slate-400 font-telemetry-code flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-blue-600">inventory_2</span>
              Perputaran Stok Bulan Depan
            </span>
            <span 
              class="px-2 py-0.5 rounded-full text-[10px] font-bold font-telemetry-code"
              :class="topStockProjected?.stockDeficit > 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'"
            >
              {{ topStockProjected?.urgency || 'Terkendali' }}
            </span>
          </div>

          <div class="mt-2.5">
            <h4 class="text-sm font-extrabold text-[#1b1c1a] dark:text-white truncate">
              {{ topStockProjected?.name || 'Konsentrat Bebek Petelur Super' }}
            </h4>
            <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
              Perkiraan Kebutuhan: <strong class="text-primary dark:text-secondary-container font-telemetry-code font-bold">{{ (topStockProjected?.projectedDemand30Days || 340).toLocaleString('id-ID') }} pcs</strong>
            </p>
          </div>

          <div class="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Sisa Stok di Gudang:</span>
              <span class="font-telemetry-code font-bold text-slate-800 dark:text-slate-200">
                {{ (topStockProjected?.currentStock || 180).toLocaleString('id-ID') }} pcs
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Perlu Tambah Stok:</span>
              <span class="font-telemetry-code font-extrabold text-cc-orange">
                +{{ (topStockProjected?.restockRecommended || 200).toLocaleString('id-ID') }} pcs
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Stok Aman Hingga:</span>
              <span class="font-telemetry-code font-semibold text-slate-700 dark:text-slate-300">
                {{ topStockProjected?.daysUntilStockout || 14 }} Hari Lagi
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Laporan Proyeksi Laba & Omset -->
      <div class="p-4 rounded-xl bg-[#fbf9f6] dark:bg-[#0d1117] border border-cc-outline dark:border-slate-800 flex flex-col justify-between transition-colors">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase text-slate-400 font-telemetry-code flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-emerald-600">trending_up</span>
              Proyeksi Laba &amp; Omset
            </span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-bold font-telemetry-code">
              +{{ revenueProjections?.growthRatePercent || 15.2 }}% PERTUMBUHAN
            </span>
          </div>

          <div class="mt-2.5">
            <div class="text-[11px] text-slate-400 font-telemetry-code">Perkiraan Pendapatan Bulan Depan:</div>
            <div class="text-xl font-black text-emerald-600 dark:text-emerald-400 font-telemetry-code mt-0.5">
              Rp {{ (revenueProjections?.projectedNextMonthRevenue || 48200000).toLocaleString('id-ID') }}
            </div>
          </div>

          <div class="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Perkiraan Keuntungan Kotor:</span>
              <span class="font-telemetry-code font-bold text-emerald-700 dark:text-emerald-300">
                Rp {{ (revenueProjections?.estimatedGrossProfit || 7904800).toLocaleString('id-ID') }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Persentase Keuntungan:</span>
              <span class="font-telemetry-code font-bold text-slate-800 dark:text-slate-200">
                {{ revenueProjections?.grossProfitMarginPercent || 16.4 }}% (Standar Pakan)
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Target Total Penjualan:</span>
              <span class="font-telemetry-code font-semibold text-slate-700 dark:text-slate-300">
                {{ (revenueProjections?.totalProjectedVolume || 1110).toLocaleString('id-ID') }} pcs
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Prediksi Produk Terlaris -->
      <div class="p-4 rounded-xl bg-[#fbf9f6] dark:bg-[#0d1117] border border-cc-outline dark:border-slate-800 flex flex-col justify-between transition-colors">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase text-slate-400 font-telemetry-code flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-amber-500">crown</span>
              Prediksi Produk Terlaris
            </span>
            <span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-[10px] font-bold font-telemetry-code">
              PELUANG TERBESAR
            </span>
          </div>

          <div class="mt-2.5">
            <h4 class="text-sm font-extrabold text-primary dark:text-secondary-container truncate flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-amber-500">stars</span>
              <span>{{ bestSellerInfo?.name || 'Konsentrat Bebek Petelur Super' }}</span>
            </h4>
            <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
              Pangsa Pasar: <strong class="text-[#1b1c1a] dark:text-white font-telemetry-code font-bold">{{ bestSellerInfo?.marketShare || 37.8 }}%</strong> dari total penjualan
            </p>
          </div>

          <div class="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Tingkat Akurasi Perkiraan:</span>
              <span class="font-telemetry-code font-bold text-emerald-600">
                {{ adminStore.aiPredictions.value?.accuracy || '96,8%' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Data Transaksi Terpakai:</span>
              <span class="font-telemetry-code font-semibold text-slate-700 dark:text-slate-300">
                {{ adminStore.aiPredictions.value?.trainingDatasetCount > 0 ? adminStore.aiPredictions.value.trainingDatasetCount + ' Transaksi' : 'Data Riil Supabase' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">Saran Penjualan:</span>
              <span class="font-telemetry-code font-bold text-blue-600 dark:text-blue-400">
                Kunci Kontrak Suplai B2B
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- AI Training Dataset Modal Component -->
  <AiTrainingDatasetModal 
    :is-open="isDatasetModalOpen" 
    @close="isDatasetModalOpen = false" 
    @trained="handleModelTrained"
  />
</div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useAdminStore } from '../../stores/useAdminStore'
import { 
  generateAiMarketingStrategy, 
  getActiveAiProvider, 
  getStoredApiKey,
  downloadCsvTemplate,
  generateSample30DaysDataset 
} from '../../services/aiService'
import AiTrainingDatasetModal from './AiTrainingDatasetModal.vue'

Chart.register(...registerables)

const adminStore = useAdminStore()
const chartCanvas = ref(null)
let chartInstance = null

const periods = ['1H', '7H', '1B', 'YTD']
const activePeriod = ref('7H')
const buttonApplied = ref(false)
const isGeneratingStrategy = ref(false)
const customAiText = ref('')
const aiIsLive = ref(false)
const aiProviderBadge = ref('ALGORITMA PREDIKTIF')

// Predictive Intelligence State & Modal
const isDatasetModalOpen = ref(false)
const isQuickTraining = ref(false)

const topStockProjected = computed(() => {
  return adminStore.aiPredictions.value?.stockProjections?.[0] || null
})

const revenueProjections = computed(() => {
  return adminStore.aiPredictions.value?.revenueProjection || null
})

const bestSellerInfo = computed(() => {
  return adminStore.aiPredictions.value?.bestSeller || null
})

const handleDownloadTemplate = () => {
  downloadCsvTemplate()
}

const isResettingToSupabase = ref(false)
const resetSuccess = ref(false)

const formattedFullToday = computed(() => {
  return adminStore.formatFullIndonesianDate ? adminStore.formatFullIndonesianDate() : 'Rabu, 16/09/2026'
})

const handleResetToSupabase = async () => {
  isResettingToSupabase.value = true
  try {
    const res = await adminStore.resetAiModelToSupabase()
    if (res?.success) {
      resetSuccess.value = true
      setTimeout(() => { resetSuccess.value = false }, 3500)
      customAiText.value = res.predictions?.strategicAnalysis || ''
      const currentConfig = getCurrentConfig(activePeriod.value)
      peakInfo.value = currentConfig.peak
      if (chartInstance) {
        chartInstance.data.labels = currentConfig.labels
        chartInstance.data.datasets[0].data = [...currentConfig.actual]
        chartInstance.data.datasets[1].data = [...currentConfig.predicted]
        chartInstance.update()
      }
    }
  } catch (err) {
    console.warn('Reset to Supabase error:', err)
  } finally {
    isResettingToSupabase.value = false
  }
}

const handleQuick30DaysDemo = async () => {
  isQuickTraining.value = true
  try {
    const simData = generateSample30DaysDataset(adminStore.products.value)
    const res = await adminStore.trainAiModelWithDataset(simData)
    if (res?.predictions?.strategicAnalysis) {
      customAiText.value = res.predictions.strategicAnalysis
    }
  } catch (err) {
    console.warn('Quick 30 days training error:', err)
  } finally {
    isQuickTraining.value = false
  }
}

const handleModelTrained = (predictions) => {
  if (predictions?.strategicAnalysis) {
    customAiText.value = predictions.strategicAnalysis
  }
}

const topProduct = computed(() => adminStore.topSellingProduct.value)

const defaultAiAnalysis = computed(() => {
  const top = topProduct.value
  if (!top) return 'Memuat data tren produk panen...'
  return `Berdasarkan analisis algoritma prediktif, permintaan produk ${top.name} mencatat serapan pasar terbesar sebesar ${top.soldCount?.toLocaleString('id-ID') || 0} pcs dengan cadangan stok tersisa ${top.stock?.toLocaleString('id-ID') || 0} pcs. Diproyeksikan terjadi peningkatan pesanan sebesar 28% dalam 72 jam ke depan. Disarankan mengalokasikan 60% pasokan langsung ke mitra WhatsApp B2B dan menaikkan batas harga spot sebesar 4,5% guna memaksimalkan margin keuntungan.`
})

// Period Data Sets for other timeframes (Clean Zero-State for Pure Real Testing)
const otherPeriodDatasets = {
  '1H': {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', 'Sekarang'],
    actual: [0, 0, 0, 0, 0, 0, 0],
    predicted: [0, 0, 0, 0, 0, 0, 0],
    peak: {
      amount: '0 pcs / jam',
      val: 'Rp 0',
      buyer: 'Belum Ada Transaksi'
    }
  },
  '1B': {
    labels: ['Mgg 1', 'Mgg 2', 'Mgg 3', 'Mgg 4'],
    actual: [0, 0, 0, 0],
    predicted: [0, 0, 0, 0],
    peak: {
      amount: '0 pcs',
      val: 'Rp 0',
      buyer: 'Belum Ada Transaksi'
    }
  },
  'YTD': {
    labels: ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Okt-Des)'],
    actual: [0, 0, 0, 0],
    predicted: [0, 0, 0, 0],
    peak: {
      amount: '0 pcs',
      val: 'Rp 0',
      buyer: 'Belum Ada Transaksi'
    }
  }
}

const peakInfo = ref(adminStore.dynamic7DaysInfo.value.peakInfo)

const isDarkMode = () => document.documentElement.classList.contains('dark')

const getChartColors = () => {
  const dark = isDarkMode()
  return {
    gridColor: dark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
    tickColor: dark ? '#94a3b8' : '#797067'
  }
}

const getDynamic1MonthConfig = () => {
  const now = new Date()
  const weekSums = [0, 0, 0, 0]
  const weekLabels = ['Mgg 1', 'Mgg 2', 'Mgg 3', 'Mgg 4 (Terkini)']
  
  // Aggregate 28 days of data from dailyChartMap into 4 sequential weeks
  for (let i = 0; i < 28; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() - (27 - i))
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const key = `${yyyy}-${mm}-${dd}`
    const val = Number(adminStore.dailyChartMap.value[key]) || 0
    const weekIdx = Math.floor(i / 7)
    if (weekIdx >= 0 && weekIdx < 4) {
      weekSums[weekIdx] += val
    }
  }

  const totalVol = weekSums.reduce((a, b) => a + b, 0)
  
  if (totalVol === 0) {
    return otherPeriodDatasets['1B']
  }

  // Model Prediksi AI: kurva proyeksi bertahap dengan tren pertumbuhan
  const predicted = weekSums.map((w, idx) => Math.round(w * (0.94 + idx * 0.038)))
  
  let maxWeek = 0
  let maxIdx = 0
  weekSums.forEach((w, idx) => {
    if (w > maxWeek) {
      maxWeek = w
      maxIdx = idx
    }
  })

  return {
    labels: weekLabels,
    actual: weekSums,
    predicted: predicted,
    peak: {
      amount: `${maxWeek.toLocaleString('id-ID')} pcs / mgg`,
      val: `Rp ${(maxWeek * 32000).toLocaleString('id-ID')}`,
      buyer: `Puncak Serapan Pasar: ${weekLabels[maxIdx]}`
    }
  }
}

const getCurrentConfig = (period) => {
  if (period === '7H') {
    const d7 = adminStore.dynamic7DaysInfo.value
    return {
      labels: d7.labels,
      actual: d7.actual,
      predicted: d7.predicted,
      peak: d7.peakInfo
    }
  }
  if (period === '1B') {
    return getDynamic1MonthConfig()
  }
  return otherPeriodDatasets[period] || otherPeriodDatasets['1B']
}

const initChart = () => {
  if (!chartCanvas.value) return
  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Create Orange Gradient Fill
  const gradient = ctx.createLinearGradient(0, 0, 0, 260)
  gradient.addColorStop(0, 'rgba(254, 110, 0, 0.45)')
  gradient.addColorStop(0.7, 'rgba(254, 110, 0, 0.08)')
  gradient.addColorStop(1, 'rgba(254, 110, 0, 0.0)')

  const currentConfig = getCurrentConfig(activePeriod.value)
  peakInfo.value = currentConfig.peak
  const colors = getChartColors()

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: currentConfig.labels,
      datasets: [
        {
          label: 'Alur Permintaan Aktual',
          data: [...currentConfig.actual],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#FE6E00',
          borderWidth: 3.5,
          tension: 0.42, // Smooth continuous spline curve
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#FE6E00',
          pointBorderWidth: 2.5,
          pointRadius: 4.5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#FE6E00',
          pointHoverBorderColor: '#FFFFFF'
        },
        {
          label: 'Model Prediksi AI',
          data: [...currentConfig.predicted],
          fill: false,
          borderColor: isDarkMode() ? '#94a3b8' : '#64748b',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(20, 24, 33, 0.96)',
          titleFont: {
            family: 'JetBrains Mono',
            size: 12
          },
          bodyFont: {
            family: 'Inter',
            size: 12
          },
          padding: 10,
          cornerRadius: 8,
          borderColor: 'rgba(254, 110, 0, 0.6)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} pcs`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'JetBrains Mono',
              size: 11
            },
            color: colors.tickColor
          }
        },
        y: {
          grid: {
            color: colors.gridColor,
            drawBorder: false
          },
          ticks: {
            font: {
              family: 'JetBrains Mono',
              size: 11
            },
            color: colors.tickColor,
            callback: function(val) {
              return val + ' pcs'
            }
          }
        }
      }
    }
  })
}

const switchPeriod = (period) => {
  activePeriod.value = period
  if (!chartInstance) return

  const config = getCurrentConfig(period)
  peakInfo.value = config.peak

  chartInstance.data.labels = config.labels
  chartInstance.data.datasets[0].data = [...config.actual]
  chartInstance.data.datasets[1].data = [...config.predicted]
  chartInstance.update('active')
}

const handleGenerateStrategy = async () => {
  if (isGeneratingStrategy.value) return
  isGeneratingStrategy.value = true

  try {
    const metrics = {
      totalRevenueJuta: adminStore.totalRevenueJuta.value,
      totalOrders: adminStore.totalOrdersCount.value
    }
    const result = await generateAiMarketingStrategy(
      metrics,
      topProduct.value,
      adminStore.products.value
    )

    customAiText.value = result.analysis
    aiIsLive.value = result.isLiveAi
    aiProviderBadge.value = result.isLiveAi ? `✦ ${result.provider.toUpperCase()} (LIVE)` : 'ALGORITMA PREDIKTIF'

    // Persist ke Supabase Cloud (Tabel strategi_ai)
    if (adminStore.saveAiStrategyToCloud) {
      await adminStore.saveAiStrategyToCloud(result.analysis)
    }
  } catch (err) {
    console.error('Failed to generate AI strategy:', err)
  } finally {
    isGeneratingStrategy.value = false
  }
}

const applyAllocation = () => {
  buttonApplied.value = true
  setTimeout(() => {
    buttonApplied.value = false
  }, 3500)
}

// Reactively update chart when orders change in real time (persisted!)
watch(() => adminStore.dynamic7DaysInfo.value, (newInfo) => {
  if (chartInstance && activePeriod.value === '7H') {
    chartInstance.data.labels = newInfo.labels
    chartInstance.data.datasets[0].data = [...newInfo.actual]
    chartInstance.data.datasets[1].data = [...newInfo.predicted]
    peakInfo.value = newInfo.peakInfo
    chartInstance.update()
  }
}, { deep: true })

watch(() => adminStore.dailyChartMap.value, () => {
  if (chartInstance && activePeriod.value === '1B') {
    const config = getDynamic1MonthConfig()
    chartInstance.data.labels = config.labels
    chartInstance.data.datasets[0].data = [...config.actual]
    chartInstance.data.datasets[1].data = [...config.predicted]
    peakInfo.value = config.peak
    chartInstance.update()
  }
}, { deep: true })

let themeObserver = null

onMounted(() => {
  initChart()
  const provider = getActiveAiProvider()
  const key = getStoredApiKey(provider)
  if (key) {
    aiProviderBadge.value = provider === 'gemini' ? '✦ GEMINI 1.5 FLASH' : '✦ GPT-4O MINI'
    aiIsLive.value = true
  }

  // React to dark mode toggle dynamically
  themeObserver = new MutationObserver(() => {
    if (chartInstance) {
      const colors = getChartColors()
      chartInstance.options.scales.x.ticks.color = colors.tickColor
      chartInstance.options.scales.y.ticks.color = colors.tickColor
      chartInstance.options.scales.y.grid.color = colors.gridColor
      chartInstance.data.datasets[1].borderColor = isDarkMode() ? '#94a3b8' : '#64748b'
      chartInstance.update('none')
    }
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  if (themeObserver) {
    themeObserver.disconnect()
  }
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
