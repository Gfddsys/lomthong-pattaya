import { notFound } from "next/navigation";
import { REVIEW_BRANCHES } from "@/data/branches";
import ReviewCards from "../ReviewCards";

/* /reviews/<slug> — ปลายทางของ QR บนเคาน์เตอร์แต่ละสาขา แสดงเฉพาะปุ่มรีวิวของสาขานั้น
   รวมสาขาที่กำลังจะเปิด (UPCOMING_BRANCHES) ซึ่งยังไม่มีปุ่มรีวิว */
export function generateStaticParams() {
  return REVIEW_BRANCHES.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = REVIEW_BRANCHES.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: `รีวิว${b.menuName}บน Google`,
    alternates: { canonical: `/reviews/${b.slug}` },
  };
}

export default async function BranchReviewPage({ params }) {
  const { slug } = await params;
  if (!REVIEW_BRANCHES.some((b) => b.slug === slug)) notFound();
  return <ReviewCards slug={slug} />;
}
