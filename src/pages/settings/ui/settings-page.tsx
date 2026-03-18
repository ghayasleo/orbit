import { useState, useCallback } from "react";
import { PageHeader } from "@/shared/ui/page-header";
import { UpdateProfileForm } from "@/features/update-profile";
import { ChangePasswordForm } from "@/features/change-password";
import { UnsavedChangesAlert } from "@/shared/ui";
import type { useBlocker } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

type Blocker = ReturnType<typeof useBlocker>;

export function SettingsPage() {
  const [blocker, setBlocker] = useState<Blocker | null>(null);

  const handleBlockerChange = useCallback((b: Blocker) => {
    setBlocker(b);
  }, []);

  return (
    <main className="flex-1 mx-auto w-full">
      <PageHeader
        title="Settings"
        description="Manage your account and security preferences."
      />

      <AnimatePresence>
        {blocker?.state === "blocked" && (
          <UnsavedChangesAlert blocker={blocker} />
        )}
      </AnimatePresence>

      {/* Two-column horizontal layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <UpdateProfileForm onBlockerChange={handleBlockerChange} />
        <ChangePasswordForm />
      </div>
    </main>
  );
}
