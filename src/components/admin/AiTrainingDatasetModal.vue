<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm select-none"
      @click.self="handleClose"
    >
      <div 
        class="relative w-full max-w-2xl bg-white dark:bg-[#0E1726] rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-all animate-scale-up"
      >
        <!-- Modal Header (Navy 30% background accent) -->
        <div class="bg-primary text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-secondary-container shadow-inner">
              <span class="material-symbols-outlined text-[24px]">model_training</span>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>Pelatihan Model Prediksi AI</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-primary font-telemetry-code font-black uppercase">
                  Dataset 10–50 Hari
                </span>
              </h3>
              <p class="text-xs text-slate-300 mt-0.5">
                Olah data transaksi untuk memproyeksikan stok laris, laba/omset, dan best seller bulan depan.
              </p>
            </div>
          </div>

          <button 
            @click="handleClose" 
            class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Modal"
            type="button"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Mode Selector Tabs -->
        <div class="flex border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#0d131f] px-5 sm:px-6 pt-3 gap-2 text-xs font-semibold">
          <button 
            type="button"
            @click="activeTab = 'upload'"
            :class="[
              'pb-2.5 px-3 border-b-2 font-telemetry-code transition-all cursor-pointer flex items-center gap-1.5',
              activeTab === 'upload'
                ? 'border-primary dark:border-secondary-container text-primary dark:text-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">upload_file</span>
            <span>Unggah Dataset CSV</span>
          </button>

          <button 
            type="button"
            @click="activeTab = 'demo'"
            :class="[
              'pb-2.5 px-3 border-b-2 font-telemetry-code transition-all cursor-pointer flex items-center gap-1.5',
              activeTab === 'demo'
                ? 'border-primary dark:border-secondary-container text-primary dark:text-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">bolt</span>
            <span>Simulasi 30 Hari (Demo PSAJ)</span>
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-5 sm:p-6 overflow-y-auto flex flex-col gap-4 text-xs">
          
          <!-- TAB 1: Upload CSV -->
          <div v-if="activeTab === 'upload'" class="flex flex-col gap-4">
            
            <!-- Information Banner & Template Download -->
            <div class="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-blue-950 dark:text-blue-200">
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[18px] shrink-0 mt-0.5">info</span>
                <div class="flex flex-col">
                  <span class="font-bold">Format Kolom CSV yang Didukung:</span>
                  <p class="text-[11px] text-blue-800 dark:text-blue-300 font-telemetry-code mt-0.5">
                    tanggal, kode_pesanan, nama_produk, jumlah_pcs, harga_satuan, total_harga
                  </p>
                </div>
              </div>

              <!-- Download Template Button -->
              <button 
                type="button"
                @click="handleDownloadTemplate"
                class="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-700 hover:bg-blue-100 transition-all flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer shadow-xs"
              >
                <span class="material-symbols-outlined text-[16px]">download</span>
                <span>Unduh Template CSV</span>
              </button>
            </div>

            <!-- Drag & Drop Zone -->
            <div 
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              :class="[
                'border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-3 transition-all cursor-pointer',
                isDragging 
                  ? 'border-primary bg-primary/5 dark:bg-primary/20 scale-[1.01]' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800/50'
              ]"
              @click="triggerFileInput"
            >
              <input 
                ref="fileInputRef" 
                type="file" 
                accept=".csv,text/csv" 
                class="hidden" 
                @change="handleFileSelected"
              />

              <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-secondary-container flex items-center justify-center">
                <span class="material-symbols-outlined text-[28px]">cloud_upload</span>
              </div>

              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-800 dark:text-white">
                  {{ selectedFileName || 'Klik atau seret file CSV transaksi ke sini' }}
                </span>
                <span class="text-slate-400 mt-1">
                  Mendukung data transaksi riil dari kasir/gudang (10–50 hari)
                </span>
              </div>
            </div>

            <!-- Parsed Data Preview -->
            <div v-if="parsedData.length > 0" class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-700 dark:text-slate-300 font-telemetry-code">
                  Pratinjau Data ({{ parsedData.length }} Baris Transaksi Terbaca):
                </span>
                <span class="text-emerald-700 dark:text-emerald-400 font-bold font-telemetry-code text-[11px]">
                  ✓ Siap Dilatih
                </span>
              </div>

              <div class="max-h-40 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table class="w-full text-left text-[11px]">
                  <thead class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 sticky top-0 font-telemetry-code font-bold">
                    <tr>
                      <th class="p-2">Tanggal</th>
                      <th class="p-2">Komoditas Produk</th>
                      <th class="p-2 text-right">Jumlah</th>
                      <th class="p-2 text-right">Total Tagihan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr v-for="(row, idx) in parsedData.slice(0, 5)" :key="idx" class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <td class="p-2 font-telemetry-code">{{ row.tanggal }}</td>
                      <td class="p-2 font-semibold">{{ row.nama_produk }}</td>
                      <td class="p-2 text-right font-telemetry-code">{{ row.jumlah_pcs }} pcs</td>
                      <td class="p-2 text-right font-telemetry-code">Rp {{ Number(row.total_harga).toLocaleString('id-ID') }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- TAB 2: Demo 30 Hari Generator -->
          <div v-else class="flex flex-col gap-4">
            <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
              <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[22px] shrink-0 mt-0.5">bolt</span>
              <div class="flex flex-col">
                <span class="font-bold text-amber-950 dark:text-amber-200 text-sm">Mode Simulasi Ujian PSAJ (30 Hari Historis)</span>
                <p class="text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                  Fitur ini dirancang khusus untuk demonstrasi presentasi di hadapan dewan penguji PSAJ. Sistem akan otomatis men-generate data transaksi 30 hari ke belakang dengan variasi penjualan akhir pekan dan tren pertumbuhan agribisnis nyata CV Banong Farms di Ajibarang.
                </p>
              </div>
            </div>

            <!-- Parameters Preview Card -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-[#0d131f] border border-slate-200/80 dark:border-slate-800 flex flex-col">
                <span class="text-slate-400 font-telemetry-code text-[10px] uppercase">Periode Simulasi</span>
                <span class="font-bold text-sm text-slate-800 dark:text-white mt-0.5 font-telemetry-code">30 Hari Penuh</span>
                <span class="text-[10px] text-slate-400">H-30 hingga hari ini</span>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 dark:bg-[#0d131f] border border-slate-200/80 dark:border-slate-800 flex flex-col">
                <span class="text-slate-400 font-telemetry-code text-[10px] uppercase">Komoditas Dianalisis</span>
                <span class="font-bold text-sm text-slate-800 dark:text-white mt-0.5 font-telemetry-code">4 Produk Pakan</span>
                <span class="text-[10px] text-slate-400">Unggas, Ikan, Sapi, Kasgot</span>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 dark:bg-[#0d131f] border border-slate-200/80 dark:border-slate-800 flex flex-col">
                <span class="text-slate-400 font-telemetry-code text-[10px] uppercase">Model Algoritma</span>
                <span class="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5 font-telemetry-code">WMA + Gemini AI</span>
                <span class="text-[10px] text-slate-400">Dual-Engine Predictor</span>
              </div>
            </div>

            <button 
              type="button"
              @click="handleLoadSimulatedData"
              class="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-slate-300 dark:border-slate-700"
            >
              <span class="material-symbols-outlined text-[18px]">cached</span>
              <span>Muat {{ simulatedData.length > 0 ? 'Ulang' : '' }} Dataset Simulasi 30 Hari ({{ simulatedData.length > 0 ? simulatedData.length + ' Baris' : 'Otomatis' }})</span>
            </button>
          </div>

          <!-- Training Progress Bar Indicator -->
          <div v-if="isTraining" class="p-4 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 flex flex-col gap-2 animate-fade-in">
            <div class="flex items-center justify-between text-xs font-bold text-primary dark:text-secondary-container font-telemetry-code">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                {{ trainingStatusText }}
              </span>
              <span>{{ trainingPercent }}%</span>
            </div>

            <div class="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div 
                class="h-full bg-secondary-container transition-all duration-300"
                :style="{ width: `${trainingPercent}%` }"
              ></div>
            </div>
          </div>

          <!-- Success Alert -->
          <div v-if="trainingFinished && lastResult" class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 animate-fade-in">
            <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[24px] shrink-0">check_circle</span>
            <div class="flex flex-col leading-snug">
              <span class="font-bold text-emerald-950 dark:text-emerald-200">
                Model AI Berhasil Dilatih &amp; Disinkronkan!
              </span>
              <p class="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">
                Data <strong>{{ lastResult.totalHistoricTransactions || lastResult.trainingDatasetCount }} transaksi</strong> telah diintegrasikan. Proyeksi stok laris, estimasi laba/omset bulan depan, dan best seller telah aktif di dashboard.
              </p>
            </div>
          </div>

        </div>

        <!-- Modal Footer Actions (Strict 60:30:10 Accent 10% Golden Yellow for CTA) -->
        <div class="p-4 sm:p-5 bg-slate-50 dark:bg-[#0d131f] border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-[11px] text-slate-500 dark:text-slate-400 font-telemetry-code">
            Total baris siap dilatih: <strong>{{ currentActiveData.length }} transaksi</strong>
          </div>

          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <button 
              type="button"
              @click="handleClose"
              class="h-10 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold transition-all text-xs cursor-pointer"
            >
              {{ trainingFinished ? 'Tutup & Lihat Hasil' : 'Batal' }}
            </button>

            <!-- Primary 10% Gold CTA Button -->
            <button 
              type="button"
              @click="handleStartTraining"
              :disabled="currentActiveData.length === 0 || isTraining"
              class="h-10 px-5 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-400/40 whitespace-nowrap font-telemetry-code"
            >
              <span class="material-symbols-outlined text-[18px]">psychology</span>
              <span>{{ isTraining ? 'Sedang Melatih Model...' : 'Mulai Latih Model Prediksi AI' }}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'
import { downloadCsvTemplate, parseCsvDataset, generateSample30DaysDataset } from '../../services/aiService'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'trained'])

const adminStore = useAdminStore()
const activeTab = ref('upload')
const fileInputRef = ref(null)
const selectedFileName = ref('')
const parsedData = ref([])
const simulatedData = ref([])
const isDragging = ref(false)

const isTraining = ref(false)
const trainingPercent = ref(0)
const trainingStatusText = ref('Mempersiapkan dataset transaksi...')
const trainingFinished = ref(false)
const lastResult = ref(null)

const currentActiveData = computed(() => {
  if (activeTab.value === 'upload') return parsedData.value
  return simulatedData.value
})

const handleDownloadTemplate = () => {
  downloadCsvTemplate()
}

const triggerFileInput = () => {
  if (fileInputRef.value) fileInputRef.value.click()
}

const processCsvFile = (file) => {
  if (!file) return
  selectedFileName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result
    if (text) {
      parsedData.value = parseCsvDataset(text)
    }
  }
  reader.readAsText(file)
}

const handleFileSelected = (event) => {
  const file = event.target.files?.[0]
  if (file) processCsvFile(file)
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) processCsvFile(file)
}

const handleLoadSimulatedData = () => {
  simulatedData.value = generateSample30DaysDataset(adminStore.products.value)
}

const handleClose = () => {
  emit('close')
  if (trainingFinished.value) {
    trainingFinished.value = false
    trainingPercent.value = 0
  }
}

const handleStartTraining = async () => {
  const dataToTrain = currentActiveData.value
  if (!dataToTrain || dataToTrain.length === 0) return

  isTraining.value = true
  trainingFinished.value = false
  trainingPercent.value = 15
  trainingStatusText.value = 'Membaca dan memvalidasi ' + dataToTrain.length + ' baris transaksi...'

  await new Promise(r => setTimeout(r, 400))
  trainingPercent.value = 45
  trainingStatusText.value = 'Menghitung Weighted Moving Average & Regresi Waktu...'

  await new Promise(r => setTimeout(r, 500))
  trainingPercent.value = 75
  trainingStatusText.value = 'Mengakses Knowledge Model Gemini 1.5 Flash AI...'

  try {
    const res = await adminStore.trainAiModelWithDataset(dataToTrain)
    trainingPercent.value = 100
    trainingStatusText.value = 'Sinkronisasi proyeksi ke Supabase Cloud selesai!'
    
    if (res?.success) {
      lastResult.value = res.predictions
      trainingFinished.value = true
      emit('trained', res.predictions)
    }
  } catch (err) {
    alert('Gagal melatih model AI: ' + (err.message || err))
  } finally {
    isTraining.value = false
  }
}
</script>
