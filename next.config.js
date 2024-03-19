/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = withPlausibleProxy()({
  // redirects: async () => {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/items?type=armor",
  //       permanent: true,
  //     },
  //   ];
  // },
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
