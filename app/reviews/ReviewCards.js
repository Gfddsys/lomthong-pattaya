import Link from "next/link";
import { BRANCHES, mapsAppUrl, reviewUrl } from "@/data/branches";
import styles from "./reviews.module.css";

/* การ์ดรีวิวของแต่ละสาขา ใช้ทั้งหน้า /reviews (ทุกสาขา) และ /reviews/<slug> (สาขาเดียว)
   แต่ละสาขามี 2 ทาง:
   1. เขียนรีวิวเลย — เปิดหน้าให้ดาว/พิมพ์รีวิวตรง (ลิงก์เดียวกับ g.page/r/.../review ที่ GBP แจก)
      ถ้าเบราว์เซอร์ล็อกอิน Google อยู่ (Android ส่วนใหญ่) จะเข้าหน้าพิมพ์รีวิวทันที
   2. เปิดในแอป Google Maps — สำรองสำหรับคนที่เบราว์เซอร์ไม่ได้ล็อกอิน (iPhone/Safari)
      Google ไม่มีลิงก์ที่เปิดหน้าพิมพ์รีวิวในแอปตรง ๆ จึงมีขั้นตอนบอกให้กดต่ออีก 2 ครั้ง
   ทุกปุ่มส่งลูกค้าไป Google โดยตรง ไม่มีการคัดกรองว่าพอใจหรือไม่
   (Google ห้าม "review gating" คือถามความพอใจก่อนแล้วส่งเฉพาะคนที่พอใจไปรีวิว) */
export default function ReviewCards({ slug }) {
  const branches = slug ? BRANCHES.filter((b) => b.slug === slug) : BRANCHES;
  const others = slug ? BRANCHES.filter((b) => b.slug !== slug) : [];

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.brand}>หลอมทองพัทยา</h1>
        <p className={styles.tagline}>รับซื้อทอง · หลอมทอง พัทยา</p>
        <p className={styles.thanks}>ขอบคุณที่ไว้วางใจเฮงศิริครับ 🙏</p>
        <div className={styles.stars} aria-hidden="true">★★★★★</div>
        <p className={styles.ask}>ช่วยรีวิวร้านบน Google ให้หน่อยนะครับ ใช้เวลาไม่ถึง 1 นาที</p>
      </section>

      <div className={branches.length > 1 ? styles.grid : styles.single}>
        {branches.map((b) => (
          <section key={b.slug} className={`${styles.branch} ${styles[b.slug] ?? ""}`}>
            <h2 className={styles.branchName}>{b.shortName}</h2>
            <p className={styles.address}>{b.address}</p>

            <div className={styles.option}>
              <a href={reviewUrl(b)} className={styles.primary} rel="noopener">
                <GoogleIcon />
                เขียนรีวิวเลย
              </a>
              <p className={styles.hint}>เปิดหน้าให้ดาวและพิมพ์รีวิวทันที</p>
            </div>

            <div className={styles.option}>
              <p className={styles.optionLabel}>ถ้าระบบให้ล็อกอิน Gmail ใช้แอป Google Maps แทน</p>
              <a href={mapsAppUrl(b)} className={styles.secondary} rel="noopener">
                <MapsPin />
                เปิดในแอป Google Maps
              </a>
              <ol className={styles.steps}>
                <li>
                  เลื่อนลง กดแท็บ <strong>รีวิว</strong>
                </li>
                <li>
                  กด <strong>เขียนรีวิว</strong> แล้วให้ดาวได้เลย
                </li>
              </ol>
            </div>
          </section>
        ))}
      </div>

      {others.length > 0 && (
        <p className={styles.switch}>
          ไม่ใช่สาขานี้?{" "}
          {others.map((b) => (
            <Link key={b.slug} href={`/reviews/${b.slug}`}>
              รีวิว{b.shortName}
            </Link>
          ))}
        </p>
      )}

      <p className={styles.en}>Thank you! Tap a button above to review us on Google.</p>
    </>
  );
}

function MapsPin() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="#EA4335" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}
