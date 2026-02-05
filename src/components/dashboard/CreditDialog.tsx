import { Lock, Sparkles, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CreditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreditDialog({ open, onOpenChange }: CreditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Free Limit Reached</DialogTitle>
          <DialogDescription className="pt-2">
            You've used all 3 free Guest credits. <br/>
            To continue generating Engineering Blueprints, please sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted/50 p-4 rounded-lg text-left space-y-3 my-2">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">Get 10 Monthly Credits</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">Save History to Cloud</span>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <Button size="lg" className="w-full gap-2" onClick={() => alert("This would open Login Page")}>
            <UserPlus className="h-4 w-4" /> Create Free Account
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}