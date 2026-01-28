import { useState } from 'react';
import { toast } from 'sonner'; // Using Sonner as seen in your App.tsx
import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { InputForm } from '@/components/dashboard/InputForm';
import { OutputPanel } from '@/components/dashboard/OutputPanel';
import { ProjectInput, AnalysisResult } from '@/types/analyzer';

const Dashboard = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
   const [currentInput, setCurrentInput] = useState<ProjectInput | null>(null);
   const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (input: ProjectInput) => {
    setIsLoading(true);
    setResult(null); // Clear previous results so UI doesn't look stale

    setCurrentInput(input); 

    try {
      // 1. Send data to your local backend
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      // 2. Handle API Errors
      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      // 3. Get the JSON data
      const data = await response.json();
      
      // 4. Update the UI
      setResult(data);
      toast.success("Analysis Complete", {
        description: "Your project blueprint has been generated."
      });

    } catch (error) {
      console.error("Failed to analyze:", error);
      toast.error("Analysis Failed", {
        description: "Could not connect to the AI brain. Is the server running?"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Project Analyzer</h1>
          <p className="text-muted-foreground">
            Enter your project details to receive a constraint-aware analysis
          </p>
        </div>
        
        <TwoColumnLayout
          left={<InputForm onSubmit={handleSubmit} isLoading={isLoading} />}
  
          right={<OutputPanel result={result} input={currentInput} isLoading={isLoading} />}
        />
      </main>
    </div>
  );
};

export default Dashboard;