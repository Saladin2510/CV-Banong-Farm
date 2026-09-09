import { ref, computed, watch } from 'vue'

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

export function useCartStore() {
  const totalItems = computed(() => {
    return items.value.reduce((acc, it) => acc + (it.qty || 1), 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((acc, it) => acc + (Number(it.price || 0) * (it.qty || 1)), 0)
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
    const existing = items.value.find(it => it.id === product.id)
    const addQty = Math.max(1, Number(quantity) || 1)

    if (existing) {
      existing.qty = Math.min(product.stock || 9999, existing.qty + addQty)
    } else {
      items.value.push({
        id: product.id,
        name: product.name || product.title || 'Produk Pakan',
        title: product.title || product.name || 'Produk Pakan',
        category: product.category || 'Pakan Ternak',
        price: Number(product.price) || 0,
        unit: product.unit || 'kg',
        image: product.image || '/assets/product-fertilizer.png',
        stock: product.stock || 0,
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
        item.qty = Math.min(item.stock || 9999, q)
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
