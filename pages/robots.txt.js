export default function RobotsTxt() {
  return null;
}

export async function getServerSideProps({ req, res }) {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || "";
  const host = req?.headers?.host || "";
  const proto = req?.headers?.["x-forwarded-proto"] || "https";
  const origin =
    envBase || (host ? `${proto}://${host}` : "") || "https://greenirony.com";
  const sitemapUrl = `${origin.replace(/\/$/, "")}/sitemap.xml`;

  // AI crawlers we want to allow. Listed individually so each gets its
  // own group (some crawlers only honor directives in their own block).
  const aiCrawlers = [
    "GPTBot", // OpenAI training crawler
    "ChatGPT-User", // OpenAI grounded-search user-agent
    "OAI-SearchBot", // OpenAI search index
    "ClaudeBot", // Anthropic crawler
    "anthropic-ai", // Older Anthropic name (kept for back-compat)
    "Claude-Web", // Anthropic grounded-search user-agent
    "Google-Extended", // Google's AI training opt-in user-agent
    "PerplexityBot", // Perplexity crawler
    "Perplexity-User", // Perplexity grounded-search user-agent
    "Amazonbot", // Amazon (Alexa, AI training)
    "Applebot-Extended", // Apple's AI training opt-in
    "cohere-ai", // Cohere
    "Bytespider", // ByteDance / TikTok
    "CCBot", // Common Crawl
    "Diffbot", // Diffbot
    "FacebookBot", // Meta link expansion
    "ImagesiftBot", // Image-focused AI crawler
    "Meta-ExternalAgent", // Meta AI training
  ];

  const lines = [];
  // Default group — allow everything
  lines.push("User-agent: *");
  lines.push("Allow: /");
  lines.push("");

  // Per-bot groups for explicit AI-crawler allow.
  // Each crawler gets its own block to maximize compatibility with parsers
  // that don't support multiple User-agent lines per group.
  lines.push("# AI crawlers — explicitly allowed (AEO/AIO)");
  for (const ua of aiCrawlers) {
    lines.push(`User-agent: ${ua}`);
    lines.push("Allow: /");
    lines.push("");
  }

  lines.push(`Sitemap: ${sitemapUrl}`);
  lines.push("");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(lines.join("\n"));
  res.end();
  return { props: {} };
}
