import { videosFor } from '@/data/videos';
import { CONTACT } from '@/data/contact';
import { SITE_URL } from '@/data/site';
import ShortCard from './ShortCard';

/* กล่องคลิปสั้น YouTube ของร้าน + ข้อมูล VideoObject ให้ Google
   แต่ละคลิปโชว์แค่รูปปก กดแล้วค่อยโหลดตัวเล่น (หน้าเว็บไม่ช้าลง)
   page: "home" หรือ slug หน้าบริการ ตามที่ระบุใน data/videos.js */
export default function VideoShorts({ page, title = 'คลิปจากหน้าร้าน', pageUrl, limit = 4 }) {
  const videos = videosFor(page).slice(0, limit);
  if (videos.length === 0) return null;

  const ld = {
    '@context': 'https://schema.org',
    '@graph': videos.map((v) => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      uploadDate: v.uploadDate,
      duration: `PT${v.seconds}S`,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      url: `https://www.youtube.com/shorts/${v.id}`,
      publisher: { '@id': `${SITE_URL}/#business` },
      ...(pageUrl ? { isPartOf: { '@type': 'WebPage', '@id': `${SITE_URL}${pageUrl}` } } : {}),
    })),
  };

  return (
    <section className="video-shorts" aria-labelledby={`shorts-${page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="video-shorts-head">
        <h2 id={`shorts-${page}`}>{title}</h2>
        <a href={CONTACT.youtubeUrl} target="_blank" rel="noopener noreferrer" className="video-shorts-follow">
          ดูคลิปทั้งหมดบน YouTube →
        </a>
      </div>
      <div className="video-shorts-grid">
        {videos.map((v) => (
          <ShortCard key={v.id} id={v.id} title={v.title} />
        ))}
      </div>
    </section>
  );
}
