import * as React from "react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib";

export interface InputFieldProps extends React.ComponentProps<"input"> {
  suffix?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, suffix, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          ref={ref}
          className={cn(
            "h-auto rounded-xl py-3 shadow-none border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-brand focus:ring-1 focus:ring-brand/20 dark:text-slate-200 transition-colors",
            suffix && "pr-10",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";
