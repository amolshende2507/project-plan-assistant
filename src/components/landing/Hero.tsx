import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI-Powered Engineering Planning</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Stop Guessing. <br />
          Start <span className="text-primary">Engineering.</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Most projects fail because of bad planning, not bad code. 
          Get a senior-level architectural analysis, tech stack recommendation, and risk assessment in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg hover:shadow-primary/25 transition-all">
              Analyze My Idea <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          
          <Link to="/comparison">
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
              Run Comparison Demo
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}