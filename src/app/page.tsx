import HomeContent from "@/components/HomeContent";
import NewsList from "@/components/NewsList";

export const revalidate = 60;

export default function HomePage() {
  return <HomeContent newsSlot={<NewsList />} />;
}
