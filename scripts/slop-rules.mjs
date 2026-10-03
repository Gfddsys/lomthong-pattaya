/* ============================================================
   กฎตรวจ "กลิ่น AI" ในบทความ — ใช้ร่วมกัน 2 ที่:
   - scripts/check-slop.mjs   (รันเองด้วย npm run check-slop)
   - scripts/auto-article.mjs (ด่านตรวจก่อนบทความอัตโนมัติขึ้นเว็บ)
   ============================================================ */

/* ---------- คำที่ไม่ควรมี ---------- */
export const RULES = {
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
export function collectText(a) {
  const out = [a.title, a.description, a.excerpt, a.ctaTitle, a.ctaText];
  for (const s of a.sections || []) {
    if (s.text) out.push(s.text);
    if (Array.isArray(s.items)) out.push(...s.items);
  }
  for (const f of a.faq || []) out.push(f.q, f.a);
  return out.filter(Boolean).join("\n");
}

/* ---------- ตรวจโครงสร้าง ---------- */
export function structureWarnings(a) {
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

/** คืนรายการคำต้องห้ามที่เจอในบทความ [{ category, word, count }] */
export function findSlopHits(a) {
  const text = collectText(a);
  const hits = [];
  for (const [category, words] of Object.entries(RULES)) {
    for (const word of words) {
      const count = text.split(word).length - 1;
      if (count > 0) hits.push({ category, word, count });
    }
  }
  return hits;
}
