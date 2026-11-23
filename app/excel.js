// Mesin rumus spreadsheet mini. Ngitung rumus Excel beneran di atas tabel kecil (tanpa library).
// Dukung: + - * / ^ & = <> < > <= >=, sel (A1, $A$1), rentang (A1:B5), dan fungsi umum.
window.GAS_EXCEL = (() => {
  const kolomKeIdx = s => s.replace(/\$/g, '').toUpperCase().split('').reduce((n, c) => n * 26 + (c.charCodeAt(0) - 64), 0) - 1
  const idxKeKolom = i => { let s = ''; i++; while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26) } return s }
  const urai = ref => { const m = /^\$?([A-Z]+)\$?(\d+)$/i.exec(ref); return m ? { c: kolomKeIdx(m[1]), r: Number(m[2]) - 1 } : null }

  class GalatRumus extends Error {}

  const tokenisasi = src => {
    const t = []; let i = 0
    while (i < src.length) {
      const c = src[i]
      if (/\s/.test(c)) { i++; continue }
      if (c === '"') { let j = i + 1, s = ''; while (j < src.length && !(src[j] === '"' && src[j + 1] !== '"')) { if (src[j] === '"') j++; s += src[j]; j++ } if (j >= src.length) throw new GalatRumus('Tanda kutip belum ditutup'); t.push({ k: 'str', v: s }); i = j + 1; continue }
      const num = /^\d+(\.\d+)?/.exec(src.slice(i)); if (num) { t.push({ k: 'num', v: Number(num[0]) }); i += num[0].length; continue }
      const id = /^\$?[A-Za-z]+\$?\d*(:\$?[A-Za-z]+\$?\d+)?/.exec(src.slice(i))
      if (id) {
        const s = id[0]
        if (src[i + s.length] === '(' && /^[A-Za-z.]+$/.test(s)) { t.push({ k: 'fn', v: s.toUpperCase() }); i += s.length; continue }
        if (/^(TRUE|FALSE)$/i.test(s)) { t.push({ k: 'bool', v: s.toUpperCase() === 'TRUE' }); i += s.length; continue }
        if (s.includes(':')) { t.push({ k: 'range', v: s.toUpperCase() }); i += s.length; continue }
        if (/\d/.test(s)) { t.push({ k: 'ref', v: s.toUpperCase() }); i += s.length; continue }
        throw new GalatRumus(`"${s}" ga dikenal. Cek nama fungsi atau alamat sel.`)
      }
      const op2 = src.slice(i, i + 2); if (['<>', '<=', '>='].includes(op2)) { t.push({ k: 'op', v: op2 }); i += 2; continue }
      if ('+-*/^&=<>(),;%'.includes(c)) { t.push({ k: c === ',' || c === ';' ? 'sep' : c === '(' || c === ')' ? c : 'op', v: c }); i++; continue }
      throw new GalatRumus(`Karakter "${c}" ga bisa dipakai di rumus`)
    }
    return t
  }

  const parse = tokens => {
    let p = 0
    const lihat = () => tokens[p], ambil = () => tokens[p++]
    const harap = (k, v) => { const x = ambil(); if (!x || x.k !== k || (v && x.v !== v)) throw new GalatRumus(k === ')' ? 'Kurang tanda kurung tutup )' : k === '(' ? 'Kurang tanda kurung buka (' : 'Rumus ga lengkap'); return x }
    const biner = (bawah, ops) => () => { let n = bawah(); while (lihat() && lihat().k === 'op' && ops.includes(lihat().v)) { const op = ambil().v; n = { t: 'bin', op, a: n, b: bawah() } } return n }
    const primer = () => {
      const x = ambil(); if (!x) throw new GalatRumus('Rumus berhenti di tengah jalan')
      if (x.k === 'num' || x.k === 'str' || x.k === 'bool') return { t: 'lit', v: x.v }
      if (x.k === 'ref') return { t: 'ref', v: x.v }
      if (x.k === 'range') return { t: 'range', v: x.v }
      if (x.k === '(') { const n = banding(); harap(')'); return n }
      if (x.k === 'op' && (x.v === '-' || x.v === '+')) { const n = pangkat(); return x.v === '-' ? { t: 'neg', a: n } : n }
      if (x.k === 'fn') { harap('('); const args = []; if (!(lihat() && lihat().k === ')')) { args.push(banding()); while (lihat() && lihat().k === 'sep') { ambil(); args.push(banding()) } } harap(')'); return { t: 'fn', v: x.v, args } }
      throw new GalatRumus(`Ada "${x.v}" di tempat yang salah`)
    }
    const persen = () => { let n = primer(); while (lihat() && lihat().v === '%') { ambil(); n = { t: 'bin', op: '/', a: n, b: { t: 'lit', v: 100 } } } return n }
    const pangkat = biner(persen, ['^'])
    const kali = biner(pangkat, ['*', '/'])
    const tambah = biner(kali, ['+', '-'])
    const sambung = biner(tambah, ['&'])
    const banding = biner(sambung, ['=', '<>', '<', '>', '<=', '>='])
    const n = banding(); if (p < tokens.length) throw new GalatRumus(`Ada sisa "${tokens[p].v}" yang ga kebaca`)
    return n
  }

  const datar = v => Array.isArray(v) ? v.flat(2) : [v]
  const angka = v => typeof v === 'number' ? v : typeof v === 'boolean' ? Number(v) : v === '' || v == null ? 0 : isNaN(Number(v)) ? (() => { throw new GalatRumus(`"${v}" bukan angka`) })() : Number(v)
  const angkaDari = arr => datar(arr).filter(x => typeof x === 'number')
  const cocokKriteria = (nilai, krit) => {
    if (typeof krit === 'number') return nilai === krit
    const m = /^(<>|<=|>=|<|>|=)?(.*)$/.exec(String(krit)); const op = m[1] || '=', target = m[2]
    const tAngka = target !== '' && !isNaN(Number(target)) ? Number(target) : null
    if (tAngka !== null && typeof nilai === 'number') return { '=': nilai === tAngka, '<>': nilai !== tAngka, '<': nilai < tAngka, '>': nilai > tAngka, '<=': nilai <= tAngka, '>=': nilai >= tAngka }[op]
    const re = new RegExp('^' + target.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i')
    const sama = re.test(String(nilai ?? ''))
    return op === '<>' ? !sama : op === '=' ? sama : false
  }
  const pasanganKriteria = (args, mulai) => { const p = []; for (let i = mulai; i < args.length; i += 2) p.push([datar(args[i]), args[i + 1]]); return p }
  const lolosSemua = (pasangan, i) => pasangan.every(([r, k]) => cocokKriteria(r[i], k))

  const FUNGSI = {
    SUM: a => angkaDari(a).reduce((s, x) => s + x, 0),
    AVERAGE: a => { const n = angkaDari(a); if (!n.length) throw new GalatRumus('#DIV/0! (ga ada angka)'); return n.reduce((s, x) => s + x, 0) / n.length },
    MIN: a => Math.min(...angkaDari(a)), MAX: a => Math.max(...angkaDari(a)),
    COUNT: a => angkaDari(a).length, COUNTA: a => datar(a).filter(x => x !== '' && x != null).length,
    COUNTBLANK: a => datar(a).filter(x => x === '' || x == null).length,
    COUNTIF: ([r, k]) => datar(r).filter(x => cocokKriteria(x, k)).length,
    COUNTIFS: a => { const ps = pasanganKriteria(a, 0); return ps[0][0].filter((_, i) => lolosSemua(ps, i)).length },
    SUMIF: ([r, k, s]) => { const R = datar(r), S = datar(s ?? r); return R.reduce((t, x, i) => t + (cocokKriteria(x, k) ? angka(S[i]) : 0), 0) },
    SUMIFS: ([s, ...rest]) => { const S = datar(s), ps = pasanganKriteria(rest, 0); return S.reduce((t, x, i) => t + (lolosSemua(ps, i) ? angka(x) : 0), 0) },
    AVERAGEIF: ([r, k, s]) => { const R = datar(r), S = datar(s ?? r); const v = R.map((x, i) => cocokKriteria(x, k) ? angka(S[i]) : null).filter(x => x !== null); if (!v.length) throw new GalatRumus('#DIV/0!'); return v.reduce((a, b) => a + b, 0) / v.length },
    IF: ([c, a, b]) => (c ? a : b ?? false),
    IFERROR: ([v, alt]) => v instanceof GalatRumus ? alt : v,
    AND: a => datar(a).every(Boolean), OR: a => datar(a).some(Boolean), NOT: ([a]) => !a,
    ROUND: ([x, n]) => { const f = 10 ** angka(n ?? 0); return Math.round(angka(x) * f) / f },
    ROUNDUP: ([x, n]) => { const f = 10 ** angka(n ?? 0); return Math.ceil(angka(x) * f) / f },
    ROUNDDOWN: ([x, n]) => { const f = 10 ** angka(n ?? 0); return Math.floor(angka(x) * f) / f },
    ABS: ([x]) => Math.abs(angka(x)),
    LEN: ([s]) => String(s ?? '').length, LEFT: ([s, n]) => String(s).slice(0, n ?? 1), RIGHT: ([s, n]) => String(s).slice(-(n ?? 1)),
    MID: ([s, a, n]) => String(s).substr(angka(a) - 1, angka(n)), UPPER: ([s]) => String(s).toUpperCase(), LOWER: ([s]) => String(s).toLowerCase(),
    PROPER: ([s]) => String(s).toLowerCase().replace(/\b\w/g, c => c.toUpperCase()), TRIM: ([s]) => String(s).trim().replace(/\s+/g, ' '),
    CONCAT: a => datar(a).join(''), CONCATENATE: a => datar(a).join(''),
    VLOOKUP: ([cari, tabel, kol, aprox]) => {
      if (aprox !== false && aprox !== 0) throw new GalatRumus('Tambahin FALSE di argumen terakhir biar nyari yang persis sama')
      const baris = tabel.find(r => String(r[0]).toLowerCase() === String(cari).toLowerCase()); if (!baris) throw new GalatRumus('#N/A (ga ketemu)'); return baris[angka(kol) - 1]
    },
    XLOOKUP: ([cari, rCari, rHasil, kosong]) => {
      const A = datar(rCari), B = datar(rHasil); const i = A.findIndex(x => String(x).toLowerCase() === String(cari).toLowerCase())
      if (i < 0) { if (kosong !== undefined) return kosong; throw new GalatRumus('#N/A (ga ketemu)') } return B[i]
    },
    MATCH: ([cari, r]) => { const i = datar(r).findIndex(x => String(x).toLowerCase() === String(cari).toLowerCase()); if (i < 0) throw new GalatRumus('#N/A'); return i + 1 },
    INDEX: ([r, b, k]) => { const rows = Array.isArray(r[0]) ? r : r.map(x => [x]); return rows[angka(b) - 1]?.[angka(k ?? 1) - 1] },
    AVERAGEIFS: ([s, ...rest]) => { const S = datar(s), ps = pasanganKriteria(rest, 0); const v = S.filter((_, i) => lolosSemua(ps, i)).map(angka); if (!v.length) throw new GalatRumus('#DIV/0! (ga ada yang lolos syarat)'); return v.reduce((a, b) => a + b, 0) / v.length },
    MAXIFS: ([s, ...rest]) => { const S = datar(s), ps = pasanganKriteria(rest, 0); const v = S.filter((_, i) => lolosSemua(ps, i)).map(angka); return v.length ? Math.max(...v) : 0 },
    MINIFS: ([s, ...rest]) => { const S = datar(s), ps = pasanganKriteria(rest, 0); const v = S.filter((_, i) => lolosSemua(ps, i)).map(angka); return v.length ? Math.min(...v) : 0 },
    MEDIAN: a => { const n = angkaDari(a).sort((x, y) => x - y); if (!n.length) throw new GalatRumus('#NUM!'); const m = Math.floor(n.length / 2); return n.length % 2 ? n[m] : (n[m - 1] + n[m]) / 2 },
    LARGE: ([r, k]) => { const n = angkaDari(r).sort((x, y) => y - x); const v = n[angka(k) - 1]; if (v === undefined) throw new GalatRumus('#NUM!'); return v },
    SMALL: ([r, k]) => { const n = angkaDari(r).sort((x, y) => x - y); const v = n[angka(k) - 1]; if (v === undefined) throw new GalatRumus('#NUM!'); return v },
    SUMPRODUCT: a => { const L = a.map(datar); return L[0].reduce((t, _, i) => t + L.reduce((p, l) => p * angka(l[i]), 1), 0) },
    SUBSTITUTE: ([s, lama, baru]) => String(s).split(String(lama)).join(String(baru)),
    FIND: ([cari, s]) => { const i = String(s).indexOf(String(cari)); if (i < 0) throw new GalatRumus('#VALUE! (ga ketemu)'); return i + 1 },
    SEARCH: ([cari, s]) => { const i = String(s).toLowerCase().indexOf(String(cari).toLowerCase()); if (i < 0) throw new GalatRumus('#VALUE! (ga ketemu)'); return i + 1 },
    VALUE: ([s]) => { const v = Number(String(s).replace(/\./g, '').replace(',', '.')); if (isNaN(v)) throw new GalatRumus('#VALUE!'); return v },
    INT: ([x]) => Math.floor(angka(x)), MOD: ([x, y]) => { const b = angka(y); if (!b) throw new GalatRumus('#DIV/0!'); return ((angka(x) % b) + b) % b },
    IFS: a => { for (let i = 0; i < a.length; i += 2) if (a[i]) return a[i + 1]; throw new GalatRumus('#N/A (ga ada syarat yang terpenuhi)') },
  }
  // Fungsi yang argumennya boleh error (dievaluasi pelan-pelan).
  const MALAS = { IF: true, IFERROR: true }

  const buatEvaluator = sel => {
    const ambilSel = ref => { const u = urai(ref); if (!u) throw new GalatRumus(`Alamat ${ref} salah`); const v = sel(u.r, u.c); return v === undefined ? '' : v }
    const ambilRentang = rng => { const [a, b] = rng.split(':').map(urai); const out = []; for (let r = Math.min(a.r, b.r); r <= Math.max(a.r, b.r); r++) { const row = []; for (let c = Math.min(a.c, b.c); c <= Math.max(a.c, b.c); c++) row.push(sel(r, c) ?? ''); out.push(row) } return out }
    const ev = n => {
      switch (n.t) {
        case 'lit': return n.v
        case 'ref': return ambilSel(n.v)
        case 'range': return ambilRentang(n.v)
        case 'neg': return -angka(ev(n.a))
        case 'bin': {
          const a = ev(n.a), b = ev(n.b)
          switch (n.op) {
            case '+': return angka(a) + angka(b)
            case '-': return angka(a) - angka(b)
            case '*': return angka(a) * angka(b)
            case '/': if (angka(b) === 0) throw new GalatRumus('#DIV/0! (dibagi nol)'); return angka(a) / angka(b)
            case '^': return angka(a) ** angka(b)
            case '&': return String(a) + String(b)
            default: {
              const x = typeof a === 'string' ? a.toLowerCase() : a, y = typeof b === 'string' ? b.toLowerCase() : b
              return { '=': x === y, '<>': x !== y, '<': x < y, '>': x > y, '<=': x <= y, '>=': x >= y }[n.op]
            }
          }
        }
        case 'fn': {
          const f = FUNGSI[n.v]; if (!f) throw new GalatRumus(`Fungsi ${n.v} belum didukung di latihan ini`)
          if (n.v === 'IF') { const c = ev(n.args[0]); return c ? ev(n.args[1]) : n.args[2] ? ev(n.args[2]) : false }
          if (n.v === 'IFERROR') { try { return ev(n.args[0]) } catch (e) { if (e instanceof GalatRumus) return ev(n.args[1]); throw e } }
          return f(n.args.map(ev))
        }
      }
    }
    return ev
  }

  // Hitung rumus (string diawali "=") di atas data 2D (baris 0 = header di baris 1 Excel).
  const hitung = (rumus, data) => {
    const src = String(rumus || '').trim()
    if (!src.startsWith('=')) throw new GalatRumus('Rumus harus diawali tanda =')
    const ev = buatEvaluator((r, c) => data[r]?.[c])
    return ev(parse(tokenisasi(src.slice(1))))
  }
  const tampil = v => typeof v === 'number' ? (Number.isInteger(v) ? v.toLocaleString('id-ID') : v.toLocaleString('id-ID', { maximumFractionDigits: 2 })) : typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : String(v ?? '')
  const sama = (a, b) => typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) < 1e-6 : String(a).toLowerCase() === String(b).toLowerCase()

  // Buat pembahasan: pohon rumus, nilai tiap bagian, dan teks balik dari pohon.
  const pohon = rumus => parse(tokenisasi(String(rumus).trim().replace(/^=/, '')))
  const nilaiNode = (node, data) => buatEvaluator((r, c) => data[r]?.[c])(node)
  const PRIO = { '=': 1, '<>': 1, '<': 1, '>': 1, '<=': 1, '>=': 1, '&': 2, '+': 3, '-': 3, '*': 4, '/': 4, '^': 5 }
  const teks = (n, induk = 0) => {
    switch (n.t) {
      case 'lit': return typeof n.v === 'string' ? `"${n.v}"` : typeof n.v === 'boolean' ? (n.v ? 'TRUE' : 'FALSE') : String(n.v)
      case 'ref': case 'range': return n.v
      case 'neg': return '-' + teks(n.a, 9)
      case 'fn': return `${n.v}(${n.args.map(a => teks(a)).join(',')})`
      case 'bin': { const p = PRIO[n.op], s = `${teks(n.a, p)}${n.op}${teks(n.b, p + 1)}`; return p < induk ? `(${s})` : s }
    }
    return ''
  }
  // Geser alamat relatif sebanyak k baris (kayak nyalin rumus ke bawah). Alamat yang dikunci $ ga ikut geser.
  const geser = (rumus, k) => String(rumus).split('"').map((seg, i) => i % 2 ? seg : seg.replace(/(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![\d(])/g, (m, d1, col, d2, row) => d2 ? m : d1 + col + d2 + (Number(row) + k))).join('"')

  return { hitung, tampil, sama, urai, idxKeKolom, GalatRumus, FUNGSI: Object.keys(FUNGSI), pohon, nilaiNode, teks, geser }
})()
