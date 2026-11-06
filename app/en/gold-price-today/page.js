import Link from "next/link";
import { getGoldPrice } from "@/lib/goldPrice";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/data/site";
import AutoRefresh from "@/components/AutoRefresh";
import ArticleLineBox from "@/components/ArticleLineBox";

/* ============================================
   Gold price today in Pattaya — หน้าราคาทองภาษาอังกฤษ (คู่กับ /rakha-thong-wan-nee)
   ============================================
   render ฝั่ง server ทุก 5 นาที ให้ Google เห็นตัวเลขจริง
   ราคาต่อกรัม (มูลค่าเนื้อทองจากราคาทองคำแท่ง):
   มูลค่า ≈ กรัม × (เปอร์เซ็นต์ทอง ÷ 96.5%) × (ราคารับซื้อทองคำแท่ง ÷ 15.244)
   ⚠️ เป็นมูลค่าเนื้อทองอ้างอิง ไม่ใช่ราคารับซื้อของร้าน ต้องบอกชัดเจนทุกครั้ง
*/
export const revalidate = 300;

const PATH = "/en/gold-price-today";
// คำที่คนค้นจริง (Search Console 28 วันถึง 4 พ.ย. 2569): "96.5 gold price in thailand today" คนเห็นมากสุด (อันดับ 10)
// ตามด้วย "gold rate today pattaya", "gold price today pattaya" → ชื่อหน้า/หัวข้อใส่ 96.5% และคำว่า gold rate (7 พ.ย. 2569)
const TITLE = "96.5% Gold Price Today in Thailand | Pattaya Gold Rate per Baht";
const DESCRIPTION =
  "Today's 96.5% Thai gold price from the Gold Traders Association, updated every 5 minutes. Gold rate per baht and per gram for 24K, 22K, 18K, 14K and 9K.";
const BAR_GRAMS_PER_BAHT = 15.244;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["96.5 gold price in Thailand today", "gold rate today Pattaya", "gold price Pattaya", "gold price per gram Thailand", "Thai gold price per baht"],
  alternates: {
    canonical: PATH,
    languages: { th: "/rakha-thong-wan-nee", en: PATH, "x-default": "/rakha-thong-wan-nee" },
  },
  openGraph: { type: "website", locale: "en_US", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
};

const KARATS = [
  ["24K", 0.999],
  ["Thai gold 96.5% (23K)", 0.965],
  ["22K", 0.916],
  ["18K", 0.75],
  ["14K", 0.585],
  ["9K", 0.375],
];

const FAQ = [
  {
    q: "Where does this gold price come from?",
    a: "From the price announced by the Thai Gold Traders Association, which all Thai gold shops use as their reference. This page refreshes it every 5 minutes; the association can change the price several times a day.",
  },
  {
    q: "What is a baht of gold?",
    a: "Thailand weighs gold in baht. One baht of gold bar is 15.244 grams of 96.5% gold, and one baht of gold jewelry is 15.16 grams. Prices on Thai gold shop boards are per baht weight.",
  },
  {
    q: "Is the per-gram value what I will get for my jewelry?",
    a: "It is the reference value of the gold content. The final offer depends on the weight and purity we measure on the XRF machine in front of you, at the price of that moment.",
  },
  {
    q: "What is the difference between the buy and sell price?",
    a: "The buy price is what shops pay when you sell gold. The sell price is what you pay when you buy gold. If you are selling, look at the buy price.",
  },
];

const fmt = (n) => Math.round(n).toLocaleString("en-US");

export default async function GoldPriceTodayEn() {
  let p = null;
  try {
    p = await getGoldPrice();
  } catch {
    p = null;
  }
  const perGram965 = p ? p.raw.barBuy / BAR_GRAMS_PER_BAHT : 0;
  const updated = p
    ? new Date(p.updatedIso).toLocaleString("en-GB", {
        timeZone: "Asia/Bangkok",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Sell gold in Pattaya", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Gold price today", item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <article className="blog-article">
      <AutoRefresh seconds={600} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/en">Sell gold in Pattaya</Link>
        <span>/</span>
        <span>Gold price today</span>
      </nav>

      <header className="blog-article-header">
        <h1>Gold Price Today in Pattaya: 96.5% Thai Gold Rate</h1>
        <div className="blog-article-meta">
          {updated ? <span>🕐 Updated {updated} (Bangkok time)</span> : <span>Thai Gold Traders Association price</span>}
        </div>
      </header>

      <div className="blog-article-content">
        {p ? (
          <>
            {/* คำตอบในประโยคเดียว (ตัวเลขจริงของรอบนี้) ให้ Google ดึงไปตอบคำค้น "96.5 gold price in thailand today" */}
            <div className="en-summary">
              <p><strong>96.5% gold price in Thailand today</strong></p>
              <ul>
                <li>
                  Gold bar: shops buy at <strong>{fmt(p.raw.barBuy)} THB</strong> and sell at{" "}
                  <strong>{fmt(p.raw.barSell)} THB</strong> per baht (15.244 g).
                </li>
                <li>
                  Gold jewelry: shops buy at about <strong>{fmt(p.raw.ornamentBuy)} THB</strong> per baht (15.16 g).
                </li>
                <li>
                  That is about <strong>{fmt(perGram965)} THB per gram</strong> of 96.5% gold, based on the gold bar buy price.
                </li>
              </ul>
            </div>

            <ArticleLineBox kind="en" />

            <div className="blog-table-wrap">
              <table className="blog-table gp-table">
                <caption>96.5% gold per 1 baht weight (gold bar 15.244 g, jewelry 15.16 g), in Thai baht</caption>
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Shops buy at</th>
                    <th scope="col">Shops sell at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gold bar</td>
                    <td>{fmt(p.raw.barBuy)}</td>
                    <td>{fmt(p.raw.barSell)}</td>
                  </tr>
                  <tr>
                    <td>Gold jewelry (approx.)</td>
                    <td>{fmt(p.raw.ornamentBuy)}</td>
                    <td>{fmt(p.raw.ornamentSell)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Gold value per gram by karat</h2>
            <p>
              Reference value of the gold content per gram, calculated from today&apos;s association gold bar buy
              price. Useful for estimating jewelry from abroad before you come in.
            </p>
            <div className="blog-table-wrap">
              <table className="blog-table">
                <caption>Approximate gold value per gram (Thai baht)</caption>
                <thead>
                  <tr>
                    <th scope="col">Purity</th>
                    <th scope="col">Gold content</th>
                    <th scope="col">≈ THB per gram</th>
                  </tr>
                </thead>
                <tbody>
                  {KARATS.map(([k, purity]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>{(purity * 100).toFixed(1)}%</td>
                      <td>{fmt(perGram965 * (purity / 0.965))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Example: an 18K chain weighing 10 g ≈ 10 × {fmt(perGram965 * (0.75 / 0.965))} ={" "}
              <strong>{fmt(10 * perGram965 * (0.75 / 0.965))} THB</strong> of gold content. The real purity is
              measured on our XRF machine in front of you, so the final offer may be higher or lower than the stamp
              suggests.
            </p>
          </>
        ) : (
          <p>
            The gold price could not be loaded right now. Please refresh the page, or call us at{" "}
            {CONTACT.phoneDisplay}.
          </p>
        )}
        <p className="gp-source">
          Gold bar prices are the <strong>Thai Gold Traders Association</strong> announced price. Jewelry and
          per-gram values are estimates. This page refreshes automatically every 5 minutes.
        </p>

        <h2>Selling gold in Pattaya</h2>
        <p>
          We pay for the real gold content: weight × purity measured on an XRF machine, at the association price of
          the moment. Bring your original passport. Read <Link href="/en">how selling gold works</Link>, get a{" "}
          <Link href="/en/xrf-gold-test">free XRF gold test</Link>, or ask about{" "}
          <Link href="/en/gold-melting">melting scrap gold</Link>.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="blog-article-cta">
        <h3>Want a price for your gold?</h3>
        <p>Send photos and the weight on LINE for a free estimate · Open daily</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            💬 Send photos on LINE
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-outline">
            📞 Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </article>
  );
}
