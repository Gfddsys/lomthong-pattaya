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
  // ---- รอบ 2 (12 ต.ค. 2026): บทความยุคแรกที่เขียนเป็นโค้ดแยก ซ้ำกับบทความ JSON ----
  // กลุ่มทองเค
  "ran-rub-sue-thong-k-pattaya-18k-14k-9k": ["thong-k-9k-14k-18k-rap-sue-pattaya"],
  // กลุ่มทองหัก / ทองเก่า
  "where-to-sell-broken-gold-pattaya": ["thong-khat-thong-hak-rap-sue-mai", "thong-kao-pattaya-khay-thi-nai"],
  // กลุ่มตรวจทองฟรี
  "xrf-gold-testing-pattaya-free": ["borikar-truat-thong-free-pattaya"],
  // กลุ่มหลอมทอง (คำว่า "หลอมทองพัทยา" ให้หน้า /rap-lomthong-pattaya เป็นเจ้าของ)
  "pattaya-gold-melting-service-time": ["lomthong-khao-jai-ngai", "lomthong-pattaya-best-price", "lomthong-process-pattaya"],
  // กลุ่มร้านไหนดี / ขายที่ไหนราคาสูง
  "ran-thong-pattaya-nai-di": ["khai-thong-thi-nai-rakha-sung-pattaya", "rap-sue-thong-pattaya"],
};

// หน้าเก่าที่ย้ายไปหน้าอื่นที่ไม่ใช่บทความ
const MOVED_PAGES = {
  // "ราคาทองวันนี้ 2569" แย่งคำค้น "ราคาทองวันนี้" กับหน้าราคาทองที่อัปเดตอัตโนมัติ
  "/blog/gold-price-trend": "/rakha-thong-wan-nee",
  // บทความรวมหลายพื้นที่ซ้อนกับหน้าพื้นที่บริการ /area/* ที่ละเอียดกว่า
  "/blog/rap-sue-thong-jomtien-naklua-banglamung": "/area/jomtien",
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
    ).concat(
      Object.entries(MOVED_PAGES).map(([source, destination]) => ({ source, destination, permanent: true }))
    );
  },
};

export default nextConfig;
