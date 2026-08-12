import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RentalApplicationForm from "./RentalApplicationForm";
import { RENTAL_MODELS, type RentalModelId } from "@/lib/robot-rental-order";

export const metadata: Metadata = {
  title: "ロボットレンタル申込・本人確認",
  description: "Unitree R1・G1・Go2の利用日と配送先を入力し、Stripe Identityで免許証による本人確認を行えます。",
  robots: { index: false, follow: false },
};

export default async function RentalApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  if (process.env.NEXT_PUBLIC_ROBOT_RENTAL_APPLICATION_ENABLED !== "true") notFound();

  const params = await searchParams;
  const requested = params.model ?? "r1";
  const initialModel: RentalModelId = Object.prototype.hasOwnProperty.call(RENTAL_MODELS, requested)
    ? (requested as RentalModelId)
    : "r1";

  return <RentalApplicationForm initialModel={initialModel} />;
}
