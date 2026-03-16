import { type LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
}

export function PlaceholderPage({
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
