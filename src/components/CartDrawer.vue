<template>
  <div>
    <!-- Backdrop Blur Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="cartStore.isCartOpen.value" 
        class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        @click="cartStore.closeCart()"
      ></div>
    </transition>

    <!-- Sliding Cart Drawer Panel -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="cartStore.isCartOpen.value"
        class="fixed top-0 right-0 bottom-0 z-[105] w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 select-none"
      >
        <!-- Drawer Header -->
        <div class="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary dark:text-secondary-container text-[24px]">
              shopping_cart
            </span>
            <div class="flex flex-col">
              <span class="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Keranjang Pakan
              </span>
              <span class="text-[11px] text-slate-500 font-telemetry-code">
                {{ cartStore.totalItems.value }} Barang Terpilih
              </span>
            </div>
          </div>

          <button 
            @click="cartStore.closeCart()"
            class="w-9 h-9 rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Keranjang"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Drawer Body -->
        <div class="flex-grow overflow-y-auto p-5 pb-10 flex flex-col gap-5">
          
          <!-- 1. State Sukses Setelah Konfirmasi -->
          <div 
            v-if="checkoutStep === 'success'" 
            class="h-full flex flex-col items-center justify-center text-center p-6 gap-4 animate-fade-in"
          >
            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-sm">
              <span class="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-telemetry-code tracking-wider">
                Pesanan Terverifikasi
              </span>
              <h3 class="text-lg font-black text-slate-900 dark:text-white">
                Pesanan Berhasil Dicatat!
              </h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed">
                Tiket <strong class="text-primary dark:text-secondary-container font-mono font-bold">#{{ lastCompletedOrderCode }}</strong> telah resmi tersimpan ke sistem database &amp; Dashboard Admin CV Banong Farms.
              </p>
            </div>

            <div class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs flex flex-col gap-1 text-slate-500 text-left">
              <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span class="material-symbols-outlined text-[16px]">check</span>
                <span>Tercatat di Supabase Database</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span class="material-symbols-outlined text-[16px]">notifications_active</span>
                <span>Notifikasi Real-time Admin Aktif</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">
                Admin kami akan segera memvalidasi pesanan dan menyiapkan panen segar Anda.
              </p>
            </div>

            <button 
              @click="handleCloseSuccess"
              class="mt-2 w-full h-11 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Selesai &amp; Tutup</span>
            </button>
          </div>

          <!-- 2. State Keranjang Kosong -->
          <div 
            v-else-if="cartStore.items.value.length === 0" 
            class="h-full flex flex-col items-center justify-center text-center p-6 gap-3"
          >
            <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <span class="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              Keranjang Masih Kosong
            </h3>
            <p class="text-xs text-slate-500 max-w-xs">
              Pilih produk pakan ternak unggulan dari katalog panen untuk memesan via WhatsApp.
            </p>
            <button 
              @click="cartStore.closeCart()"
              class="mt-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              Jelajahi Katalog Pakan
            </button>
          </div>

          <!-- 3. State Konfirmasi Pengiriman WhatsApp (Langkah Kedua: Menunggu Konfirmasi Klik Kirim) -->
          <div 
            v-else-if="checkoutStep === 'confirm_wa' && pendingOrder"
            class="flex flex-col gap-4 animate-fade-in"
          >
            <!-- WhatsApp Beacon Card -->
            <div class="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex flex-col items-center text-center gap-3 shadow-xs">
              <div class="relative flex items-center justify-center">
                <span class="animate-ping absolute inline-flex h-14 w-14 rounded-full bg-emerald-400/40 opacity-75"></span>
                <div class="relative w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span class="material-symbols-outlined text-[30px]">chat</span>
                </div>
              </div>
              
              <div class="flex flex-col gap-1">
                <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] font-telemetry-code uppercase tracking-wider mx-auto">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Langkah Konfirmasi
                </span>
                <h3 class="text-base font-black text-slate-900 dark:text-white mt-1">
                  WhatsApp Telah Dibuka
                </h3>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                  Pastikan Anda telah menekan tombol <strong class="text-emerald-700 dark:text-emerald-400 font-bold">Kirim (Send)</strong> di chat WhatsApp Admin untuk menyelesaikan pemesanan.
                </p>
              </div>
            </div>

            <!-- Ringkasan Tiket Pesanan -->
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs flex flex-col gap-2.5">
              <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400">Kode Tiket:</span>
                <span class="font-bold text-primary dark:text-secondary-container font-telemetry-code">
                  #{{ pendingOrder.orderCode }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500 dark:text-slate-400">Tujuan:</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">WA Admin (08999192861)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500 dark:text-slate-400">Pemesan:</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">{{ pendingOrder.customerName }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500 dark:text-slate-400">Jumlah Barang:</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">{{ pendingOrder.items.length }} Komoditas</span>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-bold">
                <span class="text-slate-700 dark:text-slate-300">Total Pembayaran:</span>
                <span class="text-sm text-primary dark:text-secondary-container font-telemetry-code">
                  {{ formatPrice(pendingOrder.totalPrice) }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-2.5 pt-1">
              <!-- Button 1: Ya, Saya Sudah Kirim Chat ke WA -->
              <button 
                type="button"
                @click="handleConfirmOrderSent"
                :disabled="isSubmitting"
                class="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <span v-if="isSubmitting" class="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span v-else class="material-symbols-outlined text-[20px]">
                  check_circle
                </span>
                <span>{{ isSubmitting ? 'Menyimpan ke Database...' : 'Ya, Saya Sudah Kirim ke WhatsApp' }}</span>
              </button>

              <!-- Button 2: Buka Ulang Chat WhatsApp -->
              <button 
                type="button"
                @click="handleReopenWhatsApp"
                class="w-full h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
              >
                <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>Buka Ulang Chat WhatsApp</span>
              </button>

              <!-- Button 3: Belum Jadi Kirim / Batal -->
              <button 
                type="button"
                @click="handleCancelPendingOrder"
                class="w-full h-9 rounded-xl text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Belum Jadi Kirim / Batalkan</span>
              </button>
            </div>
          </div>

          <!-- 4. State Formulir Keranjang Biasa (Langkah Pertama) -->
          <template v-else>
            
            <!-- Items List -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between text-xs text-slate-400 font-telemetry-code border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span>DAFTAR BARANG ({{ cartStore.items.value.length }})</span>
                <button 
                  @click="cartStore.clearCart()"
                  class="text-slate-500 hover:text-primary dark:hover:text-secondary-container hover:underline cursor-pointer"
                >
                  Kosongkan
                </button>
              </div>

              <div 
                v-for="item in cartStore.items.value" 
                :key="item.id"
                class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3 relative group"
              >
                <!-- Image -->
                <img 
                  :src="item.image" 
                  :alt="item.title" 
                  class="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-slate-200 dark:border-slate-700"
                />

                <!-- Info -->
                <div class="flex flex-col flex-grow min-w-0">
                  <span class="text-[10px] uppercase font-bold text-primary dark:text-secondary-container font-telemetry-code truncate">
                    {{ item.category }}
                  </span>
                  <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {{ item.title }}
                  </h4>
                  <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 font-telemetry-code mt-0.5">
                    {{ formatPrice(item.price) }} / {{ item.unit }}
                  </span>

                  <!-- Quantity Stepper -->
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.qty - 1)"
                        class="w-5 h-5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span class="text-xs font-bold font-telemetry-code text-slate-900 dark:text-white px-1.5">
                        {{ item.qty }}
                      </span>
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.qty + 1)"
                        class="w-5 h-5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center cursor-pointer text-xs"
                      >
                        +
                      </button>
                    </div>

                    <span class="font-bold text-xs text-primary dark:text-secondary-container font-telemetry-code">
                      {{ formatPrice(item.price * item.qty) }}
                    </span>
                  </div>
                </div>

                <!-- Remove Button -->
                <button 
                  @click="cartStore.removeFromCart(item.id)"
                  class="absolute top-2 right-2 p-1 text-slate-400 hover:text-primary dark:hover:text-secondary-container transition-colors cursor-pointer"
                  title="Hapus barang"
                >
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>

            <!-- Total Price Summary -->
            <div class="p-3.5 rounded-xl bg-primary/5 dark:bg-primary/20 border border-primary/20 dark:border-primary/40 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-xs text-primary dark:text-white font-semibold">Total Estimasi Tagihan:</span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400">Belum termasuk ongkos kirim</span>
              </div>
              <span class="text-lg font-extrabold text-primary dark:text-secondary-container font-telemetry-code">
                {{ formatPrice(cartStore.totalPrice.value) }}
              </span>
            </div>

            <!-- Formulir Pemesanan Pelanggan -->
            <form @submit.prevent="handleOpenWhatsApp" class="flex flex-col gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div class="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white uppercase font-telemetry-code">
                <span>Formulir Pengiriman</span>
                <span class="text-primary dark:text-secondary-container font-medium">WA Admin: 08999192861</span>
              </div>

              <!-- Nama -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Nama Lengkap / Nama Usaha <span class="text-secondary dark:text-secondary-container font-bold">*</span>
                </label>
                <input 
                  v-model="customerName"
                  type="text" 
                  required
                  placeholder="Bpk. Haryanto (Peternakan Mandiri)"
                  class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-secondary-container"
                />
              </div>

              <!-- No WA -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Nomor WhatsApp Aktif <span class="text-secondary dark:text-secondary-container font-bold">*</span>
                </label>
                <input 
                  v-model="customerPhone"
                  type="tel" 
                  required
                  placeholder="08xxxxxxxxxx"
                  class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-secondary-container font-telemetry-code"
                />
              </div>

              <!-- Alamat -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Alamat Lengkap Pengiriman <span class="text-secondary dark:text-secondary-container font-bold">*</span>
                </label>
                <textarea 
                  v-model="customerAddress"
                  required
                  rows="2"
                  placeholder="Desa Karangbawang RT 02/04, Kec. Ajibarang, Kab. Banyumas"
                  class="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-secondary-container resize-none"
                ></textarea>
              </div>

              <!-- Submit Button (Yellow Accent 10% CTA with Navy Text) -->
              <button 
                type="submit"
                class="mt-2 w-full h-12 rounded-xl bg-secondary-container hover:bg-accent-hover active:scale-98 text-primary font-black text-xs sm:text-sm shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer border border-yellow-400/40"
              >
                <span class="material-symbols-outlined text-[20px]">
                  chat
                </span>
                <span>Lanjut Buka WhatsApp ({{ formatPrice(cartStore.totalPrice.value) }})</span>
              </button>
            </form>

          </template>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/useCartStore'
import { useAdminStore } from '../stores/useAdminStore'

const cartStore = useCartStore()
const adminStore = useAdminStore()

const customerName = ref('')
const customerPhone = ref('')
const customerAddress = ref('')
const isSubmitting = ref(false)

// State Alur Konfirmasi WhatsApp 2 Langkah
const checkoutStep = ref('form') // 'form' | 'confirm_wa' | 'success'
const pendingOrder = ref(null)
const lastCompletedOrderCode = ref('')

const formatPrice = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val || 0).replace('Rp', 'Rp ')
}

// Langkah 1: Buka WhatsApp (BELUM disimpan ke database sama sekali)
const handleOpenWhatsApp = () => {
  if (cartStore.items.value.length === 0) return

  if (!customerName.value.trim() || !customerPhone.value.trim() || !customerAddress.value.trim()) {
    alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.')
    return
  }

  const orderCode = `BNG-${Date.now().toString().slice(-4)}`
  const totalAmount = cartStore.totalPrice.value
  const itemsSnapshot = [...cartStore.items.value]

  // Susun format teks WhatsApp yang rapi
  let waText = `*PESANAN BARU - CV BANONG FARMS*\n`
  waText += `Kode Tiket: *#${orderCode}*\n`
  waText += `----------------------------------------\n`
  waText += `Nama Pemesan: ${customerName.value.trim()}\n`
  waText += `No. WhatsApp: ${customerPhone.value.trim()}\n`
  waText += `Alamat Kirim: ${customerAddress.value.trim()}\n\n`
  waText += `*Rincian Keranjang Barang:*\n`
  itemsSnapshot.forEach((it, idx) => {
    waText += `${idx + 1}. ${it.title || it.name}\n`
    waText += `   Jumlah: ${it.qty} ${it.unit || 'pcs'}\n`
    waText += `   Harga: ${formatPrice(it.price)} / ${it.unit || 'pcs'}\n`
    waText += `   Subtotal: ${formatPrice(it.price * it.qty)}\n`
  })
  waText += `----------------------------------------\n`
  waText += `*TOTAL PEMBAYARAN: ${formatPrice(totalAmount)}*\n\n`
  waText += `Halo Admin CV Banong Farms (08999192861), saya telah mengisi formulir pemesanan di website. Mohon info ketersediaan stok & proses pengirimannya. Terima kasih!`

  const adminPhone = '628999192861' // Nomor resmi CV Banong Farms
  const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`

  // Simpan data sementara ke state lokal (TANPA ke database)
  pendingOrder.value = {
    orderCode,
    customerName: customerName.value.trim(),
    phone: customerPhone.value.trim(),
    address: customerAddress.value.trim(),
    items: itemsSnapshot,
    totalPrice: totalAmount,
    waUrl
  }

  // Pindah ke layar konfirmasi pengiriman WA
  checkoutStep.value = 'confirm_wa'

  // Buka WhatsApp di tab baru
  window.open(waUrl, '_blank')
}

// Buka ulang WhatsApp jika tertutup atau terblokir browser
const handleReopenWhatsApp = () => {
  if (pendingOrder.value?.waUrl) {
    window.open(pendingOrder.value.waUrl, '_blank')
  }
}

// Langkah 2: Pembeli Konfirmasi "Ya, Saya Sudah Kirim ke WhatsApp" -> SEKARANG baru disimpan ke Database!
const handleConfirmOrderSent = async () => {
  if (!pendingOrder.value) return

  isSubmitting.value = true

  try {
    const orderData = pendingOrder.value

    // 1. Eksekusi ke Supabase Cloud (Header pesanan & detail_pesanan)
    await adminStore.createCustomerOrderFromCart({
      orderCode: orderData.orderCode,
      customerName: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      items: orderData.items,
      totalPrice: orderData.totalPrice
    })

    lastCompletedOrderCode.value = orderData.orderCode

    // 2. Kosongkan keranjang belanja
    cartStore.clearCart()

    // 3. Reset pending dan ubah ke tampilan sukses
    pendingOrder.value = null
    checkoutStep.value = 'success'
  } catch (err) {
    alert('Gagal menyimpan pesanan ke database: ' + (err.message || err))
  } finally {
    isSubmitting.value = false
  }
}

// Pembeli Batal Kirim -> Kembalikan ke form tanpa menyimpan apapun ke database
const handleCancelPendingOrder = () => {
  pendingOrder.value = null
  checkoutStep.value = 'form'
}

// Tutup Drawer setelah Selesai
const handleCloseSuccess = () => {
  checkoutStep.value = 'form'
  customerName.value = ''
  customerPhone.value = ''
  customerAddress.value = ''
  lastCompletedOrderCode.value = ''
  cartStore.closeCart()
}
</script>
