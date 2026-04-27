import type { VaultDownloadData } from "@/types/vault-downloads";
import { VaultDownloadSection } from "./_components/vault-download-section";
import { VaultEcosystemSection } from "./_components/vault-ecosystem-section";
import { VaultFaqSection } from "./_components/vault-faq-section";
import { VaultFeaturesSection } from "./_components/vault-features-section";
import { VaultHeroSection } from "./_components/vault-hero-section";
import { VaultNavbar } from "./_components/vault-navbar";
import { VaultPageBackground } from "./_components/vault-page-background";
import { VaultScreenshotsSection } from "./_components/vault-screenshots-section";
import { formatDate } from "./_components/shared";

interface CritixVaultLandingPageProps {
  downloadData: VaultDownloadData;
  msStoreUrl: string;
  isDevMode: boolean;
}

export default function CritixVaultLandingPage({
  downloadData,
  msStoreUrl,
  isDevMode,
}: CritixVaultLandingPageProps) {
  const fetchedAtLabel = formatDate(downloadData.fetchedAt);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-on-primary-crx  text-text-primary"
      style={{ userSelect: "none" }}
    >
      <VaultPageBackground />
      <VaultNavbar repositoryUrl={downloadData.repositoryUrl} />

      <VaultHeroSection
        msStoreUrl={msStoreUrl}
        latestVersion={downloadData.latestVersion}
        hasInstallableAssets={downloadData.hasInstallableAssets}
        fetchedAtLabel={fetchedAtLabel}
      />

      <VaultFeaturesSection />
      <VaultScreenshotsSection />

      <VaultDownloadSection
        downloadData={downloadData}
        msStoreUrl={msStoreUrl}
        isDevMode={isDevMode}
      />
      <VaultEcosystemSection />

      <VaultFaqSection
        msStoreUrl={msStoreUrl}
        repositoryUrl={downloadData.repositoryUrl}
      />
    </main>
  );
}
