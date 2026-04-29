import { getWpUrl } from "@faustwp/core";
import { loadAllStories } from "../lib/customerStories";

export default function Sitemap() {
  return null;
}

export async function getServerSideProps(ctx) {
  // Determine base URL
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let base = envUrl;
  if (!base) {
    const proto = ctx?.req?.headers?.["x-forwarded-proto"] || "https";
    const host =
      ctx?.req?.headers?.["x-forwarded-host"] || ctx?.req?.headers?.host;
    if (host) base = `${proto}://${host}`;
  }
  base = (base || "https://greenirony.com").replace(/\/$/, "");

  // Collect static routes
  const staticPaths = [
    "/",
    "/about/",
    "/careers/",
    "/contact/",
    "/customer-stories/",
    "/insights/",
    "/services/agentforce/",
    "/services/mulesoft/",
    "/services/salesforce/",
    "/services/data/",
    "/agentforce-job-description/",
    "/ai-grant-management-guide-for-higher-education/",
    "/grant-agent/",
    "/grant-agent-demo-video/",
    "/mulesoft-reviver/",
    "/thank-you-grant-agent-demo-video/",
    "/thank-you-grant-agent-higher-ed-guide/",
    "/thank-you-mulesoft-reviver/",
    "/thanks/",
  ];

  // Collect customer story routes (with datePublished as lastmod)
  let storyEntries = [];
  try {
    const stories = loadAllStories() || [];
    storyEntries = stories.map((s) => ({
      loc: `/customer-stories/${s.slug}/`,
      lastmod: s.datePublished || undefined,
    }));
  } catch (err) {
    console.error("[sitemap] failed to load customer stories:", err);
  }

  // Collect WordPress posts/pages via WPGraphQL
  const wpUrl = getWpUrl();
  const graphqlEndpoint = `${wpUrl.replace(/\/$/, "")}/graphql`;
  let wpPaths = [];
  try {
    const query = `query Sitemap {
      posts(first: 500, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { uri slug status modifiedGmt date }
      }
      pages(first: 500, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { uri slug status modifiedGmt date }
      }
    }`;
    const resp = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (resp.ok) {
      const data = await resp.json();
      const posts = data?.data?.posts?.nodes || [];
      const pages = data?.data?.pages?.nodes || [];
      wpPaths = [...posts, ...pages]
        .filter((n) => {
          if (!n?.uri) return false;
          // Skip trashed posts (slug or uri may carry `__trashed` suffix)
          if (/__trashed/i.test(n.uri) || /__trashed/i.test(n.slug || ""))
            return false;
          // Defensive: only keep PUBLISH status
          if (n.status && n.status !== "publish") return false;
          return true;
        })
        .map((n) => ({
          loc: n.uri.startsWith("/") ? n.uri : `/${n.uri}`,
          lastmod: (n.modifiedGmt || n.date || "").split("T")[0] || undefined,
        }));
    } else {
      console.error("[sitemap] WPGraphQL non-OK response:", resp.status);
    }
  } catch (err) {
    console.error("[sitemap] WPGraphQL fetch failed:", err);
  }

  // Merge all URLs (uniqueness by loc; prefer entries with lastmod)
  const urlMap = new Map();
  const addLoc = (loc, lastmod) => {
    if (!loc) return;
    const norm = loc.endsWith("/") ? loc : `${loc}/`;
    const existing = urlMap.get(norm);
    // Set if missing or upgrade undefined → defined
    if (!existing || (!existing.lastmod && lastmod)) {
      urlMap.set(norm, { lastmod });
    }
  };
  staticPaths.forEach((p) => addLoc(p));
  storyEntries.forEach((e) => addLoc(e.loc, e.lastmod));
  wpPaths.forEach((n) => addLoc(n.loc, n.lastmod));

  const urls = Array.from(urlMap.entries()).map(([loc, { lastmod }]) => ({
    loc: `${base}${loc}`,
    lastmod,
  }));

  // Build XML
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) =>
        [
          "  <url>",
          `    <loc>${u.loc}</loc>`,
          u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : "",
          "  </url>",
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n") +
    `\n</urlset>`;

  ctx.res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // Cache at the edge for 10 minutes; serve stale up to an hour while revalidating.
  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=600, s-maxage=600, stale-while-revalidate=3600",
  );
  ctx.res.write(xml);
  ctx.res.end();
  return { props: {} };
}
