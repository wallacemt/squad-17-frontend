export interface GithubReleaseApiResponse {
  id: number;
  name: string | null;
  tag_name: string;
  prerelease: boolean;
  draft: boolean;
  html_url: string;
  published_at: string | null;
  body: string | null;
  assets: GithubAssetApiResponse[];
}

export interface GithubAssetApiResponse {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
  updated_at: string | null;
  content_type: string | null;
}

export interface GithubTagApiResponse {
  name: string;
  zipball_url: string;
  tarball_url: string;
  commit: {
    sha: string;
  };
}
