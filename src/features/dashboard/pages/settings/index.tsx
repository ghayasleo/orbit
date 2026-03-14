import { useState, useEffect, useCallback } from "react";
import {
  Save,
  Lock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { LabeledInput } from "@/shared/components/ui/labeled-input";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { PageHeader } from "@/shared/components/page-header";
import { SettingsCard } from "@/shared/components/settings-card";
import { ProfileImageUploader } from "@/shared/components/profile-image-uploader";
import { useUnsavedChanges } from "@/shared/hooks/use-unsaved-changes";
import { useAuthStore } from "@/shared/stores/use-auth-store";
import { supabase } from "@/lib/supabase";

// ── Shared helpers ────────────────────────────────────────────────────────────

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

// ── Main page ─────────────────────────────────────────────────────────────────

export function SettingsPage() {
  const { user, profile, fetchProfile } = useAuthStore();

  // Profile form
  const [profileForm, setProfileForm] = useState({
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [clearAvatar, setClearAvatar] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileToast, setProfileToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Password form
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

  // Sync profile from store
  useEffect(() => {
    if (profile) {
      setProfileForm({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
      });
    }
  }, [profile]);

  const showProfileToast = useCallback(
    (type: "success" | "error", message: string) => {
      setProfileToast({ type, message });
      setTimeout(() => setProfileToast(null), 4000);
    },
    [],
  );

  const showPasswordToast = useCallback(
    (type: "success" | "error", message: string) => {
      setPasswordToast({ type, message });
      setTimeout(() => setPasswordToast(null), 4000);
    },
    [],
  );

  // Unsaved changes detection across both forms
  const hasProfileChanges =
    profileForm.firstName !== (profile?.first_name || "") ||
    profileForm.lastName !== (profile?.last_name || "") ||
    avatarFile !== null ||
    clearAvatar;

  const hasPasswordChanges =
    passwordForm.currentPassword !== "" || passwordForm.newPassword !== "" || passwordForm.confirmPassword !== "";

  const { blocker } = useUnsavedChanges(
    hasProfileChanges || hasPasswordChanges,
  );

  // ── Profile submit ──────────────────────────────────────────────────────────
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showProfileToast("error", "You must be logged in to save your profile.");
      return;
    }

    setProfileLoading(true);
    try {
      let avatarUrl = profile?.profile_image || null;

      if (clearAvatar) {
        avatarUrl = null;
      } else if (avatarFile) {
        const ext = avatarFile.name.split(".").pop();
        const filePath = `${user.id}/${user.id}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        avatarUrl = data.publicUrl;
      }

      const { error: profileErr } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: profileForm.firstName,
        last_name: profileForm.lastName,
        email: user.email,
        profile_image: avatarUrl,
      });
      if (profileErr) throw profileErr;

      setAvatarFile(null);
      setClearAvatar(false);
      await fetchProfile(user.id);
      showProfileToast("success", "Profile updated successfully");
    } catch (err: any) {
      console.error("Profile update error:", err);
      showProfileToast(
        "error",
        err?.message || "Failed to update profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  // ── Password submit ─────────────────────────────────────────────────────────
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
      // Re-authenticate with current password
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: passwordForm.currentPassword,
      });
      if (signInErr) throw new Error("Current password is incorrect");

      const { error: passErr } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });
      if (passErr) throw passErr;

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

  const displayName =
    profile?.first_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "U";

  return (
    <main className="flex-1 mx-auto w-full">
      <PageHeader
        title="Settings"
        description="Manage your account and security preferences."
      />

      {/* Unsaved changes blocker */}
      {blocker.state === "blocked" && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm">
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
            <Button
              variant="destructive"
              size="sm"
              onClick={() => blocker.proceed?.()}
            >
              Leave
            </Button>
          </div>
        </div>
      )}

      {/* Two-column horizontal layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* ── Profile Update form ── */}
        <form onSubmit={handleProfileSubmit} className="h-full">
          <SettingsCard
            title="Profile Update"
            description="Manage your public information"
            footer={
              <Button
                type="submit"
                disabled={profileLoading || !hasProfileChanges}
                className="w-fit ml-auto flex px-10 h-11 font-semibold rounded-xl bg-brand hover:bg-brand-hover text-white disabled:opacity-40 shadow-md hover:shadow-lg transition-all gap-2"
              >
                <Save className="w-4 h-4" />
                {profileLoading ? "Saving..." : "Save Profile"}
              </Button>
            }
          >
            {profileToast && (
              <Toast type={profileToast.type} message={profileToast.message} />
            )}

            {/* Avatar */}
            <div className="flex justify-center pb-2">
              <ProfileImageUploader
                currentImageUrl={profile?.profile_image}
                displayName={displayName}
                onImageSelected={(file) => {
                  setAvatarFile(file);
                  setClearAvatar(false);
                }}
                onClearImage={() => {
                  setAvatarFile(null);
                  setClearAvatar(true);
                }}
              />
            </div>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <LabeledInput
                id="firstName"
                label="First Name"
                placeholder="John"
                value={profileForm.firstName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, firstName: e.target.value })
                }
              />
              <LabeledInput
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                value={profileForm.lastName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, lastName: e.target.value })
                }
              />
            </div>

            {/* Email — display only */}
            <LabeledInput
              id="emailDisplay"
              label="Email Address"
              type="email"
              value={user?.email || ""}
              disabled
              className="opacity-60"
              description="Email address cannot be changed"
            />
          </SettingsCard>
        </form>

        {/* ── Security / Password form ── */}
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
              <Toast
                type={passwordToast.type}
                message={passwordToast.message}
              />
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
      </div>
    </main>
  );
}
