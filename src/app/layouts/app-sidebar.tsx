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
import { useSidebarStore } from "@/shared/stores/use-sidebar-store";

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
  const { collapsed } = useSidebarStore();

  return (
    <>
      {/* ── Desktop: slim/expanded sidebar ── */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 hidden lg:flex h-dvh flex-col items-start border-r border-border-subtle bg-bg-card py-4 transition-all duration-300 ease-in-out px-3",
          collapsed ? "w-[68px]" : "w-[240px]",
        )}
      >
        {/* Logo */}
        <div className={cn("mb-6 flex w-full items-center gap-3")}>
          <NavLink
            to="/app"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#5B6AF0] to-[#9B6BF2] shadow-md"
          >
            <span className="text-sm font-bold text-white">O</span>
          </NavLink>
          <span
            className={cn(
              "bg-linear-to-r from-[#5B6AF0] to-[#9B6BF2] bg-clip-text text-transparent animate-in fade-in slide-in-from-left-2 duration-300",
              collapsed ? "text-[0px]" : "text-lg font-bold",
            )}
          >
            Orbit
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 w-full flex-col gap-1 overflow-y-auto no-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={collapsed ? item.label : ""}
                className={cn(
                  "group relative flex items-center rounded-xl transition-all duration-200 min-w-10 h-10",
                  collapsed ? "px-3" : "w-full px-3 gap-3",
                  isActive
                    ? "bg-[#5B6AF0]/10 text-[#5B6AF0]"
                    : "text-text-muted hover:bg-bg-card-hover hover:text-text-primary",
                )}
              >
                <item.icon
                  className="h-[20px] w-[20px] shrink-0"
                  strokeWidth={isActive ? 2.2 : 1.7}
                />
                <span
                  className={cn(
                    "font-medium whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300",
                    collapsed ? "text-[0px]" : "text-sm font-bold",
                  )}
                >
                  {item.label}
                </span>
                {/* Tooltip (only when collapsed) */}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-3 rounded-lg bg-foreground/90 px-2.5 py-1 text-xs font-medium text-background opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <NavLink
          to="/app/settings"
          title={collapsed ? "Settings" : ""}
          className={({ isActive }) =>
            cn(
              "mt-auto flex items-center rounded-xl transition-all duration-200 h-10",
              collapsed ? "w-10 justify-center" : "w-full px-3 gap-3 mx-auto",
              isActive
                ? "bg-[#5B6AF0]/10 text-[#5B6AF0]"
                : "text-text-muted hover:bg-bg-card-hover hover:text-text-primary",
            )
          }
        >
          <Settings className="h-[20px] w-[20px] shrink-0" strokeWidth={1.7} />
          {!collapsed && (
            <span className="text-sm font-medium whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
              Settings
            </span>
          )}
        </NavLink>
      </aside>

      {/* ── Mobile: bottom navigation bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden h-[72px] items-end justify-around border-t border-border-subtle bg-bg-card/95 backdrop-blur-xl pb-safe px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
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
                "flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive ? "text-[#5B6AF0] scale-105" : "text-text-muted",
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
