import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { useSidebarStore } from "@/shared/stores/use-sidebar-store";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const { collapsed } = useSidebarStore();

  return (
    <div className="min-h-dvh bg-bg-base font-inter flex flex-col relative w-full overflow-x-hidden">
      <AppSidebar />

      {/* Main content — offset for slim/expanded sidebar on desktop, bottom nav on mobile */}
      <main
        className={cn(
          "flex-1 flex flex-col min-h-dvh pb-[80px] lg:pb-0 transition-all duration-300 ease-in-out w-full",
          collapsed
            ? "lg:ml-[68px] lg:w-[calc(100%-68px)]"
            : "lg:ml-[240px] lg:w-[calc(100%-240px)]",
        )}
      >
        <DashboardHeader />
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
