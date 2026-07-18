import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";

const COVER_IMAGE = getUploadedImage("blog-thong-khat-thong-hak-rap-sue-mai", "/images/blog-check-gold.png");

export const metadata = {
  title: "ทองขาด ทองหัก บิ่น ชำรุด รับซื้อไหม? ได้ราคาเท่าไหร่",
  description:
    "ทองขาด ทองหัก บิ่น ชำรุด รับซื้อไหม? คำตอบคือรับซื้อ และได้ราคาเท่าทองสภาพดีในน้ำหนักเท่ากัน เพราะคิดราคาตามเนื้อทองจริง รับซื้อทองหักในพัทยา ชลบุรี",
  keywords: [
    "ทองขาด รับซื้อไหม",
    "ทองหัก รับซื้อไหม",
    "รับซื้อทองหัก พัทยา",
    "รับซื้อทองชำรุด",
    "ขายทองหัก ได้ราคาเท่าไหร่",
  ],
  openGraph: {
    title: "ทองขาด ทองหัก รับซื้อไหม? ได้ราคาเท่าไหร่",
    description:
      "ทองหัก ขาด บิ่น ชำรุด รับซื้อได้ และได้ราคาเท่าทองสภาพดี เพราะคิดตามเนื้อทองจริง",
    type: "article",
  },
  alternates: {
    canonical: "/blog/thong-khat-thong-hak-rap-sue-mai",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ทองขาด ทองหัก บิ่น ชำรุด รับซื้อไหม? ได้ราคาเท่าไหร่",
  author: { "@type": "Organization", name: "หลอมทองพัทยา" },
  publisher: { "@type": "Organization", name: "หลอมทองพัทยา" },
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  description: "ทองขาด ทองหัก บิ่น ชำรุด รับซื้อได้ ได้ราคาเท่าทองสภาพดี",
  image: COVER_IMAGE,
  inLanguage: "th-TH",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ทองหัก ทองขาด รับซื้อไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "รับซื้อครับ ทองหัก ขาด บิ่น หรือชำรุด รับซื้อได้ทุกสภาพ เพราะคิดราคาจากเปอร์เซ็นต์เนื้อทองจริง ไม่ได้ดูที่สภาพชิ้นงาน",
      },
    },
    {
      "@type": "Question",
      name: "ทองหักได้ราคาน้อยกว่าทองสภาพดีไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ไม่น้อยกว่าครับ ทองหักได้ราคาเท่าทองสภาพดีในน้ำหนักและเปอร์เซ็นต์เดียวกัน เพราะราคาคิดจากเนื้อทอง ไม่ใช่สภาพชิ้นงาน",
      },
    },
  ],
};

export default function ArticleThongKhatThongHak() {
  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/blog">บทความ</Link>
        <span>/</span>
        <span>ทองขาด ทองหัก รับซื้อไหม</span>
      </nav>

      <header className="blog-article-header">
        <h1>ทองขาด ทองหัก บิ่น ชำรุด รับซื้อไหม? ได้ราคาเท่าไหร่</h1>
        <div className="blog-article-meta">
          <span>📅 12 กรกฎาคม 2569</span>
          <span>⏱️ อ่าน 4 นาที</span>
          <span>✍️ หลอมทองพัทยา</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={COVER_IMAGE}
          alt="ทองขาด ทองหัก รับซื้อไหม รับซื้อทองหักพัทยา"
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
        <p>
          มีสร้อยทอง<strong>ขาด</strong> แหวน<strong>บิ่น</strong> หรือทอง<strong>หัก</strong>เก็บไว้ในลิ้นชัก
          แล้วสงสัยว่า <strong>"ทองหักแบบนี้ยังขายได้ไหม? จะโดนกดราคาหรือเปล่า?"</strong> มาดูคำตอบกันครับ
        </p>

        <h2>ทองขาด ทองหัก — รับซื้อได้แน่นอน</h2>
        <p>
          ทองที่<strong>หัก ขาด บิ่น งอ ชำรุด หรือหมอง</strong> รับซื้อได้ทุกสภาพครับ
          สภาพภายนอกไม่มีผลกับการรับซื้อ เพราะสิ่งที่กำหนดราคาคือ<strong>เนื้อทอง</strong>ข้างในล้วนๆ
        </p>

        <h2>ทำไมทองหัก ได้ราคาเท่าทองสภาพดี?</h2>
        <p>
          ร้านรับซื้อทองคิดราคาจาก <strong>น้ำหนัก × เปอร์เซ็นต์เนื้อทอง</strong>
          ไม่ได้คิดจากความสวยหรือสภาพของชิ้นงาน ดังนั้นสร้อยทองที่ขาดครึ่งกับสร้อยทองสภาพดี
          ถ้าน้ำหนักและเปอร์เซ็นต์ทองเท่ากัน ก็ได้ราคา<strong>เท่ากัน</strong>
        </p>

        <h2>ทองแบบไหนบ้างที่รับซื้อ?</h2>
        <ul>
          <li>สร้อย แหวน กำไล ที่หัก ขาด หรือบิ่น</li>
          <li>ทองชำรุด ทองงอ ทองบุบ</li>
          <li>ทองหมอง ทองดำคล้ำ (ล้างออกได้ ไม่กระทบราคา)</li>
          <li>เศษทอง ทองที่แตกเป็นชิ้นเล็กชิ้นน้อย</li>
        </ul>

        <h2>ก่อนนำไปขาย ควรทำอะไร?</h2>
        <ul>
          <li><strong>ไม่ต้องซ่อม</strong> — เพราะร้านคิดตามเนื้อทองอยู่แล้ว การซ่อมมีแต่เสียเงินเพิ่ม</li>
          <li><strong>อย่าทิ้งเศษ</strong> — แม้ชิ้นเล็กๆ ก็มีมูลค่า เก็บมาให้ครบ</li>
          <li>เลือกร้านที่มี<strong>เครื่อง XRF</strong> ตรวจเปอร์เซ็นต์ต่อหน้า จะได้ราคายุติธรรม</li>
        </ul>

        <blockquote>
          "ทองหักหรือขาด ไม่ใช่ทองด้อยค่า — มันคือทองน้ำหนักเท่าเดิม ที่ยังมีมูลค่าเต็มตามเนื้อทอง"
        </blockquote>
      </div>

      <div className="blog-article-cta">
        <h3>มีทองหัก ทองขาด อยากขาย?</h3>
        <p>
          <strong>หลอมทองพัทยา</strong> รับซื้อทองหัก ขาด บิ่น ชำรุด ทุกสภาพ
          ตรวจเปอร์เซ็นต์ด้วยเครื่อง XRF ต่อหน้า ให้ราคาเท่าทองสภาพดี จ่ายเงินสดทันที
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
