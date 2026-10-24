/* รอจนจอแรกแสดงแล้ว (First Contentful Paint) ค่อยทำงานที่ไม่จำเป็นต่อจอแรก เช่น ดึงราคาทองผ่าน API
   - มือถือจริงส่วนใหญ่จอแรกขึ้นก่อนโค้ดหน้าเว็บพร้อมอยู่แล้ว → resolve ทันที ลูกค้าไม่ต้องรอเพิ่ม
   - กรณีจอแรกขึ้นช้ากว่าโค้ด (เช่นเครื่องทดสอบ PageSpeed) งานเหล่านี้จะไม่ไปแย่งเน็ต/ถูกนับรวมในเวลาโหลดจอแรก
   - เบราว์เซอร์เก่าที่ไม่รองรับ หรือรอนานเกิน maxWait → ทำเลย */
export function afterFirstPaint(maxWait = 3000) {
  return new Promise((resolve) => {
    const P = window.PerformanceObserver;
    if (!P || !P.supportedEntryTypes || !P.supportedEntryTypes.includes('paint')) return resolve();
    if (performance.getEntriesByName('first-contentful-paint').length) return resolve();
    let timer = 0;
    const obs = new P((list) => {
      if (list.getEntriesByName('first-contentful-paint').length) done();
    });
    const done = () => {
      obs.disconnect();
      clearTimeout(timer);
      resolve();
    };
    obs.observe({ type: 'paint', buffered: true });
    timer = setTimeout(done, maxWait);
  });
}
