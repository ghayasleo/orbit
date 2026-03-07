import { type LucideIcon } from "lucide-react";
import {
  CheckSquare,
  Bell,
  Wallet,
  Handshake,
  Flame,
  PieChart,
  StickyNote,
  RefreshCw,
  Target,
  Settings,
} from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
}

function PlaceholderPage({
  title,
  description,
  icon: Icon,
  accent,
  accentBg,
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${accentBg} mb-6`}
      >
        <Icon className={`h-8 w-8 ${accent}`} strokeWidth={1.6} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
      <p className="text-sm text-text-secondary max-w-md">{description}</p>
      <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-subtle border border-border-subtle">
        <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-xs text-text-muted">Coming soon</span>
      </div>
    </div>
  );
}

export function TasksPage() {
  return (
    <PlaceholderPage
      title="Tasks"
      description="Capture, prioritise, and complete everything. Projects, subtasks, priorities, and recurring items."
      icon={CheckSquare}
      accent="text-violet-500"
      accentBg="bg-violet-500/10"
    />
  );
}

export function RemindersPage() {
  return (
    <PlaceholderPage
      title="Reminders"
      description="Time-based alerts that fire exactly when you need them. Snooze, link to tasks, or repeat."
      icon={Bell}
      accent="text-blue-500"
      accentBg="bg-blue-500/10"
    />
  );
}

export function ExpensesPage() {
  return (
    <PlaceholderPage
      title="Expenses"
      description="Log every purchase in seconds. Charts, categories, and receipt photos keep your spending clear."
      icon={Wallet}
      accent="text-rose-500"
      accentBg="bg-rose-500/10"
    />
  );
}

export function LoansPage() {
  return (
    <PlaceholderPage
      title="Loans"
      description="Track money lent and borrowed. Repayment schedules, interest, and automatic payment reminders."
      icon={Handshake}
      accent="text-amber-500"
      accentBg="bg-amber-500/10"
    />
  );
}

export function HabitsPage() {
  return (
    <PlaceholderPage
      title="Habits"
      description="Build streaks, break bad patterns, and visualise consistency with heatmaps and progress rings."
      icon={Flame}
      accent="text-orange-500"
      accentBg="bg-orange-500/10"
    />
  );
}

export function BudgetPage() {
  return (
    <PlaceholderPage
      title="Budget Planner"
      description="Set monthly category budgets and watch real-time spending fill the bars."
      icon={PieChart}
      accent="text-emerald-500"
      accentBg="bg-emerald-500/10"
    />
  );
}

export function NotesPage() {
  return (
    <PlaceholderPage
      title="Notes"
      description="Rich text, checklists, voice memos, and images — everything captured and instantly searchable."
      icon={StickyNote}
      accent="text-yellow-500"
      accentBg="bg-yellow-500/10"
    />
  );
}

export function SubscriptionsPage() {
  return (
    <PlaceholderPage
      title="Subscriptions"
      description="Know exactly what you pay each month. Renewal alerts and cost-saving insights included."
      icon={RefreshCw}
      accent="text-cyan-500"
      accentBg="bg-cyan-500/10"
    />
  );
}

export function GoalsPage() {
  return (
    <PlaceholderPage
      title="Goals"
      description="Set long-term objectives with milestones, linked habits, and progress tracking over time."
      icon={Target}
      accent="text-indigo-500"
      accentBg="bg-indigo-500/10"
    />
  );
}

export function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Account, notifications, currency, themes, backup & sync, and privacy preferences."
      icon={Settings}
      accent="text-text-secondary"
      accentBg="bg-bg-subtle"
    />
  );
}
