import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';

  // 1. Main Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reports-certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 }
  ];

  // 2. All your Static Product Folders (Based on your screenshot)
  const productSlugs = [
    'cartridge',
    'complete-set',
    'complete-set-plus',
    'eco-set',
    'eco-set-plus',
    'essential',
    'essential-plus',
    'fine-filter',
    'hydrogen-booster',
    'particle-lime-set',
    'particles-filter',
    'dynamizer',
    'water-lime'
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8, // Products get a high priority
  }));

  // Combine them all
  return [...staticRoutes, ...productRoutes];
}