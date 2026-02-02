import { Link } from 'react-router-dom';
import { BarChart3, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary text-primary-foreground">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">ProjectAnalyzer</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              An AI-powered decision support system for developers. 
              Stop guessing constraints and start engineering with precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">Analyzer</Link>
              </li>
              <li>
                <Link to="/comparison" className="hover:text-primary transition-colors">Scenario Comparison</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Prompt Templates</a>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/YOUR_USERNAME" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with React, Node.js & Gemini.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ProjectAnalyzer. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            <span>by AMOL SHENDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}