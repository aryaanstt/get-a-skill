// Inti situs Get a Skill: simpan progres, XP, streak, header, tema, toast.
const GAS = (() => {
  const KUNCI = 'gas-v1'
  const awal = () => ({ xp: 0, hari: [], selesai: {}, ielts: [], tema: '' })
  let data
  try { data = Object.assign(awal(), JSON.parse(localStorage.getItem(KUNCI) || '{}')) } catch { data = awal() }
  const simpan = () => { try { localStorage.setItem(KUNCI, JSON.stringify(data)) } catch {} }
  const hariIni = () => new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10)

  const tandaiAktif = () => {
    const h = hariIni()
    if (!data.hari.includes(h)) { data.hari.push(h); data.hari = data.hari.slice(-400); simpan() }
  }
  const streak = () => {
    const set = new Set(data.hari)
    let n = 0
    let t = new Date(hariIni() + 'T00:00:00Z')
    if (!set.has(hariIni())) t = new Date(t - 864e5)
    while (set.has(t.toISOString().slice(0, 10))) { n++; t = new Date(t - 864e5) }
    return n
  }
  const level = xp => {
    const tangga = [[0, 'Pemula'], [150, 'Penjelajah'], [400, 'Praktisi'], [800, 'Analis'], [1400, 'Ahli'], [2200, 'Master']]
    let cur = tangga[0], next = null
    for (let i = 0; i < tangga.length; i++) { if (xp >= tangga[i][0]) { cur = tangga[i]; next = tangga[i + 1] || null } }
    return { nama: cur[1], dari: cur[0], ke: next ? next[0] : cur[0], berikut: next ? next[1] : null }
  }
  const toast = teks => {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = teks
    document.body.appendChild(t); setTimeout(() => t.remove(), 2400)
  }
  const tambahXP = (n, alasan) => {
    data.xp += n; tandaiAktif(); simpan(); renderStat()
    if (alasan) toast(`+${n} XP · ${alasan}`)
  }
  // Tandai satu latihan beres (kunci unik). Balikin true kalau ini pertama kali.
  const beres = (kunci, xp = 10) => {
    if (data.selesai[kunci]) return false
    data.selesai[kunci] = hariIni(); simpan(); tambahXP(xp, 'latihan beres')
    return true
  }
  const sudah = kunci => Boolean(data.selesai[kunci])
  const progresKursus = (prefix, total) => {
    const n = Object.keys(data.selesai).filter(k => k.startsWith(prefix + ':')).length
    return { n, total, persen: total ? Math.round((n / total) * 100) : 0 }
  }
  const pasangTema = () => {
    if (data.tema) document.documentElement.setAttribute('data-theme', data.tema)
  }
  const gantiTema = () => {
    const gelap = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches)
    data.tema = gelap ? 'light' : 'dark'; simpan(); pasangTema()
  }
  const renderStat = () => {
    const el = document.getElementById('stat-kecil'); if (!el) return
    el.innerHTML = `<span class="pil" title="Hari berturut-turut belajar">🔥 ${streak()}</span><span class="pil" title="Total XP">⭐ ${data.xp} XP</span>`
  }
  const header = aktif => {
    const menu = [['index.html', 'Beranda'], ['kursus.html?k=sql', 'SQL'], ['ielts.html', 'IELTS'], ['kursus.html?k=excel', 'Excel'], ['kursus.html?k=powerbi', 'Power BI'], ['kursus.html?k=statistik', 'Statistik']]
    const h = document.createElement('header'); h.className = 'top'
    h.innerHTML = `<div class="wrap"><a class="logo" href="index.html">🎯 Get a <b>Skill</b></a><nav class="nav">${menu.map(([u, t]) => `<a href="${u}" class="${aktif === t ? 'on' : ''}">${t}</a>`).join('')}</nav><div class="stat-kecil" id="stat-kecil"></div><button class="tema" id="tema" title="Ganti tema">◐</button></div>`
    document.body.prepend(h)
    document.getElementById('tema').onclick = gantiTema
    renderStat()
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  pasangTema()
  return { data, simpan, tambahXP, beres, sudah, progresKursus, streak, level, toast, header, esc, hariIni, tandaiAktif }
})()
