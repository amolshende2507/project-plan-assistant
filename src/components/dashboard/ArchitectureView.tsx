import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Network, AlertCircle, ZoomIn, X } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
  themeVariables: {
    primaryColor: '#e0f2fe',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#3b82f6',
    lineColor: '#64748b',
    mainBkg: '#ffffff',
    nodeBorder: '#94a3b8',
  },
});

interface ArchitectureViewProps {
  code: string;
  delay?: number;
}

export function ArchitectureView({ code, delay = 0 }: ArchitectureViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Render Mermaid
  useEffect(() => {
    if (!code) return;

    setError(null);
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    let cleanCode = code
      .replace(/```mermaid/g, '')
      .replace(/```/g, '')
      .trim();

    // Auto-wrap bracket text in quotes
    cleanCode = cleanCode.replace(/\[(.*?)\]/g, (match, content) => {
      if (content.startsWith('"') && content.endsWith('"')) return match;
      return `["${content}"]`;
    });

    mermaid
      .render(id, cleanCode)
      .then((result) => {
        setSvgContent(result.svg);
      })
      .catch((e) => {
        console.error('Mermaid Render Failed:', e);
        setError('Diagram syntax error. Try regenerating.');
      });
  }, [code]);

  // Inject SVG into preview container
  useEffect(() => {
    if (ref.current && svgContent) {
      ref.current.innerHTML = svgContent;
      const svg = ref.current.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.maxWidth = '100%';
      }
    }
  }, [svgContent]);

  return (
    <>
      <SectionCard
        title="System Architecture"
        description="AI-generated system design"
        icon={<Network className="h-4 w-4" />}
        delay={delay}
      >
        {/* Preview Container */}
        <div className="relative w-full h-[280px] bg-white/50 dark:bg-white/5 rounded-lg border border-border overflow-hidden group">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-destructive text-sm p-4 text-center">
              <AlertCircle className="h-6 w-6" />
              <p>{error}</p>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <div
                ref={ref}
                className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
              />

              {/* Hover Expand Button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-end justify-end p-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="shadow-md gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  onClick={() => setIsZoomed(true)}
                >
                  <ZoomIn className="h-4 w-4" />
                  Expand
                </Button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isZoomed && svgContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] bg-card rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <h3 className="font-semibold flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Full Architecture View
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsZoomed(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Diagram */}
              <div className="flex-1 overflow-auto p-8 bg-white flex items-center justify-center">
                <div
                  className="min-w-full min-h-full flex items-center justify-center [&>svg]:max-w-none [&>svg]:w-auto [&>svg]:h-auto"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              </div>

              {/* Footer */}
              <div className="p-2 text-center text-xs text-muted-foreground border-t border-border bg-muted/30">
                Scroll to pan • Click X to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
