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

import { ProjectInput, AnalysisResult } from '@/types/analyzer';
import { Footer } from '@/components/layout/Footer';
const Dashboard = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ProjectInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSharedMode, setIsSharedMode] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Load history + check for shared link
  useEffect(() => {
    // Load local history
    const saved = localStorage.getItem('project_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }

    // Check for shared data in URL
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
    setIsLoading(true);
    setResult(null);
    setCurrentInput(input);
    setIsSharedMode(false);

    // Clear URL params when running a new analysis
    setSearchParams({});

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
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
                onSelect={(item) => {
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
      <Footer />
    </div>
  );
};

export default Dashboard;
