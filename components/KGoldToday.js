import Link from "next/link";
import { getGoldPrice } from "@/lib/goldPrice";
import { KARATS, perGram } from "@/lib/goldKarats";
import { MELT_BONUS } from "@/data/meltBonus";

/* ============================================
   กล่องราคาทองเคต่อกรัม "ของวันนี้" สำหรับวางในบทความ (บล็อก { "type": "liveGoldK" })
   ============================================
   ที่มา (Search Console 28 วันถึง 18 พ.ย. 2569): คำแบบ "ทอง75 กรัมละกี่บาท" "ราคาทอง 75 เปอร์เซ็นต์ วันนี้"
   ราว 2,500 ครั้ง ไปขึ้นที่บทความวิธีคิดราคาทอง ซึ่งเดิมมีแต่สูตร ไม่มีตัวเลขของวันนี้ → ใส่ตัวเลขจริงให้ตอบได้ทันที
   render ฝั่ง server: fetch ใน getGoldPrice (revalidate 5 นาที) ทำให้หน้าที่มีกล่องนี้ (และหน้านั้นหน้าเดียว) อัปเดตเองแบบ ISR
   ตัวเลขใช้สูตรเดียวกับตารางในหน้าราคาทองวันนี้ (lib/goldKarats.js) จึงตรงกันทุกหน้า */
const fmtBaht = (n) => Math.round(n).toLocaleString("th-TH");

export default async function KGoldToday() {
  let p = null;
  try {
    p = await getGoldPrice();
  } catch {
    p = null;
  }

  // feed ราคาล่ม: ไม่โชว์ตัวเลขเก่า/ว่าง พาไปหน้าราคาทองวันนี้แทน
  if (!p) {
    return (
      <p>
        ดูราคาทองเค 18K 14K 9K ต่อกรัมของวันนี้ได้ที่{" "}
        <Link href="/rakha-thong-wan-nee#rakha-thong-k">ตารางราคาทองต่อกรัม หน้าราคาทองวันนี้</Link>
      </p>
    );
  }

  return (
    <>
      <p>
        อัปเดต {p.date} เวลา {p.time} น. ·{" "}
        <strong>ทอง 75% (18K) กรัมละประมาณ {fmtBaht(perGram(p.raw.ornamentBuy, 0.75))} บาท</strong> ตามราคารับซื้อทองรูปพรรณ
        ถ้าหลอมขายที่ร้านเรา ได้กรัมละประมาณ <strong>{fmtBaht(perGram(p.raw.meltBuy, 0.75))} บาท</strong>
      </p>
      <div className="blog-table-wrap">
        <table className="blog-table gp-table">
          <caption>ราคาทองต่อ 1 กรัม ตามราคาวันนี้ (ประมาณ หน่วย: บาท)</caption>
          <thead>
            <tr>
              <th scope="col">ชนิดทอง</th>
              <th scope="col">
                ราคารับซื้อ<span style={{ whiteSpace: "nowrap" }}>รูปพรรณ</span>
              </th>
              <th scope="col">
                หลอมขาย<span style={{ whiteSpace: "nowrap" }}>ที่ร้านเรา</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {KARATS.map((k) => (
              <tr key={k.id}>
                <td>
                  {k.label}
                  <span className="gp-gram">{k.note}</span>
                </td>
                <td>{fmtBaht(perGram(p.raw.ornamentBuy, k.purity))}</td>
                <td>
                  <strong>{fmtBaht(perGram(p.raw.meltBuy, k.purity))}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="gp-source">
        คิดจากราคารับซื้อทองรูปพรรณบาทละ {p.gold_ornament.buy} บาท ÷ 15.16 กรัม × สัดส่วนเนื้อทองเทียบทอง 96.5%
        ช่องหลอมขายคิดจากราคารับซื้อทองคำแท่งบาทละ {p.gold_bar.buy} บาท + {MELT_BONUS} ตามสัดส่วนเนื้อทอง
        ราคาจริงขึ้นกับเปอร์เซ็นต์ที่ตรวจด้วยเครื่อง XRF ต่อหน้าคุณ ·{" "}
        <Link href="/rakha-thong-wan-nee#rakha-thong-k">ดูราคาตามน้ำหนักและเครื่องคิดเลข</Link>
      </p>
    </>
  );
}
