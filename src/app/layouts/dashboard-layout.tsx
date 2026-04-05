import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/widgets/sidebar';
import { DashboardHeader } from '@/widgets/header';
import { useUIStore } from '@/shared/store';
import { cn } from '@/shared/lib';

import { useDashboardStore } from '@/entities/dashboard';
import { useInitDashboard } from '@/entities/dashboard';
import { FullPageLoader } from '@/shared/ui';

export function DashboardLayout() {
  const { sidebarCollapsed: collapsed } = useUIStore();
  const isHydrated = useDashboardStore((state) => state.isHydrated);
  
  // App initialization: Prefetch and stabilize layout for the entire session
  useInitDashboard();

  return (
    <div className="min-h-dvh bg-bg-base font-inter flex flex-col relative w-full overflow-x-hidden">
        {!isHydrated && <FullPageLoader key="global-loader" />}

      <AppSidebar />

      <main
        className={cn(
          'flex-1 flex flex-col min-h-dvh pb-[80px] lg:pb-0 transition-all duration-300 ease-in-out w-full',
          collapsed
            ? 'lg:ml-[68px] lg:w-[calc(100%-68px)]'
            : 'lg:ml-[240px] lg:w-[calc(100%-240px)]',
        )}
      >
        <DashboardHeader />
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 flex-1 bg-zinc-100 dark:bg-zinc-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
