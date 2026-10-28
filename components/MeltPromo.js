import Link from 'next/link';
import { MELT_BONUS_HOOK_PARTS } from '@/data/meltBonus';

/* ป้ายโปรหลอมทอง (data/meltBonus.js) — พี่สั่ง 29 ต.ค. 2026 ให้คนเห็นทุกครั้ง
   คนที่เห็นโปรในคำอธิบายบน Google แล้วกดเข้าหน้าไหน ต้องเจอโปรบนหน้านั้นด้วย
   ใช้ที่หัวหน้าแรก หน้าสาขา หน้าย่าน หน้าใกล้ฉัน และหน้าบริการทอง
   กดแล้วไปหน้าหลอมทอง (มีเงื่อนไขครบ) · บนหน้าหลอมทองเองส่ง href ไปหน้าราคาทองวันนี้ (ตัวเลขสด) */
export default function MeltPromo({ className = '', href = '/services/gold-melting' }) {
  return (
    <Link href={href} className={`melt-promo ${className}`.trim()}>
      {/* แต่ละท่อนห้ามตัดกลาง → จอแคบขึ้นบรรทัดใหม่ตรงรอยต่อพอดี */}
      <strong>
        {MELT_BONUS_HOOK_PARTS.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </strong>
      <span className="melt-promo-sub">
        <span>จากราคารับซื้อทองรูปพรรณ</span> · <span>ทองทุกเปอร์เซ็นต์บวกตามเนื้อทอง →</span>
      </span>
    </Link>
  );
}
