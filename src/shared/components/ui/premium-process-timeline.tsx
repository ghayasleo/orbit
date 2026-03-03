"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Lightbulb, Rocket, Activity, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Component Props & Data Types ---

interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  duration: string;
  image: string; // URL to the image for the phone mockup
  icon: React.ReactNode;
}

interface QuantumTimelineProps {
  steps?: ProcessStep[];
  defaultStep?: string;
}

// --- Default Data ---
const DEMO_STEPS: ProcessStep[] = [
  {
    id: "01",
    title: "Create your account",
    subtitle: "Getting Started",
    description:
      "Sign up with an email or continue as a guest. No credit card. No commitments. Your account is ready in under 30 seconds.",
    details: [
      "Instant access",
      "No credit card required",
      "Sign in with Google",
      "Guest mode available",
    ],
    duration: "30 seconds",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    icon: <Map className="w-5 h-5" />,
  },
  {
    id: "02",
    title: "Pick your modules",
    subtitle: "Customise Your Experience",
    description:
      "Enable only the modules you need. Set up your first task, log a habit, or connect your budget.",
    details: [
      "Toggle modules instantly",
      "Clean distractions",
      "Guided onboarding",
      "Flexible setup",
    ],
    duration: "2 minutes",
    image:
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: "03",
    title: "Everything falls into orbit",
    subtitle: "Automated Synergy",
    description:
      "Your modules start working together automatically. Expenses feed your budget. Habits count toward goals. Orbit keeps it all connected in the background.",
    details: [
      "Cross-module data flow",
      "Actionable insights",
      "Zero double-entry",
      "Smart notifications",
    ],
    duration: "Ongoing",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=2101&auto=format&fit=crop",
    icon: <Activity className="w-5 h-5" />,
  },
];

// --- Main Timeline Component ---

export const QuantumTimeline = ({
  steps = DEMO_STEPS,
  defaultStep,
}: QuantumTimelineProps) => {
  const [activeStep, setActiveStep] = useState(defaultStep || steps[0]?.id);

  const activeStepData = steps.find((step) => step.id === activeStep);
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  return (
    <div className="w-full mx-auto font-sans bg-bg-base">
      {/* Top Navigation */}
      <TimelineNav
        steps={steps}
        activeStep={activeStep || ""}
        onStepClick={setActiveStep}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeStepData && (
          <motion.div
            key={activeStepData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          >
            <TimelineContent step={activeStepData} />
            <TimelinePhoneMockup image={activeStepData.image} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Timeline */}
      <div className="max-w-4xl mx-auto">
        <BottomTimeline
          steps={steps}
          activeIndex={activeIndex}
          onStepClick={setActiveStep}
        />
      </div>
    </div>
  );
};

// --- Sub-components ---

interface TimelineNavProps {
  steps: ProcessStep[];
  activeStep: string;
  onStepClick: (id: string) => void;
}

const TimelineNav = ({ steps, activeStep, onStepClick }: TimelineNavProps) => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-brand-subtle text-brand rounded-full flex items-center justify-center font-bold font-display shadow-sm">
        <Rocket className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold text-text-primary font-display tracking-tight">
        How It Works
      </span>
    </div>
    <div className="flex items-center w-full md:w-auto overflow-x-auto hide-scrollbar gap-2 p-1.5 bg-bg-subtle border border-border-subtle rounded-full mt-4 md:mt-0 shadow-sm">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className={cn(
            "px-5 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap",
            activeStep === step.id
              ? "bg-bg-card border border-border-medium text-text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border border-transparent",
          )}
        >
          {step.title}
        </button>
      ))}
    </div>
  </div>
);

const TimelineContent = ({ step }: { step: ProcessStep }) => (
  <div className="flex flex-col justify-center">
    <span className="text-sm font-bold text-brand uppercase tracking-wider">
      {step.id}
    </span>
    <h2 className="text-[32px] font-bold mt-2 text-text-primary font-display leading-tight">
      {step.title}
    </h2>
    <p className="mt-2 text-text-muted font-medium text-[15px]">
      {step.subtitle}
    </p>
    <p className="mt-5 text-text-secondary leading-relaxed text-[16px]">
      {step.description}
    </p>

    <div className="mt-8 grid sm:grid-cols-2 gap-4">
      {step.details.map((detail, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 mt-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-3" />
          </div>
          <span className="text-[14px] text-text-secondary leading-snug">
            {detail}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-8 flex items-center gap-3 p-4 bg-bg-subtle border border-border-subtle rounded-xl w-fit">
      <div className="text-brand">{step.icon}</div>
      <span className="text-[14px] font-semibold text-text-primary">
        Time to complete: {step.duration}
      </span>
    </div>
  </div>
);

const TimelinePhoneMockup = ({ image }: { image: string }) => (
  <div className="flex items-center justify-center">
    <div className="w-[300px] h-[600px] bg-bg-card rounded-[40px] p-4 border border-border-medium shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative">
      {/* Camera cutout notch */}
      <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-bg-base/20 backdrop-blur-sm rounded-[14px] z-10"></div>
      <div className="w-full h-full bg-bg-base rounded-[24px] overflow-hidden">
        <img
          src={image}
          alt="App Screenshot"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
    </div>
  </div>
);

const BottomTimeline = ({
  steps,
  activeIndex,
  onStepClick,
}: {
  steps: ProcessStep[];
  activeIndex: number;
  onStepClick: (id: string) => void;
}) => (
  <div className="mt-16 sm:mt-24 px-4 sm:px-0">
    <div className="relative w-full h-1.5 bg-border-subtle rounded-full overflow-hidden">
      <motion.div
        className="absolute h-full bg-brand rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>

    {/* Indicators over the line - we extract them out so they can overlap the hidden overflow */}
    <div className="relative w-full h-0">
      <motion.div
        className="absolute w-4 h-4 -top-2.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(91,106,240,0.2)] dark:shadow-[0_0_0_4px_rgba(107,122,245,0.25)] border-2 border-bg-base"
        initial={{ left: "0%" }}
        animate={{
          left: `calc(${(activeIndex / (steps.length - 1)) * 100}% - 8px)`,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>

    <div className="mt-6 flex justify-between">
      {steps.map((step, i) => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className="text-center w-1/4 group flex flex-col items-center"
        >
          <span
            className={cn(
              "text-[14px] font-bold transition-colors font-display tracking-wide",
              i <= activeIndex
                ? "text-brand"
                : "text-text-muted group-hover:text-text-secondary",
            )}
          >
            STEP {step.id}
          </span>
          <p
            className={cn(
              "text-[13px] mt-1.5 transition-colors font-medium hidden sm:block",
              i <= activeIndex
                ? "text-text-primary"
                : "text-text-muted group-hover:text-text-secondary",
            )}
          >
            {step.title}
          </p>
        </button>
      ))}
    </div>
  </div>
);
