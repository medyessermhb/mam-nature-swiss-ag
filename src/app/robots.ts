import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Use your real domain here
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block Google from scanning your checkout, admin panel, and backend APIs
      disallow: ['/checkout/', '/dashboard/', '/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}