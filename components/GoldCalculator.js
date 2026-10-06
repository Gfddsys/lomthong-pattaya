'use client';

import { useState } from 'react';

/* เครื่องคิดเลขประเมินราคาขายทองเก่า (ประมาณ)
   มูลค่า ≈ น้ำหนักกรัม × (เปอร์เซ็นต์ทอง ÷ 96.5%) × (ราคารับซื้อทองคำแท่ง ÷ 15.244 กรัม)
   - ราคาทองคำแท่งของสมาคมคือราคาทอง 96.5% ต่อน้ำหนัก 1 บาท (ทองแท่ง 1 บาท = 15.244 กรัม)
   - น้ำหนัก "บาท" ที่ผู้ใช้กรอกคือบาททองรูปพรรณ = 15.16 กรัม (คนส่วนใหญ่ขายเครื่องประดับ) */
const BAR_GRAMS_PER_BAHT = 15.244;
const ORNAMENT_GRAMS_PER_BAHT = 15.16;

const PURITIES = [
  { value: 0.965, label: 'ทองไทย 96.5%' },
  { value: 0.9999, label: 'ทองคำแท่ง 99.99%' },
  { value: 0.916, label: 'ทอง 22K (91.6%)' },
  { value: 0.75, label: 'ทอง 18K (75%)' },
  { value: 0.585, label: 'ทอง 14K (58.5%)' },
  { value: 0.375, label: 'ทอง 9K (37.5%)' },
];

export default function GoldCalculator({ barBuy }) {
  const [weight, setWeight] = useState('1');
  const [unit, setUnit] = useState('baht');
  const [purity, setPurity] = useState(0.965);

  const w = parseFloat(weight);
  const grams = unit === 'baht' ? w * ORNAMENT_GRAMS_PER_BAHT : w;
  const pricePerGram965 = barBuy / BAR_GRAMS_PER_BAHT;
  const estimate = Number.isFinite(grams) && grams > 0 ? grams * (purity / 0.965) * pricePerGram965 : 0;

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
        <span>มูลค่าเนื้อทองโดยประมาณ</span>
        <strong>{estimate > 0 ? `${Math.round(estimate).toLocaleString('th-TH')} บาท` : '-'}</strong>
      </div>
      <p className="gold-calc-note">
        คำนวณจากราคารับซื้อทองคำแท่งของสมาคมฯ ล่าสุด (น้ำหนัก 1 บาท = 15.16 กรัม ตามทองรูปพรรณ) เป็นตัวเลขประมาณเพื่อให้มีราคาในใจ
        ราคาจริงขึ้นกับน้ำหนักและเปอร์เซ็นต์ทองที่ตรวจด้วยเครื่อง XRF ที่ร้าน
      </p>
    </div>
  );
}
