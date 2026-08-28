const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative path with the site's base path (needed for GitHub Pages project sites). */
export function withBase(path: string): string {
	return `${base}/${path.replace(/^\//, '')}`;
}
