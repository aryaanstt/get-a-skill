// Dashboard (Power BI + Tableau), Statistik, dan Python versi dalam.
// Rujukan kurikulum: Microsoft Learn (Power BI Data Analyst: Power Query, model, DAX, visual), Tableau Free Training (Desktop basics, calculations, LOD),
// OpenIntro Statistics (deskriptif, peluang, distribusi, inferensi), Python for Everybody + dokumentasi pandas. Semua teks dan soal ditulis sendiri.
;(() => {
  const { H, susun } = window.GAS_DALAM
  const { I, C, RK, P, A, B, IS, U, PS, SK, L, T } = H
  const CK = (judul, soal, langkah, o = {}) => C(judul, soal, langkah, { jenis: 'kode', ...o })

  // ===================================================================
  // DASHBOARD: POWER BI + TABLEAU
  // ===================================================================
  const TB_JUAL = '<table class="tabel-mini"><tr><th>Kota</th><th>Produk</th><th>Omzet (juta)</th></tr><tr><td>Bandung</td><td>Kopi</td><td>40</td></tr><tr><td>Bandung</td><td>Teh</td><td>10</td></tr><tr><td>Jakarta</td><td>Kopi</td><td>30</td></tr><tr><td>Jakarta</td><td>Teh</td><td>30</td></tr><tr><td>Surabaya</td><td>Kopi</td><td>15</td></tr><tr><td>Surabaya</td><td>Teh</td><td>5</td></tr></table>'
  const VZ = [
    L('grafik', 'dasar', 'Milih grafik yang tepat', 8, [
      I('Grafik itu jawaban dari satu pertanyaan', '<p>Sebelum milih grafik, tanya: <b>pertanyaannya jenis apa?</b></p><table class="tabel-mini"><tr><th>pertanyaan</th><th>grafik</th></tr><tr><td>Bandingin kategori (kota mana paling gede?)</td><td><b>Batang</b>, diurutin</td></tr><tr><td>Tren waktu (naik atau turun?)</td><td><b>Garis</b></td></tr><tr><td>Porsi dari total (berapa persen?)</td><td><b>Pie/donut</b>, maks 4 sampai 5 bagian, atau batang 100%</td></tr><tr><td>Hubungan dua angka</td><td><b>Scatter</b></td></tr><tr><td>Sebaran data (gaji karyawan nyebar gimana?)</td><td><b>Histogram</b> atau box plot</td></tr><tr><td>Butuh angka persis</td><td><b>Tabel</b> atau kartu KPI</td></tr></table>'),
      I('Biar grafiknya kebaca', '<ul><li><b>Urutin</b> batang dari terbesar, kecuali kategorinya punya urutan alami (bulan, umur).</li><li>Label kepanjangan? Pakai <b>batang horizontal</b>.</li><li><b>Satu warna</b> buat semua batang, warna mencolok cuma buat yang mau disorot.</li><li>Kasih <b>judul</b> dan <b>satuan</b> (juta rupiah, unit, persen).</li></ul>'),
      C('Milih grafik buat 3 pertanyaan atasan', 'Atasan nanya tiga hal soal data penjualan. Kita pilih grafiknya satu-satu.', [
        ['"Omzet tiap bulan tahun ini gimana?"', 'Kata kuncinya <b>tiap bulan</b> = waktu = tren. Pakai <b>grafik garis</b>, sumbu X bulan, sumbu Y omzet.'],
        ['"Kota mana yang paling laku?"', 'Bandingin kategori. <b>Batang</b>, diurutin dari terbesar biar jawabannya langsung di batang paling atas.'],
        ['"Pembeli kita dari channel mana aja?" (3 channel)', 'Porsi dari total dengan sedikit bagian. <b>Donut</b> boleh. Kalau channelnya 8, ganti batang.'],
      ], { penutup: 'Jangan mulai dari "grafik apa yang keren". Mulai dari "pertanyaan apa yang mau dijawab".' }),
      PS('Pasangin pertanyaan dengan grafiknya.', [['Omzet per bulan selama setahun', 'Garis'], ['Penjualan tiap cabang', 'Batang'], ['Porsi channel penjualan (3 channel)', 'Pie'], ['Harga iklan vs jumlah klik', 'Scatter'], ['Sebaran umur pelanggan', 'Histogram']], 'Tanya dulu: bandingin, tren, porsi, hubungan, atau sebaran?'),
      P('Atasan nanya: "Kota mana yang omzetnya paling gede bulan ini?" Grafik terbaik?', [['Bar chart diurutin dari terbesar', 'Batang paling atas langsung jawab pertanyaannya.'], ['Pie chart 12 kota', '12 potong pie susah dibandingin, sudutnya mirip-mirip.'], ['Line chart', 'Garis buat tren waktu, bukan bandingin kota.'], ['Tabel 30 kolom', 'Atasan harus nyari sendiri jawabannya.']], 'Grafik terbaik = yang bikin jawabannya keliatan dalam 5 detik.'),
      P('Nama 15 produk panjang-panjang mau dibandingin penjualannya. Paling enak dibaca?', [['Batang horizontal, diurutin', 'Label panjang muat di kiri, urutan bikin gampang dibandingin.'], ['Batang vertikal', 'Label bakal miring atau kepotong.'], ['Pie', '15 potongan terlalu banyak.'], ['Scatter', 'Scatter buat hubungan dua angka.']], 'Label panjang = horizontal.'),
      RK('Kartu contekan grafik', [['Bandingin kategori', 'batang, diurutin'], ['Tren waktu', 'garis'], ['Porsi (≤ 5 bagian)', 'pie/donut atau batang 100%'], ['Hubungan dua angka', 'scatter'], ['Sebaran', 'histogram / box plot'], ['Angka persis', 'tabel / kartu KPI']]),
    ]),

    L('model', 'dasar', 'Alur kerja dashboard dan model data', 8, [
      I('Alur Power BI dan Tableau', '<p>Alatnya beda, alurnya hampir sama:</p><ol><li><b>Ambil data</b> (Get Data / Connect): Excel, CSV, database SQL.</li><li><b>Bersihin</b>: Power Query di Power BI, Data Source/Prep di Tableau.</li><li><b>Hubungin tabel</b> (model): tabel mana nyambung lewat kolom apa.</li><li><b>Bikin ukuran</b>: measure DAX di Power BI, calculated field di Tableau.</li><li><b>Susun visual</b>, terus <b>publish</b> dan share.</li></ol>'),
      I('Tabel fakta dan tabel dimensi', '<ul><li><b>Fakta</b>: kejadian yang dihitung, biasanya banyak baris dan ada angkanya. Contoh: transaksi penjualan (tanggal, produk_id, qty, omzet).</li><li><b>Dimensi</b>: keterangan buat ngelompokin dan nyaring. Contoh: Produk (nama, kategori), Pelanggan (kota, segmen), Kalender (tanggal, bulan, tahun).</li></ul><p>Cara cepat ngebedain: kalau ditanya "<b>berapa</b>?" jawabannya dari fakta. Kalau "<b>per apa</b>?" atau "<b>yang mana</b>?" jawabannya dari dimensi.</p>'),
      C('Mecah satu file Excel jadi model', 'Kamu dikasih satu sheet penjualan: tanggal, nama produk, kategori, harga, nama pelanggan, kota, qty.', [
        ['', 'Kolom yang isinya <b>kejadian dan angka</b> (tanggal, qty, omzet) jadi tabel <b>Penjualan</b> (fakta).'],
        ['', 'Keterangan produk (nama, kategori, harga) dipisah jadi tabel <b>Produk</b>, satu baris per produk, dikasih <code>produk_id</code>.'],
        ['', 'Keterangan pelanggan (nama, kota) jadi tabel <b>Pelanggan</b>. Tanggal dihubungin ke tabel <b>Kalender</b>.'],
        ['', 'Hasilnya: fakta di tengah, dimensi di sekeliling. Bentuknya kayak bintang, makanya disebut <b>star schema</b>.'],
      ]),
      U('Susun alur bikin dashboard.', ['Ambil data (Get Data)', 'Bersihin di Power Query', 'Hubungin tabel (model)', 'Bikin measure (DAX)', 'Susun visual dan publish'], 'Data kotor bikin dashboard bohong, jadi bersihin duluan.'),
      PS('Fakta atau dimensi?', [['Penjualan (tgl, produk_id, qty)', 'Fakta'], ['Produk (nama, kategori)', 'Dimensi'], ['Kalender (tanggal, bulan)', 'Dimensi '], ['Kunjungan web (tgl, halaman, durasi)', 'Fakta ']], 'Fakta = kejadian yang dihitung. Dimensi = keterangan buat ngelompokin.'),
      P('Atasan nanya "omzet per kategori produk". Kolom kategori diambil dari tabel?', [['Dimensi Produk', '"Per apa" = dimensi.'], ['Fakta Penjualan', 'Fakta nyumbang angkanya (omzet), bukan kategorinya.'], ['Kalender', 'Kalender buat waktu.'], ['Bikin tabel baru', 'Ga perlu, udah ada di Produk.']], 'Angka dari fakta, pengelompok dari dimensi.'),
      RK('Kartu contekan model', [['Fakta', 'kejadian + angka, banyak baris'], ['Dimensi', 'keterangan buat ngelompokin'], ['Star schema', 'fakta di tengah, dimensi di sekeliling'], ['Alur', 'ambil · bersihin · model · measure · visual']]),
    ]),

    L('menyesatkan', 'menengah', 'Grafik yang menyesatkan', 7, [
      I('Grafik bisa bohong tanpa salah data', '<ul><li><b>Sumbu Y ga mulai dari nol</b> di grafik batang: beda 2% keliatan kayak dua kali lipat. Di batang, panjang batang = nilai, jadi wajib dari nol.</li><li><b>Pie kebanyakan potongan</b> atau totalnya bukan 100%.</li><li><b>Efek 3D</b>: bagian depan keliatan lebih besar.</li><li><b>Sumbu ganda</b> (dua sumbu Y) yang skalanya dipilih biar dua garis keliatan "nempel".</li><li><b>Periode dipilih-pilih</b> (cherry picking): cuma nampilin bulan yang bagus.</li></ul><p>Grafik <b>garis</b> boleh ga mulai dari nol kalau yang mau diliat itu perubahannya, asal angkanya jelas.</p>'),
      C('Benerin grafik yang lebay', 'Tim sales bikin batang: penjualan Q1 = 100, Q2 = 104. Di slide, batang Q2 keliatan dua kali lebih tinggi.', [
        ['Sumbu Y mulai dari 98', 'Batang Q1 cuma setinggi 2 satuan (100 − 98), Q2 setinggi 6 (104 − 98). Mata ngebaca Q2 tiga kali Q1, padahal cuma naik 4%.'],
        ['Sumbu Y mulai dari 0', 'Batang jadi 100 vs 104. Kenaikannya kecil, dan itu memang kenyataannya.'],
        ['Judul: "Penjualan Q2 naik 4% dari Q1"', 'Kalau kenaikan kecil itu penting, tulis angkanya di judul. Jujur dan tetap nyampein pesan.'],
      ]),
      B('Mana aja yang bikin grafik menyesatkan? (pilih semua)', [['Batang dengan sumbu Y mulai dari 95', true, 'Beda kecil keliatan raksasa.'], ['Pie chart 12 potongan', true, 'Susah dibandingin, porsi kecil hilang.'], ['Grafik 3D miring', true, 'Perspektif bikin ukuran terdistorsi.'], ['Judul yang jelas dan satuan disebut', false, 'Ini malah bikin grafik jujur.']], 'Cek sumbu, jumlah potongan, efek, dan periode.'),
      P('Penjualan naik dari 100 ke 104. Grafik batang yang jujur?', [['Sumbu Y mulai dari 0', 'Panjang batang = nilai.'], ['Sumbu Y mulai dari 99', 'Bikin kenaikan 4% keliatan berlipat.'], ['Pakai 3D biar menarik', '3D nambah distorsi.'], ['Hapus angka sumbu', 'Pembaca jadi ga bisa ngecek.']], 'Batang wajib dari nol.'),
      P('Laporan nunjukin "pengguna naik terus", tapi cuma pakai data Maret sampai Juni dari setahun. Masalahnya?', [['Cherry picking periode', 'Bisa jadi bulan lain turun dan sengaja ga ditampilin.'], ['Grafiknya kurang warna', 'Warna bukan masalahnya.'], ['Harusnya pakai pie', 'Tren waktu pakai garis.'], ['Ga ada masalah', 'Periode yang dipilih ngubah kesimpulan.']], 'Selalu tanya: kenapa periode ini yang dipilih?'),
      RK('Kartu contekan grafik jujur', [['Batang', 'sumbu Y dari nol'], ['Garis', 'boleh ga dari nol, angka jelas'], ['Pie', '≤ 5 bagian, total 100%'], ['3D', 'hindari'], ['Periode', 'jangan dipilih-pilih']]),
    ]),

    L('dashboard', 'menengah', 'Nyusun dashboard yang kebaca', 8, [
      I('Dashboard itu jawaban, bukan pajangan', '<p>Mata orang baca layar kayak huruf Z atau F: mulai kiri atas. Susunan umum:</p><ol><li><b>Kartu KPI</b> di atas: 3 sampai 5 angka utama (omzet, jumlah order, AOV) plus perbandingan (vs bulan lalu / vs target).</li><li><b>Tren</b> di tengah: garis omzet per minggu/bulan.</li><li><b>Rincian</b> di bawah: batang per kota/produk, tabel top 10.</li><li><b>Slicer/filter</b> di atas atau samping: periode, kota.</li></ol><p>Batasi 5 sampai 7 visual. Tiap visual harus jawab satu pertanyaan bisnis.</p>'),
      I('Kartu KPI yang berguna', '<p>Angka doang ("Omzet Rp 1,2 M") belum ngasih tau bagus atau jelek. Tambah <b>konteks</b>:</p><ul><li>dibanding periode lalu: <b>▲ 8% vs Oktober</b></li><li>dibanding target: <b>92% dari target</b></li><li>warna seperlunya: merah cuma buat yang butuh perhatian</li></ul>'),
      C('Rancang dashboard penjualan bulanan', 'Manajer regional pengen tiap Senin buka satu halaman dan langsung tau kondisi.', [
        ['Tanya dulu: keputusan apa yang mau diambil?', 'Jawabannya: kota mana yang perlu dibantu promo. Berarti dashboard harus nunjukin kota yang di bawah target.'],
        ['Baris 1: 4 kartu KPI', 'Omzet, jumlah order, AOV, % pencapaian target. Masing-masing ada ▲▼ vs bulan lalu.'],
        ['Baris 2: garis omzet mingguan vs garis target', 'Biar keliatan kapan mulai melenceng.'],
        ['Baris 3: batang pencapaian per kota, diurutin, yang di bawah 90% warna merah', 'Ini jawaban langsung buat keputusannya.'],
        ['Slicer: bulan dan kategori produk', 'Biar manajer bisa nyelidik sendiri.'],
      ]),
      U('Urutin isi dashboard penjualan dari paling atas.', ['Kartu KPI: omzet, jumlah order, rata-rata nilai order', 'Grafik garis omzet per minggu', 'Grafik batang omzet per kota', 'Tabel rincian 10 produk teratas'], 'Ringkasan dulu, rincian belakangan.'),
      P('Satu dashboard idealnya punya berapa visual?', [['Sekitar 5 sampai 7', 'Cukup buat cerita lengkap tanpa bikin pusing.'], ['20 lebih', 'Mata ga tau harus liat mana.'], ['Cuma 1', 'Bisa, tapi biasanya kurang konteks.'], ['Sebanyak mungkin', 'Lebih banyak ≠ lebih jelas.']], 'Kalau lebih dari 7, pecah jadi halaman kedua.'),
      P('Kartu KPI "Omzet: Rp 1,2 M" paling bagus ditambah apa?', [['Perbandingan, misal ▲ 8% vs bulan lalu', 'Angka tanpa pembanding ga ngasih tau bagus atau jelek.'], ['Animasi', 'Ga nambah informasi.'], ['Font lebih besar', 'Udah cukup besar biasanya.'], ['Gambar uang', 'Hiasan doang.']], 'Konteks bikin angka bermakna.'),
      RK('Kartu contekan dashboard', [['Kiri atas', 'KPI paling penting'], ['Tengah', 'tren'], ['Bawah', 'rincian'], ['5 sampai 7 visual', 'tiap visual satu pertanyaan'], ['KPI + konteks', 'vs bulan lalu / vs target'], ['Warna', 'cuma buat yang perlu perhatian']]),
    ]),

    L('pquery', 'menengah', 'Power Query: bersihin data sebelum dianalisis', 9, [
      I('Power Query itu dapur', '<p>Di Power BI, <b>Transform Data</b> buka Power Query Editor. Semua langkah bersih-bersih kecatat di panel <b>Applied Steps</b>, jadi tiap data baru masuk tinggal <b>Refresh</b>, langkahnya diulang otomatis. Di balik layar langkahnya ditulis pakai bahasa <b>M</b>.</p><p>Power Query juga ada di Excel (Data → Get Data), cara kerjanya sama.</p>'),
      I('Langkah yang paling sering dipakai', '<table class="tabel-mini"><tr><th>langkah</th><th>buat apa</th></tr><tr><td>Change Type</td><td>teks jadi angka/tanggal (paling sering bikin error)</td></tr><tr><td>Remove Duplicates</td><td>buang baris dobel</td></tr><tr><td>Split Column</td><td>"JKT-0012" jadi "JKT" dan "0012"</td></tr><tr><td>Replace Values</td><td>"jkt" jadi "Jakarta"</td></tr><tr><td>Unpivot Columns</td><td>kolom Jan, Feb, Mar jadi baris (Bulan, Nilai)</td></tr><tr><td>Merge Queries</td><td>gabung kolom dari tabel lain (kayak JOIN/VLOOKUP)</td></tr><tr><td>Append Queries</td><td>tumpuk tabel ke bawah (data Januari + Februari)</td></tr></table>'),
      CK('Rapihin laporan cabang', 'Tiap cabang ngirim Excel format beda: kolomnya Cabang, Jan, Feb, Mar, angka kebaca teks, ada baris total di bawah.', [
        ['Append Queries', 'Tumpuk semua file cabang jadi satu tabel. Kolomnya harus namanya sama.'],
        ['Remove Rows → baris "Total"', 'Baris total dibuang, nanti Power BI ngitung sendiri. Kalau dibiarin, totalnya kehitung dobel.'],
        ['Unpivot Columns (Jan, Feb, Mar)', 'Kolom bulan diputar jadi dua kolom: Bulan dan Omzet. Format panjang ini yang disukai Power BI dan Tableau.'],
        ['Change Type: Omzet → Decimal Number', 'Biar bisa dijumlah. Ikon ABC berubah jadi 1.2.'],
        ['Close & Apply', 'Data bersih masuk ke model. Bulan depan tinggal Refresh.'],
      ]),
      PS('Pasangin masalah dengan langkah Power Query-nya.', [['Kolom tanggal kebaca teks', 'Change Type'], ['Data Januari dan Februari di dua tabel terpisah, kolomnya sama', 'Append Queries'], ['Butuh kolom kategori dari tabel Produk', 'Merge Queries'], ['Kolom Jan, Feb, Mar mau dijadiin baris', 'Unpivot Columns']], 'Append = tumpuk ke bawah. Merge = tambah kolom ke samping.'),
      P('Bedanya Merge dan Append?', [['Merge nambah kolom dari tabel lain (kayak JOIN), Append numpuk baris (kayak UNION)', 'Merge ke samping, Append ke bawah.'], ['Sama aja', 'Hasilnya beda bentuk.'], ['Merge buat tanggal, Append buat angka', 'Bukan soal tipe data.'], ['Append buat gabung dua kolom jadi satu', 'Itu Merge Columns, fitur lain.']], 'Ingat SQL: JOIN vs UNION.'),
      P('Kenapa format "panjang" (Bulan, Omzet) lebih baik dari kolom Jan, Feb, Mar?', [['Satu kolom angka bisa dijumlah, difilter, dan dibikin tren per bulan', 'Visual dan DAX butuh satu kolom tanggal/bulan.'], ['Biar filenya kecil', 'Bukan alasan utamanya.'], ['Karena Power BI ga bisa baca kolom banyak', 'Bisa, tapi analisisnya ribet.'], ['Biar keliatan rapi', 'Fungsinya, bukan tampilannya.']], 'Unpivot hampir selalu langkah pertama buat laporan Excel bentuk matriks.'),
      RK('Kartu contekan Power Query', [['Applied Steps', 'langkah kecatat, tinggal Refresh'], ['Change Type', 'betulin tipe data'], ['Unpivot', 'kolom jadi baris'], ['Merge', 'tambah kolom (JOIN)'], ['Append', 'tumpuk baris (UNION)'], ['Close & Apply', 'kirim ke model']]),
    ]),

    L('relasi', 'menengah', 'Relasi antar tabel di Power BI', 8, [
      I('Garis antar tabel', '<p>Di <b>Model view</b>, tabel dihubungin pakai garis. Tiap relasi punya:</p><ul><li><b>Kardinalitas</b>: biasanya <b>one-to-many (1:*)</b>. Satu produk di tabel Produk, muncul berkali-kali di tabel Penjualan.</li><li><b>Arah filter</b>: default <b>single</b>, dari dimensi (sisi 1) ngalir ke fakta (sisi *). Pilih kategori di slicer → baris penjualan ikut kesaring.</li><li><b>Kolom kunci</b>: di sisi 1 harus unik. Kalau dobel, relasinya jadi many-to-many dan angka bisa ngaco.</li></ul>'),
      I('Tabel Kalender', '<p>Buat analisis waktu (YTD, bulan lalu), bikin tabel <b>Kalender</b> sendiri: satu baris per tanggal tanpa bolong, kolom tahun, bulan, kuartal. Tandain <b>Mark as date table</b>, terus hubungin ke kolom tanggal di fakta.</p><p>Kalau fakta punya dua tanggal (tanggal order dan tanggal kirim), cuma satu relasi yang aktif (garis tebal). Yang lain putus-putus, dipakai lewat <code>USERELATIONSHIP</code> di DAX.</p>'),
      C('Nyambungin Produk ke Penjualan', 'Visual "omzet per kategori" nunjukin angka sama di semua kategori. Kita cek modelnya.', [
        ['Cek Model view', 'Ternyata tabel Produk dan Penjualan belum ada garisnya. Tanpa relasi, filter kategori ga ngalir ke penjualan, jadi semua kategori nunjukin total yang sama.'],
        ['Seret Produk[produk_id] ke Penjualan[produk_id]', 'Power BI bikin relasi 1:* (satu produk, banyak penjualan), arah filter single dari Produk ke Penjualan.'],
        ['Cek Produk[produk_id] unik', 'Kalau ada id dobel, Power BI nolak 1:* atau bikin many-to-many. Bersihin dulu di Power Query.'],
        ['Liat visual lagi', 'Sekarang tiap kategori nunjukin omzetnya sendiri.'],
      ], { penutup: 'Gejala klasik relasi belum ada/salah: angka yang sama persis berulang di tiap baris visual.' }),
      P('Visual omzet per kota nunjukin angka sama persis di semua kota. Penyebab paling mungkin?', [['Relasi tabel Pelanggan ke Penjualan belum ada atau arahnya salah', 'Filter kota ga ngalir ke fakta, jadi semua baris dapet total.'], ['Data omzetnya memang sama', 'Hampir mustahil sama persis.'], ['Visualnya kebanyakan', 'Ga ngaruh.'], ['Harus pakai pie', 'Jenis visual ga ngaruh.']], 'Angka kembar = cek Model view.'),
      PS('Pasangin istilah dengan artinya.', [['1:* (one-to-many)', 'Satu baris dimensi, banyak baris fakta'], ['Arah filter single', 'Filter ngalir dari dimensi ke fakta'], ['Relasi putus-putus', 'Relasi ga aktif, dipakai lewat USERELATIONSHIP'], ['Mark as date table', 'Nandain tabel kalender resmi']], 'Model yang rapi bikin DAX sederhana.'),
      RK('Kartu contekan relasi', [['1:*', 'dimensi → fakta'], ['Kunci sisi 1', 'harus unik'], ['Arah filter', 'single, dari dimensi ke fakta'], ['Tabel Kalender', 'tanpa bolong, mark as date table'], ['Angka kembar di visual', 'relasi belum ada/salah']]),
    ]),

    L('powerbi', 'mahir', 'DAX dasar: measure vs calculated column', 9, [
      I('Dua cara bikin hitungan', '<ul><li><b>Calculated column</b>: dihitung <b>per baris</b> pas data di-refresh, disimpen di tabel. Contoh: <code>Omzet = Penjualan[Qty] * Penjualan[Harga]</code>. Bikin file lebih berat.</li><li><b>Measure</b>: dihitung <b>pas dipakai di visual</b>, ngikutin filter yang lagi aktif (kota, bulan, slicer). Contoh: <code>Total Omzet = SUM(Penjualan[Omzet])</code>.</li></ul><p>Aturan praktis: kalau hasilnya mau ditaruh di Values/kartu KPI dan harus ikut filter, bikin <b>measure</b>. Kalau butuh buat ngelompokin/nyaring (misal kelas harga), bikin <b>column</b>.</p>'),
      I('Fungsi DAX pertama', '<table class="tabel-mini"><tr><th>DAX</th><th>arti</th></tr><tr><td><code>SUM(T[kolom])</code></td><td>jumlah</td></tr><tr><td><code>AVERAGE</code>, <code>MIN</code>, <code>MAX</code></td><td>sesuai namanya</td></tr><tr><td><code>COUNTROWS(T)</code></td><td>jumlah baris (misal jumlah transaksi)</td></tr><tr><td><code>DISTINCTCOUNT(T[kolom])</code></td><td>jumlah nilai unik (misal jumlah pelanggan)</td></tr><tr><td><code>DIVIDE(a, b)</code></td><td>bagi yang aman, kalau b = 0 hasilnya kosong, bukan error</td></tr></table><p>Penulisan kolom selalu <code>NamaTabel[NamaKolom]</code>.</p>' + TB_JUAL),
      CK('Measure ngikutin filter visual', 'Pakai tabel Penjualan di atas. Kita bikin measure lalu taruh di visual tabel per kota.', [
        ['Total Omzet = SUM(Penjualan[Omzet])', 'Measure total. Di kartu KPI tanpa filter: 40+10+30+30+15+5 = <b>130</b>.'],
        ['Visual tabel: Kota di Rows, [Total Omzet] di Values', 'Di baris Bandung, filter Kota = Bandung aktif, jadi SUM cuma ngitung baris Bandung: 40 + 10 = <b>50</b>. Jakarta 60, Surabaya 20.'],
        ['Jumlah Transaksi = COUNTROWS(Penjualan)', 'Di baris Jakarta = 2 (dua baris data Jakarta).'],
        ['Rata per Transaksi = DIVIDE([Total Omzet], [Jumlah Transaksi])', 'Measure boleh make measure lain. Jakarta: 60 ÷ 2 = 30.'],
      ], { penutup: 'Rumus measure-nya satu, angkanya beda-beda tiap baris karena filternya beda. Ini yang namanya filter context.' }),
      A('Pakai tabel tadi. Measure <code>Total Omzet = SUM(Penjualan[Omzet])</code> di visual per <b>Produk</b>, baris <b>Kopi</b>, nunjukin berapa (juta)?', 85, 'Filter Produk = Kopi: 40 (Bandung) + 30 (Jakarta) + 15 (Surabaya) = 85.', { satuan: 'juta' }),
      A('Measure <code>Rata = DIVIDE([Total Omzet], COUNTROWS(Penjualan))</code> di baris <b>Surabaya</b>?', 10, 'Surabaya: total 15 + 5 = 20, ada 2 baris. 20 ÷ 2 = 10.', { satuan: 'juta' }),
      P('Mau total omzet yang ikut berubah pas difilter per kota. Bikin...', [['Measure', 'Measure dihitung ulang sesuai filter yang aktif.'], ['Calculated column', 'Column dihitung sekali per baris, bukan buat agregat yang ikut filter.'], ['Tabel baru', 'Ga perlu.'], ['Ketik angka manual', 'Ga bakal ikut filter.']], 'Values dan KPI = measure.'),
      P('Kenapa pakai <code>DIVIDE(a, b)</code> daripada <code>a / b</code>?', [['Kalau b = 0, DIVIDE ngasih kosong, bukan error', 'Visual tetap rapi waktu ada kategori tanpa transaksi.'], ['DIVIDE lebih akurat', 'Hasil baginya sama.'], ['Tanda / ga ada di DAX', 'Ada, cuma ga aman.'], ['Biar lebih panjang', 'Bukan itu.']], 'Kebiasaan bagus di DAX.'),
      RK('Kartu contekan DAX dasar', [['Measure', 'dihitung di visual, ikut filter'], ['Calculated column', 'per baris, disimpen'], ['SUM / COUNTROWS / DISTINCTCOUNT', 'jumlah / baris / unik'], ['DIVIDE(a, b)', 'bagi aman'], ['Tabel[Kolom]', 'cara nulis kolom'], ['Filter context', 'filter aktif nentuin angka measure']]),
    ]),

    L('dax', 'mahir', 'CALCULATE dan filter context', 10, [
      I('CALCULATE = ubah filter', '<pre>Omzet Kopi = CALCULATE([Total Omzet], Penjualan[Produk] = "Kopi")</pre><p>CALCULATE ngitung measure dengan <b>filter yang diubah</b>. Filter di argumen kedua <b>nambah</b> ke filter yang udah ada, atau <b>ngegantiin</b> filter di kolom yang sama.</p><ul><li>Di baris Bandung: filter Kota = Bandung tetap, ditambah Produk = Kopi → 40.</li><li>Di baris Produk = Teh: filter Produk-nya <b>diganti</b> jadi Kopi → nunjukin omzet Kopi total, 85. Ini sering bikin bingung.</li></ul>' + TB_JUAL),
      I('ALL dan persen dari total', '<pre>% Omzet = DIVIDE([Total Omzet], CALCULATE([Total Omzet], ALL(Penjualan)))</pre><p><code>ALL(Penjualan)</code> buang semua filter di tabel itu. Jadi penyebutnya selalu total keseluruhan (130), sementara pembilangnya ngikutin baris.</p><p>Time intelligence (butuh tabel Kalender): <code>TOTALYTD([Total Omzet], Kalender[Tanggal])</code> buat year-to-date, <code>SAMEPERIODLASTYEAR</code> buat bandingin tahun lalu.</p>'),
      CK('Persen kontribusi tiap kota', 'Manajer pengen tau tiap kota nyumbang berapa persen omzet.', [
        ['Total Omzet = SUM(Penjualan[Omzet])', 'Di baris Jakarta = 60.'],
        ['Omzet Semua = CALCULATE([Total Omzet], ALL(Penjualan))', 'ALL buang filter kota, jadi di baris Jakarta pun hasilnya 130.'],
        ['% Omzet = DIVIDE([Total Omzet], [Omzet Semua])', 'Jakarta: 60 ÷ 130 = 0,4615 → format persen jadi 46,2%. Bandung 50 ÷ 130 = 38,5%. Surabaya 15,4%. Totalnya 100%.'],
      ], { penutup: 'Pola "bagian ÷ CALCULATE(…, ALL(…))" dipakai buat persen dari total, pangsa pasar, dan kontribusi.' }),
      A('Measure <code>Omzet Kopi = CALCULATE([Total Omzet], Penjualan[Produk] = "Kopi")</code> di visual per Kota, baris <b>Jakarta</b>?', 30, 'Filter Kota = Jakarta tetap, ditambah Produk = Kopi. Baris yang lolos: Jakarta-Kopi = 30.', { satuan: 'juta' }),
      A('Measure yang sama (<code>Omzet Kopi</code>) di visual per <b>Produk</b>, baris <b>Teh</b>?', 85, 'Filter Produk = Teh diganti CALCULATE jadi Produk = Kopi. Hasilnya omzet Kopi semua kota: 40 + 30 + 15 = 85.', { satuan: 'juta', umum: ['Jawab 0 atau 45: ngira filter Teh dan Kopi digabung. CALCULATE ngegantiin filter di kolom yang sama.'] }),
      A('<code>% Omzet = DIVIDE([Total Omzet], CALCULATE([Total Omzet], ALL(Penjualan)))</code> di baris <b>Bandung</b>, dalam persen (1 desimal)?', 38.5, '50 ÷ 130 = 0,3846 = 38,5%.', { satuan: '%', toleransi: 0.06 }),
      P('Fungsi <code>ALL(Penjualan)</code> di dalam CALCULATE?', [['Buang semua filter dari tabel Penjualan', 'Penyebutnya jadi total keseluruhan.'], ['Ngambil semua kolom', 'Bukan buat milih kolom.'], ['Ngitung semua baris', 'Itu COUNTROWS.'], ['Nambah filter', 'Kebalikannya.']], 'ALL = reset filter.'),
      RK('Kartu contekan CALCULATE', [['CALCULATE(measure, filter)', 'hitung dengan filter diubah'], ['Filter kolom yang sama', 'diganti, bukan digabung'], ['ALL(tabel)', 'buang filter'], ['bagian ÷ CALCULATE(…, ALL)', 'persen dari total'], ['TOTALYTD / SAMEPERIODLASTYEAR', 'butuh tabel Kalender']]),
    ]),

    L('tableau', 'menengah', 'Tableau: dimension, measure, dan shelf', 9, [
      I('Bahasa Tableau', '<ul><li><b>Dimension</b>: kategori (Kota, Produk, Tanggal). Biasanya <b>biru</b> = discrete, bikin header/kelompok.</li><li><b>Measure</b>: angka yang diagregat (SUM(Sales)). Biasanya <b>hijau</b> = continuous, bikin sumbu.</li><li><b>Shelf Columns dan Rows</b>: seret field ke sini buat bikin grafik. Measure di Rows + dimension di Columns = batang.</li><li><b>Marks card</b>: Color, Size, Label, Detail, Tooltip. Seret field ke sini buat nambah informasi ke tiap tanda di grafik.</li><li><b>Filters shelf</b> dan <b>Show Me</b> (saran jenis grafik).</li></ul>'),
      I('Sheet, Dashboard, Story', '<p>Satu grafik = satu <b>Sheet</b>. Beberapa sheet disusun di <b>Dashboard</b>, bisa dikasih <b>action</b> (klik satu grafik, grafik lain kefilter). <b>Story</b> = urutan dashboard kayak slide presentasi.</p><p>Hasil bisa dipublish gratis ke <b>Tableau Public</b>, enak buat portofolio, tapi datanya jadi publik.</p>'),
      C('Batang omzet per kota di Tableau', 'Data penjualan udah ke-connect. Kita bikin grafik omzet per kota diurutin.', [
        ['Seret Kota ke Columns', 'Muncul header nama kota (biru, discrete).'],
        ['Seret Sales ke Rows', 'Otomatis jadi SUM(Sales) (hijau, continuous) dan Tableau gambar batang.'],
        ['Klik ikon Sort descending di toolbar', 'Batang diurutin dari terbesar.'],
        ['Seret Produk ke Color di Marks card', 'Tiap batang dipecah warna per produk (stacked bar).'],
        ['Seret SUM(Sales) ke Label', 'Angka muncul di atas batang.'],
      ]),
      PS('Pasangin bagian Tableau dengan gunanya.', [['Columns / Rows shelf', 'Nentuin sumbu dan header grafik'], ['Marks card', 'Warna, ukuran, label, tooltip tiap tanda'], ['Filters shelf', 'Nyaring data di sheet'], ['Show Me', 'Saran jenis grafik']], 'Hampir semua kerja Tableau = seret field ke shelf.'),
      P('Field hijau di Tableau biasanya artinya...', [['Continuous, bikin sumbu berkelanjutan', 'Hijau = continuous, biru = discrete.'], ['Error', 'Error ditandai merah/tanda seru.'], ['Dimension', 'Dimension biasanya biru.'], ['Udah difilter', 'Warna ga nunjukin filter.']], 'Biru = header/kelompok, hijau = sumbu.'),
      P('Di Tableau, "Kota" termasuk...', [['Dimension', 'Kategori buat ngelompokin.'], ['Measure', 'Measure itu angka yang diagregat.'], ['Parameter', 'Parameter itu input yang dibikin user.'], ['Filter wajib', 'Ga ada istilah itu.']], 'Sama kayak dimensi di Power BI.'),
      RK('Kartu contekan Tableau', [['Dimension (biru)', 'kategori, header'], ['Measure (hijau)', 'angka, sumbu'], ['Columns / Rows', 'bentuk grafik'], ['Marks card', 'Color, Size, Label, Detail, Tooltip'], ['Sheet → Dashboard → Story', 'grafik → halaman → presentasi']]),
    ]),

    L('lod', 'mahir', 'Tableau: calculated field dan LOD', 9, [
      I('Calculated field', '<p>Analysis → Create Calculated Field. Contoh:</p><pre>// rasio\nSUM([Profit]) / SUM([Sales])\n\n// kategori\nIF [Sales] >= 1000000 THEN "Besar" ELSE "Kecil" END</pre><p>Penting: <code>SUM([Profit]) / SUM([Sales])</code> (agregat dulu baru dibagi) beda sama <code>[Profit] / [Sales]</code> (dibagi per baris, terus dijumlah). Buat margin keseluruhan, yang bener versi pertama.</p>'),
      I('LOD: ngitung di level tertentu', '<pre>{ FIXED [Pelanggan] : MIN([Tanggal Order]) }</pre><p>LOD (Level of Detail) ngitung di level yang kamu tentuin, ga peduli grafiknya lagi per apa. Contoh di atas: tanggal pembelian pertama tiap pelanggan, buat analisis kohort.</p><ul><li><code>FIXED</code>: level tetap.</li><li><code>INCLUDE</code>: tambah level lebih detail.</li><li><code>EXCLUDE</code>: buang satu level.</li></ul><p>Padanannya di Power BI: CALCULATE dengan ALLEXCEPT/ALL.</p>'),
      CK('Margin yang bener', 'Dua transaksi: A (Sales 100, Profit 50) dan B (Sales 900, Profit 90).', [
        ['SUM([Profit] / [Sales])', 'Per baris dulu: A = 0,5, B = 0,1. Dijumlah = 0,6 → margin 60%. Salah besar, masa margin 60%?'],
        ['AVG([Profit] / [Sales])', 'Rata-rata rasio per baris: (0,5 + 0,1) ÷ 2 = 30%. Masih salah, transaksi kecil dianggap sama penting.'],
        ['SUM([Profit]) / SUM([Sales])', 'Agregat dulu: 140 ÷ 1000 = <b>14%</b>. Ini margin yang bener.'],
      ], { penutup: 'Rasio = jumlahin pembilang dan penyebut dulu, baru dibagi. Berlaku juga di Excel, SQL, dan DAX.' }),
      A('Transaksi: A (Sales 200, Profit 20), B (Sales 300, Profit 60). Margin keseluruhan yang bener, dalam persen?', 16, '(20 + 60) ÷ (200 + 300) = 80 ÷ 500 = 16%.', { satuan: '%', umum: ['Rata-rata rasio: (10% + 20%) ÷ 2 = 15%. Salah karena B lebih besar tapi bobotnya disamain.'] }),
      P('Mau tau tanggal beli pertama tiap pelanggan, apa pun grafiknya. Pakai?', [['{ FIXED [Pelanggan] : MIN([Tanggal Order]) }', 'FIXED ngunci level ke pelanggan.'], ['MIN([Tanggal Order])', 'Ikut level grafik, bisa berubah.'], ['SUM([Tanggal Order])', 'Tanggal ga dijumlah.'], ['Filter tanggal', 'Filter ga ngitung tanggal pertama.']], 'FIXED = level tetap.'),
      P('Calculated field <code>IF [Sales] >= 1000000 THEN "Besar" ELSE "Kecil" END</code> hasilnya jadi...', [['Dimension baru (kategori)', 'Hasilnya teks, dipakai buat ngelompokin.'], ['Measure', 'Teks ga bisa diagregat jadi angka.'], ['Error karena ga ada ELSE IF', 'ELSE cukup.'], ['Parameter', 'Parameter dibikin lewat menu lain.']], 'Sama kayak CASE WHEN di SQL atau IF di Excel.'),
      RK('Kartu contekan calculated field', [['SUM(a) / SUM(b)', 'rasio yang bener'], ['IF … THEN … ELSE … END', 'kategori baru'], ['{ FIXED [x] : agg }', 'hitung di level x'], ['INCLUDE / EXCLUDE', 'tambah / buang level'], ['Padanan Power BI', 'CALCULATE + ALL/ALLEXCEPT']]),
    ]),

    L('cerita', 'mahir', 'Storytelling dengan data', 8, [
      I('Data + cerita = keputusan', '<p>Struktur sederhana yang dipakai konsultan:</p><ol><li><b>Konteks</b>: situasinya apa, kenapa ini penting.</li><li><b>Temuan</b>: apa yang data bilang (1 sampai 3 poin, jangan semua).</li><li><b>Implikasi</b>: terus kenapa? Dampaknya ke uang/pelanggan.</li><li><b>Rekomendasi</b>: harus ngapain, siapa, kapan.</li></ol><p>Judul grafik sebaiknya <b>kalimat kesimpulan</b>: "Omzet Bandung turun 20% sejak promo berhenti" lebih kuat dari "Omzet per kota".</p>'),
      C('Dari angka jadi cerita', 'Temuan mentah: retur bulan September 9%, biasanya 3%. Retur naik setelah ganti kurir tanggal 1 September.', [
        ['Konteks', '"Retur itu biaya: ongkir dua kali plus barang rusak. Target kita di bawah 4%."'],
        ['Temuan', '"Retur September 9%, tiga kali lipat rata-rata. Kenaikannya mulai tepat setelah ganti kurir."'],
        ['Implikasi', '"Kalau berlanjut, biaya retur bulanan naik sekitar Rp 40 juta."'],
        ['Rekomendasi', '"Uji balik ke kurir lama buat pengiriman Jawa selama 2 minggu, bandingin rasio returnya."'],
        ['Judul grafik', '"Retur naik 3 kali lipat sejak ganti kurir" + garis vertikal di tanggal 1 September.'],
      ]),
      P('Judul grafik paling kuat?', [['"Retur naik 3 kali lipat sejak ganti kurir"', 'Langsung nyampein temuan.'], ['"Grafik retur"', 'Cuma label.'], ['"Data retur 2026"', 'Pembaca harus nyimpulin sendiri.'], ['"Retur per bulan (unit)"', 'Deskriptif, bukan kesimpulan.']], 'Judul = kesimpulan.'),
      U('Susun alur presentasi data ini.', ['Konteks: target kuartal ini', 'Temuan: kota mana yang paling jauh dari target', 'Implikasi: dampaknya ke omzet tahunan', 'Rekomendasi: 2 langkah perbaikan'], 'Konteks, temuan, implikasi, rekomendasi.'),
      SK('Pas presentasi, direktur motong: "Intinya apa?" Respons terbaik?', [['Langsung sebut rekomendasi dan satu angka pendukungnya', 2, 'Hormatin waktunya, detail bisa nyusul.'], ['Minta izin nyelesaiin slide dulu', 0, 'Direktur udah ngasih sinyal butuh inti.'], ['Ngulang dari slide pertama lebih cepat', 1, 'Masih belum to the point.']]),
      RK('Kartu contekan storytelling', [['Konteks', 'kenapa penting'], ['Temuan', '1 sampai 3 poin'], ['Implikasi', 'dampak ke uang/pelanggan'], ['Rekomendasi', 'apa, siapa, kapan'], ['Judul', 'kalimat kesimpulan']]),
    ]),
  ]
  const VZ_TES = [
    T('dasar', 'Mau nunjukin tren penjualan 12 bulan. Grafik paling pas?', ['Garis (line chart)', 'Pie chart', 'Tabel', 'Scatter'], 'Tren waktu = garis.'),
    T('dasar', 'Bandingin penjualan 6 kota. Grafik paling pas?', ['Batang (bar chart)', 'Pie 3D', 'Garis', 'Peta panas'], 'Bandingin kategori = batang, diurutin.'),
    T('menengah', 'Di Power BI, tabel Penjualan (tanggal, produk_id, qty) itu jenis tabel apa?', ['Tabel fakta', 'Tabel dimensi', 'Tabel kalender', 'Tabel parameter'], 'Kejadian dengan angka = fakta.'),
    T('menengah', 'Kolom tanggal kebaca sebagai teks di Power BI. Benerinnya di mana?', ['Power Query', 'DAX', 'Visual', 'Ga bisa'], 'Tipe data dibenerin di Power Query (Change Type).'),
    T('menengah', 'Grafik batang dengan sumbu Y mulai dari 95 bikin...', ['Beda kecil keliatan besar', 'Data lebih akurat', 'Lebih gampang dibaca', 'Ga ada pengaruh'], 'Panjang batang harus mewakili nilai, jadi wajib dari nol.'),
    T('mahir', 'Di star schema, tabel transaksi disebut...', ['Tabel fakta', 'Tabel dimensi', 'Tabel bantu', 'Tabel kalender'], 'Fakta di tengah, dimensi di sekeliling.'),
    T('mahir', 'CALCULATE([Total], Produk[Nama] = "Kopi") di baris produk Teh nunjukin...', ['Omzet Kopi', 'Omzet Teh', '0', 'Error'], 'CALCULATE ngegantiin filter di kolom yang sama.'),
    T('mahir', 'Margin keseluruhan di Tableau yang bener?', ['SUM([Profit]) / SUM([Sales])', 'SUM([Profit] / [Sales])', 'AVG([Profit] / [Sales])', 'MAX([Profit]) / MAX([Sales])'], 'Agregat dulu, baru dibagi.'),
  ]
  susun('VZ', VZ, VZ_TES)

  // ===================================================================
  // STATISTIK
  // ===================================================================
  const ST = [
    L('pusat', 'dasar', 'Mean, median, modus, dan pencilan', 8, [
      I('Tiga cara nyari "tengah"', '<ul><li><b>Mean</b> (rata-rata): jumlah semua ÷ banyak data.</li><li><b>Median</b>: nilai tengah setelah <b>diurutin</b>. Kalau datanya genap, rata-rata dua nilai tengah.</li><li><b>Modus</b>: nilai yang paling sering muncul.</li></ul><p><b>Pencilan</b> (outlier) = nilai yang jauh dari yang lain. Pencilan narik mean, median tahan.</p>'),
      I('Kapan pakai median', '<p>Gaji 5 orang: 4, 5, 5, 6, dan 30 juta. <b>Mean</b> 10 juta, padahal 4 dari 5 orang gajinya 6 juta ke bawah. <b>Median</b> 5 juta lebih jujur.</p><p>Data yang "miring" (gaji, harga rumah, omzet per toko, waktu kirim paket) pakai median. Data yang simetris (tinggi badan, nilai ujian) mean dan median mirip.</p>'),
      C('Ngitung mean dan median waktu kirim', 'Waktu kirim 6 paket (hari): 2, 3, 3, 4, 3, 15.', [
        ['2 + 3 + 3 + 4 + 3 + 15 = 30', '<b>Mean</b>: jumlahin semua dulu.'],
        ['30 ÷ 6 = 5 hari', 'Bagi banyak datanya. Mean 5 hari, padahal cuma 1 paket yang lebih dari 4 hari.'],
        ['2, 3, 3, 3, 4, 15', '<b>Median</b>: urutin dulu. Wajib.'],
        ['(3 + 3) ÷ 2 = 3 hari', 'Datanya genap (6), jadi ambil dua nilai tengah (ke-3 dan ke-4), rata-ratain.'],
        ['Modus = 3', 'Nilai 3 muncul paling sering (3 kali).'],
      ], { penutup: 'Kalau mau bilang "biasanya paket nyampe berapa hari", median 3 hari jauh lebih jujur daripada mean 5 hari.' }),
      A('Data: 3, 7, 7, 9, 14. Berapa <b>mean</b>-nya?', 8, '(3 + 7 + 7 + 9 + 14) ÷ 5 = 40 ÷ 5 = 8.'),
      A('Data: 12, 5, 9, 20, 7. Berapa <b>median</b>-nya?', 9, 'Diurutin dulu: 5, 7, 9, 12, 20. Nilai tengahnya (ke-3) 9.', { umum: ['Jawab 9 karena kebetulan ada di tengah tanpa diurutin. Selalu urutin dulu.', 'Jawab 20 atau 12: ngambil nilai tengah sebelum diurutin.'] }),
      A('Data: 4, 8, 6, 10. Berapa <b>median</b>-nya?', 7, 'Urutin: 4, 6, 8, 10. Genap, jadi (6 + 8) ÷ 2 = 7.'),
      { t: 'slider', tanya: 'Tebak dulu: kalau gaji 30 juta di contoh tadi diganti 300 juta, mean-nya jadi kira-kira berapa juta?', min: 0, max: 100, step: 1, benar: 64, toleransi: 3, satuan: 'juta', jelas: '(4 + 5 + 5 + 6 + 300) ÷ 5 = 64 juta. Mediannya tetap 5. Satu orang aja bisa nyeret mean jauh banget.' },
      RK('Kartu contekan pusat data', [['Mean', 'jumlah ÷ banyak data'], ['Median', 'urutin, ambil tengah (genap: rata-rata 2 tengah)'], ['Modus', 'paling sering muncul'], ['Ada pencilan', 'pakai median'], ['Data simetris', 'mean ≈ median']]),
    ]),

    L('persen', 'dasar', 'Persen, persen poin, dan rasio', 8, [
      I('Persen perubahan', '<pre>perubahan % = (baru − lama) ÷ lama × 100%</pre><p>Penyebutnya selalu nilai <b>lama</b> (titik awal). Naik dari 80 ke 100 = (100 − 80) ÷ 80 = 25%. Turun dari 100 ke 80 = (80 − 100) ÷ 100 = −20%. Naik 25% terus turun 20% balik ke angka awal, bukan +5%.</p>'),
      I('Persen vs persen poin', '<p>Conversion rate naik dari 2% ke 3%:</p><ul><li>naik <b>1 persen poin</b> (3 − 2)</li><li>naik <b>50 persen</b> ((3 − 2) ÷ 2)</li></ul><p>Dua-duanya bener, tapi artinya jauh beda. Di laporan, tulis jelas yang mana. <b>Rasio/rate</b> = bagian ÷ keseluruhan: conversion rate = pembeli ÷ pengunjung.</p>'),
      C('Laporan bulanan', 'Omzet Oktober 80 juta, November 100 juta. Pengunjung November 4.000, yang beli 260.', [
        ['100 − 80 = 20 juta', 'Selisihnya dulu.'],
        ['20 ÷ 80 = 0,25 → 25%', 'Bagi pakai nilai <b>lama</b> (Oktober). Omzet naik 25%.'],
        ['260 ÷ 4.000 = 0,065 → 6,5%', 'Conversion rate November.'],
        ['Oktober 5% → November 6,5%', 'Naik 1,5 persen poin, atau naik 30% (1,5 ÷ 5).'],
      ]),
      A('Omzet bulan lalu 80 juta, bulan ini 100 juta. Naik berapa <b>persen</b>?', 25, '(100 − 80) ÷ 80 × 100% = 25%.', { satuan: '%', umum: ['Dibagi 100 (nilai baru) → 20%. Penyebutnya harus nilai lama.'] }),
      A('Halaman toko: 4.000 pengunjung, 260 beli. <b>Conversion rate</b>-nya berapa persen?', 6.5, '260 ÷ 4.000 = 0,065 = 6,5%.', { satuan: '%', toleransi: 0.05 }),
      A('Tingkat pengangguran turun dari 8% ke 6%. Turun berapa <b>persen poin</b>?', 2, '8 − 6 = 2 persen poin. (Kalau dalam persen: 2 ÷ 8 = 25%.)', { satuan: 'poin' }),
      P('Kota yang banyak cabang gym-nya punya penjualan protein lebih tinggi. Boleh disimpulin gym bikin orang beli protein?', [['Belum tentu, bisa ada faktor lain (kota besar, pendapatan)', 'Korelasi bukan sebab-akibat.'], ['Pasti iya', 'Datanya cuma nunjukin naik bareng.'], ['Pasti nggak', 'Bisa jadi iya, tapi belum terbukti.'], ['Datanya pasti salah', 'Datanya bisa aja bener.']], 'Cek faktor ketiga dulu. Dibahas lebih dalam di pelajaran korelasi.'),
      RK('Kartu contekan persen', [['(baru − lama) ÷ lama', 'persen perubahan'], ['Persen poin', 'selisih dua persen'], ['Rate', 'bagian ÷ keseluruhan'], ['+25% lalu −20%', 'balik ke awal'], ['Laporan', 'tulis jelas persen atau persen poin']]),
    ]),

    L('peluang', 'dasar', 'Peluang dasar', 9, [
      I('Peluang = kemungkinan dalam angka 0 sampai 1', '<pre>P(kejadian) = banyak hasil yang diinginkan ÷ banyak semua hasil</pre><p>Dadu: P(angka 6) = 1/6. P(genap) = 3/6 = 0,5. Peluang 0 = mustahil, 1 = pasti. <b>Komplemen</b>: P(tidak terjadi) = 1 − P(terjadi).</p>'),
      I('Dan, atau, bersyarat', '<ul><li><b>Dan</b> (dua kejadian <b>independen</b>, ga saling ngaruh): dikali. P(dua koin muncul gambar) = 0,5 × 0,5 = 0,25.</li><li><b>Atau</b> (ga bisa terjadi bareng): dijumlah. P(dadu 1 atau 2) = 1/6 + 1/6 = 1/3.</li><li><b>Bersyarat</b> P(A | B) = peluang A <i>kalau udah tau</i> B terjadi = P(A dan B) ÷ P(B).</li></ul><p class="tip">"Minimal satu" paling gampang dihitung pakai komplemen: 1 − P(ga ada sama sekali).</p>'),
      C('Peluang minimal satu email dibuka', 'Open rate email 20%. Kita kirim ke 3 orang (dianggap independen). Berapa peluang minimal satu orang buka?', [
        ['P(satu orang ga buka) = 1 − 0,2 = 0,8', 'Pakai komplemen.'],
        ['P(tiga-tiganya ga buka) = 0,8 × 0,8 × 0,8 = 0,512', 'Independen, jadi dikali.'],
        ['P(minimal satu buka) = 1 − 0,512 = 0,488', 'Komplemen lagi. Sekitar 48,8%.'],
      ], { penutup: 'Kalau dihitung langsung (tepat 1, tepat 2, tepat 3), ribet. Komplemen bikin satu baris.' }),
      A('Kotak isi 3 bola merah dan 7 biru. Ambil satu acak. Peluang merah (desimal)?', 0.3, '3 ÷ 10 = 0,3.', { toleransi: 0.001 }),
      A('Dua koin dilempar. Peluang dua-duanya angka (desimal)?', 0.25, '0,5 × 0,5 = 0,25. Independen = dikali.', { toleransi: 0.001 }),
      A('Peluang pelanggan komplain 0,1. Dari 2 pelanggan (independen), peluang <b>minimal satu</b> komplain (desimal)?', 0.19, '1 − (0,9 × 0,9) = 1 − 0,81 = 0,19.', { toleransi: 0.001, umum: ['Jawab 0,2 (0,1 + 0,1): penjumlahan cuma boleh kalau dua kejadian ga bisa terjadi bareng. Di sini dua-duanya bisa komplain.'] }),
      P('100 pelamar: 40 lulusan teknik, 10 dari mereka diterima. Peluang diterima <b>kalau</b> dia lulusan teknik?', [['10/40 = 0,25', 'Bersyarat: semesta-nya cuma 40 lulusan teknik.'], ['10/100 = 0,1', 'Itu peluang diterima DAN teknik dari semua pelamar.'], ['40/100 = 0,4', 'Itu peluang dia lulusan teknik.'], ['10/60', 'Penyebutnya salah grup.']], '"Kalau" = persempit semestanya.'),
      RK('Kartu contekan peluang', [['P = diinginkan ÷ semua', '0 sampai 1'], ['1 − P', 'komplemen'], ['Dan (independen)', 'dikali'], ['Atau (ga bisa bareng)', 'dijumlah'], ['P(A | B)', 'P(A dan B) ÷ P(B)'], ['"Minimal satu"', '1 − P(ga ada)']]),
    ]),

    L('sebaran', 'menengah', 'Sebaran data: range, standar deviasi, IQR', 9, [
      I('Rata-rata aja ga cukup', '<p>Kelas A nilainya 70, 70, 70. Kelas B: 50, 70, 90. Rata-ratanya sama-sama 70, tapi B jauh lebih nyebar.</p><ul><li><b>Range</b> = maks − min. Gampang, tapi sensitif pencilan.</li><li><b>Standar deviasi (SD)</b> = rata-rata jarak data dari mean. Makin besar, makin nyebar.</li><li><b>Kuartil</b>: Q1 (25% data di bawahnya), Q2 = median, Q3 (75%). <b>IQR</b> = Q3 − Q1, sebaran 50% data di tengah.</li></ul>'),
      I('Cara ngitung SD dan nyari pencilan', '<ol><li>Hitung mean.</li><li>Kurangin tiap data dengan mean, kuadratin.</li><li>Rata-ratain kuadrat itu (bagi n untuk populasi, n − 1 untuk sampel) = <b>varians</b>.</li><li>Akar varians = <b>SD</b>.</li></ol><p><b>Aturan pencilan IQR</b>: data di bawah Q1 − 1,5 × IQR atau di atas Q3 + 1,5 × IQR dianggap pencilan. Ini yang dipakai box plot.</p><p>Di Excel: <code>STDEV.S</code> (sampel), <code>STDEV.P</code> (populasi), <code>QUARTILE.INC</code>.</p>'),
      C('SD kelas B', 'Nilai kelas B: 50, 70, 90 (anggap populasi).', [
        ['mean = (50 + 70 + 90) ÷ 3 = 70', 'Langkah 1.'],
        ['(50−70)² = 400, (70−70)² = 0, (90−70)² = 400', 'Langkah 2: selisih dari mean, dikuadratin biar yang minus ga ngebatalin yang plus.'],
        ['varians = (400 + 0 + 400) ÷ 3 = 266,7', 'Langkah 3: rata-ratain.'],
        ['SD = √266,7 ≈ 16,3', 'Langkah 4: akar. Rata-rata nilai siswa B berjarak sekitar 16 poin dari 70. Kelas A SD-nya 0.'],
      ]),
      A('Data: 4, 8, 15, 16, 23. Berapa <b>range</b>-nya?', 19, '23 − 4 = 19.'),
      A('Q1 = 20, Q3 = 40. Batas atas pencilan (Q3 + 1,5 × IQR)?', 70, 'IQR = 40 − 20 = 20. 40 + 1,5 × 20 = 70. Data di atas 70 dianggap pencilan.'),
      P('Kelas A nilainya 70, 70, 70. Kelas B: 50, 70, 90. Standar deviasinya?', [['B lebih besar', 'B nyebar, A ga nyebar sama sekali (SD 0).'], ['A lebih besar', 'A semuanya sama.'], ['Sama', 'Mean sama, sebaran beda.'], ['Ga bisa dihitung', 'Bisa.']], 'SD ngukur sebaran, bukan pusat.'),
      P('Waktu antar paket: sebagian besar 2 sampai 3 hari, tapi beberapa 15 hari. Ukuran sebaran yang paling tahan pencilan?', [['IQR', 'Cuma liat 50% data di tengah.'], ['Range', 'Langsung kena pencilan 15 hari.'], ['SD', 'SD juga ketarik pencilan karena dikuadratin.'], ['Mean', 'Mean bukan ukuran sebaran.']], 'Median + IQR = pasangan tahan pencilan.'),
      RK('Kartu contekan sebaran', [['Range', 'maks − min'], ['SD', 'rata-rata jarak dari mean'], ['IQR', 'Q3 − Q1'], ['Pencilan', '< Q1 − 1,5 IQR atau > Q3 + 1,5 IQR'], ['Excel', 'STDEV.S, QUARTILE.INC']]),
    ]),

    L('normal', 'menengah', 'Distribusi normal dan z-score', 8, [
      I('Kurva lonceng', '<p>Banyak data (tinggi badan, skor tes, error ukur alat) bentuknya mirip lonceng simetris: <b>distribusi normal</b>. Aturan praktisnya (68-95-99,7):</p><ul><li>sekitar <b>68%</b> data ada dalam ±1 SD dari mean</li><li>sekitar <b>95%</b> dalam ±2 SD</li><li>sekitar <b>99,7%</b> dalam ±3 SD</li></ul>'),
      I('Z-score', '<pre>z = (nilai − mean) ÷ SD</pre><p>Z-score bilang nilai itu <b>berapa SD jauhnya</b> dari rata-rata. z = 2 artinya 2 SD di atas rata-rata (masuk 2,5% teratas). Gunanya buat ngebandingin hal yang satuannya beda, misalnya nilai TPA dan nilai bahasa Inggris.</p>'),
      C('Bandingin dua nilai tes', 'Kandidat dapet 75 di tes logika (mean 60, SD 10) dan 82 di tes bahasa (mean 78, SD 8). Mana yang lebih menonjol?', [
        ['z logika = (75 − 60) ÷ 10 = 1,5', '1,5 SD di atas rata-rata.'],
        ['z bahasa = (82 − 78) ÷ 8 = 0,5', 'Cuma 0,5 SD di atas rata-rata.'],
        ['1,5 > 0,5', 'Walau angka mentahnya lebih kecil, nilai logika jauh lebih menonjol dibanding kandidat lain.'],
      ]),
      A('Mean skor tes 500, SD 100. Berapa <b>z-score</b> skor 700?', 2, '(700 − 500) ÷ 100 = 2.'),
      A('Mean 60, SD 10, distribusi normal. Kira-kira berapa persen data ada di antara 50 sampai 70?', 68, '50 dan 70 = mean ± 1 SD → sekitar 68%.', { satuan: '%' }),
      A('Mean 60, SD 10. Kira-kira berapa persen data <b>di atas 80</b>?', 2.5, '80 = mean + 2 SD. 95% ada di 40–80, sisa 5% dibagi dua sisi, jadi 2,5% di atas 80.', { satuan: '%', toleransi: 0.1 }),
      RK('Kartu contekan normal', [['±1 SD', '≈ 68%'], ['±2 SD', '≈ 95%'], ['±3 SD', '≈ 99,7%'], ['z = (x − mean) ÷ SD', 'berapa SD dari rata-rata'], ['z = 2', 'sekitar 2,5% teratas']]),
    ]),

    L('sampel', 'menengah', 'Sampel, bias, dan margin of error', 8, [
      I('Ga mungkin nanya semua orang', '<p><b>Populasi</b> = semua yang mau diteliti. <b>Sampel</b> = sebagian yang diambil. Biar hasil sampel bisa dipakai buat nyimpulin populasi, sampelnya harus <b>acak</b> dan <b>mewakili</b>.</p><p>Bias yang sering kejadian:</p><ul><li><b>Bias seleksi</b>: yang ikut survei bukan gambaran populasi (survei kepuasan cuma ke follower Instagram).</li><li><b>Bias non-respon</b>: yang mau jawab beda karakter dari yang ga mau.</li><li><b>Survivorship bias</b>: cuma liat yang "selamat" (startup sukses), yang gagal ga kedata.</li></ul>'),
      I('Margin of error', '<p>Hasil survei "52% ± 3%" artinya nilai asli populasi kemungkinan besar (biasanya 95% yakin) ada di <b>49% sampai 55%</b>.</p><p>Makin besar sampel, makin kecil margin of error, tapi ga linear: mau margin jadi setengahnya, sampel harus <b>4 kali</b> lipat. Rumus kasar buat proporsi: margin ≈ 1 ÷ √n. Sampel 400 → ±5%, sampel 1.600 → ±2,5%.</p>'),
      C('Nilai survei elektabilitas', 'Survei 1.000 orang: kandidat A 48%, B 45%. Media nulis "A unggul".', [
        ['margin ≈ 1 ÷ √1000 ≈ 0,032 → ±3,2%', 'Hitung margin kasar.'],
        ['A: 44,8% sampai 51,2%. B: 41,8% sampai 48,2%', 'Rentang dua kandidat tumpang tindih.'],
        ['Kesimpulan', 'Belum bisa bilang A unggul. Selisih 3% masih di dalam margin of error, istilahnya "statistically tied".'],
      ]),
      P('Survei kepuasan pelanggan cuma disebar ke follower Instagram brand. Masalahnya?', [['Bias seleksi, yang follow cenderung udah suka', 'Sampel ga mewakili semua pelanggan.'], ['Sampelnya terlalu besar', 'Bukan soal ukuran.'], ['Ga ada masalah', 'Hasilnya bakal terlalu positif.'], ['Harus pakai kertas', 'Medium bukan masalahnya.']], 'Tanya: siapa yang ga ikut kesurvei?'),
      P('Hasil survei 52% ± 3%. Artinya...', [['Hasil asli kemungkinan antara 49% dan 55%', 'Rentang ketidakpastian.'], ['Pasti 52%', 'Sampel ga pernah pasti.'], ['Salah 3 orang', 'Margin bukan jumlah orang.'], ['Harus diulang', 'Ga harus.']], 'Laporin angka plus margin-nya.'),
      A('Rumus kasar margin of error ≈ 1 ÷ √n. Sampel <b>2.500</b> orang, margin-nya berapa persen?', 2, '√2500 = 50. 1 ÷ 50 = 0,02 = 2%.', { satuan: '%' }),
      RK('Kartu contekan sampel', [['Populasi vs sampel', 'semua vs sebagian'], ['Bias seleksi', 'sampel ga mewakili'], ['Survivorship', 'cuma liat yang berhasil'], ['Margin ≈ 1/√n', 'proporsi, 95%'], ['Margin setengah', 'sampel 4×']]),
    ]),

    L('hipotesis', 'mahir', 'Uji hipotesis dan p-value', 9, [
      I('Beneran beda atau kebetulan?', '<ul><li><b>H0</b> (hipotesis nol): ga ada beda / ga ada efek.</li><li><b>H1</b>: ada beda.</li><li><b>p-value</b>: peluang dapet hasil seekstrem ini <b>kalau H0 bener</b>.</li></ul><p>Pakai batas <b>α = 0,05</b>: p &lt; 0,05 → tolak H0, bedanya <b>signifikan</b>. p ≥ 0,05 → gagal tolak H0 (belum ada bukti cukup, bukan berarti terbukti sama).</p>'),
      I('Jebakan p-value', '<ul><li>p-value <b>bukan</b> peluang H0 bener.</li><li>Signifikan secara statistik ≠ penting secara bisnis. Data jutaan baris bikin beda 0,01% pun signifikan.</li><li><b>Error tipe I</b>: nolak H0 padahal H0 bener (alarm palsu). <b>Error tipe II</b>: gagal nolak padahal ada efek (kelewatan).</li><li>Ngetes 20 hal sekaligus dengan α 0,05, kira-kira 1 bakal "signifikan" cuma karena kebetulan.</li></ul>'),
      C('Baca hasil uji', 'Tim produk ngetes fitur rekomendasi. Durasi sesi grup lama 6,1 menit, grup baru 6,4 menit, p-value 0,03.', [
        ['H0: durasi sama. H1: durasi beda.', 'Tulis hipotesisnya dulu.'],
        ['p = 0,03 < 0,05', 'Bandingin sama α. Tolak H0.'],
        ['Kesimpulan statistik', 'Ada bukti beda durasi yang signifikan.'],
        ['Kesimpulan bisnis', 'Naik 0,3 menit (5%). Tanya: apakah sepadan sama biaya maintain fitur? Signifikan belum tentu layak.'],
      ]),
      P('A/B test tombol: p-value = 0,02. Kesimpulan dengan batas 0,05?', [['Bedanya signifikan, tolak H0', '0,02 < 0,05.'], ['Ga signifikan', 'Kebalik.'], ['H0 pasti bener', 'p kecil justru bukti melawan H0.'], ['Konversinya 2%', 'p-value bukan conversion rate.']], 'p < α → tolak H0.'),
      P('p-value = 0,40 artinya...', [['Belum ada bukti cukup kalau ada beda', 'Gagal tolak H0.'], ['Pasti ga ada beda', 'Gagal tolak ≠ membuktikan H0.'], ['Ada beda 40%', 'p-value bukan ukuran efek.'], ['Datanya salah', 'Bisa aja datanya bener, efeknya memang kecil/ga ada.']], 'Absence of evidence ≠ evidence of absence.'),
      P('Konversi naik dari 2,00% ke 2,01%, signifikan karena datanya jutaan. Yang perlu ditanya?', [['Apakah kenaikan sekecil itu sepadan biayanya', 'Signifikan statistik ≠ penting bisnis.'], ['Ga perlu nanya, langsung terapin', 'Belum tentu untung.'], ['Ulang tes sampai ga signifikan', 'Itu manipulasi.'], ['Hapus data', 'Jangan.']], 'Selalu liat besar efeknya.'),
      RK('Kartu contekan uji hipotesis', [['H0', 'ga ada beda'], ['p < 0,05', 'tolak H0, signifikan'], ['p ≥ 0,05', 'gagal tolak, bukan bukti sama'], ['Tipe I / II', 'alarm palsu / kelewatan'], ['Signifikan ≠ penting', 'liat besar efek dan biaya']]),
    ]),

    L('abtest', 'mahir', 'A/B test dari awal sampai keputusan', 10, [
      I('Langkah A/B test', '<ol><li><b>Hipotesis</b>: "Tombol hijau naikin klik beli."</li><li><b>Metrik utama</b> satu aja: conversion rate.</li><li><b>Bagi acak</b> pengunjung ke A (lama) dan B (baru).</li><li>Tentuin <b>ukuran sampel</b> dan durasi <b>sebelum</b> mulai (minimal 1 sampai 2 minggu penuh biar efek hari kerja/akhir pekan rata).</li><li>Hitung hasil, cek signifikan, putusin.</li></ol><p class="tip">Jangan ngintip tiap hari terus berhenti pas kebetulan signifikan (peeking). Peluang alarm palsunya jadi jauh lebih besar dari 5%.</p>'),
      I('Ngitung hasil', '<pre>CR = konversi ÷ pengunjung\nlift = (CR_B − CR_A) ÷ CR_A\nSE ≈ √( p(1−p) × (1/nA + 1/nB) ),  p = gabungan\nz = (CR_B − CR_A) ÷ SE</pre><p>|z| &gt; 1,96 → signifikan di α 0,05. Di kerjaan ini diitung kalkulator/Python, tapi kamu harus ngerti artinya.</p>'),
      C('Tombol beli hijau vs biru', 'A (biru): 10.000 pengunjung, 400 beli. B (hijau): 10.000 pengunjung, 460 beli.', [
        ['CR_A = 400 ÷ 10.000 = 4,0%. CR_B = 460 ÷ 10.000 = 4,6%', 'Conversion rate tiap grup.'],
        ['lift = (4,6 − 4,0) ÷ 4,0 = 15%', 'Naik 0,6 persen poin atau 15%.'],
        ['p gabungan = 860 ÷ 20.000 = 4,3%. SE ≈ √(0,043 × 0,957 × 0,0002) ≈ 0,00287', 'Ukuran "goyangan" wajar selisihnya.'],
        ['z = 0,006 ÷ 0,00287 ≈ 2,09', 'Lebih dari 1,96 → signifikan di 0,05 (p ≈ 0,04).'],
        ['Keputusan', 'Terapin hijau. Tetap pantau 2 minggu setelah rilis, efek kebaruan kadang luntur.'],
      ]),
      A('A: 5.000 pengunjung, 150 beli. B: 5.000 pengunjung, 180 beli. Berapa <b>lift</b> B terhadap A (persen)?', 20, 'CR_A = 3%, CR_B = 3,6%. (3,6 − 3) ÷ 3 = 20%.', { satuan: '%', umum: ['Jawab 0,6: itu selisih persen poin, bukan lift.'] }),
      A('Hasil uji: z = 1,5. Pakai batas 1,96, signifikan? Jawab 1 kalau ya, 0 kalau tidak.', 0, '|1,5| < 1,96, jadi belum signifikan di α 0,05. Butuh sampel lebih besar atau efeknya memang kecil.'),
      P('Tes baru jalan 2 hari, B udah unggul signifikan. Tindakan yang bener?', [['Lanjut sampai durasi dan ukuran sampel yang ditentuin di awal', 'Berhenti cepat = peeking, rawan alarm palsu.'], ['Langsung stop dan rilis B', 'Hasil 2 hari belum stabil.'], ['Tambah varian C, D, E', 'Ngubah desain di tengah jalan bikin hasil kacau.'], ['Ulang dari awal', 'Ga perlu, lanjutin aja sesuai rencana.']], 'Disiplin sama rencana.'),
      SK('Atasan: "B naik 15% tapi p = 0,12. Rilis ga?"', [['"Belum terbukti. Saran: perpanjang tes sampai sampel cukup, atau rilis bertahap sambil dipantau."', 2, 'Jujur soal ketidakpastian dan ngasih opsi.'], ['"Rilis aja, 15% gede."', 0, 'Bisa jadi cuma kebetulan.'], ['"Ga usah, B gagal."', 1, 'Belum signifikan bukan berarti gagal.']]),
      RK('Kartu contekan A/B test', [['Satu metrik utama', 'tentuin di awal'], ['Acak + durasi tetap', '≥ 1 sampai 2 minggu'], ['lift', '(B − A) ÷ A'], ['|z| > 1,96', 'signifikan α 0,05'], ['Peeking', 'jangan berhenti pas kebetulan signifikan']]),
    ]),

    L('korelasi', 'mahir', 'Korelasi dan regresi sederhana', 9, [
      I('Hubungan dua variabel', '<p><b>Korelasi (r)</b> dari −1 sampai 1:</p><ul><li>dekat 1: naik bareng</li><li>dekat −1: satu naik, satu turun</li><li>dekat 0: ga ada hubungan <b>linear</b> (bisa aja ada hubungan melengkung)</li></ul><p>Patokan kasar: |r| &lt; 0,3 lemah, 0,3 sampai 0,7 sedang, &gt; 0,7 kuat. Selalu liat scatter plot-nya juga.</p>'),
      I('Regresi linear sederhana', '<pre>y = a + b·x</pre><p><b>b</b> (kemiringan) = rata-rata perubahan y tiap x naik 1. <b>a</b> = nilai y kalau x = 0. <b>R²</b> = seberapa besar variasi y yang dijelasin x (0 sampai 1).</p><p>Korelasi <b>bukan</b> sebab-akibat. Bisa ada variabel ketiga (confounder), bisa juga arahnya kebalik.</p>'),
      C('Iklan dan omzet', 'Regresi dari data 12 bulan: omzet (juta) = 20 + 3 × biaya iklan (juta), R² = 0,64.', [
        ['b = 3', 'Tiap tambah Rp1 juta iklan, omzet rata-rata naik Rp3 juta (di rentang data yang ada).'],
        ['a = 20', 'Tanpa iklan, model nebak omzet 20 juta. Hati-hati kalau x = 0 di luar data.'],
        ['Iklan 5 juta → 20 + 3 × 5 = 35 juta', 'Prediksi.'],
        ['R² = 0,64 → r ≈ 0,8', '64% variasi omzet "dijelasin" iklan. Sisanya faktor lain (musim, harga).'],
        ['Hati-hati', 'Bisa jadi bulan ramai (Lebaran) bikin iklan dan omzet sama-sama naik. Sebab-akibat butuh eksperimen.'],
      ]),
      PS('Pasangin nilai r dengan artinya.', [['r = 0,9', 'Hubungan positif kuat'], ['r = −0,8', 'Hubungan negatif kuat'], ['r = 0,05', 'Hampir ga ada hubungan linear'], ['r = 0,4', 'Hubungan positif sedang']], 'Tanda = arah, besar = kekuatan.'),
      A('Regresi: omzet = 2 + 3 × biaya iklan (dalam juta). Kalau iklan 5 juta, prediksi omzet berapa juta?', 17, '2 + 3 × 5 = 17 juta.', { satuan: 'juta' }),
      P('Penjualan es krim dan kasus tenggelam naik bareng. Penjelasan paling masuk akal?', [['Variabel ketiga: cuaca panas', 'Panas bikin orang beli es krim dan berenang.'], ['Es krim bikin tenggelam', 'Ga ada mekanismenya.'], ['Tenggelam bikin pengen es krim', 'Kebalik dan ga masuk akal.'], ['Kebetulan murni', 'Polanya konsisten tiap tahun, ada penyebab.']], 'Klasik: korelasi karena faktor ketiga.'),
      RK('Kartu contekan korelasi', [['r', '−1 sampai 1, arah dan kekuatan'], ['y = a + b·x', 'b = perubahan y tiap x naik 1'], ['R²', 'porsi variasi yang dijelasin'], ['Korelasi ≠ sebab', 'cek confounder'], ['Prediksi', 'jangan jauh di luar rentang data']]),
    ]),
  ]
  const ST_TES = [
    T('dasar', 'Data 3, 7, 7, 9, 14. Mediannya?', ['7', '8', '9', '14'], 'Udah urut, nilai ke-3 = 7. (8 itu mean.)'),
    T('dasar', 'Omzet naik dari 100 juta jadi 120 juta. Naik berapa persen?', ['20%', '120%', '12%', '2%'], '(120 − 100) ÷ 100 = 20%.'),
    T('dasar', 'Dua koin dilempar. Peluang dua-duanya gambar?', ['0,25', '0,5', '1', '0,75'], 'Independen dikali: 0,5 × 0,5.'),
    T('menengah', 'Penjualan es krim naik bareng kasus tenggelam. Kesimpulan yang tepat?', ['Ada faktor ketiga (cuaca panas)', 'Es krim bikin tenggelam', 'Datanya salah', 'Tenggelam bikin beli es krim'], 'Korelasi bukan sebab-akibat.'),
    T('menengah', 'Sekitar berapa persen data normal ada dalam ±2 SD?', ['95%', '68%', '50%', '99,7%'], 'Aturan 68-95-99,7.'),
    T('menengah', 'Di A/B test, p-value 0,03. Biasanya artinya?', ['Bedanya signifikan (di bawah 0,05)', 'Bedanya kebetulan', 'Eksperimennya gagal', 'Sampelnya kurang'], 'p < 0,05 → tolak H0.'),
    T('mahir', 'p-value 0,01 dengan batas 0,05 artinya...', ['Signifikan, tolak H0', 'Ga signifikan', 'H0 terbukti', 'Datanya salah'], '0,01 < 0,05.'),
    T('mahir', 'CR A 4%, CR B 5%. Lift B terhadap A?', ['25%', '1%', '5%', '20%'], '(5 − 4) ÷ 4 = 25%. Selisihnya 1 persen poin.'),
  ]
  susun('ST', ST, ST_TES)

  // ===================================================================
  // PYTHON
  // ===================================================================
  const PY = [
    L('logika', 'dasar', 'Variabel, tipe data, dan print', 8, [
      I('Python itu nyuruh komputer langkah demi langkah', '<pre>nama = "Arya"        # teks (str)\numur = 23            # bilangan bulat (int)\nipk = 3.45           # desimal (float)\nlulus = True         # benar/salah (bool)\nprint(nama, umur)    # Arya 23</pre><ul><li><code>=</code> ngisi variabel. Baca dari kanan: nilai 23 dimasukin ke kotak bernama umur.</li><li><code>#</code> = komentar, ga dijalanin.</li><li>Teks pakai kutip (satu atau dua sama aja).</li><li>Python peka huruf besar kecil: <code>Nama</code> ≠ <code>nama</code>.</li></ul>'),
      I('Ngitung dan nyambung', '<table class="tabel-mini"><tr><th>operator</th><th>contoh</th><th>hasil</th></tr><tr><td><code>+ - * /</code></td><td><code>7 / 2</code></td><td>3.5</td></tr><tr><td><code>//</code> bagi bulat</td><td><code>7 // 2</code></td><td>3</td></tr><tr><td><code>%</code> sisa bagi</td><td><code>7 % 2</code></td><td>1</td></tr><tr><td><code>**</code> pangkat</td><td><code>2 ** 3</code></td><td>8</td></tr></table><p>Teks + teks = disambung: <code>"Halo " + nama</code>. Teks + angka = error. Pakai f-string: <code>f"Umur {umur} tahun"</code>.</p>'),
      CK('Hitung total belanja', 'Bikin program kecil buat ngitung total belanja dan nampilin hasilnya.', [
        ['harga = 85000\nqty = 3', 'Simpen harga dan jumlah barang di variabel.'],
        ['total = harga * qty', 'Hitung. Python ngerjain sisi kanan dulu (255000), terus disimpen ke total.'],
        ['diskon = total * 0.1\nbayar = total - diskon', 'Diskon 10%. bayar = 229500.0 (jadi float karena ada 0.1).'],
        ['print(f"Total bayar: {bayar}")', 'f-string: tulis f sebelum kutip, variabel di dalam {}. Keluar: Total bayar: 229500.0'],
      ]),
      P('<code>x = 7 // 2</code> lalu <code>print(x)</code>. Hasilnya?', [['3', '// itu bagi bulat, desimalnya dibuang.'], ['3.5', 'Itu hasil 7 / 2.'], ['1', 'Itu 7 % 2 (sisa bagi).'], ['Error', 'Sintaksnya sah.']], 'Bedain /, //, dan %.'),
      P('<code>print("Umur: " + 23)</code> hasilnya?', [['Error, teks ga bisa ditambah angka', 'Ubah dulu: str(23), atau pakai f-string.'], ['Umur: 23', 'Bakal gini kalau pakai f"Umur: {23}".'], ['Umur: + 23', 'Tanda + ga ikut kecetak.'], ['23', 'Ga gitu.']], 'TypeError: can only concatenate str (not "int") to str.'),
      IS('Tulis satu baris kode yang nampilin tulisan <b>Halo</b>.', ['print("Halo")', "print('Halo')"], 'print() nampilin ke layar. Teksnya di dalam kutip.', { umum: ['Lupa kutip: print(Halo) dikira variabel bernama Halo → NameError.', 'Huruf P kapital: Print(...) ga dikenal.'] }),
      RK('Kartu contekan dasar Python', [['x = 5', 'isi variabel'], ['str / int / float / bool', 'teks / bulat / desimal / benar-salah'], ['/ // % **', 'bagi, bagi bulat, sisa, pangkat'], ['f"{x}"', 'masukin variabel ke teks'], ['# komentar', 'ga dijalanin']]),
    ]),

    L('list', 'dasar', 'List, loop, dan if', 9, [
      I('List dan indeks', '<pre>harga = [85000, 18000, 15000]\nharga[0]     # 85000 (indeks mulai dari 0!)\nharga[-1]    # 15000 (dari belakang)\nlen(harga)   # 3\nharga.append(120000)   # nambah di belakang</pre>'),
      I('Loop dan if', '<pre>for h in harga:\n    if h > 50000:\n        print("mahal", h)\n    else:\n        print("murah", h)</pre><ul><li><code>for x in list:</code> jalanin blok di bawahnya buat tiap isi.</li><li><code>if</code>, <code>elif</code>, <code>else</code> buat cabang.</li><li>Baris yang masuk blok ditulis <b>menjorok 4 spasi</b>. Indentasi = penanda blok di Python, bukan hiasan.</li><li>Baris <code>for</code>/<code>if</code> diakhiri titik dua <code>:</code>.</li><li><code>range(4)</code> = 0, 1, 2, 3 (4 ga ikut).</li></ul>'),
      CK('Ngelacak loop baris demi baris', 'Kita jalanin kode ini pelan-pelan di kepala:<pre>total = 0\nfor h in [85000, 18000, 15000]:\n    total = total + h\nprint(total)</pre>', [
        ['total = 0', 'Mulai: total = 0.'],
        ['putaran 1: h = 85000 → total = 0 + 85000 = 85000', 'Loop ngambil isi pertama.'],
        ['putaran 2: h = 18000 → total = 85000 + 18000 = 103000', 'Isi kedua.'],
        ['putaran 3: h = 15000 → total = 103000 + 15000 = 118000', 'Isi ketiga. List habis, loop berhenti.'],
        ['print(total) → 118000', 'print ada di luar loop (ga menjorok), jadi cuma jalan sekali di akhir.'],
      ], { penutup: 'Kalau bingung sama hasil kode, lacak gini: tulis nilai tiap variabel di tiap putaran.' }),
      P('<code>nilai = [70, 85, 90]</code>. Apa isi <code>nilai[1]</code>?', [['85', 'Indeks 0 = 70, indeks 1 = 85.'], ['70', 'Itu nilai[0].'], ['90', 'Itu nilai[2] atau nilai[-1].'], ['Error', 'Indeks 1 ada.']], 'Indeks mulai dari 0.'),
      P('<pre>n = 0\nfor i in range(4):\n    n = n + i\nprint(n)</pre>Hasilnya?', [['6', 'range(4) = 0, 1, 2, 3. 0+1+2+3 = 6.'], ['10', 'Bakal 10 kalau range(5) atau 1 sampai 4.'], ['4', 'Itu banyaknya putaran, bukan jumlahnya.'], ['0', 'n diubah di tiap putaran.']], 'range(n) berhenti sebelum n.'),
      P('<pre>for h in [10, 60, 30]:\n    if h > 50:\n        print("A")\n    else:\n        print("B")</pre>Yang kecetak berurutan?', [['B, A, B', '10 → B, 60 → A, 30 → B.'], ['A, A, A', 'Cuma 60 yang > 50.'], ['A', 'print ada di dalam loop, jalan 3 kali.'], ['B, B, A', 'Urutannya ngikutin list.']], 'Lacak tiap putaran.'),
      IS('Tulis baris pertama loop yang ngambil tiap isi list <code>kota</code> ke variabel <code>k</code>.', 'for k in kota:', 'for k in kota: — diakhiri titik dua.', { umum: ['Lupa titik dua di akhir.', 'Nulis for kota in k (kebalik).'] }),
      RK('Kartu contekan list dan loop', [['x[0] / x[-1]', 'isi pertama / terakhir'], ['len(x)', 'jumlah isi'], ['x.append(v)', 'tambah di belakang'], ['for v in x:', 'ulang tiap isi'], ['range(n)', '0 sampai n − 1'], ['indentasi 4 spasi', 'penanda blok']]),
    ]),

    L('fungsi', 'dasar', 'Dictionary dan fungsi', 9, [
      I('Dictionary: pasangan kunci-nilai', '<pre>produk = {"nama": "Kopi", "harga": 85000}\nproduk["harga"]          # 85000\nproduk["stok"] = 12      # nambah kunci baru\nfor k, v in produk.items():\n    print(k, v)</pre><p>Kayak satu baris tabel: kunci = nama kolom, nilai = isinya. Data JSON dari API bentuknya mirip ini.</p>'),
      I('Fungsi: rumus buatan sendiri', '<pre>def harga_ppn(harga, tarif=0.11):\n    return harga * (1 + tarif)\n\nharga_ppn(100000)        # 111000.0\nharga_ppn(100000, 0.12)  # 112000.0</pre><ul><li><code>def nama(parameter):</code> bikin fungsi.</li><li><code>return</code> ngembaliin hasil. Tanpa return, hasilnya <code>None</code>.</li><li><code>tarif=0.11</code> = nilai default kalau ga diisi.</li></ul>'),
      CK('Fungsi buat ngelabel transaksi', 'Bikin fungsi yang ngasih label "Grosir" kalau qty minimal 10, selain itu "Eceran", terus pakai ke banyak transaksi.', [
        ['def label(qty):', 'Definisiin fungsinya, parameternya qty.'],
        ['    if qty >= 10:\n        return "Grosir"\n    return "Eceran"', 'Kalau syarat benar, return langsung keluar dari fungsi. Baris return terakhir cuma jalan kalau syaratnya salah.'],
        ['label(12)   # "Grosir"\nlabel(5)    # "Eceran"', 'Panggil fungsinya.'],
        ['[label(q) for q in [12, 5, 8]]   # ["Grosir", "Eceran", "Eceran"]', 'Bonus: list comprehension, cara singkat bikin list baru dari loop.'],
      ]),
      P('<code>d = {"a": 1, "b": 2}</code>. <code>d["b"]</code> hasilnya?', [['2', 'Ambil nilai dari kunci "b".'], ['1', 'Itu d["a"].'], ['"b"', 'Yang keluar nilainya, bukan kuncinya.'], ['Error', 'Kunci "b" ada.']], 'dict[kunci] → nilai.'),
      P('<pre>def kali2(x):\n    print(x * 2)\n\nhasil = kali2(5)\nprint(hasil)</pre>Baris terakhir nyetak apa?', [['None', 'Fungsinya print, bukan return. Jadi hasil = None.'], ['10', '10 kecetak di dalam fungsi, tapi hasil-nya kosong.'], ['5', 'Bukan.'], ['Error', 'Ga error.']], 'print ≠ return. Ini jebakan paling sering.'),
      IS('Lengkapin baris yang bikin fungsi <code>luas</code> dengan parameter <code>p</code> dan <code>l</code>.', ['def luas(p, l):', 'def luas(p,l):'], 'def nama(parameter1, parameter2):', { umum: ['Lupa titik dua.', 'Nulis function luas(p, l) (itu gaya JavaScript).'] }),
      RK('Kartu contekan fungsi dan dict', [['{"k": v}', 'dictionary'], ['d["k"]', 'ambil nilai'], ['d.items()', 'pasangan kunci-nilai buat loop'], ['def f(x):', 'bikin fungsi'], ['return', 'ngembaliin hasil'], ['print ≠ return', 'print cuma nampilin']]),
    ]),

    L('pandas', 'menengah', 'pandas: kenalan sama DataFrame', 9, [
      I('Excel-nya Python', '<pre>import pandas as pd\ndf = pd.read_csv("penjualan.csv")   # atau pd.read_excel</pre><p><b>DataFrame</b> = tabel. Tiap kolom = <b>Series</b>. Empat perintah pertama tiap buka data:</p><table class="tabel-mini"><tr><th>kode</th><th>gunanya</th></tr><tr><td><code>df.head()</code></td><td>5 baris pertama</td></tr><tr><td><code>df.shape</code></td><td>(jumlah baris, jumlah kolom)</td></tr><tr><td><code>df.info()</code></td><td>tipe data dan jumlah nilai kosong</td></tr><tr><td><code>df.describe()</code></td><td>ringkasan statistik kolom angka</td></tr></table>'),
      I('Ngambil kolom dan ngitung', '<pre>df["kota"]                    # satu kolom (Series)\ndf[["kota", "qty"]]           # beberapa kolom (DataFrame), kurung siku dobel\ndf["qty"].sum()               # total\ndf["harga"].mean()            # rata-rata\ndf["kota"].value_counts()     # jumlah baris per kota\ndf["kota"].nunique()          # banyak kota unik</pre>'),
      CK('Kenalan sama data penjualan', 'Kamu dapet file penjualan.csv berisi kolom tanggal, kota, produk, qty, harga.', [
        ['df = pd.read_csv("penjualan.csv")\ndf.shape', 'Keluar (1200, 5): 1.200 baris, 5 kolom.'],
        ['df.info()', 'Ketauan kolom tanggal masih "object" (teks) dan kolom harga ada 12 nilai kosong. Dicatat buat dibersihin.'],
        ['df["kota"].value_counts()', 'Jumlah transaksi per kota, langsung urut dari terbanyak. Mirip COUNTIF semua kota sekaligus.'],
        ['df[["kota", "qty"]].head()', 'Ambil dua kolom, intip 5 baris. Perhatiin kurung siku dobel.'],
      ]),
      PS('Pasangin kode dengan gunanya.', [['df.head()', 'Liat 5 baris pertama'], ['df.describe()', 'Ringkasan statistik kolom angka'], ['df.info()', 'Tipe data dan jumlah nilai kosong'], ['df.shape', 'Jumlah baris dan kolom']], 'Empat perintah pertama tiap buka data.'),
      P('Ambil kolom <code>kota</code> dan <code>qty</code> sekaligus dari <code>df</code>?', [['df[["kota", "qty"]]', 'List nama kolom di dalam kurung siku.'], ['df["kota", "qty"]', 'Kurung tunggal dibaca satu kolom bernama ("kota","qty") → KeyError.'], ['df.kota.qty', 'Ga gitu.'], ['df(kota, qty)', 'DataFrame ga dipanggil kayak fungsi.']], 'Beberapa kolom = kurung siku dobel.'),
      IS('Tulis kode buat ngitung <b>jumlah baris per kota</b> dari kolom <code>kota</code> di <code>df</code>.', ['df["kota"].value_counts()', "df['kota'].value_counts()"], 'value_counts() ngitung kemunculan tiap nilai, urut dari terbanyak.'),
      RK('Kartu contekan pandas dasar', [['pd.read_csv()', 'baca file'], ['head / shape / info / describe', 'kenalan sama data'], ['df["a"]', 'satu kolom'], ['df[["a", "b"]]', 'beberapa kolom'], ['.sum() .mean() .value_counts()', 'ringkasan cepat']]),
    ]),

    L('filter', 'menengah', 'pandas: filter, sort, dan kolom baru', 9, [
      I('Operasi pandas harian', '<pre>df[df["kota"] == "Bandung"]                    # filter baris\ndf[(df["qty"] > 10) & (df["kota"] == "Jakarta")]   # dua syarat\ndf[df["kota"].isin(["Jakarta", "Medan"])]       # salah satu dari\ndf.sort_values("omzet", ascending=False)         # urutin\ndf["omzet"] = df["qty"] * df["harga"]            # kolom baru</pre><ul><li>Dua syarat pakai <code>&amp;</code> (dan) atau <code>|</code> (atau), <b>tiap syarat dalam kurung</b>. Kata <code>and</code>/<code>or</code> ga jalan di pandas.</li><li><code>.head(5)</code> setelah sort = top 5.</li></ul>'),
      CK('Top 3 transaksi Bandung', 'Cari 3 transaksi dengan omzet terbesar di Bandung.', [
        ['df["omzet"] = df["qty"] * df["harga"]', 'Bikin kolom omzet. Dikali per baris otomatis, ga perlu loop.'],
        ['bdg = df[df["kota"] == "Bandung"]', 'Bagian dalam (df["kota"] == "Bandung") bikin deret True/False. df[...] ngambil baris yang True.'],
        ['bdg.sort_values("omzet", ascending=False).head(3)', 'Urut dari terbesar, ambil 3. Sama kayak ORDER BY omzet DESC LIMIT 3 di SQL.'],
      ]),
      P('Filter qty di atas 10 dan kota Jakarta?', [['df[(df["qty"] > 10) & (df["kota"] == "Jakarta")]', 'Pakai &, tiap syarat dalam kurung.'], ['df[df["qty"] > 10 and df["kota"] == "Jakarta"]', 'and ga jalan buat Series → ValueError.'], ['df.filter(qty > 10)', 'filter() di pandas buat milih kolom, bukan baris.'], ['df["qty" > 10]', 'Ngebandingin teks "qty" sama 10, ga masuk akal.']], 'pandas: & | ~ dan kurung.'),
      P('Kenapa <code>df[df["qty"] > 10 & df["kota"] == "Jakarta"]</code> (tanpa kurung) error?', [['& dikerjain duluan sebelum > dan ==, jadi urutannya kacau', 'Prioritas operator. Kurung wajib.'], ['Karena Jakarta pakai kutip dua', 'Kutip dua sah.'], ['Karena qty angka', 'Bukan itu.'], ['Ga error', 'Error atau hasilnya salah.']], 'Biasain kurung tiap syarat.'),
      IS('Bikin kolom <code>omzet</code> = <code>qty</code> × <code>harga</code> di DataFrame <code>df</code>.', ['df["omzet"] = df["qty"] * df["harga"]', "df['omzet'] = df['qty'] * df['harga']"], 'Kolom baru diisi hasil kali dua kolom, per baris otomatis.'),
      IS('Urutin <code>df</code> berdasarkan kolom <code>omzet</code> dari <b>terbesar</b>.', ['df.sort_values("omzet", ascending=False)', "df.sort_values('omzet', ascending=False)", 'df.sort_values(by="omzet", ascending=False)', "df.sort_values(by='omzet', ascending=False)"], 'ascending=False = besar ke kecil.', { umum: ['Lupa ascending=False: hasilnya kecil ke besar.', 'False ditulis false (huruf kecil): di Python wajib F kapital.'] }),
      RK('Kartu contekan filter pandas', [['df[df["a"] == x]', 'filter'], ['(syarat1) & (syarat2)', 'dan, pakai kurung'], ['|', 'atau'], ['.isin([...])', 'salah satu dari'], ['sort_values("a", ascending=False)', 'urut besar ke kecil'], ['df["c"] = df["a"] * df["b"]', 'kolom baru']]),
    ]),

    L('groupby', 'menengah', 'pandas: groupby dan merge', 9, [
      I('groupby = pivot table', '<pre>df.groupby("kota")["qty"].sum()\ndf.groupby("kota").agg(total=("qty", "sum"), rata=("harga", "mean"))\ndf.groupby(["kota", "produk"])["qty"].sum()</pre><p>Pola: <b>kelompokin</b> (groupby), <b>pilih kolom</b>, <b>hitung</b> (sum, mean, count). Sama kayak GROUP BY di SQL. Tambah <code>.reset_index()</code> biar hasilnya jadi DataFrame biasa lagi.</p>'),
      I('merge = JOIN', '<pre>pd.merge(pesanan, pelanggan, left_on="pelanggan_id", right_on="id", how="left")</pre><ul><li><code>how="inner"</code> (default): cuma yang cocok di dua tabel.</li><li><code>how="left"</code>: semua baris tabel kiri tetap ada (kayak LEFT JOIN).</li><li>Kolom kuncinya sama namanya? Cukup <code>on="produk_id"</code>.</li></ul><p><code>pd.concat([jan, feb])</code> = numpuk ke bawah (kayak Append/UNION).</p>'),
      CK('Omzet per kategori', 'Data: penjualan (produk_id, qty) dan produk (produk_id, kategori, harga). Cari omzet per kategori.', [
        ['gab = pd.merge(penjualan, produk, on="produk_id", how="left")', 'Gabung biar tiap baris penjualan punya kategori dan harga.'],
        ['gab["omzet"] = gab["qty"] * gab["harga"]', 'Kolom omzet.'],
        ['gab.groupby("kategori")["omzet"].sum()', 'Kelompokin per kategori, jumlahin omzet.'],
        ['.sort_values(ascending=False)', 'Urut dari terbesar. Hasil akhir: satu baris per kategori.'],
      ]),
      IS('Tulis kode <b>rata-rata harga per kategori</b> dari DataFrame <code>df</code>.', ['df.groupby("kategori")["harga"].mean()', "df.groupby('kategori')['harga'].mean()"], 'groupby(kolom kelompok)[kolom dihitung].mean()'),
      P('<code>pd.merge(a, b, how="left")</code> artinya?', [['Semua baris a dipertahankan', 'Yang ga punya pasangan di b, kolom b-nya NaN.'], ['Cuma yang cocok', 'Itu how="inner".'], ['Semua baris b', 'Itu how="right".'], ['Gabung ke bawah', 'Itu pd.concat.']], 'Sama persis kayak LEFT JOIN di SQL.'),
      U('Susun alur analisis data yang rapi.', ['Baca data (read_csv)', 'Cek dan bersihin (dropna, tipe data)', 'Gabung tabel kalau perlu (merge)', 'Ringkas (groupby)', 'Visualisasi', 'Tulis kesimpulan'], 'Bersihin sebelum ngitung, simpulin setelah liat datanya.'),
      RK('Kartu contekan groupby/merge', [['groupby("a")["b"].sum()', 'total b per a'], ['.agg(nama=("kolom", "fungsi"))', 'beberapa ringkasan'], ['.reset_index()', 'balik jadi DataFrame'], ['merge(…, on=, how="left")', 'JOIN'], ['pd.concat([a, b])', 'tumpuk ke bawah']]),
    ]),

    L('bersihpy', 'mahir', 'Bersihin data pakai pandas', 9, [
      I('Nilai kosong dan duplikat', '<pre>df.isna().sum()             # nilai kosong per kolom\ndf.dropna(subset=["harga"]) # buang baris yang harga-nya kosong\ndf["harga"].fillna(0)       # isi kosong pakai 0\ndf.duplicated().sum()       # jumlah baris dobel\ndf.drop_duplicates()        # buang baris dobel</pre><p>Cara ngisi nilai kosong tergantung <b>artinya</b>: pendapatan kosong karena belum bayar → 0. Umur kosong → jangan asal 0, bisa median atau dibiarin kosong.</p>'),
      I('Tipe data dan teks', '<pre>df["tgl"] = pd.to_datetime(df["tgl"])\ndf["harga"] = pd.to_numeric(df["harga"], errors="coerce")\ndf["kota"] = df["kota"].str.strip().str.title()\ndf["kota"] = df["kota"].replace({"Jkt": "Jakarta"})</pre><p><code>errors="coerce"</code> ngubah yang ga bisa jadi angka menjadi NaN, bukan error. <code>.str</code> buka fungsi teks kayak di Excel (strip = TRIM, title = PROPER).</p>'),
      CK('Bersihin data kota dan harga', 'Kolom kota isinya " jakarta", "JAKARTA", "Jkt". Kolom harga isinya "85.000" sebagai teks.', [
        ['df["kota"] = df["kota"].str.strip().str.title()', '" jakarta" dan "JAKARTA" jadi "Jakarta". "Jkt" masih "Jkt".'],
        ['df["kota"] = df["kota"].replace({"Jkt": "Jakarta"})', 'Samain singkatan.'],
        ['df["harga"] = df["harga"].str.replace(".", "", regex=False)', 'Buang titik ribuan, "85.000" jadi "85000".'],
        ['df["harga"] = pd.to_numeric(df["harga"], errors="coerce")', 'Jadi angka. Yang aneh jadi NaN, terus dicek pakai isna().'],
      ]),
      PS('Pasangin masalah dengan solusinya.', [['Ada baris dobel', 'df.drop_duplicates()'], ['Kolom tanggal kebaca teks', 'pd.to_datetime()'], ['Ngitung nilai kosong', 'df.isna().sum()'], ['Kosong diisi nol', 'df.fillna(0)']], 'Toolkit bersih-bersih standar.'),
      P('Kolom pendapatan ada yang kosong karena belum bayar. Paling masuk akal?', [['Isi 0 atau tandai, sesuai artinya', 'Belum bayar memang 0 pendapatan.'], ['Hapus kolomnya', 'Kehilangan data penting.'], ['Isi pakai angka rata-rata tanpa mikir', 'Ngarang pendapatan yang ga ada.'], ['Biarin, nanti error sendiri', 'Bisa bikin hitungan salah diam-diam.']], 'Cara ngisi tergantung arti datanya.'),
      IS('Tulis kode buat ngitung <b>nilai kosong tiap kolom</b> di <code>df</code>.', ['df.isna().sum()', 'df.isnull().sum()'], 'isna() bikin True/False, sum() ngitung True per kolom.'),
      RK('Kartu contekan bersih data pandas', [['isna().sum()', 'hitung kosong'], ['dropna / fillna', 'buang / isi kosong'], ['drop_duplicates()', 'buang dobel'], ['to_datetime / to_numeric', 'betulin tipe'], ['.str.strip().str.title()', 'rapihin teks'], ['replace({...})', 'samain nilai']]),
    ]),

    L('plot', 'mahir', 'Visualisasi dan EDA singkat', 9, [
      I('Grafik dalam 3 baris', '<pre>import matplotlib.pyplot as plt\ndf.groupby("kota")["omzet"].sum().sort_values().plot(kind="barh")\nplt.title("Omzet per kota")\nplt.show()</pre><p><code>kind</code>: <code>"line"</code> tren, <code>"bar"</code>/<code>"barh"</code> bandingin, <code>"hist"</code> sebaran, <code>"scatter"</code> (pakai x= dan y=) hubungan dua angka, <code>"box"</code> sebaran + pencilan.</p>'),
      I('EDA: Exploratory Data Analysis', '<p>Urutan EDA yang rapi buat proyek portofolio:</p><ol><li><b>Pertanyaan</b> bisnis dulu (2 sampai 3).</li><li><b>Kenalan</b>: shape, info, describe.</li><li><b>Bersihin</b>: kosong, dobel, tipe.</li><li><b>Univariat</b>: histogram tiap kolom angka, value_counts kolom kategori.</li><li><b>Bivariat</b>: groupby, scatter, korelasi (<code>df.corr(numeric_only=True)</code>).</li><li><b>Kesimpulan</b> yang jawab pertanyaan di langkah 1.</li></ol>'),
      CK('Tren omzet bulanan', 'Bikin grafik tren omzet per bulan.', [
        ['df["bulan"] = df["tgl"].dt.to_period("M")', 'Potong tanggal jadi bulan. (tgl udah datetime dari pelajaran bersih data.)'],
        ['tren = df.groupby("bulan")["omzet"].sum()', 'Total per bulan, otomatis urut waktu.'],
        ['tren.plot(kind="line", marker="o")', 'Garis dengan titik tiap bulan.'],
        ['plt.title("Omzet bulanan naik 18% sejak Juli")\nplt.ylabel("Rupiah")\nplt.show()', 'Judul berupa kesimpulan, kasih satuan. Sama kaya prinsip storytelling di Dashboard.'],
      ]),
      PS('Pasangin pertanyaan dengan kind-nya.', [['Omzet per bulan selama setahun', 'line'], ['Sebaran umur pelanggan', 'hist'], ['Omzet per kota', 'bar'], ['Biaya iklan vs jumlah klik', 'scatter']], 'Sama kayak milih grafik di Excel atau Power BI.'),
      P('Perintah yang biasanya ditulis terakhir biar grafik muncul?', [['plt.show()', 'Nampilin grafik.'], ['plt.start()', 'Ga ada.'], ['df.plot.end()', 'Ga ada.'], ['print(plt)', 'Nyetak objek, bukan grafik.']], 'Di Jupyter kadang otomatis muncul, tapi biasain show().'),
      U('Urutin langkah EDA.', ['Tulis pertanyaan bisnis', 'Kenalan: shape, info, describe', 'Bersihin data', 'Analisis satu variabel (hist, value_counts)', 'Analisis hubungan (groupby, scatter)', 'Tulis kesimpulan'], 'Pertanyaan di awal, kesimpulan yang jawab pertanyaan di akhir.'),
      RK('Kartu contekan visual Python', [['.plot(kind="line")', 'tren'], ['"bar" / "barh"', 'bandingin'], ['"hist" / "box"', 'sebaran'], ['"scatter", x=, y=', 'hubungan'], ['plt.title / ylabel / show', 'judul, label, tampil'], ['EDA', 'tanya · kenalan · bersih · uni · bi · simpul']]),
    ]),
  ]
  const PY_TES = [
    T('dasar', 'x = [3, 5, 7]. print(len(x)) hasilnya?', ['3', '7', '15', 'Error'], 'len = jumlah isi list.'),
    T('dasar', 'Simbol buat komentar di Python?', ['#', '//', '--', '/*'], '# di Python. // itu bagi bulat.'),
    T('dasar', 'Indeks pertama list di Python itu...', ['0', '1', '-1', 'Tergantung'], 'Indeks mulai dari 0. -1 itu isi terakhir.'),
    T('menengah', 'Rata-rata harga per kategori di pandas?', ['df.groupby("kategori")["harga"].mean()', 'df.mean("kategori")', 'df["harga"].group()', 'mean(df)'], 'groupby → pilih kolom → mean.'),
    T('menengah', 'pd.merge(a, b, how="left") artinya?', ['Semua baris a dipertahankan', 'Cuma yang cocok', 'Semua baris b', 'Gabung ke bawah'], 'Kayak LEFT JOIN.'),
    T('menengah', 'Filter dua syarat di pandas pakai?', ['& dengan tiap syarat dalam kurung', 'and', 'AND', ','], 'and ga jalan buat Series.'),
    T('mahir', 'Buang baris dobel di pandas pakai...', ['df.drop_duplicates()', 'df.dropna()', 'df.unique()', 'df.clean()'], 'dropna buat nilai kosong.'),
    T('mahir', 'Fungsi tanpa return dipanggil, hasilnya...', ['None', '0', 'Error', 'Teks kosong'], 'Fungsi tanpa return ngembaliin None.'),
  ]
  susun('PY', PY, PY_TES)
})()
