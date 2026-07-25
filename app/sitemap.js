import { servicesData } from "../data/services";
import { BRANCHES } from "../data/branches";
import { getAutoArticles } from "../lib/articles";

export default function sitemap() {
  const baseUrl = "https://www.xn--72c5ab1amkp1ctc0co.com"; // ← แก้เป็น URL จริงของคุณ
  // วันแก้ไขเนื้อหาจริงครั้งล่าสุด — อัปเดตค่านี้เมื่อมีการแก้เนื้อหาเว็บครั้งใหญ่
  // (อย่าใช้ new Date() เพราะจะทำให้ lastmod ขยับทุกครั้งที่ regenerate = โกหก Googlebot)
  const LASTMOD = new Date("2026-07-12");

  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // บทความอัตโนมัติจาก content/articles/*.json — เพิ่มเข้า sitemap เองโดยไม่ต้องแก้ไฟล์นี้
  const autoArticlePages = getAutoArticles().map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.dateIso),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const branchPages = BRANCHES.map((b) => ({
    url: `${baseUrl}/branch/${b.slug}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: LASTMOD,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rap-lomthong-pattaya`,
      lastModified: LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...branchPages,
    ...servicePages,
    ...autoArticlePages,
    {
      url: `${baseUrl}/blog/khai-thong-mai-mee-bai-set`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/wi-thi-kamnuan-rakha-khai-thong-kao`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/thong-khat-thong-hak-rap-sue-mai`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/khai-thong-thi-nai-rakha-sung-pattaya`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/rap-sue-thong-pattaya`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/thong-kao-pattaya-khay-thi-nai`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/borikar-truat-thong-free-pattaya`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/lomthong-pattaya-best-price`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/lomthong-process-pattaya`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/lomthong-khao-jai-ngai`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/check-real-gold`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/gold-price-trend`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/thong-k-9k-14k-18k-rap-sue-pattaya`,
      lastModified: LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
