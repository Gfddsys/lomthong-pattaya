/* ============================================
   บันทึกราคาทองประจำวันลง data/gold-history.json (ใช้ทำหน้า "ราคาทองย้อนหลัง")
   ============================================
   รันวันละครั้งจาก GitHub Actions (.github/workflows/gold-history.yml) ตอนเย็นเวลาไทย
   ใช้ตัวดึงราคาเดียวกับหน้าเว็บ (lib/goldPrice.js) → ตัวเลขตรงกับที่ลูกค้าเห็นบนเว็บ
   วันเดียวกันรันซ้ำ = เขียนทับรายการของวันนั้น (ไม่เกิดแถวซ้ำ)
   ข้อมูลเป็นราคาจริงที่ประกาศ ไม่มีการทำนาย
*/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getGoldPrice } from "../lib/goldPrice.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "data", "gold-history.json");

const p = await getGoldPrice();
const updated = new Date(p.updatedIso);
const date = updated.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" }); // YYYY-MM-DD
const time = updated.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });

const num = (s) => Number(String(s).replace(/,/g, ""));
const entry = {
  date,
  time,
  barBuy: p.raw.barBuy,
  barSell: p.raw.barSell,
  ornamentBuy: p.raw.ornamentBuy,
  ornamentSell: p.raw.ornamentSell,
  silverBuyKg: num(p.silver?.buy ?? 0) || null,
  silverSellKg: num(p.silver?.sell ?? 0) || null,
};

const history = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];
const i = history.findIndex((h) => h.date === date);
if (i >= 0) history[i] = entry;
else history.push(entry);
history.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(FILE, JSON.stringify(history, null, 2) + "\n");

console.log(`บันทึกราคา ${date} ${time} · ทองแท่งรับซื้อ ${entry.barBuy} ขายออก ${entry.barSell} · รวม ${history.length} วัน`);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `date=${date}\n`);
