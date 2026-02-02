import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WhyDifferent } from '@/components/landing/WhyDifferent';
import { ExamplePreview } from '@/components/landing/ExamplePreview';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/layout/Footer';
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyDifferent />
        <ExamplePreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
