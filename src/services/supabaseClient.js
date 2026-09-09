import { createClient } from '@supabase/supabase-js'

const STORAGE_KEY_URL = 'banong_supabase_url'
const STORAGE_KEY_ANON = 'banong_supabase_anon_key'

// Ambil URL & Key dari ENV atau LocalStorage pengguna
export function getStoredCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || ''
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) || '' : ''
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANON) || '' : ''

  return {
    url: localUrl || envUrl,
    key: localKey || envKey,
    isCustom: !!localUrl
  }
}

export function saveCredentials(url, key) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_URL, (url || '').trim())
    localStorage.setItem(STORAGE_KEY_ANON, (key || '').trim())
    supabaseInstance = null // reset client agar menginisialisasi ulang
  }
}

export function clearCredentials() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_URL)
    localStorage.removeItem(STORAGE_KEY_ANON)
    supabaseInstance = null
  }
}

let supabaseInstance = null

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance

  const creds = getStoredCredentials()
  if (creds.url && creds.key) {
    try {
      supabaseInstance = createClient(creds.url, creds.key, {
        auth: { persistSession: false },
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      })
      return supabaseInstance
    } catch (err) {
      console.warn('Gagal inisialisasi Supabase client:', err)
    }
  }
  return null
}

export function isSupabaseConfigured() {
  const creds = getStoredCredentials()
  return !!(creds.url && creds.key)
}

// --------------------------------------------------------------------
// FUNGSI OPERASIONAL SUPABASE CLOUD (CRUD & REAL-TIME)
// --------------------------------------------------------------------

export const supabaseApi = {
  // Uji koneksi ke Supabase Cloud
  async testConnection() {
    const client = getSupabase()
    if (!client) return { success: false, message: 'URL atau Anon Key Supabase belum diisi.' }

    try {
      const { data, error } = await client.from('products').select('id, name').limit(1)
      if (error) throw error
      return { success: true, message: 'Koneksi ke Supabase Cloud Berhasil! Database Online & Real-time Siap.', count: data?.length || 0 }
    } catch (err) {
      return { success: false, message: `Gagal terhubung ke Supabase: ${err.message}` }
    }
  },

  // Ambil semua produk dari PostgreSQL Supabase
  async getProducts() {
    const client = getSupabase()
    if (!client) return null
    const { data, error } = await client.from('products').select('*').order('id', { ascending: true })
    if (error) {
      console.warn('Supabase getProducts error:', error)
      return null
    }
    // Mapping nama kolom ke format state
    return data.map(p => ({
      id: Number(p.id),
      name: p.name,
      category: p.category_name || 'Hasil Tani',
      price: Number(p.price) || 0,
      stock: Number(p.stock) || 0,
      maxStock: Number(p.max_stock) || 5000,
      unit: p.unit || 'kg',
      soldCount: Number(p.sold_count) || 0,
      icon: p.icon || 'eco',
      image: p.image_url || '/assets/product-fertilizer.png',
      description: p.description || ''
    }))
  },

  // Tambah produk baru ke Supabase
  async insertProduct(product) {
    const client = getSupabase()
    if (!client) return null
    const row = {
      name: product.name,
      category_name: product.category,
      price: product.price,
      stock: product.stock,
      max_stock: product.maxStock,
      unit: product.unit,
      icon: product.icon,
      image_url: product.image,
      description: product.description,
      sold_count: 0
    }
    const { data, error } = await client.from('products').insert([row]).select().single()
    if (error) {
      console.warn('Supabase insertProduct error:', error)
      return null
    }
    return data
  },

  // Update produk di Supabase
  async updateProduct(id, product) {
    const client = getSupabase()
    if (!client) return null
    const updatePayload = {}
    if (product.name !== undefined) updatePayload.name = product.name
    if (product.category !== undefined) updatePayload.category_name = product.category
    if (product.price !== undefined) updatePayload.price = product.price
    if (product.stock !== undefined) updatePayload.stock = product.stock
    if (product.maxStock !== undefined) updatePayload.max_stock = product.maxStock
    if (product.unit !== undefined) updatePayload.unit = product.unit
    if (product.icon !== undefined) updatePayload.icon = product.icon

    const { data, error } = await client.from('products').update(updatePayload).eq('id', id).select().single()
    if (error) {
      console.warn('Supabase updateProduct error:', error)
      return null
    }
    return data
  },

  // Hapus produk dari Supabase
  async deleteProduct(id) {
    const client = getSupabase()
    if (!client) return null
    const { error } = await client.from('products').delete().eq('id', id)
    if (error) {
      console.warn('Supabase deleteProduct error:', error)
      return false
    }
    return true
  },

  // Ambil semua pesanan WhatsApp dari Supabase
  async getOrders() {
    const client = getSupabase()
    if (!client) return null
    try {
      // 1. Coba ambil pesanan beserta rincian order_items
      let ordersData = null
      const { data, error } = await client
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
        .limit(50)

      if (!error && Array.isArray(data)) {
        ordersData = data
      } else {
        // Fallback jika relasi order_items belum terbaca langsung
        const fallback = await client
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)
        if (fallback.error) throw fallback.error
        ordersData = fallback.data
      }

      if (!Array.isArray(ordersData)) return null

      // Default mapping bantuan untuk pesanan awal bawaan jika order_items kosong
      const initialMap = {
        '#WA-8831': { productName: 'Telur Bebek Bio-Organik', qty: 120 },
        '#WA-8830': { productName: 'Cabai Rawit Merah Super', qty: 1200 },
        '#WA-8829': { productName: 'Pupuk Kasgot Super Organik', qty: 400 },
        '#WA-8828': { productName: 'Kopi Robusta Java', qty: 600 }
      }

      return ordersData.map(o => {
        const item = (Array.isArray(o.order_items) && o.order_items.length > 0) ? o.order_items[0] : null
        const fallbackItem = initialMap[o.order_code] || {}

        const productName = item?.product_name || fallbackItem.productName || 'Komoditas Unggulan'
        const qty = Number(item?.qty || fallbackItem.qty || Math.max(1, Math.round((Number(o.total_amount) || 30000) / 30000)))
        const totalPrice = Number(o.total_amount) || (qty * 30000)

        return {
          id: o.order_code || `#WA-${o.id}`,
          customer: o.customer_name || 'Mitra CV Banong',
          productId: item?.product_id || 1,
          productName,
          qty,
          totalPrice,
          status: o.status || 'Stok Terupdate Otomatis',
          timestamp: o.created_at ? new Date(o.created_at).getTime() : Date.now(),
          timeAgo: 'Tersinkron Cloud'
        }
      })
    } catch (err) {
      console.warn('Supabase getOrders error:', err)
      return null
    }
  },

  // Simpan pesanan WhatsApp & potong stok di Supabase
  async insertOrder({ orderCode, customer, productId, productName, qty, totalPrice }) {
    const client = getSupabase()
    if (!client) return null

    try {
      // 1. Ambil stok produk terkini
      const { data: prod } = await client.from('products').select('stock, sold_count').eq('id', productId).single()
      if (prod) {
        const newStock = Math.max(0, (prod.stock || 0) - qty)
        const newSold = (prod.sold_count || 0) + qty
        await client.from('products').update({ stock: newStock, sold_count: newSold }).eq('id', productId)
      }

      // 2. Simpan order
      const { data: newOrder, error } = await client.from('orders').insert([{
        order_code: orderCode,
        customer_name: customer,
        total_amount: totalPrice,
        status: 'Stok Terupdate Otomatis',
        source: 'WhatsApp B2B'
      }]).select().single()

      if (error) throw error

      // 3. Simpan order item
      if (newOrder) {
        await client.from('order_items').insert([{
          order_id: newOrder.id,
          product_id: productId,
          product_name: productName,
          qty,
          unit_price: totalPrice / qty,
          subtotal: totalPrice
        }])
      }

      return newOrder
    } catch (err) {
      console.warn('Supabase insertOrder error:', err)
      return null
    }
  },

  // Berlangganan (Subscribe) ke Saluran Real-Time WebSocket Supabase
  subscribeRealtime(onProductChange, onOrderChange) {
    const client = getSupabase()
    if (!client) return null

    const channel = client.channel('public:banong_realtime_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (typeof onProductChange === 'function') {
          onProductChange(payload)
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (typeof onOrderChange === 'function') {
          onOrderChange(payload)
        }
      })
      .subscribe((status) => {
        console.log('Status Saluran Supabase Realtime:', status)
      })

    return channel
  }
}
