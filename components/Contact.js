import { CONTACT } from "@/data/contact";

export default function Contact() {
  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <span className="section-label">ติดต่อเรา</span>
          <h2 className="section-title">
            พร้อมให้บริการ<span className="gold">ทุกวัน</span>
          </h2>
          <p className="section-subtitle">
            ติดต่อเราได้หลายช่องทาง ทั้งโทรศัพท์ LINE หรือเดินทางมาที่ร้านโดยตรง
          </p>
          <div className="gold-divider"></div>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info animate-on-scroll animate-delay-100">
            <div className="contact-intro">
              <h3>
                <span className="gold">หลอมทองพัทยา</span> ศรีราชา ชลบุรี
              </h3>
              <p>
                ร้านรับหลอมทองและรับซื้อทองที่ได้รับความไว้วางใจจากลูกค้าใน
                พัทยา ศรีราชา และชลบุรี ให้บริการด้วยความซื่อสัตย์ โปร่งใส
                <strong> ราคาตามสมาคมค้าทองคำ</strong>
              </p>
            </div>

            <div className="contact-items">
              {/* Address — คลิกเพื่อเปิด Google Maps */}
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item contact-item--link"
              >
                <div className="contact-item-icon" aria-hidden="true">📍</div>
                <div>
                  <div className="contact-item-label">ที่อยู่ · แตะเพื่อดูแผนที่</div>
                  <div className="contact-item-value">
                    ถ.พัทยาใต้ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150
                    <span className="contact-item-go">เปิดใน Google Maps →</span>
                  </div>
                </div>
              </a>

              {/* Phone — แตะเพื่อโทรออก */}
              <a href={CONTACT.phoneHref} className="contact-item contact-item--link" aria-label="โทรหาเรา">
                <div className="contact-item-icon" aria-hidden="true">📞</div>
                <div>
                  <div className="contact-item-label">โทรศัพท์ · แตะเพื่อโทร</div>
                  <div className="contact-item-value">{CONTACT.phoneDisplay}</div>
                </div>
              </a>

              {/* LINE — แตะเพื่อแอดเพื่อน */}
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item contact-item--link"
                aria-label="ติดต่อผ่าน LINE"
              >
                <div className="contact-item-icon" aria-hidden="true">💬</div>
                <div>
                  <div className="contact-item-label">LINE · แตะเพื่อแอดเพื่อน</div>
                  <div className="contact-item-value">{CONTACT.lineId}</div>
                </div>
              </a>

              {/* Working Hours */}
              <div className="contact-item">
                <div className="contact-item-icon" aria-hidden="true">🕐</div>
                <div>
                  <div className="contact-item-label">เวลาทำการ</div>
                  <div className="contact-item-value">เปิดทุกวัน 10:00 - 20:00 น.</div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="contact-actions">
              <a href={CONTACT.phoneHref} className="btn btn-primary">📞 โทรเลย</a>
              <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">💬 แอดไลน์</a>
              <a href={CONTACT.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">🧭 นำทาง</a>
            </div>
          </div>

          {/* Right: Google Maps (พิกัดจริงของร้าน) */}
          <div className="contact-map">
            <iframe
              src={CONTACT.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="แผนที่ร้านหลอมทองพัทยา ศรีราชา ชลบุรี"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
