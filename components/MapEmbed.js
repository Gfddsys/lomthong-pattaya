"use client";

import { useState } from "react";

/* แผนที่แบบ "กดโหลด" (facade)
   - ก่อนกด: โชว์กล่องเบาๆ ไม่โหลด Google Maps เลย → เว็บโหลดเร็วขึ้นมากบนมือถือ
   - กดแล้ว: ค่อยโหลด iframe แผนที่จริง
   ช่วยคะแนน PageSpeed มือถือได้เยอะ เพราะ Google Maps embed หนักมาก */
export default function MapEmbed({ src, title, label = "ดูแผนที่ร้าน" }) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      className="map-facade"
      onClick={() => setShow(true)}
      aria-label={`โหลดแผนที่ ${title}`}
    >
      <svg width="46" height="46" viewBox="0 0 24 24" fill="#8a6a1f" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
      </svg>
      <span className="map-facade-text">{label}</span>
      <span className="map-facade-sub">แตะเพื่อเปิดแผนที่ Google</span>
    </button>
  );
}
