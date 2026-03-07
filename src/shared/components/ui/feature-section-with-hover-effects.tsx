import { cn } from "@/lib/utils";
import {
  Bell,
  CheckSquare,
  Flame,
  Landmark,
  LayoutDashboard,
  NotebookPen,
  PieChart,
  Receipt,
  RefreshCw,
  Target,
} from "lucide-react";

type FeatureType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  showBottomBorder: boolean;
};

const features: FeatureType[] = [
  {
    title: "Dashboard",
    description:
      "The first thing you see every day. Built to answer one question: what needs my attention right now?",
    icon: <LayoutDashboard className="text-indigo-400" />,
    showBottomBorder: true,
  },
  {
    title: "Expense Tracking",
    description:
      "Know where every rupee is going before it's gone. Category tracking and receipt management.",
    icon: <Receipt className="text-emerald-400" />,
    showBottomBorder: true,
  },
  {
    title: "Tasks",
    description:
      "Simple enough for a grocery list. Powerful enough for complex projects.",
    icon: <CheckSquare className=" text-blue-400" />,
    showBottomBorder: true,
  },
  {
    title: "Reminders",
    description: "The right nudge at exactly the right time.",
    icon: <Bell className=" text-amber-400" />,
    showBottomBorder: true,
  },
  {
    title: "Loans",
    description: "Track borrowing & lending easily.",
    icon: <Landmark className=" text-rose-400" />,
    showBottomBorder: false,
  },
  {
    title: "Habits",
    description:
      "Build the routines your future self will thank you for. Tracking streaks and momentum.",
    icon: <Flame className=" text-violet-400" />,
    showBottomBorder: true,
  },
  {
    title: "Budget",
    description: "Plan your money. Watch it work.",
    icon: <PieChart className=" text-cyan-400" />,
    showBottomBorder: true,
  },
  {
    title: "Notes",
    description: "Capturing thoughts effortlessly.",
    icon: <NotebookPen className=" text-orange-400" />,
    showBottomBorder: false,
  },
  {
    title: "Subscriptions",
    description: "Track recurring payments with renewal alerts.",
    icon: <RefreshCw className=" text-pink-400" />,
    showBottomBorder: false,
  },
  {
    title: "Goals",
    description: "The big picture, broken into steps you can actually take.",
    icon: <Target className=" text-lime-400" />,
    showBottomBorder: false,
  },
];

export function FeaturesSectionWithHoverEffects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto [&>*:nth-last-child(2)]:col-start-2">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

type FeatureProps = FeatureType & { index: number };

const Feature = ({
  title,
  description,
  icon,
  index,
  showBottomBorder,
}: FeatureProps) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-900",
        (index === 0 || index % 4 === 0) &&
          "lg:border-l dark:border-neutral-900",
        showBottomBorder && "lg:border-b dark:border-neutral-900",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 group-hover/feature:bg-brand rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
