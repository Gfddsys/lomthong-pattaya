import { notFound } from "next/navigation";
import { BRANCHES, getBranch } from "@/data/branches";
import ReviewCards from "../ReviewCards";

/* /reviews/<slug> — ปลายทางของ QR บนเคาน์เตอร์แต่ละสาขา แสดงเฉพาะปุ่มรีวิวของสาขานั้น */
export function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) return {};
  return {
    title: `รีวิว${b.shortName}บน Google`,
    alternates: { canonical: `/reviews/${b.slug}` },
  };
}

export default async function BranchReviewPage({ params }) {
  const { slug } = await params;
  if (!getBranch(slug)) notFound();
  return <ReviewCards slug={slug} />;
}
