import { useAuthStore } from "@/shared/stores/use-auth-store";
import { WidgetWrapper } from "./widget-wrapper";

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

export function HeroBanner() {
  const { profile, user } = useAuthStore();
  const userName = profile?.first_name || user?.email?.split("@")[0] || "User";

  return (
    <WidgetWrapper id="hero" isHero>
      <div className="relative overflow-hidden w-full h-full rounded-2xl bg-linear-to-br from-[#5B6AF0] to-[#9B6BF2] p-6 sm:p-7 text-white shadow-lg flex flex-col justify-between">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/8" />

        <div>
          <p className="relative text-sm font-medium text-white/80 mb-1">
            {getFormattedDate()}
          </p>
          <h1 className="relative text-2xl sm:text-3xl font-bold font-jakarta tracking-tight">
            {getGreeting()}, {userName}
          </h1>
        </div>

        <div className="relative grid grid-cols-3 gap-4 mt-auto">
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
    </WidgetWrapper>
  );
}
