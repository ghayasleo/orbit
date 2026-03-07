import { NavLink, useLocation } from "react-router-dom";
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
  Settings,
  Home,
  BarChart3,
  ListTodo,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
}

const sidebarItems: NavItem[] = [
  { to: "/app", icon: LayoutDashboard, label: "Home", end: true },
  { to: "/app/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/app/reminders", icon: Bell, label: "Reminders" },
  { to: "/app/expenses", icon: Wallet, label: "Expenses" },
  { to: "/app/loans", icon: Handshake, label: "Loans" },
  { to: "/app/habits", icon: Flame, label: "Habits" },
  { to: "/app/budget", icon: PieChart, label: "Budget" },
  { to: "/app/notes", icon: StickyNote, label: "Notes" },
  { to: "/app/subscriptions", icon: RefreshCw, label: "Subs" },
  { to: "/app/goals", icon: Target, label: "Goals" },
];

const bottomNavItems: NavItem[] = [
  { to: "/app", icon: Home, label: "Home", end: true },
  { to: "/app/tasks", icon: ListTodo, label: "Tasks" },
  { to: "/app/budget", icon: BarChart3, label: "Stats" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <>
      {/* ── Desktop: slim icon rail ── */}
      <aside className="fixed top-0 left-0 z-40 hidden lg:flex h-dvh w-[68px] flex-col items-center border-r border-border-subtle bg-bg-card py-4 gap-1">
        {/* Logo */}
        <NavLink
          to="/app"
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B6AF0] to-[#9B6BF2] shadow-md"
        >
          <span className="text-sm font-bold text-white">O</span>
        </NavLink>

        {/* Nav icons */}
        <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto no-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={item.label}
                className={cn(
                  "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150",
                  isActive
                    ? "bg-[#5B6AF0]/10 text-[#5B6AF0]"
                    : "text-text-muted hover:bg-bg-card-hover hover:text-text-primary",
                )}
              >
                <item.icon
                  className="h-[20px] w-[20px]"
                  strokeWidth={isActive ? 2.2 : 1.7}
                />
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-full ml-3 rounded-lg bg-foreground/90 px-2.5 py-1 text-xs font-medium text-background opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <NavLink
          to="/app/settings"
          title="Settings"
          className={({ isActive }) =>
            cn(
              "mt-auto flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150",
              isActive
                ? "bg-[#5B6AF0]/10 text-[#5B6AF0]"
                : "text-text-muted hover:bg-bg-card-hover hover:text-text-primary",
            )
          }
        >
          <Settings className="h-[20px] w-[20px]" strokeWidth={1.7} />
        </NavLink>
      </aside>

      {/* ── Mobile: bottom navigation bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden h-[72px] items-end justify-around border-t border-border-subtle bg-bg-card/95 backdrop-blur-xl pb-safe px-2">
        {bottomNavItems.map((item) => {
          const isActive = item.end
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors min-w-[60px]",
                isActive ? "text-[#5B6AF0]" : "text-text-muted",
              )}
            >
              <item.icon
                className="h-[22px] w-[22px]"
                strokeWidth={isActive ? 2.2 : 1.7}
              />
              <span className="text-[10px] font-semibold leading-tight">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
