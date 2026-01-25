import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Risk } from '@/types/analyzer';
import { cn } from '@/lib/utils';

interface RisksWarningsProps {
  risks: Risk[];
  delay?: number;
}

const severityConfig = {
  low: {
    className: 'bg-muted border-border text-muted-foreground',
    label: 'Low',
  },
  medium: {
    className: 'bg-warning/5 border-warning/20 text-warning',
    label: 'Medium',
  },
  high: {
    className: 'bg-destructive/5 border-destructive/20 text-destructive',
    label: 'High',
  },
};

export function RisksWarnings({ risks, delay = 0 }: RisksWarningsProps) {
  return (
    <SectionCard
      title="Risks & Warnings"
      description="Potential blockers to consider"
      icon={<ShieldAlert className="h-4 w-4" />}
      delay={delay}
    >
      <div className="space-y-3">
        {risks.map((risk) => {
          const config = severityConfig[risk.severity];
          return (
            <div
              key={risk.title}
              className={cn('p-3 rounded-md border', config.className)}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{risk.title}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-current/10">
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs opacity-80">{risk.description}</p>
                  {risk.mitigation && (
                    <p className="text-xs mt-2 p-2 rounded bg-card/50 border border-current/10">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
