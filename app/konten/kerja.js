// Materi persiapan kerja: Psikotes, Interview, CV, Bahasa Inggris, Komunikasi.
window.GAS_KURSUS = window.GAS_KURSUS || {}
;(() => {
  window.GAS_KURSUS.PS = {
    tes: [
      { level: 'dasar', tanya: 'Deret: 3, 6, 12, 24, …', opsi: ['48', '36', '30', '42'], benar: 0 },
      { level: 'dasar', tanya: '15% dari 240 = …', opsi: ['36', '24', '32', '40'], benar: 0 },
      { level: 'menengah', tanya: 'Semua karyawan pakai ID card. Budi pakai ID card. Kesimpulan?', opsi: ['Belum tentu Budi karyawan', 'Budi pasti karyawan', 'Budi bukan karyawan', 'Semua yang pakai ID card karyawan'], benar: 0 },
      { level: 'menengah', tanya: 'DOKTER : RUMAH SAKIT = … : …', opsi: ['Guru : Sekolah', 'Pasien : Obat', 'Buku : Pustakawan', 'Murid : Rapor'], benar: 0 },
      { level: 'mahir', tanya: 'A beresin kerjaan dalam 6 hari, B dalam 3 hari. Kalau bareng, berapa hari?', opsi: ['2', '4,5', '3', '1,5'], benar: 0 },
      { level: 'mahir', tanya: 'Diskon 20% lalu diskon lagi 10%. Total diskonnya?', opsi: ['28%', '30%', '32%', '25%'], benar: 0 },
    ],
    pelajaran: [
      { id: 'deret', level: 'dasar', judul: 'Deret angka', menit: 6, langkah: [
        { t: 'info', judul: 'Cari selisihnya dulu', isi: '<p>Hampir semua soal deret bisa dipecahin pakai 4 cek ini, berurutan:</p><ol><li><b>Selisih</b> antar angka (tambah/kurang tetap)</li><li><b>Rasio</b> (kali/bagi tetap)</li><li>Selisihnya <b>naik</b> (+1, +2, +3…)</li><li><b>Selang-seling</b> (dua pola gantian)</li></ol><p class="tip">Tulis selisihnya di bawah angka. Pola biasanya keliatan dalam 10 detik.</p>' },
        { t: 'angka', tanya: '2, 3, 5, 8, 12, <b>?</b>', benar: 17, jelas: 'Selisihnya +1, +2, +3, +4, terus +5. 12 + 5 = 17.' },
        { t: 'angka', tanya: '2, 5, 11, 23, 47, <b>?</b>', benar: 95, jelas: 'Tiap angka × 2 + 1. 47 × 2 + 1 = 95.' },
        { t: 'angka', tanya: '10, 8, 16, 14, 28, <b>?</b>', benar: 26, jelas: 'Gantian: −2, ×2, −2, ×2, −2. 28 − 2 = 26.' },
        { t: 'angka', tanya: '1, 4, 9, 16, 25, <b>?</b>', benar: 36, jelas: 'Bilangan kuadrat: 1², 2², 3²… 6² = 36.' },
      ] },
      { id: 'hitung', level: 'dasar', judul: 'Hitung cepat tanpa kalkulator', menit: 5, langkah: [
        { t: 'info', judul: 'Trik persen', isi: '<p>10% tinggal geser koma satu kali. Dari situ: 5% = setengahnya, 15% = 10% + 5%, 20% = dua kali 10%.</p><p>Contoh 15% dari 240: 10% = 24, 5% = 12, jadi 36.</p><p>Pecahan yang sering keluar: ½ = 0,5 · ¼ = 0,25 · ⅛ = 0,125 · ⅓ ≈ 0,333 · ⅕ = 0,2</p>' },
        { t: 'angka', tanya: '15% dari 360 = ?', benar: 54, jelas: '10% = 36, 5% = 18, total 54.' },
        { t: 'angka', tanya: '0,25 × 480 = ?', benar: 120, jelas: '0,25 = ¼. Seperempat dari 480 = 120.' },
        { t: 'pilih', tanya: '3/8 = …', opsi: ['0,375', '0,38', '0,325', '0,4'], benar: 0, jelas: '1/8 = 0,125, dikali 3 = 0,375.' },
        { t: 'angka', tanya: '48 × 25 = ?', benar: 1200, jelas: '× 25 = × 100 lalu ÷ 4. 4800 ÷ 4 = 1200.' },
      ] },
      { id: 'silogisme', level: 'menengah', judul: 'Silogisme dan logika', menit: 7, langkah: [
        { t: 'info', judul: 'Jangan ketipu kalimat yang "kayaknya bener"', isi: '<p><b>Sah:</b> Semua A adalah B. X adalah A. Jadi X adalah B.</p><p><b>Ga sah:</b> Semua A adalah B. X adalah B. Jadi X adalah A. (Belum tentu! B bisa lebih luas dari A.)</p><p>Gambar lingkaran di kepala. Kalau masih ada kemungkinan lain, jawabannya <i>"tidak dapat disimpulkan"</i>.</p>' },
        { t: 'pilih', tanya: 'Semua peserta MT ikut pelatihan. Rina peserta MT. Jadi…', opsi: ['Rina ikut pelatihan', 'Rina belum tentu ikut pelatihan', 'Semua yang ikut pelatihan peserta MT', 'Tidak dapat disimpulkan'], benar: 0, jelas: 'Rina masuk lingkaran MT, dan lingkaran MT ada di dalam lingkaran pelatihan.' },
        { t: 'pilih', tanya: 'Semua kucing berkaki empat. Sebagian hewan berkaki empat bisa berenang. Jadi…', opsi: ['Tidak dapat disimpulkan apakah kucing bisa berenang', 'Sebagian kucing bisa berenang', 'Semua kucing bisa berenang', 'Kucing tidak bisa berenang'], benar: 0, jelas: 'Yang bisa berenang bisa aja hewan berkaki empat lain, bukan kucing.' },
        { t: 'pilih', tanya: 'Kalau hujan, jalan basah. Jalan tidak basah. Jadi…', opsi: ['Tidak hujan', 'Hujan', 'Mungkin hujan', 'Jalan kering karena panas'], benar: 0, jelas: 'Kalau P maka Q. Bukan Q, berarti bukan P (modus tollens).' },
        { t: 'pilih', tanya: 'Kalau hujan, jalan basah. Jalan basah. Jadi…', opsi: ['Belum tentu hujan', 'Pasti hujan', 'Tidak hujan', 'Jalan licin'], benar: 0, jelas: 'Jalan bisa basah karena disiram. Ini jebakan paling sering.' },
      ] },
      { id: 'analogi', level: 'menengah', judul: 'Analogi dan padanan kata', menit: 6, langkah: [
        { t: 'info', judul: 'Bikin kalimat penghubung', isi: '<p>Ubah pasangan pertama jadi kalimat: <i>"Dokter bekerja di rumah sakit"</i>. Terus tes tiap opsi pakai kalimat yang sama. Yang paling pas, itu jawabannya.</p><p>Hubungan yang sering keluar: tempat kerja, alat–pelaku, sebab–akibat, bagian–keseluruhan, lawan kata.</p>' },
        { t: 'pilih', tanya: 'PENA : PENULIS = … : …', opsi: ['Kuas : Pelukis', 'Buku : Pembaca', 'Kertas : Tinta', 'Gambar : Galeri'], benar: 0, jelas: 'Alat yang dipakai pelaku.' },
        { t: 'pilih', tanya: 'HAUS : MINUM = … : …', opsi: ['Lapar : Makan', 'Air : Gelas', 'Panas : Dingin', 'Tidur : Mimpi'], benar: 0, jelas: 'Kebutuhan dan cara menuhinnya.' },
        { t: 'pasang', tanya: 'Pasangin kata dengan lawan katanya.', pasangan: [['Efisien', 'Boros'], ['Absolut', 'Relatif'], ['Optimis', 'Pesimis'], ['Konkret', 'Abstrak']] },
        { t: 'pilih', tanya: 'Sinonim dari <b>"KREDIBEL"</b>?', opsi: ['Dapat dipercaya', 'Berutang', 'Kreatif', 'Mudah berubah'], benar: 0, jelas: 'Kredibel = bisa dipercaya.' },
      ] },
      { id: 'cerita', level: 'mahir', judul: 'Soal cerita', menit: 8, langkah: [
        { t: 'info', judul: 'Tiga rumus yang paling sering keluar', isi: '<p><b>Jarak</b> = kecepatan × waktu</p><p><b>Kerja bareng:</b> 1/total = 1/A + 1/B</p><p><b>Untung%</b> = (jual − beli) / beli × 100%</p><p class="tip">Diskon bertingkat ga dijumlahin. 20% lalu 10% artinya bayar 0,8 × 0,9 = 0,72, jadi diskonnya 28%.</p>' },
        { t: 'angka', tanya: 'Mobil jalan 60 km/jam selama 2,5 jam. Jaraknya berapa km?', benar: 150, satuan: 'km', jelas: '60 × 2,5 = 150 km.' },
        { t: 'angka', tanya: 'A beresin laporan dalam 4 jam, B dalam 12 jam. Kalau bareng, berapa jam?', benar: 3, satuan: 'jam', jelas: '1/4 + 1/12 = 3/12 + 1/12 = 4/12 = 1/3. Jadi 3 jam.' },
        { t: 'angka', tanya: 'Beli barang 80.000, dijual 100.000. Untungnya berapa persen?', benar: 25, satuan: '%', jelas: '20.000 / 80.000 = 25%. Dibagi harga beli, bukan harga jual.' },
        { t: 'angka', tanya: 'Harga awal 500.000, diskon 20% lalu diskon lagi 10%. Harga akhirnya?', benar: 360000, jelas: '500.000 × 0,8 = 400.000, × 0,9 = 360.000.' },
      ] },
      { id: 'strategi', level: 'mahir', judul: 'Strategi waktu dan tes Kraepelin', menit: 6, langkah: [
        { t: 'info', judul: 'Psikotes itu soal kecepatan juga', isi: '<p>Rata-rata kamu cuma punya 30 sampai 60 detik per soal. Strategi umum:</p><ul><li>Kerjain yang gampang dulu, tandai yang susah.</li><li>Cek dulu ada pengurangan nilai buat jawaban salah atau nggak. Kalau nggak ada, jangan biarin kosong.</li><li><b>Kraepelin/Pauli</b> (njumlahin angka satu digit per kolom) yang dinilai itu kecepatan, ketelitian, dan <b>kestabilan</b>. Jangan ngebut di awal terus drop.</li></ul>' },
        { t: 'urut', tanya: 'Susun urutan kerja yang paling efektif pas waktu tes mepet.', item: ['Baca instruksi dan contoh soal', 'Kerjain soal yang langsung kebaca polanya', 'Tandai soal yang makan waktu', 'Balik ke soal yang ditandai', 'Isi sisa soal kalau ga ada pengurangan nilai'] },
        { t: 'skenario', tanya: 'Tes Kraepelin baru jalan 3 menit dan kamu sadar salah njumlah di kolom sebelumnya. Yang paling bijak?', opsi: [
          { teks: 'Lanjut aja di kolom yang sekarang, jaga ritme', skor: 2, ket: 'Tepat. Yang dinilai pola kerja keseluruhan. Balik ke kolom lama ngerusak ritme.' },
          { teks: 'Balik benerin kolom tadi dulu', skor: 0, ket: 'Waktu kolom itu udah lewat. Biasanya ga boleh balik, dan bikin grafikmu anjlok.' },
          { teks: 'Pelanin tempo biar ga salah lagi', skor: 1, ket: 'Teliti itu bagus, tapi turun drastis bikin grafik kurang stabil.' },
        ] },
        { t: 'info', judul: 'Latihan beneran ada di menu Latihan', isi: '<p>Buka <b>Latihan → Sprint Psikotes</b>: 60 detik, soal deret dan hitung cepat dibuat acak, skornya kesimpen. Main sehari sekali aja udah kerasa bedanya dalam seminggu.</p>' },
      ] },
    ],
  }

  window.GAS_KURSUS.IV = {
    tes: [
      { level: 'dasar', tanya: 'Kepanjangan STAR di jawaban interview?', opsi: ['Situation, Task, Action, Result', 'Skill, Talent, Attitude, Result', 'Start, Try, Act, Repeat', 'Story, Task, Answer, Review'], benar: 0 },
      { level: 'dasar', tanya: '"Ceritain tentang diri kamu." Pembuka paling pas?', opsi: ['Latar pendidikan dan fokus sekarang, singkat', 'Hobi dan keluarga', 'Kenapa butuh kerjaan', 'Baca ulang CV dari atas'], benar: 0 },
      { level: 'menengah', tanya: '"Apa kelemahan kamu?" Jawaban paling aman?', opsi: ['Kelemahan nyata + yang lagi kamu lakuin buat benerin', '"Saya perfeksionis"', '"Ga ada"', 'Kelemahan yang jadi syarat utama posisi itu'], benar: 0 },
      { level: 'menengah', tanya: 'Di akhir interview ditanya "Ada pertanyaan?". Sebaiknya…', opsi: ['Nanya soal tim, ekspektasi 3 bulan pertama, atau proses berikutnya', '"Ga ada, Pak/Bu"', 'Langsung nanya gaji dan cuti', 'Nanya kapan pengumuman doang'], benar: 0 },
    ],
    pelajaran: [
      { id: 'kenalan', level: 'dasar', judul: 'Perkenalan diri 60 detik', menit: 6, langkah: [
        { t: 'info', judul: 'Rumus Sekarang, Dulu, Nanti', isi: '<p><b>Sekarang:</b> siapa kamu dan fokusmu (1 kalimat).<br><b>Dulu:</b> 1 sampai 2 pengalaman paling nyambung sama posisi, pakai hasil konkret.<br><b>Nanti:</b> kenapa posisi ini langkah yang pas.</p><p>Targetnya 60 sampai 90 detik. Jangan baca ulang CV, mereka udah pegang.</p>' },
        { t: 'urut', tanya: 'Susun perkenalan ini biar ngalir.', item: ['"Saya lulusan Manajemen yang fokus di analisis pemasaran."', '"Di magang terakhir, saya bikin laporan mingguan yang dipakai tim buat milih promo."', '"Dari situ saya sadar paling semangat kalau kerja pakai data pelanggan."', '"Makanya posisi Marketing Analyst di sini pas buat langkah berikutnya."'] },
        { t: 'banyak', tanya: 'Mana aja yang <b>sebaiknya dihindari</b> pas perkenalan diri? (pilih semua yang bener)', opsi: ['Nyeritain riwayat dari SD', 'Nyebut hasil konkret pengalaman', 'Ngeluh soal kampus atau tempat lama', 'Ngaitin ke posisi yang dilamar', 'Ngomong lebih dari 3 menit'], benar: [0, 2, 4], jelas: 'Fokus ke yang relevan, positif, dan singkat.' },
        { t: 'tulis', tanya: 'Tulis draf perkenalan dirimu sendiri (Sekarang, Dulu, Nanti).', minKata: 40, rubrik: ['Ada kalimat "sekarang" (siapa kamu dan fokusmu)', 'Ada 1 sampai 2 pengalaman dengan hasil konkret', 'Ada alasan kenapa posisi ini', 'Kalau dibaca keras, di bawah 90 detik'], ai: 'Kasih feedback buat perkenalan diri interview fresh graduate ini. Nilai struktur Sekarang-Dulu-Nanti, kejelasan, dan durasinya. Jangan nulis ulang semuanya, kasih 3 saran konkret:' },
      ] },
      { id: 'star', level: 'dasar', judul: 'Metode STAR', menit: 7, langkah: [
        { t: 'info', judul: 'Cerita yang bisa dicek', isi: '<p>Buat pertanyaan "Ceritain waktu kamu…":</p><ul><li><b>S</b>ituation: konteksnya singkat</li><li><b>T</b>ask: tanggung jawab kamu</li><li><b>A</b>ction: yang <i>kamu</i> lakuin (pakai "saya", bukan "kami")</li><li><b>R</b>esult: hasilnya, kalau bisa pakai angka</li></ul><p class="tip">Porsi paling gede di Action. Result yang jujur lebih kuat dari angka yang dibesar-besarin.</p>' },
        { t: 'pasang', tanya: 'Pasangin tiap kalimat dengan bagian STAR-nya.', pasangan: [['"Pas KKN, data warga desa masih ditulis tangan."', 'Situation'], ['"Saya ditugasin ngerapiin data 300 KK dalam 2 minggu."', 'Task'], ['"Saya bikin template spreadsheet dan ngajarin 3 kader."', 'Action'], ['"Datanya beres 4 hari lebih cepat dan dipakai desa."', 'Result']] },
        { t: 'pilih', tanya: 'Mana Action yang paling kuat?', opsi: ['"Saya bikin jadwal piket dan ngecek progres tiap Jumat."', '"Kami kerja sama dengan baik."', '"Tim kami solid banget."', '"Semua berjalan lancar."'], benar: 0, jelas: 'Spesifik, ada "saya", dan bisa dibayangin.' },
        { t: 'tulis', tanya: 'Tulis satu cerita STAR dari organisasi, magang, atau tugas akhirmu.', minKata: 60, rubrik: ['Situation cuma 1 sampai 2 kalimat', 'Task nyebut tanggung jawabmu sendiri', 'Action pakai "saya" dan spesifik', 'Result ada hasil yang bisa dicek (angka, dampak, atau pelajaran)'], ai: 'Nilai jawaban interview metode STAR ini dari fresh graduate. Tunjukin bagian S, T, A, R yang masih lemah, terus kasih 3 saran konkret tanpa nambahin fakta baru:' },
      ] },
      { id: 'jebakan', level: 'menengah', judul: 'Pertanyaan jebakan', menit: 8, langkah: [
        { t: 'info', judul: 'Yang sebenernya mereka cari', isi: '<p><b>"Kelemahan kamu?"</b> → kesadaran diri. Sebut yang nyata tapi bukan syarat utama posisi, plus usaha benerinnya.</p><p><b>"Ekspektasi gaji?"</b> → riset dulu kisaran pasar, sebut rentang, bilang masih terbuka diskusi.</p><p><b>"Kenapa nganggur sekian bulan?"</b> → jujur, singkat, tunjukin yang kamu lakuin selama itu (belajar, proyek, sertifikasi).</p>' },
        { t: 'skenario', tanya: '"Kenapa kami harus milih kamu dibanding kandidat lain?"', opsi: [
          { teks: 'Hubungin 2 kekuatanmu yang paling nyambung sama kebutuhan posisi, kasih bukti singkat', skor: 2, ket: 'Ini yang dicari: relevan dan ada buktinya.' },
          { teks: '"Saya pekerja keras dan cepat belajar."', skor: 1, ket: 'Ga salah, tapi semua orang ngomong gitu. Kasih bukti.' },
          { teks: '"Saya ga tau kandidat lain, jadi susah jawabnya."', skor: 0, ket: 'Kesannya ngehindar. Mereka nanya soal kamu, bukan orang lain.' },
        ] },
        { t: 'skenario', tanya: '"Berapa gaji yang kamu harapkan?" (kamu udah riset, kisaran pasar 5 sampai 6 juta)', opsi: [
          { teks: '"Dari riset saya, kisaran posisi ini 5 sampai 6 juta. Saya terbuka diskusi sesuai benefit total."', skor: 2, ket: 'Ada dasar, ada rentang, tetap fleksibel.' },
          { teks: '"Terserah perusahaan aja."', skor: 1, ket: 'Aman, tapi kamu bisa dikasih paling bawah. Siapin angka.' },
          { teks: '"Minimal 9 juta, karena kebutuhan saya banyak."', skor: 0, ket: 'Jauh di atas pasar dan alasannya personal.' },
        ] },
        { t: 'skenario', tanya: '"Apa kelemahan terbesar kamu?"', opsi: [
          { teks: '"Dulu saya susah bilang tidak, jadi kerjaan numpuk. Sekarang saya pakai daftar prioritas dan bilang terus terang kalau kapasitas penuh."', skor: 2, ket: 'Nyata, ga fatal, ada perbaikan.' },
          { teks: '"Saya terlalu perfeksionis."', skor: 1, ket: 'Klise dan sering kebaca sebagai ngeles.' },
          { teks: '"Saya ga suka kerja sama orang lain."', skor: 0, ket: 'Ini syarat dasar hampir semua posisi.' },
        ] },
      ] },
      { id: 'tanya', level: 'menengah', judul: 'Nanya balik dan follow up', menit: 5, langkah: [
        { t: 'info', judul: 'Interview itu dua arah', isi: '<p>Pertanyaan bagus di akhir nunjukin kamu serius:</p><ul><li>"Seperti apa sukses di posisi ini dalam 3 bulan pertama?"</li><li>"Tantangan terbesar tim sekarang apa?"</li><li>"Tahap berikutnya dari proses ini apa?"</li></ul><p>Kirim email terima kasih singkat dalam 24 jam.</p>' },
        { t: 'banyak', tanya: 'Pertanyaan mana yang bagus buat ditanya balik? (pilih semua)', opsi: ['"Tantangan terbesar tim dalam 6 bulan ke depan apa?"', '"Cutinya berapa hari?"', '"Gimana tim ngukur keberhasilan posisi ini?"', '"Perusahaan ini bergerak di bidang apa?"', '"Ada pelatihan buat karyawan baru?"'], benar: [0, 2, 4], jelas: 'Hindari yang jawabannya ada di website, dan simpen soal benefit buat tahap tawaran.' },
        { t: 'urut', tanya: 'Susun email terima kasih setelah interview.', item: ['Subjek: Terima kasih, Interview Staf Admin, [Nama]', 'Sapaan ke interviewer', 'Terima kasih atas waktunya hari ini', 'Satu hal spesifik dari obrolan yang bikin kamu makin tertarik', 'Penutup dan nama lengkap'] },
      ] },
    ],
  }

  window.GAS_KURSUS.CV = {
    tes: [
      { level: 'dasar', tanya: 'Format CV yang paling aman buat sistem ATS?', opsi: ['Satu kolom, judul bagian standar', 'Dua kolom penuh ikon', 'Desain infografis', 'Tabel buat semua isi'], benar: 0 },
      { level: 'dasar', tanya: 'Bullet pengalaman yang paling kuat?', opsi: ['Kata kerja + apa yang dikerjain + hasil', '"Bertanggung jawab atas…"', 'Daftar tugas harian', 'Kalimat panjang satu paragraf'], benar: 0 },
      { level: 'menengah', tanya: 'Nyesuain CV per loker itu artinya?', opsi: ['Pakai kata kunci yang jujur sesuai deskripsi loker', 'Nambahin skill yang belum dikuasai', 'Ganti nama jabatan lama', 'Copy paste deskripsi loker'], benar: 0 },
      { level: 'menengah', tanya: 'Headline LinkedIn yang efektif buat fresh graduate?', opsi: ['Bidang + skill utama + yang dicari', '"Fresh graduate"', '"Open to work!!!"', 'Nama kampus aja'], benar: 0 },
    ],
    pelajaran: [
      { id: 'ats', level: 'dasar', judul: 'CV yang kebaca ATS', menit: 6, langkah: [
        { t: 'info', judul: 'Banyak CV gugur sebelum dibaca manusia', isi: '<p>ATS (Applicant Tracking System) baca CV sebagai teks. Kalau formatnya ribet, isinya bisa acak atau hilang.</p><ul><li>Satu kolom, font standar, ekspor PDF dari Word/Docs (bukan hasil scan)</li><li>Judul bagian umum: Pendidikan, Pengalaman, Organisasi, Skill</li><li>Info penting jangan ditaruh di header, gambar, atau tabel</li><li>Pakai kata kunci dari loker, <b>selama memang kamu bisa</b></li></ul>' },
        { t: 'banyak', tanya: 'Mana aja yang bikin ATS susah baca CV? (pilih semua)', opsi: ['Skill ditulis di dalam gambar/ikon', 'Satu kolom dengan judul bagian standar', 'Layout dua kolom pakai text box', 'CV hasil foto/scan', 'PDF yang diekspor dari Word'], benar: [0, 2, 3] },
        { t: 'skenario', tanya: 'Loker minta "Power BI". Kamu cuma pernah nonton tutorial 1 video. Di CV kamu…', opsi: [
          { teks: 'Ga dicantumin dulu. Belajar sampai bisa bikin 1 dashboard, baru ditulis', skor: 2, ket: 'Aman. Kalau ditanya pas interview, kamu bisa jelasin.' },
          { teks: 'Ditulis di bagian skill biar lolos ATS', skor: 0, ket: 'Lolos ATS, tapi bisa ketahuan pas tes atau interview. Itu lebih rugi.' },
          { teks: 'Tulis "sedang belajar Power BI" di ringkasan', skor: 1, ket: 'Jujur, tapi lemah kalau belum ada bukti. Lebih baik bikin proyek kecil dulu.' },
        ] },
      ] },
      { id: 'bullet', level: 'dasar', judul: 'Bullet point yang berdampak', menit: 7, langkah: [
        { t: 'info', judul: 'Rumus: Kata kerja + Apa + Hasil', isi: '<p>❌ "Bertanggung jawab atas media sosial himpunan."</p><p>✅ "Mengelola 3 akun media sosial himpunan dan menyusun kalender konten bulanan, followers naik dari 1.200 jadi 2.000 dalam 6 bulan."</p><p>Ga punya angka? Pakai skala (berapa orang, berapa acara), frekuensi, atau dampak yang bisa dicek.</p>' },
        { t: 'pilih', tanya: 'Bullet mana yang paling kuat?', opsi: ['"Menyusun laporan keuangan acara untuk 400 peserta dan memangkas biaya konsumsi 15%"', '"Membantu bagian keuangan"', '"Bertanggung jawab atas keuangan"', '"Teliti dan jujur dalam keuangan"'], benar: 0, jelas: 'Ada kata kerja, skala, dan hasil.' },
        { t: 'pasang', tanya: 'Ganti kata lemah dengan kata kerja yang lebih kuat.', pasangan: [['Membantu bikin acara', 'Mengoordinasikan'], ['Ikut ngurus data', 'Menganalisis'], ['Disuruh bikin laporan', 'Menyusun'], ['Jadi ketua', 'Memimpin']] },
        { t: 'tulis', tanya: 'Ubah satu pengalamanmu jadi bullet: kata kerja + apa + hasil.', minKata: 15, rubrik: ['Diawali kata kerja aktif', 'Jelas apa yang kamu kerjain', 'Ada skala, angka, atau dampak', 'Semuanya fakta yang bisa kamu jelasin di interview'], ai: 'Perbaiki bullet point CV fresh graduate ini biar lebih berdampak. Jangan nambahin angka atau fakta yang ga ada, tandai aja kalau perlu ditanyain ke pemiliknya:' },
      ] },
    ],
  }

  window.GAS_KURSUS.EN = {
    tes: [
      { level: 'dasar', tanya: '"Deadline" artinya…', opsi: ['Batas waktu', 'Garis finis lomba', 'Rapat penting', 'Hari libur'], benar: 0 },
      { level: 'dasar', tanya: 'Last year, I ___ an internship at a bank.', opsi: ['did', 'have done', 'do', 'am doing'], benar: 0 },
      { level: 'menengah', tanya: 'I ___ three data projects so far.', opsi: ['have completed', 'completed yesterday', 'complete', 'was complete'], benar: 0 },
      { level: 'menengah', tanya: 'Penutup email formal yang paling pas?', opsi: ['Best regards,', 'Bye!', 'Love,', 'Cya'], benar: 0 },
    ],
    pelajaran: [
      { id: 'kosakata', level: 'dasar', judul: 'Kosakata kantor', menit: 5, langkah: [
        { t: 'kartu', judul: 'Balik kartunya, tebak dulu artinya', kartu: [['Deadline', 'Batas waktu'], ['Follow up', 'Menindaklanjuti'], ['Meeting minutes', 'Notulen rapat'], ['Stakeholder', 'Pihak yang berkepentingan'], ['Onboarding', 'Masa orientasi karyawan baru'], ['Workload', 'Beban kerja']] },
        { t: 'pasang', tanya: 'Pasangin istilah dengan artinya.', pasangan: [['Reimburse', 'Mengganti biaya yang udah dikeluarin'], ['Probation', 'Masa percobaan'], ['Headcount', 'Jumlah karyawan'], ['Handover', 'Serah terima kerjaan']] },
        { t: 'pilih', tanya: '"Could you <b>loop me in</b> on the email?" artinya…', opsi: ['Tolong ikutin aku (CC) di email itu', 'Tolong hapus aku dari email', 'Tolong baca ulang emailnya', 'Tolong kirim besok'], benar: 0 },
      ] },
      { id: 'grammar', level: 'dasar', judul: 'Grammar buat interview', menit: 7, langkah: [
        { t: 'info', judul: 'Dua tenses yang paling kepakai', isi: '<p><b>Past simple</b>: kejadian selesai di waktu tertentu. <i>"In 2025, I <b>led</b> a team of five."</i></p><p><b>Present perfect</b>: pengalaman sampai sekarang, waktunya ga disebut. <i>"I <b>have worked</b> on three projects."</i></p><p class="tip">Ada keterangan waktu lampau (last year, in 2024, yesterday)? Pakai past simple.</p>' },
        { t: 'pilih', tanya: 'Last semester, I ___ (lead) a campus event.', opsi: ['led', 'have led', 'lead', 'was lead'], benar: 0 },
        { t: 'pilih', tanya: 'I ___ (learn) Excel since my second year.', opsi: ['have been learning', 'learned yesterday', 'learn', 'was learn'], benar: 0, jelas: '"Since" = dari dulu sampai sekarang, pakai present perfect (continuous).' },
        { t: 'isian', tanya: 'Lengkapi: "I am interested ___ this position."', benar: ['in'], jelas: 'interested in' },
        { t: 'pilih', tanya: 'Kalimat mana yang bener?', opsi: ['I graduated in 2025.', 'I have graduated in 2025.', 'I graduate in 2025 last year.', 'I was graduate in 2025.'], benar: 0 },
      ] },
      { id: 'email', level: 'menengah', judul: 'Email profesional', menit: 6, langkah: [
        { t: 'urut', tanya: 'Susun email lamaran singkat ini.', item: ['Subject: Application for Data Analyst Intern – [Full Name]', 'Dear Hiring Team,', 'I am writing to apply for the Data Analyst Intern position I found on LinkedIn.', 'I have attached my CV and portfolio for your review.', 'Thank you for your time and consideration.', 'Best regards, [Full Name]'] },
        { t: 'pilih', tanya: 'Kalimat paling sopan buat nanya kabar lamaran?', opsi: ['"I would like to kindly follow up on my application submitted on 10 November."', '"Why haven\'t you replied?"', '"Any update??"', '"Please answer me soon."'], benar: 0 },
        { t: 'pasang', tanya: 'Ganti versi santai dengan versi formal.', pasangan: [['Sorry for the late reply', 'I apologize for the delayed response'], ['Can you send it?', 'Could you please send it?'], ['I want to ask', 'I would like to inquire'], ['Thanks a lot!', 'Thank you very much.']] },
      ] },
      { id: 'ielts', level: 'menengah', judul: 'Kenalan sama IELTS', menit: 6, langkah: [
        { t: 'info', judul: 'Empat bagian, skor 0 sampai 9', isi: '<p><b>Listening</b> 30 menit, <b>Reading</b> 60 menit, <b>Writing</b> 60 menit (Task 1 min. 150 kata, Task 2 min. 250 kata), <b>Speaking</b> 11 sampai 14 menit.</p><p>Banyak beasiswa dan MT minta overall 6,5. Ada versi <b>Academic</b> (kuliah) dan <b>General Training</b> (kerja/migrasi).</p>' },
        { t: 'pasang', tanya: 'Pasangin bagian IELTS dengan durasinya.', pasangan: [['Listening', '30 menit'], ['Reading', '60 menit'], ['Writing', '60 menit '], ['Speaking', '11 sampai 14 menit']] },
        { t: 'pilih', tanya: 'Writing Task 2 minimal berapa kata?', opsi: ['250', '150', '300', '200'], benar: 0 },
        { t: 'info', judul: 'Mau coba mock test?', isi: '<p>Buka <a href="#ielts">Mock IELTS</a>: Reading dan Listening dinilai otomatis, Writing dan Speaking dianalisis dan bisa dinilai Tutor AI. Ada di menu Latihan juga.</p>' },
      ] },
    ],
  }

  window.GAS_KURSUS.KM = {
    tes: [
      { level: 'dasar', tanya: 'Presentasi ke atasan yang sibuk sebaiknya dibuka dengan…', opsi: ['Kesimpulan atau rekomendasi', 'Sejarah proyek', 'Ucapan terima kasih panjang', 'Daftar isi'], benar: 0 },
      { level: 'dasar', tanya: 'Satu slide idealnya berisi…', opsi: ['Satu pesan utama', 'Semua data yang ada', 'Teks satu paragraf', 'Sebanyak mungkin grafik'], benar: 0 },
      { level: 'menengah', tanya: 'Rekan kerja telat ngirim bagiannya dan tenggat besok. Langkah pertama?', opsi: ['Tanya langsung kendalanya dan sepakati jam kirim', 'Lapor atasan langsung', 'Kerjain bagian dia diam-diam', 'Sindir di grup'], benar: 0 },
      { level: 'menengah', tanya: 'Di FGD, cara nunjukin kepemimpinan yang baik?', opsi: ['Ngerangkum pendapat dan ngarahin ke keputusan', 'Ngomong paling banyak', 'Motong yang beda pendapat', 'Diam sampai akhir'], benar: 0 },
    ],
    pelajaran: [
      { id: 'presentasi', level: 'dasar', judul: 'Presentasi yang langsung ke inti', menit: 6, langkah: [
        { t: 'info', judul: 'Jawaban dulu, alasan kemudian', isi: '<p>Di dunia kerja, orang mau tau <b>kesimpulannya</b> dulu. Struktur yang aman:</p><ol><li><b>Inti:</b> rekomendasi/kesimpulan dalam 1 kalimat</li><li><b>Alasan:</b> 2 sampai 3 poin pendukung</li><li><b>Bukti:</b> data atau contoh tiap poin</li><li><b>Langkah berikutnya:</b> yang kamu minta dari audiens</li></ol>' },
        { t: 'urut', tanya: 'Susun pembukaan presentasi ini dengan struktur "jawaban dulu".', item: ['"Saya rekomendasikan promo dipindah ke hari Jumat."', '"Alasannya, transaksi Jumat 30% lebih tinggi dari hari lain."', '"Data 3 bulan terakhir nunjukin pola yang sama tiap minggu."', '"Saya butuh persetujuan hari ini biar bisa jalan minggu depan."'] },
        { t: 'pilih', tanya: 'Judul slide mana yang paling efektif?', opsi: ['"Penjualan Jumat 30% lebih tinggi dari rata-rata"', '"Data penjualan"', '"Grafik 1"', '"Analisis"'], benar: 0, jelas: 'Judul slide = pesan utama. Orang yang cuma baca judul pun dapet intinya.' },
      ] },
      { id: 'situasi', level: 'dasar', judul: 'Komunikasi di situasi kerja', menit: 6, langkah: [
        { t: 'skenario', tanya: 'Atasan ngasih tugas baru, padahal tugas lama juga tenggatnya besok. Kamu…', opsi: [
          { teks: 'Sampein dua tugas itu dan tanya mana yang diprioritasin', skor: 2, ket: 'Atasan jadi bisa mutusin dengan info lengkap.' },
          { teks: 'Terima aja dan lembur', skor: 1, ket: 'Kadang perlu, tapi kalau keterusan kualitasnya turun dan atasan ga tau bebanmu.' },
          { teks: 'Bilang ga bisa karena sibuk', skor: 0, ket: 'Nolak tanpa solusi bikin kesannya ga kooperatif.' },
        ] },
        { t: 'skenario', tanya: 'Kamu bikin salah input data dan laporan udah kekirim ke klien.', opsi: [
          { teks: 'Langsung kabarin atasan, jelasin dampaknya, dan bawa usulan perbaikan', skor: 2, ket: 'Cepat, jujur, dan bawa solusi. Ini yang bikin dipercaya.' },
          { teks: 'Benerin diam-diam di versi berikutnya', skor: 0, ket: 'Kalau ketahuan, kepercayaan rusak lebih parah dari salahnya.' },
          { teks: 'Tunggu ada yang nyadar dulu', skor: 0, ket: 'Makin lama, makin besar dampaknya.' },
        ] },
        { t: 'pilih', tanya: 'Pesan chat ke atasan yang paling efektif?', opsi: ['"Pak, laporan Q3 udah saya kirim ke email. Ada 1 hal yang perlu keputusan Bapak: target bulan depan mau pakai angka A atau B?"', '"Pak"', '"Pak, sibuk ga?"', '"Pak, mau nanya boleh?"'], benar: 0, jelas: 'Langsung ke inti dan jelas apa yang dibutuhin. Jangan cuma "Pak" terus nunggu dibales.' },
      ] },
    ],
  }

  // Dek kartu buat menu Latihan.
  window.GAS_DEK = {
    istilah: { nama: 'Istilah kerja', kartu: [
      ['KPI', 'Key Performance Indicator, ukuran keberhasilan kerja'], ['OKR', 'Objectives and Key Results, cara nyusun target'], ['SOP', 'Standar prosedur kerja'], ['Onboarding', 'Masa orientasi karyawan baru'],
      ['Probation', 'Masa percobaan, biasanya 3 bulan'], ['PKWT', 'Kontrak kerja waktu tertentu'], ['PKWTT', 'Karyawan tetap'], ['THR', 'Tunjangan Hari Raya'],
      ['BPJS Ketenagakerjaan', 'Jaminan hari tua, kecelakaan kerja, kematian, pensiun'], ['Take home pay', 'Gaji bersih yang diterima setelah potongan'], ['Benefit', 'Fasilitas di luar gaji pokok'], ['Stakeholder', 'Pihak yang berkepentingan'],
      ['Deadline', 'Batas waktu'], ['Handover', 'Serah terima kerjaan'], ['Reimburse', 'Penggantian biaya'], ['Headcount', 'Jumlah karyawan atau kuota posisi'],
      ['MT', 'Management Trainee, program pengembangan calon pemimpin'], ['ODP', 'Officer Development Program (istilah bank)'], ['Ikatan dinas', 'Kewajiban kerja sekian tahun setelah program'], ['Psikotes', 'Tes kemampuan kognitif dan kepribadian'],
      ['FGD', 'Diskusi kelompok yang dinilai'], ['User interview', 'Interview dengan calon atasan langsung'], ['MCU', 'Medical check-up sebelum tanda tangan kontrak'], ['Offering letter', 'Surat tawaran kerja'],
    ] },
    inggris: { nama: 'English for work', kartu: [
      ['Follow up', 'Menindaklanjuti'], ['Loop in', 'Ikut nyertain (di email/rapat)'], ['ASAP', 'As soon as possible'], ['EOD', 'End of day, akhir jam kerja'],
      ['FYI', 'For your information'], ['Out of office', 'Lagi ga di kantor/cuti'], ['Workload', 'Beban kerja'], ['Bottleneck', 'Titik yang bikin proses macet'],
      ['Touch base', 'Ngobrol singkat buat update'], ['Action item', 'Tugas hasil rapat'], ['Wrap up', 'Menyelesaikan/menutup'], ['Heads-up', 'Pemberitahuan awal'],
    ] },
  }

  // Bank pertanyaan simulasi interview.
  window.GAS_INTERVIEW = [
    { kat: 'Pembuka', q: 'Ceritakan tentang diri kamu.', tip: 'Sekarang, Dulu, Nanti. 60 sampai 90 detik.' },
    { kat: 'Pembuka', q: 'Kenapa kamu melamar posisi ini?', tip: 'Sambungin minatmu, skillmu, dan kebutuhan posisi.' },
    { kat: 'Pembuka', q: 'Apa yang kamu tahu tentang perusahaan kami?', tip: 'Sebut 1 sampai 2 fakta spesifik (produk, nilai, berita terbaru) dan kenapa itu menarik buatmu.' },
    { kat: 'Pengalaman', q: 'Ceritakan pengalaman kamu memimpin sesuatu.', tip: 'STAR. Fokus di Action kamu sendiri.' },
    { kat: 'Pengalaman', q: 'Ceritakan saat kamu gagal dan apa yang kamu pelajari.', tip: 'Pilih kegagalan nyata yang ga fatal. Porsi terbesar di pelajaran dan perubahan sesudahnya.' },
    { kat: 'Pengalaman', q: 'Ceritakan saat kamu harus kerja dengan tenggat yang sangat mepet.', tip: 'Tunjukin cara kamu ngatur prioritas.' },
    { kat: 'Pengalaman', q: 'Ceritakan konflik dalam tim yang pernah kamu hadapi.', tip: 'Jangan jelekin orang. Tunjukin cara kamu dengerin dan nyari jalan tengah.' },
    { kat: 'Diri sendiri', q: 'Apa kelebihan terbesar kamu?', tip: 'Satu kelebihan yang relevan + bukti singkat.' },
    { kat: 'Diri sendiri', q: 'Apa kelemahan kamu?', tip: 'Nyata, bukan syarat utama posisi, plus usaha benerinnya.' },
    { kat: 'Diri sendiri', q: 'Di mana kamu melihat diri kamu 5 tahun lagi?', tip: 'Arah berkembang yang masuk akal di bidang ini, bukan jabatan spesifik.' },
    { kat: 'Situasional', q: 'Kalau atasan kasih dua tugas dengan tenggat sama, apa yang kamu lakukan?', tip: 'Klarifikasi prioritas, kasih estimasi, komunikasikan.' },
    { kat: 'Situasional', q: 'Kalau kamu sadar ada kesalahan di laporan yang udah dikirim, apa yang kamu lakukan?', tip: 'Cepat lapor, jelasin dampak, bawa solusi.' },
    { kat: 'Situasional', q: 'Kalau ditempatkan di luar kota, apakah kamu bersedia?', tip: 'Jawab jujur. Kalau bersedia, sebut kesiapanmu. Kalau ada batasan, sampein dengan sopan.' },
    { kat: 'Penutup', q: 'Berapa ekspektasi gaji kamu?', tip: 'Rentang hasil riset pasar, terbuka diskusi.' },
    { kat: 'Penutup', q: 'Kenapa kami harus memilih kamu?', tip: '2 kekuatan paling relevan + bukti.' },
    { kat: 'Penutup', q: 'Ada pertanyaan untuk kami?', tip: 'Tanya ekspektasi 3 bulan pertama, tantangan tim, atau tahap berikutnya.' },
    { kat: 'English', q: 'Tell me about yourself.', tip: 'Present, past, future. Keep it under 90 seconds.' },
    { kat: 'English', q: 'Why should we hire you?', tip: 'Two relevant strengths with a short example.' },
    { kat: 'English', q: 'Describe a challenge you faced and how you handled it.', tip: 'Use STAR. Past simple for what you did.' },
    { kat: 'English', q: 'What are your strengths and weaknesses?', tip: 'One real strength with proof, one real weakness with improvement.' },
  ]
})()
