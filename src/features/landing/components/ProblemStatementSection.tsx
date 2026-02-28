import { motion } from 'framer-motion';
import { Layers, Unlink, BatteryLow } from 'lucide-react';

export function ProblemStatementSection() {
  const problems = [
    {
      icon: <Layers className="h-6 w-6 text-text-muted" />,
      title: 'Too many apps',
      description: 'You need a different app for every part of your life. The switching, the syncing, the separate logins — it\'s exhausting before you\'ve even started.',
    },
    {
      icon: <Unlink className="h-6 w-6 text-text-muted" />,
      title: 'Nothing connects',
      description: 'Your expense tracker doesn\'t know your budget exists. Your habit app doesn\'t feed your goals. Every tool is its own island.',
    },
    {
      icon: <BatteryLow className="h-6 w-6 text-text-muted" />,
      title: 'Mental overhead adds up',
      description: 'Remembering where everything lives takes as much energy as doing the actual work. Your tools should clear your head, not fill it.',
    },
  ];

  /* Shared animation variants for staggered children */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger appearance slightly
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="bg-bg-base py-14 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1160px] px-6">
        
        {/* Header Block */}
        <motion.div 
          className="flex flex-col items-center text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={itemVariants}
        >
          <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-text-muted mb-4">
            THE PROBLEM
          </div>
          <h2 className="font-display text-[38px] md:text-[52px] font-bold text-text-primary leading-tight max-w-[640px] mb-6 tracking-tight">
            Life is scattered. Your tools make it worse.
          </h2>
          <p className="text-lg text-text-secondary leading-[1.6] max-w-[580px] font-normal">
            Most people use 5 to 8 different apps to manage their daily life. A habit tracker here, a budget spreadsheet there, sticky notes on the fridge, and reminders lost in a notification pile.
            <br className="hidden sm:block"/><br className="hidden sm:block"/>
            The apps don't talk to each other. Context gets lost. Things slip through the cracks. And somehow the tools meant to help you feel like more work than the tasks themselves.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {problems.map((problem, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group bg-bg-card border border-border-subtle rounded-2xl p-7 shadow-card hover:bg-bg-card-hover hover:border-border-medium hover:-translate-y-0.5 transition-all duration-200 ease-out"
            >
              <div className="h-12 w-12 rounded-xl bg-bg-subtle flex items-center justify-center mb-6 border border-border-subtle group-hover:bg-bg-base transition-colors">
                {problem.icon}
              </div>
              <h3 className="font-display text-[22px] font-semibold text-text-primary mb-3">
                {problem.title}
              </h3>
              <p className="text-base font-normal text-text-secondary leading-relaxed group-hover:text-text-primary/80 transition-colors">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
