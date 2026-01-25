import { FileText, Check } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';

interface AssumptionsListProps {
  assumptions: string[];
  delay?: number;
}

export function AssumptionsList({ assumptions, delay = 0 }: AssumptionsListProps) {
  return (
    <SectionCard
      title="Assumptions Used"
      description="Factors considered in this analysis"
      icon={<FileText className="h-4 w-4" />}
      delay={delay}
    >
      <ul className="space-y-2">
        {assumptions.map((assumption, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>{assumption}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
