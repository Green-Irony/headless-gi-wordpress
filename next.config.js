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
});
