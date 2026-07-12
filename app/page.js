import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import StoreLocation from "@/components/StoreLocation";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getUploadedImage } from "@/lib/getImage";

// canonical ของหน้าแรก (title/description ยังใช้ค่า default จาก root layout)
export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const logoSrc = getUploadedImage("logo", "/images/logo.jpg");
  return (
    <>
      <Navbar logoSrc={logoSrc} />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <StoreLocation />
        <Process />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
