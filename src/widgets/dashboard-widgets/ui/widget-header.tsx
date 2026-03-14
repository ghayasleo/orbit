import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib";
import { Link } from "react-router-dom";
import { useDashboard } from "@/entities/dashboard";

interface WidgetHeaderProps {
  id?: string;
  title: string;
  icon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
  link?: string;
  linkText?: string;
  onLinkClick?: () => void;
}

export function WidgetHeader({
  id,
  title,
  icon: Icon,
  iconColorClass = "text-[#5B6AF0]",
  iconBgClass = "bg-[#5B6AF0]/10",
  link = "#",
  linkText = "View all",
  onLinkClick,
}: WidgetHeaderProps) {
  const { toggleTempCollapse } = useDashboard();

  return (
    <div className="flex items-center justify-between mb-2 sm:mb-4">
      <button
        onClick={() => id && toggleTempCollapse(id)}
        className="flex items-center gap-2.5 cursor-pointer"
        aria-label={`Toggle ${title} widget`}
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            iconBgClass,
          )}
        >
          <Icon className={cn("h-4 w-4", iconColorClass)} strokeWidth={2} />
        </div>
        <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
          {title}
        </h3>
      </button>
      <Link
        to={link}
        onClick={(e) => {
          if (onLinkClick) {
            e.preventDefault();
            onLinkClick();
          }
        }}
        className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0"
      >
        {linkText}
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
