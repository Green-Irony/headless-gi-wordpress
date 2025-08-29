export default function RobotsTxt() { return null; }

export async function getServerSideProps({ req, res }) {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || '';
  const host = req?.headers?.host || '';
  const proto = (req?.headers?.['x-forwarded-proto'] || 'https');
  const origin = envBase || (host ? `${proto}://${host}` : '');
  const sitemapUrl = origin ? `${origin.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml';

  const lines = [
    // Global directives
    'User-agent: *',
    'Allow: /',
    '',
    // AI crawlers group (explicit grouping and spacing)
    '# Friendly to AI crawlers (AEO)',
    'User-agent: GPTBot',
    'User-agent: ChatGPT-User',
    'User-agent: Google-Extended',
    'User-agent: CCBot',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(lines);
  res.end();
  return { props: {} };
}


