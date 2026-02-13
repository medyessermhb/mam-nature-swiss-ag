import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Lime | Physical Limescale Conversion',
  description: 'Eco-friendly anti-limescale solution. Converts hard scale into soft aragonite without salt or chemicals, protecting your appliances while retaining healthy minerals.',
  openGraph: {
    title: 'Water Lime Anti-Limescale | Mam Nature Swiss',
    description: 'Protect your home from limescale naturally. Salt-free and maintenance-free.',
    url: '/shop/water-lime',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/water%20lime%20horizontal.png' }]
  }
};

export default function WaterLimeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}