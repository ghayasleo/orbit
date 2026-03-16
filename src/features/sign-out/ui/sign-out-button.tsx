// [FEATURES/SIGN-OUT/UI] - sign-out-button
import { HTMLAttributes } from 'react';
import { useSignOut } from '../api/use-sign-out';
import { cn } from '@/shared/lib';

interface SignOutButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export function SignOutButton({ className, children, ...props }: SignOutButtonProps) {
  const { mutateAsync: signOut, isPending } = useSignOut();

  return (
    <button
      className={cn("w-full text-left", className)}
      disabled={isPending}
      onClick={() => signOut()}
      {...props}
    >
      {isPending ? 'Signing out...' : children || 'Sign out'}
    </button>
  );
}
