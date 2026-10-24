'use client';

import { useEffect, useState } from 'react';

/* ============================================
   กล่องราคาทอง/แท่งเงินแบบป้ายหน้าร้าน (ภาพแม่แบบจากเจ้าของร้าน + ตัวเลขจริงวางทับ)
   ============================================
   - ภาพพื้น: public/images/price-board/gold.webp, silver.webp (1200×1118 ทั้งคู่ ขอบโปร่งใส)
     ช่องว่างในภาพคือที่วางตัวเลข ตำแหน่งเป็น % ของภาพ (วัดจากภาพจริง)
   - ข้อมูล: /api/gold-price (lib/goldPrice.js) ดึงใหม่ทุก 5 นาที
   - ตัวอักษรใช้หน่วย cqw (ขนาดตามความกว้างกล่อง) → ภาพย่อขยายแล้วตัวเลขยังพอดีช่อง
   - กระพริบ: ลูกศรขึ้น/ลง + จุด LIVE กระพริบตลอด · ตัวเลขที่เปลี่ยนจะวาบ 1 ครั้งตอนอัปเดต
     (ไม่ปิดตาม prefers-reduced-motion — เจ้าของร้านตั้งใจให้เห็นเคลื่อนไหว)
*/

const REFRESH_MS = 5 * 60 * 1000;

const BOARDS = {
  gold: {
    src: '/images/price-board/gold.webp',
    ratio: '1200 / 1118',
    alt: 'ราคาทองวันนี้ ทองคำแท่ง 96.5% รับซื้อ ขายออก',
    slots: {
      pill: [36, 8.9, 41, 7.3],
      chg: [50.4, 21.5, 22.9, 12.5],
      buy: [2.3, 49, 44.9, 20.4],
      sell: [50.4, 49, 44.9, 20.4],
      strip: [27.5, 73.2, 68, 14.3],
    },
  },
  silver: {
    src: '/images/price-board/silver.webp',
    ratio: '1200 / 1118',
    alt: 'ราคาแท่งเงิน 99.99% 1 กิโลกรัม รับซื้อ ขายออก',
    slots: {
      pill: [35.8, 8.7, 40, 8],
      chg: [47.5, 25.5, 25.4, 13.9],
      strip: [29.2, 45.6, 52, 8.5],
      buy: [3.5, 66.3, 44.9, 20.4],
      sell: [51.2, 66.3, 44.9, 20.4],
    },
  },
};

const slotStyle = ([l, t, w, h]) => ({ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` });

function parseDiff(raw) {
  const s = String(raw ?? '').trim();
  if (!s || /^[+-]?0(\.0+)?$/.test(s)) return { dir: 'flat', text: '0' };
  return { dir: s.startsWith('-') ? 'down' : 'up', text: s.replace(/^[+-]/, '') };
}

/* ตัวเลขวาบ 1 ครั้งตอนแสดงครั้งแรกและทุกครั้งที่ค่าเปลี่ยน (key เปลี่ยน → React สร้าง span ใหม่ → animation เล่นใหม่) */
function Flash({ value, className = '' }) {
  return (
    <span key={value} className={`pb-flash ${className}`}>
      {value}
    </span>
  );
}

// ระหว่างรอราคา (หรือดึงไม่สำเร็จ) ใช้ค่าว่างนี้ → ภาพป้ายขึ้นทันที ตัวเลขเป็น "—"
const WAITING = '—';
const EMPTY = {
  diff: '',
  date: '',
  time: WAITING,
  gold_bar: { buy: WAITING, sell: WAITING },
  gold_ornament: { buy: WAITING, sell: WAITING },
  silver: { buy: WAITING, sell: WAITING, vat: WAITING, spot_diff: '' },
};

function Board({ kind, data, waiting }) {
  const b = BOARDS[kind];
  const isGold = kind === 'gold';
  const diff = waiting ? { dir: 'flat', text: WAITING } : parseDiff(isGold ? data.diff : data.silver?.spot_diff);
  const buy = isGold ? data.gold_bar.buy : data.silver.buy;
  // วันที่แบบสั้นให้พอดีแถบด้านบน เช่น "21 ต.ค. 2569"
  const shortDate = waiting
    ? 'กำลังดึงราคา'
    : data.updatedIso
      ? new Date(data.updatedIso).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric' })
      : data.date;
  const sell = isGold ? data.gold_bar.sell : data.silver.sell;

  return (
    <figure className={`pb-board pb-board--${kind}`} style={{ aspectRatio: b.ratio }} aria-busy={waiting || undefined}>
      {/* ภาพป้ายทองเป็นภาพใหญ่สุดบนจอแรก (LCP) → โหลดก่อนอย่างอื่น · ขนาดเล็กลงสำหรับจอมือถือ
          มือถือป้ายกว้าง = จอ - ขอบซ้ายขวา 48px (จอ 412 → 364px ×1.75 = ใช้รูป 640) · ป้ายแท่งเงินอยู่ใต้จอแรก → lazy */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={b.src}
        srcSet={`${b.src.replace('.webp', '-640.webp')} 640w, ${b.src.replace('.webp', '-900.webp')} 900w, ${b.src} 1200w`}
        sizes="(min-width: 820px) 520px, calc(100vw - 48px)"
        width="1200"
        height="1118"
        alt={b.alt}
        className="pb-bg"
        draggable="false"
        fetchPriority={isGold ? 'high' : 'auto'}
        loading={isGold ? 'eager' : 'lazy'}
        decoding="async"
      />

      <div className="pb-slot pb-pill" style={slotStyle(b.slots.pill)}>
        <span className="pb-live" aria-hidden="true" />
        <span>{shortDate}</span>
        {!waiting && <span className="pb-pill-time">{data.time} น.</span>}
      </div>

      <div className={`pb-slot pb-chg is-${diff.dir}`} style={slotStyle(b.slots.chg)}>
        <span className="pb-chg-main">
          <span className="pb-arrow" aria-hidden="true">{diff.dir === 'down' ? '▼' : diff.dir === 'up' ? '▲' : '●'}</span>
          <Flash value={diff.text} />
        </span>
        <span className="pb-chg-label">{isGold ? 'เทียบราคาเปิด (บาท)' : 'ราคาโลก ($/oz)'}</span>
      </div>

      <div className="pb-slot pb-price pb-price--buy" style={slotStyle(b.slots.buy)}>
        <Flash value={buy} />
      </div>
      <div className="pb-slot pb-price pb-price--sell" style={slotStyle(b.slots.sell)}>
        <Flash value={sell} />
      </div>

      <div className="pb-slot pb-strip" style={slotStyle(b.slots.strip)}>
        {isGold ? (
          <>
            <span className="pb-strip-label">ทองรูปพรรณ<br />(ประมาณ)</span>
            <span className="pb-strip-vals">
              <span>รับซื้อ <b><Flash value={data.gold_ornament.buy} /></b></span>
              <span>ขาย <b><Flash value={data.gold_ornament.sell} /></b></span>
            </span>
          </>
        ) : (
          <>
            <span className="pb-strip-label">ราคารวม VAT 7%</span>
            <b className="pb-strip-big"><Flash value={data.silver.vat} /></b>
          </>
        )}
      </div>

      {!waiting && (
        <figcaption className="sr-only">
          {isGold ? 'ทองคำแท่ง 96.5%' : 'แท่งเงิน 99.99% 1 กิโลกรัม'} รับซื้อ {buy} บาท ขายออก {sell} บาท
          ณ วันที่ {data.date} เวลา {data.time} น.
        </figcaption>
      )}
    </figure>
  );
}

// initialData: ราคาที่ server ดึงไว้แล้ว (หน้าราคาทองวันนี้) → แสดงตัวเลขได้ทันทีและ Google เห็นตัวเลขใน HTML
export default function PriceBoard({ initialData = null }) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/gold-price', { cache: 'no-store' });
        const json = await res.json();
        if (!alive) return;
        if (json.status === 'success') {
          setData(json.data);
          setError(false);
        } else setError(true);
      } catch {
        if (alive) setError(true);
      }
    };
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  // ยังไม่ได้ราคา → วาดป้ายเปล่าไว้ก่อน (ขนาดเท่าของจริง) แทนข้อความ "กำลังดึงราคา"
  // เดิมป้ายโผล่ทีหลังตอนได้ราคา → เนื้อหาด้านล่างเด้งลง (CLS) และภาพป้ายเริ่มโหลดช้า (LCP)
  const waiting = !data;
  const shown = data ?? EMPTY;

  return (
    <div className="pb-wrap">
      <Board kind="gold" data={shown} waiting={waiting} />
      {(waiting || data.silver) && <Board kind="silver" data={shown} waiting={waiting} />}
      {waiting && error && (
        <p className="pb-state">ยังดึงราคาไม่ได้ ลองรีเฟรชอีกครั้ง หรือโทร 092-883-9799</p>
      )}

      <style>{`
        .pb-wrap { display: grid; grid-template-columns: 1fr; gap: 1.2rem; width: 100%; max-width: 1040px; margin: 0 auto; }
        @media (min-width: 820px) { .pb-wrap { grid-template-columns: 1fr 1fr; align-items: start; } }
        .pb-state { grid-column: 1 / -1; margin: 0; padding: 0.5rem 1rem; text-align: center; color: #666; }

        .pb-board { position: relative; margin: 0; width: 100%; container-type: inline-size; user-select: none; }
        .pb-bg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .pb-board[aria-busy] .pb-price, .pb-board[aria-busy] .pb-strip b, .pb-board[aria-busy] .pb-chg-main { opacity: 0.45; }
        .pb-slot { position: absolute; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.1; font-family: var(--font-family, 'Prompt', sans-serif); }

        /* วันที่-เวลา ในแถบขาวด้านบน */
        .pb-pill { gap: 2cqw; color: #3a1d14; font-weight: 700; font-size: 3.4cqw; padding-left: 1.5cqw; justify-content: flex-start; white-space: nowrap; }
        .pb-board--silver .pb-pill { color: #1d2a4a; }
        .pb-pill-time { color: #b0121b; }
        .pb-board--silver .pb-pill-time { color: #1f4fa8; }
        .pb-live { width: 1.8cqw; height: 1.8cqw; border-radius: 50%; background: #e11d2a; flex-shrink: 0; animation: pb-blink 1.2s steps(2, start) infinite; box-shadow: 0 0 0 0.5cqw rgba(225,29,42,0.18); }

        /* ขึ้น/ลง เทียบราคาเปิด */
        .pb-chg { flex-direction: column; gap: 0.6cqw; color: #fff; }
        .pb-chg-main { display: inline-flex; align-items: center; gap: 1.4cqw; font-size: 6.4cqw; font-weight: 800; }
        .pb-chg-label { font-size: 2.1cqw; opacity: 0.85; font-weight: 500; }
        .pb-chg.is-up .pb-chg-main { color: #3ee07f; }
        .pb-chg.is-down .pb-chg-main { color: #ff5a5a; }
        .pb-chg.is-flat .pb-chg-main { color: #f3d27a; }
        .pb-arrow { font-size: 0.75em; animation: pb-blink 1s ease-in-out infinite; }

        /* ราคาในกล่องขาว */
        .pb-price { font-weight: 800; font-size: 8.6cqw; letter-spacing: -0.02em; }
        .pb-price--buy { color: #128a3c; }
        .pb-price--sell { color: #c4121f; }

        /* แถบล่าง */
        .pb-strip { justify-content: space-between; gap: 2cqw; padding: 0 2.5cqw; color: #fff; font-size: 2.6cqw; }
        .pb-strip-label { text-align: left; opacity: 0.9; line-height: 1.25; }
        .pb-strip-vals { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4cqw; font-size: 3cqw; }
        .pb-strip-vals b, .pb-strip-big { color: #ffd76a; font-weight: 800; }
        .pb-strip-big { font-size: 5cqw; }
        .pb-board--silver .pb-strip-big { color: #cfe3ff; }

        .pb-flash { display: inline-block; }
        .pb-flash { animation: pb-pop 1.4s ease-out 1; }
        .pb-board[aria-busy] .pb-flash { animation: none; }

        @keyframes pb-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes pb-pop {
          0% { transform: scale(1.18); text-shadow: 0 0 2cqw rgba(255,215,106,0.9); }
          100% { transform: scale(1); text-shadow: none; }
        }
        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
      `}</style>
    </div>
  );
}
