import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

function localDatabaseApiPlugin() {
  const dbPath = path.resolve(__dirname, 'database/local_db.json')

  const readDb = () => {
    try {
      if (fs.existsSync(dbPath)) {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'))
      }
    } catch (e) {
      console.error('Error reading local database:', e)
    }
    return { products: [], orders: [], dailyChartMap: {} }
  }

  const writeDb = (data) => {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8')
    } catch (e) {
      console.error('Error saving local database:', e)
    }
  }

  return {
    name: 'local-database-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url, `http://${req.headers.host}`)
        const pathname = urlObj.pathname

        if (!pathname.startsWith('/api/')) {
          return next()
        }

        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 200
          return res.end()
        }

        const readBody = (callback) => {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              callback(body ? JSON.parse(body) : {})
            } catch (err) {
              callback({})
            }
          })
        }

        const db = readDb()

        // 1. /api/products
        if (pathname === '/api/products' || pathname === '/api/products.php') {
          if (req.method === 'GET') {
            const id = urlObj.searchParams.get('id')
            if (id) {
              const p = db.products.find(item => item.id == id)
              return res.end(JSON.stringify({ status: 'success', data: p || null }))
            }
            return res.end(JSON.stringify({ status: 'success', data: db.products }))
          }

          if (req.method === 'POST') {
            return readBody(body => {
              const newProduct = {
                id: Date.now(),
                name: (body.name || '').trim(),
                category: body.category || 'Hasil Tani',
                price: Number(body.price) || 20000,
                stock: Number(body.stock) || 100,
                maxStock: Number(body.maxStock) || 5000,
                unit: body.unit || 'kg',
                soldCount: 0,
                icon: body.icon || 'eco',
                image: body.image || '/assets/product-fertilizer.png',
                description: body.description || 'Komoditas segar CV Banong Farms.'
              }
              db.products.unshift(newProduct)
              writeDb(db)
              res.statusCode = 201
              return res.end(JSON.stringify({ status: 'success', message: 'Produk berhasil disimpan ke database.', data: newProduct }))
            })
          }

          if (req.method === 'PUT') {
            return readBody(body => {
              const id = urlObj.searchParams.get('id') || body.id
              const index = db.products.findIndex(p => p.id == id)
              if (index === -1) {
                res.statusCode = 404
                return res.end(JSON.stringify({ status: 'error', message: 'Produk tidak ditemukan' }))
              }
              db.products[index] = {
                ...db.products[index],
                ...body,
                name: (body.name || db.products[index].name).trim(),
                price: body.price !== undefined ? Number(body.price) : db.products[index].price,
                stock: body.stock !== undefined ? Number(body.stock) : db.products[index].stock
              }
              writeDb(db)
              return res.end(JSON.stringify({ status: 'success', message: 'Produk berhasil diperbarui.', data: db.products[index] }))
            })
          }

          if (req.method === 'DELETE') {
            return readBody(body => {
              const id = urlObj.searchParams.get('id') || body.id
              const index = db.products.findIndex(p => p.id == id)
              if (index === -1) {
                res.statusCode = 404
                return res.end(JSON.stringify({ status: 'error', message: 'Produk tidak ditemukan' }))
              }
              const deleted = db.products.splice(index, 1)[0]
              writeDb(db)
              return res.end(JSON.stringify({ status: 'success', message: 'Produk berhasil dihapus.', data: deleted }))
            })
          }
        }

        // 2. /api/orders
        if (pathname === '/api/orders' || pathname === '/api/orders.php') {
          if (req.method === 'GET') {
            return res.end(JSON.stringify({ status: 'success', data: db.orders }))
          }

          if (req.method === 'POST') {
            return readBody(body => {
              const prod = db.products.find(p => p.id == body.productId)
              if (!prod) {
                res.statusCode = 404
                return res.end(JSON.stringify({ status: 'error', message: 'Produk tidak ditemukan' }))
              }

              const deductQty = Math.min(prod.stock, Number(body.qty) || 1)
              prod.stock = Math.max(0, prod.stock - deductQty)
              prod.soldCount = (prod.soldCount || 0) + deductQty

              const todayKey = new Date().toISOString().slice(0, 10)
              db.dailyChartMap = db.dailyChartMap || {}
              db.dailyChartMap[todayKey] = (Number(db.dailyChartMap[todayKey]) || 225) + deductQty

              const order = {
                id: `#WA-${Date.now().toString().slice(-4)}`,
                customer: body.customer || 'Pelanggan WhatsApp',
                productId: prod.id,
                productName: prod.name,
                qty: deductQty,
                totalPrice: deductQty * prod.price,
                timeAgo: 'Baru saja',
                status: 'Stok Terupdate Otomatis',
                timestamp: Date.now()
              }

              db.orders.unshift(order)
              writeDb(db)
              res.statusCode = 201
              return res.end(JSON.stringify({ status: 'success', message: 'Pesanan berhasil diproses.', data: order }))
            })
          }
        }

        // 3. /api/metrics
        if (pathname === '/api/metrics' || pathname === '/api/metrics.php') {
          const totalStock = db.products.reduce((a, b) => a + (Number(b.stock) || 0), 0)
          const totalSold = db.products.reduce((a, b) => a + (Number(b.soldCount) || 0), 0)
          const totalRevenue = db.orders.reduce((a, b) => a + (Number(b.totalPrice) || 0), 482900000)
          return res.end(JSON.stringify({
            status: 'success',
            data: {
              totalProducts: db.products.length,
              totalStockKg: totalStock,
              totalSoldKg: totalSold,
              totalOrders: db.orders.length + 1428,
              totalRevenue,
              dailyChartMap: db.dailyChartMap || {}
            }
          }))
        }

        return next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), localDatabaseApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
