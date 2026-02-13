import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Swiss Water Dynamizer | Water Revitalizer',
  description: 'Restore your tap water to its natural, spring-like properties. Revitalizes water at a molecular level and naturally prevents limescale buildup.',
  openGraph: {
    title: 'The Swiss Water Dynamizer | Mam Nature',
    description: '100% physical action to restore your water\'s natural properties.',
    url: '/shop/the-swiss-water-dynamizer',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/PARTICLES%20FILTER.png' }]
  }
};

export default function DynamizerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}