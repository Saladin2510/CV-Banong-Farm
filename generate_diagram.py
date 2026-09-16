import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    background-color: #ffffff;
    padding: 30px;
    width: 960px;
    margin: 0 auto;
    color: #1e293b;
  }
  
  .diagram-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
    margin: 0 auto;
  }

  .layer-box {
    width: 100%;
    border: 1.8px solid #334155;
    border-radius: 6px;
    background-color: #ffffff;
    padding: 18px 22px 22px 22px;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .layer-title {
    text-align: center;
    font-size: 13.5px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: 0.6px;
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  .cards-row {
    display: flex;
    justify-content: space-between;
    gap: 18px;
  }

  .card {
    flex: 1;
    border: 1.5px solid #64748b;
    border-radius: 5px;
    background-color: #ffffff;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 8px;
  }

  .card-header h4 {
    font-size: 12.5px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.35;
  }

  .card ul {
    list-style: none;
    padding-left: 2px;
  }

  .card ul li {
    font-size: 11px;
    color: #334155;
    line-height: 1.65;
    display: flex;
    align-items: flex-start;
    gap: 7px;
  }

  .card ul li::before {
    content: "•";
    color: #2D5A27;
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
  }

  /* SVG Connectors */
  .connector-svg {
    width: 100%;
    height: 52px;
    display: block;
  }

  /* Database Card in Layer 3 */
  .db-card {
    width: 100%;
    border: 1.5px solid #475569;
    border-radius: 5px;
    background-color: #f8fafc;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    gap: 28px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .db-logos {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-right: 24px;
    border-right: 1.5px solid #cbd5e1;
  }

  .db-info {
    flex: 1;
  }

  .db-info h4 {
    font-size: 13.5px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .db-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 24px;
    font-size: 11px;
    color: #334155;
  }

  .db-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .db-item strong {
    color: #0f172a;
  }

  .logo-icon {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }
</style>
</head>
<body>

<div class="diagram-container">

  <!-- ==================== LAYER 1 ==================== -->
  <div class="layer-box">
    <div class="layer-title">1. TAMPILAN PENGGUNA (PRESENTATION LAYER)</div>
    <div class="cards-row">
      <!-- Card 1 -->
      <div class="card">
        <div class="card-header">
          <!-- Smartphone & Laptop SVG Icon -->
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="13" height="9" rx="1.5" stroke="#2563eb" stroke-width="1.8"/>
            <path d="M1 14H16" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round"/>
            <rect x="13" y="8" width="9" height="13" rx="2" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.8"/>
            <circle cx="17.5" cy="18" r="1" fill="#1d4ed8"/>
          </svg>
          <h4>Laptop &amp; Smartphone Pembeli / Peternak</h4>
        </div>
        <ul>
          <li>Akses Katalog Komoditas &amp; Keranjang Belanja</li>
          <li>Konsultasi Virtual Asisten AI ("Si Banong")</li>
          <li>Pemesanan Cepat WhatsApp Anti-Ghosting</li>
        </ul>
      </div>

      <!-- Card 2 -->
      <div class="card">
        <div class="card-header">
          <!-- Desktop Admin SVG Icon -->
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="13" rx="2" stroke="#059669" stroke-width="1.8"/>
            <path d="M8 20H16M12 16V20" stroke="#059669" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="7" cy="7" r="1" fill="#059669"/>
            <circle cx="10" cy="7" r="1" fill="#059669"/>
            <rect x="6" y="10" width="12" height="3" rx="1" fill="#ecfdf5"/>
          </svg>
          <h4>Tablet &amp; PC Pengelola Farm (Administrator)</h4>
        </div>
        <ul>
          <li>Dashboard Ringkasan Penjualan &amp; Arus Kas Riil</li>
          <li>Kelola Stok &amp; Katalog Produk Farm (CRUD)</li>
          <li>Verifikasi Tiket Pesanan &amp; Proyeksi AI (PSAJ)</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ==================== CONNECTOR 1 -> 2 (SVG Clean Align) ==================== -->
  <svg class="connector-svg" viewBox="0 0 900 52">
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#334155" />
      </marker>
    </defs>
    <!-- Arrow Left: Pembeli ke State -->
    <line x1="225" y1="0" x2="160" y2="44" stroke="#334155" stroke-width="1.5" marker-end="url(#arrowhead)" />
    <!-- Arrow Center: Pembeli & Admin ke WA Gateway -->
    <line x1="450" y1="0" x2="450" y2="44" stroke="#334155" stroke-width="1.5" marker-end="url(#arrowhead)" />
    <!-- Arrow Right: Admin ke AI Engine -->
    <line x1="675" y1="0" x2="740" y2="44" stroke="#334155" stroke-width="1.5" marker-end="url(#arrowhead)" />

    <!-- Badges -->
    <rect x="135" y="16" width="115" height="20" rx="3" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="192" y="30" font-size="9.5" font-weight="600" fill="#334155" text-anchor="middle">REST API / HTTPS</text>

    <rect x="395" y="16" width="110" height="20" rx="3" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="450" y="30" font-size="9.5" font-weight="600" fill="#334155" text-anchor="middle">Click-to-Chat API</text>

    <rect x="685" y="16" width="115" height="20" rx="3" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="742" y="30" font-size="9.5" font-weight="600" fill="#334155" text-anchor="middle">Analitik AI / HTTPS</text>
  </svg>

  <!-- ==================== LAYER 2 ==================== -->
  <div class="layer-box">
    <div class="layer-title">2. LOGIKA APLIKASI &amp; INTEGRASI (APPLICATION / LOGIC LAYER)</div>
    <div class="cards-row">
      <!-- Card 1: Vue 3 Store -->
      <div class="card">
        <div class="card-header">
          <!-- Official Vue.js Logo SVG -->
          <svg class="logo-icon" viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" fill="#41B883"/>
            <path d="M0 0l128 220.8L256 0h-51.2L128 132.48 49.92 0H0z" fill="#34495E"/>
            <path d="M49.92 0L128 132.48 204.8 0h-47.36L128 51.2 99.2 0H49.92z" fill="#41B883"/>
          </svg>
          <h4>Modul State &amp; Cache<br><span style="font-size:10px; color:#64748b; font-weight:500;">Vue 3 Store &amp; Sync Engine</span></h4>
        </div>
        <ul>
          <li>useCartStore &amp; useAdminStore</li>
          <li>Sinkronisasi Multi-Tab (BroadcastChannel)</li>
          <li>Penyimpanan Sesi (LocalStorage Cache)</li>
        </ul>
      </div>

      <!-- Card 2: WhatsApp Gateway -->
      <div class="card">
        <div class="card-header">
          <!-- Official WhatsApp Logo SVG -->
          <svg class="logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11.5" fill="#25D366"/>
            <path d="M17.5 14.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.7.2-.2.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.4 3.7 5.9 5.2 2.9 1.2 3.5 1 4.1.9.7-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.4-.3-.7-.5z" fill="#ffffff"/>
          </svg>
          <h4>WhatsApp Click-to-Chat<br><span style="font-size:10px; color:#64748b; font-weight:500;">Gerbang Pemesanan Resmi</span></h4>
        </div>
        <ul>
          <li>Validasi 2-Langkah Anti-Ghosting</li>
          <li>Generator Rekap Pesanan &amp; Kode Tiket</li>
          <li>Jalur Komunikasi Langsung CS Farm</li>
        </ul>
      </div>

      <!-- Card 3: Google Gemini AI -->
      <div class="card">
        <div class="card-header">
          <!-- Official Google Gemini Star SVG -->
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" fill="url(#geminiGradient)"/>
            <defs>
              <linearGradient id="geminiGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stop-color="#1A73E8"/>
                <stop offset="0.5" stop-color="#8E24AA"/>
                <stop offset="1" stop-color="#E91E63"/>
              </linearGradient>
            </defs>
          </svg>
          <h4>Mesin Google Gemini AI<br><span style="font-size:10px; color:#64748b; font-weight:500;">Dual-Engine AI Intelligence</span></h4>
        </div>
        <ul>
          <li>Konsultasi Agribisnis 24/7 (Si Banong)</li>
          <li>Prediksi Kebutuhan Stok Gudang Bulanan</li>
          <li>Smart Heuristic Fallback Tanpa Kuota</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ==================== CONNECTOR 2 -> 3 (SVG Clean Align) ==================== -->
  <svg class="connector-svg" viewBox="0 0 900 52">
    <!-- Arrow Left: State ke Database -->
    <line x1="160" y1="0" x2="220" y2="44" stroke="#334155" stroke-width="1.5" marker-end="url(#arrowhead)" />
    <!-- Arrow Center: WA ke Database -->
    <line x1="450" y1="0" x2="450" y2="44" stroke="#334155" stroke-width="1.5" marker-end="url(#arrowhead)" />
    <!-- Arrow Right: AI ke Database -->
    <line x1="740" y1="0" x2="680" y2="44" stroke="#334155" stroke-width="1.5" marker-end="url(#arrowhead)" />

    <!-- Badges -->
    <rect x="135" y="16" width="135" height="20" rx="3" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="202" y="30" font-size="9.5" font-weight="600" fill="#334155" text-anchor="middle">Query Data &amp; Realtime</text>

    <rect x="390" y="16" width="120" height="20" rx="3" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="450" y="30" font-size="9.5" font-weight="600" fill="#334155" text-anchor="middle">Catat Pesanan Baru</text>

    <rect x="660" y="16" width="125" height="20" rx="3" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="722" y="30" font-size="9.5" font-weight="600" fill="#334155" text-anchor="middle">Simpan Strategi AI</text>
  </svg>

  <!-- ==================== LAYER 3 ==================== -->
  <div class="layer-box">
    <div class="layer-title">3. PENYIMPANAN DATA (DATA LAYER)</div>
    <div class="db-card">
      <div class="db-logos">
        <!-- Official Supabase Bolt Logo -->
        <svg style="width:36px; height:36px;" viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M63.7 110.3c-3.1 4-9.7 1.8-9.7-3.3V67.8H8.8c-5.7 0-9-6.6-5.3-10.9L58.2 2.7c3.1-4 9.7-1.8 9.7 3.3v39.2h45.2c5.7 0 9 6.6 5.3 10.9L63.7 110.3z" fill="url(#supabaseGrad)"/>
          <defs>
            <linearGradient id="supabaseGrad" x1="56" y1="0" x2="56" y2="113" gradientUnits="userSpaceOnUse">
              <stop stop-color="#249361"/>
              <stop offset="1" stop-color="#3ECF8E"/>
            </linearGradient>
          </defs>
        </svg>
        <!-- Official PostgreSQL Elephant Logo -->
        <svg style="width:36px; height:36px;" viewBox="0 0 256 264" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <path d="M125.6 0C56.2 0 0 56.2 0 125.6c0 52 31.6 96.6 76.5 115.1v-36.9c-27.4-15.5-46-44.8-46-78.2 0-49.8 40.4-90.2 90.2-90.2 49.8 0 90.2 40.4 90.2 90.2 0 33.4-18.6 62.7-46 78.2v36.9c44.9-18.5 76.5-63.1 76.5-115.1C241.4 56.2 185.2 0 125.6 0z" fill="#336791"/>
          <circle cx="125.6" cy="125.6" r="62" fill="#336791"/>
        </svg>
      </div>

      <div class="db-info">
        <h4>Database Relasional PostgreSQL (Supabase Cloud BaaS)</h4>
        <div class="db-grid">
          <div class="db-item"><strong>Tabel Master:</strong> produk, kategori, admin</div>
          <div class="db-item"><strong>Fitur BaaS:</strong> PostgREST API &amp; Auth (JWT)</div>
          <div class="db-item"><strong>Tabel Transaksi:</strong> pesanan, detail_pesanan</div>
          <div class="db-item"><strong>Realtime WSS:</strong> WebSocket CDC Subscriptions</div>
          <div class="db-item"><strong>Tabel Telemetri:</strong> metrik_harian, strategi_ai</div>
          <div class="db-item"><strong>Keamanan:</strong> Row Level Security (RLS)</div>
        </div>
      </div>
    </div>
  </div>

</div>

</body>
</html>
"""

output_html = "public/assets/diagram_arsitektur_sistem.html"
output_png = "public/assets/gambar_2_7_arsitektur_sistem.png"

with open(output_html, "w", encoding="utf-8") as f:
    f.write(html_content)

print("HTML diagram updated at", output_html)

# Capture ultra-high resolution screenshot using Edge headless
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
abs_html = os.path.abspath(output_html)
abs_png = os.path.abspath(output_png)

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--window-size=1020,780",
    "--force-device-scale-factor=2",
    f"--screenshot={abs_png}",
    f"file:///{abs_html.replace(os.sep, '/')}"
]

res = subprocess.run(cmd, capture_output=True, text=True)
if os.path.exists(abs_png):
    print("Ultra-HD PNG regenerated successfully! Size:", os.path.getsize(abs_png), "bytes")
