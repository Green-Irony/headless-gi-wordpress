import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion as m, useReducedMotion } from "framer-motion";
import PortalShell from "../../../components/portal/PortalShell";
import QuoteResults from "../../../components/portal/QuoteResults";
import { getQuote } from "../../../lib/portal/quoteService";
import type { QuoteResponse } from "../../../lib/portal/types";

export default function QuoteDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    setLoading(true);
    getQuote(id).then((result) => {
      if (result.ok && result.data) {
        setQuote(result.data);
      } else {
        setError(result.message ?? "Quote not found");
      }
      setLoading(false);
    });
  }, [id]);

  const fade = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 0.35 },
  };

  return (
    <PortalShell title="Quote Details">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/portal/"
          className="inline-flex items-center gap-1 text-sm text-gi-navy/60 hover:text-gi-navy transition mb-6"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to dashboard
        </Link>

        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="animate-pulse text-gi-navy/50 text-sm">
              Loading quote...
            </div>
          </div>
        )}

        {!loading && error && (
          <m.div
            {...fade}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="rounded-2xl border border-gi-line bg-white shadow-gi p-8 max-w-md text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <svg
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gi-navy mb-2">
                Quote not found
              </h2>
              <p className="text-sm text-gi-navy/60 mb-6">{error}</p>
              <Link href="/portal/" className="btn-primary">
                Back to dashboard
              </Link>
            </div>
          </m.div>
        )}

        {!loading && quote && (
          <m.div {...fade}>
            <h1 className="text-2xl font-semibold text-gi-navy mb-1">
              {quote.customer_name}
            </h1>
            <p className="text-sm text-gi-navy/50 mb-6">
              Generated{" "}
              {new Date(quote.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <QuoteResults quote={quote} />
          </m.div>
        )}
      </main>
    </PortalShell>
  );
}
