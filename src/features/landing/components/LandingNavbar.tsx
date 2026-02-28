import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { Github, Menu } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet';

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 72);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled
          ? 'bg-glass-bg border-b border-border-medium backdrop-blur-md shadow-glass'
          : 'bg-bg-base border-b border-border-subtle'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1160px] items-center justify-between px-6">
        {/* Left — Logo */}
        <Link to="/" className="flex items-center gap-2 group">
           {/* Logo placeholder - replace with actual graphic if available*/}
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute h-6 w-6 rounded-full border-2 border-brand group-hover:border-brand-hover transition-colors opacity-70" />
            <div className="absolute h-6 w-6 rounded-full border-2 border-brand group-hover:border-brand-hover transition-colors translate-x-1 translate-y-1 opacity-40 mix-blend-multiply dark:mix-blend-screen" />
          </div>
          <span className="font-display text-lg font-bold text-text-primary tracking-tight">Orbit</span>
        </Link>

        {/* Center — Navigation Links (desktop only) */}
        <nav className="hidden md:flex items-center gap-6">
           {['Home', 'Features', 'How it Works', 'Open Source', 'FAQ'].map((item) => (
             <Link
               key={item}
               to={`#${item.toLowerCase().replace(/ /g, '-')}`}
               className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary relative group"
             >
               {item}
               {/* Hover dot - simplistic version */}
               <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
             </Link>
           ))}
        </nav>

        {/* Right — Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex h-8 gap-2 border-border-medium text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors rounded-full px-3"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              <span>★ 1.2k</span>
            </a>
          </Button>
          
          <Button
            className="hidden md:flex h-10 rounded-[10px] bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2] px-[18px] py-[10px] text-[14px] font-semibold text-white transition-all hover:-translate-y-[1px] hover:shadow-lg border-0"
            asChild
          >
            <Link to="/login">Get Started</Link>
          </Button>

           {/* Mobile Menu */}
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-text-secondary hover:text-text-primary hover:bg-bg-subtle">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full bg-bg-base border-t border-border-subtle rounded-t-xl p-6">
              <nav className="flex flex-col gap-4">
                 {['Home', 'Features', 'How it Works', 'Open Source', 'FAQ'].map((item) => (
                 <Link
                   key={item}
                   to={`#${item.toLowerCase().replace(/ /g, '-')}`}
                   className="text-base font-medium text-text-secondary transition-colors hover:text-text-primary py-2 border-b border-border-subtle/50"
                 >
                   {item}
                 </Link>
               ))}
               <Button
                  className="mt-4 h-12 w-full rounded-[10px] bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2] text-white text-base font-semibold border-0"
                  asChild
                >
                  <Link to="/login">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
