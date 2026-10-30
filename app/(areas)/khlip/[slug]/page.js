import Link from "next/link";
import { notFound } from "next/navigation";
import { VIDEOS, getVideo, videoService } from "@/data/videos";
import { servicesData } from "@/data/services";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/data/site";

/* หน้าดูคลิป หน้าละ 1 คลิป — เนื้อหาอยู่ใน data/videos.js
   Google จัดทำดัชนีวิดีโอเฉพาะหน้าที่คลิปเป็นเนื้อหาหลัก คลิปในหน้าแรกและหน้าบริการจึงไม่ถูกเก็บ
   (Search Console: "วิดีโอไม่ได้อยู่ในหน้าดูวิดีโอ") */
export const dynamicParams = false;

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) return {};
  const title = `คลิป${v.headline}`;
  return {
    title,
    description: v.description,
    alternates: { canonical: `/khlip/${v.slug}` },
    openGraph: { title, description: v.description, type: "video.other", images: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`] },
  };
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok", day: "numeric", month: "short", year: "numeric" });
const formatLength = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default async function WatchPage({ params }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) notFound();
  const pageUrl = `${SITE_URL}/khlip/${v.slug}`;
  const heading = `คลิป${v.headline}`;
  const serviceSlug = videoService(v);
  const service = servicesData.find((s) => s.slug === serviceSlug);
  // คลิปหมวดเดียวกันขึ้นก่อน
  const others = VIDEOS.filter((o) => o.id !== v.id)
    .sort((a, b) => (videoService(b) === serviceSlug) - (videoService(a) === serviceSlug))
    .slice(0, 4);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: heading,
    description: v.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    uploadDate: v.uploadDate,
    duration: `PT${v.seconds}S`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    url: pageUrl,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "คลิปจากหน้าร้าน", item: `${SITE_URL}/khlip` },
      { "@type": "ListItem", position: 3, name: v.headline, item: pageUrl },
    ],
  };

  return (
    <article className="blog-article watch-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/" prefetch={false}>หน้าแรก</Link>
        <span>/</span>
        <Link href="/khlip">คลิปจากหน้าร้าน</Link>
      </nav>

      <header className="blog-article-header">
        <h1>{heading}</h1>
      </header>

      <div className="watch-frame">
        <iframe
          src={`https://www.youtube.com/embed/${v.id}?rel=0&playsinline=1`}
          title={heading}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="blog-article-content watch-text">
        <div className="blog-article-meta">
          <span>🎬 ความยาว {formatLength(v.seconds)} นาที</span>
          <span>📅 ลงคลิป {formatDate(v.uploadDate)}</span>
        </div>
        <p>{v.description}</p>
        <p>
          ตัวเลขในคลิปเป็นของลูกค้ารายนั้น ราคาจริงขึ้นกับน้ำหนัก เปอร์เซ็นต์ที่ตรวจได้ และราคาวันที่มาขาย
          {serviceSlug !== "silver-buying" && (
            <>
              {" "}ดูราคาล่าสุดที่ <Link href="/rakha-thong-wan-nee">ราคาทองวันนี้</Link>
            </>
          )}
          {service && (
            <>
              {" "}อ่านรายละเอียดบริการที่ <Link href={`/services/${service.slug}`}>{service.title}</Link>
            </>
          )}
        </p>

        <h2>คลิปอื่นจากหน้าร้าน</h2>
        <ul>
          {others.map((o) => (
            <li key={o.id}>
              <Link href={`/khlip/${o.slug}`}>{o.headline}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="blog-article-cta">
        <h3>อยากรู้ว่าของที่บ้านขายได้เท่าไหร่</h3>
        <p>ส่งรูปให้ประเมินฟรีทาง LINE {CONTACT.lineId} หรือโทร {CONTACT.phoneDisplay} · ตรวจต่อหน้าฟรี ไม่ขายก็ไม่เสียค่าใช้จ่าย</p>
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
