/* ============================================
   หน้าภาษาอังกฤษเพิ่มเติม (/en/<slug>) สำหรับชาวต่างชาติในพัทยา
   ============================================
   ⚠️ ข้อเท็จจริงทั้งหมดแปลมาจากหน้าบริการภาษาไทย (data/services.js) ห้ามเพิ่มสิ่งที่ร้านไม่ได้ยืนยัน
   เช่น "พนักงานพูดอังกฤษได้" "จ่ายเป็นดอลลาร์" "เปิด 24 ชม."
   thPath = หน้าภาษาไทยที่เนื้อหาตรงกัน ใช้ทำ hreflang ทั้งสองฝั่ง (EN_FOR_TH ด้านล่าง)
   blocks ใช้รูปแบบเดียวกับบทความ (components/ContentBlocks.js) รองรับ **ตัวหนา** และ [ลิงก์](/path)
*/

export const EN_PAGES = [
  {
    slug: "gold-melting",
    thPath: "/services/gold-melting",
    title: "Gold Melting in Pattaya | Melt Old & Scrap Gold, XRF Tested",
    description:
      "Gold melting in Pattaya: melt broken, scrap and 9K-18K gold into one bar. Weighed before and after, XRF tested in front of you. Sell for cash or take it home.",
    h1: "Gold Melting in Pattaya: Weighed and XRF Tested in Front of You",
    breadcrumb: "Gold melting",
    keywords: ["gold melting Pattaya", "melt gold Pattaya", "scrap gold Pattaya", "gold smelting Pattaya", "melt old gold Thailand"],
    blocks: [
      {
        type: "summary",
        label: "In short",
        items: [
          "We **melt gold of any kind** at both Pattaya shops: old jewelry, broken pieces, 9K-18K, Italian gold, scrap and gold dust.",
          "Every step happens **in front of you**: weigh, melt, pour, weigh again, **XRF test**.",
          "After melting you choose: **sell to us for cash** in Thai baht, or **take the gold bar home**.",
          "Open daily until 20:00, no appointment needed. Bring your **original passport**.",
        ],
      },
      {
        type: "p",
        text: "Melting turns many small pieces into one solid piece, so the weight and the real gold content can be measured accurately in one go. It is the fairest way to value a mix of old jewelry, pieces with unknown karat, or gold without receipts: the price is based on the gold itself, not on how the pieces look.",
      },
      { type: "h2", text: "How gold melting works at our shop" },
      {
        type: "ol",
        items: [
          "**Sort and weigh.** Non-gold parts such as stones or steel springs in clasps are removed, then the gold is weighed in front of you.",
          "**Melt.** The gold goes into a heat-resistant crucible and melts into one mass. You can watch the whole time.",
          "**Pour.** The molten gold is poured into a mold and becomes a nugget or small bar.",
          "**Weigh again and XRF test.** The bar is weighed and its purity measured on the XRF machine. You see the numbers on screen.",
          "**Decide.** Sell it to us for cash or bank transfer, or take it home.",
        ],
      },
      { type: "quote", text: "Weighed before, weighed after, tested in front of you: you see every number used to price your gold." },
      { type: "h2", text: "What gold can be melted" },
      {
        type: "table",
        caption: "Gold we melt",
        head: ["Type of gold", "Melt?", "Notes"],
        rows: [
          ["Old, broken or bent jewelry", "Yes", "No receipt or certificate needed"],
          ["9K, 14K, 18K, Italian and foreign gold", "Yes", "Priced on the purity measured, not the stamp"],
          ["Scrap gold, gold dust, many small pieces", "Yes", "Melted together, tested once"],
          ["Gold amulet frames", "Yes", "The amulet is removed and returned to you first"],
          ["Jewelry with diamonds or gemstones", "Yes", "Stones are removed and returned, only the gold is melted"],
          ["Gold-plated or gold-filled items", "Not worth it", "Very little gold; we can XRF test it for free first"],
        ],
      },
      { type: "h2", text: "How the price is calculated" },
      {
        type: "p",
        text: "Price = **weight of the bar after melting × purity measured on the XRF machine**, based on the Thai Gold Traders Association price of the day. Pieces that are lower than their stamp, or several karats mixed together, are paid for their real gold content. See today's reference values on our [gold price page](/en/gold-price-today).",
      },
      { type: "h3", text: "Does gold lose weight when melted?" },
      {
        type: "p",
        text: "A little, yes. Dirt, solder used in joints and non-gold parts are burned off or removed. That loss is not gold, so the value does not drop with it. Weighing before and after in front of you shows the difference clearly.",
      },
      { type: "h2", text: "Melting vs. selling back to a Thai gold shop" },
      {
        type: "table",
        head: ["", "Melting with us", "Selling to a typical Thai gold shop"],
        rows: [
          ["Price based on", "Real gold content measured", "Thai jewelry buy-back price"],
          ["9K-18K and Italian gold", "Accepted", "Often refused"],
          ["Broken, no receipt", "Accepted, no condition deduction", "Extra deductions or refused"],
          ["Several types mixed", "Melted together, tested once", "Sold piece by piece"],
        ],
      },
      {
        type: "p",
        text: "Selling foreign gold is explained step by step on our [main English page](/en). Not sure if a piece is real? Get a [free XRF gold test](/en/xrf-gold-test) first.",
      },
      { type: "h2", text: "Which shop to visit" },
      {
        type: "ul",
        items: [
          "**South Pattaya**: 225/136 South Pattaya Road, open daily 10:30-20:00. Closest to Jomtien and Pratumnak.",
          "**Noen Plap Wan**: 13/228 Soi Noen Plap Wan, open daily 10:00-20:00. Closest to North Pattaya and Naklua.",
          "A lot of gold? Call 092-883-9799 or message us on LINE before you come.",
        ],
      },
    ],
    faq: [
      { q: "Do I need an appointment to melt gold?", a: "No. Come any day during opening hours. If you have a large amount or many types of gold, call 092-883-9799 or message us on LINE first." },
      { q: "Can I watch the melting?", a: "Yes. Weighing before, melting, weighing after and the XRF test all happen in front of you." },
      { q: "How long does it take?", a: "It depends on the amount and type of gold. A few pieces do not take long; large amounts or several types that need separate melting take longer." },
      { q: "Can I keep the gold bar instead of selling it?", a: "Yes. Tell us before melting starts that you want to take the bar home." },
      { q: "What do I need to bring?", a: "Your original passport and the gold. Receipts are not required." },
    ],
  },
  {
    slug: "sell-luxury-watch",
    thPath: "/services/watch-buying",
    title: "Sell Your Luxury Watch in Pattaya | Rolex, Omega, Cartier",
    description:
      "Sell a pre-owned luxury watch in Pattaya: Rolex, Omega, Cartier, Patek Philippe, AP, Hublot, Tag Heuer. With or without box and papers. Free quote, cash paid.",
    h1: "Sell Your Luxury Watch in Pattaya: Free Quote, Paid on the Spot",
    breadcrumb: "Sell a luxury watch",
    keywords: ["sell Rolex Pattaya", "sell watch Pattaya", "luxury watch buyer Pattaya", "sell Omega Pattaya", "sell watch Thailand cash"],
    blocks: [
      {
        type: "summary",
        label: "In short",
        items: [
          "We buy **pre-owned luxury watches** of many brands: Rolex, Omega, Cartier, Patek Philippe, Audemars Piguet, Hublot, Tag Heuer, Tudor, Longines.",
          "**With or without box and papers.** A full set helps the price, but it is not required.",
          "**Free quote** at the shop, or send photos on LINE first.",
          "**Gold-cased watches** can be valued as a watch or for their gold content, whichever pays more.",
        ],
      },
      { type: "h2", text: "What affects the price of a pre-owned watch" },
      {
        type: "table",
        head: ["Factor", "What it means for the price"],
        rows: [
          ["Brand and model", "Popular models that the market wants usually get better offers"],
          ["Case, crystal and bracelet condition", "Fewer marks and no heavy polishing means a better price"],
          ["Movement", "Running accurately with no faults gets a fuller price"],
          ["Box, papers and accessories", "A full set confirms origin and lifts the price, but we buy without them too"],
          ["Case material", "A gold case has its gold value as a floor"],
        ],
      },
      { type: "h2", text: "How selling a watch works" },
      {
        type: "ol",
        items: [
          "Send photos on LINE for a first quote, or bring the watch to the shop.",
          "We check the model, condition and movement in front of you.",
          "We make an offer based on the model and real condition. For gold cases we also test the gold on the XRF machine.",
          "If you agree, you are paid in cash or by bank transfer right away. Bring your original passport.",
        ],
      },
      { type: "h2", text: "Photos to send for a quick quote on LINE" },
      {
        type: "ul",
        items: [
          "The dial, straight on, with brand and model clearly visible",
          "The case back, and the side with the crown",
          "The bracelet or strap and the clasp, including any wear",
          "Box, papers or receipt, if you have them",
        ],
      },
      {
        type: "p",
        text: "A quote by message is a first estimate. The final price is confirmed after we see the watch in person.",
      },
      { type: "h2", text: "Gold watches: sold as a watch or for the gold?" },
      {
        type: "p",
        text: "If the case or bracelet is gold, we can value it two ways: as a watch, by model and condition, or by the weight and purity of the gold. For models with little market demand or a broken movement, the gold value is often higher. We show you both and you choose. Selling gold jewelry at the same visit? See [selling gold in Pattaya](/en).",
      },
    ],
    faq: [
      { q: "Can I sell a watch without the box or papers?", a: "Yes. We buy watches with or without box and papers. A full set helps the price." },
      { q: "Which brands do you buy?", a: "Many luxury brands, such as Rolex, Omega, Cartier, Patek Philippe, Audemars Piguet, Hublot, Tag Heuer, Tudor and Longines. Send photos on LINE to ask about others." },
      { q: "Do you buy watches that are not running?", a: "Yes. The price reflects the model and real condition. If the case is gold, it can also be valued for its gold." },
      { q: "Can I get a quote on LINE?", a: "Yes. Send photos of the dial, case back, bracelet and any papers. We reply with a first estimate; the final price is confirmed in person." },
      { q: "How am I paid?", a: "In Thai baht, cash on the spot or a transfer to a Thai bank account. Bring your original passport." },
    ],
  },
  {
    slug: "xrf-gold-test",
    thPath: "/services/gold-checking",
    title: "Free XRF Gold Test in Pattaya | Is My Gold Real? Know in Minutes",
    description:
      "Free XRF gold testing in Pattaya at both shops. Non-destructive, results in minutes, done in front of you. Check if gold is real or plated, and its exact karat.",
    h1: "Free XRF Gold Test in Pattaya: Real or Plated, Know in Minutes",
    breadcrumb: "Free XRF gold test",
    keywords: ["gold test Pattaya", "XRF gold test Pattaya", "is my gold real Pattaya", "gold purity test Thailand", "check gold karat Pattaya"],
    blocks: [
      {
        type: "summary",
        label: "In short",
        items: [
          "**Free gold purity testing** with an XRF machine at both Pattaya shops, every day, no appointment.",
          "**Non-destructive.** No scratching, no acid. Results in a few minutes.",
          "Done **in front of you**; you see the numbers on screen. **No obligation to sell.**",
          "Works for Thai gold, 9K-22K, Italian gold, unmarked old pieces, and to tell real gold from plated.",
        ],
      },
      {
        type: "p",
        text: "**XRF (X-ray fluorescence)** reads the metals in a piece by sending X-rays at the surface and analysing the signal that comes back. The screen shows the gold percentage and the other metals mixed in, such as silver and copper, without cutting or melting anything.",
      },
      { type: "h2", text: "When to test your gold" },
      {
        type: "ul",
        items: [
          "**Before selling**, so you know the offer matches the real gold content",
          "**Inherited or old gold** with worn stamps or no paperwork",
          "**Foreign karat gold** (9K, 14K, 18K, 22K, Italian) that differs from Thai 96.5% gold",
          "**If you suspect plating** or a fake",
          "**Before melting** several pieces together. See [gold melting](/en/gold-melting)",
        ],
      },
      { type: "h2", text: "How the test works" },
      {
        type: "ol",
        items: [
          "Bring your gold to either shop. No booking needed.",
          "We place the piece in the XRF machine on a gold area.",
          "In a few minutes the screen shows the gold percentage and other metals. You read it with us.",
          "We explain the result. If you want, we tell you today's price for the gold content. Selling is optional.",
        ],
      },
      { type: "h2", text: "XRF compared with other tests" },
      {
        type: "table",
        head: ["Method", "Damage", "What you learn"],
        rows: [
          ["XRF machine", "None", "Gold percentage and other metals, as numbers"],
          ["Acid / touchstone", "Small scratch", "An estimate that depends on the tester's skill"],
          ["Reading the stamp", "None", "Only what is stamped, which may not match the real gold"],
        ],
      },
      {
        type: "p",
        text: "Good to know: XRF measures the surface. For thick plating or pieces with a different metal inside, we may test several spots or suggest melting to measure the whole piece. Ready to sell after testing? Read [how selling gold works](/en), or check [today's gold price](/en/gold-price-today).",
      },
    ],
    faq: [
      { q: "Is the gold test really free?", a: "Yes, with no conditions. If you do not sell, you pay nothing." },
      { q: "Will the test damage my jewelry?", a: "No. The XRF machine does not scratch the piece or use acid." },
      { q: "How long does it take?", a: "A few minutes per piece; more pieces take longer." },
      { q: "Can you test silver or platinum?", a: "Yes. XRF reads many metals, so silver and platinum can be checked before selling too." },
    ],
  },
];

export function getEnPage(slug) {
  return EN_PAGES.find((p) => p.slug === slug);
}

/* หน้าไทย → หน้าอังกฤษที่ตรงกัน (สำหรับ hreflang ฝั่งไทย) */
export const EN_FOR_TH = {
  ...Object.fromEntries(EN_PAGES.map((p) => [p.thPath, `/en/${p.slug}`])),
  "/rakha-thong-wan-nee": "/en/gold-price-today",
};
