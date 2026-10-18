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
  lineId: "@hengsiri", // ยืนยันกับเจ้าของร้านแล้ว 19 ต.ค. 2026
  lineUrl: "https://line.me/ti/p/~@hengsiri", // LINE จริงของร้าน (ยืนยันแล้ว)
  facebookUrl: "https://www.facebook.com/hengsiripattaya", // เพจ Facebook จริงของร้าน
  // บัญชีโซเชียลอื่นของร้าน (เจ้าของร้านยืนยัน 19 ต.ค. 2026) ใช้ทั้งปุ่มในเว็บและ sameAs ใน schema
  tiktokUrl: "https://www.tiktok.com/@hengsiri.official",
  youtubeUrl: "https://www.youtube.com/@%E0%B8%AB%E0%B8%A5%E0%B8%AD%E0%B8%A1%E0%B8%97%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B8%B1%E0%B8%97%E0%B8%A2%E0%B8%B2",
  instagramUrl: "https://www.instagram.com/hengsiri.official/",
  googleReviewUrl: "https://maps.app.goo.gl/HbUrUHzEVS9H6z4G7", // ลิงก์รีวิวจริงบน Google
  googleMapsUrl: "https://maps.app.goo.gl/U9Z2BXarqugMs9UL6", // ลิงก์หมุดร้านบน Google Maps (เปิด/นำทาง)
  // ลิงก์ Google Maps แบบถาวร (CID) — ใช้ใน schema เท่านั้น
  // ต่างจากลิงก์ maps.app.goo.gl ตรงที่ลิงก์นี้ "ไม่มีวันเปลี่ยน" และชี้ตรงไปที่ธุรกิจใน Google
  // ทำให้ Google/AI เชื่อมได้ว่า "เว็บนี้ = ร้านนี้ในแผนที่" (สำคัญมากต่อการถูก AI แนะนำ)
  googlePlaceUrl: "https://maps.google.com/?cid=7851014282260906235",
  // แผนที่ฝัง (embed) ค้นด้วยชื่อร้านจริง เพื่อโชว์หมุด+ชื่อร้านชัดเจน — ไม่ต้องใช้ API key
  mapEmbedUrl: "https://maps.google.com/maps?q=เฮงศิริรับซื้อทองและนาฬิกาพัทยา&z=17&hl=th&output=embed",
};
