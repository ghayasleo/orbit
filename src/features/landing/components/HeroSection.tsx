import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';

// A simple counter component that animates up to a target number
const AnimatedCounter = ({ end, duration = 1.5 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // easeOut function
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  // Format with commas, e.g., 10,000
  return <span>{count.toLocaleString()}</span>;
};

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-base pt-[140px] md:pt-[180px] pb-14 md:pb-28">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(91,106,240,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(91,106,240,0.14)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-[1160px] px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column — Text Content */}
          <motion.div 
            className="flex-1 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-subtle px-3 py-1 mb-6">
              <span className="text-brand text-[10px] leading-tight mt-[1px]">✦</span>
              <span className="text-brand text-xs font-semibold uppercase tracking-[0.06em]">Free & Open Source</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[44px] leading-[1.1] md:text-[68px] font-extrabold text-text-primary mb-6 tracking-tight max-w-[600px]">
              Everything you need<br className="hidden md:block"/> to run your <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2]">life.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-text-secondary leading-[1.6] max-w-[500px] mb-8 font-normal">
              Orbit is a free, open source app that brings your tasks, habits, expenses, goals, reminders, loans, notes, and more into one beautifully organised place.<br/><br/>
              No subscription required. No data sold. Just a better way to manage your everyday life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-6">
              <Button
                className="h-12 rounded-[10px] bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2] px-6 text-base font-semibold text-white transition-all hover:-translate-y-[1px] hover:shadow-lg border-0"
                asChild
              >
                <Link to="/login">Get Started — It's Free</Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-[10px] px-6 text-base font-medium border-border-medium text-text-primary hover:text-brand hover:border-brand transition-colors bg-transparent"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  View on GitHub <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Trust Line */}
            <p className="text-[13px] text-text-muted mb-10">
              No account needed to explore · Works offline · MIT Licensed
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl md:text-[38px] font-bold text-text-primary tracking-tight">
                  <AnimatedCounter end={10000} />+
                </span>
                <span className="text-sm text-text-secondary">People using Orbit</span>
              </div>
              <div className="w-px h-12 bg-border-subtle shrink-0"></div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-3xl md:text-[38px] font-bold text-text-primary tracking-tight">100%</span>
                <span className="text-sm text-text-secondary">Free, forever</span>
              </div>
              <div className="w-px h-12 bg-border-subtle shrink-0 hidden sm:block"></div>
              <div className="flex flex-col gap-1 hidden sm:flex">
                <span className="font-display text-3xl md:text-[38px] font-bold text-text-primary tracking-tight">MIT</span>
                <span className="text-sm text-text-secondary">Open Source License</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column — App Mockup */}
          <motion.div 
            className="flex-1 w-full max-w-[500px] lg:max-w-none relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
             {/* Float Animation Wrapper */}
            <motion.div
               animate={{ y: [-8, 8, -8] }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 5, 
                 ease: "easeInOut" 
               }}
               className="relative z-10"
            >
              {/* Diffused Glow Behind Mockup */}
              <div className="absolute inset-0 bg-brand/10 dark:bg-brand/20 blur-[60px] rounded-full scale-90" />
              
              {/* Glass Mockup Card */}
              <div className="relative bg-glass-bg border border-glass-border backdrop-blur-[16px] shadow-glass rounded-2xl p-6 overflow-hidden">
                 
                 {/* Mockup Header */}
                 <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm">Z</div>
                     <span className="font-display font-semibold text-text-primary">Good afternoon, Zara ☀️</span>
                   </div>
                 </div>

                 {/* Mockup Summary Chips */}
                 <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="bg-bg-subtle rounded-xl p-3 border border-border-subtle">
                     <p className="text-text-primary font-medium text-sm">4 tasks due</p>
                   </div>
                   <div className="bg-bg-subtle rounded-xl p-3 border border-border-subtle">
                     <p className="text-text-primary font-medium text-sm">3 habits today</p>
                   </div>
                   <div className="bg-bg-subtle rounded-xl p-3 border border-border-subtle">
                     <p className="text-text-primary font-medium text-sm">Budget: <span className="text-emerald-500">61% used</span></p>
                   </div>
                   <div className="bg-bg-subtle rounded-xl p-3 border border-border-subtle">
                     <p className="text-text-primary font-medium text-sm">Goal: 42% to target</p>
                   </div>
                 </div>

                 {/* Mockup Tasks Section */}
                 <div className="mb-6">
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Today's Tasks</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 p-3 bg-bg-card border border-border-subtle rounded-xl opacity-50">
                        <div className="h-5 w-5 rounded border border-border-medium flex items-center justify-center bg-brand border-brand">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm text-text-secondary line-through">Review pull requests</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-bg-card border border-border-subtle rounded-xl shadow-sm">
                        <div className="h-5 w-5 rounded border border-border-medium"></div>
                        <span className="text-sm text-text-primary font-medium">Pay electricity bill</span>
                        <div className="ml-auto w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-bg-card border border-border-subtle rounded-xl shadow-sm">
                        <div className="h-5 w-5 rounded border border-border-medium"></div>
                        <span className="text-sm text-text-primary font-medium">Grocery shopping</span>
                      </div>
                    </div>
                 </div>

                 {/* Mockup Habits Section */}
                 <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Habits</h4>
                    <div className="flex items-center gap-3">
                      {/* Filled Habit Ring */}
                      <div className="h-10 w-10 rounded-full border-[3px] border-emerald-500 flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      {/* Filled Habit Ring */}
                      <div className="h-10 w-10 rounded-full border-[3px] border-blue-500 flex items-center justify-center bg-blue-500/10 text-blue-600 dark:text-blue-400">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      {/* Empty Habit Ring */}
                      <div className="h-10 w-10 rounded-full border-[3px] border-border-medium flex items-center justify-center text-text-muted">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      </div>
                    </div>
                 </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
