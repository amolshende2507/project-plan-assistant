import { motion } from 'framer-motion';
import { Download, Sparkles, LayoutDashboard, Link2 } from 'lucide-react';
import { toast } from 'sonner';

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

export function OutputPanel({ result, input, isLoading }: OutputPanelProps) {

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-9 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-card rounded-lg border border-border p-6 animate-pulse" />
          <div className="h-64 bg-card rounded-lg border border-border p-6 animate-pulse" />
        </div>
        <div className="h-48 bg-card rounded-lg border border-border p-6 animate-pulse" />
        <div className="h-96 bg-card rounded-lg border border-border p-6 animate-pulse" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] border-2 border-dashed border-border/50 rounded-xl bg-muted/5">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
            <LayoutDashboard className="w-10 h-10 text-primary/60" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Ready to Analyze
          </h3>
          <p className="text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
            Fill in your project constraints on the left to generate an
            engineering-grade blueprint.
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

  // 🔗 SHARE HANDLER
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      description: 'Anyone with this link can view this configuration.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Engineering Blueprint
            </h2>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground"
            >
              {input?.skillLevel} Level
            </Badge>
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground"
            >
              {input?.totalWeeks} Weeks
            </Badge>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 shadow-sm"
            onClick={handleShare}
          >
            <Link2 className="h-4 w-4" />
            Share
          </Button>

          <Button
            variant="default"
            size="sm"
            className="gap-2 shadow-sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export Plan
          </Button>
        </div>
      </div>

      {/* ROW 1: STRATEGY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.feasibility && (
          <FeasibilityCard data={result.feasibility} delay={0.1} />
        )}
        <TimelineEstimate timeline={result.timeline} delay={0.2} />
      </div>

      {/* ROW 2: ARCHITECTURE */}
      {result.architectureDiagram && (
        <ArchitectureView code={result.architectureDiagram} delay={0.3} />
      )}

      {/* ROW 3: EXECUTION */}
      <div className="grid grid-cols-1 gap-6">
        <TechStackCard techStack={result.techStack} delay={0.4} />
        <FeatureBreakdown features={result.features} delay={0.5} />
      </div>

      {/* ROW 4: CODING PROMPTS */}
      {input && (
        <CodingPrompts input={input} result={result} delay={0.55} />
      )}

      {/* ROW 5: RISKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RisksWarnings risks={result.risks} delay={0.6} />
        <AssumptionsList assumptions={result.assumptions} delay={0.7} />
      </div>
    </motion.div>
  );
}
