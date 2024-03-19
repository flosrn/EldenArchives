/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = withPlausibleProxy()({
  images: {
    remotePatterns: [
      {
        hostname: "*.githubusercontent.com",
      },
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "assets.erdb.workers.dev",
      },
    ],
  },
});

module.exports = nextConfig;
