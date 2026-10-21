import Link from "next/link";
import NearestBranch from "@/components/NearestBranch";
import { BRANCHES } from "@/data/branches";
import { AREAS } from "@/data/areas";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/data/site";

/* ============================================
   ร้านหลอมทอง / รับซื้อทอง ใกล้ฉัน — หน้ารวม 2 สาขา สำหรับคำค้น "…ใกล้ฉัน"
   ============================================
   ที่มา: Search Console 90 วัน (ถึง 19 ต.ค. 2569) คำที่มี "ใกล้ฉัน" มีการแสดงผล 1,050 ครั้ง คลิก 30
   กลุ่มใหญ่: เงินแท้/เครื่องเงิน ~400 · หลอมทอง ~270 · นาฬิกา ~170 · ทองเค 18K ~70
   ⚠️ หน้าแรกติดคำ "หลอมทองใกล้ฉัน" อยู่แล้ว (อันดับ ~5) — หน้านี้เน้นเจตนา "หาสาขาที่ใกล้/เปิดอยู่ตอนนี้"
      และลิงก์ออกไปหน้าบริการด้วยข้อความ "…ใกล้ฉัน" ของแต่ละกลุ่ม ไม่ลอกเนื้อหาหน้าแรก
      ถ้า 15 พ.ย. เห็นหน้าแรกกับหน้านี้แย่งคำกันใน Search Console ให้ปรับ title หน้านี้
*/

const PATH = "/ran-lomthong-klai-chan";
const TITLE = "หลอมทอง ขายทอง ใกล้ฉัน พัทยา · ร้านรับซื้อทอง 2 สาขา เปิดทุกวัน";
const DESCRIPTION =
  "หลอมทอง ขายทอง ใกล้ฉันในพัทยา ร้านรับซื้อทอง เงินแท้ นาฬิกา 2 สาขา พัทยาใต้ · เนินพลับหวาน กดดูสาขาที่ใกล้คุณและเปิดอยู่ตอนนี้ ตรวจ XRF ฟรี";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "หลอมทอง ใกล้ฉัน",
    "ขายทอง ใกล้ฉัน",
    "ร้านหลอมทองใกล้ฉัน",
    "ร้านรับซื้อทองใกล้ฉัน",
    "รับหลอมทองใกล้ฉัน",
    "ร้านรับซื้อเงินแท้ใกล้ฉัน",
    "ร้านรับซื้อนาฬิกาใกล้ฉัน",
    "ร้านรับซื้อทองเคใกล้ฉัน",
    "ร้านทองใกล้ฉัน ปิดกี่โมง",
  ],
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: `${SITE_URL}${PATH}` },
};

/* คำค้นจริงแต่ละกลุ่ม → หน้าที่ตอบได้ดีที่สุด (ข้อความลิงก์ = คำที่คนพิมพ์) */
const SERVICES = [
  { href: "/services/gold-melting", label: "ร้านหลอมทองใกล้ฉัน", text: "หลอมทองเก่า ทองหัก เศษทอง ชั่งก่อน-หลังหลอมและตรวจ XRF ต่อหน้า ขายรับเงินสดหรือรับก้อนทองกลับ" },
  { href: "/services/gold-buying", label: "ร้านรับซื้อทองใกล้ฉัน", text: "ทองเก่า ทองหัก ทองขาด ไม่มีใบเสร็จก็ขายได้ คิดราคาตามเนื้อทองจริง" },
  { href: "/blog/ran-rub-sue-thong-k-pattaya-18k-14k-9k", label: "ร้านรับซื้อทองเค 18K ใกล้ฉัน", text: "ทอง 9K 14K 18K 22K และทองอิตาลี ที่ร้านทองรูปพรรณหลายร้านไม่รับ" },
  { href: "/services/silver-buying", label: "ร้านรับซื้อเงินแท้ใกล้ฉัน", text: "สร้อยเงิน แหวนเงิน เงิน 925 ขันเงิน เงินแท่ง เศษเงิน เครื่องเงินดำก็รับ" },
  { href: "/services/silver-buying", label: "ร้านหลอมเงินใกล้ฉัน", text: "รับหลอมเงิน เศษเงิน เครื่องเงินหลายชิ้นหลอมรวมเป็นก้อน ชั่งและตรวจเนื้อเงินต่อหน้า" },
  { href: "/services/watch-buying", label: "ร้านรับซื้อนาฬิกาใกล้ฉัน", text: "Rolex Omega Cartier แบรนด์เนมอื่น รวมถึง Casio G-Shock มีหรือไม่มีกล่องก็รับ ส่งรูปประเมินก่อนได้" },
  { href: "/services/gold-checking", label: "ร้านเช็คทองใกล้ฉัน", text: "ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ฟรี ไม่ทำลายชิ้นงาน รู้ผลในไม่กี่นาที" },
  { href: "/services/jewelry-buying", label: "ร้านรับซื้อเครื่องประดับใกล้ฉัน", text: "ทองคำขาว แพลตตินัม เพชร พลอย ตีราคาแยกตัวเรือนกับอัญมณี" },
  { href: "/services/khai-fak-thong", label: "ขายฝากทอง ไถ่ถอนตั๋วจำนำ", text: "ยังไม่อยากขายขาด ขายฝากได้ สอบถามวงเงินและเงื่อนไขทาง LINE" },
];

const FAQ = [
  {
    q: "ขายทองใกล้ฉัน ในพัทยา ร้านไหนรับซื้อ",
    a: "ร้านหลอมทองพัทยา (เฮงศิริ) รับซื้อทองทั้ง 2 สาขา สาขาพัทยาใต้ 225/136 ถ.พัทยาใต้ และสาขาเนินพลับหวาน 13/228 ซอยเนินพลับหวาน ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ต่อหน้า คิดราคาตามเนื้อทองจริง ไม่มีใบเสร็จก็ขายได้ รับเงินสดทันที",
  },
  {
    q: "หลอมทองใกล้ฉัน ทำที่ไหนได้",
    a: "หลอมทองได้ทั้ง 2 สาขาในพัทยา ชั่งก่อนและหลังหลอม ตรวจ XRF ต่อหน้า หลอมแล้วขายรับเงินสดหรือรับก้อนทองกลับก็ได้ ไม่ต้องจองคิว",
  },
  {
    q: "ร้านหลอมทองใกล้ฉัน เปิดกี่โมง ปิดกี่โมง",
    a: "เปิดทุกวัน สาขาเนินพลับหวาน 10:00-20:00 น. สาขาพัทยาใต้ จ.-ศ. 10:30-20:00 น. ส.-อา. 10:00-18:00 น. กดปุ่มด้านบนเพื่อดูว่าตอนนี้สาขาไหนเปิดอยู่และใกล้คุณที่สุด",
  },
  {
    q: "เปิดวันอาทิตย์และวันหยุดไหม",
    a: "เปิดทุกวัน รวมวันเสาร์ วันอาทิตย์ และวันหยุดนักขัตฤกษ์ ใช้เวลาเปิดปิดเดียวกับวันธรรมดา",
  },
  {
    q: "ต้องจองคิวก่อนไปร้านไหม",
    a: "ไม่ต้องจอง เดินเข้าร้านได้เลยในเวลาทำการ ถ้ามีทองจำนวนมาก โทรแจ้งก่อนที่ 092-883-9799",
  },
  {
    q: "สาขาไหนใกล้กว่า",
    a: "สาขาพัทยาใต้ใกล้จอมเทียน พระตำหนัก และพัทยาใต้ ส่วนสาขาเนินพลับหวานใกล้พัทยาเหนือ นาเกลือ และฝั่งถนนสุขุมวิท ดูตารางระยะทางจากแต่ละย่านในหน้านี้ได้",
  },
  {
    q: "ร้านรับซื้อเงินแท้ใกล้ฉัน มีไหม",
    a: "มี ทั้ง 2 สาขารับซื้อเงินแท้ สร้อยเงิน เงิน 925 ขันเงิน เงินแท่ง และเศษเงิน คิดราคาตามน้ำหนักและเปอร์เซ็นต์เนื้อเงินจริง เครื่องเงินดำหรือหมองก็รับ",
  },
  {
    q: "ไม่อยากเดินทางมาเปล่า ขอราคาก่อนได้ไหม",
    a: "ได้ ส่งรูปและน้ำหนักทอง เงิน หรือนาฬิกามาทาง LINE @hengsiri ร้านประเมินราคาเบื้องต้นให้ฟรี ราคาจริงยืนยันหลังตรวจที่ร้าน",
  },
];

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function RanLomthongKlaiChan() {
  const pageUrl = `${SITE_URL}${PATH}`;

  // ตารางระยะทางจากแต่ละย่าน → สาขาที่ใกล้กว่า (ระยะเส้นตรง)
  const areaRows = AREAS.map((a) => {
    const d = BRANCHES.map((b) => ({ b, km: distanceKm(a.lat, a.lng, b.lat, b.lng) })).sort((x, y) => x.km - y.km);
    return { a, nearest: d[0] };
  }).sort((x, y) => x.nearest.km - y.nearest.km);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "สาขาร้านหลอมทองพัทยา",
    itemListElement: BRANCHES.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/branch/${b.slug}`,
      item: { "@id": `${SITE_URL}/branch/${b.slug}#business` },
    })),
  };
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
      { "@type": "ListItem", position: 2, name: "ร้านหลอมทองใกล้ฉัน", item: pageUrl },
    ],
  };

  return (
    <article className="blog-article near-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <span>ร้านหลอมทองใกล้ฉัน</span>
      </nav>

      <header className="blog-article-header">
        <h1>หลอมทอง ขายทอง ใกล้ฉัน — หาร้านรับซื้อทองที่ใกล้คุณที่สุดในพัทยา</h1>
        <div className="blog-article-meta">
          <span>📍 2 สาขาในพัทยา</span>
          <span>🕐 เปิดทุกวันถึง 20:00</span>
          <span>🔬 ตรวจ XRF ฟรี</span>
        </div>
      </header>

      <div className="blog-article-content">
        <p>
          ร้านหลอมทองพัทยา (เฮงศิริ) มีหน้าร้านจริง 2 สาขาในพัทยา คือ<strong>สาขาพัทยาใต้</strong>และ
          <strong>สาขาเนินพลับหวาน</strong> ทั้ง 2 สาขารับหลอมทอง รับซื้อทอง (อยากขายทองใกล้บ้านก็มาได้ทั้งสองที่) เงินแท้ และนาฬิกาแบรนด์เนม
          ตรวจเปอร์เซ็นต์ด้วยเครื่อง XRF ต่อหน้าคุณ กดปุ่มด้านล่างเพื่อดูว่าสาขาไหนใกล้คุณที่สุดและตอนนี้เปิดอยู่ไหม
        </p>

        <NearestBranch branches={BRANCHES} />

        <h2>มาที่ร้านแล้วทำอะไรได้บ้าง</h2>
        <p>ทุกบริการทำได้ทั้ง 2 สาขา เลือกหัวข้อที่ตรงกับของที่คุณมี</p>
        <ul className="near-services">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link href={s.href}>{s.label}</Link>
              <span>{s.text}</span>
            </li>
          ))}
        </ul>

        <h2>ระยะทางจากย่านต่าง ๆ ไปสาขาที่ใกล้กว่า</h2>
        <p>
          ระยะด้านล่างเป็นระยะเส้นตรงจากใจกลางแต่ละย่าน ระยะขับรถจริงจะไกลกว่านี้ กดชื่อย่านเพื่อดูเส้นทางและคำแนะนำของย่านนั้น
        </p>
        <div className="blog-table-wrap">
          <table className="blog-table">
            <caption>สาขาที่ใกล้แต่ละย่านที่สุด</caption>
            <thead>
              <tr>
                <th scope="col">ย่าน</th>
                <th scope="col">สาขาที่ใกล้กว่า</th>
                <th scope="col">ระยะเส้นตรง</th>
              </tr>
            </thead>
            <tbody>
              {areaRows.map(({ a, nearest }) => (
                <tr key={a.slug}>
                  <td>
                    <Link href={`/area/${a.slug}`}>{a.name}</Link>
                  </td>
                  <td>
                    <Link href={`/branch/${nearest.b.slug}`}>{nearest.b.shortName}</Link>
                  </td>
                  <td>~{nearest.km.toFixed(1)} กม.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>ก่อนออกจากบ้าน เตรียม 4 อย่างนี้</h2>
        <ol>
          <li>
            <strong>บัตรประชาชนตัวจริงของผู้ขาย</strong> ชาวต่างชาติใช้พาสปอร์ต ไม่มีใบเสร็จก็ขายได้ ดู{" "}
            <Link href="/blog/khai-thong-tong-chai-ekasan-arai-pattaya">ขายทองต้องใช้เอกสารอะไร</Link>
          </li>
          <li>
            เช็ก <Link href="/rakha-thong-wan-nee">ราคาทองวันนี้</Link> และลองคำนวณราคาคร่าว ๆ ด้วยเครื่องคิดเลขในหน้านั้น
          </li>
          <li>
            ไม่อยากมาเปล่า ส่งรูปให้{" "}
            <Link href="/services/online-valuation">ประเมินราคาทาง LINE</Link> ก่อนได้ฟรี
          </li>
          <li>ทองหลายชิ้นปนกัน ไม่ต้องแยกหรือล้างมาก่อน ช่างคัดแยกและชั่งให้ดูต่อหน้า</li>
        </ol>

        <h2>คำถามที่พบบ่อย</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="blog-article-cta">
        <h3>ถามราคาก่อนเดินทางได้ทุกวัน</h3>
        <p>ส่งรูปทาง LINE {CONTACT.lineId} หรือโทร {CONTACT.phoneDisplay} · เปิดทุกวันถึง 20:00 น.</p>
        <div className="blog-article-cta-actions">
          <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            💬 ประเมินราคา / สอบถาม
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-outline">
            📞 โทร {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </article>
  );
}
