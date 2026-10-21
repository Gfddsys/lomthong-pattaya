/* ============================================
   บันทึกจำนวนรีวิว Google ของทั้ง 2 สาขาลง data/review-history.json (สถิติหลังบ้าน)
   ============================================
   2 วิธี:
   1) อัตโนมัติ: ตั้ง secret GOOGLE_PLACES_API_KEY ใน GitHub → .github/workflows/review-history.yml รันทุกเช้า
      ใช้ Places API (New) ดึง rating + userRatingCount ของ placeId ใน data/branches.js (เดือนละ ~60 ครั้ง อยู่ในโควตาฟรี)
   2) ใส่เอง (ดูตัวเลขจาก Google Maps / Business Profile):
      node scripts/record-reviews.mjs --set pattaya-tai=36 noen-plap-wan=54
   วันเดียวกันรันซ้ำ = เขียนทับรายการของวันนั้น · ไม่มีคีย์และไม่ได้ใส่เอง = ไม่เขียนอะไร (ไม่ error)
   ตัวเลขลดลงผิดปกติ (Google ลบรีวิว/ดึงพลาด) ยังบันทึกตามจริง แต่เตือนใน log
*/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BRANCHES } from "../data/branches.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "data", "review-history.json");
const KEY = process.env.GOOGLE_PLACES_API_KEY;

const now = new Date();
const date = now.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });
const history = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];
const prev = history.at(-1); // รายการล่าสุด (รวมของวันนี้ถ้ามี) ใช้เติมสาขาที่ไม่ได้ใส่ + เทียบว่าลดลงไหม

async function fromApi(b) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${b.placeId}`, {
    headers: { "X-Goog-Api-Key": KEY, "X-Goog-FieldMask": "rating,userRatingCount" },
  });
  if (!res.ok) throw new Error(`${b.slug}: Places API ${res.status} ${await res.text()}`);
  const j = await res.json();
  if (!Number.isInteger(j.userRatingCount)) throw new Error(`${b.slug}: ไม่มี userRatingCount ในผลลัพธ์`);
  return { count: j.userRatingCount, rating: j.rating ?? null };
}

const setIdx = process.argv.indexOf("--set");
let source, branches = {};
if (setIdx >= 0) {
  source = "manual";
  for (const arg of process.argv.slice(setIdx + 1)) {
    const [slug, n] = arg.split("=");
    if (!BRANCHES.some((b) => b.slug === slug) || !/^\d+$/.test(n ?? "")) throw new Error(`รูปแบบผิด: ${arg} (ต้องเป็น slug=จำนวน)`);
    branches[slug] = { count: Number(n), rating: prev?.branches[slug]?.rating ?? null };
  }
} else if (KEY) {
  source = "places-api";
  for (const b of BRANCHES) branches[b.slug] = await fromApi(b);
} else {
  console.log("ไม่มี GOOGLE_PLACES_API_KEY และไม่ได้ใส่ --set → ข้ามการบันทึก");
  process.exit(0);
}

// สาขาที่ไม่ได้ใส่ (โหมดใส่เอง) ใช้ตัวเลขล่าสุดเดิม
for (const b of BRANCHES) if (!branches[b.slug] && prev?.branches[b.slug]) branches[b.slug] = prev.branches[b.slug];

for (const [slug, v] of Object.entries(branches)) {
  const before = prev?.branches[slug]?.count;
  if (before != null && v.count < before) console.warn(`⚠️ ${slug} รีวิวลดลง ${before} → ${v.count} (Google อาจลบรีวิว)`);
}

const entry = { date, time, source, branches };
const i = history.findIndex((h) => h.date === date);
if (i >= 0) history[i] = entry;
else history.push(entry);
history.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(FILE, JSON.stringify(history, null, 2) + "\n");

const total = Object.values(branches).reduce((a, v) => a + v.count, 0);
const base = Object.values(history[0].branches).reduce((a, v) => a + v.count, 0);
console.log(`บันทึกรีวิว ${date} ${time} (${source}) · ${Object.entries(branches).map(([s, v]) => `${s} ${v.count}`).join(" · ")} · รวม ${total} (+${total - base} จากวันแรก)`);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `date=${date}\ntotal=${total}\n`);
