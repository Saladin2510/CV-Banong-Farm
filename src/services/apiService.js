/**
 * API Service untuk Database Terpusat CV Banong Farms
 * Terhubung ke REST API Server (Vite Local DB & Hostinger MySQL PHP API)
 */

const BASE_URL = '/api'

export const apiService = {
  // 1. Periksa Status Koneksi Database Server
  async checkConnection() {
    try {
      const resp = await fetch(`${BASE_URL}/metrics`, { method: 'GET' })
      if (resp.ok) {
        return { connected: true, type: 'SERVER_DATABASE' }
      }
    } catch (e) {}
    return { connected: false, type: 'LOCAL_FALLBACK' }
  },

  // 2. Ambil Semua Produk dari Database Server
  async getProducts() {
    const resp = await fetch(`${BASE_URL}/products`)
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json.data || []
  },

  // 3. Tambah Produk Baru (CREATE)
  async createProduct(productData) {
    const resp = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    })
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json.data
  },

  // 4. Update Produk (UPDATE)
  async updateProduct(id, productData) {
    const resp = await fetch(`${BASE_URL}/products?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...productData, id })
    })
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json.data
  },

  // 5. Hapus Produk (DELETE)
  async deleteProduct(id) {
    const resp = await fetch(`${BASE_URL}/products?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json
  },

  // 6. Ambil Semua Pesanan WhatsApp
  async getOrders() {
    const resp = await fetch(`${BASE_URL}/orders`)
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json.data || []
  },

  // 7. Buat Pesanan Baru (Otomatis potong stok di database server)
  async createOrder(orderData) {
    const resp = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json.data
  },

  // 8. Ambil Metrik Harian & Volume Grafik
  async getMetrics() {
    const resp = await fetch(`${BASE_URL}/metrics`)
    if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`)
    const json = await resp.json()
    return json.data || {}
  }
}
