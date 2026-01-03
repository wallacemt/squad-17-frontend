import LendingPage from "@/components/lending/Lending";
import { getTrendingMedia } from "@/services/mediaService";

// Usar ISR com revalidação a cada hora
export const revalidate = 3600; // Revalidar a cada hora

export default async function LendingRoute() {
  try {
    const trending = await getTrendingMedia();
    return <LendingPage trending={trending} />;
  } catch (error) {
    console.error("Erro ao carregar página lending:", error);
    // Retornar página com array vazio em caso de erro
    return <LendingPage trending={[]} />;
  }
}
