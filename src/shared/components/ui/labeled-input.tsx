import * as React from "react";
import { Label } from "@/shared/components/ui/label";
import { InputField, type InputFieldProps } from "@/shared/components/ui/input-field";
import { cn } from "@/lib/utils";

export interface LabeledInputProps extends InputFieldProps {
  label: string;
  id: string; // id is required for accessibility
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  error?: string;
}

export const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    {
      label,
      id,
      containerClassName,
      labelClassName,
      description,
      error,
      className,
      suffix,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        <Label
          htmlFor={id}
          className={cn("text-sm font-semibold text-brand pb-0.5 block", labelClassName)}
        >
          {label}
        </Label>
        <InputField 
          id={id} 
          ref={ref} 
          className={cn(error && "border-red-500 focus:border-red-500 focus:ring-red-500/20", className)} 
          suffix={suffix} 
          {...props} 
        />
        {description && !error && (
          <p className="text-[11px] text-text-muted">{description}</p>
        )}
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
LabeledInput.displayName = "LabeledInput";
