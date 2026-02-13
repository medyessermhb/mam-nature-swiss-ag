import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eco Set | Whole House Water Treatment',
  description: 'The Mam Nature Eco Set treats particles, limescale, and contaminants for your entire home. Medical-grade stainless steel with a 10-year warranty.',
  openGraph: {
    title: 'Eco Set | Mam Nature Swiss',
    description: 'Exceptional water throughout your entire home. 100% natural, no electricity.',
    url: '/shop/eco-set',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/ECO%20SET.png' }]
  }
};

export default function EcoSetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}