import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab Reports & Certifications',
  description: 'View our independent laboratory tests and certifications. Mam Nature systems use medical-grade stainless steel and guarantee up to 99.9% removal of microplastics, heavy metals, and PFAS.',
  openGraph: {
    title: 'Verified Quality & Certifications | Mam Nature',
    description: 'Independent lab results proving up to 99.9% elimination of water contaminants.',
    url: '/reports-certifications',
  }
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}