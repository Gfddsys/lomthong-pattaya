import Link from "next/link";
import { BRANCHES, reviewUrl } from "@/data/branches";
import styles from "./reviews.module.css";

/* การ์ดรีวิวของแต่ละสาขา ใช้ทั้งหน้า /reviews (ทุกสาขา) และ /reviews/<slug> (สาขาเดียว)
   ทุกปุ่มส่งลูกค้าไปหน้าเขียนรีวิวของ Google โดยตรง ไม่มีการคัดกรองว่าพอใจหรือไม่
   (Google ห้าม "review gating" คือถามความพอใจก่อนแล้วส่งเฉพาะคนที่พอใจไปรีวิว) */
export default function ReviewCards({ slug }) {
  const branches = slug ? BRANCHES.filter((b) => b.slug === slug) : BRANCHES;
  const others = slug ? BRANCHES.filter((b) => b.slug !== slug) : [];

  return (
    <>
      <div className={styles.intro}>
        <div className={styles.stars} aria-hidden="true">★★★★★</div>
        <h1>ขอบคุณที่ใช้บริการครับ</h1>
        <p>ช่วยรีวิวร้านบน Google ให้หน่อยนะครับ ใช้เวลาไม่ถึง 1 นาที</p>
      </div>

      <div className={styles.cards}>
        {branches.map((b) => (
          <section key={b.slug} className={styles.card}>
            <h2>{b.shortName}</h2>
            <p className={styles.address}>{b.address}</p>
            <a href={reviewUrl(b)} className={styles.button} rel="noopener">
              <GoogleIcon />
              เขียนรีวิวบน Google
            </a>
          </section>
        ))}
      </div>

      <ol className={styles.steps}>
        <li>แตะจำนวนดาวที่ต้องการ</li>
        <li>เล่าสั้น ๆ ว่ามาใช้บริการอะไร เช่น หลอมทอง ขายทองเก่า ขายนาฬิกา</li>
        <li>กด &quot;โพสต์&quot; เป็นอันเสร็จ</li>
      </ol>

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

      <p className={styles.en}>Thank you! Tap the button above to review us on Google.</p>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}
