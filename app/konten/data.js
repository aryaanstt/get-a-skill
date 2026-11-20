// Materi skill data: Excel, SQL, Visualisasi, Statistik, Python.
// Jenis langkah: info, pilih, banyak, isian, angka, urut, pasang, sql, excel, kartu, skenario, tulis, slider.
window.GAS_KURSUS = window.GAS_KURSUS || {}
;(() => {
  const JUAL = [
    ['Tanggal', 'Kota', 'Produk', 'Qty', 'Harga'],
    ['1 Nov', 'Bandung', 'Kopi', 12, 85000],
    ['1 Nov', 'Jakarta', 'Teh', 5, 18000],
    ['2 Nov', 'Bandung', 'Teh', 8, 18000],
    ['2 Nov', 'Surabaya', 'Kopi', 3, 85000],
    ['3 Nov', 'Jakarta', 'Kopi', 6, 85000],
    ['3 Nov', 'Bandung', 'Kopi', 4, 85000],
  ]
  const PRODUK = [
    ['Kode', 'Produk', 'Kategori', 'Harga'],
    ['P01', 'Kopi Gayo', 'Minuman', 85000],
    ['P02', 'Teh Melati', 'Minuman', 18000],
    ['P03', 'Keripik Pedas', 'Makanan', 15000],
    ['P04', 'Madu Hutan', 'Makanan', 120000],
    ['P05', 'Botol Minum', 'Rumah', 70000],
  ]
  const NILAI = [
    ['Nama', 'Skor'], ['Ayu', 91], ['Budi', 74], ['Citra', 62], ['Dimas', 85], ['Eka', 70],
  ]

  window.GAS_KURSUS.EX = {
    tes: [
      { level: 'dasar', tanya: 'Rumus buat ngejumlahin isi sel D2 sampai D10?', opsi: ['=SUM(D2:D10)', 'SUM(D2:D10)', '=TOTAL(D2:D10)', '=ADD(D2:D10)'], benar: 0 },
      { level: 'dasar', tanya: 'Hasil dari =IF(5>3,"Ya","Tidak")?', opsi: ['Ya', 'Tidak', '5', 'Error'], benar: 0 },
      { level: 'menengah', tanya: 'Mau ngitung ada berapa sel berisi "Bandung". Fungsi yang pas?', opsi: ['COUNTIF', 'SUMIF', 'COUNTA', 'VLOOKUP'], benar: 0 },
      { level: 'menengah', tanya: 'Kalau VLOOKUP ditulis tanpa FALSE di argumen terakhir, apa risikonya?', opsi: ['Nyari yang mendekati, hasilnya bisa salah', 'Selalu error', 'Jadi lebih cepat', 'Ga ada bedanya'], benar: 0 },
      { level: 'mahir', tanya: 'Total qty khusus kota Bandung DAN produk Kopi. Fungsi yang pas?', opsi: ['SUMIFS', 'SUMIF', 'COUNTIFS', 'XLOOKUP'], benar: 0 },
      { level: 'mahir', tanya: '=IFERROR(A1/B1,0) kalau B1 isinya 0, hasilnya?', opsi: ['0', '#DIV/0!', 'Isi A1', 'Error'], benar: 0 },
    ],
    pelajaran: [
      { id: 'sel', level: 'dasar', judul: 'Sel, alamat, dan rumus pertama', menit: 5, langkah: [
        { t: 'info', judul: 'Spreadsheet itu tabel yang bisa ngitung', isi: '<p>Kolom pakai huruf (A, B, C), baris pakai angka (1, 2, 3). Pertemuannya disebut <b>sel</b>, misalnya <code>D2</code> = kolom D baris 2.</p><p>Rumus selalu diawali <code>=</code>. Contoh <code>=SUM(D2:D7)</code> artinya jumlahin D2 sampai D7.</p><p class="tip">Di latihan, kamu bisa <b>klik sel di tabel</b> buat masukin alamatnya ke rumus, atau seret buat milih rentang.</p>' },
        { t: 'pilih', tanya: 'Sel di kolom C baris 5, alamatnya apa?', opsi: ['C5', '5C', 'C-5', 'R5C3'], benar: 0, jelas: 'Huruf kolom dulu, baru angka baris.' },
        { t: 'excel', tanya: 'Hitung <b>total Qty</b> semua transaksi.', data: JUAL, sel: 'G2', label: 'Total Qty', kunci: '=SUM(D2:D7)', petunjuk: 'Pakai SUM, rentangnya D2 sampai D7.' },
        { t: 'excel', tanya: 'Hitung <b>rata-rata harga</b> dari semua transaksi.', data: JUAL, sel: 'G2', label: 'Rata-rata', kunci: '=AVERAGE(E2:E7)', petunjuk: 'AVERAGE buat rata-rata. Kolom harga itu E.' },
        { t: 'excel', tanya: 'Hitung <b>omzet transaksi pertama</b> (qty × harga di baris 2).', data: JUAL, sel: 'G2', label: 'Omzet', kunci: '=D2*E2', petunjuk: 'Kali pakai tanda *. Contoh =A1*B1.' },
      ] },
      { id: 'if', level: 'dasar', judul: 'IF: bikin keputusan otomatis', menit: 6, langkah: [
        { t: 'info', judul: 'IF = kalau begini, maka begitu', isi: '<p><code>=IF(syarat, kalau_benar, kalau_salah)</code></p><p>Contoh: <code>=IF(D2>=10,"Grosir","Eceran")</code>. Teks ditulis pakai tanda kutip dua.</p><p>Gabungin syarat pakai <code>AND(…)</code> (semua harus benar) atau <code>OR(…)</code> (salah satu cukup).</p>' },
        { t: 'excel', tanya: 'Tandai transaksi baris 2: <b>"Grosir"</b> kalau qty minimal 10, selain itu <b>"Eceran"</b>.', data: JUAL, sel: 'G2', label: 'Tipe', kunci: '=IF(D2>=10,"Grosir","Eceran")', petunjuk: 'Syaratnya D2>=10.' },
        { t: 'pilih', tanya: '<code>=IF(D2>=10,"Grosir","Eceran")</code> kalau D2 isinya 10, hasilnya?', opsi: ['Grosir', 'Eceran', '10', 'Error'], benar: 0, jelas: '10 >= 10 itu benar, jadi keluar "Grosir".' },
        { t: 'excel', tanya: 'Baris 3: tulis <b>"Mahal"</b> kalau harga lebih dari 50000, selain itu <b>"Murah"</b>.', data: JUAL, sel: 'G3', label: 'Label', kunci: '=IF(E3>50000,"Mahal","Murah")', petunjuk: 'Harga baris 3 ada di E3.' },
        { t: 'excel', tanya: 'Baris 2: tulis <b>"Prioritas"</b> kalau kotanya Bandung <b>dan</b> qty lebih dari 5, selain itu <b>"-"</b>.', data: JUAL, sel: 'G2', label: 'Status', kunci: '=IF(AND(B2="Bandung",D2>5),"Prioritas","-")', petunjuk: 'Bungkus dua syarat pakai AND(B2="Bandung",D2>5).' },
      ] },
      { id: 'countif', level: 'menengah', judul: 'COUNTIF dan SUMIF', menit: 6, langkah: [
        { t: 'info', judul: 'Ngitung dan njumlah pakai syarat', isi: '<p><code>=COUNTIF(rentang, syarat)</code> ngitung berapa sel yang cocok.</p><p><code>=SUMIF(rentang_syarat, syarat, rentang_jumlah)</code> njumlahin yang cocok.</p><p>Syarat angka ditulis pakai kutip: <code>">5"</code>, <code>"<=100"</code>.</p>' },
        { t: 'excel', tanya: 'Ada berapa transaksi dari <b>Bandung</b>?', data: JUAL, sel: 'G2', label: 'Jumlah', kunci: '=COUNTIF(B2:B7,"Bandung")', petunjuk: 'Rentang kota B2:B7, syaratnya "Bandung".' },
        { t: 'excel', tanya: 'Berapa <b>total qty</b> dari <b>Jakarta</b>?', data: JUAL, sel: 'G2', label: 'Qty Jakarta', kunci: '=SUMIF(B2:B7,"Jakarta",D2:D7)', petunjuk: 'SUMIF(B2:B7,"Jakarta",D2:D7)' },
        { t: 'excel', tanya: 'Ada berapa transaksi yang qty-nya <b>lebih dari 5</b>?', data: JUAL, sel: 'G2', label: 'Jumlah', kunci: '=COUNTIF(D2:D7,">5")', petunjuk: 'Syaratnya ditulis ">5" pakai kutip.' },
      ] },
      { id: 'lookup', level: 'menengah', judul: 'XLOOKUP dan VLOOKUP', menit: 7, langkah: [
        { t: 'info', judul: 'Nyari data dari tabel lain', isi: '<p><code>=XLOOKUP(yang_dicari, kolom_cari, kolom_hasil)</code>, lebih aman dan bisa nyari ke mana aja.</p><p><code>=VLOOKUP(yang_dicari, tabel, nomor_kolom, FALSE)</code>, versi lama yang masih banyak dipakai. <b>Wajib FALSE</b> di akhir biar nyari yang persis sama.</p>' },
        { t: 'excel', tanya: 'Cari <b>harga</b> produk berkode <b>P03</b> pakai XLOOKUP.', data: PRODUK, sel: 'F2', label: 'Harga P03', kunci: '=XLOOKUP("P03",A2:A6,D2:D6)', petunjuk: 'Cari "P03" di A2:A6, ambil dari D2:D6.' },
        { t: 'pilih', tanya: 'Kenapa VLOOKUP tanpa FALSE sering bikin salah?', opsi: ['Defaultnya nyari yang mendekati, padahal datanya ga urut', 'Karena ga bisa nyari teks', 'Karena lebih lambat', 'Ga ada pengaruh'], benar: 0, jelas: 'Tanpa FALSE, VLOOKUP pakai pencocokan mendekati yang butuh data terurut.' },
        { t: 'excel', tanya: 'Pakai VLOOKUP, cari <b>kategori</b> produk <b>P05</b>.', data: PRODUK, sel: 'F2', label: 'Kategori P05', kunci: '=VLOOKUP("P05",A2:D6,3,FALSE)', petunjuk: 'Kategori ada di kolom ke-3 dari tabel A2:D6.' },
      ] },
      { id: 'pivot', level: 'mahir', judul: 'Pivot table dan SUMIFS', menit: 7, langkah: [
        { t: 'info', judul: 'Pivot = ringkasan ribuan baris dalam beberapa klik', isi: '<p>PivotTable ngelompokin data: Rows (baris), Columns (kolom), Values (angka yang dihitung), Filter.</p><p>Kalau mau hasil yang sama pakai rumus, pakai <code>SUMIFS</code> yang bisa banyak syarat sekaligus.</p>' },
        { t: 'urut', tanya: 'Susun langkah bikin PivotTable total qty per kota.', item: ['Blok seluruh tabel data', 'Insert → PivotTable', 'Seret Kota ke Rows', 'Seret Qty ke Values', 'Pastiin hitungannya Sum of Qty'], jelas: 'Data dulu, bikin pivot, baru atur Rows dan Values.' },
        { t: 'pilih', tanya: 'Mau liat total per bulan. Kolom tanggal ditaruh di mana?', opsi: ['Rows atau Columns, terus di-group per bulan', 'Values', 'Filter aja', 'Ga bisa'], benar: 0, jelas: 'Klik kanan tanggal → Group → Months.' },
        { t: 'excel', tanya: 'Total qty khusus <b>Bandung</b> dan produk <b>Kopi</b>.', data: JUAL, sel: 'G2', label: 'Qty', kunci: '=SUMIFS(D2:D7,B2:B7,"Bandung",C2:C7,"Kopi")', petunjuk: 'SUMIFS(yang_dijumlah, rentang1, syarat1, rentang2, syarat2)' },
      ] },
      { id: 'gabung', level: 'mahir', judul: 'Rumus bertingkat dan anti-error', menit: 7, langkah: [
        { t: 'info', judul: 'Rumus yang tahan banting', isi: '<p>IF bisa ditumpuk: <code>=IF(B2>=85,"A",IF(B2>=70,"B","C"))</code>.</p><p><code>IFERROR(rumus, cadangan)</code> ngeganti error (misal #N/A) jadi teks yang rapi.</p>' },
        { t: 'excel', tanya: 'Kasih grade baris 2: <b>A</b> kalau skor ≥ 85, <b>B</b> kalau ≥ 70, selain itu <b>C</b>.', data: NILAI, sel: 'D2', label: 'Grade', kunci: '=IF(B2>=85,"A",IF(B2>=70,"B","C"))', petunjuk: 'IF di dalam IF.' },
        { t: 'excel', tanya: 'Cari harga produk <b>P09</b>. Kalau ga ketemu, tampilkan <b>"Tidak ada"</b>.', data: PRODUK, sel: 'F2', label: 'Harga', kunci: '=IFERROR(XLOOKUP("P09",A2:A6,D2:D6),"Tidak ada")', petunjuk: 'Bungkus XLOOKUP pakai IFERROR(…,"Tidak ada").' },
      ] },
    ],
  }

  window.GAS_KURSUS.SQ = {
    butuhDB: true,
    tes: [
      { level: 'dasar', tanya: 'Query buat ambil semua kolom dari tabel produk?', opsi: ['SELECT * FROM produk', 'GET produk', 'SELECT produk', 'SHOW * produk'], benar: 0 },
      { level: 'dasar', tanya: 'Buat nyaring baris (misal kota = Bandung) pakai?', opsi: ['WHERE', 'ORDER BY', 'GROUP BY', 'LIMIT'], benar: 0 },
      { level: 'menengah', tanya: 'Jumlah pelanggan di tiap kota. Bagian yang wajib ada?', opsi: ['GROUP BY kota', 'ORDER BY kota', 'WHERE kota', 'LIMIT kota'], benar: 0 },
      { level: 'menengah', tanya: 'Nama pelanggan cuma ada di tabel pelanggan, pesanan cuma nyimpen pelanggan_id. Cara gabunginnya?', opsi: ['JOIN ... ON pelanggan.id = pesanan.pelanggan_id', 'UNION', 'GROUP BY', 'HAVING'], benar: 0 },
      { level: 'mahir', tanya: 'Mau ranking produk termahal per kategori tanpa ngeringkas baris. Pakai?', opsi: ['RANK() OVER (PARTITION BY kategori ...)', 'GROUP BY kategori', 'HAVING', 'DISTINCT'], benar: 0 },
      { level: 'mahir', tanya: 'Bedanya WHERE sama HAVING?', opsi: ['WHERE nyaring baris mentah, HAVING nyaring hasil GROUP BY', 'Sama aja', 'HAVING lebih cepat', 'WHERE cuma buat angka'], benar: 0 },
    ],
    pelajaran: [
      { id: 'select', level: 'dasar', judul: 'SELECT: ngambil data', menit: 6, langkah: [
        { t: 'info', judul: 'Database itu kumpulan tabel', isi: '<p>Database toko online <b>Belanjain</b> punya 4 tabel:</p><ul><li><code>pelanggan</code> (id, nama, kota, segmen, tgl_daftar)</li><li><code>produk</code> (id, nama, kategori, harga)</li><li><code>pesanan</code> (id, pelanggan_id, tgl, status)</li><li><code>item</code> (pesanan_id, produk_id, qty)</li></ul><p>Perintah dasarnya <code>SELECT kolom FROM tabel</code>. Tanda <code>*</code> artinya semua kolom.</p>' },
        { t: 'sql', tanya: 'Tampilkan semua kolom dari tabel <code>produk</code>.', kunci: 'SELECT * FROM produk', petunjuk: 'SELECT * FROM nama_tabel' },
        { t: 'sql', tanya: 'Tampilkan cuma <code>nama</code> dan <code>kota</code> dari tabel <code>pelanggan</code>.', kunci: 'SELECT nama, kota FROM pelanggan', petunjuk: 'Pisahin nama kolom pakai koma.' },
        { t: 'pilih', tanya: '<code>SELECT harga FROM produk</code> hasilnya?', opsi: ['Satu kolom harga, semua baris', 'Cuma produk termahal', 'Semua kolom', 'Error karena kurang *'], benar: 0, jelas: 'SELECT milih kolom. Barisnya tetap semua.' },
      ] },
      { id: 'where', level: 'dasar', judul: 'WHERE: nyaring baris', menit: 6, langkah: [
        { t: 'info', judul: 'Ambil yang perlu aja', isi: '<pre>SELECT nama, harga FROM produk WHERE harga > 100000;\nSELECT * FROM pelanggan WHERE kota = \'Bandung\';</pre><p>Teks pakai kutip satu. Gabung syarat pakai <code>AND</code>/<code>OR</code>, banyak nilai pakai <code>IN (\'a\',\'b\')</code>.</p>' },
        { t: 'sql', tanya: 'Tampilkan <code>nama</code> pelanggan yang tinggal di <b>Bandung</b>.', kunci: "SELECT nama FROM pelanggan WHERE kota = 'Bandung'", petunjuk: "WHERE kota = 'Bandung'" },
        { t: 'sql', tanya: 'Tampilkan <code>nama</code> dan <code>harga</code> produk yang harganya <b>lebih dari 200000</b>.', kunci: 'SELECT nama, harga FROM produk WHERE harga > 200000', petunjuk: 'Angka ditulis tanpa titik.' },
        { t: 'sql', tanya: 'Tampilkan semua pesanan yang statusnya <b>batal</b> atau <b>retur</b>.', kunci: "SELECT * FROM pesanan WHERE status IN ('batal','retur')", petunjuk: "status IN ('batal','retur')" },
      ] },
      { id: 'order', level: 'dasar', judul: 'ORDER BY dan LIMIT', menit: 5, langkah: [
        { t: 'info', judul: 'Urutin dan ambil teratas', isi: '<pre>SELECT nama, harga FROM produk\nORDER BY harga DESC\nLIMIT 3;</pre><p><code>DESC</code> besar ke kecil, default kecil ke besar.</p>' },
        { t: 'sql', tanya: 'Tampilkan <code>nama</code> dan <code>harga</code> <b>5 produk termurah</b>.', kunci: 'SELECT nama, harga FROM produk ORDER BY harga ASC LIMIT 5', urut: true, petunjuk: 'ORDER BY harga, LIMIT 5.' },
        { t: 'sql', tanya: 'Tampilkan <code>nama</code> dan <code>tgl_daftar</code> <b>3 pelanggan paling baru</b>.', kunci: 'SELECT nama, tgl_daftar FROM pelanggan ORDER BY tgl_daftar DESC LIMIT 3', urut: true, petunjuk: 'Urutin tgl_daftar DESC.' },
      ] },
      { id: 'group', level: 'menengah', judul: 'Agregat dan GROUP BY', menit: 7, langkah: [
        { t: 'info', judul: 'Ringkas banyak baris jadi angka', isi: '<p><code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>. Pakai <code>GROUP BY</code> buat per kelompok, <code>HAVING</code> buat nyaring hasilnya.</p><pre>SELECT kota, COUNT(*) AS jumlah\nFROM pelanggan GROUP BY kota\nHAVING COUNT(*) >= 3;</pre>' },
        { t: 'sql', tanya: 'Berapa <b>rata-rata harga</b> produk kategori <b>Elektronik</b>?', kunci: "SELECT AVG(harga) FROM produk WHERE kategori = 'Elektronik'", petunjuk: 'AVG + WHERE.' },
        { t: 'sql', tanya: 'Tampilkan <code>kategori</code> dan <b>jumlah produk</b> di tiap kategori.', kunci: 'SELECT kategori, COUNT(*) FROM produk GROUP BY kategori', petunjuk: 'GROUP BY kategori.' },
        { t: 'sql', tanya: 'Tampilkan <code>status</code> pesanan dan jumlahnya, <b>cuma yang lebih dari 5</b>.', kunci: 'SELECT status, COUNT(*) FROM pesanan GROUP BY status HAVING COUNT(*) > 5', petunjuk: 'HAVING COUNT(*) > 5' },
      ] },
      { id: 'join', level: 'menengah', judul: 'JOIN: gabung tabel', menit: 8, langkah: [
        { t: 'info', judul: 'Nyambungin data', isi: '<pre>SELECT p.id, c.nama, p.tgl\nFROM pesanan p\nJOIN pelanggan c ON c.id = p.pelanggan_id;</pre><p><code>JOIN</code> ambil yang cocok di dua tabel. <code>LEFT JOIN</code> ambil semua baris tabel kiri walau ga ada pasangannya.</p>' },
        { t: 'sql', tanya: 'Tampilkan <code>id</code> pesanan, <code>nama</code> dan <code>kota</code> pelanggan buat semua pesanan.', kunci: 'SELECT p.id, c.nama, c.kota FROM pesanan p JOIN pelanggan c ON c.id = p.pelanggan_id', petunjuk: 'FROM pesanan JOIN pelanggan ON pelanggan.id = pesanan.pelanggan_id' },
        { t: 'sql', tanya: 'Pelanggan mana yang <b>belum pernah pesan</b>? Tampilkan <code>nama</code>-nya.', kunci: 'SELECT c.nama FROM pelanggan c LEFT JOIN pesanan p ON p.pelanggan_id = c.id WHERE p.id IS NULL', petunjuk: 'LEFT JOIN, lalu WHERE pesanan.id IS NULL.' },
        { t: 'sql', tanya: 'Total omzet (qty × harga) tiap <b>kategori</b>, urut dari terbesar.', kunci: 'SELECT pr.kategori, SUM(i.qty * pr.harga) AS omzet FROM item i JOIN produk pr ON pr.id = i.produk_id GROUP BY pr.kategori ORDER BY omzet DESC', urut: true, petunjuk: 'item JOIN produk, GROUP BY kategori, ORDER BY omzet DESC.' },
      ] },
      { id: 'cte', level: 'mahir', judul: 'CASE, subquery, dan CTE', menit: 8, langkah: [
        { t: 'info', judul: 'Logika dan langkah bertahap', isi: '<pre>SELECT nama,\n  CASE WHEN harga >= 500000 THEN \'Premium\'\n       WHEN harga >= 100000 THEN \'Menengah\'\n       ELSE \'Hemat\' END AS kelas\nFROM produk;</pre><p><code>WITH nama AS (…)</code> bikin tabel sementara biar query panjang kebaca rapi.</p>' },
        { t: 'sql', tanya: 'Hitung <b>jumlah produk per kelas harga</b> (Premium ≥ 500000, Menengah ≥ 100000, sisanya Hemat).', kunci: "SELECT CASE WHEN harga >= 500000 THEN 'Premium' WHEN harga >= 100000 THEN 'Menengah' ELSE 'Hemat' END AS kelas, COUNT(*) FROM produk GROUP BY kelas", petunjuk: 'CASE di SELECT, GROUP BY aliasnya.' },
        { t: 'sql', tanya: 'Tampilkan <code>nama</code> produk yang harganya <b>di atas rata-rata</b>.', kunci: 'SELECT nama FROM produk WHERE harga > (SELECT AVG(harga) FROM produk)', petunjuk: 'WHERE harga > (SELECT AVG(harga) FROM produk)' },
      ] },
      { id: 'window', level: 'mahir', judul: 'Window function dan studi kasus', menit: 10, langkah: [
        { t: 'info', judul: 'Ngitung per baris tanpa ngeringkas', isi: '<pre>SELECT kategori, nama, harga,\n  RANK() OVER (PARTITION BY kategori ORDER BY harga DESC) AS r\nFROM produk;</pre><p>Pertanyaan bisnis yang sering muncul di tes: <i>"Berapa persen pelanggan yang beli lebih dari sekali?"</i> (repeat rate).</p>' },
        { t: 'sql', tanya: 'Ambil <b>produk termahal di tiap kategori</b>: kategori, nama, harga.', kunci: 'SELECT kategori, nama, harga FROM (SELECT kategori, nama, harga, RANK() OVER (PARTITION BY kategori ORDER BY harga DESC) AS r FROM produk) WHERE r = 1', petunjuk: 'Bungkus RANK() di subquery, lalu WHERE r = 1.' },
        { t: 'sql', tanya: 'Hitung <b>repeat rate</b> (persen, 1 desimal) dari pesanan berstatus <b>selesai</b>.', kunci: "WITH n AS (SELECT pelanggan_id, COUNT(*) AS k FROM pesanan WHERE status = 'selesai' GROUP BY pelanggan_id) SELECT ROUND(100.0 * SUM(k > 1) / COUNT(*), 1) FROM n", petunjuk: 'CTE jumlah pesanan per pelanggan, SUM(k > 1) ngitung yang lebih dari sekali, kali 100.0.' },
      ] },
    ],
  }

  window.GAS_KURSUS.VZ = {
    tes: [
      { level: 'dasar', tanya: 'Mau nunjukin tren penjualan 12 bulan. Grafik paling pas?', opsi: ['Garis (line chart)', 'Pie chart', 'Tabel', 'Scatter'], benar: 0 },
      { level: 'dasar', tanya: 'Bandingin penjualan 6 kota. Grafik paling pas?', opsi: ['Batang (bar chart)', 'Pie 3D', 'Garis', 'Peta panas'], benar: 0 },
      { level: 'menengah', tanya: 'Di Power BI, tabel Penjualan (tanggal, produk_id, qty) itu jenis tabel apa?', opsi: ['Tabel fakta', 'Tabel dimensi', 'Tabel kalender', 'Tabel parameter'], benar: 0 },
      { level: 'menengah', tanya: 'Kolom tanggal kebaca sebagai teks di Power BI. Benerinnya di mana?', opsi: ['Power Query', 'DAX', 'Visual', 'Ga bisa'], benar: 0 },
    ],
    pelajaran: [
      { id: 'grafik', level: 'dasar', judul: 'Milih grafik yang tepat', menit: 6, langkah: [
        { t: 'info', judul: 'Grafik itu jawaban dari satu pertanyaan', isi: '<p><b>Batang</b>: bandingin kategori. <b>Garis</b>: tren waktu. <b>Pie</b>: porsi dari total, maksimal 4 sampai 5 bagian. <b>Scatter</b>: hubungan dua angka. <b>Tabel</b>: kalau orang butuh angka persis.</p>' },
        { t: 'pasang', tanya: 'Pasangin pertanyaan dengan grafiknya.', pasangan: [['Omzet per bulan selama setahun', 'Garis'], ['Penjualan tiap cabang', 'Batang'], ['Porsi channel penjualan (3 channel)', 'Pie'], ['Harga iklan vs jumlah klik', 'Scatter']], jelas: 'Tanya dulu: bandingin, tren, porsi, atau hubungan?' },
        { t: 'pilih', tanya: 'Atasan nanya: "Kota mana yang omzetnya paling gede bulan ini?" Grafik terbaik?', opsi: ['Bar chart diurutin dari terbesar', 'Pie chart 12 kota', 'Line chart', 'Tabel 30 kolom'], benar: 0, jelas: 'Bar yang diurutin bikin jawaban langsung keliatan di batang paling atas.' },
        { t: 'pilih', tanya: 'Mana yang paling bikin grafik nyesatin?', opsi: ['Sumbu Y ga mulai dari 0 di bar chart', 'Pakai judul yang jelas', 'Satu warna buat satu kategori', 'Ngurutin batang'], benar: 0, jelas: 'Bar chart yang sumbunya dipotong bikin beda kecil keliatan raksasa.' },
      ] },
      { id: 'model', level: 'dasar', judul: 'Dashboard dan model data', menit: 6, langkah: [
        { t: 'info', judul: 'Alur Power BI dan Tableau', isi: '<p>Alurnya hampir selalu sama: ambil data, bersihin, hubungin tabel, bikin ukuran (measure), terus bikin visual.</p><p><b>Tabel fakta</b> isinya kejadian yang dihitung (penjualan). <b>Tabel dimensi</b> isinya keterangan (produk, kota, tanggal).</p>' },
        { t: 'urut', tanya: 'Susun alur bikin dashboard.', item: ['Ambil data (Get Data)', 'Bersihin di Power Query', 'Hubungin tabel (model)', 'Bikin measure (DAX)', 'Susun visual dan publish'], jelas: 'Data yang kotor bikin dashboard bohong, jadi bersihin duluan.' },
        { t: 'pasang', tanya: 'Fakta atau dimensi?', pasangan: [['Penjualan (tgl, produk_id, qty)', 'Fakta'], ['Produk (nama, kategori)', 'Dimensi'], ['Kalender (tanggal, bulan)', 'Dimensi '], ['Kunjungan web (tgl, halaman, durasi)', 'Fakta ']], jelas: 'Fakta = kejadian yang dihitung. Dimensi = keterangan buat ngelompokin.' },
      ] },
    ],
  }

  window.GAS_KURSUS.ST = {
    tes: [
      { level: 'dasar', tanya: 'Data 3, 7, 7, 9, 14. Mediannya?', opsi: ['7', '8', '9', '14'], benar: 0 },
      { level: 'dasar', tanya: 'Omzet naik dari 100 juta jadi 120 juta. Naik berapa persen?', opsi: ['20%', '120%', '12%', '2%'], benar: 0 },
      { level: 'menengah', tanya: 'Penjualan es krim naik bareng kasus tenggelam. Kesimpulan yang tepat?', opsi: ['Ada faktor ketiga (cuaca panas)', 'Es krim bikin tenggelam', 'Datanya salah', 'Tenggelam bikin beli es krim'], benar: 0 },
      { level: 'menengah', tanya: 'Di A/B test, p-value 0,03. Biasanya artinya?', opsi: ['Bedanya signifikan (di bawah 0,05)', 'Bedanya kebetulan', 'Eksperimennya gagal', 'Sampelnya kurang'], benar: 0 },
    ],
    pelajaran: [
      { id: 'pusat', level: 'dasar', judul: 'Mean, median, dan pencilan', menit: 5, langkah: [
        { t: 'info', judul: 'Rata-rata bisa nipu', isi: '<p>Gaji 5 orang: 4, 5, 5, 6, dan 30 juta. <b>Mean</b> 10 juta, padahal 4 dari 5 orang gajinya di bawah 6 juta. <b>Median</b> (nilai tengah) 5 juta lebih jujur buat data yang miring kayak gaji dan omzet.</p>' },
        { t: 'angka', tanya: 'Data: 3, 7, 7, 9, 14. Berapa <b>mean</b>-nya?', benar: 8, jelas: '(3+7+7+9+14) / 5 = 40 / 5 = 8' },
        { t: 'angka', tanya: 'Data: 12, 5, 9, 20, 7. Berapa <b>median</b>-nya?', benar: 9, jelas: 'Diurutin dulu: 5, 7, 9, 12, 20. Nilai tengahnya 9.' },
        { t: 'slider', tanya: 'Tebak dulu: kalau gaji 30 juta di atas diganti 300 juta, mean-nya jadi kira-kira berapa juta?', min: 0, max: 100, step: 1, benar: 64, toleransi: 3, satuan: 'juta', jelas: '(4+5+5+6+300)/5 = 64 juta. Mediannya tetap 5. Ini kenapa median dipakai buat gaji.' },
      ] },
      { id: 'persen', level: 'dasar', judul: 'Persen, konversi, dan korelasi', menit: 6, langkah: [
        { t: 'angka', tanya: 'Omzet bulan lalu 80 juta, bulan ini 100 juta. Naik berapa <b>persen</b>?', benar: 25, satuan: '%', jelas: '(100 − 80) / 80 × 100% = 25%' },
        { t: 'angka', tanya: 'Halaman toko: 4000 pengunjung, 260 beli. <b>Conversion rate</b>-nya berapa persen?', benar: 6.5, toleransi: 0.05, satuan: '%', jelas: '260 / 4000 = 0,065 = 6,5%' },
        { t: 'pilih', tanya: 'Kota yang banyak cabang gym-nya punya penjualan protein lebih tinggi. Boleh disimpulin gym bikin orang beli protein?', opsi: ['Belum tentu, bisa jadi ada faktor lain (kota besar, pendapatan)', 'Pasti iya', 'Pasti nggak', 'Datanya pasti salah'], benar: 0, jelas: 'Korelasi bukan sebab-akibat. Cek faktor ketiga dulu.' },
      ] },
    ],
  }

  window.GAS_KURSUS.PY = {
    tes: [
      { level: 'dasar', tanya: 'x = [3, 5, 7]. print(len(x)) hasilnya?', opsi: ['3', '7', '15', 'Error'], benar: 0 },
      { level: 'dasar', tanya: 'Simbol buat komentar di Python?', opsi: ['#', '//', '--', '/*'], benar: 0 },
      { level: 'menengah', tanya: 'Rata-rata harga per kategori di pandas?', opsi: ['df.groupby("kategori")["harga"].mean()', 'df.mean("kategori")', 'df["harga"].group()', 'mean(df)'], benar: 0 },
      { level: 'menengah', tanya: 'pd.merge(a, b, how="left") artinya?', opsi: ['Semua baris a dipertahankan', 'Cuma yang cocok', 'Semua baris b', 'Gabung ke bawah'], benar: 0 },
    ],
    pelajaran: [
      { id: 'logika', level: 'dasar', judul: 'Variabel, list, dan perulangan', menit: 6, langkah: [
        { t: 'info', judul: 'Python itu nyuruh komputer langkah demi langkah', isi: '<pre>harga = [85000, 18000, 15000]\ntotal = 0\nfor h in harga:\n    total = total + h\nprint(total)   # 118000</pre><p>Variabel nyimpen nilai, list nyimpen banyak nilai, <code>for</code> ngulang untuk tiap isi.</p>' },
        { t: 'pilih', tanya: '<code>x = [3, 5, 7]</code> lalu <code>print(x[1])</code>. Hasilnya?', opsi: ['5', '3', '7', 'Error'], benar: 0, jelas: 'Indeks Python mulai dari 0. x[1] itu isi kedua.' },
        { t: 'pilih', tanya: '<pre>n = 0\nfor i in range(4):\n    n = n + i\nprint(n)</pre>Hasilnya?', opsi: ['6', '4', '10', '0'], benar: 0, jelas: 'range(4) = 0, 1, 2, 3. Jumlahnya 6.' },
        { t: 'isian', tanya: 'Tulis satu baris kode yang nampilin tulisan <b>Halo</b>.', benar: ['print("Halo")', "print('Halo')"], jelas: 'print("Halo")' },
      ] },
      { id: 'pandas', level: 'menengah', judul: 'pandas: groupby dan merge', menit: 7, langkah: [
        { t: 'info', judul: 'Excel-nya Python', isi: '<pre>import pandas as pd\ndf = pd.read_csv("penjualan.csv")\ndf.groupby("kota")["qty"].sum()\npd.merge(pesanan, pelanggan, left_on="pelanggan_id", right_on="id", how="left")</pre>' },
        { t: 'isian', tanya: 'Tulis kode <b>rata-rata harga per kategori</b> dari DataFrame <code>df</code>.', benar: ['df.groupby("kategori")["harga"].mean()', "df.groupby('kategori')['harga'].mean()"], jelas: 'df.groupby("kategori")["harga"].mean()' },
        { t: 'urut', tanya: 'Susun alur analisis data yang rapi.', item: ['Baca data (read_csv)', 'Cek dan bersihin (dropna, tipe data)', 'Ringkas (groupby)', 'Visualisasi', 'Tulis kesimpulan'], jelas: 'Bersihin sebelum ngitung, simpulin setelah liat datanya.' },
      ] },
    ],
  }
})()
