import Link from "next/link";
import { GOLD_HISTORY as history, HISTORY_READY as ready, HISTORY_MIN_DAYS } from "@/data/goldHistory";
import { SITE_URL } from "@/data/site";
import { CONTACT } from "@/data/contact";

/* ============================================
   ราคาทองย้อนหลัง พัทยา — สรุปราคาประกาศจริงรายวัน/รายเดือน (ไม่มีการทำนาย)
   ============================================
   ข้อมูล: data/gold-history.json บันทึกทุกวัน 17:30 น. โดย .github/workflows/gold-history.yml
   ⚠️ ข้อมูลน้อยกว่า HISTORY_MIN_DAYS วัน (data/goldHistory.js) = noindex + ไม่อยู่ใน sitemap (กัน Google เห็นเป็นหน้าบาง)
      ครบแล้วจะเปิดเองตอน deploy ถัดไป (การบันทึกแต่ละวันคือ push → Vercel build ใหม่อยู่แล้ว)
*/

const PATH = "/rakha-thong-yon-lang";
const TITLE = "ราคาทองย้อนหลัง รายวัน รายเดือน ทองคำแท่ง ทองรูปพรรณ";
const DESCRIPTION =
  "ราคาทองย้อนหลังรายวัน อ้างอิงราคาประกาศสมาคมค้าทองคำ บันทึกทุกวัน 17:30 น. ดูราคาสูงสุด ต่ำสุด และการเปลี่ยนแปลงของแต่ละเดือน ทั้งทองคำแท่งและทองรูปพรรณ";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: ready ? undefined : { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: `${SITE_URL}${PATH}` },
};

const TH_MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const TH_MONTHS_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const fmt = (n) => Math.round(n).toLocaleString("th-TH");
const monthLabel = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return `${TH_MONTHS[m - 1]} ${y + 543}`;
};
const dayLabel = (d) => {
  const [y, m, day] = d.split("-").map(Number);
  return `${day} ${TH_MONTHS_SHORT[m - 1]} ${String(y + 543).slice(2)}`;
};
const signed = (n) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `-${fmt(Math.abs(n))}` : "0");

function monthStats(rows) {
  const buys = rows.map((r) => r.barBuy);
  const first = rows[0];
  const last = rows[rows.length - 1];
  const hi = rows.reduce((a, r) => (r.barBuy > a.barBuy ? r : a), first);
  const lo = rows.reduce((a, r) => (r.barBuy < a.barBuy ? r : a), first);
  return {
    first,
    last,
    hi,
    lo,
    avg: buys.reduce((a, b) => a + b, 0) / buys.length,
    change: last.barBuy - first.barBuy,
  };
}

export default function RakhaThongYonLang() {
  // จัดกลุ่มตามเดือน ล่าสุดก่อน
  const byMonth = {};
  for (const r of history) (byMonth[r.date.slice(0, 7)] ||= []).push(r);
  const months = Object.keys(byMonth).sort().reverse();

  return (
    <article className="blog-article">
      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/rakha-thong-wan-nee">ราคาทองวันนี้</Link>
        <span>/</span>
        <span>ราคาทองย้อนหลัง</span>
      </nav>

      <header className="blog-article-header">
        <h1>ราคาทองย้อนหลัง รายวัน และสรุปรายเดือน</h1>
        <div className="blog-article-meta">
          <span>📅 บันทึกทุกวัน 17:30 น.</span>
          <span>📊 อ้างอิงราคาประกาศสมาคมค้าทองคำ</span>
          <span>🗂 รวม {history.length} วัน{!ready && ` (เปิดให้ค้นหาเมื่อครบ ${HISTORY_MIN_DAYS} วัน)`}</span>
        </div>
      </header>

      <div className="blog-article-content">
        <p>
          หน้านี้บันทึก<strong>ราคาทองที่ประกาศจริง</strong>ทุกวันเวลา 17:30 น. ทั้งราคารับซื้อและขายออกของทองคำแท่ง 96.5%
          และทองรูปพรรณ (ราคาประมาณ) เพื่อให้คุณดูย้อนหลังได้ว่าราคาขึ้นลงอย่างไรก่อนตัดสินใจขายทอง
          ไม่มีการทำนายราคา ดูราคาล่าสุดแบบอัปเดตทุก 5 นาทีได้ที่ <Link href="/rakha-thong-wan-nee">ราคาทองวันนี้</Link>
        </p>

        {months.length === 0 && <p>กำลังเริ่มเก็บข้อมูล ราคาวันแรกจะขึ้นหลัง 17:30 น.</p>}

        {months.map((ym, idx) => {
          const rows = byMonth[ym];
          const s = monthStats(rows);
          return (
            <section key={ym}>
              <h2>ราคาทองย้อนหลัง {monthLabel(ym)}</h2>
              <ul>
                <li>
                  ราคารับซื้อทองคำแท่งล่าสุด ({dayLabel(s.last.date)}) <strong>{fmt(s.last.barBuy)} บาท</strong>
                  {rows.length > 1 && <> · เปลี่ยนจากต้นเดือน <strong>{signed(s.change)} บาท</strong></>}
                </li>
                {rows.length > 1 && (
                  <>
                    <li>สูงสุดของเดือน {fmt(s.hi.barBuy)} บาท ({dayLabel(s.hi.date)}) · ต่ำสุด {fmt(s.lo.barBuy)} บาท ({dayLabel(s.lo.date)})</li>
                    <li>เฉลี่ยทั้งเดือน {fmt(s.avg)} บาท (จาก {rows.length} วันที่บันทึก)</li>
                  </>
                )}
              </ul>
              <div className="blog-table-wrap">
                <table className="blog-table">
                  <caption>ราคาทอง 96.5% ต่อน้ำหนัก 1 บาท {monthLabel(ym)} (หน่วย: บาท)</caption>
                  <thead>
                    <tr>
                      <th scope="col">วันที่</th>
                      <th scope="col">ทองแท่ง รับซื้อ</th>
                      <th scope="col">ทองแท่ง ขายออก</th>
                      <th scope="col">รูปพรรณ รับซื้อ*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...rows].reverse().map((r) => (
                      <tr key={r.date}>
                        <td>{dayLabel(r.date)}</td>
                        <td>{fmt(r.barBuy)}</td>
                        <td>{fmt(r.barSell)}</td>
                        <td>{fmt(r.ornamentBuy)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {idx === 0 && (
                <p className="gp-source">
                  * ทองรูปพรรณเป็นราคาคำนวณโดยประมาณ ราคาหน้าร้านแต่ละร้านอาจต่างกัน ราคาที่บันทึกคือราคา ณ เวลา 17:30 น.
                  ของแต่ละวัน วันนั้นสมาคมอาจปรับราคาหลายครั้ง
                </p>
              )}
            </section>
          );
        })}

        <h2>ราคาทองย้อนหลังช่วยอะไรตอนขายทอง</h2>
        <ul>
          <li>เห็นว่าราคาตอนนี้อยู่ช่วงสูงหรือต่ำของเดือน ช่วยตัดสินใจจังหวะขายได้ แต่ราคาในอนาคตไม่มีใครรู้แน่</li>
          <li>ราคาที่ร้านรับซื้อทองเก่าคิดจาก <strong>น้ำหนัก × เปอร์เซ็นต์ทองที่ตรวจได้</strong> อ้างอิงราคาของวันที่ขาย ดู <Link href="/blog/wi-thi-kamnuan-rakha-khai-thong-kao">วิธีคิดราคาขายทองเก่า</Link></li>
          <li>อยากรู้ว่าทองของคุณขายได้ประมาณเท่าไรวันนี้ ใช้เครื่องคิดเลขในหน้า <Link href="/rakha-thong-wan-nee">ราคาทองวันนี้</Link> หรือส่งรูปให้ <Link href="/services/online-valuation">ประเมินทาง LINE</Link></li>
        </ul>
      </div>

      <div className="blog-article-cta">
        <h3>จะขายทองวันนี้ ถามราคาก่อนได้</h3>
        <p>ส่งรูปและน้ำหนักทาง LINE {CONTACT.lineId} หรือโทร {CONTACT.phoneDisplay} · 2 สาขาในพัทยา เปิดทุกวัน</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            💬 ประเมินราคา / สอบถาม
          </a>
          <Link href="/services/gold-buying" className="btn btn-outline">
            รับซื้อทองเก่า พัทยา
          </Link>
        </div>
      </div>
    </article>
  );
}
