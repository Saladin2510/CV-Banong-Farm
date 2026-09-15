<template>
  <div class="flex flex-col gap-6 select-none">
    
    <!-- Top Header & Action Banner -->
    <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
      <div>
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container flex items-center justify-center shrink-0 border border-primary/20 dark:border-white/20">
            <span class="material-symbols-outlined text-[22px]">badge</span>
          </div>
          <div>
            <h2 class="text-lg font-bold text-primary dark:text-white uppercase tracking-tight">
              Manajemen Akun Karyawan &amp; Hak Akses
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola data staf operasional, divisi, dan kredensial akses Command Center CV Banong Farms.
            </p>
          </div>
        </div>
      </div>

      <!-- Add New Staff Button (Strict 60:30:10 Accent 10% Golden Yellow) -->
      <button 
        @click="$emit('openAddModal')"
        class="h-11 px-5 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 self-start sm:self-auto active:scale-95 bg-secondary-container text-primary hover:bg-accent-hover cursor-pointer border border-yellow-400/40 whitespace-nowrap"
        type="button"
        title="Daftarkan akun karyawan baru"
      >
        <span class="material-symbols-outlined text-[19px]">person_add</span>
        <span>+ Tambah Karyawan Baru</span>
      </button>
    </div>

    <!-- Summary Metrics Row (3 Cards) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
      <!-- Metric 1: Total Staf -->
      <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div class="flex flex-col">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase font-telemetry-code">
            Total Karyawan
          </span>
          <span class="text-2xl font-black text-primary dark:text-white mt-1 font-telemetry-code">
            {{ (adminStore.staffList.value || []).length }}
          </span>
          <span class="text-[11px] text-slate-400 mt-0.5">Akun terdaftar di database</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-[26px]">groups</span>
        </div>
      </div>

      <!-- Metric 2: Super Admin -->
      <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div class="flex flex-col">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase font-telemetry-code">
            Super Administrator
          </span>
          <span class="text-2xl font-black text-primary dark:text-secondary-container mt-1 font-telemetry-code">
            {{ superAdminCount }}
          </span>
          <span class="text-[11px] text-slate-400 mt-0.5">Otoritas kendali penuh farm</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-secondary-container/20 text-primary dark:text-secondary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-[26px]">verified_user</span>
        </div>
      </div>

      <!-- Metric 3: Staf Operasional -->
      <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div class="flex flex-col">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase font-telemetry-code">
            Staf Operasional Farm
          </span>
          <span class="text-2xl font-black text-primary dark:text-white mt-1 font-telemetry-code">
            {{ operationalStaffCount }}
          </span>
          <span class="text-[11px] text-slate-400 mt-0.5">Gudang, Kasir &amp; CS WA</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/10 text-primary dark:text-secondary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-[26px]">precision_manufacturing</span>
        </div>
      </div>
    </div>

    <!-- Main Staff Table Container -->
    <div class="bg-white dark:bg-[#0E1726] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-5 transition-colors">
      
      <!-- Filter & Search Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <!-- Role Filters -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none">
          <button
            v-for="role in roleCategories"
            :key="role"
            @click="selectedRole = role"
            :class="[
              'px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer',
              selectedRole === role 
                ? 'bg-primary text-white shadow-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            ]"
          >
            {{ role }}
          </button>
        </div>

        <!-- Search Box -->
        <div class="relative min-w-[240px]">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari nama atau email..." 
            class="w-full h-9 pl-9 pr-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary dark:focus:border-secondary-container transition-colors"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
        <table class="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-700">
              <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
                Karyawan / Akun
              </th>
              <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
                Email Login
              </th>
              <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
                Peran / Divisi
              </th>
              <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold">
                Status
              </th>
              <th class="px-4 py-3 text-xs text-primary dark:text-white uppercase tracking-wider font-bold text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <tr 
              v-for="staff in filteredStaff" 
              :key="staff.id"
              class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
            >
              <!-- Avatar & Name -->
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary dark:bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-white/20">
                    {{ getInitials(staff.nama_lengkap) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-primary dark:text-white leading-tight">
                      {{ staff.nama_lengkap }}
                    </span>
                    <span class="text-[11px] text-slate-500 dark:text-slate-400 font-telemetry-code">
                      ID: #{{ staff.id.toString().slice(-8) }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Email -->
              <td class="px-4 py-3.5 text-xs text-slate-700 dark:text-slate-300 font-telemetry-code">
                {{ staff.email }}
              </td>

              <!-- Role Badge -->
              <td class="px-4 py-3.5">
                <span 
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-bold font-telemetry-code border',
                    staff.peran === 'Super Admin'
                      ? 'bg-primary/10 text-primary dark:text-secondary-container border-primary/20 dark:border-secondary-container/40'
                      : staff.peran === 'Admin Gudang & Stok'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                        : staff.peran === 'Admin Pesanan WA'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  ]"
                >
                  {{ staff.peran }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-4 py-3.5">
                <span 
                  :class="[
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
                    staff.status === 'Aktif' || !staff.status
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {{ staff.status || 'Aktif' }}
                </span>
              </td>

              <!-- Action Buttons: Ubah & Hapus -->
              <td class="px-4 py-3.5 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <button 
                    @click="$emit('openEditModal', staff)"
                    class="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary dark:text-white border border-primary/20 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                    type="button"
                    title="Ubah data atau peran karyawan"
                  >
                    <span class="material-symbols-outlined text-[15px]">edit</span>
                    <span>Ubah</span>
                  </button>
                  <button 
                    @click="confirmDelete(staff)"
                    class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                    type="button"
                    title="Hapus akun karyawan"
                  >
                    <span class="material-symbols-outlined text-[15px]">delete</span>
                    <span>Hapus</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredStaff.length === 0">
              <td colspan="5" class="text-center py-10 text-slate-400 dark:text-slate-500">
                <div class="flex flex-col items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">person_off</span>
                  <span class="text-sm font-medium">Tidak ada karyawan yang sesuai dengan kriteria</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'

const emit = defineEmits(['openAddModal', 'openEditModal', 'deleteStaff'])

const adminStore = useAdminStore()
const selectedRole = ref('Semua')
const searchQuery = ref('')

const roleCategories = [
  'Semua',
  'Super Admin',
  'Admin Gudang & Stok',
  'Admin Pesanan WA',
  'Admin Keuangan',
  'Operator Lapangan'
]

const getInitials = (name) => {
  if (!name) return 'ST'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const superAdminCount = computed(() => {
  return (adminStore.staffList.value || []).filter(s => s.peran === 'Super Admin').length
})

const operationalStaffCount = computed(() => {
  return (adminStore.staffList.value || []).filter(s => s.peran !== 'Super Admin').length
})

const filteredStaff = computed(() => {
  return (adminStore.staffList.value || []).filter(s => {
    const matchesRole = selectedRole.value === 'Semua' || s.peran === selectedRole.value
    const query = searchQuery.value.toLowerCase().trim()
    const matchesQuery = !query || 
      (s.nama_lengkap && s.nama_lengkap.toLowerCase().includes(query)) ||
      (s.email && s.email.toLowerCase().includes(query))
    return matchesRole && matchesQuery
  })
})

const confirmDelete = (staff) => {
  if (confirm(`Yakin ingin menghapus akun karyawan ${staff.nama_lengkap} (${staff.email})?`)) {
    emit('deleteStaff', staff.id)
  }
}
</script>
