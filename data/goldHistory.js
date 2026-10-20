/* ราคาทองย้อนหลัง (บันทึกทุกวันโดย scripts/record-gold-price.mjs ผ่าน GitHub Actions)
   HISTORY_READY = ข้อมูลพอให้เปิดหน้า /rakha-thong-yon-lang ให้ Google เก็บและลิงก์จากหน้าอื่น */
import history from "./gold-history.json";

export const GOLD_HISTORY = history;
export const HISTORY_MIN_DAYS = 20;
export const HISTORY_READY = history.length >= HISTORY_MIN_DAYS;
