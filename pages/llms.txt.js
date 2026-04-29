// llms.txt — proposed convention (https://llmstxt.org) for guiding LLM
// crawlers to the most useful content on a site. Markdown-formatted.
// Distinct from robots.txt: this is a curated content map, not access rules.

import { getWpUrl } from "@faustwp/core";
import { loadAllStories } from "../lib/customerStories";

export default function LlmsTxt() {
  return null;
}

function escapeMd(s) {
  return String(s || "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(s, n) {
  const t = stripHtml(s);
  if (t.length <= n) return t;
  return t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";
}

export async function getServerSideProps({ req, res }) {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || "";
  const host = req?.headers?.host || "";
  const proto = req?.headers?.["x-forwarded-proto"] || "https";
  const origin = (
    envBase || (host ? `${proto}://${host}` : "https://greenirony.com")
  ).replace(/\/$/, "");

  // Pull customer stories (sync, on disk)
  let stories = [];
  try {
    stories = loadAllStories() || [];
  } catch (err) {
    console.error("[llms.txt] failed to load customer stories:", err);
  }

  // Pull recent blog posts via WPGraphQL (with excerpts)
  const wpUrl = getWpUrl();
  const graphqlEndpoint = `${wpUrl.replace(/\/$/, "")}/graphql`;
  let posts = [];
  try {
    const query = `query LlmsTxtPosts {
      posts(first: 25, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { uri slug status title excerpt date }
      }
    }`;
    const resp = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (resp.ok) {
      const data = await resp.json();
      posts = (data?.data?.posts?.nodes || [])
        .filter(
          (n) =>
            n?.uri &&
            !/__trashed/i.test(n.uri) &&
            !/__trashed/i.test(n.slug || ""),
        )
        .map((n) => ({
          uri: n.uri.startsWith("/") ? n.uri : `/${n.uri}`,
          title: n.title || "",
          excerpt: clip(n.excerpt, 180),
          date: (n.date || "").split("T")[0],
        }));
    } else {
      console.error("[llms.txt] WPGraphQL non-OK response:", resp.status);
    }
  } catch (err) {
    console.error("[llms.txt] WPGraphQL fetch failed:", err);
  }

  // Build the markdown body per llms.txt spec
  const lines = [];
  lines.push("# Green Irony");
  lines.push("");
  lines.push(
    "> Green Irony helps enterprises become AI-native through Salesforce, MuleSoft integration, and Agentforce delivery — turning AI into actual intelligence.",
  );
  lines.push("");
  lines.push(
    "This document is provided for AI crawlers and grounded-search systems. " +
      "It curates the most useful URLs on greenirony.com, organized by topic. " +
      "All URLs are server-rendered HTML with structured metadata (JSON-LD).",
  );
  lines.push("");

  // Services
  lines.push("## Services");
  lines.push("");
  lines.push(
    `- [Agentforce Implementation](${origin}/services/agentforce/): Production-ready Salesforce Agentforce deployment, from architecture to ongoing optimization.`,
  );
  lines.push(
    `- [MuleSoft Integration](${origin}/services/mulesoft/): The integration layer that makes AI work — APIs, event-driven pipelines, system-of-record connections.`,
  );
  lines.push(
    `- [Salesforce Implementation](${origin}/services/salesforce/): Salesforce platform delivery, Sales/Service/Experience Cloud, and managed services.`,
  );
  lines.push(
    `- [Data & Migrations](${origin}/services/data/): Data architecture, migration strategy, and the foundation under any AI initiative.`,
  );
  lines.push("");

  // Customer Stories
  if (stories.length > 0) {
    lines.push("## Customer Stories");
    lines.push("");
    for (const s of stories) {
      const summary = escapeMd(s.excerpt || s.title || s.brand || "");
      const desc = summary ? `: ${clip(summary, 200)}` : "";
      lines.push(
        `- [${escapeMd(s.brand || s.title || s.slug)}](${origin}/customer-stories/${s.slug}/)${desc}`,
      );
    }
    lines.push("");
  }

  // Insights / Blog
  if (posts.length > 0) {
    lines.push("## Insights");
    lines.push("");
    for (const p of posts) {
      const desc = p.excerpt ? `: ${p.excerpt}` : "";
      lines.push(
        `- [${escapeMd(stripHtml(p.title))}](${origin}${p.uri})${desc}`,
      );
    }
    lines.push("");
  }

  // About
  lines.push("## About");
  lines.push("");
  lines.push(
    `- [Company](${origin}/about/): Mission, leadership, and how we work.`,
  );
  lines.push(`- [Careers](${origin}/careers/): Open roles at Green Irony.`);
  lines.push(
    `- [Contact](${origin}/contact/): Get in touch with the Green Irony team.`,
  );
  lines.push("");

  // Optional / Reference
  lines.push("## Optional");
  lines.push("");
  lines.push(
    `- [XML Sitemap](${origin}/sitemap.xml): Full machine-readable URL list.`,
  );
  lines.push(
    `- [Insights Index](${origin}/insights/): Browse all blog posts and articles.`,
  );
  lines.push(
    `- [Customer Stories Index](${origin}/customer-stories/): Browse all customer success stories.`,
  );
  lines.push("");

  const body = lines.join("\n");

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=600, s-maxage=600, stale-while-revalidate=3600",
  );
  res.write(body);
  res.end();
  return { props: {} };
}
