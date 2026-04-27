import CritixVaultLandingPage from "@/components/vault-landing/CritixVaultLandingPage";
import { getCritixVaultDownloadData } from "@/services/githubVaultService";
import { Metadata } from "next";

export const revalidate = 3600;

const defaultMsStoreUrl = "https://apps.microsoft.com/";
const isDevMode = process.env.NODE_ENV !== "production";

export const metadata: Metadata = {
  title: "Critix Vault | Sua Blibioteca de filmes e séries",
  description:
    "Critix  Vault, seu glow up a bliblioteca, para quem cansou do basico.",
  keywords: [
    "Critix",
    "reviews",
    "críticas",
    "filmes",
    "séries",
    "plataforma de avaliação",
    "entretenimento",
    "Next.js",
    "React",
    "TypeScript",
  ],
};

export default async function CritixVaultRoute() {
  const msStoreUrl =
    process.env.NEXT_PUBLIC_CRITIX_VAULT_MS_STORE_URL ?? defaultMsStoreUrl;

  try {
    const downloadData = await getCritixVaultDownloadData();
    return (
      <CritixVaultLandingPage
        downloadData={downloadData}
        msStoreUrl={msStoreUrl}
        isDevMode={isDevMode}
      />
    );
  } catch (error) {
    console.error("Erro ao carregar landing do Critix Vault:", error);

    return (
      <CritixVaultLandingPage
        msStoreUrl={msStoreUrl}
        isDevMode={isDevMode}
        downloadData={{
          repositoryUrl: "https://github.com/wallacemt/critix-vault-desktop",
          releases: [],
          tags: [],
          installableAssets: [],
          hasInstallableAssets: false,
          hasReleases: false,
          latestVersion: null,
          fetchedAt: new Date().toISOString(),
        }}
      />
    );
  }
}
