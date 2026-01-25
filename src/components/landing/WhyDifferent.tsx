import { motion } from 'framer-motion';
import { Target, Eye, Clock } from 'lucide-react';

const differentiators = [
  {
    icon: Target,
    title: 'Constraint-First Approach',
    description: 'We start with your limitations—not your wishlist. Skill level, time, and resources shape every recommendation.',
  },
  {
    icon: Eye,
    title: 'Explainable Decisions',
    description: 'Every feature inclusion, exclusion, and tech choice comes with clear reasoning. No black-box magic.',
  },
  {
    icon: Clock,
    title: 'Realistic Timelines',
    description: 'Best-case and worst-case scenarios with explicit buffer reasoning. Confidence levels you can trust.',
  },
];

export function WhyDifferent() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Why This Is Different</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built for honest planning, not optimistic promises
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-lg border border-border p-6 shadow-card transition-shadow hover:shadow-elevated">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
