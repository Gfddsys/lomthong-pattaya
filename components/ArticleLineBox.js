import { CONTACT } from "@/data/contact";

/* ============================================
   กล่อง "ส่งรูปให้ร้านประเมินทาง LINE" ใต้สรุปสั้นๆ ของทุกบทความ (ข้อ 69 ในเช็กลิสต์ · 7 พ.ย. 2569)
   ============================================
   คนจาก Google ราว 6 ใน 10 เข้ามาที่บทความ แต่เดิมในเนื้อบทความไม่มีปุ่มที่เปิด LINE ได้ทันที
   ปุ่มนี้เปิด LINE ตรง · นับยอดที่ /admin/clicks ช่อง "บทความ: กล่อง LINE ใต้สรุป" (หน้าอังกฤษ "EN: กล่อง LINE ใต้สรุป")
   ข้อความเลือกตามหน้าบริการที่บทความลิงก์ไป (article.ctaLink) ทุกประโยคมาจากหน้าบริการที่ร้านยืนยันแล้ว
   (data/services.js: ประเมินราคาออนไลน์ / รับซื้อเงิน / รับซื้อนาฬิกา / ขายฝากทอง) ห้ามเติมสิ่งที่ร้านไม่ได้ยืนยัน
   บอกชัดว่าสำหรับคนพัทยา ชลบุรี เพราะบทความมีคนอ่านทั่วประเทศ และส่งทองทางไปรษณีย์ยังไม่ได้ยืนยัน
*/

const COPY = {
  gold: {
    title: "อยากรู้ว่าทองของคุณได้เท่าไหร่",
    text: "ถ่ายรูปทองทั้งชิ้นและตราปั๊ม บอกน้ำหนักถ้ารู้ ส่งทาง LINE ร้านแจ้งราคาเบื้องต้นให้ฟรี ราคาจริงยืนยันหลังตรวจที่ร้าน",
  },
  silver: {
    title: "อยากรู้ว่าเครื่องเงินของคุณได้เท่าไหร่",
    text: "ถ่ายรูปทั้งชิ้นและตราปั๊ม เช่น 925 บอกน้ำหนักถ้ารู้ ส่งทาง LINE ร้านแจ้งราคาเบื้องต้นให้ฟรี ราคาจริงยืนยันหลังตรวจที่ร้าน",
  },
  watch: {
    title: "อยากรู้ว่านาฬิกาของคุณขายได้เท่าไหร่",
    text: "ถ่ายรูปหน้าปัด ด้านหลัง สาย และอุปกรณ์ที่มี ส่งทาง LINE ร้านแจ้งราคาเบื้องต้นให้ฟรี ราคาจริงยืนยันหลังดูของจริง",
  },
  pawn: {
    title: "อยากรู้วงเงินขายฝากทองของคุณ",
    text: "ถ่ายรูปทองและบอกน้ำหนัก ส่งทาง LINE สอบถามวงเงินและเงื่อนไขเบื้องต้นกับร้านได้โดยตรง",
  },
  // หน้าภาษาอังกฤษ (/en) แปลจากข้อความชุดทองด้านบน
  en: {
    title: "Want a price for your gold?",
    text: "Send photos of each piece and its stamp, plus the weight if you know it, on LINE. We reply with a free first estimate; the final price is confirmed after testing at the shop.",
  },
};

const UI = {
  th: {
    track: "บทความ: กล่อง LINE ใต้สรุป",
    aria: "ส่งรูปให้ร้านประเมินราคาทาง LINE",
    label: "ลูกค้าในพัทยา ชลบุรี",
    button: "ส่งรูปประเมินทาง LINE", // สั้นพอให้อยู่บรรทัดเดียวบนจอมือถือ 360px
    note: `LINE ${CONTACT.lineId} · ร้านตอบในเวลาทำการ เปิดทุกวัน`,
  },
  en: {
    track: "EN: กล่อง LINE ใต้สรุป",
    aria: "Send photos on LINE for a free estimate",
    label: "In Pattaya or Chonburi",
    button: "Send photos on LINE",
    note: `LINE ${CONTACT.lineId} · We reply during opening hours, open daily`,
  },
};

// บทความเรื่องไหน ใช้ข้อความชุดไหน (ดูจากหน้าบริการที่บทความลิงก์ไป)
export function lineBoxKind(article) {
  const link = article.ctaLink || "";
  if (link === "/services/silver-buying") return "silver";
  if (link === "/services/watch-buying" || link.startsWith("/rap-sue-nalika/") || article.coverTheme === "nalika") return "watch";
  if (link === "/services/khai-fak-thong") return "pawn";
  return "gold";
}

export default function ArticleLineBox({ kind = "gold" }) {
  const copy = COPY[kind] ?? COPY.gold;
  const ui = kind === "en" ? UI.en : UI.th;
  return (
    <aside className="article-line-box" data-track={ui.track} aria-label={ui.aria}>
      <p className="article-line-box-label">{ui.label}</p>
      <p className="article-line-box-title">{copy.title}</p>
      <p className="article-line-box-text">{copy.text}</p>
      <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line article-line-box-btn">
        {/* eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG ไฟล์เดียวกับปุ่ม LINE ลอย */}
        <img src="/images/icons/line.svg" alt="" width={22} height={22} />
        {ui.button}
      </a>
      <p className="article-line-box-note">{ui.note}</p>
    </aside>
  );
}
