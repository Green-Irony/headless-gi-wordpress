const { withFaust } = require("@faustwp/core");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bpheadlessgiwe.wpengine.com',
      },
      {
        protocol: 'https',
        hostname: 'bpheadlessgiwe.wpenginepowered.com',
      },
      {
        protocol: 'https',
        hostname: '**.wpengine.com',
      },
      {
        protocol: 'https',
        hostname: '**.wpenginepowered.com',
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    const extraRedirects = require('./redirects.js');
    return [
      { source: '/services', destination: '/services/agentforce/', permanent: true },
      { source: '/plan', destination: '/agentforce-job-description/', permanent: true },
      { source: '/8-week-plan', destination: '/agentforce-job-description/', permanent: true },
      { source: '/our-company', destination: '/about/', permanent: true },
      { source: '/our-team', destination: '/about/', permanent: true },
      { source: '/contact-us', destination: '/contact/', permanent: true },
      // Legacy site redirects from sitemap
      { source: '/additional-industries', destination: '/customer-stories/', permanent: true },
      { source: '/artificial-intelligence', destination: '/services/agentforce/', permanent: true },
      { source: '/blog', destination: '/insights/', permanent: true },
      { source: '/financial-services-industry', destination: '/customer-stories/', permanent: true },
      { source: '/higher-education', destination: '/customer-stories/', permanent: true },
      { source: '/implementation', destination: '/services/salesforce/', permanent: true },
      { source: '/managed-services', destination: '/contact/', permanent: true },
      { source: '/mulesoft-solutions', destination: '/services/mulesoft/', permanent: true },
      { source: '/agentforce-solutions', destination: '/services/agentforce/', permanent: true },
      { source: '/no-bs-ai-consultation', destination: '/agentforce-job-description/', permanent: true },
      { source: '/privacy-policy', destination: '/terms/', permanent: true },
      { source: '/request-beta-access', destination: '/contact/', permanent: true },
      { source: '/resources', destination: '/insights/', permanent: true },
      { source: '/salesforce-solutions', destination: '/services/salesforce/', permanent: true },
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/staff-augmentation', destination: '/contact/', permanent: true },
      { source: '/strategy', destination: '/services/agentforce/', permanent: true },
      { source: '/travel-transportation-hospitality', destination: '/customer-stories/', permanent: true },
      // Consolidate legacy thank-you style pages
      { source: '/thank-you', destination: '/thanks/', permanent: true },
      { source: '/thank-you/:path*', destination: '/thanks/', permanent: true },
      ...extraRedirects,
    ];
  },
});
