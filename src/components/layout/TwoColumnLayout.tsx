import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TwoColumnLayoutProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}

export function TwoColumnLayout({ left, right, className }: TwoColumnLayoutProps) {
  return (
    <div className={cn('flex flex-col lg:flex-row gap-6 lg:gap-8', className)}>
      <div className="w-full lg:w-[400px] lg:flex-shrink-0">
        {left}
      </div>
      <div className="flex-1 min-w-0">
        {right}
      </div>
    </div>
  );
}
