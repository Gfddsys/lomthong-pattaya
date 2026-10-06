/* ============================================
   ราคาทอง/เงิน — ใช้ร่วมกัน 3 ที่:
   - app/api/gold-price/route.js  (การ์ดราคาบนหน้าแรก ดึงฝั่ง client)
   - app/rakha-thong-wan-nee      (หน้าราคาทองวันนี้ render ฝั่ง server ให้ Google อ่านได้)
   - app/embed/gold-price         (กล่องราคาทองที่เว็บอื่นเอาไปติด)
   ============================================
   ที่มา: feed ของ thaigold.info ซึ่งรวมราคาประกาศของสมาคมค้าทองคำ (แถวชื่อ "สมาคมฯ")
   ⚠️ ราคาทองรูปพรรณและราคาแท่งเงิน "คำนวณโดยประมาณ" ไม่ใช่ราคาประกาศ — ทุกที่ที่แสดงต้องบอกว่าเป็นราคาประมาณ
*/

const FEED_URL = "https://www.thaigold.info/RealTimeDataV2/gtdata_.txt";
const REVALIDATE_SECONDS = 60 * 5;

const toNum = (v) => {
  const n = parseFloat(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const fmt = (n) => Math.round(n).toLocaleString("th-TH");

export async function getGoldPrice() {
  const response = await fetch(FEED_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error(`Gold price feed HTTP ${response.status}`);
  const data = await response.json();

  // หาแถวราคาสมาคมจากชื่อก่อน (แน่นอนกว่า) ถ้า feed เปลี่ยนชื่อค่อยถอยไปหาแถวที่ราคาอยู่ในช่วงทองบาทละ
  const assoc =
    data.find((item) => String(item.name).includes("สมาคม")) ||
    data.find((item) => toNum(item.ask) > 20000 && toNum(item.ask) < 200000);
  if (!assoc) throw new Error("Could not find association gold price in feed");

  const barBuy = toNum(assoc.bid);
  const barSell = toNum(assoc.ask);
  if (!barBuy || !barSell) throw new Error("Association gold price is empty");

  // เวลาอัปเดตจริงจาก feed: bid = unix timestamp (วินาที), ask = "HH:MM"
  const update = data.find((item) => item.name === "Update");
  const updatedAt = toNum(update?.bid) > 1e9 ? new Date(toNum(update.bid) * 1000) : new Date();
  const date = updatedAt.toLocaleDateString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time =
    update?.ask ||
    updatedAt.toLocaleTimeString("th-TH", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });

  // ทองรูปพรรณ (ประมาณ): ขายออก = แท่งขาย + 500, รับซื้อ = แท่งรับซื้อ × 0.985
  const ornamentSell = barSell + 500;
  const ornamentBuy = Math.floor((barBuy * 0.985) / 10) * 10;

  // แท่งเงิน 99.99% ต่อกิโลกรัม (ประมาณ) จากราคาโลก USD/ออนซ์ × อัตราแลกเปลี่ยน
  const silverItem = data.find((item) => item.name === "Silver");
  const thbItem = data.find((item) => item.name === "THB");
  const OZ_PER_KG = 32.1507;
  const silverSpotUsd = toNum(silverItem?.bid) || toNum(silverItem?.ask) || 57;
  const thbRate = toNum(thbItem?.bid) || toNum(thbItem?.ask) || 33.5;
  const silverBaseKg = silverSpotUsd * OZ_PER_KG * thbRate;
  const silverSell = Math.round(silverBaseKg / 10) * 10;
  const silverBuy = Math.round((silverBaseKg * 0.965) / 10) * 10;

  return {
    date,
    time,
    updatedIso: updatedAt.toISOString(),
    diff: assoc.diff,
    // ตัวเลขดิบ ใช้คำนวณ (เช่น เครื่องคิดเลขประเมินราคาขายทอง)
    raw: { barBuy, barSell, ornamentBuy, ornamentSell },
    gold_bar: { buy: fmt(barBuy), sell: fmt(barSell) },
    gold_ornament: { buy: fmt(ornamentBuy), sell: fmt(ornamentSell), estimated: true },
    silver: {
      buy: fmt(silverBuy),
      sell: fmt(silverSell),
      vat: fmt(silverSell * 1.07),
      spot_diff: silverItem?.diff ?? "",
      estimated: true,
    },
  };
}
