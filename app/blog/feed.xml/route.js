import { SITE_URL } from "@/data/site";
import { getAutoArticles } from "@/lib/articles";

/* ============================================
   /blog/feed.xml — ฟีด RSS ของบทความ (ลิงก์ไว้ใน <head> ของทุกหน้า: app/layout.js)
   ============================================
   ที่มา: geo audit 19 พ.ย. 2569 · ช่วยให้ระบบ AI และโปรแกรมอ่านข่าวรู้ว่ามีบทความใหม่เมื่อไหร่
   สร้างตอน build (force-static) เหมือน sitemap */
export const dynamic = "force-static";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const articles = getAutoArticles().slice(0, 50);
  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/blog/${a.slug}`;
      return [
        "    <item>",
        `      <title>${esc(a.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${a.dateIso}T09:00:00+07:00`).toUTCString()}</pubDate>`,
        `      <description>${esc(a.excerpt || a.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>บทความ หลอมทองพัทยา (เฮงศิริ)</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>ความรู้เรื่องขายทอง หลอมทอง ทองเค เงินแท้ และวิธีคิดราคา จากร้านหลอมทองพัทยา</description>
    <language>th</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
