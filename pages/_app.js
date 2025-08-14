import "../faust.config";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";
import Head from "next/head";
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
        {faviconHref ? (
          <link rel="icon" href={faviconHref} />
        ) : (
          <link rel="icon" href="/img/gi-logo.svg" type="image/svg+xml" />
        )}
      </Head>
      <FaustProvider pageProps={pageProps}>
        <div style={{ paddingTop: 64 }}>
          <Component {...pageProps} key={router.asPath} />
        </div>
      </FaustProvider>
    </>
  );
}
