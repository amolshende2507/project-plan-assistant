import { Target, ShieldAlert, Code2, Network, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: "Constraint-Based Reasoning",
    desc: "We don't just generate text. We solve for variables: Time, Skill, and Team Size.",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    icon: <ShieldAlert className="h-6 w-6 text-destructive" />,
    title: "Risk Detection",
    desc: "Find out why your project might fail before you write a single line of code.",
    colSpan: "col-span-1",
  },
  {
    icon: <Network className="h-6 w-6 text-blue-500" />,
    title: "Visual Architecture",
    desc: "Get auto-generated Mermaid.js diagrams showing how your DB, API, and Client connect.",
    colSpan: "col-span-1",
  },
  {
    icon: <Code2 className="h-6 w-6 text-green-500" />,
    title: "Tech Stack Matching",
    desc: "Stop using Kubernetes for your To-Do list. Get the stack that fits your deadline.",
    colSpan: "col-span-1 md:col-span-2",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-surface-2 relative">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Why this isn't just another wrapper</h2>
          <p className="text-muted-foreground text-lg">
            Most AI tools give you code. We give you the <span className="text-foreground font-semibold">Engineering Strategy</span> required to actually ship it.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group ${feature.colSpan}`}
            >
              <div className="h-12 w-12 rounded-lg bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}