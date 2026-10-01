import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvPath = path.resolve(__dirname, '../KATALOG_PRODUK_CV_BANONG_FARMS.csv')
const csvContent = fs.readFileSync(csvPath, 'utf-8')
const lines = csvContent.split('\n').filter(l => l.trim().length > 0)

// Category mapping helper
function mapCategoryInfo(csvCat, name) {
  const catLower = csvCat.toLowerCase().trim()
  const nameLower = name.toLowerCase()

  if (catLower.includes('bibit')) {
    return {
      id_kategori: 2,
      categoryName: 'Bibit Unggul',
      categorySlug: 'bibit',
      icon: 'flutter_dash',
      image: '/assets/store/toko_depan.jpeg',
      defaultStock: nameLower.includes('doq') ? 1200 : (nameLower.includes('box') || nameLower.includes('doc') || nameLower.includes('dod') ? 35 : 50),
      defaultSold: 45
    }
  }

  if (catLower.includes('obat')) {
    const isVaksin = nameLower.includes('vaksin') || nameLower.includes('medivac')
    return {
      id_kategori: 3,
      categoryName: 'Obat, Vitamin & Vaksin',
      categorySlug: 'obat',
      icon: isVaksin ? 'vaccines' : 'medication',
      image: isVaksin ? '/assets/store/vaksin_obat-obatan_produk.jpeg' : '/assets/store/obat-obatan_ternak.jpeg',
      defaultStock: isVaksin ? 45 : 75,
      defaultSold: 32
    }
  }

  if (catLower.includes('ikan')) {
    const isKarung = nameLower.includes('781-2') && !nameLower.includes('eceran')
    return {
      id_kategori: 4,
      categoryName: 'Pakan Ikan & Pet Food',
      categorySlug: 'ikan_pet',
      icon: 'phishing',
      image: isKarung ? '/assets/store/karung_1.jpeg' : '/assets/store/pakan_hewan_ikan.jpeg',
      defaultStock: isKarung ? 80 : 65,
      defaultSold: 28
    }
  }

  if (catLower.includes('pet food')) {
    return {
      id_kategori: 4,
      categoryName: 'Pakan Ikan & Pet Food',
      categorySlug: 'ikan_pet',
      icon: 'pets',
      image: '/assets/store/pakan_hewan_kucing.jpeg',
      defaultStock: nameLower.includes('karung') || nameLower.includes('sak') ? 40 : 85,
      defaultSold: 52
    }
  }

  if (catLower.includes('burung')) {
    return {
      id_kategori: 4,
      categoryName: 'Pakan Ikan & Pet Food',
      categorySlug: 'ikan_pet',
      icon: 'flutter_dash',
      image: '/assets/store/pakan_hewan_burung.jpeg',
      defaultStock: 90,
      defaultSold: 64
    }
  }

  if (catLower.includes('alat')) {
    return {
      id_kategori: 5,
      categoryName: 'Alat & Perlengkapan Kandang',
      categorySlug: 'alat',
      icon: 'fence',
      image: '/assets/store/sangkar_burung.jpeg',
      defaultStock: 30,
      defaultSold: 18
    }
  }

  // Pakan Ternak (Default)
  let img = '/assets/store/karung_1.jpeg'
  if (nameLower.includes('hp100') || nameLower.includes('hl83') || nameLower.includes('ksk-36s')) {
    img = '/assets/store/banner.jpeg'
  } else if (nameLower.includes('malindo') || nameLower.includes('babi') || nameLower.includes('kelinci')) {
    img = '/assets/store/karung_2.jpeg'
  } else if (nameLower.includes('eceran') || nameLower.includes('kiloan')) {
    img = '/assets/store/toko_depan.jpeg'
  }

  return {
    id_kategori: 1,
    categoryName: 'Pakan Ternak & Unggas',
    categorySlug: 'pakan',
    icon: 'agriculture',
    image: img,
    defaultStock: nameLower.includes('eceran') ? 250 : 120,
    defaultSold: 68
  }
}

const products = []

for (let i = 1; i < lines.length; i++) {
  const row = lines[i].split(';')
  if (row.length < 8) continue

  const id = Number(row[0].trim())
  const csvCat = row[1].trim()
  const name = row[2].trim()
  const brand = row[3].trim()
  const unit = row[4].trim()
  const price = Number(row[5].trim()) || 0
  const saleType = row[6].trim()
  const descRaw = row[7].trim()
  const target = row[8] ? row[8].trim() : ''
  const evidence = row[9] ? row[9].trim() : ''

  const catInfo = mapCategoryInfo(csvCat, name)
  const fullDesc = `${descRaw} Diformulasikan khusus untuk ${target} (${brand}). Tersedia dalam bentuk ${saleType}. Bukti toko: ${evidence}.`

  products.push({
    id,
    id_kategori: catInfo.id_kategori,
    name,
    title: name,
    brand,
    category: catInfo.categoryName,
    categoryId: catInfo.categorySlug,
    category_name: catInfo.categoryName,
    nama_produk: name,
    deskripsi: fullDesc,
    description: fullDesc,
    satuan: unit,
    unit: unit,
    harga: price,
    price: price,
    saleType,
    target,
    stok: catInfo.defaultStock,
    stock: catInfo.defaultStock,
    stok_maksimal: 5000,
    maxStock: 5000,
    jumlah_terjual: catInfo.defaultSold,
    soldCount: catInfo.defaultSold,
    ikon: catInfo.icon,
    icon: catInfo.icon,
    url_gambar: catInfo.image,
    image: catInfo.image,
    image_url: catInfo.image
  })
}

console.log(`Parsed ${products.length} products successfully.`)

// 1. Write to src/data/katalogBanong.js
const outDataPath = path.resolve(__dirname, '../src/data/katalogBanong.js')
fs.mkdirSync(path.dirname(outDataPath), { recursive: true })
const outContent = `// Katalog Resmi 74 Produk CV Banong Farms (Otentik dari Data Toko & Jurnal Transaksi)
export const KATALOG_BANONG_74 = ${JSON.stringify(products, null, 2)}

export default KATALOG_BANONG_74
`
fs.writeFileSync(outDataPath, outContent, 'utf-8')
console.log(`Saved src/data/katalogBanong.js with ${products.length} items.`)

// 2. Seed to Supabase
const url = 'https://kfdeqagkbqfhbxfcppfw.supabase.co/rest/v1'
const headers = {
  apikey: 'sb_publishable_e95mW-tY2gqZuBR48KKsuw_LvbFWtLE',
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates,return=representation'
}

async function seedSupabase() {
  console.log('Seeding all 74 products to Supabase...')
  const dbPayload = products.map(p => ({
    id: p.id,
    id_kategori: p.id_kategori,
    nama_produk: p.nama_produk,
    deskripsi: p.deskripsi,
    satuan: p.satuan,
    harga: p.harga,
    stok: p.stok,
    stok_maksimal: p.stok_maksimal,
    jumlah_terjual: p.jumlah_terjual,
    url_gambar: p.url_gambar
  }))

  // Send in batches of 20
  const BATCH_SIZE = 20
  for (let i = 0; i < dbPayload.length; i += BATCH_SIZE) {
    const batch = dbPayload.slice(i, i + BATCH_SIZE)
    const res = await fetch(`${url}/produk`, {
      method: 'POST',
      headers,
      body: JSON.stringify(batch)
    })
    if (!res.ok) {
      const errText = await res.text()
      console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, errText)
    } else {
      console.log(`Batch ${i / BATCH_SIZE + 1} (${batch.length} items) upserted successfully.`)
    }
  }

  // Verify
  const verifyRes = await fetch(`${url}/produk?select=id,nama_produk,id_kategori,harga,stok`, {
    headers: { apikey: headers.apikey }
  })
  const verifyData = await verifyRes.json()
  console.log(`Verification: Supabase now has ${verifyData.length} products in 'produk' table.`)
}

seedSupabase().catch(console.error)
