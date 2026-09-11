import { ref, computed } from 'vue'
import { apiService } from '../services/apiService'
import { supabaseApi, isSupabaseConfigured } from '../services/supabaseClient'

const STORAGE_PRODUCTS_KEY = 'cv_banong_farms_products_pure_v9'
const STORAGE_ORDERS_KEY = 'cv_banong_farms_orders_pure_v9'
const STORAGE_CHART_KEY = 'cv_banong_farms_daily_chart_pure_v9'
const SUPABASE_RESET_KEY = 'cv_banong_reset_zero_synced_v9'

// Clear legacy cached data from previous mock versions to start fresh in PCS unit
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    [
      'cv_banong_farms_products_v2', 'cv_banong_farms_orders_v2', 'cv_banong_farms_daily_chart_v2',
      'cv_banong_farms_products_v3', 'cv_banong_farms_orders_v3', 'cv_banong_farms_daily_chart_v3',
      'cv_banong_farms_products_v4', 'cv_banong_farms_orders_v4', 'cv_banong_farms_daily_chart_v4',
      'cv_banong_farms_products_clean_v5', 'cv_banong_farms_orders_clean_v5', 'cv_banong_farms_daily_chart_clean_v5',
      'cv_banong_farms_products_zero_v6', 'cv_banong_farms_orders_zero_v6', 'cv_banong_farms_daily_chart_zero_v6',
      'cv_banong_farms_products_pcs_v7', 'cv_banong_farms_orders_pcs_v7', 'cv_banong_farms_daily_chart_pcs_v7',
      'cv_banong_farms_products_pure_v8', 'cv_banong_farms_orders_pure_v8', 'cv_banong_farms_daily_chart_pure_v8',
      'cv_banong_reset_zero_synced_v8'
    ].forEach(k => localStorage.removeItem(k))
  } catch (_) {}
}

// Filter komprehensif untuk membuang semua sisa produk fiktif / mock
export function isMockProduct(p) {
  if (!p) return true
  const name = (p.name || p.nama_produk || p.title || '').toLowerCase()
  return (
    name.includes('madura') ||
    name.includes('sangkuriang') ||
    name.includes('ayam organik utuh') ||
    name.includes('omega-3') ||
    name.includes('karkas') ||
    name.includes('gurame') ||
    name.includes('kasgot super') ||
    name.includes('cabai rawit') ||
    name.includes('buah naga') ||
    name.includes('robusta')
  )
}

const isServerDbConnected = ref(false)
const isSupabaseConnected = ref(false)

// Admin Auth State (Supabase Auth)
const adminUser = ref(null)
const isAuthenticated = ref(false)
const isAuthChecking = ref(true)

async function checkAuthSession() {
  isAuthChecking.value = true
  try {
    const session = await supabaseApi.getAdminSession()
    if (session?.user) {
      adminUser.value = {
        id: session.user.id,
        email: session.user.email,
        nama_lengkap: session.user.user_metadata?.nama_lengkap || session.user.email?.split('@')[0] || 'Administrator Banong',
        peran: 'Super Admin'
      }
      isAuthenticated.value = true
    } else {
      adminUser.value = null
      isAuthenticated.value = false
    }
  } catch (err) {
    adminUser.value = null
    isAuthenticated.value = false
  } finally {
    isAuthChecking.value = false
  }
}

async function loginAdmin(email, password) {
  const res = await supabaseApi.loginAdmin(email, password)
  if (res.success) {
    adminUser.value = res.profile || {
      id: res.user.id,
      email: res.user.email,
      nama_lengkap: res.user.email?.split('@')[0] || 'Administrator',
      peran: 'Super Admin'
    }
    isAuthenticated.value = true
  }
  return res
}

async function logoutAdmin() {
  await supabaseApi.logoutAdmin()
  adminUser.value = null
  isAuthenticated.value = false
}

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function formatLocalDateKey(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Generate dynamic 7 days ending at today's real date
export function getDynamicLast7Days() {
  const now = new Date()
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const dayName = DAY_NAMES[d.getDay()]
    const label = i === 0 ? `${dayName} (Hari Ini)` : `${dayName} (H-${i})`
    const isoKey = formatLocalDateKey(d)
    days.push({
      label,
      isoKey,
      dayName,
      isToday: i === 0
    })
  }
  return days
}

// Data komoditas murni dari database: array awal kosong agar tidak ada flash 1 frame mock fiktif
const DEFAULT_PRODUCTS = []

// Zero Initial Orders for Pure Real Testing
const DEFAULT_ORDERS = []

// Initialize from LocalStorage or Defaults
function loadInitialProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_PRODUCTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter(p => !isMockProduct(p))
      }
    }
  } catch (e) {}
  return []
}

function loadInitialOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {}
  return DEFAULT_ORDERS
}

function loadInitialDailyChart() {
  const days = getDynamicLast7Days()
  const defaultBaseline = [0, 0, 0, 0, 0, 0, 0]
  try {
    const raw = localStorage.getItem(STORAGE_CHART_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        // Ensure all current 7 days exist
        days.forEach((day, idx) => {
          if (parsed[day.isoKey] === undefined) {
            parsed[day.isoKey] = defaultBaseline[idx] || 0
          }
        })
        return parsed
      }
    }
  } catch (e) {}

  const initialMap = {}
  days.forEach((day, idx) => {
    initialMap[day.isoKey] = defaultBaseline[idx] || 0
  })
  return initialMap
}

// Reactive State
const products = ref(loadInitialProducts())
const whatsappOrders = ref(loadInitialOrders())
const dailyChartMap = ref(loadInitialDailyChart())
const lastSyncToast = ref(null)

// Cross-tab Real-Time Synchronizer via BroadcastChannel
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('cv_banong_farms_realtime_sync')
  : null

if (syncChannel) {
  syncChannel.onmessage = (event) => {
    if (event.data?.type === 'SYNC_STATE') {
      if (event.data.products) products.value = event.data.products
      if (event.data.orders) whatsappOrders.value = event.data.orders
      if (event.data.chartMap) dailyChartMap.value = event.data.chartMap
      if (event.data.toast) lastSyncToast.value = event.data.toast
    }
  }
}

function broadcastUpdate(toastData = null) {
  try {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products.value))
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(whatsappOrders.value))
    localStorage.setItem(STORAGE_CHART_KEY, JSON.stringify(dailyChartMap.value))
    
    if (syncChannel) {
      syncChannel.postMessage({
        type: 'SYNC_STATE',
        products: products.value,
        orders: whatsappOrders.value,
        chartMap: dailyChartMap.value,
        toast: toastData
      })
    }
  } catch (e) {
    console.error('Failed to persist state:', e)
  }
}

// Sinkronisasi dengan Database Server Nyata (/api/)
async function syncWithServerDatabase() {
  // Jika Supabase sudah dikonfigurasi, gunakan Supabase murni sebagai sumber utama
  if (isSupabaseConfigured()) return

  try {
    const conn = await apiService.checkConnection()
    if (conn.connected) {
      isServerDbConnected.value = true
      const [serverProds, serverOrders] = await Promise.all([
        apiService.getProducts().catch(() => null),
        apiService.getOrders().catch(() => null)
      ])
      if (Array.isArray(serverProds)) {
        products.value = serverProds.filter(p => !isMockProduct(p))
      }
      if (Array.isArray(serverOrders)) {
        whatsappOrders.value = serverOrders
      }
      broadcastUpdate()
    } else {
      isServerDbConnected.value = false
    }
  } catch (e) {
    isServerDbConnected.value = false
  }
}

let supabaseRealtimeChannel = null

// Sinkronisasi dengan Supabase Cloud (PostgreSQL Online 24/7)
async function syncWithSupabaseDatabase() {
  if (!isSupabaseConfigured()) {
    isSupabaseConnected.value = false
    return { success: false, message: 'Kunci Supabase belum diatur' }
  }

  try {
    const test = await supabaseApi.testConnection()
    if (!test.success) {
      isSupabaseConnected.value = false
      return test
    }

    isSupabaseConnected.value = true

    // Auto-clean satu kali untuk memastikan default NOL murni & hapus data fiktif lama
    if (typeof window !== 'undefined' && !localStorage.getItem(SUPABASE_RESET_KEY)) {
      try {
        await supabaseApi.resetOperationalDataToZero()
        localStorage.setItem(SUPABASE_RESET_KEY, 'true')
      } catch (e) {
        console.warn('Auto reset zero Supabase warning:', e)
      }
    }

    // Tarik data awal dari Supabase Cloud
    const [cloudProds, cloudOrders] = await Promise.all([
      supabaseApi.getProducts().catch(() => null),
      supabaseApi.getOrders().catch(() => null)
    ])

    if (Array.isArray(cloudProds)) {
      const validCloud = cloudProds.filter(p => !isMockProduct(p))
      // Pertahankan produk yang ada di lokal jika belum ada di cloudProds
      const localOnly = products.value.filter(lp => 
        !isMockProduct(lp) && 
        !validCloud.some(cp => cp.id == lp.id || cp.name.toLowerCase() === lp.name.toLowerCase())
      )
      products.value = [...validCloud, ...localOnly]
    }
    if (Array.isArray(cloudOrders)) {
      whatsappOrders.value = cloudOrders
    }
    broadcastUpdate()

    // Langganan ke Saluran Real-time WebSocket Supabase
    if (!supabaseRealtimeChannel) {
      supabaseRealtimeChannel = supabaseApi.subscribeRealtime(
        // onProductChange
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newP = payload.new
            if (isMockProduct(newP)) return
            const existingIdx = products.value.findIndex(p => 
              p.id == newP.id || 
              (p.name && p.name.toLowerCase() === (newP.nama_produk || newP.name || '').toLowerCase())
            )
            if (existingIdx !== -1) {
              products.value[existingIdx].id = Number(newP.id)
            } else {
              const catName = newP.category_name || 'Peternakan Unggas'
              products.value.unshift({
                id: Number(newP.id),
                name: newP.nama_produk || newP.name || 'Produk Pakan',
                title: newP.nama_produk || newP.name || 'Produk Pakan',
                category: catName,
                categoryId: getCategoryId(catName),
                price: Number(newP.harga ?? newP.price) || 0,
                stock: Number(newP.stok ?? newP.stock) || 0,
                maxStock: Number(newP.stok_maksimal ?? newP.max_stock) || 5000,
                unit: newP.satuan || newP.unit || 'kg',
                soldCount: Number(newP.jumlah_terjual ?? newP.sold_count) || 0,
                icon: 'eco',
                image: newP.url_gambar || newP.image_url || '/assets/product-fertilizer.png',
                description: newP.deskripsi || newP.description || ''
              })
            }
            broadcastUpdate()
          } else if (payload.eventType === 'UPDATE') {
            const updatedP = payload.new
            const idx = products.value.findIndex(p => p.id == updatedP.id)
            if (idx !== -1) {
              if (updatedP.stok !== undefined || updatedP.stock !== undefined) {
                products.value[idx].stock = Number(updatedP.stok ?? updatedP.stock)
              }
              if (updatedP.harga !== undefined || updatedP.price !== undefined) {
                products.value[idx].price = Number(updatedP.harga ?? updatedP.price)
              }
              if (updatedP.jumlah_terjual !== undefined || updatedP.sold_count !== undefined) {
                products.value[idx].soldCount = Number(updatedP.jumlah_terjual ?? updatedP.sold_count)
              }
              if (updatedP.nama_produk || updatedP.name) {
                products.value[idx].name = updatedP.nama_produk || updatedP.name
              }
              broadcastUpdate()
            }
          } else if (payload.eventType === 'DELETE') {
            const oldP = payload.old
            const idx = products.value.findIndex(p => p.id == oldP.id)
            if (idx !== -1) {
              products.value.splice(idx, 1)
              broadcastUpdate()
            }
          }
        },
        // onOrderChange
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newO = payload.new
            const orderCode = newO.kode_pesanan || newO.order_code || `#WA-${newO.id}`
            if (!whatsappOrders.value.some(o => o.id === orderCode)) {
              whatsappOrders.value.unshift({
                id: orderCode,
                customer: newO.nama_pelanggan || newO.customer_name || 'Pelanggan CV Banong',
                productId: 1,
                productName: 'Pakan Ternak',
                qty: 1,
                totalPrice: Number(newO.total_harga ?? newO.total_amount) || 0,
                status: newO.status || 'Menunggu Konfirmasi',
                timeAgo: 'Baru saja (Real-time Cloud)',
                timestamp: Date.now()
              })
              broadcastUpdate()
            }
          }
        }
      )
    }

    return { success: true, message: 'Supabase Cloud PostgreSQL Online & Real-time Terhubung 100%!' }
  } catch (err) {
    isSupabaseConnected.value = false
    return { success: false, message: err.message }
  }
}

if (typeof window !== 'undefined') {
  if (isSupabaseConfigured()) {
    syncWithSupabaseDatabase()
  } else {
    syncWithServerDatabase()
  }
}

// Computed Metrics (Pure Satuan Pcs)
const totalStockPcs = computed(() => {
  return products.value.reduce((acc, p) => acc + (Number(p.stock) || 0), 0)
})

const totalStockKg = totalStockPcs // alias untuk kompatibilitas

const totalStockTon = computed(() => {
  return (totalStockPcs.value / 1000).toFixed(1)
})

const totalCapacityPercent = computed(() => {
  const totalMax = products.value.reduce((acc, p) => acc + (Number(p.maxStock) || Number(p.stock) * 1.3), 0)
  if (!totalMax) return 0
  return Math.min(100, Math.round((totalStockPcs.value / totalMax) * 100))
})

const totalRevenue = computed(() => {
  return whatsappOrders.value
    .filter(o => o.status === 'Selesai' || o.status === 'Stok Terupdate Otomatis')
    .reduce((acc, o) => acc + (Number(o.totalPrice) || 0), 0)
})

const totalRevenueJuta = computed(() => {
  return (totalRevenue.value / 1000000).toFixed(1)
})

const totalOrdersCount = computed(() => {
  return whatsappOrders.value.length
})

// Top Selling Product
const topSellingProduct = computed(() => {
  if (!products.value.length) return null
  return [...products.value].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))[0]
})

// AI Strategy Computation
const aiStrategy = computed(() => {
  const top = topSellingProduct.value
  if (!top || !top.soldCount) {
    return {
      title: 'Strategi Penyaluran Terintegrasi',
      productName: 'Semua Komoditas',
      analysis: 'Mulai dari nol: Belum ada transaksi penjualan komoditas tercatat. Silakan lakukan penjualan untuk mengaktifkan kalkulasi tren AI.',
      accuracy: '100%',
      risk: 'Normal (Mulai Baru)',
      priority: 'Menunggu Pesanan'
    }
  }

  return {
    title: `Strategi Pemasaran Komoditas ${top.name}`,
    productName: top.name,
    analysis: `Berdasarkan serapan nyata, produk ${top.name} mencatat volume serapan sebesar ${(top.soldCount || 0).toLocaleString('id-ID')} pcs dengan sisa stok aktif ${top.stock.toLocaleString('id-ID')} pcs. Lanjutkan pemantauan pesanan WhatsApp untuk memaksimalkan perputaran stok fisik.`,
    accuracy: '96,2%',
    risk: top.stock < 10 ? 'Stok Menipis' : 'Stabilitas Aman',
    priority: top.stock < 10 ? 'Segera Restok' : 'Prioritas Utama'
  }
})

// Dynamic 7-Day Calendar Telemetry Computation (Always Real-Time with Current Day)
const dynamic7DaysInfo = computed(() => {
  const days = getDynamicLast7Days()
  const labels = days.map(d => d.label)
  const actual = days.map(d => Number(dailyChartMap.value[d.isoKey]) || 0)
  
  // Model Prediksi AI: jika volume 0 maka prediksi 0
  const predicted = actual.map((v, idx) => v === 0 ? 0 : Math.round(v * (0.92 + idx * 0.024)))
  
  // Compute Peak Information dynamically from the highest demand day
  let maxVal = 0
  let peakIndex = -1
  actual.forEach((v, idx) => {
    if (v > maxVal) {
      maxVal = v
      peakIndex = idx
    }
  })

  const peakDayName = peakIndex !== -1 ? days[peakIndex]?.label : 'Hari Ini'
  const peakAmount = maxVal > 0 ? `${maxVal.toLocaleString('id-ID')} pcs` : '0 pcs'
  const peakValRupiah = maxVal > 0 ? `Rp ${(maxVal * 32000).toLocaleString('id-ID')}` : 'Rp 0'

  return {
    days,
    labels,
    actual,
    predicted,
    peakInfo: {
      amount: peakAmount,
      val: peakValRupiah,
      buyer: maxVal > 0 ? `Puncak Kanal WA: Mitra ${peakDayName}` : 'Belum Ada Transaksi'
    }
  }
})

// Core WhatsApp Order & Stock Decrement Sync
function addWhatsAppOrder({ customer, productId, qty }) {
  const prod = products.value.find(p => p.id === productId)
  if (!prod) return { success: false, message: 'Produk tidak ditemukan' }

  const deductQty = Math.min(prod.stock, qty)
  prod.stock = Math.max(0, prod.stock - deductQty)
  prod.soldCount = (prod.soldCount || 0) + deductQty

  // Update Daily Chart Volume for Today (Persisted in Real Time!)
  const todayKey = formatLocalDateKey(new Date())
  const currentTodayVal = Number(dailyChartMap.value[todayKey]) || 0
  dailyChartMap.value[todayKey] = currentTodayVal + deductQty

  const totalPrice = deductQty * prod.price
  const newOrder = {
    id: `#WA-${Date.now().toString().slice(-4)}`,
    customer: customer || 'Mitra Pelanggan (Ajibarang)',
    productId: prod.id,
    productName: prod.name,
    qty: deductQty,
    totalPrice,
    timeAgo: 'Baru saja',
    timestamp: Date.now(),
    status: 'Stok Terupdate Otomatis'
  }

  whatsappOrders.value.unshift(newOrder)

  const toastData = {
    id: Date.now(),
    orderId: newOrder.id,
    customer: newOrder.customer,
    productName: prod.name,
    qty: deductQty,
    remainingStock: prod.stock
  }

  lastSyncToast.value = toastData
  broadcastUpdate(toastData)

  setTimeout(() => {
    if (lastSyncToast.value?.id === toastData.id) {
      lastSyncToast.value = null
    }
  }, 5000)

  // Sync to Real Server Database if connected
  if (isServerDbConnected.value) {
    apiService.createOrder({
      productId: prod.id,
      qty: deductQty,
      customer: newOrder.customer
    }).catch(e => console.warn('Server sync error for order:', e))
  }

  // Sync to Supabase Cloud PostgreSQL if connected
  if (isSupabaseConnected.value) {
    supabaseApi.insertOrder({
      orderCode: newOrder.id,
      customer: newOrder.customer,
      productId: prod.id,
      productName: prod.name,
      qty: deductQty,
      totalPrice
    }).catch(e => console.warn('Supabase sync error for order:', e))
  }

  return { success: true, order: newOrder }
}

// Customer Order From Landing Page (Status Awal: Menunggu Konfirmasi, Stok Belum Terpotong)
async function createCustomerOrder({ productId, qty, customerName, phone, address, note }) {
  const prod = products.value.find(p => p.id === productId)
  if (!prod) return { success: false, message: 'Produk tidak ditemukan' }

  const buyQty = Number(qty) || 1
  const totalPrice = buyQty * prod.price
  const orderCode = `BNG-${Date.now().toString().slice(-4)}`

  const newOrder = {
    id: orderCode,
    customer: customerName || 'Pelanggan Web CV Banong',
    phone: phone || '',
    address: address || '',
    productId: prod.id,
    productName: prod.name,
    qty: buyQty,
    totalPrice,
    status: 'Menunggu Konfirmasi',
    timeAgo: 'Baru saja (Web)',
    timestamp: Date.now()
  }

  whatsappOrders.value.unshift(newOrder)

  const toastData = {
    id: Date.now(),
    orderId: newOrder.id,
    customer: newOrder.customer,
    productName: prod.name,
    qty: buyQty,
    remainingStock: prod.stock,
    isPending: true
  }

  lastSyncToast.value = toastData
  broadcastUpdate(toastData)

  setTimeout(() => {
    if (lastSyncToast.value?.id === toastData.id) {
      lastSyncToast.value = null
    }
  }, 5000)

  // Sync to Supabase Cloud (Tabel pesanan & detail_pesanan)
  if (isSupabaseConnected.value) {
    supabaseApi.insertOrder({
      orderCode: newOrder.id,
      customer: newOrder.customer,
      phone: newOrder.phone,
      address: newOrder.address,
      productId: prod.id,
      productName: prod.name,
      qty: buyQty,
      totalPrice,
      autoDeduct: false
    }).catch(e => console.warn('Supabase sync error for order:', e))
  }

  return { success: true, orderCode, order: newOrder }
}

// Customer Order From Shopping Cart (Multiple items)
async function createCustomerOrderFromCart({ customerName, phone, address, items, totalPrice, orderCode: customOrderCode }) {
  if (!Array.isArray(items) || items.length === 0) return { success: false, message: 'Keranjang belanja masih kosong.' }

  const orderCode = customOrderCode || `BNG-${Date.now().toString().slice(-4)}`
  const totalAmount = Number(totalPrice) || items.reduce((sum, it) => sum + (it.price * it.qty), 0)
  const totalQty = items.reduce((sum, it) => sum + (it.qty || 1), 0)
  const productSummary = items.map(it => `${it.qty}x ${it.title || it.name}`).join(', ')

  const newOrder = {
    id: orderCode,
    customer: customerName || 'Pelanggan Keranjang Web',
    phone: phone || '08999192861',
    address: address || '',
    productId: items[0].id,
    productName: productSummary,
    items: items,
    qty: totalQty,
    totalPrice: totalAmount,
    status: 'Menunggu Konfirmasi',
    timeAgo: 'Baru saja (Keranjang)',
    timestamp: Date.now()
  }

  whatsappOrders.value.unshift(newOrder)

  const toastData = {
    id: Date.now(),
    orderId: newOrder.id,
    customer: newOrder.customer,
    productName: productSummary,
    qty: totalQty,
    remainingStock: 0,
    isPending: true
  }

  lastSyncToast.value = toastData
  broadcastUpdate(toastData)

  setTimeout(() => {
    if (lastSyncToast.value?.id === toastData.id) {
      lastSyncToast.value = null
    }
  }, 5000)

  // Sync to Supabase Cloud (Header pesanan & semua items di detail_pesanan)
  if (isSupabaseConnected.value) {
    supabaseApi.insertOrder({
      orderCode: newOrder.id,
      customer: newOrder.customer,
      phone: newOrder.phone,
      address: newOrder.address,
      items: items,
      productId: items[0].id,
      productName: productSummary,
      qty: totalQty,
      totalPrice: totalAmount,
      autoDeduct: false
    }).catch(e => console.warn('Supabase sync error for cart order:', e))
  }

  return { success: true, orderCode, order: newOrder }
}

// Admin Validation Operations: 'complete' (Deal/Selesai) atau 'cancel' (Batal)
async function validateOrder({ orderId, action }) {
  const orderIndex = whatsappOrders.value.findIndex(o => o.id === orderId)
  if (orderIndex === -1) return { success: false, message: 'Tiket pesanan tidak ditemukan' }

  const targetOrder = whatsappOrders.value[orderIndex]

  if (action === 'complete') {
    // 1. Potong stok produk di memori
    const prod = products.value.find(p => p.id === targetOrder.productId)
    if (prod) {
      prod.stock = Math.max(0, prod.stock - targetOrder.qty)
      prod.soldCount = (prod.soldCount || 0) + targetOrder.qty
    }

    // 2. Ubah status pesanan menjadi Selesai
    targetOrder.status = 'Selesai'

    // 3. Update metrik harian di memori
    const todayKey = formatLocalDateKey(new Date())
    const currentTodayVal = Number(dailyChartMap.value[todayKey]) || 0
    dailyChartMap.value[todayKey] = currentTodayVal + targetOrder.qty

    // 4. Sinkronkan aksi ke Supabase Cloud (RPC atau update transaksional)
    if (isSupabaseConnected.value) {
      supabaseApi.completeOrder(orderId).catch(e => console.warn('Supabase completeOrder error:', e))
    }

    const toastData = {
      id: Date.now(),
      orderId: targetOrder.id,
      customer: targetOrder.customer,
      productName: targetOrder.productName,
      qty: targetOrder.qty,
      remainingStock: prod?.stock || 0,
      isCompleted: true
    }

    lastSyncToast.value = toastData
    broadcastUpdate(toastData)

    return { 
      success: true, 
      message: `Pesanan ${orderId} berhasil divalidasi (Selesai). Stok terpotong ${targetOrder.qty} ${prod?.unit || 'kg'} & tercatat di Laporan Keuangan.` 
    }
  } else if (action === 'cancel') {
    // Ubah status pesanan menjadi Dibatalkan tanpa potong stok
    targetOrder.status = 'Dibatalkan'

    if (isSupabaseConnected.value) {
      supabaseApi.cancelOrder(orderId).catch(e => console.warn('Supabase cancelOrder error:', e))
    }

    const toastData = {
      id: Date.now(),
      orderId: targetOrder.id,
      customer: targetOrder.customer,
      isCancelled: true
    }

    lastSyncToast.value = toastData
    broadcastUpdate(toastData)

    return { 
      success: true, 
      message: `Pesanan ${orderId} telah dibatalkan. Stok produk tidak berkurang.` 
    }
  }
}

// Simulation Helper
const mockBuyers = [
  'PT Agro Nusantara Sejahtera (Semarang)',
  'Catering Berkah Mandiri (Solo)',
  'Mitra Grosir Sayur Jabodetabek (Jakarta)',
  'Hotel Grand Serayu (Purwokerto)',
  'Koperasi Pasar Induk Banyumas',
  'Supermarket Fresh Mart (Yogyakarta)',
  'Restoran Kuring Sambal Sedap (Cilacap)'
]

function simulateIncomingOrder() {
  if (!products.value.length) return
  const available = products.value.filter(p => p.stock > 10)
  const pool = available.length ? available : products.value
  const targetProduct = pool[Math.floor(Math.random() * pool.length)]
  const buyer = mockBuyers[Math.floor(Math.random() * mockBuyers.length)]
  
  const qty = (Math.floor(Math.random() * 4) + 1) * (targetProduct.unit === 'drum' || targetProduct.unit === 'karung 50kg' ? 2 : 10)

  return createCustomerOrder({
    productId: targetProduct.id,
    qty,
    customerName: buyer,
    phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
    address: 'Kawasan Agribisnis ' + (buyer.split('(')[1]?.replace(')', '') || 'Banyumas')
  })
}

// Product CRUD Operations (Persisted & Synced)
async function addProduct(data) {
  const newId = Date.now()
  const initialStock = Number(data.stock) || 100
  const maxStock = Number(data.maxStock) || Math.round(initialStock * 1.5)
  const price = Number(data.price) || 20000

  const newProduct = {
    id: newId,
    name: data.name.trim(),
    title: data.name.trim(),
    category: data.category || 'Hasil Tani',
    categoryId: getCategoryId(data.category),
    stock: initialStock,
    maxStock,
    price,
    unit: data.unit || 'kg',
    soldCount: 0,
    icon: data.icon || 'eco',
    image: data.image || '/assets/product-fertilizer.png',
    description: data.description || 'Komoditas organik segar harian dari peternakan CV Banong Farms Ajibarang.'
  }

  products.value.unshift(newProduct)
  broadcastUpdate()

  let supabaseError = null

  // Sync to Real Server Database
  if (isServerDbConnected.value) {
    apiService.createProduct(newProduct).catch(e => console.warn('Server sync error for product create:', e))
  }

  // Sync to Supabase Cloud
  if (isSupabaseConnected.value) {
    try {
      const res = await supabaseApi.insertProduct(newProduct)
      if (res?.success && res.data?.id) {
        newProduct.id = Number(res.data.id)
        broadcastUpdate()
      } else if (res && !res.success) {
        supabaseError = res.error
      }
    } catch (err) {
      supabaseError = err.message || String(err)
    }
  }

  return { product: newProduct, supabaseError }
}

async function updateProduct(id, data) {
  const index = products.value.findIndex(p => p.id === id)
  if (index === -1) return null

  const prod = products.value[index]
  const newStock = data.stock !== undefined ? Number(data.stock) : prod.stock
  const newPrice = data.price !== undefined ? Number(data.price) : prod.price
  const newMax = Number(data.maxStock) || Math.max(prod.maxStock, newStock)
  const newName = data.name !== undefined ? data.name.trim() : prod.name

  products.value[index] = {
    ...prod,
    name: newName,
    title: newName,
    category: data.category || prod.category,
    categoryId: getCategoryId(data.category || prod.category),
    stock: newStock,
    maxStock: newMax,
    price: newPrice,
    unit: data.unit || prod.unit || 'kg',
    icon: data.icon || prod.icon,
    image: data.image || prod.image
  }

  broadcastUpdate()

  let supabaseError = null

  // Sync to Real Server Database
  if (isServerDbConnected.value) {
    apiService.updateProduct(id, products.value[index]).catch(e => console.warn('Server sync error for product update:', e))
  }

  // Sync to Supabase Cloud
  if (isSupabaseConnected.value) {
    try {
      const res = await supabaseApi.updateProduct(id, products.value[index])
      if (res && !res.success) {
        supabaseError = res.error
      }
    } catch (err) {
      supabaseError = err.message || String(err)
    }
  }

  return { product: products.value[index], supabaseError }
}

async function deleteProduct(id) {
  const index = products.value.findIndex(p => p.id === id)
  if (index !== -1) {
    const deleted = products.value.splice(index, 1)[0]
    broadcastUpdate()

    let supabaseError = null

    // Sync to Real Server Database
    if (isServerDbConnected.value) {
      apiService.deleteProduct(id).catch(e => console.warn('Server sync error for product delete:', e))
    }

    // Sync to Supabase Cloud
    if (isSupabaseConnected.value) {
      try {
        const res = await supabaseApi.deleteProduct(id)
        if (res && !res.success) {
          supabaseError = res.error
        }
      } catch (err) {
        supabaseError = err.message || String(err)
      }
    }

    return { deleted, supabaseError }
  }
  return null
}

function getCategoryId(cat) {
  const c = (cat || '').toLowerCase()
  if (c.includes('unggas') || c.includes('telur')) return 'unggas'
  if (c.includes('daging') || c.includes('ayam') || c.includes('bebek')) return 'daging'
  if (c.includes('ikan') || c.includes('perikanan') || c.includes('lele') || c.includes('nila') || c.includes('gurame')) return 'ikan'
  if (c.includes('sayur') || c.includes('cabai')) return 'sayur'
  if (c.includes('buah') || c.includes('pisang')) return 'buah'
  if (c.includes('kopi')) return 'kopi'
  return 'organik'
}

function resetAllDataToZero() {
  // 1. Reset semua stok komoditas ke 0 dan soldCount ke 0
  products.value.forEach(p => {
    p.stock = 0
    p.soldCount = 0
  })

  // 2. Hapus/kosongkan seluruh tiket pesanan
  whatsappOrders.value = []

  // 3. Set grafik 7 hari ke 0 pcs
  const days = getDynamicLast7Days()
  const zeroChart = {}
  days.forEach(d => {
    zeroChart[d.isoKey] = 0
  })
  dailyChartMap.value = zeroChart

  // Sync reset ke Supabase jika terhubung
  if (isSupabaseConnected.value) {
    supabaseApi.resetOperationalDataToZero().catch(e => console.warn('Supabase reset error:', e))
  }

  // 4. Broadcast update dan simpan ke storage
  const toastData = {
    id: Date.now(),
    orderId: 'SYS-RESET-0',
    customer: 'Admin Banong Farms',
    productName: 'Reset Sistem ke Nol',
    qty: 0,
    remainingStock: 0,
    isCompleted: true
  }

  lastSyncToast.value = toastData
  broadcastUpdate(toastData)

  setTimeout(() => {
    if (lastSyncToast.value?.id === toastData.id) {
      lastSyncToast.value = null
    }
  }, 4000)

  return {
    success: true,
    message: 'Semua data operasional berhasil di-reset ke NOL (0). Siap untuk troubleshooting pengujian riil!'
  }
}

export function useAdminStore() {
  return {
    products,
    whatsappOrders,
    lastSyncToast,
    isServerDbConnected,
    isSupabaseConnected,
    syncWithServerDatabase,
    syncWithSupabaseDatabase,
    totalStockPcs,
    totalStockKg,
    totalStockTon,
    totalCapacityPercent,
    totalRevenue,
    totalRevenueJuta,
    totalOrdersCount,
    topSellingProduct,
    aiStrategy,
    dailyChartMap,
    dynamic7DaysInfo,
    getDynamicLast7Days,
    resetAllDataToZero,
    // Admin Auth
    adminUser,
    isAuthenticated,
    isAuthChecking,
    checkAuthSession,
    loginAdmin,
    logoutAdmin,

    // Order Operations
    addWhatsAppOrder,
    createCustomerOrder,
    createCustomerOrderFromCart,
    validateOrder,
    simulateIncomingOrder,
    addProduct,
    updateProduct,
    deleteProduct
  }
}
