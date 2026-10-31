import { type RequestUrlResponse, requestUrl } from "obsidian";
import type { Release } from "./githubUtils";

// Forgejo repositories are tracked by their full URL, GitHub ones as owner/repo.
// They publish no releases: the built plugin files sit in the repository root,
// and the version in the root manifest.json is what BRAT tracks. Presenting that
// as a Release lets every update check treat both forges the same way.
const PLUGIN_FILES = ["main.js", "manifest.json", "styles.css"];

export const isForgejoRepository = (repository: string): boolean => /^https?:\/\//i.test(repository);

export const repositoryUrl = (repository: string): string =>
	isForgejoRepository(repository) ? repository : `https://github.com/${repository}`;

export const releaseUrl = (repository: string, version: string): string =>
	isForgejoRepository(repository) ? repository : `${repositoryUrl(repository)}/releases/tag/${version}`;

// The scheme Forgejo documents for API tokens.
export const forgejoAuthorization = (token: string): string => `token ${token}`;

const repositoryApiUrl = (repository: string): string => {
	const { origin, pathname } = new URL(repository);
	return `${origin}/api/v1/repos${pathname}`;
};

const get = (url: string, token: string): Promise<RequestUrlResponse> =>
	requestUrl({
		url,
		headers: token ? { Authorization: forgejoAuthorization(token) } : {},
		throw: false,
	});

const grabRepository = async (
	repository: string,
	token: string,
): Promise<{ private: boolean; default_branch: string; updated_at: string } | null> => {
	const response = await get(repositoryApiUrl(repository), token);
	return response.status === 200 ? response.json : null;
};

export const isPrivateForgejoRepository = async (repository: string, token: string): Promise<boolean> =>
	(await grabRepository(repository, token))?.private ?? false;

export const grabForgejoRelease = async (repository: string, token = ""): Promise<Release | null> => {
	const info = await grabRepository(repository, token);
	if (!info) return null;

	const apiUrl = repositoryApiUrl(repository);
	const rawUrl = (file: string) => `${apiUrl}/raw/${file}?ref=${encodeURIComponent(info.default_branch)}`;
	const manifest = await get(rawUrl("manifest.json"), token);
	if (manifest.status !== 200) return null;

	const { version } = JSON.parse(manifest.text) as { version?: unknown };
	if (typeof version !== "string") return null;

	return {
		url: apiUrl,
		tag_name: version,
		name: version,
		published_at: info.updated_at,
		prerelease: false,
		forgejo: true,
		assets: PLUGIN_FILES.map((name) => ({ name, url: rawUrl(name), browser_download_url: rawUrl(name) })),
	};
};
