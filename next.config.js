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
    return [
      { source: '/services', destination: '/services/agentforce/', permanent: true },
      { source: '/plan', destination: '/agentforce-job-description/', permanent: true },
      { source: '/8-week-plan', destination: '/agentforce-job-description/', permanent: true },
      { source: '/our-company', destination: '/about/', permanent: true },
      { source: '/our-team', destination: '/about/', permanent: true },
      { source: '/contact-us', destination: '/contact/', permanent: true },
    ];
  },
});
