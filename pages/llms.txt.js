// Non-standard but emerging convention for LLM crawlers (AEO)
export default function LlmsTxt() { return null; }

export async function getServerSideProps({ res }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const sitemapUrl = base ? `${base.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml';

  const body = [
    '# llms.txt — guidance for AI crawlers',
    'Allow: /',
    '',
    '# Known AI crawlers',
    'User-agent: GPTBot',
    'User-agent: ChatGPT-User',
    'User-agent: Google-Extended',
    'User-agent: CCBot',
    '',
    `Sitemap: ${sitemapUrl}`,
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(body);
  res.end();
  return { props: {} };
}


