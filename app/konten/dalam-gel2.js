// Gelombang 2 (24 Nov 2026): pelajaran baru SQL, Excel, Statistik yang paling kepake buat data analyst.
// Semua query dijalanin di database Belanjain, semua rumus dihitung mesin Excel, semua angka statistik dihitung ulang.
;(() => {
  const { H, tambahPel } = window.GAS_DALAM
  const { I, RK, P, A, Q, QB, X, XB, B, L } = H
  const CS = (j, s, l, o = {}) => H.C(j, s, l, { jenis: 'sql', ...o })
  const CX = (j, s, data, l, o = {}) => H.C(j, s, l, { jenis: 'excel', data, ...o })
  const C = H.C

  // ================= SQL =================
  tambahPel('SQ', [
    L('bersihsql', 'menengah', 'Fungsi SQL buat ngerapihin data', 10, [
      I('Data jarang langsung siap pakai', "<p>Fungsi yang paling sering dipakai analis buat ngerapihin hasil query:</p><table class=\"tabel-mini\"><tr><th>fungsi</th><th>gunanya</th><th>contoh</th></tr><tr><td><code>UPPER</code> / <code>LOWER</code></td><td>samain huruf besar kecil</td><td><code>UPPER(kota)</code> → BANDUNG</td></tr><tr><td><code>TRIM</code></td><td>buang spasi di pinggir</td><td><code>TRIM(' Jakarta ')</code></td></tr><tr><td><code>LENGTH</code></td><td>jumlah karakter</td><td><code>LENGTH(nama)</code></td></tr><tr><td><code>||</code></td><td>sambung teks (SQLite, PostgreSQL)</td><td><code>nama || ' (' || kota || ')'</code></td></tr><tr><td><code>ROUND(x, n)</code></td><td>bulatin</td><td><code>ROUND(AVG(harga), 0)</code></td></tr><tr><td><code>COALESCE(a, b)</code></td><td>ganti NULL pakai nilai cadangan</td><td><code>COALESCE(SUM(qty), 0)</code></td></tr></table><p>Di MySQL sambung teks pakai <code>CONCAT()</code>.</p>"),
      I('Jebakan pembagian bilangan bulat', "<p>Di SQLite dan PostgreSQL, bilangan bulat dibagi bilangan bulat hasilnya <b>dibulatin ke bawah</b>: <code>7 / 2 = 3</code>, bukan 3,5.</p><p>Solusinya: bikin salah satunya desimal, <code>7 / 2.0</code> atau <code>CAST(7 AS REAL) / 2</code> atau kali <code>1.0</code>. Ini sumber salah paling sering pas ngitung persen dan rata-rata manual.</p><p class=\"tip\">COALESCE paling sering dipakai setelah LEFT JOIN: pelanggan yang belum belanja punya total NULL, padahal di laporan harusnya 0.</p>"),
      CS('Label pelanggan dan total belanja yang rapi', 'Tim CRM minta daftar: label "Nama (Kota)" dan total belanja pesanan selesai, termasuk yang belum pernah belanja (harus 0, bukan kosong).', [
        ["SELECT nama || ' (' || kota || ')' AS label\nFROM pelanggan", 'Sambung teks pakai <code>||</code>. Spasi dan kurung ditulis dalam kutip.'],
        ["SELECT c.nama || ' (' || c.kota || ')' AS label,\n  SUM(i.qty * pr.harga) AS belanja\nFROM pelanggan c\nLEFT JOIN pesanan p ON p.pelanggan_id = c.id AND p.status = 'selesai'\nLEFT JOIN item i ON i.pesanan_id = p.id\nLEFT JOIN produk pr ON pr.id = i.produk_id\nGROUP BY c.id\nORDER BY belanja", 'LEFT JOIN berantai biar semua pelanggan ikut. Syarat status ditaruh di ON, bukan WHERE, biar pelanggan tanpa pesanan selesai ga kebuang. Liat baris paling atas: belanja-nya NULL.'],
        ["SELECT c.nama || ' (' || c.kota || ')' AS label,\n  COALESCE(SUM(i.qty * pr.harga), 0) AS belanja\nFROM pelanggan c\nLEFT JOIN pesanan p ON p.pelanggan_id = c.id AND p.status = 'selesai'\nLEFT JOIN item i ON i.pesanan_id = p.id\nLEFT JOIN produk pr ON pr.id = i.produk_id\nGROUP BY c.id\nORDER BY belanja", 'Bungkus pakai COALESCE: NULL jadi 0. Sekarang ada 7 pelanggan dengan belanja 0.'],
      ], { penutup: 'Kalau syarat status ditaruh di WHERE setelah LEFT JOIN, pelanggan tanpa pesanan selesai ilang lagi. Syarat buat tabel kanan LEFT JOIN taruh di ON.' }),
      QB('Lengkapin: tampilkan <code>kota</code> dalam huruf kapital semua (kolom <code>kota_kapital</code>), tanpa dobel.', "SELECT DISTINCT ___(kota) AS kota_kapital\nFROM pelanggan", 'SELECT DISTINCT UPPER(kota) AS kota_kapital FROM pelanggan', 'Fungsi huruf kapital semua = UPPER.'),
      Q('Tampilkan <code>kategori</code> dan <b>rata-rata harga tanpa desimal</b> (<code>ROUND(AVG(harga), 0)</code>) sebagai <code>rata</code>.', 'SELECT kategori, ROUND(AVG(harga), 0) AS rata FROM produk GROUP BY kategori', 'ROUND(nilai, 0) = bulatin ke bilangan bulat terdekat.', { umum: ['ROUND ditaruh di luar GROUP BY atau lupa GROUP BY: hasilnya cuma satu baris.', 'Di SQLite, digit negatif (ROUND(x, -3)) dianggap 0. Buat bulatin ke ribuan pakai ROUND(x / 1000.0) * 1000.'] }),
      Q("Berapa <b>persen</b> produk yang kategorinya Elektronik? Pakai pembagian desimal, bulatin 1 angka di belakang koma.", "SELECT ROUND(100.0 * SUM(CASE WHEN kategori = 'Elektronik' THEN 1 ELSE 0 END) / COUNT(*), 1) FROM produk", '100.0 (pakai titik nol) dikali jumlah Elektronik, dibagi semua produk.', { umum: ['Pakai 100 bukan 100.0: 100 * 5 / 20 masih aman di sini, tapi 5 / 20 * 100 = 0 karena 5 / 20 dibulatin ke bawah jadi 0.'] }),
      Q("Tampilkan <code>nama</code> tiap pelanggan dan jumlah pesanan <b>selesai</b>-nya (<code>jumlah</code>), yang belum punya harus tampil 0. Grup pakai <code>c.id, c.nama</code>.", "SELECT c.nama, COUNT(p.id) AS jumlah FROM pelanggan c LEFT JOIN pesanan p ON p.pelanggan_id = c.id AND p.status = 'selesai' GROUP BY c.id, c.nama", "Syarat status taruh di ON LEFT JOIN, terus COUNT(p.id).", { umum: ["WHERE p.status = 'selesai' setelah LEFT JOIN: pelanggan yang ga punya pesanan selesai ilang, padahal harus tampil 0."] }),
      P('Hasil <code>SELECT 7 / 2</code> di SQLite?', [['3', 'Dua bilangan bulat dibagi = dibulatin ke bawah.'], ['3.5', 'Bakal 3.5 kalau salah satunya desimal (7 / 2.0).'], ['4', 'Bukan dibulatin ke atas.'], ['Error', 'Ga error, cuma hasilnya kepotong diam-diam. Itu yang bahaya.']], 'Jebakan senyap: ga ada pesan error, angkanya salah.'),
      RK('Kartu contekan fungsi SQL', [['UPPER / LOWER / TRIM', 'rapihin teks'], ['a || b', 'sambung teks (MySQL: CONCAT)'], ['ROUND(x, n)', 'n digit desimal (ke ribuan: ROUND(x / 1000.0) * 1000)'], ['COALESCE(x, 0)', 'NULL jadi 0'], ['7 / 2.0', 'biar hasilnya desimal'], ['LEFT JOIN … ON … AND syarat', 'syarat tabel kanan taruh di ON']]),
    ]),

    L('kohort', 'mahir', 'Kohort dan retensi pelanggan', 12, [
      I('Kohort itu apa?', '<p><b>Kohort</b> = sekelompok pelanggan yang mulai di waktu yang sama, misalnya semua yang belanja pertama kali di Januari. Dari situ kita liat: berapa persen yang <b>balik lagi</b>?</p><p>Ini salah satu analisis yang paling sering diminta di e-commerce dan aplikasi. Tes SQL data analyst juga sering pakai pola ini.</p>'),
      I('Pola query kohort', "<ol><li>Per pelanggan: bulan pertama belanja (<code>MIN</code> tanggal) dan jumlah pesanannya.</li><li>Kelompokin per bulan pertama itu (kohort).</li><li>Hitung berapa pelanggan per kohort dan berapa yang belanja lebih dari sekali.</li><li>Bagi jadi persen.</li></ol><p>Langkah 1 dibungkus CTE, langkah 2 sampai 4 di query luar.</p>"),
      CS('Retensi per kohort bulan', 'Pertanyaan: <i>"Dari pelanggan yang pertama kali belanja (pesanan selesai) di tiap bulan, berapa persen yang belanja lagi?"</i>', [
        ["SELECT pelanggan_id,\n  MIN(substr(tgl, 1, 7)) AS kohort,\n  COUNT(*) AS n\nFROM pesanan\nWHERE status = 'selesai'\nGROUP BY pelanggan_id", 'Langkah 1: satu baris per pelanggan. Bulan pertama = MIN dari bulan pesanannya. n = jumlah pesanan selesai.'],
        ["WITH f AS (\n  SELECT pelanggan_id, MIN(substr(tgl, 1, 7)) AS kohort, COUNT(*) AS n\n  FROM pesanan WHERE status = 'selesai'\n  GROUP BY pelanggan_id\n)\nSELECT kohort, COUNT(*) AS pelanggan,\n  SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) AS balik\nFROM f\nGROUP BY kohort\nORDER BY kohort", 'Langkah 2 dan 3: kelompokin per kohort. Januari: 6 pelanggan, 5 balik lagi.'],
        ["WITH f AS (\n  SELECT pelanggan_id, MIN(substr(tgl, 1, 7)) AS kohort, COUNT(*) AS n\n  FROM pesanan WHERE status = 'selesai'\n  GROUP BY pelanggan_id\n)\nSELECT kohort, COUNT(*) AS pelanggan,\n  ROUND(100.0 * SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) / COUNT(*), 1) AS retensi\nFROM f\nGROUP BY kohort\nORDER BY kohort", 'Langkah 4: jadiin persen pakai 100.0. Kohort Januari retensinya 83,3%.'],
      ], { penutup: 'Kohort yang masih baru (Oktober, November) belum sempat belanja lagi. Retensi rendah di sana belum tentu jelek, cuma belum waktunya. Selalu sebut ini pas presentasi.' }),
      QB('Lengkapin: <b>bulan pertama belanja</b> (pesanan selesai) tiap pelanggan, kolom <code>pelanggan_id</code> dan <code>kohort</code>.', "SELECT pelanggan_id, ___(substr(tgl, 1, 7)) AS kohort\nFROM pesanan\nWHERE status = 'selesai'\nGROUP BY pelanggan_id", "SELECT pelanggan_id, MIN(substr(tgl, 1, 7)) AS kohort FROM pesanan WHERE status = 'selesai' GROUP BY pelanggan_id", 'Bulan pertama = yang paling awal = MIN.'),
      Q("Berapa <b>pelanggan baru per kohort</b>? Tampilkan <code>kohort</code> dan <code>pelanggan</code>, urut kohort (pakai pesanan selesai).", "WITH f AS (SELECT pelanggan_id, MIN(substr(tgl, 1, 7)) AS kohort FROM pesanan WHERE status = 'selesai' GROUP BY pelanggan_id) SELECT kohort, COUNT(*) AS pelanggan FROM f GROUP BY kohort ORDER BY kohort", 'CTE bulan pertama per pelanggan, terus GROUP BY kohort.', { urut: true, umum: ['GROUP BY bulan langsung dari tabel pesanan: itu jumlah pesanan per bulan, bukan pelanggan baru.'] }),
      Q("Tampilkan <code>kohort</code> dan <code>retensi</code> (persen pelanggan yang punya lebih dari 1 pesanan selesai, 1 desimal), urut kohort.", "WITH f AS (SELECT pelanggan_id, MIN(substr(tgl, 1, 7)) AS kohort, COUNT(*) AS n FROM pesanan WHERE status = 'selesai' GROUP BY pelanggan_id) SELECT kohort, ROUND(100.0 * SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) / COUNT(*), 1) AS retensi FROM f GROUP BY kohort ORDER BY kohort", 'Persis pola langkah 4 contoh tadi.', { urut: true }),
      P('Kohort November retensinya 0%. Kesimpulan paling tepat?', [['Belum bisa dinilai, pelanggannya baru belanja dan belum sempat balik', 'Kohort muda selalu keliatan jelek. Bandingin di umur yang sama (misal retensi 1 bulan setelah belanja pertama).'], ['Pelanggan November pasti kecewa', 'Belum ada buktinya.'], ['Promo November gagal', 'Terlalu cepat nyimpulin.'], ['Datanya salah', 'Datanya wajar.']], 'Analisis kohort yang adil bandingin di umur kohort yang sama.'),
      RK('Kartu contekan kohort', [['Kohort', 'kelompok yang mulai di waktu sama'], ['MIN(tanggal)', 'tanggal pertama per pelanggan'], ['CTE per pelanggan', 'lalu GROUP BY kohort'], ['Retensi', 'yang balik ÷ semua di kohort'], ['Kohort muda', 'belum sempat balik, jangan disimpulin cepat']]),
    ]),
  ])

  // ================= EXCEL =================
  const OMZ = [['Kota', 'Okt', 'Nov', 'Tumbuh'], ['Bandung', 80, 100], ['Jakarta', 120, 108], ['Surabaya', 50, 65], ['Medan', 40, 40]]
  const KIRIM = [['Produk', 'Qty', 'Isi per dus', 'Jumlah dus'], ['Kopi', 50, 12], ['Teh', 36, 12], ['Madu', 25, 6]]
  const TRX = [['Tanggal', 'Kota', 'Produk', 'Qty', 'Harga', 'Omzet'], ['1 Nov', 'Bandung', 'Kopi', 12, 85000], ['1 Nov', 'Jakarta', 'Teh', 5, 18000], ['2 Nov', 'Bandung', 'Teh', 8, 18000], ['2 Nov', 'Surabaya', 'Madu', 3, 120000], ['3 Nov', 'Jakarta', 'Kopi', 6, 85000], ['3 Nov', 'Bandung', 'Madu', 4, 120000], ['4 Nov', 'Jakarta', 'Teh', 9, 18000], ['4 Nov', 'Surabaya', 'Kopi', 7, 85000]]
  const TRX2 = TRX.map((r, i) => i ? [...r, r[3] * r[4]] : r.slice())
  tambahPel('EX', [
    L('persenexcel', 'dasar', 'Persen, pertumbuhan, dan pembulatan', 9, [
      I('Persen di Excel', '<p>Di Excel, 25% disimpen sebagai angka <b>0,25</b>. Tombol format % (Ctrl + Shift + 5) cuma ngubah tampilannya. Jadi:</p><ul><li><b>Pertumbuhan</b> = (baru − lama) ÷ lama → <code>=(C2-B2)/B2</code>, terus format %.</li><li><b>Porsi</b> = bagian ÷ total → <code>=C2/SUM($C$2:$C$5)</code>.</li><li>Jangan dikali 100 kalau sel-nya udah diformat %, nanti jadi 2500%.</li></ul>'),
      I('Tiga cara bulatin', '<table class="tabel-mini"><tr><th>rumus</th><th>3,14159 jadi</th><th>dipakai buat</th></tr><tr><td><code>ROUND(x, 2)</code></td><td>3,14</td><td>bulatin biasa</td></tr><tr><td><code>ROUNDUP(x, 0)</code></td><td>4</td><td>kebutuhan minimal: jumlah dus, kursi, kendaraan</td></tr><tr><td><code>ROUNDDOWN(x, 0)</code></td><td>3</td><td>yang muat penuh: berapa paket lengkap</td></tr></table><p>Angka kedua = jumlah digit di belakang koma. Negatif = ke kiri koma (−3 = ribuan).</p>'),
      CX('Pertumbuhan omzet per kota', 'Omzet (juta) Oktober vs November. Hitung pertumbuhan tiap kota.', OMZ, [
        ['=C2-B2', 'Bandung: selisih dulu, 100 − 80 = 20.'],
        ['=(C2-B2)/B2', 'Bagi pakai nilai lama (Oktober). 20 ÷ 80 = 0,25 → kalau diformat % jadi 25%.'],
        ['=(C3-B3)/B3', 'Jakarta: (108 − 120) ÷ 120 = −0,1 = turun 10%.'],
        ['=C2/SUM($C$2:$C$5)', 'Porsi Bandung dari total November: 100 ÷ 313 ≈ 0,32. Total dikunci $ biar bisa ditarik ke bawah.'],
      ]),
      XB('Lengkapin rumus pertumbuhan di D2. Rumusnya bakal disalin sampai D5.', OMZ, 'D2', 'Tumbuh', '=(C2-B2)/___', '=(C2-B2)/B2', 'Pertumbuhan dibagi nilai lama (kolom Okt).', { bawah: 4 }),
      X('Hitung <b>jumlah dus</b> yang dibutuhin buat ngirim tiap produk (qty ÷ isi per dus, dibulatin ke atas). Rumus D2 disalin sampai D4.', KIRIM, 'D2', 'Jumlah dus', '=ROUNDUP(B2/C2,0)', 'Sisa barang tetap butuh 1 dus, jadi ROUNDUP.', { bawah: 3, umum: ['ROUND: 50 ÷ 12 = 4,17 jadi 4 dus, padahal 2 kopi ga kebagian dus.'] }),
      X('Hitung pertumbuhan <b>Surabaya dalam persen</b> dengan 1 desimal sebagai angka biasa (contoh hasil: 30), pakai ROUND.', OMZ, 'D4', 'Tumbuh %', '=ROUND((C4-B4)/B4*100,1)', 'Kali 100 karena diminta angka persen biasa, bukan format %.'),
      P('Sel berisi <code>=(C2-B2)/B2</code> hasilnya 0,25 dan diformat %. Yang tampil?', [['25%', 'Format % ngali 100 cuma di tampilan.'], ['0,25%', 'Kalau gini, isinya harus 0,0025.'], ['2500%', 'Kejadian kalau rumusnya dikali 100 lalu diformat %.'], ['25', 'Itu kalau ga diformat %.']], 'Isi sel 0,25, tampilan 25%.'),
      RK('Kartu contekan persen', [['(baru − lama) / lama', 'pertumbuhan'], ['bagian / SUM($…$)', 'porsi'], ['Ctrl + Shift + 5', 'format %'], ['ROUND / ROUNDUP / ROUNDDOWN', 'biasa / ke atas / ke bawah'], ['ROUND(x, -3)', 'ke ribuan']]),
    ]),

    L('proyekxl', 'mahir', 'Mini proyek: rekap penjualan mingguan', 14, [
      I('Kerjaan nyata analis junior', '<p>Kebanyakan tes Excel kerja bentuknya gini: dikasih tabel transaksi mentah, diminta bikin rekap. Kamu bakal ngerjain berurutan:</p><ol><li>Kolom bantu <b>Omzet</b> (qty × harga)</li><li>Total omzet per kota (<code>SUMIFS</code>)</li><li>Rata-rata omzet per transaksi kota tertentu (<code>AVERAGEIFS</code>)</li><li>Produk dengan transaksi terbesar (<code>INDEX MATCH</code> + <code>MAX</code>)</li><li>Status capai target (<code>IF</code> + <code>SUMIFS</code>)</li></ol><p>Semua pakai rumus yang udah kamu pelajari. Kuncinya: susun langkah, rujuk sel, kunci rentang kalau mau disalin.</p>'),
      CX('Rencana sebelum ngetik rumus', 'Data 8 transaksi minggu pertama November.', TRX, [
        ['', 'Baca dulu kolomnya: Tanggal, Kota, Produk, Qty, Harga. Omzet masih kosong.'],
        ['=D2*E2', 'Bikin kolom bantu Omzet di F. Baris 2: 12 × 85.000 = 1.020.000. Tarik ke bawah.'],
        ['', 'Abis kolom Omzet ada, semua rekap bisa pakai F2:F9 sebagai rentang yang dijumlah.'],
      ], { penutup: 'Kebiasaan bagus: kolom bantu dulu, baru rekap. Rumus rekap jadi pendek dan gampang dicek.' }),
      XB('Langkah 1: isi kolom <b>Omzet</b>. Rumus F2 bakal disalin sampai F9.', TRX, 'F2', 'Omzet', '=___*E2', '=D2*E2', 'Omzet = Qty × Harga di baris yang sama.', { bawah: 8 }),
      X('Langkah 2: <b>total omzet Bandung</b> (kolom Omzet udah keisi).', TRX2, 'H2', 'Omzet Bandung', '=SUMIFS(F2:F9,B2:B9,"Bandung")', 'SUMIFS(rentang omzet, rentang kota, "Bandung").'),
      X('Langkah 3: <b>rata-rata omzet per transaksi</b> di <b>Jakarta</b>.', TRX2, 'H2', 'Rata Jakarta', '=AVERAGEIFS(F2:F9,B2:B9,"Jakarta")', 'AVERAGEIFS kayak SUMIFS, tapi rata-rata.', { umum: ['SUMIFS lalu dibagi 8: itu dibagi semua transaksi, harusnya cuma transaksi Jakarta (3).'] }),
      X('Langkah 4: <b>nama produk</b> di transaksi dengan omzet terbesar.', TRX2, 'H2', 'Produk teratas', '=INDEX(C2:C9,MATCH(MAX(F2:F9),F2:F9,0))', 'MAX cari omzet terbesar, MATCH cari barisnya, INDEX ambil produknya.'),
      X('Langkah 5: tulis <b>"Capai"</b> kalau total omzet Surabaya minimal 800.000, selain itu <b>"Belum"</b>.', TRX2, 'H2', 'Target Sby', '=IF(SUMIFS(F2:F9,B2:B9,"Surabaya")>=800000,"Capai","Belum")', 'SUMIFS di dalam syarat IF.'),
      P('Kenapa bikin kolom bantu Omzet dulu, bukan langsung SUMPRODUCT di tiap rekap?', [['Rumus rekap jadi pendek, gampang dicek, dan omzet tiap baris keliatan', 'Pembaca laporan bisa ngecek angkanya baris per baris.'], ['Excel ga bisa SUMPRODUCT', 'Bisa, cuma lebih susah dibaca.'], ['Biar filenya lebih besar', 'Bukan tujuan.'], ['Wajib dari Excel', 'Ga ada aturan begitu.']], 'Kejelasan > kepinteran rumus.'),
      RK('Kartu contekan mini proyek', [['Kolom bantu', 'Omzet = Qty × Harga'], ['SUMIFS', 'total per kategori'], ['AVERAGEIFS', 'rata-rata per kategori'], ['INDEX(MATCH(MAX()))', 'cari "yang terbesar itu apa"'], ['IF(SUMIFS() >= target)', 'status capai target']]),
    ]),
  ])

  // ================= STATISTIK =================
  tambahPel('ST', [
    L('tertimbang', 'dasar', 'Rata-rata tertimbang', 8, [
      I('Kalau tiap data bobotnya beda', '<pre>rata-rata tertimbang = Σ(nilai × bobot) ÷ Σ bobot</pre><p>Contoh paling dekat: <b>IPK</b>. Nilai A di mata kuliah 4 SKS lebih ngaruh daripada A di mata kuliah 1 SKS. Di bisnis: harga rata-rata pembelian (bobotnya jumlah barang), rata-rata nilai order (bobotnya jumlah order).</p><p>Di Excel: <code>=SUMPRODUCT(nilai, bobot)/SUM(bobot)</code>.</p>'),
      C('Ngitung IPK satu semester', 'Mata kuliah: Statistika A (4) 3 SKS, Meteorologi Sinoptik B (3) 2 SKS, Bahasa Inggris C (2) 3 SKS.', [
        ['4×3 + 3×2 + 2×3 = 12 + 6 + 6 = 24', 'Kaliin nilai dengan SKS-nya, jumlahin.'],
        ['3 + 2 + 3 = 8 SKS', 'Jumlah bobot.'],
        ['24 ÷ 8 = 3,00', 'IPK semester ini.'],
        ['Rata-rata biasa: (4 + 3 + 2) ÷ 3 = 3,00', 'Kebetulan sama di sini. Ganti Statistika jadi 1 SKS dan hasilnya langsung beda. Coba di soal berikut.'],
      ]),
      A('Statistika A (4) 1 SKS, Sinoptik B (3) 2 SKS, Inggris C (2) 3 SKS. IPK-nya? (2 desimal)', 2.67, '(4×1 + 3×2 + 2×3) ÷ (1 + 2 + 3) = 16 ÷ 6 = 2,67.', { toleransi: 0.006, umum: ['Rata-rata biasa (4 + 3 + 2) ÷ 3 = 3: lupa bobot SKS.'] }),
      A('Toko beli beras 10 kg @ Rp20.000 dan 30 kg @ Rp12.000. Harga rata-rata per kg (rupiah)?', 14000, '(10 × 20.000 + 30 × 12.000) ÷ 40 = (200.000 + 360.000) ÷ 40 = 14.000.', { umum: ['(20.000 + 12.000) ÷ 2 = 16.000: anggap jumlah beli sama, padahal yang murah dibeli 3 kali lebih banyak.'] }),
      A('Cabang A: 100 order, AOV Rp50.000. Cabang B: 300 order, AOV Rp30.000. AOV gabungan (rupiah)?', 35000, '(100 × 50.000 + 300 × 30.000) ÷ 400 = 14.000.000 ÷ 400 = 35.000.'),
      RK('Kartu contekan rata-rata tertimbang', [['Σ(nilai × bobot) ÷ Σ bobot', 'rumus'], ['IPK', 'bobot = SKS'], ['Harga rata-rata', 'bobot = jumlah barang'], ['Gabung rata-rata grup', 'bobot = ukuran grup'], ['Excel', 'SUMPRODUCT(nilai, bobot)/SUM(bobot)']]),
    ]),

    L('persentil', 'menengah', 'Persentil, kuartil, dan box plot', 9, [
      I('Persentil', '<p><b>Persentil ke-p</b> = nilai yang di bawahnya ada p% data. Skor UTBK persentil 90 artinya lebih tinggi dari 90% peserta.</p><p><b>Kuartil</b> = persentil 25 (Q1), 50 (Q2 = median), 75 (Q3). Beda sama "persen": persentil itu <i>posisi</i> di antara orang lain, bukan skor.</p>'),
      I('Box plot dalam satu gambar', '<p>Box plot nampilin 5 angka: <b>minimum, Q1, median, Q3, maksimum</b>. Kotaknya dari Q1 ke Q3 (50% data di tengah), garis di dalam kotak = median, titik di luar "kumis" = pencilan (di luar Q1 − 1,5 IQR atau Q3 + 1,5 IQR).</p><p class="tip">Cara ngitung kuartil ada beberapa versi. Di sini pakai cara manual sederhana: median dari separuh bawah dan separuh atas. Excel <code>QUARTILE.INC</code> pakai interpolasi, hasilnya bisa beda tipis. Di tes, ikutin cara yang diminta soal.</p>'),
      C('Lima angka ringkasan', 'Waktu kirim 10 paket (hari): 2, 4, 4, 5, 6, 7, 8, 9, 10, 15 (udah urut).', [
        ['Median = (6 + 7) ÷ 2 = 6,5', 'Data genap: rata-rata nilai ke-5 dan ke-6.'],
        ['Separuh bawah 2, 4, 4, 5, 6 → Q1 = 4', 'Median separuh bawah.'],
        ['Separuh atas 7, 8, 9, 10, 15 → Q3 = 9', 'Median separuh atas.'],
        ['IQR = 9 − 4 = 5. Batas atas = 9 + 1,5 × 5 = 16,5', 'Paket 15 hari masih di bawah 16,5, jadi bukan pencilan menurut aturan ini, walau keliatan jauh.'],
      ]),
      A('Dari data tadi (2, 4, 4, 5, 6, 7, 8, 9, 10, 15), batas <b>bawah</b> pencilan (Q1 − 1,5 × IQR)?', -3.5, '4 − 1,5 × 5 = 4 − 7,5 = −3,5. Ga ada waktu kirim negatif, jadi ga ada pencilan bawah.', { toleransi: 0.01 }),
      A('Data: 1, 3, 3, 4, 6, 8, 9 (7 angka). Pakai cara separuh (median ga ikut ke separuh mana pun), berapa Q3?', 8, 'Median = 4 (nilai ke-4). Separuh atas: 6, 8, 9 → median 8.'),
      P('Kandidat dapet "persentil 85" di tes psikotes. Artinya?', [['Skornya lebih tinggi dari sekitar 85% peserta', 'Persentil = posisi relatif.'], ['Benar 85% soal', 'Itu skor persen, beda.'], ['Skornya 85', 'Bisa aja skornya 62 tapi tetap persentil 85.'], ['Lulus pasti', 'Tergantung batas perusahaan.']], 'Persentil ≠ persen benar.'),
      P('Box plot gaji dua divisi: kotak divisi A jauh lebih lebar dari B. Artinya?', [['Gaji 50% karyawan tengah di A lebih bervariasi', 'Lebar kotak = IQR.'], ['Gaji A lebih tinggi', 'Tinggi-rendah diliat dari posisi median, bukan lebar.'], ['A punya lebih banyak karyawan', 'Box plot ga nunjukin jumlah data.'], ['A pasti punya pencilan', 'Pencilan ditandai titik di luar kumis.']], 'Posisi = tingkat, lebar = sebaran.'),
      RK('Kartu contekan persentil', [['Persentil p', 'p% data di bawahnya'], ['Q1 / Q2 / Q3', 'persentil 25 / 50 / 75'], ['IQR', 'Q3 − Q1'], ['Pencilan', '< Q1 − 1,5 IQR atau > Q3 + 1,5 IQR'], ['Box plot', 'min, Q1, median, Q3, maks'], ['Excel', 'QUARTILE.INC, PERCENTILE.INC']]),
    ]),

    L('jebakan', 'mahir', 'Jebakan analisis: Simpson dan base rate', 11, [
      I('Paradoks Simpson', '<p>Tren di tiap kelompok bisa <b>kebalik</b> pas datanya digabung. Penyebabnya: komposisi kelompoknya beda.</p><p>Contoh: kurir B lebih tepat waktu di Jakarta <i>dan</i> di Bandung, tapi total gabungannya kalah dari kurir A. Kok bisa? Kurir A kebanyakan dapet rute Jakarta yang gampang, kurir B kebanyakan rute Bandung yang susah.</p><p>Pelajarannya: sebelum nyimpulin dari angka gabungan, pecah per kelompok yang relevan.</p>'),
      I('Base rate: jangan lupa seberapa jarang kejadiannya', '<p>Sistem deteksi fraud "akurasi 95%" kedengeran hebat. Tapi kalau fraud cuma 1% transaksi, sebagian besar yang ditandai sistem justru transaksi normal yang kena alarm palsu.</p><p>Cara aman: ubah ke <b>angka orang/transaksi nyata</b> (misal dari 10.000 transaksi), bukan persen. Lebih gampang dicerna dan susah ketipu.</p>'),
      C('Kurir mana yang lebih bagus?', 'Kurir A: Jakarta 80 dari 100 tepat waktu, Bandung 20 dari 50. Kurir B: Jakarta 17 dari 20, Bandung 60 dari 130.', [
        ['A gabungan: (80 + 20) ÷ 150 = 66,7%', 'Total A.'],
        ['B gabungan: (17 + 60) ÷ 150 = 51,3%', 'Total B. Keliatannya A jauh lebih bagus.'],
        ['Jakarta: A 80%, B 85%. Bandung: A 40%, B 46%', 'Dipecah per kota: B menang di dua-duanya!'],
        ['Kenapa? A 100 dari 150 pengirimannya di Jakarta (gampang). B 130 dari 150 di Bandung (susah).', 'Komposisi rute bikin angka gabungan nipu. Bandingin yang adil: per kota.'],
      ]),
      A('Dari contoh tadi, persen tepat waktu kurir <b>B di Bandung</b> (1 desimal)?', 46.2, '60 ÷ 130 = 0,4615 = 46,2%.', { satuan: '%', toleransi: 0.06 }),
      C('Base rate fraud', '10.000 transaksi. 1% fraud. Sistem nangkep 90% fraud, tapi juga salah nandain 5% transaksi normal.', [
        ['Fraud: 1% × 10.000 = 100. Ketangkep 90% = 90', 'Yang beneran fraud dan ditandai.'],
        ['Normal: 9.900. Salah ditandai 5% = 495', 'Alarm palsu.'],
        ['Total ditandai = 90 + 495 = 585', ''],
        ['Yang beneran fraud dari yang ditandai = 90 ÷ 585 ≈ 15,4%', 'Dari tiap 100 alarm, cuma sekitar 15 yang beneran fraud. Tim investigasi bakal banyak buang waktu.'],
      ]),
      A('Fraud 2% dari 5.000 transaksi. Sistem nangkep 80% fraud dan salah nandain 10% transaksi normal. Berapa <b>transaksi</b> yang ditandai total?', 570, 'Fraud 100, ketangkep 80. Normal 4.900, salah tanda 490. Total 80 + 490 = 570.'),
      P('Laporan: "Rata-rata nilai siswa naik tiap tahun di tiap sekolah, tapi rata-rata kota turun." Penjelasan yang paling mungkin?', [['Komposisi siswa pindah ke sekolah yang rata-ratanya lebih rendah (Simpson)', 'Tiap kelompok naik, gabungan turun karena bobot berubah.'], ['Datanya pasti salah hitung', 'Bisa bener secara matematika.'], ['Guru curang', 'Ga ada dasarnya.'], ['Ga mungkin terjadi', 'Mungkin banget, itu paradoks Simpson.']], 'Cek komposisi sebelum nyalahin angka.'),
      RK('Kartu contekan jebakan', [['Simpson', 'tren per kelompok kebalik pas digabung'], ['Penyebab', 'komposisi kelompok beda'], ['Base rate', 'kejadian langka bikin alarm palsu dominan'], ['Cara aman', 'ubah persen ke jumlah nyata'], ['Survivorship', 'cuma liat yang berhasil']]),
    ]),
  ])
})()
