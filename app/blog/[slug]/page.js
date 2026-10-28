import { EN_FOR_TH } from "@/data/enPages";
import Image from "next/image";
import Link from "next/link";
import { RichText, Section } from "@/components/ContentBlocks";
import { notFound } from "next/navigation";
import { getUploadedImage } from "@/lib/getImage";
import { getAutoArticles, getAutoArticle } from "@/lib/articles";
import { SITE_URL } from "@/data/site";
import { MELT_BONUS_HOOK } from "@/data/meltBonus";

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
    alternates: {
      canonical: `/blog/${article.slug}`,
      // บทความที่มีฉบับอังกฤษตรงกัน (data/enPages.js) → hreflang ทั้งสองฝั่ง
      ...(EN_FOR_TH[`/blog/${article.slug}`] && {
        languages: {
          th: `/blog/${article.slug}`,
          en: EN_FOR_TH[`/blog/${article.slug}`],
          "x-default": `/blog/${article.slug}`,
        },
      }),
    },
  };
}

export default async function AutoArticlePage({ params }) {
  const { slug } = await params;
  const article = getAutoArticle(slug);
  if (!article) notFound();

  const coverImage = getUploadedImage(`blog-${article.slug}`, article.fallbackImage);

  const pageUrl = `${SITE_URL}/blog/${article.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    keywords: article.keywords.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    // ผูกผู้เขียน/ผู้เผยแพร่กับธุรกิจหลักใน root layout → Google รู้ว่าบทความนี้เป็นของร้านไหน
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    datePublished: article.dateIso,
    dateModified: article.updatedIso || article.dateIso,
    image: coverImage.startsWith("http") ? coverImage : `${SITE_URL}${coverImage}`,
    inLanguage: "th-TH",
  };

  // สารบัญจากหัวข้อ h2 (โชว์เมื่อมีตั้งแต่ 3 หัวข้อ) — ช่วยคนอ่านบนมือถือ และ Google ใช้ทำลิงก์ "ข้ามไปส่วนนี้"
  const headingIds = new Map();
  article.sections.forEach((b, i) => {
    if (b.type === "h2") headingIds.set(i, `h-${headingIds.size + 1}`);
  });
  const toc = [...headingIds].map(([i, id]) => ({ id, text: article.sections[i].text.replace(/\*\*/g, "") }));

  // บทความที่เกี่ยวข้อง: หมวดรูปเดียวกันก่อน แล้วเติมด้วยบทความล่าสุด
  const others = getAutoArticles().filter((a) => a.slug !== article.slug);
  const related = [
    ...others.filter((a) => a.coverTheme === article.coverTheme),
    ...others.filter((a) => a.coverTheme !== article.coverTheme),
  ].slice(0, 3);

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
        <Link href="/" prefetch={false}>หน้าแรก</Link>
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
        {toc.length >= 3 && (
          <nav className="blog-toc" aria-label="สารบัญ">
            <p className="blog-toc-title">สารบัญ</p>
            <ol>
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {article.sections.map((block, i) => (
          <Section key={i} block={block} id={headingIds.get(i)} />
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
        {/* โปรหลอมทอง (data/meltBonus.js) ท้ายทุกบทความ — พี่สั่ง 29 ต.ค. 2026 ให้คนเห็นทุกครั้ง */}
        <p className="blog-article-cta-promo">
          <Link href="/services/gold-melting">
            <strong>{MELT_BONUS_HOOK}</strong> จากราคารับซื้อทองรูปพรรณ →
          </Link>
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

      {related.length > 0 && (
        <aside className="blog-related" aria-label="บทความที่เกี่ยวข้อง">
          <h2>บทความที่เกี่ยวข้อง</h2>
          <ul>
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`}>
                  <span className="blog-related-title">{a.title}</span>
                  <span className="blog-related-excerpt">{a.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
