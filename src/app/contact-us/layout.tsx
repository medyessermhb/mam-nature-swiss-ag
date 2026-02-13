import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Mam Nature Swiss team. Request a quote, ask about our water filtration systems, or get dedicated customer support.',
  openGraph: {
    title: 'Contact Mam Nature Swiss',
    description: 'We are here to help you achieve pure, healthy water at home. Contact our team today.',
    url: '/contact',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}