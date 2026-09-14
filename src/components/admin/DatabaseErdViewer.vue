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
          Struktur data relasional ternormalisasi (3NF) yang terhubung otomatis ke PostgreSQL Supabase Cloud 24/7 melalui file .env proyek.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="activeSubView = 'erd'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'erd' 
              ? 'bg-cc-orange text-white shadow-sm font-bold' 
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
              ? 'bg-cc-orange text-white shadow-sm font-bold' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
          type="button"
        >
          <span class="material-symbols-outlined text-[16px]">table_chart</span>
          <span>Daftar Tabel (7)</span>
        </button>

        <button 
          @click="activeSubView = 'sql'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'sql' 
              ? 'bg-cc-orange text-white shadow-sm font-bold' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
          type="button"
        >
          <span class="material-symbols-outlined text-[16px]">terminal</span>
          <span>Skrip SQL (schema.sql)</span>
        </button>

        <button 
          @click="activeSubView = 'live'"
          :class="[
            'h-9 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
            activeSubView === 'live' 
              ? 'bg-cc-orange text-white shadow-sm font-bold' 
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

    <!-- SUBVIEW: SQL Schema Script (schema.sql) -->
    <div v-else-if="activeSubView === 'sql'" class="bg-white dark:bg-[#161b22] rounded-xl p-6 border border-cc-outline dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 class="text-sm font-bold text-[#1b1c1a] dark:text-white uppercase font-telemetry-code flex items-center gap-2">
            <span class="material-symbols-outlined text-cc-orange text-[20px]">terminal</span>
            Skrip SQL Skema Basis Data (schema.sql)
          </h3>
          <p class="text-xs text-[#797067] dark:text-slate-400 mt-0.5">
            Skrip DDL PostgreSQL untuk Supabase Cloud (7 tabel terstruktur, relasi foreign key, indeks performa, &amp; kebijakan RLS publik/admin).
          </p>
        </div>

        <button 
          @click="copySqlScript"
          class="h-9 px-4 rounded-lg bg-cc-orange hover:bg-cc-orange-strong text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
          type="button"
        >
          <span class="material-symbols-outlined text-[18px]">{{ copiedSql ? 'check' : 'content_copy' }}</span>
          <span>{{ copiedSql ? 'Tersalin ke Clipboard!' : 'Salin Skrip SQL' }}</span>
        </button>
      </div>

      <!-- Code Snippet Container -->
      <div class="bg-slate-950 text-slate-200 rounded-xl p-4 font-telemetry-code text-xs overflow-y-auto max-h-[500px] border border-slate-800">
        <pre class="whitespace-pre-wrap leading-relaxed">{{ supabaseSqlSnippet }}</pre>
      </div>

      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span class="text-slate-500 dark:text-slate-400">
          Otomatis membuat 7 tabel, RLS policies, &amp; Realtime Publication. Tinggal tempel di SQL Editor Supabase jika ingin membuat ulang database.
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

const adminStore = useAdminStore()
const activeSubView = ref('erd')
const selectedLiveDataset = ref('products')
const copiedSql = ref(false)

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
-- Skema Basis Data Final (Bahasa Indonesia)
-- ====================================================================

-- 1. HAPUS TABEL LAMA (INGGRIS & INDONESIA)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ai_strategies CASCADE;
DROP TABLE IF EXISTS daily_chart_metrics CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

DROP TABLE IF EXISTS strategi_ai CASCADE;
DROP TABLE IF EXISTS detail_pesanan CASCADE;
DROP TABLE IF EXISTS pesanan CASCADE;
DROP TABLE IF EXISTS produk CASCADE;
DROP TABLE IF EXISTS kategori CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS metrik_harian CASCADE;

-- 2. TABEL: admin
CREATE TABLE admin (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(100) NOT NULL UNIQUE,
    nama_lengkap VARCHAR(150) NOT NULL,
    peran VARCHAR(50) NOT NULL DEFAULT 'Administrator'
);

-- 3. TABEL: kategori
CREATE TABLE kategori (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    ikon VARCHAR(50) DEFAULT 'eco'
);

-- 4. TABEL: produk
CREATE TABLE produk (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    id_kategori INT REFERENCES kategori(id) ON DELETE SET NULL,
    nama_produk VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    satuan VARCHAR(50) NOT NULL DEFAULT 'kg',
    harga DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    stok INT NOT NULL DEFAULT 0,
    stok_maksimal INT NOT NULL DEFAULT 5000,
    jumlah_terjual INT NOT NULL DEFAULT 0,
    url_gambar TEXT DEFAULT '/assets/product-fertilizer.png'
);

-- 5. TABEL: pesanan
CREATE TABLE pesanan (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    kode_pesanan VARCHAR(50) NOT NULL UNIQUE,
    nama_pelanggan VARCHAR(150) NOT NULL,
    no_whatsapp VARCHAR(20) NOT NULL,
    alamat_pelanggan TEXT,
    total_harga DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Konfirmasi',
    dibuat_pada TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL: detail_pesanan
CREATE TABLE detail_pesanan (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    id_pesanan BIGINT NOT NULL REFERENCES pesanan(id) ON DELETE CASCADE,
    id_produk BIGINT REFERENCES produk(id) ON DELETE SET NULL,
    jumlah_beli INT NOT NULL DEFAULT 1,
    harga_satuan DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0.00
);

-- 7. TABEL: metrik_harian
CREATE TABLE metrik_harian (
    tanggal DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    label_hari VARCHAR(30) NOT NULL,
    volume_aktual_kg INT NOT NULL DEFAULT 0,
    prediksi_volume_kg INT NOT NULL DEFAULT 0
);

-- 8. TABEL: strategi_ai
CREATE TABLE strategi_ai (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    id_produk_target BIGINT REFERENCES produk(id) ON DELETE SET NULL,
    teks_analisis TEXT NOT NULL,
    tingkat_akurasi VARCHAR(10) DEFAULT '95.5%'
);

-- RLS POLICIES
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategori ENABLE ROW LEVEL SECURITY;
ALTER TABLE produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE detail_pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrik_harian ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategi_ai ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik Boleh Lihat Kategori" ON kategori FOR SELECT USING (true);
CREATE POLICY "Admin Full Akses Kategori" ON kategori FOR ALL TO authenticated USING (true);
CREATE POLICY "Publik Boleh Lihat Produk" ON produk FOR SELECT USING (true);
CREATE POLICY "Admin Full Akses Produk" ON produk FOR ALL TO authenticated USING (true);
CREATE POLICY "Publik Boleh Checkout Pesanan" ON pesanan FOR INSERT WITH CHECK (true);
CREATE POLICY "Publik Boleh Lihat Pesanan" ON pesanan FOR SELECT USING (true);
CREATE POLICY "Admin Full Akses Pesanan" ON pesanan FOR ALL TO authenticated USING (true);
CREATE POLICY "Publik Boleh Tambah Detail Pesanan" ON detail_pesanan FOR INSERT WITH CHECK (true);
CREATE POLICY "Publik Boleh Lihat Detail Pesanan" ON detail_pesanan FOR SELECT USING (true);
CREATE POLICY "Admin Full Akses Detail Pesanan" ON detail_pesanan FOR ALL TO authenticated USING (true);
CREATE POLICY "Publik Boleh Lihat Metrik" ON metrik_harian FOR SELECT USING (true);
CREATE POLICY "Admin Full Akses Metrik" ON metrik_harian FOR ALL TO authenticated USING (true);
CREATE POLICY "Publik Boleh Lihat Strategi AI" ON strategi_ai FOR SELECT USING (true);
CREATE POLICY "Admin Full Akses Strategi AI" ON strategi_ai FOR ALL TO authenticated USING (true);
CREATE POLICY "Akses Profil Admin" ON admin FOR ALL TO authenticated USING (true);

-- REALTIME REPLICATION
ALTER PUBLICATION supabase_realtime ADD TABLE produk;
ALTER PUBLICATION supabase_realtime ADD TABLE pesanan;
ALTER PUBLICATION supabase_realtime ADD TABLE metrik_harian;

-- SEED DATA AWAL
INSERT INTO kategori (id, nama_kategori, slug, ikon) VALUES
(1, 'Pakan Unggas & Bebek', 'unggas', 'egg'),
(2, 'Pakan Ikan Air Tawar', 'ikan', 'set_meal'),
(3, 'Pakan Ternak Ruminansia', 'ruminansia', 'nutrition'),
(4, 'Pupuk & Olahan Organik', 'organik', 'eco')
ON CONFLICT (id) DO NOTHING;

INSERT INTO produk (id, id_kategori, nama_produk, deskripsi, satuan, harga, stok, stok_maksimal, jumlah_terjual, url_gambar) VALUES
(1, 1, 'Konsentrat Bebek Petelur Super', 'Pakan formulasi asam amino lengkap untuk mengoptimalkan produksi kuning telur jingga alami.', 'karung 50kg', 425000.00, 180, 500, 120, '/assets/product-eggs.png'),
(2, 2, 'Pelet Ikan Lele Apung LP-2', 'Pelet apung protein 32% cocok untuk pembesaran lele kolam air deras.', 'karung 30kg', 315000.00, 240, 600, 310, '/assets/product-fish.png'),
(3, 3, 'Silase Pakan Fermentasi Sapi & Kambing', 'Hijauan jagung manis terfermentasi bakteri asam laktat.', 'drum 100kg', 185000.00, 95, 300, 75, '/assets/product-chicken.png'),
(4, 4, 'Pupuk Organik Kasgot Biokonversi', 'Pupuk hayati kaya hara makro hasil biokonversi limbah organik larva maggot BSF.', 'karung 25kg', 65000.00, 500, 1000, 420, '/assets/product-fertilizer.png')
ON CONFLICT (id) DO NOTHING;

INSERT INTO metrik_harian (tanggal, label_hari, volume_aktual_kg, prediksi_volume_kg) VALUES
(CURRENT_DATE - INTERVAL '3 days', 'Senin', 1450, 1400),
(CURRENT_DATE - INTERVAL '2 days', 'Selasa', 1820, 1750),
(CURRENT_DATE - INTERVAL '1 days', 'Rabu', 2100, 2000),
(CURRENT_DATE, 'Kamis', 2450, 2300)
ON CONFLICT (tanggal) DO NOTHING;`

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
