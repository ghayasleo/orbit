// [FEATURES/UPDATE-PROFILE/UI] - update-profile-form
import { useState, useEffect, useCallback } from "react";
import { Save, AlertCircle } from "lucide-react";
import { Button, LabeledInput, SettingsCard, Toast } from "@/shared/ui";
import { ProfileImageUploader } from "./profile-image-uploader";
import { useUnsavedChanges } from "@/shared/lib";
import { useUserStore } from "@/entities/user";
import { useUpdateProfile } from "../api/use-update-profile";
import { useUploadAvatar } from "../api/use-upload-avatar";
import { AnimatePresence } from "framer-motion";


export function UpdateProfileForm() {
  const { user, profile } = useUserStore();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: uploadAvatar } = useUploadAvatar();
  
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

  const hasProfileChanges =
    profileForm.firstName !== (profile?.first_name || "") ||
    profileForm.lastName !== (profile?.last_name || "") ||
    avatarFile !== null ||
    clearAvatar;

  // We could use useUnsavedChanges here, but since both forms share the page,
  // we might want the warning to be page-level or handle it per form.
  // For now, let's keep it here for the profile form.
  const { blocker } = useUnsavedChanges(hasProfileChanges);

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
        avatarUrl = await uploadAvatar(avatarFile);
      }

      await updateProfile({
        first_name: profileForm.firstName,
        last_name: profileForm.lastName,
        email: user.email!, // Assuming email might be needed by `updateProfile`, though not updatable
        profile_image: avatarUrl,
      });

      setAvatarFile(null);
      setClearAvatar(false);
      showProfileToast("success", "Profile updated successfully");
    } catch (err: any) {
      console.error("Profile update error:", err);
      showProfileToast(
        "error",
        err?.message || "Failed to update profile",
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const displayName =
    profile?.first_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "U";

  return (
    <>
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
          <AnimatePresence>
            {profileToast && (
              <Toast type={profileToast.type} message={profileToast.message} />
            )}
          </AnimatePresence>

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
    </>
  );
}
