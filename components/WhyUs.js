import Image from 'next/image';
import { getUploadedImages } from '@/lib/getImage';

/* ไอคอนเส้น (SVG) แทน emoji เพื่อให้ดูพรีเมียม ไม่เหมือนเว็บสำเร็จรูป */
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const IconScale = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default function WhyUs() {
  // วางรูปเครื่องมือ/อุปกรณ์จริงได้ที่ public/images/uploads/why-us-gallery/ (กี่รูปก็ได้ ไม่ต้องเปลี่ยนชื่อไฟล์)
  const photos = getUploadedImages('why-us-gallery', [
    '/images/inspection.png',
    '/images/hero.png',
    '/images/gallery.png',
    '/images/blog-check-gold.png',
  ]);
  const features = [
    {
      Icon: IconTrophy,
      title: 'ช่างผู้ชำนาญ',
      description: 'ประสบการณ์กว่า 10 ปี ในวงการหลอมทองและรับซื้อทองคำ การันตีคุณภาพงานทุกชิ้น',
    },
    {
      Icon: IconScale,
      title: 'ให้ราคายุติธรรม',
      description: 'ราคารับซื้อเป็นไปตามราคาตลาดสมาคมค้าทองคำ โปร่งใส ตรวจสอบได้',
    },
    {
      Icon: IconZap,
      title: 'จ่ายเงินทันที',
      description: 'ไม่ต้องรอ รับเงินสดหรือโอนทันทีหลังตกลงราคา สะดวก รวดเร็ว',
    },
    {
      Icon: IconShield,
      title: 'น่าเชื่อถือ',
      description: 'มีหน้าร้านชัดเจนในพัทยา เปิดให้บริการมาอย่างยาวนาน ลูกค้าไว้วางใจ',
    },
  ];

  return (
    <section className="section section-dark">
      <div className="container">
        <header className="section-header animate-on-scroll">
          <span className="section-label">ทำไมต้องเลือกเรา</span>
          <h2 className="section-title">
            เหตุผลที่ลูกค้า<span className="gold">ไว้วางใจ</span>หลอมทองพัทยา
          </h2>
          <p className="section-subtitle">
            เราให้บริการด้วยความซื่อสัตย์ โปร่งใส และมืออาชีพ
          </p>
        </header>

        <div className="why-grid">
          <div className="photo-grid-2x2 animate-on-scroll">
            {photos.slice(0, 4).map((src, index) => (
              <div key={index} className="photo-grid-tile">
                <Image
                  src={src}
                  alt={`เครื่องมือตรวจสอบทองคำที่ร้านหลอมทองพัทยา ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <div className="why-features">
            {features.map((feature, index) => {
              const { Icon } = feature;
              return (
                <article key={index} className={`why-feature animate-on-scroll animate-delay-${(index % 4) * 100 + 100}`}>
                  <span className="why-feature-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div className="why-feature-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <div className="why-feature-body">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
