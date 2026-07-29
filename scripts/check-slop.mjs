#!/usr/bin/env node
/* ============================================================
   ตรวจ "กลิ่น AI" ในบทความทั้งหมด
   ============================================================
   ใช้:  npm run check-slop

   ตรวจไฟล์ใน content/articles/*.json แล้วรายงานว่ามีคำหรือ
   โครงสร้างที่ทำให้อ่านแล้วรู้ว่า AI เขียนหรือไม่

   ดัดแปลงหลักคิดจาก stop-slop (Hardik Pandya, MIT)
   https://github.com/hardikpandya/stop-slop
   ปรับกฎให้ตรงกับสำนวน AI ที่เกิดในภาษาไทย
   ============================================================ */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "content", "articles");

/* ---------- คำที่ไม่ควรมี ---------- */
const RULES = {
  "เคลียร์คอตอนเปิด": [
    "ในยุคที่", "ในยุคดิจิทัล", "ปัจจุบันนี้", "หลายคนอาจสงสัย",
    "ก่อนอื่นเรามาทำความรู้จัก", "บทความนี้จะพาคุณ", "มาดูกันว่า",
    "เชื่อว่าหลายคนคงเคย",
  ],
  "คำเชื่อมทางการเกินพูด": [
    "อย่างไรก็ตาม", "ทั้งนี้", "อีกทั้ง", "ดังนั้นจึงกล่าวได้ว่า",
    "นอกจากนี้ยังมี", "จากที่กล่าวมาข้างต้น", "เป็นที่ทราบกันดี",
  ],
  "คำขยายว่างเปล่า": [
    "อย่างมาก", "อย่างยิ่ง", "อย่างแท้จริง", "ถือได้ว่า",
    "นับว่าเป็น", "เลยทีเดียว", "ค่อนข้างจะ",
  ],
  "ประกาศความสำคัญลอยๆ": [
    "สิ่งสำคัญที่ต้องคำนึงถึง", "ไม่ควรมองข้าม",
    "มีความสำคัญเป็นอย่าง", "ส่งผลกระทบอย่างมีนัยสำคัญ",
  ],
  "โฆษณาที่พิสูจน์ไม่ได้": [
    "ราคาดีที่สุด", "อันดับ 1", "มืออาชีพ", "ครบวงจร",
    "ตอบโจทย์ทุก", "ไว้วางใจได้", "คุณภาพเยี่ยม", "ประทับใจ",
  ],
  "คู่ตรงข้ามปลอม": ["ไม่ใช่แค่", "ไม่เพียงแต่"],
  "ประกาศโครงสร้างตัวเอง": [
    "ในหัวข้อถัดไป", "เราจะมาดูกันว่า", "ในส่วนนี้เราจะ",
  ],
};

/* ---------- ดึงข้อความทั้งหมดจากบทความ ---------- */
function collectText(a) {
  const out = [a.title, a.description, a.excerpt, a.ctaTitle, a.ctaText];
  for (const s of a.sections || []) {
    if (s.text) out.push(s.text);
    if (Array.isArray(s.items)) out.push(...s.items);
  }
  for (const f of a.faq || []) out.push(f.q, f.a);
  return out.filter(Boolean).join("\n");
}

/* ---------- ตรวจโครงสร้าง ---------- */
function structureWarnings(a) {
  const w = [];

  // ยกตัวอย่าง 3 ข้อทุกครั้ง
  const lists = (a.sections || []).filter((s) => Array.isArray(s.items));
  const threes = lists.filter((s) => s.items.length === 3).length;
  if (lists.length >= 3 && threes / lists.length > 0.7) {
    w.push(`รายการเป็น 3 ข้อ ${threes}/${lists.length} ครั้ง — ดูเป็นแพตเทิร์น AI`);
  }

  // ย่อหน้ายาวเท่ากันติดกัน
  const paras = (a.sections || []).filter((s) => s.type === "p").map((s) => s.text.length);
  for (let i = 0; i + 2 < paras.length; i++) {
    const [x, y, z] = paras.slice(i, i + 3);
    if (Math.max(x, y, z) - Math.min(x, y, z) < 20) {
      w.push("มีย่อหน้ายาวใกล้เคียงกัน 3 ย่อหน้าติด — ควรสลับความยาว");
      break;
    }
  }

  return w;
}

/* ---------- เริ่มตรวจ ---------- */
let files;
try {
  files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
} catch {
  console.log("ไม่พบโฟลเดอร์ content/articles — ยังไม่มีบทความอัตโนมัติ");
  process.exit(0);
}

if (files.length === 0) {
  console.log("ยังไม่มีบทความใน content/articles");
  process.exit(0);
}

console.log(`\nตรวจ ${files.length} บทความ\n`);
let totalIssues = 0;

for (const file of files.sort()) {
  let a;
  try {
    a = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
  } catch (e) {
    console.log(`✗ ${file} — อ่านไม่ได้: ${e.message}`);
    totalIssues++;
    continue;
  }

  const text = collectText(a);
  const hits = [];

  for (const [category, words] of Object.entries(RULES)) {
    for (const word of words) {
      const count = text.split(word).length - 1;
      if (count > 0) hits.push({ category, word, count });
    }
  }

  const structural = structureWarnings(a);
  const clean = hits.length === 0 && structural.length === 0;
  totalIssues += hits.length + structural.length;

  console.log(`${clean ? "✅" : "⚠️ "} ${a.slug || file}`);

  for (const h of hits) {
    console.log(`     [${h.category}] "${h.word}" × ${h.count}`);
    // แสดงบริบทให้ตัดสินใจได้ว่าเป็นปัญหาจริงไหม
    const i = text.indexOf(h.word);
    const s = Math.max(0, i - 40);
    const e = Math.min(text.length, i + h.word.length + 30);
    console.log(`       ...${text.slice(s, e).replace(/\n/g, " ")}...`);
  }
  for (const s of structural) console.log(`     [โครงสร้าง] ${s}`);
}

console.log(
  totalIssues === 0
    ? "\n✅ ผ่านหมด ไม่พบสำนวน AI\n"
    : `\n⚠️  พบ ${totalIssues} จุดที่ควรดู — อ่านบริบทก่อนแก้ (บางคำใช้ถูกบริบทได้)\n`
);
