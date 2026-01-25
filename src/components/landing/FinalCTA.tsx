import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to plan with clarity?
          </h2>
          <p className="text-muted-foreground mb-8">
            Stop building blindly. Get a realistic roadmap for your next project.
          </p>
          <Button asChild size="lg" className="gap-2 px-8">
            <Link to="/dashboard">
              Analyze My Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
