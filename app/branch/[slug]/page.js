import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANCHES, getBranch } from "@/data/branches";
import { CONTACT } from "@/data/contact";
import { servicesData } from "@/data/services";
import { getAutoArticles } from "@/lib/articles";
import { SITE_URL } from "@/data/site";


/* คำถามที่พบบ่อยของแต่ละสาขา — ข้อมูลตรงกับบทความในเว็บ (ใช้บัตร ปชช.ตัวจริง, ไม่มีใบเสร็จก็ขายได้, ตรวจ XRF ฟรี)
   ใส่ชื่อพื้นที่ของสาขาในคำถาม เพื่อให้ตรงกับคำค้นแบบ "ร้านทอง <พื้นที่>" */
function branchFaq(b) {
  return [
    {
      q: `ร้านรับซื้อทอง${b.area} อยู่ตรงไหน`,
      a: `${b.name} ตั้งอยู่ที่ ${b.address} กดปุ่ม "นำทางมาสาขานี้" เพื่อเปิด Google Maps ได้ทันที หรือโทร ${CONTACT.phoneDisplay} สอบถามเส้นทาง`,
    },
    {
      q: `${b.shortName} เปิดกี่โมง เปิดวันอาทิตย์ไหม`,
      a: `เปิดทุกวัน 10:00 - 20:00 น. รวมวันเสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ์`,
    },
    {
      q: "ขายทองต้องใช้เอกสารอะไรบ้าง",
      a: "ใช้บัตรประจำตัวประชาชนตัวจริงของผู้ขาย (ใช้สำเนาแทนไม่ได้) ส่วนใบรับประกันหรือใบเสร็จ ไม่มีก็ขายได้",
    },
    {
      q: "ตรวจทองเสียค่าใช้จ่ายไหม",
      a: "ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ฟรี ใช้เวลาไม่กี่นาที ทำต่อหน้าลูกค้าทุกขั้นตอน ไม่ขายก็ไม่มีค่าใช้จ่าย",
    },
    {
      q: "ขายทองแล้วได้เงินสดเลยไหม",
      a: "ได้ จ่ายเงินสดทันทีหลังตกลงราคา หรือเลือกรับโอนเข้าบัญชีธนาคารได้ตามสะดวก",
    },
  ];
}

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
    // @id เดียวกับใน app/layout.js → Google รวมเป็น entity เดียว ไม่ใช่ร้านซ้ำ 2 ร้าน
    "@id": `${SITE_URL}/branch/${b.slug}#business`,
    name: b.name,
    alternateName: b.gbpName,
    parentOrganization: { "@id": `${SITE_URL}/#business` },
    image: `${SITE_URL}/images/og-cover.jpg`,
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

  const faq = branchFaq(b);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // บทความที่พูดถึงพื้นที่ของสาขานี้ขึ้นก่อน แล้วเติมด้วยบทความล่าสุด (ลิงก์ภายใน = ส่งน้ำหนัก SEO ระหว่างหน้า)
  const articles = getAutoArticles();
  const areaFirst = [
    ...articles.filter((a) => a.title.includes(b.area)),
    ...articles.filter((a) => !a.title.includes(b.area)),
  ].slice(0, 6);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          {servicesData.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>{s.title}</Link>
            </li>
          ))}
        </ul>

        <h2>คำถามที่พบบ่อย — {b.shortName}</h2>
        {faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        {areaFirst.length > 0 && (
          <>
            <h2>บทความที่น่าอ่านก่อนมาขายทอง</h2>
            <ul>
              {areaFirst.map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`}>{a.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
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
