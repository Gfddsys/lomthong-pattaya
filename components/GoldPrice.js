'use client';

import { useState, useEffect } from 'react';

/* ชุดข้อมูล candlestick สำหรับตกแต่งพื้นหลังการ์ด (ไม่ใช่ราคาจริง เป็นภาพประกอบ)
   [x, wickTop, wickBottom, bodyTop, bodyHeight, isUp] */
const CANDLES = [
  [8, 6, 52, 12, 22, true],
  [26, 4, 44, 10, 16, false],
  [44, 10, 58, 18, 26, false],
  [62, 16, 66, 26, 22, false],
  [80, 24, 74, 34, 20, false],
  [98, 30, 80, 44, 16, true],
  [116, 26, 78, 40, 22, true],
  [134, 20, 70, 30, 18, false],
  [152, 14, 64, 24, 26, true],
  [170, 8, 56, 16, 22, true],
  [188, 4, 48, 10, 20, true],
];

function CandleDeco({ scheme }) {
  const up = scheme === 'gold' ? '#3ddc97' : '#8fc0ff';
  const down = scheme === 'gold' ? '#ff8a8a' : '#d7e6ff';
  const line = scheme === 'gold' ? 'rgba(255,214,150,0.8)' : 'rgba(200,224,255,0.85)';
  return (
    <svg className="pc-deco" viewBox="0 0 210 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path
        d="M4 30 C 40 70, 70 82, 100 74 S 170 40, 206 22"
        fill="none"
        stroke={line}
        strokeWidth="1.6"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      {CANDLES.map(([x, wt, wb, bt, bh, isUp], i) => {
        const color = isUp ? up : down;
        return (
          <g key={i}>
            <line x1={x + 3} y1={wt} x2={x + 3} y2={wb} stroke={color} strokeWidth="1.3" />
            <rect x={x} y={bt} width="6" height={bh} rx="1.2" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

function PriceCard({ scheme, kicker, title, date, time, diff, diffLabel, buy, sell, stripLabel, stripValue, note }) {
  const diffStr = String(diff || '').trim();
  const isDown = diffStr.includes('-');
  const hasDiff = diffStr !== '' && diffStr !== '0' && diffStr !== '+0' && diffStr !== '-0';
  const arrow = isDown ? '▼' : '▲';
  const cleanDiff = diffStr.replace(/^[+-]/, '');

  return (
    <div className={`pc-card pc-card--${scheme}`}>
      <div className="pc-stripes" aria-hidden="true"></div>
      <CandleDeco scheme={scheme} />

      <div className="pc-body">
        <div className="pc-head">
          <div>
            <div className="pc-kicker">{kicker}</div>
            <div className="pc-title">{title}</div>
          </div>
          <div className="pc-badge">
            <span className="pc-badge-date">วันที่ {date}</span>
            <span className="pc-badge-time">เวลา {time} น.</span>
          </div>
        </div>

        <div className="pc-mid">
          {hasDiff && (
            <>
              <span className={`pc-diff ${isDown ? 'is-down' : 'is-up'}`}>
                <span className="pc-diff-arrow">{arrow}</span> {cleanDiff}
              </span>
              <span className="pc-mid-label">{diffLabel}</span>
            </>
          )}
        </div>

        <div className="pc-boxes">
          <div className="pc-box">
            <div className="pc-box-label pc-box-label--buy">รับซื้อ (BUY)</div>
            <div className="pc-box-value pc-box-value--buy">{buy}</div>
          </div>
          <div className="pc-box">
            <div className="pc-box-label pc-box-label--sell">ขายออก (SELL)</div>
            <div className="pc-box-value pc-box-value--sell">{sell}</div>
          </div>
        </div>

        {stripLabel && (
          <div className="pc-strip">
            <span>{stripLabel}</span>
            <span className="pc-strip-value">{stripValue}</span>
          </div>
        )}

        {note && <div className="pc-note">{note}</div>}
      </div>
    </div>
  );
}

export default function GoldPrice({ isHero = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const res = await fetch('/api/gold-price');
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (json.status === 'success') {
          setData(json.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch gold price:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGoldPrice();
  }, []);

  const content = (
    <div className="pc-outer">
      {isHero && (
        <div className="pc-outer-head">
          <h2 className={isHero ? 'pc-outer-title pc-outer-title--light' : 'pc-outer-title'}>
            ราคาทองคำ<span>ประจำวัน</span>
          </h2>
          <p className={isHero ? 'pc-outer-sub pc-outer-sub--light' : 'pc-outer-sub'}>
            อ้างอิงจากสมาคมค้าทองคำแห่งประเทศไทย
          </p>
        </div>
      )}

      {loading ? (
        <div className="pc-state">
          <div className="pc-loader"></div>
          <p>กำลังดึงข้อมูลราคาทองคำ...</p>
        </div>
      ) : error || !data ? (
        <div className="pc-state pc-state--error">
          <p>⚠️ ไม่สามารถดึงข้อมูลราคาทองคำได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง</p>
        </div>
      ) : (
        <div className="pc-wrap">
          <PriceCard
            scheme="gold"
            kicker="ราคาทอง อ้างอิงสมาคมค้าทองคำ"
            title="ทองคำแท่ง 96.5%"
            date={data.date}
            time={data.time}
            diff={data.diff}
            diffLabel="เทียบราคาเปิด (บาท)"
            buy={data.gold_bar.buy}
            sell={data.gold_bar.sell}
            stripLabel="ทองรูปพรรณ 96.5%"
            stripValue={`รับซื้อ ${data.gold_ornament.buy} · ขาย ${data.gold_ornament.sell}`}
            note="* ราคาอ้างอิงจากสมาคมค้าทองคำ ราคาหน้าร้านอาจมีการเปลี่ยนแปลง"
          />

          {data.silver && (
            <PriceCard
              scheme="silver"
              kicker="ราคาแท่งเงิน 1 กิโลกรัม"
              title="แท่งเงิน 99.99%"
              date={data.date}
              time={data.time}
              diff={data.silver.spot_diff}
              diffLabel="เปลี่ยนแปลงราคาโลก ($/oz)"
              buy={data.silver.buy}
              sell={data.silver.sell}
              stripLabel="ราคารวม VAT 7%"
              stripValue={data.silver.vat}
              note="* ราคาเงินคำนวณโดยประมาณจากราคาตลาดโลก (Silver Spot) อาจต่างจากราคาซื้อขายจริง"
            />
          )}
        </div>
      )}

      <style>{`
        .pc-outer { width: 100%; max-width: 980px; margin: 0 auto; }
        .pc-outer-head { text-align: center; margin-bottom: 1.5rem; }
        .pc-outer-title { font-size: 1.6rem; font-weight: 800; color: #1A1A1A; }
        .pc-outer-title span { color: var(--color-gold, #d4a843); }
        .pc-outer-title--light { color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .pc-outer-title--light span { color: #ffcf5c; }
        .pc-outer-sub { font-size: 0.9rem; color: #555; margin-top: 0.4rem; }
        .pc-outer-sub--light { color: rgba(255,255,255,0.9); text-shadow: 0 1px 4px rgba(0,0,0,0.4); }

        /* Mobile-first: จอเล็ก = คอลัมน์เดียวเสมอ (กันล้นขอบบนมือถือแคบ) */
        .pc-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.4rem;
          align-items: stretch;
        }
        @media (min-width: 820px) {
          .pc-wrap { grid-template-columns: 1fr 1fr; }
        }

        .pc-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(0,0,0,0.28);
          color: #fff;
          isolation: isolate;
        }
        .pc-card--gold { background: linear-gradient(135deg, #d81f2c 0%, #a3151f 55%, #7c0f18 100%); }
        .pc-card--silver { background: linear-gradient(135deg, #294a86 0%, #1a2f60 55%, #0e1c40 100%); }

        .pc-stripes {
          position: absolute; inset: 0; z-index: 0;
          background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 16px);
          pointer-events: none;
        }
        .pc-deco {
          position: absolute; top: 54px; left: 0; right: 0;
          width: 100%; height: 130px; z-index: 0; opacity: 0.28; pointer-events: none;
        }
        .pc-body { position: relative; z-index: 1; padding: 1.4rem 1.4rem 1.2rem; }

        .pc-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .pc-kicker { font-size: 0.8rem; opacity: 0.9; min-height: 2.3em; }
        .pc-title { font-size: 1.5rem; font-weight: 800; line-height: 1.2; margin-top: 0.15rem; }
        .pc-badge { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; flex-shrink: 0; }
        .pc-badge-date {
          background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.25);
          padding: 0.28rem 0.7rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; white-space: nowrap;
        }
        .pc-badge-time { font-size: 0.75rem; opacity: 0.85; }

        .pc-mid { text-align: center; margin: 1.2rem 0 1rem; min-height: 96px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
        .pc-diff {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 2.1rem; font-weight: 800; padding: 0.1rem 0.9rem; border-radius: 12px;
          background: rgba(0,0,0,0.18);
        }
        .pc-diff .pc-diff-arrow { font-size: 1.5rem; }
        .pc-diff.is-up { color: #4ade80; }
        .pc-diff.is-down { color: #ff9a5a; }
        .pc-mid-label { display: block; font-size: 0.78rem; opacity: 0.85; margin-top: 0.35rem; }

        .pc-boxes { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 0.6rem; }
        .pc-box { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 18px rgba(0,0,0,0.18); }
        .pc-box-label { padding: 0.5rem; text-align: center; font-weight: 700; font-size: 0.95rem; color: #fff; }
        .pc-box-label--buy { background: #e11d2a; }
        .pc-box-label--sell { background: #16a34a; }
        .pc-box-value { padding: 0.55rem 0.4rem 0.7rem; text-align: center; font-size: 1.9rem; font-weight: 800; }
        .pc-box-value--buy { color: #e11d2a; }
        .pc-box-value--sell { color: #16a34a; }

        .pc-strip {
          display: flex; justify-content: space-between; align-items: center; gap: 0.6rem;
          margin-top: 0.85rem; padding: 0.55rem 0.9rem; border-radius: 12px;
          background: rgba(0,0,0,0.32); font-size: 0.85rem;
        }
        .pc-strip-value { font-weight: 800; }
        .pc-card--gold .pc-strip-value { color: #ffd76a; }
        .pc-card--silver .pc-strip-value { color: #cfe3ff; }

        .pc-note { margin-top: 0.7rem; font-size: 0.72rem; opacity: 0.78; line-height: 1.4; }

        .pc-state { text-align: center; padding: 2.5rem 1rem; color: #fff; }
        .pc-state p { margin-top: 1rem; opacity: 0.9; }
        .pc-state--error { color: #ffb3ba; }
        .pc-loader {
          display: inline-block; width: 42px; height: 42px; border-radius: 50%;
          border: 3px solid rgba(212,168,67,0.25); border-top-color: var(--color-gold, #d4a843);
          animation: pcspin 1s linear infinite;
        }
        @keyframes pcspin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .pc-body { padding: 1.1rem 1.05rem 1rem; }
          .pc-title { font-size: 1.2rem; }
          .pc-kicker { font-size: 0.72rem; min-height: 2.1em; }
          .pc-box-label { font-size: 0.85rem; }
          .pc-box-value { font-size: 1.5rem; }
          .pc-diff { font-size: 1.65rem; }
          .pc-mid { min-height: 82px; }
          .pc-badge-date { font-size: 0.7rem; padding: 0.22rem 0.55rem; }
          .pc-badge-time { font-size: 0.68rem; }
          .pc-strip { flex-wrap: wrap; gap: 0.15rem 0.5rem; font-size: 0.78rem; }
          .pc-note { font-size: 0.68rem; }
        }
        /* จอแคบมากๆ: หัวการ์ดเรียงลงมาไม่ให้ badge เบียดชื่อ */
        @media (max-width: 360px) {
          .pc-head { flex-direction: column; }
          .pc-badge { flex-direction: row; align-items: center; text-align: left; gap: 0.5rem; }
        }
      `}</style>
    </div>
  );

  if (isHero) {
    return <div style={{ width: '100%', marginTop: '2.5rem', zIndex: 10, position: 'relative' }}>{content}</div>;
  }

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', borderTop: '2px solid var(--color-gold)' }}>
      <div className="container">{content}</div>
    </section>
  );
}
