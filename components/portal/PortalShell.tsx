import { type ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useInactivityTimeout } from "../../lib/portal/useInactivityTimeout";

interface PortalShellProps {
  title?: string;
  children: ReactNode;
}

export default function PortalShell({
  title = "Partner Portal",
  children,
}: PortalShellProps) {
  const { data: session, status } = useSession();
  useInactivityTimeout();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gi-fog flex items-center justify-center">
        <div className="animate-pulse text-gi-navy/50 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title} | Green Irony</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gi-fog">
        <header className="bg-white border-b border-gi-line">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/portal/">
                <img
                  src="/logos/green-irony/Green-Irony-Logo.svg"
                  alt="Green Irony"
                  className="h-8"
                />
              </Link>
              <span className="inline-flex items-center rounded-md bg-gi-green/10 px-2 py-1 text-xs font-medium text-gi-green ring-1 ring-inset ring-gi-green/20">
                Portal
              </span>
            </div>

            <div className="flex items-center gap-4">
              {session?.user?.image && (
                <img
                  src={session.user.image}
                  alt=""
                  className="h-8 w-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
              )}
              <span className="hidden sm:block text-sm text-gi-navy">
                {session?.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-gi-navy/60 hover:text-gi-navy transition"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        {children}
      </div>
    </>
  );
}
