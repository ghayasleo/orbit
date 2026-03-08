import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/use-auth-store";

export function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { user, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg-base">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5B6AF0] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export function PublicRoute({ children }: { children?: React.ReactNode }) {
  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg-base">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5B6AF0] border-t-transparent" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
