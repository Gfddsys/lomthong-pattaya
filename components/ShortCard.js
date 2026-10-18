'use client';

import { useState } from 'react';

/* การ์ดคลิปสั้นแนวตั้ง: แสดงรูปปกก่อน กดแล้วค่อยฝังตัวเล่น YouTube (โหมดไม่เก็บคุกกี้) */
export default function ShortCard({ id, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="short-card">
      <div className="short-card-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`เล่นคลิป: ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- รูปปกจาก YouTube โหลดตรงเร็วกว่าผ่าน image optimizer */}
            <img src={`https://i.ytimg.com/vi/${id}/oar2.jpg`} alt="" loading="lazy" width={405} height={720} />
            <span className="short-card-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
