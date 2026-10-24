'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { CONTACT } from '@/data/contact';
import { hoursOn } from '@/data/branches';

/* ============================================
   หาสาขาที่ใกล้ที่สุด + สถานะเปิด/ปิดตอนนี้ (หน้า "ร้านหลอมทองใกล้ฉัน")
   ============================================
   - ตำแหน่งลูกค้าใช้คำนวณระยะในเครื่องเท่านั้น ไม่ส่งไปที่ไหน และขอเฉพาะตอนกดปุ่ม
   - ระยะเป็นระยะเส้นตรง ระยะขับรถจริงไกลกว่านี้ → บอกลูกค้าชัดเจน
   - สถานะเปิด/ปิดคิดตามเวลาไทย (Asia/Bangkok) ฝั่งเครื่องลูกค้าเท่านั้น (server snapshot = null)
     เพราะเวลาฝั่ง server กับเครื่องลูกค้าไม่ตรงกัน ถ้า render ตอน SSR จะเกิด hydration mismatch
   - ร้านเปิดทุกวัน แต่บางสาขาเวลาเสาร์-อาทิตย์ต่างจากวันธรรมดา → ดูตาม schedule ใน data/branches.js
*/

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const WEEKDAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// นาทีนับจากต้นสัปดาห์ (อาทิตย์ 00:00) เวลาไทย — เป็นตัวเลขตัวเดียวให้ useSyncExternalStore เทียบค่าได้
function bangkokMinutesNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const d = WEEKDAY[parts.find((p) => p.type === 'weekday').value];
  const h = Number(parts.find((p) => p.type === 'hour').value) % 24;
  const m = Number(parts.find((p) => p.type === 'minute').value);
  return d * 1440 + h * 60 + m;
}

function openStatus(b, weekMin) {
  const day = Math.floor(weekMin / 1440);
  const now = weekMin % 1440;
  const today = hoursOn(b, day);
  const open = toMin(today.opens);
  const close = toMin(today.closes);
  if (now < open) return { open: false, text: `ยังไม่เปิด · เปิด ${today.opens} น.` };
  if (now < close) {
    const left = close - now;
    return { open: true, text: left <= 60 ? `เปิดอยู่ · ใกล้ปิด (${today.closes} น.)` : `เปิดอยู่ · ปิด ${today.closes} น.` };
  }
  return { open: false, text: `ปิดแล้ว · เปิดพรุ่งนี้ ${hoursOn(b, (day + 1) % 7).opens} น.` };
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// นาฬิกาเวลาไทย อัปเดตทุก 30 วินาที (ค่าเป็นนาที จึงเปลี่ยนจริงนาทีละครั้ง)
function subscribeClock(onChange) {
  const t = setInterval(onChange, 30_000);
  return () => clearInterval(t);
}

export default function NearestBranch({ branches }) {
  const now = useSyncExternalStore(subscribeClock, bangkokMinutesNow, () => null);
  const [geo, setGeo] = useState({ state: 'idle' }); // idle | asking | done | denied | unsupported

  function locate() {
    if (!('geolocation' in navigator)) {
      setGeo({ state: 'unsupported' });
      return;
    }
    setGeo({ state: 'asking' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const km = Object.fromEntries(branches.map((b) => [b.slug, distanceKm(latitude, longitude, b.lat, b.lng)]));
        setGeo({ state: 'done', km });
      },
      () => setGeo({ state: 'denied' }),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }

  const list =
    geo.state === 'done' ? [...branches].sort((a, b) => geo.km[a.slug] - geo.km[b.slug]) : branches;
  const nearestSlug = geo.state === 'done' ? list[0].slug : null;

  return (
    <div className="near-finder">
      <div className="near-finder-bar">
        <button type="button" className="btn btn-primary near-locate" onClick={locate} disabled={geo.state === 'asking'}>
          {geo.state === 'asking' ? 'กำลังหาตำแหน่ง…' : '📍 หาสาขาที่ใกล้ฉันที่สุด'}
        </button>
        <p className="near-finder-note" aria-live="polite">
          {geo.state === 'idle' && 'กดปุ่มแล้วอนุญาตตำแหน่ง ระบบคำนวณในเครื่องของคุณ ไม่ได้ส่งตำแหน่งไปที่ไหน'}
          {geo.state === 'asking' && 'รอสักครู่…'}
          {geo.state === 'done' && `สาขาที่ใกล้คุณที่สุดคือ${list[0].shortName} (ระยะเส้นตรงประมาณ ${geo.km[list[0].slug].toFixed(1)} กม.)`}
          {geo.state === 'denied' && 'ไม่ได้รับอนุญาตตำแหน่ง ดูตารางระยะทางจากย่านต่าง ๆ ด้านล่างแทนได้'}
          {geo.state === 'unsupported' && 'เครื่องนี้หาตำแหน่งไม่ได้ ดูตารางระยะทางจากย่านต่าง ๆ ด้านล่างแทนได้'}
        </p>
      </div>

      <div className="near-cards">
        {list.map((b) => {
          const st = now === null ? null : openStatus(b, now);
          const isNearest = b.slug === nearestSlug;
          return (
            <article key={b.slug} className={`near-card${isNearest ? ' is-nearest' : ''}`}>
              {isNearest && <span className="near-badge">ใกล้คุณที่สุด</span>}
              <h3>
                <Link href={`/branch/${b.slug}`} prefetch={false}>{b.shortName}</Link>
              </h3>
              <p className="near-status" data-open={st ? String(st.open) : undefined}>
                {st ? st.text : b.hours}
              </p>
              <ul className="near-facts">
                <li>{b.address}</li>
                <li>{b.hours}</li>
                {geo.state === 'done' && <li>ห่างจากคุณประมาณ {geo.km[b.slug].toFixed(1)} กม. (เส้นตรง)</li>}
              </ul>
              <div className="near-actions">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}&destination_place_id=${b.placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  🧭 นำทาง
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-outline">
                  📞 โทร
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
