"use client";

import { vaultMockInstallableAssets } from "@/components/vault-landing/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SpotlightCard from "@/components/ui/blocks/elements/SpotlightCard/SpotlightCard";
import type {
  VaultDownloadData,
  VaultDownloadPlatform,
  VaultInstallableAsset,
} from "@/types/vault-downloads";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Monitor,
  TestTubeDiagonal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BorderGradientPanel, formatDate } from "./shared";

interface VaultDownloadSectionProps {
  downloadData: VaultDownloadData;
  msStoreUrl: string;
  isDevMode: boolean;
}

const OS_GROUPS: {
  platform: VaultDownloadPlatform;
  label: string;
  badgeClass: string;
  dividerClass: string;
}[] = [
  {
    platform: "windows",
    label: "Windows",
    badgeClass: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    dividerClass: "bg-blue-500/20",
  },
  {
    platform: "linux",
    label: "Linux",
    badgeClass: "border-orange-500/40 bg-orange-500/10 text-orange-400",
    dividerClass: "bg-orange-500/20",
  },
  {
    platform: "macos",
    label: "macOS",
    badgeClass: "border-white/20 bg-white/10 text-text-secondary",
    dividerClass: "bg-white/15",
  },
];

function assetFormat(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith(".exe")) return "NSIS (.exe)";
  if (lower.endsWith(".msi")) return "MSI";
  if (lower.endsWith(".appimage")) return "AppImage";
  if (lower.endsWith(".deb")) return "Debian (.deb)";
  if (lower.endsWith(".rpm")) return "RPM";
  if (lower.endsWith(".dmg")) return "DMG";
  if (lower.endsWith(".pkg")) return "PKG";
  return name.split(".").pop()?.toUpperCase() ?? "Instalador";
}

function OsAssetCard({ asset }: { asset: VaultInstallableAsset }) {
  return (
    <SpotlightCard
      key={`${asset.releaseTag}-${asset.name}`}
      className="rounded-xl"
      spotlightColor="rgba(255, 193, 7, 0.22)"
    >
      <Card className="border-white/10 bg-bg-surface/85">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3 text-lg">
            <span>{assetFormat(asset.name)}</span>
            <Badge
              variant="outline"
              className="border-primary-crx/30 bg-primary-crx/10 text-primary-crx"
            >
              {asset.releaseTag}
            </Badge>
          </CardTitle>
          <CardDescription className="line-clamp-2 text-text-secondary">
            {asset.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-text-secondary">
            Tamanho: {asset.sizeLabel}
          </p>
          <Button
            asChild
            className="w-full rounded-full bg-primary-crx text-on-primary-crx hover:bg-primary-hover-crx"
          >
            <a href={asset.downloadUrl} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              Baixar instalador
            </a>
          </Button>
        </CardContent>
      </Card>
    </SpotlightCard>
  );
}

function OsGroupedDownloads({
  assets,
}: {
  assets: VaultInstallableAsset[];
}) {
  return (
    <div className="mt-8 space-y-8">
      {OS_GROUPS.map(({ platform, label, badgeClass, dividerClass }, index) => {
        const group = assets.filter((a) => a.platform === platform);
        if (group.length === 0) return null;

        return (
          <motion.div
            key={platform}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Badge className={badgeClass}>{label}</Badge>
              <div className={`h-px flex-1 ${dividerClass}`} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.map((asset) => (
                <OsAssetCard key={`${asset.releaseTag}-${asset.name}`} asset={asset} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function VaultDownloadSection({
  downloadData,
  msStoreUrl,
  isDevMode,
}: VaultDownloadSectionProps) {
  const [isMockInstallersEnabled, setIsMockInstallersEnabled] = useState(false);

  const installableAssets = useMemo(() => {
    if (isDevMode && isMockInstallersEnabled) {
      return vaultMockInstallableAssets;
    }

    return downloadData.installableAssets;
  }, [downloadData.installableAssets, isDevMode, isMockInstallersEnabled]);

  const hasInstallableAssets = installableAssets.length > 0;

  return (
    <section
      id="download"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="mb-12 space-y-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="border-primary-crx/40 bg-primary-crx/10 text-primary-crx"
          >
            <Download className="h-3.5 w-3.5" />
            Download e versoes
          </Badge>

          {isDevMode ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsMockInstallersEnabled((current) => !current)}
              className="rounded-full border-emerald-400/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
            >
              <TestTubeDiagonal className="h-4 w-4" />
              Mock installers: {isMockInstallersEnabled ? "on" : "off"}
            </Button>
          ) : null}
        </div>

        <h2 className="font-display text-4xl md:text-6xl">
          Instalacao pronta para evoluir com releases
        </h2>
        <p className="max-w-3xl text-lg text-text-secondary">
          A landing consulta a API do GitHub para listar versoes. Enquanto nao
          houver instaladores publicados, o download principal permanece pela
          Microsoft Store.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BorderGradientPanel>
          <div className="space-y-5 px-6 py-6">
            <Badge className="bg-primary-crx text-on-primary-crx">
              Canal oficial atual
            </Badge>
            <h3 className="font-display text-3xl">Microsoft Store</h3>
            <p className="text-text-secondary">
              O canal prioritario para download do Critix Vault no momento. O
              link oficial definitivo pode ser atualizado sem alterar a
              estrutura da pagina.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary-crx text-on-primary-crx hover:bg-primary-hover-crx"
            >
              <a href={msStoreUrl} target="_blank" rel="noreferrer">
                <Monitor className="h-4 w-4" />
                Abrir Microsoft Store
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </BorderGradientPanel>

        <BorderGradientPanel>
          <div className="space-y-5 px-6 py-6">
            <Badge
              variant="outline"
              className="border-white/20 bg-black/20 text-text-secondary"
            >
              Integracao ativa
            </Badge>

            <div>
              <h3 className="font-display text-3xl">GitHub API</h3>
              <p className="mt-2 text-text-secondary">
                {downloadData.hasReleases
                  ? `Releases encontradas: ${downloadData.releases.length}`
                  : "Sem releases publicadas no momento."}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-black/20 hover:bg-black/35"
            >
              <a
                href={`${downloadData.repositoryUrl}/releases`}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                Ver pagina de releases
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </BorderGradientPanel>
      </div>

      {hasInstallableAssets ? (
        <OsGroupedDownloads assets={installableAssets} />
      ) : (
        <BorderGradientPanel className="mt-8">
          <div className="space-y-5 px-6 py-6">
            <p className="text-text-muted text-sm uppercase tracking-[0.18em]">
              Estado atual do repositorio
            </p>
            <h3 className="font-display text-3xl">
              Sem assets de instalacao em releases
            </h3>
            <p className="max-w-3xl text-text-secondary">
              A lista de versoes abaixo e carregada pela API do GitHub. Quando
              houver release com instalador para desktop, os botoes de download
              direto serao habilitados automaticamente nesta secao.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {downloadData.releases.length > 0
                ? downloadData.releases.map((release) => (
                    <Card
                      key={release.id}
                      className="border-white/10 bg-black/25"
                    >
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">
                          {release.tagName}
                        </CardTitle>
                        <CardDescription className="text-text-secondary">
                          Publicada em {formatDate(release.publishedAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full rounded-full border-white/20 bg-black/20 hover:bg-black/35"
                        >
                          <a
                            href={release.htmlUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver release
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                : downloadData.tags.map((tag) => (
                    <Card
                      key={tag.name}
                      className="border-white/10 bg-black/25"
                    >
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">{tag.name}</CardTitle>
                        <CardDescription className="text-text-secondary">
                          Commit {tag.commitSha.slice(0, 8)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2">
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-white/20 bg-black/20 hover:bg-black/35"
                        >
                          <a
                            href={tag.zipballUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Fonte zip
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-white/20 bg-black/20 hover:bg-black/35"
                        >
                          <a
                            href={tag.tarballUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Fonte tar.gz
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>
        </BorderGradientPanel>
      )}
    </section>
  );
}
