import { Code2 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { TechStackItem } from '@/types/analyzer';

interface TechStackCardProps {
  techStack: TechStackItem[];
  delay?: number;
}

export function TechStackCard({ techStack, delay = 0 }: TechStackCardProps) {
  return (
    <SectionCard
      title="Tech Stack Recommendation"
      description="Optimized for your constraints"
      icon={<Code2 className="h-4 w-4" />}
      delay={delay}
    >
      <div className="space-y-3">
        {techStack.map((item) => (
          <div
            key={item.name}
            className="p-3 rounded-md bg-surface-2 border border-border"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-foreground">{item.name}</span>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
                {item.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
