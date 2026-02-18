import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

export default function PortalSignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const error = router.query.error as string | undefined;
  const callbackUrl = (router.query.callbackUrl as string) || "/portal/";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen bg-gi-fog flex items-center justify-center">
        <div className="animate-pulse text-gi-navy/50 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sign In | Green Irony Partner Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gi-fog flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-gi p-8 text-center">
          {/* Logo */}
          <img
            src="/logos/green-irony/Green-Irony-Logo.svg"
            alt="Green Irony"
            className="h-10 mx-auto mb-6"
          />

          <h1 className="text-xl font-semibold text-gi-navy mb-1">
            Partner Portal
          </h1>
          <p className="text-sm text-gi-navy/60 mb-8">
            Sign in with your organization account
          </p>

          {/* Error message */}
          {error === "AccessDenied" && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              Access is restricted to authorized partner domains. Please sign in
              with your <strong>@salesforce.com</strong>,{" "}
              <strong>@mulesoft.com</strong>, or{" "}
              <strong>@greenirony.com</strong> email.
            </div>
          )}

          {error && error !== "AccessDenied" && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              An error occurred during sign-in. Please try again.
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-gi-line bg-white px-4 py-3 text-sm font-medium text-gi-navy shadow-sm transition hover:bg-gi-fog hover:shadow-md"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-xs text-gi-navy/40">
            Authorized partner access only
          </p>
        </div>
      </div>
    </>
  );
}
