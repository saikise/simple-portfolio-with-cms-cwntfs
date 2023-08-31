/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow loading images from your Supabase Storage
    domains: [`${process.env.SUPABASE_DOMAIN}`],
  },
};

module.exports = nextConfig;
