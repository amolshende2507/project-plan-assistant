import { motion } from 'framer-motion';
import { Download, Sparkles, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnalysisResult, ProjectInput } from '@/types/analyzer';

import { FeatureBreakdown } from './FeatureBreakdown';
import { TechStackCard } from './TechStackCard';
import { TimelineEstimate } from './TimelineEstimate';
import { RisksWarnings } from './RisksWarnings';
import { AssumptionsList } from './AssumptionsList';
import { FeasibilityCard } from './FeasibilityCard';
import { ArchitectureView } from './ArchitectureView';
import { CodingPrompts } from './CodingPrompts';

import { generateMarkdown, downloadMarkdown } from '@/lib/exportUtils';

interface OutputPanelProps {
  result: AnalysisResult | null;
  input: ProjectInput | null;
  isLoading?: boolean;
}

/* Animation variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function OutputPanel({ result, input, isLoading }: OutputPanelProps) {

  /* Loading */
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
          <div className="h-9 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-card/50 rounded-xl border border-border/50 animate-pulse" />
          <div className="h-64 bg-card/50 rounded-xl border border-border/50 animate-pulse" />
        </div>
        <div className="h-48 bg-card/50 rounded-xl border border-border/50 animate-pulse" />
      </div>
    );
  }

  /* Empty state */
  if (!result) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] border-2 border-dashed border-border/40 rounded-xl bg-muted/5">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center shadow-lg shadow-primary/5">
            <LayoutDashboard className="w-10 h-10 text-primary/60" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Ready to Engineer
          </h3>
          <p className="text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
            Fill in the constraints to generate your professional blueprint.
          </p>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    if (!input || !result) return;
    const md = generateMarkdown(input, result);
    downloadMarkdown(md, 'project-blueprint.md');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Engineering Blueprint
            </h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              {input?.skillLevel}
            </Badge>
            <Badge variant="outline" className="text-xs font-normal">
              {input?.totalWeeks} Weeks
            </Badge>
          </div>
        </div>

        <Button
          variant="default"
          size="sm"
          className="gap-2 shadow-lg hover:shadow-primary/25 transition-all"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          Export Plan
        </Button>
      </motion.div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.feasibility && (
          <motion.div variants={itemVariants} className="h-full">
            <FeasibilityCard data={result.feasibility} />
          </motion.div>
        )}
        <motion.div variants={itemVariants} className="h-full">
          <TimelineEstimate timeline={result.timeline} />
        </motion.div>
      </div>

      {/* Architecture */}
      {result.architectureDiagram && (
        <motion.div variants={itemVariants}>
          <ArchitectureView code={result.architectureDiagram} />
        </motion.div>
      )}

      {/* Execution */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div variants={itemVariants}>
          <TechStackCard techStack={result.techStack} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FeatureBreakdown features={result.features} />
        </motion.div>
      </div>

      {/* Coding prompts */}
      {input && (
        <motion.div variants={itemVariants}>
          <CodingPrompts input={input} result={result} />
        </motion.div>
      )}

      {/* Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="h-full">
          <RisksWarnings risks={result.risks} />
        </motion.div>
        <motion.div variants={itemVariants} className="h-full">
          <AssumptionsList assumptions={result.assumptions} />
        </motion.div>
      </div>
    </motion.div>
  );
}
