/* ============================================
   Redirect บทความที่ถูกรวม (ต.ค. 2026)
   ============================================
   บทความเรื่องเดียวกันหลายหน้าแย่งอันดับกันเองใน Google (keyword cannibalization)
   จึงรวมแต่ละกลุ่มเป็นบทความเดียว แล้ว redirect ถาวร (308) จาก URL เก่า →
   คนที่เข้าลิงก์เก่าไม่เจอหน้า 404 และ Google ย้ายพลัง SEO ของหน้าเก่าไปรวมที่หน้าใหม่
   ⚠️ ห้ามลบรายการเหล่านี้ แม้ไฟล์บทความเก่าจะไม่มีแล้ว (ลิงก์เก่ายังอยู่ใน Google/Facebook/LINE)
*/
const MERGED_ARTICLES = {
  // กลุ่มรับเงินสด / โอน
  "pattaya-gold-shop-payment-cash-vs-transfer": [
    "pattaya-gold-shop-payment-cash-immediately",
    "pattaya-gold-shop-payment-cash-receive-same-day",
    "pattaya-gold-shop-payment-method-cash-transfer",
    "pattaya-gold-shop-instant-cash-no-wait",
  ],
  // กลุ่มเวลาเปิด / วันอาทิตย์ / วันหยุด
  "pattaya-gold-shop-open-daily-ten-am-eight-pm": [
    "pattaya-gold-shop-branch-open-hours-everyday",
    "pattaya-gold-shop-open-daily-evening-service",
    "pattaya-gold-shop-near-me-open-sunday",
    "pattaya-gold-shop-open-sunday-holidays",
  ],
  // กลุ่มเอกสาร / ใบเสร็จ / บัตรประชาชน
  "khai-thong-tong-chai-ekasan-arai-pattaya": [
    "pattaya-gold-shop-license-id-card",
    "pattaya-gold-shop-no-receipt-card-id",
    "pattaya-gold-shop-no-receipt-sale",
    "pattaya-gold-shop-without-box-certificate",
    "khai-thong-mai-mee-bai-set",
  ],
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return Object.entries(MERGED_ARTICLES).flatMap(([target, oldSlugs]) =>
      oldSlugs.map((old) => ({
        source: `/blog/${old}`,
        destination: `/blog/${target}`,
        permanent: true,
      }))
    );
  },
};

export default nextConfig;
