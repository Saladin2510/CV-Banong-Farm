<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
      @click.self="$emit('close')"
    >
      <div class="bg-white dark:bg-[#161b22] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg overflow-hidden flex flex-col transition-colors">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[24px]">
              {{ isEditMode ? 'manage_accounts' : 'person_add' }}
            </span>
            <div class="flex flex-col">
              <h3 class="text-base font-bold text-primary dark:text-white uppercase tracking-tight">
                {{ isEditMode ? 'Ubah Data Karyawan' : 'Tambah Karyawan Baru' }}
              </h3>
              <span class="text-[11px] text-slate-500 dark:text-slate-400">
                {{ isEditMode ? 'Perbarui peran atau status akun karyawan' : 'Daftarkan akun admin operasional farm' }}
              </span>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            type="button"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleSubmit" class="p-6 flex flex-col gap-4 text-sm bg-white dark:bg-[#161b22]">
          
          <!-- Nama Lengkap -->
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
              Nama Lengkap Karyawan <span class="text-secondary dark:text-secondary-container font-bold">*</span>
            </label>
            <input 
              v-model="formData.nama_lengkap" 
              type="text" 
              required
              placeholder="Contoh: Budi Santoso"
              class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm shadow-xs"
            />
          </div>

          <!-- Email Login -->
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
              Alamat Email Login <span class="text-secondary dark:text-secondary-container font-bold">*</span>
            </label>
            <input 
              v-model="formData.email" 
              type="email" 
              required
              :disabled="isEditMode"
              placeholder="Contoh: budi@banongfarms.com"
              :class="[
                'h-11 px-3.5 rounded-lg border text-sm shadow-xs font-telemetry-code transition-colors',
                isEditMode 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 cursor-not-allowed' 
                  : 'bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
              ]"
            />
            <span v-if="isEditMode" class="text-[11px] text-slate-400">
              * Email tidak dapat diubah setelah akun terdaftar di sistem.
            </span>
          </div>

          <!-- Password (Wajib untuk Akun Baru) -->
          <div v-if="!isEditMode" class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
              Password Akun Awal <span class="text-secondary dark:text-secondary-container font-bold">*</span>
            </label>
            <input 
              v-model="formData.password" 
              type="password" 
              required
              minlength="6"
              placeholder="Minimal 6 karakter (contoh: admin123)"
              class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm shadow-xs font-telemetry-code"
            />
            <span class="text-[11px] text-slate-500 dark:text-slate-400">
              Karyawan dapat menggunakan password ini untuk login ke Admin Dashboard website.
            </span>
          </div>

          <!-- Peran / Divisi & Status Akun -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Peran -->
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Peran / Divisi <span class="text-secondary dark:text-secondary-container font-bold">*</span>
              </label>
              <select 
                v-model="formData.peran" 
                required
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm shadow-xs cursor-pointer"
              >
                <option value="Super Admin">Super Admin (Akses Penuh)</option>
                <option value="Admin Gudang & Stok">Admin Gudang &amp; Stok</option>
                <option value="Admin Pesanan WA">Admin Pesanan WA</option>
                <option value="Admin Keuangan">Admin Keuangan &amp; Kasir</option>
                <option value="Operator Lapangan">Operator Lapangan Farm</option>
              </select>
            </div>

            <!-- Status Akun -->
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase font-telemetry-code">
                Status Akun
              </label>
              <select 
                v-model="formData.status" 
                class="h-11 px-3.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm shadow-xs cursor-pointer"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <!-- Alert Note -->
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] text-primary dark:text-secondary-container shrink-0">verified_user</span>
            <span>Akun tersimpan aman di tabel <code class="font-bold text-primary dark:text-secondary-container">admin</code> Supabase Cloud dan langsung aktif untuk operasional farm.</span>
          </div>

          <!-- Modal Action Buttons (Strict 60:30:10 Palette) -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 mt-2">
            <button 
              type="button" 
              @click="$emit('close')"
              class="h-11 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors text-xs cursor-pointer"
            >
              Batal
            </button>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="h-11 px-6 rounded-xl font-bold text-xs bg-secondary-container hover:bg-accent-hover text-primary shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50 border border-yellow-400/40"
            >
              <span v-if="isLoading" class="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span v-else class="material-symbols-outlined text-[18px]">
                {{ isEditMode ? 'check_circle' : 'person_add' }}
              </span>
              <span>{{ isLoading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Daftarkan Karyawan') }}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  staffToEdit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isEditMode = computed(() => !!props.staffToEdit)
const isLoading = ref(false)

const formData = ref({
  nama_lengkap: '',
  email: '',
  password: '',
  peran: 'Admin Gudang & Stok',
  status: 'Aktif'
})

watch(
  () => [props.isOpen, props.staffToEdit],
  ([open, val]) => {
    if (open) {
      if (val) {
        formData.value = {
          nama_lengkap: val.nama_lengkap || '',
          email: val.email || '',
          password: '',
          peran: val.peran || 'Admin Gudang & Stok',
          status: val.status || 'Aktif'
        }
      } else {
        formData.value = {
          nama_lengkap: '',
          email: '',
          password: '',
          peran: 'Admin Gudang & Stok',
          status: 'Aktif'
        }
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  const cleanName = (formData.value.nama_lengkap || '').trim()
  const cleanEmail = (formData.value.email || '').trim()

  if (!cleanName) {
    alert('Mohon isi nama lengkap karyawan.')
    return
  }
  if (!cleanEmail) {
    alert('Mohon isi alamat email karyawan.')
    return
  }
  if (!isEditMode.value && (!formData.value.password || formData.value.password.length < 6)) {
    alert('Password akun baru minimal 6 karakter.')
    return
  }

  isLoading.value = true
  const payload = {
    id: props.staffToEdit ? props.staffToEdit.id : undefined,
    nama_lengkap: cleanName,
    email: cleanEmail,
    password: formData.value.password || '',
    peran: formData.value.peran || 'Admin Gudang & Stok',
    status: formData.value.status || 'Aktif'
  }

  try {
    emit('save', payload)
  } finally {
    isLoading.value = false
  }
}
</script>
