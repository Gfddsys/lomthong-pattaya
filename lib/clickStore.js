/* ============================================
   ที่เก็บยอดคลิกปุ่มโทร / LINE / ขอเส้นทาง (หลังบ้าน /admin/clicks)
   ============================================
   - เก็บใน Upstash Redis (เชื่อมผ่าน Vercel → Storage) ด้วย REST API ไม่ต้องลง library เพิ่ม
     ตัวแปรที่ Vercel ใส่ให้เอง: KV_REST_API_URL + KV_REST_API_TOKEN (หรือ UPSTASH_REDIS_REST_URL/TOKEN)
   - นับเป็นยอดรวมรายวัน: hash "clicks:YYYY-MM-DD" field = "ชนิด|หน้า|ส่วนของหน้า|ข้อความปุ่ม"
     ไม่เก็บข้อมูลส่วนตัว ไม่ใช้คุกกี้ (ไม่ต้องขอความยินยอมตาม PDPA)
   - ยังไม่เชื่อมที่เก็บ: บนเว็บจริงไม่ทำอะไร · ตอนทดสอบในเครื่องเก็บในหน่วยความจำแทน
   ============================================ */
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export const STORE_READY = Boolean(URL_ && TOKEN);
const DEV_MEMORY = !STORE_READY && process.env.NODE_ENV !== "production";
const mem = (globalThis.__clickMem ??= new Map());

const KEEP_DAYS = 400;

async function pipeline(commands) {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  return res.json();
}

// วันที่ตามเวลาไทย เช่น "2026-10-29"
export function bangkokDay(d = new Date()) {
  return new Date(d.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

export async function addClick(field) {
  const key = `clicks:${bangkokDay()}`;
  if (STORE_READY) {
    await pipeline([
      ["HINCRBY", key, field, 1],
      ["EXPIRE", key, KEEP_DAYS * 86400],
    ]);
  } else if (DEV_MEMORY) {
    const day = mem.get(key) ?? new Map();
    day.set(field, (day.get(field) ?? 0) + 1);
    mem.set(key, day);
  }
}

// ยอดคลิกย้อนหลัง n วัน → [{ day, type, page, place, label, count }]
export async function getClicks(days) {
  const dayList = Array.from({ length: days }, (_, i) => bangkokDay(new Date(Date.now() - i * 86400000)));
  let hashes;
  if (STORE_READY) {
    const res = await pipeline(dayList.map((d) => ["HGETALL", `clicks:${d}`]));
    hashes = res.map((r) => {
      const flat = r.result ?? [];
      const out = {};
      for (let i = 0; i < flat.length; i += 2) out[flat[i]] = Number(flat[i + 1]);
      return out;
    });
  } else {
    hashes = dayList.map((d) => Object.fromEntries(mem.get(`clicks:${d}`) ?? []));
  }
  const rows = [];
  dayList.forEach((day, i) => {
    for (const [field, count] of Object.entries(hashes[i])) {
      const [type, page, place, label] = field.split("|");
      rows.push({ day, type, page, place, label, count });
    }
  });
  return rows;
}
