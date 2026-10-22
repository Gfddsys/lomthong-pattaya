import Link from "next/link";
import { CONTACT } from '@/data/contact';
import { BRANCHES, mapsAppUrl } from '@/data/branches';
import { REVIEWS, REVIEW_TOTALS } from '@/data/reviews';
import ReviewSlider from './ReviewSlider';
import BranchRatings from './BranchRatings';

/* โลโก้ Google 4 สี (SVG) เพื่อสื่อว่าเป็นรีวิวจริงบน Google */
const GoogleG = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ display: 'block' }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
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
