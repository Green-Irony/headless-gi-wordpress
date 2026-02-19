import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion as m, useReducedMotion } from "framer-motion";
import PortalShell from "../../../components/portal/PortalShell";
import QuoteResults from "../../../components/portal/QuoteResults";
import { getQuote } from "../../../lib/portal/quoteService";
import type { QuoteResponse } from "../../../lib/portal/types";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 180000; // 3 minutes

export default function QuoteDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPolling(false);
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    setLoading(true);
    getQuote(id).then((result) => {
      if (result.ok && result.data) {
        const data = result.data;
        if (data.status === "processing") {
          setQuote(data);
          setPolling(true);
          setLoading(false);

          // Start polling
          timeoutRef.current = setTimeout(() => {
            stopPolling();
            setError(
              "Quote generation is taking longer than expected. Please check back later.",
            );
          }, POLL_TIMEOUT_MS);

          pollRef.current = setInterval(async () => {
            const pollResult = await getQuote(id);
            if (!pollResult.ok) {
              stopPolling();
              setError(pollResult.message ?? "Failed to retrieve quote");
              return;
            }
            const pollData = pollResult.data!;
            if (pollData.status === "completed") {
              stopPolling();
              setQuote(pollData);
            } else if (pollData.status === "failed") {
              stopPolling();
              setError("Quote generation failed.");
            }
          }, POLL_INTERVAL_MS);
        } else if (data.status === "failed") {
          setError("This quote failed to generate.");
          setLoading(false);
        } else {
          setQuote(data);
          setLoading(false);
        }
      } else {
        setError(result.message ?? "Quote not found");
        setLoading(false);
      }
    });
  }, [id, stopPolling]);

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

        {!loading && polling && (
          <m.div
            {...fade}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="rounded-2xl border border-gi-line bg-white shadow-gi p-10 flex flex-col items-center gap-5">
              <div className="flex items-center justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <m.span
                    key={i}
                    className="block h-2.5 w-2.5 rounded-full bg-gi-green"
                    animate={reduced ? {} : { y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gi-navy/60">
                This quote is still being generated...
              </p>
              <p className="text-xs text-gi-navy/40">
                This usually takes 30–60 seconds
              </p>
            </div>
          </m.div>
        )}

        {!loading && !polling && error && (
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

        {!loading && !polling && !error && quote && (
          <m.div {...fade}>
            <h1 className="text-2xl font-semibold text-gi-navy mt-4 mb-6">
              {quote.customer_name} — {quote.offering_tier}
            </h1>
            <QuoteResults quote={quote} />
          </m.div>
        )}
      </main>
    </PortalShell>
  );
}
