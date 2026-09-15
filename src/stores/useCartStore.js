import { ref, computed, watch } from 'vue'
import { useAdminStore } from './useAdminStore'

const CART_STORAGE_KEY = 'cv_banong_cart_items_v1'

const items = ref([])
const isCartOpen = ref(false)

// Inisialisasi dari localStorage jika ada
try {
  const saved = localStorage.getItem(CART_STORAGE_KEY)
  if (saved) {
    items.value = JSON.parse(saved)
  }
} catch (e) {
  items.value = []
}

// Simpan otomatis ke localStorage setiap ada perubahan
watch(items, (newVal) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newVal))
  } catch (e) {}
}, { deep: true })

const adminStore = useAdminStore()

// Sinkronisasi Reaktif Otomatis dengan Master Produk / Admin Store
// Menutup celah jika admin mengubah harga (misal dari 450rb ke 25rb) atau menambah stok
function syncCartWithLiveProducts(liveProducts) {
  if (!Array.isArray(liveProducts) || liveProducts.length === 0 || items.value.length === 0) return

  let hasChanged = false

  items.value.forEach(item => {
    const live = liveProducts.find(p => p.id === item.id)
    if (live) {
      const livePrice = Number(live.price ?? live.harga) || 0
      const liveStock = Number(live.stock ?? live.stok) || 0
      const liveName = live.name || live.title || live.nama_produk || item.name
      const liveUnit = live.unit || live.satuan || item.unit || 'pcs'
      const liveImage = live.image || live.url_gambar || item.image

      if (Number(item.price) !== livePrice) {
        item.oldPrice = Number(item.price) // simpan catatan harga lama jika ada perubahan
        item.price = livePrice
        hasChanged = true
      }
      if (Number(item.stock) !== liveStock) {
        item.stock = liveStock
        hasChanged = true
      }
      if (item.name !== liveName) {
        item.name = liveName
        item.title = liveName
        hasChanged = true
      }
      if (item.unit !== liveUnit) {
        item.unit = liveUnit
        hasChanged = true
      }
      if (item.image !== liveImage) {
        item.image = liveImage
        hasChanged = true
      }
    }
  })

  if (hasChanged) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    } catch (e) {}
  }
}

// Pantau pembaruan produk admin secara real-time
watch(
  () => adminStore.products.value,
  (newProds) => {
    syncCartWithLiveProducts(newProds)
  },
  { immediate: true, deep: true }
)

export function useCartStore() {
  const totalItems = computed(() => {
    return items.value.reduce((acc, it) => acc + (it.qty || 1), 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((acc, it) => {
      // Selalu utamakan harga live terkini dari adminStore untuk mencegah celah harga usang
      const live = adminStore.products.value.find(p => p.id === it.id)
      const currentPrice = (live && live.price !== undefined) ? Number(live.price) : Number(it.price || 0)
      return acc + (currentPrice * (it.qty || 1))
    }, 0)
  })

  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  function addToCart(product, quantity = 1) {
    if (!product) return
    const live = adminStore.products.value.find(p => p.id === product.id) || product
    const existing = items.value.find(it => it.id === live.id)
    const addQty = Math.max(1, Number(quantity) || 1)
    const currentStock = Number(live.stock ?? live.stok ?? 0)
    const currentPrice = Number(live.price ?? live.harga ?? 0)

    if (existing) {
      existing.qty += addQty
      existing.stock = currentStock
      existing.price = currentPrice
    } else {
      items.value.push({
        id: live.id,
        name: live.name || live.title || 'Produk Pakan',
        title: live.title || live.name || 'Produk Pakan',
        category: live.category || 'Pakan Ternak',
        price: currentPrice,
        unit: live.unit || live.satuan || 'pcs',
        image: live.image || live.url_gambar || '/assets/product-fertilizer.png',
        stock: currentStock,
        qty: addQty
      })
    }
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(it => it.id === productId)
    if (item) {
      const q = Number(quantity)
      if (q <= 0) {
        removeFromCart(productId)
      } else {
        item.qty = q
      }
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(it => it.id !== productId)
  }

  function clearCart() {
    items.value = []
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (e) {}
  }

  return {
    items,
    isCartOpen,
    totalItems,
    totalPrice,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
}
