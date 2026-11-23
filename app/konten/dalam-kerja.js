// Pendalaman skill persiapan kerja: Psikotes, Interview, CV & LinkedIn, Komunikasi.
// Tiap pelajaran ditambah contoh dikerjain bareng, alasan tiap pilihan, kesalahan umum, dan kartu contekan.
;(() => {
  const { H, perdalam } = window.GAS_DALAM
  const { I, C, RK, P, A, L } = H
  const al = (...a) => ({ alasan: a })

  // ================= PSIKOTES =================
  perdalam('PS', 'deret', {
    sisip: [C('Mecahin deret pakai 4 cek', 'Soal: <b>4, 7, 12, 19, 28, ?</b>', [
      ['4 → 7 → 12 → 19 → 28', 'Cek 1, selisih: +3, +5, +7, +9. Selisihnya ga tetap, tapi selisihnya naik 2 terus.'],
      ['+3, +5, +7, +9, +11', 'Selisih berikutnya +11 (bilangan ganjil berurutan).'],
      ['28 + 11 = 39', 'Jawaban 39.'],
      ['Cek balik: 4+3=7, 7+5=12, 12+7=19, 19+9=28, 28+11=39', 'Selalu cek pola ke semua angka, bukan cuma 2 angka terakhir.'],
    ], { penutup: 'Kalau selisih dan rasio gagal, coba liat angka ganjil-genap posisinya (selang-seling), atau kuadrat/pangkat.' })],
    perkaya: { 1: { umum: ['Jawab 16 karena ngira selisihnya tetap +4. Cek semua selisih, bukan cuma yang terakhir.'] }, 2: { umum: ['Ngira ×2 doang (jawab 94). Cek: 2×2 = 4, bukan 5, jadi ada +1.'] }, 3: { umum: ['Liat cuma −2 terus jawab 26 tanpa yakin. Cek pola gantian dari awal: −2, ×2, −2, ×2.'] } },
    akhir: [RK('Kartu contekan deret', [['1. Selisih', 'tambah/kurang tetap'], ['2. Rasio', 'kali/bagi tetap'], ['3. Selisih naik', '+1, +2, +3 atau +3, +5, +7'], ['4. Selang-seling', 'dua pola gantian'], ['Lainnya', 'kuadrat 1, 4, 9, 16; ×2+1'], ['Cek balik', 'pola harus cocok ke semua angka']])],
  })
  perdalam('PS', 'hitung', {
    sisip: [C('35% dari 260 tanpa kalkulator', 'Pecah persennya jadi potongan gampang.', [
      ['10% dari 260 = 26', 'Geser koma satu kali.'],
      ['30% = 3 × 26 = 78', 'Kaliin 3.'],
      ['5% = 26 ÷ 2 = 13', 'Setengah dari 10%.'],
      ['35% = 78 + 13 = 91', 'Jumlahin. Total 4 langkah kecil, semuanya bisa di kepala.'],
    ])],
    perkaya: { 3: al('1/8 = 0,125, dikali 3 = 0,375.', 'Dibulatin, padahal hasil pastinya ada di pilihan.', 'Mungkin ketuker sama 0,125 + 0,2.', '0,4 = 2/5, bukan 3/8.') },
    akhir: [RK('Kartu contekan hitung cepat', [['10%', 'geser koma'], ['5%', 'setengah 10%'], ['× 25', '× 100 ÷ 4'], ['× 5', '× 10 ÷ 2'], ['1/8 = 0,125', '3/8 = 0,375'], ['1/3 ≈ 0,333', '2/3 ≈ 0,667']])],
  })
  perdalam('PS', 'silogisme', {
    sisip: [C('Gambar lingkaran', 'Premis: <i>Semua analis pakai Excel. Sebagian pengguna Excel suka kopi.</i> Apakah sebagian analis suka kopi?', [
      ['Lingkaran Analis di dalam lingkaran Excel', '"Semua A adalah B" = lingkaran A masuk ke B.'],
      ['Lingkaran Kopi nyentuh sebagian lingkaran Excel', '"Sebagian B adalah C" = C motong sebagian B.'],
      ['Bisa motong bagian Excel yang di luar Analis', 'Ada kemungkinan pengguna Excel yang suka kopi itu semuanya bukan analis.'],
      ['Kesimpulan: tidak dapat disimpulkan', 'Kalau masih ada satu gambar yang bikin kesimpulan salah, kesimpulannya ga pasti.'],
    ])],
    perkaya: {
      1: al('MT ⊂ pelatihan, Rina ∈ MT, jadi Rina ∈ pelatihan.', 'Premisnya "semua", jadi pasti, bukan belum tentu.', 'Kebalik: yang ikut pelatihan bisa aja bukan MT.', 'Bisa disimpulin dengan pasti.'),
      2: al('Yang bisa berenang bisa hewan berkaki empat lain.', 'Ga ada jaminan irisannya kena kucing.', 'Terlalu jauh.', 'Ga ada premis yang bilang kucing ga bisa berenang.'),
      3: al('Modus tollens: kalau P maka Q, bukan Q → bukan P.', 'Kebalikan dari yang pasti.', 'Kalau hujan, jalan pasti basah. Jalannya ga basah, jadi ga mungkin hujan.', 'Nambahin info yang ga ada di premis.'),
      4: al('Q bisa terjadi tanpa P (jalan disiram).', 'Ini kesalahan "affirming the consequent".', 'Ga bisa dipastiin juga.', 'Nambahin info di luar premis.'),
    },
    akhir: [RK('Kartu contekan logika', [['Semua A = B, X = A', 'X = B (pasti)'], ['Semua A = B, X = B', 'X belum tentu A'], ['Kalau P maka Q, bukan Q', 'bukan P'], ['Kalau P maka Q, Q', 'belum tentu P'], ['"Sebagian"', 'jarang ngasih kesimpulan pasti'], ['Ragu', 'gambar lingkaran']])],
  })
  perdalam('PS', 'analogi', {
    sisip: [C('Bikin kalimat penghubung', 'Soal: <b>GURU : SEKOLAH = … : …</b> (Petani : Sawah / Dokter : Obat / Murid : Buku / Hakim : Palu)', [
      ['"Guru bekerja di sekolah."', 'Ubah pasangan pertama jadi kalimat yang spesifik.'],
      ['Petani bekerja di sawah ✓', 'Kalimatnya pas.'],
      ['Dokter bekerja di obat ✗ · Murid bekerja di buku ✗ · Hakim bekerja di palu ✗', 'Obat dan palu itu alat, bukan tempat kerja.'],
      ['Jawaban: Petani : Sawah', 'Hubungan pelaku–tempat kerja.'],
    ])],
    perkaya: {
      1: al('Pena alat penulis, kuas alat pelukis.', 'Buku bukan alat pembaca dalam pengertian yang sama, pembaca pemakai hasilnya.', 'Dua-duanya bahan, bukan alat–pelaku.', 'Hasil karya dan tempatnya.'),
      2: al('Haus diatasi dengan minum, lapar diatasi dengan makan.', 'Benda dan wadahnya.', 'Lawan kata.', 'Kegiatan dan yang muncul saat itu.'),
      3: { jelas: 'Lawan kata: efisien–boros, absolut–relatif, optimis–pesimis, konkret–abstrak.' },
      4: al('Kredibel = dapat dipercaya.', 'Mungkin ketuker sama "kredit".', 'Beda arti.', 'Itu labil.'),
    },
    akhir: [RK('Kartu contekan analogi', [['Kalimat penghubung', 'ubah pasangan pertama jadi kalimat'], ['Alat : pelaku', 'pena : penulis'], ['Tempat kerja', 'guru : sekolah'], ['Sebab : akibat', 'hujan : banjir'], ['Bagian : keseluruhan', 'roda : mobil'], ['Kebutuhan : pemenuhan', 'haus : minum']])],
  })
  perdalam('PS', 'cerita', {
    sisip: [C('Kerja bareng', 'A beresin kerjaan dalam 6 hari, B dalam 3 hari. Bareng berapa hari?', [
      ['A per hari: 1/6 kerjaan. B per hari: 1/3 kerjaan.', 'Ubah jadi kecepatan per hari.'],
      ['Bareng per hari: 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2', 'Kecepatan dijumlah, bukan waktunya.'],
      ['Waktu = 1 ÷ (1/2) = 2 hari', 'Dibalik.'],
      ['Cek akal: lebih cepat dari B sendirian (3 hari)', 'Kalau jawabanmu lebih lama dari yang paling cepat, pasti salah.'],
    ])],
    perkaya: { 2: { umum: ['Rata-ratain waktunya ((4 + 12) ÷ 2 = 8). Yang dijumlah kecepatan, bukan waktu.'] }, 3: { umum: ['Dibagi harga jual (20.000 ÷ 100.000 = 20%). Untung% dibagi harga beli.'] }, 4: { umum: ['Diskon dijumlah jadi 30% (350.000). Diskon kedua dihitung dari harga yang udah didiskon.'] } },
    akhir: [RK('Kartu contekan soal cerita', [['Jarak', 'kecepatan × waktu'], ['Kerja bareng', '1/total = 1/A + 1/B'], ['Untung%', '(jual − beli) ÷ beli'], ['Diskon bertingkat', 'kaliin: 0,8 × 0,9'], ['Cek akal', 'jawaban harus masuk akal']])],
  })
  perdalam('PS', 'strategi', {
    sisip: [C('Ngatur waktu tes', 'Tes numerik: 40 soal, 30 menit.', [
      ['30 × 60 ÷ 40 = 45 detik per soal', 'Hitung jatah rata-rata sebelum mulai.'],
      ['Soal makan > 60 detik → tandai, lewatin', 'Satu soal susah bisa makan jatah 3 soal gampang.'],
      ['Menit ke-25: balik ke yang ditandai', 'Sisain waktu buat soal sulit.'],
      ['Menit ke-29: isi sisa (kalau ga ada pengurangan nilai)', 'Tebakan masih punya peluang 20 sampai 25%.'],
    ])],
    akhir: [RK('Kartu contekan strategi', [['Jatah per soal', 'waktu ÷ jumlah soal'], ['Soal susah', 'tandai, lewatin, balik nanti'], ['Ga ada minus', 'jangan ada yang kosong'], ['Kraepelin', 'stabil > ngebut di awal'], ['Salah kolom', 'lanjut, jaga ritme']])],
  })
  perdalam('PS', 'rbb', {
    sisip: [C('Nyusun persiapan RBB', 'Pengumuman Rekrutmen Bersama BUMN keluar, tes online 3 minggu lagi.', [
      ['Minggu 1: TKD numerik dan logika', 'Bagian paling banyak ngegugurin. Latihan deret dan soal cerita tiap hari.'],
      ['Minggu 2: verbal, TWK, dan AKHLAK', 'TWK hafalan, AKHLAK soal situasi.'],
      ['Minggu 3: simulasi penuh pakai timer', 'Biasain stamina dan tempo.'],
      ['H-1: cek perangkat dan koneksi', 'Tes online sering gagal gara-gara teknis, bukan kemampuan.'],
    ])],
    perkaya: { 2: al('Core values BUMN sejak 2020.', 'Bukan singkatan resmi.', 'Bukan singkatan resmi.', 'Ada, dan sering ditanya.') },
    akhir: [RK('Kartu contekan RBB', [['TKD', 'verbal, numerik, logika'], ['AKHLAK', 'Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif'], ['TWK', 'Pancasila, UUD 1945, NKRI, Bhinneka'], ['Learning Agility', 'adaptasi dan belajar'], ['Cek pengumuman resmi', 'format bisa berubah tiap tahun']])],
  })
  perdalam('PS', 'akhlak', {
    sisip: [C('Cara milih jawaban soal situasi', 'Soal: <i>Atasan minta laporan selesai besok, padahal datanya dari divisi lain belum masuk.</i>', [
      ['Coret pilihan yang pasif atau nyalahin', '"Tunggu aja" atau "lapor kalau divisi lain lambat" biasanya skor rendah.'],
      ['Coret yang curang atau ngorbanin aturan', '"Isi pakai data perkiraan tanpa bilang" melanggar Amanah.'],
      ['Pilih yang proaktif + komunikatif + tetap taat aturan', '"Hubungin divisi itu langsung, kabarin atasan soal risikonya, siapin bagian yang bisa dikerjain duluan."'],
      ['Cek ke nilai AKHLAK', 'Amanah (jujur ke atasan), Kolaboratif (hubungin divisi lain), Kompeten (kerjain yang bisa).'],
    ])],
    akhir: [RK('Kartu contekan AKHLAK', [['Amanah', 'jujur, bisa dipercaya'], ['Kompeten', 'terus belajar'], ['Harmonis', 'peduli, menghargai'], ['Loyal', 'utamakan organisasi'], ['Adaptif', 'terbuka perubahan'], ['Kolaboratif', 'kerja sama'], ['Pola jawaban', 'proaktif, komunikatif, taat aturan']])],
  })
  perdalam('PS', 'twk', {
    sisip: [C('Ngafalin pakai garis waktu', 'Fakta TWK lebih nempel kalau disusun berurutan.', [
      ['1 Juni 1945', 'Pidato Soekarno soal dasar negara → Hari Lahir Pancasila.'],
      ['17 Agustus 1945', 'Proklamasi kemerdekaan.'],
      ['18 Agustus 1945', 'PPKI ngesahin UUD 1945 (dengan Pancasila di pembukaan).'],
      ['1 Oktober', 'Hari Kesaktian Pancasila (sejak peristiwa 1965).'],
      ['1999 sampai 2002', 'Empat kali amandemen UUD 1945.'],
    ])],
    perkaya: { 1: al('1999, 2000, 2001, 2002.', 'Kurang.', 'Kurang.', 'Udah diamandemen.'), 2: al('Karya Mpu Tantular.', 'Karya Mpu Prapanca.', 'Kitab sejarah raja-raja.', 'Karya Mpu Kanwa.'), 3: al('Pidato 1 Juni 1945.', 'Hari Proklamasi.', 'Pengesahan UUD.', 'Hari Kesaktian Pancasila.') },
    akhir: [RK('Kartu contekan TWK', [['1 Juni', 'Hari Lahir Pancasila'], ['18 Agustus 1945', 'UUD 1945 disahkan'], ['1 Oktober', 'Hari Kesaktian Pancasila'], ['Amandemen', '4 kali, 1999 sampai 2002'], ['Bhinneka Tunggal Ika', 'Sutasoma, Mpu Tantular']])],
  })
  perdalam('PS', 'analitis', {
    sisip: [C('Ngisi kotak posisi', '4 orang (P, Q, R, S) antre. P bukan pertama. Q tepat di belakang P. R terakhir.', [
      ['[1] [2] [3] [4]', 'Gambar kotak posisi.'],
      ['R = 4', 'Syarat paling pasti dulu.'],
      ['P–Q harus nempel berurutan, P bukan 1 → P = 2, Q = 3', 'P–Q ga bisa di 3–4 karena 4 udah R.'],
      ['S = 1', 'Sisanya. Urutan: S, P, Q, R.'],
    ])],
    perkaya: { 1: al('Sisa posisi 4 dan 5, Dedi ga di ujung → Dedi 4, Eka 5.', 'Itu posisi Dedi.', 'Posisi 2 udah Budi.', 'Posisi 1 udah Ani.'), 2: al('"Sebagian" ga ngasih hubungan pasti.', 'Ga ada dasarnya.', 'Bisa jadi, tapi belum pasti.', 'Bisa jadi ada, belum pasti.') },
    akhir: [RK('Kartu contekan analitis', [['Gambar kotak', 'posisi atau jadwal'], ['Syarat pasti dulu', '"R terakhir"'], ['Syarat berpasangan', '"tepat di belakang"'], ['Sisanya', 'isi terakhir'], ['Cek ulang', 'semua syarat terpenuhi?']])],
  })

  // ================= INTERVIEW =================
  perdalam('IV', 'kenalan', {
    sisip: [C('Nyusun perkenalan 60 detik', 'Profil: lulusan Meteorologi, tugas akhir analisis data kualitas udara, ngelamar Data Analyst.', [
      ['Sekarang: "Saya lulusan Meteorologi ITB yang fokus di analisis data lingkungan."', '1 kalimat: siapa dan fokusnya.'],
      ['Dulu: "Di tugas akhir, saya ngolah data satelit NO₂ lima tahun pakai Python dan bikin dashboard yang dipakai dosen pembimbing buat presentasi."', 'Satu pengalaman relevan dengan hasil konkret.'],
      ['Dulu: "Saya juga belajar SQL dan Power BI lewat proyek portofolio penjualan e-commerce."', 'Pengalaman kedua, nunjukin skill yang diminta loker.'],
      ['Nanti: "Saya pengen bawa kebiasaan ngolah data besar itu ke tim analitik di sini."', 'Tutup dengan kenapa posisi ini.'],
    ], { penutup: 'Bacain keras-keras sambil pakai timer. Lewat 90 detik? Potong detail yang ga nyambung ke posisi.' })],
    akhir: [RK('Kartu contekan perkenalan', [['Sekarang', 'siapa + fokus'], ['Dulu', '1 sampai 2 pengalaman + hasil'], ['Nanti', 'kenapa posisi ini'], ['Durasi', '60 sampai 90 detik'], ['Hindari', 'riwayat SD, ngeluh, baca CV']])],
  })
  perdalam('IV', 'star', {
    sisip: [C('Ngebangun cerita STAR', 'Pertanyaan: <i>"Ceritain waktu kamu nyelesaiin masalah pakai data."</i>', [
      ['S: "Di himpunan, jumlah peserta acara turun tiap semester."', 'Konteks 1 kalimat.'],
      ['T: "Saya diminta nyari penyebabnya sebelum acara berikutnya."', 'Tanggung jawabmu.'],
      ['A: "Saya bikin survei ke 120 anggota, ngolah hasilnya di Excel, dan nemu jadwal bentrok sama UTS jadi alasan utama."', 'Porsi paling panjang, pakai "saya", spesifik.'],
      ['R: "Acara dipindah ke minggu setelah UTS, pesertanya naik dari 60 jadi 95 orang."', 'Hasil yang bisa dicek.'],
    ])],
    perkaya: { 2: al('Spesifik dan ada "saya".', '"Kami" ga nunjukin peranmu.', 'Kesan, bukan tindakan.', 'Ga ada isi tindakannya.') },
    akhir: [RK('Kartu contekan STAR', [['Situation', '1 sampai 2 kalimat konteks'], ['Task', 'tanggung jawabmu'], ['Action', 'paling panjang, pakai "saya"'], ['Result', 'angka atau dampak nyata'], ['Siapin', '3 sampai 5 cerita buat berbagai pertanyaan']])],
  })
  perdalam('IV', 'jebakan', {
    sisip: [C('Jawab "Kenapa nganggur 8 bulan?"', 'Kamu lulus Maret, sekarang November, belum kerja.', [
      ['Jujur dan singkat', '"Setelah lulus, saya fokus nyari posisi yang sesuai di bidang data."'],
      ['Tunjukin yang kamu lakuin', '"Selama itu saya belajar SQL dan Power BI, dan bikin 3 proyek portofolio pakai data publik."'],
      ['Sambungin ke posisi', '"Salah satunya analisis penjualan e-commerce, mirip kebutuhan tim ini."'],
      ['Jangan defensif atau panjang', 'Ga perlu cerita penolakan satu per satu. Total 20 sampai 30 detik.'],
    ])],
    akhir: [RK('Kartu contekan pertanyaan jebakan', [['Kelemahan', 'nyata, bukan inti posisi, + usaha benerin'], ['Gaji', 'riset, rentang, terbuka diskusi'], ['Gap/nganggur', 'jujur, singkat, tunjukin aktivitas'], ['Kenapa kamu', '2 kekuatan relevan + bukti'], ['Prinsip', 'mereka nilai cara mikir dan kejujuran']])],
  })
  perdalam('IV', 'tanya', {
    sisip: [C('Email terima kasih setelah interview', 'Interview Staf Data hari ini sama Bu Rina.', [
      ['Subjek: Terima kasih – Interview Staf Data, Arya Pratama', 'Gampang dicari.'],
      ['"Yth. Bu Rina, terima kasih atas waktunya di interview tadi siang."', 'Sapaan + terima kasih.'],
      ['"Penjelasan Ibu soal rencana dashboard penjualan nasional bikin saya makin tertarik, karena nyambung sama proyek portofolio saya."', 'Satu hal spesifik dari obrolan. Ini yang bikin ga generik.'],
      ['"Semoga bisa ngobrol lagi di tahap berikutnya. Salam, Arya Pratama"', 'Penutup singkat. Kirim dalam 24 jam.'],
    ])],
    akhir: [RK('Kartu contekan nanya balik', [['Bagus', 'tantangan tim, ukuran sukses, tahap berikutnya'], ['Simpen', 'gaji, cuti buat tahap tawaran'], ['Hindari', 'yang jawabannya ada di website'], ['Email terima kasih', '≤ 24 jam, ada 1 hal spesifik']])],
  })
  perdalam('IV', 'kelemahan', {
    sisip: [C('Nyusun jawaban kelemahan', 'Ngelamar Data Analyst.', [
      ['Pilih kelemahan nyata tapi bukan inti posisi', 'Contoh: "kurang nyaman ngomong di depan banyak orang". Jangan "kurang teliti" buat posisi data.'],
      ['Kasih contoh singkat', '"Pas sidang proposal, saya terlalu cepat ngomong sampai dosen minta ulang."'],
      ['Usaha perbaikan', '"Sejak itu saya latihan presentasi ke teman tiap minggu dan rekam diri sendiri."'],
      ['Hasil sejauh ini', '"Di sidang akhir, saya selesai tepat waktu dan dapet nilai A untuk presentasi."'],
    ])],
    akhir: [RK('Kartu contekan kelemahan', [['Nyata', 'bukan pujian terselubung'], ['Bukan inti posisi', 'jangan "ga teliti" buat akuntan'], ['Contoh', 'singkat'], ['Perbaikan', 'yang lagi kamu lakuin'], ['Hasil', 'progres yang keliatan']])],
  })
  perdalam('IV', 'gaji', {
    sisip: [C('Riset dan nyebut angka', 'Posisi Junior Data Analyst di Jakarta.', [
      ['Cari 3 sumber', 'Iklan loker yang nyantumin gaji, laporan gaji tahunan perusahaan rekrutmen, tanya alumni 1 sampai 2 tahun di atasmu.'],
      ['Ambil kisaran tengah', 'Misal ketemu 6 sampai 9 juta, rentang aman 7 sampai 8,5 juta.'],
      ['Kalimatnya', '"Berdasarkan riset saya untuk posisi ini di Jakarta, kisarannya 7 sampai 8,5 juta. Saya terbuka diskusi sesuai total paket."'],
      ['Kalau ditawar di bawah', 'Tanya komponen lain (tunjangan, review gaji 6 bulan, pelatihan) sebelum jawab.'],
    ])],
    perkaya: { 2: al('Total paket lebih penting dari gaji pokok doang.', 'Ga relevan.', 'Ga relevan.', 'Ga relevan.') },
    akhir: [RK('Kartu contekan gaji', [['Riset', 'loker, laporan gaji, alumni'], ['Sebut', 'rentang, bukan satu angka'], ['Tambah', '"terbuka diskusi total paket"'], ['Total paket', 'tunjangan, BPJS, bonus, pelatihan'], ['Hindari', 'alasan kebutuhan pribadi']])],
  })
  perdalam('IV', 'tanyabalik', {
    sisip: [C('Nyiapin 3 pertanyaan balik', 'Interview posisi Admin Data di perusahaan logistik.', [
      ['Soal posisi: "Seperti apa sukses di posisi ini setelah 3 bulan?"', 'Nunjukin kamu mikirin kontribusi.'],
      ['Soal tim: "Tantangan terbesar tim sekarang apa?"', 'Bahan buat nyambungin skillmu.'],
      ['Soal proses: "Tahap seleksi berikutnya seperti apa?"', 'Praktis dan wajar.'],
      ['Cadangan', 'Kalau pertanyaan pertama udah kejawab pas interview, pakai yang lain. Jangan nanya yang udah dijelasin.'],
    ])],
    akhir: [RK('Kartu contekan pertanyaan balik', [['Posisi', 'ukuran sukses 3 bulan'], ['Tim', 'tantangan sekarang'], ['Proses', 'tahap berikutnya'], ['Jangan', '"ga ada", atau yang ada di website']])],
  })
  perdalam('IV', 'online', {
    sisip: [C('Checklist 15 menit sebelum interview online', 'Interview lewat Zoom jam 10.00.', [
      ['09.45: tes link, kamera, mik, speaker', 'Join test meeting atau rekam 10 detik.'],
      ['09.50: posisi kamera sejajar mata, cahaya dari depan', 'Tumpuk buku di bawah laptop kalau perlu.'],
      ['09.53: matiin notifikasi, tutup tab lain, siapin CV dan catatan di samping', 'Catatan boleh, tapi jangan dibaca terus.'],
      ['09.55: masuk ruang tunggu', 'Lebih awal 5 menit.'],
    ])],
    akhir: [RK('Kartu contekan interview online', [['Kamera', 'sejajar mata'], ['Cahaya', 'dari depan'], ['Notifikasi', 'mati'], ['Masuk', '5 menit lebih awal'], ['Koneksi putus', 'masuk lagi, minta maaf singkat, lanjut']])],
  })

  // ================= CV & LINKEDIN =================
  perdalam('CV', 'ats', {
    sisip: [C('Ngubah CV dua kolom jadi ramah ATS', 'CV desain Canva: dua kolom, skill pakai bar bintang, kontak di header gambar.', [
      ['Pindah ke satu kolom di Google Docs/Word', 'Urutan: Kontak, Ringkasan, Pendidikan, Pengalaman, Proyek, Skill.'],
      ['Ganti bar bintang jadi teks', '"Python (pandas, matplotlib), SQL, Excel (pivot, XLOOKUP)". ATS ga bisa baca bintang.'],
      ['Kontak ditulis teks biasa di baris pertama', 'Bukan di header/gambar.'],
      ['Cocokin kata kunci loker yang memang kamu bisa', 'Loker nulis "data visualization"? Pakai istilah itu kalau kamu memang bikin dashboard.'],
      ['Ekspor PDF dari Docs/Word', 'Cek: buka PDF, blok semua teks, copy ke Notepad. Kalau urutannya rapi, ATS juga bisa baca.'],
    ])],
    akhir: [RK('Kartu contekan ATS', [['Satu kolom', 'judul bagian standar'], ['Skill', 'teks, bukan ikon/bar'], ['Kontak', 'teks biasa, bukan header'], ['File', 'PDF ekspor, bukan scan'], ['Tes', 'copy-paste PDF ke Notepad'], ['Kata kunci', 'dari loker, yang jujur kamu bisa']])],
  })
  perdalam('CV', 'bullet', {
    sisip: [C('Ngubah bullet lemah', 'Bullet awal: <i>"Bertanggung jawab atas publikasi himpunan."</i>', [
      ['Ganti pembuka jadi kata kerja aktif', '"Mengelola publikasi himpunan…"'],
      ['Tambah apa yang dikerjain', '"…mengelola 3 akun media sosial dan membuat kalender konten bulanan…"'],
      ['Tambah skala/hasil', '"…engagement rate naik dari 2% jadi 4,5% dalam satu semester."'],
      ['Cek kejujuran', 'Semua angka harus bisa kamu jelasin asal-usulnya kalau ditanya.'],
    ])],
    perkaya: { 1: al('Kata kerja + skala + hasil.', 'Ga jelas kamu ngapain.', 'Tugas, bukan pencapaian.', 'Sifat, bukan bukti.') },
    akhir: [RK('Kartu contekan bullet', [['Kata kerja aktif', 'menyusun, menganalisis, memimpin'], ['Apa', 'yang konkret kamu kerjain'], ['Hasil', 'angka, skala, dampak'], ['Hindari', '"bertanggung jawab atas", "membantu"'], ['Jujur', 'semua angka bisa dijelasin']])],
  })
  perdalam('CV', 'xyz', {
    sisip: [C('Rumus XYZ dari proyek kuliah', 'Proyek: tugas akhir analisis NO₂.', [
      ['X (pencapaian): "Mengidentifikasi penurunan NO₂ 20% selama periode Lebaran…"', 'Apa yang kamu capai.'],
      ['Y (ukuran): "…dari data satelit 5 tahun (1.800 hari pengamatan)…"', 'Gimana itu diukur.'],
      ['Z (cara): "…dengan analisis time series di Python dan uji statistik."', 'Pakai apa.'],
      ['Gabungan', '"Mengidentifikasi penurunan NO₂ 20% saat Lebaran dari 1.800 hari data satelit menggunakan analisis time series di Python."'],
    ])],
    perkaya: { 1: al('Skala (12.000 baris), alat (Excel), hasil (3 produk, 60% retur).', 'Tugas, bukan hasil.', 'Ga jelas.', 'Sifat tanpa bukti.') },
    akhir: [RK('Kartu contekan XYZ', [['X', 'pencapaian'], ['Y', 'diukur dengan apa'], ['Z', 'caranya'], ['Angka kecil', 'tetap lebih kuat dari ga ada'], ['Mulai', 'kata kerja aktif']])],
  })
  perdalam('CV', 'linkedin', {
    sisip: [C('Nyusun headline dan About', 'Fresh graduate Meteorologi yang ngincer posisi data analyst.', [
      ['Headline: "Meteorology Graduate | Data Analysis with Python, SQL, Power BI | Open to Data Analyst roles"', 'Bidang + skill + target. Kebaca rekruter yang nyari "Data Analyst".'],
      ['About kalimat 1: fokus', '"I turn messy environmental and business data into clear decisions."'],
      ['About kalimat 2 sampai 3: bukti', 'Proyek tugas akhir dan 1 sampai 2 proyek portofolio, sebut alat.'],
      ['About kalimat terakhir: ajakan', '"Open to junior data analyst roles in Jakarta or remote."'],
      ['Featured: link dashboard dan GitHub', 'Bukti yang bisa diklik.'],
    ])],
    perkaya: { 1: al('Bidang, skill, target.', 'Ga ngasih info apa-apa.', 'Ga spesifik.', 'Ga profesional.') },
    akhir: [RK('Kartu contekan LinkedIn', [['Headline', 'bidang | skill | target'], ['About', 'fokus, bukti, ajakan'], ['Featured', 'portofolio yang bisa diklik'], ['Skills', 'urutin sesuai target'], ['Open to Work', 'aktifin, pilih posisi spesifik']])],
  })
  perdalam('CV', 'porto', {
    sisip: [C('Case study portofolio data', 'Proyek: analisis penjualan e-commerce dari dataset publik.', [
      ['Masalah: "Kategori mana yang paling banyak diretur dan kenapa?"', 'Mulai dari pertanyaan bisnis, bukan dari alat.'],
      ['Data: sumber, ukuran, periode', '"Dataset publik 100 ribu pesanan, 2016 sampai 2018."'],
      ['Proses: bersihin, analisis, visual', 'Sebut langkah penting dan alatnya (SQL, Python, Power BI).'],
      ['Hasil: 2 sampai 3 temuan dengan angka', '"Elektronik nyumbang 40% retur, mayoritas karena barang telat."'],
      ['Rekomendasi + yang dipelajari', 'Nutup kayak laporan ke atasan.'],
    ])],
    perkaya: { 2: al('Kualitas dan cerita yang jelas ngalahin jumlah.', 'Kesannya ga pernah nyelesaiin.', 'Sertifikat ga nunjukin kamu bisa ngerjain.', 'Klaim tanpa bukti.') },
    akhir: [RK('Kartu contekan portofolio', [['Masalah', 'pertanyaan bisnis'], ['Data', 'sumber, ukuran, periode'], ['Proses', 'langkah + alat'], ['Hasil', 'temuan + angka'], ['Rekomendasi', 'tindakan'], ['Jumlah', '2 sampai 3 proyek rapi cukup']])],
  })
  perdalam('CV', 'cover', {
    sisip: [C('Cover letter 3 paragraf', 'Ngelamar Junior Data Analyst di perusahaan energi.', [
      ['Paragraf 1: posisi + kenapa perusahaan ini', '"Saya tertarik karena laporan keberlanjutan perusahaan nunjukin investasi besar di monitoring emisi, nyambung sama latar belakang Meteorologi saya."'],
      ['Paragraf 2: 1 sampai 2 bukti relevan', '"Di tugas akhir, saya ngolah data emisi NO₂ lima tahun dan nemu pola yang dipakai dosen buat publikasi."'],
      ['Paragraf 3: penutup', '"Saya berharap bisa ngobrol lebih lanjut soal kontribusi saya di tim analitik."'],
      ['Cek', 'Maksimal 1 halaman, nama perusahaan dan posisi bener (jangan kebawa dari lamaran lain).'],
    ])],
    perkaya: { 2: al('Generik kerasa banget.', 'Singkat justru bagus.', 'Itu wajib.', 'Itu wajib.') },
    akhir: [RK('Kartu contekan cover letter', [['P1', 'posisi + alasan spesifik'], ['P2', '1 sampai 2 bukti'], ['P3', 'penutup + harapan interview'], ['Panjang', '≤ 1 halaman'], ['Cek', 'nama perusahaan dan posisi bener']])],
  })

  // ================= KOMUNIKASI =================
  perdalam('KM', 'presentasi', {
    sisip: [C('Ngubah presentasi muter jadi langsung ke inti', 'Versi awal: "Jadi, latar belakangnya… terus kita ambil data… terus ternyata…" (inti baru muncul di menit ke-5).', [
      ['Inti: "Saya usul kita tambah stok Kopi Gayo 30% bulan depan."', 'Kalimat pertama = rekomendasi.'],
      ['Alasan 1: "Penjualannya naik 25% tiga bulan berturut-turut."', 'Alasan + angka.'],
      ['Alasan 2: "Stok habis 4 kali bulan lalu, kita kehilangan sekitar 120 pesanan."', 'Alasan kedua.'],
      ['Minta: "Saya butuh persetujuan hari ini biar PO bisa dikirim Jumat."', 'Jelas apa yang diminta dari audiens.'],
    ])],
    perkaya: { 2: al('Judul = pesan utama.', 'Label doang.', 'Ga ada maknanya.', 'Terlalu umum.') },
    akhir: [RK('Kartu contekan presentasi', [['Inti dulu', 'rekomendasi 1 kalimat'], ['Alasan', '2 sampai 3 poin'], ['Bukti', 'angka/contoh tiap poin'], ['Minta', 'langkah berikutnya'], ['Judul slide', 'kalimat kesimpulan']])],
  })
  perdalam('KM', 'situasi', {
    awal: [I('Prinsip komunikasi di kantor', '<ul><li><b>Kasih info lengkap biar orang lain bisa mutusin</b>: apa masalahnya, dampaknya, pilihannya.</li><li><b>Bawa solusi</b>, jangan cuma masalah.</li><li><b>Cepat dan jujur</b> kalau ada kesalahan. Makin lama ditunda, makin mahal.</li><li><b>Pesan tertulis langsung ke inti</b>: jangan cuma kirim "Pak" terus nunggu dibales.</li></ul>'), C('Lapor kesalahan ke atasan', 'Kamu sadar angka di laporan yang udah dikirim ke klien salah ketik (Rp 1,2 M harusnya Rp 1,02 M).', [
      ['Kabarin secepatnya', '"Pak, saya nemu salah ketik di laporan yang tadi pagi dikirim ke klien."'],
      ['Jelasin dampak', '"Omzet ketulis 1,2 M, harusnya 1,02 M. Kesimpulan laporannya ga berubah."'],
      ['Bawa solusi', '"Saya udah siapin versi revisi. Boleh saya kirim ulang ke klien dengan catatan koreksi?"'],
      ['Cegah ke depan', '"Ke depannya saya cek angka total pakai rumus sebelum ekspor."'],
    ])],
    perkaya: { 2: al('Langsung ke inti dan jelas yang dibutuhin.', 'Bikin atasan nunggu tanpa konteks.', 'Basa-basi yang buang waktu.', 'Sama, nunda inti.') },
    akhir: [RK('Kartu contekan komunikasi kerja', [['Info lengkap', 'masalah, dampak, pilihan'], ['Bawa solusi', 'bukan cuma masalah'], ['Salah', 'kabarin cepat + perbaikan'], ['Chat', 'langsung ke inti'], ['Beban numpuk', 'minta prioritas']])],
  })
  perdalam('KM', 'strukturpres', {
    sisip: [C('Presentasi hasil magang 5 menit', 'Magang 3 bulan di tim operasional.', [
      ['Pembuka (30 detik): "Selama magang, saya bantu motong waktu rekap laporan dari 2 hari jadi 3 jam."', 'Angka paling kuat di awal.'],
      ['Konteks (30 detik)', 'Tim ngerekap 40 file Excel manual tiap minggu.'],
      ['3 poin (3 menit)', 'Template seragam, Power Query buat gabung otomatis, dashboard ringkas. Tiap poin ada hasil.'],
      ['Pelajaran + penutup (1 menit)', 'Satu pelajaran utama, terima kasih, siap ditanya.'],
    ])],
    perkaya: { 2: al('Bottom line up front.', 'Kehabisan waktu sebelum inti.', 'Buang waktu.', 'Buang waktu.') },
    akhir: [RK('Kartu contekan struktur', [['Pembuka', 'hook + peta isi'], ['Isi', 'maks 3 poin + bukti'], ['Penutup', 'ringkas + ajakan'], ['Rule of three', '3 poin gampang diinget'], ['Waktu mepet', 'kesimpulan duluan']])],
  })
  perdalam('KM', 'slide', {
    sisip: [C('Ngerombak slide penuh teks', 'Slide awal: judul "Hasil", isinya paragraf 8 baris dan tabel 12 kolom.', [
      ['Judul jadi kesimpulan', '"Biaya kirim turun 15% setelah ganti kurir."'],
      ['Paragraf jadi 3 poin pendek', 'Maks sekitar 6 kata per poin.'],
      ['Tabel 12 kolom jadi 1 grafik batang', 'Cuma tampilin yang dukung judul. Tabel lengkap pindah ke lampiran.'],
      ['Sorot satu angka', 'Warna aksen cuma buat angka 15%.'],
    ])],
    perkaya: { 2: al('Judul = pesan.', 'Label.', 'Ga bermakna.', 'Terlalu umum.') },
    akhir: [RK('Kartu contekan slide', [['1 slide', '1 pesan'], ['Judul', 'kalimat kesimpulan'], ['Teks', 'sedikit, poin pendek'], ['Font', '≥ 24 pt'], ['Detail', 'pindah ke lampiran'], ['Jangan', 'baca slide kata per kata']])],
  })
  perdalam('KM', 'fgd', {
    sisip: [C('Alur kontribusi yang bagus di FGD', 'Topik FGD: "Pilih 3 prioritas program CSR perusahaan dengan anggaran terbatas."', [
      ['Menit awal: usul kerangka', '"Gimana kalau kita sepakati dulu kriterianya: dampak, biaya, dan kesesuaian sama bisnis?"'],
      ['Tengah: tanggepin dan bangun ide orang', '"Setuju sama Mbak Sari soal air bersih, dan bisa ditambah pelatihan warga biar berkelanjutan."'],
      ['Ajak yang diam', '"Mas Andi, dari sisi biaya gimana?"'],
      ['Akhir: rangkum', '"Jadi kita sepakat: air bersih, beasiswa vokasi, dan UMKM lokal. Ada yang mau ditambahin?"'],
    ])],
    perkaya: { 2: al('Kerja sama dan kepemimpinan.', 'Kehilangan poin kerja sama.', 'Ga nambah nilai.', 'Ga profesional.') },
    akhir: [RK('Kartu contekan FGD', [['Awal', 'usul kerangka/kriteria'], ['Tengah', 'bangun ide orang lain'], ['Ajak', 'yang diam'], ['Akhir', 'rangkum kesepakatan'], ['Hindari', 'dominan atau diam total']])],
  })
  perdalam('KM', 'feedbackkm', {
    sisip: [C('Ngasih feedback pakai SBI', 'Rekan satu tim sering telat ngirim bagian laporan.', [
      ['Situation: "Di laporan mingguan Senin kemarin,"', 'Spesifik kapan.'],
      ['Behavior: "bagian kamu masuk jam 4 sore, padahal kita sepakat jam 12."', 'Perilaku yang keliatan, bukan sifat ("kamu malas").'],
      ['Impact: "Jadi saya ga sempet ngecek angka sebelum dikirim ke atasan."', 'Dampaknya.'],
      ['Ajak solusi: "Ada kendala apa? Gimana kalau deadline internal kita majuin?"', 'Tutup dengan pertanyaan, bukan vonis.'],
    ])],
    akhir: [RK('Kartu contekan feedback', [['Situation', 'kapan, di mana'], ['Behavior', 'perilaku, bukan sifat'], ['Impact', 'dampaknya'], ['Nerima feedback', 'makasih, tanya contoh, tindak lanjut'], ['Hindari', 'membela diri duluan']])],
  })
})()
