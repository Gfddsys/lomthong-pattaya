import Image from 'next/image';
import { getUploadedImages } from '@/lib/getImage';

export default function Gallery() {
  const titles = [
    'ผลงานหลอมทองคำแท่ง',
    'ทองรูปพรรณ',
    'ทองเก่าก่อนหลอม',
    'ตรวจสอบคุณภาพ',
    'เครื่องประดับทอง',
    'ผลงานล่าสุด',
  ];

  // วางรูปผลงานจริงกี่รูปก็ได้ใน public/images/uploads/gallery/ แล้วจะแสดงครบทุกรูปอัตโนมัติ
  // ตอนนี้ตั้ง fallback ไว้ 6 รูป เพื่อให้ตารางเต็มพอดี ไม่มีช่องว่างมุมขวาล่าง
  const images = getUploadedImages('gallery', [
    '/images/gallery.png',
    '/images/gallery.png',
    '/images/gallery.png',
    '/images/gallery.png',
    '/images/gallery.png',
    '/images/gallery.png',
  ]);

  const galleryItems = images.map((image, index) => ({
    title: titles[index % titles.length],
    image,
  }));

  // ทำซ้ำ 2 ชุด เพื่อให้แถบเลื่อนวนต่อเนื่องแบบไร้รอยต่อ
  const marqueeItems = [...galleryItems, ...galleryItems];

  return (
    <section id="gallery" className="section section-dark">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">ผลงานของเรา</span>
          <h2 className="section-title">
            <span className="gold process-title-shine">ขอบคุณ</span>ลูกค้าที่ไว้วางใจ
          </h2>
          <p className="section-subtitle">
            ผลงานรับซื้อทอง หลอมทอง นาฬิกาแบรนด์เนม เครื่องประดับ และพระเครื่อง{" "}
            <span style={{ whiteSpace: 'nowrap' }}>จากลูกค้าจริง</span>ทั่วพัทยา ชลบุรี บางละมุง ศรีราชา สัตหีบ ให้ราคาสูง จ่ายเงินสดทันที
          </p>
          <div className="gold-divider"></div>
        </div>

        <div className="gallery-marquee animate-on-scroll">
          <div className="gallery-track" style={{ animationDuration: `${galleryItems.length * 5}s` }}>
            {marqueeItems.map((item, index) => (
              <div
                key={index}
                className="gallery-slide"
                aria-hidden={index >= galleryItems.length ? true : undefined}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="320px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
