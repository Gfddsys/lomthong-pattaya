/* ไอคอนเส้นของแต่ละบริการ (แทนอีโมจิ ซึ่งหน้าตาต่างกันไปตามเครื่อง และดูเป็นการ์ตูนบน Windows)
   วาดด้วย stroke = currentColor สีจึงมาจาก CSS ของกรอบที่ครอบอยู่ */
const PATHS = {
  'gold-melting': (
    <>
      <path d="M12 3c.9 3.4 4.6 5.3 4.6 9.6a4.6 4.6 0 0 1-9.2 0c0-2.1 1-3.4 2-4.4.3 1.7 1.2 2.7 2.4 3C11.5 8.8 11.1 5.8 12 3z" />
      <path d="M5 21h14" />
    </>
  ),
  'gold-buying': (
    <>
      <path d="M2.5 20h8.5l-1.6-5.5H4.1z" />
      <path d="M13 20h8.5l-1.6-5.5h-5.3z" />
      <path d="M7.7 12h8.6l-1.6-5.5H9.3z" />
    </>
  ),
  'jewelry-buying': (
    <>
      <path d="M6.5 4h11l3.5 5-9 11L3 9z" />
      <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
    </>
  ),
  'gold-checking': (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M7.8 10.6l1.9 1.9 3.4-3.8" />
    </>
  ),
  'watch-buying': (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <path d="M9 7 9.6 3h4.8L15 7M9 17l.6 4h4.8l.6-4M12 9.6V12l1.6 1.2" />
    </>
  ),
  'online-valuation': (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" />
      <path d="M10.5 18.5h3M9.5 8h5M9.5 11.5h3.5" />
    </>
  ),
  'silver-buying': (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
    </>
  ),
};

export default function ServiceIcon({ slug, size = 32 }) {
  const paths = PATHS[slug];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}
