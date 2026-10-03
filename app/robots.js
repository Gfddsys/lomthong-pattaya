import { SITE_URL } from "@/data/site";
/* ============================================
   Robots.txt - บอก Google Bot ว่าจะเข้าถึงหน้าไหนได้บ้าง
   ============================================ */

export default function robots() {
  const baseUrl = SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
