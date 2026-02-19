export type QuoteStatus = "processing" | "completed" | "failed";

/** 202 response from POST /quote */
export interface QuoteSubmitResult {
  quote_id: string;
  status: QuoteStatus;
  message: string;
}

export interface QuoteResponse {
  quote_id: string;
  status: QuoteStatus;
  customer_name: string;
  price_low: number;
  price_high: number;
  offering_tier: string;
  timeline_weeks: number;
  confidence_level: "High" | "Medium" | "Low";
  scope_summary: string;
  key_use_cases: string[];
  assumptions: string[];
  not_included: string[];
  recommended_next_steps: string;
  additional_services?: string;
  schedule?: string;
  requesting_ae_name?: string;
  requesting_ae_email?: string;
  disclaimer?: string;
  created_at: string;
}

export interface QuoteListItem {
  quote_id: string;
  status: QuoteStatus;
  customer_name: string;
  price_low: number;
  price_high: number;
  confidence_level: "High" | "Medium" | "Low";
  offering_tier?: string;
  created_at: string;
}

export interface GenerateQuoteInput {
  description: string;
  files?: File[];
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
