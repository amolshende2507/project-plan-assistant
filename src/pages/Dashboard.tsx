import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { InputForm } from '@/components/dashboard/InputForm';
import { OutputPanel } from '@/components/dashboard/OutputPanel';
import { HistoryList, HistoryItem } from '@/components/dashboard/HistoryList';

import { ProjectInput, AnalysisResult } from '@/types/analyzer';

const Dashboard = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ProjectInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // ✅ URL Search Params (shareable state)
  const [searchParams, setSearchParams] = useSearchParams();

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('project_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

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

    // 🚀 UPDATE URL PARAMS (SHAREABLE LINK)
    setSearchParams({
      idea: input.projectIdea,
      skill: input.skillLevel,
      team: input.teamSize,
      weeks: input.totalWeeks.toString(),
      hours: input.hoursPerWeek.toString(),
      platform: input.platform,
      ai: input.useAI.toString(),
    });

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <TwoColumnLayout
          left={
            <>
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
              <HistoryList
                history={history}
                onSelect={(item) => {
                  setResult(item.result);
                  setCurrentInput(item.input);
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
    </div>
  );
};

export default Dashboard;
