import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANCHES, getBranch } from "@/data/branches";
import { CONTACT } from "@/data/contact";

const SITE_URL = "https://www.xn--72c5ab1amkp1ctc0co.com";

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) return {};
  const title = `ร้านทอง ${b.area} · รับซื้อทอง หลอมทอง ${b.area}`;
  const description = `${b.name} รับหลอมทอง รับซื้อทองเก่า ทองหัก เครื่องประดับ นาฬิกาแบรนด์เนม ${b.address} โทร ${CONTACT.phoneDisplay} เปิดทุกวัน 10:00-20:00 น. ตรวจ XRF ฟรี จ่ายเงินสดทันที`;
  return {
    title,
    description,
    alternates: { canonical: `/branch/${b.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function BranchPage({ params }) {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: b.name,
    url: `${SITE_URL}/branch/${b.slug}`,
    telephone: CONTACT.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.locality,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: "TH",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    priceRange: "฿",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
    hasMap: b.mapUrl,
    sameAs: [b.mapUrl],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: b.shortName, item: `${SITE_URL}/branch/${b.slug}` },
    ],
  };

  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <span>{b.shortName}</span>
      </nav>

      <header className="blog-article-header">
        <h1>ร้านทอง {b.area} — รับซื้อทอง หลอมทอง</h1>
        <div className="blog-article-meta">
          <span>📍 {b.shortName}</span>
          <span>⭐ Google รีวิว {b.reviews}</span>
          <span>🕐 ทุกวัน 10:00-20:00</span>
        </div>
      </header>

      <div className="store-map" style={{ marginBottom: "var(--space-2xl)" }}>
        <iframe
          src={b.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`แผนที่ ${b.name}`}
        ></iframe>
      </div>

      <div className="blog-article-content">
        <p>
          <strong>{b.name}</strong> ให้บริการ<strong>รับหลอมทอง รับซื้อทองเก่า ทองหัก ทองชำรุด
          ทองคำแท่ง เครื่องประดับ และนาฬิกาแบรนด์เนม</strong> ด้วยเครื่องมือมาตรฐาน ตรวจเปอร์เซ็นต์ทอง
          ด้วยเครื่อง XRF ต่อหน้าคุณ ให้ราคาสูงตามสมาคมค้าทองคำ จ่ายเงินสดทันที
        </p>

        <h2>ข้อมูลติดต่อ {b.shortName}</h2>
        <ul>
          <li><strong>ที่อยู่:</strong> {b.address}</li>
          <li><strong>เวลาทำการ:</strong> {b.hours}</li>
          <li><strong>โทรศัพท์:</strong> <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
          <li><strong>LINE:</strong> <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer">{CONTACT.lineId}</a></li>
        </ul>

        <h2>บริการที่ {b.shortName}</h2>
        <ul>
          <li>รับหลอมทองคำทุกชนิด</li>
          <li>รับซื้อทองเก่า ทองหัก ทองชำรุด</li>
          <li>รับซื้อเครื่องประดับทอง</li>
          <li>รับซื้อนาฬิกาแบรนด์เนม (Rolex, Omega, Cartier ฯลฯ)</li>
          <li>ตรวจสอบเปอร์เซ็นต์ทองฟรี ด้วยเครื่อง XRF</li>
        </ul>
      </div>

      <div className="blog-article-cta">
        <h3>แวะมาที่ {b.shortName} ได้เลย</h3>
        <p>{b.address} · เปิดทุกวัน 10:00-20:00 น. · ตรวจทองต่อหน้าคุณ จ่ายเงินสดทันที</p>
        <div className="blog-article-cta-actions">
          <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            🧭 นำทางมาสาขานี้
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-outline">
            📞 โทร {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <nav className="blog-article-nav" aria-label="สาขาอื่น" style={{ marginTop: "var(--space-2xl)" }}>
        <span>สาขาอื่น:</span>
        {BRANCHES.filter((x) => x.slug !== b.slug).map((x) => (
          <Link key={x.slug} href={`/branch/${x.slug}`}>{x.shortName}</Link>
        ))}
        <Link href="/">กลับหน้าแรก</Link>
      </nav>
    </article>
  );
}
