import Image from 'next/image';
import GoldPrice from './GoldPrice';
import { getUploadedImage } from '@/lib/getImage';

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
          {/* Badge */}
          <div className="hero-badge animate-on-scroll">
            <span className="hero-badge-dot"></span>
            บริการครบวงจร | พัทยาและพื้นที่ใกล้เคียง
          </div>

          {/* Heading */}
          <h1 className="animate-on-scroll animate-delay-100">
            รับ<span className="gold-text">หลอมทอง</span>พัทยา
          </h1>

          {/* Description */}
          <p className="hero-description animate-on-scroll animate-delay-200">
            บริการรับหลอมทอง รับซื้อทองเก่า ทองหัก ทองคำแท่ง
            ทุกประเภท ด้วยเครื่องมือทันสมัย{" "}
            <span style={{ whiteSpace: 'nowrap' }}>ตรวจสอบ</span>ความบริสุทธิ์
            พร้อมให้ราคาสูงสุด โปร่งใส ยุติธรรม
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions animate-on-scroll animate-delay-300">
            <a href="#contact" className="btn btn-primary btn-lg">
              รับซื้อทองเก่าให้ราคาสูงพิเศษ
            </a>
            <a href="#services" className="btn btn-outline btn-lg">
              ดูบริการของเรา
            </a>
          </div>

          {/* Gold Price Widget */}
          <GoldPrice isHero={true} />
        </div>
      </div>
    </section>
  );
}
