export type VaultDownloadPlatform = "windows" | "macos" | "linux" | "unknown";

export interface VaultReleaseAsset {
  id: number;
  name: string;
  downloadUrl: string;
  sizeBytes: number;
  sizeLabel: string;
  downloadCount: number;
  updatedAt: string | null;
  contentType: string | null;
  platform: VaultDownloadPlatform;
}

export interface VaultGithubRelease {
  id: number;
  name: string;
  tagName: string;
  prerelease: boolean;
  draft: boolean;
  htmlUrl: string;
  publishedAt: string | null;
  assets: VaultReleaseAsset[];
}

export interface VaultGithubTag {
  name: string;
  commitSha: string;
  zipballUrl: string;
  tarballUrl: string;
  releaseUrl: string;
}

export interface VaultInstallableAsset {
  releaseTag: string;
  releaseName: string;
  platform: VaultDownloadPlatform;
  name: string;
  downloadUrl: string;
  sizeLabel: string;
}

export interface VaultDownloadData {
  repositoryUrl: string;
  releases: VaultGithubRelease[];
  tags: VaultGithubTag[];
  installableAssets: VaultInstallableAsset[];
  hasInstallableAssets: boolean;
  hasReleases: boolean;
  latestVersion: string | null;
  fetchedAt: string;
}
