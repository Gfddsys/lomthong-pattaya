import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";

const COVER_IMAGE = getUploadedImage("blog-khai-thong-thi-nai-rakha-sung-pattaya", "/images/blog-lomthong.png");

export const metadata = {
  title: "ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา? เทียบให้เห็นชัด",
  description:
    "ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา? เปรียบเทียบขายคืนร้านทองรูปพรรณ vs หลอมทอง พร้อมเช็กลิสต์เลือกร้านรับซื้อทองที่ไม่กดราคา ให้ได้ราคาสูงในพัทยา ชลบุรี",
  keywords: [
    "ขายทองที่ไหนให้ราคาสูง",
    "รับซื้อทอง ราคาสูง พัทยา",
    "ร้านรับซื้อทอง ไม่กดราคา",
    "ขายทอง พัทยา",
    "ร้านรับซื้อทอง พัทยา",
  ],
  openGraph: {
    title: "ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา?",
    description:
      "เทียบขายคืนร้านทอง vs หลอมทอง + เช็กลิสต์เลือกร้านให้ได้ราคาสูง ไม่กดราคา",
    type: "article",
  },
  alternates: {
    canonical: "/blog/khai-thong-thi-nai-rakha-sung-pattaya",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา? เทียบให้เห็นชัด",
  author: { "@type": "Organization", name: "หลอมทองพัทยา" },
  publisher: { "@type": "Organization", name: "หลอมทองพัทยา" },
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  description: "เปรียบเทียบขายทองที่ไหนได้ราคาสูงสุดในพัทยา + เช็กลิสต์เลือกร้าน",
  image: COVER_IMAGE,
  inLanguage: "th-TH",
};

export default function ArticleKhaiThongRakhaSung() {
  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/blog">บทความ</Link>
        <span>/</span>
        <span>ขายทองที่ไหนให้ราคาสูง</span>
      </nav>

      <header className="blog-article-header">
        <h1>ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา? เทียบให้เห็นชัด</h1>
        <div className="blog-article-meta">
          <span>📅 12 กรกฎาคม 2569</span>
          <span>⏱️ อ่าน 5 นาที</span>
          <span>✍️ หลอมทองพัทยา</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={COVER_IMAGE}
          alt="ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา"
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
        <p>
          จะขายทองทั้งที ใครๆ ก็อยากได้<strong>ราคาสูงที่สุด</strong> แต่ขายที่ไหนถึงจะคุ้ม?
          บทความนี้เปรียบเทียบให้เห็นชัด พร้อมเช็กลิสต์เลือกร้านรับซื้อทองในพัทยาที่<strong>ไม่กดราคา</strong>
        </p>

        <h2>ปัจจัยที่ทำให้ "ได้ราคาสูง"</h2>
        <ul>
          <li><strong>ไม่หักค่ากำเหน็จ</strong> — คิดราคาจากเนื้อทองจริง ไม่ใช่ราคาขายคืนรูปพรรณ</li>
          <li><strong>ตรวจด้วยเครื่อง XRF</strong> — วัดเปอร์เซ็นต์ทองแม่นยำ ได้ราคาตามจริง</li>
          <li><strong>อ้างอิงราคาสมาคมค้าทองคำ</strong> — โปร่งใส ตรวจสอบได้</li>
          <li><strong>ไม่กดราคา</strong> — ร้านที่ให้ราคาต่ำกว่าสมาคมมากผิดปกติ ควรเลี่ยง</li>
        </ul>

        <h2>ขายคืนร้านทองรูปพรรณ vs หลอมทอง</h2>
        <p>
          <strong>ขายคืนร้านทองรูปพรรณ:</strong> สะดวก แต่มักโดนหักค่ากำเหน็จและค่าเสื่อม
          ทำให้ได้ราคาต่ำกว่าเนื้อทองจริง โดยเฉพาะทองเก่า ทองหัก หรือทองที่ไม่มีใบเสร็จ
        </p>
        <p>
          <strong>หลอมทอง / ร้านรับซื้อที่คิดตามเนื้อทอง:</strong> คิดราคาจากเปอร์เซ็นต์ทองบริสุทธิ์จริง
          ไม่หักกำเหน็จ ทำให้ได้ราคา<strong>ใกล้เคียงทองคำแท่ง 99.99%</strong> มากที่สุด
          จึงมักได้ราคาสูงกว่าการขายคืนทั่วไป
        </p>

        <h2>เช็กลิสต์เลือกร้านให้ได้ราคาสูง</h2>
        <ul>
          <li>มีเครื่อง XRF ตรวจเปอร์เซ็นต์ทองต่อหน้า ✅</li>
          <li>ชั่งน้ำหนักบนตาชั่งดิจิทัลให้เห็นชัด ✅</li>
          <li>อ้างอิงราคาสมาคมค้าทองคำวันนั้น ✅</li>
          <li>มีหน้าร้านชัดเจน มีรีวิวจริง ✅</li>
          <li>บอกราคาตรงไปตรงมา ไม่มีค่าใช้จ่ายแฝง ✅</li>
        </ul>

        <h2>ทำไมหลอมทองพัทยาให้ราคาสูง</h2>
        <p>
          <strong>หลอมทองพัทยา</strong> คิดราคาตามเปอร์เซ็นต์เนื้อทองจริงด้วยเครื่อง XRF
          ไม่หักค่ากำเหน็จ อ้างอิงราคาสมาคมค้าทองคำ จ่ายเงินสดทันที มีหน้าร้านจริง
          และรับซื้อทองทุกชนิด — ทองเก่า ทองหัก ทองเค ทองอิตาลี เศษทอง แม้ไม่มีใบเสร็จ
        </p>
        <p>
          อยากรู้ราคาก่อนไปขาย? อ่าน
          <Link href="/blog/wi-thi-kamnuan-rakha-khai-thong-kao"> วิธีคำนวณราคาขายทองเก่า</Link>
          {" "}หรือส่งรูปทองมา<Link href="/services/online-valuation">ประเมินราคาออนไลน์ฟรี</Link>ได้เลย
        </p>
      </div>

      <div className="blog-article-cta">
        <h3>อยากได้ราคาสูงที่สุดสำหรับทองของคุณ?</h3>
        <p>
          <strong>หลอมทองพัทยา</strong> ให้ราคาสูง ไม่กดราคา ตรวจต่อหน้า จ่ายเงินสดทันที
          บริการทั่วพัทยา ชลบุรี บางละมุง
        </p>
        <div className="blog-article-cta-actions">
          <Link href="/services/gold-buying" className="btn btn-primary">
            ดูบริการรับซื้อทอง
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            ติดต่อประเมินราคาฟรี
          </Link>
        </div>
      </div>
    </article>
  );
}
