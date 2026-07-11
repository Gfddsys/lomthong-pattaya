import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getUploadedImage } from "@/lib/getImage";

export default function BlogLayout({ children }) {
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
