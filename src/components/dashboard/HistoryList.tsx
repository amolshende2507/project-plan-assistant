import { Clock, ArrowRight, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectInput, AnalysisResult } from '@/types/analyzer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface HistoryItem {
  id: string;
  date: string;
  input: ProjectInput;
  result: AnalysisResult;
}

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  onDelete: (id: string) => void; // 👈 NEW PROP
}

export function HistoryList({ history, onSelect, onClear, onDelete }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Recent Analysis
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear} 
          className="text-muted-foreground hover:text-destructive text-xs h-7 px-2"
        >
          Clear All
        </Button>
      </div>

      <ScrollArea className="h-[250px] w-full rounded-md border border-border bg-muted/20 p-2">
        <div className="space-y-2">
          {history.map((item) => {
            // 🛠️ FIX: Apply the same safety math here
            // If score is 7, treat it as 70.
            const rawScore = item.result.feasibility.score;
            const displayScore = rawScore <= 10 ? rawScore * 10 : rawScore;
            
            return (
              <div
                key={item.id}
                className="group relative flex flex-col gap-1 p-3 rounded-lg border border-transparent hover:border-border hover:bg-card transition-all"
              >
                {/* Clickable Area for Selection */}
                <div 
                  className="cursor-pointer"
                  onClick={() => onSelect(item)}
                >
                  <div className="flex items-center justify-between pr-8">
                    <span className="font-medium text-sm truncate max-w-[180px] text-foreground">
                      {item.input.projectIdea}
                    </span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary absolute right-3 top-4" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className={cn(
                      "font-medium",
                      displayScore >= 70 ? "text-success" : 
                      displayScore >= 50 ? "text-warning" : "text-destructive"
                    )}>
                      Score: {displayScore}
                    </span>
                  </div>
                </div>

                {/* 🗑️ DELETE BUTTON (Stops propagation so it doesn't open the item) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 bottom-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation(); // Don't trigger onSelect
                    onDelete(item.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}