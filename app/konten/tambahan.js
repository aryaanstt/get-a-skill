// Materi tambahan Get a Skill (22 Nov 2026). Disusun ngikutin kurikulum yang beneran dipakai:
// Excel ala ExcelJet/kursus kantor, SQL ala SQLBolt (filter, join, agregat, HAVING, subquery), statistik ala kursus statistik dasar,
// Python ala kursus pandas pemula, Digital Marketing ala Google (SEO, SEM, sosmed, email, analytics), UX ala Google UX Certificate
// (empathize, define, ideate, wireframe, usability test), Akuntansi ala siklus akuntansi (jurnal, buku besar, neraca saldo, penyesuaian,
// laporan), K3 ala PP 50/2012 SMK3 (HIRADC, hierarki pengendalian, APD), QC ala 7 QC tools dan DMAIC, PM ala PMBOK dan Scrum,
// Psikotes ala Rekrutmen Bersama BUMN (TKD: TWK, TIU, TKP, plus AKHLAK). Semua teks ditulis ulang sendiri.
;(() => {
  const K = window.GAS_KURSUS || {}
  const I = (judul, isi) => ({ t: 'info', judul, isi })
  const P = (tanya, opsi, jelas) => ({ t: 'pilih', tanya, opsi, benar: 0, jelas }) // jawaban benar = opsi pertama (pemutar ngacak urutannya)
  const B = (tanya, opsi, benar, jelas) => ({ t: 'banyak', tanya, opsi, benar, jelas })
  const A = (tanya, benar, jelas, satuan) => ({ t: 'angka', tanya, benar, jelas, ...(satuan ? { satuan } : {}) })
  const PS = (tanya, pasangan, jelas) => ({ t: 'pasang', tanya, pasangan, jelas })
  const U = (tanya, item, jelas) => ({ t: 'urut', tanya, item, jelas })
  const SK = (tanya, opsi) => ({ t: 'skenario', tanya, opsi: opsi.map(([teks, skor, ket]) => ({ teks, skor, ket })) })
  const Q = (tanya, kunci, petunjuk) => ({ t: 'sql', tanya, kunci, petunjuk })
  const X = (tanya, data, sel, label, kunci, petunjuk) => ({ t: 'excel', tanya, data, sel, label, kunci, petunjuk })
  const W = (tanya, minKata, rubrik, ai) => ({ t: 'tulis', tanya, minKata, rubrik, ai })
  const L = (id, level, judul, menit, langkah) => ({ id, level, judul, menit, langkah })
  const T = (level, tanya, opsi) => ({ level, tanya, opsi, benar: 0 })
  const tambah = (kode, { pel = [], tes = [] }) => { if (!K[kode]) return; const ada = new Set(K[kode].pelajaran.map(p => p.id)); pel.forEach(p => { if (!ada.has(p.id)) K[kode].pelajaran.push(p) }); K[kode].tes.push(...tes) }

  const PENJUALAN = [['Tanggal', 'Kota', 'Produk', 'Sales', 'Qty', 'Harga'], ['1 Nov', 'Bandung', 'Kopi', 'Rina', 12, 85000], ['1 Nov', 'Jakarta', 'Teh', 'Dodi', 5, 18000], ['2 Nov', 'Bandung', 'Teh', 'Rina', 8, 18000], ['2 Nov', 'Surabaya', 'Kopi', 'Sari', 3, 85000], ['3 Nov', 'Jakarta', 'Kopi', 'Dodi', 6, 85000], ['3 Nov', 'Bandung', 'Kopi', 'Sari', 4, 85000], ['4 Nov', 'Jakarta', 'Teh', 'Rina', 9, 18000]]

  // ================= EXCEL =================
  tambah('EX', { pel: [
    L('teks', 'menengah', 'Rumus teks: rapihin data berantakan', 7, [
      I('Data dari sistem sering berantakan', '<p><code>TRIM</code> buang spasi berlebih. <code>PROPER</code> bikin huruf awal kapital. <code>UPPER</code>/<code>LOWER</code> ngubah semua huruf.</p><p><code>LEFT(teks, n)</code> ambil n huruf dari kiri, <code>RIGHT</code> dari kanan, <code>MID(teks, mulai, n)</code> dari tengah. <code>LEN</code> ngitung jumlah karakter. <code>CONCAT</code> atau <code>&amp;</code> buat nyambung teks.</p>'),
      X('Rapihin nama di A2 jadi huruf awal kapital tanpa spasi lebih.', [['Nama mentah', 'Kode'], ['  budi   santoso ', 'JKT-0012'], ['citra lestari', 'BDG-0031']], 'C2', 'Nama rapi', '=PROPER(TRIM(A2))', 'Gabungin dua fungsi: TRIM di dalam, PROPER di luar.'),
      X('Ambil 3 huruf kode kota dari B2 (misal JKT).', [['Nama mentah', 'Kode'], ['  budi   santoso ', 'JKT-0012'], ['citra lestari', 'BDG-0031']], 'C2', 'Kode kota', '=LEFT(B2,3)', 'LEFT(teks, jumlah huruf).'),
      P('Rumus buat nyambung isi A2 dan B2 pakai spasi?', ['=A2&" "&B2', '=A2+B2', '=SUM(A2:B2)', '=A2 B2'], 'Tanda & nyambung teks. Spasinya ditulis dalam tanda kutip.'),
    ]),
    L('ifs', 'menengah', 'SUMIFS dan COUNTIFS: banyak syarat', 8, [
      I('Satu syarat atau lebih', '<p><code>SUMIF</code> cuma satu syarat. <code>SUMIFS(rentang_jumlah, rentang_syarat1, syarat1, rentang_syarat2, syarat2, ...)</code> bisa banyak syarat. Urutannya: <b>yang dijumlah duluan</b>.</p><p><code>COUNTIFS</code> sama, tapi ngitung baris yang lolos semua syarat.</p>'),
      X('Total <b>Qty Kopi</b> di <b>Bandung</b>.', PENJUALAN, 'H2', 'Qty kopi Bandung', '=SUMIFS(E2:E8,B2:B8,"Bandung",C2:C8,"Kopi")', 'SUMIFS(E2:E8, B2:B8, "Bandung", C2:C8, "Kopi")'),
      X('Berapa transaksi yang dipegang <b>Rina</b>?', PENJUALAN, 'H2', 'Transaksi Rina', '=COUNTIF(D2:D8,"Rina")', 'COUNTIF(rentang, "Rina").'),
      X('Berapa transaksi <b>Teh</b> dengan Qty <b>di atas 6</b>?', PENJUALAN, 'H2', 'Teh, qty > 6', '=COUNTIFS(C2:C8,"Teh",E2:E8,">6")', 'Syarat angka ditulis sebagai teks: ">6".'),
    ]),
    L('indexmatch', 'mahir', 'INDEX MATCH dan XLOOKUP', 8, [
      I('Kenapa ga VLOOKUP terus?', '<p><code>VLOOKUP</code> cuma bisa nyari ke kanan dan rawan rusak kalau kolom disisipin. <code>INDEX(kolom_hasil, MATCH(dicari, kolom_cari, 0))</code> bisa ke arah mana aja.</p><p>Di Excel versi baru ada <code>XLOOKUP(dicari, kolom_cari, kolom_hasil)</code>, lebih simpel.</p>'),
      X('Cari harga <b>Teh</b> pakai XLOOKUP dari tabel produk.', [['Produk', 'Kategori', 'Harga'], ['Kopi', 'Minuman', 85000], ['Teh', 'Minuman', 18000], ['Keripik', 'Makanan', 15000]], 'E2', 'Harga Teh', '=XLOOKUP("Teh",A2:A4,C2:C4)', 'XLOOKUP("Teh", A2:A4, C2:C4)'),
      X('Cari kategori <b>Keripik</b> pakai INDEX MATCH.', [['Produk', 'Kategori', 'Harga'], ['Kopi', 'Minuman', 85000], ['Teh', 'Minuman', 18000], ['Keripik', 'Makanan', 15000]], 'E2', 'Kategori Keripik', '=INDEX(B2:B4,MATCH("Keripik",A2:A4,0))', 'INDEX(kolom kategori, MATCH("Keripik", kolom produk, 0))'),
      P('Argumen 0 di MATCH artinya...', ['Cari yang persis sama', 'Cari nilai terdekat yang lebih kecil', 'Mulai dari baris 0', 'Abaikan huruf besar'], '0 = exact match.'),
    ]),
    L('bersih', 'mahir', 'Bersihin dan validasi data', 6, [
      I('Kerjaan paling sering analis', '<p>Sebelum dianalisis, data dicek: <b>duplikat</b> (Data → Remove Duplicates), <b>sel kosong</b> (COUNTBLANK), <b>format salah</b> (angka kesimpen sebagai teks), dan <b>nilai aneh</b> (Qty negatif).</p><p><b>Data Validation</b> mencegah salah input dari awal, misalnya dropdown pilihan kota.</p>'),
      B('Mana aja tanda data perlu dibersihin? (pilih semua)', ['Ada baris dobel persis', 'Angka rata kiri dan ga bisa dijumlah', 'Nama kota ditulis "jkt", "Jakarta", "JAKARTA"', 'Semua kolom punya judul jelas'], [0, 1, 2], 'Judul kolom yang jelas justru bagus.'),
      P('Fitur buat bikin dropdown pilihan di sel?', ['Data Validation', 'Conditional Formatting', 'Freeze Panes', 'Flash Fill'], 'Data → Data Validation → List.'),
      P('Rumus aman kalau VLOOKUP ga nemu hasil?', ['=IFERROR(VLOOKUP(...),"Tidak ada")', '=IF(VLOOKUP(...))', '=ISBLANK(VLOOKUP(...))', '=VLOOKUP(...)+0'], 'IFERROR ngasih nilai cadangan.'),
    ]),
  ], tes: [
    T('mahir', 'INDEX(B2:B10, MATCH("X", A2:A10, 0)) gunanya...', ['Cari nilai di kolom B yang barisnya cocok sama "X" di kolom A', 'Jumlahin kolom B', 'Hitung berapa X', 'Urutin data']),
    T('menengah', 'SUMIFS beda dari SUMIF karena...', ['Bisa banyak syarat', 'Bisa ngitung rata-rata', 'Cuma buat teks', 'Ga ada bedanya']),
  ] })

  // ================= SQL =================
  tambah('SQ', { pel: [
    L('having', 'menengah', 'HAVING: filter setelah dikelompokkan', 7, [
      I('WHERE vs HAVING', '<p><code>WHERE</code> nyaring <b>baris</b> sebelum dikelompokkan. <code>HAVING</code> nyaring <b>kelompok</b> setelah <code>GROUP BY</code>, biasanya pakai fungsi agregat.</p><p>Urutan nulis: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY.</p>'),
      Q('Tampilkan <b>kota</b> dan jumlah pelanggannya, cuma kota yang pelanggannya <b>lebih dari 3</b>.', 'SELECT kota, COUNT(*) AS jumlah FROM pelanggan GROUP BY kota HAVING COUNT(*) > 3', 'GROUP BY kota HAVING COUNT(*) > 3'),
      Q('Tampilkan <b>kategori</b> produk yang harga rata-ratanya <b>di atas 150000</b>, beserta rata-ratanya.', 'SELECT kategori, AVG(harga) AS rata FROM produk GROUP BY kategori HAVING AVG(harga) > 150000', 'GROUP BY kategori HAVING AVG(harga) > 150000'),
      P('Mau nyaring pesanan berstatus "selesai" sebelum dihitung per pelanggan. Pakai?', ['WHERE status = \'selesai\'', 'HAVING status = \'selesai\'', 'ORDER BY status', 'GROUP BY status'], 'Filter baris = WHERE.'),
    ]),
    L('subquery', 'mahir', 'Subquery: query di dalam query', 8, [
      I('Pertanyaan dua langkah', '<p>Kadang jawaban butuh hasil query lain. Contoh: "produk yang harganya di atas rata-rata". Rata-ratanya dihitung pakai subquery:</p><p><code>SELECT nama FROM produk WHERE harga &gt; (SELECT AVG(harga) FROM produk)</code></p><p>Subquery juga bisa dipakai bareng <code>IN</code>: pelanggan yang id-nya ada di daftar hasil query lain.</p>'),
      Q('Tampilkan <b>nama</b> dan <b>harga</b> produk yang harganya <b>di atas rata-rata</b> semua produk.', 'SELECT nama, harga FROM produk WHERE harga > (SELECT AVG(harga) FROM produk)', 'WHERE harga > (SELECT AVG(harga) FROM produk)'),
      Q('Tampilkan <b>nama</b> pelanggan yang <b>belum pernah pesan</b>.', 'SELECT nama FROM pelanggan WHERE id NOT IN (SELECT pelanggan_id FROM pesanan)', 'WHERE id NOT IN (SELECT pelanggan_id FROM pesanan)'),
      P('Subquery di WHERE harga > (...) harus ngembaliin...', ['Satu nilai', 'Banyak kolom', 'Tabel kosong', 'Teks'], 'Dibandingin pakai >, jadi harus satu nilai.'),
    ]),
    L('casewhen', 'mahir', 'CASE WHEN: bikin kategori sendiri', 7, [
      I('IF-nya SQL', '<p><code>CASE WHEN syarat THEN hasil WHEN ... ELSE hasil END</code> bikin kolom baru dari aturan.</p><p>Contoh: produk di atas 300 ribu = "Premium", sisanya "Reguler".</p>'),
      Q('Tampilkan <b>nama</b> produk dan kolom <b>kelas</b>: "Premium" kalau harga di atas 300000, selain itu "Reguler".', "SELECT nama, CASE WHEN harga > 300000 THEN 'Premium' ELSE 'Reguler' END AS kelas FROM produk", "CASE WHEN harga > 300000 THEN 'Premium' ELSE 'Reguler' END AS kelas"),
      Q('Hitung <b>jumlah pesanan</b> per <b>status</b>, urut dari yang paling banyak.', 'SELECT status, COUNT(*) AS jumlah FROM pesanan GROUP BY status ORDER BY jumlah DESC', 'GROUP BY status ORDER BY jumlah DESC'),
    ]),
    L('tanggal', 'mahir', 'Tanggal: tren per bulan', 7, [
      I('Ngelompokin per bulan', '<p>Tanggal di database ini formatnya <code>YYYY-MM-DD</code>. Di SQLite, <code>strftime(\'%m\', tgl)</code> ngambil bulannya, <code>substr(tgl, 1, 7)</code> ngambil "tahun-bulan".</p><p>Di MySQL pakai <code>MONTH()</code>, di PostgreSQL <code>DATE_TRUNC</code>. Konsepnya sama.</p>'),
      Q('Hitung <b>jumlah pesanan per bulan</b> (pakai substr(tgl,1,7) sebagai <b>bulan</b>), urut dari bulan paling awal.', 'SELECT substr(tgl, 1, 7) AS bulan, COUNT(*) AS jumlah FROM pesanan GROUP BY bulan ORDER BY bulan', 'SELECT substr(tgl,1,7) AS bulan, COUNT(*) ... GROUP BY bulan ORDER BY bulan'),
      Q('Total <b>pendapatan</b> (qty × harga) dari pesanan berstatus <b>selesai</b>.', "SELECT SUM(i.qty * pr.harga) AS pendapatan FROM item i JOIN produk pr ON pr.id = i.produk_id JOIN pesanan ps ON ps.id = i.pesanan_id WHERE ps.status = 'selesai'", 'Gabungin item, produk, pesanan. Filter status selesai.'),
    ]),
  ], tes: [
    T('mahir', 'Bedanya WHERE dan HAVING?', ['WHERE nyaring baris, HAVING nyaring kelompok setelah GROUP BY', 'Sama aja', 'HAVING lebih cepat', 'WHERE cuma buat angka']),
    T('mahir', 'Query di dalam query namanya...', ['Subquery', 'Join', 'View', 'Index']),
  ] })

  // ================= VISUALISASI =================
  tambah('VZ', { pel: [
    L('menyesatkan', 'menengah', 'Grafik yang menyesatkan', 6, [
      I('Grafik bisa bohong tanpa salah data', '<p>Tiga trik paling sering: <b>sumbu Y ga mulai dari nol</b> di grafik batang (beda kecil keliatan raksasa), <b>pie chart kebanyakan potongan</b>, dan <b>efek 3D</b> yang bikin ukuran terdistorsi.</p><p>Grafik garis boleh ga mulai dari nol kalau yang mau diliat itu perubahannya.</p>'),
      B('Mana aja yang bikin grafik menyesatkan? (pilih semua)', ['Batang dengan sumbu Y mulai dari 95', 'Pie chart 12 potongan', 'Grafik 3D miring', 'Judul yang jelas dan satuan disebut'], [0, 1, 2], 'Judul dan satuan yang jelas malah bikin jujur.'),
      P('Penjualan naik dari 100 ke 104. Grafik batang yang jujur?', ['Sumbu Y mulai dari 0', 'Sumbu Y mulai dari 99', 'Pakai 3D biar menarik', 'Hapus angka sumbu'], 'Di grafik batang, panjang batang = nilai. Harus dari nol.'),
    ]),
    L('dashboard', 'menengah', 'Nyusun dashboard yang kebaca', 7, [
      I('Dashboard itu jawaban, bukan pajangan', '<p>Susunan umum: <b>KPI utama</b> (angka besar) di kiri atas, <b>tren</b> di tengah, <b>rincian</b> di bawah. Mata baca dari kiri atas.</p><p>Batasi 5 sampai 7 visual. Tiap visual harus jawab satu pertanyaan bisnis. Pakai warna seperlunya, misalnya cuma buat nyorot yang perlu perhatian.</p>'),
      U('Urutin isi dashboard penjualan dari paling atas.', ['Kartu KPI: omzet, jumlah order, rata-rata nilai order', 'Grafik garis omzet per minggu', 'Grafik batang omzet per kota', 'Tabel rincian 10 produk teratas'], 'Ringkasan dulu, rincian belakangan.'),
      P('Satu dashboard idealnya punya berapa visual?', ['Sekitar 5 sampai 7', '20 lebih', 'Cuma 1', 'Sebanyak mungkin'], 'Lebih dari itu bikin pusing.'),
    ]),
    L('powerbi', 'mahir', 'Model data Power BI: star schema dan measure', 8, [
      I('Model data yang rapi', '<p><b>Star schema</b>: satu <b>tabel fakta</b> (transaksi, isinya angka) di tengah, dikelilingi <b>tabel dimensi</b> (produk, pelanggan, tanggal) yang isinya deskripsi.</p><p><b>Measure</b> (DAX) dihitung pas dipakai di visual, contoh <code>Total Omzet = SUM(Penjualan[Omzet])</code>. <b>Calculated column</b> dihitung per baris dan disimpen, bikin file lebih berat.</p><p>Tableau konsepnya mirip: <b>dimension</b> (kategori) dan <b>measure</b> (angka).</p>'),
      PS('Pasangin tabel dengan jenisnya.', [['Penjualan (id order, qty, omzet)', 'Fakta'], ['Produk (nama, kategori)', 'Dimensi'], ['Kalender (tanggal, bulan, kuartal)', 'Dimensi'], ['Pelanggan (nama, kota, segmen)', 'Dimensi']], 'Fakta = angka transaksi, dimensi = deskripsi.'),
      P('Mau total omzet yang ikut berubah pas difilter per kota. Bikin...', ['Measure', 'Calculated column', 'Tabel baru', 'Hardcode angka'], 'Measure dihitung sesuai filter.'),
      P('Di Tableau, "Kota" termasuk...', ['Dimension', 'Measure', 'Parameter', 'Filter wajib'], 'Kategori = dimension.'),
    ]),
    L('cerita', 'mahir', 'Storytelling dengan data', 6, [
      I('Data + cerita = keputusan', '<p>Struktur sederhana: <b>konteks</b> (situasinya apa), <b>temuan</b> (apa yang data bilang), <b>implikasi</b> (terus kenapa), <b>rekomendasi</b> (harus ngapain).</p><p>Judul grafik sebaiknya kalimat kesimpulan, bukan sekadar label. "Omzet Bandung turun 20% sejak promo berhenti" lebih kuat daripada "Omzet per kota".</p>'),
      P('Judul grafik paling kuat?', ['"Retur naik 3 kali lipat sejak ganti kurir"', '"Grafik retur"', '"Data retur 2026"', '"Retur per bulan (unit)"'], 'Judul yang langsung nyampein temuan.'),
      U('Susun alur presentasi data ini.', ['Konteks: target kuartal ini', 'Temuan: kota mana yang paling jauh dari target', 'Implikasi: dampaknya ke omzet tahunan', 'Rekomendasi: 2 langkah perbaikan'], 'Konteks, temuan, implikasi, rekomendasi.'),
    ]),
  ], tes: [
    T('menengah', 'Grafik batang dengan sumbu Y mulai dari 95 bikin...', ['Beda kecil keliatan besar', 'Data lebih akurat', 'Lebih gampang dibaca', 'Ga ada pengaruh']),
    T('mahir', 'Di star schema, tabel transaksi disebut...', ['Tabel fakta', 'Tabel dimensi', 'Tabel bantu', 'Tabel kalender']),
  ] })

  // ================= STATISTIK =================
  tambah('ST', { pel: [
    L('sebaran', 'menengah', 'Sebaran data: range dan standar deviasi', 7, [
      I('Rata-rata aja ga cukup', '<p>Dua kelas bisa punya rata-rata nilai sama, tapi sebarannya beda jauh. <b>Range</b> = maks − min. <b>Standar deviasi</b> = seberapa jauh data rata-rata dari mean. Makin besar, makin nyebar.</p><p><b>Kuartil</b> bagi data jadi 4 bagian. <b>IQR</b> = Q3 − Q1, dipakai buat nyari outlier.</p>'),
      A('Data: 4, 8, 15, 16, 23. Berapa <b>range</b>-nya?', 19, '23 − 4 = 19'),
      P('Kelas A nilainya 70, 70, 70. Kelas B: 50, 70, 90. Standar deviasinya?', ['B lebih besar', 'A lebih besar', 'Sama', 'Ga bisa dihitung'], 'Kelas A ga nyebar sama sekali (SD = 0).'),
      P('Waktu antar paket: sebagian besar 2 sampai 3 hari, tapi beberapa 15 hari. Ukuran pusat yang paling mewakili?', ['Median', 'Mean', 'Range', 'Maks'], 'Outlier narik mean, median tahan.'),
    ]),
    L('normal', 'menengah', 'Distribusi normal dan aturan 68-95-99,7', 7, [
      I('Kurva lonceng', '<p>Banyak data (tinggi badan, skor tes) bentuknya mirip lonceng: <b>distribusi normal</b>. Aturan praktisnya:</p><p>• sekitar <b>68%</b> data ada dalam ±1 standar deviasi dari mean<br>• sekitar <b>95%</b> dalam ±2 SD<br>• sekitar <b>99,7%</b> dalam ±3 SD</p><p><b>Z-score</b> = (nilai − mean) ÷ SD, artinya berapa SD jauhnya dari rata-rata.</p>'),
      A('Mean skor tes 500, SD 100. Berapa <b>z-score</b> skor 700?', 2, '(700 − 500) ÷ 100 = 2'),
      A('Mean 60, SD 10, distribusi normal. Kira-kira berapa persen data ada di antara 50 sampai 70?', 68, '50 dan 70 = mean ± 1 SD → sekitar 68%.', '%'),
    ]),
    L('sampel', 'menengah', 'Sampel, populasi, dan margin of error', 6, [
      I('Ga mungkin nanya semua orang', '<p><b>Populasi</b> = semua yang mau diteliti. <b>Sampel</b> = sebagian yang diambil. Sampel harus <b>acak</b> dan <b>mewakili</b>, kalau nggak hasilnya bias.</p><p><b>Margin of error</b> ±3% artinya hasil asli kemungkinan besar ada di rentang itu. Makin besar sampel, makin kecil margin of error.</p>'),
      P('Survei kepuasan pelanggan cuma disebar ke follower Instagram brand. Masalahnya?', ['Bias seleksi, yang follow cenderung udah suka', 'Sampelnya terlalu besar', 'Ga ada masalah', 'Harus pakai kertas'], 'Sampelnya ga mewakili semua pelanggan.'),
      P('Hasil survei 52% ± 3%. Artinya...', ['Hasil asli kemungkinan antara 49% dan 55%', 'Pasti 52%', 'Salah 3 orang', 'Harus diulang'], 'Rentang ketidakpastian.'),
    ]),
    L('hipotesis', 'mahir', 'Uji hipotesis dan p-value', 8, [
      I('Beneran beda atau kebetulan?', '<p><b>H0</b> (hipotesis nol) = ga ada beda. <b>H1</b> = ada beda. <b>p-value</b> = peluang dapet hasil seekstrem ini kalau H0 bener.</p><p>Biasanya pakai batas <b>0,05</b>: p &lt; 0,05 → tolak H0, bedanya <b>signifikan</b>. Signifikan secara statistik belum tentu penting secara bisnis.</p>'),
      P('A/B test tombol: p-value = 0,02. Kesimpulan dengan batas 0,05?', ['Bedanya signifikan, tolak H0', 'Ga signifikan', 'H0 pasti bener', 'Harus pakai 0,02 sebagai konversi'], '0,02 < 0,05.'),
      P('p-value = 0,40 artinya...', ['Belum ada bukti cukup kalau ada beda', 'Pasti ga ada beda', 'Ada beda 40%', 'Datanya salah'], 'Gagal tolak H0 ≠ membuktikan H0.'),
      P('Konversi naik dari 2,00% ke 2,01%, signifikan karena datanya jutaan. Yang perlu ditanya?', ['Apakah kenaikan sekecil itu sepadan biayanya', 'Ga perlu nanya, langsung terapin', 'Ulang tes sampai ga signifikan', 'Hapus data'], 'Signifikan statistik ≠ penting bisnis.'),
    ]),
    L('korelasi', 'mahir', 'Korelasi dan regresi sederhana', 7, [
      I('Hubungan dua variabel', '<p><b>Korelasi (r)</b> dari −1 sampai 1. Dekat 1 = naik bareng, dekat −1 = berlawanan, dekat 0 = ga ada hubungan linear.</p><p><b>Regresi linear</b> bikin garis prediksi: y = a + b·x. Kemiringan b = rata-rata perubahan y tiap x naik 1.</p><p>Korelasi <b>bukan</b> sebab-akibat. Bisa ada variabel ketiga.</p>'),
      PS('Pasangin nilai r dengan artinya.', [['r = 0,9', 'Hubungan positif kuat'], ['r = −0,8', 'Hubungan negatif kuat'], ['r = 0,05', 'Hampir ga ada hubungan linear'], ['r = 0,4', 'Hubungan positif sedang']], 'Tanda = arah, besar = kekuatan.'),
      A('Regresi: omzet = 2 + 3 × biaya iklan (dalam juta). Kalau iklan 5 juta, prediksi omzet berapa juta?', 17, '2 + 3 × 5 = 17 juta.'),
      P('Penjualan es krim dan kasus tenggelam naik bareng. Penjelasan paling masuk akal?', ['Variabel ketiga: cuaca panas', 'Es krim bikin tenggelam', 'Tenggelam bikin pengen es krim', 'Kebetulan murni'], 'Klasik: korelasi karena faktor ketiga.'),
    ]),
  ], tes: [
    T('menengah', 'Sekitar berapa persen data normal ada dalam ±2 SD?', ['95%', '68%', '50%', '99,7%']),
    T('mahir', 'p-value 0,01 dengan batas 0,05 artinya...', ['Signifikan, tolak H0', 'Ga signifikan', 'H0 terbukti', 'Datanya salah']),
  ] })

  // ================= PYTHON =================
  tambah('PY', { pel: [
    L('list', 'dasar', 'List, loop, dan if', 7, [
      I('Tiga hal yang paling sering dipakai', '<p><b>List</b>: <code>harga = [85000, 18000, 15000]</code>. Indeks mulai dari 0, jadi <code>harga[0]</code> = 85000.</p><p><b>Loop</b>: <code>for h in harga:</code> jalanin kode buat tiap isi list. <b>If</b>: <code>if h &gt; 50000:</code>. Isi blok ditulis menjorok (indentasi).</p>'),
      P('<code>nilai = [70, 85, 90]</code>. Apa isi <code>nilai[1]</code>?', ['85', '70', '90', 'Error'], 'Indeks mulai dari 0.'),
      P('Hasil <code>len([3, 5, 7, 9])</code>?', ['4', '3', '24', '9'], 'len = jumlah isi.'),
      { t: 'isian', tanya: 'Tulis baris pertama loop yang ngambil tiap isi list <code>kota</code> ke variabel <code>k</code>.', benar: ['for k in kota:'], jelas: 'for k in kota:' },
      P('Kenapa indentasi penting di Python?', ['Nentuin baris mana yang masuk blok if atau loop', 'Biar rapi doang', 'Biar lebih cepat', 'Ga penting'], 'Python pakai indentasi sebagai penanda blok.'),
    ]),
    L('filter', 'menengah', 'pandas: filter, sort, dan kolom baru', 8, [
      I('Operasi pandas harian', '<p><code>df[df["kota"] == "Bandung"]</code> → filter baris.<br><code>df.sort_values("omzet", ascending=False)</code> → urutin.<br><code>df["omzet"] = df["qty"] * df["harga"]</code> → kolom baru.<br><code>df.head()</code>, <code>df.info()</code>, <code>df.describe()</code> → kenalan sama data.</p>'),
      PS('Pasangin kode dengan gunanya.', [['df.head()', 'Liat 5 baris pertama'], ['df.describe()', 'Ringkasan statistik kolom angka'], ['df.info()', 'Tipe data dan jumlah nilai kosong'], ['df.shape', 'Jumlah baris dan kolom']], 'Empat perintah pertama tiap buka data.'),
      P('Filter qty di atas 10 dan kota Jakarta?', ['df[(df["qty"] > 10) & (df["kota"] == "Jakarta")]', 'df[df["qty"] > 10 and df["kota"] == "Jakarta"]', 'df.filter(qty > 10)', 'df["qty" > 10]'], 'Di pandas pakai &, tiap syarat dalam kurung.'),
      { t: 'isian', tanya: 'Bikin kolom <code>omzet</code> = <code>qty</code> × <code>harga</code> di DataFrame <code>df</code>.', benar: ['df["omzet"] = df["qty"] * df["harga"]', "df['omzet'] = df['qty'] * df['harga']"], jelas: 'df["omzet"] = df["qty"] * df["harga"]' },
    ]),
    L('bersihpy', 'mahir', 'Bersihin data pakai pandas', 7, [
      I('Nilai kosong dan tipe data', '<p><code>df.isna().sum()</code> → hitung nilai kosong tiap kolom. <code>df.dropna()</code> buang baris kosong, <code>df.fillna(0)</code> isi pakai nilai tertentu.</p><p><code>df.drop_duplicates()</code> buang baris dobel. <code>df["tgl"] = pd.to_datetime(df["tgl"])</code> ubah teks jadi tanggal. <code>df["harga"].astype(int)</code> ubah tipe.</p>'),
      PS('Pasangin masalah dengan solusinya.', [['Ada baris dobel', 'df.drop_duplicates()'], ['Kolom tanggal kebaca teks', 'pd.to_datetime()'], ['Ngitung nilai kosong', 'df.isna().sum()'], ['Kosong diisi nol', 'df.fillna(0)']], 'Toolkit bersih-bersih standar.'),
      P('Kolom pendapatan ada yang kosong karena belum bayar. Paling masuk akal?', ['Isi 0 atau tandai, sesuai artinya', 'Hapus kolomnya', 'Isi pakai angka rata-rata tanpa mikir', 'Biarin, nanti error sendiri'], 'Cara ngisi tergantung arti datanya.'),
    ]),
    L('plot', 'mahir', 'Visualisasi dengan matplotlib', 6, [
      I('Grafik dalam 3 baris', '<p><code>import matplotlib.pyplot as plt</code><br><code>df.groupby("kota")["omzet"].sum().plot(kind="bar")</code><br><code>plt.show()</code></p><p>Jenis lain: <code>kind="line"</code> buat tren, <code>"hist"</code> buat sebaran, <code>"scatter"</code> (pakai x dan y) buat hubungan dua angka.</p>'),
      PS('Pasangin pertanyaan dengan kind-nya.', [['Omzet per bulan selama setahun', 'line'], ['Sebaran umur pelanggan', 'hist'], ['Omzet per kota', 'bar'], ['Biaya iklan vs jumlah klik', 'scatter']], 'Sama kayak milih grafik di Excel.'),
      P('Perintah yang biasanya ditulis terakhir biar grafik muncul?', ['plt.show()', 'plt.start()', 'df.plot.end()', 'print(plt)'], 'plt.show().'),
    ]),
  ], tes: [
    T('dasar', 'Indeks pertama list di Python itu...', ['0', '1', '-1', 'Tergantung']),
    T('mahir', 'Buang baris dobel di pandas pakai...', ['df.drop_duplicates()', 'df.dropna()', 'df.unique()', 'df.clean()']),
  ] })

  // ================= DIGITAL MARKETING =================
  tambah('DM', { pel: [
    L('seo', 'dasar', 'SEO: muncul di Google tanpa bayar', 7, [
      I('Search Engine Optimization', '<p>Tiga pilar SEO: <b>on-page</b> (judul, heading, isi yang jawab pertanyaan, kata kunci natural), <b>teknis</b> (situs cepat, rapi di HP, bisa dibaca mesin), dan <b>off-page</b> (backlink dari situs lain yang terpercaya).</p><p>Riset <b>kata kunci</b>: cari yang dicari orang dan cocok sama bisnis. Kata kunci panjang (long-tail) lebih gampang menang.</p>'),
      PS('Pasangin aktivitas dengan pilar SEO-nya.', [['Nulis judul halaman yang ngandung kata kunci', 'On-page'], ['Bikin situs loading di bawah 3 detik', 'Teknis'], ['Dapet link dari media berita', 'Off-page'], ['Nulis artikel yang jawab pertanyaan pembeli', 'On-page']], 'Isi, mesin, dan reputasi.'),
      P('Toko kopi kecil di Bandung, kata kunci paling realistis?', ['"kopi arabika gayo bandung kirim hari ini"', '"kopi"', '"minuman"', '"beli"'], 'Long-tail = persaingan rendah, niat beli tinggi.'),
    ]),
    L('sem', 'menengah', 'SEM dan iklan berbayar', 7, [
      I('Bayar biar muncul paling atas', '<p><b>SEM</b> = iklan di mesin pencari (Google Ads). Bayar per klik (<b>CPC</b>). Iklan muncul berdasarkan <b>lelang</b>: tawaran harga dan <b>Quality Score</b> (relevansi iklan, halaman tujuan, perkiraan CTR).</p><p>Iklan sosmed (Meta, TikTok) beda: targetnya orang berdasarkan minat dan demografi, bukan kata kunci yang dicari.</p>'),
      P('Kenapa iklan dengan tawaran lebih murah bisa di atas kompetitor?', ['Quality Score-nya lebih tinggi', 'Ga mungkin', 'Karena lebih lama', 'Karena warnanya'], 'Relevansi ikut dihitung.'),
      A('Budget Rp3.000.000, CPC rata-rata Rp1.500. Kira-kira dapet berapa klik?', 2000, '3.000.000 ÷ 1.500 = 2.000 klik.'),
      PS('Pasangin platform dengan cara targetingnya.', [['Google Search Ads', 'Kata kunci yang diketik'], ['Instagram Ads', 'Minat dan demografi'], ['Iklan YouTube', 'Topik video dan minat penonton'], ['Retargeting', 'Orang yang pernah ngunjungin situs']], 'Niat aktif vs pasif.'),
    ]),
    L('sosmed', 'menengah', 'Strategi konten media sosial', 7, [
      I('Konten yang ada tujuannya', '<p>Bagi konten jadi pilar, misalnya <b>edukasi</b>, <b>hiburan</b>, <b>bukti sosial</b> (testimoni), dan <b>promosi</b>. Jangan promosi terus.</p><p>Metrik yang penting: <b>reach</b> (berapa orang liat), <b>engagement rate</b> (interaksi ÷ reach), <b>saves dan shares</b> (sinyal konten berguna), dan klik ke toko.</p>'),
      A('Reach 20.000, total like + komen + share + save = 1.000. Engagement rate-nya berapa persen?', 5, '1.000 ÷ 20.000 = 5%.', '%'),
      B('Mana aja yang termasuk konten bukti sosial? (pilih semua)', ['Testimoni pelanggan', 'Unboxing dari pembeli', 'Foto produk di studio', 'Rating bintang 4,9 dari 2.000 ulasan'], [0, 1, 3], 'Foto studio = konten produk, bukan bukti dari orang lain.'),
      W('Bikin rencana konten 1 minggu (7 ide singkat) buat UMKM pilihan kamu, sebutin pilar tiap ide.', 40, ['Ada variasi pilar, ga promosi semua', 'Tiap ide jelas formatnya (reels, carousel, story)', 'Ada ajakan bertindak di sebagian konten', 'Cocok sama target pembeli'], 'Kasih feedback rencana konten 7 hari ini. Nilai variasi pilar, kejelasan ide, dan kecocokan sama target. Kasih 3 saran:'),
    ]),
    L('email', 'menengah', 'Email marketing', 6, [
      I('Kanal yang "punya sendiri"', '<p>Beda sama sosmed, daftar email itu aset kamu. Metrik: <b>open rate</b> (dibuka ÷ terkirim), <b>CTR</b> (klik ÷ terkirim), <b>unsubscribe rate</b>.</p><p><b>Segmentasi</b> (misalnya pembeli baru vs pelanggan lama) bikin email lebih relevan. <b>Subject line</b> nentuin dibuka atau nggak.</p>'),
      A('Terkirim 5.000, dibuka 1.100. Open rate berapa persen?', 22, '1.100 ÷ 5.000 = 22%.', '%'),
      P('Subject line paling menarik buat pelanggan yang keranjangnya ketinggalan?', ['"Kopi pilihanmu masih nunggu, gratis ongkir sampai besok"', '"Newsletter edisi 47"', '"PENTING!!! BACA!!!"', '"Halo"'], 'Personal, spesifik, ada alasan bertindak.'),
    ]),
    L('analitik', 'mahir', 'Analytics: ngukur yang penting', 7, [
      I('Dari klik sampai jualan', '<p>Di Google Analytics 4: <b>users</b>, <b>sessions</b>, <b>engagement rate</b>, <b>conversions</b>. Pakai <b>UTM</b> di link biar tau sumber traffic (utm_source, utm_medium, utm_campaign).</p><p>Hitung balik modal: <b>CAC</b> (biaya dapet 1 pelanggan) dibanding <b>LTV</b> (nilai pelanggan sepanjang waktu). Sehat kalau LTV jauh di atas CAC.</p>'),
      A('Biaya marketing Rp10.000.000, dapet 200 pelanggan baru. Berapa CAC (rupiah)?', 50000, '10.000.000 ÷ 200 = Rp50.000.'),
      P('Kenapa link kampanye dikasih UTM?', ['Biar ketahuan traffic dari kampanye mana', 'Biar link lebih pendek', 'Biar iklan lebih murah', 'Wajib dari Google'], 'Atribusi sumber.'),
      P('CAC Rp50.000, LTV Rp40.000. Artinya?', ['Rugi tiap dapet pelanggan baru', 'Untung besar', 'Impas', 'Ga ada hubungannya'], 'LTV harus di atas CAC.'),
    ]),
  ], tes: [
    T('dasar', 'SEO itu...', ['Usaha muncul di hasil pencarian tanpa bayar', 'Iklan Google', 'Email blast', 'Iklan TikTok']),
    T('mahir', 'CAC itu...', ['Biaya dapet 1 pelanggan baru', 'Rata-rata klik', 'Nilai pelanggan seumur hidup', 'Biaya per tayang']),
  ] })

  // ================= COPYWRITING =================
  tambah('CW', { pel: [
    L('pas', 'dasar', 'Kerangka PAS dan FAB', 6, [
      I('Dua kerangka andalan', '<p><b>PAS</b>: <b>Problem</b> (sebut masalahnya), <b>Agitate</b> (bikin kerasa mengganggu), <b>Solution</b> (tawarin solusi). Cocok buat produk yang nyelesaiin masalah jelas.</p><p><b>FAB</b>: <b>Feature</b> (fiturnya), <b>Advantage</b> (keunggulannya), <b>Benefit</b> (yang dirasain pembeli).</p>'),
      PS('Pasangin kalimat dengan bagian PAS-nya.', [['"Tiap pagi rambut kusut dan susah diatur?"', 'Problem'], ['"Telat ke kantor gara-gara 20 menit nyisir doang."', 'Agitate'], ['"Sisir ion ini ngelurusin rambut dalam 3 menit."', 'Solution']], 'Masalah, perasaannya, jalan keluarnya.'),
      PS('Pasangin FAB untuk powerbank.', [['Kapasitas 10.000 mAh', 'Feature'], ['Bisa ngecas HP 2 kali penuh', 'Advantage'], ['Ga panik kehabisan baterai pas mudik', 'Benefit']], 'Fitur → keunggulan → manfaat.'),
    ]),
    L('headline', 'menengah', 'Rumus headline yang bikin klik', 6, [
      I('Headline nentuin 80% nasib tulisan', '<p>Pola yang sering berhasil: <b>angka</b> ("5 cara..."), <b>pertanyaan</b> ("Kenapa...?"), <b>cara</b> ("Cara ... tanpa ..."), <b>hasil spesifik</b> ("Hemat 2 jam tiap minggu"), dan <b>urgensi jujur</b> ("Sampai Minggu").</p><p>Spesifik selalu ngalahin umum. Hindari clickbait yang isinya ga sesuai.</p>'),
      P('Headline paling kuat buat kelas Excel?', ['"Kerjain laporan mingguan 2 jam lebih cepat pakai 5 rumus ini"', '"Kelas Excel"', '"Belajar Excel itu penting"', '"Klik di sini sekarang"'], 'Spesifik, ada angka, ada hasil.'),
      B('Mana aja ciri headline yang bagus? (pilih semua)', ['Spesifik', 'Janji yang ditepati isi tulisan', 'Pakai huruf kapital semua', 'Nyebut manfaat buat pembaca'], [0, 1, 3], 'Kapital semua kesannya teriak.'),
    ]),
    L('tone', 'menengah', 'Tone of voice dan pembaca', 6, [
      I('Satu brand, satu gaya bicara', '<p><b>Tone of voice</b> = kepribadian brand dalam tulisan: formal atau santai, serius atau jenaka. Harus konsisten di semua kanal.</p><p>Sesuaiin sama pembaca: bank pakai bahasa yang menenangkan dan jelas, brand anak muda boleh santai. Tulis kayak ngomong ke satu orang.</p>'),
      PS('Pasangin brand dengan tone yang paling cocok.', [['Asuransi kesehatan', 'Tenang, jelas, meyakinkan'], ['Minuman kekinian buat Gen Z', 'Santai dan jenaka'], ['Konsultan hukum', 'Formal dan tegas'], ['Aplikasi belajar anak', 'Hangat dan menyemangati']], 'Tone ngikutin pembaca dan produk.'),
      SK('Pelanggan komplain di kolom komentar soal paket telat. Balasan admin paling pas?', [['"Maaf banget ya Kak, paketnya telat. Boleh DM nomor pesanannya? Kami cek sekarang."', 2, 'Empati, solutif, pindah ke DM.'], ['"Itu urusan kurir Kak."', 0, 'Defensif, bikin brand keliatan buruk.'], ['Dihapus aja komentarnya.', 0, 'Bisa bikin makin marah dan viral.']]),
    ]),
    L('ctaemail', 'mahir', 'CTA dan copy email jualan', 7, [
      I('Satu email, satu ajakan', '<p>CTA yang kuat: <b>kata kerja</b> + <b>manfaat</b> + kadang <b>batas waktu</b>. "Ambil diskon 30%" lebih kuat dari "Klik di sini".</p><p>Email jualan: subject spesifik, kalimat pembuka personal, satu pesan utama, satu CTA yang jelas. Kalimat pendek, paragraf pendek.</p>'),
      P('CTA paling kuat buat webinar gratis?', ['"Amankan kursimu, sisa 50"', '"Info"', '"Submit"', '"Lanjutkan"'], 'Kata kerja + alasan bertindak.'),
      W('Tulis email jualan singkat (subject + 4 sampai 6 kalimat) buat kelas online pilihan kamu.', 50, ['Subject spesifik dan bikin pengen buka', 'Pembuka personal, bukan "Dengan hormat"', 'Satu pesan utama dan benefit jelas', 'Satu CTA yang jelas'], 'Kasih feedback email jualan ini. Nilai subject, pembuka, benefit, dan CTA. Kasih 2 versi subject alternatif:'),
    ]),
  ], tes: [
    T('dasar', 'PAS singkatan dari...', ['Problem, Agitate, Solution', 'Plan, Act, Share', 'Price, Ads, Sales', 'Product, Audience, Story']),
    T('mahir', 'CTA yang paling kuat ciri-cirinya...', ['Kata kerja + manfaat + alasan bertindak', 'Sopan dan panjang', 'Cuma "Klik"', 'Huruf kapital semua']),
  ] })

  // ================= AKUNTANSI =================
  tambah('AK', { pel: [
    L('siklus', 'dasar', 'Siklus akuntansi dari transaksi sampai laporan', 7, [
      I('Urutan kerja akuntan', '<p>1. <b>Bukti transaksi</b> (nota, kuitansi)<br>2. <b>Jurnal umum</b> (dicatat debit kredit)<br>3. <b>Posting ke buku besar</b> (dikumpulin per akun)<br>4. <b>Neraca saldo</b> (cek total debit = kredit)<br>5. <b>Jurnal penyesuaian</b> di akhir periode<br>6. <b>Laporan keuangan</b><br>7. <b>Jurnal penutup</b></p><p>Standar untuk perusahaan non-publik di Indonesia sekarang <b>SAK EP</b> (pengganti SAK ETAP). Prinsip siklusnya tetap sama.</p>'),
      U('Susun urutan siklus akuntansi.', ['Bukti transaksi', 'Jurnal umum', 'Buku besar', 'Neraca saldo', 'Jurnal penyesuaian', 'Laporan keuangan'], 'Dari bukti sampai laporan.'),
      P('Fungsi utama neraca saldo?', ['Ngecek total debit sama dengan total kredit', 'Ngitung laba', 'Bayar pajak', 'Nyatet transaksi pertama kali'], 'Alat kontrol sebelum bikin laporan.'),
    ]),
    L('penyesuaian', 'menengah', 'Jurnal penyesuaian', 8, [
      I('Biar laporan sesuai periodenya', '<p>Di akhir bulan, ada yang belum kecatat dengan pas. Contoh umum:</p><p>• <b>Beban dibayar di muka</b> yang udah kepakai (sewa 12 bulan dibayar Januari → tiap bulan dibebankan 1/12)<br>• <b>Penyusutan</b> aset tetap<br>• <b>Beban yang masih harus dibayar</b> (gaji Desember dibayar Januari)<br>• <b>Perlengkapan</b> yang kepakai</p>'),
      A('Sewa toko setahun Rp24.000.000 dibayar 1 Januari. Beban sewa yang diakui per bulan (rupiah)?', 2000000, '24.000.000 ÷ 12 = 2.000.000.'),
      A('Mesin Rp60.000.000, umur 5 tahun, tanpa nilai sisa, metode garis lurus. Penyusutan per tahun (rupiah)?', 12000000, '60.000.000 ÷ 5 = 12.000.000.'),
      P('Penyesuaian penyusutan dijurnal...', ['Debit beban penyusutan, kredit akumulasi penyusutan', 'Debit kas, kredit mesin', 'Debit mesin, kredit kas', 'Ga perlu dijurnal'], 'Akumulasi penyusutan = akun pengurang aset.'),
    ]),
    L('laporan', 'menengah', 'Membaca laporan keuangan', 8, [
      I('Tiga laporan utama', '<p><b>Laba rugi</b>: pendapatan − beban = laba (atau rugi) <b>dalam satu periode</b>.<br><b>Neraca</b> (laporan posisi keuangan): aset = liabilitas + ekuitas <b>pada satu tanggal</b>.<br><b>Arus kas</b>: kas masuk keluar dari operasi, investasi, pendanaan.</p><p>Untung di laba rugi belum tentu punya kas banyak, misalnya kalau penjualan banyak yang kredit.</p>'),
      A('Pendapatan Rp150 juta, HPP Rp90 juta, beban operasional Rp35 juta. Laba sebelum pajak (juta)?', 25, '150 − 90 − 35 = 25 juta.'),
      PS('Pasangin akun dengan laporannya.', [['Penjualan', 'Laba rugi'], ['Piutang usaha', 'Neraca'], ['Beban gaji', 'Laba rugi'], ['Modal pemilik', 'Neraca']], 'Pendapatan dan beban di laba rugi, aset, utang, modal di neraca.'),
      P('Laba besar tapi kas tipis. Penyebab paling mungkin?', ['Banyak penjualan kredit yang belum dibayar', 'Salah hitung pasti', 'Beban terlalu kecil', 'Aset kebanyakan'], 'Laba ≠ kas.'),
    ]),
    L('rasio', 'mahir', 'Rasio keuangan dasar', 7, [
      I('Kesehatan perusahaan dalam angka', '<p><b>Current ratio</b> = aset lancar ÷ liabilitas lancar (kemampuan bayar utang jangka pendek, umumnya &gt; 1 dianggap aman).<br><b>Debt to equity</b> = total utang ÷ ekuitas.<br><b>Net profit margin</b> = laba bersih ÷ pendapatan.<br><b>ROE</b> = laba bersih ÷ ekuitas.</p>'),
      A('Aset lancar 300 juta, liabilitas lancar 150 juta. Current ratio?', 2, '300 ÷ 150 = 2.'),
      A('Laba bersih 20 juta, pendapatan 200 juta. Net profit margin (%)?', 10, '20 ÷ 200 = 10%.', '%'),
      P('Debt to equity tinggi artinya...', ['Perusahaan banyak dibiayai utang', 'Perusahaan pasti bangkrut', 'Laba besar', 'Kas melimpah'], 'Risiko lebih tinggi, belum tentu buruk.'),
    ]),
  ], tes: [
    T('dasar', 'Neraca saldo gunanya...', ['Ngecek debit = kredit', 'Ngitung pajak', 'Nyetak faktur', 'Nentuin harga']),
    T('mahir', 'Current ratio dihitung dari...', ['Aset lancar ÷ liabilitas lancar', 'Laba ÷ pendapatan', 'Utang ÷ ekuitas', 'Kas ÷ aset']),
  ] })

  // ================= UI/UX =================
  tambah('UX', { pel: [
    L('riset', 'dasar', 'Riset pengguna dan persona', 7, [
      I('Kenalan dulu sama penggunanya', '<p>Tahap <b>empathize</b>: wawancara pengguna, observasi, survei. Pertanyaan wawancara yang bagus itu <b>terbuka</b> ("Ceritain terakhir kali kamu...") bukan <b>menggiring</b> ("Kamu suka fitur ini kan?").</p><p>Hasilnya dirangkum jadi <b>persona</b> (profil pengguna fiktif tapi berdasar data) dan <b>empathy map</b> (apa yang dia katakan, pikirkan, lakukan, rasakan).</p>'),
      P('Pertanyaan wawancara paling baik?', ['"Ceritain terakhir kali kamu belanja online. Apa yang bikin repot?"', '"Fitur ini bagus kan?"', '"Kamu bakal pakai aplikasi kami?"', '"Kamu ga suka antre kan?"'], 'Terbuka dan berdasarkan pengalaman nyata.'),
      PS('Pasangin isi empathy map.', [['"Aku males daftar kalau formnya panjang"', 'Says'], ['Takut data kartunya bocor', 'Thinks'], ['Nutup aplikasi pas diminta OTP berkali-kali', 'Does'], ['Kesel dan buru-buru', 'Feels']], 'Ucapan, pikiran, tindakan, perasaan.'),
    ]),
    L('define', 'menengah', 'Problem statement dan user journey', 7, [
      I('Rumuskan masalah yang tepat', '<p><b>Problem statement</b> format umum: "<i>[Pengguna] butuh [kebutuhan] karena [insight]</i>". Contoh: "Mahasiswa yang kerja paruh waktu butuh cara cepat ngatur jadwal kuliah karena mereka sering bentrok shift."</p><p><b>User journey map</b>: tahapan pengguna dari awal sampai tujuan, plus perasaan dan titik masalah (<b>pain point</b>) di tiap tahap.</p>'),
      P('Problem statement paling baik?', ['"Fresh graduate butuh cara cepat nemu loker yang cocok jurusan karena mereka capek nyaring ratusan loker"', '"Bikin aplikasi loker yang keren"', '"Pengguna suka warna biru"', '"Aplikasi harus pakai AI"'], 'Fokus ke pengguna dan kebutuhannya, bukan solusinya.'),
      U('Urutin tahap Design Thinking.', ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'], 'Proses yang dipakai di kurikulum UX umum.'),
    ]),
    L('wireframe', 'menengah', 'Ideate, wireframe, dan prototipe', 7, [
      I('Dari ide ke rancangan', '<p><b>Crazy Eights</b>: lipat kertas jadi 8 kotak, sketsa 8 ide dalam 8 menit. Kuantitas dulu, kualitas belakangan.</p><p><b>Wireframe</b> = kerangka layar tanpa warna dan gambar (low-fidelity), fokus ke tata letak. <b>Prototipe</b> = wireframe yang bisa diklik buat dites. <b>Mockup</b> = desain final yang udah ada warna (high-fidelity). Alat umum: Figma.</p>'),
      PS('Pasangin istilah dengan artinya.', [['Wireframe', 'Kerangka tata letak tanpa warna'], ['Prototipe', 'Rancangan yang bisa diklik buat dites'], ['Mockup', 'Tampilan final dengan warna dan gambar'], ['Crazy Eights', '8 sketsa ide dalam 8 menit']], 'Makin ke kanan, makin detail.'),
      P('Kenapa mulai dari wireframe low-fidelity?', ['Murah dan cepat diubah sebelum buang waktu ke detail', 'Biar keliatan profesional', 'Karena klien suka abu-abu', 'Wajib dari Figma'], 'Ubah ide di tahap murah.'),
    ]),
    L('usability', 'mahir', 'Usability testing dan heuristik', 8, [
      I('Tes sama orang beneran', '<p><b>Usability test</b>: kasih tugas ("Coba beli kopi dan bayar pakai e-wallet"), amati, jangan bantuin. Riset terkenal Nielsen Norman Group: sekitar <b>5 pengguna</b> udah nemuin sebagian besar masalah utama.</p><p><b>Heuristik Nielsen</b> (contoh): status sistem keliatan, cegah error, konsisten, pengguna bisa undo, kenali bukan ingat.</p>'),
      P('Peserta usability test bingung nyari tombol bayar. Moderator sebaiknya...', ['Diam dan catat, tanya "apa yang kamu cari?"', 'Langsung kasih tau tombolnya', 'Ganti peserta', 'Bilang "gampang kok"'], 'Biar masalah aslinya keliatan.'),
      PS('Pasangin masalah dengan heuristik yang dilanggar.', [['Upload ga ada progres, pengguna ga tau udah jalan atau belum', 'Status sistem keliatan'], ['Hapus file tanpa konfirmasi dan ga bisa dibalikin', 'Kontrol dan undo'], ['Tombol "Simpan" warnanya beda-beda tiap halaman', 'Konsistensi'], ['Form ngebolehin tanggal lahir di masa depan', 'Cegah error']], 'Empat dari 10 heuristik Nielsen.'),
    ]),
  ], tes: [
    T('dasar', 'Pertanyaan wawancara pengguna sebaiknya...', ['Terbuka dan berdasar pengalaman', 'Menggiring ke jawaban yang kita mau', 'Ya atau tidak doang', 'Soal harga aja']),
    T('mahir', 'Usability test idealnya mulai dengan sekitar berapa peserta per putaran?', ['5', '1', '100', '1000']),
  ] })

  // ================= K3 =================
  tambah('K3', { pel: [
    L('regulasi', 'dasar', 'Dasar hukum K3 di Indonesia', 6, [
      I('Aturan yang sering ditanya', '<p><b>UU No. 1 Tahun 1970</b> tentang Keselamatan Kerja, dasar hukum K3 di Indonesia.<br><b>PP No. 50 Tahun 2012</b> tentang SMK3 (Sistem Manajemen K3): wajib buat perusahaan dengan pekerja minimal <b>100 orang</b> atau yang punya potensi bahaya tinggi.<br><b>P2K3</b> = Panitia Pembina K3 di perusahaan.</p><p>Di tingkat internasional ada <b>ISO 45001</b>.</p>'),
      PS('Pasangin aturan dengan isinya.', [['UU 1/1970', 'Keselamatan kerja'], ['PP 50/2012', 'Sistem Manajemen K3 (SMK3)'], ['ISO 45001', 'Standar internasional manajemen K3'], ['P2K3', 'Panitia K3 di perusahaan']], 'Sering keluar di interview HSE.'),
      P('SMK3 wajib buat perusahaan dengan pekerja minimal...', ['100 orang atau berisiko tinggi', '10 orang', '1.000 orang', 'Semua tanpa kecuali'], 'PP 50/2012 Pasal 5.'),
    ]),
    L('apd', 'dasar', 'APD yang tepat', 6, [
      I('Lapisan pertahanan terakhir', '<p>APD (Alat Pelindung Diri) dipakai kalau bahaya ga bisa dihilangin dengan cara lain. Contoh: helm, kacamata, sarung tangan, sepatu safety, pelindung telinga, masker atau respirator, full body harness buat kerja di ketinggian.</p><p>APD harus pas ukuran, dirawat, dan dipakai benar. APD rusak = ga ada perlindungan.</p>'),
      PS('Pasangin pekerjaan dengan APD utamanya.', [['Kerja di ketinggian 3 meter', 'Full body harness'], ['Gerinda logam', 'Kacamata dan pelindung wajah'], ['Area mesin bising', 'Earplug atau earmuff'], ['Nanganin bahan kimia korosif', 'Sarung tangan dan apron tahan kimia']], 'APD ngikutin jenis bahaya.'),
      P('Kenapa APD ada di urutan terakhir hierarki pengendalian?', ['Cuma ngelindungin pemakainya dan gampang gagal', 'Paling mahal', 'Paling ribet', 'Ga diatur hukum'], 'Bahayanya masih ada.'),
    ]),
    L('insiden', 'menengah', 'Insiden, near miss, dan piramida kecelakaan', 7, [
      I('Yang kecil-kecil jangan diabaikan', '<p><b>Near miss</b> (hampir celaka) = kejadian yang hampir bikin cedera. <b>Unsafe act</b> = tindakan ga aman (ga pakai helm). <b>Unsafe condition</b> = kondisi ga aman (lantai licin).</p><p><b>Piramida kecelakaan</b> (Heinrich, dilanjut Bird): tiap 1 kecelakaan serius didahului banyak kejadian kecil dan near miss. Lapor near miss = cegah yang besar.</p>'),
      PS('Pasangin kejadian dengan jenisnya.', [['Kunci pas jatuh dari scaffolding, ga kena orang', 'Near miss'], ['Operator ngelepas pelindung mesin biar cepet', 'Unsafe act'], ['Kabel listrik terkelupas di jalur lewat', 'Unsafe condition'], ['Pekerja jarinya terjepit dan dijahit', 'Kecelakaan kerja']], 'Klasifikasi dasar laporan K3.'),
      SK('Kamu liat rekan kerja nyetel mesin tanpa matiin listrik (tanpa LOTO). Langkah paling tepat?', [['Tegur dengan sopan, hentikan pekerjaan, laporkan ke supervisor', 2, 'Stop work authority: semua orang boleh dan wajib ngehentiin pekerjaan berbahaya.'], ['Diemin, bukan urusan saya', 0, 'Bisa berujung fatal.'], ['Foto dan posting ke grup', 0, 'Ga nyelesaiin bahayanya sekarang.']]),
    ]),
    L('jsa', 'menengah', 'JSA dan izin kerja', 7, [
      I('Analisis sebelum kerja', '<p><b>JSA</b> (Job Safety Analysis): pecah pekerjaan jadi langkah, kenali bahaya tiap langkah, tentuin pengendaliannya.</p><p><b>Izin kerja</b> (permit to work) wajib buat pekerjaan berisiko tinggi: <b>hot work</b> (las, gerinda), <b>ruang terbatas</b>, <b>ketinggian</b>, <b>listrik</b>. <b>LOTO</b> (lock out tag out) = kunci dan tandai sumber energi sebelum perbaikan.</p>'),
      U('Susun langkah bikin JSA.', ['Pilih pekerjaan yang dianalisis', 'Pecah jadi langkah-langkah', 'Identifikasi bahaya tiap langkah', 'Tentuin pengendalian tiap bahaya', 'Komunikasiin ke pekerja sebelum mulai'], 'Langkah, bahaya, pengendalian.'),
      B('Pekerjaan mana aja yang biasanya butuh izin kerja khusus? (pilih semua)', ['Ngelas di dekat tangki BBM', 'Masuk ke dalam tangki untuk dibersihin', 'Ngetik laporan di kantor', 'Ganti panel listrik bertegangan'], [0, 1, 3], 'Hot work, confined space, listrik.'),
    ]),
    L('kebakaran', 'mahir', 'Segitiga api dan APAR', 7, [
      I('Api butuh tiga hal', '<p><b>Segitiga api</b>: bahan bakar, oksigen, panas. Hilangin satu, api padam.</p><p><b>Kelas kebakaran</b> (yang umum dipakai di Indonesia): <b>A</b> bahan padat (kayu, kertas), <b>B</b> cairan dan gas mudah terbakar, <b>C</b> listrik, <b>D</b> logam.</p><p>Cara pakai APAR: <b>PASS</b>: <b>P</b>ull (tarik pin), <b>A</b>im (arahin ke pangkal api), <b>S</b>queeze (tekan tuas), <b>S</b>weep (sapu kiri kanan).</p>'),
      PS('Pasangin kebakaran dengan kelasnya.', [['Tumpukan kardus', 'Kelas A'], ['Bensin tumpah terbakar', 'Kelas B'], ['Panel listrik korsleting', 'Kelas C'], ['Serbuk magnesium', 'Kelas D']], 'Penting buat milih media pemadam.'),
      U('Urutan pakai APAR (PASS).', ['Tarik pin pengaman', 'Arahkan nozzle ke pangkal api', 'Tekan tuas', 'Sapukan ke kiri dan kanan'], 'Pull, Aim, Squeeze, Sweep.'),
      P('Api dari kebakaran listrik. Yang ga boleh dipakai?', ['Air', 'APAR CO2', 'Matiin sumber listrik dulu', 'APAR powder'], 'Air menghantarkan listrik.'),
    ]),
  ], tes: [
    T('dasar', 'Dasar hukum keselamatan kerja di Indonesia...', ['UU No. 1 Tahun 1970', 'UU Ketenagakerjaan 2003 saja', 'ISO 9001', 'Perda']),
    T('mahir', 'Cara pakai APAR disingkat...', ['PASS', 'PDCA', 'STAR', 'SMART']),
  ] })

  // ================= QC =================
  tambah('QC', { pel: [
    L('tujuhalat', 'dasar', '7 alat QC', 7, [
      I('Toolkit klasik pengendalian kualitas', '<p>1. <b>Check sheet</b>: lembar catat kejadian<br>2. <b>Histogram</b>: sebaran data<br>3. <b>Pareto</b>: urutan penyebab dari paling besar<br>4. <b>Fishbone</b> (Ishikawa): akar masalah per kategori<br>5. <b>Scatter</b>: hubungan dua variabel<br>6. <b>Control chart</b>: proses stabil atau nggak<br>7. <b>Stratifikasi</b> (atau flowchart di beberapa versi): pisahin data per kelompok</p>'),
      PS('Pasangin kebutuhan dengan alatnya.', [['Nyatet jumlah cacat per jenis tiap shift', 'Check sheet'], ['Nyari 20% penyebab yang bikin 80% cacat', 'Pareto'], ['Bedah akar masalah dari Man, Machine, Method, Material', 'Fishbone'], ['Ngecek proses keluar batas kendali atau nggak', 'Control chart']], 'Tiap alat punya tugas sendiri.'),
      P('Kategori umum di diagram fishbone manufaktur (6M) ga termasuk...', ['Marketing', 'Man', 'Machine', 'Material'], '6M: Man, Machine, Method, Material, Measurement, Mother nature (lingkungan).'),
    ]),
    L('kontrol', 'menengah', 'Control chart', 7, [
      I('Proses stabil atau ngaco?', '<p>Control chart punya <b>garis tengah</b> (rata-rata), <b>UCL</b> (batas kendali atas), dan <b>LCL</b> (batas kendali bawah), biasanya ±3 standar deviasi.</p><p>Tanda proses ga stabil: titik keluar UCL/LCL, atau pola aneh, misalnya <b>7 titik berturut-turut</b> di satu sisi garis tengah.</p><p>Batas kendali (dari data proses) beda dengan <b>batas spesifikasi</b> (dari pelanggan).</p>'),
      P('Berat kemasan: rata-rata 500 g, UCL 506, LCL 494. Ada sampel 508 g. Artinya?', ['Proses keluar kendali, cari penyebab khusus', 'Normal aja', 'Pelanggan pasti komplain', 'UCL harus dinaikin'], 'Titik di luar batas = sinyal.'),
      P('8 titik berturut-turut di atas garis tengah (masih di dalam batas). Artinya?', ['Ada pergeseran proses, perlu diselidiki', 'Bagus, makin berat makin baik', 'Abaikan karena masih dalam batas', 'Data salah'], 'Pola run juga sinyal.'),
    ]),
    L('limaes', 'dasar', '5S dan Kaizen', 6, [
      I('Tempat kerja rapi = kualitas naik', '<p><b>5S</b>: <b>Seiri</b> (ringkas, buang yang ga perlu), <b>Seiton</b> (rapi, tiap barang ada tempatnya), <b>Seiso</b> (resik), <b>Seiketsu</b> (rawat, standarisasi), <b>Shitsuke</b> (rajin, jadi kebiasaan). Di Indonesia dikenal sebagai 5R.</p><p><b>Kaizen</b> = perbaikan kecil terus-menerus yang melibatkan semua orang.</p>'),
      U('Urutan 5S.', ['Seiri (ringkas)', 'Seiton (rapi)', 'Seiso (resik)', 'Seiketsu (rawat)', 'Shitsuke (rajin)'], 'Pilah, tata, bersihin, standarisasi, biasakan.'),
      PS('Pasangin aktivitas dengan S-nya.', [['Buang alat rusak yang ga dipakai', 'Seiri'], ['Bikin garis lantai buat posisi troli', 'Seiton'], ['Bersihin mesin tiap akhir shift', 'Seiso'], ['Audit 5S tiap Jumat', 'Shitsuke']], 'Seiketsu = bikin standarnya.'),
    ]),
    L('dmaic', 'mahir', 'Six Sigma DMAIC', 8, [
      I('Perbaikan berbasis data', '<p><b>DMAIC</b>: <b>Define</b> (rumuskan masalah dan target), <b>Measure</b> (ukur kondisi sekarang), <b>Analyze</b> (cari akar penyebab), <b>Improve</b> (terapin solusi), <b>Control</b> (jaga biar ga balik lagi).</p><p>Six Sigma nargetin sekitar 3,4 cacat per sejuta kesempatan. Ukuran yang sering dipakai: <b>DPMO</b> = cacat ÷ (unit × kesempatan cacat per unit) × 1.000.000.</p>'),
      U('Urutan DMAIC.', ['Define', 'Measure', 'Analyze', 'Improve', 'Control'], 'D-M-A-I-C.'),
      A('1.000 unit, tiap unit 5 kesempatan cacat, ketemu 25 cacat. DPMO-nya?', 5000, '25 ÷ (1.000 × 5) × 1.000.000 = 5.000.'),
      PS('Pasangin aktivitas dengan tahap DMAIC.', [['Bikin control chart dan SOP baru', 'Control'], ['Pakai fishbone dan 5 Why', 'Analyze'], ['Ngumpulin data cacat 2 minggu', 'Measure'], ['Uji coba setelan mesin baru', 'Improve']], 'Tiap tahap punya alat khasnya.'),
    ]),
  ], tes: [
    T('dasar', 'Diagram yang ngurutin penyebab dari paling besar...', ['Pareto', 'Scatter', 'Fishbone', 'Histogram']),
    T('mahir', 'DMAIC dipakai di...', ['Six Sigma', 'Akuntansi', 'SEO', 'K3 doang']),
  ] })

  // ================= PROJECT MANAGEMENT =================
  tambah('PM', { pel: [
    L('wbs', 'dasar', 'WBS: pecah proyek jadi tugas', 6, [
      I('Gajah dimakan sepotong-sepotong', '<p><b>WBS</b> (Work Breakdown Structure) memecah proyek besar jadi deliverable, terus jadi tugas kecil yang bisa dikerjain dan diperkirakan waktunya.</p><p>Patokan umum: tugas terkecil bisa selesai dalam beberapa hari dan jelas siapa yang ngerjain.</p>'),
      U('Susun WBS acara webinar dari level atas ke bawah.', ['Webinar karier', 'Persiapan materi', 'Hubungi pembicara', 'Kirim brief ke pembicara H-7'], 'Proyek → deliverable → paket kerja → tugas.'),
      P('Tugas yang terlalu besar di WBS, contohnya...', ['"Sukseskan acara"', '"Pesan Zoom Pro"', '"Bikin poster"', '"Kirim undangan email"'], 'Ga jelas kapan selesainya.'),
    ]),
    L('jalurkritis', 'menengah', 'Gantt chart dan jalur kritis', 8, [
      I('Tugas mana yang ga boleh telat?', '<p><b>Gantt chart</b> nampilin tugas sebagai batang di garis waktu. Ada <b>ketergantungan</b>: B baru bisa mulai setelah A selesai.</p><p><b>Jalur kritis</b> = rangkaian tugas terpanjang. Durasi proyek = panjang jalur kritis. Telat sehari di jalur kritis = proyek telat sehari.</p>'),
      A('Tugas: A (3 hari) → B (4 hari) → D (2 hari). Paralel: A → C (2 hari) → D. Durasi proyek minimal (hari)?', 9, 'Jalur A-B-D = 3+4+2 = 9, lebih panjang dari A-C-D = 7.'),
      P('Di soal tadi, tugas mana yang punya waktu longgar (slack)?', ['C', 'A', 'B', 'D'], 'C bisa telat 2 hari tanpa ganggu proyek.'),
    ]),
    L('scrum', 'menengah', 'Scrum: sprint dan perannya', 7, [
      I('Kerja per sprint', '<p>Peran: <b>Product Owner</b> (ngatur prioritas backlog), <b>Scrum Master</b> (fasilitator, ngilangin hambatan), <b>Developers</b> (yang ngerjain).</p><p>Acara: <b>Sprint planning</b>, <b>Daily scrum</b> (15 menit), <b>Sprint review</b> (demo hasil), <b>Retrospective</b> (evaluasi cara kerja). Sprint biasanya 1 sampai 4 minggu.</p>'),
      PS('Pasangin peran dengan tugasnya.', [['Product Owner', 'Nentuin prioritas product backlog'], ['Scrum Master', 'Bantu tim ngilangin hambatan'], ['Developers', 'Ngerjain item sprint sampai jadi'], ['Stakeholder', 'Kasih masukan pas sprint review']], 'Tiga peran inti plus pemangku kepentingan.'),
      U('Urutan acara dalam satu sprint.', ['Sprint planning', 'Daily scrum (tiap hari)', 'Sprint review', 'Sprint retrospective'], 'Rencana, kerja, demo, evaluasi.'),
    ]),
    L('risikopm', 'mahir', 'Manajemen risiko dan RACI', 7, [
      I('Siapin sebelum kejadian', '<p><b>Risk register</b>: daftar risiko, <b>peluang</b> × <b>dampak</b>, dan respons: <b>hindari</b>, <b>kurangi</b>, <b>alihkan</b> (misal asuransi), atau <b>terima</b>.</p><p><b>RACI</b> buat kejelasan peran: <b>R</b>esponsible (ngerjain), <b>A</b>ccountable (penanggung jawab akhir, cuma satu orang), <b>C</b>onsulted (dimintai pendapat), <b>I</b>nformed (dikabarin).</p>'),
      PS('Pasangin risiko dengan respons yang paling cocok.', [['Vendor katering bisa batal mendadak', 'Siapin vendor cadangan (kurangi)'], ['Hujan di acara outdoor', 'Pindah ke indoor (hindari)'], ['Kerusakan alat sewaan', 'Asuransi atau deposit (alihkan)'], ['Peserta telat 5 menit', 'Terima, kasih jeda di rundown']], 'Empat strategi respons risiko.'),
      P('Di RACI, "Accountable" sebaiknya dipegang...', ['Satu orang', 'Semua anggota tim', 'Klien', 'Ga perlu ada'], 'Satu penanggung jawab akhir biar jelas.'),
    ]),
  ], tes: [
    T('dasar', 'WBS gunanya...', ['Mecah proyek jadi tugas kecil', 'Ngitung gaji', 'Bikin logo', 'Rapat harian']),
    T('mahir', 'Durasi proyek ditentuin oleh...', ['Jalur kritis', 'Tugas paling pendek', 'Jumlah anggota tim', 'Rapat pertama']),
  ] })

  // ================= ADMINISTRASI =================
  tambah('AD', { pel: [
    L('suratdinas', 'dasar', 'Struktur surat dinas', 7, [
      I('Bagian surat resmi', '<p>Urutan umum: <b>kop surat</b>, <b>nomor, lampiran, perihal</b>, <b>tanggal</b>, <b>alamat tujuan</b>, <b>salam pembuka</b>, <b>isi</b> (pembuka, inti, penutup), <b>salam penutup</b>, <b>tanda tangan dan nama jelas</b>, <b>tembusan</b> kalau perlu.</p><p>Bahasa resmi, kalimat efektif, ga bertele-tele. Contoh nomor: 012/HRD/XI/2026.</p>'),
      U('Susun bagian surat dinas dari atas.', ['Kop surat', 'Nomor, lampiran, perihal', 'Alamat tujuan', 'Salam pembuka dan isi', 'Salam penutup dan tanda tangan', 'Tembusan'], 'Format umum surat dinas.'),
      P('Penulisan salam pembuka surat resmi yang tepat?', ['Dengan hormat,', 'Hai Pak,', 'Dengan Hormat!', 'Assalamualaikum Wr. Wb. (wajib di semua surat)'], '"Dengan hormat," diikuti koma.'),
    ]),
    L('arsipsistem', 'menengah', 'Sistem kearsipan', 6, [
      I('Biar dokumen gampang dicari', '<p>Sistem penyimpanan umum: <b>abjad</b> (nama), <b>kronologis</b> (tanggal), <b>nomor</b>, <b>subjek/masalah</b>, dan <b>wilayah</b>.</p><p>Arsip <b>aktif</b> masih sering dipakai, <b>inaktif</b> udah jarang. Arsip digital pakai penamaan file konsisten, misalnya <code>2026-11-22_SuratPenawaran_PTMaju.pdf</code>.</p>'),
      PS('Pasangin dokumen dengan sistem penyimpanan paling cocok.', [['Data pelanggan per nama', 'Abjad'], ['Faktur harian', 'Kronologis'], ['Laporan per cabang provinsi', 'Wilayah'], ['Dokumen per topik (pajak, kontrak, SDM)', 'Subjek']], 'Pilih berdasarkan cara dokumen dicari.'),
      P('Nama file paling rapi?', ['2026-11-22_Notulen_RapatAnggaran.docx', 'notulen baru fix banget (2).docx', 'Dokumen1.docx', 'rapat.docx'], 'Tanggal di depan biar urut otomatis.'),
    ]),
    L('tindaklanjut', 'menengah', 'Notulen yang bisa ditindaklanjuti', 7, [
      I('Notulen yang berguna', '<p>Isi minimal: <b>judul rapat, tanggal, peserta</b>, <b>agenda</b>, <b>poin pembahasan singkat</b>, <b>keputusan</b>, dan <b>tindak lanjut</b> (siapa, ngapain, kapan).</p><p>Jangan nulis semua omongan. Fokus ke keputusan dan action item. Kirim maksimal 1×24 jam setelah rapat.</p>'),
      B('Mana aja yang wajib ada di notulen? (pilih semua)', ['Keputusan rapat', 'Tindak lanjut dengan PIC dan tenggat', 'Semua candaan peserta', 'Daftar peserta'], [0, 1, 3], 'Fokus ke yang bisa ditindaklanjuti.'),
      P('Action item paling jelas?', ['"Dina kirim draf proposal ke Pak Arif, Jumat 28 Nov"', '"Proposal dikerjain"', '"Nanti dibahas lagi"', '"Tim marketing follow up"'], 'Siapa, ngapain, kapan.'),
    ]),
    L('jadwal', 'mahir', 'Ngatur jadwal dan perjalanan dinas', 6, [
      I('Admin andalan atasan', '<p>Kalender bersama (Google Calendar, Outlook): kasih <b>buffer</b> antar rapat, cek <b>zona waktu</b> buat rapat luar kota, dan lampirin link atau dokumen di undangan.</p><p>Perjalanan dinas: itinerary (jadwal, tiket, hotel, kontak), uang muka, dan setelahnya <b>laporan pertanggungjawaban</b> dengan bukti.</p>'),
      A('Rapat jam 14.00 WIB sama klien di Makassar (WITA). Di Makassar itu jam berapa? (tulis angka jamnya)', 15, 'WITA = WIB + 1 jam.'),
      SK('Atasan dijadwalin dua rapat penting di jam yang sama. Kamu...', [['Kabarin atasan, usulin satu dijadwal ulang sambil siapin opsi waktu', 2, 'Proaktif dan ngasih solusi.'], ['Pilih sendiri yang menurut kamu penting', 0, 'Bukan keputusan kamu.'], ['Diemin, nanti beliau milih sendiri', 0, 'Bisa bikin malu di depan klien.']]),
    ]),
  ], tes: [
    T('dasar', 'Salam pembuka surat resmi...', ['Dengan hormat,', 'Halo,', 'Yth. teman', 'Selamat pagi!']),
    T('mahir', 'Action item notulen yang baik memuat...', ['Siapa, apa, kapan', 'Semua obrolan', 'Opini notulis', 'Nama rapat doang']),
  ] })

  // ================= KOMUNIKASI =================
  tambah('KM', { pel: [
    L('strukturpres', 'dasar', 'Struktur presentasi', 6, [
      I('Buka, isi, tutup', '<p><b>Pembuka</b>: tarik perhatian (pertanyaan, data mengejutkan, cerita singkat) + kasih tau poin yang bakal dibahas.<br><b>Isi</b>: maksimal 3 poin utama, tiap poin ada bukti atau contoh.<br><b>Penutup</b>: ringkas ulang dan ajakan atau langkah berikutnya.</p><p>Aturan praktis: <b>kesimpulan di awal</b> buat audiens sibuk (atasan).</p>'),
      U('Urutin presentasi hasil magang 5 menit.', ['Pembuka: satu angka hasil paling besar', 'Konteks singkat proyeknya', '3 poin yang kamu kerjain dan hasilnya', 'Pelajaran yang kamu dapet', 'Penutup dan terima kasih'], 'Hasil dulu, detail belakangan.'),
      P('Presentasi ke direktur yang cuma punya 5 menit. Mulai dari...', ['Kesimpulan dan rekomendasi', 'Latar belakang panjang', 'Daftar isi', 'Ucapan terima kasih'], 'Bottom line up front.'),
    ]),
    L('slide', 'menengah', 'Slide yang ga bikin ngantuk', 6, [
      I('Slide pendukung, bukan naskah', '<p>Satu slide, satu pesan. Judul slide = kalimat kesimpulan. Teks sedikit (patokan populer: maksimal sekitar 6 baris, 6 kata per baris). Pakai gambar atau grafik yang relevan, ukuran huruf minimal sekitar 24 pt.</p><p>Jangan baca slide. Audiens bisa baca sendiri lebih cepat dari kamu ngomong.</p>'),
      B('Mana aja kebiasaan slide yang buruk? (pilih semua)', ['Paragraf penuh di satu slide', 'Baca slide kata per kata', 'Judul berupa kesimpulan', 'Lima jenis font berbeda'], [0, 1, 3], 'Judul kesimpulan justru bagus.'),
      P('Judul slide paling efektif?', ['"Biaya kirim turun 15% setelah ganti kurir"', '"Data biaya"', '"Slide 7"', '"Analisis"'], 'Judul = pesan utama slide.'),
    ]),
    L('fgd', 'menengah', 'FGD dan diskusi kelompok', 7, [
      I('Yang dinilai bukan yang paling keras', '<p>Di <b>FGD</b> rekrutmen, asesor biasanya nilai: kontribusi ide, cara nanggepin orang lain, kemampuan nyimpulin, dan kerja sama. Yang mendominasi atau yang diem sama-sama rugi.</p><p>Kalimat berguna: "Saya setuju dengan Mas Budi, dan mau nambahin...", "Biar fokus, gimana kalau kita sepakati kriterianya dulu?", "Jadi sejauh ini kita sepakat..."</p>'),
      SK('FGD 20 menit, diskusi muter-muter tanpa kesimpulan. Kamu...', [['Usulin rangkum poin yang udah disepakati dan tentuin kriteria keputusan', 2, 'Nunjukin kepemimpinan tanpa dominasi.'], ['Diam biar ga salah ngomong', 0, 'Ga ada kontribusi yang bisa dinilai.'], ['Ngotot ide kamu yang paling bener', 0, 'Keliatan ga bisa kerja sama.']]),
      P('Ada peserta yang dari tadi diem. Langkah yang dinilai positif?', ['"Mbak Sari, dari sisi kamu gimana?"', 'Abaikan aja', 'Ngomong lebih keras', 'Ngeluh ke asesor'], 'Ngajak orang lain ikut = kerja sama.'),
    ]),
    L('feedbackkm', 'mahir', 'Ngasih dan nerima feedback', 6, [
      I('Model SBI', '<p><b>S</b>ituation (kapan, di mana), <b>B</b>ehavior (perilaku spesifik yang keliatan), <b>I</b>mpact (dampaknya). Contoh: "Di rapat Senin tadi (S), kamu motong presentasi Rina dua kali (B), jadi dia ga sempet jelasin datanya (I)."</p><p>Nerima feedback: dengerin dulu, tanya buat ngerti, terima kasih, baru putusin mau ngapain. Jangan langsung defensif.</p>'),
      PS('Pasangin bagian SBI.', [['"Di presentasi klien kemarin"', 'Situation'], ['"kamu ngejawab pertanyaan harga dengan angka yang tepat"', 'Behavior'], ['"jadi klien langsung setuju lanjut ke kontrak"', 'Impact']], 'SBI juga dipakai buat pujian.'),
      SK('Atasan bilang laporanmu kepanjangan dan susah dibaca. Respon terbaik?', [['"Makasih Pak. Boleh tau bagian mana yang paling susah dibaca? Saya bikin versi ringkas sore ini."', 2, 'Terbuka, nanya spesifik, ada tindak lanjut.'], ['"Tapi semua datanya penting, Pak."', 0, 'Defensif.'], ['Diam lalu ga ngubah apa-apa.', 0, 'Kesannya ga peduli.']]),
    ]),
  ], tes: [
    T('dasar', 'Presentasi ke atasan sibuk sebaiknya mulai dari...', ['Kesimpulan', 'Latar belakang', 'Daftar isi', 'Perkenalan panjang']),
    T('mahir', 'Model feedback SBI singkatan dari...', ['Situation, Behavior, Impact', 'Start, Build, Improve', 'Speak, Bold, Inform', 'Strength, Balance, Idea']),
  ] })

  // ================= PSIKOTES =================
  tambah('PS', { pel: [
    L('rbb', 'dasar', 'Peta tes Rekrutmen Bersama BUMN', 6, [
      I('Tahapan yang biasanya dilewatin', '<p>Pola yang sering dipakai di Rekrutmen Bersama BUMN beberapa tahun terakhir (cek pengumuman resmi tiap tahun karena bisa berubah):</p><p><b>Tes online tahap 1</b>: <b>TKD</b> (kemampuan dasar: verbal, numerik, logika), <b>Tes AKHLAK</b> (core values BUMN), dan <b>TWK</b> (wawasan kebangsaan).<br><b>Tes online tahap 2</b>: Bahasa Inggris dan <b>Learning Agility</b>.<br><b>Tes Kemampuan Bidang</b> di BUMN masing-masing: psikotes, wawancara, kesehatan, dan lain-lain.</p>'),
      PS('Pasangin tes dengan isinya.', [['TKD', 'Verbal, numerik, dan logika'], ['Tes AKHLAK', 'Nilai budaya kerja BUMN'], ['TWK', 'Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika'], ['Learning Agility', 'Kemampuan belajar dan adaptasi']], 'Kisi-kisi umum RBB.'),
      P('AKHLAK itu singkatan nilai...', ['Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif', 'Aktif, Kreatif, Hemat, Loyal, Aman, Kuat', 'Amanah, Kerja keras, Hormat, Lulus, Aktif, Komitmen', 'Ga ada singkatannya'], 'Core values BUMN sejak 2020.'),
    ]),
    L('akhlak', 'menengah', 'Soal situasi AKHLAK', 8, [
      I('Soal perilaku kerja', '<p>Soal AKHLAK biasanya berupa situasi kerja dengan pilihan respons. Pilihan terbaik umumnya: <b>jujur dan bisa dipercaya</b> (Amanah), <b>terus belajar</b> (Kompeten), <b>peduli dan menghargai</b> (Harmonis), <b>mengutamakan organisasi</b> (Loyal), <b>terbuka sama perubahan</b> (Adaptif), dan <b>kerja sama</b> (Kolaboratif).</p><p>Hindari pilihan yang ekstrem, pasif, atau ngorbanin aturan demi hasil.</p>'),
      SK('Kamu nemu rekan satu tim mark-up kuitansi perjalanan dinas. Paling sesuai AKHLAK?', [['Ingetin dia baik-baik, kalau tetap dilakukan laporkan sesuai prosedur', 2, 'Amanah dan tetap menjaga hubungan.'], ['Diemin karena teman sendiri', 0, 'Ga amanah.'], ['Sebarin ke grup kantor', 0, 'Ga harmonis dan ga sesuai prosedur.']]),
      SK('Kantor ganti sistem aplikasi baru, kamu belum paham. Kamu...', [['Ikut pelatihan dan cari tau sendiri, bantu rekan yang juga kesulitan', 2, 'Adaptif dan kolaboratif.'], ['Tetap pakai cara lama diam-diam', 0, 'Ga adaptif.'], ['Ngeluh ke atasan sistemnya ribet', 1, 'Wajar menyampaikan, tapi belum ada usaha.']]),
      SK('Target tim terancam karena satu anggota sakit. Kamu...', [['Nawarin ambil sebagian tugasnya sambil koordinasi dengan atasan', 2, 'Kolaboratif dan loyal ke tujuan tim.'], ['Fokus ke tugas sendiri aja', 1, 'Ga salah, tapi kurang kolaboratif.'], ['Nyalahin dia di rapat', 0, 'Ga harmonis.']]),
    ]),
    L('twk', 'menengah', 'Wawasan kebangsaan dasar', 7, [
      I('Materi TWK yang sering keluar', '<p><b>Pancasila</b> ditetapkan 18 Agustus 1945 bersama UUD 1945. Hari Lahir Pancasila diperingati tiap <b>1 Juni</b> (pidato Soekarno 1945).<br><b>UUD 1945</b> udah diamandemen <b>4 kali</b> (1999 sampai 2002).<br><b>Bhinneka Tunggal Ika</b> dari kitab Sutasoma karya Mpu Tantular.<br><b>Empat pilar kebangsaan</b>: Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika.</p>'),
      P('UUD 1945 udah diamandemen berapa kali?', ['4 kali', '1 kali', '2 kali', 'Belum pernah'], 'Tahun 1999, 2000, 2001, 2002.'),
      P('Semboyan Bhinneka Tunggal Ika berasal dari kitab...', ['Sutasoma', 'Negarakertagama', 'Pararaton', 'Arjunawiwaha'], 'Karya Mpu Tantular.'),
      P('Hari Lahir Pancasila diperingati tanggal...', ['1 Juni', '17 Agustus', '18 Agustus', '1 Oktober'], '1 Oktober = Hari Kesaktian Pancasila.'),
    ]),
    L('analitis', 'mahir', 'Penalaran analitis', 8, [
      I('Soal susun posisi', '<p>Soal analitis kasih beberapa syarat dan minta urutan atau posisi. Caranya: <b>tulis syarat pasti dulu</b>, gambar kotak posisi, isi yang paling ketat, baru sisanya.</p><p>Contoh: 5 orang duduk sebaris (1 sampai 5). Ani di ujung kiri. Budi tepat di sebelah kanan Ani. Cici di tengah. Dedi ga di ujung. Eka di mana?</p>'),
      P('Dari contoh tadi: Ani posisi 1, Budi 2, Cici 3. Dedi ga di ujung. Eka di posisi...', ['5', '4', '2', '1'], 'Sisa posisi 4 dan 5. Dedi ga di ujung → Dedi 4, Eka 5.'),
      P('Semua manajer ikut rapat. Sebagian yang ikut rapat adalah staf baru. Kesimpulan yang pasti benar?', ['Ga bisa dipastiin ada manajer yang staf baru', 'Semua staf baru manajer', 'Sebagian manajer staf baru', 'Ga ada manajer yang staf baru'], 'Silogisme: "sebagian" ga ngehubungin dua kelompok secara pasti.'),
      A('Rapat dimulai 13.45 dan selesai 15.20. Berapa menit rapatnya?', 95, '13.45 → 15.45 = 120 menit, dikurangi 25 = 95 menit.'),
    ]),
  ], tes: [
    T('dasar', 'Core values BUMN disingkat...', ['AKHLAK', 'BerAKHLAK', 'PANCA', 'SIGAP']),
    T('mahir', 'Amandemen UUD 1945 terjadi berapa kali?', ['4', '2', '3', '5']),
  ] })

  // ================= INTERVIEW =================
  tambah('IV', { pel: [
    L('kelemahan', 'menengah', 'Jawab "Apa kelemahan kamu?"', 6, [
      I('Jujur tapi ada progres', '<p>Rumus: <b>kelemahan nyata</b> (bukan pujian terselubung kayak "terlalu perfeksionis") + <b>contoh singkat</b> + <b>usaha perbaikan</b> + <b>hasilnya sejauh ini</b>.</p><p>Hindari kelemahan yang jadi inti pekerjaan (misalnya "ga teliti" buat posisi akuntan).</p>'),
      SK('Melamar data analyst, ditanya kelemahan. Jawaban terbaik?', [['"Dulu saya kurang nyaman presentasi. Saya ikut jadi pembicara di 3 seminar kampus, sekarang udah lebih lancar walau masih latihan."', 2, 'Nyata, ada usaha, ada hasil.'], ['"Saya terlalu perfeksionis."', 0, 'Klise dan kesannya ngeles.'], ['"Saya kurang teliti sama angka."', 0, 'Kelemahan fatal buat posisi data.']]),
    ]),
    L('gaji', 'menengah', 'Ngomongin ekspektasi gaji', 7, [
      I('Riset dulu, baru sebut angka', '<p>Sebelum interview, riset kisaran gaji posisi itu (situs lowongan, laporan gaji, alumni). Sebut <b>rentang</b> yang masuk akal dan bilang masih terbuka diskusi soal total paket (tunjangan, BPJS, pelatihan).</p><p>Kalau ditanya duluan dan belum yakin, boleh balik nanya: "Boleh tau kisaran yang disiapin untuk posisi ini?"</p>'),
      SK('HR nanya ekspektasi gaji di interview pertama. Kamu...', [['"Berdasarkan riset saya untuk posisi ini di Jakarta, kisarannya Rp6 sampai 7 juta, tapi saya terbuka diskusi soal total paketnya."', 2, 'Ada dasar, rentang, dan fleksibel.'], ['"Terserah perusahaan aja."', 0, 'Kesannya ga tau nilai diri.'], ['"Minimal 15 juta" tanpa alasan.', 0, 'Bisa langsung gugur kalau jauh dari kisaran.']]),
      P('Komponen yang sering dihitung selain gaji pokok?', ['Tunjangan, BPJS, bonus, pelatihan', 'Warna seragam', 'Jumlah meja', 'Jam pulang teman'], 'Liat total paket.'),
    ]),
    L('tanyabalik', 'dasar', 'Pertanyaan balik di akhir interview', 5, [
      I('"Ada yang mau ditanyain?"', '<p>Jangan jawab "Ga ada." Siapin 2 sampai 3 pertanyaan yang nunjukin minat, misalnya: tantangan terbesar posisi ini di 3 bulan pertama, cara tim ngukur keberhasilan, atau tahap seleksi berikutnya.</p><p>Hindari nanya hal yang gampang dicari di situs perusahaan, atau langsung nanya cuti dan gaji di interview pertama.</p>'),
      B('Pertanyaan balik mana aja yang bagus? (pilih semua)', ['"Seperti apa sukses di posisi ini setelah 6 bulan?"', '"Tantangan terbesar tim saat ini apa?"', '"Perusahaan ini bergerak di bidang apa?"', '"Tahap seleksi selanjutnya seperti apa?"'], [0, 1, 3], 'Bidang perusahaan harusnya udah kamu riset.'),
    ]),
    L('online', 'menengah', 'Interview online dan rekaman video', 6, [
      I('Teknis yang sering ngegagalin', '<p>Cek koneksi, kamera sejajar mata, cahaya dari depan (bukan dari belakang), latar rapi, notifikasi dimatiin. Masuk 5 menit lebih awal.</p><p>Interview rekaman (asynchronous): biasanya ada waktu persiapan singkat dan jawaban 1 sampai 3 menit. Pakai struktur STAR dan liat ke kamera, bukan ke layar.</p>'),
      B('Persiapan interview online yang penting? (pilih semua)', ['Kamera sejajar mata', 'Duduk membelakangi jendela terang', 'Notifikasi HP dan laptop dimatiin', 'Tes link dan mic sebelum mulai'], [0, 2, 3], 'Membelakangi jendela bikin wajah gelap.'),
      SK('Koneksi putus di tengah jawaban. Kamu...', [['Masuk lagi secepatnya, minta maaf singkat, lanjut dari poin terakhir', 2, 'Tenang dan profesional.'], ['Panik dan ga masuk lagi', 0, 'Kehilangan kesempatan.'], ['Nyalahin provider panjang lebar', 0, 'Buang waktu.']]),
    ]),
  ], tes: [
    T('menengah', 'Jawaban "kelemahan" paling baik...', ['Kelemahan nyata + usaha perbaikan + hasil', '"Terlalu perfeksionis"', '"Ga ada kelemahan"', 'Kelemahan inti pekerjaan']),
    T('dasar', 'Di akhir interview ditanya "ada pertanyaan?", sebaiknya...', ['Siapin 2 sampai 3 pertanyaan bermutu', 'Bilang ga ada', 'Nanya cuti', 'Langsung pulang']),
  ] })

  // ================= CV =================
  tambah('CV', { pel: [
    L('xyz', 'menengah', 'Rumus XYZ buat bullet CV', 7, [
      I('Rumus XYZ', '<p>Format yang dipopulerin rekruter Google: <b>"Mencapai [X] diukur dengan [Y], dengan cara [Z]"</b>. Mulai pakai <b>kata kerja aktif</b>: menganalisis, menyusun, memimpin, meningkatkan.</p><p>Kalau ga ada angka besar, angka kecil pun membantu: jumlah peserta, data yang diolah, waktu yang dihemat.</p>'),
      P('Bullet CV paling kuat?', ['"Menganalisis 12.000 baris data penjualan pakai Excel, nemuin 3 produk penyumbang 60% retur"', '"Bertanggung jawab atas data"', '"Membantu tim"', '"Pekerja keras dan jujur"'], 'Kata kerja + skala + hasil.'),
      W('Tulis ulang satu pengalaman kamu (organisasi, magang, proyek kuliah) jadi 2 bullet point pakai rumus XYZ.', 25, ['Diawali kata kerja aktif', 'Ada angka atau skala', 'Ada hasil atau dampak', 'Jujur, ga dilebih-lebihin'], 'Kasih feedback 2 bullet CV ini pakai rumus XYZ. Jangan menambah klaim yang ga ada di teks. Kasih saran perbaikan kata kerja dan cara nunjukin hasil:'),
    ]),
    L('linkedin', 'menengah', 'Profil LinkedIn yang dilirik', 6, [
      I('Etalase online kamu', '<p><b>Headline</b> jangan cuma "Fresh Graduate". Contoh: "Fresh Graduate Meteorologi | Data Analysis, Python, Excel". <b>About</b>: 3 sampai 5 kalimat soal fokus, skill, dan yang dicari. <b>Featured</b>: pajang portofolio.</p><p>Aktifin <b>Open to Work</b> (bisa cuma keliatan rekruter), sesuaiin URL profil, dan pakai kata kunci yang sama dengan loker incaran.</p>'),
      P('Headline LinkedIn paling efektif?', ['"Fresh Graduate Statistika | SQL, Excel, Power BI | Open to Data Analyst roles"', '"Mahasiswa"', '"Looking for job"', '"Orang biasa"'], 'Ada bidang, skill, dan target.'),
      B('Bagian LinkedIn yang penting dioptimasi? (pilih semua)', ['Headline', 'About', 'Featured (portofolio)', 'Jumlah emoji di nama'], [0, 1, 2], 'Emoji di nama malah keliatan kurang profesional.'),
    ]),
    L('porto', 'mahir', 'Portofolio yang meyakinkan', 7, [
      I('Tunjukin, jangan cuma bilang', '<p>Portofolio bagus nyeritain <b>masalah, data, proses, hasil</b>. Untuk data analyst: notebook atau dashboard dengan dataset publik dan kesimpulan bisnis. Untuk desainer: case study dari riset sampai desain akhir.</p><p>Taruh di GitHub, Notion, situs pribadi, atau Featured LinkedIn. 2 sampai 3 proyek yang rapi lebih baik dari 10 yang setengah jadi.</p>'),
      U('Susun struktur case study portofolio.', ['Masalah atau pertanyaan bisnis', 'Data dan sumbernya', 'Proses analisis atau desain', 'Hasil dan temuan', 'Rekomendasi dan pelajaran'], 'Masalah dulu, alat belakangan.'),
      P('Mana yang paling meyakinkan buat rekruter?', ['2 proyek rapi dengan kesimpulan jelas', '15 proyek tutorial yang belum selesai', 'Sertifikat online doang', 'Daftar skill tanpa bukti'], 'Kualitas ngalahin kuantitas.'),
    ]),
    L('cover', 'menengah', 'Cover letter singkat', 6, [
      I('3 paragraf cukup', '<p><b>Paragraf 1</b>: posisi yang dilamar dan kenapa tertarik sama perusahaan itu (spesifik). <b>Paragraf 2</b>: 1 sampai 2 bukti paling relevan dari pengalaman. <b>Paragraf 3</b>: penutup dan ajakan interview.</p><p>Maksimal 1 halaman. Sesuaiin tiap perusahaan, jangan template yang sama persis.</p>'),
      U('Urutan isi cover letter.', ['Posisi yang dilamar dan alasan tertarik', 'Bukti paling relevan dari pengalaman', 'Penutup dan harapan interview'], 'Singkat dan spesifik.'),
      P('Kesalahan cover letter paling umum?', ['Template sama dikirim ke semua perusahaan', 'Terlalu singkat 3 paragraf', 'Nyebut posisi yang dilamar', 'Pakai bahasa sopan'], 'Rekruter bisa ngerasain template generik.'),
    ]),
  ], tes: [
    T('menengah', 'Rumus XYZ buat bullet CV...', ['Mencapai X diukur dengan Y dengan cara Z', 'Nama, umur, alamat', 'Skill, hobi, cita-cita', 'Foto, tanda tangan, cap']),
    T('mahir', 'Portofolio yang baik nyeritain...', ['Masalah, data, proses, hasil', 'Daftar sertifikat', 'Foto kegiatan', 'IPK']),
  ] })

  // ================= ENGLISH =================
  tambah('EN', { pel: [
    L('emailen', 'menengah', 'Email kerja dalam bahasa Inggris', 7, [
      I('Struktur dan frasa siap pakai', '<p>Pembuka: <i>Dear Mr. Tan,</i> / <i>Hi Sarah,</i> (kalau udah akrab). Kalimat pertama: <i>I am writing to...</i>, <i>I hope this email finds you well.</i></p><p>Minta tolong: <i>Could you please...?</i> Lampiran: <i>Please find attached...</i> Penutup: <i>I look forward to hearing from you.</i> lalu <i>Best regards,</i></p>'),
      PS('Pasangin tujuan dengan frasanya.', [['Ngasih lampiran', 'Please find attached the report.'], ['Minta tolong dengan sopan', 'Could you please confirm the schedule?'], ['Nutup email resmi', 'I look forward to hearing from you.'], ['Minta maaf telat bales', 'Apologies for the late reply.']], 'Frasa paling sering dipakai di email kantor.'),
      P('Penutup email paling umum dan aman?', ['Best regards,', 'Love,', 'Bye bye,', 'XOXO,'], 'Netral dan profesional.'),
    ]),
    L('meeting', 'menengah', 'Frasa rapat dan presentasi', 6, [
      I('Biar ga kaku pas meeting', '<p>Setuju: <i>I agree with...</i>, <i>That makes sense.</i> Ga setuju dengan sopan: <i>I see your point, but...</i> Minta ulang: <i>Could you repeat that, please?</i> Nyela sopan: <i>Sorry to interrupt, but...</i></p><p>Presentasi: <i>Today I\'d like to talk about...</i>, <i>Let\'s move on to...</i>, <i>To sum up...</i>, <i>Any questions?</i></p>'),
      PS('Pasangin situasi dengan frasanya.', [['Ga denger jelas', 'Could you repeat that, please?'], ['Ga setuju dengan sopan', 'I see your point, but...'], ['Pindah ke poin berikutnya', 'Let\'s move on to the next point.'], ['Nyimpulin', 'To sum up, ...']], 'Bahasa rapat sehari-hari.'),
    ]),
    L('tenses', 'dasar', 'Tenses buat interview', 7, [
      I('Tiga tenses paling kepake', '<p><b>Present simple</b> buat fakta dan kebiasaan: <i>I work well under pressure.</i><br><b>Past simple</b> buat pengalaman yang udah selesai (wajib di STAR): <i>I led a team of five.</i><br><b>Present perfect</b> buat pengalaman sampai sekarang: <i>I have used Python for two years.</i></p>'),
      P('Cerita proyek kuliah yang udah selesai: "I ___ a survey of 200 students."', ['conducted', 'conduct', 'have conducting', 'am conduct'], 'Pengalaman selesai = past simple.'),
      P('"I ___ Excel since 2023."', ['have used', 'use', 'used', 'am using since'], 'Since + sampai sekarang = present perfect.'),
      P('"Tell me about yourself." Kalimat pembuka paling pas?', ['"I am a recent graduate in Meteorology with a strong interest in data analysis."', '"I was born in..."', '"My hobby is sleeping."', '"I am very very hardworking."'], 'Langsung ke profil profesional.'),
    ]),
    L('vocab', 'dasar', 'Kosakata kerja yang sering muncul', 5, [
      { t: 'kartu', judul: 'Balik kartunya, tebak dulu artinya', kartu: [['Deliverable', 'Hasil kerja yang harus diserahkan'], ['Headcount', 'Jumlah karyawan'], ['KPI', 'Indikator kinerja utama'], ['Probation', 'Masa percobaan kerja'], ['Shift', 'Giliran kerja'], ['Benefit', 'Tunjangan di luar gaji'], ['Reimbursement', 'Penggantian biaya'], ['Overtime', 'Lembur']] },
      PS('Pasangin istilah dengan artinya.', [['Probation', 'Masa percobaan'], ['Reimbursement', 'Penggantian biaya'], ['Overtime', 'Lembur'], ['Headcount', 'Jumlah karyawan']], 'Sering muncul di kontrak dan offering letter.'),
    ]),
  ], tes: [
    T('dasar', 'Cerita pengalaman yang udah selesai pakai tense...', ['Past simple', 'Present continuous', 'Future', 'Present simple']),
    T('menengah', '"Please find attached" dipakai buat...', ['Ngasih tau ada lampiran', 'Minta maaf', 'Nutup email', 'Nolak permintaan']),
  ] })

  // ================= BANK SOAL KHUSUS KUIS HARIAN =================
  const H = (kode, soal) => { if (K[kode]) K[kode].harian = (K[kode].harian || []).concat(soal.map(([tanya, opsi, jelas]) => P(tanya, opsi, jelas))) }
  H('EX', [['Rumus rata-rata B2 sampai B10?', ['=AVERAGE(B2:B10)', '=MEAN(B2:B10)', '=AVG(B2:B10)', '=SUM(B2:B10)/2'], 'Di Excel namanya AVERAGE.'], ['Tanda $ di $A$1 artinya...', ['Referensi absolut, ga geser pas dicopy', 'Format mata uang', 'Sel terkunci password', 'Sel tersembunyi'], 'Absolute reference.'], ['Shortcut bikin tabel (Format as Table) di Excel?', ['Ctrl+T', 'Ctrl+P', 'Ctrl+B', 'Ctrl+Z'], 'Ctrl+T.'], ['=COUNTA(A2:A10) ngitung...', ['Sel yang ga kosong', 'Sel berisi angka aja', 'Sel kosong', 'Jumlah nilai'], 'COUNTA = semua yang terisi.'], ['=ROUND(3,456; 1) hasilnya...', ['3,5', '3,4', '3', '3,46'], '1 angka di belakang koma.'], ['Fitur buat ngewarnain sel otomatis kalau nilainya di bawah target?', ['Conditional Formatting', 'Data Validation', 'Freeze Panes', 'Goal Seek'], 'Home → Conditional Formatting.'], ['Biar baris judul tetap keliatan pas scroll, pakai...', ['Freeze Panes', 'Merge', 'Wrap Text', 'Group'], 'View → Freeze Panes.'], ['=IF(B2>=75,"Lulus","Remedial") kalau B2 = 75 hasilnya...', ['Lulus', 'Remedial', 'Error', 'FALSE'], '>= termasuk sama dengan.']])
  H('SQ', [['Perintah buat ngurutin hasil?', ['ORDER BY', 'SORT', 'GROUP BY', 'ARRANGE'], 'ORDER BY kolom ASC/DESC.'], ['Ngambil nilai unik dari satu kolom pakai...', ['SELECT DISTINCT', 'SELECT UNIQUE', 'SELECT ONE', 'GROUP ALL'], 'DISTINCT.'], ['LEFT JOIN ngembaliin...', ['Semua baris tabel kiri, walau ga ada pasangannya', 'Cuma baris yang cocok', 'Semua baris tabel kanan', 'Baris kosong aja'], 'Yang ga cocok diisi NULL.'], ['Nyari nama yang diawali "Ra" pakai...', ["WHERE nama LIKE 'Ra%'", "WHERE nama = 'Ra*'", "WHERE nama IN 'Ra'", "WHERE nama START 'Ra'"], '% = karakter apa aja.'], ['Ngecek nilai kosong pakai...', ['IS NULL', '= NULL', '== NULL', 'EMPTY()'], 'NULL ga bisa dibandingin pakai =.'], ['COUNT(*) vs COUNT(kolom)?', ['COUNT(kolom) ga ngitung NULL', 'Sama persis', 'COUNT(*) lebih lambat jadi salah', 'COUNT(kolom) ngitung duplikat 2 kali'], 'NULL dilewati.'], ['Batasin hasil cuma 10 baris (SQLite/MySQL)?', ['LIMIT 10', 'TOP 10 di akhir', 'ROWS 10', 'MAX 10'], 'LIMIT.'], ['Primary key itu...', ['Kolom pengenal unik tiap baris', 'Kolom paling besar', 'Kolom pertama', 'Password tabel'], 'Ga boleh dobel dan ga boleh kosong.']])
  H('VZ', [['Nunjukin komposisi 3 kategori, grafik paling sederhana?', ['Pie atau batang bertumpuk', 'Scatter', 'Garis', 'Peta'], 'Bagian dari keseluruhan.'], ['Grafik tren harian setahun?', ['Garis', 'Pie', 'Donat', 'Tabel'], 'Waktu di sumbu X.'], ['Bandingin 15 kategori, paling kebaca?', ['Batang horizontal diurutkan', 'Pie 15 potong', 'Radar', '3D bar'], 'Label panjang muat dan gampang dibandingin.'], ['Warna merah di dashboard sebaiknya dipakai...', ['Buat nandain yang butuh perhatian', 'Buat semua grafik', 'Buat judul', 'Ga boleh dipakai'], 'Warna = makna.'], ['KPI card isinya...', ['Angka utama, pembanding, dan arah', 'Paragraf penjelasan', 'Tabel lengkap', 'Logo perusahaan'], 'Contoh: Rp1,2 M, +8% vs bulan lalu.'], ['Di Power BI, bahasa rumus measure namanya...', ['DAX', 'SQL', 'VBA', 'M saja'], 'Data Analysis Expressions.'], ['Slicer di dashboard gunanya...', ['Filter interaktif', 'Nambah warna', 'Ekspor PDF', 'Hapus data'], 'Pengguna bisa milih sendiri.'], ['Heatmap cocok buat...', ['Nunjukin intensitas di dua dimensi (misal jam × hari)', 'Satu angka', 'Teks panjang', 'Logo'], 'Warna = besar nilai.']])
  H('ST', [['Modus dari 2, 3, 3, 5, 7?', ['3', '5', '4', '2'], 'Paling sering muncul.'], ['Median dari 1, 4, 6, 9?', ['5', '4', '6', '5,5'], '(4+6)/2.'], ['Persen kenaikan dari 80 ke 100?', ['25%', '20%', '80%', '100%'], '20 ÷ 80.'], ['Persen penurunan dari 100 ke 80?', ['20%', '25%', '80%', '120%'], '20 ÷ 100.'], ['Outlier itu...', ['Data yang jauh beda dari yang lain', 'Data rata-rata', 'Data kosong', 'Data terbanyak'], 'Bisa salah input atau kasus khusus.'], ['A/B test butuh...', ['Dua versi diuji ke kelompok acak sejenis', 'Satu versi aja', 'Pendapat bos', 'Data tahun lalu'], 'Randomisasi.'], ['Rata-rata tertimbang dipakai kalau...', ['Tiap data punya bobot beda', 'Datanya sedikit', 'Ada outlier', 'Datanya teks'], 'Misal IPK pakai SKS.'], ['Korelasi 0 artinya...', ['Ga ada hubungan linear', 'Hubungan sempurna', 'Datanya salah', 'Berlawanan kuat'], 'Bisa ada hubungan non-linear.']])
  H('PY', [['Tipe data "Jakarta" di Python?', ['str', 'int', 'float', 'bool'], 'Teks = string.'], ['Hasil 7 // 2?', ['3', '3.5', '4', '1'], '// = bagi bulat.'], ['Hasil 7 % 2?', ['1', '3', '3.5', '0'], '% = sisa bagi.'], ['Bikin dictionary yang bener?', ['{"nama": "Ayu", "umur": 22}', '["nama": "Ayu"]', '("nama" = "Ayu")', '<nama: Ayu>'], 'Kurung kurawal, pasangan key: value.'], ['Import pandas yang umum?', ['import pandas as pd', 'include pandas', 'using pandas', 'require(pandas)'], 'Alias pd.'], ['Baca file CSV ke DataFrame?', ['pd.read_csv("data.csv")', 'pd.open("data.csv")', 'pd.csv("data.csv")', 'read("data.csv")'], 'read_csv.'], ['groupby lalu sum: total omzet per kota?', ['df.groupby("kota")["omzet"].sum()', 'df.sum("kota")', 'df["kota"].sum("omzet")', 'df.group("omzet")'], 'Kelompokkan, pilih kolom, agregat.'], ['Gabungin dua DataFrame berdasarkan kolom id?', ['pd.merge(a, b, on="id")', 'a + b', 'pd.join(a, "id")', 'a.append(b)'], 'Mirip JOIN di SQL.']])
  H('DM', [['Impresi itu...', ['Berapa kali iklan atau konten ditampilkan', 'Jumlah klik', 'Jumlah pembeli', 'Jumlah follower'], 'Bisa ke orang yang sama berkali-kali.'], ['Reach beda dari impresi karena...', ['Reach ngitung orang unik', 'Reach ngitung klik', 'Sama aja', 'Reach cuma buat email'], 'Impresi bisa dobel.'], ['CPM itu biaya per...', ['1.000 impresi', '1 klik', '1 pembelian', '1 follower'], 'Cost per mille.'], ['Landing page yang baik punya...', ['Satu tujuan dan CTA jelas', 'Banyak menu dan link keluar', 'Video autoplay bersuara', 'Teks panjang tanpa judul'], 'Fokus konversi.'], ['Retargeting nyasar ke...', ['Orang yang pernah interaksi', 'Orang acak', 'Kompetitor', 'Karyawan'], 'Ngingetin yang udah kenal.'], ['Konten evergreen itu...', ['Tetap relevan lama', 'Konten tren sehari', 'Konten promo', 'Konten warna hijau'], 'Contoh: panduan dasar.'], ['UGC itu...', ['Konten buatan pengguna', 'Iklan TV', 'Konten AI', 'Undangan'], 'User-generated content.'], ['KOL di Indonesia biasanya merujuk ke...', ['Influencer atau tokoh berpengaruh', 'Kode promo', 'Kolom laporan', 'Kurir'], 'Key Opinion Leader.']])
  H('CW', [['Hook di konten video itu...', ['Kalimat atau visual 3 detik pertama yang nahan penonton', 'Musik penutup', 'Hashtag', 'Logo'], 'Penentu orang lanjut nonton.'], ['Kalimat aktif yang lebih kuat?', ['"Kami kirim pesanan hari ini"', '"Pesanan akan dikirimkan oleh kami hari ini"', '"Pengiriman dilakukan"', '"Telah dikirim"'], 'Subjek jelas, kata kerja aktif.'], ['Social proof dalam copy contohnya...', ['"Dipakai 20.000 mahasiswa"', '"Produk terbaik"', '"Pasti puas"', '"Murah banget"'], 'Bukti dari orang lain.'], ['Urgensi yang jujur?', ['"Promo berakhir Minggu 23.59"', '"Buruan! Selamanya!"', '"Sisa 1" padahal stok banyak', '"Harga naik kapan-kapan"'], 'Batas waktu nyata.'], ['Copy buat LinkedIn sebaiknya...', ['Profesional tapi tetap manusiawi', 'Penuh singkatan gaul', 'Huruf kapital semua', 'Cuma hashtag'], 'Sesuai platform.'], ['Kata "gratis" di copy efektif kalau...', ['Bener-bener gratis tanpa syarat tersembunyi', 'Ada biaya tersembunyi', 'Ditulis kecil', 'Dipakai di semua kalimat'], 'Kepercayaan nomor satu.'], ['Panjang caption ideal?', ['Tergantung tujuan dan platform', 'Selalu 1 kata', 'Selalu 2.000 kata', 'Ga perlu caption'], 'Edukasi bisa panjang, promo singkat.'], ['Microcopy itu...', ['Teks kecil di aplikasi (tombol, pesan error)', 'Copy di mikroskop', 'Iklan billboard', 'Slogan perusahaan'], 'Contoh: "Simpan perubahan".']])
  H('AK', [['Persamaan dasar akuntansi?', ['Aset = Liabilitas + Ekuitas', 'Aset = Pendapatan − Beban', 'Laba = Aset − Modal', 'Kas = Utang'], 'Selalu seimbang.'], ['Beli perlengkapan secara tunai, efeknya...', ['Perlengkapan naik, kas turun', 'Kas naik', 'Utang naik', 'Modal turun'], 'Tukar aset dengan aset.'], ['Pendapatan bertambah dicatat di sisi...', ['Kredit', 'Debit', 'Ga dicatat', 'Dua-duanya'], 'Saldo normal pendapatan = kredit.'], ['Beban bertambah dicatat di sisi...', ['Debit', 'Kredit', 'Ga dicatat', 'Tergantung'], 'Saldo normal beban = debit.'], ['Piutang usaha termasuk...', ['Aset', 'Liabilitas', 'Ekuitas', 'Beban'], 'Hak menagih.'], ['Utang usaha termasuk...', ['Liabilitas', 'Aset', 'Pendapatan', 'Ekuitas'], 'Kewajiban bayar.'], ['Prive itu...', ['Pengambilan pribadi pemilik', 'Pendapatan lain', 'Beban gaji', 'Utang bank'], 'Ngurangi ekuitas.'], ['HPP singkatan dari...', ['Harga Pokok Penjualan', 'Hasil Penjualan Pokok', 'Hutang Pajak Penghasilan', 'Harga Pasar Penjualan'], 'Biaya barang yang dijual.']])
  H('UX', [['UI vs UX?', ['UI tampilan, UX pengalaman keseluruhan', 'Sama aja', 'UX cuma warna', 'UI cuma riset'], 'UX lebih luas.'], ['Affordance itu...', ['Petunjuk visual cara pakai elemen', 'Harga desain', 'Font', 'Animasi'], 'Tombol keliatan bisa dipencet.'], ['Hierarki visual dibentuk lewat...', ['Ukuran, warna, kontras, posisi', 'Jumlah halaman', 'Nama file', 'Server'], 'Mata baca yang paling menonjol duluan.'], ['Kontras teks yang rendah bikin...', ['Susah dibaca, ga aksesibel', 'Lebih elegan pasti', 'Loading cepat', 'SEO naik'], 'Aksesibilitas.'], ['Design system isinya...', ['Komponen, aturan, dan token desain yang dipakai ulang', 'Satu gambar logo', 'Daftar gaji desainer', 'Kode backend'], 'Biar konsisten.'], ['Card sorting dipakai buat...', ['Nyusun struktur menu sesuai cara pikir pengguna', 'Main kartu', 'Milih warna', 'Testing kecepatan'], 'Information architecture.'], ['Alat desain UI paling populer sekarang?', ['Figma', 'Excel', 'Notepad', 'Paint'], 'Kolaboratif dan berbasis web.'], ['Mobile first artinya...', ['Rancang dari layar kecil dulu', 'Cuma bikin app', 'Desktop dilarang', 'Semua harus hitam'], 'Kebanyakan pengguna di HP.']])
  H('K3', [['Tanda K3 warna kuning biasanya berarti...', ['Peringatan atau hati-hati', 'Wajib', 'Dilarang', 'Info umum'], 'Kuning = waspada.'], ['Rambu bulat biru biasanya...', ['Kewajiban (misal wajib helm)', 'Larangan', 'Bahaya', 'Jalur evakuasi'], 'Biru = wajib.'], ['Rambu hijau biasanya...', ['Kondisi aman atau evakuasi', 'Bahaya listrik', 'Larangan merokok', 'Wajib APD'], 'Hijau = selamat.'], ['Housekeeping yang buruk bisa nyebabin...', ['Tersandung, kebakaran, susah evakuasi', 'Produktivitas naik', 'Ga ada pengaruh', 'Lantai lebih bersih'], 'Bagian dari 5R.'], ['Ergonomi fokus ke...', ['Kesesuaian kerja dengan tubuh manusia', 'Warna seragam', 'Jam lembur', 'Gaji'], 'Postur, beban angkat, posisi layar.'], ['Titik kumpul (muster point) dipakai pas...', ['Evakuasi darurat', 'Istirahat makan', 'Rapat pagi', 'Parkir'], 'Buat ngitung semua orang selamat.'], ['Safety induction diberikan ke...', ['Pekerja dan tamu baru sebelum masuk area', 'Direktur aja', 'Pelanggan online', 'Ga ada'], 'Kenalan sama bahaya dan aturan.'], ['MSDS/SDS isinya...', ['Info bahaya dan penanganan bahan kimia', 'Daftar gaji', 'Jadwal shift', 'Peta kantor'], 'Safety Data Sheet.']])
  H('QC', [['QC vs QA?', ['QC ngecek produk, QA ngatur proses biar ga cacat', 'Sama aja', 'QA cuma di kantor', 'QC cuma di gudang'], 'Deteksi vs pencegahan.'], ['Prinsip Pareto 80/20 artinya...', ['Sebagian kecil penyebab bikin sebagian besar masalah', '80% produk bagus', 'Diskon 20%', 'Kerja 80 jam'], 'Fokus ke yang paling berdampak.'], ['5 Why gunanya...', ['Nyari akar masalah dengan nanya "kenapa" berulang', 'Ngitung cacat', 'Bikin jadwal', 'Ngukur suhu'], 'Sampai ketemu penyebab dasar.'], ['Defect itu...', ['Cacat atau ketidaksesuaian produk', 'Bonus', 'Target', 'Mesin baru'], 'Ga sesuai spesifikasi.'], ['Sampling inspection dipakai karena...', ['Ngecek semua unit terlalu mahal atau merusak', 'Malas', 'Wajib hukum', 'Biar cepat pulang'], 'Statistik ngewakilin populasi.'], ['ISO 9001 itu standar...', ['Sistem manajemen mutu', 'K3', 'Lingkungan', 'Keamanan informasi'], 'ISO 45001 = K3, 14001 = lingkungan.'], ['Poka-yoke artinya...', ['Mekanisme anti-salah (error proofing)', 'Rapat pagi', 'Laporan mingguan', 'Bonus karyawan'], 'Contoh: colokan yang cuma bisa masuk satu arah.'], ['Kaizen fokus ke...', ['Perbaikan kecil terus-menerus', 'Investasi besar sekali', 'PHK', 'Ganti semua mesin'], 'Sedikit demi sedikit.']])
  H('PM', [['Tujuan SMART, S artinya...', ['Specific', 'Simple', 'Smart', 'Slow'], 'Specific, Measurable, Achievable, Relevant, Time-bound.'], ['Milestone itu...', ['Titik pencapaian penting di proyek', 'Tugas harian', 'Anggaran', 'Rapat'], 'Penanda progres.'], ['Scope creep itu...', ['Lingkup proyek nambah terus tanpa kontrol', 'Proyek selesai lebih cepat', 'Bonus tim', 'Rapat online'], 'Musuh tenggat dan anggaran.'], ['Matriks Eisenhower: penting tapi ga mendesak sebaiknya...', ['Dijadwalin', 'Dikerjain sekarang', 'Didelegasiin', 'Dibuang'], 'Kuadran perencanaan.'], ['Kanban board kolom umumnya...', ['To do, Doing, Done', 'Senin sampai Jumat', 'Merah, kuning, hijau', 'A, B, C'], 'Alur kerja keliatan.'], ['Stand-up meeting idealnya...', ['Singkat, sekitar 15 menit', '2 jam', 'Sebulan sekali', 'Tanpa agenda dan lama'], 'Update cepat.'], ['Baseline proyek itu...', ['Rencana awal yang disetujui sebagai pembanding', 'Proyek gagal', 'Gaji pokok', 'Server'], 'Buat ngukur deviasi.'], ['Lessons learned dibuat...', ['Di akhir proyek atau fase', 'Sebelum proyek mulai aja', 'Ga perlu', 'Tiap jam'], 'Biar proyek berikutnya lebih baik.']])
  H('AD', [['Tembusan surat ditujukan ke...', ['Pihak yang perlu tau isi surat', 'Penerima utama', 'Pengirim', 'Kurir'], 'cc dalam surat resmi.'], ['Email ke banyak orang tanpa saling liat alamat pakai...', ['BCC', 'CC', 'To', 'Reply all'], 'Blind carbon copy.'], ['Disposisi surat itu...', ['Instruksi pimpinan atas surat masuk', 'Surat keluar', 'Amplop', 'Arsip musnah'], 'Lembar arahan.'], ['Agenda surat masuk gunanya...', ['Nyatet surat yang diterima', 'Jadwal makan', 'Daftar gaji', 'Agenda rapat'], 'Buku registrasi.'], ['Surat edaran ditujukan ke...', ['Banyak pihak sekaligus', 'Satu orang rahasia', 'Bank', 'Diri sendiri'], 'Pemberitahuan umum.'], ['Menyapa atasan di email resmi?', ['"Yth. Bapak Andi" atau "Dear Mr. Andi"', '"Woy Pak"', '"Hai say"', 'Tanpa sapaan'], 'Sopan dan formal.'], ['Retensi arsip artinya...', ['Jangka waktu arsip disimpan sebelum dimusnahkan', 'Arsip hilang', 'Nyalin arsip', 'Nyari arsip'], 'Jadwal retensi arsip.'], ['Kalimat efektif ciri-cirinya...', ['Jelas, hemat kata, ga ambigu', 'Panjang dan berbunga', 'Pakai singkatan', 'Banyak pengulangan'], 'Inti pesan langsung kebaca.']])
  H('KM', [['Komunikasi asertif itu...', ['Jelas dan tegas tapi tetap menghargai', 'Agresif', 'Pasif', 'Diam'], 'Win-win.'], ['Active listening ditunjukin dengan...', ['Ngulang inti omongan dan nanya klarifikasi', 'Main HP', 'Motong omongan', 'Langsung ngasih solusi'], 'Bikin lawan bicara merasa didengar.'], ['Bahasa tubuh yang kesannya percaya diri?', ['Kontak mata, postur tegak, gestur terbuka', 'Lipat tangan terus', 'Liat lantai', 'Mainin pulpen'], 'Nonverbal.'], ['Filler word "eee", "anu" bisa dikurangi dengan...', ['Jeda sebentar daripada ngisi suara', 'Ngomong lebih cepat', 'Baca slide', 'Ga latihan'], 'Diam sejenak itu wajar.'], ['Elevator pitch itu...', ['Perkenalan singkat 30 sampai 60 detik', 'Presentasi 1 jam', 'Surat lamaran', 'Pidato'], 'Bayangin ketemu bos di lift.'], ['Ngadepin pertanyaan yang ga tau jawabannya pas presentasi?', ['Jujur, catat, janji kabarin', 'Ngarang jawaban', 'Pura-pura ga denger', 'Marah'], 'Jaga kredibilitas.'], ['Pesan WhatsApp ke atasan sebaiknya...', ['Singkat, sopan, langsung ke inti', 'Kirim "P" dulu', 'Voice note 5 menit', 'Pakai stiker'], 'Hormati waktu atasan.'], ['Rule of three dalam presentasi?', ['Kelompokin poin jadi 3 biar gampang diinget', 'Presentasi 3 jam', 'Cuma 3 slide', '3 pembicara'], 'Otak suka pola tiga.']])
  H('PS', [['Deret: 2, 6, 18, 54, ...', ['162', '108', '72', '216'], '×3.'], ['Deret: 1, 4, 9, 16, 25, ...', ['36', '30', '35', '49'], 'Kuadrat.'], ['Deret: 3, 5, 9, 17, 33, ...', ['65', '49', '64', '66'], 'Selisih dobel: 2, 4, 8, 16, 32.'], ['Antonim "efisien"?', ['Boros', 'Hemat', 'Cepat', 'Rajin'], 'Lawan kata.'], ['Sinonim "kendala"?', ['Hambatan', 'Tujuan', 'Peluang', 'Hasil'], 'Persamaan kata.'], ['Pena : menulis = gunting : ...', ['memotong', 'kertas', 'tajam', 'besi'], 'Alat : fungsi.'], ['25% dari 360?', ['90', '72', '120', '80'], '360 ÷ 4.'], ['Harga Rp200.000 diskon 15%, harga akhir?', ['Rp170.000', 'Rp185.000', 'Rp30.000', 'Rp150.000'], '200.000 − 30.000.']])
  H('IV', [['STAR singkatan dari...', ['Situation, Task, Action, Result', 'Start, Try, Act, Repeat', 'Skill, Talent, Attitude, Result', 'Smart, Tough, Active, Ready'], 'Struktur jawaban behavioral.'], ['Bagian STAR yang paling panjang dan detail?', ['Action', 'Situation', 'Task', 'Result'], 'Apa yang kamu lakukan.'], ['Pertanyaan behavioral biasanya diawali...', ['"Ceritakan saat kamu..."', '"Berapa umur kamu?"', '"Kamu tinggal di mana?"', '"Hobi apa?"'], 'Pengalaman nyata.'], ['"Kenapa mau kerja di sini?" jawaban terbaik nyebut...', ['Hal spesifik soal perusahaan dan kecocokan kamu', 'Gaji', 'Dekat rumah', '"Butuh kerja aja"'], 'Nunjukin riset.'], ['Dress code interview kalau ga dikasih tau?', ['Rapi, satu tingkat di atas budaya kantor', 'Kaos', 'Jas formal lengkap selalu', 'Bebas'], 'Aman dan sopan.'], ['Datang interview tatap muka idealnya...', ['10 sampai 15 menit lebih awal', 'Tepat waktu mepet', '1 jam lebih awal', 'Telat dikit gapapa'], 'Ada waktu tenang.'], ['Setelah interview, kirim...', ['Email terima kasih singkat dalam 24 jam', 'Hadiah', 'Pesan tiap hari', 'Ga usah apa-apa'], 'Kesan profesional.'], ['Jawaban "Ceritakan kegagalanmu" fokus ke...', ['Pelajaran dan perbaikan setelahnya', 'Nyalahin orang lain', 'Bilang ga pernah gagal', 'Detail kegagalan doang'], 'Growth mindset.']])
  H('CV', [['ATS itu...', ['Sistem yang nyaring CV secara otomatis', 'Asosiasi tenaga kerja', 'Jenis font', 'Tes psikotes'], 'Applicant Tracking System.'], ['Format CV paling aman buat ATS?', ['Satu kolom, heading standar, teks bisa diseleksi', 'Dua kolom penuh ikon', 'Gambar JPG', 'Tabel bersarang'], 'Mesin baca teks berurutan.'], ['Panjang CV fresh graduate idealnya...', ['1 halaman', '5 halaman', 'Setengah halaman', '10 halaman'], 'Ringkas dan relevan.'], ['Nama file CV yang rapi?', ['CV_Nama_Posisi.pdf', 'cv final fix banget.docx', 'Dokumen1.pdf', 'scan.jpg'], 'Gampang dicari rekruter.'], ['Kata kunci di CV sebaiknya diambil dari...', ['Deskripsi lowongan yang dilamar', 'Kamus acak', 'CV teman', 'Judul film'], 'Biar cocok sama ATS.'], ['Foto di CV untuk lowongan di Indonesia...', ['Ikutin permintaan lowongan, kalau diminta pakai foto formal', 'Wajib foto liburan', 'Selfie', 'Foto bareng teman'], 'Tergantung permintaan.'], ['Urutan pengalaman di CV...', ['Terbaru di atas', 'Terlama di atas', 'Acak', 'Abjad'], 'Reverse chronological.'], ['Klaim skill di CV harus...', ['Bisa dibuktiin pas ditanya', 'Sebanyak mungkin', 'Disalin dari lowongan semua', 'Pakai persen tanpa dasar'], 'Jujur selalu.']])
  H('EN', [['"I\'m looking forward to ___ from you."', ['hearing', 'hear', 'heard', 'hears'], 'look forward to + -ing.'], ['"Could you ___ me the file?"', ['send', 'sending', 'sent', 'to send'], 'Could you + verb dasar.'], ['Lawan "available"?', ['unavailable', 'inavailable', 'disavailable', 'nonavailable'], 'un-.'], ['"Deadline" artinya...', ['Batas waktu', 'Garis mati', 'Jadwal rapat', 'Gaji'], 'Tenggat.'], ['"I have ___ experience in sales."', ['two years of', 'two year', 'two years', 'two-years of'], 'Two years of experience.'], ['"Responsible ___ the report."', ['for', 'to', 'of', 'at'], 'Responsible for.'], ['"ASAP" artinya...', ['As soon as possible', 'All staff at party', 'Always say a prayer', 'As simple as possible'], 'Secepatnya.'], ['Kalimat sopan buat nolak?', ['"Unfortunately, I won\'t be able to attend."', '"No."', '"I don\'t want."', '"Never."'], 'Unfortunately + alasan singkat.']])
})()
