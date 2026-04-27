import type { Metadata } from "next";
import { PoliciesTermsContent } from "./_components/policies-terms-content";

export const metadata: Metadata = {
  title: "Critix Vault | Policies, Terms & Privacy",
  description:
    "Publication information for Microsoft Store, Terms of Use and Privacy Policy for Critix Vault.",
};

export default function CritixVaultPoliciesAndTermsPage() {
  const msStoreUrl =
    process.env.NEXT_PUBLIC_CRITIX_VAULT_MS_STORE_URL ??
    "https://apps.microsoft.com/";

  return (
    <PoliciesTermsContent
      msStoreUrl={msStoreUrl}
      repoUrl="https://github.com/wallacemt/critix-vault-desktop"
      lastUpdated="2026-03-30"
    />
  );
}
