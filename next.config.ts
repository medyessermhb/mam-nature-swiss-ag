import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/impressum',
        destination: '/terms',
        permanent: true, // 301 Redirect for SEO
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/accueil', // guessing the /ac... is French root
        destination: '/',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
