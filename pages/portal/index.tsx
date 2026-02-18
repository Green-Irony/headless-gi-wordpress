import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const PLACEHOLDER_CARDS = [
  {
    title: "Projects",
    description: "View and manage joint implementation projects",
    icon: (
      <svg className="h-6 w-6 text-gi-green" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    title: "Documents",
    description: "Access shared resources and documentation",
    icon: (
      <svg className="h-6 w-6 text-gi-green" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Support",
    description: "Get help and submit support requests",
    icon: (
      <svg className="h-6 w-6 text-gi-green" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
];

export default function PortalDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gi-fog flex items-center justify-center">
        <div className="animate-pulse text-gi-navy/50 text-sm">Loading...</div>
      </div>
    );
  }

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <>
      <Head>
        <title>Partner Portal | Green Irony</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gi-fog">
        {/* Portal header */}
        <header className="bg-white border-b border-gi-line">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logos/green-irony/Green-Irony-Logo.svg"
                alt="Green Irony"
                className="h-8"
              />
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

        {/* Dashboard content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gi-navy">
              Welcome, {firstName}
            </h1>
            <p className="text-sm text-gi-navy/60 mt-1">
              {session?.user?.email}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl border border-gi-line p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  {card.icon}
                  <h2 className="text-lg font-semibold text-gi-navy">
                    {card.title}
                  </h2>
                </div>
                <p className="text-sm text-gi-navy/60 mb-4">
                  {card.description}
                </p>
                <span className="inline-flex items-center rounded-full bg-gi-fog px-3 py-1 text-xs font-medium text-gi-navy/40">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
