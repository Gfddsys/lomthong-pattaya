import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";

const COVER_IMAGE = getUploadedImage("blog-khai-thong-mai-mee-bai-set", "/images/blog-check-gold.png");

export const metadata = {
  title: "ขายทองไม่มีใบเสร็จ ขายได้ไหม? ต้องใช้เอกสารอะไรบ้าง",
  description:
    "ขายทองไม่มีใบเสร็จ ขายได้ไหม? คำตอบคือขายได้! อธิบายว่าทำไมร้านรับซื้อทองได้แม้ไม่มีใบเสร็จ ใช้แค่บัตรประชาชน พร้อมวิธีขายทองเก่าให้ได้ราคาสูงในพัทยา ชลบุรี",
  keywords: [
    "ขายทองไม่มีใบเสร็จ",
    "ขายทองไม่มีใบเสร็จ ได้ไหม",
    "รับซื้อทองไม่มีใบเสร็จ พัทยา",
    "ขายทองเก่า พัทยา",
    "รับซื้อทองเก่า",
  ],
  openGraph: {
    title: "ขายทองไม่มีใบเสร็จ ขายได้ไหม? ต้องใช้อะไรบ้าง",
    description:
      "ขายทองไม่มีใบเสร็จ ขายได้! ใช้แค่บัตรประชาชน เพราะร้านตรวจเนื้อทองด้วยเครื่อง XRF ไม่ได้ดูที่ใบเสร็จ",
    type: "article",
  },
  alternates: {
    canonical: "/blog/khai-thong-mai-mee-bai-set",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ขายทองไม่มีใบเสร็จ ขายได้ไหม? ต้องใช้เอกสารอะไรบ้าง",
  author: { "@type": "Organization", name: "หลอมทองพัทยา" },
  publisher: { "@type": "Organization", name: "หลอมทองพัทยา" },
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  description:
    "ขายทองไม่มีใบเสร็จ ขายได้ไหม? คำตอบคือขายได้ ใช้แค่บัตรประชาชน เพราะร้านตรวจเนื้อทองด้วยเครื่อง XRF",
  image: COVER_IMAGE,
  inLanguage: "th-TH",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ขายทองไม่มีใบเสร็จ ขายได้ไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ขายได้ครับ ไม่จำเป็นต้องมีใบเสร็จหรือใบรับประกัน เพราะร้านรับซื้อทองตรวจเปอร์เซ็นต์เนื้อทองด้วยเครื่อง XRF ต่อหน้าลูกค้า แล้วคิดราคาจากเนื้อทองจริง โดยทั่วไปใช้เพียงบัตรประชาชน",
      },
    },
    {
      "@type": "Question",
      name: "ขายทองไม่มีใบเสร็จ ราคาถูกกว่าไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ไม่ถูกกว่าครับ เพราะราคาคิดจากน้ำหนักและเปอร์เซ็นต์เนื้อทองจริง ไม่ได้ขึ้นกับว่ามีใบเสร็จหรือไม่ ทองที่ไม่มีใบเสร็จจึงได้ราคาเท่าทองที่มีใบเสร็จในน้ำหนักและเปอร์เซ็นต์เดียวกัน",
      },
    },
  ],
};

export default function ArticleKhaiThongMaiMeeBaiSet() {
  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/blog">บทความ</Link>
        <span>/</span>
        <span>ขายทองไม่มีใบเสร็จ ได้ไหม</span>
      </nav>

      <header className="blog-article-header">
        <h1>ขายทองไม่มีใบเสร็จ ขายได้ไหม? ต้องใช้เอกสารอะไรบ้าง</h1>
        <div className="blog-article-meta">
          <span>📅 12 กรกฎาคม 2569</span>
          <span>⏱️ อ่าน 4 นาที</span>
          <span>✍️ หลอมทองพัทยา</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={COVER_IMAGE}
          alt="ขายทองไม่มีใบเสร็จ ขายได้ไหม รับซื้อทองเก่าพัทยา"
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
        <p>
          หลายคนมี<strong>ทองเก่า</strong>ที่อยากขาย แต่ลังเลเพราะ<strong>ทำใบเสร็จหาย</strong>
          หรือได้ทองมาโดยไม่มีใบรับประกัน เลยสงสัยว่า
          <strong> "ขายทองไม่มีใบเสร็จ ขายได้ไหม?"</strong> บทความนี้มีคำตอบชัดๆ ให้ครับ
        </p>

        <h2>ขายทองไม่มีใบเสร็จ — ขายได้แน่นอน</h2>
        <p>
          คำตอบสั้นๆ คือ <strong>ขายได้ครับ</strong> ไม่จำเป็นต้องมีใบเสร็จหรือใบรับประกันใดๆ
          ร้านรับซื้อทองและร้านหลอมทองที่ได้มาตรฐานรับซื้อทองโดยดูจาก<strong>เนื้อทองจริง</strong>
          ไม่ได้ดูจากใบเสร็จ
        </p>

        <h2>ทำไมร้านรับซื้อได้ แม้ไม่มีใบเสร็จ?</h2>
        <p>
          เพราะร้านใช้<strong>เครื่องตรวจทอง XRF</strong> ยิงตรวจหาเปอร์เซ็นต์ทองที่แท้จริง
          และชั่งน้ำหนักต่อหน้าคุณ แล้วคำนวณราคาจาก<strong>น้ำหนัก × เปอร์เซ็นต์เนื้อทอง</strong>
          ตามราคาสมาคมค้าทองคำ ใบเสร็จจึงไม่มีผลกับราคา — สิ่งที่กำหนดราคาคือเนื้อทองล้วนๆ
        </p>

        <h2>ต้องใช้เอกสารอะไรบ้าง?</h2>
        <p>โดยทั่วไปใช้เพียง:</p>
        <ul>
          <li><strong>บัตรประชาชน</strong> (เพื่อบันทึกการซื้อขายตามระเบียบ)</li>
          <li>ตัวทองที่จะขาย</li>
        </ul>
        <p>
          หากมีใบรับประกันหรือใบเสร็จก็นำมาด้วยได้เพื่อความสะดวก แต่ไม่มีก็ขายได้ตามปกติ
        </p>

        <h2>ทองแบบไหนที่ขายได้ แม้ไม่มีใบเสร็จ?</h2>
        <ul>
          <li>ทองเก่า ทองรูปพรรณที่ไม่ได้ใส่แล้ว</li>
          <li>ทองหัก ทองขาด ทองชำรุด</li>
          <li>ทองมรดกที่ตกทอดมาโดยไม่มีเอกสาร</li>
          <li>ทองเค ทองอิตาลี เศษทอง กรอบพระทองคำ</li>
        </ul>

        <h2>เคล็ดลับ ขายทองเก่าให้ได้ราคาสูง</h2>
        <ul>
          <li>เลือกร้านที่มี<strong>เครื่อง XRF</strong> ตรวจต่อหน้า โปร่งใส</li>
          <li>เทียบราคากับ<strong>ราคาสมาคมค้าทองคำ</strong>วันนั้น</li>
          <li>เลือกร้านที่<strong>ไม่หักค่ากำเหน็จ</strong> (คิดตามเนื้อทองจริง จะได้ราคาสูงกว่า)</li>
        </ul>

        <blockquote>
          "ทองไม่มีใบเสร็จ ไม่ได้แปลว่าขายได้ราคาถูกกว่า — เพราะราคาขึ้นกับเนื้อทองจริง
          ไม่ใช่กระดาษใบเสร็จ"
        </blockquote>
      </div>

      <div className="blog-article-cta">
        <h3>มีทองเก่าไม่มีใบเสร็จ อยากขาย?</h3>
        <p>
          <strong>หลอมทองพัทยา</strong> รับซื้อทองเก่า ทองหัก ทองชำรุด แม้ไม่มีใบเสร็จ
          ตรวจเปอร์เซ็นต์ด้วยเครื่อง XRF ต่อหน้า ให้ราคาสูง จ่ายเงินสดทันที
        </p>
        <div className="blog-article-cta-actions">
          <Link href="/services/gold-buying" className="btn btn-primary">
            ดูบริการรับซื้อทองเก่า
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            ติดต่อประเมินราคาฟรี
          </Link>
        </div>
      </div>
    </article>
  );
}
