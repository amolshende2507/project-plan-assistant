import { Check, Zap, Crown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSuccess: () => void;
}

export function PricingDialog({ open, onOpenChange, userId, onSuccess }: PricingDialogProps) {
  
  const handleUpgrade = async () => {
    toast.loading("Processing payment...");

    try {
      // 🟢 SIMULATE STRIPE PAYMENT
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const res = await fetch(`${API_URL}/api/add-credits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: 50 }) // Buying 50 credits
      });

      if (!res.ok) throw new Error("Payment Failed");

      toast.dismiss();
      toast.success("Upgrade Successful!", {
        description: "50 Pro Credits added to your account."
      });
      
      onSuccess(); // Refresh credits in UI
      onOpenChange(false); // Close modal

    } catch (error) {
      toast.error("Upgrade Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-br from-primary/90 to-primary p-6 text-primary-foreground text-center relative">
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
              Most Popular
            </Badge>
          </div>
          <Crown className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <DialogTitle className="text-2xl font-bold">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-primary-foreground/80 mt-2">
            Remove limits and engineer without boundaries.
          </DialogDescription>
        </div>

        <div className="p-6 bg-background">
          <div className="flex justify-center items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold">₹500</span>
            <span className="text-muted-foreground">/ month</span>
          </div>

          <div className="space-y-3 mb-8">
            <FeatureItem text="50 Credits per month" />
            <FeatureItem text="Deep Architecture Diagrams" />
            <FeatureItem text="Priority AI Processing" />
            <FeatureItem text="Export to PDF & Markdown" />
          </div>

          <Button size="lg" className="w-full gap-2 text-lg h-12 shadow-lg" onClick={handleUpgrade}>
            <Zap className="h-4 w-4 fill-current" />
            Upgrade Now
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            Secured by MockStripe • Cancel anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
        <Check className="h-3 w-3 text-green-600" />
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}