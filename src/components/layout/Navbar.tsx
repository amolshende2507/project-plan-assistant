import { Link, useLocation } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Analyzer' },
  { href: '/comparison', label: 'Compare' },
];

export function Navbar() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 mr-8">
          <div className="p-1.5 rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground">ProjectAnalyzer</span>
        </Link>
        
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                location.pathname === link.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
