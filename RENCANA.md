# Get a Skill — rencana (ditulis 20 Nov 2026, dilanjut otomatis 21 Nov jam 9)

Permintaan Arya: website course interaktif dari pemula sampai ahli, live di GitHub Pages repo `aryaanstt/get-a-skill` (https://aryaanstt.github.io/get-a-skill/). Tujuannya CV makin kuat dan Arya ga ketergantungan AI pas kerja. Bahasa Inggris dibikin mirip GoPrep (mock test IELTS plus ngobrol sama AI). PRD awal dari Arya: `C:\Users\aryaanstt\.claude\uploads\fe7bf11b-0eb6-4e63-835d-9433a19c8f0f\74ddf876-PRD___Website_Mock_Test_IELTS.md`.

## Skill yang direkomendasiin (urutan prioritas buat data analyst di Indonesia)
1. SQL. Paling sering diminta loker DA. Belum boleh diklaim di CV sekarang.
2. Excel lanjutan: pivot, XLOOKUP, IF bertingkat, Power Query dasar. Hampir semua loker admin dan DA minta.
3. Power BI + DAX. Lebih sering muncul di loker Indonesia daripada Tableau. Tableau dibikin modul pendek: konsep sama, beda alat.
4. Bahasa Inggris (IELTS Academic). Sekarang EF SET B2, target band 6.5 sampai 7.
5. Statistik terapan bisnis: deskriptif, uji hipotesis, A/B test, regresi. Udah punya dasar dari TA, tinggal bahasa bisnisnya.
6. Python data (pandas lanjutan, cleaning, EDA). Udah punya dasar, naik level.
7. Bonus: berpikir analitis dan studi kasus (buat interview), plus storytelling data.

## Prinsip belajar (sama buat semua course)
- Tiap level: materi singkat → contoh → latihan interaktif yang dicek otomatis → proyek mini. Level: Pemula, Menengah, Mahir, Ahli.
- Latihan dikerjain sendiri tanpa AI. AI cuma buat feedback setelah Arya jawab.
- Progres, XP, streak, dan sertifikat level disimpan di localStorage.
- Dataset konteks Indonesia (e-commerce, cuaca BMKG-style, penjualan ritel) biar nyambung ke portofolio.

## Teknis
- Situs statis (HTML/CSS/JS, tanpa build) di repo baru `get-a-skill`, push `main` + Pages.
- SQL: SQLite beneran di browser (sql.js, CDN). Soal dicek dengan bandingin hasil query.
- Excel: lembar mini dengan mesin rumus di JS buat latihan rumus.
- Power BI/Tableau: Power BI Desktop ga bisa jalan di browser (dan storage Arya mepet). Isinya konsep, latihan logika DAX yang disimulasiin di JS, kuis, dan panduan proyek. Bilang jujur batasnya.
- IELTS: Reading dan Listening dengan timer dan konversi band. Audio Listening pakai suara browser (SpeechSynthesis) dari naskah buatan sendiri. Writing dengan penghitung kata. Speaking direkam dan ditranskrip pakai Web Speech API (Chrome).
- AI tutor (feedback Writing/Speaking, ngobrol kayak GoPrep): GitHub Pages ga boleh nyimpen API key. Opsi utama: halaman tutor sebagai Claude artifact dengan kemampuan `sample` (jalan pakai akun Claude Arya, tanpa key), ditautkan dari situs. Opsi lain nanti: backend kecil.
- Soal harus buatan sendiri. Jangan nyalin soal resmi IELTS atau materi GoPrep.

## Urutan kerja
1. Riset GoPrep (fitur, alur mock test, gaya AI feedback) dari situs dan sosmed resminya. Catat ringkas di RISET-GOPREP.md, jangan nyalin isinya.
2. Kerangka situs + beranda + sistem progres.
3. Course SQL (paling berdampak) sampai Pemula dan Menengah lengkap.
4. IELTS: 1 mock Reading + 1 mock Listening + Writing + Speaking + tutor AI artifact.
5. Excel, Power BI (+ Tableau singkat), Statistik, Python.
6. Bikin repo `aryaanstt/get-a-skill`, push, nyalain Pages, cek live, kabarin Arya pakai PushNotification.
