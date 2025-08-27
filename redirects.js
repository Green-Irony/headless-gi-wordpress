/**
 * Centralized redirects for ad-hoc/broken links found in content.
 *
 * Usage:
 * - Add objects to the array below with { source, destination, permanent }
 * - Example: { source: '/old-path', destination: '/new-path/', permanent: true }
 * - Note: Redirects are evaluated in order, and apply after the built-ins in next.config.js
 */

/** @type {import('next').Redirect[]} */
module.exports = [
  // Temporary fixes for legacy content links discovered in blog posts
  { source: '/offering-automation-workshop/', destination: '/services/agentforce/', permanent: true },
  { source: '/ebook-salesforce-automated-workflows-fueled-by-mulesoft/', destination: '/services/mulesoft/', permanent: true },
  { source: '/webinar-securing-your-future-mulesoft-noname/', destination: '/services/mulesoft/', permanent: true },
  { source: '/offering-revive-and-maximize-mulesoft-anypoint-platform/', destination: '/mulesoft-reviver/', permanent: true },
  { source: '/chat-gpt-4-api-connector-for-mulesoft/', destination: '/services/mulesoft/', permanent: true },
  { source: '/webinar-insurance-data-risk-calculations/', destination: '/services/data/', permanent: true },
];


