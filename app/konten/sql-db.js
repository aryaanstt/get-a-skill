// Bikin database toko online Belanjain (data acak tapi tetap sama tiap dibuka, seed tetap).
window.BUAT_DB_SQL = () => {
  let s = 42
  const acak = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648
  const pilih = a => a[Math.floor(acak() * a.length)]
  const kota = ['Bandung', 'Jakarta', 'Surabaya', 'Medan', 'Yogyakarta', 'Makassar', 'Semarang', 'Denpasar']
  const depan = ['Ayu', 'Budi', 'Citra', 'Dimas', 'Eka', 'Fajar', 'Gita', 'Hana', 'Indra', 'Joko', 'Kirana', 'Lukman', 'Maya', 'Nanda', 'Oki', 'Putri', 'Raka', 'Sari', 'Tegar', 'Umi', 'Vina', 'Wahyu', 'Yudi', 'Zahra']
  const belakang = ['Pratama', 'Lestari', 'Saputra', 'Wulandari', 'Hidayat', 'Nasution', 'Siregar', 'Santoso', 'Rahman', 'Putri']
  const segmen = ['Reguler', 'Reguler', 'Reguler', 'Member', 'Member', 'VIP']
  const produk = [
    ['Kopi Arabika Gayo 250g', 'Makanan', 85000], ['Teh Melati Celup', 'Makanan', 18000], ['Keripik Singkong Pedas', 'Makanan', 15000], ['Madu Hutan 500ml', 'Makanan', 120000],
    ['Earphone Bluetooth', 'Elektronik', 249000], ['Powerbank 10000mAh', 'Elektronik', 189000], ['Smartwatch Basic', 'Elektronik', 650000], ['Lampu LED Pintar', 'Elektronik', 95000], ['Speaker Portabel', 'Elektronik', 420000],
    ['Kaos Polos Katun', 'Fashion', 65000], ['Kemeja Batik', 'Fashion', 215000], ['Sepatu Lari', 'Fashion', 540000], ['Topi Baseball', 'Fashion', 55000],
    ['Botol Minum 1L', 'Rumah', 70000], ['Payung Lipat', 'Rumah', 45000], ['Rak Buku Mini', 'Rumah', 310000], ['Sprei Katun Queen', 'Rumah', 275000],
    ['Buku Catatan A5', 'Alat Tulis', 22000], ['Pulpen Gel 12pcs', 'Alat Tulis', 36000], ['Tas Laptop 14"', 'Alat Tulis', 199000],
  ]
  const sql = ['CREATE TABLE pelanggan (id INTEGER PRIMARY KEY, nama TEXT, kota TEXT, segmen TEXT, tgl_daftar TEXT);',
    'CREATE TABLE produk (id INTEGER PRIMARY KEY, nama TEXT, kategori TEXT, harga INTEGER);',
    'CREATE TABLE pesanan (id INTEGER PRIMARY KEY, pelanggan_id INTEGER, tgl TEXT, status TEXT);',
    'CREATE TABLE item (pesanan_id INTEGER, produk_id INTEGER, qty INTEGER);']
  const q = t => "'" + String(t).replace(/'/g, "''") + "'"
  const tgl = (awal, rentang) => new Date(Date.parse(awal) + Math.floor(acak() * rentang) * 864e5).toISOString().slice(0, 10)
  const NP = 30
  for (let i = 1; i <= NP; i++) sql.push(`INSERT INTO pelanggan VALUES (${i}, ${q(pilih(depan) + ' ' + pilih(belakang))}, ${q(pilih(kota))}, ${q(pilih(segmen))}, ${q(tgl('2025-01-01', 600))});`)
  produk.forEach((p, i) => sql.push(`INSERT INTO produk VALUES (${i + 1}, ${q(p[0])}, ${q(p[1])}, ${p[2]});`))
  const status = ['selesai', 'selesai', 'selesai', 'selesai', 'selesai', 'selesai', 'dikirim', 'batal', 'retur']
  let item = 0
  for (let i = 1; i <= 80; i++) {
    const pel = 1 + Math.floor(acak() * (NP - 4)) // 4 pelanggan terakhir sengaja belum pernah pesan
    sql.push(`INSERT INTO pesanan VALUES (${i}, ${pel}, ${q(tgl('2026-01-01', 320))}, ${q(pilih(status))});`)
    const n = 1 + Math.floor(acak() * 3)
    const dipakai = new Set()
    for (let k = 0; k < n; k++) {
      const pr = 1 + Math.floor(acak() * produk.length)
      if (dipakai.has(pr)) continue
      dipakai.add(pr); item++
      sql.push(`INSERT INTO item VALUES (${i}, ${pr}, ${1 + Math.floor(acak() * 3)});`)
    }
  }
  return sql.join('\n')
}
