import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Essential | Fine Water Filter',
  description: 'Selective filtration that removes microplastics, heavy metals, and chlorine while preserving essential minerals. Compact, medical-grade stainless steel design.',
  openGraph: {
    title: 'The Essential Water Filter | Mam Nature Swiss',
    description: 'Naturally pure water right from your tap. No electricity or chemicals.',
    url: '/shop/essential',
  }
};

export default function EssentialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}