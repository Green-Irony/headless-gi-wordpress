import { useState, useRef, useEffect, useCallback, type DragEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion as m, AnimatePresence, useReducedMotion } from "framer-motion";
import PortalShell from "../../../components/portal/PortalShell";
import QuoteResults from "../../../components/portal/QuoteResults";
import { generateQuote, getQuote } from "../../../lib/portal/quoteService";
import type { QuoteResponse } from "../../../lib/portal/types";

const ALLOWED_MIME = [
  "text/plain",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXT = [".txt", ".pdf", ".docx"];
const MAX_FILES = 5;
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 180000; // 3 minutes

function isFileAllowed(file: File) {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  return ALLOWED_MIME.includes(file.type) || ALLOWED_EXT.includes(ext);
}

function BouncingDots({ reduced }: { reduced: boolean }) {
  return (
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
  );
}

type ViewState = "input" | "generating" | "results" | "error";

export default function NewQuotePage() {
  const { data: session } = useSession();
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [view, setView] = useState<ViewState>("input");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canGenerate = description.trim().length > 0 || files.length > 0;

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  function startPolling(quoteId: string) {
    // Set a timeout to abort after POLL_TIMEOUT_MS
    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setErrorMessage(
        "Quote generation is taking longer than expected. Please check back later or try again.",
      );
      setView("error");
    }, POLL_TIMEOUT_MS);

    pollRef.current = setInterval(async () => {
      const result = await getQuote(quoteId);
      if (!result.ok) {
        stopPolling();
        setErrorMessage(result.message ?? "Failed to retrieve quote");
        setView("error");
        return;
      }

      const data = result.data!;
      if (data.status === "completed") {
        stopPolling();
        setQuote(data);
        setView("results");
      } else if (data.status === "failed") {
        stopPolling();
        setErrorMessage("Quote generation failed. Please try again.");
        setView("error");
      }
      // status === "processing" → keep polling
    }, POLL_INTERVAL_MS);
  }

  async function handleGenerate() {
    setView("generating");
    const result = await generateQuote(
      { description, files: files.length > 0 ? files : undefined },
      session?.user?.email ?? "",
    );
    if (result.ok && result.data) {
      startPolling(result.data.quote_id);
    } else {
      setErrorMessage(result.message ?? "Something went wrong");
      setView("error");
    }
  }

  function handleRefine() {
    setView("input");
  }

  function handleTryAgain() {
    stopPolling();
    setErrorMessage("");
    setView("input");
  }

  function addFiles(newFiles: FileList | File[]) {
    const allowed = Array.from(newFiles).filter(isFileAllowed);
    setFiles((prev) => {
      const combined = [...prev, ...allowed];
      return combined.slice(0, MAX_FILES);
    });
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }
  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files);
    // Reset the input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const fade = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduced ? 0 : -8 },
    transition: { duration: reduced ? 0.15 : 0.35, delay },
  });

  return (
    <PortalShell title="New Quote">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
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

        <AnimatePresence mode="wait">
          {/* INPUT */}
          {view === "input" && (
            <m.div key="input" {...fade()}>
              <div className="rounded-2xl border border-gi-line bg-white shadow-gi p-6 sm:p-8">
                <h1 className="text-2xl font-semibold text-gi-navy">
                  Quote Generator
                </h1>
                <p className="text-sm text-gi-navy/60 mt-1 mb-6">
                  Describe the deal context — technology stack, integration
                  requirements, timeline, and any other relevant details.
                </p>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Our client needs a Salesforce ↔ NetSuite integration for order-to-cash. They have MuleSoft Anypoint Platform and want real-time sync. ~200 orders/day, 3 Salesforce orgs..."
                  className="w-full rounded-xl border border-gi-line bg-gi-fog/50 px-4 py-3 text-sm text-gi-navy placeholder:text-gi-navy/40 focus:outline-none focus:ring-2 focus:ring-gi-green focus:border-transparent resize-y"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? "border-gi-green bg-gi-green/5"
                      : "border-gi-line hover:border-gi-navy/30"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.pdf,.docx"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {files.length > 0 ? (
                    <div className="w-full space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center gap-2 text-sm text-gi-navy"
                        >
                          <svg
                            className="h-5 w-5 text-gi-green shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                            />
                          </svg>
                          <span className="font-medium truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                            className="ml-auto text-gi-navy/40 hover:text-gi-pink transition shrink-0"
                            aria-label={`Remove ${file.name}`}
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {files.length < MAX_FILES && (
                        <p className="text-xs text-gi-navy/40 text-center pt-1">
                          Drop or click to add more files ({files.length}/
                          {MAX_FILES})
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <svg
                        className="h-8 w-8 text-gi-navy/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <p className="text-sm text-gi-navy/50">
                        Have call recordings or transcripts? Drop them here for
                        a more accurate quote.
                      </p>
                      <p className="text-xs text-gi-navy/30">
                        .txt, .pdf, or .docx — up to {MAX_FILES} files
                      </p>
                    </>
                  )}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="btn-primary mt-6 w-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Generate Quote
                </button>
              </div>
            </m.div>
          )}

          {/* GENERATING (polling) */}
          {view === "generating" && (
            <m.div
              key="generating"
              {...fade()}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="rounded-2xl border border-gi-line bg-white shadow-gi p-10 flex flex-col items-center gap-5">
                <BouncingDots reduced={reduced} />
                <p className="text-sm text-gi-navy/60">
                  Analyzing your deal context...
                </p>
                <p className="text-xs text-gi-navy/40">
                  This usually takes 30–60 seconds
                </p>
              </div>
            </m.div>
          )}

          {/* RESULTS */}
          {view === "results" && quote && (
            <m.div key="results" {...fade()}>
              <QuoteResults quote={quote} onRefine={handleRefine} />
            </m.div>
          )}

          {/* ERROR */}
          {view === "error" && (
            <m.div
              key="error"
              {...fade()}
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
                  Something went wrong
                </h2>
                <p className="text-sm text-gi-navy/60 mb-6">{errorMessage}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleTryAgain}
                    className="btn-primary"
                  >
                    Try again
                  </button>
                  <Link href="/contact/" className="btn-secondary">
                    Contact Green Irony
                  </Link>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </main>
    </PortalShell>
  );
}
