/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swMinify: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true
    }
  });

  const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
  };

module.exports = withPWA(nextConfig);
