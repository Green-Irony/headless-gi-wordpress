import "../faust.config";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { toAbsoluteUrl, buildCanonicalUrl } from "../lib/seo";
import { fetchSiteIconUrl } from "../queries/SiteSettingsQuery";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [faviconHref, setFaviconHref] = useState(null);
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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

  // GA4 pageview on route changes
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, GA_MEASUREMENT_ID]);

  return (
    <>
      {/* GA4 */}
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''}', { anonymize_ip: true${process.env.NODE_ENV !== 'production' ? ', debug_mode: true' : ''} });
            `}
          </Script>
        </>
      ) : null}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
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
