import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { InputForm } from '@/components/dashboard/InputForm';
import { OutputPanel } from '@/components/dashboard/OutputPanel';
import { ProjectInput, AnalysisResult } from '@/types/analyzer';
import { mockAnalysisResult, beginnerResult, teamResult } from '@/data/mockData';

const Dashboard = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (input: ProjectInput) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Return different results based on input constraints
      let analysisResult = mockAnalysisResult;
      
      if (input.skillLevel === 'beginner') {
        analysisResult = beginnerResult;
      } else if (input.teamSize === 'small-team') {
        analysisResult = teamResult;
      }
      
      setResult(analysisResult);
      setIsLoading(false);
    }, 1500);
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
          right={<OutputPanel result={result} isLoading={isLoading} />}
        />
      </main>
    </div>
  );
};

export default Dashboard;
