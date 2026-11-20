// Mock test IELTS: Reading, Listening, Writing, Speaking. Skor Reading/Listening otomatis, Writing/Speaking dianalisis + feedback AI di tutor.
(() => {
  GAS.header('IELTS')
  const D = window.IELTS
  const TUTOR = window.TUTOR_URL || ''
  const main = document.getElementById('isi')
  const esc = GAS.esc
  const tab = ['Ringkasan', 'Reading', 'Listening', 'Writing', 'Speaking', 'Riwayat']
  let aktif = location.hash.slice(1) || 'Ringkasan'
  let pewaktu = null

  const keBand = (benar, total, jenis) => {
    const skala = Math.round((benar / total) * 40)
    return { skala, band: (D.band[jenis].find(([min]) => skala >= min) || [0, 2])[1] }
  }
  const simpanHasil = h => { GAS.data.ielts.unshift({ ...h, tgl: new Date().toISOString() }); GAS.data.ielts = GAS.data.ielts.slice(0, 50); GAS.simpan() }
  const mulaiTimer = (menit, el, habis) => {
    clearInterval(pewaktu)
    const akhir = Date.now() + menit * 60000
    const tik = () => {
      const s = Math.max(0, Math.round((akhir - Date.now()) / 1000))
      el.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
      el.classList.toggle('mepet', s <= 120)
      if (s === 0) { clearInterval(pewaktu); habis() }
    }
    tik(); pewaktu = setInterval(tik, 1000)
  }
  const normJawab = s => String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.]$/, '')
  const tutorTombol = (label, isi) => TUTOR
    ? `<button class="btn utama" data-tutor="${esc(isi)}">🤖 ${label}</button>`
    : `<button class="btn" data-salin="${esc(isi)}">📋 Salin buat minta feedback AI</button>`
  const pasangTutor = root => {
    root.querySelectorAll('[data-tutor]').forEach(b => b.onclick = async () => {
      try { await navigator.clipboard.writeText(b.dataset.tutor) } catch {}
      GAS.toast('Jawaban udah disalin. Tempel di Tutor AI.'); window.open(TUTOR, '_blank')
    })
    root.querySelectorAll('[data-salin]').forEach(b => b.onclick = async () => {
      try { await navigator.clipboard.writeText(b.dataset.salin); GAS.toast('Udah disalin.') } catch { GAS.toast('Gagal nyalin, blok manual ya.') }
    })
  }

  // ---------- soal (Reading & Listening) ----------
  const soalHTML = (soal, pref) => soal.map(q => q.tipe
    ? `<p class="muted" style="margin-top:18px"><b>${esc(q.instruksi)}</b></p>`
    : `<div class="soal"><span class="no">${q.no}.</span>${esc(q.tanya)}${q.opsi
      ? `<div class="opsi">${q.opsi.map(o => `<button data-q="${pref}${q.no}" data-v="${o[0]}">${esc(o)}</button>`).join('')}</div>`
      : soal.find(x => x.tipe && x.instruksi.includes('TRUE')) && q.no <= 5 && pref === 'r'
        ? `<div class="opsi" style="grid-template-columns:repeat(3,1fr)">${['TRUE', 'FALSE', 'NOT GIVEN'].map(v => `<button data-q="${pref}${q.no}" data-v="${v}">${v}</button>`).join('')}</div>`
        : `<input type="text" data-q="${pref}${q.no}" placeholder="Jawaban" style="margin-top:6px">`}</div>`).join('')
  const pasangPilihan = root => root.querySelectorAll('.opsi button').forEach(b => b.onclick = () => {
    root.querySelectorAll(`button[data-q="${b.dataset.q}"]`).forEach(x => x.classList.remove('pilih'))
    b.classList.add('pilih')
  })
  const ambilJawab = (root, pref, no) => {
    const pilih = root.querySelector(`button[data-q="${pref}${no}"].pilih`)
    if (pilih) return pilih.dataset.v
    const inp = root.querySelector(`input[data-q="${pref}${no}"]`)
    return inp ? inp.value : ''
  }
  const nilaiSoal = (root, soal, pref) => {
    const qs = soal.filter(q => !q.tipe)
    let benar = 0
    const rinci = qs.map(q => {
      const j = ambilJawab(root, pref, q.no)
      const ok = q.jawab.some(a => normJawab(a) === normJawab(j))
      if (ok) benar++
      return { no: q.no, j, ok, kunci: q.jawab[0] }
    })
    return { benar, total: qs.length, rinci }
  }
  const hasilHTML = (jenis, n) => {
    const b = keBand(n.benar, n.total, jenis)
    return `<div class="kartu"><div class="baris"><div><div class="muted">Estimasi band ${jenis}</div><div class="band">${b.band}</div></div><div class="spasi"></div><div style="text-align:right"><b>${n.benar}/${n.total}</b> benar<div class="muted" style="font-size:13px">setara ${b.skala}/40</div></div></div><p class="muted" style="font-size:13px">Estimasi dari tes mini, bukan skor resmi.</p><table class="hasil"><tr><th>No</th><th>Jawaban lu</th><th>Kunci</th><th></th></tr>${n.rinci.map(r => `<tr><td>${r.no}</td><td>${esc(r.j || '–')}</td><td>${esc(r.kunci)}</td><td>${r.ok ? '✅' : '❌'}</td></tr>`).join('')}</table></div>`
  }

  // ---------- halaman ----------
  const halaman = {
    Ringkasan: () => {
      const h = GAS.data.ielts
      const terakhir = j => h.find(x => x.jenis === j)
      return `<div class="hero"><div class="kartu sambut"><h1>IELTS Academic</h1><p class="muted">Latihan dengan format dan timer kayak ujian asli. Reading dan Listening dinilai otomatis. Writing dan Speaking dianalisis di sini, terus dinilai Tutor AI pakai 4 kriteria resmi.</p><div class="baris"><a class="btn putih" href="#Reading">Mulai dari Reading</a>${TUTOR ? `<a class="btn" style="background:#ffffff22;color:#fff;border-color:#ffffff55" href="${TUTOR}" target="_blank">🤖 Buka Tutor AI</a>` : ''}</div></div><div class="kartu"><h3>Skor terakhir</h3>${['reading', 'listening', 'writing', 'speaking'].map(j => `<div class="baris" style="margin:8px 0"><span style="text-transform:capitalize">${j}</span><span class="spasi"></span><b>${terakhir(j)?.band ?? '–'}</b></div>`).join('')}<p class="muted" style="font-size:13px">Target realistis dari EF SET B2: band 6.5 sampai 7.</p></div></div><h2>Cara pakainya</h2><div class="grid">${[['1. Diagnosa', 'Kerjain Reading dan Listening sekali buat tau posisi lu.'], ['2. Latihan', 'Ulangi bagian yang paling lemah. Cek riwayat buat liat tren.'], ['3. Writing & Speaking', 'Tulis atau ngomong dulu sendiri, baru minta feedback AI.'], ['4. Perbaiki', 'Tulis ulang pakai saran AI, terus bandingin band-nya.']].map(([a, b]) => `<div class="kartu"><h3>${a}</h3><p class="muted">${b}</p></div>`).join('')}</div>`
    },
    Reading: () => {
      const R = D.reading
      setTimeout(() => {
        const root = document.getElementById('ujian')
        pasangPilihan(root)
        const kirim = () => {
          clearInterval(pewaktu)
          const n = nilaiSoal(root, R.soal, 'r')
          const b = keBand(n.benar, n.total, 'reading')
          simpanHasil({ jenis: 'reading', benar: n.benar, total: n.total, band: b.band })
          GAS.tambahXP(20 + n.benar * 2, 'Reading selesai')
          document.getElementById('hasil').innerHTML = hasilHTML('reading', n)
          document.getElementById('hasil').scrollIntoView({ behavior: 'smooth' })
        }
        document.getElementById('kirim').onclick = kirim
        mulaiTimer(R.menit, document.getElementById('timer'), kirim)
      })
      return `<div class="ujian-atas"><b>${esc(R.judul)}</b><span class="spasi"></span><span class="timer" id="timer"></span><button class="btn utama" id="kirim">Kirim jawaban</button></div><div class="split" id="ujian"><div class="kartu bacaan">${R.teks.map(p => `<p>${esc(p)}</p>`).join('')}</div><div class="kartu bacaan">${soalHTML(R.soal, 'r')}</div></div><div id="hasil" style="margin-top:14px"></div>`
    },
    Listening: () => {
      const L = D.listening
      setTimeout(() => {
        const root = document.getElementById('ujian')
        pasangPilihan(root)
        const status = document.getElementById('status-audio')
        const suara = () => {
          const v = speechSynthesis.getVoices().filter(x => /^en/i.test(x.lang))
          const gb = v.filter(x => /GB|UK|Australia/i.test(x.lang + x.name))
          const daftar = gb.length >= 2 ? gb : v
          return { P: daftar[0], M: daftar[1] || daftar[0] }
        }
        document.getElementById('putar').onclick = () => {
          if (!('speechSynthesis' in window)) { status.textContent = 'Browser ini ga bisa bacain teks. Pakai Chrome.'; return }
          speechSynthesis.cancel()
          const v = suara()
          L.naskah.forEach(([who, t], i) => {
            const u = new SpeechSynthesisUtterance(t)
            u.voice = v[who]; u.rate = 0.95; u.pitch = who === 'P' ? 1 : 1.15; u.lang = 'en-GB'
            u.onstart = () => { status.textContent = `Memutar… (${i + 1}/${L.naskah.length})` }
            if (i === L.naskah.length - 1) u.onend = () => { status.textContent = 'Audio selesai. Cek jawaban lu, terus kirim.' }
            speechSynthesis.speak(u)
          })
        }
        document.getElementById('stop').onclick = () => { speechSynthesis.cancel(); status.textContent = 'Dihentikan.' }
        const kirim = () => {
          clearInterval(pewaktu); speechSynthesis.cancel()
          const n = nilaiSoal(root, L.soal, 'l')
          const b = keBand(n.benar, n.total, 'listening')
          simpanHasil({ jenis: 'listening', benar: n.benar, total: n.total, band: b.band })
          GAS.tambahXP(20 + n.benar * 2, 'Listening selesai')
          document.getElementById('hasil').innerHTML = hasilHTML('listening', n) + `<details class="kartu" style="margin-top:12px"><summary><b>Lihat naskah</b></summary>${L.naskah.map(([w, t]) => `<p><b>${w === 'P' ? 'Staff' : 'Student'}:</b> ${esc(t)}</p>`).join('')}</details>`
        }
        document.getElementById('kirim').onclick = kirim
        mulaiTimer(L.menit, document.getElementById('timer'), kirim)
      })
      return `<div class="ujian-atas"><b>${esc(L.judul)}</b><span class="spasi"></span><span class="timer" id="timer"></span><button class="btn utama" id="kirim">Kirim jawaban</button></div><div class="kartu"><div class="baris"><button class="btn utama" id="putar">▶ Putar audio</button><button class="btn" id="stop">■ Stop</button><span class="muted" id="status-audio">Di ujian asli audio cuma diputar sekali. Baca soal dulu sebelum mulai.</span></div></div><div class="kartu" id="ujian" style="margin-top:14px">${soalHTML(L.soal, 'l')}</div><div id="hasil" style="margin-top:14px"></div>`
    },
    Writing: () => {
      const pilih = sessionStorage.getItem('gas-wtask') || 'task2'
      const W = D.writing.find(w => w.id === pilih) || D.writing[1]
      setTimeout(() => {
        document.querySelectorAll('[data-task]').forEach(b => b.onclick = () => { sessionStorage.setItem('gas-wtask', b.dataset.task); tampil() })
        const ta = document.getElementById('esai'), hitung = document.getElementById('hitung')
        const kata = () => (ta.value.match(/[A-Za-z’']+/g) || []).length
        ta.oninput = () => { const n = kata(); hitung.textContent = `${n} kata`; hitung.className = 'pil' + (n >= W.minKata ? '' : '') }
        mulaiTimer(W.menit, document.getElementById('timer'), () => GAS.toast('Waktu habis!'))
        document.getElementById('kirim').onclick = () => {
          clearInterval(pewaktu)
          const teks = ta.value.trim(); if (!teks) { GAS.toast('Tulis dulu jawabannya.'); return }
          const a = analisisTeks(teks)
          GAS.tambahXP(30, 'Writing selesai')
          simpanHasil({ jenis: 'writing', band: '–', kata: a.kata, task: W.id })
          const isi = `IELTS Writing ${W.judul}\nSoal: ${W.soal}\n\nJawaban saya (${a.kata} kata):\n${teks}`
          const h = document.getElementById('hasil')
          h.innerHTML = analisisHTML(a, W.minKata) + `<div class="kartu" style="margin-top:12px"><h3>Langkah berikutnya</h3><p class="muted">Minta Tutor AI nilai pakai 4 kriteria resmi (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) dan nunjukin kalimat yang perlu diperbaiki.</p>${tutorTombol('Nilai pakai Tutor AI', isi)}</div>`
          pasangTutor(h); h.scrollIntoView({ behavior: 'smooth' })
        }
      })
      return `<div class="tab-bar">${D.writing.map(w => `<button data-task="${w.id}" class="${w.id === W.id ? 'on' : ''}">${esc(w.judul)}</button>`).join('')}</div><div class="ujian-atas"><b>${esc(W.judul)}</b><span class="spasi"></span><span class="pil" id="hitung">0 kata</span><span class="timer" id="timer"></span><button class="btn utama" id="kirim">Selesai</button></div><div class="split"><div class="kartu"><p>${esc(W.soal)}</p>${W.grafik ? grafikSVG(W.grafik) : ''}<p class="muted" style="font-size:13px">Minimal ${W.minKata} kata.</p></div><div class="kartu"><textarea id="esai" rows="18" placeholder="Tulis jawaban lu di sini. Jangan pakai AI dulu."></textarea></div></div><div id="hasil" style="margin-top:14px"></div>`
    },
    Speaking: () => {
      setTimeout(speakingMulai)
      return `<div class="kartu"><h3>Ruang Speaking</h3><p class="muted">Examiner bacain pertanyaan pakai suara, lu jawab pakai mic (Chrome bakal minta izin mic). Jawaban ditranskrip otomatis. Part 1 (3 pertanyaan), Part 2 (1 menit persiapan, ngomong maksimal 2 menit), Part 3 (2 pertanyaan). Kalau mic ga bisa, ketik jawabannya.</p><div class="baris"><button class="btn utama" id="mulai-sp">🎙️ Mulai simulasi</button>${TUTOR ? `<a class="btn" href="${TUTOR}" target="_blank">🤖 Ngobrol langsung sama AI examiner</a>` : ''}</div></div><div id="sp" style="margin-top:14px"></div>`
    },
    Riwayat: () => {
      const h = GAS.data.ielts
      if (!h.length) return '<div class="kartu muted">Belum ada riwayat. Coba Reading dulu.</div>'
      return `<div class="kartu"><table class="hasil"><tr><th>Tanggal</th><th>Bagian</th><th>Hasil</th><th>Band</th></tr>${h.map(x => `<tr><td>${new Date(x.tgl).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td><td style="text-transform:capitalize">${x.jenis}</td><td>${x.total ? `${x.benar}/${x.total}` : x.kata ? `${x.kata} kata` : '–'}</td><td><b>${x.band}</b></td></tr>`).join('')}</table></div>`
    },
  }

  // ---------- analisis teks (Writing & Speaking) ----------
  const PENGHUBUNG = ['however', 'moreover', 'furthermore', 'therefore', 'in addition', 'on the other hand', 'for example', 'for instance', 'as a result', 'consequently', 'although', 'whereas', 'in conclusion', 'overall', 'while', 'because', 'since', 'despite']
  const FILLER = ['um', 'uh', 'erm', 'like', 'you know', 'i mean', 'actually', 'basically']
  const UMUM = new Set('the a an and or but of to in on for with is are was were be been it this that these those i you he she we they my your our their at by from as not do does did have has had will would can could should so very also more most than then there here which who what when how why if into about just'.split(' '))
  const analisisTeks = teks => {
    const kataArr = (teks.toLowerCase().match(/[a-z’']+/g) || [])
    const kalimat = teks.split(/[.!?]+/).filter(s => s.trim().length > 2)
    const frek = {}
    kataArr.filter(w => !UMUM.has(w) && w.length > 3).forEach(w => frek[w] = (frek[w] || 0) + 1)
    const ulang = Object.entries(frek).filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]).slice(0, 6)
    const low = ' ' + teks.toLowerCase() + ' '
    return {
      kata: kataArr.length,
      kalimat: kalimat.length,
      rataKalimat: kalimat.length ? Math.round(kataArr.length / kalimat.length) : 0,
      paragraf: teks.split(/\n\s*\n/).filter(p => p.trim()).length,
      variasi: kataArr.length ? Math.round((new Set(kataArr).size / kataArr.length) * 100) : 0,
      penghubung: PENGHUBUNG.filter(p => low.includes(' ' + p + ' ') || low.includes(' ' + p + ',')),
      filler: FILLER.map(f => [f, (low.match(new RegExp(`\\b${f}\\b`, 'g')) || []).length]).filter(([, n]) => n),
      ulang,
    }
  }
  const analisisHTML = (a, min) => `<div class="kartu"><h3>Analisis cepat</h3><div class="kriteria">${[
    ['Jumlah kata', `${a.kata}${min ? ` / min ${min}` : ''}`, !min || a.kata >= min],
    ['Paragraf', a.paragraf, a.paragraf >= 3 || !min],
    ['Rata-rata kata per kalimat', a.rataKalimat, a.rataKalimat >= 12 && a.rataKalimat <= 25],
    ['Variasi kosakata', `${a.variasi}%`, a.variasi >= 45],
  ].map(([n, v, ok]) => `<div class="kartu" style="box-shadow:none"><div class="muted" style="font-size:13px">${n}</div><b style="font-size:20px">${v}</b> ${ok ? '<span class="tag ok">oke</span>' : '<span class="tag warn">cek</span>'}</div>`).join('')}</div><p style="margin-top:12px"><b>Kata penghubung yang dipakai:</b> ${a.penghubung.length ? a.penghubung.map(x => `<span class="tag ok">${x}</span>`).join(' ') : '<span class="tag warn">belum ada, tambahin (however, for example, as a result)</span>'}</p>${a.ulang.length ? `<p><b>Kata yang sering diulang:</b> ${a.ulang.map(([w, n]) => `<span class="tag warn">${w} ×${n}</span>`).join(' ')} <span class="muted">cari sinonimnya</span></p>` : ''}${a.filler.length ? `<p><b>Kata pengisi:</b> ${a.filler.map(([w, n]) => `<span class="tag warn">${w} ×${n}</span>`).join(' ')}</p>` : ''}</div>`

  const grafikSVG = g => {
    const W = 520, H = 260, kiri = 40, bawah = 220, maks = Math.max(...g.seri.flatMap(s => s[1])) * 1.15
    const lebarGrup = (W - kiri - 20) / g.label.length, bw = lebarGrup / (g.seri.length + 1)
    let isi = ''
    for (let y = 0; y <= maks; y += 10) { const yy = bawah - (y / maks) * 190; isi += `<line x1="${kiri}" x2="${W - 10}" y1="${yy}" y2="${yy}" stroke="currentColor" stroke-opacity=".12"/><text x="${kiri - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="currentColor" opacity=".7">${y}</text>` }
    g.label.forEach((l, i) => {
      g.seri.forEach(([, v, c], j) => { const h = (v[i] / maks) * 190; isi += `<rect x="${kiri + i * lebarGrup + bw * (j + 0.5)}" y="${bawah - h}" width="${bw - 4}" height="${h}" rx="3" fill="${c}"><title>${v[i]}</title></rect><text x="${kiri + i * lebarGrup + bw * (j + 0.5) + (bw - 4) / 2}" y="${bawah - h - 4}" text-anchor="middle" font-size="10" fill="currentColor">${v[i]}</text>` })
      isi += `<text x="${kiri + i * lebarGrup + lebarGrup / 2}" y="${bawah + 16}" text-anchor="middle" font-size="12" fill="currentColor">${l}</text>`
    })
    const leg = g.seri.map(([n, , c], j) => `<rect x="${kiri + j * 110}" y="${H - 18}" width="10" height="10" fill="${c}"/><text x="${kiri + j * 110 + 14}" y="${H - 9}" font-size="12" fill="currentColor">${n}</text>`).join('')
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;color:var(--text)"><text x="${kiri}" y="14" font-size="12" font-weight="700" fill="currentColor">Hot days per year (above 35°C)</text>${isi}${leg}</svg>`
  }

  // ---------- Speaking ----------
  const speakingMulai = () => {
    const tombol = document.getElementById('mulai-sp'); if (!tombol) return
    tombol.onclick = () => {
      const S = D.speaking
      const acak = a => [...a].sort(() => Math.random() - 0.5)
      const p2 = acak(S.part2)[0]
      const alur = [
        ...acak(S.part1).slice(0, 3).map(q => ({ part: 1, q, detik: 45 })),
        { part: 2, q: `${p2.topik} You should say: ${p2.poin.join(', ')}.`, siap: 60, detik: 120, poin: p2.poin, topik: p2.topik },
        ...acak(S.part3).slice(0, 2).map(q => ({ part: 3, q, detik: 75 })),
      ]
      jalankanSpeaking(alur)
    }
  }
  const ucap = teks => new Promise(r => {
    if (!('speechSynthesis' in window)) return r()
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(teks); u.lang = 'en-GB'; u.rate = 0.95
    const v = speechSynthesis.getVoices().find(x => /en-GB/i.test(x.lang)); if (v) u.voice = v
    u.onend = r; u.onerror = r; speechSynthesis.speak(u)
  })
  const jalankanSpeaking = async alur => {
    const sp = document.getElementById('sp')
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const jawaban = []
    for (let i = 0; i < alur.length; i++) {
      const a = alur[i]
      sp.innerHTML = `<div class="kartu"><div class="baris"><span class="tag violet">Part ${a.part}</span><span class="muted">Pertanyaan ${i + 1}/${alur.length}</span><span class="spasi"></span><span class="timer" id="t-sp"></span></div><h3 style="margin-top:10px">${esc(a.part === 2 ? a.topik : a.q)}</h3>${a.poin ? `<ul>${a.poin.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}<div id="fase" class="muted"></div><textarea id="trans" rows="5" placeholder="${SR ? 'Transkrip muncul di sini pas lu ngomong. Bisa diedit.' : 'Mic ga didukung browser ini, ketik jawaban lu.'}" style="margin-top:10px"></textarea><div class="baris" style="margin-top:8px"><button class="btn utama" id="lanjut">Selesai jawab ›</button></div></div>`
      await ucap(a.q)
      const fase = document.getElementById('fase'), trans = document.getElementById('trans')
      if (a.siap) {
        fase.innerHTML = '<b>Waktu persiapan 1 menit.</b> Bikin catatan singkat di kotak di bawah, nanti dihapus pas mulai ngomong.'
        await new Promise(r => { mulaiTimer(a.siap / 60, document.getElementById('t-sp'), r); document.getElementById('lanjut').onclick = () => { clearInterval(pewaktu); r() } })
        trans.value = ''
        await ucap('Now, please start speaking.')
      }
      fase.innerHTML = '<b>Silakan jawab.</b> 🎙️ Mic nyala.'
      let rec = null
      if (SR) {
        rec = new SR(); rec.lang = 'en-GB'; rec.continuous = true; rec.interimResults = true
        let final = ''
        rec.onresult = e => { let sementara = ''; for (let j = e.resultIndex; j < e.results.length; j++) { if (e.results[j].isFinal) final += e.results[j][0].transcript + ' '; else sementara += e.results[j][0].transcript } trans.value = final + sementara }
        rec.onerror = () => { fase.innerHTML = 'Mic ga jalan. Ketik jawaban lu aja.' }
        try { rec.start() } catch {}
      }
      const mulai = Date.now()
      await new Promise(r => { mulaiTimer(a.detik / 60, document.getElementById('t-sp'), r); document.getElementById('lanjut').onclick = () => { clearInterval(pewaktu); r() } })
      if (rec) try { rec.stop() } catch {}
      await new Promise(r => setTimeout(r, 400))
      jawaban.push({ part: a.part, q: a.q, teks: trans.value.trim(), detik: Math.round((Date.now() - mulai) / 1000) })
    }
    await ucap('Thank you. That is the end of the speaking test.')
    const semua = jawaban.map(j => j.teks).join('\n')
    const a = analisisTeks(semua)
    const totalDetik = jawaban.reduce((n, j) => n + j.detik, 0)
    const wpm = totalDetik ? Math.round(a.kata / (totalDetik / 60)) : 0
    GAS.tambahXP(40, 'Speaking selesai')
    simpanHasil({ jenis: 'speaking', band: '–', kata: a.kata })
    const isi = `IELTS Speaking mock (transkrip otomatis, mungkin ada salah dengar):\n\n${jawaban.map(j => `[Part ${j.part}] Q: ${j.q}\nA: ${j.teks || '(kosong)'}`).join('\n\n')}`
    sp.innerHTML = `<div class="kartu"><h3>Selesai! Ini transkrip lu</h3>${jawaban.map(j => `<p><span class="tag violet">Part ${j.part}</span> <b>${esc(j.q)}</b><br>${esc(j.teks || '(kosong)')}</p>`).join('')}<p class="muted">Kecepatan ngomong: <b>${wpm} kata/menit</b> (natural sekitar 110 sampai 150).</p></div><div style="height:12px"></div>${analisisHTML(a)}<div class="kartu" style="margin-top:12px"><h3>Minta penilaian</h3><p class="muted">Tutor AI bakal ngasih band per kriteria (Fluency & Coherence, Lexical Resource, Grammar, Pronunciation dari transkrip) dan contoh jawaban yang lebih bagus.</p>${tutorTombol('Nilai pakai Tutor AI', isi)}</div>`
    pasangTutor(sp)
  }

  const tampil = () => {
    clearInterval(pewaktu); if ('speechSynthesis' in window) speechSynthesis.cancel()
    aktif = location.hash.slice(1) || 'Ringkasan'
    if (!halaman[aktif]) aktif = 'Ringkasan'
    main.innerHTML = `<div class="tab-bar">${tab.map(t => `<button class="${t === aktif ? 'on' : ''}" data-tab="${t}">${t}</button>`).join('')}</div><div id="halaman">${halaman[aktif]()}</div>`
    main.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { location.hash = b.dataset.tab })
    pasangTutor(main)
  }
  window.addEventListener('hashchange', tampil)
  if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {}
  GAS.tandaiAktif()
  tampil()
})()
