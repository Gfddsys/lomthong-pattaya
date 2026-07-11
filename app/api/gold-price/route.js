import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.thaigold.info/RealTimeDataV2/gtdata_.txt', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 60 * 5 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gold price data');
    }

    const data = await response.json();
    
    // Find the Association Gold Price (usually index 4, named "Ҥ" or similar)
    // We can also just find the one with the bid/ask around current gold prices
    const goldBarData = data.find(item => item.ask && parseInt(item.ask) > 20000 && parseInt(item.ask) < 100000);
    const updateTimeData = data.find(item => item.name === 'Update');

    if (!goldBarData) {
      throw new Error('Could not parse gold price');
    }

    const goldBarBuy = parseInt(goldBarData.bid.toString().replace(/,/g, ''));
    const goldBarSell = parseInt(goldBarData.ask.toString().replace(/,/g, ''));
    const diff = goldBarData.diff;
    const updateTime = updateTimeData ? updateTimeData.ask : '';

    // Calculate ornament prices (Standard Thai market calculation)
    // Ornament Sell = Bar Sell + 500
    // Ornament Buy = Bar Buy * 0.985 (approximate minimum by law)
    const goldOrnamentSell = goldBarSell + 500;
    const goldOrnamentBuy = Math.floor((goldBarBuy * 0.985) / 10) * 10; // Round to nearest 10

    // ---- Silver (คำนวณราคาแท่งเงิน 99.99% ต่อกิโลกรัมจากราคาโลก) ----
    // Silver = ราคาโลกหน่วย USD ต่อทรอยออนซ์, THB = อัตราแลกเปลี่ยน
    // 1 กิโลกรัม = 32.1507 ทรอยออนซ์
    // ทำให้ทนทาน: บางครั้ง feed ส่ง bid ว่าง (ตลาดปิด/ดีเลย์) ให้ใช้ ask แทน
    // ถ้าไม่มีค่าเลยจริงๆ ใช้ค่าประมาณล่าสุดกันการ์ดหาย (เป็นราคาอ้างอิงอยู่แล้ว)
    const toNum = (v) => {
      const n = parseFloat(String(v ?? '').replace(/,/g, ''));
      return Number.isFinite(n) ? n : 0;
    };
    const silverItem = data.find((item) => item.name === 'Silver');
    const thbItem = data.find((item) => item.name === 'THB');
    const OZ_PER_KG = 32.1507;
    const SILVER_SPOT_FALLBACK = 57; // USD/oz โดยประมาณ (สำรองกันการ์ดหาย)
    const THB_FALLBACK = 33.5;
    const silverSpotUsd =
      toNum(silverItem?.bid) || toNum(silverItem?.ask) || SILVER_SPOT_FALLBACK;
    const thbRate = toNum(thbItem?.bid) || toNum(thbItem?.ask) || THB_FALLBACK;
    const silverBaseKg = silverSpotUsd * OZ_PER_KG * thbRate; // บาท/กก. เนื้อ 99.99%
    const silverSell = Math.round(silverBaseKg / 10) * 10;
    const silverBuy = Math.round((silverBaseKg * 0.965) / 10) * 10; // สเปรดรับซื้อโดยประมาณ
    const silverVat = Math.round(silverSell * 1.07); // ราคารวม VAT 7%
    const silver = {
      buy: silverBuy.toLocaleString('th-TH'),
      sell: silverSell.toLocaleString('th-TH'),
      vat: silverVat.toLocaleString('th-TH'),
      spot_diff: silverItem?.diff ?? '',
    };

    return NextResponse.json({
      status: 'success',
      data: {
        date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: updateTime,
        diff: diff,
        gold_bar: {
          buy: goldBarBuy.toLocaleString('th-TH'),
          sell: goldBarSell.toLocaleString('th-TH')
        },
        gold_ornament: {
          buy: goldOrnamentBuy.toLocaleString('th-TH'),
          sell: goldOrnamentSell.toLocaleString('th-TH')
        },
        silver: silver
      }
    });

  } catch (error) {
    console.error('Gold Price Fetch Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'ไม่สามารถดึงข้อมูลราคาทองคำได้ในขณะนี้' },
      { status: 500 }
    );
  }
}
