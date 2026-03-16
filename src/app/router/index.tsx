import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { AuthLayout } from '@/app/layouts/auth-layout';
import { LandingPage } from '@/pages/landing';
import {
  DashboardPage,
} from '@/pages/dashboard';
import { TasksPage } from '@/pages/tasks';
import { RemindersPage } from '@/pages/reminders';
import { ExpensesPage } from '@/pages/expenses';
import { LoansPage } from '@/pages/loans';
import { HabitsPage } from '@/pages/habits';
import { BudgetPage } from '@/pages/budget';
import { NotesPage } from '@/pages/notes';
import { SubscriptionsPage } from '@/pages/subscriptions';
import { GoalsPage } from '@/pages/goals';
import { SettingsPage } from '@/pages/settings';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from '@/pages/auth';
import { NotFoundPage } from '@/pages/not-found';
import { ProtectedRoute, PublicRoute } from './auth-guard';
import { PATHS } from './paths';

export const routes = [
  { path: PATHS.home, element: <LandingPage /> },
  {
    path: PATHS.app,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'reminders', element: <RemindersPage /> },
      { path: 'expenses', element: <ExpensesPage /> },
      { path: 'loans', element: <LoansPage /> },
      { path: 'habits', element: <HabitsPage /> },
      { path: 'budget', element: <BudgetPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'subscriptions', element: <SubscriptionsPage /> },
      { path: 'goals', element: <GoalsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: PATHS.login, element: <LoginPage /> },
      { path: PATHS.signup, element: <SignupPage /> },
      { path: PATHS.forgotPassword, element: <ForgotPasswordPage /> },
      { path: PATHS.resetPassword, element: <ResetPasswordPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

export function createRouter() {
  return createBrowserRouter(routes);
}
