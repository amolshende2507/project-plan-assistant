import { useState } from 'react';
import { toast } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { ComparisonView } from '@/components/comparison/ComparisonView';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectInput, ComparisonScenario, AnalysisResult } from '@/types/analyzer';
import { Sparkles, ArrowRightLeft } from 'lucide-react';

// Default base settings for comparisons
const BASE_INPUT: ProjectInput = {
  projectIdea: '',
  skillLevel: 'intermediate',
  teamSize: 'solo',
  totalWeeks: 4,
  hoursPerWeek: 20,
  platform: 'web',
  useAI: false
};

const Comparison = () => {
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState<'skill' | 'team' | 'time'>('skill');
  const [isLoading, setIsLoading] = useState(false);
  const [scenarios, setScenarios] = useState<ComparisonScenario[] | null>(null);

  const runComparison = async () => {
    if (!idea.trim()) {
      toast.error("Please enter a project idea first");
      return;
    }

    setIsLoading(true);
    setScenarios(null);

    // Define the two opposing scenarios based on the selected mode
    let inputA: ProjectInput = { ...BASE_INPUT, projectIdea: idea };
    let inputB: ProjectInput = { ...BASE_INPUT, projectIdea: idea };
    let labelA = '';
    let labelB = '';

    switch (mode) {
      case 'skill':
        labelA = 'Beginner Dev';
        inputA.skillLevel = 'beginner';
        labelB = 'Senior Dev';
        inputB.skillLevel = 'intermediate'; // acting as senior/experienced
        break;
      case 'team':
        labelA = 'Solo Founder';
        inputA.teamSize = 'solo';
        labelB = 'Startup Team';
        inputB.teamSize = 'small-team';
        break;
      case 'time':
        labelA = '2-Week Hackathon';
        inputA.totalWeeks = 2;
        inputA.hoursPerWeek = 40;
        labelB = '2-Month Project';
        inputB.totalWeeks = 8;
        inputB.hoursPerWeek = 20;
        break;
    }

    try {
      // 🚀 The Magic: Run both simulations in PARALLEL
      const [resA, resB] = await Promise.all([
        fetch('http://localhost:5000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputA)
        }),
        fetch('http://localhost:5000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputB)
        })
      ]);

      if (!resA.ok || !resB.ok) throw new Error("One of the simulations failed");

      const dataA: AnalysisResult = await resA.json();
      const dataB: AnalysisResult = await resB.json();

      // Construct the comparison data structure
      const results: ComparisonScenario[] = [
        { id: 'A', label: labelA, input: inputA, result: dataA },
        { id: 'B', label: labelB, input: inputB, result: dataB }
      ];

      setScenarios(results);
      toast.success("Comparison Generated", { description: `Analyzed ${labelA} vs ${labelB}` });

    } catch (error) {
      console.error(error);
      toast.error("Comparison Failed", { description: "Check server connection" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Scenario Simulator</h1>
          <p className="text-muted-foreground">
            See how different constraints drastically change your roadmap and risk profile.
          </p>
        </div>
        
        <TwoColumnLayout
          // LEFT COLUMN: Controls
          left={
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Define Simulation
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Idea</label>
                    <Textarea 
                      placeholder="e.g. A marketplace for used textbooks..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="resize-none h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Variable to Compare</label>
                    <Select value={mode} onValueChange={(v: any) => setMode(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skill">Skill Gap (Beginner vs Senior)</SelectItem>
                        <SelectItem value="team">Team Power (Solo vs Small Team)</SelectItem>
                        <SelectItem value="time">Time Pressure (2 Weeks vs 2 Months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full gap-2" 
                    onClick={runComparison}
                    disabled={isLoading || !idea.trim()}
                  >
                    {isLoading ? (
                      "Simulating..."
                    ) : (
                      <>
                        Run Comparison <ArrowRightLeft className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Explainer Box */}
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                <h4 className="font-medium text-sm text-primary mb-1">Why compare?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real engineering isn't about the "best" stack—it's about the right stack for the constraints. 
                  See how the AI adapts its advice based on who is building it.
                </p>
              </div>
            </div>
          }

          // RIGHT COLUMN: Results
          right={
            scenarios ? (
              <ComparisonView scenarios={scenarios} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center border-2 border-dashed border-border rounded-lg bg-muted/5">
                <div className="p-3 bg-muted rounded-full mb-3">
                  <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground">Ready to Compare</h3>
                <p className="text-sm text-muted-foreground max-w-xs mt-1">
                  Enter an idea and select a variable to see how the roadmap changes.
                </p>
              </div>
            )
          }
        />
      </main>
    </div>
  );
};

export default Comparison;