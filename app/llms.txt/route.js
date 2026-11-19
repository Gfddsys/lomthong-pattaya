import { SITE_URL } from "@/data/site";
import { CONTACT } from "@/data/contact";
import { BRANCHES } from "@/data/branches";
import { servicesData } from "@/data/services";
import { getAutoArticles } from "@/lib/articles";

/* ============================================
   /llms.txt — สรุปเว็บให้ผู้ช่วย AI อ่าน (ChatGPT, Perplexity, Claude ฯลฯ · Google Search ไม่ได้ใช้ไฟล์นี้)
   ============================================
   ที่มา: geo audit 19 พ.ย. 2569 แนะนำข้อแรก · ข้อมูลทุกบรรทัดดึงจาก data/* เดียวกับหน้าเว็บ (ไม่มีข้อความแต่งเพิ่ม)
   สร้างตอน build (force-static) → บทความใหม่ขึ้นเองทุกครั้งที่ deploy */
export const dynamic = "force-static";

export function GET() {
  const services = servicesData.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.excerpt}`);
  const branches = BRANCHES.map(
    (b) => `- [${b.name}](${SITE_URL}/branch/${b.slug}): ${b.address} · ${b.hours}`
  );
  const articles = getAutoArticles().map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug})`);

  const text = [
    "# หลอมทองพัทยา (เฮงศิริ)",
    "",
    "> ร้านรับหลอมทองและรับซื้อทองในพัทยา 2 สาขา (พัทยาใต้ และซอยเนินพลับหวาน) เปิดทุกวัน หลอมต่อหน้าลูกค้า ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ฟรี รับซื้อทองเก่า ทองเค เงินแท้ เครื่องประดับ นาฬิกา และรับขายฝากทอง",
    "",
    `โทร ${CONTACT.phoneDisplay} · LINE ${CONTACT.lineId} · ภาษาอังกฤษ: ${SITE_URL}/en`,
    "",
    "## สาขา",
    ...branches,
    "",
    "## บริการ",
    ...services,
    "",
    "## หน้าสำคัญ",
    `- [ราคาทองวันนี้ พัทยา](${SITE_URL}/rakha-thong-wan-nee): ราคาสมาคมค้าทองคำ อัปเดตทุก 5 นาที พร้อมราคาทองเคต่อกรัม`,
    `- [ร้านหลอมทองใกล้ฉัน](${SITE_URL}/ran-lomthong-klai-chan): หาสาขาที่ใกล้ที่สุดและเปิดอยู่ตอนนี้`,
    `- [รีวิวร้าน](${SITE_URL}/reviews)`,
    "",
    "## บทความ",
    ...articles,
    "",
  ].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
