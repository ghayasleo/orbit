import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { AuthLayout } from '@/features/auth/components/auth-layout'
import { HomePage } from '@/features/home/components/HomePage'
import { LoginPage } from '@/features/auth/components/login-page'
import { SignupPage } from '@/features/auth/components/signup-page'
import { ForgotPasswordPage } from '@/features/auth/components/forgot-password-page'
import { ResetPasswordPage } from '@/features/auth/components/reset-password-page'
import { NotFoundPage } from './NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
