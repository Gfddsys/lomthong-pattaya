/* ============================================
   ราคาทองเคต่อกรัม — สูตรเดียวกันทั้งเว็บ
   ============================================
   ใช้ที่หน้าราคาทองวันนี้ (#rakha-thong-k) และกล่องราคาสดในบทความ (components/KGoldToday.js)
   ต่อกรัม = ราคารับซื้อทองรูปพรรณ ÷ 15.16 × (เปอร์เซ็นต์ทอง ÷ 96.5%)
   สูตรเดียวกับเครื่องคิดเลข (components/GoldCalculator.js) · หลอมขายที่ร้าน = ใช้ราคาทองคำแท่ง + โปรบวกเพิ่มแทน */

// ทองรูปพรรณ 1 บาท = 4 สลึง = 15.16 กรัม
export const ORNAMENT_GRAMS_PER_BAHT = 15.16;

export const KARATS = [
  { id: "965", label: "ทองไทย 96.5%", note: "ทองรูปพรรณ", purity: 0.965 },
  { id: "22k", label: "ทอง 22K", note: "เนื้อทอง 91.6%", purity: 0.916 },
  { id: "18k", label: "ทอง 18K", note: "ทอง 75% · ตรา 750", purity: 0.75 },
  { id: "14k", label: "ทอง 14K", note: "ทอง 58.5% · ตรา 585", purity: 0.585 },
  { id: "9k", label: "ทอง 9K", note: "ทอง 37.5% · ตรา 375", purity: 0.375 },
];

export const perGram = (bahtPrice, purity) => (bahtPrice / ORNAMENT_GRAMS_PER_BAHT) * (purity / 0.965);
