import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout',
  // This tells Google and other search engines to IGNORE this page entirely
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}