import { AlertCircle } from "lucide-react";
import { Button } from "./button";
import type { useBlocker } from "react-router-dom";
import { motion } from "framer-motion";

interface UnsavedChangesAlertProps {
  blocker: ReturnType<typeof useBlocker> | null;
  className?: string;
}

export function UnsavedChangesAlert({ blocker, className }: UnsavedChangesAlertProps) {
  return (
    <motion.div 
      initial={{ paddingBottom: 0 }}
      animate={{ paddingBottom: 16 }}
      exit={{ paddingBottom: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, height: 0, paddingBlock: 0 }}
        animate={{ opacity: 1, height: 72, paddingBlock: 16 }}
        exit={{ opacity: 0, height: 0, paddingBlock: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
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
          <Button variant="ghost" size="sm" onClick={() => blocker!.reset?.()}>
            Stay
          </Button>
          <Button variant="destructive" size="sm" onClick={() => blocker!.proceed?.()}>
            Leave
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
