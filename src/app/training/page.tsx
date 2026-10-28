import { notFound } from "next/navigation";

export const metadata = { title: "掲載終了 | ClearAI", robots: { index: false, follow: false } };

export default function RetiredTrainingPage() {
  notFound();
}
