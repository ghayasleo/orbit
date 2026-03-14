import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard-layout";
import { AuthLayout } from "@/app/layouts/auth-layout";
import { LandingPage } from "@/features/landing/pages/landing";
import { DashboardPage } from "@/features/dashboard/pages/dashboard";
import {
  TasksPage,
  RemindersPage,
  ExpensesPage,
  LoansPage,
  HabitsPage,
  BudgetPage,
  NotesPage,
  SubscriptionsPage,
  GoalsPage,
} from "@/features/dashboard/pages/module";
import { SettingsPage } from "@/features/dashboard/pages/settings";
import { LoginPage } from "@/features/auth/pages/login";
import { SignupPage } from "@/features/auth/pages/signup";
import { ForgotPasswordPage } from "@/features/auth/pages/forgot-password";
import { ResetPasswordPage } from "@/features/auth/pages/reset-password";
import {
  ProtectedRoute,
  PublicRoute,
} from "@/app/routes/auth-route";
import { NotFoundPage } from "@/app/pages/not-found";

export const routes = [
  { path: "/", element: <LandingPage /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "reminders", element: <RemindersPage /> },
      { path: "expenses", element: <ExpensesPage /> },
      { path: "loans", element: <LoansPage /> },
      { path: "habits", element: <HabitsPage /> },
      { path: "budget", element: <BudgetPage /> },
      { path: "notes", element: <NotesPage /> },
      { path: "subscriptions", element: <SubscriptionsPage /> },
      { path: "goals", element: <GoalsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

// ← Wrapped in a function so it's not called at import time
export function createRouter() {
  return createBrowserRouter(routes);
}
