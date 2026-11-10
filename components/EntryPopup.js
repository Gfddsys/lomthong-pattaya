'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { POPUP } from '@/data/popup';

/* ป๊อปอัปรูปตอนเข้าเว็บ (ตั้งค่าที่ data/popup.js)
   ปิดได้ 3 ทาง: กดพื้นที่ว่างรอบรูป · ปุ่มกากบาท (ใหญ่ 48px กดง่ายบนมือถือ) · ปุ่ม Esc
   ขึ้นครั้งเดียวต่อรอบการเข้าเว็บ (sessionStorage) ไม่ขึ้นในหน้าหลังบ้าน /admin และหน้ารีวิว */
const KEY = 'entry-popup-seen';

export default function EntryPopup() {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const skip = !POPUP.enabled || pathname.startsWith('/admin') || pathname.startsWith('/review') || pathname.startsWith('/embed');

  useEffect(() => {
    if (skip) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      // อ่าน sessionStorage ไม่ได้ (โหมดส่วนตัวบางเครื่อง) ก็แสดงตามปกติ
    }
    const t = setTimeout(() => setOpen(true), POPUP.delayMs);
    return () => clearTimeout(t);
  }, [skip]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      // ไม่เป็นไร
    }
  }

  if (!open) return null;

  // eslint-disable-next-line @next/next/no-img-element -- รูปโปรที่ร้านส่งมา แสดงขนาดเต็มตามจอ
  const img = <img src={POPUP.image} alt={POPUP.alt} width={POPUP.width} height={POPUP.height} className="entry-popup-img" />;

  return (
    <div className="entry-popup" role="dialog" aria-modal="true" aria-label={POPUP.alt} onClick={close}>
      <div className="entry-popup-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="entry-popup-close" onClick={close} aria-label="ปิด">
          <span aria-hidden="true">×</span>
        </button>
        {POPUP.href ? (
          <a href={POPUP.href} target="_blank" rel="noopener noreferrer" data-track="ป๊อปอัปตอนเข้าเว็บ" onClick={close}>
            {img}
          </a>
        ) : (
          img
        )}
      </div>
      <p className="entry-popup-hint">แตะตรงไหนก็ได้เพื่อปิด</p>
    </div>
  );
}
