// Kursus SQL. Database toko online "Belanjain" dibikin di browser (data/sql-db.js), semua query beneran dijalankan pakai SQLite.
window.KURSUS = window.KURSUS || {}
window.KURSUS.sql = {
  id: 'sql', nama: 'SQL untuk Data Analyst', ikon: '🗄️',
  intro: 'SQL itu bahasa buat "nanya" ke database. Hampir semua loker data analyst minta ini. Di sini lu nulis query beneran ke database toko online <b>Belanjain</b> (pelanggan, produk, pesanan, item) dan jawabannya dicek otomatis.',
  butuhDB: true,
  level: [
    {
      nama: 'Pemula', pelajaran: [
        {
          id: 'select', judul: 'SELECT: ngambil data', langkah: [
            { t: 'teks', isi: `<p>Database itu kumpulan <b>tabel</b>. Tiap tabel punya <b>kolom</b> (nama, kota, harga) dan <b>baris</b> (satu pelanggan, satu produk).</p><p>Database Belanjain punya 4 tabel:</p><ul><li><code>pelanggan</code> (id, nama, kota, segmen, tgl_daftar)</li><li><code>produk</code> (id, nama, kategori, harga)</li><li><code>pesanan</code> (id, pelanggan_id, tgl, status)</li><li><code>item</code> (pesanan_id, produk_id, qty)</li></ul><p>Perintah paling dasar: <code>SELECT kolom FROM tabel</code>. Tanda <code>*</code> artinya semua kolom.</p><pre>SELECT * FROM pelanggan;</pre>` },
            { t: 'sql', tanya: 'Tampilkan semua kolom dari tabel <code>produk</code>.', kunci: 'SELECT * FROM produk', petunjuk: 'Ganti nama tabelnya aja dari contoh di atas.' },
            { t: 'sql', tanya: 'Tampilkan cuma kolom <code>nama</code> dan <code>kota</code> dari tabel <code>pelanggan</code>.', kunci: 'SELECT nama, kota FROM pelanggan', petunjuk: 'Pisahin nama kolom pakai koma: SELECT a, b FROM ...' },
            { t: 'pg', tanya: 'Query <code>SELECT harga FROM produk</code> bakal ngasih apa?', opsi: ['Semua kolom tabel produk', 'Satu kolom harga, semua baris produk', 'Cuma produk termahal', 'Error karena kurang *'], benar: 1, jelas: 'SELECT milih kolom, bukan nyaring baris. Semua baris tetap keluar.' },
          ],
        },
        {
          id: 'where', judul: 'WHERE: nyaring baris', langkah: [
            { t: 'teks', isi: `<p><code>WHERE</code> nyaring baris yang memenuhi syarat. Teks pakai tanda kutip satu, angka ga pakai.</p><pre>SELECT nama, harga FROM produk WHERE harga > 100000;\nSELECT * FROM pelanggan WHERE kota = 'Bandung';</pre><p>Gabung syarat pakai <code>AND</code> / <code>OR</code>. Buat banyak nilai pakai <code>IN ('a','b')</code>, rentang pakai <code>BETWEEN 10 AND 20</code>, pola teks pakai <code>LIKE 'Kopi%'</code>.</p>` },
            { t: 'sql', tanya: 'Tampilkan <code>nama</code> pelanggan yang tinggal di <b>Bandung</b>.', kunci: "SELECT nama FROM pelanggan WHERE kota = 'Bandung'", petunjuk: "WHERE kota = 'Bandung'" },
            { t: 'sql', tanya: 'Tampilkan <code>nama</code> dan <code>harga</code> produk dengan harga <b>lebih dari 200.000</b>.', kunci: 'SELECT nama, harga FROM produk WHERE harga > 200000', petunjuk: 'Angka ditulis tanpa titik: 200000' },
            { t: 'sql', tanya: 'Tampilkan semua kolom pesanan yang statusnya <b>batal</b> atau <b>retur</b>.', kunci: "SELECT * FROM pesanan WHERE status IN ('batal','retur')", petunjuk: "Pakai IN ('batal','retur') atau dua syarat digabung OR." },
          ],
        },
        {
          id: 'order', judul: 'ORDER BY dan LIMIT', langkah: [
            { t: 'teks', isi: `<p><code>ORDER BY kolom</code> ngurutin hasil (default kecil ke besar). Tambah <code>DESC</code> buat besar ke kecil. <code>LIMIT n</code> ambil n baris teratas.</p><pre>SELECT nama, harga FROM produk ORDER BY harga DESC LIMIT 3;</pre>` },
            { t: 'sql', tanya: 'Tampilkan <code>nama</code> dan <code>harga</code> <b>5 produk termurah</b>, urut dari yang paling murah.', kunci: 'SELECT nama, harga FROM produk ORDER BY harga ASC LIMIT 5', urut: true, petunjuk: 'ORDER BY harga lalu LIMIT 5' },
            { t: 'sql', tanya: 'Tampilkan <code>nama</code> dan <code>tgl_daftar</code> <b>3 pelanggan yang paling baru daftar</b>.', kunci: 'SELECT nama, tgl_daftar FROM pelanggan ORDER BY tgl_daftar DESC LIMIT 3', urut: true, petunjuk: 'Tanggal disimpan format YYYY-MM-DD, jadi bisa diurutin langsung. Pakai DESC.' },
          ],
        },
        {
          id: 'agregat', judul: 'COUNT, SUM, AVG, MIN, MAX', langkah: [
            { t: 'teks', isi: `<p>Fungsi agregat ngerangkum banyak baris jadi satu angka.</p><pre>SELECT COUNT(*) FROM pelanggan;          -- jumlah baris\nSELECT AVG(harga) FROM produk;           -- rata-rata\nSELECT MIN(harga), MAX(harga) FROM produk;</pre><p>Kasih nama kolom hasil pakai <code>AS</code>: <code>SELECT COUNT(*) AS jumlah FROM pelanggan</code>.</p>` },
            { t: 'sql', tanya: 'Ada berapa <b>jumlah pesanan</b> total? (satu angka)', kunci: 'SELECT COUNT(*) FROM pesanan', petunjuk: 'COUNT(*) dari tabel pesanan' },
            { t: 'sql', tanya: 'Berapa <b>rata-rata harga</b> produk kategori <b>Elektronik</b>?', kunci: "SELECT AVG(harga) FROM produk WHERE kategori = 'Elektronik'", petunjuk: 'Gabung AVG sama WHERE' },
            { t: 'angka', tanya: 'Kalau 4 produk harganya 10, 20, 30, 40, berapa hasil <code>AVG(harga)</code>?', benar: 25, jelas: '(10+20+30+40)/4 = 25' },
          ],
        },
        {
          id: 'group', judul: 'GROUP BY dan HAVING', langkah: [
            { t: 'teks', isi: `<p><code>GROUP BY</code> bikin agregat per kelompok. Contoh jumlah pelanggan per kota:</p><pre>SELECT kota, COUNT(*) AS jumlah\nFROM pelanggan\nGROUP BY kota;</pre><p><code>HAVING</code> itu WHERE-nya hasil agregat (dipakai setelah GROUP BY):</p><pre>SELECT kota, COUNT(*) AS jumlah FROM pelanggan\nGROUP BY kota HAVING COUNT(*) >= 3;</pre>` },
            { t: 'sql', tanya: 'Tampilkan <code>kategori</code> dan <b>jumlah produk</b> di tiap kategori.', kunci: 'SELECT kategori, COUNT(*) FROM produk GROUP BY kategori', petunjuk: 'SELECT kategori, COUNT(*) ... GROUP BY kategori' },
            { t: 'sql', tanya: 'Tampilkan <code>status</code> pesanan dan jumlahnya, <b>cuma status yang jumlahnya lebih dari 5</b>.', kunci: 'SELECT status, COUNT(*) FROM pesanan GROUP BY status HAVING COUNT(*) > 5', petunjuk: 'HAVING COUNT(*) > 5' },
            { t: 'pg', tanya: 'Bedanya WHERE sama HAVING?', opsi: ['Sama aja', 'WHERE nyaring baris sebelum dikelompokkan, HAVING nyaring hasil kelompok', 'HAVING lebih cepat', 'WHERE cuma buat angka'], benar: 1, jelas: 'WHERE jalan duluan ke baris mentah. HAVING jalan setelah GROUP BY ke hasil agregat.' },
          ],
        },
      ],
    },
    {
      nama: 'Menengah', pelajaran: [
        {
          id: 'join', judul: 'JOIN: gabung tabel', langkah: [
            { t: 'teks', isi: `<p>Data pesanan cuma nyimpen <code>pelanggan_id</code>. Buat dapet nama pelanggannya, gabung tabel pakai <code>JOIN ... ON</code>.</p><pre>SELECT p.id, c.nama, p.tgl\nFROM pesanan p\nJOIN pelanggan c ON c.id = p.pelanggan_id;</pre><p><code>p</code> dan <code>c</code> itu alias biar pendek. <code>JOIN</code> (INNER) cuma ngambil yang cocok di dua tabel. <code>LEFT JOIN</code> ngambil semua baris tabel kiri walau ga ada pasangannya.</p>` },
            { t: 'sql', tanya: 'Tampilkan <code>id</code> pesanan, <code>nama</code> pelanggan, dan <code>kota</code> pelanggan buat <b>semua pesanan</b>.', kunci: 'SELECT p.id, c.nama, c.kota FROM pesanan p JOIN pelanggan c ON c.id = p.pelanggan_id', petunjuk: 'FROM pesanan JOIN pelanggan ON pelanggan.id = pesanan.pelanggan_id' },
            { t: 'sql', tanya: 'Pelanggan mana aja yang <b>belum pernah pesan</b>? Tampilkan <code>nama</code>-nya.', kunci: 'SELECT c.nama FROM pelanggan c LEFT JOIN pesanan p ON p.pelanggan_id = c.id WHERE p.id IS NULL', petunjuk: 'LEFT JOIN pesanan, terus WHERE pesanan.id IS NULL' },
          ],
        },
        {
          id: 'join3', judul: 'JOIN 3 tabel: omzet', langkah: [
            { t: 'teks', isi: `<p>Omzet = qty × harga. Butuh tabel <code>item</code> (qty) dan <code>produk</code> (harga).</p><pre>SELECT pr.kategori, SUM(i.qty * pr.harga) AS omzet\nFROM item i\nJOIN produk pr ON pr.id = i.produk_id\nGROUP BY pr.kategori\nORDER BY omzet DESC;</pre>` },
            { t: 'sql', tanya: 'Hitung <b>total omzet tiap pelanggan</b>: tampilkan <code>nama</code> dan total (qty × harga), dari pesanan yang statusnya <b>selesai</b>. Urutkan dari omzet terbesar.', kunci: "SELECT c.nama, SUM(i.qty * pr.harga) AS omzet FROM pesanan p JOIN pelanggan c ON c.id = p.pelanggan_id JOIN item i ON i.pesanan_id = p.id JOIN produk pr ON pr.id = i.produk_id WHERE p.status = 'selesai' GROUP BY c.id, c.nama ORDER BY omzet DESC", urut: true, petunjuk: 'pesanan → pelanggan, pesanan → item → produk. WHERE status, GROUP BY pelanggan, ORDER BY omzet DESC.' },
          ],
        },
        {
          id: 'case', judul: 'CASE WHEN: bikin kategori', langkah: [
            { t: 'teks', isi: `<p><code>CASE WHEN</code> itu IF-nya SQL. Berguna buat ngelompokin.</p><pre>SELECT nama, harga,\n  CASE WHEN harga >= 500000 THEN 'Premium'\n       WHEN harga >= 100000 THEN 'Menengah'\n       ELSE 'Hemat' END AS kelas\nFROM produk;</pre>` },
            { t: 'sql', tanya: 'Hitung <b>jumlah produk per kelas harga</b> pakai aturan di atas (Premium, Menengah, Hemat). Tampilkan kelas dan jumlahnya.', kunci: "SELECT CASE WHEN harga >= 500000 THEN 'Premium' WHEN harga >= 100000 THEN 'Menengah' ELSE 'Hemat' END AS kelas, COUNT(*) FROM produk GROUP BY kelas", petunjuk: 'Taruh CASE di SELECT, terus GROUP BY nama alias-nya.' },
          ],
        },
        {
          id: 'cte', judul: 'Subquery dan CTE (WITH)', langkah: [
            { t: 'teks', isi: `<p>Query di dalam query. CTE (<code>WITH</code>) bikin langkahnya kebaca rapi:</p><pre>WITH belanja AS (\n  SELECT p.pelanggan_id, SUM(i.qty * pr.harga) AS total\n  FROM pesanan p JOIN item i ON i.pesanan_id = p.id\n  JOIN produk pr ON pr.id = i.produk_id\n  GROUP BY p.pelanggan_id\n)\nSELECT * FROM belanja WHERE total > (SELECT AVG(total) FROM belanja);</pre>` },
            { t: 'sql', tanya: 'Tampilkan <code>nama</code> produk yang <b>harganya di atas rata-rata</b> semua produk.', kunci: 'SELECT nama FROM produk WHERE harga > (SELECT AVG(harga) FROM produk)', petunjuk: 'WHERE harga > (SELECT AVG(harga) FROM produk)' },
          ],
        },
      ],
    },
    {
      nama: 'Mahir', pelajaran: [
        {
          id: 'window', judul: 'Window function: ranking & running total', langkah: [
            { t: 'teks', isi: `<p>Window function ngitung per baris tanpa ngeringkas tabel. Contoh ranking produk termahal per kategori:</p><pre>SELECT kategori, nama, harga,\n  RANK() OVER (PARTITION BY kategori ORDER BY harga DESC) AS peringkat\nFROM produk;</pre><p>Running total omzet harian: <code>SUM(x) OVER (ORDER BY tgl)</code>.</p>` },
            { t: 'sql', tanya: 'Ambil <b>produk termahal di tiap kategori</b>: tampilkan <code>kategori</code>, <code>nama</code>, <code>harga</code>.', kunci: 'SELECT kategori, nama, harga FROM (SELECT kategori, nama, harga, RANK() OVER (PARTITION BY kategori ORDER BY harga DESC) AS r FROM produk) WHERE r = 1', petunjuk: 'Bungkus query RANK() di subquery, terus WHERE r = 1.' },
            { t: 'sql', tanya: 'Hitung <b>jumlah pesanan per bulan</b> dan <b>kumulatifnya</b>. Kolom: bulan (format YYYY-MM), jumlah, kumulatif. Urut per bulan.', kunci: "SELECT strftime('%Y-%m', tgl) AS bulan, COUNT(*) AS jumlah, SUM(COUNT(*)) OVER (ORDER BY strftime('%Y-%m', tgl)) AS kumulatif FROM pesanan GROUP BY bulan ORDER BY bulan", urut: true, petunjuk: "strftime('%Y-%m', tgl) buat bulan. SUM(COUNT(*)) OVER (ORDER BY bulan) buat kumulatif." },
          ],
        },
      ],
    },
    {
      nama: 'Ahli', pelajaran: [
        {
          id: 'kasus', judul: 'Studi kasus: pelanggan setia', langkah: [
            { t: 'teks', isi: `<p>Pertanyaan bisnis beneran: <i>"Berapa persen pelanggan yang pesan lebih dari sekali?"</i> (repeat rate). Pecah jadi langkah:</p><ol><li>Hitung jumlah pesanan selesai per pelanggan.</li><li>Hitung berapa yang &gt; 1.</li><li>Bagi total pelanggan yang pernah pesan.</li></ol><p>Ini yang bakal ditanya pas interview: bukan cuma nulis query, tapi mecah pertanyaan bisnis.</p>` },
            { t: 'sql', tanya: 'Hitung <b>repeat rate</b> dalam persen (dibulatkan 1 desimal) dari pesanan berstatus <b>selesai</b>. Hasil satu angka.', kunci: "WITH n AS (SELECT pelanggan_id, COUNT(*) AS k FROM pesanan WHERE status = 'selesai' GROUP BY pelanggan_id) SELECT ROUND(100.0 * SUM(k > 1) / COUNT(*), 1) FROM n", petunjuk: 'CTE jumlah pesanan per pelanggan. SUM(k > 1) ngitung yang lebih dari sekali. Kali 100.0 biar ga dibulatin ke integer.' },
            { t: 'pg', tanya: 'Kenapa pakai <code>100.0</code> bukan <code>100</code>?', opsi: ['Biar lebih cepat', 'Biar pembagian ga jadi integer (dibulatkan ke bawah)', 'SQLite ga kenal 100', 'Ga ada bedanya'], benar: 1, jelas: 'Integer dibagi integer di SQLite hasilnya integer. 100.0 maksa jadi desimal.' },
          ],
        },
      ],
    },
  ],
}
