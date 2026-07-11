import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

/* Layout ใช้ร่วมกันสำหรับหน้า Landing รายพื้นที่ (หลอมทองพัทยา, บางละมุง, ศรีราชา ฯลฯ)
   route group (areas) ไม่มีผลกับ URL — ใช้แค่แชร์ Navbar/Footer ให้ทุกหน้าพื้นที่ */
export default function AreasLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
