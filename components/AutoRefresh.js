'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ดึงข้อมูลหน้าใหม่ทุก ๆ `seconds` วินาที (ใช้กับหน้าราคาทองที่เปิดค้างไว้) */
export default function AutoRefresh({ seconds = 600 }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(id);
  }, [router, seconds]);
  return null;
}
