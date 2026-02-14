import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Particle Filter | Automatic Backwash Pre-filter',
  description: 'The first line of defense for your home. Eliminates sand, rust, and sediments with an automatic backwash valve. No consumables or maintenance required.',
  openGraph: {
    title: 'Water Particle Filter | Mam Nature Swiss',
    description: 'Protect your entire plumbing system from sediments and particles.',
    url: '/shop/particles-filter',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/PARTICLES%20FILTER.webp' }]
  }
};

export default function ParticlesFilterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}