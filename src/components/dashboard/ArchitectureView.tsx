import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Network, AlertCircle, ZoomIn } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Initialize Mermaid with your app's font settings
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif', // 👈 FIXES TEXT CUTOFF
  themeVariables: {
    primaryColor: '#e0f2fe', // Light blue background
    primaryTextColor: '#0f172a', // Dark text
    primaryBorderColor: '#3b82f6', // Blue border
    lineColor: '#64748b', // Slate lines
    mainBkg: '#ffffff',
    nodeBorder: '#94a3b8',
  }
});

interface ArchitectureViewProps {
  code: string;
  delay?: number;
}

export function ArchitectureView({ code, delay = 0 }: ArchitectureViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      setError(null);
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      // 🧹 CLEANUP: Remove markdown & wrap text in quotes to prevent syntax errors
      let cleanCode = code
        .replace(/```mermaid/g, '')
        .replace(/```/g, '')
        .trim();

      // Auto-fix: Wrap unquoted text in brackets [Client (Web)] -> ["Client (Web)"]
      cleanCode = cleanCode.replace(/\[(.*?)\]/g, (match, content) => {
        if (content.startsWith('"') && content.endsWith('"')) return match;
        return `["${content}"]`;
      });

      mermaid.render(id, cleanCode)
        .then((result) => {
          setSvgContent(result.svg);
        })
        .catch((e) => {
          console.error("Mermaid Render Failed:", e);
          setError("Diagram syntax error. Try regenerating the plan.");
        });
    }
  }, [code]);

  useEffect(() => {
    if (ref.current && svgContent) {
      ref.current.innerHTML = svgContent;
      // 📐 SCALE FIX: Force SVG to fit container
      const svg = ref.current.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxWidth = '100%';
      }
    }
  }, [svgContent]);

  return (
    <SectionCard
      title="System Architecture"
      description="AI-generated system design"
      icon={<Network className="h-4 w-4" />}
      delay={delay}
    >
      <div className="relative w-full bg-white/50 dark:bg-white/5 rounded-lg border border-border p-4 min-h-[200px] flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center gap-2 text-destructive text-sm p-4 text-center">
            <AlertCircle className="h-6 w-6" />
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div ref={ref} className="w-full flex justify-center" />
            
            {/* Zoom Button */}
            {svgContent && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="absolute bottom-2 right-2 h-8 w-8 bg-background/80 backdrop-blur">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full h-[80vh] overflow-auto flex items-center justify-center p-8 bg-white">
                   <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full [&>svg]:w-full [&>svg]:h-auto" />
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </div>
    </SectionCard>
  );
}