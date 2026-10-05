import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";
import { CONTACT } from "@/data/contact";
import { BRANCHES } from "@/data/branches";
import { SITE_URL } from "@/data/site";

/* ============================================
   Sell Gold in Pattaya — หน้าภาษาอังกฤษสำหรับชาวต่างชาติ
   ============================================
   ข้อเท็จจริงทั้งหมดมาจากข้อมูลร้านในเว็บ (data/*, บทความชาวต่างชาติขายทอง)
   ⚠️ ห้ามเพิ่มสิ่งที่ร้านไม่ได้ทำจริง เช่น "พนักงานพูดอังกฤษได้" "จ่ายเป็นดอลลาร์" ถ้ายังไม่ได้ยืนยันกับร้าน
*/

const PAGE_URL = `${SITE_URL}/en`;
const COVER_IMAGE = getUploadedImage("hero", "/images/hero.png");
const TITLE = "Sell Gold in Pattaya | Free XRF Test, Cash Paid on the Spot";
const DESCRIPTION =
  "Sell gold in Pattaya with your passport: 9K, 14K, 18K, 22K and Italian gold, broken jewelry, scrap gold and luxury watches. Free XRF purity test in front of you, cash in Thai baht. Open daily 10:00 to 20:00.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "sell gold Pattaya",
    "gold buyer Pattaya",
    "where to sell gold in Pattaya",
    "sell gold jewelry Pattaya",
    "sell 18K gold Pattaya",
    "gold shop Jomtien",
    "sell gold with passport Thailand",
  ],
  alternates: {
    canonical: "/en",
    languages: { th: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [COVER_IMAGE],
  },
};

const PURITY = [
  ["24K", "99.9%", "Gold bars, bullion"],
  ["Thai gold (23K)", "96.5%", "Necklaces and bangles bought in Thai gold shops"],
  ["22K", "91.6%", "Jewelry from India and the Middle East"],
  ["18K", "75%", "European jewelry, rings with stones, watch cases"],
  ["14K", "58.5%", "American and European jewelry"],
  ["9K", "37.5%", "UK and Australian jewelry"],
];

const FAQ = [
  {
    q: "Can I sell gold in Pattaya as a foreigner?",
    a: "Yes. Bring your original passport. Tourists can sell too; you do not need a long-stay visa.",
  },
  {
    q: "Can I use a copy or a photo of my passport?",
    a: "No. The shop must see the original passport to record the seller, as required for second-hand trading. Copies and phone photos are not accepted.",
  },
  {
    q: "Do you buy 9K, 14K and 18K gold from abroad?",
    a: "Yes. Many Thai gold shops only trade 96.5% Thai gold and refuse foreign karat gold. We measure the real purity with an XRF machine and pay for the gold content, from 9K up to 24K.",
  },
  {
    q: "How is the price calculated?",
    a: "Weight multiplied by the purity measured on the XRF machine, based on the Thai Gold Traders Association price of the day. Brand value, design and the retail markup you paid when buying are not part of the gold value.",
  },
  {
    q: "Do you pay in US dollars or euros?",
    a: "No. Payment is in Thai baht, either cash on the spot or a transfer to a Thai bank account. For other currencies, use a money exchange afterwards.",
  },
  {
    q: "Is the XRF test free if I decide not to sell?",
    a: "Yes. Testing is free and done in front of you. If you do not like the offer, you take your gold home and pay nothing.",
  },
];

export default function SellGoldPattayaEn() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en",
    about: { "@id": `${SITE_URL}/#business` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="blog-article-header">
        <h1>Sell Gold in Pattaya: Free XRF Test, Cash Paid on the Spot</h1>
        <div className="blog-article-meta">
          <span>📍 2 shops in Pattaya</span>
          <span>🕐 Open daily 10:00 to 20:00</span>
          <span>🛂 Bring your passport</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={COVER_IMAGE}
          alt="Sell gold in Pattaya at Lomthong Pattaya gold buyer"
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
        <div className="en-summary">
          <p><strong>In short</strong></p>
          <ul>
            <li>We buy gold of any karat and any condition, including <strong>9K, 14K, 18K and 22K</strong> jewelry from abroad.</li>
            <li>All you need is your <strong>original passport</strong>. Tourists are welcome.</li>
            <li>Purity is measured on an <strong>XRF machine in front of you</strong>, free of charge.</li>
            <li>You get <strong>Thai baht in cash on the spot</strong>, or a transfer to a Thai bank account.</li>
          </ul>
        </div>

        <p>
          Many people who live in or visit Pattaya bring gold from home: a chain bought in Italy, a ring from
          the UK, a bracelet from Dubai. When the day comes to turn it into baht, the small gold shop down the
          street often says no. This page explains why, and how selling works at our two shops in Pattaya.
        </p>

        <h2>Why some Thai gold shops refuse foreign gold</h2>
        <p>
          Most Thai gold shops sell <strong>96.5% Thai gold</strong> and buy back the same kind. European and
          American jewelry is usually 18K, 14K or 9K, which those shops cannot resell, and without a testing
          machine they cannot tell the real purity. Refusing is simply the safe option for them.
        </p>
        <p>
          We test every piece with an XRF analyzer, so we can buy any karat and pay for the actual gold content.
        </p>

        <h2>What we buy</h2>
        <ul>
          <li>Gold jewelry from any country: 9K, 14K, 18K, 22K, Thai 96.5% and 24K</li>
          <li>Italian, European and Middle Eastern gold chains and bracelets</li>
          <li>Broken, bent or single-earring pieces, scrap gold and gold dust</li>
          <li>Gold bars</li>
          <li>Gold amulet frames</li>
          <li>Silver jewelry and silverware</li>
          <li>
            Luxury watches, valued as pre-owned watches (see{" "}
            <Link href="/services/watch-buying" hrefLang="th">watch buying</Link>, in Thai)
          </li>
        </ul>
        <p>
          Jewelry with gemstones is valued on its gold content; stones are assessed separately. Not sure if a
          piece is real gold or plated? The XRF test tells you in minutes, and it is free.
        </p>

        <h2>What to bring</h2>
        <ol>
          <li>Your <strong>original passport</strong>. Copies and phone photos are not accepted.</li>
          <li>The gold you want to sell. No need to clean or repair it first.</li>
          <li>Receipts or certificates if you have them. If not, you can still sell.</li>
          <li>Your Thai bank account number, if you prefer a transfer instead of cash.</li>
        </ol>
        <p>
          Thai shops are required to record who they buy second-hand goods from, so the same ID rule applies to
          Thai customers too. If you only have a pink card or a work permit, please call us before you come.
          If the gold belongs to your Thai spouse, the owner should come with their own Thai ID card.
        </p>

        <h2>How the price is calculated</h2>
        <p>
          Price = <strong>weight × purity measured on the XRF machine</strong>, based on the Thai Gold Traders
          Association price of the day. The gold price changes daily, so we cannot quote a fixed number in
          advance, but you will see the weight and purity on screen before we make an offer.
        </p>
        <div className="blog-table-wrap">
          <table className="blog-table">
            <caption>Common gold purities</caption>
            <thead>
              <tr>
                <th scope="col">Karat</th>
                <th scope="col">Gold content</th>
                <th scope="col">Typically found in</th>
              </tr>
            </thead>
            <tbody>
              {PURITY.map(([k, p, where]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{p}</td>
                  <td>{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          One thing that often surprises people: a necklace bought for 2,000 euros at a European jeweler may
          contain gold worth less than half of that. The difference is design, brand, taxes and the retail
          margin, and it does not come back when you sell, in any country. Gold itself is priced on the world
          market, so what you get in Pattaya is close to what you would get at home.
        </p>

        <h2>Getting paid</h2>
        <ul>
          <li><strong>Cash in Thai baht</strong>, paid right after you agree on the price</li>
          <li><strong>Bank transfer</strong> to a Thai bank account, with no transfer fee. A good choice for larger amounts.</li>
          <li>We do not pay in foreign currencies. Use a money exchange afterwards if you need dollars or euros.</li>
        </ul>
        <p>
          Questions about taking money out of Thailand are for your bank and Thai customs rules; please ask your
          bank directly.
        </p>

        <h2>What happens at the shop</h2>
        <ol>
          <li>Hand over your gold together with your passport.</li>
          <li>We weigh it on a digital scale in front of you.</li>
          <li>We test it on the XRF machine. You see the purity on screen, and nothing is cut or scratched.</li>
          <li>We make an offer and explain how we got the number.</li>
          <li>If you agree, you are paid immediately. If not, you take your gold back. The test costs nothing.</li>
        </ol>
        <p>
          If Thai is difficult for you, send us a message and photos on{" "}
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer">LINE {CONTACT.lineId}</a> before
          you come, or bring a Thai-speaking friend. It makes the visit faster for everyone.
        </p>

        <h2>Staying safe when selling gold in Pattaya</h2>
        <ol>
          <li>Do not accept offers from people who approach you on the street. Sell at a real shop you can find on Google Maps.</li>
          <li>Stay and watch while your gold is weighed and tested. Avoid shops that take it to a back room.</li>
          <li>For larger amounts, compare two shops. Testing is free; it only costs you time.</li>
          <li>Ask whether the price quoted is the final amount you will receive.</li>
        </ol>

        <h2>Our two shops in Pattaya</h2>
        <p>Both shops are open every day, including weekends and public holidays, from 10:00 to 20:00. No appointment needed.</p>
        <div className="en-branches">
          {BRANCHES.map((b) => (
            <div key={b.slug} className="en-branch">
              <h3>{b.nameEn}</h3>
              <p>{b.addressEn}</p>
              <p className="en-branch-thai" lang="th">{b.address}</p>
              <div className="blog-article-cta-actions" style={{ justifyContent: "flex-start" }}>
                <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Get directions
                </a>
              </div>
            </div>
          ))}
        </div>
        <p>
          The South Pattaya shop is closest for people staying in Jomtien, Pratumnak and South Pattaya. The
          Noen Plap Wan shop is closer to North Pattaya, Naklua and the Sukhumvit side. Show the Thai address
          to your taxi or motorbike driver.
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
        <h3>Find out what your gold is worth</h3>
        <p>Free XRF test in front of you · Cash in Thai baht on the spot · Open daily 10:00 to 20:00</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.phoneHref} className="btn btn-primary">
            📞 Call {CONTACT.phoneDisplay}
          </a>
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            💬 Send photos on LINE
          </a>
        </div>
      </div>
    </article>
  );
}
