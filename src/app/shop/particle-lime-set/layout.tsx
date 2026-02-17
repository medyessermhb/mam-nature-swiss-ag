import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Particle & Lime Set | Complete Plumbing Protection',
  description: 'Dual protection system: eliminates sediments, sand, and rust while preventing limescale buildup physically. Zero maintenance and eco-friendly.',
  openGraph: {
    title: 'Particle & Lime Set | Mam Nature Swiss',
    description: 'Protect your appliances and pipes from sediments and hard limescale.',
    url: '/shop/particle-lime-set',
    images: ['/images/WEBSITE-P/products/particle_+_water_lime.webp']
  }
};

export default function ParticleLimeSetLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Particle & Lime Set',
    description: 'Dual protection for plumbing and appliances. Stops sand and rust with automatic backwash. Converts hard limescale into soft Aragonite. Zero salt, zero chemicals.',
    image: '/images/WEBSITE-P/products/particle_+_water_lime.webp',
    slug: 'particle-lime-set',
    priceKey: 'mam-nature-particle-lime-set',
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