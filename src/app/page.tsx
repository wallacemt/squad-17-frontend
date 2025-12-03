import LendingPage from "@/components/Lending/Lending";
import { getTrendingMedia } from "@/services/mediaService";

export default async function Home() {
  const trending = await getTrendingMedia();
  return <LendingPage trending={trending} />;
}
