import { getGoldPrice } from "@/lib/goldPrice";
import { SITE_URL } from "@/data/site";
import AutoRefresh from "@/components/AutoRefresh";

/* กล่องราคาทองสำหรับเว็บอื่นเอาไปติดด้วย <iframe> (โค้ดอยู่ที่หน้า /rakha-thong-wan-nee)
   - ไม่ให้ Google index หน้านี้ (กันเนื้อหาซ้ำกับหน้าราคาทองหลัก) แต่ให้ตามลิงก์ได้
   - render ฝั่ง server ทุก 5 นาที + รีเฟรชเองทุก 10 นาทีถ้ามีคนเปิดค้างไว้ */
export const revalidate = 300;

export const metadata = {
  title: { absolute: "ราคาทองวันนี้ | หลอมทองพัทยา" },
  robots: { index: false, follow: true },
};

export default async function GoldPriceEmbed() {
  let p = null;
  try {
    p = await getGoldPrice();
  } catch {
    p = null;
  }

  return (
    <div className="gp-embed">
      <AutoRefresh seconds={600} />
      <div className="gp-embed-head">
        <strong>ราคาทองวันนี้</strong>
        {p && (
          <span>
            {p.date} · {p.time} น.
          </span>
        )}
      </div>

      {p ? (
        <table className="gp-embed-table">
          <thead>
            <tr>
              <th scope="col">ทอง 96.5%</th>
              <th scope="col">รับซื้อ</th>
              <th scope="col">ขายออก</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ทองคำแท่ง</td>
              <td>{p.gold_bar.buy}</td>
              <td>{p.gold_bar.sell}</td>
            </tr>
            <tr>
              <td>ทองรูปพรรณ*</td>
              <td>{p.gold_ornament.buy}</td>
              <td>{p.gold_ornament.sell}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="gp-embed-error">ไม่สามารถดึงราคาทองได้ในขณะนี้</p>
      )}

      <div className="gp-embed-foot">
        <span>ทองคำแท่งอ้างอิงสมาคมค้าทองคำ · *ทองรูปพรรณราคาประมาณ</span>
        <a href={`${SITE_URL}/rakha-thong-wan-nee`} target="_blank" rel="noopener">
          หลอมทองพัทยา
        </a>
      </div>
    </div>
  );
}
