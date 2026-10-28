'use client';

import { useState } from 'react';
import { MELT_BONUS, MELT_BONUS_PER_BAHT } from '@/data/meltBonus';

/* เครื่องคิดเลขประเมินราคาขายทองเก่า (ประมาณ) — คิดแบบหลอมขายที่ร้าน ตามโปรใน data/meltBonus.js
   ได้เงิน ≈ น้ำหนักเป็นบาท × (เปอร์เซ็นต์ทอง ÷ 96.5%) × (ราคารับซื้อทองรูปพรรณ + บาทละ 1,000)
   - ราคารับซื้อทองรูปพรรณ = ราคาทอง 96.5% ต่อน้ำหนัก 1 บาท ที่สมาคมประกาศ (ประมาณใน lib/goldPrice.js)
   - ทองทุกเปอร์เซ็นต์บวกตามสัดส่วนเนื้อทอง ไม่ถึง 1 บาทก็คิดตามสัดส่วน (ร้านยืนยัน 29 ต.ค. 2026)
   - น้ำหนัก "บาท" ที่ผู้ใช้กรอกคือบาททองรูปพรรณ = 15.16 กรัม (คนส่วนใหญ่ขายเครื่องประดับ) */
const ORNAMENT_GRAMS_PER_BAHT = 15.16;

const PURITIES = [
  { value: 0.965, label: 'ทองไทย 96.5%' },
  { value: 0.9999, label: 'ทองคำแท่ง 99.99%' },
  { value: 0.916, label: 'ทอง 22K (91.6%)' },
  { value: 0.75, label: 'ทอง 18K (75%)' },
  { value: 0.585, label: 'ทอง 14K (58.5%)' },
  { value: 0.375, label: 'ทอง 9K (37.5%)' },
];

export default function GoldCalculator({ ornamentBuy }) {
  const [weight, setWeight] = useState('1');
  const [unit, setUnit] = useState('baht');
  const [purity, setPurity] = useState(0.965);

  const w = parseFloat(weight);
  const grams = unit === 'baht' ? w * ORNAMENT_GRAMS_PER_BAHT : w;
  // น้ำหนักเทียบเป็นทอง 96.5% กี่บาท (เช่น ทอง 18K 1 บาท = เนื้อทองเท่าทอง 96.5% ประมาณ 0.78 บาท)
  const baht965 = Number.isFinite(grams) && grams > 0 ? (grams / ORNAMENT_GRAMS_PER_BAHT) * (purity / 0.965) : 0;
  const estimate = baht965 * (ornamentBuy + MELT_BONUS_PER_BAHT);
  const bonus = baht965 * MELT_BONUS_PER_BAHT;

  return (
    <div className="gold-calc">
      <div className="gold-calc-fields">
        <label>
          <span>น้ำหนัก</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          <span>หน่วย</span>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="baht">บาท</option>
            <option value="gram">กรัม</option>
          </select>
        </label>
        <label>
          <span>ชนิดทอง</span>
          <select value={purity} onChange={(e) => setPurity(parseFloat(e.target.value))}>
            {PURITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="gold-calc-result" aria-live="polite">
        <span>หลอมขายที่ร้านได้ประมาณ</span>
        <strong>{estimate > 0 ? `${Math.round(estimate).toLocaleString('th-TH')} บาท` : '-'}</strong>
        {bonus > 0 && <span className="gold-calc-bonus">รวมบวกเพิ่ม {Math.round(bonus).toLocaleString('th-TH')} บาท</span>}
      </div>
      <p className="gold-calc-note">
        คิดจากราคารับซื้อทองรูปพรรณล่าสุด (ประมาณ) บวกเพิ่มบาทละ {MELT_BONUS} ตามสัดส่วนเนื้อทองและน้ำหนัก
        (น้ำหนัก 1 บาท = 15.16 กรัม ตามทองรูปพรรณ) เป็นตัวเลขประมาณเพื่อให้มีราคาในใจ
        ราคาจริงขึ้นกับน้ำหนักหลังหลอมและเปอร์เซ็นต์ทองที่ตรวจด้วยเครื่อง XRF ที่ร้าน
      </p>
    </div>
  );
}
