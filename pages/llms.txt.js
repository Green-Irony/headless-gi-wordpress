// Non-standard but emerging convention for LLM crawlers (AEO)
export default function LlmsTxt() { return null; }

export async function getServerSideProps({ req, res }) {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || '';
  const host = req?.headers?.host || '';
  const proto = (req?.headers?.['x-forwarded-proto'] || 'https');
  const origin = envBase || (host ? `${proto}://${host}` : '');
  const sitemapUrl = origin ? `${origin.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml';

  const body = [
    '# llms.txt — guidance for AI crawlers',
    '',
    // Global group
    'User-agent: *',
    'Allow: /',
    '',
    // Explicit AI crawler groups
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    'User-agent: CCBot',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(body);
  res.end();
  return { props: {} };
}


