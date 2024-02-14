/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = withPlausibleProxy()({});

module.exports = nextConfig;
