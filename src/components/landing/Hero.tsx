import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-background">
      {/* 🌟 Background Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-purple-500/40 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide">v1.0 is Live</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Don't just code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Engineer the plan.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Stop underestimating timelines. Our AI Architect analyzes your idea, 
              detects risks, and builds a senior-level execution blueprint in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all rounded-full">
                  Start Free Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/comparison">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full hover:bg-muted/50">
                  <Zap className="mr-2 h-4 w-4 text-warning" /> See Comparison
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground grayscale opacity-70">
              <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> No Credit Card</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> GPT-4o Powered</span>
            </div>
          </motion.div>

          {/* RIGHT: 3D Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="flex-1 w-full max-w-[600px] perspective-1000"
          >
            <div className="relative group">
              {/* Glow Effect behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              {/* The "Browser Window" */}
              <div className="relative bg-background rounded-xl border border-border shadow-2xl overflow-hidden transform rotate-x-6 hover:rotate-0 transition-transform duration-500 ease-out">
                {/* Browser Header */}
                <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-3 py-1 rounded bg-background/50 text-[10px] text-muted-foreground font-mono">
                      project-analyzer.ai
                    </div>
                  </div>
                </div>

                {/* Fake Content Preview */}
                <div className="p-6 grid gap-6 bg-surface-2/50">
                   {/* Fake Header */}
                   <div className="flex justify-between items-center">
                      <div className="h-8 w-32 bg-primary/20 rounded animate-pulse" />
                      <div className="h-8 w-24 bg-muted rounded" />
                   </div>
                   {/* Fake Cards Grid */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-card border border-border rounded-lg p-4 space-y-2">
                        <div className="h-8 w-8 rounded-full bg-success/20 mb-2" />
                        <div className="h-4 w-20 bg-muted rounded" />
                        <div className="h-3 w-full bg-muted/50 rounded" />
                      </div>
                      <div className="h-32 bg-card border border-border rounded-lg p-4 space-y-2">
                        <div className="h-8 w-8 rounded-full bg-warning/20 mb-2" />
                        <div className="h-4 w-20 bg-muted rounded" />
                        <div className="h-3 w-full bg-muted/50 rounded" />
                      </div>
                   </div>
                   {/* Fake Chart */}
                   <div className="h-24 bg-card border border-border rounded-lg p-4 flex items-end gap-2">
                      <div className="w-full bg-primary/20 h-[40%]" />
                      <div className="w-full bg-primary/30 h-[70%]" />
                      <div className="w-full bg-primary/50 h-[50%]" />
                      <div className="w-full bg-primary/80 h-[90%]" />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}