/* ============================================
   Robots.txt - บอก Google Bot ว่าจะเข้าถึงหน้าไหนได้บ้าง
   ============================================ */

export default function robots() {
  const baseUrl = "https://www.xn--72c5ab1amkp1ctc0co.com"; // ← แก้เป็น URL จริงของคุณ

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
