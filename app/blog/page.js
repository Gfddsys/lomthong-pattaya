import Image from "next/image";
import Link from "next/link";
import { getUploadedImage } from "@/lib/getImage";
import { getAutoArticles } from "@/lib/articles";

const IMG_LOMTHONG = getUploadedImage("blog-lomthong", "/images/blog-lomthong.png");
const IMG_CHECK_GOLD = getUploadedImage("blog-check-gold", "/images/blog-check-gold.png");
const IMG_INSPECTION = getUploadedImage("inspection", "/images/inspection.png");
const IMG_GOLD_PRICE = getUploadedImage("blog-gold-price", "/images/blog-gold-price.png");

/* ============================================
   ข้อมูลบทความทั้งหมด
   เพิ่มบทความใหม่ได้ที่นี่
   ============================================ */
const articles = [
  {
    slug: "thong-k-9k-14k-18k-rap-sue-pattaya",
    title: "ทองเค 9K 14K 18K ขายได้ไหม? ต่างจากทองไทยยังไง",
    excerpt:
      "มีสร้อยหรือแหวนทองเคจากต่างประเทศ แต่ร้านทองทั่วไปไม่รับซื้อ? บทความนี้อธิบายว่าทองเคคืออะไร ขายได้ที่ไหน และคำนวณราคาคร่าวๆ เองได้ยังไง",
    image: "/images/blog-check-gold.png",
    imageAlt: "ทองเค 9K 14K 18K ขายได้ไหม รับซื้อทองเคพัทยา",
    date: "25 กรกฎาคม 2569",
    readTime: "12 นาที",
    category: "ความรู้",
  },
  {
    slug: "khai-thong-mai-mee-bai-set",
    title: "ขายทองไม่มีใบเสร็จ ขายได้ไหม? ต้องใช้เอกสารอะไรบ้าง",
    excerpt:
      "ทองเก่าทำใบเสร็จหาย หรือได้ทองมาโดยไม่มีใบรับประกัน ขายได้ไหม? คำตอบคือขายได้! อธิบายว่าทำไม ใช้เอกสารอะไร และวิธีขายให้ได้ราคาสูง",
    image: IMG_CHECK_GOLD,
    imageAlt: "ขายทองไม่มีใบเสร็จ ขายได้ไหม รับซื้อทองเก่าพัทยา",
    date: "12 กรกฎาคม 2569",
    readTime: "4 นาที",
    category: "เคล็ดลับ",
  },
  {
    slug: "wi-thi-kamnuan-rakha-khai-thong-kao",
    title: "วิธีคำนวณราคาขายทองเก่า ให้รู้ราคาก่อนไปขาย ไม่โดนกดราคา",
    excerpt:
      "ก่อนไปขายทองเก่า รู้วิธีคำนวณราคาคร่าวๆ ไว้ก่อน จะได้ไม่โดนกดราคา รวมสูตรคำนวณจากน้ำหนักและเปอร์เซ็นต์ทอง พร้อมตัวอย่างจริง",
    image: IMG_GOLD_PRICE,
    imageAlt: "วิธีคำนวณราคาขายทองเก่า ก่อนไปขายทองพัทยา",
    date: "12 กรกฎาคม 2569",
    readTime: "5 นาที",
    category: "เคล็ดลับ",
  },
  {
    slug: "thong-khat-thong-hak-rap-sue-mai",
    title: "ทองขาด ทองหัก บิ่น ชำรุด รับซื้อไหม? ได้ราคาเท่าไหร่",
    excerpt:
      "มีสร้อยขาด แหวนบิ่น ทองหักเก็บไว้ ยังขายได้ไหม? รับซื้อได้ทุกสภาพ และได้ราคาเท่าทองสภาพดี เพราะคิดตามเนื้อทองจริง",
    image: IMG_CHECK_GOLD,
    imageAlt: "ทองขาด ทองหัก รับซื้อไหม รับซื้อทองหักพัทยา",
    date: "12 กรกฎาคม 2569",
    readTime: "4 นาที",
    category: "เคล็ดลับ",
  },
  {
    slug: "khai-thong-thi-nai-rakha-sung-pattaya",
    title: "ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา? เทียบให้เห็นชัด",
    excerpt:
      "จะขายทองทั้งที ขายที่ไหนถึงคุ้ม? เทียบขายคืนร้านทองรูปพรรณ vs หลอมทอง พร้อมเช็กลิสต์เลือกร้านที่ไม่กดราคา ให้ได้ราคาสูงสุด",
    image: IMG_LOMTHONG,
    imageAlt: "ขายทองที่ไหนให้ราคาสูงที่สุดในพัทยา",
    date: "12 กรกฎาคม 2569",
    readTime: "5 นาที",
    category: "เคล็ดลับ",
  },
  {
    slug: "rap-sue-thong-pattaya",
    title: "รับซื้อทองพัทยา ร้านไหนดี ให้ราคาสูง จ่ายเงินสดทันที",
    excerpt:
      "กำลังมองหาร้านรับซื้อทองในพัทยา ชลบุรี บางละมุง? แนะนำวิธีเลือกร้านรับซื้อทองที่ให้ราคาสูงสุด โปร่งใส จ่ายเงินสดทันที",
    image: IMG_LOMTHONG,
    imageAlt: "รับซื้อทองพัทยา ร้านไหนดี ราคาสูง",
    date: "20 มิถุนายน 2569",
    readTime: "6 นาที",
    category: "แนะนำร้าน",
  },
  {
    slug: "thong-kao-pattaya-khay-thi-nai",
    title: "มีทองเก่า ทองหัก ขายที่ไหนดี? แนะนำร้านรับซื้อทองเก่าพัทยาและชลบุรี",
    excerpt:
      "ทองเก่า ทองหัก ทองชำรุด อย่าทิ้ง! ยังมีมูลค่า แนะนำวิธีขายทองเก่าในพัทยาให้ได้ราคาดีที่สุด เปรียบเทียบขายคืน vs หลอมทอง",
    image: IMG_CHECK_GOLD,
    imageAlt: "ขายทองเก่าพัทยา ทองหักขายที่ไหนดี",
    date: "1 กรกฎาคม 2569",
    readTime: "7 นาที",
    category: "เคล็ดลับ",
  },
  {
    slug: "borikar-truat-thong-free-pattaya",
    title: "ตรวจสอบทองฟรี พัทยา! เช็คเปอร์เซ็นต์ทอง ชั่งน้ำหนัก ไม่เสียค่าใช้จ่าย",
    excerpt:
      "บริการตรวจสอบทองฟรีในพัทยาและชลบุรี ใช้เครื่อง XRF ตรวจเปอร์เซ็นต์ทอง ชั่งน้ำหนัก ไม่เสียค่าใช้จ่าย ครอบคลุมพัทยา บางละมุง ศรีราชา",
    image: IMG_INSPECTION,
    imageAlt: "ตรวจสอบทองฟรี พัทยา เช็คทองแท้",
    date: "10 พฤษภาคม 2569",
    readTime: "5 นาที",
    category: "บริการ",
  },
  {
    slug: "lomthong-pattaya-best-price",
    title: "หลอมทองพัทยาที่ไหนดี? เลือกร้านหลอมทองให้ได้ราคาเต็ม ไม่โดนกดราคา",
    excerpt:
      "กำลังมองหาร้านหลอมทองพัทยาที่เชื่อถือได้? แนะนำวิธีเลือกร้านหลอมทองให้ได้ราคาสูงสุด ไม่กดราคา ตรวจสอบต่อหน้า",
    image: IMG_LOMTHONG,
    imageAlt: "หลอมทองพัทยาที่ไหนดี ได้ราคาเต็ม",
    date: "5 เมษายน 2569",
    readTime: "5 นาที",
    category: "ความรู้เรื่องทอง",
  },
  {
    slug: "lomthong-process-pattaya",
    title: "เจาะลึกขั้นตอน หลอมทองพัทยา มาตรฐานช่างทองมืออาชีพ ปลอดภัย 100%",
    excerpt:
      "พาดูขั้นตอนการหลอมทองพัทยาแบบเจาะลึก มั่นใจ ปลอดภัย ได้น้ำหนักเต็ม 100% ตั้งแต่การชั่งน้ำหนักจนหลอมเสร็จ",
    image: IMG_INSPECTION,
    imageAlt: "ขั้นตอนหลอมทอง โดยช่างทองพัทยา",
    date: "15 พฤษภาคม 2569",
    readTime: "6 นาที",
    category: "ความรู้เรื่องทอง",
  },
  {
    slug: "lomthong-khao-jai-ngai",
    title: "หลอมทองคืออะไร? ทำไมคนพัทยาถึงนิยมหลอมทอง",
    excerpt:
      "หลายคนอาจเคยได้ยินคำว่า 'หลอมทอง' แต่ไม่แน่ใจว่ามันคืออะไร และทำไมถึงได้ราคาดีกว่าขายทองเป็นชิ้น บทความนี้จะอธิบายทุกอย่างให้เข้าใจง่ายๆ",
    image: IMG_LOMTHONG,
    imageAlt: "หลอมทองคืออะไร บริการหลอมทองพัทยา",
    date: "15 มกราคม 2569",
    readTime: "5 นาที",
    category: "ความรู้เรื่องทอง",
  },
  {
    slug: "check-real-gold",
    title: "วิธีตรวจสอบทองแท้ด้วยตัวเอง 5 วิธี ก่อนนำไปหลอมหรือขาย",
    excerpt:
      "ก่อนนำทองไปขายหรือหลอม ควรรู้วิธีตรวจสอบเบื้องต้นด้วยตัวเอง เพื่อป้องกันการถูกหลอก บทความนี้รวม 5 วิธีง่ายๆ ที่ทำได้ที่บ้าน",
    image: IMG_CHECK_GOLD,
    imageAlt: "วิธีตรวจสอบทองแท้ ก่อนนำไปหลอมทอง",
    date: "22 กุมภาพันธ์ 2569",
    readTime: "7 นาที",
    category: "เคล็ดลับ",
  },
  {
    slug: "gold-price-trend",
    title: "ราคาทองวันนี้ 2569 แนวโน้มราคาทอง ควรซื้อหรือขายดี?",
    excerpt:
      "วิเคราะห์แนวโน้มราคาทองคำในปี 2569 ปัจจัยที่มีผลต่อราคา และคำแนะนำว่าควรซื้อหรือขายทองในช่วงนี้ รวมถึงเคล็ดลับการเลือกร้านทองที่ให้ราคาดี",
    image: IMG_GOLD_PRICE,
    imageAlt: "ราคาทอง 2569 แนวโน้มราคาทองคำ",
    date: "10 มีนาคม 2569",
    readTime: "6 นาที",
    category: "วิเคราะห์ตลาด",
  },
];

/* ============================================
   รวมบทความอัตโนมัติ (จาก content/articles/*.json)
   เข้ากับบทความเดิมด้านบน — บทความใหม่ขึ้นก่อน
   ============================================ */
function getAllArticles() {
  const auto = getAutoArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    image: a.fallbackImage,
    imageAlt: a.imageAlt,
    date: a.date,
    readTime: a.readTime,
    category: a.category,
  }));
  // กันซ้ำ: ถ้ามี slug ตรงกับบทความเดิม ให้ใช้ของเดิม
  const existing = new Set(articles.map((a) => a.slug));
  return [...auto.filter((a) => !existing.has(a.slug)), ...articles];
}

export const metadata = {
  title: "บทความ | ความรู้เรื่องทอง หลอมทอง รับซื้อทอง ราคาทอง พัทยา ชลบุรี",
  description:
    "รวมบทความให้ความรู้เรื่องทองคำ การหลอมทอง รับซื้อทองพัทยา ขายทองเก่า ตรวจสอบทองฟรี แนวโน้มราคาทอง และเคล็ดลับดีๆ จาก หลอมทองพัทยา บริการครอบคลุมพัทยา ชลบุรี บางละมุง ศรีราชา",
  // สำคัญ: ต้องกำหนด canonical ของหน้านี้เอง ไม่งั้นจะสืบทอด canonical ของหน้าแรกจาก root layout มาแทน
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "บทความเรื่องทอง",
    "หลอมทองพัทยา",
    "รับซื้อทองพัทยา",
    "ขายทองเก่าพัทยา",
    "ตรวจสอบทองฟรี พัทยา",
    "ร้านรับซื้อทอง ชลบุรี",
    "ร้านทอง บางละมุง",
    "หลอมทอง ศรีราชา",
    "วิธีตรวจสอบทองแท้",
    "ราคาทอง 2569",
    "ความรู้เรื่องทองคำ",
  ],
  openGraph: {
    title: "บทความ | หลอมทองพัทยา",
    description:
      "รวมบทความให้ความรู้เรื่องทองคำ การหลอมทอง วิธีตรวจสอบทองแท้ แนวโน้มราคาทอง",
    type: "website",
  },
};

export default function BlogPage() {
  const allArticles = getAllArticles();
  return (
    <>
      {/* Blog Hero Banner */}
      <section className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <div className="container">
          <div className="blog-hero-content">
            <span className="section-label">บทความ</span>
            <h1 className="blog-hero-title">
              ความรู้เรื่อง<span className="gold-text">ทองคำ</span>
            </h1>
            <p className="blog-hero-subtitle">
              รวมบทความให้ความรู้เกี่ยวกับทองคำ การหลอมทอง
              เคล็ดลับดีๆ และแนวโน้มราคาทอง จากผู้เชี่ยวชาญ หลอมทองพัทยา
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="section section-dark">
        <div className="container">
          <div className="blog-grid">
            {allArticles.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article.slug}
                className="blog-card"
              >
                <div className="blog-card-image">
                  <Image
                    src={getUploadedImage(`blog-${article.slug}`, article.image)}
                    alt={article.imageAlt}
                    width={600}
                    height={400}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  <span className="blog-card-category">{article.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>📅 {article.date}</span>
                    <span>⏱️ อ่าน {article.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{article.title}</h2>
                  <p className="blog-card-excerpt">{article.excerpt}</p>
                  <span className="blog-card-link">
                    อ่านเพิ่มเติม →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="blog-cta">
            <h3>
              สนใจบริการ<span className="gold">หลอมทองพัทยา</span>?
            </h3>
            <p>
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี ให้ราคายุติธรรม จ่ายเงินทันที
            </p>
            <div className="blog-cta-actions">
              <Link href="/#contact" className="btn btn-primary">
                ติดต่อเรา
              </Link>
              <Link href="/" className="btn btn-outline">
                กลับหน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
