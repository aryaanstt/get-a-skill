// Pendalaman skill bidang: Digital Marketing, Copywriting, Akuntansi, UI/UX, Manajemen Proyek, K3, QC, Administrasi.
// Rujukan kurikulum: Google Digital Marketing, Google UX Design, siklus akuntansi SAK, PMBOK/Scrum Guide, PP 50/2012 SMK3, 7 QC tools/DMAIC, tata naskah dinas.
;(() => {
  const { H, perdalam } = window.GAS_DALAM
  const { I, C, RK, A } = H
  const al = (...a) => ({ alasan: a })

  // ================= DIGITAL MARKETING =================
  perdalam('DM', 'funnel', {
    sisip: [C('Mapping funnel brand kopi lokal', 'Brand kopi rumahan mau naikin penjualan online.', [
      ['Awareness: Reels "cara seduh V60 2 menit"', 'Konten edukasi yang gampang dibagikan. Metrik: reach, views.'],
      ['Consideration: carousel perbandingan biji Gayo vs Toraja + review pembeli', 'Bantu orang yang lagi milih. Metrik: saves, klik ke profil.'],
      ['Conversion: promo gratis ongkir 3 hari + link checkout langsung', 'Dorong keputusan beli. Metrik: conversion rate, omzet.'],
      ['Loyalty: kartu poin digital + email resep tiap minggu', 'Bikin balik lagi dan ngerekomendasiin. Metrik: repeat order.'],
    ], { penutup: 'Masalah di tahap mana bisa diliat dari metrik yang jeblok: reach tinggi tapi klik rendah = masalah di consideration.' })],
    akhir: [RK('Kartu contekan funnel', [['Awareness', 'kenal, metrik reach'], ['Consideration', 'bandingin, metrik klik/saves'], ['Conversion', 'beli, metrik CR'], ['Loyalty', 'balik lagi, metrik repeat'], ['Diagnosa', 'cari tahap yang metriknya jeblok']])],
  })
  perdalam('DM', 'metrik', {
    sisip: [C('Baca laporan iklan', 'Kampanye B: 80.000 impresi, 1.200 klik, 30 pembelian, biaya Rp3.000.000, pendapatan Rp6.000.000.', [
      ['CTR = 1.200 ÷ 80.000 = 1,5%', 'Seberapa menarik iklannya.'],
      ['CPC = 3.000.000 ÷ 1.200 = Rp2.500', 'Harga satu klik.'],
      ['CR = 30 ÷ 1.200 = 2,5%', 'Seberapa bagus halaman tujuan ngubah klik jadi beli.'],
      ['ROAS = 6.000.000 ÷ 3.000.000 = 2×', 'Tiap Rp1 iklan balik Rp2. Belum tentu untung, tergantung margin produk.'],
    ])],
    perkaya: { 1: { umum: ['Kebalik: impresi ÷ klik. CTR = klik ÷ impresi.'] }, 4: { umum: ['ROAS 4× belum tentu untung. Kalau margin produk cuma 20%, Rp8 juta penjualan = untung kotor Rp1,6 juta, di bawah biaya iklan Rp2 juta.'] } },
    akhir: [RK('Kartu contekan metrik iklan', [['CTR', 'klik ÷ impresi'], ['CPC', 'biaya ÷ klik'], ['CR', 'beli ÷ klik'], ['ROAS', 'pendapatan ÷ biaya iklan'], ['CPM', 'biaya per 1.000 impresi'], ['ROAS vs untung', 'cek margin produk']])],
  })
  perdalam('DM', 'seo', {
    sisip: [C('Optimasi satu halaman produk', 'Halaman "Kopi Gayo 250g" di toko online sendiri.', [
      ['Riset kata kunci: "kopi gayo bandung", "kopi arabika gayo 250 gram"', 'Pilih long-tail yang dicari dan sesuai produk.'],
      ['Judul halaman: "Kopi Arabika Gayo 250 gram – Sangrai Segar, Kirim dari Bandung"', 'On-page: kata kunci di judul, natural.'],
      ['Isi: jawab pertanyaan pembeli (rasa, cara seduh, tanggal sangrai)', 'Konten yang berguna bikin orang betah.'],
      ['Teknis: kompres foto biar halaman di bawah 3 detik', 'Situs lambat bikin orang kabur dan peringkat turun.'],
      ['Off-page: minta blog kopi lokal review dan nautin', 'Backlink dari situs terpercaya.'],
    ])],
    perkaya: { 2: al('Long-tail: persaingan rendah, niat beli tinggi.', 'Terlalu umum, saingannya brand besar.', 'Terlalu umum dan ga spesifik produk.', 'Ga ada konteks.') },
    akhir: [RK('Kartu contekan SEO', [['On-page', 'judul, heading, isi, kata kunci'], ['Teknis', 'cepat, rapi di HP'], ['Off-page', 'backlink terpercaya'], ['Long-tail', 'spesifik, gampang menang'], ['Isi', 'jawab pertanyaan pembeli']])],
  })
  perdalam('DM', 'sem', {
    sisip: [C('Ngatur kampanye Google Ads kecil', 'Budget Rp3 juta sebulan buat jasa les privat di Bandung.', [
      ['Kata kunci: "les privat matematika bandung", "guru les SMA bandung"', 'Niat beli tinggi, lokal.'],
      ['Iklan: "Les Privat Matematika di Bandung – Guru Datang ke Rumah"', 'Relevan sama kata kunci = Quality Score naik.'],
      ['Landing page: satu halaman, satu tombol WhatsApp', 'Halaman tujuan yang nyambung juga naikin Quality Score.'],
      ['Estimasi: CPC Rp1.500 → sekitar 2.000 klik', 'Budget ÷ CPC.'],
    ])],
    perkaya: { 1: al('Relevansi (Quality Score) ikut nentuin posisi.', 'Mungkin banget.', 'Umur akun bukan faktor utama.', 'Ga ngaruh.') },
    akhir: [RK('Kartu contekan SEM', [['SEM', 'iklan di mesin pencari'], ['Lelang', 'tawaran × Quality Score'], ['Quality Score', 'relevansi iklan, landing page, CTR'], ['Klik ≈ budget ÷ CPC', 'estimasi'], ['Sosmed ads', 'target minat, bukan kata kunci']])],
  })
  perdalam('DM', 'sosmed', {
    sisip: [C('Rencana konten seminggu', 'UMKM sambal kemasan, target ibu muda dan anak kos.', [
      ['Senin: edukasi, "3 menu 10 menit pakai sambal"', 'Pilar edukasi, format Reels.'],
      ['Rabu: bukti sosial, repost video pembeli', 'Pilar bukti sosial.'],
      ['Jumat: hiburan, meme "level pedas anak kos"', 'Pilar hiburan, gampang dibagikan.'],
      ['Minggu: promo, bundling 3 rasa diskon 15%', 'Pilar promosi, cukup 1 dari 4 konten.'],
      ['Ukur: saves dan shares tiap konten', 'Konten yang paling banyak disimpen = topik yang dibutuhin audiens.'],
    ])],
    akhir: [RK('Kartu contekan sosmed', [['Pilar', 'edukasi, hiburan, bukti sosial, promosi'], ['Promosi', 'jangan tiap hari'], ['ER', 'interaksi ÷ reach'], ['Saves/shares', 'sinyal konten berguna'], ['Ukur', 'per konten, bandingin pilar']])],
  })
  perdalam('DM', 'email', {
    sisip: [C('Email keranjang ditinggal', 'Pelanggan masukin kopi ke keranjang tapi ga checkout.', [
      ['Segmen: yang ninggalin keranjang 24 jam terakhir', 'Relevan = open rate tinggi.'],
      ['Subject: "Kopi pilihanmu masih nunggu, gratis ongkir sampai besok"', 'Personal + alasan bertindak + batas waktu jujur.'],
      ['Isi: foto produk di keranjang, 2 kalimat, 1 tombol "Lanjut checkout"', 'Satu pesan, satu CTA.'],
      ['Ukur: open rate, CTR, berapa yang checkout', 'Bandingin subject A vs B minggu depan.'],
    ])],
    perkaya: { 2: al('Personal, spesifik, ada alasan bertindak.', 'Ga ngasih alasan buka.', 'Kesannya spam.', 'Terlalu umum.') },
    akhir: [RK('Kartu contekan email marketing', [['Open rate', 'dibuka ÷ terkirim'], ['CTR', 'klik ÷ terkirim'], ['Segmentasi', 'relevan = dibuka'], ['Subject', 'personal, spesifik, ada alasan'], ['Isi', 'satu pesan, satu CTA']])],
  })
  perdalam('DM', 'analitik', {
    sisip: [C('CAC vs LTV', 'Toko online: biaya marketing Rp20 juta sebulan, dapet 250 pelanggan baru. Pelanggan rata-rata belanja Rp150 ribu, 4 kali setahun, margin 30%.', [
      ['CAC = 20.000.000 ÷ 250 = Rp80.000', 'Biaya dapet satu pelanggan.'],
      ['Nilai belanja setahun = 150.000 × 4 = Rp600.000', 'Pendapatan per pelanggan.'],
      ['LTV (laba) = 600.000 × 30% = Rp180.000', 'Pakai margin, bukan omzet.'],
      ['LTV ÷ CAC = 2,25', 'Sehat. Patokan umum minimal sekitar 3 biar aman.'],
    ])],
    perkaya: { 2: al('Atribusi sumber traffic.', 'UTM malah bikin link lebih panjang.', 'Ga ngaruh ke harga iklan.', 'Ga wajib, tapi sangat disarankan.'), 3: al('Biaya dapet pelanggan lebih besar dari nilainya.', 'Kebalik.', 'Ga impas, rugi 10 ribu per pelanggan.', 'Justru ini perbandingan kunci.') },
    akhir: [RK('Kartu contekan analytics', [['UTM', 'source, medium, campaign'], ['CAC', 'biaya marketing ÷ pelanggan baru'], ['LTV', 'nilai pelanggan sepanjang waktu'], ['LTV ÷ CAC', 'patokan ≥ 3'], ['GA4', 'users, sessions, engagement, conversions']])],
  })

  // ================= COPYWRITING =================
  perdalam('CW', 'aida', {
    sisip: [C('Caption AIDA botol minum', 'Produk: botol minum 1 liter dengan penanda waktu.', [
      ['A: "Udah minum berapa gelas hari ini? Jujur."', 'Pertanyaan yang nyetop scroll.'],
      ['I: "Botol ini punya penanda jam di badannya, dari jam 8 pagi sampai 4 sore."', 'Kenapa relevan.'],
      ['D: "Tanpa mikir, tiap liat botol kamu tau udah ketinggalan minum atau belum. Kepala ga gampang pusing lagi pas kerja."', 'Benefit yang dirasain, bukan fitur.'],
      ['A: "Checkout hari ini, gratis ongkir sampai Jumat."', 'Ajakan jelas + alasan sekarang.'],
    ])],
    akhir: [RK('Kartu contekan AIDA', [['Attention', 'nyetop scroll'], ['Interest', 'kenapa relevan'], ['Desire', 'benefit, bukan fitur'], ['Action', 'ajakan jelas'], ['Fitur → benefit', 'tanya "terus kenapa?"']])],
  })
  perdalam('CW', 'pas', {
    sisip: [C('Copy PAS buat aplikasi catat keuangan', 'Target: anak kos.', [
      ['Problem: "Tanggal 20 saldo tinggal 50 ribu, padahal gajian masih 10 hari lagi?"', 'Sebut masalah yang dia kenal.'],
      ['Agitate: "Ujung-ujungnya makan mi instan seminggu dan pinjem temen lagi."', 'Bikin kerasa mengganggu, tapi jangan lebay.'],
      ['Solution: "Aplikasi ini ngasih jatah harian otomatis dari sisa uangmu. Tinggal liat angkanya tiap pagi."', 'Solusi langsung nyambung ke masalah.'],
      ['Bonus FAB: fitur jatah harian → ga perlu ngitung → bisa makan enak sampai akhir bulan', 'Kalau mau, sambung pakai FAB.'],
    ])],
    akhir: [RK('Kartu contekan PAS dan FAB', [['Problem', 'masalah yang dikenal'], ['Agitate', 'dampak yang kerasa'], ['Solution', 'jalan keluar'], ['Feature', 'apa produknya'], ['Advantage', 'keunggulannya'], ['Benefit', 'yang dirasain']])],
  })
  perdalam('CW', 'headline', {
    sisip: [C('Ngembangin headline', 'Artikel blog: tips Excel buat admin.', [
      ['"Tips Excel"', 'Terlalu umum.'],
      ['"7 Tips Excel"', '+ angka, lebih konkret.'],
      ['"7 Rumus Excel yang Bikin Laporan Admin Kelar 2 Jam Lebih Cepat"', '+ siapa pembacanya + hasil spesifik.'],
      ['Cek janji', 'Isi artikel harus beneran ngasih 7 rumus yang bisa dipakai. Kalau nggak, itu clickbait.'],
    ])],
    perkaya: { 1: al('Spesifik, ada angka, ada hasil.', 'Label doang.', 'Opini umum.', 'CTA tanpa alasan.') },
    akhir: [RK('Kartu contekan headline', [['Angka', '"7 rumus…"'], ['Pertanyaan', '"Kenapa…?"'], ['Cara', '"Cara … tanpa …"'], ['Hasil spesifik', '"2 jam lebih cepat"'], ['Janji ditepati', 'hindari clickbait']])],
  })
  perdalam('CW', 'tone', {
    sisip: [C('Satu pesan, dua tone', 'Pesan: "Aplikasi lagi maintenance jam 22.00 sampai 24.00."', [
      ['Bank: "Nasabah Yth, layanan aplikasi tidak tersedia sementara pukul 22.00 sampai 24.00 WIB untuk peningkatan sistem. Dana Anda tetap aman."', 'Tenang, jelas, ada jaminan.'],
      ['Aplikasi musik Gen Z: "Kita lagi dandan bentar ya, jam 10 sampai 12 malem. Abis itu playlist-mu makin kenceng."', 'Santai dan jenaka.'],
      ['Yang sama di dua versi', 'Info penting (jam, alasan) tetap jelas. Tone ngubah gaya, bukan ngilangin isi.'],
    ])],
    akhir: [RK('Kartu contekan tone', [['Tone of voice', 'kepribadian brand dalam tulisan'], ['Konsisten', 'di semua kanal'], ['Ikutin pembaca', 'bank tenang, Gen Z santai'], ['Komplain', 'empati, solusi, pindah ke DM'], ['Isi tetap jelas', 'tone ga boleh ngaburin info']])],
  })
  perdalam('CW', 'ctaemail', {
    sisip: [C('Email jualan kelas online', 'Kelas Excel untuk admin, mulai Senin.', [
      ['Subject: "Rekap mingguanmu bisa kelar 1 jam, mulai Senin"', 'Spesifik, ada manfaat.'],
      ['Pembuka: "Hai Rina, minggu lalu kamu download template rekap kami."', 'Personal, nyambung ke tindakan dia.'],
      ['Isi: 1 masalah + 1 manfaat + bukti singkat', '"Alumni kelas ini rata-rata hemat 3 jam tiap minggu."'],
      ['CTA: tombol "Amankan kursimu, sisa 40"', 'Kata kerja + alasan sekarang (jujur).'],
    ])],
    perkaya: { 1: al('Kata kerja + alasan bertindak.', 'Ga jelas ngapain.', 'Kaku dan ga ada manfaat.', 'Ga ada alasan.') },
    akhir: [RK('Kartu contekan CTA dan email', [['CTA', 'kata kerja + manfaat (+ batas waktu jujur)'], ['Subject', 'spesifik'], ['Pembuka', 'personal'], ['Isi', 'satu pesan utama'], ['Satu email', 'satu CTA']])],
  })

  // ================= AKUNTANSI =================
  perdalam('AK', 'persamaan', {
    sisip: [C('Transaksi ngubah persamaan', 'Toko baru. Lacak persamaan Aset = Liabilitas + Ekuitas.', [
      ['Pemilik setor modal 50 juta tunai', 'Kas +50 | Modal +50. 50 = 0 + 50.'],
      ['Pinjam bank 20 juta', 'Kas +20 | Utang bank +20. 70 = 20 + 50.'],
      ['Beli peralatan tunai 15 juta', 'Kas −15, Peralatan +15. Aset totalnya tetap 70. 70 = 20 + 50.'],
      ['Dapet pendapatan jasa 5 juta tunai', 'Kas +5 | Ekuitas +5 (lewat laba). 75 = 20 + 55.'],
    ], { penutup: 'Tiap transaksi selalu nyentuh minimal dua akun, dan kiri-kanan tetap seimbang.' })],
    perkaya: { 3: { ...al('Aset (kas) dan ekuitas (modal) naik bareng.', 'Setoran modal bukan utang.', 'Kas justru masuk.', 'Dua akun berubah.'), jelas: 'Kas +10 juta (aset), Modal +10 juta (ekuitas). Persamaan tetap seimbang.' } },
    akhir: [RK('Kartu contekan persamaan', [['Aset = Liabilitas + Ekuitas', 'selalu seimbang'], ['Aset', 'kas, piutang, peralatan'], ['Liabilitas', 'utang'], ['Ekuitas', 'modal + laba'], ['Tiap transaksi', 'minimal 2 akun berubah']])],
  })
  perdalam('AK', 'jurnal', {
    sisip: [C('Nyusun jurnal', 'Transaksi: jual jasa desain 8 juta, dibayar 3 juta tunai, sisanya nanti.', [
      ['Akun yang kena: Kas, Piutang, Pendapatan Jasa', 'Identifikasi dulu.'],
      ['Kas bertambah 3 juta → Debit Kas 3 juta', 'Aset nambah di debit.'],
      ['Piutang bertambah 5 juta → Debit Piutang 5 juta', 'Hak nagih = aset.'],
      ['Pendapatan bertambah 8 juta → Kredit Pendapatan Jasa 8 juta', 'Pendapatan nambah di kredit.'],
      ['Cek: debit 3 + 5 = kredit 8 ✓', 'Total debit wajib sama dengan total kredit.'],
    ])],
    perkaya: {
      1: { ...al('Kas (aset) nambah di debit, pendapatan nambah di kredit.', 'Kebalik.', 'Pendapatan bukan setoran modal.', 'Kas masuk, bukan keluar, dan ga ada piutang.'), jelas: 'Kas bertambah → debit. Pendapatan bertambah → kredit.' },
      2: { ...al('Peralatan (aset) nambah, utang nambah karena belum dibayar.', 'Dibelinya kredit, kas belum keluar.', 'Kebalik.', 'Peralatan itu aset, bukan beban.'), jelas: 'Peralatan bertambah → debit. Utang usaha bertambah → kredit.' },
      3: al('Utang berkurang (debit), kas berkurang (kredit).', 'Kebalik.', 'Bayar utang bukan beban.', 'Ga ada hubungan sama modal.'),
    },
    akhir: [RK('Kartu contekan debit kredit', [['Debit nambah', 'Aset, Beban'], ['Kredit nambah', 'Liabilitas, Ekuitas, Pendapatan'], ['Langkah', 'akun apa → nambah/kurang → sisi mana'], ['Cek', 'total debit = total kredit']])],
  })
  perdalam('AK', 'siklus', {
    sisip: [C('Satu transaksi ngelewatin siklus', 'Nota beli ATK Rp500 ribu tunai.', [
      ['Bukti: nota toko', 'Dasar pencatatan.'],
      ['Jurnal: Debit Beban ATK 500rb, Kredit Kas 500rb', 'Dicatat berurutan tanggal.'],
      ['Buku besar: masuk ke akun Beban ATK dan akun Kas', 'Dikumpulin per akun biar ketauan saldonya.'],
      ['Neraca saldo: semua saldo akun dijejerin, total debit = kredit?', 'Kalau beda, ada salah catat.'],
      ['Laporan: Beban ATK masuk laba rugi, Kas masuk neraca', 'Hasil akhir.'],
    ])],
    perkaya: { 2: al('Alat kontrol keseimbangan.', 'Laba dihitung di laporan laba rugi.', 'Bukan fungsi neraca saldo.', 'Itu jurnal.') },
    akhir: [RK('Kartu contekan siklus', [['1', 'bukti transaksi'], ['2', 'jurnal umum'], ['3', 'buku besar'], ['4', 'neraca saldo'], ['5', 'penyesuaian'], ['6', 'laporan keuangan'], ['7', 'jurnal penutup']])],
  })
  perdalam('AK', 'penyesuaian', {
    sisip: [C('Penyesuaian sewa dibayar di muka', '1 Januari bayar sewa setahun Rp24 juta. Dicatat awal: Debit Sewa Dibayar di Muka 24 juta, Kredit Kas 24 juta.', [
      ['Akhir Januari: udah kepakai 1 bulan', '24 juta ÷ 12 = 2 juta jadi beban.'],
      ['Jurnal penyesuaian: Debit Beban Sewa 2 juta, Kredit Sewa Dibayar di Muka 2 juta', 'Pindahin yang kepakai dari aset ke beban.'],
      ['Sisa aset Sewa Dibayar di Muka = 22 juta', 'Masih jadi hak 11 bulan ke depan.'],
      ['Tanpa penyesuaian', 'Laba Januari kelihatan terlalu besar dan aset terlalu besar.'],
    ])],
    perkaya: { 3: al('Akumulasi penyusutan = akun pengurang aset (kontra aset).', 'Penyusutan ga ngeluarin kas.', 'Kebalik dan pakai kas.', 'Wajib dicatat tiap periode.') },
    akhir: [RK('Kartu contekan penyesuaian', [['Dibayar di muka', 'pindah ke beban sesuai yang kepakai'], ['Penyusutan', '(harga − sisa) ÷ umur'], ['Jurnal penyusutan', 'D Beban Penyusutan, K Akumulasi'], ['Masih harus dibayar', 'D Beban, K Utang'], ['Tujuan', 'laporan sesuai periodenya']])],
  })
  perdalam('AK', 'laporan', {
    sisip: [C('Nyusun laba rugi sederhana', 'Toko kopi bulan Oktober: penjualan 150 juta, HPP 90 juta, gaji 20 juta, sewa 10 juta, listrik 5 juta.', [
      ['Laba kotor = 150 − 90 = 60 juta', 'Penjualan dikurangi HPP.'],
      ['Beban operasional = 20 + 10 + 5 = 35 juta', 'Jumlahin beban rutin.'],
      ['Laba sebelum pajak = 60 − 35 = 25 juta', 'Laba kotor dikurangi beban operasional.'],
      ['Margin laba = 25 ÷ 150 ≈ 16,7%', 'Bonus: ukuran efisiensi.'],
    ])],
    perkaya: { 3: al('Penjualan kredit = laba diakui, kas belum masuk.', 'Belum tentu salah hitung.', 'Beban kecil malah bikin laba gede, bukan kas tipis.', 'Aset banyak bukan penyebab langsung.') },
    akhir: [RK('Kartu contekan laporan', [['Laba rugi', 'satu periode: pendapatan − beban'], ['Neraca', 'satu tanggal: aset = liabilitas + ekuitas'], ['Arus kas', 'operasi, investasi, pendanaan'], ['Laba kotor', 'penjualan − HPP'], ['Laba ≠ kas', 'karena penjualan kredit, dll']])],
  })
  perdalam('AK', 'rasio', {
    sisip: [C('Cek kesehatan perusahaan', 'Data: aset lancar 400 juta, liabilitas lancar 250 juta, total utang 600 juta, ekuitas 400 juta, laba bersih 60 juta, pendapatan 800 juta.', [
      ['Current ratio = 400 ÷ 250 = 1,6', 'Di atas 1: aset lancar cukup buat bayar utang jangka pendek.'],
      ['Debt to equity = 600 ÷ 400 = 1,5', 'Utang 1,5 kali modal. Cukup tinggi, tergantung industri.'],
      ['Net profit margin = 60 ÷ 800 = 7,5%', 'Tiap Rp100 penjualan jadi laba Rp7,5.'],
      ['ROE = 60 ÷ 400 = 15%', 'Imbal hasil buat pemilik modal.'],
    ])],
    perkaya: { 3: al('Struktur modal banyak dari utang, risiko lebih tinggi.', 'Belum tentu, tergantung kemampuan bayar.', 'Ga ada hubungan langsung.', 'Ga ada hubungan langsung.') },
    akhir: [RK('Kartu contekan rasio', [['Current ratio', 'aset lancar ÷ liabilitas lancar'], ['Debt to equity', 'utang ÷ ekuitas'], ['Net profit margin', 'laba bersih ÷ pendapatan'], ['ROE', 'laba bersih ÷ ekuitas'], ['Bandingin', 'sama industri sejenis']])],
  })

  // ================= UI/UX =================
  perdalam('UX', 'prinsip', {
    sisip: [C('Benerin layar checkout', 'Layar checkout punya tombol "Bayar" dan "Batal" sama besar dan sama warna, teks harga abu-abu tipis.', [
      ['Hierarki: tombol Bayar besar dan berwarna, Batal jadi link teks', 'Aksi utama paling menonjol.'],
      ['Kontras: harga total pakai teks gelap tebal', 'Info penting harus kebaca.'],
      ['Kedekatan: rincian ongkir ditaruh nempel di bawah subtotal', 'Yang berhubungan dideketin.'],
      ['Konsistensi: tombol utama di semua halaman pakai warna yang sama', 'Pengguna ga perlu mikir ulang.'],
    ])],
    perkaya: { 2: { ...al('Kurangi beban di awal, sisanya bisa diisi belakangan.', 'Warna ga ngurangin beban isian.', 'Timer malah bikin stres.', 'Posisi tombol ga nyelesaiin panjangnya form.'), jelas: 'Masalahnya beban kognitif. Minta yang wajib aja dulu (progressive disclosure).' } },
    akhir: [RK('Kartu contekan prinsip desain', [['Hierarki', 'yang penting paling menonjol'], ['Kontras', 'beda yang jelas'], ['Kedekatan', 'yang berhubungan didekatkan'], ['Konsistensi', 'elemen sama, tampilan sama'], ['Form panjang', 'minta yang wajib dulu']])],
  })
  perdalam('UX', 'dt', {
    awal: [I('Design thinking: mulai dari orang, bukan dari ide', '<ol><li><b>Empathize</b>: pahami pengguna lewat wawancara dan observasi.</li><li><b>Define</b>: rumusin masalah yang tepat.</li><li><b>Ideate</b>: cari banyak ide, jangan langsung dinilai.</li><li><b>Prototype</b>: bikin versi kasar yang bisa dicoba.</li><li><b>Test</b>: uji ke pengguna, terus balik ke tahap sebelumnya kalau perlu.</li></ol><p>Prosesnya bolak-balik (iteratif), bukan garis lurus sekali jalan.</p>'), C('Design thinking buat aplikasi cari kos', 'Tim mahasiswa mau bikin aplikasi cari kos.', [
      ['Empathize: wawancara 5 mahasiswa baru', 'Ketemu: mereka takut foto kos beda sama aslinya.'],
      ['Define: "Mahasiswa baru butuh cara ngecek kondisi kos yang jujur karena foto iklan sering nipu."', 'Masalah, bukan solusi.'],
      ['Ideate: 15 ide, misal video call sama pemilik, review dari penghuni lama, verifikasi foto', 'Kuantitas dulu.'],
      ['Prototype: sketsa layar review penghuni di kertas', 'Murah dan cepat.'],
      ['Test: 5 mahasiswa nyoba, 4 bingung cari tombol review → balik ke prototype', 'Iterasi.'],
    ])],
    akhir: [RK('Kartu contekan design thinking', [['Empathize', 'pahami pengguna'], ['Define', 'rumusin masalah'], ['Ideate', 'banyak ide'], ['Prototype', 'versi kasar'], ['Test', 'uji, ulang kalau perlu'], ['Iteratif', 'bolak-balik itu normal']])],
  })
  perdalam('UX', 'riset', {
    sisip: [C('Ngubah pertanyaan menggiring', 'Draf pertanyaan wawancara buat aplikasi belanja sayur.', [
      ['❌ "Kamu pasti kesel kan belanja di pasar?"', 'Menggiring, udah nebak jawabannya.'],
      ['✅ "Ceritain terakhir kali kamu belanja sayur. Mulai dari mana?"', 'Terbuka, berdasarkan pengalaman nyata.'],
      ['❌ "Kamu bakal pakai aplikasi kami?"', 'Orang cenderung bilang iya biar sopan.'],
      ['✅ "Apa yang paling repot dari belanja mingguanmu?"', 'Nyari masalah asli.'],
    ])],
    perkaya: { 1: al('Terbuka, berdasarkan pengalaman nyata.', 'Menggiring ke jawaban "iya".', 'Nanya masa depan, jawabannya ga bisa dipercaya.', 'Menggiring.') },
    akhir: [RK('Kartu contekan riset', [['Pertanyaan terbuka', '"Ceritain terakhir kali…"'], ['Hindari', 'menggiring, nanya masa depan'], ['Persona', 'profil pengguna dari data'], ['Empathy map', 'says, thinks, does, feels']])],
  })
  perdalam('UX', 'define', {
    sisip: [C('Dari temuan ke problem statement', 'Temuan wawancara: fresh graduate buka 5 situs loker tiap hari, banyak loker ga cocok jurusan, capek nyaring.', [
      ['Pengguna: fresh graduate', 'Siapa.'],
      ['Kebutuhan: nemu loker yang cocok jurusan dengan cepat', 'Apa yang dia butuhin (bukan fitur).'],
      ['Insight: capek nyaring ratusan loker yang ga relevan', 'Kenapa.'],
      ['"Fresh graduate butuh cara cepat nemu loker yang cocok jurusan karena mereka capek nyaring ratusan loker yang ga relevan."', 'Gabungan. Belum nyebut solusi (AI, filter, dll).'],
    ])],
    perkaya: { 1: al('Fokus ke pengguna dan kebutuhannya.', 'Itu solusi, bukan masalah.', 'Preferensi kecil, bukan masalah inti.', 'Itu solusi teknologi.') },
    akhir: [RK('Kartu contekan define', [['Problem statement', '[pengguna] butuh [kebutuhan] karena [insight]'], ['Jangan', 'nyebut solusi di problem statement'], ['User journey', 'tahap + perasaan + pain point']])],
  })
  perdalam('UX', 'wireframe', {
    sisip: [C('Dari sketsa ke prototipe', 'Fitur "simpan loker favorit".', [
      ['Crazy Eights: 8 sketsa tombol simpan dalam 8 menit', 'Ikon bintang, swipe, tombol teks, dll.'],
      ['Pilih 2 ide terbaik, bikin wireframe abu-abu di Figma', 'Fokus ke posisi dan alur, bukan warna.'],
      ['Sambungin layar jadi prototipe yang bisa diklik', 'Daftar loker → detail → simpan → halaman favorit.'],
      ['Tes ke 5 orang, baru bikin mockup berwarna', 'Detail visual setelah alurnya terbukti jalan.'],
    ])],
    perkaya: { 2: al('Ubah ide di tahap murah.', 'Profesional itu dari alur yang jalan.', 'Bukan alasannya.', 'Figma ga mewajibkan.') },
    akhir: [RK('Kartu contekan wireframe', [['Crazy Eights', '8 ide, 8 menit'], ['Wireframe', 'kerangka abu-abu'], ['Prototipe', 'bisa diklik buat dites'], ['Mockup', 'tampilan final'], ['Urutan', 'murah dulu, detail belakangan']])],
  })
  perdalam('UX', 'usability', {
    sisip: [C('Ngejalanin usability test', 'Tes prototipe aplikasi pesan kopi ke 5 orang.', [
      ['Tugas: "Pesen es kopi susu ukuran besar, bayar pakai e-wallet."', 'Kasih tujuan, jangan kasih tau caranya.'],
      ['Minta think aloud: "Ceritain apa yang kamu pikirin sambil nyoba."', 'Biar ketauan kebingungannya.'],
      ['Moderator diam dan catat: di mana ragu, salah klik, berapa lama', 'Jangan bantuin.'],
      ['Rangkum: 4 dari 5 ga nemu pilihan ukuran → prioritas perbaikan', 'Masalah yang dialami banyak orang duluan.'],
    ])],
    perkaya: { 1: al('Biar masalah aslinya keliatan.', 'Ngerusak data tes.', 'Ga perlu, justru ini temuan.', 'Bikin peserta ngerasa bodoh.') },
    akhir: [RK('Kartu contekan usability', [['Tugas', 'tujuan, bukan langkah'], ['Think aloud', 'peserta cerita sambil nyoba'], ['Moderator', 'diam, catat, jangan bantu'], ['5 peserta', 'cukup nemuin masalah utama'], ['Heuristik', 'status, kontrol/undo, konsisten, cegah error']])],
  })

  // ================= MANAJEMEN PROYEK =================
  perdalam('PM', 'smart', {
    sisip: [C('Ngubah target jadi SMART', 'Target awal: "Mau dapet kerja."', [
      ['Specific: "Dapet posisi data analyst junior."', 'Jelas posisinya.'],
      ['Measurable: "Kirim 5 lamaran yang disesuaikan per minggu."', 'Bisa dihitung. Hasil kerja (dapet kerja) ga sepenuhnya di kendalimu, jadi ukur usahanya juga.'],
      ['Achievable + Relevant: "Sesuai skill SQL dan Python yang udah aku punya."', 'Realistis dan nyambung.'],
      ['Time-bound: "Selama Desember sampai Februari."', 'Ada batas waktu.'],
    ])],
    perkaya: { 1: { ...al('Spesifik, terukur, ada waktunya.', 'Ga terukur.', 'Ga spesifik dan ga ada ukuran.', 'Ga terukur dan ga realistis.'), jelas: 'Ada jumlah (5), jenis (disesuaikan), frekuensi (tiap minggu), dan periode (Desember).' } },
    akhir: [RK('Kartu contekan SMART', [['S', 'spesifik'], ['M', 'terukur'], ['A', 'bisa dicapai'], ['R', 'relevan'], ['T', 'ada tenggat'], ['Tips', 'ukur juga usaha, bukan cuma hasil']])],
  })
  perdalam('PM', 'prioritas', {
    sisip: [C('Ngisi matriks Eisenhower', 'Senin pagi, daftar tugasmu: laporan klien (jam 11), belajar Power BI, balas chat grup alumni, rapikan folder lama.', [
      ['Laporan klien jam 11 → penting + mendesak', 'Kerjain sekarang.'],
      ['Belajar Power BI → penting, ga mendesak', 'Jadwalin, misal tiap malam 30 menit. Kuadran ini yang paling sering kelupaan padahal paling ngaruh ke karier.'],
      ['Chat grup alumni → mendesak (notif terus), ga penting', 'Batasi waktunya atau balas nanti.'],
      ['Rapikan folder lama → ga penting, ga mendesak', 'Tinggalin dulu.'],
    ])],
    akhir: [RK('Kartu contekan prioritas', [['Penting + mendesak', 'kerjain'], ['Penting', 'jadwalin'], ['Mendesak', 'delegasiin/batasi'], ['Ga dua-duanya', 'tinggalin'], ['Sprint', 'periode kerja pendek'], ['Backlog', 'daftar kerjaan']])],
  })
  perdalam('PM', 'wbs', {
    sisip: [C('WBS acara webinar', 'Proyek: webinar karier 200 peserta.', [
      ['Level 1: Webinar karier', 'Proyeknya.'],
      ['Level 2: Materi · Promosi · Teknis · Hari H', 'Deliverable utama.'],
      ['Level 3 (Promosi): poster · caption · email undangan · form daftar', 'Dipecah lagi.'],
      ['Level 4 (form daftar): bikin Google Form → tes → sebar link', 'Tugas kecil, jelas PIC dan tenggatnya, bisa selesai 1 sampai 2 hari.'],
    ])],
    perkaya: { 2: al('Ga jelas kapan selesai dan siapa ngerjain.', 'Udah cukup kecil.', 'Udah cukup kecil.', 'Udah cukup kecil.') },
    akhir: [RK('Kartu contekan WBS', [['WBS', 'pecah proyek jadi deliverable lalu tugas'], ['Tugas terkecil', 'selesai dalam hitungan hari'], ['Tiap tugas', 'ada PIC dan tenggat'], ['Terlalu besar', '"sukseskan acara"']])],
  })
  perdalam('PM', 'jalurkritis', {
    sisip: [C('Nyari jalur kritis', 'Tugas: A desain (2 hari) → B coding (5 hari) → D testing (2 hari). C konten (3 hari) bisa jalan setelah A, dan D butuh B dan C selesai.', [
      ['Jalur A–B–D = 2 + 5 + 2 = 9 hari', 'Hitung tiap jalur.'],
      ['Jalur A–C–D = 2 + 3 + 2 = 7 hari', 'Jalur kedua.'],
      ['Jalur kritis = A–B–D (9 hari)', 'Yang terpanjang nentuin durasi proyek.'],
      ['Slack C = 9 − 7 = 2 hari', 'C boleh telat 2 hari tanpa ngundur proyek. B ga boleh telat sama sekali.'],
    ])],
    perkaya: { 2: al('Ada di jalur yang lebih pendek.', 'A di dua jalur, termasuk jalur kritis.', 'B di jalur kritis.', 'D di jalur kritis.') },
    akhir: [RK('Kartu contekan jadwal', [['Gantt', 'tugas sebagai batang waktu'], ['Ketergantungan', 'B mulai setelah A'], ['Jalur kritis', 'rangkaian terpanjang'], ['Slack', 'kelonggaran tugas di luar jalur kritis'], ['Telat di jalur kritis', 'proyek ikut telat']])],
  })
  perdalam('PM', 'scrum', {
    sisip: [C('Satu sprint 2 minggu', 'Tim bikin fitur dashboard penjualan.', [
      ['Sprint planning: PO bawa 5 item teratas backlog, tim milih 4 yang realistis', 'Komitmen sprint.'],
      ['Daily scrum 15 menit: kemarin ngapain, hari ini ngapain, ada hambatan?', 'Hambatan dicatat, Scrum Master bantu beresin.'],
      ['Sprint review: demo dashboard ke stakeholder, dapet masukan', 'Liat hasil nyata.'],
      ['Retrospective: "Testing selalu mepet di akhir" → coba testing tiap hari', 'Evaluasi cara kerja, bukan produknya.'],
    ])],
    akhir: [RK('Kartu contekan Scrum', [['Product Owner', 'prioritas backlog'], ['Scrum Master', 'fasilitator, buang hambatan'], ['Developers', 'ngerjain'], ['Planning → Daily → Review → Retro', 'urutan acara'], ['Review vs Retro', 'produk vs cara kerja']])],
  })
  perdalam('PM', 'risikopm', {
    sisip: [C('Risk register mini', 'Acara job fair kampus.', [
      ['Risiko: listrik mati. Peluang 2, dampak 4 → skor 8', 'Peluang × dampak (1 sampai 5).'],
      ['Respons: sewa genset (kurangi)', 'Turunin dampaknya.'],
      ['Risiko: pembicara batal. Peluang 3, dampak 4 → 12 (prioritas)', 'Skor tertinggi diurus duluan.'],
      ['Respons: siapin pembicara cadangan + rekaman materi (kurangi)', 'Ada PIC dan tenggat.'],
      ['RACI pembicara: R = sie acara, A = ketua panitia, C = dosen pembina, I = semua panitia', 'A cuma satu orang.'],
    ])],
    perkaya: { 2: al('Satu penanggung jawab akhir biar jelas.', 'Kalau semua yang tanggung jawab, ga ada yang tanggung jawab.', 'Klien biasanya Consulted/Informed.', 'Wajib ada.') },
    akhir: [RK('Kartu contekan risiko', [['Skor', 'peluang × dampak'], ['Hindari', 'ganti rencana'], ['Kurangi', 'turunin peluang/dampak'], ['Alihkan', 'asuransi, kontrak'], ['Terima', 'siapin cadangan'], ['RACI', 'Responsible, Accountable (1 orang), Consulted, Informed']])],
  })

  // ================= K3 =================
  perdalam('K3', 'bahaya', {
    sisip: [C('Bedain bahaya dan risiko', 'Gudang: ada tumpahan oli di lantai.', [
      ['Bahaya: oli licin', 'Sumber yang bisa bikin celaka.'],
      ['Risiko di gudang kosong malam hari: rendah', 'Peluang ada orang lewat kecil.'],
      ['Risiko di jalur forklift jam sibuk: tinggi', 'Peluang orang kepleset besar, dan akibatnya bisa parah.'],
      ['Tindakan: bersihin + rambu "lantai licin" + cari sumber bocor', 'Hilangin bahayanya, bukan cuma ngasih APD.'],
    ])],
    perkaya: { 3: al('APD cuma ngelindungin pemakai, bahaya masih ada.', 'Bukan soal harga.', 'APD wajib di area tertentu.', 'Gampang dibeli.') },
    akhir: [RK('Kartu contekan bahaya', [['Bahaya', 'sumber celaka'], ['Risiko', 'peluang × keparahan'], ['Jenis', 'fisika, kimia, biologi, ergonomi'], ['APD', 'benteng terakhir']])],
  })
  perdalam('K3', 'hirarc', {
    awal: [I('Hierarki pengendalian', '<p>Kalau ada bahaya, pengendaliannya dipilih dari yang <b>paling efektif</b>:</p><ol><li><b>Eliminasi</b>: hilangin sumbernya.</li><li><b>Substitusi</b>: ganti dengan yang lebih aman.</li><li><b>Rekayasa teknik</b>: pisahin orang dari bahaya (pagar mesin, ventilasi).</li><li><b>Administrasi</b>: SOP, izin kerja, rambu, rotasi.</li><li><b>APD</b>: helm, sarung tangan, masker.</li></ol><p>Makin ke bawah, makin bergantung ke perilaku manusia, jadi makin gampang gagal.</p>'), C('Ngendaliin debu gerinda', 'Bengkel: pekerja gerinda tiap hari, debunya bikin batuk.', [
      ['Eliminasi: bisa beli komponen jadi tanpa digerinda?', 'Kalau bisa, bahaya hilang total.'],
      ['Substitusi: ganti batu gerinda yang lebih sedikit debu', 'Kalau eliminasi ga mungkin.'],
      ['Rekayasa: pasang penghisap debu lokal', 'Debunya ditangkep di sumbernya.'],
      ['Administrasi: batasi durasi, jadwal rotasi', 'Kurangi paparan.'],
      ['APD: masker respirator dan kacamata', 'Tetap dipakai sebagai lapisan terakhir.'],
    ])],
    akhir: [RK('Kartu contekan HIRARC', [['Urutan', 'eliminasi · substitusi · rekayasa · administrasi · APD'], ['HIRARC', 'identifikasi bahaya, nilai risiko, kendalikan'], ['Skor', 'kemungkinan × keparahan'], ['Skor tinggi', 'prioritas']])],
  })
  perdalam('K3', 'regulasi', {
    sisip: [C('Ngecek perusahaan wajib SMK3 atau nggak', 'Pabrik garmen 80 karyawan, pakai mesin jahit dan bahan kimia pewarna.', [
      ['Cek jumlah pekerja: 80 (di bawah 100)', 'Syarat pertama belum kena.'],
      ['Cek tingkat bahaya: ada bahan kimia dan mesin', 'Kalau potensi bahayanya tinggi, tetap wajib.'],
      ['Kesimpulan: kemungkinan wajib karena potensi bahaya', 'PP 50/2012: minimal 100 pekerja ATAU potensi bahaya tinggi.'],
      ['Langkah: bentuk P2K3, susun kebijakan K3', 'Bagian dari penerapan SMK3.'],
    ])],
    perkaya: { 2: al('PP 50/2012 Pasal 5.', 'Terlalu kecil.', 'Terlalu besar.', 'Ada batasannya.') },
    akhir: [RK('Kartu contekan regulasi K3', [['UU 1/1970', 'keselamatan kerja'], ['PP 50/2012', 'SMK3'], ['Wajib SMK3', '≥ 100 pekerja atau bahaya tinggi'], ['P2K3', 'panitia K3'], ['ISO 45001', 'standar internasional']])],
  })
  perdalam('K3', 'apd', {
    sisip: [C('Milih APD buat satu pekerjaan', 'Ngecat ulang tangki di gudang, pakai cat berbasis pelarut, pakai tangga 2 meter.', [
      ['Bahaya kimia (uap pelarut)', 'Respirator dengan filter organik, bukan masker kain.'],
      ['Percikan cat ke mata', 'Kacamata pelindung.'],
      ['Kontak kulit', 'Sarung tangan tahan kimia.'],
      ['Ketinggian 2 meter', 'Cek aturan perusahaan, banyak yang wajibkan harness mulai 1,8 meter.'],
      ['Sebelum itu', 'Pertimbangin substitusi ke cat berbasis air.'],
    ])],
    perkaya: { 2: al('Bahayanya masih ada dan APD bisa gagal.', 'Bukan soal harga.', 'Bukan alasannya.', 'APD diatur hukum.') },
    akhir: [RK('Kartu contekan APD', [['Ketinggian', 'full body harness'], ['Bising', 'earplug/earmuff'], ['Gerinda', 'kacamata + pelindung wajah'], ['Kimia', 'sarung tangan + respirator yang sesuai'], ['Ingat', 'APD lapisan terakhir']])],
  })
  perdalam('K3', 'insiden', {
    sisip: [C('Kenapa near miss harus dilaporin', 'Seminggu ini 3 kali kunci pas jatuh dari scaffolding, ga ada yang kena.', [
      ['Klasifikasi: near miss', 'Ga ada cedera, tapi hampir.'],
      ['Piramida kecelakaan', 'Banyak near miss = tanda kecelakaan serius tinggal nunggu waktu.'],
      ['Cari penyebab: ga ada toe board dan tali pengikat alat', 'Unsafe condition.'],
      ['Tindakan: pasang toe board, wajibkan tool lanyard', 'Beresin sebelum ada yang kena.'],
    ])],
    akhir: [RK('Kartu contekan insiden', [['Near miss', 'hampir celaka'], ['Unsafe act', 'tindakan ga aman'], ['Unsafe condition', 'kondisi ga aman'], ['Piramida', 'banyak near miss → potensi kecelakaan besar'], ['Lapor', 'tanpa nyalahin orang']])],
  })
  perdalam('K3', 'jsa', {
    sisip: [C('JSA ganti lampu di plafon', 'Pekerjaan: ganti lampu di plafon gudang 4 meter.', [
      ['Langkah 1: siapin tangga → bahaya: tangga rusak', 'Kendali: cek tangga sebelum dipakai.'],
      ['Langkah 2: naik → bahaya: jatuh', 'Kendali: tangga dipegangin rekan, 3 titik kontak.'],
      ['Langkah 3: lepas lampu → bahaya: kesetrum', 'Kendali: matiin MCB, pasang tag LOTO.'],
      ['Langkah 4: pasang lampu baru → bahaya: pecahan kaca', 'Kendali: sarung tangan, kacamata.'],
    ])],
    akhir: [RK('Kartu contekan JSA', [['JSA', 'langkah · bahaya · kendali'], ['Izin kerja', 'hot work, ruang terbatas, ketinggian, listrik'], ['LOTO', 'kunci dan tag sumber energi'], ['Sebelum mulai', 'komunikasiin ke pekerja']])],
  })
  perdalam('K3', 'kebakaran', {
    sisip: [C('Ngadepin api kecil di pantry', 'Minyak goreng di wajan kebakar di pantry kantor.', [
      ['Kenali kelas: cairan mudah terbakar → kelas B', 'Jangan pakai air, minyak bisa nyiprat dan api membesar.'],
      ['Matiin kompor dan tutup wajan pakai penutup/kain basah', 'Putus oksigen dari segitiga api.'],
      ['Kalau masih menyala: APAR powder atau CO2, PASS', 'Pull, Aim ke pangkal, Squeeze, Sweep.'],
      ['Api membesar: tinggalin, bunyiin alarm, evakuasi', 'Keselamatan orang nomor satu.'],
    ])],
    perkaya: { 3: al('Air menghantarkan listrik.', 'CO2 aman buat listrik.', 'Ini justru langkah pertama yang bener.', 'Powder juga bisa buat kelas C.') },
    akhir: [RK('Kartu contekan kebakaran', [['Segitiga api', 'bahan bakar, oksigen, panas'], ['Kelas A/B/C/D', 'padat / cair-gas / listrik / logam'], ['PASS', 'Pull, Aim, Squeeze, Sweep'], ['Listrik', 'jangan air'], ['Api besar', 'evakuasi']])],
  })

  // ================= QC =================
  perdalam('QC', 'pdca', {
    sisip: [C('PDCA ngurangin produk penyok', 'Lini pengemasan: 3% produk penyok.', [
      ['Plan: catat jenis dan lokasi penyok 1 minggu, target turun ke 1,5%', 'Data dulu, target jelas.'],
      ['Do: ganti bantalan konveyor di 1 lini aja', 'Uji skala kecil.'],
      ['Check: lini uji turun ke 1,2%, lini lain tetap 3%', 'Bandingin pakai data.'],
      ['Act: pasang bantalan baru di semua lini, update SOP', 'Jadiin standar. Siklus mulai lagi buat masalah berikutnya.'],
    ])],
    akhir: [RK('Kartu contekan PDCA', [['Plan', 'masalah, data, target'], ['Do', 'uji kecil'], ['Check', 'ukur hasil'], ['Act', 'standarkan atau ulang'], ['% cacat', 'cacat ÷ total × 100%']])],
  })
  perdalam('QC', 'akar', {
    sisip: [C('5 Why sampai akar', 'Masalah: pengiriman ke pelanggan telat.', [
      ['Kenapa telat? Truk berangkat siang.', 'Gejala.'],
      ['Kenapa siang? Barang belum siap dimuat pagi.', ''],
      ['Kenapa belum siap? Picking di gudang lambat.', ''],
      ['Kenapa lambat? Lokasi barang ga ada label, petugas nyari manual.', ''],
      ['Kenapa ga ada label? Ga ada standar penataan gudang.', 'Akar: sistem, bukan "petugas malas". Solusinya 5S di gudang.'],
    ])],
    perkaya: { 3: al('120 dari 200 = 60%, penyebab terbesar.', 'Sumber daya terbatas, fokus dulu.', 'Kecil dampaknya.', 'Cuma 10%.') },
    akhir: [RK('Kartu contekan akar masalah', [['5 Why', 'tanya kenapa sampai ketemu sistem'], ['Akar', 'biasanya proses/standar, bukan orang'], ['Pareto', 'beresin penyebab terbesar dulu'], ['5S', 'Seiri, Seiton, Seiso, Seiketsu, Shitsuke']])],
  })
  perdalam('QC', 'tujuhalat', {
    sisip: [C('Pakai 3 alat berurutan', 'Pabrik keramik: banyak keluhan cacat.', [
      ['Check sheet: catat cacat per jenis 2 minggu', 'Retak 90, gompal 40, warna belang 20, lainnya 10.'],
      ['Pareto: urutin dari terbesar', 'Retak 56% dari total → fokus ke retak.'],
      ['Fishbone buat "retak": Man, Machine, Method, Material, Measurement, Environment', 'Ketemu dugaan: suhu tungku naik-turun (Machine), tanah liat terlalu basah (Material).'],
      ['Lanjut: scatter suhu vs jumlah retak', 'Buktiin dugaan pakai data.'],
    ])],
    perkaya: { 2: al('Bukan kategori 6M.', 'Termasuk 6M.', 'Termasuk 6M.', 'Termasuk 6M.') },
    akhir: [RK('Kartu contekan 7 alat QC', [['Check sheet', 'catat'], ['Histogram', 'sebaran'], ['Pareto', 'urutan penyebab'], ['Fishbone', 'akar per kategori'], ['Scatter', 'hubungan'], ['Control chart', 'stabil atau nggak'], ['Stratifikasi', 'pisah data per kelompok']])],
  })
  perdalam('QC', 'kontrol', {
    sisip: [C('Baca control chart', 'Berat kemasan gula: rata-rata 1.000 g, UCL 1.012 g, LCL 988 g. Sampel per jam: 1.003, 998, 1.005, 1.001, 1.014.', [
      ['Gambar garis tengah 1.000, UCL 1.012, LCL 988', 'Batas biasanya ±3 SD dari rata-rata.'],
      ['Sampel 1 sampai 4 di dalam batas, naik-turun acak', 'Variasi wajar (common cause).'],
      ['Sampel 5: 1.014 > UCL', 'Sinyal penyebab khusus (special cause).'],
      ['Tindakan: cek mesin pengisi jam itu', 'Jangan langsung ubah batasnya.'],
    ])],
    perkaya: { 1: al('Titik di luar batas = sinyal penyebab khusus.', 'Udah keluar batas.', 'Belum tentu, tapi tetap harus diselidiki.', 'Batas dihitung dari data, bukan diubah biar enak.'), 2: al('Pola run = pergeseran.', 'Spesifikasi bukan soal makin berat.', 'Pola juga sinyal walau dalam batas.', 'Datanya bisa aja bener.') },
    akhir: [RK('Kartu contekan control chart', [['CL', 'rata-rata'], ['UCL / LCL', '±3 SD'], ['Titik keluar batas', 'penyebab khusus'], ['7 sampai 8 titik sepihak', 'pergeseran proses'], ['Variasi acak', 'wajar']])],
  })
  perdalam('QC', 'limaes', {
    sisip: [C('5S di meja kerja admin', 'Meja penuh kertas, alat tulis berceceran.', [
      ['Seiri (ringkas): buang kertas yang ga dipakai, kasih label merah buat yang ragu', 'Pisahin perlu vs ga perlu.'],
      ['Seiton (rapi): tiap alat punya tempat tetap', 'Cari stapler ga sampai 30 detik.'],
      ['Seiso (resik): bersihin meja tiap sore', 'Sambil ngecek ada yang rusak.'],
      ['Seiketsu (rawat): foto kondisi ideal, tempel di meja', 'Standar yang keliatan.'],
      ['Shitsuke (rajin): cek 5 menit tiap Jumat', 'Jadi kebiasaan.'],
    ])],
    akhir: [RK('Kartu contekan 5S', [['Seiri', 'ringkas'], ['Seiton', 'rapi'], ['Seiso', 'resik'], ['Seiketsu', 'rawat'], ['Shitsuke', 'rajin'], ['Kaizen', 'perbaikan kecil terus-menerus']])],
  })
  perdalam('QC', 'dmaic', {
    sisip: [C('Ngitung DPMO', 'Formulir pendaftaran: 2.000 formulir, tiap formulir 4 kolom yang bisa salah isi, ketemu 40 kesalahan.', [
      ['Peluang cacat = 2.000 × 4 = 8.000', 'Unit × kesempatan per unit.'],
      ['Rasio cacat = 40 ÷ 8.000 = 0,005', ''],
      ['DPMO = 0,005 × 1.000.000 = 5.000', 'Cacat per sejuta kesempatan.'],
      ['Six Sigma nargetin 3,4 DPMO', 'Masih jauh, jadi masuk proyek Improve.'],
    ])],
    akhir: [RK('Kartu contekan DMAIC', [['Define', 'masalah, target'], ['Measure', 'data sekarang'], ['Analyze', 'akar penyebab'], ['Improve', 'uji solusi'], ['Control', 'jaga hasil'], ['DPMO', 'cacat ÷ (unit × kesempatan) × 1 juta']])],
  })

  // ================= ADMINISTRASI =================
  perdalam('AD', 'surat', {
    awal: [I('Surat resmi dan email kantor', '<p><b>Surat resmi</b> punya urutan tetap: kop, nomor/lampiran/perihal, tanggal, alamat tujuan, salam pembuka, isi, salam penutup + tanda tangan.</p><p><b>Email kantor</b> yang baik:</p><ul><li>Subjek jelas: <i>"Permohonan cuti 2 sampai 4 Desember – Rina"</i></li><li>Kalimat pertama langsung tujuan.</li><li>Cek lampiran sebelum kirim. Reply all cuma kalau semua perlu tau.</li><li>Balas dalam 1 hari kerja, walau cuma "sudah diterima, saya cek dulu".</li></ul>'), C('Email minta cuti', 'Minta cuti 3 hari ke atasan.', [
      ['Subjek: Permohonan cuti 2 sampai 4 Desember – Rina Lestari', 'Langsung kebaca isinya tanpa dibuka.'],
      ['"Yth. Pak Andi, saya mengajukan cuti tanggal 2 sampai 4 Desember 2026."', 'Kalimat pertama = tujuan.'],
      ['"Pekerjaan rekap mingguan sudah saya serahkan ke Dina, dan saya tetap bisa dihubungi untuk hal mendesak."', 'Kasih rencana serah terima biar atasan tenang.'],
      ['"Terima kasih atas pertimbangannya. Salam, Rina"', 'Penutup sopan.'],
    ])],
    perkaya: { 1: { ...al('Atasan langsung tau yang diminta.', 'Inti ketimbun.', 'Ga perlu dan kesannya ga percaya diri.', 'Buang waktu pembaca.'), jelas: 'Email kerja: inti dulu, detail belakangan.' } },
    akhir: [RK('Kartu contekan surat dan email', [['Surat', 'kop · nomor · tanggal · tujuan · salam · isi · tanda tangan'], ['Subjek email', 'spesifik'], ['Kalimat pertama', 'tujuan'], ['Lampiran', 'cek sebelum kirim'], ['Balas', '≤ 1 hari kerja']])],
  })
  perdalam('AD', 'notulen', {
    sisip: [C('Nulis notulen ringkas', 'Rapat 45 menit soal acara gathering.', [
      ['Kepala: Rapat Gathering · Senin 24 Nov 2026 · Peserta: Andi, Rina, Dina, Fajar', 'Identitas rapat.'],
      ['Agenda: lokasi, anggaran, susunan acara', 'Yang dibahas.'],
      ['Keputusan: lokasi Lembang, anggaran maks 25 juta', 'Bukan transkrip obrolan.'],
      ['Tindak lanjut: Rina survei 2 villa (Rabu 26 Nov); Fajar susun rundown (Jumat 28 Nov)', 'Siapa, ngapain, kapan.'],
    ])],
    perkaya: { 2: al('Siapa, ngapain, ke siapa, kapan.', 'Ga ada siapa dan kapan.', 'Ga ada tindakan.', 'Itu keputusan, bukan tindak lanjut.') },
    akhir: [RK('Kartu contekan notulen', [['Kepala', 'judul, tanggal, peserta'], ['Agenda', 'topik'], ['Keputusan', 'yang disepakati'], ['Tindak lanjut', 'siapa · ngapain · kapan'], ['Kirim', '≤ 1 hari setelah rapat']])],
  })
  perdalam('AD', 'suratdinas', {
    sisip: [C('Nyusun surat undangan rapat', 'Undangan rapat koordinasi ke kepala cabang.', [
      ['Nomor: 045/UND/HRD/XI/2026 · Lampiran: - · Perihal: Undangan Rapat Koordinasi', 'Format nomor biasanya urut/jenis/unit/bulan romawi/tahun.'],
      ['Yth. Kepala Cabang Bandung, di tempat', 'Alamat tujuan.'],
      ['"Dengan hormat, sehubungan dengan evaluasi kuartal IV, kami mengundang Bapak/Ibu pada:"', 'Pembuka.'],
      ['Hari/tanggal, waktu, tempat, agenda (dibikin poin)', 'Isi inti yang gampang dibaca.'],
      ['"Atas perhatian Bapak/Ibu, kami ucapkan terima kasih." + tanda tangan, nama jelas, jabatan', 'Penutup.'],
    ])],
    perkaya: { 2: al('Baku, diikuti koma.', 'Terlalu santai.', 'Huruf H ga kapital dan tanda seru ga tepat.', 'Ga wajib di semua surat dinas.') },
    akhir: [RK('Kartu contekan surat dinas', [['Urutan', 'kop · nomor · lampiran · perihal · tanggal · tujuan'], ['Salam pembuka', '"Dengan hormat,"'], ['Isi', 'pembuka · inti · penutup'], ['Penutup', 'tanda tangan + nama jelas + jabatan'], ['Tembusan', 'kalau ada pihak lain perlu tau']])],
  })
  perdalam('AD', 'arsipsistem', {
    sisip: [C('Nata folder arsip digital', 'Folder "Dokumen Kantor" isinya 300 file campur aduk.', [
      ['Bikin struktur subjek: 01_Keuangan, 02_SDM, 03_Kontrak, 04_Notulen', 'Nomor di depan biar urutannya tetap.'],
      ['Penamaan file: YYYY-MM-DD_Jenis_Topik', 'Contoh 2026-11-24_Notulen_Gathering.docx.'],
      ['Pisahin aktif vs inaktif', 'Dokumen lewat 1 tahun pindah ke folder Arsip_2025.'],
      ['Tulis aturan di file README di folder utama', 'Biar semua orang ngikutin.'],
    ])],
    perkaya: { 2: al('Tanggal di depan = urut otomatis.', 'Ga jelas versi dan tanggalnya.', 'Ga ada info sama sekali.', 'Terlalu umum.') },
    akhir: [RK('Kartu contekan arsip', [['Abjad', 'nama'], ['Kronologis', 'tanggal'], ['Numerik', 'nomor'], ['Subjek', 'topik'], ['Wilayah', 'lokasi'], ['Nama file', 'YYYY-MM-DD_Jenis_Topik']])],
  })
  perdalam('AD', 'tindaklanjut', {
    sisip: [C('Ngubah catatan jadi action item', 'Catatan mentah: "Proposal sponsor perlu dikirim, tanya Pak Arif, minggu ini."', [
      ['Siapa: Dina', 'Satu nama, bukan "tim".'],
      ['Ngapain: kirim draf proposal sponsor', 'Kata kerja yang jelas.'],
      ['Ke siapa: Pak Arif', ''],
      ['Kapan: Jumat 28 Nov', 'Tanggal pasti.'],
      ['"Dina kirim draf proposal sponsor ke Pak Arif, Jumat 28 Nov"', 'Hasil akhir. Bisa dicek minggu depan beres atau nggak.'],
    ])],
    perkaya: { 2: al('Siapa, ngapain, kapan.', 'Ga ada siapa dan kapan.', 'Ga ada tindakan.', 'Ga ada nama orang dan tenggat.') },
    akhir: [RK('Kartu contekan action item', [['Siapa', 'satu nama'], ['Ngapain', 'kata kerja jelas'], ['Kapan', 'tanggal pasti'], ['Notulen', 'keputusan + action item, bukan transkrip']])],
  })
  perdalam('AD', 'jadwal', {
    sisip: [C('Ngatur jadwal rapat lintas kota', 'Atasan di Jakarta mau rapat sama klien di Jayapura dan tim di Makassar.', [
      ['Zona waktu: Jakarta WIB, Makassar WITA (+1), Jayapura WIT (+2)', 'Tulis semua.'],
      ['Jam kerja bareng: 09.00 WIB = 10.00 WITA = 11.00 WIT', 'Cari jam yang masuk akal buat semua.'],
      ['Undangan: tulis jam di tiga zona + link meeting + agenda', 'Biar ga ada yang salah jam.'],
      ['Buffer 15 menit sebelum rapat berikutnya atasan', 'Antisipasi molor.'],
    ])],
    akhir: [RK('Kartu contekan jadwal', [['WIB → WITA', '+1 jam'], ['WIB → WIT', '+2 jam'], ['Undangan', 'jam semua zona + link + agenda'], ['Buffer', 'jeda antar rapat'], ['Bentrok', 'kabarin + usul solusi']])],
  })

  // Urutin semua kursus Dasar → Menengah → Mahir biar tombol Lanjut ngikutin level.
  Object.values(window.GAS_KURSUS).forEach(k => { k.pelajaran = window.GAS_DALAM.urutLevel(k.pelajaran) })
})()
