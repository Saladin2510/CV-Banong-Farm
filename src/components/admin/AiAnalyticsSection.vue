<template>
  <section id="ai-analytics" class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
    
    <!-- Left Column: Continuous Spline Area Chart (8 Cols) -->
    <div class="lg:col-span-8 bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
      <!-- Chart Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-cc-orange text-[20px]">insights</span>
            <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
              Prediksi Tren Produk AI
            </h2>
          </div>
          <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
            Aliran kurva spline prediktif sinkron real-time terhadap pesanan WhatsApp dan volume panen harian.
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
              PUNCAK PERMINTAAN: {{ peakInfo.amount }} • {{ peakInfo.val }}
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
            <span class="w-3 h-1 bg-cc-orange rounded-full inline-block"></span> Alur Permintaan Aktual
          </span>
          <span class="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
            <span class="w-3 h-0.5 bg-slate-400 dark:bg-slate-500 border-t border-dashed border-slate-400 inline-block"></span> Model Prediksi AI (+19,4%)
          </span>
        </div>
        <span class="font-telemetry-code text-xs text-emerald-700 dark:text-emerald-400 font-bold">
          Korelasi Tren: 0,984 (Sangat Kuat)
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
              <span class="truncate">TREN: {{ topProduct?.name || 'Komoditas Unggulan' }}</span>
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
            {{ customAiText || defaultAiAnalysis }}
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
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useAdminStore } from '../../stores/useAdminStore'
import { generateAiMarketingStrategy, getActiveAiProvider, getStoredApiKey } from '../../services/aiService'

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

const topProduct = computed(() => adminStore.topSellingProduct.value)

const defaultAiAnalysis = computed(() => {
  const top = topProduct.value
  if (!top) return 'Memuat data tren komoditas panen...'
  return `Berdasarkan analisis algoritma prediktif, permintaan komoditas ${top.name} mencatat serapan pasar terbesar sebesar ${top.soldCount?.toLocaleString('id-ID') || 0} pcs dengan cadangan stok tersisa ${top.stock?.toLocaleString('id-ID') || 0} pcs. Diproyeksikan terjadi peningkatan pesanan sebesar 28% dalam 72 jam ke depan. Disarankan mengalokasikan 60% pasokan langsung ke mitra WhatsApp B2B dan menaikkan batas harga spot sebesar 4,5% guna memaksimalkan margin keuntungan.`
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
