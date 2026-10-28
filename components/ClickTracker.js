'use client';

import { useEffect } from 'react';

/* นับคลิกปุ่มโทร / LINE / ขอเส้นทาง ทั้งเว็บ ด้วยตัวดักคลิกตัวเดียว (ไม่ต้องแก้ทีละปุ่ม)
   บอกได้เองว่ากดจากหน้าไหน ส่วนไหนของหน้า และปุ่มเขียนว่าอะไร → ดูยอดที่ /admin/clicks
   ปุ่มไหนอยากตั้งชื่อเอง ใส่ data-track="ชื่อ" ที่ปุ่มหรือกล่องที่ครอบ
   ไม่ใช้คุกกี้ ไม่เก็บข้อมูลส่วนตัว ส่งด้วย sendBeacon (ไม่หน่วงตอนเปิดแอปโทร/LINE) */

const PLACES = [
  ['[data-track]', null],
  ['.floating-cta', 'ปุ่มลอยมุมจอ'],
  ['.navbar', 'เมนูด้านบน'],
  ['footer', 'ท้ายเว็บ'],
  ['#hero', 'หัวหน้าแรก'],
  ['#contact', 'ส่วนติดต่อ/สาขา (หน้าแรก)'],
  ['#process', 'ขั้นตอน (หน้าแรก)'],
  ['.blog-article-cta', 'กล่องท้ายหน้า'],
  ['.page-header', 'หัวหน้าบริการ'],
  ['.blog-article-header', 'หัวหน้า'],
  ['section[id]', null],
];

function typeOf(href) {
  if (href.startsWith('tel:')) return 'call';
  if (/line\.me|lin\.ee/i.test(href)) return 'line';
  if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href)) return 'map';
  return null;
}

function placeOf(a) {
  for (const [sel, name] of PLACES) {
    const el = a.closest(sel);
    if (!el) continue;
    if (sel === '[data-track]') return el.dataset.track;
    if (name) return name;
    return `ส่วน #${el.id}`;
  }
  return 'เนื้อหา';
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const type = typeOf(a.getAttribute('href') || '');
      if (!type) return;
      const label = (a.getAttribute('aria-label') || a.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      const data = JSON.stringify({ type, page: location.pathname, place: placeOf(a), label });
      try {
        if (!navigator.sendBeacon?.('/api/track', new Blob([data], { type: 'application/json' }))) {
          fetch('/api/track', { method: 'POST', body: data, keepalive: true }).catch(() => {});
        }
      } catch {
        // นับไม่ได้ก็ไม่เป็นไร ปุ่มต้องทำงานตามปกติ
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
