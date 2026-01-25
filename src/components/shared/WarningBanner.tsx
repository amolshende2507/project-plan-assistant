import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WarningBannerProps {
  type: 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  className?: string;
}

const bannerConfig = {
  info: {
    icon: Info,
    className: 'bg-info/5 border-info/20 text-info',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-warning/5 border-warning/20 text-warning',
  },
  error: {
    icon: XCircle,
    className: 'bg-destructive/5 border-destructive/20 text-destructive',
  },
};

export function WarningBanner({ type, title, description, className }: WarningBannerProps) {
  const config = bannerConfig[type];
  const Icon = config.icon;
  
  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        config.className,
        className
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-sm">{title}</p>
        {description && (
          <p className="text-sm mt-1 opacity-80">{description}</p>
        )}
      </div>
    </div>
  );
}
