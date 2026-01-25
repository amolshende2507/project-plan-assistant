import { CheckCircle2, Circle, XCircle } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { FeatureBreakdown as FeatureBreakdownType } from '@/types/analyzer';
import { Layers } from 'lucide-react';

interface FeatureBreakdownProps {
  features: FeatureBreakdownType;
  delay?: number;
}

export function FeatureBreakdown({ features, delay = 0 }: FeatureBreakdownProps) {
  return (
    <SectionCard
      title="Feature Breakdown"
      description="Prioritized based on your constraints"
      icon={<Layers className="h-4 w-4" />}
      delay={delay}
    >
      <div className="space-y-6">
        {/* Core Features */}
        <div>
          <h4 className="text-sm font-medium text-success flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4" />
            Core Features (Must-Have)
          </h4>
          <div className="space-y-2">
            {features.core.map((feature) => (
              <div key={feature.name} className="flex items-start gap-3 p-3 rounded-md bg-success/5 border border-success/10">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{feature.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {feature.estimatedHours}h
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Features */}
        {features.optional.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-3">
              <Circle className="h-4 w-4" />
              Optional Features
            </h4>
            <div className="space-y-2">
              {features.optional.map((feature) => (
                <div key={feature.name} className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border border-border">
                  <Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{feature.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {feature.estimatedHours}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Excluded Features */}
        {features.excluded.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-destructive flex items-center gap-2 mb-3">
              <XCircle className="h-4 w-4" />
              Explicitly Excluded
            </h4>
            <div className="space-y-2">
              {features.excluded.map((feature) => (
                <div key={feature.name} className="flex items-start gap-3 p-3 rounded-md bg-destructive/5 border border-destructive/10">
                  <XCircle className="h-4 w-4 text-destructive/60 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground line-through">{feature.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {feature.estimatedHours}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
