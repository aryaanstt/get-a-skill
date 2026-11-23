// Gelombang 2 (24 Nov 2026): Interview level Mahir (teknis data analyst, cerita proyek, studi kasus MT),
// Psikotes (aritmetika, deret lanjut), IELTS (matching headings, body paragraph Task 2). Semua soal ditulis sendiri.
;(() => {
  const { H, tambahPel, tesJelas } = window.GAS_DALAM
  const { I, C, RK, P, A, IS, U, PS, SK, W, L, T } = H

  // ================= INTERVIEW =================
  tambahPel('IV', [
    L('ivdata', 'mahir', 'Interview teknis data analyst', 12, [
      I('Yang biasanya ditanya', '<p>Tahap teknis data analyst biasanya campuran:</p><ul><li><b>SQL/Excel live</b>: nulis query atau rumus sambil dijelasin.</li><li><b>Studi kasus metrik</b>: "Penjualan turun 20% minggu ini, kamu ngapain?"</li><li><b>Statistik dasar</b>: mean vs median, A/B test, korelasi vs sebab-akibat.</li><li><b>Komunikasi</b>: "Jelasin temuanmu ke manajer yang ga ngerti data."</li></ul><p>Yang dinilai bukan cuma jawabannya, tapi <b>cara mikirnya keliatan</b>. Ngomong sambil mikir.</p>'),
      I('Kerangka "metrik turun"', '<ol><li><b>Klarifikasi</b>: turun dibanding apa? Periode mana? Definisi metriknya?</li><li><b>Cek data</b>: tracking error? Ada hari libur? Data telat masuk?</li><li><b>Pecah metriknya</b>: omzet = pengunjung × conversion rate × nilai rata-rata order (AOV). Yang turun yang mana?</li><li><b>Segmentasi</b>: per kota, channel, produk, perangkat. Turunnya merata atau di satu tempat?</li><li><b>Hipotesis + cara ngecek</b>, terus <b>rekomendasi</b>.</li></ol>'),
      C('Jawab: "Omzet minggu ini turun 20%, kenapa?"', 'Kandidat menjawab sambil mikir keras.', [
        ['"Boleh saya pastiin dulu: turun 20% dibanding minggu lalu atau minggu yang sama tahun lalu?"', 'Klarifikasi. Minggu lalu bisa aja ada promo besar.'],
        ['"Saya cek dulu apakah tracking normal dan ga ada hari libur."', 'Cek data sebelum nyari sebab bisnis.'],
        ['"Omzet = pengunjung × CR × AOV. Misal pengunjung tetap 10.000, AOV tetap Rp200 ribu, tapi CR turun dari 5% ke 4%, berarti masalahnya di konversi."', 'Pecah metrik. Sekarang fokusnya jelas.'],
        ['"Saya pecah CR per perangkat. Kalau cuma Android yang turun, bisa jadi ada bug checkout di versi aplikasi baru."', 'Segmentasi → hipotesis spesifik yang bisa dicek.'],
        ['"Rekomendasi: cek log error checkout Android, bandingin sama tanggal rilis aplikasi."', 'Tutup dengan langkah konkret.'],
      ]),
      U('Urutin kerangka jawab kasus "metrik turun".', ['Klarifikasi definisi dan pembanding', 'Cek kualitas data dan kejadian khusus', 'Pecah metrik jadi komponen', 'Segmentasi per kota/channel/perangkat', 'Hipotesis dan rekomendasi'], 'Jangan langsung nebak sebab. Pastiin dulu masalahnya nyata dan di mana.'),
      A('Pengunjung 10.000 → 10.000, conversion rate 5% → 4%, AOV Rp200.000 tetap. Omzet turun berapa persen?', 20, 'Omzet lama 10.000 × 5% × 200.000 = Rp100 juta. Baru 10.000 × 4% × 200.000 = Rp80 juta. Turun 20%, semuanya dari CR.', { satuan: '%', umum: ['Jawab 1%: itu selisih persen poin CR, bukan dampaknya ke omzet.'] }),
      A('Pengunjung naik 10% (10.000 → 11.000), CR tetap 4%, AOV turun dari Rp200.000 ke Rp180.000. Omzet berubah berapa persen? (pakai minus kalau turun)', -1, 'Lama 10.000 × 4% × 200.000 = 80 juta. Baru 11.000 × 4% × 180.000 = 79,2 juta. (79,2 − 80) ÷ 80 = −1%.', { satuan: '%', toleransi: 0.01 }),
      SK('Interviewer: "Jelasin hasil A/B test ini ke manajer marketing yang ga ngerti statistik." (B naik 15%, p = 0,03)', [['"Tombol hijau bikin pembeli naik sekitar 15%, dan kemungkinan ini kebetulan kecil. Saya sarankan dipakai, sambil dipantau 2 minggu."', 2, 'Bahasa bisnis, ada angka, ada rekomendasi.'], ['"p-value-nya 0,03 jadi tolak H0 di alpha 0,05."', 0, 'Bener secara teknis, tapi manajer ga dapet apa-apa.'], ['"Hasilnya signifikan."', 1, 'Terlalu singkat, ga ada dampak dan saran.']]),
      P('Pas live SQL, kamu lupa sintaks window function. Respons terbaik?', [['Jelasin logikanya ("aku mau ranking per kategori"), tulis versi yang kamu yakin, dan bilang jujur bagian yang ragu', 'Interviewer nilai cara mikir dan kejujuran.'], ['Diam sampai inget', 'Diam lama bikin interviewer ga bisa nilai apa-apa.'], ['Ngarang sintaks dengan pede', 'Kalau salah, kredibilitas turun.'], ['Minta ganti soal', 'Kesannya nyerah.']], 'Ngomong sambil mikir.'),
      RK('Kartu contekan interview teknis', [['Metrik turun', 'klarifikasi · cek data · pecah · segmentasi · rekomendasi'], ['Omzet', 'pengunjung × CR × AOV'], ['Jelasin ke non-teknis', 'dampak, angka sederhana, saran'], ['Live coding', 'ngomong sambil mikir'], ['Ragu', 'jujur + logika']]),
    ]),

    L('ivproyek', 'mahir', 'Ceritain proyek portofolio dalam 2 menit', 10, [
      I('Struktur cerita proyek', '<ol><li><b>Pertanyaan</b>: masalah apa yang mau dijawab dan kenapa penting.</li><li><b>Data</b>: sumbernya, ukurannya, tantangannya (bolong, kotor).</li><li><b>Cara</b>: langkah utama dan alatnya. Satu keputusan penting dan alasannya.</li><li><b>Temuan</b>: 1 sampai 2 angka paling penting.</li><li><b>Dampak/pelajaran</b>: dipakai siapa, atau apa yang bakal kamu lakuin beda.</li></ol><p>Siapin juga jawaban buat pertanyaan lanjutan: "Kenapa pakai metode itu?", "Apa keterbatasannya?", "Kalau datanya 10 kali lebih besar?"</p>'),
      C('Contoh: proyek tugas akhir', 'Proyek analisis NO₂ selama Lebaran, diceritain buat posisi data analyst.', [
        ['Pertanyaan: "Seberapa besar mudik Lebaran nurunin polusi NO₂ di kota besar Jawa?"', 'Satu kalimat, jelas, menarik.'],
        ['Data: "Data satelit harian 5 tahun, sekitar 1.800 hari. Banyak hari bolong karena awan."', 'Sebut tantangan nyata, nunjukin kamu ngerjain sendiri.'],
        ['Cara: "Saya bandingin periode Lebaran dengan dua minggu sebelumnya tiap tahun, pakai median biar tahan pencilan."', 'Satu keputusan + alasannya.'],
        ['Temuan: "NO₂ turun sekitar 20% di Jakarta selama Lebaran, polanya konsisten tiap tahun."', 'Satu angka yang gampang diinget.'],
        ['Pelajaran: "Kalau ngulang, saya tambah data cuaca biar efek hujan bisa dipisahin."', 'Nunjukin kamu sadar keterbatasan.'],
      ]),
      U('Urutin cerita proyek ini.', ['Pertanyaan yang mau dijawab', 'Data dan tantangannya', 'Cara analisis dan satu keputusan penting', 'Temuan utama dengan angka', 'Dampak atau pelajaran'], 'Pertanyaan dulu, alat belakangan.'),
      P('Interviewer nanya: "Kenapa kamu pakai median, bukan mean?" Jawaban terbaik?', [['"Datanya punya hari-hari ekstrem (kebakaran, asap). Median ga ketarik nilai ekstrem itu, jadi lebih mewakili hari biasa."', 'Alasan spesifik dari datanya sendiri.'], ['"Disuruh dosen."', 'Nunjukin kamu ga ngerti keputusannya.'], ['"Median lebih bagus dari mean."', 'Ga selalu, tergantung data.'], ['"Biar beda aja."', 'Ga ada alasan.']], 'Tiap keputusan di proyekmu harus bisa kamu jelasin.'),
      P('Pembuka cerita proyek yang paling kuat?', [['"Saya pengen tau seberapa besar mudik nurunin polusi udara di kota besar."', 'Langsung ke pertanyaan yang bikin penasaran.'], ['"Saya pakai Python, pandas, matplotlib, dan seaborn."', 'Alat dulu bikin bosen.'], ['"Ini proyek tugas akhir saya yang dinilai A."', 'Nilai bukan cerita.'], ['"Proyeknya agak ribet sih."', 'Melemahkan diri sendiri.']], 'Mulai dari pertanyaan, bukan alat.'),
      W('Tulis cerita salah satu proyekmu (portofolio, tugas akhir, atau tugas kuliah) pakai 5 bagian tadi. Targetnya kalau dibaca keras ±2 menit.', 90, ['Dibuka pakai pertanyaan, bukan alat', 'Ada tantangan data yang nyata', 'Ada satu keputusan + alasannya', 'Ada angka temuan', 'Ada pelajaran atau keterbatasan'], 'Kamu interviewer data analyst. Nilai cerita proyek ini (struktur, kejelasan, bukti) dan tulis 3 pertanyaan lanjutan yang paling mungkin ditanya, plus saran perbaikan:', { contohJawab: '<p><i>"Saya pengen tau seberapa besar mudik Lebaran nurunin polusi NO₂ di kota besar Jawa. Datanya dari satelit, 5 tahun harian, tapi banyak hari bolong karena awan, jadi saya cuma pakai hari dengan kualitas data bagus. Saya bandingin periode Lebaran sama dua minggu sebelumnya tiap tahun, pakai median biar ga ketarik hari-hari ekstrem. Hasilnya, NO₂ di Jakarta turun sekitar 20% dan polanya konsisten. Kalau ngulang, saya bakal tambah data cuaca biar efek hujan bisa dipisahin."</i></p>' }),
      RK('Kartu contekan cerita proyek', [['1', 'pertanyaan'], ['2', 'data + tantangan'], ['3', 'cara + satu keputusan'], ['4', 'temuan + angka'], ['5', 'dampak/pelajaran'], ['Siapin', '"kenapa metode itu?", "keterbatasannya?"']]),
    ]),

    L('ivkasus', 'mahir', 'Studi kasus dan estimasi (MT dan konsultan)', 11, [
      I('Soal estimasi', '<p>Tes MT dan konsultan sering nanya: <i>"Berapa cup kopi kekinian terjual per hari di Bandung?"</i> Ga ada yang tau jawaban pastinya. Yang dinilai: <b>logikanya rapi, asumsinya masuk akal, hitungannya bener</b>.</p><ol><li>Tentuin pendekatan: dari sisi pembeli (populasi) atau penjual (jumlah toko).</li><li>Pecah jadi faktor yang bisa ditebak.</li><li>Sebut asumsi pakai angka bulat.</li><li>Hitung, terus <b>cek kewajaran</b> pakai pendekatan lain.</li></ol>'),
      C('Cup kopi per hari di Bandung', 'Dikerjain dari sisi pembeli, angka dibulatin biar gampang.', [
        ['Penduduk ± 2,5 juta', 'Asumsi awal, bilang terus terang ini perkiraan.'],
        ['Yang rutin beli kopi kekinian: usia 15–40 tahun ± 50%, dari situ ± 40% suka beli → 2,5 juta × 0,5 × 0,4 = 500 ribu orang', 'Pecah populasi.'],
        ['Rata-rata 2 cup per minggu → 500 ribu × 2 ÷ 7 ≈ 143 ribu cup per hari', 'Frekuensi.'],
        ['Cek sisi penjual: ± 1.000 kedai × ± 150 cup/hari = 150 ribu', 'Dua pendekatan dapet angka mirip. Jawaban ± 140–150 ribu cup/hari masuk akal.'],
      ], { penutup: 'Angka akhirnya ga harus bener. Yang penting tiap langkah bisa dipertanggungjawabkan dan kamu ngecek kewajarannya.' }),
      A('Kota 1 juta penduduk. 60% punya HP, 30% dari pemilik HP pakai ojek online, rata-rata 3 kali per minggu. Perkiraan jumlah perjalanan ojek online <b>per minggu</b>?', 540000, '1.000.000 × 0,6 × 0,3 = 180.000 pengguna × 3 = 540.000 perjalanan per minggu.'),
      A('Ada 200 kedai, rata-rata buka 12 jam, tiap jam jual 15 cup. Berapa cup per hari?', 36000, '200 × 12 × 15 = 36.000 cup.'),
      P('Interviewer bilang asumsimu "40% suka beli kopi" kegedean. Respons terbaik?', [['"Masuk akal. Kalau 25%, hasilnya turun jadi sekitar 90 ribu cup. Logikanya tetap sama."', 'Terima masukan, langsung hitung ulang, tunjukin pengaruhnya.'], ['Ngotot mempertahankan 40%', 'Kaku.'], ['"Saya ga tau, cuma nebak."', 'Ngelemahin semua kerjaan sebelumnya.'], ['Mulai dari nol dengan pendekatan lain', 'Buang waktu, cukup ganti satu angka.']], 'Estimasi itu soal struktur. Angka gampang diganti.'),
      U('Urutin langkah ngerjain soal estimasi.', ['Klarifikasi pertanyaan dan satuannya', 'Pilih pendekatan (pembeli atau penjual)', 'Pecah jadi faktor dan sebut asumsi', 'Hitung pakai angka bulat', 'Cek kewajaran pakai pendekatan lain'], 'Cek kewajaran yang sering dilupain.'),
      RK('Kartu contekan estimasi', [['Pendekatan', 'pembeli (populasi) atau penjual (toko)'], ['Faktor', 'populasi × segmen × frekuensi'], ['Angka', 'bulatin, sebut asumsi'], ['Cek', 'pendekatan kedua'], ['Dikritik', 'ganti angka, logika tetap']]),
    ]),
  ])
  tesJelas('IV', {
    'Kepanjangan STAR di jawaban interview?': 'Situation, Task, Action, Result. Porsi paling banyak di Action.',
    '"Ceritain tentang diri kamu." Pembuka paling pas?': 'Rumus Sekarang–Dulu–Nanti, mulai dari profil profesional singkat.',
    '"Apa kelemahan kamu?" Jawaban paling aman?': 'Nyata, bukan inti posisi, plus usaha perbaikan. "Perfeksionis" kebaca ngeles.',
    'Di akhir interview ditanya "Ada pertanyaan?". Sebaiknya…': 'Pertanyaan soal tim, ukuran sukses, atau tahap berikutnya nunjukin minat.',
  })
  ;(window.GAS_KURSUS.IV.tes || []).push(
    T('mahir', 'Omzet turun 20%. Langkah pertama paling tepat?', ['Klarifikasi pembanding dan cek kualitas data', 'Langsung salahin tim marketing', 'Usul diskon besar', 'Bikin dashboard baru'], 'Pastiin dulu masalahnya nyata dan dibanding apa.'),
    T('mahir', 'Omzet bisa dipecah jadi...', ['Pengunjung × conversion rate × nilai rata-rata order', 'Harga × diskon', 'Laba − biaya', 'Jumlah produk × jumlah kota'], 'Pecahan ini nunjukin komponen mana yang berubah.'),
  )

  // ================= PSIKOTES =================
  tambahPel('PS', [
    L('aritmetika', 'menengah', 'Perbandingan, rata-rata gabungan, dan umur', 10, [
      I('Perbandingan senilai dan berbalik nilai', '<ul><li><b>Senilai</b>: satu naik, yang lain ikut naik. 3 kg beras Rp36.000 → 5 kg = 36.000 ÷ 3 × 5 = Rp60.000.</li><li><b>Berbalik nilai</b>: satu naik, yang lain turun. 6 pekerja selesai 10 hari → 4 pekerja = 6 × 10 ÷ 4 = 15 hari. (Total "hari-orang" tetap: 60.)</li></ul><p>Tanya: kalau yang satu naik, yang lain naik atau turun?</p>'),
      I('Rata-rata gabungan dan umur', '<p><b>Rata-rata gabungan</b> = total ÷ banyak data. Ubah tiap rata-rata jadi total dulu: kelas A 20 siswa rata-rata 70 → total 1.400.</p><p><b>Soal umur</b>: tulis umur sekarang pakai satu huruf, terus terjemahin kalimatnya. Selisih umur dua orang selalu tetap.</p>'),
      C('Rata-rata setelah ada yang masuk', 'Rata-rata nilai 9 peserta = 72. Satu peserta lagi masuk, rata-rata jadi 73. Berapa nilai peserta baru?', [
        ['Total awal = 9 × 72 = 648', 'Ubah rata-rata jadi total.'],
        ['Total akhir = 10 × 73 = 730', 'Sekarang 10 orang.'],
        ['Nilai baru = 730 − 648 = 82', 'Selisih total = nilai yang ditambahin.'],
      ]),
      A('8 pekerja nyelesain proyek dalam 15 hari. Kalau pekerjanya 12, berapa hari?', 10, 'Berbalik nilai: 8 × 15 = 120 hari-orang. 120 ÷ 12 = 10 hari.', { umum: ['Jawab 22,5 (15 × 12 ÷ 8): diperlakukan senilai, padahal makin banyak pekerja makin cepat.'] }),
      A('Bensin 12 liter buat 150 km. Buat 250 km butuh berapa liter?', 20, 'Senilai: 150 ÷ 12 = 12,5 km per liter. 250 ÷ 12,5 = 20 liter.'),
      A('Kelas A: 20 siswa rata-rata 70. Kelas B: 30 siswa rata-rata 80. Rata-rata gabungan?', 76, '(20 × 70 + 30 × 80) ÷ 50 = (1.400 + 2.400) ÷ 50 = 76.', { umum: ['(70 + 80) ÷ 2 = 75: lupa jumlah siswanya beda.'] }),
      A('Umur ayah sekarang 3 kali umur anak. 10 tahun lagi, umur ayah 2 kali umur anak. Umur anak sekarang?', 10, 'Anak = x, ayah = 3x. 3x + 10 = 2(x + 10) → 3x + 10 = 2x + 20 → x = 10.'),
      RK('Kartu contekan aritmetika', [['Senilai', 'a1/b1 = a2/b2'], ['Berbalik nilai', 'a1 × b1 = a2 × b2'], ['Rata-rata gabungan', 'total ÷ banyak'], ['Nilai yang ditambah', 'total akhir − total awal'], ['Umur', 'pakai huruf, selisih tetap']]),
    ]),

    L('deretlanjut', 'mahir', 'Deret huruf dan deret bertingkat', 10, [
      I('Deret huruf', '<p>Ubah huruf jadi angka: A=1, B=2, … Z=26. Abis itu sama kayak deret angka.</p><p>Contoh: <b>B, E, H, K, ?</b> → 2, 5, 8, 11 → +3 → 14 = <b>N</b>.</p><p class="tip">Hafalin patokan: E=5, J=10, O=15, T=20, Y=25.</p>'),
      I('Deret bertingkat dan gabungan', '<ul><li><b>Bertingkat</b>: selisihnya juga punya pola. 1, 2, 6, 15, 31 → selisih 1, 4, 9, 16 (kuadrat) → berikutnya +25 = 56.</li><li><b>Fibonacci</b>: tiap angka = jumlah dua sebelumnya. 2, 3, 5, 8, 13, 21.</li><li><b>Dua deret selang-seling</b>: posisi ganjil dan genap punya pola masing-masing.</li></ul>'),
      C('Deret dua tingkat', 'Soal: <b>2, 3, 6, 11, 18, ?</b>', [
        ['Cek rasio: 3 ÷ 2, 6 ÷ 3, 11 ÷ 6 ga tetap', 'Bukan deret kali.'],
        ['Selisih: +1, +3, +5, +7', 'Tingkat pertama: selisihnya bilangan ganjil berurutan.'],
        ['Selisih dari selisih: +2, +2, +2', 'Tingkat kedua tetap. Polanya ketemu.'],
        ['Selisih berikutnya +9 → 18 + 9 = 27', 'Cek balik ke semua angka: 2+1=3, 3+3=6, 6+5=11, 11+7=18, 18+9=27 ✓.'],
      ], { penutup: 'Di tes beneran, kalau dua menit belum ketemu pola rapi, tandai dan lanjut ke soal lain.' }),
      IS('B, E, H, K, ?', ['N', 'n'], '2, 5, 8, 11 (+3) → 14 = N.'),
      IS('Z, X, U, Q, ?', ['L', 'l'], '26, 24, 21, 17 → selisih −2, −3, −4, berikutnya −5 → 12 = L.'),
      A('2, 3, 5, 8, 13, 21, ?', 34, 'Fibonacci: 13 + 21 = 34.'),
      A('1, 2, 6, 15, 31, ?', 56, 'Selisih 1, 4, 9, 16 (kuadrat 1², 2², 3², 4²). Berikutnya 5² = 25. 31 + 25 = 56.'),
      A('5, 10, 7, 14, 11, 22, ?', 19, 'Gantian ×2 dan −3: 5 ×2 = 10, −3 = 7, ×2 = 14, −3 = 11, ×2 = 22, −3 = 19.'),
      RK('Kartu contekan deret lanjut', [['Huruf', 'A=1 … Z=26, patokan E J O T Y'], ['Bertingkat', 'selisih dari selisih'], ['Kuadrat', '1, 4, 9, 16, 25'], ['Fibonacci', 'jumlah dua sebelumnya'], ['Selang-seling', 'pisahin posisi ganjil-genap'], ['Mentok 2 menit', 'tandai, lanjut']]),
    ]),
  ])
  tesJelas('PS', {
    'Deret: 3, 6, 12, 24, …': 'Rasio ×2. 24 × 2 = 48.',
    '15% dari 240 = …': '10% = 24, 5% = 12, total 36.',
    'Semua karyawan pakai ID card. Budi pakai ID card. Kesimpulan?': 'Yang pakai ID card bisa aja bukan karyawan (tamu, vendor). Belum tentu.',
    'DOKTER : RUMAH SAKIT = … : …': 'Pelaku dan tempat kerjanya: guru di sekolah.',
    'A beresin kerjaan dalam 6 hari, B dalam 3 hari. Kalau bareng, berapa hari?': '1/6 + 1/3 = 1/2 kerjaan per hari, jadi 2 hari.',
    'Diskon 20% lalu diskon lagi 10%. Total diskonnya?': 'Bayar 0,8 × 0,9 = 0,72 dari harga, jadi diskon 28%, bukan 30%.',
  })

  // ================= IELTS =================
  const PARA = {
    A: 'A. For centuries, farmers in Java have watched the sky to decide when to plant rice. The arrival of the wet season, signalled by heavier afternoon showers, told them the soil would soon hold enough water.',
    B: 'B. Today, many of these signals are less reliable. Rainy seasons in several regions now start weeks later than they did in the 1990s, and long dry spells can appear in the middle of the season.',
    C: 'C. To cope, some farming groups have started receiving short text messages from the national weather agency. The messages translate forecasts into simple advice, such as delaying planting by a week.',
    D: 'D. Early results are encouraging. In one district, farmers who followed the advice lost fewer seedlings during a sudden dry period than neighbours who planted at the traditional time.',
  }
  const BACA = keys => `<div class="bacaan">${keys.map(k => `<p>${PARA[k]}</p>`).join('')}</div>`
  tambahPel('EN', [
    L('ieheadings', 'mahir', 'IELTS Reading: matching headings', 10, [
      I('Cara kerja matching headings', '<p>Kamu dikasih daftar judul (i, ii, iii, …) dan harus nyocokin satu judul ke tiap paragraf. Judulnya <b>lebih banyak</b> dari paragrafnya, jadi ada pengecoh.</p><ol><li>Baca <b>judul-judulnya</b> dulu, garis bawahi kata kuncinya.</li><li>Baca tiap paragraf, fokus ke <b>kalimat pertama dan terakhir</b>. Ide utama sering di situ.</li><li>Tanya: "Paragraf ini <b>intinya</b> ngomongin apa?" Bukan "ada kata yang sama".</li><li>Pengecoh biasanya pakai kata yang muncul di paragraf tapi cuma detail kecil.</li></ol>'),
      C('Nyocokin satu paragraf', BACA(['B']) + 'Pilihan judul: (i) A growing problem of plant disease, (ii) Changing weather patterns, (iii) The history of rice farming.', [
        ['Kalimat pertama: "many of these signals are less reliable"', 'Intinya: tanda-tanda alam ga bisa diandalkan lagi.'],
        ['Kalimat berikutnya: musim hujan mulai lebih telat, ada kemarau panjang di tengah musim', 'Detail pendukung: cuacanya berubah.'],
        ['(i) plant disease: ga disebut sama sekali', 'Coret.'],
        ['(iii) history: paragraf ini soal sekarang, bukan sejarah', 'Coret. Kata "1990s" bisa ngejebak.'],
        ['Jawaban: (ii) Changing weather patterns', 'Cocok sama ide utama, bukan cuma satu kata.'],
      ]),
      PS(BACA(['A', 'B', 'C', 'D']) + 'Pasangin paragraf dengan judul yang paling pas.', [['Paragraph A', 'Traditional ways of reading the seasons'], ['Paragraph B', 'Old signals becoming unreliable'], ['Paragraph C', 'A new source of advice'], ['Paragraph D', 'Signs that the new approach works']], 'A: tradisi lama ngamatin langit. B: tanda itu ga bisa diandalkan lagi. C: SMS dari badan cuaca. D: hasil awal yang bagus.'),
      P(BACA(['D']) + 'Judul mana yang paling cocok buat paragraf D?', [['Promising early outcomes', '"Early results are encouraging" = hasil awal menjanjikan.'], ['How text messages are written', 'Paragraf D ga bahas cara nulis pesan.'], ['Why farmers ignore forecasts', 'Kebalik: yang ngikutin saran justru untung.'], ['The cost of losing seedlings', 'Kehilangan bibit cuma detail, bukan inti.']], 'Kalimat pertama paragraf D udah nyebut intinya.'),
      P(BACA(['C']) + 'Kata "translate" di paragraf C artinya...', [['Mengubah prakiraan jadi saran yang gampang dipahami', 'Konteks: "translate forecasts into simple advice".'], ['Menerjemahkan ke bahasa asing', 'Bukan soal bahasa asing di sini.'], ['Mengirim ulang pesan', 'Bukan.'], ['Menghapus prakiraan', 'Bukan.']], 'Tebak arti kata dari konteks kalimatnya.'),
      RK('Kartu contekan matching headings', [['Baca judul dulu', 'garis bawahi kata kunci'], ['Kalimat pertama/terakhir', 'ide utama sering di situ'], ['Pengecoh', 'kata yang sama tapi cuma detail'], ['Judul lebih banyak', 'ada yang ga kepakai'], ['Kata sulit', 'tebak dari konteks']]),
    ]),

    L('iebody', 'mahir', 'IELTS Writing Task 2: body paragraph yang kuat', 11, [
      I('Satu paragraf, satu ide yang berkembang', '<p>Body paragraph band 7 punya:</p><ul><li><b>Topic sentence</b> yang jelas jawab sebagian soal.</li><li><b>Penjelasan</b>: kenapa itu bener (bukan ngulang kalimat pertama).</li><li><b>Contoh spesifik</b>: kejadian, data umum, atau situasi konkret.</li><li><b>Kalimat penutup</b> yang nyambungin balik ke soal.</li></ul><p>Kesalahan band 5–6: banyak ide disebut tapi ga ada yang dikembangin, contoh terlalu umum ("for example, many people…"), atau penghubung dipaksa di tiap kalimat.</p>'),
      C('Ngembangin body paragraph', 'Soal: <i>"Some people think cities should spend more on parks than on new roads. To what extent do you agree?"</i> Posisi: setuju.', [
        ['Topic: "Green spaces bring health benefits that new roads cannot provide."', 'Satu ide utama, jelas.'],
        ['Explain: "Parks encourage people to walk and exercise, and trees lower street temperatures during hot seasons."', 'Kenapa bener. Dua mekanisme, tapi masih satu ide (kesehatan).'],
        ['Example: "In Jakarta, for instance, car-free days in central streets regularly attract thousands of joggers and cyclists."', 'Contoh konkret yang masuk akal.'],
        ['Link: "Therefore, investing in parks addresses public health more directly than adding more lanes for traffic."', 'Balik ke soal (parks vs roads).'],
      ]),
      P('Topic sentence mana yang paling kuat?', [['"Expanding public transport reduces congestion more effectively than building wider roads."', 'Jelas, bisa dibuktiin, nyambung ke soal.'], ['"Transport is a very important topic in modern society."', 'Terlalu umum, ga ada posisi.'], ['"There are many advantages and disadvantages."', 'Ga ngomong apa-apa.'], ['"I will now talk about transport."', 'Pengumuman, bukan ide.']], 'Topic sentence = klaim yang bakal dibuktiin paragrafnya.'),
      U('Urutin kalimat jadi body paragraph yang ngalir.', ['Online learning makes education accessible to people in remote areas.', 'Students no longer need to travel long distances or relocate to attend lectures.', 'For example, a student in a small town in Papua can now join a university course in Bandung via video.', 'As a result, geographical barriers to education are significantly reduced.'], 'Topic, explain, example, link.'),
      IS('Benerin satu kata yang salah: "This policy will <b>effect</b> thousands of workers." Tulis kata yang bener.', ['affect'], 'Affect = kata kerja (memengaruhi). Effect = kata benda (pengaruh).', { umum: ['Ketuker affect/effect, salah satu kesalahan paling sering di Writing.'] }),
      P('Penggunaan penghubung mana yang paling pas?', [['"Public parks are cheap to maintain. <b>However</b>, they require careful planning to remain safe at night."', 'However = kontras, dan dua kalimatnya memang kontras.'], ['"Parks are popular. <b>Moreover</b>, they are not popular at night."', 'Moreover buat nambah ide searah, bukan kontras.'], ['"<b>Firstly</b>, in conclusion, parks are good."', 'Dua penghubung bertabrakan.'], ['"Parks reduce heat. <b>Nevertheless</b>, they also reduce heat."', 'Nevertheless butuh kontras.']], 'Penghubung harus sesuai logika hubungan antar kalimat.'),
      W('Soal: <i>"Many companies now let employees work from home. Do the advantages outweigh the disadvantages?"</i> Tulis <b>satu body paragraph</b> (topic, explain, example, link).', 80, ['Topic sentence jelas', 'Penjelasan ngembangin, bukan ngulang', 'Ada contoh spesifik', 'Kalimat terakhir nyambung ke soal', 'Grammar dicek ulang (tenses, artikel)'], 'Kamu examiner IELTS. Nilai body paragraph Task 2 ini untuk Task Response dan Coherence & Cohesion (perkiraan band), tandai kalimat yang lemah, kasih 3 saran:', { contohJawab: '<p><i>The main advantage of remote work is the time employees save on commuting. In large cities such as Jakarta, a daily round trip can easily take three hours, which leaves workers exhausted before they even start their tasks. When this time is returned to employees, they can use it to rest, exercise or focus on deep work. Consequently, many companies report that remote staff are just as productive, if not more so, than those in the office.</i></p>' }),
      RK('Kartu contekan body paragraph', [['Topic', 'satu klaim yang jelas'], ['Explain', 'kenapa, bukan ngulang'], ['Example', 'spesifik, konkret'], ['Link', 'balik ke soal'], ['affect vs effect', 'kata kerja vs kata benda'], ['Penghubung', 'sesuai logika, jangan dipaksa']]),
    ]),
  ])
})()
