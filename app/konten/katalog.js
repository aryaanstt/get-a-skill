// Katalog Get a Skill: jalur karier, skill, pertanyaan onboarding, dan lencana.
window.GAS_KATALOG = {
  level: [
    { id: 'dasar', nama: 'Dasar', ket: 'Baru mulai atau belum pernah pakai' },
    { id: 'menengah', nama: 'Menengah', ket: 'Udah pernah pakai, mau lebih lancar' },
    { id: 'mahir', nama: 'Mahir', ket: 'Siap dipakai di tes kerja dan kerjaan nyata' },
  ],

  // Jalur karier. Tiap jalur = satu garis di Peta Karier, tiap skill = satu stasiun.
  jalur: [
    { id: 'data', nama: 'Data & Analitik', warna: '#0E9F9A', skill: ['EX', 'SQ', 'ST', 'VZ', 'PY'], ket: 'Data analyst, business analyst, BI' },
    { id: 'marketing', nama: 'Digital Marketing', warna: '#F2542D', skill: ['DM', 'CW', 'EX', 'VZ'], ket: 'Digital marketer, social media, content' },
    { id: 'keuangan', nama: 'Keuangan & Akuntansi', warna: '#D99A00', skill: ['AK', 'EX', 'ST', 'VZ'], ket: 'Staf akuntansi, finance, pajak, audit' },
    { id: 'admin', nama: 'Admin & Operasional', warna: '#5F8D3E', skill: ['AD', 'EX', 'KM', 'PM'], ket: 'Admin, operasional, sekretaris, GA' },
    { id: 'desain', nama: 'Desain & Kreatif', warna: '#D1307E', skill: ['UX', 'CW', 'KM', 'PM'], ket: 'UI/UX, desain grafis, content creator' },
    { id: 'teknologi', nama: 'Teknologi & IT', warna: '#3657F5', skill: ['EX', 'SQ', 'PY', 'PM'], ket: 'Programmer, IT support, QA' },
    { id: 'mt', nama: 'Management Trainee', warna: '#7B4DE0', skill: ['PS', 'EX', 'KM', 'PM', 'EN'], ket: 'MT, ODP, graduate program BUMN dan swasta' },
  ],
  // Garis wajib buat semua orang: persiapan ngelamar.
  siapKerja: { id: 'siap', nama: 'Siap Kerja', warna: 'var(--siap)', skill: ['CV', 'PS', 'IV', 'EN'] },

  skill: {
    EX: { pendek: 'Excel', nama: 'Excel & Spreadsheet', kategori: 'Hard skill', ringkas: 'Rumus, IF, LOOKUP, sampai pivot. Dipakai hampir semua kantor.', kenapa: 'Muncul di lebih banyak loker fresh graduate dibanding skill teknis lain, dari admin sampai analyst.' },
    SQ: { pendek: 'SQL', nama: 'SQL & Database', kategori: 'Hard skill', ringkas: 'Nanya ke database pakai query beneran, dicek otomatis.', kenapa: 'Syarat wajib hampir semua loker data, dan sering keluar di tes teknis.' },
    VZ: { pendek: 'Dashboard', nama: 'Visualisasi & Dashboard', kategori: 'Hard skill', ringkas: 'Milih grafik yang tepat, model data, konsep Power BI dan Tableau.', kenapa: 'Atasan jarang baca tabel. Yang dibaca grafik dan dashboard.' },
    ST: { pendek: 'Statistik', nama: 'Statistik Praktis', kategori: 'Hard skill', ringkas: 'Rata-rata, median, persen, A/B test, dan jebakan korelasi.', kenapa: 'Dasar buat ngambil keputusan pakai data, bukan feeling.' },
    PY: { pendek: 'Python', nama: 'Python untuk Data', kategori: 'Hard skill', ringkas: 'Logika dasar, pandas, groupby, dan merge.', kenapa: 'Bikin kerjaan berulang jadi otomatis dan bikin CV teknis lebih kuat.' },
    DM: { pendek: 'Digital Marketing', nama: 'Digital Marketing', kategori: 'Hard skill', ringkas: 'Funnel, metrik iklan (CTR, CPC, ROAS), dan strategi konten.', kenapa: 'Hampir semua bisnis butuh orang yang ngerti jualan online.' },
    CW: { pendek: 'Copywriting', nama: 'Copywriting', kategori: 'Hard skill', ringkas: 'Nulis caption, headline, dan pesan yang bikin orang bertindak.', kenapa: 'Dipakai di marketing, sales, HR, sampai bikin CV kamu sendiri.' },
    AK: { pendek: 'Akuntansi', nama: 'Akuntansi Dasar', kategori: 'Hard skill', ringkas: 'Persamaan akuntansi, debit kredit, jurnal, dan laporan keuangan.', kenapa: 'Bahasa bisnis. Berguna di finance, admin, bahkan buat buka usaha.' },
    UX: { pendek: 'UI/UX', nama: 'Desain UI/UX', kategori: 'Hard skill', ringkas: 'Prinsip desain, design thinking, dan cara mikir pakai sudut pandang pengguna.', kenapa: 'Skill kreatif yang dicari startup dan perusahaan digital.' },
    PM: { pendek: 'Manajemen Proyek', nama: 'Project Management', kategori: 'Soft skill', ringkas: 'Tujuan SMART, timeline, prioritas, dan Agile Scrum.', kenapa: 'Kerjaan apa pun pasti ada tenggat. Yang bisa ngatur proyek cepat dipercaya.' },
    AD: { pendek: 'Administrasi', nama: 'Administrasi Perkantoran', kategori: 'Hard skill', ringkas: 'Surat resmi, arsip, email kantor, dan notulen rapat.', kenapa: 'Pintu masuk paling banyak buat fresh graduate semua jurusan.' },
    KM: { pendek: 'Komunikasi', nama: 'Komunikasi & Presentasi', kategori: 'Soft skill', ringkas: 'Nyusun presentasi, ngomong jelas, dan ngadepin situasi kerja.', kenapa: 'Dinilai di interview, FGD, dan tiap hari pas kerja.' },
    PS: { pendek: 'Psikotes', nama: 'Psikotes & Logika', kategori: 'Persiapan kerja', ringkas: 'Deret angka, hitung cepat, silogisme, analogi, dan soal cerita.', kenapa: 'Tahap seleksi yang paling banyak ngegugurin pelamar MT dan BUMN.' },
    IV: { pendek: 'Interview', nama: 'Interview Kerja', kategori: 'Persiapan kerja', ringkas: 'Perkenalan diri, metode STAR, dan pertanyaan jebakan.', kenapa: 'CV bikin kamu dipanggil. Interview yang bikin kamu diterima.' },
    CV: { pendek: 'CV & LinkedIn', nama: 'CV ATS & LinkedIn', kategori: 'Persiapan kerja', ringkas: 'CV yang lolos mesin ATS dan profil LinkedIn yang dilirik rekruter.', kenapa: 'Banyak CV gugur sebelum dibaca manusia karena formatnya ga kebaca sistem.' },
    EN: { pendek: 'English', nama: 'Bahasa Inggris Kerja', kategori: 'Persiapan kerja', ringkas: 'Kosakata kantor, grammar buat interview, email profesional, dan latihan IELTS.', kenapa: 'Syarat MT, perusahaan multinasional, dan beasiswa.' },
  },

  onboarding: {
    status: [
      { id: 'kuliah', label: 'Masih kuliah', ket: 'Semester akhir, lagi siap-siap' },
      { id: 'baru', label: 'Baru lulus', ket: 'Kurang dari setahun' },
      { id: 'lama', label: 'Lulus 1 sampai 2 tahun', ket: 'Belum dapet kerja yang pas' },
      { id: 'pindah', label: 'Udah kerja', ket: 'Mau pindah bidang' },
    ],
    rumpun: ['Teknik', 'Sains & MIPA', 'Ekonomi & Bisnis', 'Sosial & Humaniora', 'Komputer & IT', 'Kesehatan', 'Seni & Desain', 'Pendidikan', 'Hukum', 'Pertanian & Lingkungan'],
    // Kalau belum tau mau ke mana: saran jalur dari rumpun jurusan.
    saranJalur: {
      'Teknik': ['mt', 'data'], 'Sains & MIPA': ['data', 'mt'], 'Ekonomi & Bisnis': ['keuangan', 'marketing'], 'Sosial & Humaniora': ['marketing', 'admin'],
      'Komputer & IT': ['teknologi', 'data'], 'Kesehatan': ['admin', 'mt'], 'Seni & Desain': ['desain', 'marketing'], 'Pendidikan': ['admin', 'marketing'],
      'Hukum': ['admin', 'mt'], 'Pertanian & Lingkungan': ['mt', 'data'],
    },
    cekSkill: ['EX', 'EN', 'PS', 'KM', 'IV', 'CV'],
    target: [
      { id: 10, label: '10 menit', ket: 'Santai', xp: 30 },
      { id: 20, label: '20 menit', ket: 'Serius', xp: 60 },
      { id: 30, label: '30 menit', ket: 'Ngebut', xp: 100 },
    ],
  },

  lencana: [
    { id: 'pertama', nama: 'Langkah Pertama', ket: 'Selesaiin pelajaran pertama' },
    { id: 'penempatan', nama: 'Tau Posisi', ket: 'Selesaiin satu tes penempatan' },
    { id: 'streak3', nama: 'Konsisten', ket: 'Belajar 3 hari berturut-turut' },
    { id: 'streak7', nama: 'Seminggu Penuh', ket: 'Belajar 7 hari berturut-turut' },
    { id: 'xp100', nama: '100 XP', ket: 'Kumpulin 100 XP' },
    { id: 'xp500', nama: '500 XP', ket: 'Kumpulin 500 XP' },
    { id: 'rumus', nama: 'Ahli Rumus', ket: 'Selesaiin semua latihan Excel level Menengah' },
    { id: 'query', nama: 'Pemecah Query', ket: 'Selesaiin semua latihan SQL level Menengah' },
    { id: 'sprint', nama: 'Otak Encer', ket: 'Dapet skor 12+ di sprint psikotes' },
    { id: 'interview', nama: 'Siap Ditanya', ket: 'Selesaiin 3 simulasi interview' },
    { id: 'kartu', nama: 'Ingatan Gajah', ket: 'Review 30 kartu' },
    { id: 'tiga', nama: 'Serba Bisa', ket: 'Mulai belajar 3 skill berbeda' },
  ],
}
