import { SITE_URL } from "@/data/site";
import { CONTACT } from "@/data/contact";
import { BRANCHES, mapsAppUrl, openingHoursSpec } from "@/data/branches";
import { servicesData } from "@/data/services";

/* ============================================
   Schema.org ของร้าน — ที่เดียว ใช้ทั้ง app/layout.js (ทุกหน้า) และหน้าสาขา
   ============================================
   โครงสร้าง (24 ต.ค. 2026):
   - ร้านแม่ #business = Organization (แบรนด์ ไม่มีที่อยู่/พิกัดของตัวเอง) → สาขาเป็น subOrganization
     เดิมเป็น LocalBusiness ที่ใช้ที่อยู่/พิกัดซ้ำกับสาขาพัทยาใต้ → Google อาจเห็นเป็นร้านซ้อนกัน 2 ร้านที่จุดเดียว
   - แต่ละสาขา = JewelryStore (ประเภทเดียวกันทุกที่ที่ใช้ @id เดียวกัน) ผูกกลับด้วย parentOrganization
   - บริการจริงของร้าน (data/services.js) ใส่เป็น hasOfferCatalog ของทุกสาขา
     แต่ละบริการมี @id เดียวกับ schema Service ในหน้า /services/<slug> → Google รวมเป็นชุดเดียว
   ⚠️ ห้ามใส่ aggregateRating เอง (Google ไม่แสดงดาวให้รีวิวที่ร้านใส่เอง + เสี่ยงโดนลงโทษ)
*/

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const branchId = (b) => `${SITE_URL}/branch/${b.slug}#business`;
export const serviceId = (slug) => `${SITE_URL}/services/${slug}#service`;

const SITE_NAME = "หลอมทองพัทยา";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

// ลิงก์ Google Maps แบบ CID = ตัวตนถาวรของหมุดใน Google (ไม่เปลี่ยนแม้เปลี่ยนชื่อหมุด)
const cidUrl = (b) => (b.cid ? `https://maps.google.com/?cid=${b.cid}` : null);

// รายการบริการจริงทั้งหมด → ใส่ในทุกสาขา (ทุกสาขาทำได้ทุกบริการ)
export function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "บริการของร้านหลอมทองพัทยา (เฮงศิริ)",
    itemListElement: servicesData.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": serviceId(s.slug),
        name: s.title,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    })),
  };
}

// สาขา 1 แห่ง — extra ใช้เติมเฉพาะหน้า (เช่น รูปจริงในหน้าสาขา)
export function branchSchema(b, extra = {}) {
  return {
    "@type": "JewelryStore",
    "@id": branchId(b),
    name: b.name,
    alternateName: b.gbpName,
    url: `${SITE_URL}/branch/${b.slug}`,
    image: OG_IMAGE,
    telephone: CONTACT.phoneE164,
    parentOrganization: { "@id": BUSINESS_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.locality,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: "TH",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    // ลิงก์ถาวร (place_id + พิกัด) แทน maps.app.goo.gl ที่เป็นลิงก์ย่อและอาจเปลี่ยนปลายทางได้
    hasMap: mapsAppUrl(b),
    sameAs: [cidUrl(b), b.facebookUrl].filter(Boolean),
    priceRange: "฿",
    openingHoursSpecification: openingHoursSpec(b),
    hasOfferCatalog: offerCatalog(),
    ...extra,
  };
}

// ร้านแม่ (แบรนด์) — ไม่มีที่อยู่/พิกัดของตัวเอง ที่ตั้งจริงอยู่ที่สาขา
export function organizationSchema(description) {
  return {
    "@type": "Organization",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    alternateName: ["เฮงศิริ", "Hengsiri"],
    url: SITE_URL,
    description,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-512.png`, width: 512, height: 512 },
    image: OG_IMAGE,
    telephone: CONTACT.phoneE164,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneE164,
      contactType: "customer service",
      areaServed: "TH",
      availableLanguage: ["th", "en"],
    },
    // บัญชีทางการของแบรนด์ (หมุด Google Maps อยู่ที่แต่ละสาขา ไม่ใช่ที่แบรนด์)
    sameAs: [CONTACT.facebookUrl, CONTACT.lineUrl, CONTACT.tiktokUrl, CONTACT.youtubeUrl, CONTACT.instagramUrl],
    subOrganization: BRANCHES.map((b) => ({ "@id": branchId(b) })),
  };
}
