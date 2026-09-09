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
        v-if="isChatOpen && isVisible" 
        class="fixed inset-0 bg-black/35 dark:bg-black/65 backdrop-blur-[3px] z-[95]"
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
        v-show="isVisible" 
        class="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-auto select-none"
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
            class="mb-4 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 dark:border-slate-700/80 overflow-hidden flex flex-col h-[480px] z-[100] transition-colors"
          >
            <!-- Header -->
            <div class="bg-primary dark:bg-slate-950 text-on-primary p-4 flex items-center justify-between border-b dark:border-slate-800">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-surface-pure dark:bg-slate-800 p-0.5 overflow-hidden flex-shrink-0 shadow-sm border border-white/20">
                  <img src="/assets/mascot.png" alt="Mascot" class="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <div class="font-bold text-sm text-secondary-container">Si Banong AI Assistant</div>
                  <div class="text-xs text-primary-fixed dark:text-slate-400 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-secondary-container inline-block shadow-xs"></span> Online · Ajibarang
                  </div>
                </div>
              </div>
              <button 
                @click="isChatOpen = false" 
                class="text-surface-pure/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Tutup Chat"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Chat Messages Container -->
            <div class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm" ref="messagesContainer">
              <div 
                v-for="(msg, idx) in messages" 
                :key="idx" 
                :class="[
                  'flex flex-col max-w-[85%]',
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                ]"
              >
                <div 
                  :class="[
                    'p-3 rounded-2xl text-xs leading-relaxed shadow-xs backdrop-blur-md',
                    msg.sender === 'user' 
                      ? 'bg-primary dark:bg-primary-container text-white rounded-br-none' 
                      : 'bg-white/95 dark:bg-slate-800/90 text-on-surface dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none shadow-xs'
                  ]"
                >
                  {{ msg.text }}
                </div>
                <span class="text-[10px] text-on-surface-variant dark:text-slate-400 mt-1 px-1">
                  {{ msg.time }}
                </span>
              </div>

              <!-- Quick Topic Pills -->
              <div v-if="messages.length <= 2" class="pt-2 flex flex-wrap gap-1.5">
                <button 
                  v-for="(topic, idx) in quickTopics" 
                  :key="idx"
                  @click="sendQuickTopic(topic)"
                  class="text-[11px] py-1 px-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-secondary-container/60 text-primary dark:text-secondary-fixed hover:bg-secondary-container/20 transition-colors font-medium text-left shadow-xs backdrop-blur-md"
                >
                  {{ topic.title }}
                </button>
              </div>
            </div>

            <!-- Chat Input Footer -->
            <div class="p-3 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200/80 dark:border-slate-800 backdrop-blur-md flex items-center gap-2">
              <input 
                v-model="inputQuery"
                @keyup.enter="sendMessage"
                type="text" 
                placeholder="Tanyakan produk, stok, atau lokasi..." 
                class="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-on-surface dark:text-white focus:outline-none focus:border-primary dark:focus:border-secondary-container transition-colors"
              />
              <button 
                @click="sendMessage"
                class="p-2 rounded-xl bg-secondary-container hover:bg-accent-hover text-primary transition-all active:scale-95 shadow-sm"
                aria-label="Kirim Pesan"
              >
                <span class="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </transition>

        <!-- Speech Bubble Tooltip -->
        <div 
          v-if="!isChatOpen"
          class="relative mb-2 mr-1 px-space-16 py-space-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-primary dark:text-white font-label-md text-label-md font-semibold rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-white/40 dark:border-slate-700/80 transition-colors"
        >
          <span>Halo! Butuh bantuan pesanan?</span>
          <!-- Tooltip Tail -->
          <div class="absolute -bottom-1.5 right-6 w-3 h-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl transform rotate-45 border-r border-b border-white/40 dark:border-slate-700/80"></div>
        </div>

        <!-- Floating Mascot Circle Button -->
        <div 
          @click="toggleChat"
          class="relative group cursor-pointer"
        >
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-1 shadow-2xl transition-transform duration-300 transform group-hover:scale-110 flex items-center justify-center overflow-hidden border-2 border-secondary-container animate-float">
            <img 
              alt="AI Farm Assistant Mascot CV Banong Farms" 
              class="w-full h-full object-cover rounded-full" 
              src="/assets/mascot.png" 
            />
          </div>

          <!-- Red Notification Badge Dot "1" -->
          <div 
            v-if="unreadCount > 0" 
            class="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-alert-badge text-surface-pure flex items-center justify-center font-label-sm text-xs sm:text-label-sm font-bold shadow-md ring-2 ring-white dark:ring-slate-900"
          >
            {{ unreadCount }}
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const isChatOpen = ref(false)
const unreadCount = ref(1)
const inputQuery = ref('')
const messagesContainer = ref(null)

const handleScroll = () => {
  // Hide in hero section, appear after scrolling down past hero (> 420px)
  isVisible.value = window.scrollY > 420
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
    text: 'Halo! Saya Si Banong, asisten AI CV Banong Farms Ajibarang. Ada yang bisa saya bantu hari ini?',
    time: getTime()
  }
])

const quickTopics = [
  { title: '🥚 Stok Telur Ayam Kampung', answer: 'Stok Telur Ayam Kampung Premium segar dipanen tiap pagi. Tersedia sisa 8 pack hari ini. Siap kirim via WA hotline!' },
  { title: '🚚 Area Pengiriman Ajibarang', answer: 'Kami melayani pengiriman langsung daerah Ajibarang, Banyumas, Purwokerto, dan sekitarnya menggunakan armada pendingin harian.' },
  { title: '🌿 Sertifikat Organik & Halal', answer: 'Seluruh peternakan kami menerapkan pakan non-kimia tanpa hormon sintetis dan telah memiliki sertifikasi Halal & Higienis.' },
  { title: '📲 Cara Pesan via WA', answer: 'Anda cukup memilih produk di katalog lalu tekan button "Pesan via WA". Tim kami akan langsung memproses pesanan Anda!' }
]

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
  messages.value.push({
    sender: 'user',
    text: topic.title,
    time: getTime()
  })
  
  setTimeout(() => {
    messages.value.push({
      sender: 'bot',
      text: topic.answer,
      time: getTime()
    })
    scrollToBottom()
  }, 400)
  
  scrollToBottom()
}

const sendMessage = () => {
  if (!inputQuery.value.trim()) return
  
  const text = inputQuery.value
  inputQuery.value = ''
  
  messages.value.push({
    sender: 'user',
    text: text,
    time: getTime()
  })
  scrollToBottom()

  setTimeout(() => {
    let botReply = 'Terima kasih atas pertanyaannya! Untuk informasi harga grosir dan pemesanan cepat, Anda bisa langsung menghubungi hotline WA kami di +62 812-3456-7890.'
    
    const lower = text.toLowerCase()
    if (lower.includes('harga') || lower.includes('telur')) {
      botReply = 'Harga Telur Ayam Kampung Premium Rp 32.000 / tray. Dipanen segar harian dari peternakan Ajibarang.'
    } else if (lower.includes('ayam') || lower.includes('daging')) {
      botReply = 'Ayam Organik Utuh Segar seharga Rp 48.000 / ekor. Diproses higienis dan bebas bahan sintetis.'
    } else if (lower.includes('nila') || lower.includes('ikan')) {
      botReply = 'Ikan Nila Segar Kolam Bersih Air Deras seharga Rp 35.000 / kg. Bebas bau lumpur!'
    } else if (lower.includes('lokasi') || lower.includes('alamat')) {
      botReply = 'Lokasi peternakan kami berada di Ajibarang, Kabupaten Banyumas, Jawa Tengah.'
    }

    messages.value.push({
      sender: 'bot',
      text: botReply,
      time: getTime()
    })
    scrollToBottom()
  }, 600)
}
</script>
