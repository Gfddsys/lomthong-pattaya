/* ============================================
   หน้าภาษาอังกฤษเพิ่มเติม (/en/<slug>) สำหรับชาวต่างชาติในพัทยา
   ============================================
   ⚠️ ข้อเท็จจริงทั้งหมดแปลมาจากหน้าบริการภาษาไทย (data/services.js) ห้ามเพิ่มสิ่งที่ร้านไม่ได้ยืนยัน
   เช่น "พนักงานพูดอังกฤษได้" "จ่ายเป็นดอลลาร์" "เปิด 24 ชม."
   thPath = หน้าภาษาไทยที่เนื้อหาตรงกัน ใช้ทำ hreflang ทั้งสองฝั่ง (EN_FOR_TH ด้านล่าง)
   thPath = null → ไม่มีหน้าไทยที่ตรงกันพอดี จึงไม่ประกาศ hreflang (ประกาศผิดคู่แย่กว่าไม่ประกาศ)
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
          "**South Pattaya**: 225/136 South Pattaya Road, open daily (Mon-Fri 10:30-20:00, Sat-Sun 10:00-18:00). Closest to Jomtien and Pratumnak.",
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
    title: "Sell Your Luxury Watch in Pattaya | Rolex, Omega, Cartier, All Brands",
    description:
      "Sell a pre-owned watch of any brand in Pattaya: Rolex, Omega, Cartier, Patek Philippe, Tag Heuer, Seiko, G-Shock, Garmin. Old, not running or no box is fine. Free quote, cash paid.",
    h1: "Sell Your Watch in Pattaya: Any Brand, Free Quote, Paid on the Spot",
    breadcrumb: "Sell a luxury watch",
    keywords: ["sell Rolex Pattaya", "sell watch Pattaya", "luxury watch buyer Pattaya", "sell Omega Pattaya", "sell watch Thailand cash"],
    blocks: [
      {
        type: "summary",
        label: "In short",
        items: [
          "We buy **pre-owned watches of any brand**: luxury names such as Rolex, Omega, Cartier, Patek Philippe, Audemars Piguet, Hublot and Tag Heuer, and everyday watches such as Seiko, Citizen, Casio G-Shock and Garmin.",
          "**Old, not running, or no box and papers?** We still buy. A full set helps the price, but it is not required.",
          "**Free quote** at the shop, or send photos on LINE first.",
          "**Gold-cased watches** can be valued as a watch or for their gold content, whichever pays more.",
          "Not ready to sell? **Sale with right of redemption** (khai fak). Living elsewhere in Thailand? **Sell by post.**",
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
      { type: "h2", text: "Not ready to sell? Sale with right of redemption" },
      {
        type: "p",
        text: "Need cash but want the watch back later? We offer a sale with right of redemption (khai fak, often called pawning) for any brand. The amount depends on the model and condition and is lower than an outright sale. The amount, the redemption sum and the due date are all in a written contract you see before signing. The watch is kept in a safe and is not sold or used during the contract. If it is not redeemed by the due date, it becomes the shop's under the contract. Ask about the amount and terms on LINE.",
      },
      { type: "h2", text: "Living elsewhere in Thailand? Sell by post" },
      {
        type: "p",
        text: "Agree the price on LINE first, then send the watch to our Pattaya shop with Thailand Post. There are two ways to be paid. With the deposit method, you send us a video of packing and posting plus the tracking number, we transfer 10% of the agreed price, and the other 90% once the watch arrives and is checked. With cash on delivery, you use Thailand Post's Wallet@Post app, linked to your Thai bank account, and we pay when we receive the parcel. Step by step guide in Thai: [ขายนาฬิกาทางไปรษณีย์](/khai-nalika-song-praisani).",
      },
    ],
    faq: [
      { q: "Can I sell a watch without the box or papers?", a: "Yes. We buy watches with or without box and papers. A full set helps the price." },
      { q: "Which brands do you buy?", a: "Any brand. Luxury watches such as Rolex, Omega, Cartier, Patek Philippe, Audemars Piguet, Hublot, Tag Heuer, Tudor and Longines, and everyday watches such as Seiko, Citizen, Casio G-Shock and Garmin. Send photos on LINE to ask." },
      { q: "Do you buy watches that are not running?", a: "Yes. The price reflects the model and real condition. If the case is gold, it can also be valued for its gold." },
      { q: "Can I get a quote on LINE?", a: "Yes. Send photos of the dial, case back, bracelet and any papers. We reply with a first estimate; the final price is confirmed in person." },
      { q: "How am I paid?", a: "In Thai baht, cash on the spot or a transfer to a Thai bank account. Bring your original passport." },
      { q: "Can I pawn my watch instead of selling it?", a: "Yes, as a sale with right of redemption (khai fak) under a written contract. The amount is lower than an outright sale and depends on the model and condition. Ask on LINE for the amount and terms." },
      { q: "I live outside Pattaya. Can I sell by post?", a: "Yes, from anywhere in Thailand. Agree the price on LINE, then post the watch with Thailand Post and choose a 10% deposit when you send it, or cash on delivery." },
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
  {
    "slug": "sell-k-gold",
    "thPath": "/blog/ran-rub-sue-thong-k-pattaya-18k-14k-9k",
    "title": "Sell 9K, 14K, 18K & Italian Gold in Pattaya | XRF Tested, Cash",
    "description": "Sell foreign karat gold in Pattaya: 9K, 10K, 14K, 18K, 22K and Italian gold that Thai shops often refuse. XRF tested, paid for real gold content in Thai baht.",
    "h1": "Sell 9K, 14K, 18K and Italian Gold in Pattaya",
    "breadcrumb": "Sell 9K-18K gold",
    "keywords": [
      "sell 18K gold Pattaya",
      "sell 14K gold Thailand",
      "sell 9K gold Pattaya",
      "sell Italian gold Pattaya",
      "do Thai gold shops buy 18K gold"
    ],
    "blocks": [
      {
        "type": "summary",
        "label": "In short",
        "items": [
          "Yes, you can sell **9K, 10K, 14K, 18K and 22K gold** in Pattaya. We buy it every day.",
          "Many Thai gold shops refuse foreign karat gold because they only trade **96.5% Thai gold**. We measure the real purity with an **XRF machine** instead.",
          "You are paid for the **gold content**: weight × purity measured in front of you, at the Thai Gold Traders Association price of the day.",
          "Bring your **original passport**. Payment in Thai baht, cash or bank transfer."
        ]
      },
      {
        "type": "h2",
        "text": "Why many Thai gold shops say no to 18K or 14K gold"
      },
      {
        "type": "p",
        "text": "Thailand's gold shops sell jewelry made of **96.5% gold**, and most buy back only the same kind, often only with their own receipt. A European 18K chain (75% gold) or an American 14K ring (58.5%) does not fit that system: they cannot resell it as it is, and without a testing machine they cannot be sure of the purity. Saying no is the safe option for them. It does not mean your gold has no value."
      },
      {
        "type": "p",
        "text": "We test every piece on an XRF analyzer, so the karat on the stamp does not matter. We pay for the gold that is actually there."
      },
      {
        "type": "h2",
        "text": "Karat stamps and how much gold they contain"
      },
      {
        "type": "table",
        "caption": "Common gold stamps",
        "head": [
          "Stamp",
          "Karat",
          "Gold content",
          "Often found in"
        ],
        "rows": [
          [
            "375",
            "9K",
            "37.5%",
            "UK and Australian jewelry"
          ],
          [
            "417",
            "10K",
            "41.7%",
            "American jewelry"
          ],
          [
            "585",
            "14K",
            "58.5%",
            "American and European jewelry"
          ],
          [
            "750",
            "18K",
            "75%",
            "Italian, European and Asian jewelry, watch cases"
          ],
          [
            "916",
            "22K",
            "91.6%",
            "Indian and Middle Eastern jewelry"
          ],
          [
            "965 / 96.5",
            "Thai gold",
            "96.5%",
            "Jewelry bought in Thailand"
          ],
          [
            "999 / 9999",
            "24K",
            "99.9-99.99%",
            "Gold bars and coins"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Stamps can be wrong, worn or missing. That is why the XRF reading, not the stamp, sets the price. Check the gold value per gram for each karat on our [gold price page](/en/gold-price-today)."
      },
      {
        "type": "h2",
        "text": "Gold-filled and gold-plated: what the stamps mean"
      },
      {
        "type": "p",
        "text": "Some stamps look like karat marks but mean the piece is **not solid gold**. Only a thin layer of gold covers another metal, so the gold value is very small:"
      },
      {
        "type": "ul",
        "items": [
          "**GF**, **1/20 14K GF**, **14K Gold Filled**: a gold layer bonded to brass or copper",
          "**GP**, **GEP**, **HGE**, **RGP**: gold-plated or electroplated",
          "**Vermeil**: gold plating over silver; the silver has value, the gold layer very little"
        ]
      },
      {
        "type": "p",
        "text": "Not sure what you have? The [XRF test](/en/xrf-gold-test) is free and shows the result in minutes."
      },
      {
        "type": "h2",
        "text": "How your foreign gold is priced"
      },
      {
        "type": "p",
        "text": "Price = **weight × (purity measured ÷ 96.5%) × the shop buying price per gram of 96.5% gold** that day. Example of the method: an 18K chain of 10 g measured at 75% counts as 10 × 75 ÷ 96.5 ≈ 7.8 g of Thai 96.5% gold. The day's price per gram changes several times a day, so the final number is calculated in front of you."
      },
      {
        "type": "h3",
        "text": "Why you get less than you paid"
      },
      {
        "type": "p",
        "text": "A piece bought at a jeweler includes design, brand, taxes and the retail margin. When you sell, in any country, only the gold content is paid. The gold itself is priced on the world market, so the gold value in Pattaya is close to what you would get at home."
      },
      {
        "type": "h2",
        "text": "Jewelry with stones, broken pieces and watches"
      },
      {
        "type": "ul",
        "items": [
          "**Stones:** diamonds and gemstones are assessed separately from the gold",
          "**Broken, bent, single earrings:** paid by gold content; condition does not lower the gold value",
          "**Many small pieces of mixed karat:** can be [melted into one bar](/en/gold-melting) and tested once",
          "**Gold watches:** valued as a watch or for the gold, whichever pays more. See [selling a luxury watch](/en/sell-luxury-watch)"
        ]
      }
    ],
    "faq": [
      {
        "q": "Do gold shops in Thailand buy 18K gold?",
        "a": "Many Thai gold shops only buy back 96.5% Thai gold. We buy 18K and other karats every day, testing the real purity on an XRF machine and paying for the gold content."
      },
      {
        "q": "Can I sell 14K or 10K American gold?",
        "a": "Yes. 14K (585) and 10K (417) are paid for their measured gold content, like any other karat."
      },
      {
        "q": "Is 14K gold filled worth anything?",
        "a": "Very little as gold. Gold-filled (GF) items have only a thin gold layer over another metal. We can test it for free so you know before deciding."
      },
      {
        "q": "Do I need the receipt or certificate?",
        "a": "No. Your original passport is required; receipts are not, because the price comes from the XRF test."
      },
      {
        "q": "Can my Thai partner sell my gold for me?",
        "a": "The seller must be the owner and show their own original ID. If the gold is yours, come with your passport."
      }
    ]
  },
  {
    "slug": "areas",
    "thPath": null,
    "title": "Gold Buyer Near Jomtien, Walking Street, Pratumnak & Naklua | Pattaya",
    "description": "Which of our 2 Pattaya gold shops is closest to you: Jomtien, Pratumnak, Walking Street, Beach Road, Terminal 21, Naklua, Thepprasit. Distances and tips.",
    "h1": "Selling Gold Near Jomtien, Walking Street, Pratumnak and Naklua",
    "breadcrumb": "Shops by area",
    "keywords": [
      "gold shop Jomtien",
      "sell gold Walking Street Pattaya",
      "gold buyer Naklua",
      "gold shop near Terminal 21 Pattaya",
      "gold shop Pratumnak"
    ],
    "blocks": [
      {
        "type": "summary",
        "label": "In short",
        "items": [
          "We have **2 shops in Pattaya**: **South Pattaya** (South Pattaya Road) and **Noen Plap Wan** (Soi Noen Plap Wan, off Sukhumvit side).",
          "**Jomtien, Pratumnak, Walking Street, Thepprasit:** South Pattaya shop is closer.",
          "**North Pattaya, Terminal 21, Naklua, Wongamat:** Noen Plap Wan shop is closer.",
          "Both open **every day**: Noen Plap Wan 10:00-20:00, South Pattaya Mon-Fri 10:30-20:00, Sat-Sun 10:00-18:00. No appointment."
        ]
      },
      {
        "type": "h2",
        "text": "Which shop is closer to where you are staying"
      },
      {
        "type": "table",
        "caption": "Straight-line distance from each area (km). Driving distance is longer.",
        "head": [
          "Area",
          "Closer shop",
          "South Pattaya",
          "Noen Plap Wan"
        ],
        "rows": [
          [
            "Thepprasit Road",
            "South Pattaya",
            "1.5",
            "3.3"
          ],
          [
            "Central Pattaya / Beach Road",
            "South Pattaya",
            "2.2",
            "2.6"
          ],
          [
            "Walking Street",
            "South Pattaya",
            "2.4",
            "3.7"
          ],
          [
            "Pratumnak Hill",
            "South Pattaya",
            "3.0",
            "4.9"
          ],
          [
            "Jomtien Beach",
            "South Pattaya",
            "4.2",
            "6.3"
          ],
          [
            "Na Jomtien",
            "South Pattaya",
            "10.0",
            "11.3"
          ],
          [
            "North Pattaya / Terminal 21",
            "Noen Plap Wan",
            "3.6",
            "2.9"
          ],
          [
            "Naklua / Wongamat",
            "Noen Plap Wan",
            "4.8",
            "3.9"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "South Pattaya shop"
      },
      {
        "type": "p",
        "text": "**225/136 South Pattaya Road (Pattaya Tai), Nong Prue.** Open daily (Mon-Fri 10:30-20:00, Sat-Sun 10:00-18:00). The easiest shop for people staying in Jomtien, Pratumnak, around Walking Street and along Thepprasit Road. Thai address for your driver: 225/136 ถ.พัทยาใต้ ต.หนองปรือ"
      },
      {
        "type": "h2",
        "text": "Noen Plap Wan shop"
      },
      {
        "type": "p",
        "text": "**13/228 Soi Noen Plap Wan, Pattaya City.** Open daily 10:00-20:00. The easiest shop from North Pattaya, Terminal 21, the bus station area, Naklua and Wongamat. Thai address for your driver: 13/228 ซอยเนินพลับหวาน เมืองพัทยา"
      },
      {
        "type": "h2",
        "text": "Getting there"
      },
      {
        "type": "ul",
        "items": [
          "**Taxi or ride-hailing app:** show the Thai address above, or open directions from our [main English page](/en)",
          "**Motorbike taxi:** fine for short trips; keep your gold in a closed bag",
          "**Large amounts:** call 092-883-9799 before you come and consider a bank transfer instead of carrying cash back"
        ]
      },
      {
        "type": "h2",
        "text": "Before you leave your hotel"
      },
      {
        "type": "ol",
        "items": [
          "Bring your **original passport**. Copies are not accepted.",
          "Check [today's gold price per gram](/en/gold-price-today) to know roughly what to expect.",
          "Not sure the trip is worth it? Send photos and the weight on LINE for a free estimate first.",
          "Read the [questions foreigners ask most](/en/faq)."
        ]
      }
    ],
    "faq": [
      {
        "q": "Which gold shop is closest to Jomtien?",
        "a": "Our South Pattaya shop on South Pattaya Road, about 4 km in a straight line from Jomtien Beach. Open daily (Mon-Fri 10:30-20:00, Sat-Sun 10:00-18:00)."
      },
      {
        "q": "Is there a gold buyer near Walking Street?",
        "a": "Our South Pattaya shop is about 2.4 km from Walking Street in a straight line, open daily until 20:00."
      },
      {
        "q": "Which shop is closer to Terminal 21 and Naklua?",
        "a": "The Noen Plap Wan shop on Soi Noen Plap Wan, open daily 10:00-20:00."
      },
      {
        "q": "Do I need an appointment?",
        "a": "No. Walk in any day during opening hours. For large amounts, call 092-883-9799 first."
      }
    ]
  },
  {
    "slug": "faq",
    "thPath": null,
    "title": "Selling Gold in Pattaya as a Foreigner: Questions & Answers",
    "description": "Answers for foreigners selling gold in Pattaya: passport, tourists, foreign karat gold, how the price is set, cash or transfer, XRF testing, safety.",
    "h1": "Selling Gold in Pattaya as a Foreigner: Your Questions Answered",
    "breadcrumb": "Questions & answers",
    "keywords": [
      "can foreigners sell gold in Thailand",
      "sell gold Pattaya passport",
      "sell gold Thailand tourist",
      "is it safe to sell gold in Pattaya",
      "gold price Pattaya how calculated"
    ],
    "blocks": [
      {
        "type": "summary",
        "label": "The short answers",
        "items": [
          "**Foreigners and tourists can sell gold** in Thailand. Bring your original passport.",
          "**Any karat is accepted** here, including 9K-22K from abroad, broken pieces and scrap.",
          "**Price = weight × XRF-measured purity** at the Thai Gold Traders Association price of the day.",
          "**Paid in Thai baht**, cash on the spot or transfer to a Thai bank account."
        ]
      },
      {
        "type": "p",
        "text": "These are the questions foreign customers ask us most often at the counter and on LINE. For the full step-by-step guide, see [selling gold in Pattaya](/en)."
      },
      {
        "type": "h2",
        "text": "Guides by topic"
      },
      {
        "type": "ul",
        "items": [
          "[Selling 9K, 14K, 18K and Italian gold](/en/sell-k-gold)",
          "[Gold price today, per gram by karat](/en/gold-price-today)",
          "[Free XRF gold test](/en/xrf-gold-test)",
          "[Gold melting for scrap and broken gold](/en/gold-melting)",
          "[Selling a luxury watch](/en/sell-luxury-watch)",
          "[Which shop is closest to you](/en/areas)"
        ]
      }
    ],
    "faq": [
      {
        "q": "Can foreigners sell gold in Thailand?",
        "a": "Yes. Bring your original passport. Tourists can sell too; you do not need a long-stay visa."
      },
      {
        "q": "Why do you need my passport?",
        "a": "Thai shops must record who they buy second-hand goods from. The same rule applies to Thai customers with their ID card. Copies and phone photos are not accepted."
      },
      {
        "q": "I only have a pink card or work permit. Can I sell?",
        "a": "Please call us at 092-883-9799 before you come so we can confirm."
      },
      {
        "q": "Can I sell gold that belongs to my Thai partner?",
        "a": "The owner should come and show their own original Thai ID card."
      },
      {
        "q": "Do you buy gold bought abroad without a receipt?",
        "a": "Yes. Receipts are not needed; the price comes from the XRF test of the gold itself."
      },
      {
        "q": "How is the price calculated?",
        "a": "Weight multiplied by the purity measured on the XRF machine, based on the Thai Gold Traders Association price of the day. You see the weight and purity before we make an offer."
      },
      {
        "q": "Can you tell me the price over the phone?",
        "a": "Send photos and the weight on LINE for a free estimate. The final price is confirmed after weighing and testing at the shop, at the price of that moment."
      },
      {
        "q": "Why is the offer lower than what I paid?",
        "a": "Retail prices include design, brand, taxes and the shop's margin. When selling, in any country, only the gold content is paid."
      },
      {
        "q": "Do you pay in US dollars or euros?",
        "a": "No. Payment is in Thai baht, cash or transfer to a Thai bank account. Use a money exchange afterwards if you need other currencies."
      },
      {
        "q": "Is the XRF test free if I do not sell?",
        "a": "Yes. If you do not like the offer, you take your gold back and pay nothing."
      },
      {
        "q": "Does the test damage my jewelry?",
        "a": "No. XRF does not scratch the piece or use acid."
      },
      {
        "q": "Can I take the money out of Thailand?",
        "a": "Rules on carrying or transferring money abroad are set by Thai customs and your bank. Please ask your bank directly."
      },
      {
        "q": "Is it safe to sell gold in Pattaya?",
        "a": "Sell at a real shop you can find on Google Maps, stay while your gold is weighed and tested, and ignore street buyers. For large amounts, ask for a bank transfer."
      },
      {
        "q": "Are you open on Sundays and holidays?",
        "a": "Yes, every day. Noen Plap Wan 10:00-20:00, South Pattaya Mon-Fri 10:30-20:00, Sat-Sun 10:00-18:00."
      }
    ]
  },
];

export function getEnPage(slug) {
  return EN_PAGES.find((p) => p.slug === slug);
}

/* หน้าไทย → หน้าอังกฤษที่ตรงกัน (สำหรับ hreflang ฝั่งไทย) */
export const EN_FOR_TH = {
  ...Object.fromEntries(EN_PAGES.filter((p) => p.thPath).map((p) => [p.thPath, `/en/${p.slug}`])),
  "/rakha-thong-wan-nee": "/en/gold-price-today",
};
