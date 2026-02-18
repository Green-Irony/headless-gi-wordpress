import type {
  ApiResult,
  GenerateQuoteInput,
  QuoteListItem,
  QuoteResponse,
} from "./types";
import { MOCK_QUOTES, MOCK_QUOTE_LIST } from "./mockData";

const USE_MOCK = !process.env.NEXT_PUBLIC_PORTAL_API_URL;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateQuote(
  input: GenerateQuoteInput,
  _userEmail: string,
): Promise<ApiResult<QuoteResponse>> {
  if (USE_MOCK) {
    await delay(2500);
    // Return a new quote based on the first mock, with a fresh ID and timestamp
    const mock: QuoteResponse = {
      ...MOCK_QUOTES[0],
      quote_id: `q-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    return { ok: true, data: mock };
  }

  try {
    const formData = new FormData();
    formData.append("deal_context", input.deal_context);
    if (input.file) formData.append("file", input.file);

    const res = await fetch("/api/portal/quote", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, message: body.message || "Failed to generate quote" };
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
    const res = await fetch("/api/portal/quotes");
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

export async function getQuote(
  id: string,
): Promise<ApiResult<QuoteResponse>> {
  if (USE_MOCK) {
    const quote = MOCK_QUOTES.find((q) => q.quote_id === id);
    if (!quote) return { ok: false, message: "Quote not found" };
    return { ok: true, data: quote };
  }

  try {
    const res = await fetch(`/api/portal/quotes/${encodeURIComponent(id)}`);
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
