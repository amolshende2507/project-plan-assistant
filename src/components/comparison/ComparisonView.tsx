import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, User, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge';
import { ComparisonScenario, Feature } from '@/types/analyzer';
import { cn } from '@/lib/utils';

interface ComparisonViewProps {
  scenarios: ComparisonScenario[];
}

export function ComparisonView({ scenarios }: ComparisonViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const scenario1 = scenarios[0];
  const scenario2 = scenarios[1];
  
  const activeScenario = scenarios[activeIndex];
  const inactiveScenario = scenarios[activeIndex === 0 ? 1 : 0];

  const getFeatureDiff = (active: Feature[], inactive: Feature[]) => {
    const activeNames = new Set(active.map(f => f.name));
    const inactiveNames = new Set(inactive.map(f => f.name));
    
    const added = active.filter(f => !inactiveNames.has(f.name));
    const removed = inactive.filter(f => !activeNames.has(f.name));
    
    return { added, removed };
  };

  const coreDiff = getFeatureDiff(activeScenario.result.features.core, inactiveScenario.result.features.core);
  const excludedDiff = getFeatureDiff(activeScenario.result.features.excluded, inactiveScenario.result.features.excluded);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Toggle */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Scenario Comparison</h3>
          <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={activeIndex === 0 ? 'default' : 'outline'}
            className="flex items-center gap-2 h-auto py-3"
            onClick={() => setActiveIndex(0)}
          >
            <User className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">{scenario1.label}</p>
              <p className="text-xs opacity-70">{scenario1.input.skillLevel} • {scenario1.input.teamSize}</p>
            </div>
          </Button>
          
          <Button
            variant={activeIndex === 1 ? 'default' : 'outline'}
            className="flex items-center gap-2 h-auto py-3"
            onClick={() => setActiveIndex(1)}
          >
            <Users className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">{scenario2.label}</p>
              <p className="text-xs opacity-70">{scenario2.input.skillLevel} • {scenario2.input.teamSize}</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Changes Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg border border-border shadow-card overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-surface-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {activeScenario.label} Analysis
              </h3>
              <ConfidenceBadge level={activeScenario.result.timeline.confidence} />
            </div>
          </div>
          
          <div className="p-4 space-y-6">
            {/* Timeline Comparison */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Timeline Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-surface-2 border border-border">
                  <p className="text-2xl font-bold text-foreground">
                    {activeScenario.result.timeline.bestCase}-{activeScenario.result.timeline.worstCase}
                  </p>
                  <p className="text-sm text-muted-foreground">weeks estimated</p>
                </div>
                <div className="p-4 rounded-lg bg-surface-2 border border-border">
                  <p className="text-2xl font-bold text-foreground">
                    +{activeScenario.result.timeline.bufferWeeks}
                  </p>
                  <p className="text-sm text-muted-foreground">weeks buffer</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                {activeScenario.result.timeline.bufferReason}
              </p>
            </div>

            {/* Feature Changes */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Feature Changes</h4>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-success/5 border border-success/10">
                  <p className="text-sm font-medium text-success">
                    {activeScenario.result.features.core.length} Core Features
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {coreDiff.added.length > 0 && (
                      <span className="text-success">+{coreDiff.added.length} from switching</span>
                    )}
                    {coreDiff.removed.length > 0 && (
                      <span className="text-destructive">-{coreDiff.removed.length} from switching</span>
                    )}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <p className="text-sm font-medium text-destructive">
                    {activeScenario.result.features.excluded.length} Excluded Features
                  </p>
                </div>
              </div>
            </div>

            {/* Risks Count */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Risk Assessment</h4>
              <div className="flex items-center gap-4">
                {['high', 'medium', 'low'].map((severity) => {
                  const count = activeScenario.result.risks.filter(r => r.severity === severity).length;
                  return (
                    <div key={severity} className="flex items-center gap-2">
                      <span className={cn(
                        'w-2 h-2 rounded-full',
                        severity === 'high' && 'bg-destructive',
                        severity === 'medium' && 'bg-warning',
                        severity === 'low' && 'bg-muted-foreground'
                      )} />
                      <span className="text-sm text-muted-foreground">
                        {count} {severity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Show/Hide Details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full p-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted/50 transition-colors border-t border-border"
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Full Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show Full Details
              </>
            )}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border overflow-hidden"
              >
                <div className="p-4 space-y-4 bg-surface-2">
                  {/* Full Feature List */}
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Core Features</h5>
                    <div className="space-y-1">
                      {activeScenario.result.features.core.map((feature) => (
                        <div key={feature.name} className="flex items-center justify-between text-sm p-2 rounded bg-card">
                          <span className="text-foreground">{feature.name}</span>
                          <span className="text-muted-foreground">{feature.estimatedHours}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                      {activeScenario.result.techStack.map((tech) => (
                        <span key={tech.name} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
