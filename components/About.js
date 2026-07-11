import Image from 'next/image';
import { getUploadedImages } from '@/lib/getImage';

/* ============================================
   ส่วน "ยินดีต้อนรับ" หน้าแรก
   ============================================
   วางรูปหน้าร้านจริงได้ที่ public/images/uploads/about-shop/ (กี่รูปก็ได้ ไม่ต้องเปลี่ยนชื่อไฟล์)
   ตำแหน่งจุดสังเกตร้าน (location landmark) ยังเป็น TODO อยู่ด้านล่าง แก้ให้ตรงกับที่ตั้งจริง
*/
export default function About() {
  // ก่อนมีรูปจริง ใช้รูปตัวอย่างที่มีอยู่แล้วสลับกันไปก่อน เพื่อให้กริดดูมีเนื้อหา
  const photos = getUploadedImages('about-shop', [
    '/images/hero.png',
    '/images/gallery.png',
    '/images/inspection.png',
    '/images/blog-lomthong.png',
  ]);

  return (
    <section id="about" className="section section-dark">
      <div className="container">
        <div className="about-grid">
          {/* Left: Photo grid */}
          <div className="photo-grid-2x2 animate-on-scroll">
            {photos.slice(0, 4).map((src, index) => (
              <div key={index} className="photo-grid-tile">
                <Image
                  src={src}
                  alt={`บรรยากาศร้านหลอมทองพัทยา ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* Right: Text */}
          <div className="about-text animate-on-scroll animate-delay-100">
            <h2>
              ร้าน<span className="gold-text">หลอมทองพัทยา</span>
            </h2>
            <p>
              <strong>หลอมทองพัทยา</strong> ให้บริการรับหลอมทอง รับซื้อทองคำ
              ทองรูปพรรณ ทองเก่า ทองชำรุด และเครื่องประดับทุกชนิด ครอบคลุมพื้นที่
              <strong>พัทยา ชลบุรี บางละมุง ศรีราชา สัตหีบ จอมเทียน และนาเกลือ</strong>{" "}
              ด้วยมาตรฐานที่เน้นความโปร่งใส ซื่อสัตย์ และเป็นธรรมทุกขั้นตอน
              ตั้งแต่ตรวจเช็คเปอร์เซ็นต์ทองด้วยเครื่อง XRF ชั่งน้ำหนักต่อหน้า
              ไปจนถึงประเมินราคา ให้คุณมั่นใจว่าทองของคุณได้ราคาสูงเหมาะสมตามเนื้อทองจริง
            </p>
            <p>
              ไม่ว่าคุณจะ<strong>ขายทองเก่า ทองหัก ทองชำรุด</strong> เศษทอง ทองคำแท่ง
              หรือเครื่องประดับที่ไม่ได้ใช้แล้ว ร้าน<strong>รับซื้อทองพัทยา</strong>ของเรา
              พร้อมตรวจสอบอย่างละเอียดด้วยเครื่องมือมาตรฐาน อธิบายผลการตรวจเช็คชัดเจน
              เข้าใจง่าย ให้ราคาสูง จ่ายเงินสดทันที และประเมินราคาฟรี ไม่มีค่าใช้จ่าย
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
