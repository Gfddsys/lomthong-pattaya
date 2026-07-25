#!/usr/bin/env node
/* ============================================================
   สคริปต์สร้างบทความใหม่อัตโนมัติ  (หลอมทองพัทยา)
   ============================================================
   ใช้:  npm run new-article -- article-brief.json

   สคริปต์นี้ทำ 4 อย่างให้อัตโนมัติ:
     1. สร้างไฟล์บทความ  app/blog/<slug>/page.js  (พร้อม metadata + schema ครบ)
     2. เพิ่มบทความลงหน้ารวมบทความ  app/blog/page.js
     3. เพิ่ม URL ลง  app/sitemap.js
     4. สร้างโฟลเดอร์รูป  public/images/uploads/blog-<slug>/

   ปลอดภัย: ถ้ามีบทความ slug นี้อยู่แล้ว จะหยุดทันที ไม่ทับของเดิม
   ============================================================ */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- helper: สี/ข้อความใน terminal ---------- */
const ok = (m) => console.log("  \x1b[32m✓\x1b[0m " + m);
const info = (m) => console.log("  \x1b[36m•\x1b[0m " + m);
const die = (m) => {
  console.error("\n\x1b[31m✗ ผิดพลาด:\x1b[0m " + m + "\n");
  process.exit(1);
};

/* ---------- helper: escape ข้อความให้ปลอดภัยใน JSX ---------- */
// JSX มองอักขระ { } < > เป็นโค้ด — ต้องแปลงก่อน ไม่งั้น build พัง
function escapeJsx(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

// รองรับ **ตัวหนา** ในเนื้อความ → <strong>
function renderText(text) {
  const escaped = escapeJsx(text);
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// escape สำหรับใส่ใน string ของ JS (metadata, schema)
function jsString(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ").trim();
}

/* ---------- helper: วันที่ไทย (พ.ศ.) ---------- */
const TH_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
function thaiDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${TH_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`;
}

/* ---------- helper: ประเมินเวลาอ่าน ---------- */
function estimateReadTime(sections) {
  let chars = 0;
  for (const s of sections) {
    if (s.text) chars += s.text.length;
    if (s.items) chars += s.items.join("").length;
  }
  // ภาษาไทยอ่านราว 300 ตัวอักษร/นาที
  return `${Math.max(3, Math.round(chars / 300))} นาที`;
}

/* ============================================================
   1. อ่านไฟล์ brief
   ============================================================ */
const briefPath = process.argv[2];
if (!briefPath) {
  die(
    "ไม่ได้ระบุไฟล์ brief\n\n  วิธีใช้:  npm run new-article -- article-brief.json\n" +
      "  (ดูตัวอย่างไฟล์ brief ได้ที่ scripts/article-brief.example.json)"
  );
}
const briefFile = path.resolve(process.cwd(), briefPath);
if (!fs.existsSync(briefFile)) die(`หาไฟล์ไม่เจอ: ${briefFile}`);

let brief;
try {
  brief = JSON.parse(fs.readFileSync(briefFile, "utf8"));
} catch (e) {
  die(`ไฟล์ JSON ผิดรูปแบบ: ${e.message}`);
}

/* ---------- ตรวจว่าข้อมูลครบไหม ---------- */
const required = ["slug", "title", "description", "excerpt", "sections"];
const missing = required.filter((k) => !brief[k]);
if (missing.length) die(`ไฟล์ brief ขาดข้อมูล: ${missing.join(", ")}`);

if (!/^[a-z0-9-]+$/.test(brief.slug))
  die(`slug ต้องเป็นภาษาอังกฤษพิมพ์เล็ก ตัวเลข และขีดกลางเท่านั้น (ได้รับ: "${brief.slug}")`);

const slug = brief.slug;
const dateIso = brief.date || new Date().toISOString().slice(0, 10);
const dateTh = thaiDate(dateIso);
const readTime = brief.readTime || estimateReadTime(brief.sections);
const category = brief.category || "เคล็ดลับ";
const keywords = brief.keywords || [];
const faq = brief.faq || [];
const fallbackImage = brief.fallbackImage || "/images/blog-lomthong.png";
const imageAlt = brief.imageAlt || brief.title;
const breadcrumb = brief.breadcrumb || brief.title;

console.log(`\n\x1b[1mสร้างบทความใหม่:\x1b[0m ${brief.title}\n`);

/* ============================================================
   2. สร้างไฟล์บทความ app/blog/<slug>/page.js
   ============================================================ */
const articleDir = path.join(ROOT, "app", "blog", slug);
if (fs.existsSync(articleDir))
  die(`มีบทความ slug "${slug}" อยู่แล้ว — เปลี่ยน slug หรือลบโฟลเดอร์เดิมก่อน\n  ${articleDir}`);

/* ---------- แปลง sections เป็น JSX ---------- */
function renderSections(sections) {
  const out = [];
  for (const s of sections) {
    switch (s.type) {
      case "summary": // กล่องสรุปสั้นๆ ด้านบน (ช่วยให้ AI/Google หยิบไปตอบ)
        out.push(
          `        <div style={{ background: "#fdf8ec", borderLeft: "4px solid #d4a843", borderRadius: "8px", padding: "1.1rem 1.3rem", marginBottom: "1.8rem" }}>\n` +
            `          <p style={{ marginBottom: "0.6rem", fontWeight: 700 }}>สรุปสั้นๆ</p>\n` +
            `          <ul style={{ marginBottom: 0 }}>\n` +
            s.items.map((i) => `            <li>${renderText(i)}</li>`).join("\n") +
            `\n          </ul>\n        </div>`
        );
        break;
      case "h2":
        out.push(`        <h2>${renderText(s.text)}</h2>`);
        break;
      case "h3":
        out.push(`        <h3>${renderText(s.text)}</h3>`);
        break;
      case "p":
        out.push(`        <p>${renderText(s.text)}</p>`);
        break;
      case "ul":
        out.push(
          `        <ul>\n` +
            s.items.map((i) => `          <li>${renderText(i)}</li>`).join("\n") +
            `\n        </ul>`
        );
        break;
      case "ol":
        out.push(
          `        <ol>\n` +
            s.items.map((i) => `          <li>${renderText(i)}</li>`).join("\n") +
            `\n        </ol>`
        );
        break;
      case "quote":
        out.push(`        <blockquote>${renderText(s.text)}</blockquote>`);
        break;
      default:
        die(`ไม่รู้จัก section type "${s.type}" (ใช้ได้: summary, h2, h3, p, ul, ol, quote)`);
    }
  }
  return out.join("\n\n");
}

/* ---------- ชื่อ component (ต้องเป็น PascalCase) ---------- */
const componentName =
  "Article" + slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

/* ---------- FAQ schema (ถ้ามี) ---------- */
const faqSchemaBlock = faq.length
  ? `
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
${faq
  .map(
    (f) => `    {
      "@type": "Question",
      name: "${jsString(f.q)}",
      acceptedAnswer: {
        "@type": "Answer",
        text: "${jsString(f.a)}",
      },
    },`
  )
  .join("\n")}
  ],
};
`
  : "";

const faqScriptTag = faq.length
  ? `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />`
  : "";

/* ---------- บล็อก FAQ ที่แสดงให้คนอ่านเห็น ---------- */
const faqVisibleBlock = faq.length
  ? `

        <h2>คำถามที่พบบ่อย</h2>
${faq
  .map(
    (f) => `        <h3>${renderText(f.q)}</h3>
        <p>${renderText(f.a)}</p>`
  )
  .join("\n")}`
  : "";

const pageContent = `import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";

const COVER_IMAGE = getUploadedImage("blog-${slug}", "${fallbackImage}");

export const metadata = {
  title: "${jsString(brief.title)}",
  description:
    "${jsString(brief.description)}",
  keywords: [
${keywords.map((k) => `    "${jsString(k)}",`).join("\n")}
  ],
  openGraph: {
    title: "${jsString(brief.ogTitle || brief.title)}",
    description:
      "${jsString(brief.ogDescription || brief.description)}",
    type: "article",
  },
  alternates: {
    canonical: "/blog/${slug}",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "${jsString(brief.title)}",
  author: { "@type": "Organization", name: "หลอมทองพัทยา" },
  publisher: { "@type": "Organization", name: "หลอมทองพัทยา" },
  datePublished: "${dateIso}",
  dateModified: "${dateIso}",
  description:
    "${jsString(brief.description)}",
  image: COVER_IMAGE,
  inLanguage: "th-TH",
};
${faqSchemaBlock}
export default function ${componentName}() {
  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />${faqScriptTag}

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/blog">บทความ</Link>
        <span>/</span>
        <span>${escapeJsx(breadcrumb)}</span>
      </nav>

      <header className="blog-article-header">
        <h1>${escapeJsx(brief.title)}</h1>
        <div className="blog-article-meta">
          <span>📅 ${dateTh}</span>
          <span>⏱️ อ่าน ${readTime}</span>
          <span>✍️ หลอมทองพัทยา</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={COVER_IMAGE}
          alt="${jsString(imageAlt)}"
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
${renderSections(brief.sections)}${faqVisibleBlock}
      </div>

      <div className="blog-article-cta">
        <h3>${escapeJsx(brief.ctaTitle || "มีทองอยากขาย? ให้เราประเมินราคาฟรี")}</h3>
        <p>
          ${renderText(
            brief.ctaText ||
              "**หลอมทองพัทยา** รับซื้อทองเก่า ทองหัก ทองชำรุด ตรวจเปอร์เซ็นต์ด้วยเครื่อง XRF ต่อหน้า ให้ราคาสูง จ่ายเงินสดทันที"
          )}
        </p>
        <div className="blog-article-cta-actions">
          <Link href="${brief.ctaLink || "/services/gold-buying"}" className="btn btn-primary">
            ${escapeJsx(brief.ctaLinkText || "ดูบริการรับซื้อทอง")}
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            ติดต่อประเมินราคาฟรี
          </Link>
        </div>
      </div>
    </article>
  );
}
`;

fs.mkdirSync(articleDir, { recursive: true });
fs.writeFileSync(path.join(articleDir, "page.js"), pageContent, "utf8");
ok(`สร้างไฟล์บทความ  app/blog/${slug}/page.js`);

/* ============================================================
   3. เพิ่มลงหน้ารวมบทความ app/blog/page.js
   ============================================================ */
const blogListPath = path.join(ROOT, "app", "blog", "page.js");
let blogList = fs.readFileSync(blogListPath, "utf8");

if (blogList.includes(`slug: "${slug}"`)) {
  info(`ข้าม — มี "${slug}" ในหน้ารวมบทความแล้ว`);
} else {
  const entry = `  {
    slug: "${slug}",
    title: "${jsString(brief.title)}",
    excerpt:
      "${jsString(brief.excerpt)}",
    image: "${fallbackImage}",
    imageAlt: "${jsString(imageAlt)}",
    date: "${dateTh}",
    readTime: "${readTime}",
    category: "${jsString(category)}",
  },
`;
  const marker = "const articles = [\n";
  const idx = blogList.indexOf(marker);
  if (idx === -1) die("หา `const articles = [` ใน app/blog/page.js ไม่เจอ");
  blogList = blogList.slice(0, idx + marker.length) + entry + blogList.slice(idx + marker.length);
  fs.writeFileSync(blogListPath, blogList, "utf8");
  ok("เพิ่มลงหน้ารวมบทความ  app/blog/page.js");
}

/* ============================================================
   4. เพิ่ม URL ลง sitemap
   ============================================================ */
const sitemapPath = path.join(ROOT, "app", "sitemap.js");
let sitemap = fs.readFileSync(sitemapPath, "utf8");

if (sitemap.includes(`/blog/${slug}\``)) {
  info(`ข้าม — มี "${slug}" ใน sitemap แล้ว`);
} else {
  const entry = `    {
      url: \`\${baseUrl}/blog/${slug}\`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
`;
  // แทรกก่อนวงเล็บปิดของ return array (ตัวสุดท้ายของไฟล์)
  const closeIdx = sitemap.lastIndexOf("  ];");
  if (closeIdx === -1) die("หาจุดปิด array ใน app/sitemap.js ไม่เจอ");
  sitemap = sitemap.slice(0, closeIdx) + entry + sitemap.slice(closeIdx);
  fs.writeFileSync(sitemapPath, sitemap, "utf8");
  ok("เพิ่ม URL ลง  app/sitemap.js");
}

/* ============================================================
   5. สร้างโฟลเดอร์รูป
   ============================================================ */
const imgDir = path.join(ROOT, "public", "images", "uploads", `blog-${slug}`);
if (fs.existsSync(imgDir)) {
  info(`ข้าม — มีโฟลเดอร์รูปอยู่แล้ว`);
} else {
  fs.mkdirSync(imgDir, { recursive: true });
  fs.writeFileSync(
    path.join(imgDir, "README.txt"),
    `วางรูปปกบทความไว้ที่นี่ 1 รูป — ไฟล์ชื่ออะไรก็ได้ ไม่ต้องเปลี่ยนชื่อ\n\n` +
      `บทความ: ${brief.title}\n` +
      `ขนาดที่แนะนำ: 1200 x 675 px (อัตราส่วน 16:9)\n\n` +
      `ถ้ายังไม่วางรูป ระบบจะใช้รูปสำรอง: ${fallbackImage}\n`,
    "utf8"
  );
  ok(`สร้างโฟลเดอร์รูป  public/images/uploads/blog-${slug}/`);
}

/* ============================================================
   เสร็จ
   ============================================================ */
console.log(`
\x1b[1m\x1b[32mเสร็จเรียบร้อย\x1b[0m

  ขั้นต่อไป:
    1. วางรูปปกลงใน  public/images/uploads/blog-${slug}/
    2. รัน  npm run build   เพื่อตรวจว่าไม่มี error
    3. เปิดดูที่  http://localhost:3000/blog/${slug}   (npm run dev)
    4. Commit + Push ขึ้น GitHub
`);
