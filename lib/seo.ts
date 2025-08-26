export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  if (!envUrl) return '';
  try {
    const url = new URL(envUrl);
    // Always ensure trailing slash
    return url.origin + '/';
  } catch {
    return '';
  }
}

export function buildCanonicalUrl(pathname: string): string {
  const base = getBaseUrl();
  if (!base) return '';
  // Remove query/hash and normalize leading/trailing slashes
  let raw = pathname || '/';
  // Drop query/hash if present
  raw = raw.split('#')[0].split('?')[0] || '/';
  // Ensure leading slash
  if (!raw.startsWith('/')) raw = `/${raw}`;
  // Determine if looks like a file (keep as-is)
  const seemsFile = /\.[a-z0-9]{2,8}$/i.test(raw);
  // Enforce trailing slash for page routes to match Next.js trailingSlash config
  if (!seemsFile && !raw.endsWith('/')) raw = `${raw}/`;
  // Collapse duplicate slashes
  raw = raw.replace(/\/+/g, '/');
  return new URL(raw, base).toString();
}

export function toAbsoluteUrl(input: string | undefined | null): string {
  if (!input) return '';
  try {
    // Already absolute
    const u = new URL(input);
    return u.toString();
  } catch {
    const base = getBaseUrl();
    if (!base) return input;
    try {
      return new URL(input.startsWith('/') ? input : `/${input}`, base).toString();
    } catch {
      return input;
    }
  }
}


