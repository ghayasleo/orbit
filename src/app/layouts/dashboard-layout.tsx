import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardLayout() {
  return (
    <div className="min-h-dvh bg-bg-base font-inter flex flex-col relative w-full overflow-x-hidden">
      <AppSidebar />

      {/* Main content — offset for slim sidebar on desktop, bottom nav on mobile */}
      <main className="flex-1 flex flex-col min-h-dvh lg:ml-[68px] pb-[80px] lg:pb-0 w-full lg:w-[calc(100%-68px)]">
        <DashboardHeader />
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
