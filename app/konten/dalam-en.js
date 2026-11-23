// Bahasa Inggris kerja + IELTS versi dalam.
// Rujukan format: deskripsi resmi tes IELTS (British Council/IDP: jumlah soal, durasi, kriteria penilaian) dan materi grammar umum.
// Semua bacaan, naskah listening, soal, dan contoh jawaban DITULIS SENDIRI, bukan soal resmi.
;(() => {
  const { H, susun } = window.GAS_DALAM
  const { I, C, RK, P, PS, U, IS, W, L, T } = H
  const TFNG = (tanya, benar, alasan, jelas, o = {}) => {
    const urut = [benar, ...['TRUE', 'FALSE', 'NOT GIVEN'].filter(x => x !== benar)]
    return P(tanya, urut.map(x => [x, alasan[x] || '']), jelas, o)
  }

  const SEA = '<div class="bacaan"><p><b>Sea breezes</b></p><p>Coastal towns often enjoy a cooling wind on summer afternoons. During the day, land heats up faster than the sea, so the air above the land rises and cooler air from the sea flows in to replace it. This sea breeze usually begins in the late morning and can push several kilometres inland. In some tropical cities it lowers afternoon temperatures by three to five degrees. At night the pattern can reverse, producing a weaker land breeze that blows out towards the sea.</p></div>'
  const KABUT = '<div class="bacaan"><p><b>Fog at airports</b></p><p>Few weather events disrupt air travel as much as dense fog. Modern instrument landing systems allow many aircraft to land when visibility is below 200 metres, yet take-offs are often delayed because ground vehicles and staff must also move safely. Fog is most common on calm, clear nights after rain, when the ground cools quickly and moisture in the air condenses near the surface. Some airports now use detailed forecasts to warn airlines several hours in advance, which helps them reduce the number of cancelled flights.</p></div>'
  const NASKAH1 = ['Good afternoon, City Library. How can I help?', "Hi, I'd like to join the library. My name is Daniel Whitlock. That's W, H, I, T, L, O, C, K.", 'Thank you. And your phone number?', "It's 0 4 1 2, 5 5 8, 3 9 1.", 'Lovely. Our membership card costs six pounds, or four pounds for students.', "I'm a student, so four pounds then.", 'Great. You can collect the card on Tuesday. Oh, sorry, the office is closed on Tuesday this week, so please come on Wednesday instead.']

  const pelajaran = [
    // ================= DASAR =================
    L('vocab', 'dasar', 'Kosakata kerja yang sering muncul', 6, [
      { t: 'kartu', judul: 'Balik kartunya, tebak dulu artinya', kartu: [['Deliverable', 'Hasil kerja yang harus diserahkan'], ['Headcount', 'Jumlah karyawan'], ['KPI', 'Indikator kinerja utama'], ['Probation', 'Masa percobaan kerja'], ['Shift', 'Giliran kerja'], ['Benefit', 'Tunjangan di luar gaji'], ['Reimbursement', 'Penggantian biaya'], ['Overtime', 'Lembur']] },
      C('Kosakata di dalam kalimat', 'Kata lebih gampang nempel kalau diliat di kalimat nyata. Baca offering letter singkat ini.', [
        ['"Your probation period is three months."', '<b>Probation</b>: 3 bulan pertama kamu dinilai sebelum jadi karyawan tetap.'],
        ['"Overtime will be paid according to company policy."', '<b>Overtime</b>: lembur dibayar sesuai aturan perusahaan.'],
        ['"Travel expenses are eligible for reimbursement."', '<b>Reimbursement</b>: biaya perjalanan yang kamu bayar duluan bakal diganti.'],
        ['"Your main deliverable is a weekly sales dashboard."', '<b>Deliverable</b>: hasil kerja utama yang harus kamu serahkan tiap minggu.'],
      ]),
      PS('Pasangin istilah dengan artinya.', [['Probation', 'Masa percobaan'], ['Reimbursement', 'Penggantian biaya'], ['Overtime', 'Lembur'], ['Headcount', 'Jumlah karyawan']], 'Sering muncul di kontrak dan offering letter.'),
      P('"Our team\'s main <b>KPI</b> this quarter is customer retention." KPI di sini artinya...', [['Ukuran utama buat nilai kinerja tim', 'Key Performance Indicator.'], ['Nama proyek', 'Bukan nama.'], ['Anggaran tim', 'Anggaran = budget.'], ['Jadwal rapat', 'Bukan.']], 'KPI = angka yang dipakai buat ngukur berhasil atau nggak.'),
      RK('Kartu contekan kosakata kontrak', [['Probation', 'masa percobaan'], ['Overtime', 'lembur'], ['Reimbursement', 'penggantian biaya'], ['Benefit', 'tunjangan'], ['Deliverable', 'hasil kerja yang diserahkan'], ['KPI', 'indikator kinerja utama']]),
    ]),

    L('kosakata', 'dasar', 'Kosakata kantor sehari-hari', 6, [
      { t: 'kartu', judul: 'Balik kartunya, tebak dulu artinya', kartu: [['Deadline', 'Batas waktu'], ['Follow up', 'Menindaklanjuti'], ['Meeting minutes', 'Notulen rapat'], ['Stakeholder', 'Pihak yang berkepentingan'], ['Onboarding', 'Masa orientasi karyawan baru'], ['Workload', 'Beban kerja']] },
      C('Frasa kantor di chat kerja', 'Pesan dari atasan di Slack. Kita bedah satu-satu.', [
        ['"Can you loop me in on the email to the client?"', '<b>Loop me in</b> = masukin aku ke percakapan (biasanya CC).'],
        ['"Let\'s touch base tomorrow morning."', '<b>Touch base</b> = ngobrol singkat buat update.'],
        ['"Please circulate the meeting minutes by EOD."', '<b>Circulate</b> = sebarin. <b>EOD</b> = end of day, sebelum jam kerja selesai.'],
        ['"FYI, the deadline has been moved to Friday."', '<b>FYI</b> = for your information, sekadar info.'],
      ]),
      PS('Pasangin istilah dengan artinya.', [['Reimburse', 'Mengganti biaya yang udah dikeluarin'], ['Probation', 'Masa percobaan'], ['Headcount', 'Jumlah karyawan'], ['Handover', 'Serah terima kerjaan']]),
      P('"Could you <b>loop me in</b> on the email?" artinya…', [['Tolong ikutin aku (CC) di email itu', 'Loop in = masukin ke lingkaran percakapan.'], ['Tolong hapus aku dari email', 'Itu "take me off".'], ['Tolong baca ulang emailnya', 'Itu "proofread".'], ['Tolong kirim besok', 'Ga ada hubungannya sama waktu.']], 'Idiom kantor yang sering muncul di email dan chat.'),
      P('Atasan nulis "Please send it <b>by EOD</b>." Kamu harus kirim...', [['Sebelum jam kerja hari ini selesai', 'EOD = end of day.'], ['Besok pagi', 'Itu "by tomorrow morning".'], ['Akhir minggu', 'Itu EOW (end of week).'], ['Kapan aja', 'Ada batas waktunya.']], 'Singkatan: EOD, EOW, ASAP, FYI, OOO (out of office).'),
      RK('Kartu contekan frasa kantor', [['Loop me in', 'masukin ke percakapan'], ['Touch base', 'ngobrol singkat buat update'], ['EOD / EOW', 'akhir hari / minggu kerja'], ['FYI', 'sekadar info'], ['Follow up', 'menindaklanjuti'], ['Handover', 'serah terima']]),
    ]),

    L('tenses', 'dasar', 'Tiga tenses buat interview', 8, [
      I('Tiga tenses paling kepake', '<table class="tabel-mini"><tr><th>tense</th><th>dipakai buat</th><th>contoh</th></tr><tr><td><b>Present simple</b></td><td>fakta, kebiasaan, sifat</td><td>I <b>work</b> well under pressure.</td></tr><tr><td><b>Past simple</b></td><td>kejadian selesai di waktu tertentu (wajib di cerita STAR)</td><td>In 2025, I <b>led</b> a team of five.</td></tr><tr><td><b>Present perfect</b></td><td>pengalaman sampai sekarang, waktunya ga disebut</td><td>I <b>have used</b> Python for two years.</td></tr></table>'),
      I('Petunjuk kata waktu', '<ul><li><b>yesterday, last year, in 2024, two months ago</b> → past simple.</li><li><b>since, for, so far, already, ever, never</b> → present perfect.</li><li><b>usually, always, every day</b> → present simple.</li></ul><p class="tip">Kesalahan paling sering orang Indonesia: "I have graduated in 2025." Ada "in 2025" (waktu jelas), jadi harus <b>I graduated in 2025</b>.</p>'),
      C('Nentuin tense di jawaban interview', 'Pertanyaan: <i>"Tell me about your experience with data."</i> Kita susun 3 kalimat dan pilih tense-nya.', [
        ['I ___ (enjoy) working with data.', 'Sifat/fakta sekarang → present simple: <b>I enjoy working with data.</b>'],
        ['During my thesis, I ___ (analyse) ten years of rainfall data.', 'Kejadian selesai ("during my thesis") → past simple: <b>I analysed</b>.'],
        ['Since then, I ___ (complete) three dashboard projects.', '"Since then" = sampai sekarang → present perfect: <b>I have completed</b>.'],
      ], { penutup: 'Cek kata waktu di kalimatnya dulu, baru pilih tense.' }),
      P('Cerita proyek kuliah yang udah selesai: "I ___ a survey of 200 students."', [['conducted', 'Pengalaman selesai = past simple.'], ['conduct', 'Present simple buat kebiasaan, bukan cerita masa lalu.'], ['have conducting', 'Bentuk ini ga ada.'], ['am conduct', 'Salah bentuk.']], 'Cerita STAR = past simple.'),
      P('"I ___ Excel since 2023."', [['have used', 'Since + sampai sekarang = present perfect.'], ['use', 'Ga cocok sama "since".'], ['used', 'Past simple ga cocok sama "since".'], ['am using since', 'Bukan bentuk yang dipakai.']], 'Since/for = present perfect.'),
      P('Kalimat mana yang bener?', [['I graduated in 2025.', 'Waktu jelas = past simple.'], ['I have graduated in 2025.', 'Present perfect ga boleh pakai waktu spesifik.'], ['I graduate in 2025 last year.', 'Dobel keterangan dan tense salah.'], ['I was graduate in 2025.', 'Graduate di sini kata kerja, bukan kata sifat.']], 'Jebakan nomor satu.'),
      P('"Tell me about yourself." Kalimat pembuka paling pas?', [['"I am a recent Meteorology graduate with a strong interest in data analysis."', 'Langsung ke profil profesional.'], ['"I was born in..."', 'Terlalu jauh dan personal.'], ['"My hobby is sleeping."', 'Ga relevan.'], ['"I am very very hardworking."', 'Klise dan ga ada bukti.']], 'Profil profesional dulu.'),
      RK('Kartu contekan tenses', [['Present simple', 'fakta, kebiasaan: I work'], ['Past simple', 'selesai, waktu jelas: I led'], ['Present perfect', 'sampai sekarang: I have used'], ['yesterday, in 2024, ago', '→ past simple'], ['since, for, so far', '→ present perfect']]),
    ]),

    L('grammar', 'dasar', 'Grammar yang sering salah', 8, [
      I('Preposisi dan kata kerja pasangan', '<p>Bahasa Inggris punya pasangan tetap yang harus dihafal:</p><table class="tabel-mini"><tr><th>bener</th><th>sering salah</th></tr><tr><td>interested <b>in</b></td><td>interested on</td></tr><tr><td>responsible <b>for</b></td><td>responsible of</td></tr><tr><td>good <b>at</b></td><td>good in</td></tr><tr><td>experience <b>in/with</b></td><td>experience on</td></tr><tr><td><b>discuss</b> the plan</td><td>discuss about the plan</td></tr></table>'),
      I('Artikel dan bentuk jamak', '<ul><li><b>a/an</b> buat benda tunggal yang bisa dihitung, disebut pertama kali: <i>an internship</i>, <i>a report</i>.</li><li><b>the</b> buat yang udah jelas/spesifik: <i>the report I sent yesterday</i>.</li><li>Benda ga bisa dihitung ga pakai a/an dan ga dijamakin: <i>information</i>, <i>advice</i>, <i>equipment</i> (bukan informations).</li><li>Setelah angka lebih dari 1, jamak: <i>three years</i>.</li></ul>'),
      C('Benerin kalimat di cover letter', 'Kalimat asli: <i>"I am interested on this position because I have experience on data and I can discuss about it."</i>', [
        ['interested on → interested in', 'Pasangan tetap: interested <b>in</b>.'],
        ['experience on data → experience in data analysis', 'Experience pakai <b>in</b> (bidang) atau <b>with</b> (alat): experience with Python.'],
        ['discuss about it → discuss it', 'Discuss ga pakai about.'],
        ['"I am interested in this position because I have experience in data analysis and can discuss my projects in detail."', 'Hasil akhir. Lebih rapi dan spesifik.'],
      ]),
      IS('Lengkapi: "I am interested ___ this position."', 'in', 'interested in. Bukan on atau at.'),
      IS('Lengkapi: "I was responsible ___ the monthly report."', 'for', 'responsible for.'),
      P('Kalimat mana yang bener?', [['Could you give me some advice?', 'Advice ga bisa dihitung, ga pakai a/an dan ga dijamakin.'], ['Could you give me an advice?', 'Advice uncountable.'], ['Could you give me some advices?', 'Advice ga punya bentuk jamak.'], ['Could you give me advices?', 'Sama, salah.']], 'Uncountable: advice, information, equipment, feedback.'),
      P('Last semester, I ___ (lead) a campus event.', [['led', 'Last semester = waktu lampau jelas.'], ['have led', 'Ga cocok sama "last semester".'], ['lead', 'Bentuk sekarang.'], ['was lead', 'Salah bentuk.']], 'Kata waktu nentuin tense.'),
      RK('Kartu contekan grammar', [['interested in', 'bukan on'], ['responsible for', 'bukan of'], ['good at', 'bukan in'], ['discuss sth', 'tanpa about'], ['advice, information', 'ga dijamakin'], ['a/an', 'tunggal, disebut pertama kali']]),
    ]),

    // ================= MENENGAH =================
    L('email', 'menengah', 'Struktur email lamaran', 8, [
      I('Struktur email lamaran', '<ol><li><b>Subject</b> jelas: <i>Application for Data Analyst Intern – Full Name</i>.</li><li><b>Salam</b>: <i>Dear Hiring Team,</i> atau <i>Dear Ms. Tan,</i> kalau tau namanya.</li><li><b>Tujuan</b>: <i>I am writing to apply for…</i> + dapet info lowongannya dari mana.</li><li><b>Satu dua kalimat kenapa kamu cocok</b> (bukan copy CV).</li><li><b>Lampiran</b>: <i>I have attached my CV and portfolio.</i></li><li><b>Penutup</b>: <i>Thank you for your time and consideration.</i> + <i>Best regards,</i> + nama.</li></ol>'),
      C('Nyusun email lamaran', 'Lamaran ke posisi Data Analyst Intern yang kamu liat di LinkedIn.', [
        ['Subject: Application for Data Analyst Intern – Arya Pratama', 'Recruiter nyari email pakai nama posisi. Taruh di subject.'],
        ['Dear Hiring Team,\nI am writing to apply for the Data Analyst Intern position advertised on LinkedIn.', 'Langsung ke tujuan di kalimat pertama.'],
        ['In my final project, I analysed ten years of air quality data in Python and built a dashboard used by my supervisor.', 'Satu bukti konkret, bukan daftar sifat.'],
        ['I have attached my CV and portfolio for your review.\nThank you for your time and consideration.\n\nBest regards,\nArya Pratama', 'Lampiran, terima kasih, penutup standar.'],
      ]),
      U('Susun email lamaran singkat ini.', ['Subject: Application for Data Analyst Intern – [Full Name]', 'Dear Hiring Team,', 'I am writing to apply for the Data Analyst Intern position I found on LinkedIn.', 'I have attached my CV and portfolio for your review.', 'Thank you for your time and consideration.', 'Best regards, [Full Name]'], 'Subject, salam, tujuan, lampiran, terima kasih, penutup.'),
      P('Kalimat paling sopan buat nanya kabar lamaran?', [['"I would like to kindly follow up on my application submitted on 10 November."', 'Sopan, jelas, ada tanggalnya.'], ['"Why haven\'t you replied?"', 'Kesannya nyalahin.'], ['"Any update??"', 'Terlalu santai dan tanda tanya dobel.'], ['"Please answer me soon."', 'Kesannya maksa.']], 'Follow up wajar 1 sampai 2 minggu setelah kirim.'),
      RK('Kartu contekan email lamaran', [['Subject', 'posisi + nama lengkap'], ['Dear Hiring Team,', 'kalau ga tau nama'], ['I am writing to apply for…', 'kalimat pertama'], ['I have attached…', 'lampiran'], ['Best regards,', 'penutup aman']]),
    ]),

    L('emailen', 'menengah', 'Frasa email kerja', 7, [
      I('Frasa siap pakai', '<table class="tabel-mini"><tr><th>tujuan</th><th>frasa</th></tr><tr><td>Pembuka</td><td>I hope this email finds you well. / I am writing to…</td></tr><tr><td>Minta tolong</td><td>Could you please…? / Would you mind…?</td></tr><tr><td>Lampiran</td><td>Please find attached… / I have attached…</td></tr><tr><td>Konfirmasi</td><td>I am writing to confirm…</td></tr><tr><td>Minta maaf telat</td><td>Apologies for the late reply.</td></tr><tr><td>Penutup</td><td>I look forward to hearing from you. / Best regards,</td></tr></table>'),
      I('Santai vs formal', '<p>Bahasa Inggris formal biasanya lebih <b>panjang dan ga langsung</b>:</p><ul><li>Can you… → <b>Could you please…</b></li><li>I want… → <b>I would like…</b></li><li>Sorry → <b>I apologise</b> / Apologies</li><li>ASAP → <b>at your earliest convenience</b></li></ul>'),
      C('Ngubah email santai jadi profesional', 'Draf awal: <i>"Hi, sorry late. Can you send the data ASAP? I want to finish the report. Thanks!"</i>', [
        ['Dear Ms. Lim,', 'Salam formal kalau belum akrab.'],
        ['Apologies for the late reply.', 'Sorry late → apologies for the late reply.'],
        ['Could you please send me the sales data at your earliest convenience?', 'Can you → Could you please. ASAP → at your earliest convenience.'],
        ['I would like to finish the report by Friday.', 'I want → I would like. Tambah tenggat yang jelas.'],
        ['Thank you in advance.\nBest regards,\nArya', 'Penutup profesional.'],
      ]),
      PS('Pasangin tujuan dengan frasanya.', [['Ngasih lampiran', 'Please find attached the report.'], ['Minta tolong dengan sopan', 'Could you please confirm the schedule?'], ['Nutup email resmi', 'I look forward to hearing from you.'], ['Minta maaf telat bales', 'Apologies for the late reply.']], 'Frasa paling sering dipakai di email kantor.'),
      PS('Ganti versi santai dengan versi formal.', [['Sorry for the late reply', 'I apologise for the delayed response'], ['Can you send it?', 'Could you please send it?'], ['I want to ask', 'I would like to inquire'], ['Thanks a lot!', 'Thank you very much.']]),
      P('Penutup email paling umum dan aman?', [['Best regards,', 'Netral dan profesional.'], ['Love,', 'Buat keluarga/pasangan.'], ['Bye bye,', 'Terlalu santai.'], ['XOXO,', 'Sama sekali ga profesional.']], 'Alternatif: Kind regards, Sincerely.'),
      RK('Kartu contekan frasa email', [['Could you please…?', 'minta tolong'], ['Please find attached…', 'lampiran'], ['Apologies for…', 'minta maaf'], ['at your earliest convenience', 'secepatnya (sopan)'], ['I look forward to…', 'nunggu balasan']]),
    ]),

    L('meeting', 'menengah', 'Frasa rapat dan presentasi', 7, [
      I('Biar ga kaku pas meeting', '<table class="tabel-mini"><tr><th>situasi</th><th>frasa</th></tr><tr><td>Setuju</td><td>I agree with… / That makes sense.</td></tr><tr><td>Ga setuju sopan</td><td>I see your point, but… / I\'m not sure I agree, because…</td></tr><tr><td>Minta ulang</td><td>Could you repeat that, please?</td></tr><tr><td>Klarifikasi</td><td>Just to clarify, do you mean…?</td></tr><tr><td>Nyela sopan</td><td>Sorry to interrupt, but…</td></tr></table>'),
      I('Struktur presentasi singkat', '<p><i>Today I\'d like to talk about…</i> → <i>First,… Second,…</i> → <i>Let\'s move on to…</i> → <i>To sum up,…</i> → <i>I\'m happy to take any questions.</i></p><p>Kalau ga tau jawabannya: <i>That\'s a good question. I don\'t have the exact figure now, but I\'ll get back to you by tomorrow.</i></p>'),
      C('Ga setuju dengan sopan', 'Di meeting, rekan bilang: <i>"We should cut the marketing budget by half."</i> Kamu punya data yang bilang itu berisiko.', [
        ['I see your point about saving costs,', 'Akui dulu sudut pandangnya.'],
        ['but I\'m concerned it might affect our sales.', 'Sampein keberatan pakai "concerned", lebih halus dari "you\'re wrong".'],
        ['Last quarter, campaigns brought in 40% of new customers.', 'Kasih data.'],
        ['Could we look at reducing it by 20% first and review the results?', 'Tawarin jalan tengah dalam bentuk pertanyaan.'],
      ]),
      PS('Pasangin situasi dengan frasanya.', [['Ga denger jelas', 'Could you repeat that, please?'], ['Ga setuju dengan sopan', 'I see your point, but...'], ['Pindah ke poin berikutnya', 'Let\'s move on to the next point.'], ['Nyimpulin', 'To sum up, ...']], 'Bahasa rapat sehari-hari.'),
      P('Ditanya angka yang kamu ga tau pas presentasi. Respons terbaik?', [['"Good question. I don\'t have the exact figure, but I\'ll send it to you by tomorrow."', 'Jujur dan ada tindak lanjut.'], ['Ngarang angka', 'Kalau ketauan, kredibilitas hancur.'], ['"I don\'t know."', 'Jujur, tapi ga ada solusi.'], ['Pura-pura ga denger', 'Ga profesional.']], 'Jujur + janji tindak lanjut.'),
      RK('Kartu contekan rapat', [['I see your point, but…', 'ga setuju sopan'], ['Just to clarify…', 'klarifikasi'], ['Sorry to interrupt…', 'nyela'], ["Let's move on to…", 'pindah poin'], ['To sum up…', 'nyimpulin'], ["I'll get back to you", 'janji tindak lanjut']]),
    ]),

    L('ielts', 'menengah', 'Kenalan sama IELTS dan band score', 8, [
      I('Empat bagian, skor 0 sampai 9', '<table class="tabel-mini"><tr><th>bagian</th><th>durasi</th><th>isi</th></tr><tr><td>Listening</td><td>±30 menit</td><td>4 bagian, 40 soal</td></tr><tr><td>Reading</td><td>60 menit</td><td>3 bacaan, 40 soal</td></tr><tr><td>Writing</td><td>60 menit</td><td>Task 1 (≥ 150 kata), Task 2 (≥ 250 kata)</td></tr><tr><td>Speaking</td><td>11 sampai 14 menit</td><td>3 part, tatap muka</td></tr></table><p><b>Academic</b> buat kuliah dan beasiswa. <b>General Training</b> buat kerja/migrasi. Banyak beasiswa dan MT minta overall 6,5.</p>'),
      I('Cara overall dihitung', '<p>Overall = rata-rata 4 band, dibulatin ke 0,5 terdekat. Kalau ujungnya ,25 dibulatin naik ke ,5. Kalau ,75 naik ke angka bulat berikutnya.</p><p>Listening dan Reading dinilai dari jumlah benar (dari 40). Kira-kira 30 benar ≈ band 7 di Listening. Writing dan Speaking dinilai 4 kriteria, masing-masing bobotnya sama.</p>'),
      C('Ngitung overall band', 'Skor: Listening 7, Reading 6,5, Writing 6, Speaking 6,5.', [
        ['7 + 6,5 + 6 + 6,5 = 26', 'Jumlahin keempatnya.'],
        ['26 ÷ 4 = 6,5', 'Rata-ratanya pas 6,5, ga perlu dibulatin. Overall 6,5.'],
        ['Kalau Writing 5,5: 25,5 ÷ 4 = 6,375 → 6,5', '6,375 lebih dekat ke 6,5 daripada ke 6 (aturan ,25 ke atas dibulatin naik).'],
      ], { penutup: 'Banyak orang lemah di Writing. Naikin Writing 0,5 sering jadi penentu lolos 6,5.' }),
      PS('Pasangin bagian IELTS dengan durasinya.', [['Listening', '30 menit'], ['Reading', '60 menit'], ['Writing', '60 menit '], ['Speaking', '11 sampai 14 menit']]),
      { t: 'angka', tanya: 'Listening 6,5, Reading 7, Writing 5,5, Speaking 6. Overall band?', benar: 6.5, toleransi: 0.01, jelas: '(6,5 + 7 + 5,5 + 6) ÷ 4 = 25 ÷ 4 = 6,25 → dibulatin naik ke 6,5.' },
      P('Writing Task 2 minimal berapa kata?', [['250', 'Task 2 ≥ 250, Task 1 ≥ 150.'], ['150', 'Itu Task 1.'], ['300', 'Boleh lebih, minimalnya 250.'], ['200', 'Kurang.']], 'Kurang dari minimal kena penalti.'),
      { t: 'info', judul: 'Rute IELTS di course ini', isi: '<p>Setelah ini ada lima pelajaran IELTS: <b>Reading</b>, <b>Listening</b>, <b>Writing Task 1</b>, <b>Writing Task 2</b>, dan <b>Speaking</b>. Abis itu coba <a href="#ielts">Mock IELTS</a> lengkap pakai timer.</p>' },
      RK('Kartu contekan IELTS', [['L / R', '40 soal, dinilai jumlah benar'], ['W', 'Task 1 ≥ 150, Task 2 ≥ 250 kata'], ['S', '3 part, 11 sampai 14 menit'], ['Overall', 'rata-rata, dibulatin ke 0,5'], [',25 / ,75', 'dibulatin naik']]),
    ]),

    L('iereading', 'menengah', 'IELTS Reading: TRUE, FALSE, NOT GIVEN', 10, [
      I('Format Reading Academic', '<p>3 bacaan, 40 soal, 60 menit, <b>tanpa</b> waktu tambahan buat mindahin jawaban. Jenis soal: TRUE/FALSE/NOT GIVEN, matching headings, pilihan ganda, melengkapi kalimat (ada batas kata), matching information.</p><p>Strategi umum: baca soal dulu, <b>skim</b> bacaan 2 menit buat nangkep isi tiap paragraf, terus <b>scan</b> kata kunci (nama, angka, istilah) buat nemuin bagian yang relevan.</p>'),
      I('Logika TRUE / FALSE / NOT GIVEN', '<ul><li><b>TRUE</b>: bacaan bilang hal yang sama, biasanya pakai kata lain (parafrase).</li><li><b>FALSE</b>: bacaan bilang <b>kebalikannya</b> atau bertentangan.</li><li><b>NOT GIVEN</b>: bacaan ga ngomongin itu sama sekali, atau cuma nyinggung tanpa info yang ditanya.</li></ul><p class="tip">Perhatiin kata pembatas: <i>all, some, always, usually, only, more than</i>. Satu kata beda bisa ngubah TRUE jadi FALSE. Jangan pakai pengetahuan umummu, cuma isi bacaan.</p>'),
      C('Ngerjain T/F/NG bareng', SEA + 'Kita kerjain dua pernyataan.', [
        ['Pernyataan 1: "Land warms more quickly than water during the day."', 'Kata kunci: land, water, day. Scan: kalimat kedua.'],
        ['Bacaan: "During the day, land heats up faster than the sea"', 'warms more quickly = heats up faster, water = sea. Maknanya sama → <b>TRUE</b>.'],
        ['Pernyataan 2: "Sea breezes reduce air pollution in coastal cities."', 'Scan "pollution". Ga ada sama sekali. Bacaan cuma ngomongin suhu.'],
        ['→ NOT GIVEN', 'Walau secara logika angin bisa niup polusi, bacaan ga bilang. Jangan pakai pengetahuan sendiri.'],
      ]),
      TFNG(SEA + '"Sea breezes are strongest at night."', 'FALSE', { FALSE: 'Bacaan: sea breeze mulai late morning, dan malam polanya kebalik jadi land breeze. Bertentangan sama pernyataan.', TRUE: 'Bacaan ga pernah bilang sea breeze paling kuat di malam hari.', 'NOT GIVEN': 'Infonya ada: malam hari justru polanya berbalik.' }, 'Kalau bacaan bilang hal yang bertentangan, jawabannya FALSE, bukan NOT GIVEN.'),
      TFNG(SEA + '"The land breeze is usually stronger than the sea breeze."', 'FALSE', { FALSE: 'Bacaan nyebut "a weaker land breeze". Weaker = lebih lemah, kebalikan dari stronger.', TRUE: 'Kebalik.', 'NOT GIVEN': 'Infonya ada di kalimat terakhir.' }, 'Kata sifat perbandingan (weaker/stronger) sering jadi kunci.'),
      TFNG(KABUT + '"Fog delays take-offs more often than landings."', 'TRUE', { TRUE: 'Bacaan: pesawat bisa landing di jarak pandang di bawah 200 m, "yet take-offs are often delayed". Artinya take-off lebih sering ketunda.', FALSE: 'Ga ada yang bilang landing lebih sering ketunda.', 'NOT GIVEN': 'Ada infonya lewat kontras "yet".' }, 'Kata penghubung kontras (yet, however, but) sering nyimpen jawaban.'),
      TFNG(KABUT + '"All airports now use detailed fog forecasts."', 'FALSE', { FALSE: 'Bacaan: "Some airports now use…". Some ≠ all.', TRUE: 'Pernyataannya terlalu luas (all).', 'NOT GIVEN': 'Infonya ada, dan bilang cuma sebagian.' }, 'Some vs all: jebakan pembatas klasik.'),
      TFNG(KABUT + '"Fog forecasts have reduced ticket prices."', 'NOT GIVEN', { 'NOT GIVEN': 'Bacaan cuma nyebut prakiraan bantu ngurangin pembatalan. Harga tiket ga disebut.', TRUE: 'Ga ada info harga tiket.', FALSE: 'Bacaan ga bilang harga naik atau ga turun, jadi bukan FALSE.' }, 'FALSE butuh bukti bertentangan. Kalau ga ada infonya, NOT GIVEN.'),
      IS(KABUT + 'Lengkapi (NO MORE THAN TWO WORDS dari bacaan): Fog often forms on calm, clear nights after ________.', 'rain', 'Kalimat: "Fog is most common on calm, clear nights after rain". Jawabannya satu kata: rain.', { umum: ['Nulis "the rain" atau kata yang ga ada di bacaan. Ambil kata persis dari teks.'] }),
      RK('Kartu contekan Reading', [['TRUE', 'sama makna (parafrase)'], ['FALSE', 'bertentangan'], ['NOT GIVEN', 'ga ada infonya'], ['some / all / only', 'kata pembatas = jebakan'], ['yet / however', 'kontras sering nyimpen jawaban'], ['Batas kata', 'ambil kata persis dari bacaan']], 'Latihan beneran: Mock IELTS → Reading (13 soal, 20 menit).'),
    ]),

    L('ielistening', 'menengah', 'IELTS Listening: isian form dan jebakan', 9, [
      I('Format Listening', '<p>4 part, 40 soal, sekitar 30 menit. Audio <b>cuma diputar sekali</b>. Part 1 biasanya percakapan sehari-hari (booking, daftar), Part 4 kuliah monolog akademik.</p><p>Jenis soal: isian form/catatan, pilihan ganda, label peta/diagram, matching.</p>'),
      I('Trik isian form', '<ul><li><b>Baca soal sebelum audio mulai</b> dan tebak jenis jawabannya: angka? nama? kata benda?</li><li><b>Ejaan</b> dihitung. Nama sering dieja huruf per huruf.</li><li>Perhatiin <b>batas kata</b>: ONE WORD AND/OR A NUMBER.</li><li><b>Jebakan koreksi</b>: pembicara nyebut sesuatu terus ngeralat ("Tuesday… oh sorry, Wednesday"). Jawabannya yang terakhir.</li><li>Angka telepon: "double five" = 55, "oh" = 0.</li></ul>'),
      C('Nangkep jebakan koreksi', 'Potongan naskah: <i>"You can collect the card on Tuesday. Oh, sorry, the office is closed on Tuesday this week, so please come on Wednesday instead."</i><br>Soal: <b>Collect card on: ________</b>', [
        ['Prediksi', 'Sebelum dengerin: jawabannya pasti nama hari.'],
        ['Denger "Tuesday"', 'Jangan langsung nulis final. Tulis tipis di kepala.'],
        ['Denger "Oh, sorry… instead"', 'Tanda koreksi: sorry, actually, instead, no wait.'],
        ['Jawaban: Wednesday', 'Ambil info setelah koreksi.'],
      ]),
      IS('Dengerin audio. <b>Surname: ________</b> (satu kata)', ['Whitlock'], 'Naskah: "My name is Daniel Whitlock. That\'s W, H, I, T, L, O, C, K." Ejaannya dieja satu-satu, tulis persis.', { audio: NASKAH1.slice(0, 2), umum: ['Salah eja (Whitlok, Witlock). Ejaan salah = jawaban salah.'] }),
      IS('Dengerin audio. <b>Phone number: ________</b>', ['0412558391', '0412 558 391'], 'Naskah: "0 4 1 2, 5 5 8, 3 9 1". Tulis berurutan, spasi ga ngaruh.', { audio: NASKAH1.slice(2, 4) }),
      IS('Dengerin audio. <b>Student card price: £________</b>', ['4', 'four'], 'Naskah: harga umum six pounds, "or four pounds for students". Yang ditanya harga mahasiswa: 4.', { audio: NASKAH1.slice(4, 6), umum: ['Nulis 6: itu harga umum. Jebakan dua angka dalam satu kalimat.'] }),
      P('Dengerin audio. Daniel harus ambil kartunya hari apa?', [['Wednesday', 'Ada koreksi: "sorry… please come on Wednesday instead."'], ['Tuesday', 'Disebut duluan, terus diralat.'], ['Thursday', 'Ga disebut.'], ['Monday', 'Ga disebut.']], 'Info setelah "sorry" atau "instead" yang dipakai.', { audio: NASKAH1.slice(6) }),
      { t: 'info', judul: 'Naskah lengkap', isi: `<div class="naskah">${NASKAH1.map((t, i) => `<p><b>${i % 2 ? 'Daniel' : 'Staff'}:</b> ${t}</p>`).join('')}</div><p>Baca ulang sambil cari bagian yang tadi bikin ragu. Kebiasaan ini cepet naikin skor Listening.</p>` },
      RK('Kartu contekan Listening', [['Baca soal dulu', 'tebak jenis jawaban'], ['Ejaan', 'dihitung, nama sering dieja'], ['sorry / actually / instead', 'jawaban yang setelahnya'], ['Dua angka', 'cek yang ditanya yang mana'], ['double five', '55']], 'Latihan beneran: Mock IELTS → Listening.'),
    ]),

    // ================= MAHIR =================
    L('iewriting1', 'mahir', 'IELTS Writing Task 1: deskripsi grafik', 11, [
      I('Struktur 4 paragraf', '<p>Task 1 Academic: deskripsiin grafik/tabel/diagram, minimal 150 kata, sekitar 20 menit.</p><ol><li><b>Intro</b>: parafrase soal (1 kalimat).</li><li><b>Overview</b>: 2 tren/fitur paling menonjol, <b>tanpa angka detail</b>. Ini yang paling nentuin band 6 ke atas.</li><li><b>Body 1</b>: detail kelompok pertama, pakai angka dan perbandingan.</li><li><b>Body 2</b>: detail kelompok kedua.</li></ol><p>Ga perlu kesimpulan atau opini. Kriteria: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy.</p>'),
      I('Bahasa tren', '<table class="tabel-mini"><tr><th>naik</th><th>turun</th><th>lainnya</th></tr><tr><td>rise, increase, grow, climb</td><td>fall, decrease, decline, drop</td><td>remain stable, fluctuate, peak at, reach a low of</td></tr></table><p>Kecepatan: <i>sharply, dramatically</i> (cepat), <i>steadily, gradually</i> (pelan), <i>slightly</i> (sedikit). Bandingin: <i>twice as high as, the highest, while, whereas</i>.</p><p>Grafik masa lalu → past simple: <i>rose, fell, peaked</i>.</p>'),
      C('Nulis Task 1 bareng', 'Data (buatan): persentase rumah tangga yang punya akses internet di tiga negara. Negara A: 30% (2005) → 85% (2025). Negara B: 55% → 90%. Negara C: 10% → 40%.', [
        ['The table shows the proportion of households with internet access in three countries between 2005 and 2025.', '<b>Intro</b>: parafrase. "percentage" → "proportion", "from… to" → "between… and".'],
        ['Overall, internet access rose in all three countries, and Country B remained the most connected throughout the period.', '<b>Overview</b>: dua fitur utama, tanpa angka. Wajib ada.'],
        ['Country A saw the most dramatic growth, climbing from 30% to 85%, almost triple its initial level.', '<b>Body 1</b>: detail plus perbandingan.'],
        ['By contrast, Country C started from only 10% and reached 40%, still well below the other two countries.', '<b>Body 2</b>: kontras, pakai angka.'],
      ], { penutup: 'Overview yang jelas biasanya bedain band 5,5 dan 6,5. Tulis overview sebelum body, biar ga lupa.' }),
      P('Mana kalimat <b>overview</b> yang paling bagus?', [['"Overall, all three countries saw an increase, with Country B having the highest figures throughout."', 'Dua fitur utama, tanpa detail angka.'], ['"Country A rose from 30% in 2005 to 85% in 2025."', 'Ini detail body, bukan overview.'], ['"I think the internet is very important."', 'Task 1 ga boleh opini.'], ['"The table shows internet access in three countries."', 'Ini intro, bukan overview.']], 'Overview = gambaran besar, tanpa angka.'),
      PS('Pasangin kata dengan artinya.', [['peak at', 'mencapai titik tertinggi'], ['fluctuate', 'naik turun'], ['gradually', 'pelan-pelan'], ['plummet', 'anjlok tajam']], 'Variasi kosakata naikin Lexical Resource.'),
      IS('Lengkapi (bentuk past): "The number of visitors ________ (peak) at 5 million in 2019."', 'peaked', 'Waktu lampau jelas (2019) → past simple: peaked.', { umum: ['Nulis "peak" atau "was peak". Bentuk past dari peak = peaked.'] }),
      U('Urutin paragraf Task 1.', ['Intro: parafrase soal', 'Overview: 2 fitur utama tanpa angka', 'Body 1: detail dan angka kelompok pertama', 'Body 2: detail dan angka kelompok kedua'], 'Ga ada paragraf kesimpulan atau opini.'),
      W('Data: jumlah pengunjung museum kota (ribu). 2010: 120, 2015: 180, 2020: 60, 2024: 150. Tulis <b>intro + overview</b> (2 sampai 3 kalimat).', 30, ['Intro parafrase, ga nyalin soal mentah-mentah', 'Overview nyebut tren utama (naik, anjlok, pulih) tanpa angka detail', 'Pakai past simple', 'Ga ada opini pribadi'], 'Kamu examiner IELTS. Nilai intro dan overview Writing Task 1 ini (band perkiraan untuk Task Achievement dan Lexical Resource), lalu kasih 3 saran konkret:', { contohJawab: '<p><i>The line graph illustrates how many people visited a city museum between 2010 and 2024. Overall, visitor numbers grew in the first half of the period, dropped sharply around 2020, and then recovered to almost their earlier peak by 2024.</i></p>' }),
      RK('Kartu contekan Task 1', [['Intro', 'parafrase'], ['Overview', '2 fitur utama, tanpa angka'], ['Body', 'detail + perbandingan'], ['rose / fell / peaked', 'past simple buat masa lalu'], ['sharply / gradually / slightly', 'kecepatan'], ['≥ 150 kata, ±20 menit', 'ga ada opini']]),
    ]),

    L('iewriting2', 'mahir', 'IELTS Writing Task 2: esai argumen', 12, [
      I('Jenis soal Task 2', '<p>Minimal 250 kata, sekitar 40 menit. Bobotnya <b>dua kali</b> Task 1. Jenis soal:</p><ul><li><b>Opinion</b>: "To what extent do you agree or disagree?"</li><li><b>Discussion</b>: "Discuss both views and give your opinion."</li><li><b>Advantages/disadvantages</b>: "Do the advantages outweigh the disadvantages?"</li><li><b>Problem/solution</b>: "What are the causes? What can be done?"</li><li><b>Two-part question</b>: dua pertanyaan terpisah, jawab dua-duanya.</li></ul><p>Kesalahan paling mahal: <b>ga jawab semua bagian soal</b>.</p>'),
      I('Struktur dan paragraf PEEL', '<ol><li><b>Intro</b>: parafrase topik + <b>thesis</b> (posisimu, jelas).</li><li><b>Body 1</b> dan <b>Body 2</b>: tiap paragraf satu ide pakai <b>PEEL</b>: Point (kalimat utama), Explain (kenapa), Example (contoh konkret), Link (balik ke pertanyaan).</li><li><b>Conclusion</b>: ulang posisi, ga nambah ide baru.</li></ol><p>Penghubung secukupnya: <i>Firstly, Moreover, However, For example, As a result</i>. Hindari kalimat hafalan yang ga nyambung sama topik.</p>'),
      C('Rancang esai opini', 'Soal (buatan): <i>"Some people think university students should only study subjects related to their future careers. To what extent do you agree or disagree?"</i>', [
        ['Jenis: opinion (to what extent). Posisi: sebagian besar ga setuju.', 'Tentuin posisi sebelum nulis, dan pertahanin sampai akhir.'],
        ['Thesis: "While career-focused courses are valuable, I largely disagree that students should be limited to them."', 'Jelas dan sedikit nuansa (largely).'],
        ['Body 1 (Point): "Career-related subjects give graduates practical skills that employers want." + contoh magang', 'Akui sisi lain dulu, biar argumen seimbang.'],
        ['Body 2 (Point): "However, subjects outside one\'s field build adaptable thinking." + contoh: mahasiswa meteorologi yang belajar ekonomi bisa analisis dampak cuaca ke pertanian', 'Argumen utama yang dukung thesis, dengan contoh spesifik.'],
        ['Conclusion: ulang posisi dengan kata lain', '"In conclusion, a balance of career and broader subjects prepares students best."'],
      ]),
      P('Soal: "Some say cities should invest in parks, others say in public transport. <b>Discuss both views</b> and give your opinion." Jenisnya?', [['Discussion + opinion', 'Wajib bahas dua pandangan DAN kasih opinimu.'], ['Opinion aja', 'Ada "discuss both views".'], ['Problem/solution', 'Ga nanya penyebab/solusi.'], ['Advantages/disadvantages', 'Ga nanya untung-rugi satu hal.']], 'Garis bawahi instruksi di akhir soal.'),
      P('Thesis mana yang paling jelas buat soal "To what extent do you agree…"?', [['"I strongly agree that working from home benefits both employees and companies."', 'Posisi jelas dari awal.'], ['"There are many opinions about working from home."', 'Ga ada posisi.'], ['"This essay will talk about working from home."', 'Cuma pengumuman topik.'], ['"Working from home is a hot topic nowadays."', 'Pembuka klise tanpa posisi.']], 'Examiner nyari posisimu di intro.'),
      U('Urutin paragraf PEEL.', ['Point: kalimat utama paragraf', 'Explain: kenapa itu benar', 'Example: contoh konkret', 'Link: hubungin balik ke pertanyaan'], 'Satu paragraf, satu ide yang dikembangin penuh.'),
      W('Soal: <i>"Many young people now prefer to work for startups rather than large companies. Do the advantages of this outweigh the disadvantages?"</i> Tulis <b>intro dengan thesis</b> (2 sampai 3 kalimat).', 35, ['Parafrase topik, ga nyalin soal', 'Thesis jelas jawab "outweigh atau nggak"', 'Ga ada contoh detail di intro', 'Grammar dicek ulang'], 'Kamu examiner IELTS. Nilai intro Task 2 ini (posisi jelas? parafrase bagus?) dan kasih perkiraan band untuk Task Response, lalu 3 saran:', { contohJawab: '<p><i>An increasing number of young graduates are choosing to join start-up companies instead of established corporations. In my view, the benefits of this trend, such as faster learning and greater responsibility, outweigh the drawbacks of lower job security.</i></p>' }),
      RK('Kartu contekan Task 2', [['Baca instruksi', 'jawab semua bagian soal'], ['Intro', 'parafrase + thesis'], ['Body', 'PEEL: Point, Explain, Example, Link'], ['Conclusion', 'ulang posisi, tanpa ide baru'], ['≥ 250 kata, ±40 menit', 'bobot 2× Task 1']]),
    ]),

    L('iespeaking', 'mahir', 'IELTS Speaking: jawaban yang berkembang', 10, [
      I('Tiga part Speaking', '<table class="tabel-mini"><tr><th>part</th><th>isi</th><th>panjang jawaban</th></tr><tr><td>1</td><td>pertanyaan ringan (kota, hobi, kerja/kuliah), 4 sampai 5 menit</td><td>2 sampai 3 kalimat</td></tr><tr><td>2</td><td>kartu topik, 1 menit persiapan, ngomong 1 sampai 2 menit</td><td>monolog</td></tr><tr><td>3</td><td>diskusi abstrak terkait topik part 2, 4 sampai 5 menit</td><td>4 sampai 5 kalimat</td></tr></table><p>Dinilai: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation. Aksen bukan masalah, kejelasan yang dinilai.</p>'),
      I('Rumus ngembangin jawaban', '<ul><li><b>Part 1</b>: jawaban + alasan + contoh kecil.</li><li><b>Part 2</b>: ikutin poin di kartu, cerita pakai past tense, tambah perasaan/alasan di akhir.</li><li><b>Part 3</b>: opini + alasan + contoh + sisi lain ("On the other hand…").</li></ul><p>Butuh waktu mikir? Pakai: <i>"That\'s an interesting question. Let me think…"</i>. Lebih baik dari diam lama atau "eee" panjang.</p>'),
      C('Ngembangin jawaban Part 1', 'Pertanyaan: <i>"Do you like rainy days?"</i>', [
        ['"Yes."', 'Terlalu pendek. Examiner ga dapet bahan buat nilai.'],
        ['"Yes, I do, because the air feels much cooler."', '+ alasan.'],
        ['"Yes, I do, because the air feels much cooler. In my hometown, Bandung, I usually make hot tea and read when it rains in the afternoon."', '+ contoh personal. Ini panjang yang pas buat Part 1 (±15 detik).'],
      ]),
      P('Part 1: <i>"Do you work or are you a student?"</i> Jawaban terbaik?', [['"I recently graduated in Meteorology, and now I\'m looking for a data analyst role because I enjoy working with numbers."', 'Jawab + alasan + konteks, 2 kalimat.'], ['"Student."', 'Terlalu pendek.'], ['Cerita 2 menit soal kampus', 'Kepanjangan buat Part 1.'], ['"I don\'t want to talk about it."', 'Ga ngasih bahan penilaian.']], 'Part 1: pendek tapi berkembang.'),
      U('Kartu Part 2: <i>"Describe a skill you learned recently."</i> Urutin isi ceritanya.', ['What the skill is (I learned SQL)', 'When and how you learned it', 'What was difficult', 'How you feel about it and how it helps you'], 'Ikutin urutan poin di kartu biar coherence-nya kuat.'),
      P('Part 3: <i>"Should schools teach practical skills like budgeting?"</i> Jawaban terbaik?', [['"I believe they should, because many young adults struggle with money. For example, a simple budgeting class could prevent debt. On the other hand, the curriculum is already full, so it might work better as a short workshop."', 'Opini + alasan + contoh + sisi lain.'], ['"Yes, they should."', 'Ga dikembangin.'], ['"I don\'t know about schools."', 'Coba tetap kasih pendapat.'], ['Cerita pengalaman pribadi panjang tanpa opini', 'Part 3 butuh argumen umum.']], 'Part 3 = diskusi, bukan cerita.'),
      W('Latihan Part 2: <i>"Describe a time when the weather changed your plans."</i> Tulis catatan 1 menit + jawaban lengkap (bacain keras-keras abis itu, targetnya 1 sampai 2 menit).', 80, ['Semua poin kartu kejawab', 'Pakai past tense dengan konsisten', 'Ada perasaan atau alasan di akhir', 'Pas dibacain, ±1,5 sampai 2 menit'], 'Kamu examiner IELTS Speaking. Ini transkrip jawaban Part 2. Kasih perkiraan band per kriteria (Fluency, Lexical, Grammar) dan 3 saran:', { contohJawab: '<p><i>I\'d like to talk about a beach trip I planned last December with my university friends. We had booked a villa in Pangandaran for the weekend and planned to go snorkelling. However, the night before we left, the weather service issued a warning about heavy rain and strong waves. At first I was disappointed, but we decided to postpone the trip by two weeks. In the end it was a good decision, because the storm caused flooding along the coast. It taught me to check forecasts seriously, which is funny, because I studied meteorology.</i></p>' }),
      RK('Kartu contekan Speaking', [['Part 1', 'jawab + alasan + contoh'], ['Part 2', 'ikutin kartu, past tense, akhiri dengan perasaan'], ['Part 3', 'opini + alasan + contoh + sisi lain'], ['Butuh mikir', '"Let me think…"'], ['Nilai', 'fluency, vocab, grammar, pronunciation']], 'Latihan beneran: Mock IELTS → Speaking (pakai mik).'),
    ]),
  ]

  const tes = [
    T('dasar', '"Deadline" artinya…', ['Batas waktu', 'Garis finis lomba', 'Rapat penting', 'Hari libur'], 'Deadline = batas waktu nyerahin kerjaan.'),
    T('dasar', 'Last year, I ___ an internship at a bank.', ['did', 'have done', 'do', 'am doing'], '"Last year" = waktu lampau jelas → past simple.'),
    T('dasar', 'I am interested ___ this position.', ['in', 'on', 'at', 'for'], 'Pasangan tetap: interested in.'),
    T('menengah', 'I ___ three data projects so far.', ['have completed', 'completed yesterday', 'complete', 'was complete'], '"So far" = sampai sekarang → present perfect.'),
    T('menengah', 'Penutup email formal yang paling pas?', ['Best regards,', 'Bye!', 'Love,', 'Cya'], 'Netral dan profesional.'),
    T('menengah', 'IELTS Reading: bacaan bilang "some airports", pernyataan bilang "all airports". Jawabannya?', ['FALSE', 'TRUE', 'NOT GIVEN', 'Tergantung'], 'Some ≠ all, bertentangan → FALSE.'),
    T('mahir', 'Bagian Writing Task 1 yang paling nentuin band 6 ke atas?', ['Overview tanpa angka detail', 'Kesimpulan dengan opini', 'Intro yang panjang', 'Banyak angka di semua paragraf'], 'Tanpa overview yang jelas, Task Achievement susah lewat 5.'),
    T('mahir', 'Soal Task 2 "Discuss both views and give your opinion" wajib...', ['Bahas dua pandangan dan nyatain posisimu', 'Bahas satu pandangan aja', 'Cuma kasih opini', 'Bikin daftar untung rugi'], 'Ga jawab semua bagian soal = band Task Response turun.'),
  ]

  susun('EN', pelajaran, tes)
})()
