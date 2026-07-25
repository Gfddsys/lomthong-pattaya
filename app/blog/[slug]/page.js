import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUploadedImage } from "@/lib/getImage";
import { getAutoArticles, getAutoArticle } from "@/lib/articles";

/* ============================================================
   หน้าบทความอัตโนมัติ
   ============================================================
   route นี้รองรับบทความทุกชิ้นที่อยู่ใน content/articles/*.json
   บทความเก่าที่มีโฟลเดอร์ของตัวเอง (เช่น /blog/rap-sue-thong-pattaya)
   จะยังทำงานเหมือนเดิม เพราะ Next.js ให้ static route ชนะ dynamic route
   ============================================================ */

// สร้างเฉพาะ slug ที่มีไฟล์จริง — slug อื่นให้ 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAutoArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getAutoArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.ogTitle || article.title,
      description: article.ogDescription || article.description,
      type: "article",
    },
    alternates: { canonical: `/blog/${article.slug}` },
  };
}

/* ---------- แปลง **ตัวหนา** ในข้อความเป็น <strong> ---------- */
function RichText({ children }) {
  const text = String(children ?? "");
  const parts = text.split(/\*\*(.+?)\*\*/g);
  // index คี่ = ข้อความที่อยู่ในดอกจันคู่
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

/* ---------- วาดเนื้อหาแต่ละบล็อก ---------- */
function Section({ block }) {
  switch (block.type) {
    case "summary":
      return (
        <div
          style={{
            background: "#fdf8ec",
            borderLeft: "4px solid #d4a843",
            borderRadius: "8px",
            padding: "1.1rem 1.3rem",
            marginBottom: "1.8rem",
          }}
        >
          <p style={{ marginBottom: "0.6rem", fontWeight: 700 }}>สรุปสั้นๆ</p>
          <ul style={{ marginBottom: 0 }}>
            {block.items.map((item, i) => (
              <li key={i}>
                <RichText>{item}</RichText>
              </li>
            ))}
          </ul>
        </div>
      );
    case "h2":
      return (
        <h2>
          <RichText>{block.text}</RichText>
        </h2>
      );
    case "h3":
      return (
        <h3>
          <RichText>{block.text}</RichText>
        </h3>
      );
    case "p":
      return (
        <p>
          <RichText>{block.text}</RichText>
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText>{item}</RichText>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText>{item}</RichText>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          <RichText>{block.text}</RichText>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function AutoArticlePage({ params }) {
  const { slug } = await params;
  const article = getAutoArticle(slug);
  if (!article) notFound();

  const coverImage = getUploadedImage(`blog-${article.slug}`, article.fallbackImage);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: { "@type": "Organization", name: "หลอมทองพัทยา" },
    publisher: { "@type": "Organization", name: "หลอมทองพัทยา" },
    datePublished: article.dateIso,
    dateModified: article.dateIso,
    description: article.description,
    image: coverImage,
    inLanguage: "th-TH",
  };

  const faqSchema =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <article className="blog-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/blog">บทความ</Link>
        <span>/</span>
        <span>{article.breadcrumb}</span>
      </nav>

      <header className="blog-article-header">
        <h1>{article.title}</h1>
        <div className="blog-article-meta">
          <span>📅 {article.date}</span>
          <span>⏱️ อ่าน {article.readTime}</span>
          <span>✍️ หลอมทองพัทยา</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={coverImage}
          alt={article.imageAlt}
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
        {article.sections.map((block, i) => (
          <Section key={i} block={block} />
        ))}

        {article.faq.length > 0 && (
          <>
            <h2>คำถามที่พบบ่อย</h2>
            {article.faq.map((f, i) => (
              <div key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="blog-article-cta">
        <h3>{article.ctaTitle}</h3>
        <p>
          <RichText>{article.ctaText}</RichText>
        </p>
        <div className="blog-article-cta-actions">
          <Link href={article.ctaLink} className="btn btn-primary">
            {article.ctaLinkText}
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            ติดต่อประเมินราคาฟรี
          </Link>
        </div>
      </div>
    </article>
  );
}
