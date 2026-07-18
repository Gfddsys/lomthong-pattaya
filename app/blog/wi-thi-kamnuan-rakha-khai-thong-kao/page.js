import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";

const COVER_IMAGE = getUploadedImage("blog-wi-thi-kamnuan-rakha-khai-thong-kao", "/images/blog-gold-price.png");

export const metadata = {
  title: "วิธีคำนวณราคาขายทองเก่า ให้รู้ราคาก่อนไปขาย ไม่โดนกดราคา",
  description:
    "วิธีคำนวณราคาขายทองเก่าแบบง่ายๆ รู้สูตรคำนวณจากน้ำหนักและเปอร์เซ็นต์ทอง พร้อมตัวอย่างจริง ให้คุณรู้ราคาคร่าวๆ ก่อนไปขายทองในพัทยา ไม่โดนกดราคา",
  keywords: [
    "วิธีคำนวณราคาขายทองเก่า",
    "คำนวณราคาทอง",
    "ราคารับซื้อทองวันนี้",
    "ขายทองเก่า พัทยา",
    "ขายทองที่ไหนให้ราคาสูง",
  ],
  openGraph: {
    title: "วิธีคำนวณราคาขายทองเก่า ไม่โดนกดราคา",
    description:
      "รู้สูตรคำนวณราคาทองเก่าจากน้ำหนักและเปอร์เซ็นต์ทอง พร้อมตัวอย่างจริง ก่อนไปขาย",
    type: "article",
  },
  alternates: {
    canonical: "/blog/wi-thi-kamnuan-rakha-khai-thong-kao",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "วิธีคำนวณราคาขายทองเก่า ให้รู้ราคาก่อนไปขาย ไม่โดนกดราคา",
  author: { "@type": "Organization", name: "หลอมทองพัทยา" },
  publisher: { "@type": "Organization", name: "หลอมทองพัทยา" },
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  description:
    "วิธีคำนวณราคาขายทองเก่าจากน้ำหนักและเปอร์เซ็นต์ทอง พร้อมตัวอย่างจริง",
  image: COVER_IMAGE,
  inLanguage: "th-TH",
};

export default function ArticleKamnuanRakhaThong() {
  return (
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav className="blog-article-nav" aria-label="Breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span>/</span>
        <Link href="/blog">บทความ</Link>
        <span>/</span>
        <span>วิธีคำนวณราคาขายทองเก่า</span>
      </nav>

      <header className="blog-article-header">
        <h1>วิธีคำนวณราคาขายทองเก่า ให้รู้ราคาก่อนไปขาย ไม่โดนกดราคา</h1>
        <div className="blog-article-meta">
          <span>📅 12 กรกฎาคม 2569</span>
          <span>⏱️ อ่าน 5 นาที</span>
          <span>✍️ หลอมทองพัทยา</span>
        </div>
      </header>

      <div className="blog-article-hero-image">
        <Image
          src={COVER_IMAGE}
          alt="วิธีคำนวณราคาขายทองเก่า ก่อนไปขายทองพัทยา"
          width={800}
          height={450}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="blog-article-content">
        <p>
          ก่อนนำ<strong>ทองเก่า</strong>ไปขาย ถ้ารู้วิธีคำนวณราคาคร่าวๆ ไว้ก่อน
          จะช่วยให้คุณ<strong>ไม่โดนกดราคา</strong> และมั่นใจว่าได้ราคายุติธรรม
          บทความนี้อธิบายสูตรคำนวณแบบเข้าใจง่าย พร้อมตัวอย่างจริงครับ
        </p>

        <h2>ตัวแปรที่ต้องรู้ก่อนคำนวณ</h2>
        <ul>
          <li><strong>น้ำหนักทอง</strong> — คิดเป็น "บาท" หรือ "กรัม" (ทอง 1 บาท = 15.244 กรัม)</li>
          <li><strong>เปอร์เซ็นต์ทอง</strong> — ทองรูปพรรณไทยคือ 96.5% ส่วนทองเค เช่น 18K ≈ 75%, 14K ≈ 58.5%</li>
          <li><strong>ราคารับซื้อทองวันนี้</strong> — อ้างอิงราคา "รับซื้อ" ของสมาคมค้าทองคำแห่งประเทศไทย</li>
        </ul>

        <h2>สูตรคำนวณราคาทองเก่า (แบบง่าย)</h2>
        <p>
          สำหรับ<strong>ทองรูปพรรณ 96.5%</strong> ร้านส่วนใหญ่อ้างอิงราคารับซื้อทองรูปพรรณของสมาคมฯ ต่อน้ำหนัก 1 บาท:
        </p>
        <blockquote>
          ราคาที่ได้ ≈ (ราคารับซื้อทองรูปพรรณต่อบาท) × (น้ำหนักทอง เป็นบาท)
        </blockquote>
        <p>
          ส่วน<strong>ทองเค / ทองที่เปอร์เซ็นต์ต่างจาก 96.5%</strong> จะคิดตามเนื้อทองบริสุทธิ์จริง:
        </p>
        <blockquote>
          ราคาที่ได้ ≈ (ราคาทองคำแท่งต่อกรัม) × (น้ำหนักเป็นกรัม) × (เปอร์เซ็นต์ทอง)
        </blockquote>

        <h2>ตัวอย่างการคำนวณ</h2>
        <p>
          สมมติมีสร้อยทอง 96.5% หนัก <strong>2 บาท</strong> และราคารับซื้อทองรูปพรรณของสมาคมฯ วันนั้นอยู่ที่
          <strong> 40,000 บาท/บาททอง</strong>:
        </p>
        <ul>
          <li>ราคาที่ได้ ≈ 40,000 × 2 = <strong>80,000 บาท</strong> (โดยประมาณ)</li>
        </ul>
        <p>
          <em>หมายเหตุ:</em> ตัวเลขนี้เป็นการประมาณ ราคาจริงขึ้นกับราคาสมาคมฯ วันนั้นและการตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF
        </p>

        <h2>ทำไม "หลอมทอง" ถึงได้ราคาสูงกว่า?</h2>
        <p>
          การขายคืนร้านทองรูปพรรณทั่วไปมักโดน<strong>หักค่ากำเหน็จ</strong> ทำให้ได้น้อยกว่าที่ควร
          แต่การ<strong>หลอมทอง</strong>คิดราคาจากเนื้อทองบริสุทธิ์จริง ไม่หักค่ากำเหน็จ
          โดยเฉพาะทองเก่า ทองหัก หรือทองที่ไม่มีใบเสร็จ จะได้ราคาใกล้เคียงทองคำแท่งมากที่สุด
        </p>

        <h2>เช็กราคาทองวันนี้ก่อนไปขาย</h2>
        <p>
          หน้าแรกของเรามี<strong>ราคาทองคำประจำวัน</strong>อ้างอิงสมาคมค้าทองคำให้ดูก่อนตัดสินใจ
          หรือส่งรูปทองมาทาง LINE เพื่อ<Link href="/services/online-valuation">ประเมินราคาออนไลน์ฟรี</Link>ได้ทันที
        </p>
      </div>

      <div className="blog-article-cta">
        <h3>อยากรู้ราคาจริงของทองคุณ?</h3>
        <p>
          <strong>หลอมทองพัทยา</strong> ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ต่อหน้า
          คำนวณราคาตามเนื้อทองจริง ไม่กดราคา จ่ายเงินสดทันที
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
