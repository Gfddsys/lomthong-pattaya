import Link from "next/link";

/* บล็อกเนื้อหาแบบเดียวกับบทความ (summary/h2/h3/p/ul/ol/quote/table) ใช้ร่วมกันระหว่างบทความและหน้าบริการ
   ข้อความรองรับ **ตัวหนา** และ [ลิงก์](/หน้าในเว็บ) */
/* ---------- แปลง **ตัวหนา** และ [ลิงก์](/หน้าในเว็บ) ในข้อความ ----------
   ลิงก์รับเฉพาะ path ภายในเว็บ (ขึ้นต้นด้วย /) — ลิงก์ภายในช่วยส่งน้ำหนัก SEO ระหว่างหน้า
   และกันบทความอัตโนมัติแอบใส่ลิงก์ออกไปเว็บอื่น */
export function RichText({ children }) {
  const text = String(children ?? "");
  const tokens = text.split(/(\*\*.+?\*\*|\[[^\]]+\]\(\/[^)\s]*\))/g);
  return (
    <>
      {tokens.map((t, i) => {
        const bold = t.match(/^\*\*(.+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        const link = t.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
        if (link) return <Link key={i} href={link[2]}>{link[1]}</Link>;
        return t;
      })}
    </>
  );
}

/* ---------- วาดเนื้อหาแต่ละบล็อก ---------- */
export function Section({ block, id }) {
  switch (block.type) {
    case "summary":
      return (
        <div
          style={{
            background: "#fdf8ec",
            borderLeft: "4px solid #d4a843",
            borderRadius: "8px",
            padding: "1.1rem 1.3rem",
            marginBottom: "1.8rem",
          }}
        >
          <p style={{ marginBottom: "0.6rem", fontWeight: 700 }}>{block.label ?? "สรุปสั้นๆ"}</p>
          <ul style={{ marginBottom: 0 }}>
            {block.items.map((item, i) => (
              <li key={i}>
                <RichText>{item}</RichText>
              </li>
            ))}
          </ul>
        </div>
      );
    case "h2":
      return (
        <h2 id={id}>
          <RichText>{block.text}</RichText>
        </h2>
      );
    case "h3":
      return (
        <h3>
          <RichText>{block.text}</RichText>
        </h3>
      );
    case "p":
      return (
        <p>
          <RichText>{block.text}</RichText>
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText>{item}</RichText>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText>{item}</RichText>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          <RichText>{block.text}</RichText>
        </blockquote>
      );
    case "table":
      // ตารางเปรียบเทียบ — Google มักดึงไปแสดงเป็น featured snippet
      // ไม่เกิน 3 ช่อง: บนมือถือบีบให้เห็นครบทุกช่องโดยไม่ต้องเลื่อนข้าง (.blog-table-fit ใน globals.css)
      return (
        <div className="blog-table-wrap">
          <table className={block.head.length <= 3 ? "blog-table blog-table-fit" : "blog-table"}>
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>
                      <RichText>{cell}</RichText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
