import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getUploadedImage } from "@/lib/getImage";

/* หน้าสาขา /branch/[slug] เดิมไม่มี layout ของตัวเอง → ไม่มี Navbar/Footer/ปุ่มติดต่อลอย
   ทั้งที่เป็นหน้าที่ลิงก์จาก Google Business Profile โดยตรง (ลูกค้ากดมาจากแผนที่แล้วไปต่อไม่ได้) */
export default function BranchLayout({ children }) {
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
