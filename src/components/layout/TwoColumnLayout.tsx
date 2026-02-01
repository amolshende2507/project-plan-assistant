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
      {/* 
         MOBILE: Full width (w-full)
         DESKTOP (lg): Fixed width (400px) and stays distinct 
      */}
      <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 space-y-6">
        {left}
      </div>
      
      {/* 
         MOBILE: Full width
         DESKTOP: Takes remaining space (flex-1)
      */}
      <div className="w-full flex-1 min-w-0">
        {right}
      </div>
    </div>
  );
}