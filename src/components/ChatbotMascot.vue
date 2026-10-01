<template>
  <div>
    <!-- Backdrop Blur Focus Overlay when Chat is Open -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isChatOpen && isVisible && !cartStore.isCartOpen.value" 
        class="fixed inset-0 bg-black/35 dark:bg-black/65 backdrop-blur-[3px] z-40"
        @click="isChatOpen = false"
      ></div>
    </transition>

    <!-- Floating Chatbot Widget (Only visible AFTER scrolling past hero section) -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-10 scale-90"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 scale-90"
    >
      <div 
        v-show="isVisible && !cartStore.isCartOpen.value" 
        class="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto select-none"
      >
        <!-- AI Chat Window Popup -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-6 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-6 scale-95"
        >
          <div 
            v-if="isChatOpen"
            data-lenis-prevent
            class="mb-3 w-[calc(100vw-28px)] max-w-[360px] sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 dark:border-slate-700/80 overflow-hidden flex flex-col h-[460px] max-h-[78vh] sm:h-[480px] z-40 transition-colors"
          >
            <!-- Header -->
            <div class="bg-primary dark:bg-slate-950 text-on-primary p-3.5 sm:p-4 flex items-center justify-between border-b dark:border-slate-800">
              <div class="flex items-center gap-2.5 sm:gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-pure dark:bg-slate-800 p-0.5 overflow-hidden flex-shrink-0 shadow-sm border border-white/20">
                  <img src="/assets/mascot.png" alt="Mascot" class="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <div class="font-bold text-xs sm:text-sm text-secondary-container">Asisten AI Si Banong</div>
                  <div class="text-[11px] sm:text-xs text-primary-fixed dark:text-slate-400 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-secondary-container inline-block shadow-xs"></span> Aktif · Ajibarang
                  </div>
                </div>
              </div>
              <button 
                @click="isChatOpen = false" 
                class="text-surface-pure/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Tutup Obrolan"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Chat Messages Container -->
            <div class="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm" ref="messagesContainer">
              <div 
                v-for="(msg, idx) in messages" 
                :key="idx" 
                :class="[
                  'flex flex-col max-w-[88%] sm:max-w-[85%]',
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                ]"
              >
                <div 
                  :class="[
                    'p-2.5 sm:p-3 rounded-2xl text-xs leading-relaxed shadow-xs backdrop-blur-md break-words',
                    msg.sender === 'user' 
                      ? 'bg-primary dark:bg-primary-container text-white rounded-br-none' 
                      : 'bg-white/95 dark:bg-slate-800/90 text-on-surface dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none shadow-xs'
                  ]"
                  v-html="formatMessageText(msg.text)"
                ></div>
                <div class="flex items-center gap-1.5 mt-1 px-1">
                  <span class="text-[10px] text-on-surface-variant dark:text-slate-400">
                    {{ msg.time }}
                  </span>
                  <span 
                    v-if="msg.isLiveAi" 
                    class="text-[9px] px-1.5 py-0.2 rounded-full bg-secondary-container/20 text-primary dark:text-secondary-container font-semibold border border-secondary-container/30"
                  >
                    ✦ AI Pintar
                  </span>
                </div>
              </div>

              <!-- Typing Indicator Bubble -->
              <div v-if="isTyping" class="flex items-center gap-1.5 p-3 rounded-2xl bg-white/95 dark:bg-slate-800/90 text-on-surface dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none shadow-xs w-20">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-bounce"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-bounce [animation-delay:0.4s]"></span>
              </div>

              <!-- Quick Topic Pills -->
              <div v-if="messages.length <= 2" class="pt-2 flex flex-wrap gap-1.5">
                <button 
                  v-for="(topic, idx) in quickTopics" 
                  :key="idx"
                  @click="sendQuickTopic(topic)"
                  class="text-[10px] sm:text-[11px] py-1 px-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-secondary-container/60 text-primary dark:text-secondary-fixed hover:bg-secondary-container/20 transition-colors font-medium text-left shadow-xs backdrop-blur-md cursor-pointer"
                >
                  {{ topic.title }}
                </button>
              </div>
            </div>

            <!-- Chat Input Footer -->
            <div class="p-2.5 sm:p-3 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200/80 dark:border-slate-800 backdrop-blur-md flex items-center gap-2">
              <input 
                v-model="inputQuery"
                @keyup.enter="sendMessage"
                type="text" 
                placeholder="Tanyakan produk, stok, atau lokasi..." 
                class="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-on-surface dark:text-white focus:outline-none focus:border-primary dark:focus:border-secondary-container transition-colors"
              />
              <button 
                @click="sendMessage"
                class="p-2 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary transition-all active:scale-95 shadow-sm cursor-pointer"
                aria-label="Kirim Pesan"
              >
                <span class="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </transition>

        <!-- Speech Bubble Tooltip (Compact on mobile) -->
        <div 
          v-if="!isChatOpen && isBubbleVisible"
          class="relative mb-2 mr-1 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl text-primary dark:text-white text-[11px] sm:text-xs font-semibold rounded-xl shadow-2xl flex items-center gap-1.5 sm:gap-2 animate-bounce border border-white/40 dark:border-slate-700/80 transition-colors"
        >
          <span @click="toggleChat" class="cursor-pointer">Halo! Butuh pakan & bibit ternak?</span>
          <button 
            @click.stop="isBubbleVisible = false" 
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded transition-colors cursor-pointer"
            title="Tutup pesan"
          >
            <span class="material-symbols-outlined text-[13px] sm:text-[14px]">close</span>
          </button>
          <!-- Tooltip Tail -->
          <div class="absolute -bottom-1.5 right-5 sm:right-6 w-3 h-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl transform rotate-45 border-r border-b border-white/40 dark:border-slate-700/80"></div>
        </div>

        <!-- Floating Mascot Circle Button (Compact on Mobile, Prominent on Desktop) -->
        <div 
          @click="toggleChat"
          class="relative group cursor-pointer"
        >
          <div class="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-1 shadow-2xl transition-transform duration-300 transform group-hover:scale-105 flex items-center justify-center overflow-hidden border-2 border-secondary-container animate-float">
            <img 
              alt="AI Farm Assistant Mascot CV Banong Farms" 
              class="w-full h-full object-cover rounded-full" 
              src="/assets/mascot.png" 
            />
          </div>

          <!-- Red Notification Badge Dot "1" -->
          <div 
            v-if="unreadCount > 0" 
            class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-alert-badge text-surface-pure flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-md ring-2 ring-white dark:ring-slate-900"
          >
            {{ unreadCount }}
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { chatWithMascot } from '../services/aiService'
import { useCartStore } from '../stores/useCartStore'
import { useAdminStore } from '../stores/useAdminStore'

const cartStore = useCartStore()
const adminStore = useAdminStore()
const isVisible = ref(false)
const isChatOpen = ref(false)
const isBubbleVisible = ref(true)
const unreadCount = ref(1)
const inputQuery = ref('')
const messagesContainer = ref(null)

watch(() => cartStore.isCartOpen.value, (isOpen) => {
  if (isOpen) {
    isChatOpen.value = false
  }
})

const handleScroll = () => {
  // Sembunyikan saat posisi hero section (<= 420px)
  const isPastHero = window.scrollY > 420

  // Sembunyikan saat posisi footer section
  let isNearFooter = false
  const footer = document.getElementById('kontak') || document.querySelector('footer')
  if (footer) {
    const rect = footer.getBoundingClientRect()
    isNearFooter = rect.top <= window.innerHeight
  } else {
    const scrollBottom = window.innerHeight + window.scrollY
    const docHeight = document.documentElement.scrollHeight
    isNearFooter = scrollBottom >= docHeight - 300
  }

  isVisible.value = isPastHero && !isNearFooter
  if (!isVisible.value && isChatOpen.value) {
    isChatOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const getTime = () => {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

const messages = ref([
  {
    sender: 'bot',
    text: 'Halo Peternak Hebat! Saya Si Banong, asisten toko sarana peternakan CV Banong Farms Ajibarang (Agen Resmi PT. New Hope Indonesia). Ada yang bisa saya bantu seputar pakan unggas, bibit DOQ/DOC, obat Medion, atau pengantaran armada toko ke kandang Anda hari ini? 🌾🚚',
    time: getTime()
  }
])

const quickTopics = [
  { title: '🌾 Cek Pakan New Hope HP100' },
  { title: '🐣 Info Bibit DOQ & DOC' },
  { title: '💊 Obat Medion & Vaksin Resmi' },
  { title: '🚚 Layanan Armada Toko Sendiri' }
]

// Parser teks percakapan: Mengubah URL mentah, link WhatsApp, dan Google Maps menjadi tombol/link interaktif yang bisa diklik langsung
const formatMessageText = (text) => {
  if (!text) return ''

  // 1. Escape HTML untuk mencegah injeksi XSS
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 2. Parse Markdown Links [Label](url)
  formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, label, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 break-all cursor-pointer transition-colors">${label} <span class="material-symbols-outlined text-[13px]">open_in_new</span></a>`
  })

  // 3. Parse Raw URLs (http:// atau https://)
  formatted = formatted.replace(/(https?:\/\/[^\s<]+)/g, (match) => {
    const cleanUrl = match.replace(/[.,;!?:)]+$/, '')
    const trail = match.slice(cleanUrl.length)

    let displayLabel = cleanUrl
    let icon = 'open_in_new'
    let linkClass = 'inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 break-all cursor-pointer transition-colors'

    if (cleanUrl.includes('maps.app.goo.gl') || cleanUrl.includes('google.com/maps')) {
      displayLabel = 'Buka Google Maps 📍'
      icon = 'near_me'
      linkClass = 'inline-flex items-center gap-1.5 px-3 py-1 my-1 rounded-xl bg-emerald-100/90 hover:bg-emerald-200/90 dark:bg-emerald-950/80 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 font-bold text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer no-underline'
    } else if (cleanUrl.includes('wa.me')) {
      displayLabel = 'Chat WhatsApp Pengelola 📲'
      icon = 'chat'
      linkClass = 'inline-flex items-center gap-1.5 px-3 py-1 my-1 rounded-xl bg-green-100/90 hover:bg-green-200/90 dark:bg-green-950/80 dark:hover:bg-green-900/80 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700/80 font-bold text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer no-underline'
    }

    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="${linkClass}"><span>${displayLabel}</span><span class="material-symbols-outlined text-[13px]">${icon}</span></a>${trail}`
  })

  // 4. Deteksi nomor WhatsApp resmi jika belum terbungkus link (misal: 0899-9192-861 atau 08999192861)
  formatted = formatted.replace(/(?<!href="[^"]*|">)(0899[- ]?9192[- ]?861)/g, (match) => {
    return `<a href="https://wa.me/628999192861" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 cursor-pointer transition-colors" title="Klik untuk chat WhatsApp">${match} <span class="material-symbols-outlined text-[13px]">chat</span></a>`
  })

  // 5. Parse Markdown Bold: **text**
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold opacity-95">$1</strong>')

  // 6. Parse Markdown Italic: *text* (excluding already formatted)
  formatted = formatted.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>')

  // 7. Parse Line Breaks (\n to <br/>)
  formatted = formatted.replace(/\n/g, '<br/>')

  return formatted
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    unreadCount.value = 0
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const sendQuickTopic = (topic) => {
  inputQuery.value = topic.title
  sendMessage()
}

const isTyping = ref(false)

const sendMessage = async () => {
  if (!inputQuery.value.trim() || isTyping.value) return
  
  const text = inputQuery.value.trim()
  inputQuery.value = ''
  
  messages.value.push({
    sender: 'user',
    text: text,
    time: getTime()
  })
  scrollToBottom()

  isTyping.value = true
  try {
    // Suntikkan data produk realtime dari adminStore ke engine AI Gemini
    const liveProducts = adminStore.products.value || []
    const aiResponse = await chatWithMascot(text, messages.value, liveProducts)
    
    messages.value.push({
      sender: 'bot',
      text: aiResponse.text,
      isLiveAi: aiResponse.isLiveAi,
      time: getTime()
    })
  } catch (e) {
    messages.value.push({
      sender: 'bot',
      text: 'Halo Kak! Untuk informasi harga, ketersediaan stok pakan, bibit, atau obat terbaru, Kakak bisa langsung chat hotline WhatsApp resmi CV Banong Farms di 0899-9192-861 (Ajibarang, Banyumas). Kami siap melayani Senin – Sabtu pukul 07.30 - 16.00 WIB (Hari Minggu Libur)!',
      time: getTime()
    })
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}
</script>
