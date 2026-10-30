import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ContentBlocks";
import { EN_PAGES, getEnPage } from "@/data/enPages";
import { CONTACT } from "@/data/contact";
import { BRANCHES } from "@/data/branches";
import { SITE_URL } from "@/data/site";

/* หน้าภาษาอังกฤษเพิ่มเติม — เนื้อหาอยู่ใน data/enPages.js ใช้ layout ภาษาอังกฤษของ app/en/layout.js */
export const dynamicParams = false;

export function generateStaticParams() {
  return EN_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getEnPage(slug);
  if (!page) return {};
  const path = `/en/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      ...(page.thPath && { languages: { th: page.thPath, en: path, "x-default": page.thPath } }),
    },
    openGraph: { type: "article", locale: "en_US", url: `${SITE_URL}${path}`, title: page.title, description: page.description },
  };
}

export default async function EnGuidePage({ params }) {
  const { slug } = await params;
  const page = getEnPage(slug);
  if (!page) notFound();
  const pageUrl = `${SITE_URL}/en/${page.slug}`;

  // ข้อ 22 ในแผน: ผูกหน้าอังกฤษกับร้านและ 2 สาขา (@id เดียวกับ app/layout.js → Google รวมเป็น entity เดียว)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    mentions: BRANCHES.map((b) => ({ "@id": `${SITE_URL}/branch/${b.slug}#business` })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Sell gold in Pattaya", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: pageUrl },
    ],
  };

  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/en">Sell gold in Pattaya</Link>
        <span>/</span>
        <span>{page.breadcrumb}</span>
      </nav>

      <header className="blog-article-header">
        <h1>{page.h1}</h1>
        <div className="blog-article-meta">
          <span>📍 2 shops in Pattaya</span>
          <span>🕐 Open daily</span>
          <span>🛂 Bring your passport</span>
        </div>
      </header>

      <div className="blog-article-content service-rich">
        {page.blocks.map((block, i) => (
          <Section key={i} block={block} />
        ))}

        <h2>Frequently asked questions</h2>
        {page.faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="blog-article-cta">
        <h3>Questions? Send photos first</h3>
        <p>Free quote on LINE · Free XRF test in front of you · Paid in Thai baht on the spot</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            💬 Send photos on LINE
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-outline">
            📞 Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <nav className="blog-article-nav" aria-label="More guides" style={{ marginTop: "var(--space-2xl)" }}>
        <span>More guides:</span>
        <Link href="/en">Sell gold</Link>
        <Link href="/en/gold-price-today">Gold price today</Link>
        {EN_PAGES.filter((p) => p.slug !== page.slug).map((p) => (
          <Link key={p.slug} href={`/en/${p.slug}`}>{p.breadcrumb}</Link>
        ))}
      </nav>
    </article>
  );
}
