'use client';

import { useState, useEffect } from 'react';
import { CONTACT } from '@/data/contact';

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={CONTACT.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-cta"
      aria-label="ประเมินราคาฟรีผ่าน LINE"
      title="ประเมินราคาฟรีผ่าน LINE"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG 20px จาก CDN, next/image ไม่ช่วยอะไร */}
      <img
        src="https://cdn.simpleicons.org/line/ffffff"
        alt="LINE"
        width={24}
        height={24}
        style={{ width: '24px', height: '24px', display: 'block' }}
      />
      <span>ประเมินราคาฟรี</span>
    </a>
  );
}
