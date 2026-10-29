import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ContentBlocks";
import { WATCH_BRANDS, getWatchBrand } from "@/data/watchBrands";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/data/site";

/* หน้ารับซื้อนาฬิการายแบรนด์ — เนื้อหาอยู่ใน data/watchBrands.js */
export const dynamicParams = false;

export function generateStaticParams() {
  return WATCH_BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const b = getWatchBrand(brand);
  if (!b) return {};
  return {
    title: b.title,
    description: b.description,
    keywords: b.keywords,
    alternates: { canonical: `/rap-sue-nalika/${b.slug}` },
    openGraph: { title: b.title, description: b.description, type: "article" },
  };
}

export default async function WatchBrandPage({ params }) {
  const { brand } = await params;
  const b = getWatchBrand(brand);
  if (!b) notFound();
  const pageUrl = `${SITE_URL}/rap-sue-nalika/${b.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: b.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "รับซื้อนาฬิกาแบรนด์เนม", item: `${SITE_URL}/services/watch-buying` },
      { "@type": "ListItem", position: 3, name: `รับซื้อ ${b.name}`, item: pageUrl },
    ],
  };
  // บริการรับซื้อแบรนด์นี้ของร้านเดียวกัน (ไม่ประกาศร้านใหม่ — provider ชี้ entity เดิมใน app/layout.js)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `รับซื้อนาฬิกา ${b.name} มือสอง`,
    serviceType: "รับซื้อนาฬิกาแบรนด์เนม",
    url: pageUrl,
    areaServed: { "@type": "City", name: "พัทยา" },
    provider: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/" prefetch={false}>หน้าแรก</Link>
        <span>/</span>
        <Link href="/services/watch-buying">รับซื้อนาฬิกาแบรนด์เนม</Link>
        <span>/</span>
        <span>{b.name}</span>
      </nav>

      <header className="blog-article-header">
        <h1>{b.h1}</h1>
        <div className="blog-article-meta">
          <span>📍 2 สาขาในพัทยา</span>
          <span>💬 ประเมินฟรีทาง LINE</span>
          <span>💵 รับเงินสดทันที</span>
        </div>
      </header>

      <div className="blog-article-content service-rich">
        {b.blocks.map((block, i) => (
          <Section key={i} block={block} />
        ))}

        <h2>คำถามที่พบบ่อย</h2>
        {b.faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="blog-article-cta">
        <h3>ส่งรูป {b.name} ให้ประเมินราคาฟรี</h3>
        <p>ทาง LINE {CONTACT.lineId} หรือโทร {CONTACT.phoneDisplay} · เปิดทุกวันถึง 20:00 น.</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            💬 ประเมินราคา - สอบถาม
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-outline">
            📞 โทร {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </article>
  );
}
