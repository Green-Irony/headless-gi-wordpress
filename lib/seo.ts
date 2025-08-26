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
  // Normalize leading/trailing slashes
  const path = (pathname || '/').startsWith('/') ? pathname : `/${pathname}`;
  return new URL(path, base).toString();
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


