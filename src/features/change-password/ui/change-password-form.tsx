// [FEATURES/CHANGE-PASSWORD/UI] - change-password-form
import { useState, useCallback } from "react";
import { Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/password-input";
import { SettingsCard } from "@/shared/ui/settings-card";
import { useUserStore } from "@/entities/user";
import { useChangePassword } from "../api/use-change-password";

function Toast({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border text-sm mb-4 animate-in fade-in slide-in-from-top-2 duration-300 ${
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
    </div>
  );
}

export function ChangePasswordForm() {
  const user = useUserStore((state) => state.user);
  const { mutateAsync: changePassword } = useChangePassword();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordToast, setPasswordToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showPasswordToast = useCallback(
    (type: "success" | "error", message: string) => {
      setPasswordToast({ type, message });
      setTimeout(() => setPasswordToast(null), 4000);
    },
    [],
  );

  const hasPasswordChanges =
    passwordForm.currentPassword !== "" ||
    passwordForm.newPassword !== "" ||
    passwordForm.confirmPassword !== "";

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showPasswordToast("error", "You must be logged in to change your password.");
      return;
    }

    if (!passwordForm.currentPassword) {
      showPasswordToast("error", "Please enter your current password");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showPasswordToast("error", "New password must be at least 6 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showPasswordToast("error", "Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      showPasswordToast("success", "Password updated successfully");
    } catch (err: any) {
      console.error("Password update error:", err);
      showPasswordToast(
        "error",
        err?.message || "Failed to update password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="h-full">
      <SettingsCard
        title="Security"
        description="Update your password to keep your account safe"
        footer={
          <Button
            type="submit"
            disabled={passwordLoading || !hasPasswordChanges}
            className="w-fit ml-auto flex px-5 h-11 font-semibold rounded-xl bg-brand hover:bg-brand-hover text-white disabled:opacity-40 shadow-md hover:shadow-lg transition-all gap-2"
          >
            <Lock className="w-4 h-4" />
            {passwordLoading ? "Updating..." : "Update Password"}
          </Button>
        }
      >
        {passwordToast && (
          <Toast type={passwordToast.type} message={passwordToast.message} />
        )}

        <PasswordInput
          id="currentPassword"
          label="Current Password"
          value={passwordForm.currentPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value,
            })
          }
        />

        <PasswordInput
          id="newPassword"
          label="New Password"
          value={passwordForm.newPassword}
          onChange={(e) =>
            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
          }
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          value={passwordForm.confirmPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              confirmPassword: e.target.value,
            })
          }
        />
      </SettingsCard>
    </form>
  );
}
