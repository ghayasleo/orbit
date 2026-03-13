import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { LabeledInput, type LabeledInputProps } from "@/shared/components/ui/labeled-input";

export interface PasswordInputProps extends Omit<LabeledInputProps, "type" | "suffix"> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <LabeledInput
        type={show ? "text" : "password"}
        ref={ref}
        className={className}
        suffix={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="text-text-muted hover:text-text-secondary transition-colors"
            tabIndex={-1}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";
