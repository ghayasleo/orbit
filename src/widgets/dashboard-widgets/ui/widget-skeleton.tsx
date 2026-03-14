import { cn } from "@/shared/lib";

function BaseSkeleton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-5 shadow-sm animate-pulse",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SkeletonHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-bg-subtle" />
        <div className="h-4 w-24 bg-bg-subtle rounded-md" />
      </div>
      <div className="h-3 w-12 bg-bg-subtle rounded-md" />
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative overflow-hidden w-full h-[140px] rounded-2xl bg-bg-card border border-border-subtle p-6 sm:p-7 shadow-sm animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-3 w-32 bg-bg-subtle rounded-sm mb-2" />
        <div className="h-6 w-48 bg-bg-subtle rounded-md" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center border-r border-border-subtle">
          <div className="h-6 w-8 bg-bg-subtle rounded-md mb-1" />
          <div className="h-3 w-16 bg-bg-subtle rounded-md" />
        </div>
        <div className="flex flex-col items-center justify-center border-r border-border-subtle">
          <div className="h-6 w-8 bg-bg-subtle rounded-md mb-1" />
          <div className="h-3 w-16 bg-bg-subtle rounded-md" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="h-6 w-16 bg-bg-subtle rounded-md mb-1" />
          <div className="h-3 w-16 bg-bg-subtle rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function HabitStreaksSkeleton() {
  return (
    <BaseSkeleton>
      <SkeletonHeader />
      <div className="flex-1 flex items-center justify-around px-2 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-bg-subtle" />
            <div className="h-2.5 w-10 bg-bg-subtle rounded-sm hidden sm:block" />
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function PriorityTasksSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="space-y-3 mt-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-bg-subtle shrink-0" />
            <div className="h-4 w-full bg-bg-subtle rounded-md" />
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function BudgetPlannerSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="h-3 w-full rounded-full bg-bg-subtle" />
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-bg-subtle rounded-md" />
          <div className="h-4 w-16 bg-bg-subtle rounded-md" />
        </div>
        <div className="h-8 w-full bg-bg-subtle rounded-lg mt-auto" />
      </div>
    </BaseSkeleton>
  );
}

export function ActiveGoalsSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="flex-1 space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-bg-subtle rounded-md" />
              <div className="h-3 w-8 bg-bg-subtle rounded-md" />
            </div>
            <div className="h-2 w-full rounded-full bg-bg-subtle" />
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function RecentExpensesSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-bg-subtle shrink-0" />
              <div className="space-y-1">
                <div className="h-3.5 w-20 bg-bg-subtle rounded-md" />
                <div className="h-2.5 w-16 bg-bg-subtle rounded-md" />
              </div>
            </div>
            <div className="space-y-1 flex flex-col items-end">
              <div className="h-4 w-14 bg-bg-subtle rounded-md" />
              <div className="h-2.5 w-10 bg-bg-subtle rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function UpcomingDueSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="space-y-4 mt-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-bg-subtle shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="h-3.5 w-24 bg-bg-subtle rounded-md" />
              <div className="h-2.5 w-16 bg-bg-subtle rounded-md" />
            </div>
            <div className="h-4 w-16 bg-bg-subtle rounded-md shrink-0" />
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

// Skeltons for new widgets
export function RemindersSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="space-y-4 mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-4 w-32 bg-bg-subtle rounded-md" />
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 bg-bg-subtle rounded-md" />
              <div className="h-4 w-4 rounded-full bg-bg-subtle" />
            </div>
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function LoansOverviewSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="flex-1 space-y-4 flex flex-col justify-center">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-subtle rounded-md" />
          <div className="h-6 w-32 bg-bg-subtle rounded-md" />
          <div className="h-3 w-24 bg-bg-subtle rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-subtle rounded-md" />
          <div className="h-6 w-32 bg-bg-subtle rounded-md" />
          <div className="h-3 w-24 bg-bg-subtle rounded-md" />
        </div>
      </div>
    </BaseSkeleton>
  );
}

export function SubscriptionsSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="space-y-3 mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-bg-subtle shrink-0" />
              <div className="h-4 w-24 bg-bg-subtle rounded-md" />
            </div>
            <div className="space-y-1 flex flex-col items-end">
              <div className="h-4 w-16 bg-bg-subtle rounded-md" />
              <div className="h-2.5 w-12 bg-bg-subtle rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function NotesSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="space-y-4 mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-bg-subtle rounded-md" />
              <div className="h-2.5 w-16 bg-bg-subtle rounded-md" />
            </div>
            <div className="h-3 w-full max-w-[80%] bg-bg-subtle rounded-md" />
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function EventsSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <SkeletonHeader />
      <div className="space-y-4 mt-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="pl-3 border-l-2 border-border-subtle space-y-1"
          >
            <div className="h-4 w-32 bg-bg-subtle rounded-md" />
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 bg-bg-subtle rounded-md" />
              <div className="h-3 w-12 bg-bg-subtle rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </BaseSkeleton>
  );
}

export function AIAssistantSkeleton() {
  return (
    <BaseSkeleton className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-bg-subtle" />
          <div className="h-4 w-20 bg-bg-subtle rounded" />
        </div>
        <div className="h-3 w-24 bg-bg-subtle rounded" />
      </div>
      <div className="flex-1 flex flex-col justify-end space-y-4">
        <div className="w-[80%] ml-auto bg-bg-subtle rounded-2xl rounded-tr-none h-10" />
        <div className="w-[85%] bg-bg-subtle rounded-2xl rounded-tl-none h-16" />
        <div className="w-full h-10 rounded-full bg-bg-subtle mt-4" />
      </div>
    </BaseSkeleton>
  );
}
