import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eco Set Plus | Enhanced Whole House Protection',
  description: 'Advanced whole-house water treatment. Enhanced filtration performance for the removal of contaminants and scale prevention using medical-grade Swiss technology.',
  openGraph: {
    title: 'Eco Set Plus | Mam Nature Swiss',
    description: 'High-performance whole-house water purification without chemicals or salt.',
    url: '/shop/eco-set-plus',
        images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/ECO%20SET%20PLUS.png' }]
  }
};

export default function EcoSetPlusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}