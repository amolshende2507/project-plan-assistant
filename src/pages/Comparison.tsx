import { Navbar } from '@/components/layout/Navbar';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { ComparisonView } from '@/components/comparison/ComparisonView';
import { comparisonScenarios } from '@/data/mockData';
import { WarningBanner } from '@/components/shared/WarningBanner';

const Comparison = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Scenario Comparison</h1>
          <p className="text-muted-foreground">
            See how different constraints impact your project plan
          </p>
        </div>
        
        <TwoColumnLayout
          left={
            <div className="space-y-4">
              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <h3 className="font-semibold text-foreground mb-2">About This View</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare how changing skill level or team size affects your project timeline, 
                  feature scope, and risk assessment.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">Beginner adds learning buffers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Intermediate enables more features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-muted-foreground">Team size affects parallelization</span>
                  </div>
                </div>
              </div>
              
              <WarningBanner
                type="info"
                title="Mock Data Mode"
                description="This comparison uses pre-defined scenarios to demonstrate the UI. Connect to the analyzer for real comparisons."
              />
            </div>
          }
          right={<ComparisonView scenarios={comparisonScenarios} />}
        />
      </main>
    </div>
  );
};

export default Comparison;
