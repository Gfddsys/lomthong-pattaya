import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";
import { getAutoArticles } from "@/lib/articles";

const IMG_LOMTHONG = getUploadedImage("blog-lomthong", "/images/blog-lomthong.png");
const IMG_CHECK_GOLD = getUploadedImage("blog-check-gold", "/images/blog-check-gold.png");
const IMG_INSPECTION = getUploadedImage("inspection", "/images/inspection.png");
const IMG_GOLD_PRICE = getUploadedImage("blog-gold-price", "/images/blog-gold-price.png");

/* ============================================
   ข้อมูลบทความทั้งหมด
   เพิ่มบทความใหม่ได้ที่นี่
   ============================================ */
const articles = [
];

/* ============================================
   รวมบทความอัตโนมัติ (จาก content/articles/*.json)
   เข้ากับบทความเดิมด้านบน — บทความใหม่ขึ้นก่อน
   ============================================ */
function getAllArticles() {
  const auto = getAutoArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    image: a.fallbackImage,
    imageAlt: a.imageAlt,
    date: a.date,
    readTime: a.readTime,
    category: a.category,
  }));
  // กันซ้ำ: ถ้ามี slug ตรงกับบทความเดิม ให้ใช้ของเดิม
  const existing = new Set(articles.map((a) => a.slug));
  return [...auto.filter((a) => !existing.has(a.slug)), ...articles];
}

export const metadata = {
  title: "บทความ | ความรู้เรื่องทอง หลอมทอง รับซื้อทอง ราคาทอง พัทยา ชลบุรี",
  description:
    "รวมบทความให้ความรู้เรื่องทองคำ การหลอมทอง รับซื้อทองพัทยา ขายทองเก่า ตรวจสอบทองฟรี แนวโน้มราคาทอง และเคล็ดลับดีๆ จาก หลอมทองพัทยา บริการครอบคลุมพัทยา ชลบุรี บางละมุง ศรีราชา",
  // สำคัญ: ต้องกำหนด canonical ของหน้านี้เอง ไม่งั้นจะสืบทอด canonical ของหน้าแรกจาก root layout มาแทน
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "บทความเรื่องทอง",
    "หลอมทองพัทยา",
    "รับซื้อทองพัทยา",
    "ขายทองเก่าพัทยา",
    "ตรวจสอบทองฟรี พัทยา",
    "ร้านรับซื้อทอง ชลบุรี",
    "ร้านทอง บางละมุง",
    "หลอมทอง ศรีราชา",
    "วิธีตรวจสอบทองแท้",
    "ราคาทอง 2569",
    "ความรู้เรื่องทองคำ",
  ],
  openGraph: {
    title: "บทความ | หลอมทองพัทยา",
    description:
      "รวมบทความให้ความรู้เรื่องทองคำ การหลอมทอง วิธีตรวจสอบทองแท้ แนวโน้มราคาทอง",
    type: "website",
  },
};

export default function BlogPage() {
  const allArticles = getAllArticles();
  return (
    <>
      {/* Blog Hero Banner */}
      <section className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <div className="container">
          <div className="blog-hero-content">
            <span className="section-label">บทความ</span>
            <h1 className="blog-hero-title">
              ความรู้เรื่อง<span className="gold-text">ทองคำ</span>
            </h1>
            <p className="blog-hero-subtitle">
              รวมบทความให้ความรู้เกี่ยวกับทองคำ การหลอมทอง
              เคล็ดลับดีๆ และแนวโน้มราคาทอง จากผู้เชี่ยวชาญ หลอมทองพัทยา
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="section section-dark">
        <div className="container">
          <div className="blog-grid">
            {allArticles.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article.slug}
                className="blog-card"
              >
                <div className="blog-card-image">
                  <Image
                    src={getUploadedImage(`blog-${article.slug}`, article.image)}
                    alt={article.imageAlt}
                    width={600}
                    height={400}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  <span className="blog-card-category">{article.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>📅 {article.date}</span>
                    <span>⏱️ อ่าน {article.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{article.title}</h2>
                  <p className="blog-card-excerpt">{article.excerpt}</p>
                  <span className="blog-card-link">
                    อ่านเพิ่มเติม →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="blog-cta">
            <h3>
              สนใจบริการ<span className="gold">หลอมทองพัทยา</span>?
            </h3>
            <p>
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี ให้ราคายุติธรรม จ่ายเงินทันที
            </p>
            <div className="blog-cta-actions">
              <Link href="/#contact" className="btn btn-primary">
                ติดต่อเรา
              </Link>
              <Link href="/" className="btn btn-outline">
                กลับหน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
