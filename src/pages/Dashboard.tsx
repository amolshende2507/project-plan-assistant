import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LZString from 'lz-string';

import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { InputForm } from '@/components/dashboard/InputForm';
import { OutputPanel } from '@/components/dashboard/OutputPanel';
import { HistoryList, HistoryItem } from '@/components/dashboard/HistoryList';
import { WarningBanner } from '@/components/shared/WarningBanner';
import { Footer } from '@/components/layout/Footer';

import { useCredits } from '@/hooks/useCredits';
import { CreditDialog } from '@/components/dashboard/CreditDialog';

import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';

import { ProjectInput, AnalysisResult } from '@/types/analyzer';
import { useUser } from "@clerk/clerk-react";


const Dashboard = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ProjectInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSharedMode, setIsSharedMode] = useState(false);

  const [showPaywall, setShowPaywall] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { credits, spendCredit } = useCredits();
  const { user, isSignedIn } = useUser();

  const API_URL =
    import.meta.env.VITE_API_URL || 'https://YOUR-BACKEND-URL.onrender.com';

  // Load history + check for shared links
  useEffect(() => {
    const saved = localStorage.getItem('project_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }

    const sharedResult = searchParams.get('r');
    const sharedInput = searchParams.get('i');

    if (sharedResult && sharedInput) {
      try {
        const decompressedResult = JSON.parse(
          LZString.decompressFromEncodedURIComponent(sharedResult)
        );
        const decompressedInput = JSON.parse(
          LZString.decompressFromEncodedURIComponent(sharedInput)
        );

        if (decompressedResult && decompressedInput) {
          setResult(decompressedResult);
          setCurrentInput(decompressedInput);
          setIsSharedMode(true);

          toast.info('Viewing Shared Plan', {
            description: 'This is a read-only view of a shared project.',
          });
        }
      } catch (error) {
        console.error('Failed to load shared link', error);
        toast.error('Invalid Link', {
          description: 'Could not load shared project.',
        });
      }
    }
  }, [searchParams]);

  const saveToHistory = (input: ProjectInput, res: AnalysisResult) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      input,
      result: res,
    };

    const updated = [newItem, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('project_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('project_history');
    toast.success('History cleared');
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('project_history', JSON.stringify(updated));
    toast.success('Item deleted');
  };

  const handleSubmit = async (input: ProjectInput) => {
    // ✅ CREDIT CHECK (frontend soft-check)
    const success = spendCredit();

    if (!success) {
      setShowPaywall(true);
      return;
    }

    setIsLoading(true);
    setResult(null);
    setCurrentInput(input);
    setIsSharedMode(false);

    setSearchParams({});

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...input,

          // 👇 SEND USER IDENTITY TO SERVER
          userId: isSignedIn ? user?.id : null,
          userEmail: isSignedIn
            ? user?.primaryEmailAddress?.emailAddress
            : null,
        }),
      });

      if (!response.ok) throw new Error('Server Error');

      const data = await response.json();
      setResult(data);
      saveToHistory(input, data);

      toast.success('Analysis Complete');
    } catch (error) {
      console.error(error);
      toast.error('Analysis Failed');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {/* Personalized Greeting */}
      <div className="container pt-6 pb-2">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isSignedIn ? `Welcome back, ${user.firstName} 👋` : 'Project Analyzer'}
            </h1>
            <p className="text-muted-foreground">
              {isSignedIn ? 'Ready to engineer your next big idea?' : 'Enter details below to generate a blueprint.'}
            </p>
          </div>

          {/* Credit Badge (Existing) */}
          <Badge variant={credits > 0 ? "secondary" : "destructive"} className="gap-1.5 py-1.5 px-3">
            <Coins className="h-3.5 w-3.5" />
            {credits} Credits Left
          </Badge>
        </div>
      </div>

      {/* CREDIT BALANCE */}
      <div className="container pt-4 flex justify-end">
        <Badge
          variant={credits > 0 ? 'secondary' : 'destructive'}
          className="gap-1.5 py-1.5 px-3"
        >
          <Coins className="h-3.5 w-3.5" />
          {credits} Credits Left
        </Badge>
      </div>

      <main className="container py-8 flex-1">
        {isSharedMode && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4">
            <WarningBanner
              type="info"
              title="Read-Only View"
              description="You are viewing a shared project plan. Run a new analysis to generate your own."
            />
          </div>
        )}

        <TwoColumnLayout
          left={
            <>
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
              <HistoryList
                history={history}
                onSelect={item => {
                  setResult(item.result);
                  setCurrentInput(item.input);
                  setIsSharedMode(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onClear={clearHistory}
                onDelete={deleteHistoryItem}
              />
            </>
          }
          right={
            <OutputPanel
              result={result}
              input={currentInput}
              isLoading={isLoading}
            />
          }
        />
      </main>

      {/* PAYWALL MODAL */}
      <CreditDialog open={showPaywall} onOpenChange={setShowPaywall} />

      <Footer />
    </div>
  );
};

export default Dashboard;
