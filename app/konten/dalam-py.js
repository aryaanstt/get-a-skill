// Soal Python yang dijalanin beneran (Pyodide di browser). Kode jawaban dijalanin bareng kunci,
// terus keluaran print dan/atau isi variabel dibandingin. Semua kunci udah dites jalan pakai Python 3.12 + pandas.
;(() => {
  const { H, perdalam } = window.GAS_DALAM
  const { PYS } = H
  const P = ['pandas']
  const JUAL = `import pandas as pd
df = pd.DataFrame({
    "tanggal": ["2026-11-01", "2026-11-01", "2026-11-02", "2026-11-02", "2026-11-03", "2026-11-03", "2026-11-04"],
    "kota": ["Bandung", "Jakarta", "Bandung", "Surabaya", "Jakarta", "Bandung", "Jakarta"],
    "produk": ["Kopi", "Teh", "Teh", "Kopi", "Kopi", "Kopi", "Teh"],
    "qty": [12, 5, 8, 3, 6, 4, 9],
    "harga": [85000, 18000, 18000, 85000, 85000, 85000, 18000],
})`
  const KOTOR = `import pandas as pd
import numpy as np
df = pd.DataFrame({
    "kota": [" jakarta", "BANDUNG ", "Bandung", "surabaya", "Bandung"],
    "harga": ["85.000", "18.000", None, "120.000", "18.000"],
    "qty": [2, 5, 3, np.nan, 5],
})`

  perdalam('PY', 'logika', {
    setelahContoh: [PYS('Lengkapin kode biar <code>total</code> = harga × qty, terus tampilin.', 'harga = 85000\nqty = 3\ntotal = harga * qty\nprint(total)', { kerangka: 'harga = 85000\nqty = 3\ntotal = ___\nprint(total)', bimbing: true, cek: ['total'], petunjuk: 'Ganti ___ pakai rumus kali. Tanda kali di Python itu *.', jelas: '<code>harga * qty</code> = 85000 × 3 = 255000. print nampilin isinya.', umum: ['Pakai x buat kali: <code>harga x qty</code> = SyntaxError.'] })],
    sebelumRangkum: [
      PYS('Lanjut dari total 255000. Hitung diskon 10%, simpan sisa yang harus dibayar di <code>bayar</code>, terus tampilin persis <code>Bayar: 229500.0</code> pakai f-string.', 'total = 255000\nbayar = total - total * 0.1\nprint(f"Bayar: {bayar}")', { kerangka: 'total = 255000\n', cek: ['bayar'], jelas: 'total × 0,1 = 25500, jadi bayar = 229500.0. Jadi float (.0) karena ada 0.1 di hitungannya. f-string: huruf f sebelum kutip, variabel di dalam {}.', umum: ['Lupa huruf f: yang kecetak tulisan {bayar} apa adanya.', '<code>print("Bayar: " + bayar)</code>: TypeError, teks ga bisa ditambah angka.'] }),
      PYS('Suhu Bandung siang ini 30 °C. Ubah ke Fahrenheit (°F = °C × 9/5 + 32), simpan di <code>f</code>, terus print <code>f</code>.', 'c = 30\nf = c * 9 / 5 + 32\nprint(f)', { cek: ['f'], jelas: '30 × 9 / 5 + 32 = 54 + 32 = 86.0. Pembagian / selalu ngasih float.', umum: ['<code>c * 9 / 5 + 32</code> tanpa disimpen ke f: soal minta variabel f.'] }),
    ],
  })
  perdalam('PY', 'list', {
    setelahContoh: [PYS('Lengkapin loop biar <code>total</code> berisi jumlah semua harga.', 'harga = [85000, 18000, 15000, 120000]\ntotal = 0\nfor h in harga:\n    total = total + h\nprint(total)', { kerangka: 'harga = [85000, 18000, 15000, 120000]\ntotal = 0\nfor h in harga:\n    total = ___\nprint(total)', bimbing: true, cek: ['total'], petunjuk: 'Tiap putaran, total lama ditambah harga yang lagi diambil (h).', jelas: 'Putaran 1: 0 + 85000, putaran 2: + 18000, dst. Hasil 238000. Bisa juga <code>sum(harga)</code>.' })],
    sebelumRangkum: [
      PYS('List <code>harga</code> udah disiapin. Hitung ada <b>berapa harga di atas 50000</b>, simpan di <code>jumlah</code>, terus print.', 'jumlah = 0\nfor h in harga:\n    if h > 50000:\n        jumlah = jumlah + 1\nprint(jumlah)', { setup: 'harga = [85000, 18000, 15000, 120000, 70000, 45000]', bukaSetup: true, cek: ['jumlah'], jelas: 'Yang di atas 50000: 85000, 120000, 70000 → 3. Pola "hitung yang memenuhi syarat": mulai 0, tambah 1 tiap lolos if.', umum: ['<code>jumlah = jumlah + h</code>: itu njumlahin harganya, bukan ngitung banyaknya.', 'if ga menjorok di dalam for, atau isi if ga menjorok lagi.'] }),
      PYS('Bikin list baru <code>diskon</code> berisi tiap harga dikali 0.9 (diskon 10%), urutannya sama.', 'diskon = []\nfor h in harga:\n    diskon.append(h * 0.9)\nprint(diskon)', { setup: 'harga = [85000, 18000, 15000, 120000]', bukaSetup: true, cek: ['diskon'], keluaran: false, jelas: 'Bisa pakai loop + append, atau singkat: <code>diskon = [h * 0.9 for h in harga]</code> (list comprehension).', umum: ['<code>harga * 0.9</code>: list ga bisa dikali desimal. Harus per isi.'] }),
    ],
  })
  perdalam('PY', 'fungsi', {
    setelahContoh: [PYS('Lengkapin fungsi <code>label</code>: "Grosir" kalau qty minimal 10, selain itu "Eceran".', 'def label(qty):\n    if qty >= 10:\n        return "Grosir"\n    return "Eceran"\n\nprint(label(12), label(5), label(10))', { kerangka: 'def label(qty):\n    if qty >= ___:\n        return ___\n    return "Eceran"\n\nprint(label(12), label(5), label(10))', bimbing: true, petunjuk: 'Minimal 10 = >= 10. Teks pakai kutip.', jelas: 'Keluaran: Grosir Eceran Grosir. Perhatiin label(10) juga Grosir karena >=.' })],
    sebelumRangkum: [
      PYS('Dictionary <code>stok</code> udah ada. Print nama produk yang stoknya <b>0</b> (satu per baris).', 'for nama, jml in stok.items():\n    if jml == 0:\n        print(nama)', { setup: 'stok = {"kopi": 12, "teh": 0, "madu": 5, "keripik": 0}', bukaSetup: true, jelas: '<code>.items()</code> ngasih pasangan kunci-nilai. Yang 0: teh dan keripik.', umum: ['<code>if jml = 0</code>: pakai == buat ngebandingin.', 'Loop langsung <code>for x in stok</code> cuma dapet kuncinya, nilainya harus diambil pakai <code>stok[x]</code>.'] }),
      PYS('Bikin fungsi <code>ppn(harga, tarif=0.11)</code> yang ngembaliin harga setelah PPN. Simpan <code>ppn(100000)</code> di <code>hasil</code>.', 'def ppn(harga, tarif=0.11):\n    return harga * (1 + tarif)\n\nhasil = ppn(100000)', { cek: ['hasil'], keluaran: false, jelas: 'return ngembaliin nilai, jadi bisa disimpen ke variabel. 100000 × 1,11 = 111000.', umum: ['Pakai print di dalam fungsi, bukan return: hasil jadi None.'] }),
    ],
  })
  perdalam('PY', 'pandas', {
    setelahContoh: [PYS('DataFrame <code>df</code> penjualan udah dimuat. Lengkapin biar <code>total</code> = jumlah semua qty.', 'total = df["qty"].sum()\nprint(total)', { kerangka: 'total = df["___"].sum()\nprint(total)', bimbing: true, setup: JUAL, paket: P, cek: ['total'], petunjuk: 'Isi nama kolomnya, persis huruf kecil.', jelas: '12 + 5 + 8 + 3 + 6 + 4 + 9 = 47.' })],
    sebelumRangkum: [
      PYS('Hitung <b>jumlah transaksi per kota</b> pakai <code>value_counts()</code>, simpan di <code>per_kota</code>, terus print.', 'per_kota = df["kota"].value_counts()\nprint(per_kota)', { setup: JUAL, paket: P, cek: ['per_kota'], jelas: 'Bandung 3, Jakarta 3, Surabaya 1. value_counts langsung ngurutin dari yang paling banyak.' }),
      PYS('Hitung <b>rata-rata harga</b> semua transaksi, simpan di <code>rata</code>.', 'rata = df["harga"].mean()', { setup: JUAL, paket: P, cek: ['rata'], keluaran: false, jelas: '.mean() = rata-rata kolom. Hasilnya sekitar 56285,71.', umum: ['<code>df.mean("harga")</code>: argumen mean bukan nama kolom. Pilih kolomnya dulu pakai df["harga"].'] }),
    ],
  })
  perdalam('PY', 'filter', {
    setelahContoh: [PYS('Lengkapin filter biar <code>bdg</code> isinya cuma transaksi Bandung.', 'bdg = df[df["kota"] == "Bandung"]\nprint(bdg)', { kerangka: 'bdg = df[df["kota"] == ___]\nprint(bdg)', bimbing: true, setup: JUAL, paket: P, cek: ['bdg'], petunjuk: 'Teks pakai kutip, huruf B kapital.', jelas: 'Hasilnya 3 baris (indeks 0, 2, 5). Indeks aslinya dipertahankan.' })],
    sebelumRangkum: [
      PYS('Ambil transaksi produk <b>Kopi</b> yang qty-nya <b>lebih dari 5</b>, simpan di <code>hasil</code>.', 'hasil = df[(df["produk"] == "Kopi") & (df["qty"] > 5)]', { setup: JUAL, paket: P, cek: ['hasil'], keluaran: false, jelas: 'Dua syarat pakai &, tiap syarat dalam kurung. Yang lolos: Bandung qty 12 dan Jakarta qty 6.', umum: ['Pakai <code>and</code>: ValueError truth value ambiguous.', 'Lupa kurung: & dikerjain duluan, hasilnya error atau salah.'] }),
      PYS('Bikin kolom <code>omzet</code> = qty × harga, terus ambil <b>3 transaksi omzet terbesar</b> ke <code>top3</code> (jangan reset index).', 'df["omzet"] = df["qty"] * df["harga"]\ntop3 = df.sort_values("omzet", ascending=False).head(3)', { setup: JUAL, paket: P, cek: ['top3'], keluaran: false, jelas: 'Omzet terbesar: 12 × 85000 = 1.020.000, 6 × 85000 = 510.000, 4 × 85000 = 340.000. Sama kayak ORDER BY … DESC LIMIT 3 di SQL.', umum: ['Lupa ascending=False: yang keambil malah 3 terkecil.'] }),
    ],
  })
  perdalam('PY', 'groupby', {
    setelahContoh: [PYS('Lengkapin biar <code>per_kota</code> = total qty tiap kota.', 'per_kota = df.groupby("kota")["qty"].sum()\nprint(per_kota)', { kerangka: 'per_kota = df.groupby("___")["qty"].sum()\nprint(per_kota)', bimbing: true, setup: JUAL, paket: P, cek: ['per_kota'], petunjuk: 'Kelompoknya per kota.', jelas: 'Bandung 24, Jakarta 20, Surabaya 3.' })],
    sebelumRangkum: [
      PYS('Hitung <b>omzet per produk</b> (qty × harga dijumlah per produk), urut dari terbesar, simpan di <code>omzet_produk</code>.', 'df["omzet"] = df["qty"] * df["harga"]\nomzet_produk = df.groupby("produk")["omzet"].sum().sort_values(ascending=False)', { setup: JUAL, paket: P, cek: ['omzet_produk'], keluaran: false, jelas: 'Kopi: (12 + 3 + 6 + 4) × 85000 = 2.125.000. Teh: (5 + 8 + 9) × 18000 = 396.000.', umum: ['<code>groupby("produk")["harga"].sum()</code>: itu jumlah harga, bukan omzet.'] }),
      PYS('Tabel <code>target</code> udah disiapin. Gabungin ke <code>df</code> berdasarkan kota (semua baris df dipertahankan), simpan di <code>gab</code>.', 'gab = pd.merge(df, target, on="kota", how="left")', { setup: JUAL + '\ntarget = pd.DataFrame({"kota": ["Bandung", "Jakarta"], "target": [20, 25]})', paket: P, cek: ['gab'], keluaran: false, jelas: 'how="left" = semua baris df tetap ada. Surabaya ga punya target, jadi kolom target-nya NaN.', umum: ['how="inner" (default): baris Surabaya hilang.'] }),
    ],
  })
  perdalam('PY', 'bersihpy', {
    setelahContoh: [PYS('Data penjualan dari form online masih kotor. Hitung <b>nilai kosong per kolom</b>, simpan di <code>kosong</code>.', 'kosong = df.isna().sum()\nprint(kosong)', { kerangka: 'kosong = df.___().sum()\nprint(kosong)', bimbing: true, setup: KOTOR, bukaSetup: true, paket: P, cek: ['kosong'], petunjuk: 'Fungsi yang nandain nilai kosong jadi True.', jelas: 'kota 0, harga 1, qty 1.' })],
    sebelumRangkum: [
      PYS('Rapihin kolom <code>kota</code>: buang spasi di pinggir dan jadiin huruf awal kapital. Simpan balik ke <code>df["kota"]</code>.', 'df["kota"] = df["kota"].str.strip().str.title()', { setup: KOTOR, bukaSetup: true, paket: P, cek: ['df'], keluaran: false, jelas: '" jakarta" → "Jakarta", "BANDUNG " → "Bandung". .str ngebuka fungsi teks, kayak TRIM dan PROPER di Excel.', umum: ['Lupa disimpen balik (<code>df["kota"] = ...</code>): df ga berubah.'] }),
      PYS('Ubah kolom <code>harga</code> ("85.000") jadi angka: buang titik, terus <code>pd.to_numeric</code> pakai <code>errors="coerce"</code>. Simpan balik ke <code>df["harga"]</code>.', 'df["harga"] = pd.to_numeric(df["harga"].str.replace(".", "", regex=False), errors="coerce")', { setup: KOTOR, bukaSetup: true, paket: P, cek: ['df'], keluaran: false, jelas: 'regex=False biar titik dibaca titik biasa. Nilai kosong tetap NaN karena errors="coerce".', umum: ['<code>.astype(int)</code> langsung: error karena ada titik dan nilai kosong.'] }),
    ],
  })
  perdalam('PY', 'plot', {
    sebelumRangkum: [
      PYS('Sebelum bikin grafik tren, siapin datanya: <b>total qty per tanggal</b>, urut tanggal, simpan di <code>tren</code>.', 'tren = df.groupby("tanggal")["qty"].sum()', { setup: JUAL, paket: P, cek: ['tren'], keluaran: false, jelas: 'groupby otomatis ngurutin kuncinya. Tanggal format YYYY-MM-DD urut sebagai teks. Abis ini tinggal <code>tren.plot(kind="line")</code>.' }),
      PYS('Hitung korelasi antara <code>qty</code> dan <code>harga</code>, simpan di <code>r</code>. Cek tandanya: positif atau negatif?', 'r = df["qty"].corr(df["harga"])\nprint(r)', { setup: JUAL, paket: P, cek: ['r'], keluaran: false, jelas: 'r sekitar −0,18: hubungan negatif tapi lemah banget. Transaksi barang mahal (Kopi) qty-nya cenderung sedikit lebih kecil, tapi dengan 7 baris data, ini belum bisa disimpulin apa-apa.' }),
    ],
  })
})()
