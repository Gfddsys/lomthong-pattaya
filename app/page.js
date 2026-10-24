import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import StoreLocation from "@/components/StoreLocation";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import VideoShorts from "@/components/VideoShorts";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getUploadedImage } from "@/lib/getImage";

// canonical ของหน้าแรก (title/description ยังใช้ค่า default จาก root layout)
export const metadata = {
  alternates: {
    canonical: "/",
    // คู่ภาษา: หน้าภาษาอังกฤษสำหรับชาวต่างชาติอยู่ที่ /en
    languages: { th: "/", en: "/en", "x-default": "/" },
  },
};

export default function Home() {
  const logoSrc = getUploadedImage("logo", "/images/logo.jpg");
  return (
    <>
      <Navbar logoSrc={logoSrc} />
      <main className="home-main">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <StoreLocation />
        <Process />
        <Gallery />
        <section id="home-videos" className="section">
          <div className="container">
            <VideoShorts page="home" title="คลิปจากหน้าร้าน" pageUrl="/" />
          </div>
        </section>
        <Testimonials />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
