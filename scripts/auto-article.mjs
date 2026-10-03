#!/usr/bin/env node
/* ============================================================
   เขียนบทความ SEO อัตโนมัติด้วย Claude → content/articles/<slug>.json
   ============================================================
   รันโดย GitHub Actions (.github/workflows/auto-article.yml) ทุก 3 วัน
   รันเองก็ได้:  ANTHROPIC_API_KEY=... node scripts/auto-article.mjs
   ทดสอบด่านตรวจโดยไม่เรียก AI:  node scripts/auto-article.mjs --check <ไฟล์.json>

   ด่านตรวจก่อนบันทึก (ไม่ผ่าน = ให้ AI แก้ใหม่ สูงสุด 3 รอบ ถ้ายังไม่ผ่าน = ไม่ขึ้นเว็บ):
   1. โครงสร้างครบ (slug, sections, faq ฯลฯ)
   2. หัวข้อไม่ซ้ำ/ไม่คล้ายบทความเดิม (กันบทความแย่งอันดับกันเอง)
   3. ข้อเท็จจริงของร้านถูกต้อง (เบอร์โทร เวลาเปิด ไม่อ้างบริการที่ไม่มี ไม่ใส่ราคาทองตายตัว)
   4. ไม่มีสำนวน AI (กฎชุดเดียวกับ npm run check-slop)
   ============================================================ */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { CONTACT } from "../data/contact.js";
import { BRANCHES } from "../data/branches.js";
import { AREAS } from "../data/areas.js";
import { servicesData } from "../data/services.js";
import { RULES, findSlopHits, structureWarnings } from "./slop-rules.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTICLE_DIR = path.join(ROOT, "content", "articles");
const STATIC_BLOG_DIR = path.join(ROOT, "app", "blog");
const MAX_ATTEMPTS = 3;
// หัวข้อที่คล้ายบทความเดิมเกินค่านี้ = ซ้ำ (วัดจากตัวอักษรคู่ที่ซ้ำกันในชื่อบทความ 0-1)
// ตั้งจากการเทียบบทความเดิม: คู่ที่ซ้ำจริง (วันอาทิตย์ / เงินสด / ใบเสร็จ / บัตรประชาชน) ได้ 0.34-0.68
const SIMILARITY_LIMIT = 0.34;

const COVER_THEMES = ["lomthong", "truat-thong", "rap-sue-thong", "thong-kao", "ran-thong", "krob-phra", "nalika", "brandname"];
const SECTION_TYPES = ["summary", "h2", "h3", "p", "ul", "ol", "quote", "table"];
const CTA_LINKS = [
  ...servicesData.map((s) => `/services/${s.slug}`),
  ...BRANCHES.map((b) => `/branch/${b.slug}`),
  ...AREAS.map((a) => `/area/${a.slug}`),
  "/rap-lomthong-pattaya",
];

/* ---------- รูปแบบผลลัพธ์ที่บังคับให้ AI ตอบ (structured outputs) ---------- */
const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  excerpt: z.string(),
  keywords: z.array(z.string()),
  category: z.string(),
  imageAlt: z.string(),
  coverTheme: z.enum(COVER_THEMES),
  breadcrumb: z.string(),
  sections: z.array(
    z.object({
      type: z.enum(SECTION_TYPES),
      text: z.string().optional(),
      items: z.array(z.string()).optional(),
      // type "table" เท่านั้น
      caption: z.string().optional(),
      head: z.array(z.string()).optional(),
      rows: z.array(z.array(z.string())).optional(),
    })
  ),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  ctaTitle: z.string(),
  ctaText: z.string(),
  ctaLink: z.enum(CTA_LINKS),
  ctaLinkText: z.string(),
});

/* ---------- วันนี้ตามเวลาไทย (YYYY-MM-DD) ---------- */
function todayBangkok() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(new Date());
}

/* ---------- รวมบทความที่มีอยู่แล้ว (JSON + หน้าที่เขียนโค้ดไว้เอง) ---------- */
function loadExisting() {
  const list = [];
  for (const f of fs.readdirSync(ARTICLE_DIR)) {
    if (!f.endsWith(".json") || f.startsWith("_")) continue;
    try {
      const a = JSON.parse(fs.readFileSync(path.join(ARTICLE_DIR, f), "utf8"));
      list.push({ slug: a.slug, title: a.title, keyword: a.keywords?.[0] || "" });
    } catch {
      /* ไฟล์เสียข้ามไป — lib/articles.js ก็ข้ามเหมือนกัน */
    }
  }
  for (const dir of fs.readdirSync(STATIC_BLOG_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name.startsWith("[")) continue;
    const file = path.join(STATIC_BLOG_DIR, dir.name, "page.js");
    if (!fs.existsSync(file)) continue;
    const m = fs.readFileSync(file, "utf8").match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (m) list.push({ slug: dir.name, title: m[1], keyword: "" });
  }
  return list;
}

/* ---------- ความคล้ายของชื่อบทความ (ภาษาไทยไม่มีเว้นวรรค จึงเทียบทีละคู่ตัวอักษร) ---------- */
// ตัดคำที่ทุกบทความมีเหมือนกันออกก่อน ไม่งั้นทุกหัวข้อจะดูคล้ายกันหมด
const COMMON_WORDS = [
  "หลอมทอง", "รับซื้อทอง", "ร้านทอง", "ขายทอง", "รับซื้อ", "พัทยา", "ชลบุรี",
  "ให้ราคาสูง", "ราคาสูง", "ร้านไหน", "ที่ไหน", "ไหนดี", "เช็กเลย", "เช็คเลย", "ร้าน", "ไหม", "ได้",
];
function bigrams(title) {
  let t = title.toLowerCase();
  for (const w of COMMON_WORDS) t = t.split(w).join(" ");
  t = t.replace(/[^\p{L}\p{N}]+/gu, "");
  const set = new Set();
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  return set;
}
export function similarity(a, b) {
  const x = bigrams(a);
  const y = bigrams(b);
  if (!x.size || !y.size) return 0;
  let inter = 0;
  for (const g of x) if (y.has(g)) inter++;
  return inter / (x.size + y.size - inter);
}

/* ---------- ด่านตรวจ: คืนรายการปัญหา (ว่าง = ผ่าน) ---------- */
function collectAllText(a) {
  const out = [a.title, a.description, a.excerpt, a.ctaTitle, a.ctaText];
  for (const s of a.sections) out.push(s.text || "", ...(s.items || []), ...(s.rows || []).flat());
  for (const f of a.faq) out.push(f.q, f.a);
  return out.join("\n");
}

export function validate(a, existing) {
  const problems = [];

  // 1) โครงสร้าง
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) problems.push(`slug "${a.slug}" ต้องเป็น a-z 0-9 คั่นด้วย - เท่านั้น`);
  if (a.title.length > 70) problems.push(`title ยาว ${a.title.length} ตัวอักษร (ไม่ควรเกิน 60)`);
  if (a.description.length < 90 || a.description.length > 170) problems.push(`description ยาว ${a.description.length} ตัวอักษร (ควร 120-160)`);
  // ย่อหน้าสั้นอ่านง่ายบนมือถือ + เนื้อหา 3,000 ตัวอักษรขึ้นไป → ต้องมีบล็อกเยอะพอ ไม่งั้น AI ต้องยุบย่อหน้าให้ยาว
  if (a.sections.length < 15 || a.sections.length > 45) problems.push(`sections มี ${a.sections.length} บล็อก (ต้อง 18-40)`);
  if (a.sections[0]?.type !== "summary") problems.push("section แรกต้องเป็น summary");
  for (const [i, s] of a.sections.entries()) {
    if (s.type === "table") {
      const ok = s.head?.length >= 2 && s.rows?.length >= 1 && s.rows.every((r) => r.length === s.head.length);
      if (!ok) problems.push(`section ${i} (table) ต้องมี head อย่างน้อย 2 คอลัมน์ และทุกแถวใน rows ต้องมีจำนวนช่องเท่า head`);
      continue;
    }
    const needsItems = ["summary", "ul", "ol"].includes(s.type);
    if (needsItems && !(s.items?.length > 0)) problems.push(`section ${i} (${s.type}) ต้องมี items`);
    if (!needsItems && !s.text?.trim()) problems.push(`section ${i} (${s.type}) ต้องมี text`);
  }
  if (a.faq.length < 3 || a.faq.length > 5) problems.push(`faq มี ${a.faq.length} ข้อ (ต้อง 3-4)`);
  if (a.keywords.length < 3) problems.push("keywords ต้องมีอย่างน้อย 3 คำ");

  // 1.5) SEO on-page — คีย์เวิร์ดหลักต้องอยู่ในจุดที่ Google ให้น้ำหนัก, เนื้อหาต้องลึกพอ, มีลิงก์ภายใน
  const norm = (t) => String(t || "").replace(/\*\*/g, "").replace(/\s+/g, "");
  const kw = norm(a.keywords[0]);
  if (kw) {
    if (!norm(a.title).includes(kw)) problems.push(`คีย์เวิร์ดหลัก "${a.keywords[0]}" ต้องอยู่ใน title (ไว้ช่วงต้นจะดีที่สุด)`);
    if (!norm(a.description).includes(kw)) problems.push(`คีย์เวิร์ดหลัก "${a.keywords[0]}" ต้องอยู่ใน description`);
    const firstP = a.sections.find((s) => s.type === "p");
    if (!norm(firstP?.text).includes(kw)) problems.push(`คีย์เวิร์ดหลัก "${a.keywords[0]}" ต้องอยู่ในย่อหน้าแรก`);
    if (!a.sections.some((s) => s.type === "h2" && norm(s.text).includes(kw))) problems.push(`คีย์เวิร์ดหลัก "${a.keywords[0]}" ต้องอยู่ในหัวข้อ h2 อย่างน้อย 1 หัวข้อ`);
  }
  const h2Count = a.sections.filter((s) => s.type === "h2").length;
  if (h2Count < 4) problems.push(`มีหัวข้อ h2 แค่ ${h2Count} หัวข้อ (ต้องอย่างน้อย 4 เพื่อให้ครอบคลุมคำถามรอง)`);
  const bodyChars = a.sections.reduce((n, s) => n + norm(s.text).length + norm((s.items || []).join("")).length + norm((s.rows || []).flat().join("")).length, 0);
  if (bodyChars < 3000) problems.push(`เนื้อหายาว ${bodyChars} ตัวอักษร (ต้องอย่างน้อย 3,000 ตัวอักษร ไม่นับเว้นวรรค) — ตอบคำถามให้ลึกกว่านี้ ยกตัวอย่างสถานการณ์จริง`);
  const validPaths = new Set(["/", ...CTA_LINKS, ...existing.map((e) => `/blog/${e.slug}`)]);
  const links = [...collectAllText(a).matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)];
  for (const [, , href] of links) {
    if (!validPaths.has(href)) problems.push(`ลิงก์ "${href}" ไม่มีอยู่ในเว็บ — ใช้ได้เฉพาะ path จากรายการลิงก์ภายในที่ให้ไว้`);
  }
  if (links.length < 3) problems.push(`มีลิงก์ภายใน ${links.length} ลิงก์ (ต้องอย่างน้อย 3 ลิงก์ ไปบทความ/บริการ/สาขาที่เกี่ยวข้อง แทรกในเนื้อหาอย่างเป็นธรรมชาติ)`);

  // 2) หัวข้อซ้ำ
  for (const e of existing) {
    if (e.slug === a.slug) problems.push(`slug ซ้ำกับบทความเดิม: ${e.slug}`);
    const sim = similarity(a.title, e.title);
    if (sim >= SIMILARITY_LIMIT) problems.push(`หัวข้อคล้ายบทความเดิมเกินไป (${Math.round(sim * 100)}%): "${e.title}" — เลือกหัวข้ออื่นที่ต่างออกไปจริง`);
    if (e.keyword && a.keywords[0] && e.keyword.replace(/\s/g, "") === a.keywords[0].replace(/\s/g, "")) {
      problems.push(`คีย์เวิร์ดหลัก "${a.keywords[0]}" ซ้ำกับบทความ "${e.title}"`);
    }
  }

  // 3) ข้อเท็จจริงของร้าน
  const text = collectAllText(a);
  const shopPhone = CONTACT.phoneHref.replace(/\D/g, "");
  for (const m of text.matchAll(/0\d{1,2}[-\s]?\d{3}[-\s]?\d{3,4}/g)) {
    if (m[0].replace(/\D/g, "") !== shopPhone) problems.push(`เบอร์โทร "${m[0]}" ไม่ใช่เบอร์ร้าน (${CONTACT.phoneDisplay})`);
  }
  for (const m of text.matchAll(/(\d{1,2})[:.](\d{2})\s*น/g)) {
    if (!["10:00", "20:00"].includes(`${m[1].padStart(2, "0")}:${m[2]}`)) problems.push(`เวลา "${m[0]}" ไม่ตรงเวลาเปิดร้าน (10:00-20:00 น.)`);
  }
  const FALSE_CLAIMS = [
    [/บริการถึงที่|รับถึงที่|รับถึงบ้าน|ไปรับถึง/, "ร้านไม่มีบริการรับถึงที่"],
    [/ประสบการณ์(กว่า|มากกว่า)?\s*\d+\s*ปี/, "ห้ามอ้างจำนวนปีประสบการณ์"],
    [/ก่อตั้ง(ขึ้น)?(เมื่อ|ตั้งแต่|มา)/, "ห้ามอ้างปีก่อตั้ง"],
    [/ลูกค้า(กว่า|มากกว่า|แล้ว)\s*[\d,]+/, "ห้ามแต่งจำนวนลูกค้า"],
    [/รางวัล/, "ห้ามอ้างรางวัล"],
    [/[\d,]{5,}\s*บาท|บาทละ\s*[\d,]{4,}/, "ห้ามใส่ราคาทองเป็นตัวเลขตายตัว (ราคาเปลี่ยนทุกวัน)"],
    [/(\d+)\s*สาขา/, null], // ตรวจด้านล่าง
  ];
  for (const [re, msg] of FALSE_CLAIMS) {
    const m = text.match(re);
    if (!m) continue;
    if (msg) problems.push(`${msg}: "${m[0]}"`);
    else if (Number(m[1]) !== BRANCHES.length) problems.push(`ร้านมี ${BRANCHES.length} สาขา ไม่ใช่ "${m[0]}"`);
  }

  // 4) สำนวน AI
  for (const h of findSlopHits(a)) problems.push(`สำนวน AI [${h.category}] "${h.word}" ×${h.count} — เขียนใหม่ให้เป็นภาษาพูดธรรมดา`);

  return problems;
}

/* ---------- prompt ---------- */
function buildPrompt(existing) {
  const branches = BRANCHES.map((b) => `- ${b.name}: ${b.address} (${b.hours})`).join("\n");
  const services = servicesData.map((s) => `- ${s.title}`).join("\n");
  const titles = existing.map((e) => `- ${e.title}`).join("\n");
  return `คุณเป็นนักเขียนคอนเทนต์ SEO ให้ร้านรับซื้อทองและหลอมทองในพัทยา จังหวัดชลบุรี

<ข้อมูลร้าน>
ใช้เป็นข้อเท็จจริงเท่านั้น ห้ามแต่งเพิ่ม
ชื่อ: หลอมทองพัทยา (ชื่อหน้าร้าน "เฮงศิริ")
โทร: ${CONTACT.phoneDisplay} · LINE: ${CONTACT.lineId}
สาขา (มี ${BRANCHES.length} สาขาเท่านั้น):
${branches}
บริการ:
${services}
ข้อเท็จจริงที่ใช้ได้: ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ต่อหน้าลูกค้าฟรี · คิดราคาตามเนื้อทองจริงอ้างอิงราคาสมาคมค้าทองคำของวันนั้น · จ่ายเงินสดทันทีหรือโอนเข้าบัญชีได้ · ไม่มีใบเสร็จก็ขายได้ · ผู้ขายต้องใช้บัตรประชาชนตัวจริง (สำเนาไม่ได้) · ส่งรูปทองมาประเมินราคาเบื้องต้นทาง LINE ได้
สิ่งที่ร้านไม่มี ห้ามเขียนถึง: บริการรับถึงบ้าน/ถึงที่, จำนวนปีที่เปิดร้าน, จำนวนลูกค้า, รางวัล, ราคาทองเป็นตัวเลข (ราคาเปลี่ยนทุกวัน ให้บอกวิธีคิดแทน)
</ข้อมูลร้าน>

<บทความที่มีแล้ว>
${titles}
</บทความที่มีแล้ว>

หน้าที่มีอยู่แล้วและไม่ต้องเขียนเป็นบทความ: หน้าสาขา (${BRANCHES.map((b) => b.area).join(", ")}) และหน้าพื้นที่บริการ (${AREAS.map((a) => a.name).join(", ")})

<งาน>
เลือกหัวข้อใหม่ 1 หัวข้อ ที่คนกำลังจะขายทองหรือหลอมทองในพัทยาค้นหาจริง และต้องตอบคนละคำถามกับทุกบทความในรายการด้านบน ไม่ใช่แค่เปลี่ยนคำ
บทความในรายการมีเรื่องเวลาเปิดร้าน วันอาทิตย์ เงินสด/โอน บัตรประชาชน และใบเสร็จ หลายบทความแล้ว ให้เลือกเรื่องอื่น เช่น ความรู้เรื่องทองชนิดต่างๆ การคำนวณราคา การดูแลทอง การเตรียมตัวก่อนขาย สถานการณ์เฉพาะของคนขายทอง (มรดก ทองหลุดจำนำ ย้ายบ้าน) หรือเรื่องนาฬิกา เครื่องเงิน กรอบพระ
1 บทความ = 1 เจตนาค้นหา แล้วเขียนให้ครบ
</งาน>

<วิธีเขียน>
เขียนเหมือนเจ้าของร้านอธิบายให้ลูกค้าฟังที่เคาน์เตอร์ ภาษาไทยธรรมชาติ เรียกคนอ่านว่า "คุณ" เข้าเรื่องตั้งแต่ประโยคแรก
ย่อหน้าสั้น 2-4 บรรทัด เพราะคนอ่านบนมือถือ ใส่ **ดอกจันคู่** ครอบคำที่ต้องการเน้นตัวหนา
บอกข้อเท็จจริงที่จับต้องได้แทนคำโฆษณา เช่น "ตรวจเปอร์เซ็นต์ต่อหน้าคุณ เห็นตัวเลขพร้อมกัน" แทน "ไว้วางใจได้"
ใช้คำเชื่อมภาษาพูด เช่น "แต่" "และ" "เพราะ" แทนคำเชื่อมภาษาเขียนทางการ
จำนวนข้อในรายการให้ตามที่มีจริง (2, 4, 5 ข้อก็ได้) และสลับความยาวย่อหน้า ไม่ให้ทุกย่อหน้ายาวเท่ากัน

คำและสำนวนพวกนี้ระบบจะตีกลับทันที ห้ามใช้:
${Object.values(RULES).flat().map((w) => `"${w}"`).join(" ")}
</วิธีเขียน>

<SEO>
ระบบจะตีกลับถ้าไม่ทำตามข้อเหล่านี้:
- เลือกคีย์เวิร์ดหลัก 1 คำแบบเจาะจง (long-tail) ที่คนพิมพ์ค้นจริง เช่น "ขายทองมรดก พัทยา" ไม่ใช่คำกว้างอย่าง "ขายทองพัทยา" แล้วใส่เป็น keywords[0]
- คีย์เวิร์ดหลักต้องอยู่ใน title (ไว้ช่วงต้น), description, ย่อหน้าแรก และหัวข้อ h2 อย่างน้อย 1 หัวข้อ ใส่ให้อ่านเป็นธรรมชาติ ห้ามยัดซ้ำจนอ่านแล้วแปลก
- keywords ที่เหลือคือคำถามรองที่คนค้นต่อ ให้ตอบเป็นหัวข้อ h2/h3 ในบทความ
- อย่างน้อย 4 หัวข้อ h2 และเนื้อหารวมอย่างน้อย 3,000 ตัวอักษร ตอบให้ครบจนคนอ่านไม่ต้องไปค้นต่อ ยกสถานการณ์จริงที่ลูกค้าเจอที่เคาน์เตอร์
- summary ต้องตอบคำถามหลักได้ทันทีใน 1-2 ข้อแรก (Google มักดึงไปเป็นคำตอบด้านบนผลค้นหา)
- ลิงก์ภายในอย่างน้อย 3 ลิงก์ แทรกในประโยคที่เกี่ยวข้องจริง ใช้ได้เฉพาะ path เหล่านี้:
${["/", ...CTA_LINKS].join(" · ")}
และบทความเดิม: /blog/<slug> จากรายการ slug ด้านล่าง
${existing.map((e) => e.slug).join(" · ")}
</SEO>

<รูปแบบ>
- slug: ภาษาอังกฤษพิมพ์เล็กคั่นขีด
- title: ไม่เกิน 60 ตัวอักษร มีคีย์เวิร์ดหลัก
- description: 120-160 ตัวอักษร
- keywords: 4-6 คำ คำแรกคือคีย์เวิร์ดหลัก
- category: "ความรู้" หรือ "คู่มือขายทอง"
- sections: 18-40 บล็อก (ย่อหน้าสั้น 2-4 บรรทัด อย่ายุบรวมให้ยาว) บล็อกแรกเป็น summary (คำตอบสั้น 3-5 ข้อ) · summary/ul/ol ใช้ items · h2/h3/p/quote ใช้ text
  · table ใช้ head (หัวคอลัมน์) + rows (แถว จำนวนช่องเท่า head) + caption (ไม่บังคับ) — ใส่ 1 ตารางเมื่อมีของให้เปรียบเทียบจริง
  · ในข้อความใส่ลิงก์ภายในได้ด้วยรูปแบบ [ข้อความลิงก์](/path)
- faq: 3-4 ข้อ คำถามแบบที่คนพิมพ์ค้น Google คำตอบ 2-3 ประโยค
- coverTheme: lomthong (หลอมทอง) · truat-thong (ตรวจทอง XRF ทองแท้ปลอม) · rap-sue-thong (รับซื้อทอง ค่ากลาง) · thong-kao (ทองเก่า ทองหัก) · ran-thong (ร้าน สาขา) · krob-phra (กรอบพระ) · nalika (นาฬิกา) · brandname (กระเป๋าแบรนด์เนม)
- ctaLink: หน้าที่ตรงกับเนื้อหาบทความที่สุด
</รูปแบบ>`;
}

/* ---------- เรียก Claude + วนแก้จนผ่านด่าน ---------- */
async function generate(existing) {
  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    throw new Error("ไม่พบ ANTHROPIC_API_KEY (หรือเป็นค่าว่าง) — ตั้ง secret ใน GitHub: Settings → Secrets and variables → Actions");
  }
  const client = new Anthropic();
  const messages = [{ role: "user", content: buildPrompt(existing) }];

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`\n[รอบ ${attempt}/${MAX_ATTEMPTS}] กำลังให้ Claude เขียนบทความ...`);
    const response = await client.beta.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      output_config: { effort: "high", format: betaZodOutputFormat(ArticleSchema) },
      // ถ้าโมเดลหลักปฏิเสธ ให้ระบบสลับไปโมเดลสำรองให้อัตโนมัติ
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      messages,
    });

    if (response.stop_reason === "refusal") throw new Error(`Claude ปฏิเสธคำขอ: ${response.stop_details?.explanation ?? "-"}`);
    if (response.stop_reason === "max_tokens") throw new Error("บทความยาวเกิน max_tokens — ลดจำนวน sections ใน prompt");
    const article = response.parsed_output;
    if (!article) throw new Error("Claude ไม่ได้ส่ง JSON ตามรูปแบบที่กำหนด");

    const problems = validate(article, existing);
    if (problems.length === 0) {
      for (const w of structureWarnings(article)) console.log(`  (คำเตือน ไม่บล็อก) ${w}`);
      return article;
    }

    console.log(`  ไม่ผ่านด่านตรวจ ${problems.length} ข้อ:\n  - ${problems.join("\n  - ")}`);
    // ต่อบทสนทนาเดิม (append-only) ให้ AI แก้เฉพาะจุด
    messages.push({ role: "assistant", content: response.content });
    messages.push({
      role: "user",
      content: `บทความนี้ยังไม่ผ่านด่านตรวจ แก้ทุกข้อแล้วส่งบทความฉบับเต็มกลับมาใหม่:\n- ${problems.join("\n- ")}`,
    });
  }
  throw new Error(`เขียน ${MAX_ATTEMPTS} รอบแล้วยังไม่ผ่านด่านตรวจ — ไม่ขึ้นเว็บรอบนี้`);
}

/* ---------- main ---------- */
async function main() {
  const existing = loadExisting();

  // โหมดทดสอบด่านตรวจกับไฟล์ที่มีอยู่ ไม่เรียก AI
  if (process.argv[2] === "--check") {
    const file = process.argv[3];
    const a = JSON.parse(fs.readFileSync(file, "utf8"));
    const problems = validate(a, existing.filter((e) => e.slug !== a.slug));
    console.log(problems.length ? `✗ ${problems.length} ปัญหา:\n- ${problems.join("\n- ")}` : "✓ ผ่านด่านตรวจ");
    process.exit(problems.length ? 1 : 0);
  }

  const article = await generate(existing);
  const out = { ...article, date: todayBangkok(), published: true };
  const file = path.join(ARTICLE_DIR, `${out.slug}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`\n✓ บันทึกแล้ว: content/articles/${out.slug}.json\n  ${out.title}`);

  // ส่งชื่อบทความต่อให้ขั้น commit ใน GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${out.slug}\ntitle=${out.title.replace(/\n/g, " ")}\n`);
  }
}

main().catch((e) => {
  console.error(`\n✗ ${e.message}`);
  process.exit(1);
});
