import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — SharkAuth',
  description: 'Self-host SharkAuth free forever (MIT). Cloud plans from $0/mo. Agent-native auth with no vendor lock-in.',
  alternates: { canonical: 'https://sharkauth.com/pricing' },
  openGraph: {
    title: 'Pricing — SharkAuth',
    description: 'Self-host free forever. Cloud from $0/mo. No vendor lock-in.',
    url: 'https://sharkauth.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
