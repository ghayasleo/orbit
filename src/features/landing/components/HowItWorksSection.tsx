import { motion } from 'framer-motion';
import { Orbit, UserPlus, Sliders } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: <UserPlus className="h-6 w-6 text-brand" />,
      title: 'Create your account',
      description: 'Sign up with an email or continue as a guest. No credit card. No commitments. Your account is ready in under 30 seconds.'
    },
    {
      number: '02',
      icon: <Sliders className="h-6 w-6 text-brand" />,
      title: 'Pick your modules',
      description: 'Enable only the modules you need. Set up your first task, log a habit, or connect your budget. A short onboarding guide walks you through it.'
    },
    {
      number: '03',
      icon: <Orbit className="h-6 w-6 text-brand" />,
      title: 'Everything falls into orbit',
      description: 'Your modules start working together automatically. Expenses feed your budget. Habits count toward goals. Orbit keeps it all connected in the background.'
    }
  ];

  /* Animation variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slower stagger for steps to emphasize sequence
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="how-it-works" className="bg-bg-base py-16 md:py-28 relative">
      <div className="mx-auto max-w-[1160px] px-6">
        
        {/* Header Block */}
        <motion.div 
          className="flex flex-col items-center text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-text-muted mb-4">
            HOW IT WORKS
          </div>
          <h2 className="font-display text-[38px] md:text-[52px] font-bold text-text-primary leading-tight max-w-[640px] tracking-tight">
            From zero to organised in minutes.
          </h2>
        </motion.div>

        {/* Steps Container */}
        <motion.div 
          className="relative max-w-[1000px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Dashed connector line */}
          <div className="absolute left-[24px] top-[48px] bottom-0 w-[2px] border-l-2 border-dashed border-border-medium/60 md:hidden z-0" />
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-border-medium/60 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step) => (
              <motion.div 
                key={step.number}
                variants={itemVariants}
                className="flex flex-row md:flex-col items-start gap-6 relative"
              >
                {/* Step Connector Mobile Fix (solid background to hide dashed line underneath node) */}
                <div className="bg-bg-base shrink-0 pt-2 pb-6 md:py-4 px-2 -ml-2 rounded-full md:rounded-none md:ml-0 md:mb-2 md:mx-auto md:w-auto relative z-10">
                    <div className="flex flex-col md:items-center text-left md:text-center w-full">
                        {/* Number & Icon Container */}
                        <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-brand-subtle flex items-center justify-center border-4 border-bg-base shadow-sm shrink-0 mb-0 md:mb-6">
                            <span className="font-display text-[38px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2]">
                                {step.number}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:items-center text-left md:text-center mt-3 md:mt-0 pt-2 md:pt-0 pb-6 md:pb-0 relative z-10 bg-bg-base md:bg-transparent px-2 md:px-0 rounded-xl">
                  {/* Step Icon & Title Row (Mobile) */}
                  <div className="flex items-center justify-start md:justify-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-subtle flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <h3 className="font-display text-[22px] font-semibold text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <p className="text-base font-normal text-text-secondary leading-relaxed max-w-[280px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
