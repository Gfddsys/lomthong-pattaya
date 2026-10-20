'use client';

import { useEffect, useRef } from 'react';

/* ============================================
   สไลด์รีวิวลูกค้า — เลื่อนเองต่อเนื่องแบบแถบผลงาน (Gallery) แต่ลูกค้าปัด/ลากดูเองได้
   ============================================
   - ใส่รายการซ้ำ 2 ชุด แล้วเลื่อน scrollLeft ทีละนิด พอถึงครึ่งหนึ่งกระโดดกลับ → วนไม่มีรอยต่อ
   - หยุดเมื่อชี้เมาส์/แตะ/ลาก แล้วเลื่อนต่อเองหลังปล่อย 3 วินาที
   - ไม่มีขอบจางสีขาวซ้าย-ขวา และไม่มีเงาการ์ด (ตามบรีฟ)
*/

const SPEED = 28; // พิกเซลต่อวินาที (คิดตามเวลาจริง ไม่ขึ้นกับจำนวนเฟรมของเครื่อง) ช้าพอให้อ่านทัน
const RESUME_MS = 3000;

export default function ReviewSlider({ children, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let paused = false;
    let resumeTimer = 0;
    let pos = el.scrollLeft;
    let last = 0;

    const tick = (now) => {
      const dt = last ? Math.min(now - last, 100) : 0; // กันกระโดดไกลตอนสลับแท็บกลับมา
      last = now;
      if (!paused) {
        const half = el.scrollWidth / 2;
        pos += (SPEED * dt) / 1000;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const resumeLater = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        // ถ้าลูกค้าเลื่อนเลยครึ่งไปแล้ว ดึงกลับมาในช่วงวนก่อนเลื่อนต่อ
        const half = el.scrollWidth / 2;
        pos = el.scrollLeft % half;
        el.scrollLeft = pos;
        paused = false;
      }, RESUME_MS);
    };

    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resumeLater);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeLater, { passive: true });
    el.addEventListener('focusin', pause);
    el.addEventListener('focusout', resumeLater);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', resumeLater);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeLater);
      el.removeEventListener('focusin', pause);
      el.removeEventListener('focusout', resumeLater);
    };
  }, []);

  return (
    <div className="review-slider" ref={ref} role="region" aria-label={label} tabIndex={0}>
      <div className="review-track">
        {children}
        {/* ชุดที่ 2 สำหรับวนต่อเนื่อง ซ่อนจากโปรแกรมอ่านหน้าจอ */}
        <div className="review-track-dup" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
