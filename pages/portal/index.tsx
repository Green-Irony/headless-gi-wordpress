import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion as m, useReducedMotion } from "framer-motion";
import PortalShell from "../../components/portal/PortalShell";
import {
  ConfidenceBadge,
  formatPrice,
} from "../../components/portal/QuoteResults";
import { listQuotes } from "../../lib/portal/quoteService";
import type { QuoteListItem } from "../../lib/portal/types";

export default function PortalDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [quotes, setQuotes] = useState<QuoteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  useEffect(() => {
    listQuotes().then((result) => {
      if (result.ok && result.data) {
        setQuotes(result.data);
      } else {
        setError(result.message ?? "Failed to load quotes");
      }
      setLoading(false);
    });
  }, []);

  const fade = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 0.35 },
  };

  return (
    <PortalShell>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <m.div {...fade}>
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gi-navy">
                Welcome back, {firstName}
              </h1>
              <p className="text-sm text-gi-navy/60 mt-1">
                Generate and manage integration quotes for your deals.
              </p>
            </div>
            <Link href="/portal/quotes/new/" className="btn-primary shrink-0">
              New Quote
            </Link>
          </div>

          {/* Quote list */}
          <div className="rounded-2xl border border-gi-line bg-white shadow-gi">
            <div className="px-6 py-4 border-b border-gi-line">
              <h2 className="text-lg font-semibold text-gi-navy">
                Quote History
              </h2>
            </div>

            {loading && (
              <div className="px-6 py-16 text-center">
                <div className="animate-pulse text-gi-navy/50 text-sm">
                  Loading quotes...
                </div>
              </div>
            )}

            {!loading && error && (
              <div className="px-6 py-16 text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {!loading && !error && quotes.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gi-fog">
                  <svg
                    className="h-6 w-6 text-gi-navy/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gi-navy mb-1">
                  No quotes yet
                </p>
                <p className="text-sm text-gi-navy/50 mb-4">
                  Generate your first quote to get started.
                </p>
                <Link href="/portal/quotes/new/" className="btn-primary">
                  Generate your first quote
                </Link>
              </div>
            )}

            {!loading && !error && quotes.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gi-line text-left text-xs text-gi-navy/50">
                      <th className="px-6 py-3 font-medium">Customer</th>
                      <th className="px-6 py-3 font-medium">Price Range</th>
                      <th className="px-6 py-3 font-medium">Confidence</th>
                      <th className="px-6 py-3 font-medium hidden sm:table-cell">
                        Offering
                      </th>
                      <th className="px-6 py-3 font-medium hidden md:table-cell">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q) => (
                      <tr
                        key={q.quote_id}
                        onClick={() =>
                          router.push(`/portal/quotes/${q.quote_id}/`)
                        }
                        className="border-b border-gi-line hover:bg-gi-fog/50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 font-medium text-gi-navy">
                          {q.customer_name}
                        </td>
                        <td className="px-6 py-4 text-gi-navy/70">
                          {formatPrice(q.price_low, q.price_high)}
                        </td>
                        <td className="px-6 py-4">
                          <ConfidenceBadge level={q.confidence_level} />
                        </td>
                        <td className="px-6 py-4 text-gi-navy/70 hidden sm:table-cell">
                          {q.offering_tier}
                        </td>
                        <td className="px-6 py-4 text-gi-navy/50 hidden md:table-cell">
                          {new Date(q.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </m.div>
      </main>
    </PortalShell>
  );
}
