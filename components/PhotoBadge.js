import { CONTACT } from "@/data/contact";

/* ============================================
   แถบข้อมูลติดต่อทับบนรูปภาพ
   ============================================
   ใช้แปะบนรูปในกริดต่างๆ (About, WhyUs) ให้ลูกค้าเห็นช่องทางติดต่อ
   ทันทีที่มองเห็นรูป โดยดึงข้อมูลจาก data/contact.js จุดเดียว
   แก้เบอร์โทร/LINE/Facebook ที่ data/contact.js แล้วจะอัปเดตทุกจุดพร้อมกัน
*/
export default function PhotoBadge() {
  return (
    <div className="photo-badge">
      <a href={CONTACT.phoneHref} className="photo-badge-item" aria-label="โทรหาเรา">
        📞 {CONTACT.phoneDisplay}
      </a>
      <span className="photo-badge-divider" aria-hidden="true">|</span>
      <a
        href={CONTACT.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="photo-badge-item"
        aria-label="ติดต่อผ่าน LINE"
      >
        💬 Line: {CONTACT.lineId.replace("@", "")}
      </a>
    </div>
  );
}
