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
/* ============================================================
   คลังรูปปกบทความ (รูปถ่ายจริงของร้าน ไม่ใช่รูป AI)
   ============================================================
   โยนรูปลงใน public/images/covers-pool/<หมวด>/ ได้เลย กี่รูปก็ได้
   ระบบจะสลับใช้เองอัตโนมัติ โดย:
     - บทความเดียวกัน จะได้รูปเดิมเสมอ (ไม่เปลี่ยนไปมาทุกครั้งที่ build)
     - บทความคนละชิ้น จะได้รูปคนละใบ (กระจายทั่วคลัง)
   ============================================================ */

const POOL_ROOT = path.join(process.cwd(), "public", "images", "covers-pool");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

// หมวดรูป — ใช้ชื่อนี้ในไฟล์ JSON ช่อง "coverTheme"
export const COVER_THEMES = {
  lomthong: "หลอมทอง ทองหลอมในเบ้า เตาหลอม",
  "truat-thong": "ตรวจเปอร์เซ็นต์ทอง เครื่อง XRF ตาชั่ง",
  "rap-sue-thong": "รับซื้อทอง เครื่องประดับ แหวน สร้อย",
  "thong-kao": "ทองเก่า ทองหัก ทองรูปพรรณ",
  "ran-thong": "หน้าร้าน ป้ายร้าน ภายในร้าน",
  "krob-phra": "กรอบพระ พระเครื่อง",
  nalika: "นาฬิกาแบรนด์เนม",
  brandname: "ของแบรนด์เนม กระเป๋า",
};

const DEFAULT_THEME = "rap-sue-thong";

function listPool(theme) {
  try {
    return fs
      .readdirSync(path.join(POOL_ROOT, theme))
      .filter((f) => IMAGE_EXT.test(f))
      .sort();
  } catch {
    return [];
  }
}

// แปลง slug เป็นตัวเลขคงที่ — ทำให้บทความเดิมได้รูปเดิมทุกครั้ง
function hashSlug(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * เลือกรูปปกให้บทความ
 * ลำดับการหา: หมวดที่ระบุ → หมวดใกล้เคียง → หมวดรวม (all) → รูปสำรอง
 * รองรับ usedSet เพื่อให้มั่นใจว่าแต่ละบทความได้รูปไม่ซ้ำกันเด็ดขาด
 */
export function pickCover(theme, slug, usedSet = null) {
  const order = [
    ...new Set(
      [
        theme,
        "thong-kao",
        "rap-sue-thong",
        "truat-thong",
        "lomthong",
        "ran-thong",
        "all",
        DEFAULT_THEME,
      ].filter(Boolean)
    ),
  ];
  for (const t of order) {
    const files = listPool(t);
    if (files.length > 0) {
      const startIdx = hashSlug(slug) % files.length;
      if (usedSet) {
        for (let i = 0; i < files.length; i++) {
          const candidate = `/images/covers-pool/${t}/${files[(startIdx + i) % files.length]}`;
          if (!usedSet.has(candidate)) {
            usedSet.add(candidate);
            return candidate;
          }
        }
        // ถ้าหมวดนี้ถูกใช้หมดแล้ว ให้ลองหาหมวดถัดไปใน order
        continue;
      }
      return `/images/covers-pool/${t}/${files[startIdx]}`;
    }
  }
  return "/images/covers/rap-sue-thong.jpg"; // กันเหนียว: คลังว่างทั้งหมด
}

const DEFAULTS = {
  category: "ความรู้",
  coverTheme: DEFAULT_THEME,
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
    if (Array.isArray(s.rows)) chars += s.rows.flat().join("").length;
  }
  return `${Math.max(3, Math.round(chars / 300))} นาที`;
}

/* ---------- ตรวจว่าไฟล์ JSON ใช้งานได้จริงไหม ---------- */
const ALLOWED_TYPES = new Set(["summary", "h2", "h3", "p", "ul", "ol", "quote", "table"]);

// ตาราง: head = หัวคอลัมน์, rows = แถว (จำนวนช่องต้องเท่าหัวคอลัมน์ ไม่งั้นตารางเบี้ยว)
function isValidTable(s) {
  return (
    Array.isArray(s.head) && s.head.length >= 2 &&
    Array.isArray(s.rows) && s.rows.length >= 1 &&
    s.rows.every((r) => Array.isArray(r) && r.length === s.head.length)
  );
}

function isValid(a) {
  if (!a || typeof a !== "object") return false;
  if (typeof a.slug !== "string" || !/^[a-z0-9-]+$/.test(a.slug)) return false;
  if (!a.title || !a.description || !Array.isArray(a.sections)) return false;
  // ทุก section ต้องเป็นชนิดที่รองรับ ไม่งั้นข้ามบทความนี้ (กัน AI สร้างชนิดมั่ว)
  return a.sections.every(
    (s) =>
      s &&
      ALLOWED_TYPES.has(s.type) &&
      (s.type === "table" ? isValidTable(s) : typeof s.text === "string" || Array.isArray(s.items))
  );
}

/* ---------- เติมค่าที่ขาดให้ครบ ---------- */
function normalize(raw, usedSet = null) {
  const dateIso = raw.date || new Date().toISOString().slice(0, 10);
  // ถ้า AI ระบุหมวดที่ไม่มีจริง ให้ใช้หมวดมาตรฐานแทน (กันรูปแตก)
  const theme = COVER_THEMES[raw.coverTheme] ? raw.coverTheme : DEFAULT_THEME;
  return {
    ...DEFAULTS,
    ...raw,
    coverTheme: theme,
    fallbackImage: pickCover(theme, raw.slug, usedSet),
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
 * - กำหนดรูปปกให้ไม่ซ้ำกันเด็ดขาด (No Duplicate Images)
 * - เรียงจากใหม่ไปเก่า
 */
export function getAutoArticles() {
  let files;
  try {
    files = fs.readdirSync(ARTICLE_DIR);
  } catch {
    return []; // ยังไม่มีโฟลเดอร์ = ยังไม่มีบทความอัตโนมัติ ไม่ถือว่า error
  }

  const validItems = [];
  for (const file of files) {
    if (!file.endsWith(".json") || file.startsWith("_")) continue;
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(ARTICLE_DIR, file), "utf8"));
      if (!isValid(raw)) {
        console.warn(`[articles] ข้ามไฟล์ที่ข้อมูลไม่ครบ: ${file}`);
        continue;
      }
      if (raw.published === false) continue; // ร่าง — ยังไม่เผยแพร่
      validItems.push(raw);
    } catch (e) {
      console.warn(`[articles] ข้ามไฟล์ที่อ่านไม่ได้: ${file} (${e.message})`);
    }
  }

  // เรียงตามลำดับจากเก่าไปใหม่ เพื่อให้บทความเดิมได้รูปเดิมคงที่เสมอ
  validItems.sort((a, b) => {
    const da = a.date || "";
    const db = b.date || "";
    const cmp = da.localeCompare(db);
    return cmp !== 0 ? cmp : (a.slug || "").localeCompare(b.slug || "");
  });

  const usedSet = new Set();
  const out = validItems.map((raw) => normalize(raw, usedSet));

  return out.sort((a, b) => b.dateIso.localeCompare(a.dateIso));
}

/** ดึงบทความเดียวตาม slug */
export function getAutoArticle(slug) {
  return getAutoArticles().find((a) => a.slug === slug) || null;
}
