import Link from "next/link";
import { notFound } from "next/navigation";
import { AREAS, getArea } from "@/data/areas";
import { BRANCHES } from "@/data/branches";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

/* ระยะเส้นตรง (กม.) ระหว่าง 2 พิกัด — ระยะขับรถจริงจะไกลกว่านี้ ในหน้าจึงบอกว่า "ระยะเส้นตรง" ชัดเจน */
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function branchesByDistance(area) {
  return BRANCHES.map((b) => ({
    ...b,
    km: distanceKm(area.lat, area.lng, b.lat, b.lng),
    // ไม่ใส่ origin → Google Maps ใช้ตำแหน่งปัจจุบันของลูกค้าเป็นจุดเริ่ม
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`,
  })).sort((x, y) => x.km - y.km);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const [nearest] = branchesByDistance(area);
  const title = `รับซื้อทอง ${area.name} · ขายทอง หลอมทอง ใกล้${area.name}`;
  const description = `คนอยู่${area.name} ขายทองเก่า ทองหัก ทอง K นาฬิกาแบรนด์เนม ที่${nearest.shortName} ห่างประมาณ ${Math.round(nearest.km)} กม. ตรวจ XRF ฟรี จ่ายเงินสดทันที เปิดทุกวัน 10:00-20:00 น. โทร ${CONTACT.phoneDisplay}`;
  return {
    title,
    description,
    keywords: area.keywords,
    alternates: { canonical: `/area/${area.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const branches = branchesByDistance(area);
  const nearest = branches[0];
  const pageUrl = `${SITE_URL}/area/${area.slug}`;

  // Service + areaServed — บอก Google ว่าธุรกิจหลัก (entity เดียวกับ root layout) ให้บริการคนในพื้นที่นี้
  // ไม่ประกาศ LocalBusiness ใหม่ที่พื้นที่นี้ เพราะร้านไม่มีหน้าร้านอยู่ที่นี่จริง
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `รับซื้อทอง หลอมทอง สำหรับลูกค้า${area.name}`,
    serviceType: "รับซื้อทอง หลอมทอง",
    url: pageUrl,
    areaServed: {
      "@type": "Place",
      name: area.name,
      geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lng },
    },
    provider: { "@id": `${SITE_URL}/#business` },
    availableChannel: branches.map((b) => ({
      "@type": "ServiceChannel",
      serviceLocation: { "@id": `${SITE_URL}/branch/${b.slug}#business` },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: `รับซื้อทอง ${area.name}`, item: pageUrl },
    ],
  };

  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <span>รับซื้อทอง {area.name}</span>
      </nav>

      <header className="blog-article-header">
        <h1>รับซื้อทอง {area.name} — ขายทองใกล้{area.name} ได้ราคาตามเนื้อทองจริง</h1>
        <div className="blog-article-meta">
          <span>📍 ใกล้สุด: {nearest.shortName} (~{nearest.km.toFixed(1)} กม.)</span>
          <span>🔬 ตรวจ XRF ฟรี</span>
          <span>🕐 ทุกวัน 10:00-20:00</span>
        </div>
      </header>

      <div className="blog-article-content">
        <p>{area.intro}</p>

        <h2>ร้านที่ใกล้{area.name}ที่สุด</h2>
        <p>
          ระยะด้านล่างเป็นระยะเส้นตรงจากใจกลาง{area.name} ระยะขับรถจริงจะไกลกว่านี้{" "}
          กด &quot;นำทาง&quot; เพื่อเปิดเส้นทางจากตำแหน่งของคุณใน Google Maps
        </p>
        <ul>
          {branches.map((b) => (
            <li key={b.slug}>
              <strong>
                <Link href={`/branch/${b.slug}`}>{b.shortName}</Link>
              </strong>{" "}
              — ประมาณ {b.km.toFixed(1)} กม. · {b.address} ·{" "}
              <a href={b.directionsUrl} target="_blank" rel="noopener noreferrer">
                นำทาง
              </a>
            </li>
          ))}
        </ul>

        <h2>เส้นทางจาก{area.name}</h2>
        <p>{area.route}</p>

        {area.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
            {s.links?.length > 0 && (
              <ul>
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <h2>คำถามจากลูกค้า{area.name}</h2>
        {area.faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="blog-article-cta">
        <h3>มาจาก{area.name} แวะ{nearest.shortName}ได้เลย</h3>
        <p>{nearest.address} · เปิดทุกวัน 10:00-20:00 น. · ใช้บัตรประชาชนตัวจริง ไม่มีใบเสร็จก็ขายได้</p>
        <div className="blog-article-cta-actions">
          <a href={nearest.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            🧭 นำทางไป{nearest.shortName}
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-outline">
            📞 โทร {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <nav className="blog-article-nav" aria-label="พื้นที่อื่น" style={{ marginTop: "var(--space-2xl)" }}>
        <span>พื้นที่อื่น:</span>
        {AREAS.filter((x) => x.slug !== area.slug).map((x) => (
          <Link key={x.slug} href={`/area/${x.slug}`}>{x.name}</Link>
        ))}
      </nav>
    </article>
  );
}
