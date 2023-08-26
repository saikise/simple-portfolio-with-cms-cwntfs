/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow loading images from your Supabase local dev environment
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
