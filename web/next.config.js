const publicImages = ["favicon.ico", "next.svg", "vercel.svg"];

const publicCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=2592000",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  headers: () => [
    ...publicImages.map((image) => ({
      source: `/${image}`,
      headers: [publicCacheHeader],
    })),
  ],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
