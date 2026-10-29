import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT } from '@/data/contact';
import MeltPromo from './MeltPromo';
import PriceBoard from './PriceBoard';
import { getUploadedImage } from '@/lib/getImage';

const HERO_POINTS = [
  'รับหลอมทองต่อหน้าคุณ',
  'ชั่งก่อน-หลังหลอม',
  'ตรวจเปอร์เซ็นต์ทองด้วย XRF ฟรี',
  'ขายรับเงินสดทันที',
  'หรือรับก้อนทองกลับ ·',
  'รับซื้อทองเก่า ทองหัก',
  'ไม่มีใบเสร็จก็ขายได้',
];

export default function Hero() {
  const heroSrc = getUploadedImage('hero', '/images/hero.png');
  return (
    <section id="hero" className="hero" aria-label="หน้าแรก">
      {/* Background Image */}
      <div className="hero-bg">
        <Image
          src={heroSrc}
          alt="หลอมทองพัทยา รับหลอมทอง รับซื้อทอง พัทยา"
          fill={true}
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="hero-overlay" aria-hidden="true"></div>

      {/* Floating Gold Particles */}
      <div className="hero-particles" aria-hidden="true">
        <div className="hero-particle" style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
        <div className="hero-particle" style={{ top: '25%', right: '20%', animationDelay: '1s' }}></div>
        <div className="hero-particle" style={{ top: '60%', left: '25%', animationDelay: '2s' }}></div>
        <div className="hero-particle" style={{ top: '40%', right: '10%', animationDelay: '3s' }}></div>
        <div className="hero-particle" style={{ top: '75%', left: '60%', animationDelay: '1.5s' }}></div>
        <div className="hero-particle" style={{ top: '10%', left: '50%', animationDelay: '4s' }}></div>
        <div className="hero-particle" style={{ top: '85%', right: '35%', animationDelay: '2.5s' }}></div>
        <div className="hero-particle" style={{ top: '50%', left: '80%', animationDelay: '0.5s' }}></div>
      </div>

      {/* Hero Content */}
      <div className="container">
        <div className="hero-content">
          {/* Badge: ชื่อร้านจริง "เฮงศิริ" — คนค้น "หลอมทอง พัทยา" เจอหลายร้านที่ชื่อคล้ายกัน ให้แยกออกว่าเป็นร้านเรา */}
          <div className="hero-badge animate-on-scroll">
            <span className="hero-badge-dot"></span>
            เฮงศิริ · 2 สาขาในพัทยา เปิดทุกวัน
          </div>

          {/* Heading */}
          <h1 className="animate-on-scroll animate-delay-100">
            ร้าน<span className="gold-text">หลอมทอง</span>พัทยา
          </h1>

          {/* โปรหลอมทอง — พี่สั่ง 29 ต.ค. 2026 ให้คนเห็นทุกครั้ง · กดดูเงื่อนไขที่หน้าหลอมทอง */}
          <MeltPromo className="hero-promo animate-on-scroll animate-delay-100" />

          {/* Description: บอกสิ่งที่ลูกค้าได้จริงตอนมาหลอมทอง (ข้อมูลเดียวกับหน้า /services/gold-melting)
              แต่ละวลีห้ามตัดกลาง (เช่น "ตรวจ / XRF") → ขึ้นบรรทัดใหม่ได้เฉพาะระหว่างวลี */}
          <p className="hero-description animate-on-scroll animate-delay-200">
            {HERO_POINTS.map((phrase, i) => (
              <Fragment key={phrase}>
                {i > 0 && ' '}
                <span style={{ whiteSpace: 'nowrap' }}>{phrase}</span>
              </Fragment>
            ))}
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions animate-on-scroll animate-delay-300">
            {/* ปุ่มบนสุดคือ LINE: ลูกค้าส่งรูปทองให้ประเมินราคาได้ทันทีโดยไม่ต้องเลื่อนหาช่องทางติดต่อ */}
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line btn-lg hero-line-btn"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG ไฟล์เดียวกับปุ่ม LINE ลอย */}
              <img src="/images/icons/line.svg" alt="" width={24} height={24} />
              ประเมินราคา - สอบถาม
            </a>
            <a href="#contact" className="btn btn-primary btn-lg">
              รับซื้อทองเก่าให้ราคาสูงพิเศษ
            </a>
          </div>

          {/* ป้ายราคาทอง/แท่งเงิน (ภาพป้ายหน้าร้าน + ราคาจริงอัปเดตทุก 5 นาที) */}
          <div className="hero-price-board">
            <h2 className="hero-price-board-title">ราคาทองคำ<span>ประจำวัน</span></h2>
            <p className="hero-price-board-sub">อ้างอิงจากสมาคมค้าทองคำแห่งประเทศไทย</p>
            <PriceBoard />
          </div>
          {/* ลิงก์จากหน้าแรก (หน้าที่แข็งแรงที่สุด) ไปหน้าราคาทอง ช่วยให้หน้าราคาทองติดคำค้น "ราคาทองวันนี้ พัทยา" */}
          <Link href="/rakha-thong-wan-nee" className="hero-price-link">
            ดูราคาทองวันนี้ทั้งหมด + คำนวณราคาขายทองของคุณ →
          </Link>
        </div>
      </div>
    </section>
  );
}
