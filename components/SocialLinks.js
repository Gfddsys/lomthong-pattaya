import { CONTACT } from '@/data/contact';

/* แถวไอคอนโซเชียลของร้าน (ท้ายเว็บ / หน้าสาขา)
   ไอคอนโลโก้จาก Simple Icons (สีทอง #F0D27C ให้เข้าธีม) เก็บในเว็บเอง public/images/icons/social/
   — เดิมดึงจาก cdn.simpleicons.org ทำให้มือถือต้องต่อเซิร์ฟเวอร์นอกอีกเจ้าตอนเปิดหน้าสาขา
   facebookUrl ส่งเข้ามาแทนได้ เช่น หน้าสาขาเนินพลับหวานใช้เพจ Facebook ของสาขา 2 */

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
            {/* eslint-disable-next-line @next/next/no-img-element -- ไอคอน SVG เล็ก next/image ไม่ช่วยอะไร */}
            <img src={`/images/icons/social/${it.icon}.svg`} alt="" width={20} height={20} loading="lazy" />
          </a>
        </li>
      ))}
    </ul>
  );
}
