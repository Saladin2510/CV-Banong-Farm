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
        auth: { 
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        },
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
      // Prioritaskan tabel bahasa Indonesia 'produk', fallback ke 'products'
      let res = await client.from('produk').select('id, nama_produk').limit(1)
      if (res.error) {
        res = await client.from('products').select('id, name').limit(1)
      }
      if (res.error) throw res.error
      return { success: true, message: 'Koneksi ke Supabase Cloud Berhasil! Database Online & Real-time Siap.', count: res.data?.length || 0 }
    } catch (err) {
      return { success: false, message: `Gagal terhubung ke Supabase: ${err.message}` }
    }
  },

  // Ambil semua produk dari PostgreSQL Supabase (Tabel produk)
  async getProducts() {
    const client = getSupabase()
    if (!client) return null

    try {
      // 1. Coba ambil dari tabel bahasa Indonesia: 'produk'
      const { data, error } = await client
        .from('produk')
        .select('*, kategori(nama_kategori)')
        .order('id', { ascending: true })

      if (!error && Array.isArray(data)) {
        return data.map(p => ({
          id: Number(p.id),
          name: p.nama_produk || p.name || 'Produk Pakan',
          category: p.kategori?.nama_kategori || 'Pakan Ternak',
          price: Number(p.harga) || 0,
          stock: Number(p.stok) || 0,
          maxStock: Number(p.stok_maksimal) || 5000,
          unit: p.satuan || 'pcs',
          soldCount: Number(p.jumlah_terjual) || 0,
          icon: 'eco',
          image: p.url_gambar || '/assets/product-fertilizer.png',
          description: p.deskripsi || ''
        }))
      }

      // Fallback: Jika tabel produk kosong atau belum ada data, cek tabel lama jika masih ada
      const fallback = await client.from('products').select('*').order('id', { ascending: true })
      if (!fallback.error && Array.isArray(fallback.data)) {
        return fallback.data.map(p => ({
          id: Number(p.id),
          name: p.name,
          category: p.category_name || 'Hasil Tani',
          price: Number(p.price) || 0,
          stock: Number(p.stock) || 0,
          maxStock: Number(p.max_stock) || 5000,
          unit: p.unit || 'pcs',
          soldCount: Number(p.sold_count) || 0,
          icon: p.icon || 'eco',
          image: p.image_url || '/assets/product-fertilizer.png',
          description: p.description || ''
        }))
      }

      return []
    } catch (err) {
      console.warn('Supabase getProducts error:', err)
      return []
    }
  },

  // Reset seluruh data operasional ke default NOL di Supabase Cloud (Hapus Madura, reset stok & pesanan)
  async resetOperationalDataToZero() {
    const client = getSupabase()
    if (!client) return { success: false, message: 'Supabase belum terhubung' }

    try {
      // 1. Hapus detail pesanan & pesanan
      try {
        await client.from('detail_pesanan').delete().neq('id', 0)
        await client.from('pesanan').delete().neq('id', 0)
      } catch (e1) {
        console.warn('Delete pesanan error:', e1)
      }
      
      // Fallback tabel lama jika ada
      try {
        await client.from('order_items').delete().neq('id', 0)
        await client.from('orders').delete().neq('id', 0)
      } catch (_) {}

      // 2. Hapus produk bernama "telur bebek asli madura" atau yang mengandung kata "madura"
      try {
        await client.from('produk').delete().ilike('nama_produk', '%madura%')
        await client.from('products').delete().ilike('name', '%madura%')
      } catch (_) {}

      // 3. Set seluruh stok produk dan jumlah_terjual ke 0 pcs
      try {
        await client.from('produk').update({ stok: 0, jumlah_terjual: 0, satuan: 'pcs' }).neq('id', 0)
      } catch (_) {}
      try {
        await client.from('products').update({ stock: 0, sold_count: 0, unit: 'pcs' }).neq('id', 0)
      } catch (_) {}

      // 4. Hapus riwayat metrik harian jika ada
      try {
        await client.from('metrik_harian').delete().neq('volume_aktual_kg', -9999)
      } catch (_) {}

      return { success: true, message: 'Supabase Cloud berhasil di-reset ke default NOL murni.' }
    } catch (err) {
      console.warn('resetOperationalDataToZero error:', err)
      return { success: false, message: err.message }
    }
  },

  // Tambah produk baru ke Supabase
  async insertProduct(product) {
    const client = getSupabase()
    if (!client) return null

    // Format tabel produk (Bahasa Indonesia)
    const row = {
      nama_produk: product.name,
      harga: product.price,
      stok: product.stock,
      stok_maksimal: product.maxStock,
      satuan: product.unit || 'kg',
      url_gambar: product.image || '/assets/product-fertilizer.png',
      deskripsi: product.description || '',
      jumlah_terjual: 0
    }

    try {
      const { data, error } = await client.from('produk').insert([row]).select().single()
      if (!error) return data

      // Fallback ke products jika tabel produk bermasalah
      const legacyRow = {
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
      const legacy = await client.from('products').insert([legacyRow]).select().single()
      return legacy.data
    } catch (err) {
      console.warn('Supabase insertProduct error:', err)
      return null
    }
  },

  // Update produk di Supabase
  async updateProduct(id, product) {
    const client = getSupabase()
    if (!client) return null

    const updatePayload = {}
    if (product.name !== undefined) updatePayload.nama_produk = product.name
    if (product.price !== undefined) updatePayload.harga = product.price
    if (product.stock !== undefined) updatePayload.stok = product.stock
    if (product.maxStock !== undefined) updatePayload.stok_maksimal = product.maxStock
    if (product.unit !== undefined) updatePayload.satuan = product.unit
    if (product.image !== undefined) updatePayload.url_gambar = product.image
    if (product.description !== undefined) updatePayload.deskripsi = product.description

    try {
      const { data, error } = await client.from('produk').update(updatePayload).eq('id', id).select().single()
      if (!error) return data

      // Fallback ke products
      const legacyPayload = {}
      if (product.name !== undefined) legacyPayload.name = product.name
      if (product.category !== undefined) legacyPayload.category_name = product.category
      if (product.price !== undefined) legacyPayload.price = product.price
      if (product.stock !== undefined) legacyPayload.stock = product.stock
      if (product.maxStock !== undefined) legacyPayload.max_stock = product.maxStock
      if (product.unit !== undefined) legacyPayload.unit = product.unit
      if (product.icon !== undefined) legacyPayload.icon = product.icon
      const legacy = await client.from('products').update(legacyPayload).eq('id', id).select().single()
      return legacy.data
    } catch (err) {
      console.warn('Supabase updateProduct error:', err)
      return null
    }
  },

  // Hapus produk dari Supabase
  async deleteProduct(id) {
    const client = getSupabase()
    if (!client) return null
    try {
      const { error } = await client.from('produk').delete().eq('id', id)
      if (!error) return true

      // Fallback
      const legacy = await client.from('products').delete().eq('id', id)
      return !legacy.error
    } catch (err) {
      console.warn('Supabase deleteProduct error:', err)
      return false
    }
  },

  // Ambil semua pesanan WhatsApp dari Supabase
  async getOrders() {
    const client = getSupabase()
    if (!client) return null
    try {
      // 1. Ambil dari tabel bahasa Indonesia: pesanan & detail_pesanan
      const { data, error } = await client
        .from('pesanan')
        .select('*, detail_pesanan(*)')
        .order('dibuat_pada', { ascending: false })
        .limit(50)

      if (!error && Array.isArray(data)) {
        return data.map(o => {
          const detail = (Array.isArray(o.detail_pesanan) && o.detail_pesanan.length > 0) ? o.detail_pesanan[0] : null
          const qty = Number(detail?.jumlah_beli || 1)
          const totalPrice = Number(o.total_harga || (qty * 30000))

          return {
            id: o.kode_pesanan || `#WA-${o.id}`,
            customer: o.nama_pelanggan || 'Pelanggan CV Banong',
            phone: o.no_whatsapp || '',
            address: o.alamat_pelanggan || '',
            productId: detail?.id_produk || 1,
            productName: detail?.id_produk ? `Produk #${detail.id_produk}` : 'Pakan Pilihan',
            qty,
            totalPrice,
            status: o.status || 'Menunggu Konfirmasi',
            timestamp: o.dibuat_pada ? new Date(o.dibuat_pada).getTime() : Date.now(),
            timeAgo: 'Tersinkron Cloud'
          }
        })
      }

      // Fallback: jika masih ada di tabel lama 'orders'
      const fallback = await client
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
        .limit(50)

      if (!fallback.error && Array.isArray(fallback.data)) {
        return fallback.data.map(o => {
          const item = (Array.isArray(o.order_items) && o.order_items.length > 0) ? o.order_items[0] : null
          const qty = Number(item?.qty || 1)
          const totalPrice = Number(o.total_amount) || (qty * 30000)

          return {
            id: o.order_code || `#WA-${o.id}`,
            customer: o.customer_name || 'Mitra CV Banong',
            productId: item?.product_id || 1,
            productName: item?.product_name || 'Komoditas Unggulan',
            qty,
            totalPrice,
            status: o.status || 'Stok Terupdate Otomatis',
            timestamp: o.created_at ? new Date(o.created_at).getTime() : Date.now(),
            timeAgo: 'Tersinkron Cloud'
          }
        })
      }

      return []
    } catch (err) {
      console.warn('Supabase getOrders error:', err)
      return []
    }
  },

  // Simpan pesanan WhatsApp (Mendukung multi-item keranjang belanja, status: Menunggu Konfirmasi)
  async insertOrder({ orderCode, customer, phone, address, items, productId, productName, qty, totalPrice, autoDeduct = false }) {
    const client = getSupabase()
    if (!client) return null

    try {
      // 1. Simpan ke tabel pesanan (Bahasa Indonesia)
      const { data: newOrder, error } = await client.from('pesanan').insert([{
        kode_pesanan: orderCode,
        nama_pelanggan: customer,
        no_whatsapp: phone || '08999192861',
        alamat_pelanggan: address || 'Ajibarang, Banyumas',
        total_harga: totalPrice,
        status: 'Menunggu Konfirmasi'
      }]).select().single()

      if (!error && newOrder) {
        // 2. Simpan detail_pesanan (bisa multiple items dari keranjang)
        let detailRows = []
        if (Array.isArray(items) && items.length > 0) {
          detailRows = items.map(it => ({
            id_pesanan: newOrder.id,
            id_produk: it.id,
            jumlah_beli: it.qty || 1,
            harga_satuan: it.price || 0,
            subtotal: (it.price || 0) * (it.qty || 1)
          }))
        } else {
          detailRows = [{
            id_pesanan: newOrder.id,
            id_produk: productId,
            jumlah_beli: qty || 1,
            harga_satuan: totalPrice / (qty || 1),
            subtotal: totalPrice
          }]
        }

        await client.from('detail_pesanan').insert(detailRows)

        // Hanya potong stok jika autoDeduct diaktifkan eksplisit (misal simulasi)
        if (autoDeduct) {
          for (const d of detailRows) {
            const { data: prod } = await client.from('produk').select('stok, jumlah_terjual').eq('id', d.id_produk).single()
            if (prod) {
              const newStock = Math.max(0, (prod.stok || 0) - d.jumlah_beli)
              const newSold = (prod.jumlah_terjual || 0) + d.jumlah_beli
              await client.from('produk').update({ stok: newStock, jumlah_terjual: newSold }).eq('id', d.id_produk)
            }
          }
        }

        return newOrder
      }

      // Fallback ke tabel lama orders jika ada
      const legacyOrder = await client.from('orders').insert([{
        order_code: orderCode,
        customer_name: customer,
        total_amount: totalPrice,
        status: 'Menunggu Konfirmasi',
        source: 'WhatsApp B2B'
      }]).select().single()

      if (legacyOrder.data) {
        await client.from('order_items').insert([{
          order_id: legacyOrder.data.id,
          product_id: productId || items?.[0]?.id,
          product_name: productName || items?.[0]?.name || 'Pakan Ternak',
          qty: qty || items?.[0]?.qty || 1,
          unit_price: totalPrice / (qty || 1),
          subtotal: totalPrice
        }])
      }

      return legacyOrder.data
    } catch (err) {
      console.warn('Supabase insertOrder error:', err)
      return null
    }
  },

  // Validasi Berhasil (Deal): Admin klik 'Selesai', kurangi stok & catat metrik harian
  async completeOrder(orderId) {
    const client = getSupabase()
    if (!client) return { success: false, message: 'Koneksi Supabase belum aktif.' }

    try {
      // 1. Coba ambil pesanan
      const matchCol = (typeof orderId === 'number') ? 'id' : 'kode_pesanan'
      const { data: order, error: orderErr } = await client
        .from('pesanan')
        .select('*, detail_pesanan(*)')
        .eq(matchCol, orderId)
        .single()

      if (orderErr || !order) {
        // Coba fallback via RPC
        if (typeof orderId === 'number') {
          const { data: rpcRes, error: rpcErr } = await client.rpc('selesaikan_pesanan', { p_id_pesanan: orderId })
          if (!rpcErr && rpcRes?.success) return rpcRes
        }
        return { success: false, message: 'Pesanan tidak ditemukan di database.' }
      }

      // Coba panggil database function 'selesaikan_pesanan' jika ada ID numerik
      try {
        const { data: rpcRes, error: rpcErr } = await client.rpc('selesaikan_pesanan', { p_id_pesanan: order.id })
        if (!rpcErr && rpcRes?.success) {
          return { success: true, message: rpcRes.message }
        }
      } catch (e) {
        // Fallback ke update manual jika RPC belum dibuat di console Supabase
      }

      // 2. Fallback Manual: Kurangi stok masing-masing barang di detail_pesanan
      let totalKg = 0
      if (Array.isArray(order.detail_pesanan)) {
        for (const item of order.detail_pesanan) {
          const { data: prod } = await client.from('produk').select('stok, jumlah_terjual').eq('id', item.id_produk).single()
          if (prod) {
            const newStock = Math.max(0, (prod.stok || 0) - (item.jumlah_beli || 1))
            const newSold = (prod.jumlah_terjual || 0) + (item.jumlah_beli || 1)
            await client.from('produk').update({ stok: newStock, jumlah_terjual: newSold }).eq('id', item.id_produk)
          }
          totalKg += Number(item.jumlah_beli || 1)
        }
      }

      // 3. Update status pesanan menjadi 'Selesai'
      await client.from('pesanan').update({ status: 'Selesai' }).eq('id', order.id)

      // 4. Catat transaksi ke tabel metrik_harian
      const today = new Date().toISOString().slice(0, 10)
      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      const labelHari = dayNames[new Date().getDay()]

      const { data: existingMetric } = await client.from('metrik_harian').select('*').eq('tanggal', today).single()
      if (existingMetric) {
        await client.from('metrik_harian').update({
          volume_aktual_kg: (existingMetric.volume_aktual_kg || 0) + totalKg
        }).eq('tanggal', today)
      } else {
        await client.from('metrik_harian').insert([{
          tanggal: today,
          label_hari: labelHari,
          volume_aktual_kg: totalKg,
          prediksi_volume_kg: totalKg + 50
        }])
      }

      return { success: true, message: 'Validasi berhasil! Pesanan selesai, stok dipotong, dan metrik harian dicatat.' }
    } catch (err) {
      console.warn('Supabase completeOrder error:', err)
      return { success: false, message: err.message }
    }
  },

  // Validasi Gagal (Batal): Admin klik 'Batalkan', tanpa mengurangi stok produk
  async cancelOrder(orderId) {
    const client = getSupabase()
    if (!client) return { success: false, message: 'Koneksi Supabase belum aktif.' }

    try {
      const matchCol = (typeof orderId === 'number') ? 'id' : 'kode_pesanan'
      const { error } = await client.from('pesanan').update({ status: 'Dibatalkan' }).eq(matchCol, orderId)
      if (error) throw error
      return { success: true, message: 'Pesanan telah dibatalkan tanpa mengurangi stok produk.' }
    } catch (err) {
      console.warn('Supabase cancelOrder error:', err)
      return { success: false, message: err.message }
    }
  },

  // ==================================================================
  // SUPABASE AUTHENTICATION (ADMIN LOGIN & LOGOUT)
  // ==================================================================
  async loginAdmin(email, password) {
    const client = getSupabase()
    if (!client) return { success: false, message: 'Supabase URL dan Anon Key belum dikonfigurasi.' }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      })
      if (error) throw error

      // Coba ambil profil metadata dari tabel admin jika ada
      let profile = null
      if (data?.user?.id) {
        try {
          const { data: adm } = await client.from('admin').select('*').eq('id', data.user.id).single()
          profile = adm
        } catch (e) {}
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
        profile: profile || {
          nama_lengkap: data.user.user_metadata?.nama_lengkap || data.user.email?.split('@')[0] || 'Administrator Banong',
          email: data.user.email,
          peran: 'Super Admin'
        }
      }
    } catch (err) {
      console.warn('Supabase loginAdmin error:', err)
      return { success: false, message: err.message || 'Gagal login. Periksa email & password Anda.' }
    }
  },

  async logoutAdmin() {
    const client = getSupabase()
    if (!client) return { success: true }
    try {
      await client.auth.signOut()
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  },

  async getAdminSession() {
    const client = getSupabase()
    if (!client) return null
    try {
      const { data } = await client.auth.getSession()
      return data?.session || null
    } catch (err) {
      return null
    }
  },

  onAuthStateChange(callback) {
    const client = getSupabase()
    if (!client) return null
    return client.auth.onAuthStateChange(callback)
  },

  // Berlangganan (Subscribe) ke Saluran Real-Time WebSocket Supabase
  subscribeRealtime(onProductChange, onOrderChange) {
    const client = getSupabase()
    if (!client) return null

    const channel = client.channel('public:banong_realtime_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'produk' }, (payload) => {
        if (typeof onProductChange === 'function') onProductChange(payload)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pesanan' }, (payload) => {
        if (typeof onOrderChange === 'function') onOrderChange(payload)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (typeof onProductChange === 'function') onProductChange(payload)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (typeof onOrderChange === 'function') onOrderChange(payload)
      })
      .subscribe((status) => {
        console.log('Status Saluran Supabase Realtime:', status)
      })

    return channel
  }
}
