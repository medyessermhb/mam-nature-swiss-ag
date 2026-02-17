import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Water Particle Filter | Sediment Pre-Filter',
  description: 'Effective pre-filtration for sand, rust, and sediments. Automatic backwash valve means no consumables and zero maintenance.',
  openGraph: {
    title: 'Water Particle Filter | Mam Nature Swiss',
    description: 'Protect your plumbing from sediments. Zero maintenance required.',
    url: '/shop/particles-filter',
    images: ['/images/WEBSITE-P/products/PARTICLES_FILTER.webp']
  }
};

export default function ParticlesFilterLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Water Particle Filter',
    description: 'Eliminates sand, rust, and sediments. Automatic backwash valve. No consumables or maintenance. Protects entire plumbing system.',
    image: '/images/WEBSITE-P/products/PARTICLES_FILTER.webp',
    slug: 'particles-filter',
    priceKey: 'water-particle-filter',
    brand: 'Mam Nature Swiss'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}