import { motion } from 'framer-motion';
import { FileText, Cpu, CheckSquare } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Describe Your Project',
    description: 'Enter your project idea along with constraints like skill level, team size, and time availability.',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our system analyzes feasibility, identifies risks, and breaks down features based on your constraints.',
  },
  {
    icon: CheckSquare,
    title: 'Get Structured Plan',
    description: 'Receive a detailed breakdown with features, tech stack, timeline estimates, and honest risk assessment.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-surface-2">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to transform your idea into an actionable plan
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}
              
              <div className="bg-card rounded-lg border border-border p-6 shadow-card relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
