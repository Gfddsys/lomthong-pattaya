import { NextResponse } from 'next/server';
import { getGoldPrice } from '@/lib/goldPrice';

// ตรรกะดึง/คำนวณราคาอยู่ใน lib/goldPrice.js (ใช้ร่วมกับหน้าราคาทองวันนี้และกล่อง embed)
export async function GET() {
  try {
    const data = await getGoldPrice();
    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    console.error('Gold Price Fetch Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'ไม่สามารถดึงข้อมูลราคาทองคำได้ในขณะนี้' },
      { status: 500 }
    );
  }
}
