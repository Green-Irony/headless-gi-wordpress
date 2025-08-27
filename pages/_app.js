import "../faust.config";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";
import Head from "next/head";
import { toAbsoluteUrl, buildCanonicalUrl } from "../lib/seo";
import { fetchSiteIconUrl } from "../queries/SiteSettingsQuery";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [faviconHref, setFaviconHref] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchSiteIconUrl().then((url) => {
      if (!isMounted) return;
      if (url) setFaviconHref(url);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#5AAD5A" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Green Irony" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="application-name" content="Green Irony" />
        {faviconHref ? (
          <link rel="icon" href={faviconHref} />
        ) : (
          <link rel="icon" href="/logos/green-irony/banksy-solo-transparent.png" type="image/png" />
        )}
        {/* Canonical URL */}
        {buildCanonicalUrl(router.asPath) ? (
          <link rel="canonical" href={buildCanonicalUrl(router.asPath)} key="canonical" />
        ) : null}
        {/* Hreflang (single-locale site) */}
        {buildCanonicalUrl(router.asPath) ? (
          <>
            <link rel="alternate" hrefLang="en" href={buildCanonicalUrl(router.asPath)} />
            <link rel="alternate" hrefLang="x-default" href={buildCanonicalUrl(router.asPath)} />
          </>
        ) : null}
        {/* Global Organization & WebSite JSON-LD */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Green Irony",
              url: toAbsoluteUrl('/') || undefined,
              logo: toAbsoluteUrl('/logos/green-irony/Green-Irony-Logo.svg') || undefined,
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Green Irony",
              url: toAbsoluteUrl('/') || undefined,
              potentialAction: {
                "@type": "SearchAction",
                target: toAbsoluteUrl('/insights?q={search_term_string}') || undefined,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <FaustProvider pageProps={pageProps}>
        <div className="min-h-screen flex flex-col" style={{ paddingTop: 'var(--gi-header-offset,64px)' }}>
          <style jsx global>{`:root{--gi-header-offset:64px}`}</style>
          <Component {...pageProps} key={router.asPath} />
        </div>
      </FaustProvider>
    </>
  );
}
