import { Copy, Terminal, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/shared/SectionCard';
import { AnalysisResult, ProjectInput } from '@/types/analyzer';
import { toast } from 'sonner';

interface CodingPromptsProps {
  input: ProjectInput;
  result: AnalysisResult;
  delay?: number;
}

export function CodingPrompts({ input, result, delay = 0 }: CodingPromptsProps) {
  const [copied, setCopied] = useState(false);
  
  // Dynamic Prompt Generation Logic
  const generatePrompt = () => {
    const techList = result.techStack.map(t => t.name).join(', ');
    const coreFeatures = result.features.core.map(f => `- ${f.name}: ${f.description}`).join('\n');
    const risks = result.risks.slice(0, 2).map(r => r.title).join(', ');
    
    return `
Act as a Senior Software Engineer. I need to scaffold a new project.

Context:
- Project: "${input.projectIdea}"
- Tech Stack: ${techList}
- Skill Level: ${input.skillLevel}
- Team Size: ${input.teamSize}

Core Requirements (MVP):
${coreFeatures}

Architecture Constraints:
- Use strict typing.
- Modular file structure.
- Focus on clean, maintainable code over complex abstractions.
- Watch out for these specific risks: ${risks}.

Please provide:
1. Terminal commands to initialize the project/repo.
2. The folder structure tree.
3. The package.json dependencies (versions compatible with latest stable).
4. A basic implementation of the main entry point or layout file.
`.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    toast.success("Prompt copied!", {
      description: "Paste this into Cursor, ChatGPT, or VS Code."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionCard
      title="AI Coding Assistant"
      description="Ready to build? Copy this prompt."
      icon={<Terminal className="h-4 w-4" />}
      delay={delay}
    >
      <div className="bg-muted/30 p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"/> 
            Master Prompt
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy} 
            className="h-7 gap-1.5 text-primary hover:text-primary hover:bg-primary/10"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy Prompt"}
          </Button>
        </div>
        
        {/* Code Preview Area */}
        <div className="relative group">
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono max-h-[150px] overflow-y-auto p-3 bg-background rounded-md border border-border/50 shadow-inner custom-scrollbar">
            {generatePrompt()}
          </pre>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </SectionCard>
  );
}