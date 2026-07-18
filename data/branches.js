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
    address: "137 ถ.พัทยาใต้ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150",
    streetAddress: "137 ถ.พัทยาใต้ ต.หนองปรือ",
    locality: "บางละมุง",
    region: "ชลบุรี",
    postalCode: "20150",
    lat: 12.9187667,
    lng: 100.8927284,
    hours: "เปิดทุกวัน 10:00 - 20:00 น.",
    reviews: 10,
    mapEmbedUrl:
      "https://maps.google.com/maps?q=12.9187667,100.8927284&z=17&hl=th&output=embed",
    mapUrl: "https://maps.app.goo.gl/srotj15xvzwfWi9M6",
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
    reviews: 34,
    mapEmbedUrl:
      "https://maps.google.com/maps?q=12.9317188,100.906533&z=17&hl=th&output=embed",
    mapUrl: "https://maps.app.goo.gl/9vx9GVm6sDBE8RGXA",
  },
];

export function getBranch(slug) {
  return BRANCHES.find((b) => b.slug === slug);
}
