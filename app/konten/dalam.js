// Alat bantu nyusun materi versi dalam (23 Nov 2026).
// Tiap pelajaran disusun: Konsep (info) → Contoh dikerjain bareng (contoh) → Latihan terbimbing (bimbing) → Uji sendiri → Rangkuman.
// Pilihan ganda ditulis [teks, alasan]. Opsi pertama selalu yang benar (pemutar ngacak urutannya).
window.GAS_DALAM = (() => {
  const K = window.GAS_KURSUS
  const opsiAlasan = opsi => ({ opsi: opsi.map(x => Array.isArray(x) ? x[0] : x), alasan: opsi.map(x => Array.isArray(x) ? x[1] || '' : '') })
  const H = {
    I: (judul, isi) => ({ t: 'info', judul, isi }),
    // langkah: [kode, ket, {jalan, hitung, catatan}]
    C: (judul, soal, langkah, o = {}) => ({ t: 'contoh', judul, soal, langkah: langkah.map(([kode, ket, x]) => ({ kode, ket, ...(x || {}) })), ...o }),
    RK: (judul, poin, ingat) => ({ t: 'rangkum', judul, poin, ingat }),
    P: (tanya, opsi, jelas, o = {}) => ({ t: 'pilih', tanya, ...opsiAlasan(opsi), benar: 0, jelas, ...o }),
    // opsi: [teks, benar?, alasan]
    B: (tanya, opsi, jelas, o = {}) => ({ t: 'banyak', tanya, opsi: opsi.map(x => x[0]), benar: opsi.map((x, i) => x[1] ? i : -1).filter(i => i >= 0), alasan: opsi.map(x => x[2] || ''), jelas, ...o }),
    A: (tanya, benar, jelas, o = {}) => ({ t: 'angka', tanya, benar, jelas, ...o }),
    Q: (tanya, kunci, petunjuk, o = {}) => ({ t: 'sql', tanya, kunci, petunjuk, ...o }),
    QB: (tanya, kerangka, kunci, petunjuk, o = {}) => ({ t: 'sql', tanya, kerangka, kunci, petunjuk, bimbing: true, ...o }),
    X: (tanya, data, sel, label, kunci, petunjuk, o = {}) => ({ t: 'excel', tanya, data, sel, label, kunci, petunjuk, ...o }),
    XB: (tanya, data, sel, label, kerangka, kunci, petunjuk, o = {}) => ({ t: 'excel', tanya, data, sel, label, kerangka, kunci, petunjuk, bimbing: true, ...o }),
    IS: (tanya, benar, jelas, o = {}) => ({ t: 'isian', tanya, benar: [].concat(benar), jelas, ...o }),
    U: (tanya, item, jelas, o = {}) => ({ t: 'urut', tanya, item, jelas, ...o }),
    PS: (tanya, pasangan, jelas, o = {}) => ({ t: 'pasang', tanya, pasangan, jelas, ...o }),
    SK: (tanya, opsi, o = {}) => ({ t: 'skenario', tanya, opsi: opsi.map(([teks, skor, ket]) => ({ teks, skor, ket })), ...o }),
    W: (tanya, minKata, rubrik, ai, o = {}) => ({ t: 'tulis', tanya, minKata, rubrik, ai, ...o }),
    L: (id, level, judul, menit, langkah) => ({ id, level, judul, menit, langkah }),
    T: (level, tanya, opsi, jelas) => ({ level, tanya, opsi, benar: 0, jelas }),
    // Tandai langkah jadi latihan terbimbing
    bimbing: s => ({ ...s, bimbing: true }),
  }
  // Soal pertama setelah contoh jadi latihan terbimbing (ada tombol liat lagi contohnya), kalau belum ada yang ditandai.
  const NILAI = ['pilih', 'banyak', 'isian', 'angka', 'urut', 'slider', 'pasang', 'sql', 'excel']
  const tandaiBimbing = p => {
    if (p.langkah.some(s => s.bimbing)) return p
    const c = p.langkah.findIndex(s => s.t === 'contoh'); if (c < 0) return p
    const i = p.langkah.findIndex((s, j) => j > c && NILAI.includes(s.t)); if (i < 0) return p
    p.langkah[i] = { ...p.langkah[i], bimbing: true }
    return p
  }
  const LVU = ['dasar', 'menengah', 'mahir']
  const urutLevel = arr => arr.map((p, i) => [p, i]).sort((a, b) => LVU.indexOf(a[0].level) - LVU.indexOf(b[0].level) || a[1] - b[1]).map(x => x[0])
  // Ganti seluruh isi kursus (id lama dipertahankan biar progres ga ilang).
  const susun = (kode, pelajaran, tes) => {
    if (!K[kode]) return
    pelajaran.forEach(p => { if (p.id.includes('-')) throw new Error('id pelajaran ga boleh pakai "-": ' + p.id); tandaiBimbing(p) })
    const ada = new Map(K[kode].pelajaran.map(p => [p.id, p]))
    const baru = new Set(pelajaran.map(p => p.id))
    // pelajaran lama yang ga disebut tetap dipertahankan di belakang
    K[kode].pelajaran = urutLevel([...pelajaran, ...[...ada.values()].filter(p => !baru.has(p.id))])
    if (tes) K[kode].tes = tes
  }
  // Perdalam pelajaran yang udah ada: sisip langkah setelah info pertama, tambah di akhir, kasih alasan ke soal lama.
  const perdalam = (kode, id, o) => {
    const p = K[kode] && K[kode].pelajaran.find(x => x.id === id); if (!p) return
    let L = p.langkah.slice()
    if (o.perkaya) Object.entries(o.perkaya).forEach(([i, ext]) => { L[i] = { ...L[i], ...ext } })
    if (o.ganti) Object.entries(o.ganti).forEach(([i, s]) => { L[i] = s })
    if (o.hapus) L = L.filter((_, i) => !o.hapus.includes(i))
    if (o.awal) L = [...o.awal, ...L]
    if (o.sisip) { const i = L.findIndex(s => s.t === 'info' || s.t === 'kartu'); L.splice(i + 1, 0, ...o.sisip) }
    if (o.akhir) L = [...L, ...o.akhir]
    p.langkah = L
    tandaiBimbing(p)
    if (o.menit) p.menit = o.menit
    if (o.judul) p.judul = o.judul
  }
  const tambahPel = (kode, pelajaran) => { if (!K[kode]) return; const ada = new Set(K[kode].pelajaran.map(p => p.id)); pelajaran.forEach(p => { if (!ada.has(p.id)) K[kode].pelajaran.push(tandaiBimbing(p)) }); K[kode].pelajaran = urutLevel(K[kode].pelajaran) }
  const tesJelas = (kode, peta) => { if (!K[kode]) return; K[kode].tes.forEach(t => { const j = peta[t.tanya]; if (j) t.jelas = j }) }
  return { H, susun, perdalam, tambahPel, tesJelas, urutLevel }
})()
