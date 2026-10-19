import { servicesData } from "../data/services";
import { BRANCHES } from "../data/branches";
import { AREAS } from "../data/areas";
import { getAutoArticles } from "../lib/articles";
import { SITE_URL } from "@/data/site";
import { EN_PAGES, EN_FOR_TH } from "@/data/enPages";
import { WATCH_BRANDS } from "@/data/watchBrands";

export default function sitemap() {
  const baseUrl = SITE_URL;
  // วันแก้ไขเนื้อหาจริงครั้งล่าสุด — อัปเดตค่านี้เมื่อมีการแก้เนื้อหาเว็บครั้งใหญ่
  // (อย่าใช้ new Date() เพราะจะทำให้ lastmod ขยับทุกครั้งที่ regenerate = โกหก Googlebot)
  const LASTMOD = new Date("2026-10-19"); // 19 ต.ค. ขยายหน้าบริการ + หน้าสาขา
  const AREAS_LASTMOD = new Date("2026-10-20"); // 20 ต.ค. เพิ่ม 4 ย่าน (หนองปรือ พัทยากลาง ห้วยใหญ่ แหลมฉบัง)
  const EN_LASTMOD = new Date("2026-10-06"); // วันที่เพิ่มหน้าภาษาอังกฤษ /en
  // หน้าแรกภาษาไทย ↔ หน้าภาษาอังกฤษ เป็นคู่ภาษากัน (hreflang)
  const LANGS = { th: baseUrl, en: `${baseUrl}/en` };

  // คู่ภาษา ไทย ↔ อังกฤษ ของหน้าที่มีฉบับอังกฤษ (data/enPages.js)
  const pairLangs = (thPath) => ({ th: `${baseUrl}${thPath}`, en: `${baseUrl}${EN_FOR_TH[thPath]}` });

  const servicePages = servicesData.map((service) => {
    const path = `/services/${service.slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
      ...(EN_FOR_TH[path] && { alternates: { languages: pairLangs(path) } }),
    };
  });

  const EN_GUIDES_LASTMOD = new Date("2026-10-19"); // วันที่เพิ่มหน้าอังกฤษชุดที่ 2
  const enGuidePages = [
    ...EN_PAGES.map((p) => ({ url: `${baseUrl}/en/${p.slug}`, langs: p.thPath ? pairLangs(p.thPath) : null })),
    { url: `${baseUrl}/en/gold-price-today`, langs: pairLangs("/rakha-thong-wan-nee") },
  ].map(({ url, langs }) => ({
    url,
    lastModified: EN_GUIDES_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(langs && { alternates: { languages: langs } }),
  }));

  // บทความอัตโนมัติจาก content/articles/*.json — เพิ่มเข้า sitemap เองโดยไม่ต้องแก้ไฟล์นี้
  const autoArticlePages = getAutoArticles().map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.updatedIso),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const branchPages = BRANCHES.map((b) => ({
    url: `${baseUrl}/branch/${b.slug}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const areaPages = AREAS.map((a) => ({
    url: `${baseUrl}/area/${a.slug}`,
    lastModified: AREAS_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: LASTMOD,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: LANGS },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: EN_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: LANGS },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // ราคาเปลี่ยนทุกวัน → lastmod = วันนี้ (เนื้อหาเปลี่ยนจริง ไม่ได้หลอก Googlebot)
      url: `${baseUrl}/rakha-thong-wan-nee`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: pairLangs("/rakha-thong-wan-nee") },
    },
    {
      // หน้ารวม 2 สาขาสำหรับคำค้น "…ใกล้ฉัน" (เพิ่ม 20 ต.ค. 2569)
      url: `${baseUrl}/ran-lomthong-klai-chan`,
      lastModified: new Date("2026-10-20"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // หน้ารับซื้อนาฬิการายแบรนด์ (data/watchBrands.js)
    ...WATCH_BRANDS.map((b) => ({
      url: `${baseUrl}/rap-sue-nalika/${b.slug}`,
      lastModified: new Date("2026-10-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...enGuidePages,
    ...branchPages,
    ...areaPages,
    ...servicePages,
    ...autoArticlePages,
  ];
}
