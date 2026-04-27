import {
  GithubAssetApiResponse,
  GithubReleaseApiResponse,
  GithubTagApiResponse,
} from "@/types/github";
import type {
  VaultDownloadData,
  VaultDownloadPlatform,
  VaultGithubRelease,
  VaultGithubTag,
  VaultInstallableAsset,
  VaultReleaseAsset,
} from "@/types/vault-downloads";

const OWNER = "wallacemt";
const REPO = "critix-vault-desktop";
const GITHUB_REPO_URL = `https://github.com/${OWNER}/${REPO}`;
const GITHUB_API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
const FETCH_TIMEOUT_MS = 12_000;
const REVALIDATE_SECONDS = 3600;

function formatFileSize(sizeBytes: number): string {
  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }

  const sizeKb = sizeBytes / 1024;
  if (sizeKb < 1024) {
    return `${sizeKb.toFixed(1)} KB`;
  }

  const sizeMb = sizeKb / 1024;
  if (sizeMb < 1024) {
    return `${sizeMb.toFixed(1)} MB`;
  }

  const sizeGb = sizeMb / 1024;
  return `${sizeGb.toFixed(2)} GB`;
}

function detectAssetPlatform(assetName: string): VaultDownloadPlatform {
  const normalized = assetName.toLowerCase();

  if (
    normalized.includes("windows") ||
    normalized.includes("win") ||
    normalized.endsWith(".msi") ||
    normalized.endsWith(".exe")
  ) {
    return "windows";
  }

  if (
    normalized.includes("mac") ||
    normalized.includes("osx") ||
    normalized.includes("darwin") ||
    normalized.endsWith(".dmg") ||
    normalized.endsWith(".pkg")
  ) {
    return "macos";
  }

  if (
    normalized.includes("linux") ||
    normalized.includes("ubuntu") ||
    normalized.endsWith(".appimage") ||
    normalized.endsWith(".deb") ||
    normalized.endsWith(".rpm")
  ) {
    return "linux";
  }

  return "unknown";
}

function isInstallableAsset(asset: VaultReleaseAsset): boolean {
  if (asset.platform !== "unknown") {
    return true;
  }

  const normalized = asset.name.toLowerCase();
  return (
    normalized.endsWith(".msi") ||
    normalized.endsWith(".exe") ||
    normalized.endsWith(".dmg") ||
    normalized.endsWith(".pkg") ||
    normalized.endsWith(".appimage") ||
    normalized.endsWith(".deb") ||
    normalized.endsWith(".rpm")
  );
}

async function fetchGithubJson<T>(endpoint: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "critix-vault-landing",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/${endpoint}`, {
      headers,
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function mapReleaseAsset(asset: GithubAssetApiResponse): VaultReleaseAsset {
  return {
    id: asset.id,
    name: asset.name,
    downloadUrl: asset.browser_download_url,
    sizeBytes: asset.size,
    sizeLabel: formatFileSize(asset.size),
    downloadCount: asset.download_count,
    updatedAt: asset.updated_at,
    contentType: asset.content_type,
    platform: detectAssetPlatform(asset.name),
  };
}

function mapRelease(release: GithubReleaseApiResponse): VaultGithubRelease {
  const assets = release.assets.map(mapReleaseAsset);

  return {
    id: release.id,
    name: release.name ?? release.tag_name,
    tagName: release.tag_name,
    prerelease: release.prerelease,
    draft: release.draft,
    htmlUrl: release.html_url,
    publishedAt: release.published_at,
    assets,
  };
}

function mapTag(tag: GithubTagApiResponse): VaultGithubTag {
  return {
    name: tag.name,
    commitSha: tag.commit.sha,
    zipballUrl: tag.zipball_url,
    tarballUrl: tag.tarball_url,
    releaseUrl: `${GITHUB_REPO_URL}/releases/tag/${encodeURIComponent(tag.name)}`,
  };
}

function collectInstallableAssets(
  releases: VaultGithubRelease[]
): VaultInstallableAsset[] {
  const installables: VaultInstallableAsset[] = [];

  for (const release of releases) {
    if (release.draft) {
      continue;
    }

    for (const asset of release.assets) {
      if (!isInstallableAsset(asset)) {
        continue;
      }

      installables.push({
        releaseTag: release.tagName,
        releaseName: release.name,
        platform: asset.platform,
        name: asset.name,
        downloadUrl: asset.downloadUrl,
        sizeLabel: asset.sizeLabel,
      });
    }
  }

  return installables;
}

export async function getCritixVaultDownloadData(): Promise<VaultDownloadData> {
  const [releaseResponse, tagResponse] = await Promise.all([
    fetchGithubJson<GithubReleaseApiResponse[]>("releases?per_page=10").catch(
      (error) => {
        console.error("Falha ao buscar releases do Critix Vault:", error);
        return [];
      }
    ),
    fetchGithubJson<GithubTagApiResponse[]>("tags?per_page=10").catch(
      (error) => {
        console.error("Falha ao buscar tags do Critix Vault:", error);
        return [];
      }
    ),
  ]);

  const releases = releaseResponse.map(mapRelease).sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  const tags = tagResponse.map(mapTag);
  const installableAssets = collectInstallableAssets(releases);
  const latestVersion = releases[0]?.tagName ?? tags[0]?.name ?? null;

  return {
    repositoryUrl: GITHUB_REPO_URL,
    releases,
    tags,
    installableAssets,
    hasInstallableAssets: installableAssets.length > 0,
    hasReleases: releases.length > 0,
    latestVersion,
    fetchedAt: new Date().toISOString(),
  };
}
