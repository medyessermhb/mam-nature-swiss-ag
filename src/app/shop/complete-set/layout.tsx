import { Metadata } from 'next';

// 1. Export Metadata for SEO
export const metadata: Metadata = {
  title: 'Complete Set | Whole House Water Treatment & Revitalization',
  description: 'Experience pure, structured water with the Mam Nature Complete Set. Featuring the Swiss Water Dynamizer and advanced filtration to protect your home from scale, rust, and contaminants.',
  openGraph: {
    title: 'Complete Set | Mam Nature Swiss',
    description: 'Advanced whole-house water treatment including the Swiss Water Dynamizer for revitalized and molecularly restructured water.',
    url: '/shop/complete-set',
    images: [{ url: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/COMPLETE%20SET.webp' }]
  }
};

// 2. Export the Default Layout Component (The part that makes it a "module")
export default function CompleteSetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}