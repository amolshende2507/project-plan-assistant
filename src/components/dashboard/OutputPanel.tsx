import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types/analyzer';
import { FeatureBreakdown } from './FeatureBreakdown';
import { TechStackCard } from './TechStackCard';
import { TimelineEstimate } from './TimelineEstimate';
import { RisksWarnings } from './RisksWarnings';
import { AssumptionsList } from './AssumptionsList';

interface OutputPanelProps {
  result: AnalysisResult | null;
  isLoading?: boolean;
}

export function OutputPanel({ result, isLoading }: OutputPanelProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-lg border border-border p-6 animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-1/3 mb-4" />
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="font-medium text-foreground mb-1">No Analysis Yet</h3>
          <p className="text-sm text-muted-foreground max-w-[240px]">
            Fill in your project details and click "Analyze Project" to see results
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FeatureBreakdown features={result.features} delay={0} />
      <TechStackCard techStack={result.techStack} delay={0.1} />
      <TimelineEstimate timeline={result.timeline} delay={0.2} />
      <RisksWarnings risks={result.risks} delay={0.3} />
      <AssumptionsList assumptions={result.assumptions} delay={0.4} />
    </div>
  );
}
