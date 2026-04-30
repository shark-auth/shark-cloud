import { Hero } from '@/components/sections/Hero';
import { Comparison } from '@/components/sections/Comparison';
import { Quickstart } from '@/components/sections/Quickstart';
import { Differentiators } from '@/components/sections/Differentiators';
import { Pricing } from '@/components/sections/Pricing';
import { LiveDemo } from '@/components/sections/LiveDemo';
import { Vlogs } from '@/components/sections/Vlogs';
import { UseCases } from '@/components/sections/UseCases';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { Reveal } from '@/components/Reveal';

export default function Home() {
  return (
    <main>
      <Reveal />
      <Hero />
      <Comparison />
      <Quickstart />
      <Differentiators />
      <Pricing />
      <LiveDemo />
      <Vlogs />
      <UseCases />
      <FinalCTA />
      <Footer />
    </main>
  );
}
