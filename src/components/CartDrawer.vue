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
            <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[24px]">
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
          
          <!-- Empty State -->
          <div 
            v-if="cartStore.items.value.length === 0" 
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
              class="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              Jelajahi Katalog Pakan
            </button>
          </div>

          <!-- If Cart Has Items -->
          <template v-else>
            
            <!-- Items List -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between text-xs text-slate-400 font-telemetry-code border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span>DAFTAR BARANG ({{ cartStore.items.value.length }})</span>
                <button 
                  @click="cartStore.clearCart()"
                  class="text-rose-500 hover:underline cursor-pointer"
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
                  <span class="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 font-telemetry-code truncate">
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

                    <span class="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-telemetry-code">
                      {{ formatPrice(item.price * item.qty) }}
                    </span>
                  </div>
                </div>

                <!-- Remove Button -->
                <button 
                  @click="cartStore.removeFromCart(item.id)"
                  class="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title="Hapus barang"
                >
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>

            <!-- Total Price Summary -->
            <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-xs text-emerald-900 dark:text-emerald-300 font-medium">Total Estimasi Tagihan:</span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400">Belum termasuk ongkos kirim</span>
              </div>
              <span class="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-telemetry-code">
                {{ formatPrice(cartStore.totalPrice.value) }}
              </span>
            </div>

            <!-- Formulir Pemesanan Pelanggan -->
            <form @submit.prevent="handleCheckoutSubmit" class="flex flex-col gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div class="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white uppercase font-telemetry-code">
                <span>Formulir Pengiriman</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-normal">WA Admin: 08999192861</span>
              </div>

              <!-- Nama -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Nama Lengkap / Nama Usaha <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="customerName"
                  type="text" 
                  required
                  placeholder="Bpk. Haryanto (Peternakan Mandiri)"
                  class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- No WA -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Nomor WhatsApp Aktif <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="customerPhone"
                  type="tel" 
                  required
                  placeholder="08xxxxxxxxxx"
                  class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-telemetry-code"
                />
              </div>

              <!-- Alamat -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Alamat Lengkap Pengiriman <span class="text-rose-500">*</span>
                </label>
                <textarea 
                  v-model="customerAddress"
                  required
                  rows="2"
                  placeholder="Desa Karangbawang RT 02/04, Kec. Ajibarang, Kab. Banyumas"
                  class="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="mt-2 w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <span v-if="isSubmitting" class="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span v-else class="material-symbols-outlined text-[20px]">
                  chat
                </span>
                <span>{{ isSubmitting ? 'Mencatat Pesanan...' : `Kirim Pesanan ke WA Admin (${formatPrice(cartStore.totalPrice.value)})` }}</span>
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

const formatPrice = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val || 0).replace('Rp', 'Rp ')
}

const handleCheckoutSubmit = async () => {
  if (cartStore.items.value.length === 0) return

  if (!customerName.value.trim() || !customerPhone.value.trim() || !customerAddress.value.trim()) {
    alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.')
    return
  }

  isSubmitting.value = true

  try {
    const orderCode = `BNG-${Date.now().toString().slice(-4)}`
    const totalAmount = cartStore.totalPrice.value
    const itemsSnapshot = [...cartStore.items.value]

    // 1. Eksekusi Simultan ke Supabase Cloud (Header pesanan & detail_pesanan)
    await adminStore.createCustomerOrderFromCart({
      customerName: customerName.value.trim(),
      phone: customerPhone.value.trim(),
      address: customerAddress.value.trim(),
      items: itemsSnapshot,
      totalPrice: totalAmount
    })

    // 2. Susun format teks WhatsApp yang rapi & terisi otomatis
    let waText = `*PESANAN BARU - CV BANONG FARMS*\n`
    waText += `Kode Tiket: *#${orderCode}*\n`
    waText += `----------------------------------------\n`
    waText += `Nama Pemesan: ${customerName.value.trim()}\n`
    waText += `No. WhatsApp: ${customerPhone.value.trim()}\n`
    waText += `Alamat Kirim: ${customerAddress.value.trim()}\n\n`
    waText += `*Rincian Keranjang Barang:*\n`
    itemsSnapshot.forEach((it, idx) => {
      waText += `${idx + 1}. ${it.title || it.name}\n`
      waText += `   Jumlah: ${it.qty} ${it.unit || 'kg'}\n`
      waText += `   Harga: ${formatPrice(it.price)} / ${it.unit || 'kg'}\n`
      waText += `   Subtotal: ${formatPrice(it.price * it.qty)}\n`
    })
    waText += `----------------------------------------\n`
    waText += `*TOTAL PEMBAYARAN: ${formatPrice(totalAmount)}*\n\n`
    waText += `Halo Admin CV Banong Farms (08999192861), saya telah mengisi formulir pemesanan di website. Mohon info ketersediaan stok & proses pengirimannya. Terima kasih!`

    const adminPhone = '628999192861' // Nomor resmi CV Banong Farms
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`

    // 3. Buka WhatsApp
    window.open(waUrl, '_blank')

    // 4. Kosongkan keranjang & tutup drawer
    cartStore.clearCart()
    cartStore.closeCart()

    customerName.value = ''
    customerPhone.value = ''
    customerAddress.value = ''

    alert(`Pesanan #${orderCode} berhasil dicatat! Mengalihkan ke WhatsApp Admin (08999192861)...`)
  } catch (err) {
    alert('Terjadi kesalahan: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>
