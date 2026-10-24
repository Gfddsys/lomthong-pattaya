import Link from "next/link";
import { CONTACT } from '@/data/contact';
import { BRANCHES, mapsAppUrl } from '@/data/branches';
import { REVIEWS, REVIEW_TOTALS } from '@/data/reviews';
import ReviewSlider from './ReviewSlider';
import BranchRatings from './BranchRatings';

/* โลโก้ Google 4 สี เพื่อสื่อว่าเป็นรีวิวจริงบน Google
   ใช้ไฟล์ /images/google-g.svg ไฟล์เดียว (เบราว์เซอร์โหลดครั้งเดียว) — เดิมเป็น SVG ฝังซ้ำในทุกการ์ด ~50 ชุด
   ทำให้หน้าแรกหนักขึ้น ~37KB ใน HTML และอีกเท่าตัวในข้อมูลที่ React ส่งไปฝั่งเบราว์เซอร์ */
const GoogleG = ({ size = 18 }) => (
  // eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG เล็ก next/image ไม่ช่วยอะไร
  <img src="/images/google-g.svg" width={size} height={size} alt="" aria-hidden="true" style={{ display: 'block' }} />
);

const BRANCH_NAME = Object.fromEntries(BRANCHES.map((b) => [b.slug, b]));
const AVATAR_COLORS = ['#e57373', '#7986cb', '#4db6ac', '#f06292', '#9575cd', '#4fc3f7', '#ffb74d', '#81c784'];
// ตัวอักษรแรกที่ไม่ใช่สระหน้า (เ แ โ ใ ไ) และไม่ใช่เครื่องหมาย
const initialOf = (name) => (name.replace(/^[^\p{L}]+/u, '').replace(/^[เแโใไ]/, '')[0] || '?').toUpperCase();

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section-darker">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <span className="section-label">รีวิวจากลูกค้าจริง</span>
          <h2 className="section-title">
            รีวิวร้าน<span className="gold">รับซื้อทอง หลอมทองพัทยา</span>
          </h2>
          <p className="section-subtitle">
            รีวิวจริงจาก Google Maps ทั้ง 2 สาขา <strong>พัทยาใต้</strong> และ <strong>เนินพลับหวาน</strong>{" "}
            <span style={{ whiteSpace: 'nowrap' }}>★ {REVIEW_TOTALS.rating} จาก {REVIEW_TOTALS.count} รีวิว</span>{" "}
            ลูกค้าพูดถึงการหลอมทองให้ดูต่อหน้า เช็คเปอร์เซ็นต์ทองชัดเจน และให้ราคาสูง
          </p>
          <a
            href={CONTACT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-google-chip"
          >
            <GoogleG size={20} />
            <span className="reviews-google-chip-stars" aria-hidden="true">★★★★★</span>
            <span>รีวิวจริงจากลูกค้าบน Google</span>
          </a>
          <BranchRatings />
          <div className="gold-divider"></div>
        </div>

        {/* สไลด์รีวิว — เลื่อนเอง ปัด/ลากดูเองได้ */}
        <ReviewSlider label="รีวิวจากลูกค้าบน Google เลื่อนดูได้">
          {REVIEWS.map((r, index) => {
            const b = BRANCH_NAME[r.branch];
            return (
              <a
                key={index}
                href={mapsAppUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                className="review-slide"
                aria-label={`รีวิวของ ${r.name} ${b.shortName} บน Google`}
              >
                <div className="testimonial-head">
                  <div
                    className="testimonial-avatar"
                    style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length], color: '#fff' }}
                    aria-hidden="true"
                  >
                    {initialOf(r.name)}
                  </div>
                  <div className="testimonial-head-info">
                    <div className="testimonial-author-name">{r.name}</div>
                    <div className="testimonial-source">
                      <GoogleG size={14} /> รีวิวบน Google · {b.shortName}
                    </div>
                  </div>
                </div>
                <div className="testimonial-stars" aria-label="5 ดาว">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="testimonial-star" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="review-slide-text">{r.text}</p>
                <span className="testimonial-verified">✔ ยืนยันจาก Google</span>
              </a>
            );
          })}
        </ReviewSlider>

        {/* CTA to real Google reviews */}
        <div className="reviews-cta animate-on-scroll">
          <a
            href={CONTACT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-cta-btn"
          >
            <GoogleG size={22} /> อ่านรีวิวจริงทั้งหมดบน Google
          </a>
          <span className="reviews-cta-note">
            ข้อมูลรีวิว ณ {REVIEW_TOTALS.checkedAt} · เคยใช้บริการแล้ว?{" "}
            <Link href="/reviews">เขียนรีวิวให้ร้าน</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
