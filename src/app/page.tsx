import Hero from '@/components/Hero';
import Challenge from '@/components/Challenge';
import Solution from '@/components/Solution';
import TrustBadges from '@/components/TrustBadges';
import Process from '@/components/Process';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <CTA />
      <TrustBadges />
      <Challenge />
      <Solution />
      <Comparison />
      <Process />
      <Testimonials />
      <CTA />
      <FAQ />
    </main>
  );
}
