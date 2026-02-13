import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Essential Plus | Fine & Particle Filtration',
  description: 'Dual-stage protection for your home. Combines fine selective filtration with a sediment particle filter to remove sand, rust, microplastics, and heavy metals.',
  openGraph: {
    title: 'The Essential Plus | Mam Nature Swiss',
    description: 'Advanced dual-stage water filtration. Protects your health and your plumbing.',
    url: '/shop/essential-plus',
  }
};

export default function EssentialPlusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}