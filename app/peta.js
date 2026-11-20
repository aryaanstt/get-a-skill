// Peta Karier: tiap jalur = garis, tiap skill = stasiun. Skill yang dipakai banyak jalur jadi stasiun transit.
window.GAS_PETA = (() => {
  const KAT = window.GAS_KATALOG
  const COL = 108, ROW = 92, PADX = 64, PADY = 62, GAP = 8

  const permutasi = a => a.length <= 1 ? [a] : a.flatMap((x, i) => permutasi(a.filter((_, j) => j !== i)).map(p => [x, ...p]))

  const susun = lines => {
    // urutan baris: garis yang banyak berbagi stasiun ditaruh berdekatan
    const share = (a, b) => a.skill.filter(s => b.skill.includes(s)).length
    let terbaik = lines, skorMin = Infinity
    permutasi(lines.map((_, i) => i)).forEach(p => {
      let skor = 0
      for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) skor += share(lines[p[i]], lines[p[j]]) * (j - i) * (j - i)
      if (skor < skorMin) { skorMin = skor; terbaik = p.map(i => lines[i]) }
    })
    lines = terbaik
    // kolom: lapisan jalur terpanjang
    const pred = {}
    lines.forEach(l => l.skill.forEach((s, i) => { pred[s] = pred[s] || new Set(); if (i) pred[s].add(l.skill[i - 1]) }))
    const col = {}, lagi = new Set()
    const hitung = s => {
      if (col[s] != null) return col[s]
      if (lagi.has(s)) return 0
      lagi.add(s)
      const ps = [...pred[s]]
      col[s] = ps.length ? 1 + Math.max(...ps.map(hitung)) : 0
      return col[s]
    }
    Object.keys(pred).forEach(hitung)
    // posisi stasiun
    const st = {}
    Object.keys(pred).forEach(s => {
      const baris = lines.map((l, i) => l.skill.includes(s) ? i : -1).filter(i => i >= 0)
      st[s] = { id: s, col: col[s], baris, x: PADX + col[s] * COL, y: PADY + baris.reduce((a, b) => a + b, 0) / baris.length * ROW }
    })
    // geser stasiun yang numpuk di titik yang sama
    const pakai = {}
    Object.values(st).forEach(t => { const k = t.x + ':' + t.y; if (pakai[k]) t.y += ROW * .38; pakai[k] = 1 })
    const lebar = PADX * 2 + Math.max(...Object.values(st).map(t => t.col)) * COL
    const tinggi = PADY * 2 + (lines.length - 1) * ROW
    return { lines, st, lebar, tinggi }
  }

  // titik garis l di stasiun s (pakai offset kalau stasiun transit)
  const titik = (L, l, s) => {
    const t = L.st[s], k = t.baris.length
    const idx = t.baris.indexOf(L.lines.indexOf(l))
    return { x: t.x, y: t.y + (idx - (k - 1) / 2) * GAP }
  }
  const ruas = (a, b) => {
    const dy = b.y - a.y, dx = b.x - a.x
    if (Math.abs(dy) < .5) return ` L${b.x},${b.y}`
    const ad = Math.abs(dy)
    if (ad >= dx) return ` L${b.x},${b.y}`
    const xm = (a.x + b.x) / 2
    return ` L${xm - ad / 2},${a.y} L${xm + ad / 2},${b.y} L${b.x},${b.y}`
  }
  const jalurPath = (L, l) => {
    const pts = l.skill.map(s => titik(L, l, s))
    return pts.reduce((d, p, i) => i ? d + ruas(pts[i - 1], p) : `M${p.x},${p.y}`, '')
  }

  const gambar = (el, o) => {
    const lines = o.lines
    const L = susun(lines)
    const uid = 'p' + Math.random().toString(36).slice(2, 7)
    const pr = o.progres || (() => ({ n: 0, total: 0 }))
    const nama = s => KAT.skill[s].pendek
    const atas = t => Math.max(...t.baris) === 0 && L.lines.length > 1
    const garis = L.lines.map((l, i) => `<path id="${uid}-${l.id}" class="garis" data-garis="${l.id}" d="${jalurPath(L, l)}" pathLength="1" style="stroke:${l.warna};animation-delay:${i * 180}ms"/>`).join('')
    const kereta = o.kereta ? L.lines.map((l, i) => `<g class="kereta" data-garis="${l.id}"><rect x="-9" y="-5" width="18" height="10" rx="5" style="fill:${l.warna}"/><rect x="-5" y="-2" width="10" height="4" rx="2" fill="#fff" opacity=".85"/><animateMotion dur="${7 + i * 1.7}s" repeatCount="indefinite" rotate="auto" begin="${i * .9}s"><mpath href="#${uid}-${l.id}"/></animateMotion></g>`).join('') : ''
    const stasiun = Object.values(L.st).sort((a, b) => a.col - b.col).map((t, i) => {
      const p = pr(t.id), selesai = p.total && p.n >= p.total, mulai = p.n > 0
      const k = t.baris.length
      const warna = k > 1 ? 'var(--ink)' : L.lines[t.baris[0]].warna
      const h = (k - 1) * GAP
      const bentuk = k > 1
        ? `<rect class="tanda" x="-10" y="${-10 - h / 2}" width="20" height="${20 + h}" rx="10" style="stroke:${warna}"/>`
        : `<circle class="tanda" r="9" style="stroke:${warna}"/>`
      const isi = selesai ? `<path d="M-4 0.5l2.6 2.6L4.2-2.6" class="cek-st"/>` : mulai ? `<circle r="3.2" style="fill:${warna}"/>` : ''
      const ly = atas(t) ? -(h / 2 + 20) : h / 2 + 26
      const label = `<text class="lbl" y="${ly}" text-anchor="middle">${nama(t.id)}</text>` + (o.ringkas ? '' : `<text class="lbl-k" y="${ly + (atas(t) ? -14 : 14)}" text-anchor="middle">${t.id}${p.total ? ' · ' + p.n + '/' + p.total : ''}</text>`)
      const aktif = o.aktif === t.id ? `<circle class="denyut" r="14"/><circle class="denyut d2" r="14"/>` : ''
      return `<g class="st ${selesai ? 'selesai' : ''} ${o.aktif === t.id ? 'aktif' : ''}" data-skill="${t.id}" data-garis="${t.baris.map(b => L.lines[b].id).join(' ')}" transform="translate(${t.x} ${t.y})" tabindex="0" role="link" aria-label="${KAT.skill[t.id].nama}, ${p.n} dari ${p.total} pelajaran" style="animation-delay:${400 + i * 45}ms">${aktif}${bentuk.replace('class="tanda"', `class="tanda" ${selesai ? `style="fill:${warna};stroke:${warna}"` : ''}`)}${isi}${label}</g>`
    }).join('')
    const legenda = o.legenda === false ? '' : `<div class="peta-legenda" role="list">${L.lines.map(l => `<button class="leg" data-garis="${l.id}" role="listitem" aria-pressed="false"><i style="background:${l.warna}"></i>${l.nama}</button>`).join('')}</div>`
    el.innerHTML = `${legenda}<div class="peta-geser"><svg class="peta ${o.kereta ? 'hidup' : ''}" viewBox="0 0 ${L.lebar} ${L.tinggi}" style="min-width:${Math.round(L.lebar * (o.minSkala || .78))}px" role="img" aria-label="Peta karier">${garis}${kereta}${stasiun}</svg></div><div class="peta-tip" hidden></div>`

    const svg = el.querySelector('svg'), tip = el.querySelector('.peta-tip')
    const sorot = id => {
      svg.classList.toggle('ada-sorot', !!id)
      svg.querySelectorAll('[data-garis]').forEach(g => g.classList.toggle('disorot', !!id && g.dataset.garis.split(' ').includes(id)))
      el.querySelectorAll('.leg').forEach(b => b.setAttribute('aria-pressed', b.dataset.garis === id))
    }
    let tersorot = null
    el.querySelectorAll('.leg').forEach(b => {
      b.onmouseenter = () => sorot(b.dataset.garis)
      b.onmouseleave = () => sorot(tersorot)
      b.onclick = () => { tersorot = tersorot === b.dataset.garis ? null : b.dataset.garis; sorot(tersorot) }
    })
    const tunjuk = g => {
      const s = g.dataset.skill, p = pr(s), K = KAT.skill[s]
      const lv = o.level ? o.level(s) : null
      tip.innerHTML = `<b>${K.nama}</b><span>${K.ringkas}</span><em>${p.total ? `${p.n}/${p.total} pelajaran` : ''}${lv ? ' · Level ' + lv : ''}</em>`
      tip.hidden = false
      const r = g.getBoundingClientRect(), w = el.getBoundingClientRect()
      const x = Math.min(Math.max(r.left + r.width / 2 - w.left, 120), w.width - 120)
      tip.style.left = x + 'px'; tip.style.top = (r.top - w.top) + 'px'
    }
    svg.querySelectorAll('.st').forEach(g => {
      g.onmouseenter = () => { tunjuk(g); sorot(g.dataset.garis.split(' ')[0]) }
      g.onmouseleave = () => { tip.hidden = true; sorot(tersorot) }
      g.onfocus = () => tunjuk(g)
      g.onblur = () => { tip.hidden = true }
      g.onclick = () => o.klik && o.klik(g.dataset.skill)
      g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); o.klik && o.klik(g.dataset.skill) } }
    })
    // geser peta biar stasiun aktif kelihatan
    if (o.aktif) {
      const g = svg.querySelector('.st.aktif'), wadah = el.querySelector('.peta-geser')
      if (g && wadah.scrollWidth > wadah.clientWidth) requestAnimationFrame(() => { const r = g.getBoundingClientRect(), w = wadah.getBoundingClientRect(); wadah.scrollLeft += r.left - w.left - w.width / 3 })
    }
    return L
  }

  return { gambar, susun }
})()
