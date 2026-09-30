import csv

with open('KATALOG_PRODUK_CV_BANONG_FARMS.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f, delimiter=';')
    rows = list(reader)

html = """<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
  table { border-collapse: collapse; font-family: Calibri, sans-serif; font-size: 11pt; }
  th { background-color: #022448; color: #FFFFFF; font-weight: bold; border: 1px solid #CCCCCC; padding: 10px 14px; text-align: center; }
  td { border: 1px solid #E0E0E0; padding: 7px 12px; }
  .num { text-align: center; }
  .price { text-align: right; font-weight: bold; color: #022448; }
</style>
</head>
<body>
<h2>KATALOG RESMI PRODUK & HARGA - CV BANONG FARMS (AJIBARANG)</h2>
<p><b>Mitra Resmi:</b> PT. New Hope Indonesia (Cirebon) | <b>Alamat Toko:</b> Depan Pasar Hewan, Sebelah Barat Pangkalan Ojek Ajibarang | <b>WhatsApp:</b> 0899-9192-861</p>
<p><b>Jam Operasional:</b> Senin - Sabtu: 07.30 - 16.00 WIB (Minggu Libur) | <b>Layanan:</b> Grosir Sak & Eceran Kiloan | <b>Pengiriman:</b> Armada Toko Sendiri (Ajibarang, Cilongok, Pekuncen & Luar Daerah)</p>
<table border="1">
<thead>
<tr>
"""

for col in rows[0]:
    html += f"  <th>{col}</th>\n"
html += "</tr>\n</thead>\n<tbody>\n"

for r in rows[1:]:
    html += "<tr>\n"
    for idx, c in enumerate(r):
        if idx == 0:
            html += f'  <td class="num">{c}</td>\n'
        elif idx == 5:
            try:
                num = int(c)
                html += f'  <td class="price">Rp {num:,}</td>\n'
            except:
                html += f'  <td class="price">{c}</td>\n'
        else:
            html += f'  <td>{c}</td>\n'
    html += "</tr>\n"

html += "</tbody>\n</table>\n</body>\n</html>"

with open('KATALOG_PRODUK_CV_BANONG_FARMS.xls', 'w', encoding='utf-8') as f:
    f.write(html)

print("Katalog XLS sukses dibuat!")
