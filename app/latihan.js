// Latihan: Sprint Psikotes 60 detik, kartu hafalan (Leitner), simulasi interview.
window.GAS_LATIHAN = (() => {
  const { esc, acak, ikon } = G
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
  const pilih = a => a[Math.floor(Math.random() * a.length)]

  // ---------- generator soal psikotes ----------
  const GEN = {
    deret() {
      const jenis = r(1, 6)
      let s = [], j
      if (jenis === 1) { const a = r(2, 30), d = pilih([3, 4, 6, 7, 8, 9, 11, 12, -3, -4, -6]); for (let i = 0; i < 6; i++) s.push(a + d * i); j = `Tiap angka ${d > 0 ? '+' : '−'}${Math.abs(d)}` }
      if (jenis === 2) { const a = r(1, 5), k = pilih([2, 3]); for (let i = 0; i < 6; i++) s.push(a * k ** i); j = `Tiap angka ×${k}` }
      if (jenis === 3) { let a = r(1, 12), d = r(1, 4); for (let i = 0; i < 6; i++) { s.push(a); a += d + i } ; j = `Selisihnya naik 1 tiap langkah (+${d}, +${d + 1}, …)` }
      if (jenis === 4) { let a = r(10, 30); const p = r(2, 6), q = pilih([2, 3]); for (let i = 0; i < 6; i++) { s.push(a); a = i % 2 === 0 ? a - p : a * q } ; j = `Gantian −${p} dan ×${q}` }
      if (jenis === 5) { const k = r(1, 6); for (let i = 0; i < 6; i++) s.push((k + i) ** 2); j = 'Bilangan kuadrat berurutan' }
      if (jenis === 6) { let a = r(1, 4), b = r(2, 6); for (let i = 0; i < 6; i++) { s.push(a);[a, b] = [b, a + b] } ; j = 'Dua angka sebelumnya dijumlah' }
      return { tanya: s.slice(0, 5).join(', ') + ', …', jawab: s[5], jelas: j, jenis: 'Deret' }
    },
    persen() {
      const p = pilih([5, 10, 15, 20, 25, 30, 40, 50, 75]), b = pilih([40, 60, 80, 120, 160, 200, 240, 320, 360, 400, 480, 600])
      return { tanya: `${p}% dari ${b}`, jawab: p * b / 100, jelas: `${b} × ${p}/100`, jenis: 'Persen' }
    },
    kali() {
      const t = r(1, 3)
      if (t === 1) { const a = r(12, 49), b = r(3, 9); return { tanya: `${a} × ${b}`, jawab: a * b, jelas: `${a} × ${b}`, jenis: 'Hitung' } }
      if (t === 2) { const a = pilih([16, 24, 28, 32, 36, 44, 48, 64, 72]); return { tanya: `${a} × 25`, jawab: a * 25, jelas: `× 25 = × 100 ÷ 4`, jenis: 'Hitung' } }
      const b = r(3, 9), h = r(12, 40); return { tanya: `${b * h} ÷ ${b}`, jawab: h, jelas: `${b} × ${h} = ${b * h}`, jenis: 'Hitung' }
    },
    pecahan() {
      const [n, d] = pilih([[1, 4], [3, 4], [1, 5], [2, 5], [3, 8], [1, 3], [2, 3], [5, 6]]), b = d * r(4, 30)
      return { tanya: `${n}/${d} dari ${b}`, jawab: b / d * n, jelas: `${b} ÷ ${d} × ${n}`, jenis: 'Pecahan' }
    },
    tambah() {
      const a = r(120, 899), b = r(45, 499), op = pilih(['+', '−'])
      return { tanya: `${a} ${op} ${b}`, jawab: op === '+' ? a + b : a - b, jelas: '', jenis: 'Hitung' }
    },
  }
  const soalAcak = () => GEN[pilih(['deret', 'deret', 'persen', 'kali', 'pecahan', 'tambah'])]()

  const cincin = (sisa, total) => { const k = 2 * Math.PI * 44; return `<svg viewBox="0 0 100 100" class="cincin"><circle cx="50" cy="50" r="44" class="c-latar"/><circle cx="50" cy="50" r="44" class="c-isi" style="stroke-dasharray:${k};stroke-dashoffset:${k * (1 - sisa / total)}"/></svg>` }

  // ---------- Sprint ----------
  const sprint = (el, o) => {
    const d = G.D()
    const riwayat = d.latihan.sprint
    const terbaik = Math.max(0, ...riwayat.map(x => x.skor))
    el.innerHTML = `<div class="sprint-awal">
      <button class="ikon-btn kembali" aria-label="Kembali">${ikon('kiri', 20)}</button>
      <span class="label-kecil">${ikon('sigma', 14)} Latihan psikotes</span>
      <h1 class="judul-besar">Sprint 60 detik</h1>
      <p class="redup lebar-baca">Deret angka, persen, pecahan, dan hitung cepat, dibuat acak tiap main. Jawab sebanyak mungkin. Salah ga ngurangin skor, tapi combo putus.</p>
      <div class="sprint-statistik"><div><small>Rekor</small><b>${terbaik}</b></div><div><small>Main</small><b>${riwayat.length}x</b></div><div><small>Target lencana</small><b>12</b></div></div>
      ${riwayat.length ? `<div class="mini-grafik" aria-label="Skor 10 main terakhir">${riwayat.slice(-10).map(x => `<i style="height:${Math.max(6, x.skor / Math.max(terbaik, 1) * 100)}%" title="${x.skor}"></i>`).join('')}</div>` : ''}
      <button class="btn utama besar mulai">${ikon('main', 18)} Mulai</button>
    </div>`
    el.querySelector('.kembali').onclick = o.tutup
    el.querySelector('.mulai').onclick = () => hitungMundur()
    const hitungMundur = () => {
      let n = 3
      el.innerHTML = `<div class="sprint-mundur"><b>${n}</b></div>`
      const t = setInterval(() => { n--; if (n === 0) { clearInterval(t); main() } else el.querySelector('b').textContent = n }, G.reduksi() ? 300 : 700)
    }
    const main = () => {
      const TOTAL = 60
      let sisa = TOTAL, skor = 0, combo = 0, comboMaks = 0, soal = soalAcak(), log = [], kunci = false
      el.innerHTML = `<div class="sprint">
        <header class="sprint-atas"><div class="sprint-jam">${cincin(1, 1)}<b>${TOTAL}</b></div><div class="sprint-skor"><small>Skor</small><b>0</b></div><div class="sprint-combo"><small>Combo</small><b>0</b></div></header>
        <div class="sprint-soal"><span class="label-kecil"></span><div class="sprint-tanya"></div></div>
        <form class="sprint-jawab" autocomplete="off"><input inputmode="decimal" aria-label="Jawaban" placeholder="?"><button class="btn utama" aria-label="Kirim">${ikon('kanan', 20)}</button></form>
        <div class="papan">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '−', '0', '⌫'].map(k => `<button type="button" data-k="${k}">${k}</button>`).join('')}</div>
        <button class="btn garis kecil lewati" type="button">Lewati</button>
      </div>`
      const inp = el.querySelector('input'), elT = el.querySelector('.sprint-tanya'), elJ = el.querySelector('.label-kecil'), wadah = el.querySelector('.sprint')
      const elSkor = el.querySelector('.sprint-skor b'), elCombo = el.querySelector('.sprint-combo b'), jam = el.querySelector('.sprint-jam')
      const tampil = () => { elJ.textContent = soal.jenis; elT.textContent = soal.tanya; inp.value = ''; inp.focus({ preventScroll: true }) }
      const nilai = benar => {
        log.push({ ...soal, benar, isian: inp.value })
        if (benar) { skor++; combo++; comboMaks = Math.max(comboMaks, combo) } else combo = 0
        elSkor.textContent = skor; elCombo.textContent = combo
        wadah.classList.remove('kilat-b', 'kilat-s'); void wadah.offsetWidth; wadah.classList.add(benar ? 'kilat-b' : 'kilat-s')
        if (!benar) { kunci = true; elT.innerHTML = `${esc(soal.tanya)} <em>= ${G.angka(soal.jawab)}</em>`; setTimeout(() => { kunci = false; soal = soalAcak(); tampil() }, 700) }
        else { soal = soalAcak(); tampil() }
      }
      el.querySelector('form').onsubmit = e => {
        e.preventDefault(); if (kunci || !inp.value.trim()) return
        const v = Number(inp.value.replace('−', '-').replace(',', '.'))
        nilai(Math.abs(v - soal.jawab) < 1e-6)
      }
      el.querySelector('.lewati').onclick = () => { if (!kunci) nilai(false) }
      el.querySelectorAll('.papan button').forEach(b => b.onclick = () => {
        const k = b.dataset.k
        if (k === '⌫') inp.value = inp.value.slice(0, -1); else if (k === '−') inp.value = inp.value.startsWith('-') ? inp.value.slice(1) : '-' + inp.value; else inp.value += k
      })
      tampil()
      const t0 = Date.now()
      const detak = setInterval(() => {
        if (!document.body.contains(jam)) return clearInterval(detak)
        sisa = Math.max(0, TOTAL - (Date.now() - t0) / 1000)
        jam.innerHTML = cincin(sisa, TOTAL) + `<b>${Math.ceil(sisa)}</b>`
        jam.classList.toggle('mepet', sisa < 10)
        if (sisa <= 0) { clearInterval(detak); akhir() }
      }, 200)
      const akhir = () => {
        const total = log.length, rekor = skor > terbaik
        riwayat.push({ tgl: G.tgl(), skor, total, combo: comboMaks }); if (riwayat.length > 40) riwayat.shift()
        d.latihan.terakhir = 'sprint'; G.simpan()
        const xp = Math.min(40, skor * 2); if (xp) G.tambahXP(xp); else G.cekLencana()
        if (rekor && skor > 0) G.konfeti()
        const salah = log.filter(x => !x.benar)
        el.innerHTML = `<div class="sprint-akhir">
          <span class="label-kecil">${rekor && skor ? 'Rekor baru!' : 'Waktu habis'}</span>
          <div class="skor-raksasa">${skor}</div><p class="redup">jawaban bener dari ${total} soal · combo terpanjang ${comboMaks} · +${xp} XP</p>
          ${salah.length ? `<div class="kartu-panel"><b>Yang salah atau dilewati</b><ul class="daftar-salah">${salah.slice(0, 8).map(x => `<li><span>${esc(x.tanya)}</span><b>${G.angka(x.jawab)}</b>${x.jelas ? `<small>${esc(x.jelas)}</small>` : ''}</li>`).join('')}</ul></div>` : '<p>Ga ada yang salah. Gila sih.</p>'}
          <div class="beres-tombol"><button class="btn utama besar lagi">${ikon('ulang', 18)} Main lagi</button><button class="btn garis besar balik">Selesai</button></div>
        </div>`
        el.querySelector('.lagi').onclick = () => hitungMundur()
        el.querySelector('.balik').onclick = o.tutup
      }
    }
  }

  // ---------- Kartu (Leitner) ----------
  const JEDA = [0, 1, 3, 7, 14, 30]
  const kartu = (el, o) => {
    const DEK = window.GAS_DEK, d = G.D()
    const statusDek = k => {
      const semua = DEK[k].kartu, hari = G.tgl()
      const jatuh = semua.filter(([f]) => { const x = d.kartu[k + ':' + f]; return !x || x.due <= hari })
      const hafal = semua.filter(([f]) => (d.kartu[k + ':' + f] || {}).box >= 4).length
      return { total: semua.length, jatuh: jatuh.length, hafal }
    }
    const menu = () => {
      el.innerHTML = `<div class="kartu-menu"><button class="ikon-btn kembali" aria-label="Kembali">${ikon('kiri', 20)}</button>
        <span class="label-kecil">${ikon('kartu', 14)} Kartu hafalan</span><h1 class="judul-besar">Ulang dikit, inget lama</h1>
        <p class="redup lebar-baca">Kartu yang kamu inget muncul lagi makin jarang (1, 3, 7, 14, 30 hari). Yang lupa muncul lagi besok. Cukup 3 menit sehari.</p>
        <div class="dek-daftar">${Object.keys(DEK).map(k => { const s = statusDek(k); return `<button class="dek" data-k="${k}"><div class="dek-tumpuk"><i></i><i></i><i></i></div><div><b>${DEK[k].nama}</b><span class="redup kecil">${s.total} kartu · ${s.hafal} udah hafal</span></div><span class="jatuh ${s.jatuh ? '' : 'nol'}">${s.jatuh ? s.jatuh + ' siap diulang' : 'Beres hari ini'}</span></button>` }).join('')}</div></div>`
      el.querySelector('.kembali').onclick = o.tutup
      el.querySelectorAll('.dek').forEach(b => b.onclick = () => sesi(b.dataset.k))
    }
    const sesi = k => {
      const hari = G.tgl()
      let antre = acak(DEK[k].kartu.filter(([f]) => { const x = d.kartu[k + ':' + f]; return !x || x.due <= hari })).slice(0, 12)
      if (!antre.length) antre = acak(DEK[k].kartu).slice(0, 6)
      const n0 = antre.length
      let selesai = 0, dibalik = false, hasil = { lupa: 0, ragu: 0, inget: 0 }
      const gambar = () => {
        if (!antre.length) return akhir()
        const [f, b] = antre[0], x = d.kartu[k + ':' + f]
        el.innerHTML = `<div class="kartu-sesi"><header class="pm-atas"><button class="ikon-btn tutup" aria-label="Selesai">${ikon('x', 22)}</button><div class="pm-bar"><i style="width:${selesai / n0 * 100}%"></i></div><span class="kecil redup">${selesai}/${n0}</span></header>
          <div class="kartu-flip besar ${dibalik ? 'balik' : ''}" tabindex="0" role="button" aria-label="Balik kartu"><div class="sisi depan"><small class="redup">${x ? 'Kotak ' + x.box : 'Kartu baru'}</small>${esc(f)}</div><div class="sisi belakang">${esc(b)}</div></div>
          <div class="kartu-aksi">${dibalik ? `<button class="btn n-lupa" data-n="lupa">Lupa</button><button class="btn n-ragu" data-n="ragu">Ragu</button><button class="btn n-inget" data-n="inget">Inget</button>` : `<button class="btn utama besar b-balik">Balik kartu</button>`}</div>
          <p class="redup kecil tengah">Spasi buat balik · 1 Lupa · 2 Ragu · 3 Inget</p></div>`
        const kf = el.querySelector('.kartu-flip')
        const balik = () => { dibalik = true; gambar() }
        kf.onclick = balik
        const bb = el.querySelector('.b-balik'); if (bb) bb.onclick = balik
        el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => nilai(b.dataset.n))
        el.querySelector('.tutup').onclick = () => akhir()
      }
      const nilai = n => {
        const [f] = antre.shift(), key = k + ':' + f, x = d.kartu[key] || { box: 0 }
        hasil[n]++
        if (n === 'lupa') { x.box = 1; x.due = G.geser(G.tgl(), 1); if (!antre.some(a => a[0] === f)) antre.push(DEK[k].kartu.find(a => a[0] === f)) }
        else if (n === 'ragu') { x.box = Math.max(1, x.box); x.due = G.geser(G.tgl(), JEDA[x.box]) }
        else { x.box = Math.min(5, x.box + 1); x.due = G.geser(G.tgl(), JEDA[x.box]) }
        if (n !== 'lupa') selesai++
        d.kartu[key] = x; d.latihan.kartuReview++; G.simpan()
        dibalik = false; gambar()
      }
      const tombol = e => {
        if (!el.querySelector('.kartu-sesi')) return document.removeEventListener('keydown', tombol)
        if (e.key === ' ' && !dibalik) { e.preventDefault(); dibalik = true; gambar() }
        else if (dibalik && ['1', '2', '3'].includes(e.key)) nilai(['lupa', 'ragu', 'inget'][Number(e.key) - 1])
      }
      document.addEventListener('keydown', tombol)
      const akhir = () => {
        document.removeEventListener('keydown', tombol)
        const n = hasil.lupa + hasil.ragu + hasil.inget
        if (n) G.tambahXP(Math.min(20, n))
        const kotak = [1, 2, 3, 4, 5].map(b => DEK[k].kartu.filter(([f]) => (d.kartu[k + ':' + f] || {}).box === b).length)
        const maks = Math.max(1, ...kotak)
        el.innerHTML = `<div class="sprint-akhir"><span class="label-kecil">${DEK[k].nama}</span><div class="skor-raksasa">${n}</div><p class="redup">kartu diulang · ${hasil.inget} inget · ${hasil.ragu} ragu · ${hasil.lupa} lupa · +${Math.min(20, n)} XP</p>
          <div class="kartu-panel"><b>Isi kotak hafalan</b><div class="kotak-leitner">${kotak.map((v, i) => `<div><i style="height:${v / maks * 100}%"></i><span>${v}</span><small>Kotak ${i + 1}</small></div>`).join('')}</div><p class="kecil redup">Kotak 4 dan 5 = udah hafal.</p></div>
          <div class="beres-tombol"><button class="btn utama besar balik">Selesai</button><button class="btn garis besar dek-lain">Dek lain</button></div></div>`
        el.querySelector('.balik').onclick = o.tutup
        el.querySelector('.dek-lain').onclick = menu
      }
      gambar()
    }
    menu()
  }

  // ---------- Simulasi interview ----------
  const ISIAN = /\b(eh+|em+|emm+|hmm+|anu|apa namanya|kayak|gitu|sih|uh+|um+|like|you know|basically|actually)\b/gi
  const interview = (el, o) => {
    const BANK = window.GAS_INTERVIEW
    const KAT = ['Semua', ...new Set(BANK.map(b => b.kat))]
    let kat = 'Semua', siapkan = true
    // Di dalam iframe (misal artifact) mikrofon diblok, jadi mode suara cuma nyala kalau dibuka langsung.
    const Rek = window.self === window.top ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
    const setup = () => {
      el.innerHTML = `<div class="iv-setup"><button class="ikon-btn kembali" aria-label="Kembali">${ikon('kiri', 20)}</button>
        <span class="label-kecil">${ikon('obrol', 14)} Simulasi interview</span><h1 class="judul-besar">Latihan ngomong, bukan cuma baca</h1>
        <p class="redup lebar-baca">Dapet pertanyaan acak, siap-siap 30 detik, terus jawab maksimal 2 menit. Ketik atau ngomong langsung${Rek ? '' : ' (mode suara belum didukung browser ini, pakai ketik)'}. Hasilnya dianalisis: panjang jawaban, kata pengisi, dan struktur STAR.</p>
        <div class="chip-baris" role="radiogroup">${KAT.map(k => `<button class="chip ${k === kat ? 'on' : ''}" data-k="${k}">${k}</button>`).join('')}</div>
        <label class="saklar"><input type="checkbox" ${siapkan ? 'checked' : ''}><span></span> Waktu persiapan 30 detik</label>
        <p class="redup kecil">Udah latihan ${G.D().latihan.interview}x.</p>
        <button class="btn utama besar mulai">${ikon('main', 18)} Kasih pertanyaan</button></div>`
      el.querySelector('.kembali').onclick = o.tutup
      el.querySelectorAll('.chip').forEach(b => b.onclick = () => { kat = b.dataset.k; el.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)) })
      el.querySelector('.saklar input').onchange = e => { siapkan = e.target.checked }
      el.querySelector('.mulai').onclick = () => tanya()
    }
    let dipakai = []
    const tanya = () => {
      let pool = BANK.filter(b => kat === 'Semua' || b.kat === kat)
      if (pool.every(b => dipakai.includes(b.q))) dipakai = []
      pool = pool.filter(b => !dipakai.includes(b.q))
      const b = pilih(pool); dipakai.push(b.q)
      const inggris = b.kat === 'English'
      let fase = siapkan ? 'siap' : 'jawab', t0 = Date.now(), detak = null, rek = null, merekam = false, mulaiJawab = null
      el.innerHTML = `<div class="iv"><header class="pm-atas"><button class="ikon-btn tutup" aria-label="Keluar">${ikon('x', 22)}</button><span class="label-kecil">${esc(b.kat)}</span><div class="iv-jam"></div></header>
        <div class="iv-tanya"><p class="iv-q">${esc(b.q)}</p><details class="iv-tip"><summary>${ikon('lampu', 15)} Tips</summary>${esc(b.tip)}</details></div>
        <div class="iv-fase"></div></div>`
      const jam = el.querySelector('.iv-jam'), fz = el.querySelector('.iv-fase')
      el.querySelector('.tutup').onclick = () => { clearInterval(detak); if (rek) try { rek.stop() } catch (e) { } ; setup() }
      const pasangJam = (total, habis) => {
        clearInterval(detak); t0 = Date.now()
        const putar = () => {
          if (!document.body.contains(jam)) return clearInterval(detak)
          const sisa = Math.max(0, total - (Date.now() - t0) / 1000)
          const c = Math.ceil(sisa)
          jam.innerHTML = `${cincin(sisa, total)}<b>${Math.floor(c / 60)}:${String(c % 60).padStart(2, '0')}</b>`
          jam.classList.toggle('mepet', sisa < 15)
          if (sisa <= 0) { clearInterval(detak); habis() }
        }
        putar(); detak = setInterval(putar, 250)
      }
      const faseSiap = () => {
        fz.innerHTML = `<p class="redup tengah">Pikirin poin-poinnya dulu. Jawaban mulai pas timer habis.</p><button class="btn utama besar tengah-blok lanjut">Udah siap, mulai jawab</button>`
        fz.querySelector('.lanjut').onclick = faseJawab
        pasangJam(30, faseJawab)
      }
      const faseJawab = () => {
        fase = 'jawab'; mulaiJawab = Date.now()
        fz.innerHTML = `<textarea class="tulis iv-jawab" rows="7" placeholder="${inggris ? 'Type or speak your answer…' : 'Ketik jawabanmu, atau pencet mik buat ngomong…'}"></textarea>
          <div class="iv-alat">${Rek ? `<button class="btn garis mik" aria-pressed="false">${ikon('mik', 18)} <span>Ngomong</span></button>` : ''}<span class="hitung-kata redup kecil">0 kata</span><span class="spasi"></span><button class="btn utama selesai">Selesai jawab</button></div>
          ${Rek ? '<p class="redup kecil">Mode suara pakai fitur bawaan browser. Di Chrome, suaramu diproses server Google buat diubah jadi teks.</p>' : ''}`
        const ta = fz.querySelector('textarea'), hk = fz.querySelector('.hitung-kata')
        const upd = () => { hk.textContent = (ta.value.trim().match(/\S+/g) || []).length + ' kata' }
        ta.oninput = upd
        ta.focus({ preventScroll: true })
        const bm = fz.querySelector('.mik')
        if (bm) {
          let dasar = ''
          bm.onclick = () => {
            if (merekam) { rek.stop(); return }
            rek = new Rek(); rek.lang = inggris ? 'en-US' : 'id-ID'; rek.continuous = true; rek.interimResults = true
            dasar = ta.value ? ta.value.trim() + ' ' : ''
            rek.onresult = e => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; ta.value = dasar + t; upd() }
            rek.onend = () => { merekam = false; bm.setAttribute('aria-pressed', 'false'); bm.querySelector('span').textContent = 'Ngomong'; bm.classList.remove('rekam') }
            rek.onerror = e => { G.toast(e.error === 'not-allowed' ? 'Izin mikrofon ditolak. Pakai ketik aja ya.' : 'Mik bermasalah: ' + e.error) }
            try { rek.start(); merekam = true; bm.setAttribute('aria-pressed', 'true'); bm.querySelector('span').textContent = 'Berhenti'; bm.classList.add('rekam') } catch (e) { G.toast('Mik ga bisa dinyalain di sini.') }
          }
        }
        fz.querySelector('.selesai').onclick = () => analisis(ta.value)
        pasangJam(120, () => analisis(ta.value))
      }
      const analisis = teks => {
        clearInterval(detak); if (rek && merekam) try { rek.stop() } catch (e) { }
        teks = teks.trim()
        const detik = Math.max(1, Math.round((Date.now() - (mulaiJawab || Date.now())) / 1000))
        const n = (teks.match(/\S+/g) || []).length
        const isian = (teks.match(ISIAN) || []).map(x => x.toLowerCase())
        const hitIsian = isian.reduce((m, x) => (m[x] = (m[x] || 0) + 1, m), {})
        const l = teks.toLowerCase()
        const star = inggris ? [
          ['Situation', /\b(when|during|while|at my|in my|last year|in 20\d\d)\b/.test(l)],
          ['Task', /\b(responsible|task|goal|target|needed to|had to|my role)\b/.test(l)],
          ['Action', /\bi (built|made|led|created|organized|analy[sz]ed|wrote|designed|managed|decided|started|set up|talked|asked)\b/.test(l)],
          ['Result', /\b(result|so that|as a result|increased|decreased|reduced|improved|finally|in the end|\d+ ?%|\d+)\b/.test(l)],
        ] : [
          ['Situation', /\b(saat|ketika|waktu|pas|di semester|tahun 20\d\d|selama)\b/.test(l)],
          ['Task', /\b(tugas|tanggung jawab|target|harus|ditugasi|ditugaskan|peran saya)\b/.test(l)],
          ['Action', /\bsaya (bikin|membuat|menyusun|memimpin|mengatur|menganalisis|ngajak|mengajak|memutuskan|mulai|ngobrol|menghubungi|merancang|mengelola)/.test(l)],
          ['Result', /\b(hasil|sehingga|akhirnya|jadinya|naik|turun|meningkat|berkurang|lebih cepat|\d+ ?%|\d+)\b/.test(l)],
        ]
        const saya = (l.match(inggris ? /\bi\b/g : /\bsaya|aku\b/g) || []).length, kami = (l.match(inggris ? /\bwe\b/g : /\bkami|kita\b/g) || []).length
        const pakaiSTAR = /ceritakan|describe|challenge|pengalaman|gagal|konflik|memimpin|tenggat/i.test(b.q)
        const saran = []
        if (n < 40) saran.push('Jawabannya masih pendek. Targetin 80 sampai 200 kata (sekitar 1 sampai 2 menit ngomong).')
        if (n > 260) saran.push('Jawabannya kepanjangan. Pangkas ke poin yang paling nyambung sama posisi.')
        if (isian.length >= 4) saran.push(`Kata pengisi muncul ${isian.length}x. Ganti jeda diem sebentar, itu kedengeran lebih yakin.`)
        if (pakaiSTAR && star.filter(x => x[1]).length < 3) saran.push('Pertanyaan ini cocok pakai STAR. Pastiin ada konteks, tugasmu, tindakanmu, dan hasilnya.')
        if (kami > saya && kami > 2) saran.push(`Kamu lebih sering bilang "${inggris ? 'we' : 'kami/kita'}" daripada "${inggris ? 'I' : 'saya'}". Interviewer mau tau peranmu sendiri.`)
        if (!saran.length && n) saran.push('Struktur dan panjangnya udah oke. Coba ulang sambil ngomong keras biar makin lancar.')
        const d = G.D(); d.latihan.interview++; G.simpan()
        if (n >= 20) G.tambahXP(10); else G.cekLencana()
        fz.innerHTML = `<div class="iv-hasil">
          <div class="statistik"><div><small>Kata</small><b>${n}</b></div><div><small>Durasi</small><b>${Math.floor(detik / 60)}:${String(detik % 60).padStart(2, '0')}</b></div><div><small>Kata pengisi</small><b>${isian.length}</b></div></div>
          ${Object.keys(hitIsian).length ? `<p class="kecil redup">Pengisi: ${Object.entries(hitIsian).map(([k, v]) => `"${esc(k)}" ${v}x`).join(', ')}</p>` : ''}
          ${pakaiSTAR ? `<div class="star-cek">${star.map(([k, ok]) => `<span class="${ok ? 'ok' : ''}">${ikon(ok ? 'cek' : 'x', 14)} ${k}</span>`).join('')}</div><p class="kecil redup">Deteksi STAR cuma pakai kata kunci, jadi anggap sebagai pengingat, bukan nilai.</p>` : ''}
          <ul class="saran">${saran.map(s => `<li>${s}</li>`).join('')}</ul>
          <details class="iv-teks"><summary>Jawaban kamu</summary><p>${esc(teks) || '<i>(kosong)</i>'}</p></details>
          <div class="beres-tombol"><button class="btn utama besar lagi">${ikon('kanan', 18)} Pertanyaan berikutnya</button><button class="btn garis salin">${ikon('salin', 16)} Salin buat feedback AI</button><button class="btn garis udah">Selesai</button></div></div>`
        jam.innerHTML = ''
        fz.querySelector('.lagi').onclick = tanya
        fz.querySelector('.udah').onclick = setup
        fz.querySelector('.salin').onclick = () => G.salin(`Aku lagi latihan interview kerja sebagai fresh graduate. Pertanyaannya: "${b.q}"\n\nJawabanku:\n${teks}\n\nKasih feedback jujur: struktur (STAR kalau relevan), kejelasan, dan 3 saran konkret. Jangan nambahin pengalaman yang ga aku tulis.`)
      }
      if (fase === 'siap') faseSiap(); else faseJawab()
    }
    setup()
  }

  return { sprint, kartu, interview, GEN }
})()
