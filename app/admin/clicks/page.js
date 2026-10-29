import { createHash, timingSafeEqual } from 'crypto';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClicks, STORE_READY } from '@/lib/clickStore';

/* ============================================
   หลังบ้าน: ลูกค้ากดปุ่มโทร / LINE / ขอเส้นทาง กี่ครั้ง จากปุ่มไหน หน้าไหน
   ============================================
   เปิดที่ /admin/clicks แล้วกรอกรหัส (STATS_KEY ใน Vercel → Environment Variables) ครั้งเดียว เครื่องนั้นจำไว้ 180 วัน
   ไม่ใส่รหัสในลิงก์ → รหัสไม่ค้างในประวัติเบราว์เซอร์และ log ของ Vercel · คุกกี้นี้มีแค่เครื่องของร้าน ลูกค้าบนเว็บไม่โดน
   ข้อมูลจาก components/ClickTracker.js → app/api/track → lib/clickStore.js
   ไม่ให้ Google เก็บหน้านี้ (noindex + robots.txt) */

export const metadata = { title: 'ยอดคลิกปุ่มติดต่อ', robots: { index: false, follow: false } };

const TYPE_NAME = { call: 'โทร', line: 'LINE', map: 'ขอเส้นทาง' };
const TYPES = Object.keys(TYPE_NAME);
const RANGES = [7, 30, 90];

const COOKIE = 'stats_auth';
// คุกกี้เก็บค่าแฮชของรหัส ไม่เก็บรหัสตรงๆ · เทียบแบบเวลาคงที่ (เดารหัสจากเวลาตอบไม่ได้)
const token = (key) => createHash('sha256').update(`clicks-admin:${key}`).digest('hex');
const same = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const COOKIE_OPTS = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/admin' };

async function login(formData) {
  'use server';
  const key = process.env.STATS_KEY;
  if (key && same(token(String(formData.get('key') ?? '')), token(key))) {
    (await cookies()).set(COOKIE, token(key), { ...COOKIE_OPTS, maxAge: 180 * 86400 });
    redirect('/admin/clicks');
  }
  await new Promise((r) => setTimeout(r, 1000)); // เดารหัสรัวๆ ได้ช้าลง
  redirect('/admin/clicks?wrong=1');
}

async function logout() {
  'use server';
  (await cookies()).set(COOKIE, '', { ...COOKIE_OPTS, maxAge: 0 });
  redirect('/admin/clicks');
}

const box = { padding: '0.7rem 1rem', borderRadius: 8 };
const field = { font: 'inherit', fontSize: '1.05rem', padding: '0.7rem 0.9rem', border: '1px solid #cdbf9f', borderRadius: 10 };
const button = { font: 'inherit', fontWeight: 700, padding: '0.75rem 1rem', border: 0, borderRadius: 10, background: '#2b2418', color: '#fff', cursor: 'pointer' };

function Login({ wrong, noKey }) {
  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '8rem 1rem 4rem', color: '#2b2418' }}>
      <h1 style={{ marginBottom: '0.3rem' }}>ยอดคลิกปุ่มติดต่อ</h1>
      <p style={{ color: '#6b604c', marginTop: 0 }}>หน้านี้สำหรับร้านเท่านั้น</p>
      {noKey ? (
        <p style={{ ...box, background: '#fff4d6' }}>ยังไม่ได้ตั้งรหัส STATS_KEY ใน Vercel → Settings → Environment Variables</p>
      ) : (
        <form action={login} style={{ display: 'grid', gap: '0.7rem', marginTop: '1.5rem' }}>
          <label htmlFor="key" style={{ fontWeight: 700 }}>รหัสผ่าน</label>
          <input id="key" name="key" type="password" required autoComplete="current-password" style={field} />
          {wrong && <p role="alert" style={{ ...box, background: '#fde2e2', margin: 0 }}>รหัสไม่ถูก ลองใหม่อีกครั้ง</p>}
          <button type="submit" style={button}>เข้าดูยอด</button>
          <p style={{ color: '#6b604c', fontSize: '0.9rem', margin: 0 }}>กรอกครั้งเดียว เครื่องนี้จะจำไว้ 180 วัน</p>
        </form>
      )}
    </main>
  );
}

const cell = { padding: '0.45rem 0.6rem', borderBottom: '1px solid #e7e2d6', textAlign: 'left', verticalAlign: 'top' };
const num = { ...cell, textAlign: 'right', fontVariantNumeric: 'tabular-nums' };

function sum(rows, keyFn) {
  const m = new Map();
  for (const r of rows) {
    const k = keyFn(r);
    const v = m.get(k) ?? { call: 0, line: 0, map: 0, total: 0, sample: r };
    v[r.type] = (v[r.type] ?? 0) + r.count;
    v.total += r.count;
    m.set(k, v);
  }
  return [...m.entries()].sort((a, b) => b[1].total - a[1].total);
}

function Table({ head, rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.95rem' }}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} style={{ ...(i < head.length - TYPES.length - 1 ? cell : num), background: '#f6efdc' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default async function ClickStats({ searchParams }) {
  const sp = await searchParams;
  const key = process.env.STATS_KEY;
  const devOpen = !key && process.env.NODE_ENV !== 'production';
  const saved = (await cookies()).get(COOKIE)?.value ?? '';
  if (!devOpen && !(key && same(saved, token(key)))) return <Login wrong={sp.wrong === '1'} noKey={!key} />;

  const days = RANGES.includes(Number(sp.days)) ? Number(sp.days) : 30;
  let rows = [];
  let error = '';
  try {
    rows = await getClicks(days);
  } catch (e) {
    error = String(e.message || e);
  }
  const totals = Object.fromEntries(TYPES.map((t) => [t, rows.filter((r) => r.type === t).reduce((a, r) => a + r.count, 0)]));
  const byButton = sum(rows, (r) => `${r.type}|${r.place}|${r.label}`);
  const byPage = sum(rows, (r) => r.page);
  const byDay = sum(rows, (r) => r.day).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  const q = (d) => `/admin/clicks?days=${d}`;

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '7rem 1rem 4rem', color: '#2b2418' }}>
      <h1 style={{ marginBottom: '0.3rem' }}>ยอดคลิกปุ่มติดต่อ</h1>
      <p style={{ color: '#6b604c', marginTop: 0 }}>
        นับทุกครั้งที่ลูกค้ากดปุ่มโทร ปุ่ม LINE และปุ่มขอเส้นทางบนเว็บ · เวลาไทย ·{' '}
        {RANGES.map((d) => (
          <Link key={d} href={q(d)} style={{ marginRight: '0.6rem', fontWeight: d === days ? 700 : 400 }}>
            {d} วัน
          </Link>
        ))}
      </p>
      {!STORE_READY && (
        <p style={{ ...box, background: '#fff4d6' }}>
          ยังไม่ได้เชื่อมที่เก็บข้อมูล (Upstash Redis ใน Vercel → Storage) {process.env.NODE_ENV !== 'production' && '· ตอนนี้เป็นข้อมูลทดสอบในเครื่อง'}
        </p>
      )}
      {error && <p style={{ ...box, background: '#fde2e2' }}>ดึงข้อมูลไม่สำเร็จ: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem', margin: '1.5rem 0' }}>
        {TYPES.map((t) => (
          <div key={t} style={{ border: '1px solid #e7e2d6', borderRadius: 12, padding: '1rem' }}>
            <div style={{ color: '#6b604c' }}>กด{TYPE_NAME[t]}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totals[t].toLocaleString('th-TH')}</div>
            <div style={{ color: '#6b604c', fontSize: '0.85rem' }}>ครั้ง ใน {days} วัน</div>
          </div>
        ))}
      </div>

      <h2>กดจากปุ่มไหน</h2>
      <Table
        head={['ชนิด', 'ส่วนของหน้า', 'ข้อความบนปุ่ม', 'ครั้ง']}
        rows={byButton.map(([k, v]) => (
          <tr key={k}>
            <td style={cell}>{TYPE_NAME[v.sample.type]}</td>
            <td style={cell}>{v.sample.place}</td>
            <td style={cell}>{v.sample.label || '-'}</td>
            <td style={num}>{v.total.toLocaleString('th-TH')}</td>
          </tr>
        ))}
      />

      <h2>หน้าไหนพาคนติดต่อมากที่สุด</h2>
      <Table
        head={['หน้า', ...TYPES.map((t) => TYPE_NAME[t]), 'รวม']}
        rows={byPage.map(([page, v]) => (
          <tr key={page}>
            <td style={cell}>{page}</td>
            {TYPES.map((t) => (
              <td key={t} style={num}>{v[t]}</td>
            ))}
            <td style={num}>{v.total}</td>
          </tr>
        ))}
      />

      <h2>รายวัน</h2>
      <Table
        head={['วันที่', ...TYPES.map((t) => TYPE_NAME[t]), 'รวม']}
        rows={byDay.map(([day, v]) => (
          <tr key={day}>
            <td style={cell}>{day}</td>
            {TYPES.map((t) => (
              <td key={t} style={num}>{v[t]}</td>
            ))}
            <td style={num}>{v.total}</td>
          </tr>
        ))}
      />

      <p style={{ color: '#6b604c', marginTop: '2rem', fontSize: '0.9rem' }}>
        LINE = จำนวนครั้งที่กดปุ่ม LINE บนเว็บ ไม่ใช่จำนวนคนที่แอดเพื่อนจริง (ยอดแอดจริงดูใน LINE OA Manager)
        · โทร = กดปุ่มโทรบนมือถือ (บนคอมอาจไม่ได้โทรจริง) · ยอดโทร/ขอเส้นทางจากหมุด Google ดูใน Google Business Profile
      </p>
      {key && (
        <form action={logout}>
          <button type="submit" style={{ ...button, background: '#efe7d2', color: '#2b2418' }}>ออกจากระบบ</button>
        </form>
      )}
    </main>
  );
}
