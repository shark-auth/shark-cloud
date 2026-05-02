import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team — SharkAuth',
  description: 'Meet the team building SharkAuth. Engineers obsessed with protocol correctness, high-performance systems, and honest software.',
  alternates: { canonical: 'https://sharkauth.com/team' },
  openGraph: {
    title: 'Team — SharkAuth',
    description: 'The engineers building the agent-native identity platform.',
    url: 'https://sharkauth.com/team',
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
