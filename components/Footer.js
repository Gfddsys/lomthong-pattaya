import Link from 'next/link';
import { CONTACT } from '@/data/contact';
import { BRANCHES } from '@/data/branches';
import { AREAS } from '@/data/areas';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div>
            <div className="navbar-brand">
              <div className="navbar-brand-text">
                <span className="navbar-brand-name">หลอมทองพัทยา</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              ร้านรับหลอมทอง รับซื้อทอง นาฬิกาแบรนด์เนม และเครื่องประดับครบวงจร
              ในพื้นที่พัทยา ศรีราชา ชลบุรี บางละมุง สัตหีบ
              ให้ราคาสูงตามสมาคมค้าทองคำ ตรวจสอบต่อหน้า จ่ายเงินสดทันที
              บริการด้วยความซื่อสัตย์ โปร่งใส มากว่า 10 ปี
            </p>
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-line-btn"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG 20px จาก CDN, next/image ไม่ช่วยอะไร */}
              <img
                src="https://cdn.simpleicons.org/line/ffffff"
                alt="LINE"
                width={20}
                height={20}
                style={{ width: '20px', height: '20px', display: 'block' }}
              />
              แอดไลน์ · ประเมินราคาฟรี
            </a>
          </div>

          {/* Column 2: Menu */}
          <nav aria-label="เมนูลิงก์ในฟุตเตอร์">
            <h4 className="footer-title">เมนู</h4>
            <ul className="footer-links">
              <li><Link href="/#hero" className="footer-link">หน้าแรก</Link></li>
              <li><Link href="/#about" className="footer-link">รู้จักเรา</Link></li>
              <li><Link href="/#services" className="footer-link">บริการของเรา</Link></li>
              <li><Link href="/#process" className="footer-link">ขั้นตอนบริการ</Link></li>
              <li><Link href="/#gallery" className="footer-link">ผลงาน</Link></li>
              <li><Link href="/#testimonials" className="footer-link">รีวิวลูกค้า</Link></li>
              <li><Link href="/rap-lomthong-pattaya" className="footer-link">รับหลอมทองพัทยา</Link></li>
              <li><Link href="/en" hrefLang="en" className="footer-link">English: Sell gold in Pattaya</Link></li>
              <li><Link href="/blog" className="footer-link">บทความ</Link></li>
              <li><Link href="/#contact" className="footer-link">ติดต่อเรา</Link></li>
            </ul>
          </nav>

          {/* Column 3: Services */}
          <div>
            <h4 className="footer-title">บริการ</h4>
            <ul className="footer-links">
              <li><Link href="/services/gold-melting" className="footer-link">รับหลอมทองคำ</Link></li>
              <li><Link href="/services/gold-buying" className="footer-link">รับซื้อทองเก่า ทองหัก</Link></li>
              <li><Link href="/services/jewelry-buying" className="footer-link">รับซื้อเครื่องประดับ</Link></li>
              <li><Link href="/services/watch-buying" className="footer-link">รับซื้อนาฬิกาแบรนด์เนม</Link></li>
              <li><Link href="/services/gold-checking" className="footer-link">ตรวจสอบทองฟรี</Link></li>
              <li><Link href="/services/silver-buying" className="footer-link">รับซื้อเครื่องเงิน</Link></li>
              <li><Link href="/services/online-valuation" className="footer-link">ประเมินราคาออนไลน์</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="footer-title">ติดต่อเรา</h4>
            <ul className="footer-contact-list">
              <li>
                <span aria-hidden="true">📞</span>
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              </li>
              <li>
                <span aria-hidden="true">💬</span>
                <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer">LINE {CONTACT.lineId}</a>
              </li>
              <li>
                <span aria-hidden="true">🕐</span>
                <span>เปิดทุกวัน 10:00 - 20:00 น.</span>
              </li>
              {/* ลิงก์ภายในไปหน้าสาขา — ทุกหน้าในเว็บชี้ไปหน้าสาขา ช่วยให้ Google ให้น้ำหนักหน้าที่ผูกกับ GBP */}
              {BRANCHES.map((b) => (
                <li key={b.slug}>
                  <span aria-hidden="true">📍</span>
                  <Link href={`/branch/${b.slug}`}>{b.shortName}</Link>
                </li>
              ))}
            </ul>
            <p className="footer-area">
              พื้นที่บริการ:{' '}
              {AREAS.map((a, i) => (
                <span key={a.slug}>
                  {i > 0 && ' · '}
                  <Link href={`/area/${a.slug}`}>{a.name}</Link>
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {year} หลอมทองพัทยา · รับหลอมทอง รับซื้อทอง นาฬิกา เครื่องประดับ พัทยา ชลบุรี · สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
}
