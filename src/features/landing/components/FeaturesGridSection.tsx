import { motion } from "framer-motion";
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
  Target,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
  description: string;
  bullets: string[];
  className: string;
}

export function FeaturesGridSection() {
  const modules: Module[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="h-8 w-8 text-indigo-400" />,
      accentColor: "from-indigo-500/20 to-indigo-500/5",
      bgColor: "bg-indigo-500/10",
      description:
        "The first thing you see every day. Built to answer one question: what needs my attention right now?",
      bullets: [
        "Customisable widgets pulled live",
        "Daily summary: tasks & budget",
        "Quick-add anything instantly",
      ],
      className: "lg:col-span-2 lg:row-span-2 sm:col-span-2",
    },
    {
      id: "expenses",
      name: "Expenses",
      icon: <Receipt className="h-8 w-8 text-emerald-400" />,
      accentColor: "from-emerald-500/20 to-emerald-500/5",
      bgColor: "bg-emerald-500/10",
      description:
        "Know where every rupee is going before it's gone. Category tracking and receipt management.",
      bullets: [
        "Categories & payment methods",
        "Split expenses with others",
        "Automatic Budget feed",
      ],
      className: "lg:col-span-2 lg:row-span-2 sm:col-span-2",
    },
    {
      id: "tasks",
      name: "Tasks",
      icon: <CheckSquare className="h-6 w-6 text-blue-400" />,
      accentColor: "from-blue-500/20 to-blue-500/5",
      bgColor: "bg-blue-500/10",
      description:
        "Simple enough for a grocery list. Powerful enough for complex projects.",
      bullets: ["Projects & recurring tasks", "Swipe to complete"],
      className: "lg:col-span-2 lg:row-span-1 sm:col-span-2",
    },
    {
      id: "reminders",
      name: "Reminders",
      icon: <Bell className="h-6 w-6 text-amber-400" />,
      accentColor: "from-amber-500/20 to-amber-500/5",
      bgColor: "bg-amber-500/10",
      description: "The right nudge at exactly the right time.",
      bullets: [],
      className: "lg:col-span-1 lg:row-span-1 sm:col-span-1",
    },
    {
      id: "loans",
      name: "Loans",
      icon: <Landmark className="h-6 w-6 text-rose-400" />,
      accentColor: "from-rose-500/20 to-rose-500/5",
      bgColor: "bg-rose-500/10",
      description: "Track borrowing & lending easily.",
      bullets: [],
      className: "lg:col-span-1 lg:row-span-1 sm:col-span-1",
    },
    {
      id: "habits",
      name: "Habits",
      icon: <Flame className="h-6 w-6 text-violet-400" />,
      accentColor: "from-violet-500/20 to-violet-500/5",
      bgColor: "bg-violet-500/10",
      description:
        "Build the routines your future self will thank you for. Tracking streaks and momentum.",
      bullets: ["Heatmaps & completion rates", "Linked to Goals tracking"],
      className: "lg:col-span-2 lg:row-span-1 sm:col-span-2",
    },
    {
      id: "budget",
      name: "Budget",
      icon: <PieChart className="h-6 w-6 text-cyan-400" />,
      accentColor: "from-cyan-500/20 to-cyan-500/5",
      bgColor: "bg-cyan-500/10",
      description: "Plan your money. Watch it work.",
      bullets: [],
      className: "lg:col-span-1 lg:row-span-1 sm:col-span-1",
    },
    {
      id: "notes",
      name: "Notes",
      icon: <NotebookPen className="h-6 w-6 text-orange-400" />,
      accentColor: "from-orange-500/20 to-orange-500/5",
      bgColor: "bg-orange-500/10",
      description: "Capturing thoughts effortlessly.",
      bullets: [],
      className: "lg:col-span-1 lg:row-span-1 sm:col-span-1",
    },
    {
      id: "subscriptions",
      name: "Subscriptions",
      icon: <RefreshCw className="h-6 w-6 text-pink-400" />,
      accentColor: "from-pink-500/20 to-pink-500/5",
      bgColor: "bg-pink-500/10",
      description: "Track recurring payments with renewal alerts.",
      bullets: ["Renewal date tracking", "Cost totals by period"],
      className: "lg:col-span-2 lg:row-span-1 sm:col-span-2",
    },
    {
      id: "goals",
      name: "Goals",
      icon: <Target className="h-6 w-6 text-lime-400" />,
      accentColor: "from-lime-500/20 to-lime-500/5",
      bgColor: "bg-lime-500/10",
      description: "The big picture, broken into steps you can actually take.",
      bullets: ["Milestones & deadlines", "Automatic progress sync"],
      className: "lg:col-span-2 lg:row-span-1 sm:col-span-2",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as any,
      },
    },
  };

  return (
    <section
      id="features"
      className="bg-bg-primary py-24 md:py-32 overflow-hidden relative"
    >
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            className="px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Capabilities
          </motion.span>
          <motion.h2
            className="font-display text-[40px] md:text-[64px] font-bold text-text-primary leading-[1.1] max-w-[850px] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            One App. <span className="text-brand">Ten Modules.</span>
            <br />
            Seamless Productivity.
          </motion.h2>
          <motion.p
            className="text-xl text-text-secondary leading-relaxed max-w-[640px] font-normal mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A cohesive ecosystem designed to capture every aspect of your life.
            No more jumping between apps – everything you need is right here.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[300px] gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {modules.map((mod) => (
            <motion.div
              key={mod.id}
              variants={itemVariants}
              className={cn(
                "group relative bg-bg-card/50 backdrop-blur-sm border border-border-subtle rounded-[2.5rem] p-6 md:p-10 overflow-hidden transition-all duration-500 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10 flex flex-col",
                mod.className,
                // On mobile, let the card expand
                "max-lg:h-auto max-lg:min-h-[300px]",
              )}
            >
              {/* Card Gradient Overflow */}
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                  mod.accentColor,
                )}
              />

              <div className="relative h-full flex flex-col">
                {/* Icon Section */}
                <motion.div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500",
                  )}
                  whileHover={{ y: -5 }}
                >
                  {mod.icon}
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold text-text-primary mb-3 group-hover:text-brand transition-colors">
                  {mod.name}
                </h3>
                <p
                  className={cn(
                    "text-text-secondary font-medium leading-relaxed group-hover:text-text-primary transition-colors",
                    mod.id === "dashboard" || mod.id === "expenses"
                      ? "text-lg md:text-xl max-w-[340px]"
                      : "text-sm md:text-base",
                  )}
                >
                  {mod.description}
                </p>

                {/* Bullets (Only for Large/Medium cards) */}
                {mod.bullets.length > 0 && (
                  <ul className="mt-8 space-y-3 hidden sm:block">
                    {mod.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm md:text-base text-text-muted group-hover:text-text-secondary transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand/40 group-hover:bg-brand transition-colors" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-8 flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/30 transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* Sync Message */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-4 py-4 px-8 rounded-full bg-brand/5 border border-brand/10 text-brand font-medium">
            <RefreshCw className="h-5 w-5 animate-spin-slow" />
            <span>
              Fully Integrated. Each module talks to the other automatically.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
