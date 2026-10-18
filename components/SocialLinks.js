import { CONTACT } from '@/data/contact';

/* แถวไอคอนโซเชียลของร้าน (ท้ายเว็บ / หน้าสาขา)
   ไอคอนโลโก้จาก Simple Icons ผ่าน CDN แบบเดียวกับปุ่ม LINE ในเว็บ ใส่สีทองให้เข้าธีม
   facebookUrl ส่งเข้ามาแทนได้ เช่น หน้าสาขาเนินพลับหวานใช้เพจ Facebook ของสาขา 2 */
const ICON_COLOR = 'F0D27C';

export default function SocialLinks({ facebookUrl = CONTACT.facebookUrl, className = '' }) {
  const items = [
    { name: 'LINE', icon: 'line', href: CONTACT.lineUrl, label: `LINE ${CONTACT.lineId}` },
    { name: 'Facebook', icon: 'facebook', href: facebookUrl, label: 'เพจ Facebook' },
    { name: 'TikTok', icon: 'tiktok', href: CONTACT.tiktokUrl, label: 'TikTok @hengsiri.official' },
    { name: 'YouTube', icon: 'youtube', href: CONTACT.youtubeUrl, label: 'YouTube หลอมทองพัทยา' },
    { name: 'Instagram', icon: 'instagram', href: CONTACT.instagramUrl, label: 'Instagram @hengsiri.official' },
  ];
  return (
    <ul className={`social-links ${className}`} aria-label="ช่องทางโซเชียลของร้าน">
      {items.map((it) => (
        <li key={it.name}>
          <a href={it.href} target="_blank" rel="noopener noreferrer me" aria-label={it.label} title={it.label}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG เล็กจาก CDN, next/image ไม่ช่วยอะไร */}
            <img src={`https://cdn.simpleicons.org/${it.icon}/${ICON_COLOR}`} alt="" width={20} height={20} loading="lazy" />
          </a>
        </li>
      ))}
    </ul>
  );
}
