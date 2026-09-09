<template>
  <div class="flex flex-col gap-6">
    <!-- Header Summary Card -->
    <div class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-cc-orange text-[22px]">schema</span>
          <h2 class="text-lg font-bold text-[#1b1c1a] dark:text-white uppercase tracking-tight">
            Arsitektur Relasi Database (ERD) &amp; Skema Tabel
          </h2>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-telemetry-code text-[11px] font-bold">
            7 TABEL TERSTRUKTUR
          </span>
        </div>
        <p class="text-xs text-[#797067] dark:text-slate-400">
          Struktur data ternormalisasi (3NF) yang saat ini berjalan secara persisten di peramban via Reactive LocalStorage &amp; siap dihubungkan ke MySQL / PostgreSQL di Hostinger.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="activeSubView = 'supabase'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'supabase' 
              ? 'bg-emerald-600 text-white shadow-sm font-bold' 
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
          ]"
          type="button"
        >
          <span class="material-symbols-outlined text-[16px]">cloud_sync</span>
          <span>Koneksi Supabase (Online)</span>
          <span v-if="adminStore.isSupabaseConnected.value" class="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5"></span>
        </button>

        <button 
          @click="activeSubView = 'erd'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'erd' 
              ? 'bg-cc-orange text-white shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
          type="button"
        >
          <span class="material-symbols-outlined text-[16px]">account_tree</span>
          <span>Diagram ERD</span>
        </button>

        <button 
          @click="activeSubView = 'schema'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'schema' 
              ? 'bg-cc-orange text-white shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
          type="button"
        >
          <span class="material-symbols-outlined text-[16px]">table_chart</span>
          <span>Daftar Tabel (7)</span>
        </button>

        <button 
          @click="activeSubView = 'live'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'live' 
              ? 'bg-cc-orange text-white shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
          type="button"
        >
          <span class="material-symbols-outlined text-[16px]">database</span>
          <span>Data Live</span>
        </button>
      </div>
    </div>

    <!-- SUBVIEW 1: Interactive ERD Visual Diagram -->
    <div v-if="activeSubView === 'erd'" class="bg-white dark:bg-[#161b22] rounded-xl p-6 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-5 transition-colors">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 class="text-sm font-bold text-[#1b1c1a] dark:text-white uppercase font-telemetry-code">
            Peta Relasi Antar Tabel (Entity Relationship Map)
          </h3>
          <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
            Diagram keterhubungan relasi One-to-Many (1:N) antara kategori, produk, pesanan, metrik harian, dan analitik AI.
          </p>
        </div>
        <span class="font-telemetry-code text-xs text-cc-orange font-bold">
          DIAGRAM STATUS: TERVERIFIKASI
        </span>
      </div>

      <!-- Visual Node Diagram -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <!-- Node 1: CATEGORIES -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">folder</span>
              CATEGORIES (1)
            </span>
            <span class="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-telemetry-code px-2 py-0.5 rounded">Master</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">INT AUTO_INC</span></div>
            <div class="flex justify-between"><span>name</span><span class="text-slate-400">VARCHAR(100)</span></div>
            <div class="flex justify-between"><span>slug</span><span class="text-slate-400">VARCHAR(100) UNIQUE</span></div>
            <div class="flex justify-between"><span>icon</span><span class="text-slate-400">VARCHAR(50)</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            <span>Relasi 1:N ke PRODUCTS (category_id)</span>
          </div>
        </div>

        <!-- Node 2: PRODUCTS -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border-2 border-cc-orange dark:border-cc-orange/70 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-cc-orange flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">inventory_2</span>
              PRODUCTS (N)
            </span>
            <span class="text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-telemetry-code px-2 py-0.5 rounded font-bold">Tabel Inti</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-blue-500 font-semibold">◆ category_id (FK)</span><span class="text-slate-400">INT</span></div>
            <div class="flex justify-between"><span>name</span><span class="text-slate-400">VARCHAR(255)</span></div>
            <div class="flex justify-between"><span>price</span><span class="text-slate-400">DECIMAL(12,2)</span></div>
            <div class="flex justify-between"><span class="text-emerald-500 font-semibold">stock</span><span class="text-slate-400">INT (REAL-TIME)</span></div>
            <div class="flex justify-between"><span>max_stock</span><span class="text-slate-400">INT</span></div>
            <div class="flex justify-between"><span>sold_count</span><span class="text-slate-400">INT</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-cc-orange flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">sync_alt</span>
            <span>Relasi 1:N ke ORDER_ITEMS &amp; AI</span>
          </div>
        </div>

        <!-- Node 3: ORDER_ITEMS -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">receipt_long</span>
              ORDER_ITEMS (N)
            </span>
            <span class="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-telemetry-code px-2 py-0.5 rounded">Junction</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-emerald-500 font-semibold">◆ order_id (FK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-cc-orange font-semibold">◆ product_id (FK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span>qty</span><span class="text-slate-400">INT</span></div>
            <div class="flex justify-between"><span>unit_price</span><span class="text-slate-400">DECIMAL(12,2)</span></div>
            <div class="flex justify-between"><span>subtotal</span><span class="text-slate-400">DECIMAL(12,2)</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Menghubungkan ORDERS &amp; PRODUCTS</span>
          </div>
        </div>

        <!-- Node 4: ORDERS (WhatsApp) -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">chat</span>
              ORDERS (1)
            </span>
            <span class="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-telemetry-code px-2 py-0.5 rounded">Transaksi WA</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span>order_code</span><span class="text-slate-400">VARCHAR(50) UNIQUE</span></div>
            <div class="flex justify-between"><span>customer_name</span><span class="text-slate-400">VARCHAR(150)</span></div>
            <div class="flex justify-between"><span>total_amount</span><span class="text-slate-400">DECIMAL(12,2)</span></div>
            <div class="flex justify-between"><span>status</span><span class="text-slate-400">VARCHAR(50)</span></div>
            <div class="flex justify-between"><span>created_at</span><span class="text-slate-400">TIMESTAMP</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            <span>Relasi 1:N ke ORDER_ITEMS</span>
          </div>
        </div>

        <!-- Node 5: DAILY_CHART_METRICS -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">show_chart</span>
              DAILY_CHART_METRICS
            </span>
            <span class="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-telemetry-code px-2 py-0.5 rounded">Telemetri</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● date_key (PK)</span><span class="text-slate-400">DATE (YYYY-MM-DD)</span></div>
            <div class="flex justify-between"><span>day_label</span><span class="text-slate-400">VARCHAR(30)</span></div>
            <div class="flex justify-between"><span class="text-cc-orange font-semibold">actual_volume_kg</span><span class="text-slate-400">INT (REAL-TIME)</span></div>
            <div class="flex justify-between"><span>predicted_volume_kg</span><span class="text-slate-400">INT</span></div>
            <div class="flex justify-between"><span>peak_amount_kg</span><span class="text-slate-400">INT</span></div>
            <div class="flex justify-between"><span>peak_buyer</span><span class="text-slate-400">VARCHAR(150)</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">bolt</span>
            <span>Terupdate otomatis saat pesanan masuk</span>
          </div>
        </div>

        <!-- Node 6: AI_STRATEGIES -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">psychology</span>
              AI_STRATEGIES
            </span>
            <span class="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-telemetry-code px-2 py-0.5 rounded">Analitik 1M</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-cc-orange font-semibold">◆ target_product_id (FK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span>provider</span><span class="text-slate-400">gemini / openai</span></div>
            <div class="flex justify-between"><span>analysis_text</span><span class="text-slate-400">TEXT</span></div>
            <div class="flex justify-between"><span>accuracy_rate</span><span class="text-slate-400">VARCHAR(10)</span></div>
            <div class="flex justify-between"><span>tokens_used</span><span class="text-slate-400">INT</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>Menganalisis komoditas dengan serapan tertinggi</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SUBVIEW 2: Tabular Schema Definitions (7 Tables) -->
    <div v-else-if="activeSubView === 'schema'" class="flex flex-col gap-4">
      <div 
        v-for="table in tableSchemas" 
        :key="table.name"
        class="bg-white dark:bg-[#161b22] rounded-xl p-5 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-3 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-cc-orange text-[18px]">table</span>
            <h4 class="text-sm font-bold text-[#1b1c1a] dark:text-white font-telemetry-code">
              Tabel: {{ table.name }}
            </h4>
            <span class="text-xs text-[#797067] dark:text-slate-400">({{ table.description }})</span>
          </div>
          <span class="font-telemetry-code text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {{ table.columns.length }} Kolom
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 dark:bg-[#0d1117] text-slate-600 dark:text-slate-400 font-telemetry-code">
                <th class="px-3 py-2">Nama Kolom</th>
                <th class="px-3 py-2">Tipe Data</th>
                <th class="px-3 py-2">Atribut / Kunci</th>
                <th class="px-3 py-2">Keterangan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 font-telemetry-code">
              <tr v-for="col in table.columns" :key="col.name" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td class="px-3 py-2 font-bold text-slate-800 dark:text-slate-200">
                  <span v-if="col.key === 'PK'" class="text-cc-orange font-bold mr-1">●</span>
                  <span v-else-if="col.key === 'FK'" class="text-blue-500 font-bold mr-1">◆</span>
                  {{ col.name }}
                </td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-400">{{ col.type }}</td>
                <td class="px-3 py-2">
                  <span 
                    v-if="col.key" 
                    :class="[
                      'px-1.5 py-0.5 rounded text-[10px] font-bold',
                      col.key === 'PK' ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300' : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                    ]"
                  >
                    {{ col.key }}
                  </span>
                  <span v-else class="text-slate-400">-</span>
                </td>
                <td class="px-3 py-2 text-slate-700 dark:text-slate-300 font-sans text-xs">{{ col.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- SUBVIEW 0: Supabase Cloud Real-time Database Connector -->
    <div v-else-if="activeSubView === 'supabase'" class="flex flex-col gap-5">
      <!-- Status Card -->
      <div 
        :class="[
          'rounded-xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm',
          adminStore.isSupabaseConnected.value 
            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
            : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
        ]"
      >
        <div class="flex items-center gap-3.5">
          <div 
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs',
              adminStore.isSupabaseConnected.value ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
            ]"
          >
            <span class="material-symbols-outlined text-[26px]">
              {{ adminStore.isSupabaseConnected.value ? 'cloud_done' : 'cloud_off' }}
            </span>
          </div>
          <div class="flex flex-col">
            <span class="font-telemetry-code text-xs font-bold uppercase tracking-wide" :class="adminStore.isSupabaseConnected.value ? 'text-emerald-900 dark:text-emerald-200' : 'text-amber-900 dark:text-amber-200'">
              {{ adminStore.isSupabaseConnected.value ? '● SUPABASE CLOUD AKTIF & REAL-TIME (ONLINE 24/7)' : '○ MODE PENYIMPANAN SEMENTARA (LOKAL)' }}
            </span>
            <p class="text-xs mt-0.5" :class="adminStore.isSupabaseConnected.value ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'">
              {{ adminStore.isSupabaseConnected.value 
                ? 'Terhubung langsung ke PostgreSQL Cloud via WebSocket. Setiap transaksi WA atau mutasi stok terupdate instan di seluruh internet!' 
                : 'Belum terhubung ke Supabase Cloud. Masukkan Project URL dan Anon Key Supabase Anda di bawah untuk mengaktifkan database online.' }}
            </p>
          </div>
        </div>

        <button 
          v-if="adminStore.isSupabaseConnected.value"
          @click="handleDisconnect"
          class="h-9 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          type="button"
        >
          Putus Sambungan
        </button>
      </div>

      <!-- Main Config & SQL Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <!-- Left: Supabase Credentials Form (6 cols) -->
        <div class="lg:col-span-6 bg-white dark:bg-[#161b22] rounded-xl p-6 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-[#1b1c1a] dark:text-white uppercase font-telemetry-code flex items-center gap-2">
              <span class="material-symbols-outlined text-emerald-600 text-[18px]">key</span>
              Kredensial API Supabase Project
            </h3>
            <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
              Dapatkan dari menu: <strong>Project Settings > API</strong> di dashboard Supabase Anda.
            </p>
          </div>

          <form @submit.prevent="handleConnect" class="flex flex-col gap-4 text-xs">
            <!-- Project URL -->
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-700 dark:text-slate-300 uppercase font-telemetry-code text-[11px]">
                Project URL (HTTPS) <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="supabaseUrl"
                type="url"
                required
                placeholder="https://xyzabcdefghijklm.supabase.co"
                class="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white font-telemetry-code text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <!-- Anon Key -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <label class="font-bold text-slate-700 dark:text-slate-300 uppercase font-telemetry-code text-[11px]">
                  Anon Public Key <span class="text-red-500">*</span>
                </label>
                <button 
                  type="button" 
                  @click="showAnonKey = !showAnonKey"
                  class="text-[11px] text-emerald-600 hover:underline flex items-center gap-0.5"
                >
                  <span class="material-symbols-outlined text-[14px]">{{ showAnonKey ? 'visibility_off' : 'visibility' }}</span>
                  <span>{{ showAnonKey ? 'Sembunyikan' : 'Tampilkan' }}</span>
                </button>
              </div>
              <input 
                v-model="supabaseAnonKey"
                :type="showAnonKey ? 'text' : 'password'"
                required
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                class="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0d1117] text-slate-900 dark:text-white font-telemetry-code text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <!-- Connect Feedback -->
            <div v-if="connectStatus.message" :class="[
              'p-3 rounded-lg text-xs font-medium flex items-center gap-2 border',
              connectStatus.success ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-200' : 'bg-red-100 dark:bg-red-950/60 border-red-300 text-red-900 dark:text-red-200'
            ]">
              <span class="material-symbols-outlined text-[18px]">
                {{ connectStatus.success ? 'check_circle' : 'error' }}
              </span>
              <span>{{ connectStatus.message }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 pt-2">
              <button 
                type="submit"
                :disabled="isConnecting"
                class="flex-1 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span class="material-symbols-outlined text-[18px]" :class="{ 'animate-spin': isConnecting }">
                  {{ isConnecting ? 'sync' : 'link' }}
                </span>
                <span>{{ isConnecting ? 'Menguji Koneksi Cloud...' : 'Simpan & Sambungkan Supabase' }}</span>
              </button>
            </div>
          </form>

          <!-- 3-Minute Quick Setup Guide -->
          <div class="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
            <span class="font-bold text-[#1b1c1a] dark:text-white uppercase font-telemetry-code text-[11px]">
              Panduan 3 Langkah Cepat:
            </span>
            <ol class="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              <li>Buka <a href="https://supabase.com" target="_blank" class="text-emerald-600 underline font-semibold">supabase.com</a> dan buat proyek baru (100% gratis).</li>
              <li>Buka menu <strong>SQL Editor</strong> di Supabase, klik tombol <em>"Salin Skrip SQL"</em> di sebelah kanan, tempelkan, dan klik <strong>Run</strong>.</li>
              <li>Buka menu <strong>Project Settings > API</strong>, salin Project URL dan anon key, lalu masukkan di formulir ini.</li>
            </ol>
          </div>
        </div>

        <!-- Right: SQL Editor Script Box (6 cols) -->
        <div class="lg:col-span-6 bg-white dark:bg-[#161b22] rounded-xl p-6 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4 transition-colors">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-[#1b1c1a] dark:text-white uppercase font-telemetry-code flex items-center gap-1.5">
                <span class="material-symbols-outlined text-cc-orange text-[18px]">terminal</span>
                Skrip SQL Supabase (schema.sql)
              </h3>
              <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
                Tinggal copy dan jalankan di SQL Editor Supabase dalam 1 kali klik.
              </p>
            </div>

            <button 
              @click="copySqlScript"
              class="h-8 px-3 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              type="button"
            >
              <span class="material-symbols-outlined text-[16px]">{{ copiedSql ? 'check' : 'content_copy' }}</span>
              <span>{{ copiedSql ? 'Tersalin!' : 'Salin Skrip SQL' }}</span>
            </button>
          </div>

          <!-- Code Snippet Container -->
          <div class="bg-slate-950 text-slate-200 rounded-xl p-3.5 font-telemetry-code text-[11px] overflow-y-auto max-h-80 border border-slate-800">
            <pre class="whitespace-pre-wrap">{{ supabaseSqlSnippet }}</pre>
          </div>

          <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span class="text-slate-500 dark:text-slate-400">
              Otomatis membuat 7 tabel, RLS policies, &amp; Realtime Publication.
            </span>
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Buka Supabase Dashboard</span>
              <span class="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SUBVIEW 3: Live Persistent Data Explorer -->
    <div v-else-if="activeSubView === 'live'" class="bg-white dark:bg-[#161b22] rounded-xl p-6 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 class="text-sm font-bold text-[#1b1c1a] dark:text-white uppercase font-telemetry-code">
            Penjelajah Data Persisten (Live Local Storage Database)
          </h3>
          <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
            Melihat langsung isi record database yang tersimpan di browser klien secara real-time.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="exportJsonBackup"
            class="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-telemetry-code text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            type="button"
          >
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Backup JSON Database</span>
          </button>
        </div>
      </div>

      <!-- Live Data Selector -->
      <div class="flex items-center gap-2 text-xs select-none">
        <button 
          v-for="ds in ['products', 'orders', 'daily_chart']"
          :key="ds"
          @click="selectedLiveDataset = ds"
          :class="[
            'px-3 py-1.5 rounded-lg font-telemetry-code uppercase font-semibold transition-colors',
            selectedLiveDataset === ds 
              ? 'bg-[#1b1c1a] dark:bg-cc-orange text-white' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          ]"
        >
          {{ ds === 'products' ? `Products (${adminStore.products.value.length})` : ds === 'orders' ? `Orders (${adminStore.whatsappOrders.value.length})` : 'Daily Chart Map' }}
        </button>
      </div>

      <!-- JSON Viewer Box -->
      <div class="bg-slate-900 text-slate-100 rounded-xl p-4 font-telemetry-code text-xs overflow-x-auto max-h-96 border border-slate-700">
        <pre>{{ currentLiveJson }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/useAdminStore'
import { getStoredCredentials, saveCredentials, clearCredentials } from '../../services/supabaseClient'

const adminStore = useAdminStore()
const activeSubView = ref('erd')
const selectedLiveDataset = ref('products')

// State Konfigurasi Supabase
const creds = getStoredCredentials()
const supabaseUrl = ref(creds.url || '')
const supabaseAnonKey = ref(creds.key || '')
const showAnonKey = ref(false)
const isConnecting = ref(false)
const connectStatus = ref({ 
  success: adminStore.isSupabaseConnected.value, 
  message: adminStore.isSupabaseConnected.value ? 'Terhubung aktif ke Supabase Cloud!' : '' 
})
const copiedSql = ref(false)

const handleConnect = async () => {
  if (!supabaseUrl.value || !supabaseAnonKey.value) {
    connectStatus.value = { success: false, message: 'Harap masukkan Project URL dan Anon Key Supabase Anda.' }
    return
  }
  isConnecting.value = true
  connectStatus.value = { success: false, message: '' }
  try {
    saveCredentials(supabaseUrl.value, supabaseAnonKey.value)
    const res = await adminStore.syncWithSupabaseDatabase()
    if (res && res.success) {
      connectStatus.value = { 
        success: true, 
        message: 'Koneksi Berhasil! Database Supabase Cloud kini AKTIF & REAL-TIME 24/7!' 
      }
    } else {
      connectStatus.value = { 
        success: false, 
        message: res?.message || 'Gagal tersambung. Pastikan tabel di Supabase sudah dibuat menggunakan Skrip SQL di sebelah kanan.' 
      }
    }
  } catch (err) {
    connectStatus.value = { success: false, message: `Kesalahan koneksi: ${err.message}` }
  } finally {
    isConnecting.value = false
  }
}

const handleDisconnect = () => {
  clearCredentials()
  supabaseUrl.value = ''
  supabaseAnonKey.value = ''
  adminStore.isSupabaseConnected.value = false
  connectStatus.value = { success: false, message: 'Koneksi Supabase diputus. Sistem kembali ke mode lokal persisten.' }
}

const copySqlScript = async () => {
  try {
    await navigator.clipboard.writeText(supabaseSqlSnippet)
    copiedSql.value = true
    setTimeout(() => { copiedSql.value = false }, 2500)
  } catch (e) {
    console.error('Gagal menyalin skrip SQL:', e)
  }
}

const supabaseSqlSnippet = `-- ====================================================================
-- SUPABASE CLOUD POSTGRESQL SCHEMA: CV BANONG FARMS AJIBARANG
-- Real-Time Cloud Database & Webhook Replication
-- Jalankan skrip ini langsung di Supabase SQL Editor (supabase.com)
-- ====================================================================

-- 1. Bersihkan tabel lama jika ada
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS daily_chart_metrics CASCADE;
DROP TABLE IF EXISTS ai_strategies CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 2. TABEL: categories (Master Kategori Komoditas)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50) DEFAULT 'eco',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL: products (Master Katalog Komoditas & Stok Fisik)
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  sku VARCHAR(50) UNIQUE,
  name VARCHAR(255) NOT NULL,
  category_name VARCHAR(100) NOT NULL DEFAULT 'Hasil Tani',
  price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  max_stock INT NOT NULL DEFAULT 5000,
  unit VARCHAR(30) NOT NULL DEFAULT 'kg',
  sold_count INT NOT NULL DEFAULT 0,
  icon VARCHAR(50) DEFAULT 'eco',
  image_url VARCHAR(255) DEFAULT '/assets/product-fertilizer.png',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL: orders (Tiket Pesanan Masuk WhatsApp & Web)
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_code VARCHAR(50) NOT NULL UNIQUE,
  customer_name VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(30),
  customer_address TEXT,
  total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  status VARCHAR(50) NOT NULL DEFAULT 'Stok Terupdate Otomatis',
  source VARCHAR(50) NOT NULL DEFAULT 'WhatsApp B2B',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL: order_items (Rincian Komoditas per Pesanan)
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  qty INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0.00
);

-- 6. TABEL: daily_chart_metrics (Volume Harian Telemetri 7 Hari)
CREATE TABLE daily_chart_metrics (
  date_key DATE PRIMARY KEY,
  day_label VARCHAR(30) NOT NULL,
  actual_volume_kg INT NOT NULL DEFAULT 0,
  predicted_volume_kg INT NOT NULL DEFAULT 0,
  peak_amount_kg INT NOT NULL DEFAULT 0,
  peak_revenue DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  peak_buyer VARCHAR(150),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL: ai_strategies (Log Rekomendasi Pemasaran & Kuota 1M Token)
CREATE TABLE ai_strategies (
  id BIGSERIAL PRIMARY KEY,
  target_product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  provider VARCHAR(30) NOT NULL DEFAULT 'gemini',
  model_name VARCHAR(50) NOT NULL DEFAULT 'gemini-1.5-flash',
  analysis_text TEXT NOT NULL,
  accuracy_rate VARCHAR(10) DEFAULT '96,2%',
  risk_level VARCHAR(50) DEFAULT 'Rendah (0,12)',
  priority_action VARCHAR(100) DEFAULT 'Prioritas Utama B2B',
  tokens_used INT DEFAULT 0,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AKTIFKAN ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_chart_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_strategies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Akses Publik Baca Kategori" ON categories FOR SELECT USING (true);
CREATE POLICY "Akses Publik Baca Produk" ON products FOR SELECT USING (true);
CREATE POLICY "Akses Publik Tambah Produk" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update Produk" ON products FOR UPDATE USING (true);
CREATE POLICY "Akses Publik Hapus Produk" ON products FOR DELETE USING (true);

CREATE POLICY "Akses Publik Baca Pesanan" ON orders FOR SELECT USING (true);
CREATE POLICY "Akses Publik Buat Pesanan" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update Pesanan" ON orders FOR UPDATE USING (true);

CREATE POLICY "Akses Publik Baca Item" ON order_items FOR SELECT USING (true);
CREATE POLICY "Akses Publik Buat Item" ON order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Akses Publik Baca Metrik" ON daily_chart_metrics FOR SELECT USING (true);
CREATE POLICY "Akses Publik Simpan Metrik" ON daily_chart_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update Metrik" ON daily_chart_metrics FOR UPDATE USING (true);

CREATE POLICY "Akses Publik Baca AI" ON ai_strategies FOR SELECT USING (true);
CREATE POLICY "Akses Publik Simpan AI" ON ai_strategies FOR INSERT WITH CHECK (true);

-- AKTIFKAN SUPABASE REALTIME REPLICATION (WEBSOCKET LIVE SYNC)
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE daily_chart_metrics;

-- SEED DATA AWAL (MASTER KOMODITAS)
INSERT INTO categories (id, name, slug, icon, description) VALUES
(1, 'Peternakan Unggas', 'unggas', 'egg', 'Produk telur bio-organik & puyuh berstandar tinggi'),
(2, 'Perikanan Air Deras', 'ikan', 'set_meal', 'Budidaya ikan air tawar sistem sirkulasi air pegunungan'),
(3, 'Daging Segar', 'daging', 'nutrition', 'Daging ayam & bebek karkas segar higienis'),
(4, 'Sayur & Cabai', 'sayur', 'local_fire_department', 'Cabai rawit & hortikultura organik petik segar'),
(5, 'Buah-buahan', 'buah', 'eco', 'Buah naga merah & pepaya California manis alami'),
(6, 'Biji Kopi', 'kopi', 'coffee', 'Biji kopi Robusta lereng Slamet petik merah pilihan'),
(7, 'Produk Organik', 'organik', 'spa', 'Pupuk kasgot & olahan biokonversi ramah lingkungan')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, category_id, sku, name, category_name, price, stock, max_stock, unit, sold_count, icon, image_url, description) VALUES
(1, 1, 'BANONG-EGG-01', 'Telur Bebek Bio-Organik', 'Peternakan Unggas', 38000.00, 1250, 2500, 'tray', 480, 'egg', '/assets/product-eggs.png', 'Telur bebek organik dari peternakan sistem angon alami di Ajibarang. Kuning telur jingga cerah alami, kaya gizi dan bebas antibiotika sintetis.'),
(2, 2, 'BANONG-FISH-01', 'Ikan Lele Sangkuriang Segar', 'Perikanan Air Deras', 26000.00, 2400, 5000, 'kg', 820, 'set_meal', '/assets/product-fish.png', 'Lele Sangkuriang dibudidayakan di kolam air deras mengalir. Daging padat, gurih, dan tidak berbau lumpur.'),
(3, 3, 'BANONG-CHK-01', 'Ayam Organik Utuh Segar', 'Daging Segar', 48000.00, 850, 2000, 'ekor', 650, 'nutrition', '/assets/product-chicken.png', 'Ayam karkas organik utuh yang dibesarkan dengan pakan alami tanpa hormon pertumbuhan. Daging tebal, empuk, dan segar.'),
(4, 1, 'BANONG-EGG-02', 'Telur Ayam Omega-3 Gold', 'Peternakan Unggas', 42000.00, 3200, 6000, 'tray', 1450, 'egg', '/assets/product-eggs.png', 'Telur ayam ras dengan nutrisi Omega-3 tinggi dari pakan alami biji rami dan rumput laut.'),
(5, 3, 'BANONG-DCK-01', 'Daging Bebek Karkas Organik', 'Daging Segar', 62000.00, 420, 1200, 'ekor', 310, 'nutrition', '/assets/product-duck.png', 'Daging bebek potong segar harian dari peternakan Ajibarang. Gurih dan rendah kolesterol.'),
(6, 2, 'BANONG-FISH-02', 'Fillet Ikan Gurame Segar', 'Perikanan Air Deras', 48000.00, 650, 1500, 'kg', 420, 'set_meal', '/assets/product-gurame.png', 'Fillet ikan gurame segar tanpa duri dari kolam air deras Ajibarang. Higienis dan dikemas vakum.'),
(7, 7, 'BANONG-ORG-01', 'Pupuk Kasgot Super Organik', 'Produk Organik', 25000.00, 4800, 8000, 'karung 10kg', 1100, 'eco', '/assets/product-fertilizer.png', 'Pupuk organik hayati hasil biokonversi limbah maggot BSF. Memperbaiki struktur tanah dan menyuburkan tanaman.'),
(8, 4, 'BANONG-CHL-01', 'Cabai Rawit Merah Super', 'Sayur & Cabai', 30000.00, 6800, 16000, 'kg', 5120, 'local_fire_department', '/assets/product-chicken.png', 'Cabai rawit merah petik segar langsung dari kebun Ajibarang. Pedas pekat alami, bebas residu pestisida kimia.'),
(9, 5, 'BANONG-FRT-01', 'Buah Naga Merah Super', 'Buah-buahan', 22000.00, 14200, 18000, 'kg', 3850, 'eco', '/assets/product-fertilizer.png', 'Buah naga daging merah manis alami dipanen pada kematangan optimal di perkebunan terintegrasi Banyumas.'),
(10, 6, 'BANONG-COF-01', 'Kopi Robusta Java', 'Biji Kopi', 48000.00, 21500, 24000, 'kg', 2900, 'coffee', '/assets/product-fertilizer.png', 'Biji kopi Robusta petik merah dari lereng pegunungan Banyumas. Proses natural dengan aroma mantap khas rempah.')
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock, price = EXCLUDED.price;

INSERT INTO orders (id, order_code, customer_name, customer_phone, customer_address, total_amount, status, source) VALUES
(1, '#WA-8831', 'PT Sumber Segar Jaya (DKI Jakarta)', '081299881122', 'Kawasan Industri Pulo Gadung, Jakarta Timur', 4560000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(2, '#WA-8830', 'CV Agro Makmur Mandiri (Bandung)', '081388772233', 'Jl. Soekarno Hatta No. 45, Bandung', 36000000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(3, '#WA-8829', 'Koperasi Tani Berkah (Sukabumi)', '085611223344', 'Jl. Raya Cisaat, Sukabumi', 10000000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B'),
(4, '#WA-8828', 'Resto Boga Lestari (Surabaya)', '082144556677', 'Jl. Kertajaya Indah, Surabaya', 28800000.00, 'Stok Terupdate Otomatis', 'WhatsApp B2B')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence otomatis
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));`

const currentLiveJson = computed(() => {
  if (selectedLiveDataset.value === 'products') {
    return JSON.stringify(adminStore.products.value, null, 2)
  }
  if (selectedLiveDataset.value === 'orders') {
    return JSON.stringify(adminStore.whatsappOrders.value, null, 2)
  }
  return JSON.stringify(adminStore.dailyChartMap.value, null, 2)
})

const exportJsonBackup = () => {
  const fullBackup = {
    exportedAt: new Date().toISOString(),
    system: 'CV Banong Farms Command Database v2.5',
    storageKeys: {
      products: adminStore.products.value,
      orders: adminStore.whatsappOrders.value,
      dailyChartMap: adminStore.dailyChartMap.value
    }
  }

  const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `CV_Banong_Farms_Database_Backup_${Date.now()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const tableSchemas = [
  {
    name: 'categories',
    description: 'Master Klasifikasi Komoditas Agribisnis & Peternakan',
    columns: [
      { name: 'id', type: 'INT AUTO_INCREMENT', key: 'PK', desc: 'Identifikator unik kategori' },
      { name: 'name', type: 'VARCHAR(100)', key: '', desc: 'Nama kategori (Peternakan Unggas, Perikanan, dll)' },
      { name: 'slug', type: 'VARCHAR(100) UNIQUE', key: '', desc: 'Slug URL (unggas, ikan, daging, organik)' },
      { name: 'icon', type: 'VARCHAR(50)', key: '', desc: 'Kode ikon Material Symbols (egg, set_meal)' },
      { name: 'description', type: 'TEXT', key: '', desc: 'Deskripsi singkat standar kelompok produk' }
    ]
  },
  {
    name: 'products',
    description: 'Master Katalog Komoditas Panen Aktif & Inventaris Fisik',
    columns: [
      { name: 'id', type: 'BIGINT AUTO_INCREMENT', key: 'PK', desc: 'ID Produk Unik' },
      { name: 'category_id', type: 'INT', key: 'FK', desc: 'Relasi ke categories.id' },
      { name: 'sku', type: 'VARCHAR(50)', key: '', desc: 'Kode SKU/Barcode inventaris gudang' },
      { name: 'name', type: 'VARCHAR(255)', key: '', desc: 'Nama produk resmi komoditas' },
      { name: 'price', type: 'DECIMAL(12,2)', key: '', desc: 'Harga satuan aktif per kilogram / unit (Rp)' },
      { name: 'stock', type: 'INT', key: '', desc: 'Kapasitas stok fisik saat ini (otomatis berkurang saat order)' },
      { name: 'max_stock', type: 'INT', key: '', desc: 'Kapasitas maksimal tampung gudang/kolam' },
      { name: 'unit', type: 'VARCHAR(30)', key: '', desc: 'Satuan komoditas (kg, tray, ekor, karung)' },
      { name: 'sold_count', type: 'INT', key: '', desc: 'Akumulasi total kuantitas yang telah terjual' },
      { name: 'icon', type: 'VARCHAR(50)', key: '', desc: 'Ikon telemetri visual' },
      { name: 'image_url', type: 'VARCHAR(255)', key: '', desc: 'Alamat berkas gambar resolusi tinggi' },
      { name: 'description', type: 'TEXT', key: '', desc: 'Deskripsi varietas, mutu, dan sertifikasi' },
      { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Waktu produk ditambahkan ke sistem' },
      { name: 'updated_at', type: 'TIMESTAMP', key: '', desc: 'Waktu modifikasi terakhir data produk' }
    ]
  },
  {
    name: 'orders',
    description: 'Tiket Transaksi Masuk via Saluran WhatsApp & Web',
    columns: [
      { name: 'id', type: 'BIGINT AUTO_INCREMENT', key: 'PK', desc: 'ID Pesanan unik internal' },
      { name: 'order_code', type: 'VARCHAR(50) UNIQUE', key: '', desc: 'Kode referensi pesanan (contoh: #WA-8831)' },
      { name: 'customer_name', type: 'VARCHAR(150)', key: '', desc: 'Nama lengkap pelanggan / badan usaha mitra' },
      { name: 'customer_phone', type: 'VARCHAR(30)', key: '', desc: 'Nomor kontak WhatsApp aktif' },
      { name: 'customer_address', type: 'TEXT', key: '', desc: 'Kota & alamat lengkap tujuan pengiriman' },
      { name: 'total_amount', type: 'DECIMAL(12,2)', key: '', desc: 'Total pembayaran transaksi (Rp)' },
      { name: 'status', type: 'VARCHAR(50)', key: '', desc: 'Status pemenuhan (Stok Terupdate Otomatis, Selesai)' },
      { name: 'source', type: 'VARCHAR(50)', key: '', desc: 'Kanal masuk (WhatsApp B2B / Web Katalog)' },
      { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Waktu pesanan masuk ke antrean' }
    ]
  },
  {
    name: 'order_items',
    description: 'Detail Komoditas & Kuantitas per Tiket Pesanan',
    columns: [
      { name: 'id', type: 'BIGINT AUTO_INCREMENT', key: 'PK', desc: 'ID Rincian Pesanan' },
      { name: 'order_id', type: 'BIGINT', key: 'FK', desc: 'Relasi ke orders.id' },
      { name: 'product_id', type: 'BIGINT', key: 'FK', desc: 'Relasi ke products.id' },
      { name: 'qty', type: 'INT', key: '', desc: 'Volume pemesanan yang memotong stok fisik' },
      { name: 'unit_price', type: 'DECIMAL(12,2)', key: '', desc: 'Harga satuan saat transaksi disepakati' },
      { name: 'subtotal', type: 'DECIMAL(12,2)', key: '', desc: 'Subtotal harga (qty * unit_price)' }
    ]
  },
  {
    name: 'daily_chart_metrics',
    description: 'Catatan Volume Harian & Data Kurva Prediksi AI 7 Hari',
    columns: [
      { name: 'date_key', type: 'DATE (YYYY-MM-DD)', key: 'PK', desc: 'Tanggal kalender lokal harian' },
      { name: 'day_label', type: 'VARCHAR(30)', key: '', desc: 'Label nama hari (misal: Sel H-1, Rab Hari Ini)' },
      { name: 'actual_volume_kg', type: 'INT', key: '', desc: 'Volume serapan aktual harian (kg)' },
      { name: 'predicted_volume_kg', type: 'INT', key: '', desc: 'Hasil proyeksi komputasi algoritma prediktif' },
      { name: 'peak_amount_kg', type: 'INT', key: '', desc: 'Puncak pesanan terbesar per hari' },
      { name: 'peak_buyer', type: 'VARCHAR(150)', key: '', desc: 'Mitra yang melakukan pemesanan puncak' },
      { name: 'updated_at', type: 'TIMESTAMP', key: '', desc: 'Waktu pembaruan real-time terakhir' }
    ]
  },
  {
    name: 'ai_strategies',
    description: 'Hasil Rekomendasi Pemasaran & Log Kuota 1M Token AI',
    columns: [
      { name: 'id', type: 'BIGINT AUTO_INCREMENT', key: 'PK', desc: 'ID Analisis AI' },
      { name: 'target_product_id', type: 'BIGINT', key: 'FK', desc: 'Komoditas dengan permintaan tertinggi' },
      { name: 'provider', type: 'VARCHAR(30)', key: '', desc: 'Provider AI (gemini / openai)' },
      { name: 'model_name', type: 'VARCHAR(50)', key: '', desc: 'Model aktif (gemini-1.5-flash / gpt-4o-mini)' },
      { name: 'analysis_text', type: 'TEXT', key: '', desc: 'Rekomendasi taktis alokasi pasokan & batas harga' },
      { name: 'accuracy_rate', type: 'VARCHAR(10)', key: '', desc: 'Skor akurasi korelasi tren (misal: 96.2%)' },
      { name: 'risk_level', type: 'VARCHAR(50)', key: '', desc: 'Tingkat risiko penumpukan stok' },
      { name: 'tokens_used', type: 'INT', key: '', desc: 'Pemakaian token dari kuota 1M' },
      { name: 'generated_at', type: 'TIMESTAMP', key: '', desc: 'Waktu analitik dibuat' }
    ]
  },
  {
    name: 'admin_users',
    description: 'Manajemen Akun & Otoritas Operator Komando',
    columns: [
      { name: 'id', type: 'INT AUTO_INCREMENT', key: 'PK', desc: 'ID Operator' },
      { name: 'username', type: 'VARCHAR(50) UNIQUE', key: '', desc: 'Nama pengguna login admin' },
      { name: 'email', type: 'VARCHAR(100) UNIQUE', key: '', desc: 'Alamat surel resmi' },
      { name: 'password_hash', type: 'VARCHAR(255)', key: '', desc: 'Hash kata sandi (Bcrypt / Argon2)' },
      { name: 'full_name', type: 'VARCHAR(100)', key: '', desc: 'Nama lengkap direktur / operator' },
      { name: 'role', type: 'VARCHAR(30)', key: '', desc: 'Level hak akses (Super Admin, Operator Gudang)' },
      { name: 'operator_id', type: 'VARCHAR(30)', key: '', desc: 'Kode seri ID operator (contoh: OP-ID #8821)' },
      { name: 'last_login_at', type: 'TIMESTAMP', key: '', desc: 'Waktu akses terakhir ke sistem komando' }
    ]
  }
]
</script>
