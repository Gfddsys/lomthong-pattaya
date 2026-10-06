import Link from "next/link";
import { getGoldPrice } from "@/lib/goldPrice";
import { SITE_URL } from "@/data/site";
import { CONTACT } from "@/data/contact";
import GoldCalculator from "@/components/GoldCalculator";
import EmbedCode from "@/components/EmbedCode";
import AutoRefresh from "@/components/AutoRefresh";

/* ============================================
   ราคาทองวันนี้ พัทยา — หน้าราคาทอง + เครื่องคิดเลข + โค้ดกล่องราคาให้เว็บอื่นติด
   ============================================
   render ฝั่ง server (ISR ทุก 5 นาที) ให้ Google เห็นตัวเลขราคาใน HTML เลย
   (การ์ดราคาบนหน้าแรกดึงฝั่ง client → Google เห็นแค่ "กำลังโหลด")
*/
export const revalidate = 300;

const PAGE_PATH = "/rakha-thong-wan-nee";
const TITLE = "ราคาทองวันนี้ พัทยา อัปเดตล่าสุด ทองคำแท่ง ทองรูปพรรณ";
const DESCRIPTION =
  "ราคาทองวันนี้ พัทยา อ้างอิงราคาประกาศสมาคมค้าทองคำ อัปเดตทุก 5 นาที ทั้งราคารับซื้อและขายออกทองคำแท่ง ทองรูปพรรณ พร้อมเครื่องคิดเลขประเมินราคาขายทองเก่า ทอง 18K 14K 9K";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["ราคาทองวันนี้", "ราคาทองวันนี้ พัทยา", "ราคาทองคำวันนี้", "ราคาทองรูปพรรณวันนี้", "ราคารับซื้อทองวันนี้", "คำนวณราคาขายทอง"],
  alternates: { canonical: PAGE_PATH },
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
    a: "ร้านคิดราคาจากน้ำหนักและเปอร์เซ็นต์ทองที่ตรวจด้วยเครื่อง XRF ต่อหน้าคุณ อ้างอิงราคาสมาคมฯ ล่าสุด ณ เวลาที่ตกลงซื้อขาย ตัวเลขในหน้านี้จึงใช้เป็นราคาในใจก่อนไปร้าน",
  },
];

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
        <Link href="/">หน้าแรก</Link>
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
              </tbody>
            </table>
          </div>
        ) : (
          <p>ยังดึงราคาทองไม่ได้ในขณะนี้ ลองรีเฟรชหน้าอีกครั้ง หรือโทรถามราคาที่ร้าน {CONTACT.phoneDisplay}</p>
        )}
        <p className="gp-source">
          ทองคำแท่งอ้างอิงราคาประกาศของ<strong>สมาคมค้าทองคำ</strong> ทองรูปพรรณเป็นราคาที่คำนวณโดยประมาณ
          หน้านี้ดึงราคาใหม่อัตโนมัติทุก 5 นาที
        </p>

        <h2>ราคาทองวันนี้ ขายทองเก่าได้เท่าไร</h2>
        <p>
          กรอกน้ำหนักและชนิดทองของคุณ เพื่อดูมูลค่าเนื้อทองโดยประมาณจากราคาวันนี้ ใช้ได้ทั้งทองไทย 96.5%
          และทองเค 18K 14K 9K
        </p>
        {p ? <GoldCalculator barBuy={p.raw.barBuy} /> : <p>เครื่องคิดเลขใช้ได้เมื่อดึงราคาทองสำเร็จ</p>}
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
          ร้านเปิดทุกวัน 10:00 - 20:00 น. ที่ <Link href="/branch/pattaya-tai">สาขาพัทยาใต้</Link> และ{" "}
          <Link href="/branch/noen-plap-wan">สาขาเนินพลับหวาน</Link>
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
        <p>ตรวจเปอร์เซ็นต์ทองฟรีต่อหน้าคุณ · รับเงินสดทันที · เปิดทุกวัน 10:00 - 20:00 น.</p>
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
