
import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Using Sonner as seen in your App.tsx
import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { InputForm } from '@/components/dashboard/InputForm';
import { OutputPanel } from '@/components/dashboard/OutputPanel';
import { ProjectInput, AnalysisResult } from '@/types/analyzer';
import { HistoryList, HistoryItem } from '@/components/dashboard/HistoryList';
const Dashboard = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ProjectInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

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
      result: res
    };

    // Keep max 10 items
    const updated = [newItem, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('project_history', JSON.stringify(updated));
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('project_history');
    toast.success("History cleared");
  };
  const handleSubmit = async (input: ProjectInput) => {
    setIsLoading(true);
    setResult(null);
    setCurrentInput(input);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Server Error');

      const data = await response.json();
      setResult(data);
      saveToHistory(input, data); // <--- Save it here
      toast.success("Analysis Complete");

    } catch (error) {
      console.error(error);
      toast.error("Analysis Failed");
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
              {/* Add History List Below Input */}
              <HistoryList
                history={history}
                onSelect={(item) => {
                  setResult(item.result);
                  setCurrentInput(item.input);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onClear={clearHistory}
              />
            </>
          }
          right={<OutputPanel result={result} input={currentInput} isLoading={isLoading} />}
        />
      </main>
    </div>
  );
};

export default Dashboard;