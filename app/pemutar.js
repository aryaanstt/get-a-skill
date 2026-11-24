// Pemutar pelajaran (satu langkah per layar) dan tes penempatan adaptif.
// Alur tiap pelajaran kayak satu jalur MRT: Konsep → Contoh bareng → Latihan terbimbing → Uji sendiri → Rangkuman.
// Tiap soal yang udah dicek (benar atau salah) dapet pembahasan lengkap di bawah soalnya.
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
  const jalankan = (db, q) => {
    const r = db.exec(q); if (r.length) return r[r.length - 1]
    // hasil kosong: ambil nama kolomnya biar diagnosa tetap akurat
    try { const st = db.prepare(String(q).trim().replace(/;\s*$/, '')); const columns = st.getColumnNames(); st.free(); return { columns, values: [] } } catch (e) { return { columns: [], values: [] } }
  }
  const normNilai = x => typeof x === 'number' ? (Number.isInteger(x) ? String(x) : x.toFixed(4)) : String(x)
  const barisTeks = r => r.values.map(v => v.map(normNilai).join('\u0001'))
  const samaHasil = (a, b, urut) => {
    if (a.columns.length !== b.columns.length || a.values.length !== b.values.length) return false
    const ra = barisTeks(a), rb = barisTeks(b)
    if (!urut) { ra.sort(); rb.sort() }
    return ra.every((x, i) => x === rb[i])
  }
  const tabelHTML = (r, maks = 50) => {
    if (!r.values.length) return `<p class="redup kecil">Query jalan, tapi <b>0 baris</b> yang lolos${r.columns.length ? `. Kolom: ${r.columns.map(c => '<code>' + esc(c) + '</code>').join(', ')}` : ''}.</p>`
    return `<div class="tabel-geser"><table class="hasil"><thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${r.values.slice(0, maks).map(v => `<tr>${v.map(x => `<td>${x === null ? '<i class="redup">NULL</i>' : esc(typeof x === 'number' && !Number.isInteger(x) ? Math.round(x * 100) / 100 : x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="redup kecil">${r.values.length} baris${r.values.length > maks ? ` (${maks} pertama)` : ''}</p>`
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
  const DINILAI = ['pilih', 'banyak', 'isian', 'angka', 'urut', 'slider', 'pasang', 'skenario', 'sql', 'excel', 'py']
  const kata = s => (String(s).trim().match(/\S+/g) || []).length
  let autoFokus = true
  const fokus = fn => { if (autoFokus) setTimeout(fn, 60) }
  const kd = x => `<code>${esc(x)}</code>`

  // ---------- kotak pembahasan (dipakai semua jenis soal) ----------
  // o: { diagnosa:[], jawab, kenapa, urai:[[kode, ket]], opsi:html, ekstra:html, umum:[] }
  const bahasHTML = o => {
    const blok = []
    if (o.diagnosa && o.diagnosa.length) blok.push(`<div class="bahas-blok diagnosa"><span class="label-kecil">${ikon('cari', 13)} Kenapa jawabanmu belum pas</span><ul>${o.diagnosa.map(d => `<li>${d}</li>`).join('')}</ul></div>`)
    if (o.jawab) blok.push(`<div class="bahas-blok jawab"><span class="label-kecil">${ikon('cek', 13)} Jawaban lengkap</span>${o.jawab}</div>`)
    if (o.kenapa) blok.push(`<div class="bahas-blok"><span class="label-kecil">${ikon('lampu', 13)} Penjelasan</span><div class="bahas-teks">${o.kenapa}</div></div>`)
    if (o.urai && o.urai.length) blok.push(`<div class="bahas-blok"><span class="label-kecil">Dibedah per bagian</span><ol class="bahas-urai">${o.urai.map(([k, t]) => `<li>${k ? `<code>${esc(k)}</code>` : ''}<span>${t}</span></li>`).join('')}</ol></div>`)
    if (o.opsi) blok.push(`<div class="bahas-blok"><span class="label-kecil">Cek tiap pilihan</span>${o.opsi}</div>`)
    if (o.ekstra) blok.push(o.ekstra)
    if (o.umum && o.umum.length) blok.push(`<div class="bahas-blok umum"><span class="label-kecil">${ikon('x', 13)} Kesalahan yang sering kejadian</span><ul>${o.umum.map(d => `<li>${d}</li>`).join('')}</ul></div>`)
    return blok.join('')
  }
  const urai = s => (s.urai || []).map(x => Array.isArray(x) ? x : ['', x])

  // ---------- SQL: bedah query per klausa ----------
  const KW = ['WITH', 'SELECT DISTINCT', 'SELECT', 'FROM', 'LEFT JOIN', 'INNER JOIN', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT']
  const rapihSpasi = q => String(q).trim().replace(/;\s*$/, '').split("'").map((s, i) => i % 2 ? s : s.replace(/\s+/g, ' ')).join("'")
  const pecahKlausa = q => {
    const s = rapihSpasi(q), up = s.toUpperCase(), out = []
    let d = 0, kutip = false, cur = null, buf = ''
    for (let i = 0; i < s.length;) {
      const c = s[i]
      if (c === "'") { kutip = !kutip; buf += c; i++; continue }
      if (!kutip) {
        if (c === '(') d++
        else if (c === ')') d--
        else if (d === 0 && (i === 0 || /[\s)]/.test(s[i - 1]))) {
          const kw = KW.find(k => up.startsWith(k, i) && !/[A-Z0-9_]/.test(up[i + k.length] || ' '))
          if (kw) { if (cur || buf.trim()) out.push({ kw: cur || '', isi: buf.trim() }); cur = kw; buf = ''; i += kw.length; continue }
        }
      }
      buf += c; i++
    }
    if (cur || buf.trim()) out.push({ kw: cur || '', isi: buf.trim() })
    return out
  }
  const pisahAtas = (s, pemisah) => { // pisah di level kurung 0
    const out = []; let d = 0, kutip = false, buf = ''
    for (let i = 0; i < s.length; i++) {
      const c = s[i]
      if (c === "'") kutip = !kutip
      if (!kutip) { if (c === '(') d++; else if (c === ')') d-- }
      if (!kutip && d === 0) { const m = pemisah.exec(s.slice(i)); if (m && m.index === 0) { out.push(buf); out.push(m[1] || m[0]); buf = ''; i += m[0].length - 1; continue } }
      buf += c
    }
    out.push(buf); return out
  }
  const OPS = { '=': 'sama dengan', '<>': 'bukan', '!=': 'bukan', '>': 'lebih dari', '<': 'kurang dari', '>=': 'minimal (≥)', '<=': 'maksimal (≤)' }
  const atomSyarat = a => {
    a = a.trim(); let m
    const sub = x => /^\(\s*SELECT/i.test(x) ? `hasil subquery ${kd(x)} (dihitung duluan)` : kd(x)
    if ((m = /^NOT\s+EXISTS\s*(\(.+\))$/i.exec(a))) return `ga ada baris yang cocok di ${kd(m[1])}`
    if ((m = /^EXISTS\s*(\(.+\))$/i.exec(a))) return `ada baris yang cocok di ${kd(m[1])}`
    if ((m = /^(.+?)\s+NOT\s+IN\s*(\(.+\))$/i.exec(a))) return `${kd(m[1])} <b>ga termasuk</b> ${/^\(\s*SELECT/i.test(m[2]) ? 'hasil subquery ' + kd(m[2]) : 'daftar ' + kd(m[2])}`
    if ((m = /^(.+?)\s+IN\s*(\(.+\))$/i.exec(a))) return `${kd(m[1])} salah satu dari ${/^\(\s*SELECT/i.test(m[2]) ? 'hasil subquery ' + kd(m[2]) : kd(m[2])}`
    if ((m = /^(.+?)\s+IS\s+NOT\s+NULL$/i.exec(a))) return `${kd(m[1])} ada isinya (bukan NULL)`
    if ((m = /^(.+?)\s+IS\s+NULL$/i.exec(a))) return `${kd(m[1])} kosong (NULL)`
    if ((m = /^(.+?)\s+(NOT\s+)?LIKE\s+'(.*)'$/i.exec(a))) {
      const p = m[3], inti = p.replace(/^%|%$/g, '')
      const arti = p.startsWith('%') && p.endsWith('%') ? `mengandung "${inti}"` : p.endsWith('%') ? `diawali "${inti}"` : p.startsWith('%') ? `diakhiri "${inti}"` : `cocok pola "${p}"`
      return `${kd(m[1])} ${m[2] ? '<b>ga</b> ' : ''}${arti}`
    }
    if ((m = /^(.+?)\s+BETWEEN\s+(.+?)\s+AND\s+(.+)$/i.exec(a))) return `${kd(m[1])} di antara ${kd(m[2])} dan ${kd(m[3])} (dua ujungnya ikut)`
    if ((m = /^(.+?)\s*(>=|<=|<>|!=|=|>|<)\s*(.+)$/.exec(a))) return `${kd(m[1])} ${OPS[m[2]]} ${sub(m[3])}`
    return kd(a)
  }
  const syaratTeks = s => {
    const parts = pisahAtas(s, /^\s+(AND|OR)\s+/i), atom = [], sambung = []
    for (let i = 0; i < parts.length; i += 2) {
      let p = parts[i]
      while (/\bBETWEEN\b/i.test(p) && !/\bBETWEEN\b.+\bAND\b/i.test(p) && parts[i + 1] && /AND/i.test(parts[i + 1])) { p += ' AND ' + parts[i + 2]; i += 2 }
      atom.push(p); if (parts[i + 1]) sambung.push(/OR/i.test(parts[i + 1]) ? '<b>atau</b>' : '<b>dan</b>')
    }
    return atom.map((a, i) => atomSyarat(a.replace(/^\((.+)\)$/, (m, x) => /select/i.test(x) ? m : x)) + (sambung[i] ? ` ${sambung[i]} ` : '')).join('')
  }
  const kolomTeks = c => {
    let expr = c.trim(), alias = '', m
    if ((m = /^(.*\S)\s+AS\s+("?[\w]+"?)$/i.exec(expr))) { expr = m[1]; alias = m[2] }
    let t
    if (expr === '*') t = 'semua kolom'
    else if (/^\w+\.\*$/.test(expr)) t = 'semua kolom dari tabel itu'
    else if (/OVER\s*\(/i.test(expr)) t = 'window function: dihitung per baris tanpa ngeringkas baris'
    else if (/^COUNT\(\s*\*\s*\)$/i.test(expr)) t = 'hitung jumlah baris'
    else if ((m = /^COUNT\(\s*DISTINCT\s+(.+)\)$/i.exec(expr))) t = `hitung ada berapa ${kd(m[1])} yang beda-beda`
    else if ((m = /^ROUND\((.+),\s*(\d+)\)$/i.exec(expr))) t = `bulatin ${kd(m[1])} jadi ${m[2]} angka di belakang koma`
    else if ((m = /^(SUM|AVG|MIN|MAX|COUNT)\((.+)\)$/i.exec(expr))) t = { SUM: 'jumlahin', AVG: 'rata-rata dari', MIN: 'nilai paling kecil dari', MAX: 'nilai paling besar dari', COUNT: 'hitung baris yang ada isinya di' }[m[1].toUpperCase()] + ' ' + kd(m[2])
    else if (/^CASE\b/i.test(expr)) t = 'kolom baru hasil aturan CASE WHEN (dicek dari atas, yang pertama cocok dipakai)'
    else if (/^(substr|strftime|date)\(/i.test(expr)) t = 'potong sebagian teks/tanggal'
    else if (/[*/+-]/.test(expr)) t = 'hasil hitungan per baris'
    else t = 'ditampilin apa adanya'
    return `${kd(expr)}${alias ? ` → dinamain ${kd(alias)}` : ''}: ${t}`
  }
  const ARTI = {
    WITH: x => { const m = /^(\w+)\s+AS\s*\(/i.exec(x); return `Bikin tabel sementara (CTE) ${m ? kd(m[1]) : ''} dulu. Isinya query di dalam kurung. Query di bawahnya boleh pakai ${m ? kd(m[1]) : 'nama itu'} kayak tabel biasa.` },
    SELECT: x => { const k = pisahAtas(x, /^,/).filter((_, i) => i % 2 === 0); return `Kolom yang ditampilin di hasil:<ul>${k.map(c => `<li>${kolomTeks(c)}</li>`).join('')}</ul>` },
    'SELECT DISTINCT': x => ARTI.SELECT(x) + 'DISTINCT: baris yang isinya persis sama cuma ditampilin sekali.',
    FROM: x => { const m = /^(\w+)(?:\s+(?:AS\s+)?(\w+))?$/i.exec(x); return /^\(/.test(x) ? 'Ambil data dari hasil query di dalam kurung (subquery), bukan dari tabel langsung.' : m ? `Ambil data dari tabel ${kd(m[1])}${m[2] ? `, dipanggil ${kd(m[2])} biar singkat` : ''}.` : `Ambil data dari ${kd(x)}.` },
    JOIN: x => { const m = /^(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+(.+)$/i.exec(x); return m ? `Sambungin ke tabel ${kd(m[1])}${m[2] ? ` (${kd(m[2])})` : ''}. Baris dipasangin kalau ${syaratTeks(m[3])}. Baris yang ga punya pasangan dibuang.` : `Sambungin ke ${kd(x)}.` },
    'INNER JOIN': x => ARTI.JOIN(x),
    'LEFT JOIN': x => { const m = /^(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+(.+)$/i.exec(x); return m ? `Sambungin ke tabel ${kd(m[1])}${m[2] ? ` (${kd(m[2])})` : ''}, pasangannya kalau ${syaratTeks(m[3])}. Beda sama JOIN biasa: <b>semua baris tabel kiri tetap ikut</b>, yang ga punya pasangan kolom kanannya jadi NULL.` : `LEFT JOIN ke ${kd(x)}.` },
    WHERE: x => `Saring <b>baris</b> sebelum dikelompokin atau dihitung. Cuma baris yang ${syaratTeks(x)} yang lolos.`,
    'GROUP BY': x => `Kelompokin baris yang ${kd(x)}-nya sama jadi satu baris. Fungsi kayak COUNT, SUM, AVG di SELECT dihitung <b>per kelompok</b>.`,
    HAVING: x => `Saring <b>kelompok</b> setelah dihitung (WHERE ga bisa, karena hitungannya belum ada pas WHERE jalan). Cuma kelompok yang ${syaratTeks(x)} yang tampil.`,
    'ORDER BY': x => `Urutin hasil: ${pisahAtas(x, /^,/).filter((_, i) => i % 2 === 0).map(o => { const m = /^(.+?)\s+(ASC|DESC)$/i.exec(o.trim()); return m ? `${kd(m[1])} ${m[2].toUpperCase() === 'DESC' ? 'dari besar ke kecil (DESC)' : 'dari kecil ke besar (ASC)'}` : `${kd(o.trim())} dari kecil ke besar (default ASC)` }).join(', terus ')}.`,
    LIMIT: x => `Ambil <b>${esc(x)} baris teratas</b> aja dari hasil yang udah diurutin.`,
  }
  const URUT_JALAN = ['WITH', 'FROM', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT']
  const klausaKey = kw => /JOIN/.test(kw) ? 'JOIN' : /SELECT/.test(kw) ? 'SELECT' : kw
  const formatSQL = q => pecahKlausa(q).map(k => (k.kw ? k.kw + ' ' : '') + k.isi).join('\n')
  const bedahSQL = q => pecahKlausa(q).map(k => [(k.kw ? k.kw + ' ' : '') + k.isi, (ARTI[k.kw] || (() => ''))(k.isi)])
  const fiturSQL = q => {
    const ks = new Set(pecahKlausa(q).map(k => klausaKey(k.kw)).filter(Boolean)), s = rapihSpasi(q).toUpperCase()
    if (/LEFT JOIN/.test(s)) ks.add('LEFT JOIN')
    if (/\(\s*SELECT/.test(s)) ks.add('subquery')
    if (/\bCASE\b/.test(s)) ks.add('CASE WHEN')
    if (/\bDISTINCT\b/.test(s)) ks.add('DISTINCT')
    if (/\bOVER\s*\(/.test(s)) ks.add('window function')
    return ks
  }
  const GALAT_SQL = [
    [/no such column: (\S+)/i, m => `Kolom ${kd(m[1])} ga ada. Ketuk nama tabel di atas buat liat kolom yang tersedia. Kalau pakai alias, pastiin aliasnya udah dibikin di FROM/JOIN.`],
    [/no such table: (\S+)/i, m => `Tabel ${kd(m[1])} ga ada. Tabel di database ini: ${kd('pelanggan')}, ${kd('produk')}, ${kd('pesanan')}, ${kd('item')}.`],
    [/ambiguous column name: (\S+)/i, m => `Kolom ${kd(m[1])} ada di lebih dari satu tabel. Tulis lengkap pakai nama tabel atau alias, misalnya ${kd('p.' + m[1].split('.').pop())}.`],
    [/misuse of aggregate/i, () => `Fungsi agregat (COUNT, SUM, AVG) ga boleh di WHERE. Kalau mau nyaring hasil hitungan, pakai HAVING setelah GROUP BY.`],
    [/near "([^"]+)": syntax error/i, m => `Ada yang salah ketik di dekat ${kd(m[1])}. Cek koma antar kolom, tanda kutip, kurung, dan urutan klausa (SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT).`],
    [/incomplete input/i, () => 'Query-nya kepotong. Ada kurung atau kutip yang belum ditutup?'],
  ]
  const terjemahGalat = msg => { for (const [re, f] of GALAT_SQL) { const m = re.exec(msg); if (m) return f(m) } return 'Cek lagi ejaan nama tabel, kolom, dan tanda baca.' }
  const diagnosaSQL = (qUser, rUser, qKunci, rKunci, urut) => {
    const d = []
    if (rUser.columns.length !== rKunci.columns.length) d.push(`Jumlah kolommu <b>${rUser.columns.length}</b> (${rUser.columns.map(kd).join(', ') || '–'}), yang diminta <b>${rKunci.columns.length}</b> (${rKunci.columns.map(kd).join(', ')}). Cek bagian SELECT.`)
    const nU = rUser.values.length, nK = rKunci.values.length
    if (nU > nK) d.push(`Barismu <b>${nU}</b>, harusnya <b>${nK}</b>. Kebanyakan baris biasanya karena syarat saringnya (WHERE/HAVING) belum ada atau kurang ketat${/LIMIT/i.test(qKunci) && !/LIMIT/i.test(qUser) ? ', atau LIMIT-nya belum dipasang' : ''}.`)
    else if (nU < nK) d.push(`Barismu <b>${nU}</b>, harusnya <b>${nK}</b>. Kekurangan baris biasanya karena saringannya terlalu ketat, nilai teksnya beda huruf besar kecil, atau JOIN biasa ngebuang baris yang ga punya pasangan.`)
    if (rUser.columns.length === rKunci.columns.length && nU === nK) {
      const a = barisTeks(rUser), b = barisTeks(rKunci)
      if (a.slice().sort().every((x, i) => x === b.slice().sort()[i])) { if (urut) d.push('Isi barisnya udah bener semua, tinggal <b>urutannya</b>. Cek ORDER BY: kolomnya apa, dan ASC (kecil ke besar) atau DESC (besar ke kecil).') }
      else d.push('Jumlah baris dan kolomnya udah pas, tapi isinya beda. Cek syarat di WHERE, kolom yang dihitung, atau fungsi agregatnya (SUM vs COUNT vs AVG).')
    }
    const fu = fiturSQL(qUser), fk = fiturSQL(qKunci)
    const kurang = [...fk].filter(x => !fu.has(x) && x !== 'SELECT' && x !== 'FROM'), lebih = [...fu].filter(x => !fk.has(x) && ['GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'WHERE', 'DISTINCT', 'LEFT JOIN'].includes(x))
    if (kurang.length) d.push(`Jawaban yang bener pakai ${kurang.map(x => `<b>${x}</b>`).join(', ')}, query kamu belum.`)
    if (lebih.length) d.push(`Query kamu pakai ${lebih.map(x => `<b>${x}</b>`).join(', ')}, padahal soal ini ga butuh itu.`)
    const litU = (qUser.match(/'[^']*'/g) || []), litK = (qKunci.match(/'[^']*'/g) || [])
    litU.forEach(l => { const k = litK.find(x => x.toLowerCase() === l.toLowerCase() && x !== l); if (k) d.push(`Di SQLite, isi teks dalam kutip itu peka huruf besar kecil: ${kd(l)} ≠ ${kd(k)}.`) })
    return d
  }
  const bahasSQL = (s, db, info) => {
    const kunci = s.kunci, rK = jalankan(db, kunci), ks = pecahKlausa(kunci)
    const jalanUrut = URUT_JALAN.filter(k => ks.some(x => klausaKey(x.kw) === k))
    return bahasHTML({
      diagnosa: info.diagnosa,
      jawab: `<pre class="kode-bahas">${esc(formatSQL(kunci))}</pre>${info.isiKunci ? '<button class="btn kecil garis pakai-kunci">' + ikon('salin', 14) + ' Masukin ke editor (tanpa XP)</button>' : ''}`,
      kenapa: s.jelas || '',
      urai: s.urai ? urai(s) : bedahSQL(kunci),
      ekstra: `<div class="bahas-blok"><span class="label-kecil">Urutan mesin ngerjain query ini</span><div class="urut-jalan">${jalanUrut.map(k => `<span>${k}</span>`).join(ikon('kanan', 12))}</div><p class="redup kecil">Ditulis mulai SELECT, tapi dikerjain mulai FROM. Makanya alias dari SELECT belum bisa dipakai di WHERE.</p></div><div class="bahas-blok"><span class="label-kecil">Hasil yang bener</span>${tabelHTML(rK, 6)}</div>`,
      umum: s.umum,
    })
  }

  // ---------- Excel: bedah rumus per argumen ----------
  const SIG = {
    SUM: ['angka/rentang yang dijumlah'], AVERAGE: ['rentang yang dirata-rata'], MIN: ['rentang'], MAX: ['rentang'], MEDIAN: ['rentang'], COUNT: ['rentang (cuma sel angka yang dihitung)'], COUNTA: ['rentang (sel yang ada isinya)'], COUNTBLANK: ['rentang (sel kosong)'],
    IF: ['syarat yang dicek', 'hasil kalau syarat BENAR', 'hasil kalau syarat SALAH'], AND: ['syarat (semua harus benar)'], OR: ['syarat (cukup salah satu benar)'], NOT: ['syarat yang dibalik'],
    COUNTIF: ['rentang yang dicek', 'syaratnya'], SUMIF: ['rentang yang dicek syaratnya', 'syaratnya', 'rentang yang dijumlah'], AVERAGEIF: ['rentang yang dicek', 'syaratnya', 'rentang yang dirata-rata'],
    XLOOKUP: ['nilai yang dicari', 'kolom tempat nyari', 'kolom hasil yang diambil', 'hasil kalau ga ketemu'], VLOOKUP: ['nilai yang dicari (dicari di kolom pertama tabel)', 'tabel, kolom pertamanya kolom cari', 'nomor kolom hasil, dihitung dari kiri tabel', 'FALSE = cari yang persis sama'],
    INDEX: ['rentang hasil', 'nomor baris di rentang itu', 'nomor kolom'], MATCH: ['nilai yang dicari', 'rentang tempat nyari', '0 = persis sama'], IFERROR: ['rumus yang mungkin error', 'cadangan kalau error'],
    LEFT: ['teks', 'jumlah karakter dari kiri'], RIGHT: ['teks', 'jumlah karakter dari kanan'], MID: ['teks', 'mulai dari karakter ke-', 'jumlah karakter'], LEN: ['teks'], TRIM: ['teks'], PROPER: ['teks'], UPPER: ['teks'], LOWER: ['teks'],
    ROUND: ['angka', 'jumlah angka di belakang koma'], ROUNDUP: ['angka', 'jumlah desimal'], ROUNDDOWN: ['angka', 'jumlah desimal'], ABS: ['angka'], LARGE: ['rentang', 'peringkat ke-k terbesar'], SMALL: ['rentang', 'peringkat ke-k terkecil'],
    SUBSTITUTE: ['teks', 'yang diganti', 'penggantinya'], SEARCH: ['yang dicari', 'teks'], FIND: ['yang dicari', 'teks'], VALUE: ['teks angka'], INT: ['angka'], MOD: ['angka', 'pembagi'],
  }
  const FDESK = {
    SUM: 'jumlahin angka', AVERAGE: 'rata-rata', MIN: 'nilai terkecil', MAX: 'nilai terbesar', MEDIAN: 'nilai tengah', COUNT: 'hitung sel berisi angka', COUNTA: 'hitung sel yang ada isinya', COUNTBLANK: 'hitung sel kosong',
    IF: 'milih hasil berdasarkan syarat', AND: 'BENAR kalau semua syarat benar', OR: 'BENAR kalau minimal satu syarat benar', NOT: 'balik BENAR jadi SALAH', IFS: 'cek syarat satu-satu dari kiri, ambil hasil dari syarat pertama yang benar',
    COUNTIF: 'hitung sel yang lolos satu syarat', COUNTIFS: 'hitung baris yang lolos semua syarat', SUMIF: 'jumlahin yang lolos satu syarat', SUMIFS: 'jumlahin yang lolos semua syarat', AVERAGEIF: 'rata-rata yang lolos satu syarat', AVERAGEIFS: 'rata-rata yang lolos semua syarat', MAXIFS: 'nilai terbesar yang lolos syarat', MINIFS: 'nilai terkecil yang lolos syarat',
    XLOOKUP: 'cari nilai, ambil pasangannya dari kolom lain', VLOOKUP: 'cari di kolom pertama tabel, ambil dari kolom ke-n', INDEX: 'ambil isi rentang di posisi tertentu', MATCH: 'cari posisi (urutan ke berapa) sebuah nilai', IFERROR: 'ganti error jadi nilai cadangan',
    LEFT: 'ambil karakter dari kiri', RIGHT: 'ambil karakter dari kanan', MID: 'ambil karakter dari tengah', LEN: 'hitung jumlah karakter', TRIM: 'buang spasi berlebih', PROPER: 'huruf awal tiap kata jadi kapital', UPPER: 'semua huruf kapital', LOWER: 'semua huruf kecil', CONCAT: 'sambung teks',
    ROUND: 'bulatin angka', ROUNDUP: 'bulatin ke atas', ROUNDDOWN: 'bulatin ke bawah', ABS: 'nilai mutlak', LARGE: 'nilai terbesar ke-k', SMALL: 'nilai terkecil ke-k', SUMPRODUCT: 'kaliin per baris lalu jumlahin semua', SUBSTITUTE: 'ganti teks', SEARCH: 'cari posisi teks', FIND: 'cari posisi teks (peka huruf besar)', VALUE: 'ubah teks jadi angka', INT: 'buang desimal', MOD: 'sisa bagi',
  }
  const namaArg = (fn, i, n) => {
    if (['SUMIFS', 'AVERAGEIFS', 'MAXIFS', 'MINIFS'].includes(fn)) return i === 0 ? { SUMIFS: 'rentang yang dijumlah', AVERAGEIFS: 'rentang yang dirata-rata', MAXIFS: 'rentang yang dicari maksimumnya', MINIFS: 'rentang yang dicari minimumnya' }[fn] : (i % 2 ? `rentang syarat ${(i + 1) / 2}` : `syarat ${i / 2}`)
    if (fn === 'COUNTIFS') return i % 2 ? `syarat ${(i + 1) / 2}` : `rentang syarat ${i / 2 + 1}`
    if (fn === 'IFS') return i % 2 ? `hasil kalau syarat ${(i + 1) / 2} benar` : `syarat ${i / 2 + 1}`
    if (['AND', 'OR', 'CONCAT', 'SUMPRODUCT'].includes(fn)) return fn === 'CONCAT' ? `bagian ${i + 1}` : fn === 'SUMPRODUCT' ? `rentang ${i + 1}` : `syarat ${i + 1}`
    const s = SIG[fn]; return s ? (s[i] || s[s.length - 1]) : `argumen ${i + 1}`
  }
  const nilaiPendek = (node, data) => {
    try {
      const v = X.nilaiNode(node, data)
      if (Array.isArray(v)) { const f = v.flat(); return `${f.length} sel (${f.slice(0, 4).map(x => esc(X.tampil(x))).join(', ')}${f.length > 4 ? ', …' : ''})` }
      return `<b>${esc(X.tampil(v))}</b>`
    } catch (e) { return `<span class="galat-teks">${esc(e.message)}</span>` }
  }
  const bedahNode = (node, data, dalam = 0) => {
    if (node.t === 'fn') {
      const desk = FDESK[node.v] || ''
      return `<b>${node.v}</b>${desk ? `: ${desk}` : ''}<ul>${node.args.map((a, i) => `<li><code>${esc(X.teks(a))}</code> <span class="redup">${namaArg(node.v, i, node.args.length)}</span>${a.t !== 'lit' ? ` → ${nilaiPendek(a, data)}` : ''}${a.t === 'fn' && dalam < 2 ? `<div class="bedah-dalam">${bedahNode(a, data, dalam + 1)}</div>` : ''}</li>`).join('')}</ul>`
    }
    if (node.t === 'bin') return `${kd(X.teks(node.a))} <b>${{ '*': '×', '/': '÷', '&': 'disambung', '^': 'pangkat' }[node.op] || node.op}</b> ${kd(X.teks(node.b))} → ${nilaiPendek(node.a, data)} ${{ '*': '×', '/': '÷', '&': '&', '^': '^' }[node.op] || node.op} ${nilaiPendek(node.b, data)}`
    return kd(X.teks(node))
  }
  const fnDi = n => n ? (n.t === 'fn' ? [n.v, ...n.args.flatMap(fnDi)] : n.t === 'bin' ? [...fnDi(n.a), ...fnDi(n.b)] : n.t === 'neg' ? fnDi(n.a) : []) : []
  const rentangDi = s => (String(s).replace(/"[^"]*"/g, '').toUpperCase().replace(/\$/g, '').match(/[A-Z]{1,3}\d+(:[A-Z]{1,3}\d+)?/g) || [])
  const bahasExcel = (s, data, info) => {
    let pohon = null; try { pohon = X.pohon(s.kunci) } catch (e) { /* kunci selalu valid */ }
    const d = info.diagnosa ? [...info.diagnosa] : []
    if (info.mine && !info.ok) {
      let pu = null; try { pu = X.pohon(info.mine) } catch (e) { /* rumus user error */ }
      const fk = new Set(fnDi(pohon)), fu = new Set(fnDi(pu))
      const kurang = [...fk].filter(f => !fu.has(f)); if (kurang.length && pu) d.push(`Rumus kunci pakai fungsi ${kurang.map(f => `<b>${f}</b>`).join(', ')}, rumusmu belum.`)
      const rk = rentangDi(s.kunci), ru = new Set(rentangDi(info.mine)), rKurang = rk.filter(r => !ru.has(r))
      if (rKurang.length && pu) d.push(`Alamat di kunci: ${rKurang.map(kd).join(', ')}. Cek lagi rentang dan alamat yang kamu pakai, apa udah dari baris pertama sampai terakhir data?`)
      if (/ga dikenal/.test(info.galat || '')) d.push('Teks di dalam rumus wajib pakai tanda kutip dua, contoh <code>"Bandung"</code>. Tanpa kutip, Excel ngira itu nama fungsi atau alamat sel.')
    }
    return bahasHTML({
      diagnosa: d,
      jawab: `<div class="rumus-bahas"><code>${esc(s.kunci)}</code><span>= <b>${esc(X.tampil((() => { try { return X.hitung(s.kunci, data) } catch (e) { return e.message } })()))}</b></span></div>${info.isiKunci ? '<button class="btn kecil garis pakai-kunci">' + ikon('salin', 14) + ' Masukin ke sel (tanpa XP)</button>' : ''}`,
      kenapa: s.jelas || '',
      urai: s.urai ? urai(s) : [],
      ekstra: pohon ? `<div class="bahas-blok"><span class="label-kecil">Dibedah per bagian</span><div class="bedah-rumus">${bedahNode(pohon, data)}</div></div>` : '',
      umum: s.umum,
    })
  }

  // ---------- perenderer tiap jenis langkah ----------
  // api.siap(bool): aktifin tombol Cek. api.selesai(hasil): langkah selesai sendiri (pasang).
  const R = {}

  R.info = (s, el) => { el.innerHTML = `<h2 class="pm-judul">${s.judul || ''}</h2><div class="materi">${s.isi}</div>`; return { mode: 'lanjut' } }

  R.rangkum = (s, el) => {
    el.innerHTML = `<span class="label-kecil">${ikon('kartu', 14)} Kartu contekan</span><h2 class="pm-judul">${s.judul || 'Rangkuman'}</h2><div class="contekan">${(s.poin || []).map(([k, v]) => `<div class="ck-baris"><code>${k}</code><span>${v}</span></div>`).join('')}</div>${s.ingat ? `<p class="tip">${s.ingat}</p>` : ''}`
    return { mode: 'lanjut' }
  }

  // Contoh dikerjain bareng: langkah dibuka satu-satu. SQL dijalanin beneran tiap langkah, Excel dihitung beneran.
  R.contoh = (s, el, api) => {
    const jenis = s.jenis || 'teks', L = s.langkah
    let n = 0, db = null
    const tabelData = () => s.data ? `<div class="xl-geser ct-data"><table class="xl-grid kecil"><thead><tr><th></th>${s.data[0].map((_, c) => `<th>${X.idxKeKolom(c)}</th>`).join('')}</tr></thead><tbody>${s.data.map((r, i) => `<tr><th>${i + 1}</th>${r.map((v, c) => `<td data-r="${i}" data-c="${c}" class="${i === 0 ? 'kepala' : ''} ${typeof v === 'number' ? 'num' : ''}">${typeof v === 'number' ? G.angka(v) : esc(v ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''
    el.innerHTML = `<span class="label-kecil fase-label contoh">${ikon('lampu', 14)} Contoh dikerjain bareng</span><h2 class="pm-judul">${s.judul || 'Contoh'}</h2>${s.soal ? `<div class="ct-soal">${s.soal}</div>` : ''}${tabelData()}<ol class="ct-langkah"></ol><div class="ct-bawah"><button class="btn garis ct-maju">${ikon('kanan', 16)} <span>Langkah 1 dari ${L.length}</span></button><button class="btn tipis kecil ct-semua">Buka semua</button></div><div class="ct-akhir"></div>`
    const ol = el.querySelector('.ct-langkah'), maju = el.querySelector('.ct-maju'), akhir = el.querySelector('.ct-akhir')
    if (jenis === 'sql') ambilDB().then(d => { db = d; el.querySelectorAll('.ct-hasil[data-q]').forEach(isiHasil) }).catch(() => {})
    const isiHasil = box => { if (!db) { box.innerHTML = '<p class="redup kecil">Database lagi disiapin…</p>'; return } try { box.innerHTML = tabelHTML(jalankan(db, box.dataset.q), 6) } catch (e) { box.innerHTML = `<p class="galat">${esc(e.message)}</p>` } }
    const sorot = kode => {
      el.querySelectorAll('.ct-data td.pilih').forEach(t => t.classList.remove('pilih'))
      rentangDi(kode).forEach(r => { const [a, b] = r.split(':').map(X.urai); const z = b || a; el.querySelectorAll('.ct-data td').forEach(t => { const rr = Number(t.dataset.r), cc = Number(t.dataset.c); if (rr >= Math.min(a.r, z.r) && rr <= Math.max(a.r, z.r) && cc >= Math.min(a.c, z.c) && cc <= Math.max(a.c, z.c)) t.classList.add('pilih') }) })
    }
    const buka = () => {
      const st = L[n], prev = n ? String(L[n - 1].kode || '').split('\n') : []
      let kode = ''
      if (st.kode) {
        const baris = String(st.kode).split('\n')
        kode = `<pre class="ct-kode ${jenis === 'teks' ? 'teks' : ''}">${baris.map(b => `<span class="${jenis === 'sql' && n && !prev.includes(b) ? 'baru' : ''}">${esc(b)}</span>`).join('\n')}</pre>`
      }
      let hasil = ''
      if (jenis === 'sql' && st.kode && st.jalan !== false) hasil = `<div class="ct-hasil" data-q="${esc(st.kode)}"></div>`
      if (jenis === 'excel' && st.kode && /^=/.test(st.kode) && st.hitung !== false) { let v; try { v = X.tampil(X.hitung(st.kode, s.data)) } catch (e) { v = e.message } hasil = `<p class="ct-nilai">Hasil: <b>${esc(v)}</b></p>` }
      ol.insertAdjacentHTML('beforeend', `<li class="ct-item masuk"><span class="ct-no">${n + 1}</span><div class="ct-isi"><div class="ct-ket">${st.ket}</div>${kode}${hasil}${st.catatan ? `<p class="redup kecil">${st.catatan}</p>` : ''}</div></li>`)
      const box = ol.lastElementChild.querySelector('.ct-hasil'); if (box) isiHasil(box)
      if (jenis === 'excel' && st.kode) sorot(st.kode)
      n++
      if (n >= L.length) {
        maju.hidden = true; el.querySelector('.ct-semua').hidden = true
        let main = ''
        if (jenis === 'sql' && s.main !== false) main = `<div class="ct-main"><span class="label-kecil">${ikon('pensil', 13)} Coba otak-atik sendiri (ga dinilai)</span><div class="editor"><textarea class="kode-sql" spellcheck="false" autocapitalize="off" rows="4">${esc(L[L.length - 1].kode)}</textarea><div class="editor-bar"><button class="btn kecil jalan">${ikon('main', 14)} Jalankan</button><span class="redup kecil">Ganti angka atau kotanya, liat hasilnya berubah</span></div></div><div class="hasil-q"></div></div>`
        akhir.innerHTML = (s.hasil ? `<div class="ct-hasil-akhir">${s.hasil}</div>` : '') + (s.penutup ? `<p class="tip">${s.penutup}</p>` : '') + main
        const ta = akhir.querySelector('textarea')
        if (ta) { const out = akhir.querySelector('.hasil-q'), run = () => { if (!db) return; try { out.innerHTML = tabelHTML(jalankan(db, ta.value), 8) } catch (e) { out.innerHTML = `<p class="galat">${esc(e.message)}</p><p class="redup kecil">${terjemahGalat(e.message)}</p>` } }; akhir.querySelector('.jalan').onclick = run; ta.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); e.stopPropagation(); run() } } }
        api.siap(true)
      } else maju.querySelector('span').textContent = `Langkah ${n + 1} dari ${L.length}`
      setTimeout(() => ol.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 30)
    }
    maju.onclick = buka
    el.querySelector('.ct-semua').onclick = () => { while (n < L.length) buka() }
    buka()
    return { mode: 'lanjut', kunci: L.length > 1 }
  }

  R.pilih = (s, el, api) => {
    const urut = acak(s.opsi.map((_, i) => i))
    let pilih = null
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="opsi" role="radiogroup">${urut.map((i, n) => `<button class="op" role="radio" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${s.opsi[i]}</span></button>`).join('')}</div>`
    const bs = [...el.querySelectorAll('.op')]
    bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-checked', x === b)); pilih = Number(b.dataset.i); api.siap(true) })
    return {
      mode: 'cek', tombol: n => bs[n] && bs[n].click(),
      cek(nyerah) {
        if (nyerah) pilih = null
        const ok = pilih === s.benar
        bs.forEach(b => { b.disabled = true; const i = Number(b.dataset.i); if (i === s.benar) b.classList.add('benar'); else if (i === pilih) b.classList.add('salah') })
        const al = s.alasan || []
        const opsi = al.length ? `<ul class="bahas-opsi">${urut.map(i => `<li class="${i === s.benar ? 'b' : 's'} ${i === pilih ? 'dipilih' : ''}">${ikon(i === s.benar ? 'cek' : 'x', 14)}<div><span>${s.opsi[i]}</span>${i === pilih ? ' <em>(pilihanmu)</em>' : ''}${al[i] ? `<small>${al[i]}</small>` : ''}</div></li>`).join('')}</ul>` : ''
        return { ok, pesan: ok ? pujian() : nyerah ? 'Gapapa, ini jawabannya.' : 'Belum tepat.', bahas: bahasHTML({ jawab: `<p class="jawab-teks">${s.opsi[s.benar]}</p>${!ok && pilih != null && !al.length ? `<p class="redup kecil">Pilihanmu: ${s.opsi[pilih]}</p>` : ''}`, kenapa: s.jelas, urai: urai(s), opsi, umum: s.umum }) }
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
      cek(nyerah) {
        if (nyerah) dipilih.clear()
        const benar = new Set(s.benar), ok = benar.size === dipilih.size && [...benar].every(i => dipilih.has(i))
        bs.forEach(b => { b.disabled = true; const i = Number(b.dataset.i); if (benar.has(i)) b.classList.add(dipilih.has(i) ? 'benar' : 'kelewat'); else if (dipilih.has(i)) b.classList.add('salah') })
        const al = s.alasan || []
        const opsi = `<ul class="bahas-opsi">${urut.map(i => `<li class="${benar.has(i) ? 'b' : 's'} ${dipilih.has(i) !== benar.has(i) ? 'dipilih' : ''}">${ikon(benar.has(i) ? 'cek' : 'x', 14)}<div><span>${s.opsi[i]}</span> <em>${benar.has(i) ? 'harus dipilih' : 'bukan'}${dipilih.has(i) !== benar.has(i) ? (dipilih.has(i) ? ', tapi kamu pilih' : ', kamu lewatin') : ''}</em>${al[i] ? `<small>${al[i]}</small>` : ''}</div></li>`).join('')}</ul>`
        return { ok, pesan: ok ? pujian() : 'Belum pas semua.', bahas: bahasHTML({ kenapa: s.jelas, opsi, urai: urai(s), umum: s.umum }) }
      },
    }
  }

  const isianDasar = (s, el, api, angka) => {
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="isian"><input type="text" ${angka ? 'inputmode="decimal"' : ''} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${angka ? 'Ketik angka' : 'Ketik jawaban'}" aria-label="Jawaban">${s.satuan ? `<span class="satuan">${s.satuan}</span>` : ''}</div>`
    const inp = el.querySelector('input')
    if (s.kerangka) { inp.value = s.kerangka; setTimeout(() => api.siap(true)) }
    inp.oninput = () => api.siap(inp.value.trim().length > 0)
    fokus(() => inp.focus({ preventScroll: true }))
    return inp
  }
  // Cek kode pendek (Python/rumus) yang sering salah ketik.
  const cekKetik = v => {
    const d = [], h = String(v)
    const hitung = c => (h.match(new RegExp('\\' + c, 'g')) || []).length
    if (hitung('(') !== hitung(')')) d.push('Jumlah kurung buka <code>(</code> dan tutup <code>)</code> belum sama.')
    if (hitung('[') !== hitung(']')) d.push('Kurung siku <code>[ ]</code> belum berpasangan.')
    if ((h.match(/"/g) || []).length % 2 || (h.match(/'/g) || []).length % 2) d.push('Ada tanda kutip yang belum ditutup.')
    if (/^\s*(for|if|while|def|elif|else)\b/.test(h) && !/:\s*$/.test(h)) d.push('Baris <code>for</code>/<code>if</code>/<code>def</code> di Python wajib diakhiri titik dua <code>:</code>.')
    if (/\bif\b[^=]*[^=!<>]=[^=]/.test(h)) d.push('Buat ngebandingin pakai <code>==</code>, bukan <code>=</code> (itu buat ngisi variabel).')
    if (/\b(Print|PRINT)\(/.test(h)) d.push('Python peka huruf besar kecil: tulisnya <code>print</code>, bukan <code>Print</code>.')
    return d
  }
  R.isian = (s, el, api) => {
    const inp = isianDasar(s, el, api, false)
    return {
      mode: 'cek', cek(nyerah) {
        const v = nyerah ? '' : inp.value, ok = !nyerah && s.benar.some(b => norm(b) === norm(v)); inp.disabled = true; inp.classList.add(ok ? 'benar' : 'salah')
        const diag = ok || nyerah ? [] : [`Jawabanmu: ${kd(v)}`, ...cekKetik(v)]
        return { ok, pesan: ok ? pujian() : nyerah ? 'Gapapa, ini jawabannya.' : 'Belum tepat.', bahas: bahasHTML({ diagnosa: diag, jawab: `<pre class="kode-bahas">${esc(s.benar[0])}</pre>${s.benar.length > 1 ? `<p class="redup kecil">Juga diterima: ${s.benar.slice(1).map(kd).join(', ')}</p>` : ''}`, kenapa: s.jelas && s.jelas !== s.benar[0] ? s.jelas : '', urai: urai(s), umum: s.umum }) }
      },
    }
  }
  R.angka = (s, el, api) => {
    const inp = isianDasar(s, el, api, true)
    return {
      mode: 'cek', cek(nyerah) {
        const v = nyerah ? NaN : bacaAngka(inp.value)
        if (!nyerah && Number.isNaN(v)) return { tolak: 'Isinya angka aja ya' }
        const ok = !nyerah && Math.abs(v - s.benar) <= (s.toleransi ?? 0.001)
        inp.disabled = true; inp.classList.add(ok ? 'benar' : 'salah')
        const diag = []
        if (!ok && !nyerah) {
          diag.push(`Jawabanmu <b>${G.angka(v)}</b>, harusnya <b>${G.angka(s.benar)}</b>.`)
          if (s.benar && Math.abs(v * 100 - s.benar) < 1e-6) diag.push('Kayaknya kamu nulis dalam bentuk desimal. Soal ini minta dalam persen, jadi dikali 100.')
          else if (s.benar && Math.abs(v - s.benar * 100) < 1e-6) diag.push('Kayaknya kamu ngali 100 dua kali, atau soalnya minta desimal biasa.')
        }
        return { ok, pesan: ok ? pujian() : nyerah ? 'Gapapa, ini cara ngitungnya.' : 'Belum tepat.', bahas: bahasHTML({ diagnosa: diag, jawab: `<p class="jawab-teks">${G.angka(s.benar)}${s.satuan ? ' ' + s.satuan : ''}</p>`, kenapa: s.jelas, urai: urai(s), umum: s.umum }) }
      },
    }
  }
  R.slider = (s, el, api) => {
    const awal = Math.round((s.min + s.max) / 2 / s.step) * s.step
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="geser"><output>${awal}</output><span class="satuan">${s.satuan || ''}</span><input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${awal}" aria-label="Tebakan"><div class="geser-ujung"><span>${s.min}</span><span>${s.max}</span></div></div>`
    const inp = el.querySelector('input'), out = el.querySelector('output')
    inp.oninput = () => { out.textContent = inp.value; api.siap(true) }
    return { mode: 'cek', cek(nyerah) { const v = Number(inp.value), ok = !nyerah && Math.abs(v - s.benar) <= (s.toleransi || 0); inp.disabled = true; return { ok, pesan: ok ? pujian() : 'Meleset.', bahas: bahasHTML({ diagnosa: ok || nyerah ? [] : [`Tebakanmu ${v} ${s.satuan || ''}.`], jawab: `<p class="jawab-teks">sekitar ${s.benar} ${s.satuan || ''}</p>`, kenapa: s.jelas, urai: urai(s), umum: s.umum }) } } }
  }

  R.urut = (s, el, api) => {
    const sisa = acak(s.item.map((_, i) => i)), jawab = []
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><ol class="urut-jawab" aria-label="Urutan kamu"></ol><p class="redup kecil urut-ket">Ketuk kartu di bawah sesuai urutan. Ketuk lagi buat balikin.</p><div class="urut-sisa"></div>`
    const elJ = el.querySelector('.urut-jawab'), elS = el.querySelector('.urut-sisa')
    let terkunci = false
    const gambar = () => {
      elJ.innerHTML = jawab.map((i, n) => `<li><button class="ur" data-i="${i}" ${terkunci ? 'disabled' : ''}><b>${n + 1}</b><span>${s.item[i]}</span></button></li>`).join('') + Array.from({ length: s.item.length - jawab.length }, (_, n) => `<li class="kosong"><b>${jawab.length + n + 1}</b></li>`).join('')
      elS.innerHTML = terkunci ? '' : sisa.map(i => `<button class="ur" data-i="${i}">${s.item[i]}</button>`).join('')
      elJ.querySelectorAll('.ur').forEach(b => b.onclick = () => { const i = Number(b.dataset.i); jawab.splice(jawab.indexOf(i), 1); sisa.push(i); gambar() })
      elS.querySelectorAll('.ur').forEach(b => b.onclick = () => { const i = Number(b.dataset.i); sisa.splice(sisa.indexOf(i), 1); jawab.push(i); gambar() })
      api.siap(sisa.length === 0)
    }
    gambar()
    return {
      mode: 'cek', cek(nyerah) {
        terkunci = true; gambar()
        const ok = !nyerah && jawab.length === s.item.length && jawab.every((i, n) => i === n)
        elJ.querySelectorAll('.ur').forEach((b, n) => b.classList.add(Number(b.dataset.i) === n ? 'benar' : 'salah'))
        const al = s.alasan || []
        return { ok, pesan: ok ? pujian() : 'Urutannya belum pas.', bahas: bahasHTML({ jawab: `<ol class="kunci-urut">${s.item.map((t, i) => `<li>${t}${al[i] ? `<small>${al[i]}</small>` : ''}${!ok && jawab.length && jawab[i] !== i ? ' <em class="redup">(kamu taruh di sini: ' + (s.item[jawab[i]] !== undefined ? s.item[jawab[i]] : '–') + ')</em>' : ''}</li>`).join('')}</ol>`, kenapa: s.jelas, urai: urai(s), umum: s.umum }) }
      },
    }
  }

  R.pasang = (s, el, api) => {
    const kiri = acak(s.pasangan.map((_, i) => i)), kanan = acak(s.pasangan.map((_, i) => i))
    let pilihK = null, pilihN = null, salah = 0, cocok = 0
    const salahPasang = []
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p><div class="pasang"><div class="kol">${kiri.map(i => `<button class="ps" data-sisi="k" data-i="${i}">${s.pasangan[i][0]}</button>`).join('')}</div><div class="kol">${kanan.map(i => `<button class="ps" data-sisi="n" data-i="${i}">${s.pasangan[i][1].trim()}</button>`).join('')}</div></div>`
    const tabelPasang = () => `<table class="hasil pasang-kunci"><tbody>${s.pasangan.map(([a, b], i) => `<tr><td>${a}</td><td>${ikon('kanan', 14)}</td><td><b>${b.trim()}</b>${(s.alasan || [])[i] ? `<small class="redup">${s.alasan[i]}</small>` : ''}</td></tr>`).join('')}</tbody></table>`
    const selesai = nyerah => api.selesai({ ok: !nyerah, pertama: !nyerah && salah === 0, pesan: nyerah ? 'Gapapa, ini pasangannya.' : salah ? `Beres, ${salah} kali salah pasang.` : pujian() + ' Semua pas tanpa salah.', bahas: bahasHTML({ diagnosa: salahPasang.length ? [`Yang tadi sempat ketuker: ${[...new Set(salahPasang)].slice(0, 4).join('; ')}.`] : [], jawab: tabelPasang(), kenapa: s.jelas, urai: urai(s), umum: s.umum }) })
    const coba = () => {
      if (pilihK == null || pilihN == null) return
      const bK = el.querySelector(`.ps[data-sisi=k][data-i="${pilihK}"]`), bN = el.querySelector(`.ps[data-sisi=n][data-i="${pilihN}"]`)
      if (s.pasangan[pilihK][1].trim() === s.pasangan[pilihN][1].trim()) {
        cocok++
        ;[bK, bN].forEach(b => { b.classList.remove('dipilih'); b.classList.add('cocok'); b.disabled = true; b.style.setProperty('--n', cocok) })
        if (cocok === s.pasangan.length) setTimeout(() => selesai(false), 250)
      } else {
        salah++; salahPasang.push(`${s.pasangan[pilihK][0]} itu <b>${s.pasangan[pilihK][1].trim()}</b>, bukan ${s.pasangan[pilihN][1].trim()}`)
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
    return { mode: 'sendiri', nyerah: () => { el.querySelectorAll('.ps').forEach(b => b.disabled = true); selesai(true) } }
  }

  R.skenario = (s, el, api) => {
    const urut = acak(s.opsi.map((_, i) => i))
    let pilih = null
    el.innerHTML = `<span class="label-kecil">${ikon('obrol', 14)} Situasi kerja</span><p class="pm-tanya">${s.tanya}</p><div class="opsi">${urut.map((i, n) => `<button class="op" role="radio" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${s.opsi[i].teks}</span></button>`).join('')}</div>`
    const bs = [...el.querySelectorAll('.op')]
    bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-checked', x === b)); pilih = Number(b.dataset.i); api.siap(true) })
    return {
      mode: 'cek', tombol: n => bs[n] && bs[n].click(),
      cek(nyerah) {
        if (nyerah) pilih = null
        const o = s.opsi[pilih] || { skor: -1 }, ok = o.skor === 2
        bs.forEach(b => {
          b.disabled = true; const i = Number(b.dataset.i), x = s.opsi[i]
          b.classList.add(x.skor === 2 ? 'benar' : i === pilih ? (x.skor === 1 ? 'lumayan' : 'salah') : 'redupkan')
          b.insertAdjacentHTML('beforeend', `<small class="op-ket">${x.ket}</small>`)
        })
        const terbaik = s.opsi.find(x => x.skor === 2)
        return { ok, pesan: ok ? pujian() : o.skor === 1 ? 'Lumayan, tapi ada yang lebih pas.' : nyerah ? 'Ini respons yang paling pas.' : 'Kurang tepat.', bahas: ok && !s.jelas ? '' : bahasHTML({ jawab: terbaik ? `<p class="jawab-teks">${terbaik.teks}</p><p class="redup kecil">${terbaik.ket}</p>` : '', kenapa: s.jelas, umum: s.umum }) }
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

  const MAKS_KATA = 1000 // bebas nulis tanpa minimal, cuma dibatesin maksimal (masukan pengguna 24 Nov 2026)
  R.tulis = (s, el, api, ctx) => {
    const lama = (G.D().tulisan || {})[ctx.kunci] || ''
    el.innerHTML = `<p class="pm-tanya">${s.tanya}</p>${s.contohJawab ? `<details class="contoh-jawab"><summary>${ikon('lampu', 14)} Liat contoh jawaban yang bagus dulu</summary><div>${s.contohJawab}</div></details>` : ''}<textarea class="tulis" rows="7" placeholder="Tulis di sini…">${esc(lama)}</textarea><div class="tulis-info"><span class="hitung-kata">0 / ${MAKS_KATA} kata maks</span></div><div class="rubrik" hidden><b>Cek sendiri:</b>${s.rubrik.map(r => `<label><input type="checkbox"> ${r}</label>`).join('')}<button class="btn kecil garis salin-ai">${ikon('salin', 16)} Salin buat minta feedback AI</button></div>`
    const ta = el.querySelector('textarea'), hk = el.querySelector('.hitung-kata')
    const upd = () => { const n = kata(ta.value), ok = n >= 1 && n <= MAKS_KATA; hk.textContent = n > MAKS_KATA ? `${n} / ${MAKS_KATA} kata, kepanjangan` : `${n} / ${MAKS_KATA} kata maks`; hk.classList.toggle('cukup', ok); api.siap(ok) }
    ta.oninput = upd; upd()
    fokus(() => ta.focus({ preventScroll: true }))
    el.querySelector('.salin-ai').onclick = () => G.salin(`${s.ai}\n\n${ta.value.trim()}`)
    return {
      mode: 'cek', enterBebas: true,
      cek() {
        G.D().tulisan[ctx.kunci] = ta.value.trim(); G.simpan()
        el.querySelector('.rubrik').hidden = false
        return { ok: true, pesan: 'Tersimpan.', bahas: s.contohJawab ? bahasHTML({ jawab: `<div class="bahas-teks">${s.contohJawab}</div>`, kenapa: 'Bandingin sama tulisanmu pakai rubrik di atas. Ga harus sama persis, yang penting strukturnya.' }) : '', jelas: 'Centang rubrik di atas buat ngecek sendiri, atau salin ke AI buat feedback.' }
      },
    }
  }

  R.sql = (s, el, api, ctx) => {
    const tabel = ['pelanggan', 'produk', 'pesanan', 'item']
    el.innerHTML = `${s.bimbing ? `<span class="label-kecil fase-label bimbing">${ikon('pensil', 14)} Latihan terbimbing</span>` : ''}<p class="pm-tanya">${s.tanya}</p>${s.bimbing && s.petunjuk ? `<p class="tip kecil">${ikon('lampu', 14)} ${s.petunjuk}</p>` : ''}<div class="skema">${tabel.map(t => `<button class="chip" data-t="${t}">${ikon('tabel', 14)} ${t}</button>`).join('')}<button class="chip target-chip">${ikon('target', 14)} Hasil yang diminta</button></div><div class="intip"></div><div class="editor"><textarea class="kode-sql" spellcheck="false" autocapitalize="off" autocomplete="off" rows="5" placeholder="SELECT …" aria-label="Query SQL">${esc(s.kerangka || '')}</textarea><div class="editor-bar"><button class="btn kecil jalan">${ikon('main', 14)} Jalankan</button><span class="redup kecil">Ctrl + Enter</span></div></div><div class="hasil-q"></div>`
    const ta = el.querySelector('textarea'), hasil = el.querySelector('.hasil-q'), intip = el.querySelector('.intip')
    let db = null
    ambilDB().then(d => { db = d }).catch(e => { hasil.innerHTML = `<p class="galat">Database gagal dimuat: ${esc(e.message)}</p>` })
    const run = () => {
      if (!db) { hasil.innerHTML = '<p class="redup kecil">Database masih disiapin…</p>'; return null }
      try { const r = jalankan(db, ta.value); hasil.innerHTML = tabelHTML(r); return r } catch (e) { hasil.innerHTML = `<p class="galat">${esc(e.message)}</p><p class="redup kecil">${terjemahGalat(e.message)}</p>`; return { galat: e.message } }
    }
    const chips = [...el.querySelectorAll('.chip')]
    chips.forEach(b => b.onclick = () => {
      const on = b.classList.toggle('on'); chips.forEach(x => x !== b && x.classList.remove('on'))
      if (!on || !db) { intip.innerHTML = ''; return }
      if (b.classList.contains('target-chip')) { const r = jalankan(db, s.kunci); intip.innerHTML = `<p class="redup kecil">Bentuk hasil yang diminta (${r.values.length} baris, kolom: ${r.columns.map(kd).join(', ')}). Query-nya kamu yang nulis.</p>${tabelHTML(r, 4)}`; return }
      intip.innerHTML = tabelHTML(jalankan(db, `SELECT * FROM ${b.dataset.t} LIMIT 5`), 5)
    })
    el.querySelector('.jalan').onclick = run
    ta.oninput = () => api.siap(ta.value.trim().length > 5)
    if (s.kerangka) setTimeout(() => api.siap(true))
    ta.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run() } }
    fokus(() => { ta.focus({ preventScroll: true }); if (s.kerangka) { const i = ta.value.indexOf('___'); if (i >= 0) ta.setSelectionRange(i, i + 3) } })
    let gagal = 0
    return {
      mode: 'cek', enterBebas: true, ulangDiTempat: true,
      cek(nyerah) {
        if (!db) return { tolak: 'Database masih disiapin, tunggu sebentar' }
        if (nyerah) { gagal++; return { ok: false, pesan: 'Gapapa. Pelajari pembahasannya, terus ketik ulang sendiri.', bahas: bahasSQL(s, db, { diagnosa: [], isiKunci: true }) } }
        if (/___/.test(ta.value)) return { tolak: 'Masih ada ___ yang belum diisi' }
        const r = run()
        if (r.galat) { gagal++; return { ok: false, pesan: 'Query-nya error.', bahas: bahasSQL(s, db, { diagnosa: [`Pesan error: ${kd(r.galat)}`, terjemahGalat(r.galat)], isiKunci: true }) } }
        const rK = jalankan(db, s.kunci), ok = samaHasil(r, rK, s.urut)
        if (!ok) gagal++
        return ok
          ? { ok, pesan: pujian() + ' Hasilnya sama persis.', bahas: bahasSQL(s, db, { diagnosa: [] }) }
          : { ok, pesan: 'Query jalan, tapi hasilnya belum sesuai.', bahas: bahasSQL(s, db, { diagnosa: diagnosaSQL(ta.value, r, s.kunci, rK, s.urut), isiKunci: true }) }
      },
      isiKunci: () => { ta.value = formatSQL(s.kunci); run() },
    }
  }

  R.excel = (s, el, api) => {
    const data = s.data, tgt = X.urai(s.sel), nBawah = s.bawah || 1
    const petunjukSel = matchMedia('(pointer: coarse)').matches ? 'Ketuk sel buat masukin alamatnya. Ketuk sel kedua buat bikin rentang (misal D2 lalu D7).' : 'Ketik rumus, atau klik/seret sel buat masukin alamatnya.'
    const nKol = Math.max(data[0].length, tgt.c + 1), nBaris = Math.max(data.length, tgt.r + nBawah)
    const isTarget = (r, c) => c === tgt.c && r >= tgt.r && r < tgt.r + nBawah
    const sel = (r, c) => r === 0 && c === tgt.c ? `<b>${esc(s.label || '')}</b>` : r === tgt.r && c === tgt.c ? '<span class="hasil-sel">?</span>' : isTarget(r, c) ? '<span class="hasil-sel redup">↓</span>' : data[r] && data[r][c] != null ? (typeof data[r][c] === 'number' ? G.angka(data[r][c]) : esc(data[r][c])) : ''
    el.innerHTML = `${s.bimbing ? `<span class="label-kecil fase-label bimbing">${ikon('pensil', 14)} Latihan terbimbing</span>` : ''}<p class="pm-tanya">${s.tanya}</p>${s.bimbing && s.petunjuk ? `<p class="tip kecil">${ikon('lampu', 14)} ${s.petunjuk}</p>` : ''}${nBawah > 1 ? `<p class="redup kecil">${ikon('kanan', 13)} Rumus di ${s.sel} nanti otomatis disalin ke bawah sampai ${X.idxKeKolom(tgt.c)}${tgt.r + nBawah}, kayak narik fill handle di Excel.</p>` : ''}<div class="xl"><div class="xl-bar"><span class="xl-nama">${s.sel}</span><span class="xl-fx">fx</span><input class="xl-rumus" spellcheck="false" autocomplete="off" autocapitalize="off" value="${esc(s.kerangka || '=')}" aria-label="Rumus untuk sel ${s.sel}"></div><div class="xl-pratinjau redup kecil">${petunjukSel}</div><div class="xl-geser"><table class="xl-grid"><thead><tr><th></th>${Array.from({ length: nKol }, (_, c) => `<th>${X.idxKeKolom(c)}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: nBaris }, (_, r) => `<tr><th>${r + 1}</th>${Array.from({ length: nKol }, (_, c) => `<td data-r="${r}" data-c="${c}" class="${r === 0 ? 'kepala' : ''} ${isTarget(r, c) ? 'target' : ''} ${typeof (data[r] || [])[c] === 'number' ? 'num' : ''}">${sel(r, c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`
    const inp = el.querySelector('.xl-rumus'), pra = el.querySelector('.xl-pratinjau')
    const tdT = () => el.querySelector(`td[data-r="${tgt.r}"][data-c="${tgt.c}"]`)
    const hs = { set textContent(v) { const t = tdT(); t.innerHTML = `<span class="hasil-sel">${esc(v)}</span>` } }
    const nilaiDari = r => X.hitung(r, data)
    const pratinjau = () => {
      const v = inp.value.trim()
      el.querySelectorAll('td.meleset, td.target.beres').forEach(t => { t.classList.remove('meleset', 'beres'); if (Number(t.dataset.r) !== tgt.r) t.innerHTML = '<span class="hasil-sel redup">↓</span>' })
      api.siap(v.length > 1)
      if (v.length <= 1) { pra.className = 'xl-pratinjau redup kecil'; pra.textContent = petunjukSel; hs.textContent = '?'; return }
      try { const h = nilaiDari(v); pra.className = 'xl-pratinjau ok kecil'; pra.innerHTML = `Hasil: <b>${esc(X.tampil(h))}</b>`; hs.textContent = X.tampil(h) }
      catch (e) { pra.className = 'xl-pratinjau galat kecil'; pra.textContent = e.message; hs.textContent = '#?' }
    }
    inp.oninput = pratinjau
    if (s.kerangka && s.kerangka.length > 1) setTimeout(pratinjau)
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
    fokus(() => { inp.focus({ preventScroll: true }); const v = inp.value, i = v.indexOf('___'); if (i >= 0) inp.setSelectionRange(i, i + 3); else inp.setSelectionRange(v.length, v.length) })
    // data acakan buat mastiin rumus bukan kebetulan sama
    const varian = () => [data[0], ...acak(data.slice(1)).map(r => r.map(v => typeof v === 'number' ? v + Math.round((Math.random() - .3) * Math.max(3, v * .4)) : v))]
    const hasilAman = (r, d) => { try { return { v: X.hitung(r, d) } } catch (e) { return { e: true } } }
    const isiBawah = (rumus, tandaiSalah) => {
      for (let k = 0; k < nBawah; k++) {
        const td = el.querySelector(`td[data-r="${tgt.r + k}"][data-c="${tgt.c}"]`), a = hasilAman(X.geser(rumus, k), data), b = hasilAman(X.geser(s.kunci, k), data)
        td.innerHTML = `<span class="hasil-sel">${a.e ? '#ERR' : esc(X.tampil(a.v))}</span>`
        const pas = !a.e && !b.e && X.sama(a.v, b.v); td.classList.toggle('beres', pas); td.classList.toggle('meleset', tandaiSalah && !pas)
      }
    }
    let gagal = 0
    const salah = (pesan, mine, extra = {}) => { gagal++; return { ok: false, pesan, bahas: bahasExcel(s, data, { mine, ok: false, isiKunci: true, ...extra }) } }
    return {
      mode: 'cek', ulangDiTempat: true,
      cek(nyerah) {
        if (nyerah) { gagal++; return { ok: false, pesan: 'Gapapa. Pelajari pembahasannya, terus ketik ulang sendiri.', bahas: bahasExcel(s, data, { isiKunci: true }) } }
        const v = inp.value.trim()
        if (/___/.test(v)) return { tolak: 'Masih ada ___ yang belum diisi' }
        let mine
        try { mine = nilaiDari(v) } catch (e) { return salah('Rumusnya error.', v, { diagnosa: [`Pesan: ${esc(e.message)}`], galat: e.message }) }
        const kunci = nilaiDari(s.kunci)
        if (!X.sama(mine, kunci)) return salah('Hasilnya belum sesuai.', v, { diagnosa: [`Hasil rumusmu <b>${esc(X.tampil(mine))}</b>, yang diminta <b>${esc(X.tampil(kunci))}</b>.`] })
        if (!/[A-Z]+\$?\d+/i.test(v.replace(/"[^"]*"/g, ''))) return salah('Angkanya bener, tapi rumusnya ngetik hasil langsung.', v, { diagnosa: ['Pakai rumus yang ngerujuk sel (misal D2), jangan ngetik angkanya. Kalau datanya berubah, rumus harus ikut berubah.'] })
        if (nBawah > 1) {
          for (let k = 1; k < nBawah; k++) {
            const a = hasilAman(X.geser(v, k), data), b = hasilAman(X.geser(s.kunci, k), data)
            if (a.e !== b.e || (!a.e && !X.sama(a.v, b.v))) { isiBawah(v, true); const selN = X.idxKeKolom(tgt.c) + (tgt.r + 1 + k); return salah(`Baris pertama bener, tapi pas disalin ke ${selN} hasilnya meleset.`, v, { diagnosa: [`Di ${selN} rumusmu jadi ${kd(X.geser(v, k))}. Alamat yang harusnya tetap ikut geser ke bawah. Kunci alamatnya pakai tanda <code>$</code>, misal <code>$G$1</code>.`] }) }
          }
        }
        for (let i = 0; i < 3; i++) {
          const d = varian(), a = hasilAman(v, d), b = hasilAman(s.kunci, d)
          if (a.e !== b.e || (!a.e && !X.sama(a.v, b.v))) return salah('Hasilnya kebetulan sama, tapi rumusnya belum tepat.', v, { diagnosa: ['Kalau angka di tabel diganti, hasil rumusmu bakal beda sama yang diminta. Biasanya karena alamat sel atau rentangnya kurang pas.'] })
        }
        inp.disabled = true; tdT().classList.add('beres')
        if (nBawah > 1) isiBawah(v, false)
        return { ok: true, pesan: pujian() + ` ${s.sel} = ${esc(X.tampil(mine))}`, bahas: bahasExcel(s, data, { mine: v, ok: true }) }
      },
      isiKunci: () => { inp.value = s.kunci; pratinjau() },
    }
  }

  // ---------- Python beneran pakai Pyodide (diunduh cuma pas soal Python pertama dibuka) ----------
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
  const PY_HELPER = `
import sys, io, json, traceback
def __norm(v):
    try:
        import pandas as pd
        if isinstance(v, (pd.DataFrame, pd.Series)):
            return v.round(4).to_string()
    except Exception:
        pass
    if isinstance(v, float):
        return repr(round(v, 4))
    if isinstance(v, (list, tuple)):
        return repr([round(x, 4) if isinstance(x, float) else x for x in v])
    if isinstance(v, dict):
        return repr({k: (round(x, 4) if isinstance(x, float) else x) for k, x in v.items()})
    return repr(v)
def __jalan(kode, setup, cek):
    ns = {}
    buf = io.StringIO()
    lama = sys.stdout
    sys.stdout = buf
    galat, baris = None, None
    try:
        exec(compile(setup, '<data>', 'exec'), ns)
        exec(compile(kode, '<kode>', 'exec'), ns)
    except Exception as e:
        galat = type(e).__name__ + ': ' + str(e)
        if isinstance(e, SyntaxError) and e.filename == '<kode>':
            baris = e.lineno
        for f in traceback.extract_tb(e.__traceback__):
            if f.filename == '<kode>':
                baris = f.lineno
    finally:
        sys.stdout = lama
    nilai = {n: (__norm(ns[n]) if n in ns else None) for n in cek}
    return json.dumps({'out': buf.getvalue(), 'galat': galat, 'baris': baris, 'nilai': nilai})
`
  let pyJanji = null
  const paketPy = new Set()
  const ambilPy = (paket = []) => {
    if (!pyJanji) pyJanji = new Promise((ok, gagal) => {
      if (window.loadPyodide) return ok()
      const sc = document.createElement('script'); sc.src = PYODIDE + 'pyodide.js'; sc.onload = ok
      sc.onerror = () => gagal(new Error('Python gagal diunduh. Cek koneksi internet, terus buka ulang soalnya.'))
      document.head.appendChild(sc)
    }).then(() => loadPyodide({ indexURL: PYODIDE })).then(py => { py.runPython(PY_HELPER); return py })
      .catch(e => { pyJanji = null; throw e })
    return pyJanji.then(async py => { const perlu = paket.filter(p => !paketPy.has(p)); if (perlu.length) { await py.loadPackage(perlu); perlu.forEach(p => paketPy.add(p)) } return py })
  }
  const jalanPy = (py, kode, setup, cek) => JSON.parse(py.globals.get('__jalan')(kode, setup || '', py.toPy(cek || [])))
  const normOut = s => String(s || '').replace(/[ \t]+$/gm, '').trim()
  const GALAT_PY = [
    [/^IndentationError/, () => 'Indentasi (spasi di awal baris) belum pas. Isi blok <code>for</code>/<code>if</code>/<code>def</code> menjorok 4 spasi, dan baris di luar blok jangan menjorok.'],
    [/^SyntaxError/, () => 'Penulisannya belum sesuai aturan Python. Cek titik dua di akhir <code>for</code>/<code>if</code>/<code>def</code>, pasangan kurung, dan tanda kutip.'],
    [/^NameError: name '([^']+)'/, m => `<code>${esc(m[1])}</code> belum dikenal. Mungkin salah ketik (Python peka huruf besar kecil), variabelnya belum dibikin, atau itu teks yang lupa dikasih kutip.`],
    [/^TypeError: can only concatenate str/, () => 'Teks ga bisa langsung ditambah angka. Pakai f-string <code>f"... {x}"</code> atau ubah dulu pakai <code>str(x)</code>.'],
    [/^TypeError: unsupported operand/, () => 'Operasinya ga cocok sama tipe datanya, misalnya teks dikurang angka. Cek tipe tiap variabel.'],
    [/^KeyError: (.+)/, m => `Kunci/kolom <code>${esc(m[1])}</code> ga ada. Cek ejaan nama kolom atau kunci dictionary, persis sama huruf besar kecilnya.`],
    [/^IndexError/, () => 'Indeks di luar jangkauan. Indeks mulai dari 0, indeks terakhir = len − 1.'],
    [/^AttributeError: '(\w+)' object has no attribute '(\w+)'/, m => `Objek ${esc(m[1])} ga punya <code>.${esc(m[2])}</code>. Cek ejaan nama fungsinya.`],
    [/^ValueError: The truth value of a Series is ambiguous/, () => 'Di pandas, gabung syarat pakai <code>&amp;</code> / <code>|</code> (bukan and/or) dan tiap syarat dibungkus kurung.'],
    [/^ZeroDivisionError/, () => 'Ada pembagian dengan nol.'],
  ]
  const terjemahPy = g => { for (const [re, f] of GALAT_PY) { const m = re.exec(g); if (m) return f(m) } return 'Baca pesan error-nya dari kanan: biasanya nyebut apa yang salah.' }

  R.py = (s, el, api) => {
    el.innerHTML = `${s.bimbing ? `<span class="label-kecil fase-label bimbing">${ikon('pensil', 14)} Latihan terbimbing</span>` : ''}<p class="pm-tanya">${s.tanya}</p>${s.bimbing && s.petunjuk ? `<p class="tip kecil">${ikon('lampu', 14)} ${s.petunjuk}</p>` : ''}${s.setup ? `<details class="py-setup" ${s.bukaSetup ? 'open' : ''}><summary>${ikon('tabel', 14)} Data yang udah disiapin</summary><pre class="kode-bahas">${esc(s.setup.trim())}</pre></details>` : ''}<div class="editor"><textarea class="kode-sql kode-py" spellcheck="false" autocapitalize="off" autocomplete="off" rows="6" placeholder="# tulis kode Python di sini" aria-label="Kode Python">${esc(s.kerangka || '')}</textarea><div class="editor-bar"><button class="btn kecil jalan">${ikon('main', 14)} Jalankan</button><span class="redup kecil py-status">Ctrl + Enter · Tab = 4 spasi</span></div></div><div class="hasil-q py-hasil"></div>`
    const ta = el.querySelector('textarea'), hasil = el.querySelector('.py-hasil'), status = el.querySelector('.py-status')
    let py = null, gagalMuat = null
    const muat = () => { status.textContent = paketPy.size || window.loadPyodide ? 'Nyiapin Python…' : 'Ngunduh Python (sekali aja, beberapa MB)…'; return ambilPy(s.paket).then(p => { py = p; status.textContent = 'Python siap · Ctrl + Enter · Tab = 4 spasi'; return p }).catch(e => { gagalMuat = e.message; status.textContent = e.message; throw e }) }
    muat().catch(() => {})
    const tampilHasil = h => {
      hasil.innerHTML = (h.out ? `<pre class="py-out">${esc(h.out)}</pre>` : '') + (h.galat ? `<p class="galat">${esc(h.galat)}${h.baris ? ` (baris ${h.baris})` : ''}</p><p class="redup kecil">${terjemahPy(h.galat)}</p>` : '') + (!h.out && !h.galat ? '<p class="redup kecil">Kode jalan tanpa error, tapi ga ada yang di-print.</p>' : '')
    }
    const run = async () => { if (!py) { try { await muat() } catch (e) { return null } } const h = jalanPy(py, ta.value, s.setup, s.cek); tampilHasil(h); return h }
    el.querySelector('.jalan').onclick = run
    ta.oninput = () => api.siap(ta.value.trim().length > 2)
    if (s.kerangka) setTimeout(() => api.siap(true))
    ta.onkeydown = e => {
      if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const a = ta.selectionStart, b = ta.selectionEnd; ta.value = ta.value.slice(0, a) + '    ' + ta.value.slice(b); ta.selectionStart = ta.selectionEnd = a + 4; ta.dispatchEvent(new Event('input')) }
      else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run() }
      else if (e.key === 'Enter') { // auto-indent: ikutin spasi baris sebelumnya, tambah 4 kalau baris diakhiri titik dua
        const a = ta.selectionStart, awal = ta.value.lastIndexOf('\n', a - 1) + 1, baris = ta.value.slice(awal, a), sp = (baris.match(/^ */) || [''])[0] + (/:\s*$/.test(baris) ? '    ' : '')
        if (sp) { e.preventDefault(); ta.value = ta.value.slice(0, a) + '\n' + sp + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = a + 1 + sp.length }
      }
    }
    fokus(() => { ta.focus({ preventScroll: true }); if (s.kerangka) { const i = ta.value.indexOf('___'); if (i >= 0) ta.setSelectionRange(i, i + 3) } })
    const bahasPy = (diag, hK, isiKunci) => bahasHTML({
      diagnosa: diag,
      jawab: `<pre class="kode-bahas">${esc(s.kunci.trim())}</pre>${isiKunci ? '<button class="btn kecil garis pakai-kunci">' + ikon('salin', 14) + ' Masukin ke editor (tanpa XP)</button>' : ''}${hK && hK.out ? `<span class="label-kecil">Keluaran yang bener</span><pre class="py-out">${esc(hK.out)}</pre>` : ''}`,
      kenapa: s.jelas || '', urai: urai(s), umum: s.umum,
    })
    return {
      mode: 'cek', enterBebas: true, ulangDiTempat: true,
      async cekAsync(nyerah) {
        if (!py && !gagalMuat) { try { await muat() } catch (e) { /* lanjut ke cabang gagal */ } }
        if (!py) return nyerah ? { ok: false, pesan: 'Ini jawabannya.', bahas: bahasPy([], null, true) } : { tolak: 'Python belum bisa dimuat di sini. Pencet "Ga tau" buat liat jawaban dan pembahasannya.' }
        const hK = jalanPy(py, s.kunci, s.setup, s.cek)
        if (nyerah) return { ok: false, pesan: 'Gapapa. Pelajari pembahasannya, terus ketik ulang sendiri.', bahas: bahasPy([], hK, true) }
        if (/___/.test(ta.value)) return { tolak: 'Masih ada ___ yang belum diisi' }
        const h = jalanPy(py, ta.value, s.setup, s.cek); tampilHasil(h)
        const diag = []
        if (h.galat) { diag.push(`Error di ${h.baris ? 'baris ' + h.baris : 'kodemu'}: ${kd(h.galat)}`, terjemahPy(h.galat)); return { ok: false, pesan: 'Kodenya error.', bahas: bahasPy(diag, hK, true) } }
        const cekOut = s.keluaran !== false
        if (cekOut && normOut(h.out) !== normOut(hK.out)) diag.push(h.out ? `Keluaranmu:<pre class="py-out">${esc(h.out)}</pre>Yang diminta:<pre class="py-out">${esc(hK.out)}</pre>` : 'Kodemu ga nge-print apa-apa. Hasilnya harus ditampilin pakai <code>print(...)</code>.')
        const litU = ta.value.match(/(["'])[^"'\n]*\1/g) || [], litK = s.kunci.match(/(["'])[^"'\n]*\1/g) || []
        if (normOut(h.out) !== normOut(hK.out) || (s.cek || []).some(n => h.nilai[n] !== hK.nilai[n])) litU.forEach(l => { const k = litK.find(x => x.slice(1, -1).toLowerCase() === l.slice(1, -1).toLowerCase() && x.slice(1, -1) !== l.slice(1, -1)); if (k) diag.push(`Teks di Python peka huruf besar kecil: ${kd(l)} ≠ ${kd(k)}.`) })
        for (const n of s.cek || []) if (h.nilai[n] !== hK.nilai[n]) diag.push(h.nilai[n] == null ? `Variabel <code>${esc(n)}</code> belum dibikin. Soal minta hasilnya disimpen di <code>${esc(n)}</code>.` : `Isi <code>${esc(n)}</code> punyamu:<pre class="py-out">${esc(h.nilai[n])}</pre>harusnya:<pre class="py-out">${esc(hK.nilai[n])}</pre>`)
        const ok = !diag.length
        return ok ? { ok, pesan: pujian() + ' Hasilnya sama persis.', bahas: bahasPy([], hK, false) } : { ok, pesan: 'Kode jalan, tapi hasilnya belum sesuai.', bahas: bahasPy(diag, hK, true) }
      },
      isiKunci: () => { ta.value = s.kunci.trim(); run() },
    }
  }

  // ---------- kerangka pemutar ----------
  const FASE = [['konsep', 'Konsep'], ['contoh', 'Contoh'], ['latihan', 'Latihan'], ['uji', 'Uji'], ['rangkum', 'Rangkum']]
  const faseDari = s => s.t === 'info' || s.t === 'kartu' ? 'konsep' : s.t === 'contoh' ? 'contoh' : s.t === 'rangkum' ? 'rangkum' : s.bimbing ? 'latihan' : 'uji'
  const kerangka = (el, warna, judul) => {
    el.innerHTML = `<div class="pemain" style="--garis:${warna}">
      <header class="pm-atas"><button class="ikon-btn pm-tutup" aria-label="Keluar">${ikon('x', 22)}</button><div class="pm-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></div><span class="pm-xp" aria-live="polite">${ikon('petir', 16)}<b>0</b></span></header>
      <div class="pm-konteks redup kecil">${judul}</div>
      <ol class="pm-rute" hidden></ol>
      <main class="pm-isi"><div class="pm-langkah"></div></main>
      <footer class="pm-bawah"><div class="pm-umpan" aria-live="polite"></div><div class="pm-tombol"><button class="btn garis pm-lewat" hidden>Ga tau</button><button class="btn utama besar pm-aksi" disabled>Cek</button></div></footer>
    </div>`
    return {
      bar: el.querySelector('.pm-bar'), xp: el.querySelector('.pm-xp b'), isi: el.querySelector('.pm-langkah'), main: el.querySelector('.pm-isi'), rute: el.querySelector('.pm-rute'),
      bawah: el.querySelector('.pm-bawah'), umpan: el.querySelector('.pm-umpan'), aksi: el.querySelector('.pm-aksi'), lewat: el.querySelector('.pm-lewat'), tutup: el.querySelector('.pm-tutup'),
    }
  }

  const pelajaran = (el, id, pid, o) => {
    const K = G.kursus(id), p = o.pel || K.pelajaran.find(x => x.id === pid) // o.pel: pelajaran rakitan (kuis harian)
    const warna = G.warnaSkill(id)
    const U = kerangka(el, warna, `${KAT.skill[id].pendek} · ${p.judul}`)
    const antre = p.langkah.map((s, i) => ({ s, i, ulang: false }))
    const total = antre.length
    let pos = 0, xp = 0, nilaiBenar = 0, nilaiTotal = 0, r = null, keadaan = 'jawab', terakhir = null, salahIni = 0
    const mulai = Date.now()
    const sudahSelesai = new Set()
    const faseAda = FASE.filter(([f]) => p.langkah.some(s => faseDari(s) === f))
    if (!o.harian && faseAda.length > 1) { U.rute.hidden = false; U.rute.innerHTML = faseAda.map(([f, n]) => `<li data-f="${f}"><i></i><span>${n}</span></li>`).join('') }
    const setRute = s => {
      if (U.rute.hidden) return
      const f = faseDari(s), idx = faseAda.findIndex(x => x[0] === f)
      U.rute.querySelectorAll('li').forEach((li, i) => { li.classList.toggle('lewat', i < idx); li.classList.toggle('ini', i === idx) })
    }
    const setBar = () => { const v = Math.round(sudahSelesai.size / total * 100); U.bar.firstElementChild.style.width = v + '%'; U.bar.setAttribute('aria-valuenow', v) }
    const tambah = n => { if (!n) return; xp += n; U.xp.textContent = xp; U.xp.parentElement.classList.remove('naik'); void U.xp.offsetWidth; U.xp.parentElement.classList.add('naik') }
    const keluarkanUmpan = () => { U.bawah.className = 'pm-bawah'; U.umpan.innerHTML = '' }
    const tampil = () => {
      const a = antre[pos]
      keluarkanUmpan(); keadaan = 'jawab'; salahIni = 0
      U.isi.classList.remove('masuk'); void U.isi.offsetWidth; U.isi.classList.add('masuk')
      window.scrollTo(0, 0); U.main.scrollTop = 0
      setRute(a.s)
      r = R[a.s.t](a.s, U.isi, {
        siap: v => { U.aksi.disabled = !v },
        selesai: h => umpan(h),
      }, { kunci: `${id}/${pid}/${a.i}` }) || { mode: 'lanjut' }
      U.aksi.hidden = r.mode === 'sendiri'
      U.aksi.textContent = r.mode === 'lanjut' ? 'Lanjut' : 'Cek'
      U.aksi.disabled = r.mode === 'cek' || !!r.kunci
      U.lewat.hidden = !(DINILAI.includes(a.s.t) && (r.mode === 'cek' || r.nyerah))
      U.lewat.textContent = 'Ga tau'
      if (a.s.audio) {
        U.isi.insertAdjacentHTML('afterbegin', `<div class="audio-kotak"><button class="btn garis kecil putar">${ikon('main', 14)} Putar audio</button><span class="redup kecil">Dengerin dulu, jangan liat naskah. Boleh diputar ulang.</span></div>`)
        const btn = U.isi.querySelector('.putar')
        btn.onclick = () => {
          if (!window.speechSynthesis) return G.toast('Browser ini ga bisa muter suara. Coba Chrome.')
          speechSynthesis.cancel()
          const suara = speechSynthesis.getVoices().find(v => /en-GB/i.test(v.lang)) || speechSynthesis.getVoices().find(v => /^en/i.test(v.lang))
          ;[].concat(a.s.audio).forEach(t => { const u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; u.rate = .92; if (suara) u.voice = suara; speechSynthesis.speak(u) })
          btn.innerHTML = `${ikon('ulang', 14)} Putar ulang`
        }
      }
      if (a.s.bimbing && !o.harian) {
        if (!U.isi.querySelector('.fase-label')) U.isi.insertAdjacentHTML('afterbegin', `<span class="label-kecil fase-label bimbing">${ikon('pensil', 14)} Latihan terbimbing</span>${a.s.petunjuk ? `<p class="tip kecil">${ikon('lampu', 14)} ${a.s.petunjuk}</p>` : ''}`)
        const ct = p.langkah.slice(0, a.i).reverse().find(x => x.t === 'contoh')
        if (ct) U.isi.insertAdjacentHTML('beforeend', `<details class="ct-ulang"><summary>${ikon('lampu', 14)} Liat lagi contoh tadi: ${ct.judul}</summary><ol>${ct.langkah.map(l => `<li>${l.kode ? `<code>${esc(l.kode)}</code>` : ''}<span>${l.ket}</span></li>`).join('')}</ol></details>`)
      }
      if (a.ulang) U.isi.insertAdjacentHTML('afterbegin', `<span class="label-kecil ulang">${ikon('ulang', 14)} Coba lagi yang tadi, udah liat pembahasannya</span>`)
    }
    const pasangBahas = h => {
      U.isi.querySelectorAll('.bahas').forEach(x => x.remove())
      if (!h.bahas) return
      U.isi.insertAdjacentHTML('beforeend', `<details class="bahas ${h.ok ? 'ok' : 'bad'}" ${h.ok ? '' : 'open'}><summary>${ikon('lampu', 16)} <span>${h.ok ? 'Liat pembahasan lengkap' : 'Pembahasan'}</span></summary><div class="bahas-isi">${h.bahas}</div></details>`)
      const box = U.isi.querySelector('.bahas')
      const pk = box.querySelector('.pakai-kunci')
      if (pk) pk.onclick = () => { antre[pos].terungkap = true; r.isiKunci && r.isiKunci(); keluarkanUmpan(); keadaan = 'jawab'; U.aksi.textContent = 'Cek'; U.aksi.disabled = false; G.toast('Jawaban dimasukin. Baca lagi bagian per bagiannya, terus pencet Cek (tanpa XP).') }
      if (!h.ok) setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
    const umpan = h => {
      const a = antre[pos]
      if (h.tolak) { G.toast(h.tolak); return }
      terakhir = h
      if (!h.ok) salahIni++
      const dinilai = DINILAI.includes(a.s.t)
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
      pasangBahas(h)
      U.lewat.hidden = true
      U.bawah.className = 'pm-bawah ' + (h.ok ? 'ok' : 'bad')
      const adaBahas = !!h.bahas
      U.umpan.innerHTML = `<div class="um-ikon">${ikon(h.ok ? 'cek' : 'x', 22)}</div><div class="um-teks"><b>${h.pesan}</b>${h.jelas ? `<div>${h.jelas}</div>` : ''}${adaBahas && !h.ok ? `<button class="btn kecil garis um-bahas">${ikon('lampu', 15)} Baca pembahasan</button>` : ''}</div>`
      const bb = U.umpan.querySelector('.um-bahas'); if (bb) bb.onclick = () => U.isi.querySelector('.bahas').scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        if (r.mode === 'lanjut') { sudahSelesai.add(antre[pos].i); setBar(); if (antre[pos].s.t === 'kartu' || antre[pos].s.t === 'contoh') tambah(2); return maju() }
        if (r.cekAsync) { U.aksi.disabled = true; U.lewat.disabled = true; const t0 = U.aksi.textContent; U.aksi.textContent = 'Ngecek…'; return r.cekAsync().then(h => { U.aksi.textContent = t0; U.aksi.disabled = false; U.lewat.disabled = false; umpan(h) }) }
        umpan(r.cek())
      } else if (terakhir && (terakhir.ok || !r.ulangDiTempat)) maju()
      else { keluarkanUmpan(); keadaan = 'jawab'; U.aksi.textContent = 'Cek'; U.lewat.hidden = false; U.lewat.textContent = 'Ga tau'; const t = U.isi.querySelector('textarea, .xl-rumus'); if (t) { t.disabled = false; t.focus({ preventScroll: true }) } }
    }
    U.lewat.onclick = () => {
      if (keadaan !== 'jawab') return
      if (r.nyerah) return r.nyerah()
      if (r.cekAsync) {
        if (U.lewat.disabled) return
        U.lewat.disabled = true; U.aksi.disabled = true; const t0 = U.aksi.textContent; U.aksi.textContent = 'Ngecek…'
        return r.cekAsync(true).then(h => { U.lewat.disabled = false; U.aksi.textContent = t0; U.aksi.disabled = false; umpan(h) })
      }
      if (r.cek) umpan(r.cek(true))
    }
    const tombol = e => {
      if (!document.body.contains(U.aksi)) return document.removeEventListener('keydown', tombol)
      const tag = e.target.tagName
      if (e.key === 'Enter' && !U.aksi.disabled && !U.aksi.hidden) {
        if (tag === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return
        if (tag === 'TEXTAREA' && r.enterBebas && keadaan === 'jawab' && ['sql', 'py'].includes(antre[pos].s.t)) return
        if (tag === 'TEXTAREA' && e.target.closest('.ct-main')) return
        if (tag === 'BUTTON' && e.target !== U.aksi) return
        if (tag === 'SUMMARY') return
        e.preventDefault(); U.aksi.click()
      } else if (/^[1-9]$/.test(e.key) && tag !== 'INPUT' && tag !== 'TEXTAREA' && keadaan === 'jawab' && r.tombol) r.tombol(Number(e.key) - 1)
      else if (e.key === 'Escape') U.tutup.click()
    }
    document.addEventListener('keydown', tombol)
    U.tutup.onclick = async () => { if (sudahSelesai.size === 0 || await G.konfirmasi('Keluar dari pelajaran? Progres di pelajaran ini belum kesimpen.', 'Keluar')) { document.removeEventListener('keydown', tombol); o.tutup() } }

    const beres = () => {
      document.removeEventListener('keydown', tombol)
      const d = G.D(), k = `${id}/${pid}`, pertamaKali = !o.harian && !d.pelajaran[k]
      const akurasi = nilaiTotal ? Math.round(nilaiBenar / nilaiTotal * 100) : 100
      const bonus = pertamaKali ? 15 : 0
      const detik = Math.round((Date.now() - mulai) / 1000)
      if (o.harian) { d.harian = d.harian || {}; d.harian[id] = d.harian[id] || {}; d.harian[id][G.tgl()] = Math.max(d.harian[id][G.tgl()] || 0, akurasi) }
      else { d.pelajaran[k] = { tgl: G.tgl(), akurasi, xp: xp + bonus }; d.terakhir = { skill: id } }
      G.simpan()
      G.tambahXP(xp + bonus)
      const lanjut = o.harian ? null : G.berikut(id)
      const rk = p.langkah.find(s => s.t === 'rangkum')
      el.innerHTML = `<div class="pemain beres-layar" style="--garis:${warna}"><main class="pm-isi"><div class="beres">
        <div class="beres-cap">${ikon('cek', 34)}</div>
        <h1>${o.harian ? 'Kuis harian beres!' : 'Pelajaran beres!'}</h1><p class="redup">${esc(p.judul)}${o.harian ? ' · balik besok buat soal baru' : ''}</p>
        <div class="tiket kecil-tiket" style="--garis:${warna}"><div class="tiket-kiri"><span class="kode" style="background:${warna}">${id}</span></div><div class="tiket-isi"><div class="statistik">
          <div><small>XP</small><b>+${xp + bonus}</b></div><div><small>Akurasi</small><b>${akurasi}%</b></div><div><small>Waktu</small><b>${Math.floor(detik / 60)}:${String(detik % 60).padStart(2, '0')}</b></div>
        </div>${bonus ? '<p class="kecil redup">Termasuk bonus +15 pelajaran pertama kali.</p>' : ''}</div></div>
        ${akurasi < 70 && !o.harian ? `<p class="tip kecil">Akurasi di bawah 70%. Ulang pelajaran ini besok, otak lebih nempel kalau diulang setelah jeda.</p>` : ''}
        ${rk ? `<details class="panel ck-ulang"><summary>${ikon('kartu', 15)} Liat lagi kartu contekannya</summary><div class="contekan">${rk.poin.map(([k, v]) => `<div class="ck-baris"><code>${k}</code><span>${v}</span></div>`).join('')}</div></details>` : ''}
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
    const catatan = []
    const perkiraanTotal = () => 2 + (bank.menengah.length ? 2 : 0) + (bank.mahir.length ? 2 : 0)
    const tampil = () => {
      const t = bank[tahap][idx], urut = acak(t.opsi.map((_, i) => i))
      pilih = null; nomor++
      U.bar.firstElementChild.style.width = Math.round((nomor - 1) / perkiraanTotal() * 100) + '%'
      U.isi.classList.remove('masuk'); void U.isi.offsetWidth; U.isi.classList.add('masuk')
      U.isi.innerHTML = `<span class="label-kecil">Soal ${nomor} · ${G.KAT.level.find(l => l.id === tahap).nama}</span><p class="pm-tanya">${t.tanya}</p><div class="opsi">${urut.map((i, n) => `<button class="op" role="radio" aria-checked="false" data-i="${i}"><kbd>${n + 1}</kbd><span>${t.opsi[i]}</span></button>`).join('')}</div><p class="redup kecil">Pembahasan semua soal muncul di akhir tes.</p>`
      const bs = [...U.isi.querySelectorAll('.op')]
      bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-checked', x === b)); pilih = Number(b.dataset.i); U.aksi.disabled = false })
      U.aksi.disabled = true; U.aksi.textContent = 'Jawab'; U.lewat.hidden = false
      U.tombol = n => bs[n] && bs[n].click()
    }
    const jawab = benar => {
      const t = bank[tahap][idx]
      catatan.push({ t, pilih: benar === null ? null : pilih, ok: !!benar })
      skor[tahap][1]++; if (benar) skor[tahap][0]++
      idx++
      if (idx < Math.min(2, bank[tahap].length)) return tampil()
      const [b] = skor[tahap]
      if (tahap === 'dasar' && b >= 1 && bank.menengah.length) { tahap = 'menengah'; idx = 0; return tampil() }
      if (tahap === 'menengah' && b >= 2 && bank.mahir.length) { tahap = 'mahir'; idx = 0; return tampil() }
      selesai()
    }
    U.aksi.onclick = () => jawab(pilih === bank[tahap][idx].benar)
    U.lewat.onclick = () => { pilih = null; jawab(null) }
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
      const pembahasan = catatan.map((c, i) => `<li class="${c.ok ? 'ok' : 'bad'}"><div class="tb-kepala">${ikon(c.ok ? 'cek' : 'x', 15)}<b>Soal ${i + 1}.</b> ${c.t.tanya}</div><p>Jawaban bener: <b>${c.t.opsi[c.t.benar]}</b>${c.ok ? '' : `<br><span class="redup">Jawabanmu: ${c.pilih == null ? 'ga dijawab' : c.t.opsi[c.pilih]}</span>`}</p>${c.t.jelas ? `<p class="redup kecil">${c.t.jelas}</p>` : ''}</li>`).join('')
      el.innerHTML = `<div class="pemain beres-layar" style="--garis:${warna}"><main class="pm-isi"><div class="beres">
        <span class="label-kecil">Hasil tes penempatan</span>
        <h1>Level kamu: ${lv.nama}</h1><p class="redup">${lv.ket}.</p>
        <div class="tes-hasil">${baris}</div>
        <p>${dilewati ? `${dilewati} pelajaran di bawah level kamu ditandai <b>lulus tes</b>. Tetap bisa dibuka kapan aja buat ngulang.` : 'Mulai dari pelajaran pertama biar fondasinya kuat.'}</p>
        ${!lanjut ? `<p class="redup">Materi level ${lv.nama} buat skill ini lagi disiapin. Sementara, coba skill lain di peta kamu.</p>` : ''}
        <details class="panel tes-bahas" open><summary>${ikon('lampu', 15)} Pembahasan ${catatan.length} soal tadi</summary><ol>${pembahasan}</ol></details>
        <div class="beres-tombol">${lanjut ? `<button class="btn utama besar b-lanjut">Mulai: ${esc(lanjut.judul)} ${ikon('kanan', 18)}</button>` : ''}<button class="btn garis besar b-balik">Liat jalur ${esc(KAT.skill[id].pendek)}</button></div>
      </div></main></div>`
      el.querySelector('.b-balik').onclick = () => o.tutup()
      const bl = el.querySelector('.b-lanjut'); if (bl) { bl.onclick = () => o.lanjut(lanjut.id); bl.focus() }
    }
    tampil()
  }

  // Satu langkah lepas (buat demo di halaman depan), dengan tombol Cek sendiri.
  const demo = (el, s, selesai) => {
    el.innerHTML = '<div class="demo-langkah"></div><div class="demo-bawah"><div class="demo-umpan" aria-live="polite"></div><button class="btn utama demo-cek" disabled>Cek</button></div><div class="demo-bahas"></div>'
    const isi = el.querySelector('.demo-langkah'), btn = el.querySelector('.demo-cek'), um = el.querySelector('.demo-umpan'), bh = el.querySelector('.demo-bahas')
    let r, beres = false
    const tunjuk = h => {
      if (h.tolak) return G.toast(h.tolak)
      um.className = 'demo-umpan ' + (h.ok ? 'ok' : 'bad')
      um.innerHTML = `${ikon(h.ok ? 'cek' : 'x', 18)}<span><b>${h.pesan}</b>${h.jelas ? ' ' + h.jelas : ''}</span>`
      bh.innerHTML = h.bahas ? `<details class="bahas ${h.ok ? 'ok' : 'bad'}" ${h.ok ? '' : 'open'}><summary>${ikon('lampu', 16)} <span>Pembahasan</span></summary><div class="bahas-isi">${h.bahas}</div></details>` : ''
      const pk = bh.querySelector('.pakai-kunci'); if (pk) pk.onclick = () => { r.isiKunci && r.isiKunci(); bh.innerHTML = ''; um.innerHTML = ''; btn.textContent = 'Cek'; btn.disabled = false }
      if (h.ok) { beres = true; btn.textContent = 'Ulang'; btn.disabled = false; selesai && selesai() }
      else if (r.ulangDiTempat) { btn.textContent = 'Cek lagi' } else { beres = true; btn.textContent = 'Ulang'; btn.disabled = false }
    }
    const pasang = () => { beres = false; um.className = 'demo-umpan'; um.innerHTML = ''; bh.innerHTML = ''; btn.textContent = 'Cek'; autoFokus = false; r = R[s.t](s, isi, { siap: v => { btn.disabled = !v }, selesai: tunjuk }, { kunci: 'demo' }); autoFokus = true; btn.hidden = r.mode === 'sendiri' }
    btn.onclick = () => beres ? pasang() : tunjuk(r.cek())
    pasang()
  }

  return { pelajaran, tes, ambilDB, demo, _uji: { pecahKlausa, bedahSQL, formatSQL, diagnosaSQL } }
})()
