// [ENTITIES/USER/UI] - user-menu
import { useUserStore } from '../model/use-user-store';
import { UserAvatar } from './user-avatar';

export function UserMenu({ children }: { children?: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  
  const firstName = profile?.first_name || '';
  const lastName = profile?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim();
  
  const userName =
    fullName ||
    user?.email?.split("@")[0] ||
    "User";
    
  const userEmail = user?.email || "user@example.com";

  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-sm font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors line-clamp-1">
          {userName}
        </span>
        <span className="text-[11px] font-medium text-text-muted line-clamp-1">
          {userEmail}
        </span>
      </div>
      <UserAvatar />
      {children}
    </div>
  );
}
