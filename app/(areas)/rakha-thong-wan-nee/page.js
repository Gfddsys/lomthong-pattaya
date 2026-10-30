import Link from "next/link";
import { getGoldPrice } from "@/lib/goldPrice";
import { SITE_URL } from "@/data/site";
import { CONTACT } from "@/data/contact";
import GoldCalculator from "@/components/GoldCalculator";
import EmbedCode from "@/components/EmbedCode";
import AutoRefresh from "@/components/AutoRefresh";
import PriceBoard from "@/components/PriceBoard";
import { HISTORY_READY } from "@/data/goldHistory";
import { MELT_BONUS, MELT_BONUS_HALF, MELT_BONUS_LINE } from "@/data/meltBonus";

/* ============================================
   ราคาทองวันนี้ พัทยา — หน้าราคาทอง + เครื่องคิดเลข + โค้ดกล่องราคาให้เว็บอื่นติด
   ============================================
   render ฝั่ง server (ISR ทุก 5 นาที) ให้ Google เห็นตัวเลขราคาใน HTML เลย
   (การ์ดราคาบนหน้าแรกดึงฝั่ง client → Google เห็นแค่ "กำลังโหลด")
*/
export const revalidate = 300;

const PAGE_PATH = "/rakha-thong-wan-nee";
const TITLE = "ราคาทองวันนี้ พัทยา อัปเดตล่าสุด ทองคำแท่ง ทองรูปพรรณ";
// โปรหลอมทอง (data/meltBonus.js) อยู่ต่อจากคำค้นหลักของหน้า "ราคาทองวันนี้ พัทยา"
const DESCRIPTION = `ราคาทองวันนี้ พัทยา อ้างอิงสมาคมค้าทองคำ อัปเดตทุก 5 นาที · ${MELT_BONUS_LINE} · ตารางขายทอง 1 สลึง 2 สลึง 1 บาท ได้เท่าไหร่ และราคาทอง 18K 14K 9K กรัมละเท่าไหร่`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["ราคาทองวันนี้", "ราคาทองวันนี้ พัทยา", "ราคาทองคำวันนี้", "ราคาทองรูปพรรณวันนี้", "ราคารับซื้อทองวันนี้", "คำนวณราคาขายทอง", "ขายทอง 1 สลึง ได้เท่าไหร่", "ทอง 1 สลึง ราคาวันนี้", "ราคาทอง 75% กรัมละเท่าไหร่", "ราคาทอง 18K วันนี้", "ทองเค กรัมละเท่าไหร่"],
  alternates: {
    canonical: PAGE_PATH,
    languages: { th: PAGE_PATH, en: "/en/gold-price-today", "x-default": PAGE_PATH },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const EMBED_CODE = `<iframe src="${SITE_URL}/embed/gold-price" width="100%" height="190" style="border:0;max-width:420px" title="ราคาทองวันนี้" loading="lazy"></iframe>
<p style="font-size:13px;margin:4px 0 0">ราคาทองวันนี้จาก <a href="${SITE_URL}${PAGE_PATH}">หลอมทองพัทยา</a></p>`;

const FAQ = [
  {
    q: "ราคาทองวันนี้อัปเดตบ่อยแค่ไหน",
    a: "หน้านี้ดึงราคาใหม่ทุก 5 นาที สมาคมค้าทองคำปรับราคาประกาศได้หลายครั้งในวันเดียว ตามราคาทองตลาดโลกและค่าเงินบาท",
  },
  {
    q: "ราคารับซื้อกับราคาขายออก ต่างกันอย่างไร",
    a: "ราคารับซื้อคือราคาที่ร้านทองซื้อทองจากคุณ ราคาขายออกคือราคาที่คุณซื้อทองจากร้าน ถ้าคุณจะขายทอง ให้ดูราคารับซื้อ",
  },
  {
    q: "ทำไมราคารับซื้อทองรูปพรรณต่ำกว่าทองคำแท่ง",
    a: "ทองรูปพรรณต้องนำไปหลอมก่อนขายต่อ และมีค่ากำเหน็จที่จ่ายตอนซื้อซึ่งไม่ได้คืนตอนขาย ราคารับซื้อจึงต่ำกว่าทองคำแท่งน้ำหนักเท่ากัน",
  },
  {
    q: "ขายทองวันนี้ที่ร้าน ได้ราคาตามหน้านี้เลยไหม",
    a: `หลอมแล้วขายให้ร้าน ได้ราคารับซื้อทองรูปพรรณบวกเพิ่มบาทละ ${MELT_BONUS} (ทอง 96.5%) ทองเปอร์เซ็นต์ต่ำกว่าบวกตามสัดส่วนเนื้อทอง ไม่ถึง 1 บาทก็คิดตามสัดส่วน ร้านคิดจากน้ำหนักและเปอร์เซ็นต์ทองที่ตรวจด้วยเครื่อง XRF ต่อหน้าคุณ อ้างอิงราคาสมาคมฯ ล่าสุด ณ เวลาที่ตกลงซื้อขาย ตัวเลขในหน้านี้เป็นราคาประมาณ ใช้เป็นราคาในใจก่อนไปร้าน`,
  },
];

/* ขายทองรูปพรรณตามน้ำหนักที่คนถามบ่อย (1 บาท = 4 สลึง = 15.16 กรัม) — คิดจากราคารับซื้อทองรูปพรรณ (ประมาณ) */
const ORNAMENT_GRAMS_PER_BAHT = 15.16;
const SELL_WEIGHTS = [
  { label: "1 กรัม", baht: 1 / ORNAMENT_GRAMS_PER_BAHT },
  { label: "ครึ่งสลึง", baht: 1 / 8 },
  { label: "1 สลึง", baht: 1 / 4 },
  { label: "2 สลึง (ครึ่งบาท)", baht: 1 / 2 },
  { label: "3 สลึง", baht: 3 / 4 },
  { label: "1 บาท", baht: 1 },
  { label: "2 บาท", baht: 2 },
];
/* ทองเคต่อ 1 กรัม — สูตรเดียวกับเครื่องคิดเลข (components/GoldCalculator.js)
   ต่อกรัม = ราคารับซื้อทองรูปพรรณ ÷ 15.16 × (เปอร์เซ็นต์ทอง ÷ 96.5%) · หลอมขายที่ร้าน = ใช้ราคารูปพรรณ + บาทละ 1,000 แทน */
const KARATS = [
  { id: "965", label: "ทองไทย 96.5%", note: "ทองรูปพรรณ", purity: 0.965 },
  { id: "22k", label: "ทอง 22K", note: "เนื้อทอง 91.6%", purity: 0.916 },
  { id: "18k", label: "ทอง 18K", note: "ทอง 75% · ตรา 750", purity: 0.75 },
  { id: "14k", label: "ทอง 14K", note: "ทอง 58.5% · ตรา 585", purity: 0.585 },
  { id: "9k", label: "ทอง 9K", note: "ทอง 37.5% · ตรา 375", purity: 0.375 },
];
const perGram = (bahtPrice, purity) => (bahtPrice / ORNAMENT_GRAMS_PER_BAHT) * (purity / 0.965);
const fmtBaht = (n) => Math.round(n).toLocaleString("th-TH");
const fmtGram = (n) => n.toLocaleString("th-TH", { maximumFractionDigits: 2 });

function fmtDiff(diff) {
  const d = String(diff ?? "").trim();
  if (!d || d === "0" || d === "+0" || d === "-0") return "ไม่เปลี่ยนแปลงจากราคาเปิด";
  return `${d.startsWith("-") ? "ลดลง" : "เพิ่มขึ้น"} ${d.replace(/^[+-]/, "")} บาท จากราคาเปิด`;
}

export default async function RakhaThongWanNee() {
  let p = null;
  try {
    p = await getGoldPrice();
  } catch {
    p = null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "ราคาทองวันนี้", item: `${SITE_URL}${PAGE_PATH}` },
    ],
  };

  return (
    <article className="blog-article">
      <AutoRefresh seconds={600} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/" prefetch={false}>หน้าแรก</Link>
        <span>/</span>
        <span>ราคาทองวันนี้</span>
      </nav>

      <header className="blog-article-header">
        <h1>ราคาทองวันนี้ พัทยา</h1>
        <div className="blog-article-meta">
          {p ? (
            <>
              <span>📅 {p.date}</span>
              <span>🕐 อัปเดต {p.time} น.</span>
              <span>📊 {fmtDiff(p.diff)}</span>
            </>
          ) : (
            <span>อ้างอิงราคาประกาศสมาคมค้าทองคำ</span>
          )}
        </div>
      </header>

      {/* ป้ายราคาแบบหน้าร้าน ใช้ราคาชุดเดียวกับตารางด้านล่าง แล้วอัปเดตเองทุก 5 นาที */}
      {p && (
        <div style={{ margin: "0 0 var(--space-xl)" }}>
          <PriceBoard initialData={p} />
        </div>
      )}

      <div className="blog-article-content">
        {p ? (
          <div className="blog-table-wrap">
            <table className="blog-table gp-table">
              <caption>ราคาทอง 96.5% ต่อน้ำหนัก 1 บาท (หน่วย: บาท)</caption>
              <thead>
                <tr>
                  <th scope="col">ประเภท</th>
                  <th scope="col">รับซื้อ</th>
                  <th scope="col">ขายออก</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ทองคำแท่ง</td>
                  <td>{p.gold_bar.buy}</td>
                  <td>{p.gold_bar.sell}</td>
                </tr>
                <tr>
                  <td>ทองรูปพรรณ (ประมาณ)</td>
                  <td>{p.gold_ornament.buy}</td>
                  <td>{p.gold_ornament.sell}</td>
                </tr>
                <tr>
                  <td>
                    <strong>หลอมขายที่ร้านเรา</strong>{" "}
                    <span style={{ whiteSpace: "nowrap" }}>(รูปพรรณ</span> + {MELT_BONUS})
                  </td>
                  <td>
                    <strong>{p.gold_melt.buy}</strong>
                  </td>
                  <td>–</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>ยังดึงราคาทองไม่ได้ในขณะนี้ ลองรีเฟรชหน้าอีกครั้ง หรือโทรถามราคาที่ร้าน {CONTACT.phoneDisplay}</p>
        )}
        <p className="gp-source">
          ทองคำแท่งอ้างอิงราคาประกาศของ<strong>สมาคมค้าทองคำ</strong> ทองรูปพรรณเป็นราคาที่คำนวณโดยประมาณ
          หน้านี้ดึงราคาใหม่อัตโนมัติทุก 5 นาที
          {HISTORY_READY && (
            <>
              {" "}· ดู <Link href="/rakha-thong-yon-lang">ราคาทองย้อนหลังรายวัน</Link>
            </>
          )}
        </p>

        {p && (
          <>
            <h2>ขายทอง 1 สลึง 2 สลึง 1 บาท วันนี้ได้เท่าไหร่</h2>
            <p>
              ตัวเลขด้านล่างคิดจากราคารับซื้อทองรูปพรรณ 96.5% (ประมาณ) ของวันนี้ บาทละ {p.gold_ornament.buy} บาท
              ถ้าหลอมขายที่ร้านเรา บวกเพิ่มบาทละ {MELT_BONUS} ทองไม่ถึง 1 บาทก็บวกตามสัดส่วน (เช่น 2 สลึง บวก {MELT_BONUS_HALF})
              ตามน้ำหนักที่คนถามบ่อย ใช้เป็นราคาในใจก่อนไปร้าน
            </p>
            <div className="blog-table-wrap">
              <table className="blog-table gp-table">
                <caption>ขายทองรูปพรรณ 96.5% ได้ประมาณเท่าไหร่ ตามราคาวันนี้ (หน่วย: บาท)</caption>
                {/* 3 ช่องพอดีจอมือถือ 360px (กรัมอยู่ใต้น้ำหนัก) — ช่องหลอมขายที่ร้านเราต้องเห็นโดยไม่ต้องเลื่อนข้าง */}
                <thead>
                  <tr>
                    <th scope="col">น้ำหนัก</th>
                    <th scope="col">
                      ราคารับซื้อ<span style={{ whiteSpace: "nowrap" }}>รูปพรรณ</span>
                    </th>
                    <th scope="col">
                      หลอมขาย<span style={{ whiteSpace: "nowrap" }}>ที่ร้านเรา</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SELL_WEIGHTS.map((w) => (
                    <tr key={w.label}>
                      <td>
                        {w.label}
                        {!w.label.endsWith("กรัม") && (
                          <span className="gp-gram">{fmtGram(w.baht * ORNAMENT_GRAMS_PER_BAHT)} กรัม</span>
                        )}
                      </td>
                      <td>{fmtBaht(w.baht * p.raw.ornamentBuy)}</td>
                      <td>
                        <strong>{fmtBaht(w.baht * p.raw.meltBuy)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="gp-source">
              ราคาที่ได้จริงคิดจากน้ำหนักที่ชั่งจริงและเปอร์เซ็นต์ทองที่ตรวจด้วยเครื่อง XRF ต่อหน้าคุณ ณ เวลาที่ตกลงซื้อขาย
              ทองหัก ทองชำรุด หรือไม่มีใบเสร็จก็คิดตามเนื้อทองเหมือนกัน · แปลงน้ำหนักอื่นดูที่{" "}
              <Link href="/blog/gold-salung-gram-converter-pattaya">ทอง 1 สลึง กี่กรัม</Link>
            </p>

            <h2 id="rakha-thong-k">ราคาทองเค 18K 14K 9K กรัมละเท่าไหร่ วันนี้</h2>
            <p>
              วันนี้<strong>ทอง 18K (ทอง 75%) กรัมละประมาณ {fmtBaht(perGram(p.raw.ornamentBuy, 0.75))} บาท</strong>{" "}
              ตามราคารับซื้อทองรูปพรรณ ถ้าหลอมขายที่ร้านเรา ได้กรัมละประมาณ{" "}
              <strong>{fmtBaht(perGram(p.raw.meltBuy, 0.75))} บาท</strong> เพราะบวกเพิ่มบาทละ {MELT_BONUS} ตามสัดส่วนเนื้อทอง
              ทอง 14K และ 9K มีเนื้อทองน้อยกว่า ราคาต่อกรัมจึงต่ำลงตามเปอร์เซ็นต์ ดูครบทุกชนิดในตาราง
            </p>
            <div className="blog-table-wrap">
              <table className="blog-table gp-table">
                <caption>ราคาทองต่อ 1 กรัม ตามราคาวันนี้ (ประมาณ หน่วย: บาท)</caption>
                <thead>
                  <tr>
                    <th scope="col">ชนิดทอง</th>
                    <th scope="col">
                      ราคารับซื้อ<span style={{ whiteSpace: "nowrap" }}>รูปพรรณ</span>
                    </th>
                    <th scope="col">
                      หลอมขาย<span style={{ whiteSpace: "nowrap" }}>ที่ร้านเรา</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KARATS.map((k) => (
                    <tr key={k.id}>
                      <td>
                        {k.label}
                        <span className="gp-gram">{k.note}</span>
                      </td>
                      <td>{fmtBaht(perGram(p.raw.ornamentBuy, k.purity))}</td>
                      <td>
                        <strong>{fmtBaht(perGram(p.raw.meltBuy, k.purity))}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="gp-source">
              คิดจากราคารับซื้อทองรูปพรรณบาทละ {p.gold_ornament.buy} บาท ÷ 15.16 กรัม × สัดส่วนเนื้อทองเทียบทอง 96.5%
              (เช่น 18K = 75 ÷ 96.5) ทองเคจริงแต่ละชิ้นเปอร์เซ็นต์อาจไม่ตรงตราปั๊ม ร้านตรวจด้วยเครื่อง XRF ต่อหน้าคุณก่อนแจ้งราคา
              · อ่านเพิ่ม <Link href="/blog/ran-rub-sue-thong-k-pattaya-18k-14k-9k">ทองเคขายได้ไหม คิดราคายังไง</Link>
            </p>
          </>
        )}

        <h2>ราคาทองวันนี้ ขายทองเก่าได้เท่าไร</h2>
        <p>
          กรอกน้ำหนักและชนิดทองของคุณ เพื่อดูว่าหลอมขายที่ร้านได้ประมาณเท่าไหร่จากราคาวันนี้
          (ราคารับซื้อทองรูปพรรณ บวกเพิ่มบาทละ {MELT_BONUS} ตามสัดส่วนเนื้อทอง) ใช้ได้ทั้งทองไทย 96.5% และทองเค 18K 14K 9K
        </p>
        {p ? <GoldCalculator ornamentBuy={p.raw.ornamentBuy} /> : <p>เครื่องคิดเลขใช้ได้เมื่อดึงราคาทองสำเร็จ</p>}
        <p>
          อยากเข้าใจวิธีคิดแบบละเอียด อ่านต่อที่ <Link href="/blog/wi-thi-kamnuan-rakha-khai-thong-kao">วิธีคำนวณราคาขายทองเก่า</Link>{" "}
          ถ้าเป็นทองเคจากต่างประเทศ ดู <Link href="/blog/ran-rub-sue-thong-k-pattaya-18k-14k-9k">รับซื้อทองเค 18K 14K 9K</Link>
        </p>

        <h2>อ่านราคาทองให้เป็น</h2>
        <ul>
          <li>
            <strong>รับซื้อ</strong> คือราคาที่ร้านซื้อทองจากคุณ ถ้าจะขายทอง ดูช่องนี้
          </li>
          <li>
            <strong>ขายออก</strong> คือราคาที่คุณซื้อทองจากร้าน
          </li>
          <li>
            ราคาเป็นทอง <strong>96.5% ต่อน้ำหนัก 1 บาท</strong> (ทองคำแท่ง 1 บาท = 15.244 กรัม ทองรูปพรรณ 1 บาท = 15.16 กรัม)
          </li>
          <li>ทองรูปพรรณรับซื้อต่ำกว่าทองคำแท่ง เพราะต้องนำไปหลอมก่อนขายต่อ</li>
        </ul>

        <h2>ขายทองวันนี้ที่พัทยา ได้ราคาจริงเท่าไร</h2>
        <p>
          ตัวเลขด้านบนคือราคาอ้างอิง ราคาที่คุณได้จริงที่ร้านคิดจากน้ำหนักและเปอร์เซ็นต์ทองที่ตรวจด้วย
          <Link href="/blog/xrf-gold-testing-pattaya-free">เครื่อง XRF</Link> ต่อหน้าคุณ อ้างอิงราคาสมาคมฯ ล่าสุด
          ณ เวลาที่ตกลงซื้อขาย ตรวจฟรี ไม่ขายก็ไม่เสียค่าใช้จ่าย
        </p>
        <p>
          ตกลงราคาแล้ว <Link href="/blog/pattaya-gold-shop-payment-cash-vs-transfer">รับเงินสดทันทีหรือโอนเข้าบัญชี</Link>ได้
          ร้านเปิดทุกวันถึง 20:00 น. ที่ <Link href="/branch/pattaya-tai">สาขาพัทยาใต้</Link> และ{" "}
          <Link href="/branch/noen-plap-wan">สาขาเนินพลับหวาน</Link>
        </p>
        <p>
          ต้องการเงินก้อนแต่ยังไม่อยากขายทองขาด <Link href="/services/khai-fak-thong">ขายฝากทอง</Link>แล้วไถ่คืนตามสัญญาได้
          ถ้าทองติดอยู่ที่โรงรับจำนำ ร้านช่วยไถ่ถอนตั๋วจำนำให้ด้วย
        </p>

        <h2>คำถามเกี่ยวกับราคาทองวันนี้</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="embed">นำราคาทองวันนี้ไปติดเว็บของคุณ</h2>
        <p>
          มีเว็บไซต์หรือบล็อก อยากโชว์ราคาทองให้ผู้อ่าน ก๊อปโค้ดด้านล่างไปวางได้ฟรี ราคาอัปเดตเองอัตโนมัติ
          ไม่ต้องแก้ทุกวัน
        </p>
        <EmbedCode code={EMBED_CODE} />
        <p className="gp-source">ตัวอย่างกล่องราคาที่จะแสดงบนเว็บของคุณ:</p>
        <iframe
          src="/embed/gold-price"
          width="100%"
          height="190"
          style={{ border: 0, maxWidth: "420px" }}
          title="ตัวอย่างกล่องราคาทองวันนี้"
          loading="lazy"
        ></iframe>
      </div>

      <div className="blog-article-cta">
        <h3>ราคาทองวันนี้ดี อยากขายทอง</h3>
        <p>ตรวจเปอร์เซ็นต์ทองฟรีต่อหน้าคุณ · รับเงินสดทันที · เปิดทุกวันถึง 20:00 น.</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.phoneHref} className="btn btn-primary">
            📞 โทร {CONTACT.phoneDisplay}
          </a>
          <Link href="/services/online-valuation" className="btn btn-outline">
            ส่งรูปประเมินราคา
          </Link>
        </div>
      </div>
    </article>
  );
}
