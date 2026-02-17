import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'The Essential | Water Fine Filter',
  description: 'Selective filtration that removes microplastics, heavy metals, and chlorine while preserving essential minerals. Compact, medical-grade stainless steel design.',
  openGraph: {
    title: 'The Essential Water Filter | Mam Nature Swiss',
    description: 'Naturally pure water right from your tap. No electricity or chemicals.',
    url: '/shop/essential',
    images: ['/images/WEBSITE-P/products/ESSENTIAL.webp']
  }
};

export default function EssentialLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'The Essential',
    description: 'Selective filtration that removes microplastics, heavy metals, and chlorine while preserving essential minerals. Compact, medical-grade stainless steel design.',
    image: '/images/WEBSITE-P/products/ESSENTIAL.webp',
    slug: 'essential',
    priceKey: 'mam-nature-essential-set',
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