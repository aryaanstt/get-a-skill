// Excel versi dalam. Urutan ngikutin kurikulum kantor ala ExcelJet dan Microsoft Support:
// rumus dasar → alamat relatif/absolut → IF → COUNTIF/SUMIF → SUMIFS → teks → lookup → INDEX MATCH → rumus bertingkat → pivot → bersih data.
// Semua rumus dihitung mesin rumus beneran di browser, dicek juga pakai data acakan biar bukan kebetulan.
;(() => {
  const { H, susun } = window.GAS_DALAM
  const { I, RK, P, X, XB, U, B, L, T } = H
  const C = (judul, soal, data, langkah, o = {}) => H.C(judul, soal, langkah, { jenis: 'excel', data, ...o })

  const JUAL = [['Tanggal', 'Kota', 'Produk', 'Qty', 'Harga'], ['1 Nov', 'Bandung', 'Kopi', 12, 85000], ['1 Nov', 'Jakarta', 'Teh', 5, 18000], ['2 Nov', 'Bandung', 'Teh', 8, 18000], ['2 Nov', 'Surabaya', 'Kopi', 3, 85000], ['3 Nov', 'Jakarta', 'Kopi', 6, 85000], ['3 Nov', 'Bandung', 'Kopi', 4, 85000]]
  const SALES = [['Tanggal', 'Kota', 'Produk', 'Sales', 'Qty', 'Harga'], ['1 Nov', 'Bandung', 'Kopi', 'Rina', 12, 85000], ['1 Nov', 'Jakarta', 'Teh', 'Dodi', 5, 18000], ['2 Nov', 'Bandung', 'Teh', 'Rina', 8, 18000], ['2 Nov', 'Surabaya', 'Kopi', 'Sari', 3, 85000], ['3 Nov', 'Jakarta', 'Kopi', 'Dodi', 6, 85000], ['3 Nov', 'Bandung', 'Kopi', 'Sari', 4, 85000], ['4 Nov', 'Jakarta', 'Teh', 'Rina', 9, 18000]]
  const PRODUK = [['Kode', 'Produk', 'Kategori', 'Harga'], ['P01', 'Kopi Gayo', 'Minuman', 85000], ['P02', 'Teh Melati', 'Minuman', 18000], ['P03', 'Keripik Pedas', 'Makanan', 15000], ['P04', 'Madu Hutan', 'Makanan', 120000], ['P05', 'Botol Minum', 'Rumah', 70000]]
  const NILAI = [['Nama', 'Skor'], ['Ayu', 91], ['Budi', 74], ['Citra', 62], ['Dimas', 85], ['Eka', 70]]
  const PPN = [['Produk', 'Harga', '', 'Tarif PPN'], ['Kopi', 85000, '', 0.11], ['Teh', 18000], ['Keripik', 15000], ['Madu', 120000]]
  const PORSI = [['Kota', 'Omzet (juta)'], ['Bandung', 120], ['Jakarta', 80], ['Surabaya', 50], ['Medan', 50], ['Total', 300]]
  const ORDER = [['Kode', 'Qty', '', '', 'Kode', 'Harga'], ['P02', 3, '', '', 'P01', 85000], ['P01', 1, '', '', 'P02', 18000], ['P03', 5, '', '', 'P03', 15000], ['P02', 2]]
  const MENTAH = [['Nama mentah', 'Kode'], ['  budi   santoso ', 'JKT-0012'], ['citra lestari', 'BDG-0031'], ['DIMAS  pratama', 'SBY-0107']]
  const PROD3 = [['Produk', 'Kategori', 'Harga'], ['Kopi', 'Minuman', 85000], ['Teh', 'Minuman', 18000], ['Keripik', 'Makanan', 15000]]
  const KOTOR = [['Harga teks', 'Kota'], ['Rp85.000', ' jakarta'], ['Rp18.000', 'BANDUNG '], ['', 'Bandung'], ['Rp120.000', 'surabaya']]

  const pelajaran = [
    // ================= DASAR =================
    L('sel', 'dasar', 'Sel, rumus, dan fungsi pertama', 9, [
      I('Spreadsheet itu tabel yang bisa ngitung', '<p>Kolom pakai huruf (A, B, C), baris pakai angka (1, 2, 3). Pertemuannya disebut <b>sel</b>: <code>D2</code> = kolom D baris 2. Kumpulan sel berdampingan disebut <b>rentang</b>: <code>D2:D7</code> = D2 <i>sampai</i> D7.</p><p>Rumus selalu diawali <code>=</code>. Tanpa =, Excel nganggep itu teks biasa.</p><table class="tabel-mini"><tr><th>operator</th><th>arti</th><th>contoh</th></tr><tr><td><code>+ - * /</code></td><td>tambah, kurang, kali, bagi</td><td><code>=D2*E2</code></td></tr><tr><td><code>^</code></td><td>pangkat</td><td><code>=2^3</code> = 8</td></tr><tr><td><code>&amp;</code></td><td>sambung teks</td><td><code>=B2&amp;" - "&amp;C2</code></td></tr></table><p class="tip">Di latihan, kamu bisa <b>klik sel di tabel</b> buat masukin alamatnya, atau seret buat milih rentang.</p>'),
      I('Anatomi fungsi', '<p>Fungsi = rumus siap pakai. Bentuknya selalu <code>=NAMA(argumen1, argumen2, …)</code>.</p><table class="tabel-mini"><tr><th>fungsi</th><th>gunanya</th></tr><tr><td><code>SUM(D2:D7)</code></td><td>jumlahin</td></tr><tr><td><code>AVERAGE(E2:E7)</code></td><td>rata-rata</td></tr><tr><td><code>MIN</code> / <code>MAX</code></td><td>terkecil / terbesar</td></tr><tr><td><code>COUNT(D2:D7)</code></td><td>hitung sel yang isinya angka</td></tr><tr><td><code>COUNTA(B2:B7)</code></td><td>hitung sel yang ada isinya (teks juga)</td></tr></table><p>Excel versi Indonesia kadang pakai titik koma (<code>;</code>) sebagai pemisah argumen. Di sini dua-duanya diterima.</p>'),
      C('Total qty dan rata-rata harga', 'Bos minta dua angka dari tabel penjualan: <b>total qty</b> semua transaksi dan <b>rata-rata harga</b>.', JUAL, [
        ['=D2', 'Rumus paling sederhana: ambil isi satu sel. D2 = 12. Kotak hijau di tabel nunjukin sel yang dirujuk.'],
        ['=D2+D3+D4+D5+D6+D7', 'Jumlahin manual satu-satu. Bisa, tapi kalau datanya 500 baris capek dan gampang ada yang kelewat.'],
        ['=SUM(D2:D7)', 'Pakai SUM dengan rentang D2:D7. Hasil sama, rumusnya pendek, dan kalau ada baris yang diubah angkanya ikut berubah.'],
        ['=AVERAGE(E2:E7)', 'Rata-rata harga pakai AVERAGE. Excel jumlahin E2 sampai E7 terus bagi 6.'],
      ], { penutup: 'Kebiasaan bagus: selalu rujuk sel, jangan ngetik angka langsung ke rumus. Kalau datanya berubah, rumusnya ikut bener.' }),
      XB('Lengkapin rumus buat nyari <b>harga tertinggi</b>.', JUAL, 'G2', 'Harga maks', '=MAX(___)', '=MAX(E2:E7)', 'Ganti ___ pakai rentang kolom harga, dari baris 2 sampai 7.'),
      X('Hitung <b>total Qty</b> semua transaksi.', JUAL, 'G2', 'Total Qty', '=SUM(D2:D7)', 'Pakai SUM, rentangnya D2 sampai D7.', { umum: ['Rentang kepotong (D2:D6). Pastiin sampai baris data terakhir.', 'Lupa tanda = di depan.'] }),
      X('Hitung <b>rata-rata harga</b> dari semua transaksi.', JUAL, 'G2', 'Rata-rata', '=AVERAGE(E2:E7)', 'AVERAGE buat rata-rata. Kolom harga itu E.', { umum: ['Pakai SUM(E2:E7)/7: jumlah datanya 6, bukan 7. AVERAGE ngitung sendiri, lebih aman.'] }),
      X('Hitung <b>omzet transaksi pertama</b> (qty × harga di baris 2).', JUAL, 'G2', 'Omzet', '=D2*E2', 'Kali pakai tanda *.', { umum: ['Pakai huruf x: <code>=D2xE2</code> ga dikenal. Tanda kali di Excel itu *.'] }),
      X('Ada <b>berapa transaksi</b>? Hitung sel angka di kolom Qty.', JUAL, 'G2', 'Jumlah transaksi', '=COUNT(D2:D7)', 'COUNT ngitung sel yang isinya angka.', { umum: ['Pakai SUM: itu total qty, bukan banyaknya transaksi.'] }),
      P('Sel di kolom C baris 5, alamatnya?', [['C5', 'Huruf kolom dulu, baru angka baris.'], ['5C', 'Kebalik. Excel selalu kolom dulu.'], ['C-5', 'Ga pakai strip.'], ['R5C3', 'Itu gaya R1C1, jarang dipakai dan bukan default.']], 'Ingat: kolom huruf, baris angka.'),
      RK('Kartu contekan dasar', [['=', 'awal semua rumus'], ['D2:D7', 'rentang D2 sampai D7'], ['=SUM(D2:D7)', 'jumlah'], ['=AVERAGE(…)', 'rata-rata'], ['=MIN / =MAX', 'terkecil / terbesar'], ['=COUNT / =COUNTA', 'hitung sel angka / sel berisi'], ['* / ^ &', 'kali, bagi, pangkat, sambung teks']]),
    ]),

    L('refabs', 'dasar', 'Alamat relatif dan absolut ($)', 9, [
      I('Rumus disalin, alamat ikut geser', '<p>Kekuatan Excel: tulis rumus sekali di baris 2, terus <b>tarik ke bawah</b> (fill handle, kotak kecil di pojok sel). Excel otomatis nyesuain alamatnya.</p><p><code>=B2*C2</code> di baris 2, pas disalin ke baris 3 jadi <code>=B3*C3</code>. Ini namanya alamat <b>relatif</b>: geser ngikutin posisi.</p><p>Masalahnya muncul kalau ada satu sel yang <b>harus tetap</b>, misalnya tarif pajak di D2. Pas disalin, D2 ikut geser jadi D3 yang kosong.</p>'),
      I('Kunci pakai tanda $', '<table class="tabel-mini"><tr><th>tulisan</th><th>disalin ke bawah</th><th>disalin ke kanan</th></tr><tr><td><code>D2</code></td><td>D3, D4 (geser)</td><td>E2, F2 (geser)</td></tr><tr><td><code>$D$2</code></td><td>tetap D2</td><td>tetap D2</td></tr><tr><td><code>D$2</code></td><td>tetap baris 2</td><td>kolom geser</td></tr><tr><td><code>$D2</code></td><td>baris geser</td><td>tetap kolom D</td></tr></table><p>$ di depan huruf ngunci kolom, $ di depan angka ngunci baris. Di Excel, tekan <b>F4</b> pas kursor di alamat buat ganti-ganti jenisnya.</p>'),
      C('Harga setelah PPN 11%', 'Tarif PPN ditaruh di satu sel (D2) biar gampang diganti. Kolom C diisi harga setelah PPN buat semua produk.', PPN, [
        ['=B2*(1+D2)', 'Rumus buat baris 2: harga × (1 + tarif). 85.000 × 1,11 = 94.350. Bener.'],
        ['=B3*(1+D3)', 'Ini yang terjadi kalau rumus tadi ditarik ke baris 3. <b>Semua</b> alamat geser 1 baris. D3 kosong, jadi PPN-nya hilang. Hasilnya cuma 18.000, salah.'],
        ['=B2*(1+$D$2)', 'Kunci tarifnya pakai $: <code>$D$2</code>. B2 dibiarin relatif karena memang harus ganti tiap baris.'],
        ['=B3*(1+$D$2)', 'Setelah disalin ke baris 3: B jadi B3, tapi $D$2 tetap. 18.000 × 1,11 = 19.980. Bener.'],
      ], { penutup: 'Tanya ke diri sendiri: pas rumus ini ditarik ke bawah, alamat mana yang harus ikut pindah dan mana yang harus diam? Yang diam dikasih $.' }),
      XB('Lengkapin rumus di C2. Nanti otomatis disalin sampai C5, jadi tarif di D2 harus dikunci.', PPN, 'C2', 'Harga + PPN', '=B2*(1+___)', '=B2*(1+$D$2)', 'Tulis alamat tarif PPN yang dikunci pakai $ di depan kolom dan baris.', { bawah: 4 }),
      X('Isi kolom C dengan <b>porsi omzet</b> tiap kota dari total (B6). Rumus di C2 bakal disalin sampai C5.', PORSI, 'C2', 'Porsi', '=B2/$B$6', 'Omzet kota ÷ total. Total-nya harus dikunci.', { bawah: 4, umum: ['=B2/B6 tanpa $: di baris 3 jadi B3/B7, B7 kosong, hasilnya #DIV/0!.'] }),
      X('Bikin label harga di C2 sampai C5: harga dikali tarif lalu ditambah harga awal, pakai tarif di D2.', PPN, 'C2', 'Harga + PPN', '=B2+B2*$D$2', 'B2 + B2 × tarif. Tarif dikunci.', { bawah: 4 }),
      P('Rumus <code>=A$1*B2</code> disalin satu baris ke bawah jadi?', [['=A$1*B3', 'A$1 baris 1-nya dikunci, B2 relatif jadi B3.'], ['=A$2*B3', 'Baris 1 dikunci $, jadi ga berubah.'], ['=A$1*B2', 'B2 ga dikunci, jadi ikut geser.'], ['=B$1*C2', 'Itu kalau disalin ke kanan.']], '$ nempel di bagian yang dikunci. A$1: kolom boleh geser, baris tetap 1.'),
      RK('Kartu contekan alamat', [['D2', 'relatif, ikut geser'], ['$D$2', 'absolut, tetap'], ['D$2', 'baris dikunci'], ['$D2', 'kolom dikunci'], ['F4', 'ganti-ganti jenis $ di Excel'], ['Pola umum', 'nilai ÷ $total$, harga × $tarif$']]),
    ]),

    L('if', 'dasar', 'IF: bikin keputusan otomatis', 9, [
      I('IF = kalau begini, maka begitu', '<pre>=IF(syarat, hasil_kalau_benar, hasil_kalau_salah)</pre><p>Contoh: <code>=IF(D2>=10,"Grosir","Eceran")</code>. Dibaca: kalau D2 minimal 10, tulis Grosir, selain itu Eceran.</p><ul><li>Syarat pakai pembanding: <code>= &lt;&gt; &gt; &lt; &gt;= &lt;=</code>. <code>&lt;&gt;</code> artinya "tidak sama".</li><li>Teks di dalam rumus wajib pakai <b>kutip dua</b>: <code>"Grosir"</code>.</li><li>Hasilnya boleh angka atau rumus lain: <code>=IF(D2>=10,E2*0.9,E2)</code> = diskon 10% buat grosir.</li></ul>'),
      I('Dua syarat: AND dan OR', '<ul><li><code>AND(syarat1, syarat2)</code>: TRUE kalau <b>semua</b> benar.</li><li><code>OR(syarat1, syarat2)</code>: TRUE kalau <b>minimal satu</b> benar.</li></ul><pre>=IF(AND(B2="Bandung",D2>5),"Prioritas","-")</pre><p>AND/OR ditaruh di posisi syarat IF.</p>'),
      C('Label Grosir dan Eceran', 'Tim gudang mau tiap transaksi diberi label: <b>Grosir</b> kalau qty minimal 10, selain itu <b>Eceran</b>.', JUAL, [
        ['=D2>=10', 'Tulis syaratnya dulu buat dicek. Hasilnya TRUE atau FALSE. D2 = 12, jadi TRUE.'],
        ['=IF(D2>=10,"Grosir","Eceran")', 'Bungkus pakai IF. TRUE → "Grosir", FALSE → "Eceran". Teksnya pakai kutip dua.'],
        ['=IF(D3>=10,"Grosir","Eceran")', 'Versi baris 3 setelah ditarik ke bawah. D3 = 5, syaratnya FALSE, keluar Eceran.'],
        ['=IF(AND(B2="Bandung",D2>=10),"Grosir Bandung","-")', 'Dua syarat sekaligus: bungkus pakai AND di posisi syarat.'],
      ]),
      XB('Lengkapin: baris 3 ditulis <b>"Mahal"</b> kalau harga lebih dari 50000, selain itu <b>"Murah"</b>.', JUAL, 'G3', 'Label', '=IF(E3>50000,___,___)', '=IF(E3>50000,"Mahal","Murah")', 'Dua ___ itu hasil kalau benar dan kalau salah. Teks pakai kutip dua.'),
      X('Isi label <b>"Grosir"</b> (qty minimal 10) atau <b>"Eceran"</b> buat semua transaksi. Rumus di G2 bakal disalin sampai G7.', JUAL, 'G2', 'Tipe', '=IF(D2>=10,"Grosir","Eceran")', 'Syaratnya D2>=10.', { bawah: 6, umum: ['Pakai > 10: transaksi qty pas 10 jadi Eceran, padahal soalnya "minimal 10".', 'Lupa kutip: <code>=IF(D2>=10,Grosir,Eceran)</code> bikin Excel nyari nama Grosir, hasilnya #NAME?.'] }),
      X('Baris 2: tulis <b>"Prioritas"</b> kalau kotanya Bandung <b>dan</b> qty lebih dari 5, selain itu <b>"-"</b>.', JUAL, 'G2', 'Status', '=IF(AND(B2="Bandung",D2>5),"Prioritas","-")', 'Bungkus dua syarat pakai AND(B2="Bandung",D2>5).'),
      X('Baris 6: tulis <b>"Cek"</b> kalau produknya Kopi <b>atau</b> qty di bawah 5, selain itu <b>"OK"</b>.', JUAL, 'G6', 'Status', '=IF(OR(C6="Kopi",D6<5),"Cek","OK")', 'Salah satu cukup = OR.', { umum: ['Pakai AND: baris 6 itu Kopi dengan qty 6. AND butuh dua-duanya benar, jadi keluar OK, padahal cukup Kopi aja udah harus Cek.'] }),
      P('<code>=IF(D2>=10,"Grosir","Eceran")</code> kalau D2 isinya 10?', [['Grosir', '10 >= 10 itu benar.'], ['Eceran', 'Bakal Eceran kalau syaratnya > 10.'], ['10', 'IF ngeluarin salah satu hasil, bukan isi D2.'], ['Error', 'Rumusnya sah.']], 'Bedain >= (minimal) dan > (lebih dari). Sering jadi jebakan.'),
      RK('Kartu contekan IF', [['=IF(syarat, benar, salah)', 'pilih hasil'], ['"teks"', 'teks pakai kutip dua'], ['<>', 'tidak sama dengan'], ['AND(a, b)', 'semua benar'], ['OR(a, b)', 'salah satu benar'], ['>= vs >', 'minimal vs lebih dari']]),
    ]),

    // ================= MENENGAH =================
    L('countif', 'menengah', 'COUNTIF, SUMIF, AVERAGEIF', 9, [
      I('Ngitung pakai syarat', '<table class="tabel-mini"><tr><th>fungsi</th><th>urutan argumen</th></tr><tr><td><code>COUNTIF</code></td><td>(rentang yang dicek, syarat)</td></tr><tr><td><code>SUMIF</code></td><td>(rentang yang dicek, syarat, rentang yang dijumlah)</td></tr><tr><td><code>AVERAGEIF</code></td><td>(rentang yang dicek, syarat, rentang yang dirata-rata)</td></tr></table><p>Mirip pivot mini: "berapa transaksi Bandung", "total qty Jakarta".</p>'),
      I('Cara nulis syarat', '<ul><li>Teks: <code>"Bandung"</code></li><li>Angka pakai pembanding, <b>ditulis sebagai teks</b>: <code>"&gt;5"</code>, <code>"&lt;=100"</code>, <code>"&lt;&gt;Jakarta"</code> (bukan Jakarta)</li><li>Pola: <code>"K*"</code> = diawali K, <code>"*kopi*"</code> = mengandung kopi</li><li>Syarat dari sel lain: <code>"&gt;"&amp;H1</code></li></ul><p>Rentang syarat dan rentang yang dijumlah harus <b>sama panjang</b> (D2:D7 dengan B2:B7).</p>'),
      C('Rekap Bandung', 'Manajer area Bandung nanya: ada berapa transaksi di Bandung, total qty-nya, dan rata-rata qty per transaksi?', JUAL, [
        ['=COUNTIF(B2:B7,"Bandung")', 'COUNTIF ngecek tiap sel di B2:B7, ngitung yang isinya Bandung. Hasil 3.'],
        ['=SUMIF(B2:B7,"Bandung",D2:D7)', 'SUMIF: cek kota di B, kalau Bandung, ambil qty di D baris yang sama, terus jumlahin. 12 + 8 + 4 = 24.'],
        ['=AVERAGEIF(B2:B7,"Bandung",D2:D7)', 'Rata-ratanya: 24 ÷ 3 = 8.'],
        ['=COUNTIF(D2:D7,">5")', 'Syarat angka ditulis pakai kutip: ">5". Ada 3 transaksi dengan qty di atas 5 (12, 8, 6).'],
      ]),
      XB('Lengkapin: total qty dari <b>Jakarta</b>.', JUAL, 'G2', 'Qty Jakarta', '=SUMIF(B2:B7,"Jakarta",___)', '=SUMIF(B2:B7,"Jakarta",D2:D7)', 'Argumen ketiga = rentang yang dijumlah, yaitu kolom Qty.'),
      X('Ada berapa transaksi dari <b>Bandung</b>?', JUAL, 'G2', 'Jumlah', '=COUNTIF(B2:B7,"Bandung")', 'Rentang kota B2:B7, syaratnya "Bandung".'),
      X('Ada berapa transaksi yang qty-nya <b>lebih dari 5</b>?', JUAL, 'G2', 'Jumlah', '=COUNTIF(D2:D7,">5")', 'Syaratnya ditulis ">5" pakai kutip.', { umum: ['Nulis <code>&gt;5</code> tanpa kutip: error. Syarat pembanding di COUNTIF harus dalam kutip.'] }),
      X('Ada berapa transaksi yang <b>bukan</b> dari Jakarta?', JUAL, 'G2', 'Bukan Jakarta', '=COUNTIF(B2:B7,"<>Jakarta")', '"<>Jakarta" artinya tidak sama dengan Jakarta.'),
      X('Berapa <b>rata-rata harga</b> transaksi produk <b>Kopi</b>?', JUAL, 'G2', 'Rata Kopi', '=AVERAGEIF(C2:C7,"Kopi",E2:E7)', 'AVERAGEIF(rentang produk, "Kopi", rentang harga).'),
      P('Di <code>=SUMIF(B2:B7,"Bandung",D2:D7)</code>, argumen D2:D7 itu...', [['Rentang yang dijumlah', 'Argumen ketiga SUMIF = angka yang mau ditotal.'], ['Rentang yang dicek syaratnya', 'Itu argumen pertama (B2:B7).'], ['Syaratnya', 'Syaratnya "Bandung".'], ['Tempat hasilnya ditaruh', 'Hasil muncul di sel tempat rumus ditulis.']], 'SUMIF: cek dulu, syarat, baru yang dijumlah.'),
      RK('Kartu contekan …IF', [['COUNTIF(rentang, syarat)', 'hitung'], ['SUMIF(rentang, syarat, jumlah)', 'jumlah'], ['AVERAGEIF(rentang, syarat, rata)', 'rata-rata'], ['">5"', 'syarat angka pakai kutip'], ['"<>Jakarta"', 'bukan Jakarta'], ['"K*"', 'diawali K']]),
    ]),

    L('ifs', 'menengah', 'SUMIFS dan COUNTIFS: banyak syarat', 9, [
      I('Satu syarat atau lebih', '<pre>=SUMIFS(rentang_jumlah, rentang1, syarat1, rentang2, syarat2, …)\n=COUNTIFS(rentang1, syarat1, rentang2, syarat2, …)</pre><p>Semua syarat harus terpenuhi (kayak AND). Tiap syarat ditulis berpasangan: rentang dulu, baru syaratnya.</p><p class="tip">Jebakan klasik: di <b>SUMIF</b> rentang jumlahnya di <b>belakang</b>, di <b>SUMIFS</b> rentang jumlahnya di <b>depan</b>. Banyak orang sekarang pakai SUMIFS terus, walau syaratnya cuma satu, biar konsisten.</p>'),
      C('Qty Kopi di Bandung', 'Tim stok butuh total qty <b>Kopi</b> yang terjual di <b>Bandung</b>.', SALES, [
        ['=SUMIFS(E2:E8,B2:B8,"Bandung")', 'Mulai dari satu syarat: kota Bandung. Rentang yang dijumlah (Qty, kolom E) ditaruh paling depan. Hasil 24.'],
        ['=SUMIFS(E2:E8,B2:B8,"Bandung",C2:C8,"Kopi")', 'Tambah pasangan syarat kedua: produk Kopi. Baris yang lolos dua-duanya cuma baris 2 dan 7: 12 + 4 = 16.'],
        ['=COUNTIFS(C2:C8,"Teh",E2:E8,">6")', 'COUNTIFS pola yang sama tanpa rentang jumlah. Transaksi Teh dengan qty di atas 6: ada 2.'],
      ]),
      XB('Lengkapin: berapa transaksi <b>Rina</b> yang produknya <b>Kopi</b>?', SALES, 'H2', 'Rina Kopi', '=COUNTIFS(D2:D8,"Rina",C2:C8,___)', '=COUNTIFS(D2:D8,"Rina",C2:C8,"Kopi")', 'Syarat kedua pasangannya C2:C8, isinya "Kopi".'),
      X('Total <b>Qty Kopi</b> di <b>Bandung</b>.', SALES, 'H2', 'Qty kopi Bandung', '=SUMIFS(E2:E8,B2:B8,"Bandung",C2:C8,"Kopi")', 'SUMIFS(E2:E8, B2:B8, "Bandung", C2:C8, "Kopi")', { umum: ['Rentang jumlah ditaruh di belakang kayak SUMIF. Di SUMIFS posisinya paling depan.'] }),
      X('Berapa transaksi yang dipegang <b>Rina</b>?', SALES, 'H2', 'Transaksi Rina', '=COUNTIF(D2:D8,"Rina")', 'COUNTIF(rentang, "Rina").'),
      X('Berapa transaksi <b>Teh</b> dengan Qty <b>di atas 6</b>?', SALES, 'H2', 'Teh, qty > 6', '=COUNTIFS(C2:C8,"Teh",E2:E8,">6")', 'Syarat angka ditulis sebagai teks: ">6".'),
      X('Total qty <b>Jakarta</b> yang dijual <b>Dodi</b>.', SALES, 'H2', 'Dodi Jakarta', '=SUMIFS(E2:E8,B2:B8,"Jakarta",D2:D8,"Dodi")', 'Dua syarat: kota dan sales.'),
      P('Rumus mana yang bener buat total qty (E) kota Bandung (B) produk Teh (C)?', [['=SUMIFS(E2:E8,B2:B8,"Bandung",C2:C8,"Teh")', 'Rentang jumlah di depan, terus pasangan syarat.'], ['=SUMIFS(B2:B8,"Bandung",C2:C8,"Teh",E2:E8)', 'Ini urutan gaya SUMIF. Di SUMIFS salah.'], ['=SUMIF(B2:B8,"Bandung",C2:C8,"Teh")', 'SUMIF cuma terima satu syarat.'], ['=COUNTIFS(E2:E8,B2:B8,"Bandung")', 'COUNTIFS ngitung, bukan njumlah, dan argumennya salah.']], 'SUMIFS: yang dijumlah dulu.'),
      RK('Kartu contekan …IFS', [['SUMIFS(jumlah, r1, s1, r2, s2)', 'jumlah dengan banyak syarat'], ['COUNTIFS(r1, s1, r2, s2)', 'hitung dengan banyak syarat'], ['AVERAGEIFS(rata, r1, s1, …)', 'rata-rata dengan banyak syarat'], ['Semua syarat', 'harus terpenuhi (AND)'], ['Beda SUMIF', 'rentang jumlah di depan']]),
    ]),

    L('teks', 'menengah', 'Rumus teks: rapihin data berantakan', 9, [
      I('Data dari sistem sering berantakan', '<table class="tabel-mini"><tr><th>fungsi</th><th>gunanya</th><th>contoh</th></tr><tr><td><code>TRIM</code></td><td>buang spasi berlebih</td><td>"&nbsp;&nbsp;budi&nbsp;&nbsp;&nbsp;santoso " → "budi santoso"</td></tr><tr><td><code>PROPER</code></td><td>huruf awal kapital</td><td>"budi santoso" → "Budi Santoso"</td></tr><tr><td><code>UPPER</code> / <code>LOWER</code></td><td>semua kapital / kecil</td><td></td></tr><tr><td><code>LEFT(teks, n)</code></td><td>n huruf dari kiri</td><td>LEFT("JKT-0012",3) → "JKT"</td></tr><tr><td><code>RIGHT(teks, n)</code></td><td>n huruf dari kanan</td><td>RIGHT("JKT-0012",4) → "0012"</td></tr><tr><td><code>MID(teks, mulai, n)</code></td><td>dari tengah</td><td>MID("JKT-0012",5,2) → "00"</td></tr><tr><td><code>LEN</code></td><td>jumlah karakter</td><td></td></tr></table>'),
      I('Nyambung teks', '<p>Tanda <code>&amp;</code> nyambung teks: <code>=A2&amp;" "&amp;B2</code>. Spasi atau tanda baca ditulis di dalam kutip.</p><p>Fungsi bisa ditumpuk: <code>=PROPER(TRIM(A2))</code>. Dikerjain dari dalam: TRIM dulu, hasilnya di-PROPER.</p>'),
      C('Rapihin nama dan ambil kode kota', 'Data pelanggan dari formulir online: nama berantakan dan kode pelanggan nyampur kota plus nomor.', MENTAH, [
        ['=TRIM(A2)', 'Buang spasi di depan, belakang, dan spasi dobel di tengah. Jadi "budi santoso".'],
        ['=PROPER(TRIM(A2))', 'Bungkus pakai PROPER biar huruf awal tiap kata kapital. Excel ngerjain yang paling dalam dulu.'],
        ['=LEFT(B2,3)', 'Ambil 3 huruf pertama kode: JKT.'],
        ['=PROPER(TRIM(A2))&" ("&LEFT(B2,3)&")"', 'Gabungin jadi label: "Budi Santoso (JKT)". Kurung dan spasi ditulis di dalam kutip.'],
      ]),
      XB('Lengkapin: ambil <b>3 huruf kode kota</b> dari B3.', MENTAH, 'C3', 'Kode kota', '=LEFT(___,3)', '=LEFT(B3,3)', 'Argumen pertama LEFT = sel teksnya.'),
      X('Rapihin nama di A2 jadi huruf awal kapital tanpa spasi lebih.', MENTAH, 'C2', 'Nama rapi', '=PROPER(TRIM(A2))', 'Gabungin dua fungsi: TRIM di dalam, PROPER di luar.', { umum: ['PROPER doang: spasi dobelnya masih ada.'] }),
      X('Ambil <b>4 digit nomor</b> di belakang kode B4.', MENTAH, 'C4', 'Nomor', '=RIGHT(B4,4)', 'RIGHT(teks, 4).'),
      X('Bikin label <b>nama rapi, spasi, strip, spasi, kode kota</b> dari baris 3. Contoh hasil: "Citra Lestari - BDG".', MENTAH, 'C3', 'Label', '=PROPER(TRIM(A3))&" - "&LEFT(B3,3)', 'Sambung pakai &. Teks " - " ditulis dalam kutip.'),
      P('Rumus buat nyambung isi A2 dan B2 pakai spasi?', [['=A2&" "&B2', 'Tanda & nyambung, spasi ditulis dalam kutip.'], ['=A2+B2', '+ itu penjumlahan angka. Teks bakal error.'], ['=SUM(A2:B2)', 'SUM cuma buat angka.'], ['=A2 B2', 'Spasi di rumus ga nyambung apa-apa.']], 'Teks disambung pakai &.'),
      RK('Kartu contekan teks', [['TRIM', 'buang spasi berlebih'], ['PROPER / UPPER / LOWER', 'atur huruf besar kecil'], ['LEFT / RIGHT / MID', 'potong teks'], ['LEN', 'jumlah karakter'], ['A2&" "&B2', 'sambung teks'], ['PROPER(TRIM(A2))', 'dikerjain dari dalam']]),
    ]),

    L('lookup', 'menengah', 'XLOOKUP dan VLOOKUP', 10, [
      I('Nyari data dari tabel lain', '<p>Kasusnya selalu sama: punya kode, butuh info lain (harga, nama) dari tabel referensi.</p><pre>=XLOOKUP(yang_dicari, kolom_cari, kolom_hasil, [kalau_ga_ketemu])</pre><p>XLOOKUP ada di Excel 365/2021 dan Google Sheets. Bisa nyari ke kiri maupun kanan, default nyari yang persis sama.</p>'),
      I('VLOOKUP, versi lama yang masih di mana-mana', '<pre>=VLOOKUP(yang_dicari, tabel, nomor_kolom, FALSE)</pre><ul><li>Kolom cari <b>harus kolom paling kiri</b> tabel.</li><li><code>nomor_kolom</code> dihitung dari kiri tabel, mulai dari 1.</li><li><b>Wajib FALSE</b> di akhir biar nyari yang persis sama. Tanpa FALSE, VLOOKUP nyari yang <i>mendekati</i> dan sering ngasih hasil salah tanpa error.</li></ul><p><code>#N/A</code> artinya yang dicari ga ketemu. Cek salah ketik atau spasi tersembunyi.</p>'),
      C('Cari harga produk P03', 'Kasir punya kode P03, butuh harganya dari tabel produk.', PRODUK, [
        ['=XLOOKUP("P03",A2:A6,D2:D6)', 'Cari "P03" di kolom Kode (A2:A6). Ketemu di urutan ke-3, ambil isi urutan ke-3 dari kolom Harga (D2:D6). Hasil 15.000.'],
        ['=VLOOKUP("P03",A2:D6,4,FALSE)', 'Versi VLOOKUP: tabelnya A2:D6, kolom Harga itu kolom ke-4 dari kiri tabel. FALSE biar persis.'],
        ['=XLOOKUP("P09",A2:A6,D2:D6,"Tidak ada")', 'P09 ga ada di tabel. Argumen ke-4 XLOOKUP ngasih jawaban cadangan, jadi ga keluar #N/A.'],
      ]),
      XB('Lengkapin: cari <b>nama produk</b> berkode <b>P02</b>.', PRODUK, 'F2', 'Nama P02', '=XLOOKUP("P02",A2:A6,___)', '=XLOOKUP("P02",A2:A6,B2:B6)', 'Argumen ketiga = kolom yang hasilnya mau diambil, yaitu kolom Produk.'),
      X('Cari <b>harga</b> produk berkode <b>P03</b> pakai XLOOKUP.', PRODUK, 'F2', 'Harga P03', '=XLOOKUP("P03",A2:A6,D2:D6)', 'Cari "P03" di A2:A6, ambil dari D2:D6.'),
      X('Pakai VLOOKUP, cari <b>kategori</b> produk <b>P05</b>.', PRODUK, 'F2', 'Kategori P05', '=VLOOKUP("P05",A2:D6,3,FALSE)', 'Kategori ada di kolom ke-3 dari tabel A2:D6.', { umum: ['Nomor kolom dihitung dari huruf kolom Excel (C = 3) padahal tabelnya mulai dari kolom lain. Hitung dari kolom pertama tabel.', 'Lupa FALSE.'] }),
      X('Isi kolom <b>Harga</b> (C2 sampai C5) buat tiap pesanan, ambil dari tabel referensi E:F. Rumus di C2 bakal disalin ke bawah.', ORDER, 'C2', 'Harga', '=XLOOKUP(A2,$E$2:$E$4,$F$2:$F$4)', 'Yang dicari: kode di A2 (relatif). Tabel referensinya dikunci pakai $.', { bawah: 4, umum: ['Tabel referensi ga dikunci: pas disalin ke bawah, rentangnya geser dan baris terakhir ga ketemu (#N/A).'] }),
      P('Kenapa VLOOKUP tanpa FALSE sering bikin salah?', [['Defaultnya nyari yang mendekati, padahal datanya ga urut', 'Hasilnya bisa salah tanpa ada pesan error.'], ['Karena ga bisa nyari teks', 'Bisa.'], ['Karena lebih lambat', 'Bukan soal kecepatan.'], ['Ga ada pengaruh', 'Sangat ngaruh.']], 'Biasain FALSE, atau pakai XLOOKUP.'),
      RK('Kartu contekan lookup', [['XLOOKUP(cari, kolom_cari, kolom_hasil, cadangan)', 'cara modern'], ['VLOOKUP(cari, tabel, no_kolom, FALSE)', 'cara lama, kolom cari harus paling kiri'], ['FALSE', 'wajib, biar persis'], ['#N/A', 'ga ketemu'], ['$E$2:$E$4', 'kunci tabel referensi pas disalin']]),
    ]),

    // ================= MAHIR =================
    L('indexmatch', 'mahir', 'INDEX MATCH', 9, [
      I('Dua fungsi yang digabung', '<ul><li><code>MATCH(dicari, rentang, 0)</code> → ngasih <b>posisi</b>. MATCH("Teh", A2:A4, 0) = 2 (urutan kedua). 0 = persis sama.</li><li><code>INDEX(rentang, n)</code> → ngambil isi urutan ke-n. INDEX(C2:C4, 2) = isi kedua.</li></ul><p>Gabung: <code>=INDEX(kolom_hasil, MATCH(dicari, kolom_cari, 0))</code>. Bisa nyari ke kiri, ga rusak kalau kolom disisipin, dan jalan di semua versi Excel. Ini yang sering ditanya di tes Excel kerja.</p>'),
      C('Kategori Keripik pakai INDEX MATCH', 'Excel kantor masih versi 2016 (belum ada XLOOKUP). Cari kategori Keripik.', PROD3, [
        ['=MATCH("Keripik",A2:A4,0)', 'Langkah 1: cari posisinya. Keripik ada di urutan ke-3 dari A2:A4.'],
        ['=INDEX(B2:B4,3)', 'Langkah 2: ambil isi urutan ke-3 dari kolom kategori. Makanan.'],
        ['=INDEX(B2:B4,MATCH("Keripik",A2:A4,0))', 'Gabungin: angka 3 diganti rumus MATCH. Sekarang kalau yang dicari diganti, posisinya ikut dicari ulang.'],
      ]),
      XB('Lengkapin: cari <b>harga Teh</b> pakai INDEX MATCH.', PROD3, 'E2', 'Harga Teh', '=INDEX(C2:C4,MATCH(___,A2:A4,0))', '=INDEX(C2:C4,MATCH("Teh",A2:A4,0))', 'Yang dicari teks, pakai kutip dua.'),
      X('Cari harga <b>Teh</b> pakai XLOOKUP dari tabel produk.', PROD3, 'E2', 'Harga Teh', '=XLOOKUP("Teh",A2:A4,C2:C4)', 'XLOOKUP("Teh", A2:A4, C2:C4)'),
      X('Cari kategori <b>Keripik</b> pakai INDEX MATCH.', PROD3, 'E2', 'Kategori Keripik', '=INDEX(B2:B4,MATCH("Keripik",A2:A4,0))', 'INDEX(kolom kategori, MATCH("Keripik", kolom produk, 0))', { umum: ['Lupa 0 di MATCH: nyari mendekati, bisa ngasih posisi salah.'] }),
      X('Cari <b>nama produk</b> yang harganya <b>85000</b> (nyari ke kiri).', PROD3, 'E2', 'Produk 85rb', '=INDEX(A2:A4,MATCH(85000,C2:C4,0))', 'Kolom cari: harga (C). Kolom hasil: produk (A), ada di kiri. VLOOKUP ga bisa ini.'),
      P('Argumen 0 di MATCH artinya...', [['Cari yang persis sama', '0 = exact match.'], ['Cari nilai terdekat yang lebih kecil', 'Itu 1 (dan datanya harus urut).'], ['Mulai dari baris 0', 'Bukan soal baris.'], ['Abaikan huruf besar', 'MATCH memang ga peka huruf besar, tapi bukan karena 0.']], 'MATCH(…, 0) hampir selalu yang kamu mau.'),
      RK('Kartu contekan INDEX MATCH', [['MATCH(cari, rentang, 0)', 'posisi'], ['INDEX(rentang, n)', 'isi urutan ke-n'], ['INDEX(hasil, MATCH(cari, kolom_cari, 0))', 'lookup ke mana aja'], ['Kelebihan', 'bisa ke kiri, jalan di Excel lama']]),
    ]),

    L('gabung', 'mahir', 'IF bertingkat, IFS, dan IFERROR', 9, [
      I('Lebih dari dua kemungkinan', '<p><b>IF bertingkat</b>: IF di dalam IF.</p><pre>=IF(B2>=85,"A",IF(B2>=70,"B","C"))</pre><p>Dicek dari kiri: ≥ 85 → A. Kalau ga, masuk IF kedua: ≥ 70 → B, sisanya C. Tulis syarat dari yang <b>paling ketat</b>.</p><p><b>IFS</b> (Excel 2019 ke atas) lebih rapi:</p><pre>=IFS(B2>=85,"A",B2>=70,"B",TRUE,"C")</pre><p>Pasangan syarat-hasil. <code>TRUE</code> di akhir jadi "selain itu".</p>'),
      I('Rumus anti-error', '<p><code>=IFERROR(rumus, cadangan)</code>: kalau rumus error (#N/A, #DIV/0!), tampilin cadangannya.</p><pre>=IFERROR(XLOOKUP("P09",A2:A6,D2:D6),"Tidak ada")\n=IFERROR(B2/C2,0)</pre><p>Jangan asal bungkus semua rumus pakai IFERROR. Error kadang tanda data salah yang perlu dicek, bukan disembunyiin.</p>'),
      C('Grade nilai tes', 'HR mau nilai tes kandidat dikasih grade: <b>A</b> (≥ 85), <b>B</b> (≥ 70), <b>C</b> sisanya.', NILAI, [
        ['=IF(B2>=85,"A","bukan A")', 'Mulai dari satu IF. Ayu 91 → A. Tapi yang bukan A masih harus dipecah lagi.'],
        ['=IF(B2>=85,"A",IF(B2>=70,"B","C"))', 'Ganti "bukan A" pakai IF kedua. Sekarang tiga kemungkinan.'],
        ['=IF(B3>=85,"A",IF(B3>=70,"B","C"))', 'Baris 3 (Budi 74): gagal ≥ 85, lolos ≥ 70 → B.'],
        ['=IFS(B3>=85,"A",B3>=70,"B",TRUE,"C")', 'Versi IFS, hasilnya sama, lebih gampang dibaca.'],
      ], { penutup: 'Kalau urutan syaratnya kebalik (≥ 70 duluan), Ayu yang 91 bakal dapet B karena udah lolos syarat pertama.' }),
      XB('Lengkapin grade baris 4 (Citra).', NILAI, 'D4', 'Grade', '=IF(B4>=85,"A",IF(B4>=70,___,___))', '=IF(B4>=85,"A",IF(B4>=70,"B","C"))', 'Dua ___ = hasil B dan C, pakai kutip dua.'),
      X('Kasih grade baris 2: <b>A</b> kalau skor ≥ 85, <b>B</b> kalau ≥ 70, selain itu <b>C</b>. Rumus bakal disalin sampai D6.', NILAI, 'D2', 'Grade', '=IF(B2>=85,"A",IF(B2>=70,"B","C"))', 'IF di dalam IF.', { bawah: 5, umum: ['Urutan syarat kebalik: =IF(B2>=70,"B",IF(B2>=85,"A","C")) bikin skor 91 dapet B.'] }),
      X('Cari harga produk <b>P09</b>. Kalau ga ketemu, tampilkan <b>"Tidak ada"</b>.', PRODUK, 'F2', 'Harga', '=IFERROR(XLOOKUP("P09",A2:A6,D2:D6),"Tidak ada")', 'Bungkus XLOOKUP pakai IFERROR(…,"Tidak ada").'),
      X('Pakai IFS: baris 6 (Eka) dapet <b>"Lulus"</b> kalau skor ≥ 75, <b>"Remedial"</b> kalau ≥ 60, selain itu <b>"Gagal"</b>.', NILAI, 'D6', 'Status', '=IFS(B6>=75,"Lulus",B6>=60,"Remedial",TRUE,"Gagal")', 'Pasangan syarat dan hasil, TRUE di akhir buat sisanya.'),
      P('Kenapa syarat IF bertingkat ditulis dari yang paling ketat?', [['Karena berhenti di syarat pertama yang benar', 'Kalau syarat longgar duluan, nilai tinggi udah ketangkep di situ.'], ['Biar rumusnya pendek', 'Panjangnya sama.'], ['Aturan penulisan Excel', 'Excel ga maksa, tapi hasilnya jadi salah.'], ['Biar lebih cepat dihitung', 'Bukan soal kecepatan.']], 'Sama persis kayak CASE WHEN di SQL.'),
      RK('Kartu contekan bertingkat', [['IF(…, …, IF(…, …, …))', 'tiga kemungkinan atau lebih'], ['IFS(s1, h1, s2, h2, TRUE, sisa)', 'versi rapi'], ['Urutan', 'syarat paling ketat duluan'], ['IFERROR(rumus, cadangan)', 'ganti error'], ['Hati-hati', 'error bisa tanda data salah']]),
    ]),

    L('pivot', 'mahir', 'Pivot table dan rumus ringkasan', 9, [
      I('Pivot = ringkasan ribuan baris dalam beberapa klik', '<p>PivotTable ngelompokin data. Empat kotaknya:</p><ul><li><b>Rows</b>: kategori ke bawah (misal Kota).</li><li><b>Columns</b>: kategori ke samping (misal Produk).</li><li><b>Values</b>: angka yang dihitung (Sum of Qty, Count, Average).</li><li><b>Filters</b>: saringan buat seluruh pivot.</li></ul><p>Syarat data: satu baris satu transaksi, satu kolom satu jenis data, judul kolom jelas, ga ada baris kosong atau subtotal di tengah. Biar pivot ikut update kalau data nambah, ubah data jadi <b>Table</b> dulu (Ctrl + T).</p>'),
      I('Rumus versi pivot', '<p>Kadang hasil pivot perlu ditaruh di laporan dengan format tetap. Pakai rumus:</p><ul><li>Satu sel pivot (Bandung × Kopi) = <code>SUMIFS</code></li><li>Omzet total (qty × harga per baris, dijumlah) = <code>SUMPRODUCT(D2:D7,E2:E7)</code>: kaliin per baris, terus jumlahin semuanya.</li></ul>'),
      C('Bikin pivot qty per kota', 'Atasan minta tabel ringkas total qty per kota.', JUAL, [
        ['', 'Klik salah satu sel di data, tekan <b>Ctrl + T</b> biar jadi Table. Terus <b>Insert → PivotTable</b>, pilih New Worksheet.'],
        ['', 'Seret <b>Kota</b> ke <b>Rows</b>. Muncul daftar kota tanpa dobel.'],
        ['', 'Seret <b>Qty</b> ke <b>Values</b>. Pastiin tulisannya <i>Sum of Qty</i>, bukan <i>Count of Qty</i>. Kalau Count, klik → Value Field Settings → Sum.'],
        ['=SUMIFS(D2:D7,B2:B7,"Bandung")', 'Cek satu angka pivot pakai rumus: total qty Bandung = 24. Kalau sama dengan pivot, pivot-mu bener.'],
        ['=SUMPRODUCT(D2:D7,E2:E7)', 'Bonus: omzet total tanpa kolom bantu. Tiap qty dikali harganya, terus dijumlah.'],
      ]),
      U('Susun langkah bikin PivotTable total qty per kota.', ['Blok data atau ubah jadi Table (Ctrl + T)', 'Insert → PivotTable', 'Seret Kota ke Rows', 'Seret Qty ke Values', 'Pastiin hitungannya Sum of Qty'], 'Data dulu, bikin pivot, baru atur Rows dan Values.'),
      X('Total qty khusus <b>Bandung</b> dan produk <b>Kopi</b>.', JUAL, 'G2', 'Qty', '=SUMIFS(D2:D7,B2:B7,"Bandung",C2:C7,"Kopi")', 'SUMIFS(yang_dijumlah, rentang1, syarat1, rentang2, syarat2)'),
      X('Hitung <b>omzet total</b> semua transaksi (qty × harga per baris, dijumlah) dalam satu rumus.', JUAL, 'G2', 'Omzet total', '=SUMPRODUCT(D2:D7,E2:E7)', 'SUMPRODUCT(kolom qty, kolom harga).', { umum: ['=SUM(D2:D7)*SUM(E2:E7): total qty × total harga, angkanya jauh kegedean.'] }),
      P('Mau liat total per bulan. Kolom tanggal ditaruh di mana?', [['Rows atau Columns, terus di-group per bulan', 'Klik kanan tanggal di pivot → Group → Months.'], ['Values', 'Values buat angka yang dihitung.'], ['Filter aja', 'Filter nyaring, ga ngelompokin.'], ['Ga bisa', 'Bisa.']], 'Tanggal = dimensi, taruh di Rows/Columns.'),
      P('Pivot nunjukin "Count of Qty" padahal mau total. Kenapa?', [['Ada sel kosong atau teks di kolom Qty, jadi Excel pakai Count', 'Bersihin kolomnya, atau ganti lewat Value Field Settings → Sum.'], ['Pivot cuma bisa Count', 'Bisa Sum, Average, Max, dll.'], ['Harus pakai Columns', 'Bukan soal letak.'], ['Datanya kebanyakan', 'Pivot sanggup jutaan baris.']], 'Count muncul kalau Excel nganggep kolomnya bukan angka murni.'),
      RK('Kartu contekan pivot', [['Rows / Columns', 'kategori pengelompok'], ['Values', 'angka yang dihitung (Sum, Count, Avg)'], ['Filters', 'saringan seluruh pivot'], ['Ctrl + T', 'jadiin Table dulu'], ['Group → Months', 'tanggal per bulan'], ['SUMPRODUCT(a, b)', 'total a × b per baris']]),
    ]),

    L('bersih', 'mahir', 'Bersihin dan validasi data', 9, [
      I('Kerjaan paling sering analis', '<p>Sebelum dianalisis, data dicek dulu:</p><ul><li><b>Duplikat</b>: Data → Remove Duplicates.</li><li><b>Sel kosong</b>: hitung pakai <code>COUNTBLANK</code>.</li><li><b>Angka kesimpen sebagai teks</b>: rata kiri, ga bisa dijumlah. Ubah pakai <code>VALUE</code>.</li><li><b>Teks ga konsisten</b>: "jkt", "Jakarta", "JAKARTA". Rapihin pakai <code>TRIM</code>, <code>PROPER</code>.</li><li><b>Nilai aneh</b>: qty negatif, tanggal tahun 1900.</li></ul>'),
      I('Ngubah teks jadi angka', '<p>"Rp85.000" itu teks. Buat dijadiin angka:</p><ol><li><code>SUBSTITUTE(A2,"Rp","")</code> → "85.000"</li><li><code>SUBSTITUTE(…,".","")</code> → "85000"</li><li><code>VALUE(…)</code> → 85000 (angka beneran)</li></ol><p><b>Data Validation</b> (Data → Data Validation → List) mencegah salah input dari awal, misalnya dropdown pilihan kota.</p>'),
      C('Harga teks jadi angka', 'Data harga dari marketplace kebawa format "Rp85.000" dan ga bisa dijumlah.', KOTOR, [
        ['=SUBSTITUTE(A2,"Rp","")', 'Buang tulisan Rp. Hasil "85.000", masih teks.'],
        ['=SUBSTITUTE(SUBSTITUTE(A2,"Rp",""),".","")', 'Buang titik ribuan juga. "85000", masih teks.'],
        ['=VALUE(SUBSTITUTE(SUBSTITUTE(A2,"Rp",""),".",""))', 'Bungkus VALUE. Sekarang jadi angka 85000 yang bisa dijumlah.'],
        ['=PROPER(TRIM(B2))', 'Kolom kota juga dirapihin: " jakarta" → "Jakarta".'],
      ]),
      XB('Lengkapin: ubah harga teks di A3 jadi angka.', KOTOR, 'C3', 'Harga angka', '=VALUE(SUBSTITUTE(SUBSTITUTE(A3,"Rp",""),___,""))', '=VALUE(SUBSTITUTE(SUBSTITUTE(A3,"Rp",""),".",""))', 'Yang dibuang berikutnya titik ribuan, tulis dalam kutip dua.'),
      X('Ada berapa sel <b>kosong</b> di kolom Harga teks (A2:A5)?', KOTOR, 'C2', 'Kosong', '=COUNTBLANK(A2:A5)', 'COUNTBLANK(rentang).'),
      X('Rapihin nama kota di B3 jadi huruf awal kapital tanpa spasi lebih.', KOTOR, 'C3', 'Kota rapi', '=PROPER(TRIM(B3))', 'TRIM di dalam, PROPER di luar.'),
      B('Mana aja tanda data perlu dibersihin? (pilih semua)', [['Ada baris dobel persis', true, 'Bikin total kehitung dua kali.'], ['Angka rata kiri dan ga bisa dijumlah', true, 'Tanda angka kesimpen sebagai teks.'], ['Nama kota ditulis "jkt", "Jakarta", "JAKARTA"', true, 'Pivot bakal misahin jadi 3 kota.'], ['Semua kolom punya judul jelas', false, 'Judul kolom yang jelas justru bagus.']], 'Cek duplikat, tipe data, konsistensi, dan nilai aneh sebelum ngitung.'),
      P('Fitur buat bikin dropdown pilihan di sel?', [['Data Validation', 'Data → Data Validation → List.'], ['Conditional Formatting', 'Itu buat warna otomatis.'], ['Freeze Panes', 'Itu buat ngunci judul pas scroll.'], ['Flash Fill', 'Itu buat ngisi pola otomatis.']], 'Cegah lebih baik dari bersihin.'),
      RK('Kartu contekan bersih data', [['Remove Duplicates', 'buang baris dobel'], ['COUNTBLANK', 'hitung sel kosong'], ['SUBSTITUTE(teks, lama, baru)', 'ganti/buang karakter'], ['VALUE', 'teks angka jadi angka'], ['PROPER(TRIM())', 'rapihin teks'], ['Data Validation', 'dropdown, cegah salah input']]),
    ]),
  ]

  const tes = [
    T('dasar', 'Rumus buat ngejumlahin isi sel D2 sampai D10?', ['=SUM(D2:D10)', 'SUM(D2:D10)', '=TOTAL(D2:D10)', '=ADD(D2:D10)'], 'Rumus wajib diawali =. Fungsi jumlah itu SUM, titik dua artinya "sampai".'),
    T('dasar', 'Hasil dari =IF(5>3,"Ya","Tidak")?', ['Ya', 'Tidak', '5', 'Error'], '5 > 3 benar, jadi IF ngeluarin argumen kedua.'),
    T('dasar', '=B2*$D$2 disalin ke bawah satu baris jadi?', ['=B3*$D$2', '=B3*$D$3', '=B2*$D$2', '=C2*$D$2'], 'B2 relatif jadi B3. $D$2 dikunci, tetap.'),
    T('menengah', 'Mau ngitung ada berapa sel berisi "Bandung". Fungsi yang pas?', ['COUNTIF', 'SUMIF', 'COUNTA', 'VLOOKUP'], 'COUNTIF(rentang, "Bandung") ngitung sel yang cocok syarat.'),
    T('menengah', 'Kalau VLOOKUP ditulis tanpa FALSE di argumen terakhir, apa risikonya?', ['Nyari yang mendekati, hasilnya bisa salah', 'Selalu error', 'Jadi lebih cepat', 'Ga ada bedanya'], 'Default VLOOKUP itu approximate match yang butuh data terurut.'),
    T('menengah', 'SUMIFS beda dari SUMIF karena...', ['Bisa banyak syarat, dan rentang jumlahnya di depan', 'Bisa ngitung rata-rata', 'Cuma buat teks', 'Ga ada bedanya'], 'SUMIFS(jumlah, r1, s1, r2, s2…). SUMIF(rentang, syarat, jumlah).'),
    T('mahir', 'Total qty khusus kota Bandung DAN produk Kopi. Fungsi yang pas?', ['SUMIFS', 'SUMIF', 'COUNTIFS', 'XLOOKUP'], 'Dua syarat + dijumlah = SUMIFS.'),
    T('mahir', '=IFERROR(A1/B1,0) kalau B1 isinya 0, hasilnya?', ['0', '#DIV/0!', 'Isi A1', 'Error'], 'Bagi nol bikin #DIV/0!, IFERROR ngegantinya jadi 0.'),
    T('mahir', 'INDEX(B2:B10, MATCH("X", A2:A10, 0)) gunanya...', ['Cari nilai di kolom B yang barisnya cocok sama "X" di kolom A', 'Jumlahin kolom B', 'Hitung berapa X', 'Urutin data'], 'MATCH nyari posisi X di A, INDEX ngambil isi posisi itu dari B.'),
  ]

  susun('EX', pelajaran, tes)
})()
