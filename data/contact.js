/* ============================================
   ข้อมูลติดต่อร้าน - ใช้ร่วมกันทั้งเว็บ
   ============================================
   หมายเหตุ: ตอนนี้เบอร์โทร/LINE/Facebook ในเว็บยังไม่ตรงกันทุกจุด
   (Navbar, Footer, Contact, layout.js schema ใช้ค่าต่างกันอยู่)
   ให้แก้ค่าด้านล่างนี้เป็นข้อมูลจริงของร้าน แล้วค่อยๆ เปลี่ยนจุดอื่นๆ
   ให้มาอ้างอิงจากไฟล์นี้แทน เพื่อให้ข้อมูลร้านตรงกันทุกที่ (สำคัญมากต่อ Local SEO)
*/

export const CONTACT = {
  phoneDisplay: "092-883-9799", // ← เบอร์จากรูปโปรของร้าน (แก้ได้ถ้าไม่ตรง)
  phoneHref: "tel:0928839799", // ← เบอร์โทรจริง (ไม่มีขีด)
  lineId: "@hengsiri", // ← TODO: ยืนยัน LINE ID จริง
  lineUrl: "https://line.me/ti/p/~@hengsiri", // ← TODO: ยืนยันลิงก์ LINE จริง
  facebookUrl: "https://www.facebook.com/hengsiripattaya", // เพจ Facebook จริงของร้าน
  googleReviewUrl: "https://maps.app.goo.gl/HbUrUHzEVS9H6z4G7", // ลิงก์รีวิวจริงบน Google
  googleMapsUrl: "https://maps.app.goo.gl/U9Z2BXarqugMs9UL6", // ลิงก์หมุดร้านบน Google Maps (เปิด/นำทาง)
  // แผนที่ฝัง (embed) ค้นด้วยชื่อร้านจริง เพื่อโชว์หมุด+ชื่อร้านชัดเจน — ไม่ต้องใช้ API key
  mapEmbedUrl: "https://maps.google.com/maps?q=เฮงศิริรับซื้อทองและนาฬิกาพัทยา&z=17&hl=th&output=embed",
};
