import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number; // kept for backward compatibility
}

export function SectionCard({
  title,
  description,
  icon,
  children,
  className,
}: SectionCardProps) {
  return (
    <motion.div
      // Fade-in & slide-up animation
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 50, damping: 20 },
        },
      }}
      // Hover lift + glow
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
      }}
      className={cn(
        "bg-card/50 backdrop-blur-sm rounded-xl border border-border/60 p-6 transition-colors duration-300 hover:border-primary/20 hover:bg-card/80",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-6 border-b border-border/40 pb-4">
        {icon && (
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg text-foreground tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="relative">{children}</div>
    </motion.div>
  );
}
