import { AlertCircle } from "lucide-react";
import { Button } from "./button";
import type { useBlocker } from "react-router-dom";

interface UnsavedChangesAlertProps {
  blocker: ReturnType<typeof useBlocker> | null;
  className?: string;
}

export function UnsavedChangesAlert({ blocker, className }: UnsavedChangesAlertProps) {
  if (blocker?.state !== "blocked") return null;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm ${className ?? ""}`}
    >
      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-amber-600 dark:text-amber-400 font-medium">
          Unsaved changes
        </p>
        <p className="text-amber-500/80 text-xs mt-0.5">
          Are you sure you want to leave this page?
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={() => blocker.reset?.()}>
          Stay
        </Button>
        <Button variant="destructive" size="sm" onClick={() => blocker.proceed?.()}>
          Leave
        </Button>
      </div>
    </div>
  );
}
