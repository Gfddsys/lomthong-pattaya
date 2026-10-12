import ReviewCards from "./ReviewCards";

export const metadata = {
  title: "รีวิวร้านบน Google",
  description: "รีวิวร้านหลอมทองพัทยา (เฮงศิริ) บน Google Maps เลือกสาขาพัทยาใต้หรือสาขาเนินพลับหวาน",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return <ReviewCards />;
}
