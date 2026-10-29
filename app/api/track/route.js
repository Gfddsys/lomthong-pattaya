import { addClick, pingStore } from '@/lib/clickStore';

/* รับยอดคลิกปุ่มโทร / LINE / ขอเส้นทาง จาก components/ClickTracker.js (navigator.sendBeacon)
   รับเฉพาะชนิดที่รู้จัก ตัดข้อความให้สั้น และข้ามบอท → ยอดในหลังบ้านไม่รก */
const TYPES = new Set(['call', 'line', 'map']);
const BOT = /bot|crawler|spider|preview|headless|lighthouse/i;
const clean = (v, max) => String(v ?? '').replace(/[|\n\r]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

export async function POST(request) {
  try {
    if (BOT.test(request.headers.get('user-agent') ?? '')) return new Response(null, { status: 204 });
    const body = JSON.parse(await request.text());
    // ทดสอบระบบหลังเชื่อมที่เก็บ: 204 = เขียนได้ · 503 = ยังไม่เชื่อม (ไม่นับเป็นคลิก)
    if (body.type === 'ping') return new Response(null, { status: (await pingStore()) ? 204 : 503 });
    if (!TYPES.has(body.type)) return new Response(null, { status: 400 });
    const page = clean(body.page, 120).startsWith('/') ? clean(body.page, 120) : '/';
    await addClick([body.type, page, clean(body.place, 40), clean(body.label, 60)].join('|'));
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
