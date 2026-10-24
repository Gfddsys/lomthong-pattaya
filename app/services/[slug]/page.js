import { EN_FOR_TH } from "@/data/enPages";
import { servicesData } from "../../../data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";
import { SITE_URL } from "@/data/site";
import { BRANCHES } from "@/data/branches";
import { BUSINESS_ID, branchId, serviceId } from "@/lib/schema";
import ServiceIcon from "@/components/ServiceIcon";
import VideoShorts from "@/components/VideoShorts";
import { Section } from "@/components/ContentBlocks";

// จับคู่บริการแต่ละอันกับโฟลเดอร์รูปใน public/images/uploads/
// วางรูปจริงในโฟลเดอร์ที่ตรงกัน ระบบจะดึงมาใช้แทนรูปตัวอย่างอัตโนมัติ
const SERVICE_IMAGE_SLOT = {
  "gold-melting": "service-gold-melting",
  "gold-buying": "service-gold-buying",
  "jewelry-buying": "jewelry",
  "gold-checking": "service-gold-checking",
  "watch-buying": "watch",
  "online-valuation": "valuation",
  "silver-buying": "silver",
  "khai-fak-thong": "khai-fak",
};

// สร้างหน้าบริการทั้งหมดเป็น static ตอน build (เดิมเป็น dynamic = render ใหม่ทุกครั้งที่มีคนเข้า ช้ากว่า)
// slug ที่ไม่มีในรายการ → 404 ทันที
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

// Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'ไม่พบบริการ',
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
      // มีหน้าอังกฤษคู่กัน → ประกาศ hreflang ทั้งสองฝั่ง (ฝั่งอังกฤษอยู่ที่ app/en/[slug])
      ...(EN_FOR_TH[`/services/${slug}`] && {
        languages: { th: `/services/${slug}`, en: EN_FOR_TH[`/services/${slug}`], "x-default": `/services/${slug}` },
      }),
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

  // Service — @id เดียวกับรายการบริการ (hasOfferCatalog) ของทุกสาขาใน lib/schema.js
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(service.slug),
    "name": service.title,
    "url": `${SITE_URL}/services/${service.slug}`,
    "description": service.metaDescription,
    "provider": { "@id": BUSINESS_ID },
    "availableChannel": BRANCHES.map((b) => ({
      "@type": "ServiceChannel",
      "serviceLocation": { "@id": branchId(b) },
    })),
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
        "item": `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "บริการของเรา",
        "item": `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };

  // FAQPage schema (แสดงเมื่อบริการนั้นมี FAQ)
  const faqLd = service.faq && service.faq.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  } : null;

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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <div className="page-header" style={{ padding: '6rem 0 3rem 0', background: 'var(--color-dark-2)', textAlign: 'center', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          <div className="service-icon service-icon--header" aria-hidden="true">
            <ServiceIcon slug={service.slug} size={38} />
          </div>
          <h1 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '2.5rem' }}>{service.h1 ?? `${service.title} พัทยา`}</h1>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>{service.excerpt}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
          <ol style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '0.5rem' }}>
            <li><Link href="/" prefetch={false} style={{ color: 'var(--color-primary)' }}>หน้าแรก</Link></li>
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
                // รูปใหญ่สุดบนจอแรกของหน้าบริการ (LCP) → โหลดทันที ไม่ lazy · กว้างสุด ~1170px ตามกรอบเนื้อหา
                priority
                sizes="(max-width: 1240px) 100vw, 1170px"
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

              {service.sections && service.sections.map((s, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.6rem', fontSize: '1.2rem' }}>{s.h}</h3>
                  <p style={{ lineHeight: '1.8', color: 'var(--color-text)' }}>{s.p}</p>
                </div>
              ))}

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

        {/* เนื้อหาเต็มของบริการ (ขั้นตอน ตาราง วิธีคิดราคา) — ใช้บล็อกแบบเดียวกับบทความ */}
        {service.blocks && service.blocks.length > 0 && (
          <div className="blog-article-content service-rich">
            {service.blocks.map((block, i) => (
              <Section key={i} block={block} />
            ))}
          </div>
        )}

        <VideoShorts page={service.slug} title={`คลิปงาน${service.title}จากหน้าร้าน`} pageUrl={`/services/${service.slug}`} />

        {service.faq && service.faq.length > 0 && (
          <div style={{ marginTop: '3rem', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1.5rem', fontSize: '1.8rem', textAlign: 'center' }}>คำถามที่พบบ่อย</h2>
            {service.faq.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid #eaeaea', padding: '1.2rem 0' }}>
                <h3 style={{ color: 'var(--color-gold-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{f.q}</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--color-text)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
