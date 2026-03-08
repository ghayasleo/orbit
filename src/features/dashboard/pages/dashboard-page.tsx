import { DashboardProvider } from "@/shared/context/DashboardContext";
import { DashboardGrid } from "@/shared/components/DashboardGrid";
import { EditModeBar } from "@/shared/components/EditModeBar";
import { motion } from "framer-motion";

export function DashboardPage() {
  return (
    <DashboardProvider>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-jakarta text-text-primary">
              My Dashboard
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Manage your financial overview
            </p>
          </div>
          <EditModeBar />
        </div>
        <DashboardGrid />
      </motion.div>
    </DashboardProvider>
  );
}
