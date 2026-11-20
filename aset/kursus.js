// Mesin halaman kursus: sidebar pelajaran, langkah materi, latihan dicek otomatis.
(async () => {
  const qs = new URLSearchParams(location.search)
  const k = qs.get('k') || 'sql'
  const K = (window.KURSUS || {})[k]
  const NAMA_MENU = { sql: 'SQL', excel: 'Excel', powerbi: 'Power BI', statistik: 'Statistik' }
  GAS.header(NAMA_MENU[k] || '')
  const main = document.getElementById('isi')
  if (!K) { main.innerHTML = '<div class="kartu">Kursus ga ketemu. <a href="index.html">Balik ke beranda</a>.</div>'; return }
  document.title = `${K.nama} · Get a Skill`

  const semua = K.level.flatMap(l => l.pelajaran.map(p => ({ ...p, level: l.nama })))
  const latihanDari = p => p.langkah.map((s, i) => ({ s, i })).filter(x => x.s.t !== 'teks')
  const kunci = (p, i) => `${k}:${p.id}:${i}`
  const lessonBeres = p => latihanDari(p).every(x => GAS.sudah(kunci(p, x.i)))

  // ---------- database SQL ----------
  let db = null
  if (K.butuhDB) {
    main.innerHTML = '<div class="kartu muted">Nyiapin database di browser…</div>'
    try {
      const SQL = await initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` })
      db = new SQL.Database()
      db.run(window.BUAT_DB_SQL())
    } catch (e) {
      main.innerHTML = `<div class="kartu">Database gagal dimuat (${GAS.esc(e.message)}). Cek koneksi lalu muat ulang.</div>`
      return
    }
  }
  const jalankan = q => {
    const res = db.exec(q)
    return res.length ? res[res.length - 1] : { columns: [], values: [] }
  }
  const tabelHTML = r => {
    if (!r.columns.length) return '<div class="muted" style="margin-top:8px">Query jalan, tapi ga ada baris yang keluar.</div>'
    const rows = r.values.slice(0, 200)
    return `<div class="tabel-wadah"><table class="hasil"><tr>${r.columns.map(c => `<th>${GAS.esc(c)}</th>`).join('')}</tr>${rows.map(v => `<tr>${v.map(x => `<td>${x === null ? '<i class="muted">NULL</i>' : GAS.esc(x)}</td>`).join('')}</tr>`).join('')}</table></div><div class="muted" style="font-size:12px">${r.values.length} baris${r.values.length > 200 ? ' (200 pertama)' : ''}</div>`
  }
  const normNilai = x => typeof x === 'number' ? (Number.isInteger(x) ? String(x) : x.toFixed(4)) : String(x)
  const samaHasil = (a, b, urut) => {
    if (a.columns.length !== b.columns.length || a.values.length !== b.values.length) return false
    const ra = a.values.map(r => r.map(normNilai).join('\u0001'))
    const rb = b.values.map(r => r.map(normNilai).join('\u0001'))
    if (!urut) { ra.sort(); rb.sort() }
    return ra.every((x, i) => x === rb[i])
  }

  // ---------- render ----------
  const norm = s => String(s).toLowerCase().replace(/\s+/g, '').replace(/;/g, ',').replace(/'/g, '"').replace(/^=/, '=')
  const total = semua.reduce((n, p) => n + latihanDari(p).length, 0)

  const sidebar = aktif => {
    const pr = GAS.progresKursus(k, total)
    return `<aside class="kartu sidebar"><div class="baris"><span class="ikon">${K.ikon}</span><div><b>${GAS.esc(K.nama)}</b><div class="muted" style="font-size:13px">${pr.n}/${pr.total} latihan · ${pr.persen}%</div></div></div><div class="bar" style="margin-top:10px"><i style="width:${pr.persen}%"></i></div>` +
      K.level.map(l => `<div class="level-judul">${l.nama}</div>` + l.pelajaran.map(p => `<a class="pelajaran-link ${p.id === aktif ? 'on' : ''}" href="?k=${k}&p=${p.id}"><span class="cek ${lessonBeres(p) ? 'ok' : ''}">${lessonBeres(p) ? '✓' : ''}</span>${GAS.esc(p.judul)}</a>`).join('')).join('') +
      `<div class="level-judul">Level berikutnya</div><div class="muted" style="font-size:13px;padding:0 10px">Materi baru ditambah bertahap. Selesaiin yang ada dulu.</div></aside>`
  }

  const render = () => {
    const pid = qs.get('p') || semua[0].id
    const idx = Math.max(0, semua.findIndex(p => p.id === pid))
    const p = semua[idx]
    const lanjut = semua[idx + 1]
    const skema = K.butuhDB ? `<div class="kartu" style="margin-bottom:14px"><div class="baris"><b>Intip tabel:</b>${['pelanggan', 'produk', 'pesanan', 'item'].map(t => `<button class="btn" data-intip="${t}">${t}</button>`).join('')}</div><div id="intip"></div></div>` : ''
    main.innerHTML = `<div class="kursus-layout">${sidebar(p.id)}<section><div class="kartu"><span class="tag">${p.level}</span><h1 style="margin-top:8px">${GAS.esc(p.judul)}</h1>${idx === 0 ? `<p class="muted">${K.intro}</p>` : ''}</div><div style="height:14px"></div>${skema}<div id="langkah"></div><div class="baris" style="margin-top:18px">${idx > 0 ? `<a class="btn" href="?k=${k}&p=${semua[idx - 1].id}">‹ Sebelumnya</a>` : ''}<span class="spasi"></span>${lanjut ? `<a class="btn utama" href="?k=${k}&p=${lanjut.id}">Lanjut: ${GAS.esc(lanjut.judul)} ›</a>` : '<a class="btn utama" href="index.html">Selesai, balik ke beranda</a>'}</div></section></div>`
    main.querySelectorAll('[data-intip]').forEach(b => b.onclick = () => { document.getElementById('intip').innerHTML = tabelHTML(jalankan(`SELECT * FROM ${b.dataset.intip} LIMIT 8`)) })
    const wadah = document.getElementById('langkah')
    p.langkah.forEach((s, i) => wadah.appendChild(langkah(p, s, i)))
  }

  const umpan = (el, ok, teks) => { el.className = 'umpan ' + (ok === null ? 'info' : ok ? 'ok' : 'bad'); el.innerHTML = teks }
  const tandai = (box, p, i, ok) => {
    box.classList.toggle('benar', ok); box.classList.toggle('salah', !ok)
    if (ok && GAS.beres(kunci(p, i))) document.querySelector('.sidebar').outerHTML = sidebar(p.id)
  }

  const langkah = (p, s, i) => {
    const box = document.createElement('div')
    box.className = 'langkah'
    if (s.t === 'teks') { box.innerHTML = `<div class="kartu">${s.isi}</div>`; return box }
    const sudah = GAS.sudah(kunci(p, i))
    box.innerHTML = `<div class="latihan ${sudah ? 'benar' : ''}"><div class="baris"><span class="tag ${sudah ? 'ok' : ''}">${sudah ? '✓ Beres' : 'Latihan'}</span></div><p>${s.tanya}</p><div class="badan"></div><div class="umpan" hidden></div></div>`
    const lat = box.querySelector('.latihan'), badan = box.querySelector('.badan'), out = box.querySelector('.umpan')
    let salah = 0
    const tunjukUmpan = (ok, teks) => { out.hidden = false; umpan(out, ok, teks) }

    if (s.t === 'pg') {
      badan.innerHTML = `<div class="opsi">${s.opsi.map((o, j) => `<button data-j="${j}">${o}</button>`).join('')}</div>`
      badan.querySelectorAll('button').forEach(b => b.onclick = () => {
        const j = Number(b.dataset.j), ok = j === s.benar
        badan.querySelectorAll('button').forEach(x => x.classList.remove('benar', 'salah'))
        b.classList.add(ok ? 'benar' : 'salah')
        tandai(lat, p, i, ok)
        tunjukUmpan(ok, (ok ? 'Bener! ' : 'Belum tepat. ') + (s.jelas || ''))
      })
    } else if (s.t === 'isian' || s.t === 'angka') {
      badan.innerHTML = `<div class="baris"><input type="text" placeholder="${s.t === 'angka' ? 'Jawab pakai angka' : 'Ketik jawaban'}" style="flex:1;min-width:200px"><button class="btn utama">Cek</button></div>`
      const inp = badan.querySelector('input')
      const cek = () => {
        let ok
        if (s.t === 'angka') { const v = Number(inp.value.replace(',', '.')); ok = Math.abs(v - s.benar) <= (s.toleransi ?? 0.001) }
        else ok = s.benar.some(b => norm(b) === norm(inp.value))
        if (!ok) salah++
        tandai(lat, p, i, ok)
        tunjukUmpan(ok, ok ? 'Bener!' : salah >= 2 ? `Jawabannya: <code>${GAS.esc(s.jelas)}</code>` : 'Belum tepat, coba lagi.')
      }
      badan.querySelector('button').onclick = cek
      inp.onkeydown = e => { if (e.key === 'Enter') cek() }
    } else if (s.t === 'sql') {
      badan.innerHTML = `<textarea class="kode" spellcheck="false" placeholder="Tulis query di sini..."></textarea><div class="baris" style="margin-top:8px"><button class="btn" data-a="run">▶ Jalankan</button><button class="btn utama" data-a="cek">Cek jawaban</button><button class="btn" data-a="hint">💡 Petunjuk</button><span class="muted" style="font-size:12px">Ctrl+Enter buat jalanin</span></div><div class="hasil-q"></div>`
      const ta = badan.querySelector('textarea'), hasil = badan.querySelector('.hasil-q')
      const run = () => {
        try { const r = jalankan(ta.value); hasil.innerHTML = tabelHTML(r); return r }
        catch (e) { hasil.innerHTML = `<div class="umpan bad">Error: ${GAS.esc(e.message)}</div>`; return null }
      }
      badan.querySelector('[data-a=run]').onclick = run
      ta.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run() } }
      badan.querySelector('[data-a=hint]').onclick = () => tunjukUmpan(null, '💡 ' + s.petunjuk)
      badan.querySelector('[data-a=cek]').onclick = () => {
        const r = run(); if (!r) return
        const ok = samaHasil(r, jalankan(s.kunci), s.urut)
        if (!ok) salah++
        tandai(lat, p, i, ok)
        tunjukUmpan(ok, ok ? 'Bener! Hasil query lu sama persis dengan yang diminta.' : salah >= 3 ? `Hasilnya belum sama. Salah satu jawaban yang bener:<pre>${GAS.esc(s.kunci)}</pre>` : `Hasilnya belum sama (dapet ${r.values.length} baris, ${r.columns.length} kolom). Cek lagi kolom, syarat, dan urutannya.`)
      }
    }
    return box
  }
  GAS.tandaiAktif()
  render()
})()
