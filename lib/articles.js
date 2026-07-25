import fs from "fs";
import path from "path";

/* ============================================================
   ระบบอ่านบทความอัตโนมัติจากโฟลเดอร์ content/articles/
   ============================================================
   วางไฟล์ JSON 1 ไฟล์ = ได้บทความ 1 หน้า โดยไม่ต้องแก้โค้ดใดๆ
   ระบบจะสร้างให้เองทั้ง:
     - หน้าบทความ /blog/<slug>
     - การ์ดในหน้ารวมบทความ /blog
     - URL ใน sitemap.xml

   ใช้กับ n8n / automation ได้: แค่ commit ไฟล์ JSON เข้ามาในโฟลเดอร์นี้
   ============================================================ */

const ARTICLE_DIR = path.join(process.cwd(), "content", "articles");

/* ---------- ค่าเริ่มต้นเมื่อไฟล์ JSON ไม่ได้ระบุ ---------- */
const DEFAULTS = {
  category: "ความรู้",
  fallbackImage: "/images/blog-lomthong.png",
  ctaTitle: "มีทองอยากขาย? ให้เราประเมินราคาฟรี",
  ctaText:
    "**หลอมทองพัทยา** รับซื้อทองเก่า ทองหัก ทองชำรุด ตรวจเปอร์เซ็นต์ด้วยเครื่อง XRF ต่อหน้า ให้ราคาสูง จ่ายเงินสดทันที",
  ctaLink: "/services/gold-buying",
  ctaLinkText: "ดูบริการรับซื้อทอง",
};

const TH_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

/** แปลงวันที่ ISO (2026-07-25) เป็นวันที่ไทย (25 กรกฎาคม 2569) */
export function toThaiDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${TH_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`;
}

/** ประเมินเวลาอ่านจากความยาวเนื้อหา (ภาษาไทย ~300 ตัวอักษร/นาที) */
function estimateReadTime(sections = []) {
  let chars = 0;
  for (const s of sections) {
    if (s.text) chars += String(s.text).length;
    if (Array.isArray(s.items)) chars += s.items.join("").length;
  }
  return `${Math.max(3, Math.round(chars / 300))} นาที`;
}

/* ---------- ตรวจว่าไฟล์ JSON ใช้งานได้จริงไหม ---------- */
const ALLOWED_TYPES = new Set(["summary", "h2", "h3", "p", "ul", "ol", "quote"]);

function isValid(a) {
  if (!a || typeof a !== "object") return false;
  if (typeof a.slug !== "string" || !/^[a-z0-9-]+$/.test(a.slug)) return false;
  if (!a.title || !a.description || !Array.isArray(a.sections)) return false;
  // ทุก section ต้องเป็นชนิดที่รองรับ ไม่งั้นข้ามบทความนี้ (กัน AI สร้างชนิดมั่ว)
  return a.sections.every(
    (s) =>
      s &&
      ALLOWED_TYPES.has(s.type) &&
      (typeof s.text === "string" || Array.isArray(s.items))
  );
}

/* ---------- เติมค่าที่ขาดให้ครบ ---------- */
function normalize(raw) {
  const dateIso = raw.date || new Date().toISOString().slice(0, 10);
  return {
    ...DEFAULTS,
    ...raw,
    dateIso,
    date: toThaiDate(dateIso),
    readTime: raw.readTime || estimateReadTime(raw.sections),
    keywords: Array.isArray(raw.keywords) ? raw.keywords : [],
    faq: Array.isArray(raw.faq) ? raw.faq : [],
    excerpt: raw.excerpt || raw.description,
    imageAlt: raw.imageAlt || raw.title,
    breadcrumb: raw.breadcrumb || raw.title,
  };
}

/**
 * อ่านบทความทั้งหมดจาก content/articles/
 * - ข้ามไฟล์ที่ขึ้นต้นด้วย _ (ไฟล์ตัวอย่าง/ร่าง)
 * - ข้ามบทความที่ตั้ง "published": false
 * - เรียงจากใหม่ไปเก่า
 */
export function getAutoArticles() {
  let files;
  try {
    files = fs.readdirSync(ARTICLE_DIR);
  } catch {
    return []; // ยังไม่มีโฟลเดอร์ = ยังไม่มีบทความอัตโนมัติ ไม่ถือว่า error
  }

  const out = [];
  for (const file of files) {
    if (!file.endsWith(".json") || file.startsWith("_")) continue;
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(ARTICLE_DIR, file), "utf8"));
      if (!isValid(raw)) {
        console.warn(`[articles] ข้ามไฟล์ที่ข้อมูลไม่ครบ: ${file}`);
        continue;
      }
      if (raw.published === false) continue; // ร่าง — ยังไม่เผยแพร่
      out.push(normalize(raw));
    } catch (e) {
      console.warn(`[articles] ข้ามไฟล์ที่อ่านไม่ได้: ${file} (${e.message})`);
    }
  }

  return out.sort((a, b) => b.dateIso.localeCompare(a.dateIso));
}

/** ดึงบทความเดียวตาม slug */
export function getAutoArticle(slug) {
  return getAutoArticles().find((a) => a.slug === slug) || null;
}
