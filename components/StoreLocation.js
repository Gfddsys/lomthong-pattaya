import { CONTACT } from '@/data/contact';

const MAP_EMBED = CONTACT.mapEmbedUrl; // แผนที่ฝังจากพิกัดจริงของร้าน
const MAP_DIRECTIONS = CONTACT.googleMapsUrl; // ลิงก์หมุด/นำทางจริง

/* ไอคอน badge วงกลม — จัดกึ่งกลางด้วย inline style ล้วน + ไอคอนทึบ path อยู่กลาง viewBox
   (ไม่พึ่ง CSS ภายนอก จึงไม่มีปัญหาแคชหรือเบี้ยว) */
const IconBadge = ({ children }) => (
  <span
    aria-hidden="true"
    style={{
      width: 44,
      height: 44,
      flexShrink: 0,
      borderRadius: '50%',
      background: 'rgba(212,168,67,0.12)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 0,
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#8a6a1f" style={{ display: 'block' }}>
      {children}
    </svg>
  </span>
);
const IconPin = () => (
  <IconBadge>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </IconBadge>
);
const IconClock = () => (
  <IconBadge>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.9 5h-1.8v5.4l4.5 2.7.9-1.5-3.6-2.1V7z" />
  </IconBadge>
);
const IconPhone = () => (
  <IconBadge>
    <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
  </IconBadge>
);
const IconChat = () => (
  <IconBadge>
    <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2zm3 7h2V9H7v2zm4 0h2V9h-2v2zm4 0h2V9h-2v2z" />
  </IconBadge>
);

export default function StoreLocation() {
  return (
    <section id="store" className="section section-darker">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">ที่ตั้งร้าน</span>
          <h2 className="section-title">
            แวะมาที่ร้าน <span className="gold">หลอมทองพัทยา</span>
          </h2>
          <p className="section-subtitle">
            ร้านตัวจริง มีหน้าร้านชัดเจนในพัทยา จอดรถสะดวก เดินทางง่าย ตรวจทองต่อหน้าคุณทุกขั้นตอน
          </p>
          <div className="gold-divider"></div>
        </div>

        <div className="store-grid animate-on-scroll">
          {/* Map */}
          <div className="store-map">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="แผนที่ร้านหลอมทองพัทยา"
            ></iframe>
          </div>

          {/* Info card */}
          <div className="store-info">
            <h3>ร้านหลอมทองพัทยา</h3>

            <ul className="store-details">
              <li>
                <IconPin />
                <div>
                  <b>ที่อยู่</b>
                  <span>ถ.พัทยาใต้ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150</span>
                </div>
              </li>
              <li>
                <IconClock />
                <div>
                  <b>เวลาทำการ</b>
                  <span>เปิดทุกวัน 10:00 - 20:00 น.</span>
                </div>
              </li>
              <li>
                <IconPhone />
                <div>
                  <b>โทรศัพท์</b>
                  <a href={CONTACT.phoneHref} aria-label="โทรหาเรา">{CONTACT.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <IconChat />
                <div>
                  <b>LINE</b>
                  <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer">{CONTACT.lineId}</a>
                </div>
              </li>
            </ul>

            <div className="store-actions">
              <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                🧭 นำทางด้วย Google Maps
              </a>
              <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                💬 แอดไลน์สอบถาม
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
