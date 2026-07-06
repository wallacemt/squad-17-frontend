"use client";

import {
  vaultMockInstallableAssets,
  vaultMockReleases,
} from "@/components/vault-landing/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  VaultDownloadData,
  VaultDownloadPlatform,
  VaultGithubRelease,
  VaultInstallableAsset,
} from "@/types/vault-downloads";
import { motion } from "framer-motion";
import {
  ChevronDown,
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

function DownloadPill({ asset }: { asset: VaultInstallableAsset }) {
  return (
    <a
      href={asset.downloadUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-sm transition-colors hover:border-primary-crx/40 hover:bg-primary-crx/10"
    >
      <span className="flex flex-col">
        <span className="font-medium">{assetFormat(asset.name)}</span>
        <span className="text-xs text-text-secondary">{asset.sizeLabel}</span>
      </span>
      <Download className="h-4 w-4 shrink-0 text-primary-crx" />
    </a>
  );
}

function ReleaseDownloads({ assets }: { assets: VaultInstallableAsset[] }) {
  if (assets.length === 0) {
    return (
      <p className="text-sm text-text-secondary">
        Sem instaladores publicados para esta versao.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {OS_GROUPS.map(({ platform, label, badgeClass }) => {
        const group = assets.filter((a) => a.platform === platform);
        if (group.length === 0) return null;

        return (
          <div key={platform}>
            <Badge className={`${badgeClass} mb-2`}>{label}</Badge>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.map((asset) => (
                <DownloadPill
                  key={`${asset.releaseTag}-${asset.name}`}
                  asset={asset}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReleaseCard({
  release,
  assets,
  isLatest,
  defaultOpen,
}: {
  release: VaultGithubRelease;
  assets: VaultInstallableAsset[];
  isLatest: boolean;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <BorderGradientPanel>
        <div className="px-6 py-5">
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xl">
                {release.name || release.tagName}
              </span>
              <Badge
                variant="outline"
                className="border-primary-crx/30 bg-primary-crx/10 text-primary-crx"
              >
                {release.tagName}
              </Badge>
              {isLatest ? (
                <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
                  Mais recente
                </Badge>
              ) : null}
              {release.prerelease ? (
                <Badge
                  variant="outline"
                  className="border-amber-500/30 bg-amber-500/10 text-amber-400"
                >
                  Pre-release
                </Badge>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-3 text-sm text-text-secondary">
              <span>{formatDate(release.publishedAt)}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-5 space-y-5">
            {release.changelog ? (
              <div className="max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-4">
                <p className="whitespace-pre-wrap text-sm text-text-secondary">
                  {release.changelog}
                </p>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">
                Sem notas de versao para este lancamento.
              </p>
            )}

            <ReleaseDownloads assets={assets} />

            <a
              href={release.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary-crx hover:underline"
            >
              Ver release completa no GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </CollapsibleContent>
        </div>
      </BorderGradientPanel>
    </Collapsible>
  );
}

function ReleaseList({
  releases,
  installableAssets,
}: {
  releases: VaultGithubRelease[];
  installableAssets: VaultInstallableAsset[];
}) {
  const visibleReleases = releases.filter((release) => !release.draft);

  return (
    <div className="mt-8 space-y-4">
      {visibleReleases.map((release, index) => (
        <motion.div
          key={release.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <ReleaseCard
            release={release}
            assets={installableAssets.filter(
              (asset) => asset.releaseTag === release.tagName
            )}
            isLatest={index === 0}
            defaultOpen={index === 0}
          />
        </motion.div>
      ))}
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

  const releases = useMemo(() => {
    if (isDevMode && isMockInstallersEnabled) {
      return vaultMockReleases;
    }

    return downloadData.releases;
  }, [downloadData.releases, isDevMode, isMockInstallersEnabled]);

  const hasReleases = releases.some((release) => !release.draft);

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

      {hasReleases ? (
        <ReleaseList releases={releases} installableAssets={installableAssets} />
      ) : (
        <BorderGradientPanel className="mt-8">
          <div className="space-y-5 px-6 py-6">
            <p className="text-text-muted text-sm uppercase tracking-[0.18em]">
              Estado atual do repositorio
            </p>
            <h3 className="font-display text-3xl">Sem releases publicadas</h3>
            <p className="max-w-3xl text-text-secondary">
              Ainda nao ha releases publicadas no GitHub. Assim que uma release
              sair, ela aparece automaticamente aqui com changelog e
              instaladores por sistema operacional.
            </p>

            {downloadData.tags.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {downloadData.tags.map((tag) => (
                  <Card key={tag.name} className="border-white/10 bg-black/25">
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
                        <a href={tag.zipballUrl} target="_blank" rel="noreferrer">
                          Fonte zip
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-white/20 bg-black/20 hover:bg-black/35"
                      >
                        <a href={tag.tarballUrl} target="_blank" rel="noreferrer">
                          Fonte tar.gz
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </BorderGradientPanel>
      )}
    </section>
  );
}
