import "./globals.css";
import { Prompt } from "next/font/google";
import { getUploadedImage } from "@/lib/getImage";
import { BRANCHES } from "@/data/branches";
import { BUSINESS_ID, branchSchema, organizationSchema } from "@/lib/schema";
import { SITE_URL } from "@/data/site";
import ScrollAnimation from "@/components/ScrollAnimation";

// ฟอนต์ Prompt แบบ self-host (next/font) — ตัดการโหลดจาก Google Fonts ออก เร็วขึ้น ไม่มี layout shift
const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-prompt",
});

/* ============================================
   ข้อมูล SEO หลัก - แก้ไขได้ที่นี่
   ============================================ */
const SITE_NAME = "หลอมทองพัทยา";
// ปรับ ต.ค. 2026 ตามข้อมูล Search Console: คนค้น "ร้านหลอมทองพัทยา" มากที่สุด แต่คลิกน้อย
// → บอกข้อมูลที่คนอยากรู้ก่อนกด (2 สาขา เปิดทุกวัน ตรวจฟรี เงินสด) ไว้ในคำอธิบายที่โชว์บนหน้าผลค้นหา
const SITE_DESCRIPTION =
  "ร้านหลอมทองพัทยา (เฮงศิริ) 2 สาขา พัทยาใต้ · เนินพลับหวาน เปิดทุกวันถึง 20:00 น. รับหลอมทอง รับซื้อทองเก่า ทองหัก ทองเค เครื่องเงิน นาฬิกาแบรนด์เนม ตรวจ XRF ฟรีต่อหน้า จ่ายเงินสดทันที";
const HOME_TITLE = "ร้านหลอมทองพัทยา รับซื้อทอง ตรวจ XRF ฟรี จ่ายเงินสดทันที";
// วางรูปจริงไว้ที่ public/images/uploads/hero/ เพื่อแทนที่รูปตัวอย่าง (ไม่ต้องเปลี่ยนชื่อไฟล์)
const HERO_IMAGE = getUploadedImage("hero", "/images/hero.png");
// รูปตัวแทนเว็บสำหรับพรีวิวตอนแชร์ (Google / Facebook / LINE) — ขนาด 1200x630 ตามมาตรฐาน og:image
const OG_IMAGE = "/images/og-cover.jpg";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "หลอมทองพัทยา",
    "หลอมทอง",
    "รับซื้อทอง พัทยา",
    "รับซื้อทองเก่า",
    "รับหลอมทอง",
    "ร้านรับซื้อทอง ชลบุรี",
    "หลอมทองคำ",
    "รับซื้อทองชำรุด",
    "ตรวจสอบทอง",
    "ทองเก่า พัทยา",
    "รับซื้อเครื่องประดับ",
    "หลอมทอง ชลบุรี",
    "ร้านทอง พัทยา",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "หลอมทองพัทยา - เฮงศิริ รับซื้อทอง หลอมทอง พัทยา",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // canonical ของหน้าแรกย้ายไปประกาศที่ app/page.js เอง
  // (กันหน้าอื่นที่ลืมประกาศ canonical แล้ว inherit "/" จาก root โดยไม่ตั้งใจ = §2.3 metadata merge trap)
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE", // ← ใส่ Google Search Console Verification Code
  },
};

/* ============================================
   Schema Markup (Structured Data) สำหรับ Google
   ============================================ */
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    // ร้านแม่ = แบรนด์ (Organization) · สาขา = JewelryStore แต่ละแห่ง — รายละเอียดใน lib/schema.js
    organizationSchema(SITE_DESCRIPTION),
    ...BRANCHES.map((b) => branchSchema(b)),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": BUSINESS_ID },
      inLanguage: "th",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: HOME_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": BUSINESS_ID },
      description: SITE_DESCRIPTION,
      inLanguage: "th",
    },
  ],
};


export default function RootLayout({ children }) {
  return (
    <html lang="th" className={prompt.variable}>
      <head>
        {/* Schema Markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        {/* หมายเหตุ: ไม่ต้องใส่ <link rel="icon"> เองแล้ว เพราะ Next.js ดึง app/favicon.ico
            มาสร้าง tag นี้ให้อัตโนมัติอยู่แล้ว (ใส่ซ้ำจะได้ favicon tag ซ้ำ 2 อัน) */}
      </head>
      <body>
        <ScrollAnimation />
        {children}
      </body>
    </html>
  );
}
