import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getUploadedImage } from "@/lib/getImage";

/* บั๊กที่แก้: เดิมหน้าบริการ /services/[slug] ไม่มี layout.js ของตัวเอง
   จึงสืบทอดแค่ root layout เปล่าๆ (ไม่มี Navbar/Footer เลย) ทำให้ลูกค้าที่
   เข้ามาจาก Google หลุดเข้าหน้าที่ไม่มีเมนู ไม่มีทางกลับหน้าอื่น */
export default function ServicesLayout({ children }) {
  const logoSrc = getUploadedImage("logo", "/images/logo.jpg");
  return (
    <>
      <Navbar logoSrc={logoSrc} />
      <main style={{ paddingTop: "80px" }}>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
