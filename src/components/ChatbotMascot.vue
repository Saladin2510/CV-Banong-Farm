<template>
  <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-auto select-none">
    
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
        class="mb-4 w-80 sm:w-96 bg-surface-pure rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col h-[480px]"
      >
        <!-- Header -->
        <div class="bg-primary text-on-primary p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-surface-pure p-0.5 overflow-hidden flex-shrink-0">
              <img src="/assets/mascot.png" alt="Mascot" class="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div class="font-bold text-sm text-secondary-container">Si Banong AI Assistant</div>
              <div class="text-xs text-primary-fixed flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-tertiary-fixed inline-block"></span> Online · Ajibarang
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
        <div class="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-subtle" ref="messagesContainer">
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
                'p-3 rounded-2xl text-xs leading-relaxed shadow-xs',
                msg.sender === 'user' 
                  ? 'bg-primary text-on-primary rounded-br-none' 
                  : 'bg-surface-pure text-on-surface border border-surface-container rounded-bl-none'
              ]"
            >
              {{ msg.text }}
            </div>
            <span class="text-[10px] text-on-surface-variant mt-1 px-1">
              {{ msg.time }}
            </span>
          </div>

          <!-- Quick Topic Pills -->
          <div v-if="messages.length <= 2" class="pt-2 flex flex-wrap gap-1.5">
            <button 
              v-for="(topic, idx) in quickTopics" 
              :key="idx"
              @click="sendQuickTopic(topic)"
              class="text-[11px] py-1 px-2.5 rounded-full bg-surface-pure border border-secondary-container/60 text-primary hover:bg-secondary-container/20 transition-colors font-medium text-left"
            >
              {{ topic.title }}
            </button>
          </div>
        </div>

        <!-- Chat Input Footer -->
        <div class="p-3 bg-surface-pure border-t border-surface-container flex items-center gap-2">
          <input 
            v-model="inputQuery"
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Tanyakan produk, stok, atau lokasi..." 
            class="flex-1 text-xs px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none focus:border-primary"
          />
          <button 
            @click="sendMessage"
            class="p-2 rounded-xl bg-secondary-container hover:bg-accent-hover text-on-secondary-container transition-all active:scale-95 shadow-sm"
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
      class="relative mb-2 mr-1 px-space-16 py-space-8 bg-surface-pure text-primary font-label-md text-label-md font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce border border-surface-container-high"
    >
      <span>Halo! Butuh bantuan pesanan?</span>
      <!-- Tooltip Tail -->
      <div class="absolute -bottom-1.5 right-6 w-3 h-3 bg-surface-pure transform rotate-45 border-r border-b border-surface-container-high"></div>
    </div>

    <!-- Floating Mascot Circle Button -->
    <div 
      @click="toggleChat"
      class="relative group cursor-pointer"
    >
      <div class="w-20 h-20 rounded-full bg-surface-pure p-1 shadow-2xl transition-transform duration-300 transform group-hover:scale-110 flex items-center justify-center overflow-hidden border-2 border-secondary-container animate-float">
        <img 
          alt="AI Farm Assistant Mascot CV Banong Farms" 
          class="w-full h-full object-cover rounded-full" 
          src="/assets/mascot.png" 
        />
      </div>

      <!-- Red Notification Badge Dot "1" -->
      <div 
        v-if="unreadCount > 0" 
        class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-alert-badge text-surface-pure flex items-center justify-center font-label-sm text-label-sm font-bold shadow-md ring-2 ring-surface-pure"
      >
        {{ unreadCount }}
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const isChatOpen = ref(false)
const unreadCount = ref(1)
const inputQuery = ref('')
const messagesContainer = ref(null)

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
