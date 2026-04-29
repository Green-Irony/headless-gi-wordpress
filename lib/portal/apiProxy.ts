/**
 * Shared proxy utilities for portal API routes.
 * Handles camelCase ↔ snake_case key transformation and fetch wrappers.
 */

function camelToSnakeKey(key: string): string {
  return key.replace(/[A-Z]/g, (ch) => `_${ch.toLowerCase()}`);
}

function snakeToCamelKey(key: string): string {
  return key.replace(/_([a-z])/g, (_, ch) => ch.toUpperCase());
}

/** Deep-transform all object keys from camelCase to snake_case */
export function camelToSnake(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(camelToSnake);
  if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[camelToSnakeKey(key)] = camelToSnake(value);
    }
    return result;
  }
  return obj;
}

/** Deep-transform all object keys from snake_case to camelCase */
export function snakeToCamel(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[snakeToCamelKey(key)] = snakeToCamel(value);
    }
    return result;
  }
  return obj;
}

export function getBaseUrl(): string | undefined {
  return process.env.PORTAL_API_BASE_URL;
}

function buildHeaders(accessToken?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // MuleSoft API Manager client credentials
  if (process.env.PORTAL_API_CLIENT_ID) {
    headers["client_id"] = process.env.PORTAL_API_CLIENT_ID;
  }
  if (process.env.PORTAL_API_CLIENT_SECRET) {
    headers["client_secret"] = process.env.PORTAL_API_CLIENT_SECRET;
  }

  // Google OAuth access token from the user's session
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return { status: res.status, data: camelToSnake(json) };
  } catch {
    // API returned non-JSON (e.g. plain text error)
    console.error(
      `API returned non-JSON (HTTP ${res.status}):`,
      text.slice(0, 200),
    );
    return {
      status: res.status,
      data: { message: text || `API error (HTTP ${res.status})` },
    };
  }
}

export async function proxyGet(path: string, accessToken?: string) {
  const base = getBaseUrl();
  if (!base) throw new Error("PORTAL_API_BASE_URL not configured");

  const url = `${base}${path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: buildHeaders(accessToken),
  });

  return parseResponse(res);
}

export async function proxyPostFormData(
  path: string,
  formData: Buffer,
  contentType: string,
  accessToken?: string,
) {
  const base = getBaseUrl();
  if (!base) throw new Error("PORTAL_API_BASE_URL not configured");

  const url = `${base}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...buildHeaders(accessToken),
      "Content-Type": contentType,
    },
    body: new Uint8Array(formData),
  });

  return parseResponse(res);
}
