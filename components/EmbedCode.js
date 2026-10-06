'use client';

import { useState } from 'react';

/* กล่องโค้ดสำหรับเว็บอื่นก๊อปไปติด + ปุ่มคัดลอก */
export default function EmbedCode({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // เบราว์เซอร์ไม่ให้สิทธิ์คลิปบอร์ด — ผู้ใช้ยังเลือกข้อความในกล่องแล้วก๊อปเองได้
    }
  };

  return (
    <div className="embed-code">
      <textarea readOnly value={code} rows={6} onFocus={(e) => e.target.select()} aria-label="โค้ดสำหรับติดเว็บไซต์" />
      <button type="button" className="btn btn-primary" onClick={copy}>
        {copied ? 'คัดลอกแล้ว ✓' : 'คัดลอกโค้ด'}
      </button>
    </div>
  );
}
