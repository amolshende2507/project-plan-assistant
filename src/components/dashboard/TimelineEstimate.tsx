import { Calendar, Clock, Info } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge';
import { TimelineEstimate as TimelineEstimateType } from '@/types/analyzer';

interface TimelineEstimateProps {
  timeline: TimelineEstimateType;
  delay?: number;
}

export function TimelineEstimate({ timeline, delay = 0 }: TimelineEstimateProps) {
  return (
    <SectionCard
      title="Timeline Estimation"
      description="Based on your constraints"
      icon={<Calendar className="h-4 w-4" />}
      delay={delay}
    >
      <div className="space-y-4">
        {/* Header - Stack on very small screens, row on sm+ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm sm:text-base">
                {timeline.bestCase} - {timeline.worstCase} weeks
              </p>
              <p className="text-xs text-muted-foreground">
                +{timeline.bufferWeeks} weeks buffer recommended
              </p>
            </div>
          </div>
          {/* Badge aligned to start on mobile, center on desktop */}
          <div className="self-start sm:self-center">
            <ConfidenceBadge level={timeline.confidence} />
          </div>
        </div>

        {/* Breakdown Grid - 1 column on mobile, 3 on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-md bg-success/5 border border-success/10">
            <p className="text-lg font-semibold text-success">{timeline.bestCase}w</p>
            <p className="text-xs text-muted-foreground">Best Case</p>
          </div>
          <div className="text-center p-3 rounded-md bg-warning/5 border border-warning/10">
            <p className="text-lg font-semibold text-warning">{timeline.worstCase}w</p>
            <p className="text-xs text-muted-foreground">Worst Case</p>
          </div>
          <div className="text-center p-3 rounded-md bg-muted border border-border">
            <p className="text-lg font-semibold text-muted-foreground">+{timeline.bufferWeeks}w</p>
            <p className="text-xs text-muted-foreground">Buffer</p>
          </div>
        </div>
        
        {/* Buffer Reasoning */}
        <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50 border border-border">
          <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">Buffer Reasoning</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{timeline.bufferReason}</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}