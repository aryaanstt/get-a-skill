// Materi per bidang: Digital Marketing, Copywriting, Akuntansi, UI/UX, Project Management, Administrasi.
window.GAS_KURSUS = window.GAS_KURSUS || {}
;(() => {
  window.GAS_KURSUS.DM = {
    tes: [
      { level: 'dasar', tanya: 'CTR itu dihitung dari…', opsi: ['Klik ÷ impresi', 'Biaya ÷ klik', 'Penjualan ÷ biaya', 'Impresi ÷ klik'], benar: 0 },
      { level: 'dasar', tanya: 'Tahap funnel paling atas biasanya tujuannya…', opsi: ['Awareness (orang jadi tau)', 'Pembelian', 'Loyalitas', 'Retur'], benar: 0 },
      { level: 'menengah', tanya: 'Biaya iklan 2 juta, pendapatan dari iklan 8 juta. ROAS-nya?', opsi: ['4x', '0,25x', '6x', '400x'], benar: 0 },
      { level: 'menengah', tanya: 'A/B test iklan yang bener itu…', opsi: ['Ubah satu hal, sisanya sama', 'Ubah gambar, teks, dan target sekaligus', 'Bandingin iklan bulan lalu vs sekarang', 'Pakai audiens berbeda'], benar: 0 },
    ],
    pelajaran: [
      { id: 'funnel', level: 'dasar', judul: 'Funnel pemasaran', menit: 5, langkah: [
        { t: 'info', judul: 'Dari ga kenal sampai langganan', isi: '<p><b>Awareness</b> → orang jadi tau brand kamu.<br><b>Consideration</b> → mulai bandingin dan cari info.<br><b>Conversion</b> → beli atau daftar.<br><b>Loyalty</b> → beli lagi dan ngerekomendasiin.</p><p>Tiap tahap butuh konten dan metrik yang beda.</p>' },
        { t: 'pasang', tanya: 'Pasangin konten dengan tahap funnel-nya.', pasangan: [['Video viral TikTok kenalin produk', 'Awareness'], ['Review perbandingan 3 produk', 'Consideration'], ['Promo checkout gratis ongkir', 'Conversion'], ['Program poin member', 'Loyalty']] },
        { t: 'urut', tanya: 'Susun perjalanan pembeli ini.', item: ['Liat iklan di Instagram', 'Buka profil dan baca review', 'Masukin ke keranjang', 'Checkout', 'Dapet voucher buat belanja lagi'] },
      ] },
      { id: 'metrik', level: 'dasar', judul: 'Metrik iklan: CTR, CPC, ROAS', menit: 7, langkah: [
        { t: 'info', judul: 'Empat angka yang paling sering ditanya', isi: '<p><b>CTR</b> = klik ÷ impresi × 100%<br><b>CPC</b> = biaya ÷ klik<br><b>Conversion rate</b> = pembelian ÷ klik × 100%<br><b>ROAS</b> = pendapatan dari iklan ÷ biaya iklan</p><p>Data kampanye: 50.000 impresi, 1.000 klik, 40 pembelian, biaya Rp2.000.000, pendapatan Rp8.000.000.</p>' },
        { t: 'angka', tanya: 'Berapa <b>CTR</b>-nya (persen)?', benar: 2, satuan: '%', jelas: '1.000 ÷ 50.000 = 0,02 = 2%' },
        { t: 'angka', tanya: 'Berapa <b>CPC</b>-nya (rupiah)?', benar: 2000, jelas: '2.000.000 ÷ 1.000 = Rp2.000 per klik' },
        { t: 'angka', tanya: 'Berapa <b>conversion rate</b>-nya (persen)?', benar: 4, satuan: '%', jelas: '40 ÷ 1.000 = 4%' },
        { t: 'angka', tanya: 'Berapa <b>ROAS</b>-nya (kali)?', benar: 4, satuan: 'x', jelas: '8.000.000 ÷ 2.000.000 = 4x. Tiap Rp1 iklan balik Rp4.' },
      ] },
    ],
  }

  window.GAS_KURSUS.CW = {
    tes: [
      { level: 'dasar', tanya: 'Kepanjangan AIDA?', opsi: ['Attention, Interest, Desire, Action', 'Ask, Inform, Deliver, Apply', 'Attract, Inspire, Do, Achieve', 'Audience, Idea, Design, Ads'], benar: 0 },
      { level: 'dasar', tanya: 'Mana yang termasuk benefit (bukan fitur)?', opsi: ['"Baterai tahan seharian, ga perlu bawa charger"', '"Baterai 5000 mAh"', '"Layar 6,5 inci"', '"RAM 8 GB"'], benar: 0 },
      { level: 'menengah', tanya: 'CTA yang paling kuat?', opsi: ['"Klaim diskon 30%, berlaku sampai Minggu"', '"Klik di sini"', '"Info lebih lanjut"', '"Terima kasih"'], benar: 0 },
      { level: 'menengah', tanya: 'Kerangka PAS itu…', opsi: ['Problem, Agitate, Solution', 'Price, Ads, Sales', 'Plan, Act, Share', 'Promo, Attention, Sell'], benar: 0 },
    ],
    pelajaran: [
      { id: 'aida', level: 'dasar', judul: 'Headline dan AIDA', menit: 6, langkah: [
        { t: 'info', judul: 'Tulisan yang bikin orang bertindak', isi: '<p><b>A</b>ttention: headline yang nyetop scroll.<br><b>I</b>nterest: kenapa ini relevan buat dia.<br><b>D</b>esire: bikin pengen (pakai benefit, bukan cuma fitur).<br><b>A</b>ction: ajakan yang jelas.</p><p class="tip">Fitur = apa produknya. Benefit = apa yang didapet pembeli.</p>' },
        { t: 'pasang', tanya: 'Pasangin kalimat caption dengan bagian AIDA-nya.', pasangan: [['"Capek bangun kesiangan tiap Senin?"', 'Attention'], ['"Lampu ini nyala pelan-pelan 30 menit sebelum alarm."', 'Interest'], ['"Bangun lebih seger tanpa kaget denger alarm."', 'Desire'], ['"Pesan sekarang, gratis ongkir sampai Jumat."', 'Action']] },
        { t: 'pasang', tanya: 'Ubah fitur jadi benefit.', pasangan: [['Tas anti air', 'Laptop tetap aman pas kehujanan'], ['Kopi tanpa ampas', 'Ga ada sisa pahit di dasar gelas'], ['Aplikasi offline', 'Tetap bisa dipakai di daerah susah sinyal'], ['Kain katun 30s', 'Adem dipakai seharian']] },
        { t: 'tulis', tanya: 'Tulis caption 3 sampai 4 kalimat pakai AIDA buat produk apa aja (misal botol minum).', minKata: 25, rubrik: ['Kalimat pertama bikin berhenti scroll', 'Ada benefit, bukan cuma fitur', 'Ada CTA yang jelas', 'Bahasanya cocok buat target pembacanya'], ai: 'Kasih feedback caption ini pakai kerangka AIDA. Sebutin bagian yang paling lemah dan kasih 2 versi headline alternatif:' },
      ] },
    ],
  }

  window.GAS_KURSUS.AK = {
    tes: [
      { level: 'dasar', tanya: 'Persamaan dasar akuntansi?', opsi: ['Aset = Liabilitas + Ekuitas', 'Aset = Pendapatan − Beban', 'Ekuitas = Aset + Liabilitas', 'Kas = Laba'], benar: 0 },
      { level: 'dasar', tanya: 'Perusahaan beli perlengkapan tunai. Kas…', opsi: ['Berkurang (dicatat di kredit)', 'Bertambah', 'Tetap', 'Dicatat di debit'], benar: 0 },
      { level: 'menengah', tanya: 'Laporan yang nunjukin pendapatan dan beban dalam satu periode?', opsi: ['Laba rugi', 'Neraca', 'Arus kas', 'Perubahan ekuitas'], benar: 0 },
      { level: 'menengah', tanya: 'Beli peralatan secara kredit dicatat…', opsi: ['Debit Peralatan, Kredit Utang Usaha', 'Debit Kas, Kredit Peralatan', 'Debit Utang, Kredit Peralatan', 'Debit Peralatan, Kredit Kas'], benar: 0 },
    ],
    pelajaran: [
      { id: 'persamaan', level: 'dasar', judul: 'Persamaan akuntansi', menit: 6, langkah: [
        { t: 'info', judul: 'Selalu seimbang', isi: '<p><b>Aset = Liabilitas + Ekuitas</b></p><p>Aset: yang dimiliki (kas, peralatan, piutang). Liabilitas: utang ke pihak lain. Ekuitas: modal pemilik + laba.</p><p>Tiap transaksi ngubah minimal dua akun, dan persamaannya harus tetap seimbang.</p>' },
        { t: 'pasang', tanya: 'Masukin akun ke kelompoknya.', pasangan: [['Kas', 'Aset'], ['Utang Bank', 'Liabilitas'], ['Modal Pemilik', 'Ekuitas'], ['Piutang Usaha', 'Aset '], ['Utang Gaji', 'Liabilitas '], ['Laba Ditahan', 'Ekuitas ']] },
        { t: 'angka', tanya: 'Aset 150 juta, liabilitas 60 juta. Ekuitasnya berapa juta?', benar: 90, satuan: 'juta', jelas: '150 − 60 = 90 juta.' },
        { t: 'pilih', tanya: 'Pemilik setor modal 10 juta tunai. Efeknya?', opsi: ['Kas +10 juta, Modal +10 juta', 'Kas +10 juta, Utang +10 juta', 'Kas −10 juta, Modal +10 juta', 'Ga ada yang berubah'], benar: 0 },
      ] },
      { id: 'jurnal', level: 'dasar', judul: 'Debit, kredit, dan jurnal', menit: 8, langkah: [
        { t: 'info', judul: 'Aturan saldo normal', isi: '<p><b>Debit</b> nambah: Aset dan Beban.<br><b>Kredit</b> nambah: Liabilitas, Ekuitas, dan Pendapatan.</p><p>Contoh: bayar gaji tunai 5 juta → Debit Beban Gaji 5 juta, Kredit Kas 5 juta.</p>' },
        { t: 'pilih', tanya: 'Terima pendapatan jasa tunai 3 juta. Jurnalnya?', opsi: ['Debit Kas, Kredit Pendapatan Jasa', 'Debit Pendapatan Jasa, Kredit Kas', 'Debit Kas, Kredit Modal', 'Debit Piutang, Kredit Kas'], benar: 0 },
        { t: 'pilih', tanya: 'Beli peralatan kantor secara kredit 12 juta. Jurnalnya?', opsi: ['Debit Peralatan, Kredit Utang Usaha', 'Debit Peralatan, Kredit Kas', 'Debit Utang Usaha, Kredit Peralatan', 'Debit Beban, Kredit Kas'], benar: 0 },
        { t: 'pilih', tanya: 'Bayar utang usaha 4 juta tunai. Jurnalnya?', opsi: ['Debit Utang Usaha, Kredit Kas', 'Debit Kas, Kredit Utang Usaha', 'Debit Beban, Kredit Utang', 'Debit Kas, Kredit Modal'], benar: 0, jelas: 'Utang berkurang (debit), kas berkurang (kredit).' },
        { t: 'pasang', tanya: 'Akun ini bertambah di sisi mana?', pasangan: [['Kas', 'Debit'], ['Pendapatan', 'Kredit'], ['Beban Listrik', 'Debit '], ['Utang Usaha', 'Kredit ']] },
      ] },
    ],
  }

  window.GAS_KURSUS.UX = {
    tes: [
      { level: 'dasar', tanya: 'Tahap pertama design thinking?', opsi: ['Empathize', 'Prototype', 'Test', 'Ideate'], benar: 0 },
      { level: 'dasar', tanya: 'Tombol utama sebaiknya…', opsi: ['Paling menonjol di layar', 'Sama warnanya dengan tombol lain', 'Kecil biar rapi', 'Disembunyiin di menu'], benar: 0 },
      { level: 'menengah', tanya: 'Usability testing yang baik itu…', opsi: ['Liat pengguna nyoba tanpa dibantu', 'Nanya "suka ga?"', 'Desainer nyoba sendiri', 'Nunggu rating di app store'], benar: 0 },
      { level: 'menengah', tanya: 'Wireframe itu…', opsi: ['Kerangka tata letak tanpa detail visual', 'Desain final warna-warni', 'Kode HTML', 'Logo produk'], benar: 0 },
    ],
    pelajaran: [
      { id: 'prinsip', level: 'dasar', judul: 'Prinsip desain dasar', menit: 6, langkah: [
        { t: 'info', judul: 'Empat prinsip yang paling kepakai', isi: '<p><b>Hierarki:</b> yang paling penting paling menonjol.<br><b>Kontras:</b> beda yang jelas antara elemen.<br><b>Kedekatan:</b> yang berhubungan ditaruh berdekatan.<br><b>Konsistensi:</b> elemen sama, tampilan sama.</p>' },
        { t: 'pasang', tanya: 'Masalah ini melanggar prinsip apa?', pasangan: [['Tombol "Bayar" sama kecil dengan link "Batal"', 'Hierarki'], ['Teks abu muda di atas latar putih', 'Kontras'], ['Label form jauh dari kolom isiannya', 'Kedekatan'], ['Tombol simpan biru di satu halaman, hijau di halaman lain', 'Konsistensi']] },
        { t: 'pilih', tanya: 'Form daftar 15 kolom bikin banyak orang berhenti di tengah. Perbaikan paling masuk akal?', opsi: ['Kurangi kolom ke yang wajib aja, sisanya diisi nanti', 'Tambah warna biar menarik', 'Kasih timer biar cepat', 'Pindahin tombol daftar ke atas'], benar: 0 },
      ] },
      { id: 'dt', level: 'dasar', judul: 'Design thinking', menit: 5, langkah: [
        { t: 'urut', tanya: 'Susun lima tahap design thinking.', item: ['Empathize: pahami pengguna', 'Define: rumusin masalahnya', 'Ideate: cari banyak ide', 'Prototype: bikin versi kasar', 'Test: uji ke pengguna'] },
        { t: 'pasang', tanya: 'Pasangin kegiatan dengan tahapnya.', pasangan: [['Wawancara 5 mahasiswa soal cara mereka nyari kos', 'Empathize'], ['"Mahasiswa baru susah bandingin harga kos yang jujur"', 'Define'], ['Brainstorm 20 ide dalam 15 menit', 'Ideate'], ['Sketsa layar di kertas', 'Prototype']] },
        { t: 'skenario', tanya: 'Pas uji coba, 4 dari 5 orang ga nemu tombol filter. Kamu…', opsi: [
          { teks: 'Ubah desain filternya terus uji lagi', skor: 2, ket: 'Itu gunanya test: nemu masalah lebih awal dan iterasi.' },
          { teks: 'Bikin tutorial biar orang tau', skor: 1, ket: 'Kadang perlu, tapi desain yang butuh tutorial biasanya bisa diperbaiki.' },
          { teks: 'Anggap pengujinya yang kurang teliti', skor: 0, ket: '4 dari 5 itu pola, bukan kebetulan.' },
        ] },
      ] },
    ],
  }

  window.GAS_KURSUS.PM = {
    tes: [
      { level: 'dasar', tanya: 'Huruf M di SMART artinya…', opsi: ['Measurable (terukur)', 'Mandatory', 'Monthly', 'Motivated'], benar: 0 },
      { level: 'dasar', tanya: 'Tugas penting tapi ga mendesak sebaiknya…', opsi: ['Dijadwalin', 'Dikerjain sekarang juga', 'Dibuang', 'Didelegasiin'], benar: 0 },
      { level: 'menengah', tanya: 'Di Scrum, rapat singkat harian disebut…', opsi: ['Daily stand-up', 'Sprint review', 'Retrospective', 'Kick-off'], benar: 0 },
      { level: 'menengah', tanya: 'Gantt chart dipakai buat…', opsi: ['Liat jadwal dan ketergantungan tugas', 'Hitung anggaran', 'Rekap absensi', 'Analisis pesaing'], benar: 0 },
    ],
    pelajaran: [
      { id: 'smart', level: 'dasar', judul: 'Target SMART', menit: 5, langkah: [
        { t: 'info', judul: 'Target yang bisa dicek', isi: '<p><b>S</b>pecific, <b>M</b>easurable, <b>A</b>chievable, <b>R</b>elevant, <b>T</b>ime-bound.</p><p>❌ "Mau jago Excel."<br>✅ "Selesaiin materi Excel Menengah dan bikin 1 dashboard penjualan sebelum 31 Desember."</p>' },
        { t: 'pilih', tanya: 'Target mana yang paling SMART?', opsi: ['"Kirim 5 lamaran yang disesuaikan tiap minggu selama Desember"', '"Rajin ngelamar kerja"', '"Dapet kerja secepatnya"', '"Ngelamar sebanyak-banyaknya"'], benar: 0 },
        { t: 'pasang', tanya: 'Bagian target ini masuk huruf SMART yang mana?', pasangan: [['"…5 lamaran…"', 'Measurable'], ['"…sebelum 31 Desember"', 'Time-bound'], ['"…lamaran posisi admin…"', 'Specific'], ['"…sesuai jurusan dan pengalamanku"', 'Relevant']] },
      ] },
      { id: 'prioritas', level: 'dasar', judul: 'Prioritas dan Scrum', menit: 7, langkah: [
        { t: 'info', judul: 'Matriks Eisenhower', isi: '<p><b>Penting + mendesak</b> → kerjain sekarang.<br><b>Penting, ga mendesak</b> → jadwalin.<br><b>Mendesak, ga penting</b> → delegasiin.<br><b>Ga penting, ga mendesak</b> → tinggalin.</p>' },
        { t: 'pasang', tanya: 'Masukin tugas ke kuadrannya.', pasangan: [['Laporan klien yang tenggatnya 2 jam lagi', 'Kerjain sekarang'], ['Belajar SQL buat tes bulan depan', 'Jadwalin'], ['Fotokopi berkas rapat sore ini', 'Delegasiin'], ['Scroll media sosial pas jam kerja', 'Tinggalin']] },
        { t: 'pasang', tanya: 'Pasangin istilah Scrum dengan artinya.', pasangan: [['Sprint', 'Periode kerja pendek, biasanya 1 sampai 4 minggu'], ['Backlog', 'Daftar kerjaan yang belum dikerjain'], ['Stand-up', 'Rapat harian 15 menit'], ['Retrospective', 'Evaluasi cara kerja tim di akhir sprint']] },
      ] },
    ],
  }

  window.GAS_KURSUS.AD = {
    tes: [
      { level: 'dasar', tanya: 'Bagian "Hal/Perihal" di surat resmi isinya…', opsi: ['Inti atau topik surat', 'Nama pengirim', 'Tanggal', 'Jumlah lampiran'], benar: 0 },
      { level: 'dasar', tanya: 'Subjek email kantor yang baik?', opsi: ['"Undangan Rapat Evaluasi Q3, Kamis 21 Nov 14.00"', '"Penting!!!"', '"Halo"', '(dikosongin)'], benar: 0 },
      { level: 'menengah', tanya: 'Notulen rapat wajib mencatat…', opsi: ['Keputusan, penanggung jawab, dan tenggat', 'Semua obrolan kata per kata', 'Menu konsumsi', 'Pendapat pribadi notulis'], benar: 0 },
      { level: 'menengah', tanya: 'Sistem arsip berdasarkan urutan tanggal disebut…', opsi: ['Kronologis', 'Abjad', 'Numerik', 'Geografis'], benar: 0 },
    ],
    pelajaran: [
      { id: 'surat', level: 'dasar', judul: 'Surat resmi dan email kantor', menit: 6, langkah: [
        { t: 'urut', tanya: 'Susun bagian surat resmi dari atas ke bawah.', item: ['Kop surat', 'Nomor, lampiran, dan perihal', 'Tanggal surat', 'Alamat tujuan', 'Salam pembuka', 'Isi surat', 'Salam penutup dan tanda tangan'] },
        { t: 'pilih', tanya: 'Email ke atasan buat minta persetujuan cuti. Baris pertama isinya sebaiknya…', opsi: ['Langsung tujuan: minta persetujuan cuti tanggal berapa sampai berapa', 'Cerita alasan panjang dulu', 'Permintaan maaf berkali-kali', 'Basa-basi soal cuaca'], benar: 0 },
        { t: 'banyak', tanya: 'Mana aja yang termasuk etika email kantor? (pilih semua)', opsi: ['Subjek jelas dan spesifik', 'Semua huruf kapital biar tegas', 'Cek lampiran sebelum kirim', 'Reply all buat semua hal', 'Balas dalam 1 hari kerja walau cuma "sudah diterima"'], benar: [0, 2, 4] },
      ] },
      { id: 'notulen', level: 'dasar', judul: 'Notulen dan arsip', menit: 6, langkah: [
        { t: 'info', judul: 'Notulen yang kepakai', isi: '<p>Isi minimal: tanggal, peserta, agenda, <b>keputusan</b>, dan <b>tindak lanjut</b> (siapa, ngapain, kapan). Kirim maksimal 1 hari setelah rapat.</p><p>Sistem arsip: <b>abjad</b> (nama), <b>numerik</b> (nomor), <b>kronologis</b> (tanggal), <b>subjek</b> (topik), <b>geografis</b> (wilayah).</p>' },
        { t: 'pasang', tanya: 'Pasangin dokumen dengan sistem arsip yang paling pas.', pasangan: [['Berkas pelamar kerja', 'Abjad'], ['Faktur bernomor urut', 'Numerik'], ['Laporan harian kantor cabang', 'Kronologis'], ['Data pelanggan per provinsi', 'Geografis']] },
        { t: 'pilih', tanya: 'Mana catatan tindak lanjut yang paling lengkap?', opsi: ['"Rina kirim draf anggaran ke Pak Andi, Jumat 22 Nov"', '"Anggaran akan dikirim"', '"Dibahas lagi nanti"', '"Semua setuju"'], benar: 0, jelas: 'Ada siapa, ngapain, ke siapa, kapan.' },
      ] },
    ],
  }
})()
