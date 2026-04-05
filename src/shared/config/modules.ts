import {
  LayoutDashboard,
  CheckSquare,
  Bell,
  Wallet,
  Handshake,
  Flame,
  PieChart,
  StickyNote,
  RefreshCw,
  Target,
  Users,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

export type ModuleLayer = "Sources" | "Orchestration" | "Insights" | "Core";

export interface AppModule {
  id: string; 
  name: string; 
  title: string; 
  description: string; 
  featureDescription: string; 
  icon: LucideIcon;
  color: string; 
  colorClass: string; 
  layer: ModuleLayer;
  path: string; 
}

export const LAYER_CONFIG: Record<
  ModuleLayer,
  { color: string; bg: string; border: string; icon: string }
> = {
  Core: { color: "#5B6AF0", bg: "bg-[#5B6AF0]/10", border: "border-[#5B6AF0]/20", icon: "🏠" },
  Sources: { color: "#4F8EF7", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "🔵" },
  Orchestration: { color: "#F5A623", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "🟡" },
  Insights: { color: "#A855F7", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "🟣" },
};

export const APP_MODULES = {
  dashboard: {
    id: "dashboard",
    name: "Home",
    title: "Dashboard",
    description: "The central hub uniting all your modules.",
    featureDescription:
      "The first thing you see every day. Built to answer one question: what needs my attention right now?",
    icon: LayoutDashboard,
    color: "#818cf8", // indigo-400
    colorClass: "text-indigo-400",
    layer: "Core",
    path: "/app",
  },
  expenses: {
    id: "expenses",
    name: "Expenses",
    title: "Expense Tracking",
    description:
      "Log once, reflected everywhere. Every expense you record automatically updates your Budget Planner — Subscriptions and Loans also push charges here automatically.",
    featureDescription:
      "Know where every rupee is going before it's gone. Category tracking and receipt management.",
    icon: Wallet,
    color: "#34d399", // emerald-400
    colorClass: "text-emerald-400",
    layer: "Orchestration",
    path: "/app/expenses",
  },
  tasks: {
    id: "tasks",
    name: "Tasks",
    title: "Tasks",
    description:
      "Everything you need to get done. Create tasks with priorities, due dates, and subtasks — they automatically create Reminders and feed progress into your Goals.",
    featureDescription:
      "Simple enough for a grocery list. Powerful enough for complex projects.",
    icon: CheckSquare,
    color: "#60a5fa", // blue-400
    colorClass: "text-blue-400",
    layer: "Sources",
    path: "/app/tasks",
  },
  reminders: {
    id: "reminders",
    name: "Reminders",
    title: "Reminders",
    description:
      "Never miss a moment. Reminders fire at exactly the right time and are auto-created when you add Tasks or set up Loan repayment schedules.",
    featureDescription: "The right nudge at exactly the right time.",
    icon: Bell,
    color: "#fbbf24", // amber-400
    colorClass: "text-amber-400",
    layer: "Orchestration",
    path: "/app/reminders",
  },
  loans: {
    id: "loans",
    name: "Loans",
    title: "Loans",
    description:
      "Stay on top of what you owe. Loans auto-schedule Reminders for upcoming EMIs and can automatically log repayments as Expenses.",
    featureDescription: "Track borrowing & lending easily.",
    icon: Handshake,
    color: "#fb7185", // rose-400
    colorClass: "text-rose-400",
    layer: "Sources",
    path: "/app/loans",
  },
  habits: {
    id: "habits",
    name: "Habits",
    title: "Habits",
    description:
      "Small actions, big results. Track daily routines and each check-in automatically contributes momentum toward any Goal you've linked.",
    featureDescription:
      "Build the routines your future self will thank you for. Tracking streaks and momentum.",
    icon: Flame,
    color: "#a78bfa", // violet-400
    colorClass: "text-violet-400",
    layer: "Sources",
    path: "/app/habits",
  },
  budget: {
    id: "budget",
    name: "Budget",
    title: "Budget",
    description:
      "Your financial clarity engine. Set spending limits per category and Budget Planner automatically tracks actuals from Expenses, Subscriptions, and Goal savings targets.",
    featureDescription: "Plan your money. Watch it work.",
    icon: PieChart,
    color: "#22d3ee", // cyan-400
    colorClass: "text-cyan-400",
    layer: "Insights",
    path: "/app/budget",
  },
  notes: {
    id: "notes",
    name: "Notes",
    title: "Notes",
    description:
      "Capture anything, instantly. A free-form space for raw thoughts, ideas, and context — the universal entry point that requires no structure.",
    featureDescription: "Capturing thoughts effortlessly.",
    icon: StickyNote,
    color: "#fb923c", // orange-400
    colorClass: "text-orange-400",
    layer: "Sources",
    path: "/app/notes",
  },
  subscriptions: {
    id: "subscriptions",
    name: "Subscriptions",
    title: "Subscriptions",
    description:
      "Never forget a renewal. Subscriptions auto-logs charges as Expenses and feeds your fixed monthly costs into Budget Planner.",
    featureDescription: "Track recurring payments with renewal alerts.",
    icon: RefreshCw,
    color: "#f472b6", // pink-400
    colorClass: "text-pink-400",
    layer: "Sources",
    path: "/app/subscriptions",
  },
  goals: {
    id: "goals",
    name: "Goals",
    title: "Goals",
    description:
      "Your north star. Set targets with deadlines, link Habits and Tasks to drive progress automatically, and connect financial goals to Budget Planner for savings tracking.",
    featureDescription:
      "The big picture, broken into steps you can actually take.",
    icon: Target,
    color: "#a3e635", // lime-400
    colorClass: "text-lime-400",
    layer: "Insights",
    path: "/app/goals",
  },
  circle: {
    id: "circle",
    name: "Circle",
    title: "Circle",
    description:
      "Manage shared spaces. Collaborate with friends, split group expenses effortlessly, and coordinate on shared goals or tasks.",
    featureDescription: "Share expenses, goals, and tasks with your friends.",
    icon: Users,
    color: "#f87171", // red-400
    colorClass: "text-red-400",
    layer: "Orchestration",
    path: "/app/circle",
  },
  events: {
    id: "events",
    name: "Events",
    title: "Events",
    description:
      "Plan your schedule. Organize your calendar and automatically trigger reminders or link locations and expenses to upcoming events.",
    featureDescription:
      "Organize your life with seamless calendar management.",
    icon: CalendarDays,
    color: "#c084fc", // purple-400
    colorClass: "text-purple-400",
    layer: "Sources",
    path: "/app/events",
  },
} satisfies Record<string, AppModule>;

export const APP_MODULES_ARRAY: AppModule[] = [
  APP_MODULES.dashboard,
  APP_MODULES.expenses,
  APP_MODULES.tasks,
  APP_MODULES.reminders,
  APP_MODULES.loans,
  APP_MODULES.habits,
  APP_MODULES.budget,
  APP_MODULES.notes,
  APP_MODULES.subscriptions,
  APP_MODULES.goals,
  APP_MODULES.circle,
  APP_MODULES.events,
];
