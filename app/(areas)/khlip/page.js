import Link from "next/link";
import { VIDEOS } from "@/data/videos";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/data/site";

/* หน้ารวมคลิปของร้าน ลิงก์ไปหน้าดูคลิปทีละคลิป (app/(areas)/khlip/[slug]/page.js) */
const TITLE = "คลิปจากหน้าร้าน หลอมทอง รับซื้อทอง นาฬิกา เครื่องเงิน";
const DESCRIPTION = "รวมคลิปจริงจากร้านหลอมทองพัทยา เฮงศิริ ทั้งการหลอมทองเก่า หลอมตัวเรือนนาฬิกาทอง กรอบพระเก่า และการรับซื้อเครื่องเงิน พร้อมน้ำหนักและเปอร์เซ็นต์ที่ตรวจได้จริง";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/khlip" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

export default function KhlipIndexPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "คลิปจากหน้าร้าน", item: `${SITE_URL}/khlip` },
    ],
  };

  return (
    <article className="blog-article watch-index">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/" prefetch={false}>หน้าแรก</Link>
        <span>/</span>
        <span>คลิปจากหน้าร้าน</span>
      </nav>

      <header className="blog-article-header">
        <h1>คลิปจากหน้าร้าน หลอมทองพัทยา เฮงศิริ</h1>
        <div className="blog-article-meta">
          <span>🎬 คลิปจริงจากร้าน {VIDEOS.length} คลิป</span>
        </div>
      </header>

      <div className="blog-article-content">
        <p>
          ดูขั้นตอนจริงที่ร้าน ตั้งแต่ชั่งน้ำหนัก หลอม ตรวจเปอร์เซ็นต์ จนถึงจ่ายเงินสด ตัวเลขในคลิปเป็นของลูกค้าแต่ละราย ราคาจริงขึ้นกับของที่นำมาและราคาวันที่มาขาย
        </p>
      </div>

      <div className="video-shorts-grid">
        {VIDEOS.map((v) => (
          <figure className="short-card" key={v.id}>
            <Link href={`/khlip/${v.slug}`} className="short-card-frame" aria-label={`ดูคลิป${v.headline}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- รูปปกจาก YouTube โหลดตรงเร็วกว่าผ่าน image optimizer */}
              <img src={`https://i.ytimg.com/vi/${v.id}/oar2.jpg`} alt="" loading="lazy" width={405} height={720} />
            </Link>
            <figcaption>
              <Link href={`/khlip/${v.slug}`}>{v.headline}</Link>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="watch-follow">
        <a href={CONTACT.youtubeUrl} target="_blank" rel="noopener noreferrer" className="video-shorts-follow">
          ดูคลิปทั้งหมดบน YouTube →
        </a>
      </p>
    </article>
  );
}
