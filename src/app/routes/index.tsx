import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard-layout";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LandingPage } from "@/features/landing/pages/landing-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
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
} from "@/features/dashboard/pages/module-pages";
import { SettingsPage } from "@/features/dashboard/pages/settings-page";
import { LoginPage } from "@/features/auth/components/login-page";
import { SignupPage } from "@/features/auth/components/signup-page";
import { ForgotPasswordPage } from "@/features/auth/components/forgot-password-page";
import { ResetPasswordPage } from "@/features/auth/components/reset-password-page";
import {
  ProtectedRoute,
  PublicRoute,
} from "@/features/auth/components/auth-route";
import { NotFoundPage } from "./NotFoundPage";

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
