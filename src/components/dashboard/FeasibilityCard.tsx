import { Target, Lightbulb, AlertOctagon } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Feasibility } from '@/types/analyzer';
import { cn } from '@/lib/utils';

interface FeasibilityCardProps {
  data: Feasibility;
  delay?: number;
}

export function FeasibilityCard({ data, delay = 0 }: FeasibilityCardProps) {
  // Color coding based on score
  const scoreColor =
    data.score >= 80 ? 'text-success' :
      data.score >= 50 ? 'text-warning' : 'text-destructive';

  const ringColor =
    data.score >= 80 ? 'border-success' :
      data.score >= 50 ? 'border-warning' : 'border-destructive';

  return (
    <SectionCard
      title="Feasibility Audit"
      description="Reality check & path to success"
      icon={<Target className="h-4 w-4" />}
      delay={delay}
    >
      <div className="space-y-6">
        {/* Score & Verdict */}
        <div className="flex items-center gap-6">
          <div
            className={cn(
              "relative flex items-center justify-center w-20 h-20 rounded-full border-4 bg-surface-2",
              ringColor
            )}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <span
                className={cn(
                  "text-2xl font-bold leading-none",
                  scoreColor
                )}
              >
                {data.score}
              </span>
              <span className="mt-1 text-[10px] font-semibold tracking-wide text-muted-foreground whitespace-nowrap">
                SCORE
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-foreground">{data.verdict}</h4>
            <p className="text-sm text-muted-foreground">
              {data.score < 50 ? "This plan needs a pivot to succeed." : "Solid plan, proceed with caution."}
            </p>
          </div>
        </div>

        {/* The Blind Spot (What they forgot) */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex gap-2 mb-1">
            <AlertOctagon className="h-4 w-4 text-warning" />
            <span className="text-sm font-semibold text-foreground">Blind Spot Detected</span>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {data.blindSpot}
          </p>
        </div>

        {/* The Pivot (The Constructive Advice) */}
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary">
              {data.score < 70 ? "Suggested Pivot (Easier Path)" : "Growth Opportunity"}
            </span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {data.pivotSuggestion}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}