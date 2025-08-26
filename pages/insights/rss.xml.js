import { gql } from '@apollo/client';
import { getApolloClient } from '@faustwp/core';

const RSS_QUERY = gql`
  query RssPosts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }) {
      nodes {
        id
        slug
        uri
        title
        excerpt
        date
      }
    }
  }
`;

export default function Rss() { return null; }

export async function getServerSideProps({ res, req }) {
  const client = getApolloClient();
  const { data } = await client.query({ query: RSS_QUERY, variables: { first: 30 }, fetchPolicy: 'no-cache' });
  const posts = data?.posts?.nodes || [];

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || (host ? `${proto}://${host}` : '')).replace(/\/$/, '');

  const items = posts.map((p) => {
    const link = p?.uri?.startsWith('/') ? `${site}${p.uri}` : `${site}/${p?.slug || ''}`;
    const description = (p?.excerpt || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return `\n  <item>\n    <title>${escapeXml(p?.title || '')}</title>\n    <link>${escapeXml(link)}</link>\n    <guid isPermaLink="true">${escapeXml(link)}</guid>\n    <pubDate>${new Date(p?.date || Date.now()).toUTCString()}</pubDate>\n    <description>${escapeXml(description)}</description>\n  </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0">\n` +
  `<channel>\n` +
  `  <title>Green Irony Insights</title>\n` +
  `  <link>${escapeXml(site + '/insights/')}</link>\n` +
  `  <description>Clarity in the age of AI</description>\n` +
  `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>` +
  items +
  `\n</channel>\n</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.write(xml);
  res.end();
  return { props: {} };
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}


