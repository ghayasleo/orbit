import { motion } from 'framer-motion';
import { Github, Star, GitFork, Users, GitCommit, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function OpenSourceSection() {
  const stats = [
    { value: 'MIT', label: 'License' },
    { value: 'GitHub', label: 'Source Available' },
    { value: '100%', label: 'Free Forever' },
  ];

  const repoStats = [
    { icon: <Star className="h-4 w-4" />, value: '1.2k', label: 'GitHub Stars' },
    { icon: <GitFork className="h-4 w-4" />, value: '180', label: 'Forks' },
    { icon: <Users className="h-4 w-4" />, value: '34', label: 'Contributors' },
    { icon: <GitCommit className="h-4 w-4" />, value: '420+', label: 'Commits' },
  ];

  return (
    <section id="open-source" className="bg-bg-base pt-16 md:pt-28 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1160px] px-6">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start mb-20 lg:mb-28">
          
          {/* Left Column — Text & CTAs */}
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-brand mb-4">
              OPEN SOURCE
            </div>

            {/* Headline */}
            <h2 className="font-display text-[38px] md:text-[52px] font-bold text-text-primary leading-tight max-w-[500px] mb-6 tracking-tight">
              Built in the open.<br/>For everyone.
            </h2>

            {/* Body Copy */}
            <p className="text-lg text-text-secondary leading-[1.6] max-w-[480px] font-normal mb-8">
              Orbit is fully open source under the MIT License. Every line of code is public, every decision is transparent, and every person is welcome to contribute, fork, or self-host.
              <br/><br/>
              We believe productivity tools shouldn't be locked behind subscriptions or proprietary walls. Orbit is free today, and it will be free forever — because the community owns it.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 sm:gap-8 mb-10 pb-10 border-b border-border-subtle">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 items-start">
                  <span className="font-display text-[22px] font-bold text-text-primary tracking-tight">{stat.value}</span>
                  <span className="text-[13px] text-text-secondary font-medium">{stat.label}</span>
                  {/* Vertical dividers except for the last item */}
                  {i < stats.length - 1 && (
                     <div className="hidden sm:block absolute h-8 w-px bg-border-subtle right-[-1rem] sm:right-[-1.5rem]" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                className="w-full sm:w-auto h-11 bg-bg-card border border-border-medium hover:border-brand text-text-primary hover:text-brand hover:bg-bg-card-hover text-[14px] font-semibold rounded-[10px] px-6 gap-2 transition-all shadow-sm"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="h-[18px] w-[18px]" />
                  Star on GitHub ★
                </a>
              </Button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-center gap-1.5 h-11 px-4 text-[14px] font-semibold text-brand hover:underline underline-offset-4"
              >
                Read the Docs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Right Column — Glass Card */}
          <motion.div 
            className="flex-1 w-full max-w-[520px] lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {/* Diffused Glow Behind Card */}
            <div className="absolute inset-0 bg-brand/10 dark:bg-brand/20 blur-[80px] rounded-full scale-90 -translate-y-8" />
            
            {/* Glass Card Container */}
            <div className="relative bg-glass-bg border border-glass-border backdrop-blur-[16px] shadow-glass rounded-[24px] p-8 md:p-10 flex flex-col gap-8 transition-transform duration-300 hover:translate-y-[-4px]">
              
              {/* Top Area — Logo & Badge */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 mb-2 rounded-full border-[3px] border-brand flex items-center justify-center text-brand font-bold opacity-80 mix-blend-multiply dark:mix-blend-screen bg-brand-subtle">
                  O
                </div>
                <div className="inline-flex items-center justify-center bg-brand-subtle text-brand text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  MIT License
                </div>
              </div>

              {/* Middle Area — Repo Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {repoStats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-bg-base/60 dark:bg-bg-base/40 border border-border-subtle rounded-xl p-4 shadow-sm hover:border-border-medium transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-bg-card border border-border-subtle text-text-secondary shrink-0">
                      {stat.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-semibold text-text-primary text-lg leading-tight">{stat.value}</span>
                      <span className="text-[12px] text-text-secondary font-medium">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Area — Contributors */}
              <div className="flex flex-col items-center gap-4 pt-4 border-t border-border-subtle/50">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.06em]">
                  Contributors
                </span>
                <div className="flex items-center justify-center -space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div 
                      key={num} 
                      className="h-8 w-8 rounded-full border-2 border-bg-base bg-bg-subtle flex items-center justify-center text-[10px] font-bold text-text-secondary shadow-sm"
                    >
                      {String.fromCharCode(64 + num)}
                    </div>
                  ))}
                  <div className="h-8 pl-3 pr-2.5 rounded-full border-2 border-bg-base bg-bg-card flex items-center justify-center text-[11px] font-semibold text-text-primary shadow-sm z-10">
                    +26
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
        
        {/* Community Call-Out Strip */}
        <motion.div 
          className="w-full bg-bg-subtle border-y border-border-subtle py-10 md:py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left rounded-3xl md:rounded-[32px] md:px-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-[22px] font-semibold text-text-primary">Want to help build Orbit?</h3>
            <p className="text-[15px] font-normal text-text-secondary max-w-[480px]">
              We welcome contributions of all kinds — code, design, documentation, and feedback.
            </p>
          </div>
          <Button
            variant="outline"
            className="h-11 rounded-[10px] bg-transparent border-brand text-brand hover:bg-brand-subtle px-6 text-[14px] font-semibold shrink-0"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              Contribute on GitHub <ArrowRight className="h-[14px] w-[14px]" />
            </a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
