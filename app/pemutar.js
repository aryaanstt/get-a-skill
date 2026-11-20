// Pemutar pelajaran (satu langkah per layar) dan tes penempatan adaptif.
window.GAS_PEMUTAR = (() => {
  const { esc, acak, ikon, KAT } = G
  const X = window.GAS_EXCEL

  // ---------- database SQL (dimuat sekali) ----------
  let dbJanji = null
  const ambilDB = () => dbJanji || (dbJanji = (async () => {
    if (!window.initSqlJs) throw new Error('Mesin SQL belum kemuat')
    const SQL = await initSqlJs({ locateFile: f => 'vendor/' + f })
    const db = new SQL.Database(); db.run(window.BUAT_DB_SQL()); return db
  })())
  const jalankan = (db, q) => { const r = db.exec(q); return r.length ? r[r.length - 1] : { columns: [], values: [] } }
  const normNilai = x => typeof x === 'number' ? (Number.isInteger(x) ? String(x) : x.toFixed(4)) : String(x)
  const samaHasil = (a, b, urut) => {
    if (a.columns.length !== b.columns.length || a.values.length !== b.values.length) return false
    const ra = a.values.map(r => r.map(normNilai).join('\u0001')), rb = b.values.map(r => r.map(normNilai).join('\u0001'))
    if (!urut) { ra.sort(); rb.sort() }
    return ra.every((x, i) => x === rb[i])
  }
  const tabelHTML = (r, maks = 50) => {
    if (!r.columns.length) return '<p class="redup kecil">Query jalan, tapi ga ada baris yang keluar.</p>'
    return `<div class="tabel-geser"><table class="hasil"><thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${r.values.slice(0, maks).map(v => `<tr>${v.map(x => `<td>${x === null ? '<i class="redup">NULL</i>' : esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="redup kecil">${r.values.length} baris${r.values.length > maks ? ` (${maks} pertama)` : ''}</p>`
  }

  // ---------- util jawaban ----------
  const norm = s => String(s).toLowerCase().replace(/\s+/g, '').replace(/[‘’']/g, '"').replace(/[“”]/g, '"').replace(/;/g, ',')
  const bacaAngka = s => {
    s = String(s).trim().replace(/\s|rp|%|x|juta|km|jam/gi, '')
    if (!s) return NaN
    if (s.includes('.') && s.includes(',')) s = s.replace(/\./g, '').replace(',', '.')
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '')
    else s = s.replace(',', '.')
    return Number(s)
  }
  const PUJIAN = ['Mantap!', 'Bener!', 'Keren!', 'Pas banget!', 'Tepat!', 'Nah gitu!']
  const pujian = () => PUJIAN[Math.floor(Math.random() * PUJIAN.length)]
  const ULANG = ['pilih', 'banyak', 'isian', 'angka', 'urut', 'slider']
  const kata = s => (String(s).trim().match(/\S+/g) || []).length
  let autoFokus = true
  const fokus = fn => { if (autoFokus) setTimeout(fn, 60) }

  // ---------- perenderer tiap jenis langkah ----------
  // api.siap(bool): aktifin tombol Cek. api.selesai(hasil): langkah selesai sendiri (pasang).
  const R = {}

  R.info = (s, el) => { el.innerHTML = `<h2 class="pm-judul">${s.judul || ''}</h2><div class="materi">${s.isi}</div>`; return { mode: 'lanjut' } }

  R.pilih = (s, el, api) => {
    const urut = acak(s.opsi.map((_, i) => i))
    let pilih = null
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="opsi" role="radiogroup">${urut.map((i, n) => `<button class="op" role="radio" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${s.opsi[i]}</span></button>`).join('')}</div>`
    const bs = [...el.querySelectorAll('.op')]
    bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-checked', x === b)); pilih = Number(b.dataset.i); api.siap(true) })
    return {
      mode: 'cek', tombol: n => bs[n] && bs[n].click(),
      cek() {
        const ok = pilih === s.benar
        bs.forEach(b => { b.disabled = true; const i = Number(b.dataset.i); if (i === s.benar) b.classList.add('benar'); else if (i === pilih) b.classList.add('salah') })
        return { ok, pesan: ok ? pujian() : `Jawabannya: <b>${s.opsi[s.benar]}</b>`, jelas: s.jelas }
      },
    }
  }

  R.banyak = (s, el, api) => {
    const urut = acak(s.opsi.map((_, i) => i)), dipilih = new Set()
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="opsi">${urut.map((i, n) => `<button class="op cb" role="checkbox" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${s.opsi[i]}</span></button>`).join('')}</div>`
    const bs = [...el.querySelectorAll('.op')]
    bs.forEach(b => b.onclick = () => { const i = Number(b.dataset.i); dipilih.has(i) ? dipilih.delete(i) : dipilih.add(i); b.setAttribute('aria-checked', dipilih.has(i)); api.siap(dipilih.size > 0) })
    return {
      mode: 'cek', tombol: n => bs[n] && bs[n].click(),
      cek() {
        const benar = new Set(s.benar), ok = benar.size === dipilih.size && [...benar].every(i => dipilih.has(i))
        bs.forEach(b => { b.disabled = true; const i = Number(b.dataset.i); if (benar.has(i)) b.classList.add(dipilih.has(i) ? 'benar' : 'kelewat'); else if (dipilih.has(i)) b.classList.add('salah') })
        return { ok, pesan: ok ? pujian() : 'Belum pas. Yang hijau garis putus-putus itu yang kelewat.', jelas: s.jelas }
      },
    }
  }

  const isianDasar = (s, el, api, angka) => {
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="isian"><input type="text" ${angka ? 'inputmode="decimal"' : ''} autocomplete="off" spellcheck="false" placeholder="${angka ? 'Ketik angka' : 'Ketik jawaban'}" aria-label="Jawaban">${s.satuan ? `<span class="satuan">${s.satuan}</span>` : ''}</div>`
    const inp = el.querySelector('input')
    inp.oninput = () => api.siap(inp.value.trim().length > 0)
    fokus(() => inp.focus({ preventScroll: true }))
    return inp
  }
  R.isian = (s, el, api) => {
    const inp = isianDasar(s, el, api, false)
    return { mode: 'cek', cek() { const ok = s.benar.some(b => norm(b) === norm(inp.value)); inp.disabled = true; inp.classList.add(ok ? 'benar' : 'salah'); return { ok, pesan: ok ? pujian() : `Jawabannya: <code>${esc(s.benar[0])}</code>`, jelas: ok ? '' : s.jelas && s.jelas !== s.benar[0] ? s.jelas : '' } } }
  }
  R.angka = (s, el, api) => {
    const inp = isianDasar(s, el, api, true)
    return {
      mode: 'cek', cek() {
        const v = bacaAngka(inp.value)
        if (Number.isNaN(v)) return { tolak: 'Isinya angka aja ya' }
        const ok = Math.abs(v - s.benar) <= (s.toleransi ?? 0.001)
        inp.disabled = true; inp.classList.add(ok ? 'benar' : 'salah')
        return { ok, pesan: ok ? pujian() : `Jawabannya: <b>${G.angka(s.benar)}${s.satuan ? ' ' + s.satuan : ''}</b>`, jelas: s.jelas }
      },
    }
  }
  R.slider = (s, el, api) => {
    const awal = Math.round((s.min + s.max) / 2 / s.step) * s.step
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="geser"><output>${awal}</output><span class="satuan">${s.satuan || ''}</span><input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${awal}" aria-label="Tebakan"><div class="geser-ujung"><span>${s.min}</span><span>${s.max}</span></div></div>`
    const inp = el.querySelector('input'), out = el.querySelector('output')
    inp.oninput = () => { out.textContent = inp.value; api.siap(true) }
    return { mode: 'cek', cek() { const v = Number(inp.value), ok = Math.abs(v - s.benar) <= (s.toleransi || 0); inp.disabled = true; return { ok, pesan: ok ? pujian() : `Jawabannya sekitar <b>${s.benar} ${s.satuan || ''}</b>. Tebakanmu ${v}.`, jelas: s.jelas } } }
  }

  R.urut = (s, el, api) => {
    const sisa = acak(s.item.map((_, i) => i)), jawab = []
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><ol class="urut-jawab" aria-label="Urutan kamu"></ol><p class="redup kecil urut-ket">Ketuk kartu di bawah sesuai urutan. Ketuk lagi buat balikin.</p><div class="urut-sisa"></div>`
    const elJ = el.querySelector('.urut-jawab'), elS = el.querySelector('.urut-sisa')
    let terkunci = false
    const gambar = () => {
      elJ.innerHTML = jawab.map((i, n) => `<li><button class="ur" data-i="${i}" ${terkunci ? 'disabled' : ''}><b>${n + 1}</b><span>${s.item[i]}</span></button></li>`).join('') + Array.from({ length: s.item.length - jawab.length }, (_, n) => `<li class="kosong"><b>${jawab.length + n + 1}</b></li>`).join('')
      elS.innerHTML = sisa.map(i => `<button class="ur" data-i="${i}">${s.item[i]}</button>`).join('')
      elJ.querySelectorAll('.ur').forEach(b => b.onclick = () => { const i = Number(b.dataset.i); jawab.splice(jawab.indexOf(i), 1); sisa.push(i); gambar() })
      elS.querySelectorAll('.ur').forEach(b => b.onclick = () => { const i = Number(b.dataset.i); sisa.splice(sisa.indexOf(i), 1); jawab.push(i); gambar() })
      api.siap(sisa.length === 0)
    }
    gambar()
    return {
      mode: 'cek', cek() {
        terkunci = true; gambar()
        const ok = jawab.every((i, n) => i === n)
        elJ.querySelectorAll('.ur').forEach((b, n) => b.classList.add(Number(b.dataset.i) === n ? 'benar' : 'salah'))
        return { ok, pesan: ok ? pujian() : 'Urutannya belum pas.', jelas: (ok ? '' : `<ol class="kunci-urut">${s.item.map(t => `<li>${t}</li>`).join('')}</ol>`) + (s.jelas || '') }
      },
    }
  }

  R.pasang = (s, el, api) => {
    const kiri = acak(s.pasangan.map((_, i) => i)), kanan = acak(s.pasangan.map((_, i) => i))
    let pilihK = null, pilihN = null, salah = 0, cocok = 0
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="pasang"><div class="kol">${kiri.map(i => `<button class="ps" data-sisi="k" data-i="${i}">${s.pasangan[i][0]}</button>`).join('')}</div><div class="kol">${kanan.map(i => `<button class="ps" data-sisi="n" data-i="${i}">${s.pasangan[i][1].trim()}</button>`).join('')}</div></div>`
    const coba = () => {
      if (pilihK == null || pilihN == null) return
      const bK = el.querySelector(`.ps[data-sisi=k][data-i="${pilihK}"]`), bN = el.querySelector(`.ps[data-sisi=n][data-i="${pilihN}"]`)
      if (s.pasangan[pilihK][1].trim() === s.pasangan[pilihN][1].trim()) {
        cocok++
        ;[bK, bN].forEach(b => { b.classList.remove('dipilih'); b.classList.add('cocok'); b.disabled = true; b.style.setProperty('--n', cocok) })
        if (cocok === s.pasangan.length) setTimeout(() => api.selesai({ ok: true, pertama: salah === 0, pesan: salah ? `Beres, ${salah} kali salah pasang.` : pujian() + ' Semua pas tanpa salah.', jelas: s.jelas }), 250)
      } else {
        salah++
        ;[bK, bN].forEach(b => { b.classList.remove('dipilih'); b.classList.add('goyang'); setTimeout(() => b.classList.remove('goyang'), 450) })
      }
      pilihK = pilihN = null
    }
    el.querySelectorAll('.ps').forEach(b => b.onclick = () => {
      const sisi = b.dataset.sisi, i = Number(b.dataset.i)
      el.querySelectorAll(`.ps[data-sisi=${sisi}]`).forEach(x => x.classList.remove('dipilih'))
      b.classList.add('dipilih')
      if (sisi === 'k') pilihK = i; else pilihN = i
      coba()
    })
    return { mode: 'sendiri' }
  }

  R.skenario = (s, el, api) => {
    const urut = acak(s.opsi.map((_, i) => i))
    let pilih = null
    el.innerHTML = `<span class="label-kecil">${ikon('obrol', 14)} Situasi kerja</span><p class="pm-tanya">${s.tanya}</p><div class="opsi">${urut.map((i, n) => `<button class="op" role="radio" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${s.opsi[i].teks}</span></button>`).join('')}</div>`
    const bs = [...el.querySelectorAll('.op')]
    bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-checked', x === b)); pilih = Number(b.dataset.i); api.siap(true) })
    return {
      mode: 'cek', tombol: n => bs[n] && bs[n].click(),
      cek() {
        const o = s.opsi[pilih], ok = o.skor === 2
        bs.forEach(b => {
          b.disabled = true; const i = Number(b.dataset.i), x = s.opsi[i]
          b.classList.add(x.skor === 2 ? 'benar' : i === pilih ? (x.skor === 1 ? 'lumayan' : 'salah') : 'redupkan')
          b.insertAdjacentHTML('beforeend', `<small class="op-ket">${x.ket}</small>`)
        })
        return { ok, pesan: ok ? pujian() : o.skor === 1 ? 'Lumayan, tapi ada yang lebih pas.' : 'Kurang tepat.', jelas: '' }
      },
    }
  }

  R.kartu = (s, el, api) => {
    let i = 0, dibalik = false
    const gambar = () => {
      const [d, b] = s.kartu[i]
      el.innerHTML = `<h2 class="pm-judul">${s.judul || 'Kartu'}</h2><div class="kartu-flip ${dibalik ? 'balik' : ''}" tabindex="0" role="button" aria-label="Balik kartu"><div class="sisi depan">${d}</div><div class="sisi belakang">${b}</div></div><div class="kartu-nav"><span class="redup kecil">${i + 1} / ${s.kartu.length} · ketuk kartu buat balik</span><button class="btn kecil" ${dibalik ? '' : 'disabled'}>${i + 1 < s.kartu.length ? 'Kartu berikutnya' : 'Udah semua'} ${ikon('kanan', 16)}</button></div>`
      const k = el.querySelector('.kartu-flip')
      k.onclick = k.onkeydown = e => { if (e.type === 'keydown' && e.key !== ' ' && e.key !== 'Enter') return; e.preventDefault(); dibalik = !dibalik; k.classList.toggle('balik', dibalik); el.querySelector('.kartu-nav .btn').disabled = false }
      el.querySelector('.kartu-nav .btn').onclick = () => { if (i + 1 < s.kartu.length) { i++; dibalik = false; gambar() } else api.siap(true) }
    }
    gambar()
    return { mode: 'lanjut', kunci: true }
  }

  R.tulis = (s, el, api, ctx) => {
    const lama = (G.D().tulisan || {})[ctx.kunci] || ''
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><textarea class="tulis" rows="7" placeholder="Tulis di sini…">${esc(lama)}</textarea><div class="tulis-info"><span class="hitung-kata">0 / ${s.minKata} kata</span></div><div class="rubrik" hidden><b>Cek sendiri:</b>${s.rubrik.map((r, i) => `<label><input type="checkbox"> ${r}</label>`).join('')}<button class="btn kecil garis salin-ai">${ikon('salin', 16)} Salin buat minta feedback AI</button></div>`
    const ta = el.querySelector('textarea'), hk = el.querySelector('.hitung-kata')
    const upd = () => { const n = kata(ta.value); hk.textContent = `${n} / ${s.minKata} kata`; hk.classList.toggle('cukup', n >= s.minKata); api.siap(n >= s.minKata) }
    ta.oninput = upd; upd()
    fokus(() => ta.focus({ preventScroll: true }))
    el.querySelector('.salin-ai').onclick = () => G.salin(`${s.ai}\n\n${ta.value.trim()}`)
    return {
      mode: 'cek', enterBebas: true,
      cek() {
        G.D().tulisan[ctx.kunci] = ta.value.trim(); G.simpan()
        el.querySelector('.rubrik').hidden = false
        return { ok: true, pesan: 'Tersimpan.', jelas: 'Centang rubrik di atas buat ngecek sendiri, atau salin ke AI buat feedback.' }
      },
    }
  }

  R.sql = (s, el, api, ctx) => {
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="skema">${['pelanggan', 'produk', 'pesanan', 'item'].map(t => `<button class="chip" data-t="${t}">${ikon('tabel', 14)} ${t}</button>`).join('')}</div><div class="intip"></div><div class="editor"><textarea class="kode-sql" spellcheck="false" autocapitalize="off" autocomplete="off" rows="5" placeholder="SELECT …" aria-label="Query SQL"></textarea><div class="editor-bar"><button class="btn kecil jalan">${ikon('main', 14)} Jalankan</button><span class="redup kecil">Ctrl + Enter</span></div></div><div class="hasil-q"></div>`
    const ta = el.querySelector('textarea'), hasil = el.querySelector('.hasil-q'), intip = el.querySelector('.intip')
    let db = null
    ambilDB().then(d => { db = d }).catch(e => { hasil.innerHTML = `<p class="galat">Database gagal dimuat: ${esc(e.message)}</p>` })
    const run = () => {
      if (!db) { hasil.innerHTML = '<p class="redup kecil">Database masih disiapin…</p>'; return null }
      try { const r = jalankan(db, ta.value); hasil.innerHTML = tabelHTML(r); return r } catch (e) { hasil.innerHTML = `<p class="galat">${esc(e.message)}</p>`; return null }
    }
    el.querySelectorAll('.chip').forEach(b => b.onclick = () => {
      const on = b.classList.toggle('on'); el.querySelectorAll('.chip').forEach(x => x !== b && x.classList.remove('on'))
      intip.innerHTML = on && db ? tabelHTML(jalankan(db, `SELECT * FROM ${b.dataset.t} LIMIT 5`), 5) : ''
    })
    el.querySelector('.jalan').onclick = run
    ta.oninput = () => api.siap(ta.value.trim().length > 5)
    ta.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run() } }
    fokus(() => ta.focus({ preventScroll: true }))
    let gagal = 0
    return {
      mode: 'cek', enterBebas: true, ulangDiTempat: true,
      cek() {
        const r = run(); if (!r) { gagal++; return { ok: false, pesan: 'Query-nya error. Cek pesan merah di atas.', jelas: gagal >= 1 ? '💡 ' + s.petunjuk : '', kunci: gagal >= 2 ? s.kunci : null } }
        const ok = samaHasil(r, jalankan(db, s.kunci), s.urut)
        if (!ok) gagal++
        return { ok, pesan: ok ? pujian() + ' Hasilnya sama persis.' : 'Query jalan, tapi hasilnya belum sama dengan yang diminta.', jelas: ok ? '' : (gagal >= 1 ? '💡 ' + s.petunjuk : ''), kunci: !ok && gagal >= 2 ? s.kunci : null }
      },
      isiKunci: k => { ta.value = k; run() },
    }
  }

  R.excel = (s, el, api) => {
    const data = s.data, tgt = X.urai(s.sel)
    const petunjukSel = matchMedia('(pointer: coarse)').matches ? 'Ketuk sel buat masukin alamatnya. Ketuk sel kedua buat bikin rentang (misal D2 lalu D7).' : 'Ketik rumus, atau klik/seret sel buat masukin alamatnya.'
    const nKol = Math.max(data[0].length, tgt.c + 1), nBaris = Math.max(data.length, tgt.r + 1)
    const sel = (r, c) => r === 0 && c === tgt.c ? `<b>${esc(s.label || '')}</b>` : r === tgt.r && c === tgt.c ? '<span class="hasil-sel">?</span>' : data[r] && data[r][c] != null ? (typeof data[r][c] === 'number' ? G.angka(data[r][c]) : esc(data[r][c])) : ''
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="xl"><div class="xl-bar"><span class="xl-nama">${s.sel}</span><span class="xl-fx">fx</span><input class="xl-rumus" spellcheck="false" autocomplete="off" autocapitalize="off" value="=" aria-label="Rumus untuk sel ${s.sel}"></div><div class="xl-pratinjau redup kecil">${petunjukSel}</div><div class="xl-geser"><table class="xl-grid"><thead><tr><th></th>${Array.from({ length: nKol }, (_, c) => `<th>${X.idxKeKolom(c)}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: nBaris }, (_, r) => `<tr><th>${r + 1}</th>${Array.from({ length: nKol }, (_, c) => `<td data-r="${r}" data-c="${c}" class="${r === 0 ? 'kepala' : ''} ${r === tgt.r && c === tgt.c ? 'target' : ''} ${typeof (data[r] || [])[c] === 'number' ? 'num' : ''}">${sel(r, c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`
    const inp = el.querySelector('.xl-rumus'), pra = el.querySelector('.xl-pratinjau'), hs = el.querySelector('.hasil-sel')
    const nilaiDari = r => X.hitung(r, data)
    const pratinjau = () => {
      const v = inp.value.trim()
      api.siap(v.length > 1)
      if (v.length <= 1) { pra.className = 'xl-pratinjau redup kecil'; pra.textContent = petunjukSel; hs.textContent = '?'; return }
      try { const h = nilaiDari(v); pra.className = 'xl-pratinjau ok kecil'; pra.innerHTML = `Hasil: <b>${esc(X.tampil(h))}</b>`; hs.textContent = X.tampil(h) }
      catch (e) { pra.className = 'xl-pratinjau galat kecil'; pra.textContent = e.message; hs.textContent = '#?' }
    }
    inp.oninput = pratinjau
    // klik/seret sel → sisipin alamat
    let awal = null, sisip = null
    const alamat = td => X.idxKeKolom(Number(td.dataset.c)) + (Number(td.dataset.r) + 1)
    const tulisRef = ref => {
      const v = inp.value
      if (sisip) { inp.value = v.slice(0, sisip.a) + ref + v.slice(sisip.a + sisip.n); sisip.n = ref.length }
      else { const a = inp.selectionStart ?? v.length, b = inp.selectionEnd ?? v.length; inp.value = v.slice(0, a) + ref + v.slice(b); sisip = { a, n: ref.length } }
      const p = sisip.a + sisip.n; inp.setSelectionRange(p, p); pratinjau()
    }
    const tandai = (a, b) => {
      el.querySelectorAll('td.pilih').forEach(t => t.classList.remove('pilih'))
      if (!a) return
      const r1 = Math.min(a.r, b.r), r2 = Math.max(a.r, b.r), c1 = Math.min(a.c, b.c), c2 = Math.max(a.c, b.c)
      el.querySelectorAll('td').forEach(t => { const r = Number(t.dataset.r), c = Number(t.dataset.c); if (r >= r1 && r <= r2 && c >= c1 && c <= c2) t.classList.add('pilih') })
    }
    const pos = td => ({ r: Number(td.dataset.r), c: Number(td.dataset.c) })
    const rentang = (a, b) => (a.r === b.r && a.c === b.c) ? X.idxKeKolom(a.c) + (a.r + 1) : X.idxKeKolom(Math.min(a.c, b.c)) + (Math.min(a.r, b.r) + 1) + ':' + X.idxKeKolom(Math.max(a.c, b.c)) + (Math.max(a.r, b.r) + 1)
    const grid = el.querySelector('.xl-grid')
    // Mouse: klik atau seret. Layar sentuh: ketuk sel awal, lalu ketuk sel akhir buat bikin rentang (tabel tetap bisa digeser).
    grid.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return
      const td = e.target.closest('td'); if (!td || td.classList.contains('target')) return
      e.preventDefault(); awal = pos(td); sisip = null; tulisRef(alamat(td)); tandai(awal, awal); inp.focus({ preventScroll: true })
      grid.setPointerCapture(e.pointerId)
    })
    grid.addEventListener('pointermove', e => {
      if (!awal || e.pointerType !== 'mouse') return
      const td = document.elementFromPoint(e.clientX, e.clientY)?.closest('.xl-grid td'); if (!td) return
      const b = pos(td); tandai(awal, b); tulisRef(rentang(awal, b))
    })
    const lepas = e => { if (e.pointerType !== 'mouse') return; awal = null; sisip = null; setTimeout(() => tandai(null), 500) }
    grid.addEventListener('pointerup', lepas); grid.addEventListener('pointercancel', lepas)
    let ketuk = null
    grid.addEventListener('click', e => {
      if (e.pointerType === 'mouse' || (e.detail === 0 && !e.pointerType)) return
      const td = e.target.closest('td'); if (!td || td.classList.contains('target')) return
      const p = pos(td)
      if (ketuk && Date.now() - ketuk.t < 4000 && inp.value === ketuk.nilai) { sisip = ketuk.sisip; tulisRef(rentang(ketuk.p, p)); tandai(ketuk.p, p); ketuk = null; sisip = null; setTimeout(() => tandai(null), 900) }
      else { sisip = null; tulisRef(alamat(td)); ketuk = { p, t: Date.now(), sisip: { ...sisip }, nilai: inp.value }; sisip = null; tandai(p, p) }
    })
    fokus(() => { inp.focus({ preventScroll: true }); inp.setSelectionRange(1, 1) })
    // data acakan buat mastiin rumus bukan kebetulan sama
    const varian = () => [data[0], ...acak(data.slice(1)).map(r => r.map(v => typeof v === 'number' ? v + Math.round((Math.random() - .3) * Math.max(3, v * .4)) : v))]
    const hasilAman = (r, d) => { try { return { v: X.hitung(r, d) } } catch (e) { return { e: true } } }
    let gagal = 0
    return {
      mode: 'cek', ulangDiTempat: true,
      cek() {
        const v = inp.value.trim()
        let mine
        try { mine = nilaiDari(v) } catch (e) { gagal++; return { ok: false, pesan: e.message, jelas: gagal >= 1 ? '💡 ' + s.petunjuk : '', kunci: gagal >= 2 ? s.kunci : null } }
        const kunci = nilaiDari(s.kunci)
        if (!X.sama(mine, kunci)) { gagal++; return { ok: false, pesan: `Hasilmu <b>${esc(X.tampil(mine))}</b>, belum sesuai yang diminta.`, jelas: '💡 ' + s.petunjuk, kunci: gagal >= 2 ? s.kunci : null } }
        if (!/[A-Z]+\$?\d+/i.test(v.replace(/"[^"]*"/g, ''))) { gagal++; return { ok: false, pesan: 'Angkanya bener, tapi pakai rumus yang ngerujuk sel ya, jangan ngetik hasilnya langsung.', jelas: '💡 ' + s.petunjuk } }
        for (let i = 0; i < 3; i++) {
          const d = varian(), a = hasilAman(v, d), b = hasilAman(s.kunci, d)
          if (a.e !== b.e || (!a.e && !X.sama(a.v, b.v))) { gagal++; return { ok: false, pesan: 'Hasilnya kebetulan sama, tapi rumusnya belum tepat. Kalau datanya berubah, hasilnya bakal beda.', jelas: '💡 ' + s.petunjuk, kunci: gagal >= 2 ? s.kunci : null } }
        }
        inp.disabled = true; hs.parentElement.classList.add('beres')
        return { ok: true, pesan: pujian() + ` ${s.sel} = ${esc(X.tampil(mine))}`, jelas: v.replace(/\s/g, '').toUpperCase() !== s.kunci.toUpperCase() ? `Rumus versi kunci: <code>${esc(s.kunci)}</code>` : '' }
      },
      isiKunci: k => { inp.value = k; pratinjau() },
    }
  }

  // ---------- kerangka pemutar ----------
  const kerangka = (el, warna, judul) => {
    el.innerHTML = `<div class="pemain" style="--garis:${warna}">
      <header class="pm-atas"><button class="ikon-btn pm-tutup" aria-label="Keluar">${ikon('x', 22)}</button><div class="pm-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></div><span class="pm-xp" aria-live="polite">${ikon('petir', 16)}<b>0</b></span></header>
      <div class="pm-konteks redup kecil">${judul}</div>
      <main class="pm-isi"><div class="pm-langkah"></div></main>
      <footer class="pm-bawah"><div class="pm-umpan" aria-live="polite"></div><div class="pm-tombol"><button class="btn garis pm-lewat" hidden>Ga tau</button><button class="btn utama besar pm-aksi" disabled>Cek</button></div></footer>
    </div>`
    return {
      bar: el.querySelector('.pm-bar'), xp: el.querySelector('.pm-xp b'), isi: el.querySelector('.pm-langkah'), main: el.querySelector('.pm-isi'),
      bawah: el.querySelector('.pm-bawah'), umpan: el.querySelector('.pm-umpan'), aksi: el.querySelector('.pm-aksi'), lewat: el.querySelector('.pm-lewat'), tutup: el.querySelector('.pm-tutup'),
    }
  }

  const pelajaran = (el, id, pid, o) => {
    const K = G.kursus(id), p = K.pelajaran.find(x => x.id === pid)
    const warna = G.warnaSkill(id)
    const U = kerangka(el, warna, `${KAT.skill[id].pendek} · ${p.judul}`)
    const antre = p.langkah.map((s, i) => ({ s, i, ulang: false }))
    const total = antre.length
    let pos = 0, xp = 0, nilaiBenar = 0, nilaiTotal = 0, r = null, keadaan = 'jawab', terakhir = null, salahIni = 0
    const mulai = Date.now()
    const sudahSelesai = new Set()
    const setBar = () => { const v = Math.round(sudahSelesai.size / total * 100); U.bar.firstElementChild.style.width = v + '%'; U.bar.setAttribute('aria-valuenow', v) }
    const tambah = n => { if (!n) return; xp += n; U.xp.textContent = xp; U.xp.parentElement.classList.remove('naik'); void U.xp.offsetWidth; U.xp.parentElement.classList.add('naik') }
    const keluarkanUmpan = () => { U.bawah.className = 'pm-bawah'; U.umpan.innerHTML = '' }
    const tampil = () => {
      const a = antre[pos]
      keluarkanUmpan(); keadaan = 'jawab'; salahIni = 0
      U.isi.classList.remove('masuk'); void U.isi.offsetWidth; U.isi.classList.add('masuk')
      U.main.scrollTop = 0
      r = R[a.s.t](a.s, U.isi, {
        siap: v => { U.aksi.disabled = !v },
        selesai: h => umpan(h),
      }, { kunci: `${id}/${pid}/${a.i}` }) || { mode: 'lanjut' }
      U.aksi.hidden = r.mode === 'sendiri'
      U.aksi.textContent = r.mode === 'lanjut' ? 'Lanjut' : 'Cek'
      U.aksi.disabled = r.mode === 'cek' || !!r.kunci
      if (a.ulang) U.isi.insertAdjacentHTML('afterbegin', `<span class="label-kecil ulang">${ikon('ulang', 14)} Coba lagi yang tadi</span>`)
    }
    const umpan = h => {
      const a = antre[pos]
      if (h.tolak) { G.toast(h.tolak); return }
      terakhir = h
      if (!h.ok) salahIni++
      const dinilai = !['info', 'kartu', 'tulis'].includes(a.s.t)
      if (h.ok) {
        const pertama = h.pertama !== false && salahIni === 0 && !a.ulang
        if (dinilai && !a.ulang && !sudahSelesai.has(a.i)) { nilaiTotal++; if (pertama) nilaiBenar++ }
        if (!a.terungkap) tambah(a.s.t === 'tulis' ? 10 : pertama ? 10 : 5)
        sudahSelesai.add(a.i); setBar()
      } else if (!r.ulangDiTempat) {
        if (dinilai && !a.ulang) nilaiTotal++
        if (ULANG.includes(a.s.t) && !a.ulang) antre.push({ s: a.s, i: a.i, ulang: true })
        else { sudahSelesai.add(a.i); setBar() }
      }
      U.bawah.className = 'pm-bawah ' + (h.ok ? 'ok' : 'bad')
      U.umpan.innerHTML = `<div class="um-ikon">${ikon(h.ok ? 'cek' : 'x', 22)}</div><div class="um-teks"><b>${h.pesan}</b>${h.jelas ? `<div>${h.jelas}</div>` : ''}${h.kunci ? `<button class="btn kecil garis um-kunci">${ikon('mata', 15)} Liat jawaban</button>` : ''}</div>`
      const bk = U.umpan.querySelector('.um-kunci')
      if (bk) bk.onclick = () => { a.terungkap = true; r.isiKunci(h.kunci); keluarkanUmpan(); keadaan = 'jawab'; U.aksi.textContent = 'Cek'; U.aksi.disabled = false; G.toast('Jawaban dimasukin. Pelajari dulu, terus pencet Cek (tanpa XP).') }
      keadaan = 'umpan'
      U.aksi.hidden = false; U.aksi.disabled = false
      U.aksi.textContent = h.ok || !r.ulangDiTempat ? 'Lanjut' : 'Coba lagi'
      U.aksi.focus({ preventScroll: true })
    }
    const maju = () => {
      pos++
      if (pos >= antre.length) return beres()
      tampil()
    }
    U.aksi.onclick = () => {
      if (keadaan === 'jawab') {
        if (r.mode === 'lanjut') { sudahSelesai.add(antre[pos].i); setBar(); if (antre[pos].s.t === 'kartu') tambah(2); return maju() }
        umpan(r.cek())
      } else if (terakhir && (terakhir.ok || !r.ulangDiTempat)) maju()
      else { keluarkanUmpan(); keadaan = 'jawab'; U.aksi.textContent = 'Cek' }
    }
    const tombol = e => {
      if (!document.body.contains(U.aksi)) return document.removeEventListener('keydown', tombol)
      const tag = e.target.tagName
      if (e.key === 'Enter' && !U.aksi.disabled && !U.aksi.hidden) {
        if (tag === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return
        if (tag === 'TEXTAREA' && r.enterBebas && keadaan === 'jawab' && antre[pos].s.t === 'sql') return
        if (tag === 'BUTTON' && e.target !== U.aksi) return
        e.preventDefault(); U.aksi.click()
      } else if (/^[1-9]$/.test(e.key) && tag !== 'INPUT' && tag !== 'TEXTAREA' && keadaan === 'jawab' && r.tombol) r.tombol(Number(e.key) - 1)
      else if (e.key === 'Escape') U.tutup.click()
    }
    document.addEventListener('keydown', tombol)
    U.tutup.onclick = async () => { if (sudahSelesai.size === 0 || await G.konfirmasi('Keluar dari pelajaran? Progres di pelajaran ini belum kesimpen.', 'Keluar')) { document.removeEventListener('keydown', tombol); o.tutup() } }

    const beres = () => {
      document.removeEventListener('keydown', tombol)
      const d = G.D(), k = `${id}/${pid}`, pertamaKali = !d.pelajaran[k]
      const akurasi = nilaiTotal ? Math.round(nilaiBenar / nilaiTotal * 100) : 100
      const bonus = pertamaKali ? 15 : 0
      const detik = Math.round((Date.now() - mulai) / 1000)
      d.pelajaran[k] = { tgl: G.tgl(), akurasi, xp: xp + bonus }
      d.terakhir = { skill: id }
      G.simpan()
      G.tambahXP(xp + bonus)
      const lanjut = G.berikut(id)
      el.innerHTML = `<div class="pemain beres-layar" style="--garis:${warna}"><main class="pm-isi"><div class="beres">
        <div class="beres-cap">${ikon('cek', 34)}</div>
        <h1>Pelajaran beres!</h1><p class="redup">${esc(p.judul)}</p>
        <div class="tiket kecil-tiket" style="--garis:${warna}"><div class="tiket-kiri"><span class="kode" style="background:${warna}">${id}</span></div><div class="tiket-isi"><div class="statistik">
          <div><small>XP</small><b>+${xp + bonus}</b></div><div><small>Akurasi</small><b>${akurasi}%</b></div><div><small>Waktu</small><b>${Math.floor(detik / 60)}:${String(detik % 60).padStart(2, '0')}</b></div>
        </div>${bonus ? '<p class="kecil redup">Termasuk bonus +15 pelajaran pertama kali.</p>' : ''}</div></div>
        <div class="beres-tombol">${lanjut ? `<button class="btn utama besar b-lanjut">Lanjut: ${esc(lanjut.judul)} ${ikon('kanan', 18)}</button>` : ''}<button class="btn garis besar b-balik">Balik ke ${esc(KAT.skill[id].pendek)}</button></div>
      </div></main></div>`
      G.konfeti()
      el.querySelector('.b-balik').onclick = () => o.tutup()
      const bl = el.querySelector('.b-lanjut'); if (bl) { bl.onclick = () => o.lanjut(lanjut.id); bl.focus() }
    }
    setBar(); tampil()
  }

  // ---------- tes penempatan ----------
  const tes = (el, id, o) => {
    const K = G.kursus(id), warna = G.warnaSkill(id)
    const per = lv => acak(K.tes.filter(t => t.level === lv))
    const bank = { dasar: per('dasar'), menengah: per('menengah'), mahir: per('mahir') }
    const skor = { dasar: [0, 0], menengah: [0, 0], mahir: [0, 0] }
    const U = kerangka(el, warna, `Tes penempatan · ${KAT.skill[id].nama}`)
    U.xp.parentElement.hidden = true
    let tahap = 'dasar', idx = 0, pilih = null, nomor = 0
    const perkiraanTotal = () => 2 + (bank.menengah.length ? 2 : 0) + (bank.mahir.length ? 2 : 0)
    const tampil = () => {
      const t = bank[tahap][idx], urut = acak(t.opsi.map((_, i) => i))
      pilih = null; nomor++
      U.bar.firstElementChild.style.width = Math.round((nomor - 1) / perkiraanTotal() * 100) + '%'
      U.isi.classList.remove('masuk'); void U.isi.offsetWidth; U.isi.classList.add('masuk')
      U.isi.innerHTML = `<span class="label-kecil">Soal ${nomor} · ${G.KAT.level.find(l => l.id === tahap).nama}</span><p class="pm-tanya">${t.tanya}</p><div class="opsi">${urut.map((i, n) => `<button class="op" role="radio" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${t.opsi[i]}</span></button>`).join('')}</div>`
      const bs = [...U.isi.querySelectorAll('.op')]
      bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-checked', x === b)); pilih = Number(b.dataset.i); U.aksi.disabled = false })
      U.aksi.disabled = true; U.aksi.textContent = 'Jawab'; U.lewat.hidden = false
      U.tombol = n => bs[n] && bs[n].click()
    }
    const jawab = benar => {
      const t = bank[tahap][idx]
      skor[tahap][1]++; if (benar) skor[tahap][0]++
      idx++
      if (idx < Math.min(2, bank[tahap].length)) return tampil()
      const [b] = skor[tahap]
      if (tahap === 'dasar' && b >= 1 && bank.menengah.length) { tahap = 'menengah'; idx = 0; return tampil() }
      if (tahap === 'menengah' && b >= 2 && bank.mahir.length) { tahap = 'mahir'; idx = 0; return tampil() }
      selesai()
    }
    U.aksi.onclick = () => jawab(pilih === bank[tahap][idx].benar)
    U.lewat.onclick = () => jawab(false)
    const tombol = e => {
      if (!document.body.contains(U.aksi)) return document.removeEventListener('keydown', tombol)
      if (e.key === 'Enter' && !U.aksi.disabled && e.target.tagName !== 'BUTTON') { e.preventDefault(); U.aksi.click() }
      else if (/^[1-9]$/.test(e.key) && U.tombol) U.tombol(Number(e.key) - 1)
      else if (e.key === 'Escape') U.tutup.click()
    }
    document.addEventListener('keydown', tombol)
    U.tutup.onclick = () => { document.removeEventListener('keydown', tombol); o.tutup() }
    const selesai = () => {
      document.removeEventListener('keydown', tombol)
      const [d] = skor.dasar, [m] = skor.menengah, [h] = skor.mahir
      let level = 'dasar'
      if (d >= 2 && m >= 2 && h >= 1) level = 'mahir'
      else if (d >= 2 && m >= 1) level = 'menengah'
      const dt = G.D()
      const pertama = !dt.tes[id]
      dt.tes[id] = { tgl: G.tgl(), skor, level }
      dt.level[id] = { level, sumber: 'tes', tgl: G.tgl() }
      dt.terakhir = { skill: id }
      G.simpan(); if (pertama) G.tambahXP(15); else G.cekLencana()
      const lv = KAT.level.find(l => l.id === level)
      const dilewati = K.pelajaran.filter(p => G.status(id, p) === 'lulus').length
      const lanjut = G.berikut(id)
      const baris = ['dasar', 'menengah', 'mahir'].filter(l => bank[l].length).map(l => {
        const [b, n] = skor[l], nm = KAT.level.find(x => x.id === l).nama
        return `<div class="tes-baris ${l === level ? 'ini' : ''}"><span>${nm}</span><div class="titik-skor">${n ? Array.from({ length: n }, (_, i) => `<i class="${i < b ? 'b' : 's'}"></i>`).join('') : '<em class="redup kecil">ga sampai sini</em>'}</div></div>`
      }).join('')
      el.innerHTML = `<div class="pemain beres-layar" style="--garis:${warna}"><main class="pm-isi"><div class="beres">
        <span class="label-kecil">Hasil tes penempatan</span>
        <h1>Level kamu: ${lv.nama}</h1><p class="redup">${lv.ket}.</p>
        <div class="tes-hasil">${baris}</div>
        <p>${dilewati ? `${dilewati} pelajaran di bawah level kamu ditandai <b>lulus tes</b>. Tetap bisa dibuka kapan aja buat ngulang.` : 'Mulai dari pelajaran pertama biar fondasinya kuat.'}</p>
        ${!lanjut ? `<p class="redup">Materi level ${lv.nama} buat skill ini lagi disiapin. Sementara, coba skill lain di peta kamu.</p>` : ''}
        <div class="beres-tombol">${lanjut ? `<button class="btn utama besar b-lanjut">Mulai: ${esc(lanjut.judul)} ${ikon('kanan', 18)}</button>` : ''}<button class="btn garis besar b-balik">Liat jalur ${esc(KAT.skill[id].pendek)}</button></div>
      </div></main></div>`
      el.querySelector('.b-balik').onclick = () => o.tutup()
      const bl = el.querySelector('.b-lanjut'); if (bl) { bl.onclick = () => o.lanjut(lanjut.id); bl.focus() }
    }
    tampil()
  }

  // Satu langkah lepas (buat demo di halaman depan), dengan tombol Cek sendiri.
  const demo = (el, s, selesai) => {
    el.innerHTML = '<div class="demo-langkah"></div><div class="demo-bawah"><div class="demo-umpan" aria-live="polite"></div><button class="btn utama demo-cek" disabled>Cek</button></div>'
    const isi = el.querySelector('.demo-langkah'), btn = el.querySelector('.demo-cek'), um = el.querySelector('.demo-umpan')
    let r, beres = false
    const tunjuk = h => {
      if (h.tolak) return G.toast(h.tolak)
      um.className = 'demo-umpan ' + (h.ok ? 'ok' : 'bad')
      um.innerHTML = `${ikon(h.ok ? 'cek' : 'x', 18)}<span><b>${h.pesan}</b>${h.jelas ? ' ' + h.jelas : ''}</span>`
      if (h.ok) { beres = true; btn.textContent = 'Ulang'; btn.disabled = false; selesai && selesai() }
      else if (r.ulangDiTempat) { btn.textContent = 'Cek lagi' } else { beres = true; btn.textContent = 'Ulang'; btn.disabled = false }
    }
    const pasang = () => { beres = false; um.className = 'demo-umpan'; um.innerHTML = ''; btn.textContent = 'Cek'; autoFokus = false; r = R[s.t](s, isi, { siap: v => { btn.disabled = !v }, selesai: tunjuk }, { kunci: 'demo' }); autoFokus = true; btn.hidden = r.mode === 'sendiri' }
    btn.onclick = () => beres ? pasang() : tunjuk(r.cek())
    pasang()
  }

  return { pelajaran, tes, ambilDB, demo }
})()
