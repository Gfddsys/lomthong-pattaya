import { BRANCHES, mapsAppUrl } from '@/data/branches';
import { reviewCount, reviewRating, REVIEW_CHECKED_AT } from '@/data/reviewStats';

/* ดาว + จำนวนรีวิว Google ของแต่ละสาขา (ตัวเลขจาก data/review-history.json บันทึกทุกคืน → อัปเดตเองหลัง deploy)
   กดแล้วเปิดหมุดสาขานั้นใน Google Maps ให้ลูกค้าอ่านรีวิวเองได้ */
export default function BranchRatings() {
  return (
    <div className="branch-ratings branch-ratings--cards">
      {BRANCHES.map((b) => {
        const n = reviewCount(b.slug);
        const rating = reviewRating(b.slug);
        return (
          <a
            key={b.slug}
            href={mapsAppUrl(b)}
            target="_blank"
            rel="noopener noreferrer"
            className="branch-rating"
            aria-label={rating ? `${b.shortName} คะแนน ${rating} จาก 5 ดาว ${n} รีวิวบน Google` : n > 0 ? `${b.shortName} ${n} รีวิวบน Google` : `${b.shortName} สาขาใหม่ ดูหมุดบน Google Maps`}
          >
            <span className="branch-rating-name">{b.shortName}</span>
            {n > 0 ? (
              <>
                {/* ดาวโชว์เมื่อบันทึกคะแนนจริงของหมุดแล้วเท่านั้น */}
                {rating && (
                  <span className="branch-rating-score">
                    <span className="branch-rating-stars" aria-hidden="true">★★★★★</span>
                    <b>{rating}</b>
                  </span>
                )}
                <span className="branch-rating-count">
                  <b>{n}</b> รีวิวบน Google
                </span>
              </>
            ) : (
              // สาขาใหม่ยังไม่มีรีวิว → ไม่โชว์ดาวหรือ "0 รีวิว"
              <span className="branch-rating-count">สาขาใหม่ · รอรีวิวแรกจากลูกค้า</span>
            )}
          </a>
        );
      })}
      <p className="branch-ratings-note">อัปเดตจาก Google Maps ทุกวัน · ล่าสุด {REVIEW_CHECKED_AT}</p>
    </div>
  );
}
