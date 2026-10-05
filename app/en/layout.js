import Link from "next/link";
import Image from "next/image";
import FloatingContact from "@/components/FloatingContact";
import { CONTACT } from "@/data/contact";
import { BRANCHES } from "@/data/branches";

/* หน้าภาษาอังกฤษ (/en) สำหรับชาวต่างชาติในพัทยา
   root layout ตั้ง <html lang="th"> ไว้ทั้งเว็บ จึงครอบเนื้อหาด้วย lang="en"
   ให้โปรแกรมอ่านหน้าจอและ Google รู้ว่าส่วนนี้เป็นภาษาอังกฤษ
   ใช้ header/footer ภาษาอังกฤษของตัวเอง เพราะ Navbar/Footer หลักเป็นภาษาไทย */
export default function EnLayout({ children }) {
  return (
    <div lang="en">
      <header className="en-header">
        <div className="container en-header-inner">
          <Link href="/en" className="en-header-brand" aria-label="Lomthong Pattaya, English home">
            <Image
              src="/images/uploads/logo/logo-nav.png"
              alt="Lomthong Pattaya logo"
              width={40}
              height={40}
              priority
              style={{ borderRadius: "8px" }}
            />
            <span>Lomthong Pattaya</span>
          </Link>
          <nav className="en-header-actions" aria-label="Main">
            <a href={CONTACT.phoneHref} className="btn btn-primary en-header-call">
              Call {CONTACT.phoneDisplay}
            </a>
            <Link href="/" hrefLang="th" className="en-header-lang">
              ภาษาไทย
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: "80px" }}>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="en-footer-grid">
            <div>
              <p className="footer-title">Lomthong Pattaya (Heng Siri)</p>
              <p className="footer-brand-desc">
                Gold buyer and gold melting shop in Pattaya. Free XRF purity testing in front of you,
                prices based on the Thai Gold Traders Association daily rate, cash paid on the spot.
              </p>
            </div>
            <div>
              <p className="footer-title">Branches</p>
              <ul className="footer-contact-list">
                {BRANCHES.map((b) => (
                  <li key={b.slug}>
                    <span aria-hidden="true">📍</span>
                    <a href={b.mapUrl} target="_blank" rel="noopener noreferrer">
                      {b.nameEn}: {b.addressEn}
                    </a>
                  </li>
                ))}
                <li>
                  <span aria-hidden="true">🕐</span>
                  <span>Open daily 10:00 to 20:00</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-title">Contact</p>
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
                  <span aria-hidden="true">🇹🇭</span>
                  <Link href="/" hrefLang="th">เว็บไซต์ภาษาไทย</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Lomthong Pattaya</p>
          </div>
        </div>
      </footer>

      <FloatingContact label="Free quote on LINE" ariaLabel="Get a free gold quote on LINE" />
    </div>
  );
}
