import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { listQuotes } from "./quoteService";
import type { QuoteListItem } from "./types";

export type PortalAccessStatus = "checking" | "ok" | "no-access" | "error";

interface PortalAccessValue {
  status: PortalAccessStatus;
  quotes: QuoteListItem[];
  errorMessage: string;
  refresh: () => void;
}

const PortalAccessContext = createContext<PortalAccessValue | null>(null);

export function PortalAccessProvider({ children }: { children: ReactNode }) {
  const { status: sessionStatus } = useSession();
  const [status, setStatus] = useState<PortalAccessStatus>("checking");
  const [quotes, setQuotes] = useState<QuoteListItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    let cancelled = false;
    setStatus("checking");
    listQuotes().then((result) => {
      if (cancelled) return;
      if (result.ok && result.data) {
        setQuotes(result.data);
        setErrorMessage("");
        setStatus("ok");
      } else if (result.errorCode === "FORBIDDEN") {
        setStatus("no-access");
        setErrorMessage(result.message ?? "You do not have access.");
      } else {
        setStatus("error");
        setErrorMessage(result.message ?? "Failed to load quotes");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [sessionStatus, version]);

  return (
    <PortalAccessContext.Provider
      value={{
        status,
        quotes,
        errorMessage,
        refresh: () => setVersion((v) => v + 1),
      }}
    >
      {children}
    </PortalAccessContext.Provider>
  );
}

export function usePortalAccess() {
  const ctx = useContext(PortalAccessContext);
  if (!ctx) {
    throw new Error("usePortalAccess must be used within PortalAccessProvider");
  }
  return ctx;
}
