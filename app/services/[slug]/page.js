import { servicesData } from "../../../data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";

// จับคู่บริการแต่ละอันกับโฟลเดอร์รูปใน public/images/uploads/
// วางรูปจริงในโฟลเดอร์ที่ตรงกัน ระบบจะดึงมาใช้แทนรูปตัวอย่างอัตโนมัติ
const SERVICE_IMAGE_SLOT = {
  "gold-melting": "service-gold-melting",
  "gold-buying": "service-gold-buying",
  "jewelry-buying": "jewelry",
  "gold-checking": "service-gold-checking",
  "watch-buying": "watch",
  "online-valuation": "valuation",
};

// Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'ไม่พบบริการ | หลอมทองพัทยา',
    };
  }

  const resolvedImage = getUploadedImage(SERVICE_IMAGE_SLOT[slug] || slug, service.image);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [resolvedImage],
    },
    // สำคัญ: ต้องกำหนด canonical ของหน้านี้เอง ไม่งั้นจะสืบทอด canonical ของหน้าแรกจาก root layout มาแทน
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const resolvedImage = getUploadedImage(SERVICE_IMAGE_SLOT[slug] || slug, service.image);

  // Schema.org for LocalBusiness Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@id": "https://www.xn--72c5ab1amkp1ctc0co.com/#business"
    }
  };

  // BreadcrumbList schema (matches the visual breadcrumb below)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าแรก",
        "item": "https://www.xn--72c5ab1amkp1ctc0co.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "บริการของเรา",
        "item": "https://www.xn--72c5ab1amkp1ctc0co.com/#services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.xn--72c5ab1amkp1ctc0co.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="page-header" style={{ padding: '6rem 0 3rem 0', background: 'var(--color-dark-2)', textAlign: 'center', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
          <h1 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '2.5rem' }}>{service.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>{service.excerpt}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
          <ol style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '0.5rem' }}>
            <li><Link href="/" style={{ color: 'var(--color-primary)' }}>หน้าแรก</Link></li>
            <li><span style={{ color: '#ccc' }}>/</span></li>
            <li><Link href="/#services" style={{ color: 'var(--color-primary)' }}>บริการของเรา</Link></li>
            <li><span style={{ color: '#ccc' }}>/</span></li>
            <li aria-current="page" style={{ color: 'var(--color-text-muted)' }}>{service.title}</li>
          </ol>
        </nav>

        <div className="service-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Main Image Space */}
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
             <Image
                src={resolvedImage}
                alt={service.title}
                fill
                style={{ objectFit: 'cover' }}
             />
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.1)' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {/* Left Column: Description */}
            <div>
              <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>รายละเอียดบริการ</h2>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '2rem' }}>
                {service.fullDescription}
              </p>

              <div style={{ background: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--color-gold-dark)', marginBottom: '1rem' }}>สนใจบริการนี้?</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติมหรือประเมินราคาเบื้องต้นได้ทันที</p>
                <Link href="/#contact" className="btn btn-primary" style={{ display: 'inline-block', width: '100%' }}>
                  ติดต่อเรา
                </Link>
              </div>
            </div>

            {/* Right Column: Why Us */}
            <div>
              <div style={{ background: 'var(--color-dark-2)', borderRadius: '1rem', padding: '2rem', height: '100%' }}>
                <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>ทำไมต้องเลือกเรา</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {service.whyUs.map((reason, index) => (
                    <li key={index} style={{ position: 'relative', paddingLeft: '2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                      <span style={{ position: 'absolute', left: 0, top: '2px', color: 'var(--color-gold-dark)' }}>✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
