import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WhyDifferent } from '@/components/landing/WhyDifferent';
import { ExamplePreview } from '@/components/landing/ExamplePreview';
import { FinalCTA } from '@/components/landing/FinalCTA';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyDifferent />
        <ExamplePreview />
        <FinalCTA />
      </main>
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>ProjectAnalyzer — Constraint-aware project planning</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
