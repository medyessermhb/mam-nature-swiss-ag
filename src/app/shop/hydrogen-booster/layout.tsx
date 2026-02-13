import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swiss Hydrogen Booster | Class 1 Medical Device',
  description: 'Portable molecular hydrogen generator. Enrich your water with ultra-fine hydrogen bubbles for superior antioxidant benefits. Engineered in Switzerland.',
  openGraph: {
    title: 'Swiss Hydrogen Booster | Mam Nature Swiss',
    description: 'Antioxidant molecular hydrogen water on the go. Class 1 Medical Device.',
    url: '/shop/hydrogen-booster',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/website-assets/PRODUCT/HYDROGEEN%20BOOSTER.png' }]
  }
};

export default function HydrogenBoosterShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}