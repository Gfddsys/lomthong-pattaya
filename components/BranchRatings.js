import { BRANCHES, mapsAppUrl } from '@/data/branches';
import { reviewCount, reviewRating, REVIEW_CHECKED_AT } from '@/data/reviewStats';

/* ดาว + จำนวนรีวิว Google ของแต่ละสาขา (ตัวเลขจาก data/review-history.json บันทึกทุกคืน → อัปเดตเองหลัง deploy)
   กดแล้วเปิดหมุดสาขานั้นใน Google Maps ให้ลูกค้าอ่านรีวิวเองได้ */
export default function BranchRatings() {
  return (
    <div className="branch-ratings branch-ratings--cards">
      {BRANCHES.map((b) => (
        <a
          key={b.slug}
          href={mapsAppUrl(b)}
          target="_blank"
          rel="noopener noreferrer"
          className="branch-rating"
          aria-label={`${b.shortName} คะแนน ${reviewRating(b.slug)} จาก 5 ดาว ${reviewCount(b.slug)} รีวิวบน Google`}
        >
          <span className="branch-rating-name">{b.shortName}</span>
          <span className="branch-rating-score">
            <span className="branch-rating-stars" aria-hidden="true">★★★★★</span>
            <b>{reviewRating(b.slug)}</b>
          </span>
          <span className="branch-rating-count">
            <b>{reviewCount(b.slug)}</b> รีวิวบน Google
          </span>
        </a>
      ))}
      <p className="branch-ratings-note">อัปเดตจาก Google Maps ทุกวัน · ล่าสุด {REVIEW_CHECKED_AT}</p>
    </div>
  );
}
