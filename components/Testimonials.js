import { CONTACT } from '@/data/contact';

/* โลโก้ Google 4 สี (SVG) เพื่อสื่อว่าเป็นรีวิวจริงบน Google */
const GoogleG = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ display: 'block' }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export default function Testimonials() {
  /* รีวิวจริงจากลูกค้าบน Google Maps ของร้าน (คัดลอกจากหน้ารีวิวจริง) */
  const testimonials = [
    {
      initial: 'K',
      color: '#e57373',
      name: 'Kanyarat K.',
      date: '8 เดือนก่อน',
      stars: 5,
      text: 'เป็นร้านเล็กๆ ที่ประทับใจมาก เดินทางง่าย ให้ราคาสูง พนักงานดูแลให้บริการดีมากค่ะ แนะนำเลย',
    },
    {
      initial: 'S',
      color: '#7986cb',
      name: 'Sommart Songkasin',
      date: '9 เดือนก่อน',
      stars: 5,
      text: 'ทางร้านบริการดีมากครับ ร้านหาง่าย ให้ราคาดี มาแล้วไม่ผิดหวัง มาร้านนี้ได้เลยค้าบ',
    },
    {
      initial: 'ไ',
      color: '#4db6ac',
      name: 'ไฟต้นน้ำมันช็อต ทักมา',
      date: '9 เดือนก่อน',
      stars: 5,
      text: 'ร้านนี้ให้ราคาสูง เจ้าของร้านพูดจาเป็นกันเองมาก เดี๋ยวจะมาบ่อยๆ นะครับ',
    },
    {
      initial: 'T',
      color: '#f06292',
      name: 'Ms Tinna Kaewchin',
      date: '3 สัปดาห์ก่อน',
      stars: 5,
      text: 'น้องผู้ชายบริการดีมากค่ะ พูดเพราะ แนะนำดีมากๆ ค่ะ ราคาก็ไม่กด เรามาก็น่ารักค่ะ มีโอกาสจะใช้บริการนะคะ 🙏🥰',
    },
    {
      initial: 'พ',
      color: '#9575cd',
      name: 'พัชราภา มะริต',
      date: '2 เดือนก่อน',
      stars: 5,
      text: 'บริการดีมากๆ ตั้งแต่ไปขายมา มีร้านนี้ยกนิ้วให้เลย น้องน่ารักมาก พูดเพราะ แนะนำดี ยิ้มเก่ง ชอบค่ะ',
    },
    {
      initial: 'T',
      color: '#4fc3f7',
      name: 'TYP Ssp',
      date: '8 เดือนก่อน',
      stars: 5,
      text: 'เป็นร้านที่ให้คำปรึกษาดีมากๆ ร้านเล็กๆ แต่บริการดีเยี่ยม',
    },
  ];

  return (
    <section id="testimonials" className="section section-darker">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <span className="section-label">รีวิวจากลูกค้า</span>
          <h2 className="section-title">
            ลูกค้าของเรา<span className="gold">พูดถึงเราอย่างไร</span>
          </h2>
          <p className="section-subtitle">
            ทุกรีวิวด้านล่างเป็น<strong>รีวิวจริงจากลูกค้าบน Google</strong> กดที่รีวิวเพื่อตรวจสอบได้เลย
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
          <div className="gold-divider"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <a
              key={index}
              href={CONTACT.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`testimonial-card animate-on-scroll animate-delay-${(index % 3) * 100 + 100}`}
              aria-label={`อ่านรีวิวของ ${t.name} บน Google`}
            >
              {/* Author + Google source */}
              <div className="testimonial-head">
                <div
                  className="testimonial-avatar"
                  style={{ background: t.color, color: '#fff' }}
                  aria-hidden="true"
                >
                  {t.initial}
                </div>
                <div className="testimonial-head-info">
                  <div className="testimonial-author-name">{t.name}</div>
                  <div className="testimonial-source">
                    <GoogleG size={14} /> รีวิวบน Google · {t.date}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="testimonial-stars" aria-label={`${t.stars} ดาว`}>
                {Array.from({ length: t.stars }, (_, i) => (
                  <span key={i} className="testimonial-star" aria-hidden="true">★</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="testimonial-text">{t.text}</p>

              {/* Verified badge */}
              <span className="testimonial-verified">✔ ยืนยันจาก Google</span>
            </a>
          ))}
        </div>

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
            คลิกเพื่อดูรีวิวและคะแนนจริงจากลูกค้า หรือเขียนรีวิวให้เราบน Google Maps
          </span>
        </div>
      </div>
    </section>
  );
}
