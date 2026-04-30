'use client';

import { useReveal } from '@/hooks/useReveal';
import { Hero } from '@/components/sections/Hero';
import { Comparison } from '@/components/sections/Comparison';
import { Quickstart } from '@/components/sections/Quickstart';
import { Differentiators } from '@/components/sections/Differentiators';
import { LiveDemo } from '@/components/sections/LiveDemo';
import { AdminShowcase } from '@/components/sections/AdminShowcase';
import { Vlogs } from '@/components/sections/Vlogs';
import { UseCases } from '@/components/sections/UseCases';
import { Roadmap } from '@/components/sections/Roadmap';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  useReveal();

  return (
    <main>
      <Hero />
      <Comparison />
      <Quickstart />
      <Differentiators />
      <LiveDemo />
      <AdminShowcase />
      <Vlogs />
      <UseCases />
      <Roadmap />
      <FinalCTA />
      <Footer />
    </main>
  );
}
