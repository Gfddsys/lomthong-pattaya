import Link from 'next/link';
import Image from 'next/image';
import { servicesData } from '../data/services';
import { getUploadedImage } from '@/lib/getImage';

/* จับคู่บริการกับโฟลเดอร์รูป + รูป fallback ที่มีอยู่จริง
   วางรูปจริงใน public/images/uploads/<slot>/ เพื่อแทนรูปตัวอย่างอัตโนมัติ */
const SERVICE_IMG = {
  'gold-melting': ['service-gold-melting', '/images/hero.png'],
  'gold-buying': ['service-gold-buying', '/images/blog-check-gold.png'],
  'jewelry-buying': ['jewelry', '/images/gallery.png'],
  'gold-checking': ['service-gold-checking', '/images/inspection.png'],
  'watch-buying': ['watch', '/images/blog-lomthong.png'],
  'online-valuation': ['valuation', '/images/blog-gold-price.png'],
};

export default function Services() {
  return (
    <section id="services" className="section section-darker">
      <div className="container">
        <header className="section-header animate-on-scroll">
          <span className="section-label">บริการของเรา</span>
          <h2 className="section-title">
            บริการ<span className="gold">หลอมทอง</span>และรับซื้อทองครบวงจร
          </h2>
          <p className="section-subtitle">
            หลอมทองพัทยา ให้บริการด้านทองคำอย่างครบวงจร ด้วยมาตรฐานและความซื่อสัตย์
          </p>
          <div className="gold-divider" aria-hidden="true"></div>
        </header>

        <div className="services-grid">
          {servicesData.map((service, index) => {
            const [slot, fallback] = SERVICE_IMG[service.slug] || ['', service.image];
            const imgSrc = getUploadedImage(slot, fallback);
            return (
              <Link href={`/services/${service.slug}`} key={service.slug} className={`service-card animate-scale-up animate-delay-${(index % 3) * 100 + 100}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <div className="service-card-media">
                  <Image
                    src={imgSrc}
                    alt={`${service.title} - หลอมทองพัทยา`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: service.imagePosition || 'center' }}
                  />
                </div>
                <div className="service-icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
                <p style={{ flexGrow: 1, marginBottom: '1.5rem' }}>{service.excerpt}</p>

                <div style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.95rem', alignSelf: 'center' }}>
                  ดูรายละเอียดเพิ่มเติม <span style={{ marginLeft: '0.5rem' }}>➔</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
