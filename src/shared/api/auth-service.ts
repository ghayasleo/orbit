// [SHARED/API] - Pure async auth functions (no React, no hooks)
import { supabase } from './client';

export async function loginWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signupWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
}

export async function verifyEmailOtp(email: string, token: string) {
  return supabase.auth.verifyOtp({ email, token, type: 'email' });
}

export async function resendSignupOtp(email: string) {
  return supabase.auth.resend({ type: 'signup', email });
}

export async function sendPasswordResetEmail(email: string, redirectUrl: string) {
  return supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
}

export async function updateUserPassword(newPassword: string) {
  return supabase.auth.updateUser({ password: newPassword });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export function onAuthStateChange(
  callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
) {
  return supabase.auth.onAuthStateChange(callback);
}
