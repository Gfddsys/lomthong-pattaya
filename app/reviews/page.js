import ReviewCards from "./ReviewCards";

export const metadata = {
  title: "รีวิวร้านบน Google",
  description: "รีวิวร้านเฮงศิริ หลอมทองพัทยา บน Google Maps เลือกสาขาที่ใช้บริการ",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return <ReviewCards />;
}
