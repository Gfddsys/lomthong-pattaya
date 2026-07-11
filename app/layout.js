import "./globals.css";
import { getUploadedImage } from "@/lib/getImage";
import { CONTACT } from "@/data/contact";

/* ============================================
   ข้อมูล SEO หลัก - แก้ไขได้ที่นี่
   ============================================ */
const SITE_NAME = "หลอมทองพัทยา";
const SITE_DESCRIPTION =
  "รับหลอมทองพัทยา รับซื้อทองเก่า ทองชำรุด ทองหัก เครื่องประดับ โดยช่างผู้ชำนาญ ให้ราคายุติธรรม ตรวจสอบฟรี บริการถึงที่ - หลอมทองพัทยา";
const SITE_URL = "https://www.xn--72c5ab1amkp1ctc0co.com"; // หลอมทองพัทยา.com ในรูป punycode (มาตรฐานอินเทอร์เน็ตบังคับใช้รูปนี้)
const SITE_PHONE = CONTACT.phoneDisplay; // เบอร์จริงจาก data/contact.js
const SITE_ADDRESS = "ถ.พัทยาใต้ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150";
// วางรูปจริงไว้ที่ public/images/uploads/hero/ เพื่อแทนที่รูปตัวอย่าง (ไม่ต้องเปลี่ยนชื่อไฟล์)
const HERO_IMAGE = getUploadedImage("hero", "/images/hero.png");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `หลอมทองพัทยา | รับซื้อทอง หลอมทอง`,
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
    title: "หลอมทองพัทยา | รับซื้อทอง หลอมทอง",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "หลอมทองพัทยา",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "หลอมทองพัทยา | รับซื้อทอง หลอมทอง",
    description: SITE_DESCRIPTION,
    images: [HERO_IMAGE],
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
  alternates: {
    canonical: SITE_URL,
  },
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
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      telephone: SITE_PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ถ.พัทยาใต้ ต.หนองปรือ",
        addressLocality: "บางละมุง",
        addressRegion: "ชลบุรี",
        postalCode: "20150",
        addressCountry: "TH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9187667, // พิกัดจริงของร้าน (Google Maps)
        longitude: 100.8927284,
      },
      image: `${SITE_URL}${HERO_IMAGE}`,
      priceRange: "฿",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      // ดึงจาก data/contact.js เพื่อให้ตรงกับ Navbar/Footer ทุกจุด (สำคัญต่อ Local SEO)
      sameAs: [CONTACT.facebookUrl, CONTACT.lineUrl],
      // ⚠️ ห้ามใส่ aggregateRating เทียม (rating/จำนวนรีวิวที่ไม่มีอยู่จริง) เด็ดขาด
      // Google ถือเป็น "misleading structured data" และอาจโดน manual action ตัด rich result ทั้งเว็บ
      // ให้ใส่กลับเมื่อมีรีวิวจริงบน Google Business Profile แล้วเท่านั้น (ผูกตัวเลขตามจริง)
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "th",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "หลอมทองพัทยา | รับซื้อทอง หลอมทอง",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      description: SITE_DESCRIPTION,
      inLanguage: "th",
    },
  ],
};

import ScrollAnimation from "@/components/ScrollAnimation";

export default function RootLayout({ children }) {
  return (
    <html lang="th">
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
