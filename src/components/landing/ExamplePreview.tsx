import { Check } from 'lucide-react';

const steps = [
  { label: "Analysing Constraints...", color: "text-blue-500" },
  { label: "Detecting Skill Gaps...", color: "text-purple-500" },
  { label: "Optimizing Tech Stack...", color: "text-yellow-500" },
  { label: "Generating Blueprint...", color: "text-green-500" },
];

export function ExamplePreview() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">See inside the brain</h2>
            <p className="text-muted-foreground text-lg">
              Our system runs a multi-step engineering pipeline to ensure your plan isn't just hallucinated text—it's a viable strategy.
            </p>
            <ul className="space-y-4 mt-6">
              {['Realistic Timeline Estimation', 'Feasibility Scoring (0-100)', 'Pivot Advice for Beginners'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-slate-950 rounded-xl shadow-2xl overflow-hidden border border-slate-800 font-mono text-sm">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-slate-400 text-xs">analysis-pipeline — bash</span>
              </div>
              <div className="p-6 space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 0.5}s`, animationFillMode: 'backwards' }}>
                    <span className="text-slate-500">➜</span>
                    <span className={step.color}>{step.label}</span>
                    <span className="ml-auto text-xs text-slate-600">[Done]</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-800 animate-in fade-in" style={{ animationDelay: '2.5s' }}>
                  <span className="text-green-400">✔ Blueprint Ready.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}