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
    // เมืองของสาขา ใช้แยกข้อความ "x สาขาในพัทยา" กับจำนวนสาขาทั้งหมด (สาขา 3 แยกคีรี ชลบุรี = "ชลบุรี")
    // ช่องเสริมของหน้าสาขา (ไม่ใส่ = ใช้ค่ามาตรฐาน): h1, intro (ย่อหน้าเพิ่ม), faqExtra ([{q, a}])
    city: "พัทยา",
    name: "หลอมทองพัทยา สาขาพัทยาใต้",
    // ชื่อหมุดจริงบน Google Maps (ตรวจ 24 ต.ค. 2026 — ทีมงานเปลี่ยนชื่อหมุดแล้ว) ใช้เป็น alternateName ใน schema
    gbpName: "รับหลอมทอง รับซื้อทอง พัทยา",
    // CID ของหมุด = ตัวตนถาวรใน Google (ได้จาก ID หมุด 0x6cf467e4acae00fb และตรงกับ fid ใน Business Profile)
    cid: "7851014282260906235",
    address: "225/136 ถ.พัทยาใต้ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150",
    streetAddress: "225/136 ถ.พัทยาใต้ ต.หนองปรือ",
    locality: "บางละมุง",
    region: "ชลบุรี",
    postalCode: "20150",
    lat: 12.9187667,
    lng: 100.8927284,
    // ที่อยู่ยืนยันกับเจ้าของร้าน 12 ต.ค. 2026 · เวลาเปิดแก้ตามหมุด Google 22 ต.ค. 2026 (NAP ต้องตรงกันทุกที่)
    hours: "เปิดทุกวัน จ.-ศ. 10:30-20:00 น. · ส.-อา. 10:00-18:00 น.",
    // days: 0 = อาทิตย์ ... 6 = เสาร์ (ตรงกับ Date.getDay)
    schedule: [
      { days: [1, 2, 3, 4, 5], opens: "10:30", closes: "20:00" },
      { days: [0, 6], opens: "10:00", closes: "18:00" },
    ],
    // สำหรับหน้าภาษาอังกฤษ /en
    nameEn: "South Pattaya Branch",
    // หัวข้อหน้าสาขาใน Google — คำที่คนค้นจริงจาก Search Console
    seoTitle: "ร้านหลอมทองพัทยา สาขาพัทยาใต้ · รับซื้อทอง หลอมทอง ถ.พัทยาใต้",
    addressEn: "225/136 South Pattaya Road (Pattaya Tai), Nong Prue, Bang Lamung, Chonburi 20150",
    reviews: 35, // ค่าเริ่มต้น 21 ต.ค. 2026 · ตัวเลขที่โชว์บนเว็บมาจาก data/reviewStats.js (อัปเดตทุกวัน)
    mapEmbedUrl:
      "https://maps.google.com/maps?q=12.9187667,100.8927284&z=17&hl=th&output=embed",
    mapUrl: "https://maps.app.goo.gl/srotj15xvzwfWi9M6",
    // Place ID ของหมุดใน Google Maps ใช้เปิดหน้าเขียนรีวิวตรง (หน้า /reviews)
    placeId: "ChIJ686UVEaVAjER-wCurORn9Gw",
    // เพจ Facebook ที่ดูแลสาขานี้ (พัทยาใต้ใช้เพจหลักของร้าน)
    facebookUrl: "https://www.facebook.com/hengsiripattaya",
    // สถานที่ที่คนในพื้นที่รู้จัก รอบสาขา (ชื่อตามหมุด Google Maps · ระยะเส้นตรงจากพิกัดหมุด วัด 29 ต.ค. 2026)
    // ช่วยให้ Google ผูกสาขากับย่าน และลูกค้าใช้เป็นจุดสังเกตตอนมาร้าน
    nearby: [
      { name: "บิ๊กซี เพลส พัทยาใต้", km: 0.4 },
      { name: "วัดธรรมสามัคคี", km: 0.8 },
      { name: "โรงพยาบาลจอมเทียน", km: 0.8 },
      { name: "ตลาดเทพประสิทธิ์", km: 1.1 },
      { name: "เอาท์เล็ทมอลล์ พัทยา", km: 1.2 },
      { name: "โรงพยาบาลเมืองพัทยา", km: 1.4 },
      { name: "โลตัส พัทยาใต้", km: 1.5 },
      { name: "วัดชัยมงคล พระอารามหลวง", km: 1.9 },
      { name: "เซ็นทรัล พัทยา", km: 2.0 },
      { name: "วัดพระใหญ่ เขาพระตำหนัก", km: 2.7 },
    ],
  },
  {
    slug: "noen-plap-wan",
    shortName: "สาขาเนินพลับหวาน",
    area: "เนินพลับหวาน",
    city: "พัทยา",
    name: "หลอมทองพัทยา สาขาเนินพลับหวาน",
    gbpName: "เฮงศิริรับซื้อทองและนาฬิกา สาขา2 ซอยเนินพลับหวาน",
    cid: "18375488596678420709", // ID หมุด 0xff02d9856b4228e5
    address: "13/228 ม.5 ซอยเนินพลับหวาน เมืองพัทยา อ.บางละมุง จ.ชลบุรี 20150",
    streetAddress: "13/228 ม.5 ซอยเนินพลับหวาน",
    locality: "บางละมุง",
    region: "ชลบุรี",
    postalCode: "20150",
    lat: 12.9317188,
    lng: 100.906533,
    hours: "เปิดทุกวัน 10:00-20:00 น.",
    schedule: [{ days: [0, 1, 2, 3, 4, 5, 6], opens: "10:00", closes: "20:00" }],
    nameEn: "Noen Plap Wan Branch",
    seoTitle: "ร้านทองเนินพลับหวาน · ห้างทอง รับซื้อทอง หลอมทอง ซอยเนินพลับหวาน",
    addressEn: "13/228 Moo 5, Soi Noen Plap Wan, Pattaya City, Bang Lamung, Chonburi 20150",
    reviews: 53, // ค่าเริ่มต้น 21 ต.ค. 2026 · ตัวเลขที่โชว์บนเว็บมาจาก data/reviewStats.js (อัปเดตทุกวัน)
    mapEmbedUrl:
      "https://maps.google.com/maps?q=12.9317188,100.906533&z=17&hl=th&output=embed",
    mapUrl: "https://maps.app.goo.gl/9vx9GVm6sDBE8RGXA",
    placeId: "ChIJEeEaq92VAjER5ShCa4XZAv8",
    facebookUrl: "https://www.facebook.com/hengsirinernplubwan/",
    nearby: [
      { name: "ตลาดสดเจ้าสัว", km: 0.1 },
      { name: "เนินพลับหวานพลาซ่า", km: 0.1 },
      { name: "ตลาดนำชัยแฟร์", km: 0.3 },
      { name: "โรงเรียนบ้านเนินพลับหวาน", km: 0.7 },
      { name: "วัดเซนต์นิโคลัส พัทยา", km: 0.7 },
      { name: "เดอะชิลล์ (ท็อปส์ เดอะชิลล์)", km: 1.1 },
      { name: "บิ๊กซี เพลส พัทยากลาง", km: 1.4 },
      { name: "โรงพยาบาลมิตรไมตรี", km: 1.6 },
      { name: "วัดหนองอ้อ", km: 1.7 },
      { name: "โรงพยาบาลกรุงเทพพัทยา", km: 2.5 },
    ],
  },
];

// สรุปเวลาเปิดทั้ง 2 สาขา สำหรับ Footer / หน้าติดต่อ / คำอธิบายเว็บ
export const HOURS_SUMMARY = "เปิดทุกวัน · เนินพลับหวาน 10:00-20:00 น. · พัทยาใต้ จ.-ศ. 10:30-20:00 น. ส.-อา. 10:00-18:00 น.";

const DAY_SHORT = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
const DAY_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// เวลาเปิด-ปิดของวันนั้น (day: 0 = อาทิตย์)
export function hoursOn(b, day) {
  return b.schedule.find((s) => s.days.includes(day));
}

// แบบสั้นสำหรับป้าย/คำอธิบาย เช่น "ทุกวัน 10:00-20:00" หรือ "จ.-ศ. 10:30-20:00 · ส.-อา. 10:00-18:00"
export function hoursShort(b) {
  if (b.schedule.length === 1) return `ทุกวัน ${b.schedule[0].opens}-${b.schedule[0].closes}`;
  const label = (days) => (days.length === 2 && days.includes(0) && days.includes(6) ? "ส.-อา." : `${DAY_SHORT[days[0]]}-${DAY_SHORT[days.at(-1)]}`);
  return b.schedule.map((s) => `${label(s.days)} ${s.opens}-${s.closes}`).join(" · ");
}

// schema.org openingHoursSpecification (1 รายการต่อช่วงเวลา)
export function openingHoursSpec(b) {
  return b.schedule.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: s.days.map((d) => DAY_EN[d]),
    opens: s.opens,
    closes: s.closes,
  }));
}

// สาขาที่กำลังจะเปิด — ยังไม่อยู่ใน BRANCHES (ไม่โชว์หน้าสาขา แผนที่ หรือข้อมูลร้านให้ Google)
// ใช้แค่เมนูรีวิว + หน้า /reviews/<slug> (ยังไม่มีหมุด Google Maps → ขึ้นว่ากำลังจะเปิด)
// เปิดสาขาจริงแล้ว: ย้ายไปใส่ใน BRANCHES พร้อมที่อยู่ พิกัด placeId แล้วลบออกจากรายการนี้
export const UPCOMING_BRANCHES = [
  { slug: "mueang-mai-chonburi", shortName: "สาขาเมืองใหม่ ชลบุรี", city: "ชลบุรี" },
];

// ชื่อในเมนูรีวิว (เมนูบน) — ตามบรีฟ: ใส่ "พัทยา" หน้าเนินพลับหวาน ให้รู้ว่าอยู่พัทยา
const MENU_NAME = { "noen-plap-wan": "สาขาพัทยาเนินพลับหวาน" };

// ทุกสาขาที่มีหน้ารีวิว เรียงตามเมนู (สาขาที่ยังไม่เปิดมี upcoming: true)
export const REVIEW_BRANCHES = [
  ...BRANCHES.map((b) => ({ ...b, menuName: MENU_NAME[b.slug] ?? b.shortName })),
  ...UPCOMING_BRANCHES.map((b) => ({ ...b, menuName: b.shortName, upcoming: true })),
];

// ลิงก์เปิดหน้าเขียนรีวิวของสาขาบน Google Maps
export function reviewUrl(b) {
  return `https://search.google.com/local/writereview?placeid=${b.placeId}`;
}

// ลิงก์เปิดหมุดสาขาในแอป Google Maps (มือถือที่มีแอปจะเด้งเข้าแอปเอง ลูกค้าล็อกอินอยู่แล้ว)
// รูปแบบ Maps URLs ทางการ: query_place_id ชี้หมุดตรง ส่วน query เป็นพิกัดสำรอง
export function mapsAppUrl(b) {
  return `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}&query_place_id=${b.placeId}`;
}

export function getBranch(slug) {
  return BRANCHES.find((b) => b.slug === slug);
}
