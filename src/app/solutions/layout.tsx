import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Water Treatment Solutions',
  description: 'Explore our Swiss-engineered whole-house water systems. From advanced particle filtration to molecular revitalization and anti-limescale protection without chemicals.',
  openGraph: {
    title: 'Our Solutions | Mam Nature Swiss',
    description: 'Explore our Swiss-engineered whole-house water systems. 100% natural, no electricity, no salt.',
    url: '/solutions',
  }
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}