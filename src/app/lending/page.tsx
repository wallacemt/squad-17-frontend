import LendingPage from "@/components/lending/Lending";
import { getTrendingMedia } from "@/services/mediaService";

export default async function LendingRoute() {
  const trending = await getTrendingMedia();
  return <LendingPage trending={trending} />;
}
