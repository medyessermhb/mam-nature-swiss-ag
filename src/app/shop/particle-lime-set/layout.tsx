import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Particle & Lime Set | Sediment & Scale Protection',
  description: 'Protect your appliances and plumbing. Stops sand and rust with automatic backwash while converting hard limescale into soft, harmless aragonite.',
  openGraph: {
    title: 'Particle & Lime Set | Mam Nature Swiss',
    description: 'The eco-friendly solution to sediment and limescale problems. Zero maintenance, zero waste.',
    url: '/shop/particle-lime-set',
  }
};

export default function ParticleLimeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}