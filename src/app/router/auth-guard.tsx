import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '@/entities/user';
import { PATHS } from './paths';

interface RouteGuardProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: RouteGuardProps) {
  const { user, initialized } = useUserStore();

  if (!initialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={PATHS.login} replace />;
  }

  return children ?? <Outlet />;
}

export function PublicRoute({ children }: RouteGuardProps) {
  const { user, initialized } = useUserStore();

  if (!initialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={PATHS.app} replace />;
  }

  return children ?? <Outlet />;
}
