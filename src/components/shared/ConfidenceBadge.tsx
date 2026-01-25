import { ConfidenceLevel } from '@/types/analyzer';
import { cn } from '@/lib/utils';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  className?: string;
}

const confidenceConfig = {
  low: {
    label: 'Low Confidence',
    className: 'bg-confidence-low/10 text-confidence-low border-confidence-low/20',
  },
  medium: {
    label: 'Medium Confidence',
    className: 'bg-confidence-medium/10 text-confidence-medium border-confidence-medium/20',
  },
  high: {
    label: 'High Confidence',
    className: 'bg-confidence-high/10 text-confidence-high border-confidence-high/20',
  },
};

export function ConfidenceBadge({ level, className }: ConfidenceBadgeProps) {
  const config = confidenceConfig[level];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
