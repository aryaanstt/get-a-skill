// Halaman-halaman Get a Skill v2 dan router hash.
;(() => {
  const { esc, ikon, KAT } = G
  const hal = () => document.getElementById('hal')
  const go = h => { if (location.hash === h) render(); else location.hash = h }
  const sapa = () => { const j = new Date().getHours(); return j < 11 ? 'Selamat pagi' : j < 15 ? 'Selamat siang' : j < 18 ? 'Selamat sore' : 'Selamat malam' }
  const kode = (id, besar) => { const w = G.warnaSkill(id); return `<span class="kode ${besar ? 'besar' : ''} ${w === 'var(--siap)' ? 'siap' : ''}" style="background:${w}">${id}</span>` }
  const logo = () => `<a class="logo" href="#" aria-label="get a skill, beranda"><span class="wm-get" aria-hidden="true"><span class="kap">get</span> <span class="aks">a</span> skill<span class="aks">.</span></span></a>`
  const levelNama = id => (KAT.level.find(l => l.id === id) || {}).nama

  // ---------- kuis harian ----------
  // 5 soal per skill per hari, diambil dari soal tes penempatan + langkah bernilai di semua pelajaran skill itu.
  // Urutan diacak pakai benih tetap per skill, tiap hari ngambil 5 berikutnya, jadi beda dari kemarin.
  const DINILAI = ['pilih', 'banyak', 'angka', 'pasang', 'urut', 'skenario', 'isian', 'slider', 'sql', 'excel']
  const benih = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) } return h >>> 0 }
  const acakBenih = (arr, seed) => { const a = arr.slice(); let x = seed || 1; const r = () => { x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
  const kolamHarian = id => { const K = G.kursus(id); if (!K) return []; return [...(K.tes || []).map(t => ({ t: 'pilih', tanya: t.tanya, opsi: t.opsi, benar: t.benar, jelas: 'Soal dari bank tes ' + KAT.skill[id].pendek + '.' })), ...(K.harian || []), ...K.pelajaran.flatMap(p => p.langkah.filter(l => DINILAI.includes(l.t)))] }
  const hariKe = t => Math.floor(Date.parse(t + 'T00:00:00Z') / 864e5)
  const soalHarian = (id, t = G.tgl()) => { const k = acakBenih(kolamHarian(id), benih(id)); if (!k.length) return []; const d = hariKe(t); return Array.from({ length: Math.min(5, k.length) }, (_, i) => k[(d * 5 + i) % k.length]) }
  const skorHarian = (id, t = G.tgl()) => ((G.D().harian || {})[id] || {})[t]
  const streakHarian = id => { let t = G.tgl(); if (skorHarian(id, t) === undefined) t = G.geser(t, -1); let n = 0; while (skorHarian(id, t) !== undefined && n < 400) { n++; t = G.geser(t, -1) } return n }
  const panelHarian = id => { const s = skorHarian(id), st = streakHarian(id); return `<a class="panel harian-panel" href="#harian-${id}" style="--garis:${G.warnaSkill(id)}"><span class="label-kecil">${ikon('target', 14)} Kuis harian</span><b>${s !== undefined ? `Hari ini: akurasi ${s}%` : '5 soal baru hari ini'}</b><span class="redup kecil">${st ? `Streak ${st} hari. ` : ''}Soal ganti tiap hari, beda dari kemarin.</span>${ikon('kanan', 18, 'panah')}</a>` }

  // ---------- kerangka aplikasi ----------
  const NAV = [['beranda', 'Beranda', 'rumah'], ['jelajah', 'Jelajah', 'kompas'], ['latihan', 'Latihan', 'target'], ['profil', 'Profil', 'orang']]
  const kerangka = (aktif, isi) => {
    const d = G.D(), lv = G.levelXP(d.xp)
    document.body.className = ''
    hal().innerHTML = `<div class="app">
      <nav class="rel" aria-label="Menu utama">${logo()}
        <div class="rel-menu">${NAV.map(([h, n, i]) => `<a href="#${h}" class="${aktif === h ? 'on' : ''}" ${aktif === h ? 'aria-current="page"' : ''}>${ikon(i, 22)}<span>${n}</span></a>`).join('')}</div>
        <button class="rel-masukan" data-masukan="fitur">${ikon('obrol', 20)}<span>Kasih masukan</span></button>
        <div class="rel-bawah"><div class="rel-stat"><span title="Streak">${ikon('api', 16)} ${G.streak()}</span><span title="Level">${ikon('petir', 16)} Lv ${lv.lv}</span></div>
        <button class="ikon-btn tema-btn" aria-label="Ganti tema">${ikon(document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) ? 'matahari' : 'bulan', 20)}</button></div>
      </nav>
      <main class="isi" id="isi" tabindex="-1">
        <header class="atas-hp">${logo()}<span class="spasi"></span><span class="stat-hp"><span title="Streak">${ikon('api', 15)} ${G.streak()}</span><span title="Level">${ikon('petir', 15)} Lv ${lv.lv}</span></span><button class="ikon-btn tema-btn" aria-label="Ganti tema">${ikon(document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) ? 'matahari' : 'bulan', 20)}</button></header>
        ${isi}</main></div>`
    hal().querySelectorAll('.tema-btn').forEach(b => b.onclick = () => {
      const gelap = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)
      G.tema(gelap ? 'light' : 'dark'); render()
    })
  }
  const polos = html => { document.body.className = 'polos'; hal().innerHTML = html }

  // ---------- masukan ----------
  const JENIS_MASUKAN = [['bidang', 'Bidang atau skill baru'], ['fitur', 'Ide fitur'], ['error', 'Ada yang error'], ['lainnya', 'Lainnya']]
  const bukaMasukan = (awal = {}) => {
    let jenis = awal.jenis || 'bidang'
    const w = document.createElement('div')
    w.className = 'dialog-latar'
    w.innerHTML = `<form class="dialog masukan" role="dialog" aria-modal="true" aria-labelledby="judul-masukan" novalidate>
      <div class="dialog-kepala"><h2 id="judul-masukan">Kasih masukan</h2><button type="button" class="ikon-btn tutup" aria-label="Tutup">${ikon('x', 20)}</button></div>
      <p class="redup kecil">Bidang kerja atau skill yang belum ada, fitur yang kamu pengen, atau ada yang error. Semua masukan dibaca.</p>
      <div class="seg jenis" role="radiogroup" aria-label="Jenis masukan">${JENIS_MASUKAN.map(([k, n]) => `<button type="button" role="radio" aria-checked="${k === jenis}" data-k="${k}">${n}</button>`).join('')}</div>
      <label class="isian-bidang">Bidang atau skill apa?<input name="bidang" maxlength="120" placeholder="Misal: teknik sipil, farmasi, public speaking" value="${esc(awal.bidang || '')}"></label>
      <label>Ceritain lebih lengkap<textarea name="isi" rows="5" maxlength="2000" placeholder="Misal: aku anak Farmasi, pengen ada materi buat tes masuk industri farmasi"></textarea></label>
      <label>Email atau kontak <span class="redup">(opsional, kalau mau dikabarin)</span><input name="kontak" maxlength="120" autocomplete="email" value="${esc(G.masuk() && !G.tamu() ? (G.akun.email() || '').replace(/^u:.*/, '') : '')}"></label>
      <p class="galat" hidden></p>
      <div class="dialog-tombol"><button type="button" class="btn garis batal">Batal</button><button class="btn utama kirim">Kirim masukan</button></div>
    </form>`
    document.body.appendChild(w)
    const f = w.querySelector('form'), gl = f.querySelector('.galat'), bid = f.querySelector('.isian-bidang')
    const segar = () => { bid.hidden = jenis !== 'bidang'; f.querySelectorAll('.jenis button').forEach(b => b.setAttribute('aria-checked', b.dataset.k === jenis)) }
    const tutup = () => { document.removeEventListener('keydown', esc1, true); w.remove() }
    const esc1 = e => { if (e.key === 'Escape') { e.stopPropagation(); tutup() } }
    document.addEventListener('keydown', esc1, true)
    f.querySelectorAll('.jenis button').forEach(b => b.onclick = () => { jenis = b.dataset.k; segar() })
    f.querySelector('.tutup').onclick = f.querySelector('.batal').onclick = tutup
    w.onclick = e => { if (e.target === w) tutup() }
    f.onsubmit = async e => {
      e.preventDefault(); gl.hidden = true
      const v = Object.fromEntries(new FormData(f))
      const isi = (v.isi || '').trim() || (jenis === 'bidang' && v.bidang ? `Tolong tambahin: ${v.bidang}` : '')
      const btn = f.querySelector('.kirim'); btn.disabled = true; btn.textContent = 'Ngirim…'
      try {
        const h = await G.kirimMasukan({ jenis, isi, bidang: jenis === 'bidang' ? v.bidang : null, kontak: v.kontak })
        f.innerHTML = `<div class="masukan-makasih">${ikon('cek', 34)}<h2>Makasih, masukanmu udah kekirim!</h2><p class="redup">${h.lokal ? 'Lagi mode lokal, jadi masukannya kesimpen di perangkat ini dulu.' : 'Masukan yang paling banyak diminta bakal diduluin.'}</p><button type="button" class="btn utama oke">Oke</button></div>`
        f.querySelector('.oke').onclick = tutup; f.querySelector('.oke').focus()
      } catch (err) { gl.textContent = err.message; gl.hidden = false; btn.disabled = false; btn.textContent = 'Kirim masukan' }
    }
    segar()
    setTimeout(() => (jenis === 'bidang' && !awal.bidang ? f.querySelector('[name=bidang]') : f.querySelector('textarea')).focus(), 50)
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-masukan]'); if (b) { e.preventDefault(); bukaMasukan({ jenis: b.dataset.masukan || 'fitur', bidang: b.dataset.bidang || (b.dataset.cari ? filter.q : '') }) } })

  // ---------- landing ----------
  const landing = () => {
    const contoh = KAT.jalur.filter(j => ['data', 'marketing', 'admin'].includes(j.id)).concat([KAT.siapKerja])
    polos(`<div class="landing">
      <header class="lnd-atas">${logo()}<span class="spasi"></span><a href="#masuk" class="btn tipis">Masuk</a><a href="#daftar" class="btn utama">Daftar gratis</a></header>
      <section class="hero">
        <div class="hero-teks">
          <span class="label-kecil">Buat fresh graduate dan mahasiswa tingkat akhir</span>
          <h1>Baru lulus, ngerasa belum punya skill? <em>Mulai dari sini.</em></h1>
          <p class="hero-sub">Pilih jalur karier, tes posisi kemampuanmu, terus latihan 10 menit sehari. Materinya nyesuain level kamu, dari Dasar sampai Mahir, dan semua latihannya dicek otomatis.</p>
          <div class="hero-cta"><a href="#daftar" class="btn utama besar">Mulai gratis ${ikon('kanan', 18)}</a><button class="btn garis besar coba-tamu">Coba tanpa akun</button></div>
          <dl class="hero-angka"><div><dt>${Object.keys(KAT.skill).length}</dt><dd>skill</dd></div><div><dt>${KAT.jalur.length}</dt><dd>jalur karier</dd></div><div><dt>3</dt><dd>level</dd></div><div><dt>${Object.values(window.GAS_KURSUS).reduce((n, k) => n + k.pelajaran.reduce((m, p) => m + p.langkah.length, 0), 0)}</dt><dd>langkah interaktif</dd></div></dl>
        </div>
        <div class="hero-peta"><div class="peta-wadah" id="peta-hero"></div><p class="peta-cap">${ikon('peta', 15)} Tiap jalur karier punya rute sendiri. Skill yang dipakai banyak jalur jadi stasiun transit.</p></div>
      </section>
      <section class="cara">
        <h2>Cara kerjanya</h2>
        <ol class="rute-cara">
          <li><b>Kenalan 2 menit</b><span>Status, jurusan, jalur yang kamu incar, dan seberapa bisa kamu sekarang.</span></li>
          <li><b>Tes posisi</b><span>6 soal adaptif per skill. Yang udah kamu kuasai otomatis ditandai lulus.</span></li>
          <li><b>Belajar sambil ngerjain</b><span>Nulis rumus Excel, query SQL beneran, nyusun jawaban interview. Bukan nonton video panjang.</span></li>
          <li><b>Latihan siap kerja</b><span>Sprint psikotes 60 detik, kartu hafalan, dan simulasi interview pakai timer.</span></li>
        </ol>
      </section>
      <section class="coba">
        <div class="coba-teks"><span class="label-kecil">Coba langsung</span><h2>Satu soal Excel, dicek beneran</h2><p class="redup">Klik sel di tabel buat masukin alamatnya, atau seret buat milih rentang. Hasilnya keliatan selagi kamu ngetik.</p></div>
        <div class="coba-kotak" id="demo"></div>
      </section>
      <section class="jalur-lnd">
        <h2>Pilih jalurmu</h2><p class="redup">Semua jalur nyambung ke garis <b>Siap Kerja</b>: CV, psikotes, interview, dan bahasa Inggris.</p>
        <div class="jalur-grid">${KAT.jalur.map(j => `<div class="jalur-kartu" style="--garis:${j.warna}"><b>${j.nama}</b><span class="redup kecil">${j.ket}</span><div class="kode-baris">${j.skill.map(s => `<span class="kode kecil" style="background:${j.warna}">${s}</span>`).join('')}</div></div>`).join('')}</div>
      </section>
      <footer class="lnd-kaki"><span>${logo()} <a class="redup kecil bagian-dari" href="../../get-it/">bagian dari <b>get it</b></a></span><span class="redup kecil">${G.akun.awan() ? 'Satu akun buat semua perangkat. Progres disimpan di server.' : 'Mode lokal: akun dan progres cuma di perangkat ini.'}</span></footer>
    </div>`)
    GAS_PETA.gambar(document.getElementById('peta-hero'), { lines: contoh, kereta: !G.reduksi(), ringkas: true, legenda: true, minSkala: .62, klik: () => go('#daftar') })
    GAS_PEMUTAR.demo(document.getElementById('demo'), window.GAS_KURSUS.EX.pelajaran[0].langkah[2], () => G.konfeti())
    hal().querySelector('.coba-tamu').onclick = () => { G.akun.tamu(); go('#mulai') }
  }

  // ---------- masuk / daftar ----------
  const auth = mode => {
    const daftar = mode === 'daftar'
    polos(`<div class="auth">
      <div class="auth-kartu">${logo()}
        <h1>${daftar ? 'Bikin akun' : 'Masuk lagi'}</h1>
        <p class="redup">${daftar ? 'Biar progres, streak, dan tiket lulusmu kesimpen.' : 'Lanjutin rute belajarmu.'}</p>
        <form class="form" novalidate>
          ${daftar ? '<label>Nama panggilan<input name="nama" autocomplete="nickname" required></label>' : ''}
          <label>Email<input name="email" type="email" autocomplete="email" required></label>
          <label>Kata sandi<input name="pass" type="password" autocomplete="${daftar ? 'new-password' : 'current-password'}" minlength="6" required></label>
          <p class="galat" hidden></p>
          <button class="btn utama besar penuh">${daftar ? 'Daftar' : 'Masuk'}</button>
        </form>
        <p class="tengah kecil">${daftar ? 'Udah punya akun? <a href="#masuk">Masuk</a>' : 'Belum punya akun? <a href="#daftar">Daftar</a>'}</p>
        <div class="atau"><span>atau</span></div>
        <button class="btn garis penuh tamu">Lanjut tanpa akun</button>
      </div>
      <div class="auth-hias" aria-hidden="true"><div id="peta-auth"></div></div>
    </div>`)
    GAS_PETA.gambar(document.getElementById('peta-auth'), { lines: [KAT.jalur[0], KAT.jalur[6], KAT.siapKerja], kereta: !G.reduksi(), ringkas: true, legenda: false })
    const f = hal().querySelector('form'), gl = f.querySelector('.galat')
    f.onsubmit = async e => {
      e.preventDefault(); gl.hidden = true; gl.className = 'galat'
      const v = Object.fromEntries(new FormData(f))
      try {
        const btn = f.querySelector('button'); btn.disabled = true; btn.textContent = 'Sebentar…'
        try {
          if (daftar) { const h = await G.akun.daftar(v.nama, v.email, v.pass); if (h && h.konfirmasi) { gl.className = 'info-ok'; gl.innerHTML = 'Akun dibuat. Buka email dari Supabase (cek juga folder spam), klik link konfirmasinya, terus <a href="#masuk">masuk</a> pakai email dan kata sandi tadi.'; gl.hidden = false; return } }
          else await G.akun.masuk(v.email, v.pass)
        } finally { btn.disabled = false; btn.textContent = daftar ? 'Daftar' : 'Masuk' }
        go(G.D().onboarding ? '#beranda' : '#mulai')
      } catch (err) { gl.textContent = err.message; gl.hidden = false }
    }
    hal().querySelector('.tamu').onclick = () => { G.akun.tamu(); go(G.D().onboarding ? '#beranda' : '#mulai') }
    setTimeout(() => f.querySelector('input').focus(), 50)
  }

  // ---------- onboarding ----------
  const onboarding = () => {
    const d = G.D()
    const ob = Object.assign({ nama: (G.akun.info() || {}).nama || '', status: null, lulusTahun: null, lulusBulan: null, rumpun: null, jalur: [], belumTahu: false, cek: {}, target: null }, d.onboarding || {})
    const O = KAT.onboarding
    const tahun = [2023, 2024, 2025, 2026, 2027, 2028]
    const LANGKAH = [
      { tanya: 'Halo! Kita panggil kamu siapa?', sah: () => ob.nama.trim().length > 0, isi: () => `<input class="ob-input" name="nama" value="${esc(ob.nama)}" placeholder="Nama panggilan" autocomplete="nickname" maxlength="30">`, pasang: el => { const i = el.querySelector('input'); i.oninput = () => { ob.nama = i.value; segar() }; setTimeout(() => i.focus(), 50) } },
      { tanya: n => `Oke, ${esc(ob.nama.trim())}. Sekarang lagi di posisi mana?`, sah: () => !!ob.status, isi: () => `<div class="ubin-grid">${O.status.map(s => `<button class="ubin ${ob.status === s.id ? 'on' : ''}" data-v="${s.id}"><b>${s.label}</b><span>${s.ket}</span></button>`).join('')}</div>`, pasang: el => pilihSatu(el, v => { ob.status = v; setTimeout(maju, 220) }) },
      { tanya: () => ob.status === 'kuliah' ? 'Rencana lulus kapan?' : 'Lulus kapan?', sah: () => !!ob.lulusTahun, isi: () => `<div class="chip-baris besar">${tahun.map(t => `<button class="chip ${ob.lulusTahun === t ? 'on' : ''}" data-t="${t}">${t}</button>`).join('')}</div><p class="redup kecil">Bulan (opsional)</p><div class="chip-baris">${G.BULAN.map((b, i) => `<button class="chip kecil ${ob.lulusBulan === i + 1 ? 'on' : ''}" data-b="${i + 1}">${b}</button>`).join('')}</div>`, pasang: el => {
        el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { ob.lulusTahun = Number(b.dataset.t); el.querySelectorAll('[data-t]').forEach(x => x.classList.toggle('on', x === b)); segar() })
        el.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { ob.lulusBulan = ob.lulusBulan === Number(b.dataset.b) ? null : Number(b.dataset.b); el.querySelectorAll('[data-b]').forEach(x => x.classList.toggle('on', Number(x.dataset.b) === ob.lulusBulan)) })
      } },
      { tanya: 'Jurusanmu masuk rumpun apa?', sah: () => !!ob.rumpun, isi: () => `<div class="ubin-grid kecil">${O.rumpun.map(r => `<button class="ubin ${ob.rumpun === r ? 'on' : ''}" data-v="${esc(r)}"><b>${r}</b></button>`).join('')}</div>`, pasang: el => pilihSatu(el, v => { ob.rumpun = v; setTimeout(maju, 220) }) },
      { tanya: 'Kerja di bidang apa yang kamu incar?', sub: 'Pilih maksimal 2. Bisa diganti kapan aja.', sah: () => ob.jalur.length > 0, isi: () => `<div class="ubin-grid jalur">${KAT.jalur.map(j => `<button class="ubin garis-kiri ${ob.jalur.includes(j.id) && !ob.belumTahu ? 'on' : ''}" data-j="${j.id}" style="--garis:${j.warna}"><b>${j.nama}</b><span>${j.ket}</span></button>`).join('')}<button class="ubin putus ${ob.belumTahu ? 'on' : ''}" data-j="?"><b>Belum tahu</b><span>Kasih saran dari jurusanku</span></button></div>
          <div class="ga-ada"><button class="link-tombol" data-ga-ada aria-expanded="${!!ob.bidangLain}">${ikon('tambah', 16)} Bidang yang kamu incar ga ada di sini?</button><div class="ga-ada-isi" ${ob.bidangLain ? '' : 'hidden'}><input class="ob-input kecil" maxlength="120" placeholder="Misal: hospitality, farmasi, teknik sipil" value="${esc(ob.bidangLain || '')}" aria-label="Bidang yang kamu incar"><p class="redup kecil">Ini jadi masukan buat nambah jalur baru. Sementara, pilih juga satu jalur di atas yang paling deket.</p></div></div>`, pasang: el => {
        const ga = el.querySelector('[data-ga-ada]'), gaIsi = el.querySelector('.ga-ada-isi'), gaInp = gaIsi.querySelector('input')
        ga.onclick = () => { gaIsi.hidden = !gaIsi.hidden; ga.setAttribute('aria-expanded', !gaIsi.hidden); if (!gaIsi.hidden) gaInp.focus() }
        gaInp.oninput = () => { ob.bidangLain = gaInp.value.trim() }
        el.querySelectorAll('[data-j]').forEach(b => b.onclick = () => {
          const j = b.dataset.j
          if (j === '?') { ob.belumTahu = !ob.belumTahu; ob.jalur = ob.belumTahu ? (O.saranJalur[ob.rumpun] || ['data', 'admin']).slice() : [] }
          else { if (ob.belumTahu) { ob.belumTahu = false; ob.jalur = [] } ob.jalur = ob.jalur.includes(j) ? ob.jalur.filter(x => x !== j) : ob.jalur.concat(j).slice(-2) }
          el.querySelectorAll('[data-j]').forEach(x => x.classList.toggle('on', x.dataset.j === '?' ? ob.belumTahu : ob.jalur.includes(x.dataset.j) && !ob.belumTahu))
          const s = el.querySelector('.saran'); if (s) s.remove()
          if (ob.belumTahu) el.insertAdjacentHTML('beforeend', `<p class="saran">${ikon('lampu', 16)} Dari rumpun ${esc(ob.rumpun)}, kami sarankan mulai dari <b>${ob.jalur.map(x => KAT.jalur.find(j => j.id === x).nama).join('</b> dan <b>')}</b>.</p>`)
          segar()
        })
      } },
      { tanya: 'Jujur aja, seberapa bisa kamu sekarang?', sub: 'Ini cuma perkiraan awal. Nanti dicek lagi lewat tes penempatan.', sah: () => O.cekSkill.every(s => ob.cek[s] != null), isi: () => `<div class="nilai-diri">${O.cekSkill.map(s => `<div class="nd-baris"><div>${kode(s)}<b>${KAT.skill[s].pendek}</b></div><div class="seg" role="radiogroup" aria-label="${KAT.skill[s].nama}">${['Belum pernah', 'Pernah dikit', 'Udah lumayan'].map((t, i) => `<button role="radio" aria-checked="${ob.cek[s] === i}" data-s="${s}" data-i="${i}">${t}</button>`).join('')}</div></div>`).join('')}</div>`, pasang: el => {
        el.querySelectorAll('.seg button').forEach(b => b.onclick = () => { ob.cek[b.dataset.s] = Number(b.dataset.i); b.parentElement.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', x === b)); segar() })
      } },
      { tanya: 'Target belajar per hari?', sub: 'Bisa diganti di Profil.', sah: () => !!ob.target, isi: () => `<div class="ubin-grid tiga">${O.target.map(t => `<button class="ubin tengah ${ob.target === t.id ? 'on' : ''}" data-v="${t.id}"><span class="ubin-angka">${t.id}</span><b>menit</b><span>${t.ket} · ${t.xp} XP</span></button>`).join('')}</div>`, pasang: el => pilihSatu(el, v => { ob.target = Number(v); setTimeout(maju, 220) }) },
    ]
    let i = 0
    const pilihSatu = (el, cb) => el.querySelectorAll('.ubin[data-v]').forEach(b => b.onclick = () => { el.querySelectorAll('.ubin').forEach(x => x.classList.toggle('on', x === b)); cb(b.dataset.v); segar() })
    const segar = () => { const b = hal().querySelector('.ob-lanjut'); if (b) b.disabled = !LANGKAH[i].sah() }
    const gambar = () => {
      const L = LANGKAH[i]
      polos(`<div class="ob">
        <header class="ob-atas"><button class="ikon-btn ob-balik" aria-label="Sebelumnya" ${i === 0 ? 'style="visibility:hidden"' : ''}>${ikon('kiri', 22)}</button><div class="ob-ruas">${LANGKAH.map((_, n) => `<i class="${n < i ? 'lewat' : n === i ? 'ini' : ''}"></i>`).join('')}</div><span class="kecil redup">${i + 1}/${LANGKAH.length}</span></header>
        <main class="ob-isi masuk"><h1>${typeof L.tanya === 'function' ? L.tanya() : L.tanya}</h1>${L.sub ? `<p class="redup">${L.sub}</p>` : ''}<div class="ob-jawab">${L.isi()}</div></main>
        <footer class="ob-bawah"><button class="btn utama besar ob-lanjut" disabled>${i === LANGKAH.length - 1 ? 'Bikin ruteku' : 'Lanjut'} ${ikon('kanan', 18)}</button></footer>
      </div>`)
      L.pasang(hal().querySelector('.ob-jawab'))
      hal().querySelector('.ob-lanjut').onclick = maju
      hal().querySelector('.ob-balik').onclick = () => { if (i > 0) { i--; gambar() } }
      hal().querySelector('.ob').onkeydown = e => { if (e.key === 'Enter' && LANGKAH[i].sah() && e.target.tagName !== 'BUTTON') { e.preventDefault(); maju() } }
      segar()
    }
    const maju = () => { if (!LANGKAH[i].sah()) return; if (i < LANGKAH.length - 1) { i++; gambar() } else simpanOb() }
    const simpanOb = () => {
      ob.nama = ob.nama.trim()
      if (ob.bidangLain && ob.bidangLain !== ob.bidangLainTerkirim) {
        const b = ob.bidangLain
        G.kirimMasukan({ jenis: 'bidang', isi: `Bidang yang dicari pas onboarding: ${b}. Rumpun: ${ob.rumpun || '-'}. Status: ${ob.status || '-'}.`, bidang: b }).then(() => { ob.bidangLainTerkirim = b; G.simpan() }).catch(() => { })
      }
      d.onboarding = ob
      Object.entries(ob.cek).forEach(([s, v]) => { if (!d.level[s] || d.level[s].sumber !== 'tes') d.level[s] = { level: v === 2 ? 'menengah' : 'dasar', sumber: 'perkiraan', tgl: G.tgl() } })
      G.simpan()
      ungkap()
    }
    const ungkap = () => {
      const lines = G.jalurUser().concat([KAT.siapKerja])
      const lemah = KAT.onboarding.cekSkill.filter(s => ob.cek[s] === 0)
      const pertama = lines[0].skill[0]
      polos(`<div class="ob ungkap">
        <main class="ob-isi masuk"><span class="label-kecil">Rute kamu udah jadi</span><h1>${esc(ob.nama)}, ini peta karier kamu.</h1>
        <p class="redup">${lines.length - 1} jalur pilihanmu, plus garis <b>Siap Kerja</b> yang dipakai semua orang buat ngelamar.</p>
        <div class="peta-wadah" id="peta-ungkap"></div>
        <div class="ungkap-saran">
          <div>${ikon('main', 18)}<span>Stasiun pertama: <b>${KAT.skill[pertama].nama}</b>. Ambil tes penempatan 2 menit biar materinya pas.</span></div>
          ${lemah.length ? `<div>${ikon('lampu', 18)}<span>Kamu bilang belum pernah: <b>${lemah.map(s => KAT.skill[s].pendek).join(', ')}</b>. Ini masuk rekomendasi di beranda.</span></div>` : ''}
          ${G.tamu() ? `<div>${ikon('gembok', 18)}<span>Lagi mode tamu. <a href="#daftar">Bikin akun</a> biar progres ga ilang.</span></div>` : ''}
        </div></main>
        <footer class="ob-bawah"><button class="btn utama besar ke-beranda">Masuk ke beranda ${ikon('kanan', 18)}</button></footer>
      </div>`)
      GAS_PETA.gambar(document.getElementById('peta-ungkap'), { lines, progres: G.progres, aktif: pertama, klik: id => go('#skill-' + id) })
      hal().querySelector('.ke-beranda').onclick = () => go('#beranda')
      G.konfeti()
    }
    gambar()
  }

  // ---------- beranda ----------
  const pilihLanjut = () => {
    const d = G.D()
    const urut = G.skillUser()
    if (d.terakhir && d.terakhir.skill && G.berikut(d.terakhir.skill)) urut.unshift(d.terakhir.skill)
    for (const s of urut) { const p = G.berikut(s); if (p) return { s, p } }
    return null
  }
  const cincinTarget = (nilai, target) => {
    const k = 2 * Math.PI * 52, f = Math.min(1, nilai / target)
    return `<svg viewBox="0 0 120 120" class="cincin-target"><circle cx="60" cy="60" r="52" class="c-latar"/><circle cx="60" cy="60" r="52" class="c-isi ${f >= 1 ? 'penuh' : ''}" style="stroke-dasharray:${k};stroke-dashoffset:${k * (1 - f)}"/></svg>`
  }
  const tiket = (s, p, opsi = {}) => {
    const w = G.warnaSkill(s), d = G.D(), lv = d.level[s]
    const belumTes = !d.tes[s] && !Object.keys(d.pelajaran).some(k => k.startsWith(s + '/'))
    return `<article class="tiket" style="--garis:${w}">
      <div class="tiket-kiri">${kode(s, true)}<span class="kecil">${levelNama(p.level)}</span></div>
      <div class="tiket-isi"><span class="label-kecil">${opsi.label || 'Lanjutkan'} · ${KAT.skill[s].nama}</span><h3>${esc(p.judul)}</h3><p class="redup kecil">${ikon('jam', 14)} ${p.menit} menit · ${p.langkah.length} langkah${lv && lv.sumber === 'tes' ? ' · level dari tes' : ''}</p>
        <div class="tiket-aksi"><a class="btn utama" href="#belajar-${s}-${p.id}">${ikon('main', 16)} Mulai</a>${belumTes && G.kursus(s).tes.length ? `<a class="btn garis" href="#tes-${s}">Tes penempatan dulu</a>` : ''}</div></div>
    </article>`
  }
  const heatmap = () => {
    const h = G.D().hari, hari = G.tgl(), mulai = G.geser(hari, -83 - ((new Date().getDay() + 6) % 7))
    const sel = []
    for (let i = 0; ; i++) { const t = G.geser(mulai, i); if (t > hari) break; sel.push(t) }
    const maks = Math.max(30, ...sel.map(t => h[t] || 0))
    return `<div class="heat" role="img" aria-label="Aktivitas 12 minggu terakhir">${sel.map(t => { const v = h[t] || 0; const n = v ? Math.min(4, Math.ceil(v / maks * 4)) : 0; return `<i class="h${n} ${t === hari ? 'hari-ini' : ''}" title="${G.tglPanjang(t)}: ${v} XP"></i>` }).join('')}</div>`
  }
  const rekomendasi = () => {
    const d = G.D(), ob = d.onboarding, out = []
    KAT.onboarding.cekSkill.filter(s => ob.cek[s] === 0 && G.progres(s).n === 0).forEach(s => { const p = G.berikut(s); if (p) out.push({ s, judul: KAT.skill[s].nama, ket: 'Kamu bilang belum pernah. Mulai dari pelajaran pertama.', href: `#belajar-${s}-${p.id}`, ikon: 'main' }) })
    G.skillUser().filter(s => !d.tes[s] && G.kursus(s)).slice(0, 4).forEach(s => out.push({ s, judul: `Tes posisi ${KAT.skill[s].pendek}`, ket: '6 soal, sekitar 2 menit. Biar materinya pas.', href: `#tes-${s}`, ikon: 'target' }))
    if (!d.latihan.sprint.length) out.push({ judul: 'Sprint psikotes 60 detik', ket: 'Deret angka dan hitung cepat. Rekormu belum ada.', href: '#latihan-psikotes', ikon: 'sigma' })
    return out.slice(0, 3)
  }
  const beranda = () => {
    const d = G.D(), ob = d.onboarding
    const lanjut = pilihLanjut(), xpHari = G.hariIni(), tgt = G.target(), lv = G.levelXP(d.xp), st = G.streak()
    const minggu = Array.from({ length: 7 }, (_, i) => G.geser(G.tgl(), i - 6))
    const lines = G.jalurUser().concat([KAT.siapKerja])
    const rek = rekomendasi()
    kerangka('beranda', `<div class="beranda">
      <header class="sapa"><div><p class="redup kecil">${G.HARI[new Date().getDay()]}, ${G.tglPanjang(G.tgl())}</p><h1>${sapa()}, ${esc(G.nama())}.</h1></div>
        <div class="sapa-chip"><span class="chip-stat api ${st ? 'nyala' : ''}">${ikon('api', 18)}<b>${st}</b> hari</span><span class="chip-stat">${ikon('petir', 18)}<b>${G.angka(d.xp)}</b> XP</span></div></header>
      <div class="beranda-grid">
        <div class="kolom-utama">
          ${lanjut ? tiket(lanjut.s, lanjut.p) : `<div class="panel kosong">${ikon('medali', 28)}<p>Semua pelajaran di rutemu udah beres. Cek <a href="#jelajah">Jelajah</a> buat skill lain.</p></div>`}
          <section class="panel">
            <div class="panel-kepala"><h2>Peta karier kamu</h2><a href="#profil" class="kecil">Ubah jalur</a></div>
            <div class="peta-wadah" id="peta-beranda"></div>
            <p class="redup kecil peta-hint">${ikon('peta', 14)} Ketuk stasiun buat buka skill. Ketuk nama jalur buat nyorot garisnya.</p>
          </section>
          ${rek.length ? `<section><h2 class="judul-bagian">Disaranin buat kamu</h2><div class="rek-grid">${rek.map(r => `<a class="rek" href="${r.href}">${r.s ? kode(r.s) : `<span class="kode ikon-kode">${ikon(r.ikon, 16)}</span>`}<div><b>${esc(r.judul)}</b><span class="redup kecil">${r.ket}</span></div>${ikon('kanan', 18, 'panah')}</a>`).join('')}</div></section>` : ''}
        </div>
        <aside class="kolom-samping">
          <section class="panel target-hari"><div class="cincin-wadah">${cincinTarget(xpHari, tgt)}<div class="cincin-teks"><b>${xpHari}</b><span>/ ${tgt} XP</span></div></div>
            <div><h2>Target hari ini</h2><p class="redup kecil">${xpHari >= tgt ? 'Tercapai! Lanjut kalau masih semangat.' : `${tgt - xpHari} XP lagi. Satu pelajaran sekitar 40 sampai 70 XP.`}</p>
            <div class="minggu">${minggu.map(t => `<span class="${d.hari[t] ? 'isi' : ''} ${t === G.tgl() ? 'ini' : ''}" title="${G.tglPanjang(t)}"><i></i>${G.HARI[new Date(t + 'T00:00:00').getDay()][0]}</span>`).join('')}</div></div></section>
          <section class="panel"><div class="panel-kepala"><h2>Kuis harian</h2><span class="kecil redup">5 soal per skill</span></div><div class="harian-list">${[...new Set(lines.flatMap(l => l.skill))].slice(0, 6).map(s => `<a href="#harian-${s}">${kode(s)}<span>${esc(KAT.skill[s].pendek)}</span><b class="${skorHarian(s) !== undefined ? 'udah' : ''}">${skorHarian(s) !== undefined ? skorHarian(s) + '%' : 'Kerjain'}</b></a>`).join('')}</div></section>
          <section class="panel"><div class="panel-kepala"><h2>Level ${lv.lv}</h2><span class="kecil redup">${lv.sisa}/${lv.butuh} XP</span></div><div class="bar"><i style="width:${lv.sisa / lv.butuh * 100}%"></i></div></section>
          <section class="panel"><div class="panel-kepala"><h2>Aktivitas</h2><span class="kecil redup">12 minggu</span></div>${heatmap()}</section>
          <section class="panel"><div class="panel-kepala"><h2>Lencana</h2><span class="kecil redup">${Object.keys(d.lencana).length}/${KAT.lencana.length}</span></div><div class="lencana-mini">${KAT.lencana.map(l => `<span class="lc ${d.lencana[l.id] ? 'dapat' : ''}" title="${esc(l.nama)}: ${esc(l.ket)}">${ikon('medali', 18)}</span>`).join('')}</div><a href="#profil" class="kecil">Liat semua</a></section>
        </aside>
      </div></div>`)
    const aktif = lanjut ? lanjut.s : null
    GAS_PETA.gambar(document.getElementById('peta-beranda'), { lines, progres: G.progres, aktif, level: s => levelNama(G.levelSkill(s)), klik: id => go('#skill-' + id) })
  }

  // ---------- jelajah ----------
  let filter = { q: '', kat: 'Semua', jalur: null }
  const jelajah = () => {
    const kats = ['Semua', 'Hard skill', 'Soft skill', 'Persiapan kerja']
    const mine = new Set(G.skillUser())
    kerangka('jelajah', `<div class="jelajah"><header class="kepala-hal"><span class="label-kecil">${ikon('kompas', 14)} ${Object.keys(KAT.skill).length} skill</span><h1>Jelajah skill</h1><p class="redup">Semua skill di sini terbuka. Yang ada di peta kamu ditandai.</p></header>
      <div class="cari">${ikon('cari', 18)}<input type="search" placeholder="Cari skill, misal SQL, interview, akuntansi" value="${esc(filter.q)}" aria-label="Cari skill"></div>
      <div class="chip-baris">${kats.map(k => `<button class="chip ${filter.kat === k ? 'on' : ''}" data-kat="${k}">${k}</button>`).join('')}</div>
      <div class="chip-baris garis">${KAT.jalur.map(j => `<button class="chip jl ${filter.jalur === j.id ? 'on' : ''}" data-j="${j.id}" style="--garis:${j.warna}"><i></i>${j.nama}</button>`).join('')}</div>
      <div class="skill-grid"></div>
      <section class="panel ajak-masukan">${ikon('lampu', 22)}<div><b>Skill atau bidang yang kamu butuhin belum ada?</b><span class="redup kecil">Usulin aja. Yang paling banyak diminta bakal ditambahin duluan.</span></div><button class="btn utama" data-masukan="bidang" data-cari="1">Usulin skill</button></section></div>`)
    const grid = hal().querySelector('.skill-grid')
    const gambar = () => {
      const q = filter.q.toLowerCase().trim()
      const ids = Object.keys(KAT.skill).filter(id => {
        const s = KAT.skill[id]
        if (filter.kat !== 'Semua' && s.kategori !== filter.kat) return false
        if (filter.jalur && !KAT.jalur.find(j => j.id === filter.jalur).skill.includes(id)) return false
        return !q || (s.nama + ' ' + s.ringkas + ' ' + id).toLowerCase().includes(q)
      }).sort((a, b) => (mine.has(b) - mine.has(a)))
      grid.innerHTML = ids.length ? ids.map(id => {
        const s = KAT.skill[id], K = G.kursus(id), pr = G.progres(id), lvAda = new Set(K.pelajaran.map(p => p.level))
        return `<a class="skill-kartu" href="#skill-${id}" style="--garis:${G.warnaSkill(id)}">
          <div class="sk-atas">${kode(id)}${mine.has(id) ? '<span class="tag">Di petamu</span>' : ''}</div>
          <b>${s.nama}</b><p class="redup kecil">${s.ringkas}</p>
          <div class="sk-bawah"><span class="lv-titik" title="Level yang tersedia">${G.LV.map(l => `<i class="${lvAda.has(l) ? 'ada' : ''}" title="${levelNama(l)}"></i>`).join('')}<small>${G.LV.filter(l => lvAda.has(l)).map(levelNama).join(' · ')}</small></span>${pr.n ? `<span class="kecil">${pr.persen}%</span>` : ''}</div>
          ${pr.n ? `<div class="bar tipis"><i style="width:${pr.persen}%"></i></div>` : ''}
        </a>`
      }).join('') : '<p class="redup">Ga ada skill yang cocok. Coba kata lain.</p>'
    }
    hal().querySelector('input').oninput = e => { filter.q = e.target.value; gambar() }
    hal().querySelectorAll('[data-kat]').forEach(b => b.onclick = () => { filter.kat = b.dataset.kat; hal().querySelectorAll('[data-kat]').forEach(x => x.classList.toggle('on', x === b)); gambar() })
    hal().querySelectorAll('[data-j]').forEach(b => b.onclick = () => { filter.jalur = filter.jalur === b.dataset.j ? null : b.dataset.j; hal().querySelectorAll('[data-j]').forEach(x => x.classList.toggle('on', x.dataset.j === filter.jalur)); gambar() })
    gambar()
  }

  // ---------- halaman skill ----------
  const skill = id => {
    const S = KAT.skill[id], K = G.kursus(id)
    if (!S || !K) return go('#jelajah')
    const d = G.D(), lv = d.level[id], pr = G.progres(id), w = G.warnaSkill(id), lanjut = G.berikut(id)
    const jalur = KAT.jalur.filter(j => j.skill.includes(id)).concat(KAT.siapKerja.skill.includes(id) ? [KAT.siapKerja] : [])
    const statusLv = lv && lv.sumber === 'tes'
      ? `<div class="lv-kotak"><span class="label-kecil">Level kamu</span><b>${levelNama(lv.level)}</b><span class="redup kecil">dari tes, ${G.tglPanjang(lv.tgl)}</span><a class="btn tipis kecil" href="#tes-${id}">${ikon('ulang', 14)} Tes ulang</a></div>`
      : `<div class="lv-kotak ajak"><span class="label-kecil">${lv ? 'Perkiraan level' : 'Level kamu'}</span><b>${lv ? levelNama(lv.level) : 'Belum tau'}</b><span class="redup kecil">Tes penempatan: ${Math.min(6, K.tes.length)} soal adaptif, sekitar 2 menit.</span><a class="btn utama kecil" href="#tes-${id}">${ikon('target', 14)} Tes sekarang</a></div>`
    const zona = G.LV.map(l => {
      const ps = K.pelajaran.filter(p => p.level === l)
      const L = KAT.level.find(x => x.id === l)
      if (!ps.length) return `<li class="zona"><div class="zona-kepala"><b>${L.nama}</b><span class="redup kecil">${L.ket}</span></div><ol><li class="st-pel segera"><span class="st-titik"></span><div class="st-kartu"><b>Segera hadir</b><span class="redup kecil">Materi level ${L.nama} lagi disiapin.</span></div></li></ol></li>`
      return `<li class="zona"><div class="zona-kepala"><b>${L.nama}</b><span class="redup kecil">${L.ket}</span></div><ol>${ps.map(p => {
        const s = G.status(id, p), ini = lanjut && lanjut.id === p.id
        const lbl = s === 'selesai' ? `Selesai · akurasi ${d.pelajaran[id + '/' + p.id].akurasi}%` : s === 'lulus' ? 'Lulus tes, boleh dilewati' : `${p.menit} menit · ${p.langkah.length} langkah`
        return `<li class="st-pel ${s} ${ini ? 'ini' : ''}"><span class="st-titik">${s === 'selesai' || s === 'lulus' ? ikon('cek', 14) : ''}</span><a href="#belajar-${id}-${p.id}" class="st-link"><div class="st-kartu"><b>${esc(p.judul)}</b><span class="redup kecil">${lbl}</span></div>${ini ? `<span class="btn utama kecil">${ikon('main', 14)} Mulai</span>` : s === 'selesai' ? `<span class="kecil redup">Ulang</span>` : ''}</a></li>`
      }).join('')}</ol></li>`
    }).join('')
    kerangka('jelajah', `<div class="skill-hal" style="--garis:${w}">
      <a href="#jelajah" class="balik-link">${ikon('kiri', 16)} Jelajah</a>
      <header class="skill-kepala">${kode(id, true)}<div><span class="label-kecil">${S.kategori}</span><h1>${S.nama}</h1><p class="redup">${S.ringkas}</p>
        <div class="chip-baris">${jalur.map(j => `<span class="chip diam jl" style="--garis:${j.warna}"><i></i>${j.nama}</span>`).join('')}</div></div></header>
      <div class="skill-grid2">
        <section><h2 class="judul-bagian">Rute belajar</h2><ol class="rute">${zona}</ol></section>
        <aside class="kolom-samping">
          ${statusLv}
          ${panelHarian(id)}
          <section class="panel"><div class="panel-kepala"><h2>Progres</h2><b>${pr.persen}%</b></div><div class="bar"><i style="width:${pr.persen}%"></i></div><p class="redup kecil">${pr.n} dari ${pr.total} pelajaran</p></section>
          ${id === 'EN' ? `<a class="panel ie-promo" href="#ielts" style="--garis:#3657F5"><span class="label-kecil">Mock test</span><b>Mock IELTS</b><span class="redup kecil">Reading, Listening, Writing, Speaking dengan timer. Dapet estimasi band.</span>${ikon('kanan', 18, 'panah')}</a>` : ''}
          <section class="panel"><h2>Kenapa penting</h2><p class="redup">${S.kenapa}</p></section>
        </aside>
      </div></div>`)
  }

  // ---------- latihan ----------
  const latihanHub = () => {
    const d = G.D(), rekor = Math.max(0, ...d.latihan.sprint.map(x => x.skor))
    const jatuh = Object.keys(window.GAS_DEK).reduce((n, k) => n + window.GAS_DEK[k].kartu.filter(([f]) => { const x = d.kartu[k + ':' + f]; return !x || x.due <= G.tgl() }).length, 0)
    kerangka('latihan', `<div class="latihan-hal"><header class="kepala-hal"><span class="label-kecil">${ikon('target', 14)} Latihan siap kerja</span><h1>Latihan</h1><p class="redup">Buat diulang tiap hari. Pendek, cepet, dan kerasa progresnya.</p></header>
      <div class="lat-grid">
        <a class="lat-kartu" href="#latihan-psikotes" style="--garis:#7B4DE0"><div class="lat-ikon">${ikon('sigma', 28)}</div><b>Sprint psikotes</b><p class="redup kecil">60 detik. Deret angka, persen, pecahan, hitung cepat. Soal baru tiap main.</p><span class="lat-stat">${rekor ? 'Rekor ' + rekor : 'Belum main'}</span></a>
        <a class="lat-kartu" href="#latihan-kartu" style="--garis:#0E9F9A"><div class="lat-ikon">${ikon('kartu', 28)}</div><b>Kartu hafalan</b><p class="redup kecil">Istilah dunia kerja dan English kantor. Diulang pakai sistem kotak Leitner.</p><span class="lat-stat">${jatuh} kartu siap diulang</span></a>
        <a class="lat-kartu" href="#latihan-interview" style="--garis:#F2542D"><div class="lat-ikon">${ikon('obrol', 28)}</div><b>Simulasi interview</b><p class="redup kecil">Pertanyaan acak, timer persiapan dan jawaban, ketik atau ngomong, terus dianalisis.</p><span class="lat-stat">${d.latihan.interview}x latihan</span></a>
        <a class="lat-kartu" href="#ielts" style="--garis:#3657F5"><div class="lat-ikon">${ikon('tiket', 28)}</div><b>Mock IELTS</b><p class="redup kecil">Reading, Listening, Writing, dan Speaking pakai timer kayak ujian asli. Reading dan Listening dinilai otomatis.</p><span class="lat-stat">${(d.ielts || []).length ? (d.ielts || []).length + 'x tes' : 'Belum pernah'}</span></a>
      </div></div>`)
  }
  const latihanMode = m => {
    kerangka('latihan', '<div class="latihan-wadah"></div>')
    const el = hal().querySelector('.latihan-wadah'), o = { tutup: () => go('#latihan') }
    if (m === 'psikotes') GAS_LATIHAN.sprint(el, o)
    else if (m === 'kartu') GAS_LATIHAN.kartu(el, o)
    else if (m === 'interview') GAS_LATIHAN.interview(el, o)
    else go('#latihan')
  }

  // ---------- profil ----------
  const profil = () => {
    const d = G.D(), ob = d.onboarding, info = G.akun.info(), lv = G.levelXP(d.xp)
    const st = KAT.onboarding.status.find(s => s.id === ob.status)
    const tiketLulus = []
    Object.keys(KAT.skill).forEach(id => {
      const K = G.kursus(id); if (!K) return
      G.LV.forEach(l => {
        const ps = K.pelajaran.filter(p => p.level === l)
        if (ps.length && ps.every(p => G.status(id, p) !== 'buka') && ps.some(p => d.pelajaran[id + '/' + p.id])) {
          const tg = ps.map(p => (d.pelajaran[id + '/' + p.id] || {}).tgl).filter(Boolean).sort().pop()
          tiketLulus.push({ id, l, tg })
        }
      })
    })
    const awal = G.nama().split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase()
    kerangka('profil', `<div class="profil">
      <header class="profil-kepala"><div class="avatar" aria-hidden="true">${esc(awal)}</div><div><h1>${esc(G.nama())}</h1><p class="redup">${G.tamu() ? 'Mode tamu' : esc(G.akun.email())} · ${st ? st.label : ''}${ob.lulusTahun ? ' · lulus ' + (ob.lulusBulan ? G.BULAN[ob.lulusBulan - 1] + ' ' : '') + ob.lulusTahun : ''}${ob.rumpun ? ' · ' + esc(ob.rumpun) : ''}</p>
        <div class="chip-baris">${G.jalurUser().map(j => `<span class="chip diam jl" style="--garis:${j.warna}"><i></i>${j.nama}</span>`).join('')}</div></div></header>
      ${G.tamu() ? `<div class="panel ajak-akun">${ikon('gembok', 20)}<div><b>Progres kamu cuma ada di browser ini</b><p class="redup kecil">Bikin akun biar ga ilang kalau ganti mode.</p></div><a href="#daftar" class="btn utama">Bikin akun</a></div>` : ''}
      <div class="statistik besar"><div><small>Total XP</small><b>${G.angka(d.xp)}</b></div><div><small>Level</small><b>${lv.lv}</b></div><div><small>Streak</small><b>${G.streak()}</b></div><div><small>Pelajaran</small><b>${Object.keys(d.pelajaran).length}</b></div><div><small>Tes</small><b>${Object.keys(d.tes).length}</b></div></div>
      <section><h2 class="judul-bagian">Tiket lulus</h2>${tiketLulus.length ? `<div class="tiket-grid">${tiketLulus.map(t => `<div class="tiket lulus" style="--garis:${G.warnaSkill(t.id)}"><div class="tiket-kiri">${kode(t.id, true)}</div><div class="tiket-isi"><span class="label-kecil">Tiket lulus · ${levelNama(t.l)}</span><h3>${KAT.skill[t.id].nama}</h3><p class="redup kecil">${t.tg ? G.tglPanjang(t.tg) : ''}</p></div></div>`).join('')}</div><p class="redup kecil">Tiket muncul tiap kamu beresin satu level. Ini catatan progres pribadi di aplikasi ini, bukan sertifikat resmi, jadi jangan dicantumin di CV sebagai sertifikasi.</p>` : '<p class="redup">Beresin semua pelajaran di satu level buat dapet tiket lulus pertama.</p>'}</section>
      <section><h2 class="judul-bagian">Lencana</h2><div class="lencana-grid">${KAT.lencana.map(l => `<div class="lencana ${d.lencana[l.id] ? 'dapat' : ''}">${ikon('medali', 26)}<b>${l.nama}</b><span class="redup kecil">${d.lencana[l.id] ? 'Didapat ' + G.tglPanjang(d.lencana[l.id]) : l.ket}</span></div>`).join('')}</div></section>
      <section class="panel ajak-masukan">${ikon('obrol', 22)}<div><b>Punya ide atau nemu yang error?</b><span class="redup kecil">Bidang baru, fitur, atau bug. Semua masukan dibaca.</span></div><button class="btn utama" data-masukan="fitur">Kasih masukan</button></section>
      <section class="panel pengaturan"><h2>Pengaturan</h2>
        <div class="atur"><span>Tema</span><div class="seg" role="radiogroup">${[['light', 'Terang'], ['dark', 'Gelap'], ['sistem', 'Ikut sistem']].map(([v, n]) => `<button role="radio" aria-checked="${G.tema() === v}" data-tema="${v}">${n}</button>`).join('')}</div></div>
        <div class="atur"><span>Target harian</span><div class="seg" role="radiogroup">${KAT.onboarding.target.map(t => `<button role="radio" aria-checked="${ob.target === t.id}" data-tgt="${t.id}">${t.label}</button>`).join('')}</div></div>
        <div class="atur"><span>Jalur dan jawaban awal</span><a class="btn garis kecil" href="#mulai">${ikon('pensil', 14)} Ubah</a></div>
        <div class="atur"><span>Reset semua progres</span><button class="btn garis kecil bahaya reset">${ikon('sampah', 14)} Reset</button></div>
        <div class="atur"><span>${G.tamu() ? 'Keluar dari mode tamu' : 'Keluar dari akun'}</span><button class="btn garis kecil keluar">${ikon('keluar', 14)} Keluar</button></div>
      </section></div>`)
    hal().querySelectorAll('[data-tema]').forEach(b => b.onclick = () => { G.tema(b.dataset.tema); render() })
    hal().querySelectorAll('[data-tgt]').forEach(b => b.onclick = () => { ob.target = Number(b.dataset.tgt); G.simpan(); render() })
    hal().querySelector('.reset').onclick = async () => { if (await G.konfirmasi('Hapus semua XP, progres, dan jawaban onboarding di akun ini? Ga bisa dibalikin.', 'Hapus semua', true)) { G.reset(); go('#mulai') } }
    hal().querySelector('.keluar').onclick = async () => { if (!G.tamu() || await G.konfirmasi('Progres tamu tetap tersimpan di browser ini. Keluar?', 'Keluar')) { await G.akun.keluar(); go('#') } }
  }

  // ---------- router ----------
  const render = () => {
    const [r, a, b] = location.hash.replace(/^#\/?/, '').split(/[\/-]/)
    window.scrollTo(0, 0)
    if (window.GAS_IELTS) GAS_IELTS.henti()
    document.querySelectorAll('.dialog-latar').forEach(x => x.remove())
    if (r === 'masuk' || r === 'daftar') { if (G.masuk() && !G.tamu()) return go('#beranda'); return auth(r) }
    if (!G.masuk()) return landing()
    if (!G.D().onboarding && r !== 'mulai') return go('#mulai')
    switch (r) {
      case 'mulai': return onboarding()
      case 'jelajah': return jelajah()
      case 'skill': return skill(a)
      case 'tes': polos('<div id="pm"></div>'); return GAS_PEMUTAR.tes(document.getElementById('pm'), a, { tutup: () => go('#skill-' + a), lanjut: pid => go(`#belajar-${a}-${pid}`) })
      case 'belajar': {
        const K = G.kursus(a); if (!K || !K.pelajaran.find(p => p.id === b)) return go('#beranda')
        polos('<div id="pm"></div>')
        return GAS_PEMUTAR.pelajaran(document.getElementById('pm'), a, b, { tutup: () => go('#skill-' + a), lanjut: pid => go(`#belajar-${a}-${pid}`) })
      }
      case 'harian': {
        const K = G.kursus(a); if (!K) return go('#jelajah')
        const langkah = soalHarian(a); if (!langkah.length) return go('#skill-' + a)
        polos('<div id="pm"></div>')
        return GAS_PEMUTAR.pelajaran(document.getElementById('pm'), a, 'harian', { pel: { id: 'harian', judul: `Kuis harian ${KAT.skill[a].pendek} · ${G.tglPanjang(G.tgl())}`, langkah }, harian: true, tutup: () => go('#skill-' + a), lanjut: () => go('#skill-' + a) })
      }
      case 'latihan': return a ? latihanMode(a) : latihanHub()
      case 'ielts': if (a) { polos('<div class="ie-wadah"></div>'); return GAS_IELTS.buka(hal().querySelector('.ie-wadah'), a, { kembali: () => go('#ielts') }) } kerangka('latihan', '<div class="ielts-wadah"></div>'); return GAS_IELTS.beranda(hal().querySelector('.ielts-wadah'))
      case 'profil': return profil()
      case 'beranda': return beranda()
      default: return beranda()
    }
  }
  addEventListener('hashchange', render)
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (G.tema() === 'sistem' && document.querySelector('.rel')) render() })
  hal().innerHTML = '<div class="muat"><span></span></div>'
  G.siap.then(render, render)
})()
