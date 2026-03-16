// [ENTITIES/USER/UI] - user-avatar
import { useUserStore } from '../model/use-user-store';

export function UserAvatar() {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  
  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";
  const avatarUrl = profile?.profile_image;

  return (
    <div className="h-9 w-9 rounded-full overflow-hidden border border-border-medium bg-bg-subtle flex items-center justify-center shrink-0">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-sm font-bold text-text-secondary">
          {userInitial}
        </span>
      )}
    </div>
  );
}
