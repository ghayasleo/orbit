import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Bell, 
  Receipt, 
  Landmark, 
  Flame, 
  PieChart, 
  NotebookPen, 
  RefreshCw, 
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeaturesGridSection() {
  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-6 w-6 text-indigo-500" />,
      accentColor: 'border-indigo-500',
      bgColor: 'bg-indigo-500/10',
      description: 'The first thing you see every day. Built to answer one question: what needs my attention right now?',
      bullets: [
        'Customisable widgets pulled live from all modules',
        'Today\'s summary: tasks, habits, budget, and loans at a glance',
        'Quick-add anything without leaving the dashboard'
      ]
    },
    {
      id: 'tasks',
      name: 'Tasks',
      icon: <CheckSquare className="h-6 w-6 text-blue-500" />,
      accentColor: 'border-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Simple enough for a grocery list. Powerful enough for complex projects.',
      bullets: [
        'Projects, subtasks, priorities, and due dates',
        'Recurring tasks and inline reminder attachment',
        'Swipe to complete, bulk actions, and full-text search'
      ]
    },
    {
      id: 'reminders',
      name: 'Reminders',
      icon: <Bell className="h-6 w-6 text-amber-500" />,
      accentColor: 'border-amber-500',
      bgColor: 'bg-amber-500/10',
      description: 'The right nudge at exactly the right time.',
      bullets: [
        'Push notifications with snooze and action buttons',
        'Recurring reminders and missed reminder tracking',
        'Link any reminder to an existing task'
      ]
    },
    {
      id: 'expenses',
      name: 'Expenses',
      icon: <Receipt className="h-6 w-6 text-emerald-500" />,
      accentColor: 'border-emerald-500',
      bgColor: 'bg-emerald-500/10',
      description: 'Know where every rupee is going before it\'s gone.',
      bullets: [
        'Categories, tags, payment methods, and receipt photos',
        'Split expenses with others and track reimbursements',
        'Automatic feed into the Budget Planner — no double entry'
      ]
    },
    {
      id: 'loans',
      name: 'Loans',
      icon: <Landmark className="h-6 w-6 text-rose-500" />,
      accentColor: 'border-rose-500',
      bgColor: 'bg-rose-500/10',
      description: 'Whether you\'re borrowing or lending — track it all.',
      bullets: [
        'Full interest calculation with simple and compound options',
        'EMI schedules and amortisation tables',
        'Auto-reminders before every payment due date'
      ]
    },
    {
      id: 'habits',
      name: 'Habits',
      icon: <Flame className="h-6 w-6 text-violet-500" />,
      accentColor: 'border-violet-500',
      bgColor: 'bg-violet-500/10',
      description: 'Build the routines your future self will thank you for.',
      bullets: [
        'Streaks, heatmaps, and per-habit completion rates',
        'Quantitative targets — steps, glasses, minutes, pages',
        'Link habits to Goals to track momentum automatically'
      ]
    },
    {
      id: 'budget',
      name: 'Budget Planner',
      icon: <PieChart className="h-6 w-6 text-cyan-500" />,
      accentColor: 'border-cyan-500',
      bgColor: 'bg-cyan-500/10',
      description: 'Plan your money. Watch the plan work.',
      bullets: [
        'Set category budgets and track them in real time',
        'Colour-coded alerts at 80%, 90%, and 100% of budget',
        'Monthly rollover, income tracking, and net position'
      ]
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: <NotebookPen className="h-6 w-6 text-orange-500" />,
      accentColor: 'border-orange-500',
      bgColor: 'bg-orange-500/10',
      description: 'A thought captured is a thought kept.',
      bullets: [
        'Rich text, checklists, voice memos, and image attachments',
        'Notebooks, tags, pinning, and full-text search',
        'Auto-saves every keystroke — no manual save ever needed'
      ]
    },
    {
      id: 'subscriptions',
      name: 'Subscriptions',
      icon: <RefreshCw className="h-6 w-6 text-pink-500" />,
      accentColor: 'border-pink-500',
      bgColor: 'bg-pink-500/10',
      description: 'Stop paying for services you forgot you had.',
      bullets: [
        'Track every recurring payment with renewal dates',
        'Alerts days before you\'re charged — cancel before it\'s too late',
        'Monthly and annual cost totals with per-person breakdowns'
      ]
    },
    {
      id: 'goals',
      name: 'Goals',
      icon: <Target className="h-6 w-6 text-lime-500" />,
      accentColor: 'border-lime-500',
      bgColor: 'bg-lime-500/10',
      description: 'The big picture, broken into steps you can actually take.',
      bullets: [
        'Milestones, progress updates, and deadline tracking',
        'Linked to Habits and Tasks for automatic progress',
        'On-track vs at-risk status with projected completion date'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="features" className="bg-bg-subtle py-16 md:py-28 overflow-hidden z-20 relative">
      <div className="mx-auto max-w-[1160px] px-6">
        
        {/* Header Block */}
        <motion.div 
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-brand mb-4">
            WHAT'S INSIDE
          </div>
          <h2 className="font-display text-[38px] md:text-[52px] font-bold text-text-primary leading-tight max-w-[720px] mb-6 tracking-tight">
            One app. Ten modules. Total clarity.
          </h2>
          <p className="text-lg text-text-secondary leading-[1.6] max-w-[520px] font-normal mx-auto">
            Each module is thoughtfully built and fully capable on its own. Together, they create something greater — a complete view of your daily life.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {modules.map((mod, index) => (
            <motion.div 
              key={mod.id}
              variants={itemVariants}
              className={cn(
                "group relative bg-bg-card border border-border-subtle rounded-2xl shadow-card overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-border-medium",
                index === 9 ? "lg:col-start-2" : "" // Center the 10th item on lg screens
              )}
            >
              {/* Top Accent Border */}
              <div className={cn("absolute top-0 left-0 right-0 h-[3px]", mod.accentColor, "border-t-[3px] border-solid")} />
              
              <div className="p-6">
                 {/* Icon */}
                <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center mb-5 border border-border-subtle/50 transition-colors", mod.bgColor, "group-hover:bg-opacity-20")}>
                  {mod.icon}
                </div>
                
                {/* Title & Description */}
                <h3 className="font-display text-[22px] font-semibold text-text-primary mb-2">
                  {mod.name}
                </h3>
                <p className="text-sm font-normal text-text-secondary leading-relaxed mb-6">
                  {mod.description}
                </p>
                
                {/* Feature Bullets */}
                <ul className="flex flex-col gap-3">
                  {mod.bullets.map((bullet, i) => (
                    <li key={i} className="text-[13px] font-normal text-text-secondary leading-relaxed flex items-start gap-2">
                       <span className={cn("mt-[2px] font-bold", mod.icon.props.className.split(' ').find((c: string) => c.startsWith('text-')))}>
                         ✓
                       </span>
                       <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Footer Note */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
           <p className="text-base text-text-muted font-normal max-w-[800px] mx-auto leading-relaxed">
             All 10 modules share data automatically. Expenses feed the Budget. Habits advance Goals. Loans create Reminders. Everything works together.
           </p>
        </motion.div>
      </div>
    </section>
  );
}
