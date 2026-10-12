/* ============================================
   ข้อมูลสาขา - ใช้ร่วมกันทั้งเว็บ (หน้าแรก + หน้าสาขา + sitemap)
   ร้านมี 2 สาขาจริง แต่ละสาขามี Google Business Profile แยกกัน
   เอาลิงก์หน้าสาขา (/branch/<slug>) ไปใส่ช่อง "เว็บไซต์" ใน GBP ของสาขานั้น
   ============================================ */

export const BRANCHES = [
  {
    slug: "pattaya-tai",
    shortName: "สาขาพัทยาใต้",
    area: "พัทยาใต้",
    name: "หลอมทองพัทยา สาขาพัทยาใต้",
    gbpName: "เฮงศิริรับซื้อทองและนาฬิกาพัทยา",
    address: "225/136 ถ.พัทยาใต้ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150",
    streetAddress: "225/136 ถ.พัทยาใต้ ต.หนองปรือ",
    locality: "บางละมุง",
    region: "ชลบุรี",
    postalCode: "20150",
    lat: 12.9187667,
    lng: 100.8927284,
    // ที่อยู่และเวลาเปิดยืนยันกับเจ้าของร้าน 12 ต.ค. 2026 ให้ตรงกับ Google Business Profile (NAP ต้องตรงกันทุกที่)
    hours: "เปิดทุกวัน 10:30 - 20:00 น.",
    opens: "10:30",
    closes: "20:00",
    // สำหรับหน้าภาษาอังกฤษ /en
    nameEn: "South Pattaya Branch",
    // หัวข้อหน้าสาขาใน Google — คำที่คนค้นจริงจาก Search Console
    seoTitle: "ร้านหลอมทองพัทยาใต้ · ร้านทอง รับซื้อทอง ถนนพัทยาใต้",
    addressEn: "225/136 South Pattaya Road (Pattaya Tai), Nong Prue, Bang Lamung, Chonburi 20150",
    reviews: 32, // Google Maps 12 ต.ค. 2026 (5.0 ดาว)
    mapEmbedUrl:
      "https://maps.google.com/maps?q=12.9187667,100.8927284&z=17&hl=th&output=embed",
    mapUrl: "https://maps.app.goo.gl/srotj15xvzwfWi9M6",
    // Place ID ของหมุดใน Google Maps ใช้เปิดหน้าเขียนรีวิวตรง (หน้า /reviews)
    placeId: "ChIJ686UVEaVAjER-wCurORn9Gw",
  },
  {
    slug: "noen-plap-wan",
    shortName: "สาขาเนินพลับหวาน",
    area: "เนินพลับหวาน",
    name: "หลอมทองพัทยา สาขาเนินพลับหวาน",
    gbpName: "เฮงศิริรับซื้อทองและนาฬิกา สาขา2 ซอยเนินพลับหวาน",
    address: "13/228 ซอยเนินพลับหวาน เมืองพัทยา อ.บางละมุง จ.ชลบุรี 20150",
    streetAddress: "13/228 ซอยเนินพลับหวาน",
    locality: "บางละมุง",
    region: "ชลบุรี",
    postalCode: "20150",
    lat: 12.9317188,
    lng: 100.906533,
    hours: "เปิดทุกวัน 10:00 - 20:00 น.",
    opens: "10:00",
    closes: "20:00",
    nameEn: "Noen Plap Wan Branch",
    seoTitle: "ร้านทองซอยเนินพลับหวาน · รับซื้อทอง หลอมทอง เนินพลับหวาน",
    addressEn: "13/228 Soi Noen Plap Wan, Pattaya City, Bang Lamung, Chonburi 20150",
    reviews: 51, // Google Maps 12 ต.ค. 2026 (5.0 ดาว)
    mapEmbedUrl:
      "https://maps.google.com/maps?q=12.9317188,100.906533&z=17&hl=th&output=embed",
    mapUrl: "https://maps.app.goo.gl/9vx9GVm6sDBE8RGXA",
    placeId: "ChIJEeEaq92VAjER5ShCa4XZAv8",
  },
];

// สรุปเวลาเปิดทั้ง 2 สาขา สำหรับ Footer / หน้าติดต่อ / คำอธิบายเว็บ
export const HOURS_SUMMARY = "เปิดทุกวัน · เนินพลับหวาน 10:00-20:00 น. · พัทยาใต้ 10:30-20:00 น.";

// ลิงก์เปิดหน้าเขียนรีวิวของสาขาบน Google Maps
export function reviewUrl(b) {
  return `https://search.google.com/local/writereview?placeid=${b.placeId}`;
}

export function getBranch(slug) {
  return BRANCHES.find((b) => b.slug === slug);
}
