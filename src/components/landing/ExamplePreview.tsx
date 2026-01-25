import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Code2, Calendar } from 'lucide-react';
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge';

export function ExamplePreview() {
  return (
    <section className="py-20 bg-surface-2">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Example Output</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A glimpse of what you'll receive for a "Task Management Dashboard" project
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-xl border border-border shadow-elevated overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border bg-surface-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Analysis Results</h3>
                <ConfidenceBadge level="medium" />
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Features */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Feature Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">User Authentication</p>
                      <p className="text-xs text-muted-foreground">Core feature • 12 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Dashboard Interface</p>
                      <p className="text-xs text-muted-foreground">Core feature • 16 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground line-through">Real-time Collaboration</p>
                      <p className="text-xs text-muted-foreground">Excluded • 40 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline & Risks */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Timeline & Risks</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">6-10 weeks</p>
                      <p className="text-xs text-muted-foreground">+2 weeks buffer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code2 className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">React + TypeScript</p>
                      <p className="text-xs text-muted-foreground">Recommended stack</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md bg-warning/5 border border-warning/20">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <p className="text-xs text-warning">Scope creep risk identified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
