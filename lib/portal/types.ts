export interface QuoteResponse {
  quote_id: string;
  customer_name: string;
  price_low: number;
  price_high: number;
  offering_tier: string;
  timeline_weeks: string;
  confidence_level: "High" | "Medium" | "Low";
  scope_summary: string;
  key_use_cases: string[];
  assumptions: string[];
  not_included: string[];
  recommended_next_steps: string;
  additional_services?: string;
  created_at: string;
}

export interface QuoteListItem {
  quote_id: string;
  customer_name: string;
  price_low: number;
  price_high: number;
  confidence_level: "High" | "Medium" | "Low";
  offering_tier: string;
  created_at: string;
}

export interface GenerateQuoteInput {
  deal_context: string;
  file?: File;
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
