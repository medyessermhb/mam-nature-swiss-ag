import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our complete range of Swiss water filtration systems, Eco Sets, and Hydrogen Boosters.',
  openGraph: {
    title: 'Shop | Mam Nature Swiss',
    description: 'Browse our complete range of Swiss water filtration systems.',
  }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}