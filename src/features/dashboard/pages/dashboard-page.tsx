import {
  CheckSquare,
  Wallet,
  Flame,
  Droplets,
  Dumbbell,
  BookOpen,
  Moon,
  Apple,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Target,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  action = "View All",
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            iconBg,
          )}
        >
          <Icon className={cn("h-4 w-4", iconColor)} strokeWidth={2} />
        </div>
        <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
          {title}
        </h3>
      </div>
      <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
        {action}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

const tasks = [
  {
    text: "Review project specifications",
    done: false,
    priority: "high" as const,
  },
  { text: "Update budget tracker", done: false, priority: "medium" as const },
  { text: "Send invoice to client", done: true, priority: "high" as const },
  { text: "Grocery shopping", done: false, priority: "low" as const },
  {
    text: "Call dentist for appointment",
    done: true,
    priority: "medium" as const,
  },
  { text: "Plan weekend trip", done: false, priority: "low" as const },
  { text: "Read 2 chapters", done: false, priority: "medium" as const },
];

const habits = [
  { icon: Droplets, label: "Water", done: true },
  { icon: Dumbbell, label: "Workout", done: true },
  { icon: BookOpen, label: "Read", done: false },
  { icon: Moon, label: "Sleep", done: false },
  { icon: Apple, label: "Eat clean", done: true },
];

const upcomingDue = [
  { name: "Netflix", date: "Mar 12", amount: "\u20A8 1,500" },
  { name: "Car loan EMI", date: "Mar 15", amount: "\u20A8 22,000" },
];

const recentExpenses = [
  {
    name: "Starbucks",
    category: "Food & Drink",
    date: "Today",
    amount: "\u20A8 850",
  },
  {
    name: "Uber",
    category: "Transport",
    date: "Yesterday",
    amount: "\u20A8 450",
  },
  {
    name: "Amazon",
    category: "Shopping",
    date: "Mar 5",
    amount: "\u20A8 1,200",
  },
  {
    name: "Grocery Store",
    category: "Groceries",
    date: "Mar 4",
    amount: "\u20A8 4,500",
  },
];

const activeGoals = [
  {
    name: "Emergency Fund",
    current: 15000,
    target: 50000,
    color: "bg-emerald-500",
  },
  { name: "New Laptop", current: 30000, target: 80000, color: "bg-blue-500" },
];

export function DashboardPage() {
  const budgetSpent = 72000;
  const budgetTotal = 100000;
  const budgetPercent = Math.round((budgetSpent / budgetTotal) * 100);
  const budgetBarColor =
    budgetPercent >= 90
      ? "bg-red-500"
      : budgetPercent >= 70
        ? "bg-amber-500"
        : "bg-emerald-500";

  const warningText =
    budgetPercent >= 90
      ? "Budget exceeded! Over 90% of your limit has been spent."
      : "Approaching limit - " +
        budgetPercent +
        "% of your monthly budget used.";

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Banner (Always full width) */}
      <div className="relative overflow-hidden w-full rounded-2xl bg-linear-to-br from-[#5B6AF0] to-[#9B6BF2] p-6 sm:p-7 text-white shadow-lg">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/8" />

        <p className="relative text-sm font-medium text-white/80 mb-1">
          {getFormattedDate()}
        </p>
        <h1 className="relative text-2xl sm:text-3xl font-bold font-jakarta tracking-tight mb-6">
          {getGreeting()}, Alex
        </h1>

        <div className="relative grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center border-r border-white/20">
            <p className="text-2xl sm:text-3xl font-bold">7</p>
            <p className="text-xs text-white/70 mt-0.5">Tasks Due</p>
          </div>
          <div className="flex flex-col items-center justify-center border-r border-white/20">
            <p className="text-2xl sm:text-3xl font-bold">3</p>
            <p className="text-xs text-white/70 mt-0.5">Reminders</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl sm:text-3xl font-bold">{"\u20A8"} 48k</p>
            <p className="text-xs text-white/70 mt-0.5">Spent</p>
          </div>
        </div>
      </div>

      {/* Grid Layout for Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Habit Streaks - Takes 2 columns on larger screens */}
        <SectionCard className="md:col-span-2 lg:col-span-2 xl:col-span-2">
          <SectionHeader
            icon={Flame}
            iconColor="text-orange-500"
            iconBg="bg-orange-500/10"
            title="Habit Streaks"
          />
          <div className="flex-1 flex items-center justify-around px-2 min-w-0">
            {habits.map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] transition-all duration-200",
                    h.done
                      ? "border-[#5B6AF0] bg-[#5B6AF0]/10 text-[#5B6AF0]"
                      : "border-border-subtle bg-bg-subtle text-text-muted group-hover:border-border-medium",
                  )}
                >
                  <h.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <span
                  className={cn(
                    "text-[11px] font-medium hidden sm:block",
                    h.done ? "text-text-primary" : "text-text-muted",
                  )}
                >
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Priority Tasks - Can span rows if we want it to be tall, or just fit column */}
        <SectionCard className="row-span-2 md:col-span-1 lg:col-span-1 xl:col-span-2 flex flex-col">
          <SectionHeader
            icon={CheckSquare}
            iconColor="text-[#5B6AF0]"
            iconBg="bg-[#5B6AF0]/10"
            title="Priority Tasks"
          />
          <ul className="space-y-1 flex-1 overflow-y-auto no-scrollbar pb-2">
            {tasks.map((task, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-bg-card-hover transition-colors cursor-pointer"
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    task.done
                      ? "bg-[#5B6AF0] border-[#5B6AF0]"
                      : "border-border-medium",
                  )}
                >
                  {task.done && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm flex-1 truncate",
                    task.done
                      ? "text-text-muted line-through"
                      : "text-text-primary",
                  )}
                >
                  {task.text}
                </span>
                {!task.done && (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      task.priority === "high" && "bg-red-400",
                      task.priority === "medium" && "bg-amber-400",
                      task.priority === "low" && "bg-emerald-400",
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Budget Planner */}
        <SectionCard className="col-span-1 lg:col-span-1 xl:col-span-1">
          <SectionHeader
            icon={Wallet}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-500/10"
            title="Budget Planner"
          />
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className="h-3 w-full rounded-full bg-bg-subtle overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  budgetBarColor,
                )}
                style={{ width: budgetPercent + "%" }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-text-primary">
                {"\u20A8"} {(budgetSpent / 1000).toFixed(0)}k spent
              </span>
              <span className="text-text-muted">
                of {"\u20A8"} {(budgetTotal / 1000).toFixed(0)}k
              </span>
            </div>
            {budgetPercent >= 70 && (
              <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 mt-auto">
                <AlertTriangle
                  className="h-4 w-4 text-amber-500 shrink-0"
                  strokeWidth={2}
                />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {warningText}
                </span>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Active Goals (New) */}
        <SectionCard className="col-span-1 lg:col-span-1 xl:col-span-1">
          <SectionHeader
            icon={Target}
            iconColor="text-indigo-500"
            iconBg="bg-indigo-500/10"
            title="Active Goals"
          />
          <ul className="space-y-4 flex-1">
            {activeGoals.map((goal, i) => (
              <li
                key={i}
                className="flex flex-col gap-1.5 cursor-pointer group"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-text-primary group-hover:text-brand transition-colors">
                    {goal.name}
                  </span>
                  <span className="text-xs font-medium text-text-muted">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-bg-subtle overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      goal.color,
                    )}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Recent Expenses (New) */}
        <SectionCard className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <SectionHeader
            icon={Activity}
            iconColor="text-purple-500"
            iconBg="bg-purple-500/10"
            title="Recent Expenses"
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
            {recentExpenses.map((expense, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-bg-card-hover transition-colors cursor-pointer border border-transparent hover:border-border-subtle"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-subtle shrink-0">
                    <ArrowUpRight
                      className="h-4 w-4 text-red-400"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {expense.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {expense.category}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-sm font-semibold text-text-primary">
                    {expense.amount}
                  </span>
                  <span className="block text-xs text-text-muted">
                    {expense.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Upcoming Due (Moved & Refined) */}
        <SectionCard className="col-span-1 lg:col-span-1 xl:col-span-2">
          <SectionHeader
            icon={Calendar}
            iconColor="text-blue-500"
            iconBg="bg-blue-500/10"
            title="Upcoming Due"
          />
          <ul className="space-y-1 flex-1">
            {upcomingDue.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-bg-card-hover transition-colors cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-subtle shrink-0">
                  <Calendar
                    className="h-4 w-4 text-text-muted"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-text-muted">{item.date}</p>
                </div>
                <span className="text-sm font-semibold text-red-500 shrink-0">
                  {item.amount}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
