import Link from "next/link";
import styles from "./reviews.module.css";

/* หน้ารีวิว /reviews เปิดจาก QR บนเคาน์เตอร์ในร้าน (ลูกค้าถือมือถืออยู่หน้าร้าน)
   ตัด Navbar/ปุ่มติดต่อลอยออก ให้เหลือแค่ปุ่มรีวิว ลูกค้าจะได้ไม่หลงไปหน้าอื่น
   ไม่ให้ Google index เพราะเป็นหน้าใช้งานในร้าน ไม่ใช่หน้าที่คนค้นหา */
export const metadata = {
  robots: { index: false, follow: true },
};

export default function ReviewsLayout({ children }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Link href="/">หลอมทองพัทยา.com</Link>
      </footer>
    </div>
  );
}
