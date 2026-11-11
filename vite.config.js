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
                image: body.image || '/assets/store/karung_1.jpeg',
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

        // 4. /api/chat (Server-side secure AI proxy untuk development localhost)
        if (pathname === '/api/chat' && req.method === 'POST') {
          return readBody(async (body) => {
            let apiKey = (process.env.DEEPSEEK_API_KEY || '').trim()
            if (!apiKey) {
              try {
                const envFile = path.resolve(__dirname, '.env')
                if (fs.existsSync(envFile)) {
                  const envContent = fs.readFileSync(envFile, 'utf8')
                  const match = envContent.match(/^DEEPSEEK_API_KEY=(.+)$/m)
                  if (match && match[1]) apiKey = match[1].trim().replace(/^["']|["']$/g, '')
                }
              } catch (_) {}
            }

            if (!apiKey || !apiKey.startsWith('sk-')) {
              res.statusCode = 503
              return res.end(JSON.stringify({ error: { message: 'DEEPSEEK_API_KEY belum diisi di file .env lokal.' } }))
            }

            if (!Array.isArray(body.messages) || body.messages.length === 0) {
              res.statusCode = 400
              return res.end(JSON.stringify({ error: { message: 'Format messages tidak valid.' } }))
            }

            try {
              const safeMaxTokens = Math.max(50, Math.min(Number(body.max_tokens) || 600, 750))
              const safeTemp = Number.isFinite(Number(body.temperature)) ? Math.max(0, Math.min(Number(body.temperature), 1)) : 0.7
              const upstream = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                  model: 'deepseek-chat',
                  messages: body.messages.slice(0, 10),
                  temperature: safeTemp,
                  max_tokens: safeMaxTokens
                })
              })
              const dataText = await upstream.text()
              res.statusCode = upstream.status
              return res.end(dataText)
            } catch (err) {
              res.statusCode = 502
              return res.end(JSON.stringify({ error: { message: 'Gagal menghubungi DeepSeek API: ' + err.message } }))
            }
          })
        }

        return next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), localDatabaseApiPlugin()],
  optimizeDeps: {
    entries: ['index.html'],
  },
  server: {
    proxy: {
      '/api-deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api-deepseek/, ''),
        secure: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
