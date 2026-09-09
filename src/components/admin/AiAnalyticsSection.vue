<template>
  <section id="ai-analytics" class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
    
    <!-- Left Column: Continuous Spline Area Chart (8 Cols) -->
    <div class="lg:col-span-8 bg-white rounded-xl p-5 border border-cc-outline shadow-sm flex flex-col justify-between">
      <!-- Chart Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-cc-orange text-[20px]">insights</span>
            <h2 class="text-lg font-bold text-[#1b1c1a] uppercase tracking-tight">
              Prediksi Tren Produk AI
            </h2>
          </div>
          <p class="text-xs text-[#797067] mt-0.5">
            Aliran kurva spline prediktif yang mengkorelasikan volume pesanan WhatsApp terhadap harga keseimbangan panen dinamis.
          </p>
        </div>

        <!-- Period Filter Pills -->
        <div class="flex items-center bg-slate-100 rounded-lg p-1 gap-1 self-start sm:self-auto select-none">
          <button 
            v-for="period in periods" 
            :key="period"
            @click="activePeriod = period"
            :class="[
              'px-2.5 py-1 rounded font-telemetry-code text-xs transition-colors',
              activePeriod === period 
                ? 'bg-cc-orange text-white font-bold shadow-xs' 
                : 'text-[#594136] hover:text-[#1b1c1a]'
            ]"
            type="button"
          >
            {{ period }}
          </button>
        </div>
      </div>

      <!-- Chart Display with Floating Peak Telemetry Node -->
      <div class="relative w-full h-72 sm:h-80 bg-[#fbf9f6] rounded-lg p-3 flex flex-col justify-between overflow-hidden border border-slate-100">
        <!-- Floating Interactive Tooltip Node -->
        <div class="absolute top-3 left-1/2 -translate-x-1/2 sm:left-[54%] z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cc-orange shadow-md flex items-center gap-2 max-w-xs sm:max-w-md pointer-events-none">
          <span class="w-2 h-2 rounded-full bg-cc-orange animate-ping"></span>
          <div class="flex flex-col">
            <span class="font-telemetry-code text-xs text-cc-orange-strong font-bold">
              PUNCAK PERMINTAAN: {{ peakInfo.amount }} • {{ peakInfo.val }}
            </span>
            <span class="text-[11px] text-[#797067]">
              Kanal WA: {{ peakInfo.buyer }}
            </span>
          </div>
        </div>

        <!-- Chart.js Canvas -->
        <div class="w-full h-full pt-6">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Chart Footer Legend & Metric -->
      <div class="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-[#797067]">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5 font-medium">
            <span class="w-3 h-1 bg-cc-orange rounded-full inline-block"></span> Alur Permintaan Aktual
          </span>
          <span class="flex items-center gap-1.5 font-medium">
            <span class="w-3 h-0.5 bg-slate-500 border-t border-dashed border-slate-500 inline-block"></span> Model Prediksi AI (+19,4%)
          </span>
        </div>
        <span class="font-telemetry-code text-xs text-emerald-700 font-bold">
          Korelasi Tren: 0,984 (Sangat Kuat)
        </span>
      </div>
    </div>

    <!-- Right Column: Insight & Strategi Marketing AI (4 Cols) -->
    <div class="lg:col-span-4 bg-white rounded-xl p-5 border border-cc-outline shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#ce8d25] text-[20px]">psychology</span>
            <h2 class="text-lg font-bold text-[#1b1c1a] uppercase tracking-tight">
              Insight &amp; Strategi AI
            </h2>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-telemetry-code text-xs font-bold">
            TERVERIFIKASI
          </span>
        </div>

        <!-- Dynamic AI Strategy Box (Auto-reacts to Highest-Selling Product) -->
        <div class="bg-[#f5f3f0] p-4 rounded-lg border border-cc-outline mb-4">
          <div class="flex items-center gap-1.5 text-xs text-cc-orange-strong font-telemetry-code font-bold mb-1.5">
            <span class="material-symbols-outlined text-[16px]">stars</span>
            <span>PRODUK TREN TERTINGGI: {{ adminStore.topSellingProduct.value?.name }}</span>
          </div>

          <p class="text-sm text-[#1b1c1a] leading-relaxed text-justify">
            Berdasarkan analisis algoritma prediktif, permintaan komoditas 
            <strong class="text-cc-orange-strong font-bold">
              {{ adminStore.topSellingProduct.value?.name }}
            </strong>
            mencatat serapan pasar terbesar sebesar 
            <strong class="font-telemetry-code font-semibold">
              {{ adminStore.topSellingProduct.value?.soldCount.toLocaleString('id-ID') }} kg
            </strong>
            dengan cadangan stok tersisa 
            <strong class="font-telemetry-code font-semibold">
              {{ adminStore.topSellingProduct.value?.stock.toLocaleString('id-ID') }} kg
            </strong>.
            Diproyeksikan terjadi peningkatan pesanan sebesar 28% dalam 72 jam ke depan. Disarankan mengalokasikan 60% pasokan Kluster 04 langsung ke mitra WhatsApp B2B dan menaikkan batas harga spot sebesar 4,5% guna memaksimalkan margin keuntungan.
          </p>
        </div>

        <!-- Quick AI Telemetry Metric Chips -->
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <span class="text-[#797067] font-medium">Akurasi Prediksi</span>
            <span class="font-telemetry-code font-bold text-emerald-700">
              {{ adminStore.aiStrategy.value.accuracy }}
            </span>
          </div>

          <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <span class="text-[#797067] font-medium">Tingkat Risiko</span>
            <span class="font-telemetry-code font-semibold text-[#1b1c1a]">
              {{ adminStore.aiStrategy.value.risk }}
            </span>
          </div>

          <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-xs">
            <span class="text-[#797067] font-medium">Rekomendasi Distribusi</span>
            <span class="font-telemetry-code font-bold text-cc-orange-strong">
              {{ adminStore.aiStrategy.value.priority }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-4 pt-2">
        <button 
          @click="applyAllocation"
          class="w-full h-10 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
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
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useAdminStore } from '../../stores/useAdminStore'

Chart.register(...registerables)

const adminStore = useAdminStore()
const chartCanvas = ref(null)
let chartInstance = null

const periods = ['1H', '7H', '1B', 'YTD']
const activePeriod = ref('7H')
const buttonApplied = ref(false)

const peakInfo = ref({
  amount: '240 kg',
  val: 'Rp 38.500.000',
  buyer: 'Distributor Jabodetabek'
})

const initChart = () => {
  if (!chartCanvas.value) return
  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Create Orange Gradient Fill
  const gradient = ctx.createLinearGradient(0, 0, 0, 260)
  gradient.addColorStop(0, 'rgba(254, 110, 0, 0.45)')
  gradient.addColorStop(0.7, 'rgba(254, 110, 0, 0.08)')
  gradient.addColorStop(1, 'rgba(254, 110, 0, 0.0)')

  const labels = ['Sen (H-6)', 'Sel (H-5)', 'Rab (H-4)', 'Kam (H-3)', 'Jum (Puncak)', 'Sab (H-1)', 'Min (Hari Ini)']
  
  // Base demand dataset
  const actualData = [120, 145, 175, 195, 240, 210, 225]
  const predictedData = [110, 130, 160, 205, 230, 235, 250]

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Alur Permintaan Aktual',
          data: actualData,
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
          data: predictedData,
          fill: false,
          borderColor: '#64748b',
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
          backgroundColor: 'rgba(30, 27, 24, 0.95)',
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
          borderColor: 'rgba(254, 110, 0, 0.4)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} kg`
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
            color: '#797067'
          }
        },
        y: {
          grid: {
            color: '#e2e8f0',
            drawBorder: false
          },
          ticks: {
            font: {
              family: 'JetBrains Mono',
              size: 11
            },
            color: '#797067',
            callback: function(val) {
              return val + ' kg'
            }
          }
        }
      }
    }
  })
}

const applyAllocation = () => {
  buttonApplied.value = true
  setTimeout(() => {
    buttonApplied.value = false
  }, 3500)
}

// Reactively update chart when orders change
watch(() => adminStore.whatsappOrders.value.length, () => {
  if (chartInstance) {
    const lastDataset = chartInstance.data.datasets[0]
    // Add small bump to current day's metric
    lastDataset.data[6] = Math.min(300, lastDataset.data[6] + 15)
    chartInstance.update()
  }
})

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
