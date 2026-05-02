import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Waitlist — SharkAuth',
  description: 'Join the SharkAuth Cloud early access waitlist. Managed infrastructure for agent-native authentication.',
  alternates: { canonical: 'https://sharkauth.com/waitlist' },
  openGraph: {
    title: 'Cloud Waitlist — SharkAuth',
    description: 'Early access to managed SharkAuth Cloud infrastructure.',
    url: 'https://sharkauth.com/waitlist',
  },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
