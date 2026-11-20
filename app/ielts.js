// Mock IELTS di dalam Get a Skill: Reading, Listening, Writing, Speaking. Soal buatan sendiri, skor cuma estimasi.
window.GAS_IELTS = (() => {
  const { esc, ikon } = G
  const D = window.IELTS
  const TUTOR = 'https://claude.ai/artifact/4C1JpAenehVNtq2Ad4P6tx'
  const WARNA = '#3657F5'
  let pewaktu = null
  const henti = () => { clearInterval(pewaktu); if ('speechSynthesis' in window) speechSynthesis.cancel() }

  const riwayat = () => { const d = G.D(); d.ielts = d.ielts || []; return d.ielts }
  const simpanHasil = h => { const r = riwayat(); r.unshift({ ...h, tgl: new Date().toISOString() }); r.splice(50); G.simpan() }
  const keBand = (benar, total, jenis) => { const skala = Math.round(benar / total * 40); return { skala, band: (D.band[jenis].find(([m]) => skala >= m) || [0, 2])[1] } }
  const terakhir = j => riwayat().find(x => x.jenis === j)
  const norm = s => String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.]$/, '')
  const mulaiTimer = (menit, el, habis) => {
    clearInterval(pewaktu)
    const akhir = Date.now() + menit * 60000
    const tik = () => {
      if (!document.body.contains(el)) return clearInterval(pewaktu)
      const s = Math.max(0, Math.round((akhir - Date.now()) / 1000))
      el.innerHTML = `${ikon('jam', 15)} ${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
      el.classList.toggle('mepet', s <= 120)
      if (s === 0) { clearInterval(pewaktu); habis() }
    }
    tik(); pewaktu = setInterval(tik, 1000)
  }
  const tombolAI = (label, isi) => `<div class="ie-ai"><button class="btn utama ai-salin" data-isi="${esc(isi)}">${ikon('salin', 16)} ${label}</button><a class="btn garis" href="${TUTOR}" target="_blank" rel="noopener">Buka Tutor AI</a><p class="redup kecil">Jawabanmu disalin, terus tempel di Tutor AI (butuh login claude.ai) atau AI lain buat dinilai pakai 4 kriteria resmi.</p></div>`
  const pasangAI = root => root.querySelectorAll('.ai-salin').forEach(b => b.onclick = () => G.salin(b.dataset.isi))

  // ---------- kerangka ujian ----------
  const kepalaUjian = (judul, kanan = '') => `<header class="ie-atas"><button class="ikon-btn ie-tutup" aria-label="Keluar">${ikon('x', 22)}</button><div class="ie-judul"><span class="label-kecil">Mock IELTS</span><b>${esc(judul)}</b></div><span class="spasi"></span>${kanan}</header>`
  const pasangTutup = (el, o) => el.querySelector('.ie-tutup').onclick = async () => { if (await G.konfirmasi('Keluar dari tes ini? Jawaban yang belum dikirim ga kesimpen.', 'Keluar')) { henti(); o.kembali() } }

  // ---------- soal Reading & Listening ----------
  const soalHTML = (soal, pref, tfng) => soal.map(q => q.tipe
    ? `<p class="ie-instruksi">${esc(q.instruksi)}</p>`
    : `<div class="ie-soal" data-no="${q.no}"><span class="ie-no">${q.no}</span><div><p>${esc(q.tanya)}</p>${q.opsi
      ? `<div class="ie-opsi">${q.opsi.map(o => `<button class="op kecil" data-q="${pref}${q.no}" data-v="${o[0]}">${esc(o)}</button>`).join('')}</div>`
      : tfng && q.no <= 5
        ? `<div class="ie-opsi tiga">${['TRUE', 'FALSE', 'NOT GIVEN'].map(v => `<button class="op kecil" data-q="${pref}${q.no}" data-v="${v}">${v}</button>`).join('')}</div>`
        : `<input class="ie-isian" data-q="${pref}${q.no}" autocomplete="off" spellcheck="false" placeholder="Jawaban" aria-label="Jawaban nomor ${q.no}">`}</div></div>`).join('')
  const pasangPilihan = root => root.querySelectorAll('.ie-opsi .op').forEach(b => b.onclick = () => {
    root.querySelectorAll(`.op[data-q="${b.dataset.q}"]`).forEach(x => x.setAttribute('aria-checked', 'false'))
    b.setAttribute('aria-checked', 'true')
  })
  const ambil = (root, pref, no) => {
    const p = root.querySelector(`.op[data-q="${pref}${no}"][aria-checked="true"]`)
    if (p) return p.dataset.v
    const i = root.querySelector(`input[data-q="${pref}${no}"]`)
    return i ? i.value : ''
  }
  const nilai = (root, soal, pref) => {
    const qs = soal.filter(q => !q.tipe)
    const rinci = qs.map(q => { const j = ambil(root, pref, q.no); return { no: q.no, j, ok: q.jawab.some(a => norm(a) === norm(j)), kunci: q.jawab[0] } })
    return { benar: rinci.filter(r => r.ok).length, total: qs.length, rinci }
  }
  const hasilHTML = (jenis, n) => {
    const b = keBand(n.benar, n.total, jenis)
    return `<div class="tiket ie-tiket" style="--garis:${WARNA}"><div class="tiket-kiri"><span class="label-kecil">Band</span><span class="ie-band">${b.band}</span></div><div class="tiket-isi"><span class="label-kecil">Estimasi ${jenis}</span><h3>${n.benar} dari ${n.total} bener</h3><p class="redup kecil">Setara ${b.skala}/40. Estimasi dari tes mini, bukan skor resmi.</p></div></div>
      <div class="tabel-geser ie-rinci"><table class="hasil"><thead><tr><th>No</th><th>Jawaban kamu</th><th>Kunci</th><th></th></tr></thead><tbody>${n.rinci.map(r => `<tr class="${r.ok ? 'ok' : 'bad'}"><td>${r.no}</td><td>${esc(r.j || '–')}</td><td>${esc(r.kunci)}</td><td>${ikon(r.ok ? 'cek' : 'x', 16)}</td></tr>`).join('')}</tbody></table></div>`
  }

  const reading = (el, o) => {
    const R = D.reading
    el.innerHTML = `<div class="ie-ujian">${kepalaUjian(R.judul, `<span class="chip-stat ie-timer"></span><button class="btn utama kirim">Kirim</button>`)}
      <div class="seg ie-tab-hp" role="tablist"><button role="tab" aria-checked="true" data-p="teks">Bacaan</button><button role="tab" aria-checked="false" data-p="soal">Soal</button></div>
      <div class="ie-split" data-tampil="teks"><article class="panel ie-bacaan">${R.teks.map(p => `<p>${esc(p)}</p>`).join('')}</article><section class="panel ie-soalan">${soalHTML(R.soal, 'r', true)}</section></div>
      <div class="ie-hasil"></div></div>`
    pasangTutup(el, o)
    const root = el.querySelector('.ie-split')
    pasangPilihan(root)
    el.querySelectorAll('.ie-tab-hp button').forEach(b => b.onclick = () => { root.dataset.tampil = b.dataset.p; el.querySelectorAll('.ie-tab-hp button').forEach(x => x.setAttribute('aria-checked', x === b)) })
    let selesai = false
    const kirim = () => {
      if (selesai) return; selesai = true; henti()
      const n = nilai(root, R.soal, 'r'), b = keBand(n.benar, n.total, 'reading')
      simpanHasil({ jenis: 'reading', benar: n.benar, total: n.total, band: b.band })
      G.tambahXP(20 + n.benar * 2)
      root.querySelectorAll('button, input').forEach(x => x.disabled = true)
      const h = el.querySelector('.ie-hasil'); h.innerHTML = hasilHTML('reading', n) + `<div class="beres-tombol baris"><button class="btn utama besar ie-balik">Balik ke Mock IELTS</button></div>`
      h.querySelector('.ie-balik').onclick = o.kembali
      el.querySelector('.kirim').hidden = true; el.querySelector('.ie-timer').hidden = true
      h.scrollIntoView({ behavior: G.reduksi() ? 'auto' : 'smooth' })
    }
    el.querySelector('.kirim').onclick = async () => { if (await G.konfirmasi('Kirim jawaban Reading sekarang?', 'Kirim')) kirim() }
    mulaiTimer(R.menit, el.querySelector('.ie-timer'), kirim)
  }

  const listening = (el, o) => {
    const L = D.listening
    el.innerHTML = `<div class="ie-ujian sempit">${kepalaUjian(L.judul, `<span class="chip-stat ie-timer"></span><button class="btn utama kirim">Kirim</button>`)}
      <section class="panel ie-audio"><div class="ie-gelombang" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div><div class="baris-tombol"><button class="btn utama putar">${ikon('main', 16)} Putar audio</button><button class="btn garis stop">Stop</button></div><p class="redup kecil status">Di ujian asli audio cuma diputar sekali. Baca soalnya dulu sebelum mulai.</p></section>
      <section class="panel ie-soalan">${soalHTML(L.soal, 'l', false)}</section><div class="ie-hasil"></div></div>`
    pasangTutup(el, o)
    const root = el.querySelector('.ie-soalan'), status = el.querySelector('.status'), gel = el.querySelector('.ie-gelombang')
    pasangPilihan(root)
    const suara = () => {
      const v = speechSynthesis.getVoices().filter(x => /^en/i.test(x.lang))
      const gb = v.filter(x => /GB|UK|Australia/i.test(x.lang + x.name)), d = gb.length >= 2 ? gb : v
      return { P: d[0], M: d[1] || d[0] }
    }
    el.querySelector('.putar').onclick = () => {
      if (!('speechSynthesis' in window)) { status.textContent = 'Browser ini ga bisa bacain teks. Coba pakai Chrome.'; return }
      speechSynthesis.cancel(); const v = suara(); gel.classList.add('jalan')
      L.naskah.forEach(([w, t], i) => {
        const u = new SpeechSynthesisUtterance(t); u.voice = v[w]; u.rate = .95; u.pitch = w === 'P' ? 1 : 1.15; u.lang = 'en-GB'
        u.onstart = () => { status.textContent = `Lagi diputar… (${i + 1}/${L.naskah.length})` }
        if (i === L.naskah.length - 1) u.onend = () => { status.textContent = 'Audio selesai. Cek jawabanmu, terus kirim.'; gel.classList.remove('jalan') }
        speechSynthesis.speak(u)
      })
    }
    el.querySelector('.stop').onclick = () => { speechSynthesis.cancel(); gel.classList.remove('jalan'); status.textContent = 'Dihentikan.' }
    let selesai = false
    const kirim = () => {
      if (selesai) return; selesai = true; henti(); gel.classList.remove('jalan')
      const n = nilai(root, L.soal, 'l'), b = keBand(n.benar, n.total, 'listening')
      simpanHasil({ jenis: 'listening', benar: n.benar, total: n.total, band: b.band })
      G.tambahXP(20 + n.benar * 2)
      root.querySelectorAll('button, input').forEach(x => x.disabled = true)
      const h = el.querySelector('.ie-hasil')
      h.innerHTML = hasilHTML('listening', n) + `<details class="panel ie-naskah"><summary>Liat naskah audio</summary>${L.naskah.map(([w, t]) => `<p><b>${w === 'P' ? 'Staff' : 'Student'}:</b> ${esc(t)}</p>`).join('')}</details><div class="beres-tombol baris"><button class="btn utama besar ie-balik">Balik ke Mock IELTS</button></div>`
      h.querySelector('.ie-balik').onclick = o.kembali
      el.querySelector('.kirim').hidden = true; el.querySelector('.ie-timer').hidden = true
      h.scrollIntoView({ behavior: G.reduksi() ? 'auto' : 'smooth' })
    }
    el.querySelector('.kirim').onclick = async () => { if (await G.konfirmasi('Kirim jawaban Listening sekarang?', 'Kirim')) kirim() }
    mulaiTimer(L.menit, el.querySelector('.ie-timer'), kirim)
  }

  // ---------- analisis teks ----------
  const PENGHUBUNG = ['however', 'moreover', 'furthermore', 'therefore', 'in addition', 'on the other hand', 'for example', 'for instance', 'as a result', 'consequently', 'although', 'whereas', 'in conclusion', 'overall', 'while', 'because', 'since', 'despite']
  const FILLER = ['um', 'uh', 'erm', 'like', 'you know', 'i mean', 'actually', 'basically']
  const UMUM = new Set('the a an and or but of to in on for with is are was were be been it this that these those i you he she we they my your our their at by from as not do does did have has had will would can could should so very also more most than then there here which who what when how why if into about just'.split(' '))
  const analisis = teks => {
    const k = teks.toLowerCase().match(/[a-z’']+/g) || [], kal = teks.split(/[.!?]+/).filter(s => s.trim().length > 2)
    const f = {}; k.filter(w => !UMUM.has(w) && w.length > 3).forEach(w => f[w] = (f[w] || 0) + 1)
    const low = ' ' + teks.toLowerCase() + ' '
    return {
      kata: k.length, rata: kal.length ? Math.round(k.length / kal.length) : 0, paragraf: teks.split(/\n\s*\n/).filter(p => p.trim()).length,
      variasi: k.length ? Math.round(new Set(k).size / k.length * 100) : 0,
      penghubung: PENGHUBUNG.filter(p => low.includes(' ' + p + ' ') || low.includes(' ' + p + ',')),
      filler: FILLER.map(x => [x, (low.match(new RegExp(`\\b${x}\\b`, 'g')) || []).length]).filter(([, n]) => n),
      ulang: Object.entries(f).filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]).slice(0, 6),
    }
  }
  const analisisHTML = (a, min) => `<section class="panel"><h2>Analisis cepat</h2><div class="statistik ie-kriteria">${[
    ['Jumlah kata', `${a.kata}${min ? ' / ' + min : ''}`, !min || a.kata >= min], ['Paragraf', a.paragraf, a.paragraf >= 3 || !min],
    ['Kata per kalimat', a.rata, a.rata >= 12 && a.rata <= 25], ['Variasi kata', a.variasi + '%', a.variasi >= 45],
  ].map(([n, v, ok]) => `<div class="${ok ? 'oke' : 'cek'}"><small>${n}</small><b>${v}</b><span class="kecil">${ok ? 'oke' : 'perlu dicek'}</span></div>`).join('')}</div>
    <p><b>Kata penghubung:</b> ${a.penghubung.length ? a.penghubung.map(x => `<span class="tag ok-tag">${x}</span>`).join(' ') : '<span class="tag">belum ada, coba tambahin however, for example, as a result</span>'}</p>
    ${a.ulang.length ? `<p><b>Sering diulang:</b> ${a.ulang.map(([w, n]) => `<span class="tag">${w} ×${n}</span>`).join(' ')} <span class="redup kecil">cari sinonimnya</span></p>` : ''}
    ${a.filler.length ? `<p><b>Kata pengisi:</b> ${a.filler.map(([w, n]) => `<span class="tag">${w} ×${n}</span>`).join(' ')}</p>` : ''}</section>`

  const grafik = g => {
    const W = 520, H = 270, kiri = 40, bawah = 222, maks = Math.max(...g.seri.flatMap(s => s[1])) * 1.15
    const WARNA_SERI = ['#0E9F9A', '#F2542D', '#D99A00']
    const lg = (W - kiri - 20) / g.label.length, bw = lg / (g.seri.length + 1)
    let isi = ''
    for (let y = 0; y <= maks; y += 10) { const yy = bawah - y / maks * 190; isi += `<line x1="${kiri}" x2="${W - 10}" y1="${yy}" y2="${yy}" class="ie-grid"/><text x="${kiri - 6}" y="${yy + 4}" text-anchor="end" class="ie-sumbu">${y}</text>` }
    g.label.forEach((l, i) => {
      g.seri.forEach(([, v], j) => { const h = v[i] / maks * 190, x = kiri + i * lg + bw * (j + .5); isi += `<rect x="${x}" y="${bawah - h}" width="${bw - 4}" height="${h}" rx="3" fill="${WARNA_SERI[j]}"/><text x="${x + (bw - 4) / 2}" y="${bawah - h - 4}" text-anchor="middle" class="ie-nilai">${v[i]}</text>` })
      isi += `<text x="${kiri + i * lg + lg / 2}" y="${bawah + 17}" text-anchor="middle" class="ie-sumbu besar">${l}</text>`
    })
    const leg = g.seri.map(([n], j) => `<rect x="${kiri + j * 120}" y="${H - 16}" width="12" height="12" rx="3" fill="${WARNA_SERI[j]}"/><text x="${kiri + j * 120 + 17}" y="${H - 6}" class="ie-sumbu besar">${n}</text>`).join('')
    return `<svg class="ie-grafik" viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik jumlah hari panas per tahun"><text x="${kiri}" y="14" class="ie-sumbu tebal">Hot days per year (above 35°C)</text>${isi}${leg}</svg>`
  }

  const writing = (el, o, idAwal) => {
    const W = D.writing.find(w => w.id === idAwal) || D.writing[1]
    el.innerHTML = `<div class="ie-ujian">${kepalaUjian(W.judul, `<span class="chip-stat hitung">0 kata</span><span class="chip-stat ie-timer"></span><button class="btn utama kirim">Selesai</button>`)}
      <div class="seg ie-task" role="tablist">${D.writing.map(w => `<button role="tab" aria-checked="${w.id === W.id}" data-task="${w.id}">${esc(w.judul)}</button>`).join('')}</div>
      <div class="ie-split tulis-split"><section class="panel"><p class="ie-soal-tulis">${esc(W.soal)}</p>${W.grafik ? grafik(W.grafik) : ''}<p class="redup kecil">Minimal ${W.minKata} kata · ${W.menit} menit.</p></section>
      <section class="panel"><textarea class="tulis ie-esai" rows="16" placeholder="Tulis jawabanmu di sini. Coba sendiri dulu tanpa AI." aria-label="Jawaban writing"></textarea></section></div><div class="ie-hasil"></div></div>`
    pasangTutup(el, o)
    el.querySelectorAll('[data-task]').forEach(b => b.onclick = () => { if (b.dataset.task !== W.id) { henti(); writing(el, o, b.dataset.task) } })
    const ta = el.querySelector('.ie-esai'), hk = el.querySelector('.hitung')
    ta.oninput = () => { const n = (ta.value.match(/[A-Za-z’']+/g) || []).length; hk.textContent = n + ' kata'; hk.classList.toggle('cukup', n >= W.minKata) }
    mulaiTimer(W.menit, el.querySelector('.ie-timer'), () => G.toast('Waktu habis! Selesaiin kalimat terakhir terus pencet Selesai.'))
    el.querySelector('.kirim').onclick = () => {
      const teks = ta.value.trim(); if (!teks) return G.toast('Tulis dulu jawabannya.')
      henti()
      const a = analisis(teks)
      G.tambahXP(30); simpanHasil({ jenis: 'writing', band: '–', kata: a.kata, task: W.id })
      const h = el.querySelector('.ie-hasil')
      h.innerHTML = analisisHTML(a, W.minKata) + `<section class="panel"><h2>Minta penilaian</h2><p class="redup">Tutor AI bakal nilai pakai 4 kriteria resmi (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) dan nunjukin kalimat yang perlu dibenerin.</p>${tombolAI('Salin buat dinilai AI', `IELTS Writing ${W.judul}\nSoal: ${W.soal}\n\nJawaban saya (${a.kata} kata):\n${teks}`)}</section><div class="beres-tombol baris"><button class="btn garis besar ie-balik">Balik ke Mock IELTS</button></div>`
      pasangAI(h); h.querySelector('.ie-balik').onclick = o.kembali
      h.scrollIntoView({ behavior: G.reduksi() ? 'auto' : 'smooth' })
    }
  }

  // ---------- Speaking ----------
  const ucap = teks => new Promise(r => {
    if (!('speechSynthesis' in window)) return r()
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(teks); u.lang = 'en-GB'; u.rate = .95
    const v = speechSynthesis.getVoices().find(x => /en-GB/i.test(x.lang)); if (v) u.voice = v
    u.onend = r; u.onerror = r; speechSynthesis.speak(u)
  })
  const speaking = (el, o) => {
    const SR = window.self === window.top ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
    el.innerHTML = `<div class="ie-ujian sempit">${kepalaUjian('Speaking · Part 1 sampai 3')}
      <section class="panel ie-sp-awal"><h2>Ruang Speaking</h2><p class="redup">Examiner bacain pertanyaan pakai suara. Part 1 (3 pertanyaan), Part 2 (1 menit persiapan, ngomong maksimal 2 menit), Part 3 (2 pertanyaan). ${SR ? 'Jawab pakai mik, nanti ditranskrip otomatis (di Chrome suaranya diproses server Google).' : 'Mik ga tersedia di sini, jadi jawabannya diketik.'}</p>
      <div class="baris-tombol"><button class="btn utama besar mulai">${ikon('mik', 18)} Mulai simulasi</button><a class="btn garis" href="${TUTOR}" target="_blank" rel="noopener">Ngobrol sama AI examiner</a></div></section><div class="ie-sp"></div></div>`
    pasangTutup(el, o)
    const sp = el.querySelector('.ie-sp')
    el.querySelector('.mulai').onclick = async () => {
      el.querySelector('.ie-sp-awal').hidden = true
      const S = D.speaking, acak = G.acak, p2 = acak(S.part2)[0]
      const alur = [...acak(S.part1).slice(0, 3).map(q => ({ part: 1, q, detik: 45 })), { part: 2, q: `${p2.topik} You should say: ${p2.poin.join(', ')}.`, siap: 60, detik: 120, poin: p2.poin, topik: p2.topik }, ...acak(S.part3).slice(0, 2).map(q => ({ part: 3, q, detik: 75 }))]
      const jawaban = []
      for (let i = 0; i < alur.length; i++) {
        if (!document.body.contains(sp)) return
        const a = alur[i]
        sp.innerHTML = `<section class="panel ie-sp-kartu"><div class="baris-tombol"><span class="tag">Part ${a.part}</span><span class="redup kecil">Pertanyaan ${i + 1}/${alur.length}</span><span class="spasi"></span><span class="chip-stat t-sp"></span></div>
          <p class="iv-q">${esc(a.part === 2 ? a.topik : a.q)}</p>${a.poin ? `<ul class="ie-poin">${a.poin.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
          <p class="fase redup">Dengerin pertanyaannya…</p><textarea class="tulis trans" rows="5" placeholder="${SR ? 'Transkrip muncul di sini pas kamu ngomong. Bisa diedit.' : 'Ketik jawabanmu.'}"></textarea>
          <div class="baris-tombol"><span class="spasi"></span><button class="btn utama lanjut">Selesai jawab ${ikon('kanan', 16)}</button></div></section>`
        await ucap(a.q)
        const fase = sp.querySelector('.fase'), trans = sp.querySelector('.trans'), t = sp.querySelector('.t-sp')
        const tunggu = menit => new Promise(r => { mulaiTimer(menit, t, r); sp.querySelector('.lanjut').onclick = () => { clearInterval(pewaktu); r() } })
        if (a.siap) { fase.innerHTML = '<b>Persiapan 1 menit.</b> Bikin catatan singkat, nanti dihapus pas mulai ngomong.'; await tunggu(a.siap / 60); trans.value = ''; await ucap('Now, please start speaking.') }
        fase.innerHTML = SR ? '<b>Silakan jawab.</b> Mik nyala.' : '<b>Silakan jawab.</b>'
        let rec = null
        if (SR) {
          rec = new SR(); rec.lang = 'en-GB'; rec.continuous = true; rec.interimResults = true; let fin = ''
          rec.onresult = e => { let s = ''; for (let j = e.resultIndex; j < e.results.length; j++) { if (e.results[j].isFinal) fin += e.results[j][0].transcript + ' '; else s += e.results[j][0].transcript } trans.value = fin + s }
          rec.onerror = () => { fase.textContent = 'Mik ga jalan. Ketik jawabanmu aja.' }
          try { rec.start() } catch (e) { }
        }
        const m = Date.now()
        await tunggu(a.detik / 60)
        if (rec) try { rec.stop() } catch (e) { }
        await new Promise(r => setTimeout(r, 400))
        jawaban.push({ part: a.part, q: a.q, teks: trans.value.trim(), detik: Math.round((Date.now() - m) / 1000) })
      }
      await ucap('Thank you. That is the end of the speaking test.')
      const an = analisis(jawaban.map(j => j.teks).join('\n')), dtk = jawaban.reduce((n, j) => n + j.detik, 0), wpm = dtk ? Math.round(an.kata / (dtk / 60)) : 0
      G.tambahXP(40); simpanHasil({ jenis: 'speaking', band: '–', kata: an.kata })
      const isi = `IELTS Speaking mock (transkrip otomatis, mungkin ada salah dengar):\n\n${jawaban.map(j => `[Part ${j.part}] Q: ${j.q}\nA: ${j.teks || '(kosong)'}`).join('\n\n')}`
      sp.innerHTML = `<section class="panel"><h2>Selesai! Ini transkrip kamu</h2>${jawaban.map(j => `<p><span class="tag">Part ${j.part}</span> <b>${esc(j.q)}</b><br>${esc(j.teks || '(kosong)')}</p>`).join('')}<p class="redup">Kecepatan ngomong: <b>${wpm} kata/menit</b> (natural sekitar 110 sampai 150).</p></section>${analisisHTML(an)}<section class="panel"><h2>Minta penilaian</h2><p class="redup">Tutor AI ngasih band per kriteria (Fluency & Coherence, Lexical Resource, Grammar, Pronunciation dari transkrip) dan contoh jawaban yang lebih bagus.</p>${tombolAI('Salin buat dinilai AI', isi)}</section><div class="beres-tombol baris"><button class="btn garis besar ie-balik">Balik ke Mock IELTS</button></div>`
      pasangAI(sp); sp.querySelector('.ie-balik').onclick = o.kembali
    }
  }

  // ---------- beranda Mock IELTS ----------
  const BAGIAN = [
    { id: 'reading', nama: 'Reading', ket: '1 passage, 13 soal: True/False/Not Given, pilihan ganda, isian.', menit: D.reading.menit, ikon: 'kartu' },
    { id: 'listening', nama: 'Listening', ket: 'Section 1: telepon booking tur, 10 soal isian formulir.', menit: D.listening.menit, ikon: 'obrol' },
    { id: 'writing', nama: 'Writing', ket: 'Task 1 deskripsi grafik dan Task 2 esai opini.', menit: 60, ikon: 'pensil' },
    { id: 'speaking', nama: 'Speaking', ket: 'Part 1 sampai 3, pertanyaan dibacain, jawab pakai suara.', menit: 12, ikon: 'mik' },
  ]
  const beranda = (el, o) => {
    henti()
    const r = riwayat()
    const bands = ['reading', 'listening'].map(j => (terakhir(j) || {}).band).filter(b => typeof b === 'number')
    el.innerHTML = `<div class="ielts-hal" style="--garis:${WARNA}">
      <a href="#skill-EN" class="balik-link">${ikon('kiri', 16)} Bahasa Inggris Kerja</a>
      <header class="skill-kepala"><span class="kode besar" style="background:${WARNA}">IE</span><div><span class="label-kecil">Mock test · IELTS Academic</span><h1>Mock IELTS</h1><p class="redup">Format dan timer kayak ujian asli. Reading dan Listening dinilai otomatis. Writing dan Speaking dianalisis di sini, terus bisa dinilai Tutor AI pakai kriteria resmi.</p></div></header>
      <div class="ielts-grid">
        <div class="lat-grid">${BAGIAN.map(b => { const t = terakhir(b.id); return `<a class="lat-kartu" href="#ielts-${b.id}" style="--garis:${WARNA}"><div class="lat-ikon">${ikon(b.ikon, 26)}</div><b>${b.nama}</b><p class="redup kecil">${b.ket}</p><span class="lat-stat">${b.menit} menit${t ? ` · terakhir: ${typeof t.band === 'number' ? 'band ' + t.band : t.kata + ' kata'}` : ''}</span></a>` }).join('')}</div>
        <aside class="kolom-samping">
          <section class="panel ie-ringkas"><span class="label-kecil">Band terakhir</span><div class="ie-band-besar">${bands.length ? (Math.round(bands.reduce((a, b) => a + b, 0) / bands.length * 2) / 2).toFixed(1) : '–'}</div><p class="redup kecil">${bands.length ? 'Rata-rata Reading dan Listening terakhir.' : 'Kerjain Reading atau Listening dulu buat dapet estimasi.'}</p>
            <div class="ie-empat">${['reading', 'listening', 'writing', 'speaking'].map(j => { const t = terakhir(j); return `<div><small>${j}</small><b>${t ? t.band : '–'}</b></div>` }).join('')}</div></section>
          <section class="panel"><h2>Cara pakainya</h2><ol class="ie-langkah"><li><b>Diagnosa.</b> Kerjain Reading dan Listening sekali buat tau posisimu.</li><li><b>Latihan.</b> Ulangi bagian paling lemah, pantau riwayatnya.</li><li><b>Writing & Speaking.</b> Coba sendiri dulu, baru minta feedback AI.</li><li><b>Perbaiki.</b> Tulis ulang pakai saran AI, bandingin hasilnya.</li></ol></section>
        </aside>
      </div>
      <section><h2 class="judul-bagian">Riwayat</h2>${r.length ? `<div class="tabel-geser"><table class="hasil"><thead><tr><th>Tanggal</th><th>Bagian</th><th>Hasil</th><th>Band</th></tr></thead><tbody>${r.map(x => `<tr><td>${new Date(x.tgl).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td><td class="kapital">${x.jenis}</td><td>${x.total ? `${x.benar}/${x.total}` : x.kata ? `${x.kata} kata` : '–'}</td><td><b>${x.band}</b></td></tr>`).join('')}</tbody></table></div>` : '<p class="redup">Belum ada riwayat. Mulai dari Reading.</p>'}</section>
      <p class="redup kecil">Soal dibuat sendiri, bukan soal resmi IELTS. Skor cuma estimasi buat latihan.</p></div>`
  }

  const buka = (el, bagian, o) => {
    henti()
    if (bagian === 'reading') return reading(el, o)
    if (bagian === 'listening') return listening(el, o)
    if (bagian === 'writing') return writing(el, o)
    if (bagian === 'speaking') return speaking(el, o)
    return beranda(el, o)
  }
  return { buka, beranda, henti }
})()
