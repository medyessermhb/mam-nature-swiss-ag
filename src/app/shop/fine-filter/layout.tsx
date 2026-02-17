import { Metadata } from 'next';
import { getProductJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'Water Fine Filter | Selective Water Filtration',
  description: 'Advanced membrane and activated carbon filtration. Removes heavy metals, pesticides, and microplastics while keeping essential minerals.',
  openGraph: {
    title: 'Water Fine Filter | Mam Nature Swiss',
    description: 'Pure water rich in minerals, free from contaminants.',
    url: '/shop/fine-filter',
    images: ['/images/WEBSITE-P/products/FINE_FILTER.webp']
  }
};

export default function FineFilterLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getProductJsonLd({
    name: 'Water Fine Filter',
    description: 'Selective filtration: eliminates microplastics and heavy metals while preserving minerals. Quadruple filtration system.',
    image: '/images/WEBSITE-P/products/FINE_FILTER.webp',
    slug: 'fine-filter',
    priceKey: 'mam-nature-water-fine-filter',
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