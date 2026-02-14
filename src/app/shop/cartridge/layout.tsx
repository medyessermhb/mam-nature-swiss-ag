import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swiss Water Cartridge | Annual Replacement Filter',
  description: 'Official replacement cartridge for the Water Fine Filter. Maintain 99.9% filtration efficiency against chlorine, heavy metals, and microplastics.',
  openGraph: {
    title: 'Swiss Water Replacement Cartridge | Mam Nature Swiss',
    description: 'Keep your water pure with the official annual replacement filter cartridge.',
    url: '/shop/cartridge',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/CARTRIDGE.webp' }]
  }
};

export default function CartridgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}