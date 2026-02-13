import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Fine Filter | Medical-Grade Stainless Steel',
  description: 'High-pressure resistant filtration housing made of medical-grade stainless steel. Eliminates chlorine, heavy metals, and PFAS with Swiss-engineered precision.',
  openGraph: {
    title: 'Water Fine Filter Housing | Mam Nature Swiss',
    description: 'Durable, high-performance filtration housing for pure drinking water.',
    url: '/shop/fine-filter',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/FINE%20FILTER.png' }]
  }
};

export default function FineFilterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}