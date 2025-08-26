export default function RobotsTxt() { return null; }

export async function getServerSideProps({ res }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const sitemapUrl = base ? `${base.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml';

  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Friendly to AI crawlers (AEO)',
    'User-agent: GPTBot',
    'Allow: /',
    'User-agent: ChatGPT-User',
    'Allow: /',
    'User-agent: Google-Extended',
    'Allow: /',
    'User-agent: CCBot',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(lines);
  res.end();
  return { props: {} };
}


