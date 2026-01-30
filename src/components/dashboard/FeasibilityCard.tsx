import { Target, Lightbulb, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Feasibility } from '@/types/analyzer';
import { cn } from '@/lib/utils';

interface FeasibilityCardProps {
  data: Feasibility;
  delay?: number;
}

export function FeasibilityCard({ data, delay = 0 }: FeasibilityCardProps) {
  // Logic to handle AI returning 1-10 instead of 0-100 (Safety Check)
  // If score is <= 10, we assume it meant a 1-10 scale and multiply by 10.
  const displayScore = data.score <= 10 ? data.score * 10 : data.score;

  const getScoreConfig = (score: number) => {
    if (score >= 80) return { color: 'text-success', border: 'border-success', bg: 'bg-success/10', label: 'Excellent' };
    if (score >= 60) return { color: 'text-warning', border: 'border-warning', bg: 'bg-warning/10', label: 'Feasible' };
    return { color: 'text-destructive', border: 'border-destructive', bg: 'bg-destructive/10', label: 'High Risk' };
  };

  const config = getScoreConfig(displayScore);

  return (
    <SectionCard
      title="Feasibility Audit"
      description="Reality check & path to success"
      icon={<Target className="h-4 w-4" />}
      delay={delay}
    >
      <div className="space-y-6">
        {/* Score & Verdict Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-4 border-b border-border/50">
          
          {/* Circular Score */}
          <div className={cn("relative flex items-center justify-center w-20 h-20 rounded-full border-4 flex-shrink-0 bg-surface-2", config.border)}>
            <div className="text-center">
              <span className={cn("text-2xl font-bold block leading-none", config.color)}>
                {displayScore}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Score</span>
            </div>
          </div>

          {/* Verdict Text */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-lg font-bold text-foreground">{data.verdict}</h4>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium border", config.bg, config.color, "border-transparent")}>
                {config.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {displayScore < 50 
                ? "This plan has critical risks. See the pivot suggestion below." 
                : "This plan is realistic, but watch out for the blind spots."}
            </p>
          </div>
        </div>

        {/* Blind Spot */}
        <div className="flex gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
            <AlertOctagon className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-foreground block mb-1">Blind Spot Detected</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.blindSpot}
              </p>
            </div>
        </div>

        {/* The Pivot / Advice */}
        <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-sm font-bold text-primary block mb-1">
              {displayScore < 70 ? "Suggested Pivot Strategy" : "Key Execution Advice"}
            </span>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {data.pivotSuggestion}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}