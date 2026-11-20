// Kursus Excel, Power BI, Tableau, Statistik, Python. Latihan rumus dicek dengan normalisasi (huruf, spasi, ; jadi ,).
window.KURSUS = window.KURSUS || {}

window.KURSUS.excel = {
  id: 'excel', nama: 'Excel untuk Kerja', ikon: '📊',
  intro: 'Excel tetap alat nomor satu di kantor Indonesia, dari admin sampai analyst. Fokus di sini: rumus yang paling sering dipakai, pivot, dan bersih-bersih data. Contoh pakai tabel penjualan: kolom A Tanggal, B Kota, C Produk, D Qty, E Harga, baris 2 sampai 101.',
  level: [
    { nama: 'Pemula', pelajaran: [
      { id: 'dasar', judul: 'Rumus dasar: SUM, AVERAGE, COUNT', langkah: [
        { t: 'teks', isi: '<p>Rumus selalu diawali <code>=</code>. Rentang ditulis <code>D2:D101</code>.</p><pre>=SUM(D2:D101)      total qty\n=AVERAGE(E2:E101)  rata-rata harga\n=COUNT(D2:D101)    banyak sel angka\n=COUNTA(B2:B101)   banyak sel terisi</pre>' },
        { t: 'isian', tanya: 'Tulis rumus buat <b>total qty</b> di kolom D baris 2 sampai 101.', benar: ['=SUM(D2:D101)'], jelas: '=SUM(D2:D101)' },
        { t: 'isian', tanya: 'Tulis rumus <b>harga tertinggi</b> di kolom E baris 2 sampai 101.', benar: ['=MAX(E2:E101)'], jelas: '=MAX(E2:E101)' },
      ] },
      { id: 'if', judul: 'IF dan logika', langkah: [
        { t: 'teks', isi: '<p><code>=IF(syarat, kalau_benar, kalau_salah)</code>. Teks pakai tanda kutip dua.</p><pre>=IF(D2>=10,"Grosir","Eceran")\n=IF(AND(B2="Bandung",D2>5),"Prioritas","-")</pre>' },
        { t: 'isian', tanya: 'Di F2, tulis rumus yang ngasih <b>"Mahal"</b> kalau E2 lebih dari 100000, selain itu <b>"Murah"</b>.', benar: ['=IF(E2>100000,"Mahal","Murah")', '=IF(E2<=100000,"Murah","Mahal")'], jelas: '=IF(E2>100000,"Mahal","Murah")' },
        { t: 'pg', tanya: 'Rumus <code>=IF(D2>=10,"Grosir","Eceran")</code> kalau D2 = 10 hasilnya?', opsi: ['Grosir', 'Eceran', 'Error', '10'], benar: 0, jelas: '10 >= 10 itu benar, jadi "Grosir".' },
      ] },
      { id: 'countif', judul: 'COUNTIF dan SUMIF', langkah: [
        { t: 'teks', isi: '<p>Ngitung atau njumlah pakai syarat.</p><pre>=COUNTIF(B2:B101,"Bandung")          banyak transaksi Bandung\n=SUMIF(B2:B101,"Bandung",D2:D101)    total qty Bandung\n=SUMIFS(D2:D101,B2:B101,"Bandung",C2:C101,"Kopi")</pre>' },
        { t: 'isian', tanya: 'Tulis rumus <b>banyak transaksi di Jakarta</b> (kolom B, baris 2 sampai 101).', benar: ['=COUNTIF(B2:B101,"Jakarta")'], jelas: '=COUNTIF(B2:B101,"Jakarta")' },
        { t: 'isian', tanya: 'Tulis rumus <b>total qty di Surabaya</b> (kota di B, qty di D).', benar: ['=SUMIF(B2:B101,"Surabaya",D2:D101)', '=SUMIFS(D2:D101,B2:B101,"Surabaya")'], jelas: '=SUMIF(B2:B101,"Surabaya",D2:D101)' },
      ] },
    ] },
    { nama: 'Menengah', pelajaran: [
      { id: 'xlookup', judul: 'XLOOKUP dan VLOOKUP', langkah: [
        { t: 'teks', isi: '<p>Nyari nilai dari tabel lain. Misal sheet Produk: kolom A nama produk, kolom B kategori.</p><pre>=XLOOKUP(C2,Produk!A:A,Produk!B:B)\n=VLOOKUP(C2,Produk!A:B,2,FALSE)</pre><p>VLOOKUP wajib <code>FALSE</code> di akhir biar nyari yang persis sama. XLOOKUP lebih aman (bisa nyari ke kiri, ga rusak kalau kolom disisipin).</p>' },
        { t: 'pg', tanya: 'Kenapa VLOOKUP sering salah kalau argumen terakhir dikosongin?', opsi: ['Jadi lebih lambat', 'Default-nya nyari yang mendekati (approximate), bisa ngasih hasil salah', 'Ga bisa nyari teks', 'Ga ada pengaruh'], benar: 1, jelas: 'Tanpa FALSE, VLOOKUP pakai approximate match yang butuh data terurut.' },
        { t: 'isian', tanya: 'Tulis XLOOKUP yang nyari isi C2 di <code>Produk!A:A</code> dan ngembaliin <code>Produk!C:C</code>.', benar: ['=XLOOKUP(C2,Produk!A:A,Produk!C:C)'], jelas: '=XLOOKUP(C2,Produk!A:A,Produk!C:C)' },
      ] },
      { id: 'pivot', judul: 'PivotTable', langkah: [
        { t: 'teks', isi: '<p>PivotTable ngerangkum ribuan baris dalam beberapa klik: Insert → PivotTable → seret kolom ke Rows, Columns, Values. Ini GROUP BY-nya Excel.</p><ul><li>Rows: Kota</li><li>Columns: Produk</li><li>Values: Sum of Qty</li></ul>' },
        { t: 'pg', tanya: 'Mau liat total penjualan per kota per bulan. Tanggal ditaruh di mana?', opsi: ['Values', 'Rows atau Columns (lalu di-group per bulan)', 'Filter aja', 'Ga bisa'], benar: 1, jelas: 'Tanggal di Rows atau Columns, klik kanan → Group → Months.' },
      ] },
    ] },
  ],
}

window.KURSUS.powerbi = {
  id: 'powerbi', nama: 'Power BI dan DAX', ikon: '📈',
  intro: 'Power BI paling sering muncul di loker data Indonesia. Aplikasinya (Power BI Desktop) cuma jalan di Windows dan makan sekitar 1 GB, jadi di sini fokus ke cara berpikirnya: model data, measure DAX, dan desain dashboard. Pas storage lu udah lega, tinggal praktek.',
  level: [
    { nama: 'Pemula', pelajaran: [
      { id: 'alur', judul: 'Alur kerja Power BI', langkah: [
        { t: 'teks', isi: '<p>Alurnya selalu sama:</p><ol><li><b>Get Data</b>: ambil dari Excel, CSV, database.</li><li><b>Power Query</b>: bersihin (hapus kolom, ganti tipe, gabung tabel).</li><li><b>Model</b>: hubungin tabel (fakta dan dimensi).</li><li><b>DAX</b>: bikin measure (Total Penjualan, Margin).</li><li><b>Visual</b>: bikin dashboard, publish.</li></ol>' },
        { t: 'pg', tanya: 'Kolom tanggal kebaca sebagai teks. Benerinnya di mana?', opsi: ['DAX', 'Power Query (ganti tipe data)', 'Visual', 'Ga bisa'], benar: 1, jelas: 'Urusan bersihin dan tipe data di Power Query.' },
      ] },
      { id: 'star', judul: 'Model bintang: fakta dan dimensi', langkah: [
        { t: 'teks', isi: '<p><b>Tabel fakta</b> isinya kejadian yang dihitung (penjualan, qty). <b>Tabel dimensi</b> isinya keterangan (produk, pelanggan, tanggal). Fakta di tengah, dimensi di sekelilingnya: bentuk bintang. Relasi one-to-many dari dimensi ke fakta.</p>' },
        { t: 'pg', tanya: 'Dari tabel ini mana yang tabel fakta?', opsi: ['Produk (nama, kategori)', 'Penjualan (tanggal, produk_id, qty, harga)', 'Kota (nama, provinsi)', 'Kalender (tanggal, bulan)'], benar: 1, jelas: 'Penjualan nyimpen kejadian yang dihitung, sisanya dimensi.' },
      ] },
      { id: 'dax', judul: 'Measure DAX pertama', langkah: [
        { t: 'teks', isi: '<pre>Total Qty = SUM(Penjualan[Qty])\nTotal Omzet = SUMX(Penjualan, Penjualan[Qty] * Penjualan[Harga])\nOmzet Bandung = CALCULATE([Total Omzet], Kota[Nama] = "Bandung")</pre><p><code>SUMX</code> ngitung per baris dulu baru dijumlah. <code>CALCULATE</code> ngubah filter.</p>' },
        { t: 'isian', tanya: 'Tulis measure <b>Total Qty</b> yang njumlah kolom <code>Penjualan[Qty]</code>.', benar: ['Total Qty = SUM(Penjualan[Qty])', 'SUM(Penjualan[Qty])'], jelas: 'Total Qty = SUM(Penjualan[Qty])' },
        { t: 'pg', tanya: 'Omzet = qty × harga tiap baris. Fungsi yang tepat?', opsi: ['SUM', 'SUMX', 'COUNT', 'AVERAGE'], benar: 1, jelas: 'SUMX iterasi per baris, cocok buat perkalian per baris.' },
      ] },
    ] },
  ],
}

window.KURSUS.tableau = {
  id: 'tableau', nama: 'Tableau Singkat', ikon: '🧭',
  intro: 'Konsepnya mirip Power BI. Kalau udah paham Power BI, Tableau tinggal adaptasi. Tableau Public gratis dan jalan di browser, cocok buat pajang portofolio.',
  level: [
    { nama: 'Pemula', pelajaran: [
      { id: 'dimmeas', judul: 'Dimension vs Measure', langkah: [
        { t: 'teks', isi: '<p><b>Dimension</b> (biru) itu kategori buat ngelompokin: kota, produk, tanggal. <b>Measure</b> (hijau) itu angka yang dihitung: omzet, qty. Seret dimension ke Rows/Columns, measure jadi batang/garis.</p>' },
        { t: 'pg', tanya: 'Kolom "Kota" di Tableau biasanya jadi?', opsi: ['Measure', 'Dimension', 'Filter wajib', 'Parameter'], benar: 1, jelas: 'Kota itu kategori, jadi Dimension.' },
      ] },
    ] },
  ],
}

window.KURSUS.statistik = {
  id: 'statistik', nama: 'Statistik Bisnis', ikon: '📐',
  intro: 'Lu udah pakai uji statistik di TA. Di sini dibawa ke bahasa bisnis: rata-rata vs median, sebaran, A/B test, korelasi vs sebab-akibat.',
  level: [
    { nama: 'Pemula', pelajaran: [
      { id: 'pusat', judul: 'Mean, median, modus', langkah: [
        { t: 'teks', isi: '<p>Gaji 5 orang: 4, 5, 5, 6, 30 (juta). Mean = 10, median = 5. Satu nilai ekstrem narik mean jauh. Buat data miring (gaji, omzet), laporin median.</p>' },
        { t: 'angka', tanya: 'Data: 3, 7, 7, 9, 14. Berapa <b>median</b>-nya?', benar: 7, jelas: 'Diurutin, nilai tengah = 7.' },
        { t: 'angka', tanya: 'Data yang sama: 3, 7, 7, 9, 14. Berapa <b>mean</b>-nya?', benar: 8, jelas: '40 / 5 = 8.' },
      ] },
      { id: 'ab', judul: 'A/B test', langkah: [
        { t: 'teks', isi: '<p>Halaman A: 200 dari 4000 pengunjung beli (5%). Halaman B: 260 dari 4000 (6,5%). Beda 1,5 poin. Pertanyaan: beneran lebih bagus atau kebetulan? Uji proporsi ngasih p-value. Kalau p &lt; 0,05, biasanya dibilang signifikan.</p>' },
        { t: 'angka', tanya: 'Halaman B: 260 pembeli dari 4000 pengunjung. Berapa conversion rate-nya dalam persen?', benar: 6.5, toleransi: 0.01, jelas: '260 / 4000 = 0,065 = 6,5%.' },
        { t: 'pg', tanya: 'Penjualan es krim naik bareng kasus tenggelam. Kesimpulan yang bener?', opsi: ['Es krim bikin tenggelam', 'Ada faktor ketiga (cuaca panas) yang naikin dua-duanya', 'Tenggelam bikin orang beli es krim', 'Datanya pasti salah'], benar: 1, jelas: 'Korelasi bukan sebab-akibat. Cuaca panas naikin dua-duanya.' },
      ] },
    ] },
  ],
}

window.KURSUS.python = {
  id: 'python', nama: 'Python Data (pandas)', ikon: '🐍',
  intro: 'Lu udah pakai pandas di TA. Di sini naik level: cleaning, groupby, merge, dan analisis yang biasa ditanya pas tes teknis.',
  level: [
    { nama: 'Menengah', pelajaran: [
      { id: 'groupby', judul: 'groupby dan agg', langkah: [
        { t: 'teks', isi: '<pre>df.groupby("kota")["qty"].sum()\ndf.groupby("kota").agg(total=("qty", "sum"), rata=("harga", "mean"))</pre><p>Ini sama kayak GROUP BY di SQL.</p>' },
        { t: 'isian', tanya: 'Tulis kode buat <b>rata-rata harga per kategori</b> dari DataFrame <code>df</code> (kolom kategori dan harga).', benar: ['df.groupby("kategori")["harga"].mean()', "df.groupby('kategori')['harga'].mean()"], jelas: 'df.groupby("kategori")["harga"].mean()' },
      ] },
      { id: 'merge', judul: 'merge (JOIN-nya pandas)', langkah: [
        { t: 'teks', isi: '<pre>pd.merge(pesanan, pelanggan, left_on="pelanggan_id", right_on="id", how="left")</pre><p><code>how</code>: inner, left, right, outer. Sama kayak JOIN di SQL.</p>' },
        { t: 'pg', tanya: 'Mau semua pesanan tetap ada walau datanya ga ketemu di tabel pelanggan. how = ?', opsi: ['inner', 'left (pesanan di kiri)', 'right', 'cross'], benar: 1, jelas: 'left mertahanin semua baris tabel kiri.' },
      ] },
    ] },
  ],
}
