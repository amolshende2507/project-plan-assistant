import { Clock, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectInput, AnalysisResult } from '@/types/analyzer';
import { ScrollArea } from '@/components/ui/scroll-area';

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
}

export function HistoryList({ history, onSelect, onClear }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Recent Analysis
        </h3>
        <Button variant="ghost" size="xs" onClick={onClear} className="text-muted-foreground hover:text-destructive text-xs h-6">
          <Trash2 className="h-3 w-3 mr-1" /> Clear
        </Button>
      </div>

      <ScrollArea className="h-[200px] w-full rounded-md border border-border bg-muted/20 p-2">
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="group flex flex-col gap-1 p-3 rounded-lg border border-transparent hover:border-border hover:bg-card cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm truncate max-w-[180px]">
                  {item.input.projectIdea}
                </span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.date}</span>
                <span>•</span>
                <span className={item.result.feasibility.score >= 70 ? "text-success" : "text-warning"}>
                  Score: {item.result.feasibility.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}