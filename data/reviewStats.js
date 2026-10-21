/* จำนวนรีวิว Google ล่าสุด (จาก data/review-history.json ที่ scripts/record-reviews.mjs บันทึกทุกวัน)
   หน้าเว็บที่โชว์ "Google รีวิว xx" อ่านจากที่นี่ → ตัวเลขอัปเดตเองทุกครั้งที่มีการบันทึก (push → Vercel build ใหม่) */
import history from "./review-history.json";

const TH_MONTHS_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const latest = history.at(-1);

export const reviewCount = (slug) => latest.branches[slug]?.count ?? 0;

export const REVIEW_TOTAL = Object.values(latest.branches).reduce((a, v) => a + v.count, 0);

const [y, m, d] = latest.date.split("-").map(Number);
export const REVIEW_CHECKED_AT = `${d} ${TH_MONTHS_SHORT[m - 1]} ${y + 543}`;
