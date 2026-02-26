import { signOut } from "next-auth/react";
import type {
  ApiResult,
  GenerateQuoteInput,
  QuoteListItem,
  QuoteResponse,
  QuoteSubmitResult,
} from "./types";
import { MOCK_QUOTES, MOCK_QUOTE_LIST } from "./mockData";

const USE_MOCK = !process.env.NEXT_PUBLIC_PORTAL_API_ENABLED;

/**
 * Wrapper around fetch that auto-signs the user out when the API returns
 * 403 with code TOKEN_EXPIRED. This means MuleSoft rejected the Google
 * id_token (expired or invalid) — as opposed to 401 which is a local
 * NextAuth cookie issue (e.g. brief race on first load).
 */
async function portalFetch(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(url, init);
  if (res.status === 403) {
    const body = await res.clone().json().catch(() => ({}));
    if (body.code === "TOKEN_EXPIRED") {
      signOut({ callbackUrl: "/portal/sign-in/" });
      throw new Error("Session expired");
    }
  }
  return res;
}

// Track mock quote IDs that have been "polled" at least once, so the second
// poll returns completed data (simulates async generation).
const mockPolledOnce = new Set<string>();

export async function generateQuote(
  input: GenerateQuoteInput,
  _userEmail: string,
): Promise<ApiResult<QuoteSubmitResult>> {
  if (USE_MOCK) {
    const quoteId = `q-${Date.now()}`;
    // Stash a completed mock so getQuote can find it on the second poll
    const mock: QuoteResponse = {
      ...MOCK_QUOTES[0],
      quote_id: quoteId,
      status: "completed",
      created_at: new Date().toISOString(),
    };
    pendingMockQuotes.set(quoteId, mock);

    return {
      ok: true,
      data: {
        quote_id: quoteId,
        status: "processing",
        message: "Your quote request has been accepted and is being generated.",
      },
    };
  }

  try {
    const formData = new FormData();
    formData.append("description", input.description);
    if (input.files) {
      for (const file of input.files) {
        formData.append("documents", file);
      }
    }

    const res = await portalFetch("/api/portal/quote", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        ok: false,
        message: body.message || "Failed to generate quote",
      };
    }

    const data: QuoteSubmitResult = await res.json();
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Network error — please try again" };
  }
}

// In-memory store for mock quotes that were "generated" this session
const pendingMockQuotes = new Map<string, QuoteResponse>();

export async function getQuote(
  id: string,
): Promise<ApiResult<QuoteResponse>> {
  if (USE_MOCK) {
    // Check if this is a freshly generated mock quote
    const pending = pendingMockQuotes.get(id);
    if (pending) {
      // First poll returns "processing", second poll returns completed
      if (!mockPolledOnce.has(id)) {
        mockPolledOnce.add(id);
        return {
          ok: true,
          data: {
            ...pending,
            status: "processing",
            // Strip result fields to simulate in-progress state
            scope_summary: "",
            key_use_cases: [],
            assumptions: [],
            not_included: [],
            recommended_next_steps: "",
          },
        };
      }
      return { ok: true, data: pending };
    }

    // Existing mock quote from seed data
    const quote = MOCK_QUOTES.find((q) => q.quote_id === id);
    if (!quote) return { ok: false, message: "Quote not found" };
    return { ok: true, data: quote };
  }

  try {
    const res = await portalFetch(`/api/portal/quotes/${encodeURIComponent(id)}`);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, message: body.message || "Failed to load quote" };
    }
    const data: QuoteResponse = await res.json();
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Network error — please try again" };
  }
}

export async function listQuotes(): Promise<ApiResult<QuoteListItem[]>> {
  if (USE_MOCK) {
    return { ok: true, data: MOCK_QUOTE_LIST };
  }

  try {
    const res = await portalFetch("/api/portal/quotes");
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, message: body.message || "Failed to load quotes" };
    }
    const data: QuoteListItem[] = await res.json();
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Network error — please try again" };
  }
}
