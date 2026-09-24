const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative path with the site's base path (needed for GitHub Pages project sites). */
export function withBase(path: string): string {
	// Absolute URLs (e.g. an image hosted elsewhere) must not get the base path prepended.
	if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
	return `${base}/${path.replace(/^\//, '')}`;
}
