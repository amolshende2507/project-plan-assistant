import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionCard({ 
  title, 
  description, 
  icon, 
  children, 
  className,
  delay = 0 
}: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={cn(
        'bg-card rounded-lg border border-border shadow-card p-6',
        className
      )}
    >
      <div className="flex items-start gap-3 mb-4">
        {icon && (
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}
