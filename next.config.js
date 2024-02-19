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
    ],
  },
});

module.exports = nextConfig;
