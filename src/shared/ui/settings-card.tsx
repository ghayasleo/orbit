interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SettingsCard({
  title,
  description,
  children,
  footer,
}: SettingsCardProps) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 border border-border-subtle rounded-2xl shadow-card overflow-hidden flex flex-col h-full">
      <div className="px-6 pt-6 pb-5 border-b border-border-subtle">
        <h3 className="text-lg font-bold text-text-primary font-bdogrotesk">
          {title}
        </h3>
        <p className="text-sm text-brand mt-0.5">{description}</p>
      </div>
      <div className="px-6 py-6 space-y-5 flex-1">{children}</div>
      {footer && <div className="px-6 pb-6 pt-0">{footer}</div>}
    </div>
  );
}
