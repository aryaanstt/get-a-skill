// Inti Get a Skill v2: penyimpanan, akun demo, XP, streak, lencana, ikon, efek.
window.G = (() => {
  const KAT = window.GAS_KATALOG
  const KUNCI = 'gas2'
  const baca = () => { try { return JSON.parse(localStorage.getItem(KUNCI)) } catch (e) { return null } }
  let S = baca() || {}
  S.akun = S.akun || {}; S.data = S.data || {}; S.tema = S.tema || 'sistem'
  const simpan = () => { try { localStorage.setItem(KUNCI, JSON.stringify(S)) } catch (e) { } }

  // ---------- util ----------
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const acak = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]] } return b }
  const pad = n => String(n).padStart(2, '0')
  const tgl = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  const geser = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return tgl(d) }
  const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const tglPanjang = s => { const d = new Date(s + 'T00:00:00'); return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}` }
  const angka = n => Number(n).toLocaleString('id-ID')
  const reduksi = () => matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---------- hash password (prototipe, disimpan lokal) ----------
  const sha256js = s => {
    const K = [], H = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225]
    let n = 2, c = 0
    while (c < 64) { let p = true; for (let i = 2; i * i <= n; i++) if (n % i === 0) { p = false; break } if (p) K[c++] = (Math.pow(n, 1 / 3) % 1) * 4294967296 | 0; n++ }
    const b = unescape(encodeURIComponent(s)), w = [], L = b.length * 8
    for (let i = 0; i < b.length; i++) w[i >> 2] |= b.charCodeAt(i) << ((3 - i % 4) * 8)
    w[L >> 5] |= 0x80 << (24 - L % 32); w[((L + 64 >> 9) << 4) + 15] = L
    const r = (x, y) => (x >>> y) | (x << (32 - y))
    for (let j = 0; j < w.length; j += 16) {
      const a = H.slice(), W = []
      for (let i = 0; i < 64; i++) {
        W[i] = i < 16 ? w[j + i] | 0 : (r(W[i - 2], 17) ^ r(W[i - 2], 19) ^ (W[i - 2] >>> 10)) + W[i - 7] + (r(W[i - 15], 7) ^ r(W[i - 15], 18) ^ (W[i - 15] >>> 3)) + W[i - 16] | 0
        const t1 = a[7] + (r(a[4], 6) ^ r(a[4], 11) ^ r(a[4], 25)) + ((a[4] & a[5]) ^ (~a[4] & a[6])) + K[i] + W[i] | 0
        const t2 = (r(a[0], 2) ^ r(a[0], 13) ^ r(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2])) | 0
        a.unshift(t1 + t2 | 0); a[4] = a[4] + t1 | 0; a.pop()
      }
      for (let i = 0; i < 8; i++) H[i] = H[i] + a[i] | 0
    }
    return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('')
  }
  const hash = async s => {
    try { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, '0')).join('') }
    catch (e) { return sha256js(s) }
  }
  const garam = () => { const a = new Uint8Array(16); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach((_, i) => a[i] = Math.random() * 256); return [...a].map(x => x.toString(16).padStart(2, '0')).join('') }

  // ---------- data pengguna ----------
  const dataBaru = () => ({ onboarding: null, xp: 0, hari: {}, pelajaran: {}, level: {}, tes: {}, kartu: {}, lencana: {}, latihan: { sprint: [], interview: 0, kartuReview: 0 }, tulisan: {}, terakhir: null, dibuat: tgl() })
  const D = () => { const k = S.sesi; if (!k) return null; if (!S.data[k]) S.data[k] = dataBaru(); return S.data[k] }
  const masuk = () => !!S.sesi
  const tamu = () => S.sesi === 'tamu'
  const nama = () => (D() && D().onboarding && D().onboarding.nama) || (S.akun[S.sesi] || {}).nama || 'Kamu'

  const akun = {
    async daftar(nm, email, pass) {
      email = String(email).trim().toLowerCase()
      if (!nm.trim()) throw new Error('Nama belum diisi')
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Format email belum bener')
      if (String(pass).length < 6) throw new Error('Kata sandi minimal 6 karakter')
      if (S.akun[email]) throw new Error('Email ini udah terdaftar di perangkat ini. Coba masuk.')
      const salt = garam()
      S.akun[email] = { nama: nm.trim(), salt, hash: await hash(salt + pass), dibuat: tgl() }
      if (S.sesi === 'tamu' && S.data.tamu) { S.data[email] = S.data.tamu; delete S.data.tamu }
      S.sesi = email
      if (D().onboarding) D().onboarding.nama = D().onboarding.nama || nm.trim()
      simpan()
    },
    async masuk(email, pass) {
      email = String(email).trim().toLowerCase()
      const a = S.akun[email]
      if (!a) throw new Error('Email belum terdaftar di perangkat ini')
      if (await hash(a.salt + pass) !== a.hash) throw new Error('Kata sandi salah')
      S.sesi = email; simpan()
    },
    tamu() { S.sesi = 'tamu'; simpan() },
    keluar() { S.sesi = null; simpan() },
    email: () => S.sesi,
    info: () => S.akun[S.sesi] || null,
  }

  // ---------- XP, streak, level ----------
  const hariIni = () => (D().hari[tgl()] || 0)
  const target = () => { const t = KAT.onboarding.target.find(x => x.id === (D().onboarding || {}).target); return t ? t.xp : 30 }
  const streak = () => {
    const h = D().hari
    let d = tgl(), n = 0
    if (!h[d]) d = geser(d, -1)
    while (h[d]) { n++; d = geser(d, -1) }
    return n
  }
  const levelXP = xp => { let lv = 1, butuh = 100, sisa = xp; while (sisa >= butuh) { sisa -= butuh; lv++; butuh = 100 + (lv - 1) * 50 } return { lv, sisa, butuh } }

  const LV = ['dasar', 'menengah', 'mahir']
  const kursus = id => (window.GAS_KURSUS || {})[id]
  const levelSkill = id => (D().level[id] || {}).level || null
  const status = (id, p) => {
    const k = `${id}/${p.id}`
    if (D().pelajaran[k]) return 'selesai'
    const lv = levelSkill(id)
    if (lv && (D().level[id] || {}).sumber === 'tes' && LV.indexOf(p.level) < LV.indexOf(lv)) return 'lulus'
    return 'buka'
  }
  const progres = id => {
    const K = kursus(id); if (!K) return { n: 0, total: 0, persen: 0 }
    const total = K.pelajaran.length
    const n = K.pelajaran.filter(p => status(id, p) !== 'buka').length
    return { n, total, persen: total ? Math.round(n / total * 100) : 0 }
  }
  const berikut = id => {
    const K = kursus(id); if (!K) return null
    return K.pelajaran.find(p => status(id, p) === 'buka') || null
  }
  const jalurUser = () => ((D() && D().onboarding && D().onboarding.jalur) || []).map(j => KAT.jalur.find(x => x.id === j)).filter(Boolean)
  const warnaSkill = id => {
    const ju = jalurUser().find(j => j.skill.includes(id))
    if (ju) return ju.warna
    if (KAT.siapKerja.skill.includes(id)) return 'var(--siap)'
    const j = KAT.jalur.find(j => j.skill.includes(id))
    return j ? j.warna : 'var(--siap)'
  }
  const skillUser = () => {
    const urut = []
    jalurUser().forEach(j => j.skill.forEach(s => { if (!urut.includes(s)) urut.push(s) }))
    KAT.siapKerja.skill.forEach(s => { if (!urut.includes(s)) urut.push(s) })
    return urut
  }

  // ---------- lencana ----------
  const cekLencana = () => {
    const d = D(), baru = []
    const semuaLevel = (id, lvs) => { const K = kursus(id); return K && K.pelajaran.filter(p => lvs.includes(p.level)).every(p => status(id, p) !== 'buka') }
    const skillDipelajari = new Set(Object.keys(d.pelajaran).map(k => k.split('/')[0]))
    const syarat = {
      pertama: Object.keys(d.pelajaran).length > 0,
      penempatan: Object.keys(d.tes).length > 0,
      streak3: streak() >= 3, streak7: streak() >= 7,
      xp100: d.xp >= 100, xp500: d.xp >= 500,
      rumus: semuaLevel('EX', ['dasar', 'menengah']) && skillDipelajari.has('EX'),
      query: semuaLevel('SQ', ['dasar', 'menengah']) && skillDipelajari.has('SQ'),
      sprint: Math.max(0, ...d.latihan.sprint.map(s => s.skor)) >= 12,
      interview: d.latihan.interview >= 3,
      kartu: d.latihan.kartuReview >= 30,
      tiga: skillDipelajari.size >= 3,
    }
    KAT.lencana.forEach(l => { if (syarat[l.id] && !d.lencana[l.id]) { d.lencana[l.id] = tgl(); baru.push(l) } })
    if (baru.length) simpan()
    return baru
  }
  const tambahXP = n => {
    const d = D(); d.xp += n; d.hari[tgl()] = (d.hari[tgl()] || 0) + n; simpan()
    const baru = cekLencana()
    baru.forEach((l, i) => setTimeout(() => toast(`Lencana baru: <b>${esc(l.nama)}</b>`, 'lencana'), 400 + i * 1600))
    return baru
  }

  // ---------- ikon ----------
  const P = {
    rumah: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    kompas: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    orang: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    api: '<path d="M12 3c.6 3.2 5 5.4 5 10.5a5 5 0 0 1-10 0c0-2.6 1.4-3.8 2.2-6 .9 1.2 1.6 2.4 1.8 3.7C12.6 9 12.6 6 12 3z"/>',
    petir: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    cek: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    kanan: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    kiri: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    gembok: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    main: '<path d="M7 5l12 7-12 7z"/>',
    ulang: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    bulan: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    matahari: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    keluar: '<path d="M15 4h4v16h-4"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
    salin: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    mik: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    jam: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    kartu: '<rect x="3" y="7" width="13" height="13" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v11"/>',
    obrol: '<path d="M4 5h16v11H10l-6 4z"/>',
    cari: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    sigma: '<path d="M18 5H6l6 7-6 7h12"/>',
    tabel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>',
    lampu: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
    medali: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    peta: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    tiket: '<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>',
    tambah: '<path d="M12 5v14M5 12h14"/>',
    mata: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pensil: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    sampah: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  }
  const ikon = (n, ukuran = 20, kelas = '') => `<svg class="ik ${kelas}" width="${ukuran}" height="${ukuran}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`

  // ---------- efek ----------
  let toastEl
  const toast = (html, jenis = '') => {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast-wadah'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl) }
    const t = document.createElement('div')
    t.className = 'toast ' + jenis
    t.innerHTML = (jenis === 'lencana' ? ikon('medali', 18) : '') + `<span>${html}</span>`
    toastEl.appendChild(t)
    setTimeout(() => t.classList.add('pergi'), 2600)
    setTimeout(() => t.remove(), 3100)
  }
  const konfeti = () => {
    if (reduksi()) return
    const c = document.createElement('canvas'); c.className = 'konfeti'
    document.body.appendChild(c)
    const W = c.width = innerWidth * devicePixelRatio, H = c.height = innerHeight * devicePixelRatio
    const x = c.getContext('2d'), warna = KAT.jalur.map(j => j.warna).concat(['#FFB224', '#0E1525'])
    const p = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 26 * devicePixelRatio, vy: (-Math.random() * 22 - 8) * devicePixelRatio, w: (6 + Math.random() * 8) * devicePixelRatio, h: (3 + Math.random() * 5) * devicePixelRatio, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: warna[Math.floor(Math.random() * warna.length)] }))
    let f = 0
    const jalan = () => {
      x.clearRect(0, 0, W, H)
      p.forEach(q => { q.vy += .9 * devicePixelRatio; q.vx *= .985; q.x += q.vx; q.y += q.vy; q.r += q.vr; x.save(); x.translate(q.x, q.y); x.rotate(q.r); x.fillStyle = q.c; x.fillRect(-q.w / 2, -q.h / 2, q.w, q.h); x.restore() })
      if (++f < 110) requestAnimationFrame(jalan); else c.remove()
    }
    jalan()
  }
  // Dialog konfirmasi sendiri (confirm() bawaan sering diblok di dalam iframe).
  const konfirmasi = (teks, ya = 'Ya', bahaya = false) => new Promise(selesai => {
    const w = document.createElement('div')
    w.className = 'dialog-latar'
    w.innerHTML = `<div class="dialog" role="alertdialog" aria-modal="true" aria-label="Konfirmasi"><p>${teks}</p><div class="dialog-tombol"><button class="btn garis batal">Batal</button><button class="btn utama ya ${bahaya ? 'bahaya-isi' : ''}">${ya}</button></div></div>`
    const tutup = v => { document.removeEventListener('keydown', kunci, true); w.remove(); selesai(v) }
    const kunci = e => { if (e.key === 'Escape') { e.stopPropagation(); tutup(false) } }
    document.addEventListener('keydown', kunci, true)
    w.onclick = e => { if (e.target === w) tutup(false) }
    w.querySelector('.batal').onclick = () => tutup(false)
    w.querySelector('.ya').onclick = () => tutup(true)
    document.body.appendChild(w)
    w.querySelector('.batal').focus()
  })
  const salin = async teks => {
    try { await navigator.clipboard.writeText(teks); toast('Disalin. Tempel di Claude atau AI lain buat minta feedback.') }
    catch (e) {
      const t = document.createElement('textarea'); t.value = teks; document.body.appendChild(t); t.select()
      try { document.execCommand('copy'); toast('Disalin.') } catch (e2) { toast('Gagal nyalin, blok teksnya manual ya.') }
      t.remove()
    }
  }

  // ---------- tema ----------
  const terapkanTema = () => {
    const r = document.documentElement
    if (S.tema === 'sistem') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.tema)
  }
  const tema = t => { if (t) { S.tema = t; simpan(); terapkanTema() } return S.tema }
  terapkanTema()

  return {
    KAT, LV, S: () => S, simpan, esc, acak, tgl, geser, tglPanjang, BULAN, HARI, angka, reduksi,
    akun, D, masuk, tamu, nama, hariIni, target, streak, levelXP, tambahXP, cekLencana,
    kursus, levelSkill, status, progres, berikut, jalurUser, warnaSkill, skillUser,
    ikon, toast, konfeti, salin, konfirmasi, tema,
    reset() { if (S.sesi) { S.data[S.sesi] = dataBaru(); simpan() } },
  }
})()
