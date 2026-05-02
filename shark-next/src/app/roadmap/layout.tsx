import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap — SharkAuth',
  description: 'SharkAuth public roadmap. See what we are building next: agent delegation, DPoP, cascade revocation, and enterprise compliance.',
  alternates: { canonical: 'https://sharkauth.com/roadmap' },
  openGraph: {
    title: 'Roadmap — SharkAuth',
    description: 'Public roadmap for the agent-native identity platform.',
    url: 'https://sharkauth.com/roadmap',
  },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
