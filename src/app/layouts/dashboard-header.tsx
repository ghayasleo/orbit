import { PanelLeft, Search, Bell, LogOut } from "lucide-react";
import { useSidebarStore } from "@/shared/stores/use-sidebar-store";
import { useAuthStore } from "@/shared/stores/use-auth-store";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";

export function DashboardHeader() {
  const { toggleCollapsed } = useSidebarStore();
  const { user, profile, signOut } = useAuthStore();

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";
  const userName =
    `${profile?.first_name} ${profile?.last_name}` ||
    user?.email?.split("@")[0] ||
    "User";
  const userEmail = user?.email || "user@example.com";
  const avatarUrl = profile?.profile_image;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border-subtle bg-bg-base/80 px-4 sm:px-6 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-colors">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        {/* Optional Search Bar Placeholder */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-border-subtle bg-bg-subtle/50 px-3 py-1.5 focus-within:border-[#5B6AF0] focus-within:bg-bg-base transition-colors w-64 max-w-xs">
          <Search className="h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted w-full focus:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <AnimatedThemeToggler />

          <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors cursor-pointer">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-bg-base" />
          </button>
        </div>

        <div className="h-6 w-px bg-border-medium hidden sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors line-clamp-1">
              {userName}
            </span>
            <span className="text-[11px] font-medium text-text-muted line-clamp-1">
              {userEmail}
            </span>
          </div>
          <div className="h-9 w-9 rounded-full overflow-hidden border border-border-medium bg-bg-subtle flex items-center justify-center shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-text-secondary">
                {userInitial}
              </span>
            )}
          </div>

          <button
            onClick={signOut}
            className="ml-1 sm:ml-2 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
