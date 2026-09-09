import { ref, computed } from 'vue'

// Reactive state singleton
const products = ref([
  {
    id: 1,
    name: 'Buah Naga Merah Super',
    category: 'Buah-buahan',
    stock: 14200,
    maxStock: 18000,
    price: 22000,
    soldCount: 3850,
    icon: 'eco',
    status: 'Optimal'
  },
  {
    id: 2,
    name: 'Cabai Rawit Merah Super',
    category: 'Sayur & Cabai',
    stock: 6800,
    maxStock: 16000,
    price: 30000,
    soldCount: 5120, // highest selling initial
    icon: 'local_fire_department',
    status: 'Kritis'
  },
  {
    id: 3,
    name: 'Kopi Robusta Java',
    category: 'Biji Kopi',
    stock: 21500,
    maxStock: 24000,
    price: 48000,
    soldCount: 2900,
    icon: 'coffee',
    status: 'Optimal'
  },
  {
    id: 4,
    name: 'Pisang Cavendish Organik',
    category: 'Buah-buahan',
    stock: 8400,
    maxStock: 15000,
    price: 15000,
    soldCount: 4200,
    icon: 'nutrition',
    status: 'Sedang'
  },
  {
    id: 5,
    name: 'Jahe Merah Pilihan',
    category: 'Rimpang',
    stock: 3100,
    maxStock: 12000,
    price: 23000,
    soldCount: 1650,
    icon: 'spa',
    status: 'Rendah'
  }
])

let orderSeq = 1
const whatsappOrders = ref([
  {
    id: '#WA-8831',
    customer: 'PT Sumber Segar Jaya (DKI Jakarta)',
    productId: 4,
    productName: 'Pisang Cavendish Organik',
    qty: 850,
    totalPrice: 12750000,
    timeAgo: 'Baru saja (2 mnt lalu)',
    timestamp: Date.now() - 120000,
    status: 'Stok Terupdate Otomatis'
  },
  {
    id: '#WA-8830',
    customer: 'CV Agro Makmur Mandiri (Bandung)',
    productId: 2,
    productName: 'Cabai Rawit Merah Super',
    qty: 1200,
    totalPrice: 36000000,
    timeAgo: '7 mnt lalu',
    timestamp: Date.now() - 420000,
    status: 'Stok Terupdate Otomatis'
  },
  {
    id: '#WA-8829',
    customer: 'Koperasi Tani Berkah (Sukabumi)',
    productId: 5,
    productName: 'Jahe Merah Pilihan',
    qty: 400,
    totalPrice: 9200000,
    timeAgo: '14 mnt lalu',
    timestamp: Date.now() - 840000,
    status: 'Stok Terupdate Otomatis'
  },
  {
    id: '#WA-8828',
    customer: 'Resto Boga Lestari (Surabaya)',
    productId: 3,
    productName: 'Kopi Robusta Java',
    qty: 600,
    totalPrice: 28800000,
    timeAgo: '21 mnt lalu',
    timestamp: Date.now() - 1260000,
    status: 'Stok Terupdate Otomatis'
  }
])

const lastSyncToast = ref(null)

// Computed Totals & Metrics
const totalStockKg = computed(() => {
  return products.value.reduce((acc, p) => acc + p.stock, 0)
})

const totalStockTon = computed(() => {
  return (totalStockKg.value / 1000).toFixed(1)
})

const totalCapacityPercent = computed(() => {
  const totalMax = products.value.reduce((acc, p) => acc + (p.maxStock || p.stock * 1.3), 0)
  if (!totalMax) return 0
  return Math.min(100, Math.round((totalStockKg.value / totalMax) * 100))
})

const totalRevenue = computed(() => {
  const baseRevenue = 482900000 // initial Rp 482,9 Juta
  const additionalRevenue = whatsappOrders.value.reduce((acc, o) => acc + o.totalPrice, 0) - (12750000 + 36000000 + 9200000 + 28800000)
  return baseRevenue + Math.max(0, additionalRevenue)
})

const totalRevenueJuta = computed(() => {
  return (totalRevenue.value / 1000000).toFixed(1)
})

const totalOrdersCount = computed(() => {
  return 1428 + (whatsappOrders.value.length - 4)
})

// Highest-Selling Product
const topSellingProduct = computed(() => {
  if (!products.value.length) return null
  return [...products.value].sort((a, b) => b.soldCount - a.soldCount)[0]
})

// Dynamic AI Strategy Recommendation
const aiStrategy = computed(() => {
  const top = topSellingProduct.value
  if (!top) {
    return {
      title: 'Strategi Penyaluran Terintegrasi',
      productName: 'Hasil Panen Umum',
      analysis: 'Belum ada data komoditas yang cukup untuk menghasilkan model strategi AI.',
      accuracy: '94,2%',
      risk: 'Rendah (0,14)',
      priority: 'Prioritas Normal'
    }
  }

  return {
    title: `Strategi Pemasaran Komoditas ${top.name}`,
    productName: top.name,
    analysis: `Berdasarkan analisis algoritma prediktif, permintaan komoditas ${top.name} menduduki volume serapan tertinggi sebesar ${top.soldCount.toLocaleString('id-ID')} kg dengan sisa stok aktif ${top.stock.toLocaleString('id-ID')} kg. Diproyeksikan terjadi lonjakan pesanan lanjutan sebesar +28% dalam 72 jam ke depan akibat pergeseran permintaan regional. Disarankan mengalokasikan 60% stok panen Kluster 04 langsung ke kanal WhatsApp Business B2B terverifikasi dan menaikkan batas harga spot sebesar 4,5% guna memaksimalkan margin sebelum siklus panen raya berikutnya.`,
    accuracy: '96,2%',
    risk: top.stock < 5000 ? 'Sedang (Stok Menipis)' : 'Rendah (0,12)',
    priority: top.stock < 5000 ? 'Segera Restok' : 'Prioritas Utama',
    recommendedSpotIncrease: '+4,5%',
    targetAllocation: '60% Kanal WA B2B'
  }
})

// Core WhatsApp Order & Stock Sync Logic
function addWhatsAppOrder({ customer, productId, qty }) {
  const prod = products.value.find(p => p.id === productId)
  if (!prod) return { success: false, message: 'Produk tidak ditemukan' }

  // Deduct product stock
  const deductQty = Math.min(prod.stock, qty)
  prod.stock = Math.max(0, prod.stock - deductQty)
  prod.soldCount += deductQty

  // Update status threshold
  const ratio = prod.stock / prod.maxStock
  if (ratio <= 0.25) {
    prod.status = 'Kritis'
  } else if (ratio <= 0.5) {
    prod.status = 'Sedang'
  } else {
    prod.status = 'Optimal'
  }

  const totalPrice = deductQty * prod.price
  orderSeq++
  const newOrder = {
    id: `#WA-${8831 + orderSeq}`,
    customer: customer || 'Mitra Agribisnis Terverifikasi',
    productId: prod.id,
    productName: prod.name,
    qty: deductQty,
    totalPrice,
    timeAgo: 'Baru saja',
    timestamp: Date.now(),
    status: 'Stok Terupdate Otomatis'
  }

  whatsappOrders.value.unshift(newOrder)

  // Trigger reactive toast notification
  lastSyncToast.value = {
    id: Date.now(),
    orderId: newOrder.id,
    customer: newOrder.customer,
    productName: prod.name,
    qty: deductQty,
    remainingStock: prod.stock
  }

  // Clear toast after 5s
  setTimeout(() => {
    if (lastSyncToast.value && lastSyncToast.value.orderId === newOrder.id) {
      lastSyncToast.value = null
    }
  }, 5000)

  return { success: true, order: newOrder }
}

// Interactive Simulation Helper (1-click test for user)
const mockBuyers = [
  'PT Agro Nusantara Sejahtera (Semarang)',
  'Catering Berkah Mandiri (Solo)',
  'Mitra Grosir Sayur Jabodetabek (Jakarta)',
  'Hotel Grand Serayu (Purwokerto)',
  'Koperasi Pasar Induk Banyumas',
  'Supermarket Fresh Mart (Yogyakarta)'
]

function simulateIncomingOrder() {
  if (!products.value.length) return
  // Pick random product with stock
  const available = products.value.filter(p => p.stock > 100)
  const pool = available.length ? available : products.value
  const targetProduct = pool[Math.floor(Math.random() * pool.length)]
  const buyer = mockBuyers[Math.floor(Math.random() * mockBuyers.length)]
  
  // Random quantity between 200 and 800 kg (in multiples of 50)
  const qty = (Math.floor(Math.random() * 12) + 4) * 50

  return addWhatsAppOrder({
    customer: buyer,
    productId: targetProduct.id,
    qty
  })
}

// Product CRUD Operations
function addProduct(data) {
  const newId = Date.now()
  const initialStock = Number(data.stock) || 1000
  const maxStock = Number(data.maxStock) || Math.round(initialStock * 1.4)
  const price = Number(data.price) || 15000

  const newProduct = {
    id: newId,
    name: data.name.trim(),
    category: data.category || 'Hasil Tani',
    stock: initialStock,
    maxStock,
    price,
    soldCount: 0,
    icon: data.icon || 'eco',
    status: initialStock > 5000 ? 'Optimal' : 'Sedang'
  }

  products.value.unshift(newProduct)
  return newProduct
}

function updateProduct(id, data) {
  const index = products.value.findIndex(p => p.id === id)
  if (index === -1) return null

  const prod = products.value[index]
  const newStock = Number(data.stock) !== undefined ? Number(data.stock) : prod.stock
  const newPrice = Number(data.price) !== undefined ? Number(data.price) : prod.price
  const newMax = Number(data.maxStock) || Math.max(prod.maxStock, newStock)

  products.value[index] = {
    ...prod,
    name: data.name !== undefined ? data.name.trim() : prod.name,
    category: data.category || prod.category,
    stock: newStock,
    maxStock: newMax,
    price: newPrice,
    icon: data.icon || prod.icon,
    status: newStock < 4000 ? 'Kritis' : (newStock < 8000 ? 'Sedang' : 'Optimal')
  }

  return products.value[index]
}

function deleteProduct(id) {
  const index = products.value.findIndex(p => p.id === id)
  if (index !== -1) {
    const deleted = products.value.splice(index, 1)[0]
    return deleted
  }
  return null
}

export function useAdminStore() {
  return {
    products,
    whatsappOrders,
    lastSyncToast,
    totalStockKg,
    totalStockTon,
    totalCapacityPercent,
    totalRevenue,
    totalRevenueJuta,
    totalOrdersCount,
    topSellingProduct,
    aiStrategy,
    addWhatsAppOrder,
    simulateIncomingOrder,
    addProduct,
    updateProduct,
    deleteProduct
  }
}
