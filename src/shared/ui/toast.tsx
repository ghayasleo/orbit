import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function Toast({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <motion.div
      initial={{ paddingBottom: 0 }}
      animate={{ paddingBottom: 16 }}
      exit={{ paddingBottom: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, height: 0, paddingBlock: 0 }}
        animate={{ opacity: 1, height: 54, paddingBlock: 16 }}
        exit={{ opacity: 0, height: 0, paddingBlock: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        className={`flex items-center gap-3 rounded-xl px-4 border text-sm mb-0 ${
          type === "success"
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
        }`}
      >
        {type === "success" ? (
          <CheckCircle2 className="w-4 h-4 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 shrink-0" />
        )}
        <p>{message}</p>
      </motion.div>
    </motion.div>
  );
}
