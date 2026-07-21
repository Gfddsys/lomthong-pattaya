'use client';

import { useState, useEffect } from 'react';
import { CONTACT } from '@/data/contact';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const menuLinks = [
    { label: 'หน้าแรก', href: '/#hero' },
    { label: 'รู้จักเรา', href: '/#about' },
    { label: 'บริการ', href: '/#services' },
    { label: 'ขั้นตอน', href: '/#process' },
    { label: 'ผลงาน', href: '/#gallery' },
    { label: 'รีวิว', href: '/#testimonials' },
    { label: 'บทความ', href: '/blog' },
    { label: 'ติดต่อเรา', href: '/#contact' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container">
        {/* Brand */}
        <a href="/" className="navbar-brand" aria-label="หลอมทองพัทยา - กลับหน้าแรก">
          <img
            src="/images/uploads/logo/logo-nav.png"
            alt="หลอมทองพัทยา"
            width={48}
            height={48}
            className="navbar-brand-logo"
            style={{ height: '48px', width: '48px', borderRadius: '10px', display: 'block', objectFit: 'cover' }}
          />
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">หลอมทองพัทยา</span>
          </div>
        </a>

        {/* Menu Links */}
        <ul className={`navbar-menu${menuOpen ? ' active' : ''}`} role="menubar">
          {menuLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                className="navbar-link"
                role="menuitem"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="navbar-cta">
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn-icon line" aria-label="เพิ่มเพื่อน LINE">
            {/* ใช้โลโก้ LINE จริงจาก Simple Icons CDN (ไอคอนสำเร็จรูปที่ตรวจสอบแล้ว)
                แทนการวาด SVG เอง เพื่อไม่ให้เพี้ยนแบบที่ผ่านมา */}
            <img
              src="https://cdn.simpleicons.org/line/ffffff"
              alt="LINE"
              width={20}
              height={20}
              style={{ width: '20px', height: '20px', display: 'block' }}
            />
          </a>
          <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" className="btn-icon facebook" aria-label="Facebook Page">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navbar-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
