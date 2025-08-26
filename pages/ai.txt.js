// Alternate filename some AEO crawlers look for
export default function AiTxt() { return null; }

export async function getServerSideProps({ res }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const sitemapUrl = base ? `${base.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml';

  const body = [
    '# ai.txt — guidance for AI crawlers',
    'Allow: /',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(body);
  res.end();
  return { props: {} };
}


