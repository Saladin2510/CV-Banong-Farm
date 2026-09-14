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

      <!-- Visual Node Diagram (7 Tabel Supabase Cloud) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
        <!-- Node 1: kategori -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">folder</span>
              kategori (1)
            </span>
            <span class="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-telemetry-code px-2 py-0.5 rounded">Master</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">INTEGER</span></div>
            <div class="flex justify-between"><span>nama_kategori</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span>slug</span><span class="text-slate-400">VARCHAR UNIQUE</span></div>
            <div class="flex justify-between"><span>ikon</span><span class="text-slate-400">VARCHAR ('eco')</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            <span>Relasi 1:N ke produk (id_kategori)</span>
          </div>
        </div>

        <!-- Node 2: produk -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border-2 border-cc-orange dark:border-cc-orange/70 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-cc-orange flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">inventory_2</span>
              produk (N)
            </span>
            <span class="text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-telemetry-code px-2 py-0.5 rounded font-bold">Tabel Inti</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-blue-500 font-semibold">◆ id_kategori (FK)</span><span class="text-slate-400">INTEGER</span></div>
            <div class="flex justify-between"><span>nama_produk</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span>deskripsi</span><span class="text-slate-400">TEXT</span></div>
            <div class="flex justify-between"><span>satuan</span><span class="text-slate-400">VARCHAR ('kg')</span></div>
            <div class="flex justify-between"><span>harga</span><span class="text-slate-400">NUMERIC</span></div>
            <div class="flex justify-between"><span class="text-emerald-500 font-semibold">stok</span><span class="text-slate-400">INTEGER (REAL-TIME)</span></div>
            <div class="flex justify-between"><span>stok_maksimal</span><span class="text-slate-400">INTEGER (5000)</span></div>
            <div class="flex justify-between"><span>jumlah_terjual</span><span class="text-slate-400">INTEGER</span></div>
            <div class="flex justify-between"><span>url_gambar</span><span class="text-slate-400">TEXT</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-cc-orange flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">sync_alt</span>
            <span>Relasi ke detail_pesanan &amp; strategi_ai</span>
          </div>
        </div>

        <!-- Node 3: detail_pesanan -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">receipt_long</span>
              detail_pesanan (N)
            </span>
            <span class="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-telemetry-code px-2 py-0.5 rounded">Junction</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-emerald-500 font-semibold">◆ id_pesanan (FK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-cc-orange font-semibold">◆ id_produk (FK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span>jumlah_beli</span><span class="text-slate-400">INTEGER</span></div>
            <div class="flex justify-between"><span>harga_satuan</span><span class="text-slate-400">NUMERIC</span></div>
            <div class="flex justify-between"><span>subtotal</span><span class="text-slate-400">NUMERIC</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Menghubungkan pesanan &amp; produk</span>
          </div>
        </div>

        <!-- Node 4: pesanan -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">chat</span>
              pesanan (1)
            </span>
            <span class="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-telemetry-code px-2 py-0.5 rounded">Transaksi WA</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span>kode_pesanan</span><span class="text-slate-400">VARCHAR UNIQUE</span></div>
            <div class="flex justify-between"><span>nama_pelanggan</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span>no_whatsapp</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span>alamat_pelanggan</span><span class="text-slate-400">TEXT</span></div>
            <div class="flex justify-between"><span>total_harga</span><span class="text-slate-400">NUMERIC</span></div>
            <div class="flex justify-between"><span>status</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span>dibuat_pada</span><span class="text-slate-400">TIMESTAMPTZ</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            <span>Relasi 1:N ke detail_pesanan</span>
          </div>
        </div>

        <!-- Node 5: metrik_harian -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">show_chart</span>
              metrik_harian
            </span>
            <span class="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-telemetry-code px-2 py-0.5 rounded">Telemetri</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● tanggal (PK)</span><span class="text-slate-400">DATE</span></div>
            <div class="flex justify-between"><span>label_hari</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span class="text-cc-orange font-semibold">volume_aktual_kg</span><span class="text-slate-400">INTEGER</span></div>
            <div class="flex justify-between"><span>prediksi_volume_kg</span><span class="text-slate-400">INTEGER</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">bolt</span>
            <span>Snapshot kurva tren penjualan 7 hari</span>
          </div>
        </div>

        <!-- Node 6: strategi_ai -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">psychology</span>
              strategi_ai
            </span>
            <span class="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-telemetry-code px-2 py-0.5 rounded">Analitik AI</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span class="text-cc-orange font-semibold">◆ id_produk_target (FK)</span><span class="text-slate-400">BIGINT</span></div>
            <div class="flex justify-between"><span>teks_analisis</span><span class="text-slate-400">TEXT</span></div>
            <div class="flex justify-between"><span>tingkat_akurasi</span><span class="text-slate-400">VARCHAR ('95.5%')</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>Rekomendasi taktis komoditas dari AI</span>
          </div>
        </div>

        <!-- Node 7: admin -->
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700/80 flex flex-col gap-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <span class="font-bold font-telemetry-code text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              admin
            </span>
            <span class="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-telemetry-code px-2 py-0.5 rounded">Supabase Auth</span>
          </div>
          <div class="flex flex-col gap-1 text-[11px] font-telemetry-code text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-cc-orange font-bold">● id (PK)</span><span class="text-slate-400">UUID</span></div>
            <div class="flex justify-between"><span>email</span><span class="text-slate-400">VARCHAR UNIQUE</span></div>
            <div class="flex justify-between"><span>nama_lengkap</span><span class="text-slate-400">VARCHAR</span></div>
            <div class="flex justify-between"><span>peran</span><span class="text-slate-400">VARCHAR ('Administrator')</span></div>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">link</span>
            <span>Relasi 1:1 ke auth.users(id)</span>
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
                  <span v-if="col.key && col.key.includes('PK')" class="text-cc-orange font-bold mr-1">●</span>
                  <span v-else-if="col.key && col.key.includes('FK')" class="text-blue-500 font-bold mr-1">◆</span>
                  {{ col.name }}
                </td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-400">{{ col.type }}</td>
                <td class="px-3 py-2">
                  <span 
                    v-if="col.key && col.key !== '-'" 
                    :class="[
                      'px-1.5 py-0.5 rounded text-[10px] font-bold font-telemetry-code',
                      col.key.includes('PK') 
                        ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300' 
                        : col.key.includes('FK') 
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300' 
                          : col.key.includes('UNIQUE')
                            ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
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
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    ikon VARCHAR(50) DEFAULT 'eco'
);

-- 4. TABEL: produk
CREATE TABLE produk (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kategori INT REFERENCES kategori(id) ON DELETE SET NULL,
    nama_produk VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    satuan VARCHAR(50) NOT NULL DEFAULT 'kg',
    harga NUMERIC NOT NULL DEFAULT 0.00,
    stok INT NOT NULL DEFAULT 0,
    stok_maksimal INT NOT NULL DEFAULT 5000,
    jumlah_terjual INT NOT NULL DEFAULT 0,
    url_gambar TEXT DEFAULT '/assets/product-fertilizer.png'
);

-- 5. TABEL: pesanan
CREATE TABLE pesanan (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kode_pesanan VARCHAR(50) NOT NULL UNIQUE,
    nama_pelanggan VARCHAR(150) NOT NULL,
    no_whatsapp VARCHAR(20) NOT NULL,
    alamat_pelanggan TEXT,
    total_harga NUMERIC NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Konfirmasi',
    dibuat_pada TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL: detail_pesanan
CREATE TABLE detail_pesanan (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_pesanan BIGINT NOT NULL REFERENCES pesanan(id) ON DELETE CASCADE,
    id_produk BIGINT REFERENCES produk(id) ON DELETE SET NULL,
    jumlah_beli INT NOT NULL DEFAULT 1,
    harga_satuan NUMERIC NOT NULL DEFAULT 0.00,
    subtotal NUMERIC NOT NULL DEFAULT 0.00
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
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
    name: 'admin',
    description: 'Profil & Otoritas Akun Administrator (Relasi 1:1 ke auth.users Supabase Auth)',
    columns: [
      { name: 'id', type: 'UUID', key: 'PK, FK', desc: 'Identifikator UUID pengguna (Foreign Key ke auth.users.id)' },
      { name: 'email', type: 'VARCHAR', key: 'UNIQUE', desc: 'Alamat surel resmi administrator farm' },
      { name: 'nama_lengkap', type: 'VARCHAR', key: '-', desc: 'Nama lengkap administrator pengelola sistem' },
      { name: 'peran', type: 'VARCHAR', key: 'DEFAULT', desc: "Hak akses operasional (Default: 'Administrator')" }
    ]
  },
  {
    name: 'kategori',
    description: 'Master Klasifikasi Komoditas Agribisnis & Peternakan Farm',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK', desc: 'Identifikator unik kategori (GENERATED ALWAYS AS IDENTITY)' },
      { name: 'nama_kategori', type: 'VARCHAR', key: '-', desc: 'Nama kategori komoditas (Unggas, Perikanan, Daging, dll)' },
      { name: 'slug', type: 'VARCHAR', key: 'UNIQUE', desc: 'Slug URL unik untuk filter katalog publik' },
      { name: 'ikon', type: 'VARCHAR', key: 'DEFAULT', desc: "Kode ikon Material Symbols (Default: 'eco')" }
    ]
  },
  {
    name: 'produk',
    description: 'Master Katalog Komoditas Panen Aktif & Inventaris Fisik Farm',
    columns: [
      { name: 'id', type: 'BIGINT', key: 'PK', desc: 'Identifikator unik komoditas panen (GENERATED ALWAYS AS IDENTITY)' },
      { name: 'id_kategori', type: 'INTEGER', key: 'FK', desc: 'Relasi foreign key ke kategori.id' },
      { name: 'nama_produk', type: 'VARCHAR', key: '-', desc: 'Nama produk resmi hasil panen / olahan' },
      { name: 'deskripsi', type: 'TEXT', key: '-', desc: 'Deskripsi mutu, spesifikasi, dan manfaat komoditas' },
      { name: 'satuan', type: 'VARCHAR', key: 'DEFAULT', desc: "Satuan takaran komoditas (Default: 'kg' / pcs)" },
      { name: 'harga', type: 'NUMERIC', key: 'DEFAULT', desc: 'Harga satuan aktif komoditas dalam Rupiah (Default: 0.00)' },
      { name: 'stok', type: 'INTEGER', key: 'DEFAULT', desc: 'Kapasitas stok fisik saat ini (otomatis berkurang saat order)' },
      { name: 'stok_maksimal', type: 'INTEGER', key: 'DEFAULT', desc: 'Kapasitas maksimal tampung gudang/kolam (Default: 5000)' },
      { name: 'jumlah_terjual', type: 'INTEGER', key: 'DEFAULT', desc: 'Akumulasi total kuantitas produk yang telah terjual' },
      { name: 'url_gambar', type: 'TEXT', key: 'DEFAULT', desc: "Tautan gambar atau Base64 foto produk (Default: '/assets/product-fertilizer.png')" }
    ]
  },
  {
    name: 'pesanan',
    description: 'Tiket Transaksi Pemesanan Masuk via Saluran WhatsApp',
    columns: [
      { name: 'id', type: 'BIGINT', key: 'PK', desc: 'ID Pesanan unik transaksi (GENERATED ALWAYS AS IDENTITY)' },
      { name: 'kode_pesanan', type: 'VARCHAR', key: 'UNIQUE', desc: 'Kode referensi tiket pesanan (contoh: #BNG-8831)' },
      { name: 'nama_pelanggan', type: 'VARCHAR', key: '-', desc: 'Nama lengkap pelanggan pemesan komoditas' },
      { name: 'no_whatsapp', type: 'VARCHAR', key: '-', desc: 'Nomor kontak WhatsApp aktif pelanggan' },
      { name: 'alamat_pelanggan', type: 'TEXT', key: '-', desc: 'Alamat lengkap lokasi pengiriman komoditas' },
      { name: 'total_harga', type: 'NUMERIC', key: 'DEFAULT', desc: 'Total pembayaran transaksi pesanan (Rp)' },
      { name: 'status', type: 'VARCHAR', key: 'DEFAULT', desc: "Status pemenuhan (Default: 'Menunggu Konfirmasi')" },
      { name: 'dibuat_pada', type: 'TIMESTAMPTZ', key: 'DEFAULT', desc: 'Waktu pesanan masuk ke antrean database (Default: now())' }
    ]
  },
  {
    name: 'detail_pesanan',
    description: 'Rincian Komoditas & Kuantitas per Tiket Pesanan (Tabel Junction)',
    columns: [
      { name: 'id', type: 'BIGINT', key: 'PK', desc: 'ID Rincian item pesanan (GENERATED ALWAYS AS IDENTITY)' },
      { name: 'id_pesanan', type: 'BIGINT', key: 'FK', desc: 'Relasi foreign key ke pesanan.id' },
      { name: 'id_produk', type: 'BIGINT', key: 'FK', desc: 'Relasi foreign key ke produk.id' },
      { name: 'jumlah_beli', type: 'INTEGER', key: 'DEFAULT', desc: 'Volume kuantitas pesanan yang memotong stok fisik (Default: 1)' },
      { name: 'harga_satuan', type: 'NUMERIC', key: 'DEFAULT', desc: 'Harga satuan komoditas saat transaksi disepakati' },
      { name: 'subtotal', type: 'NUMERIC', key: 'DEFAULT', desc: 'Subtotal nilai item (jumlah_beli * harga_satuan)' }
    ]
  },
  {
    name: 'metrik_harian',
    description: 'Catatan Volume Harian & Data Kurva Prediksi Telemetri Penjualan Farm',
    columns: [
      { name: 'tanggal', type: 'DATE', key: 'PK', desc: 'Tanggal kalender telemetri harian (Default: CURRENT_DATE)' },
      { name: 'label_hari', type: 'VARCHAR', key: '-', desc: 'Label nama hari (misal: Senin, Selasa, Rabu)' },
      { name: 'volume_aktual_kg', type: 'INTEGER', key: 'DEFAULT', desc: 'Volume serapan panen aktual harian dalam satuan fisik' },
      { name: 'prediksi_volume_kg', type: 'INTEGER', key: 'DEFAULT', desc: 'Hasil proyeksi komputasi algoritma tren permintaan' }
    ]
  },
  {
    name: 'strategi_ai',
    description: 'Hasil Rekomendasi Taktis Pemasaran Komoditas Berbasis Kecerdasan Buatan',
    columns: [
      { name: 'id', type: 'BIGINT', key: 'PK', desc: 'ID Analisis rekomendasi AI (GENERATED ALWAYS AS IDENTITY)' },
      { name: 'id_produk_target', type: 'BIGINT', key: 'FK', desc: 'Komoditas target analisis (Relasi foreign key ke produk.id)' },
      { name: 'teks_analisis', type: 'TEXT', key: '-', desc: 'Rekomendasi taktis alokasi pasokan, batas harga, & promosi' },
      { name: 'tingkat_akurasi', type: 'VARCHAR', key: 'DEFAULT', desc: "Skor akurasi korelasi tren pasar (Default: '95.5%')" }
    ]
  }
]
</script>
