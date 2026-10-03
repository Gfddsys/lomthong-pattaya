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

import { collectText, findSlopHits, structureWarnings } from "./slop-rules.mjs";

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
  const hits = findSlopHits(a);

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
