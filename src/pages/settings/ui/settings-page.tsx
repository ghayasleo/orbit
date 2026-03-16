import { PageHeader } from "@/shared/ui/page-header";
import { UpdateProfileForm } from "@/features/update-profile";
import { ChangePasswordForm } from "@/features/change-password";

export function SettingsPage() {
  return (
    <main className="flex-1 mx-auto w-full">
      <PageHeader
        title="Settings"
        description="Manage your account and security preferences."
      />

      {/* Two-column horizontal layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <UpdateProfileForm />
        <ChangePasswordForm />
      </div>
    </main>
  );
}
