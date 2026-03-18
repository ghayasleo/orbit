import { DashboardGrid } from "@/features/manage-dashboard";
import { EditModeBar } from "@/features/manage-dashboard";
import { motion } from "framer-motion";

export function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full flex flex-col gap-6"
    >
      <EditModeBar />
      <DashboardGrid />
    </motion.div>
  );
}
