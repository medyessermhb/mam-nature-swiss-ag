import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Set Plus | Advanced Water Revitalization',
  description: 'Our most advanced whole-house solution. Includes the Swiss Water Dynamizer for revitalized water, scale prevention, and maximum contaminant removal.',
  openGraph: {
    title: 'Complete Set Plus | Mam Nature Swiss',
    description: 'The ultimate Swiss-engineered water treatment and revitalization system.',
    url: '/shop/complete-set-plus',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET%20PLUS.webp' }]
  }
};

export default function CompleteSetPlusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}