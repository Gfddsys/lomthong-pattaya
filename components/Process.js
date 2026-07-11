import { CONTACT } from '@/data/contact';

/* ไอคอนกราฟิก (SVG) ประจำแต่ละขั้นตอน */
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-3.6-3.6" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);
const IconCash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01" /><path d="M18 12h.01" />
  </svg>
);

export default function Process() {
  const steps = [
    {
      number: 1,
      title: 'ติดต่อเรา · แอดไลน์',
      description: 'ทักไลน์หรือโทรหาเรา ส่งรูปทองมาให้ประเมินราคาเบื้องต้นได้ฟรีทันที',
      href: CONTACT.lineUrl,
      cta: true,
      Icon: IconChat,
    },
    {
      number: 2,
      title: 'นำทองมาที่ร้าน',
      description: 'นำทองมาที่ร้าน หรือให้เรารับถึงที่ ตรวจเปอร์เซ็นต์ทองด้วยเครื่อง XRF ต่อหน้าคุณ',
      Icon: IconSearch,
    },
    {
      number: 3,
      title: 'รู้ราคาทันที',
      description: 'ช่างผู้ชำนาญประเมินราคาตามเนื้อทองจริง ยุติธรรม ไม่กดราคา',
      Icon: IconTag,
    },
    {
      number: 4,
      title: 'รับเงินสดทันที',
      description: 'ตกลงราคาเสร็จ รับเงินสดหรือโอนได้เลย ไม่ต้องรอ',
      Icon: IconCash,
    },
  ];

  return (
    <section id="process" className="section section-darker">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">ขั้นตอนการใช้บริการ</span>
          <h2 className="section-title">
            ขั้นตอนง่ายๆ <span className="gold process-title-shine">สะดวกรวดเร็ว</span>
          </h2>
          <p className="section-subtitle">
            เพียง 4 ขั้นตอนง่ายๆ คุณก็ขายทอง หลอมทองกับเราได้แบบสบายใจ
          </p>
          <div className="gold-divider"></div>
        </div>

        <div className="process-steps">
          {steps.map((step, index) => {
            const { Icon } = step;
            const inner = (
              <>
                <div className={`process-step-number${step.cta ? ' process-step-number--cta' : ''}`}>
                  <Icon />
                  <span className={`process-step-badge${step.cta ? ' process-step-badge--line' : ''}`}>
                    {step.number}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.cta && <span className="process-step-hint">แตะเพื่อแอดไลน์เลย</span>}
              </>
            );
            const cls = `process-step animate-on-scroll animate-delay-${(index % 4) * 100 + 100}${step.cta ? ' process-step--link' : ''}`;
            return step.href ? (
              <a
                key={step.number}
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                aria-label="ติดต่อเราทาง LINE"
              >
                {inner}
              </a>
            ) : (
              <div key={step.number} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>

        <div className="process-cta animate-on-scroll">
          <a
            href={CONTACT.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="process-cta-btn"
          >
            <img
              src="https://cdn.simpleicons.org/line/ffffff"
              alt="LINE"
              width={22}
              height={22}
              style={{ width: '22px', height: '22px', display: 'block' }}
            />
            แอดไลน์ ประเมินราคาฟรี
          </a>
          <span className="process-cta-note">ตอบไวทุกวัน · ส่งรูปทองมาได้เลย ประเมินให้ทันที</span>
        </div>
      </div>
    </section>
  );
}
