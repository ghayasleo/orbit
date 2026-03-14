import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/shared/api'
import { useUserStore } from '@/entities/user'

export type AuthError = string | null

interface UseAuthReturn {
  loading: boolean
  error: AuthError
  login: (email: string, password: string) => Promise<{ needsOtp: boolean }>
  signup: (email: string, password: string, firstName: string, lastName: string, avatarFile?: File | null) => Promise<{ needsOtp: boolean }>
  verifyOtp: (email: string, token: string) => Promise<boolean>
  resendOtp: (email: string) => Promise<void>
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (newPassword: string) => Promise<boolean>
  clearError: () => void
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError>(null)
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null)
  const navigate = useNavigate()

  function clearError() {
    setError(null)
  }

  async function login(email: string, password: string): Promise<{ needsOtp: boolean }> {
    setLoading(true)
    setError(null)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

      if (signInError) {
        if (signInError.message.toLowerCase().includes('email not confirmed')) {
          await supabase.auth.resend({ type: 'signup', email })
          return { needsOtp: true }
        }
        setError(signInError.message)
        return { needsOtp: false }
      }

      navigate('/app')
      return { needsOtp: false }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      return { needsOtp: false }
    } finally {
      setLoading(false)
    }
  }

  async function signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatarFile?: File | null
  ): Promise<{ needsOtp: boolean }> {
    setLoading(true)
    setError(null)
    setPendingAvatar(avatarFile || null)
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return { needsOtp: false }
      }

      return { needsOtp: true }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      return { needsOtp: false }
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp(email: string, token: string): Promise<boolean> {
    setLoading(true)
    setError(null)
    try {
      const { data, error: otpError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      })

      if (otpError) {
        setError(otpError.message)
        return false
      }

      const user = data.user
      if (user && pendingAvatar) {
        try {
          const ext = pendingAvatar.name.split('.').pop()
          const filePath = `${user.id}/${user.id}-${Date.now()}.${ext}`
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, pendingAvatar)

          if (uploadError) throw uploadError

          const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath)

          const { error: updateError } = await supabase
            .from('profiles')
            .update({ profile_image: urlData.publicUrl })
            .eq('id', user.id)

          if (updateError) throw updateError

          await useUserStore.getState().fetchProfile(user.id)
        } catch (uploadErr) {
          console.error('Error uploading profile image:', uploadErr)
        }
      }

      navigate('/app')
      return true
    } catch {
      setError('An unexpected error occurred. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function resendOtp(email: string): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const { error: resendError } = await supabase.auth.resend({ type: 'signup', email })
      if (resendError) {
        setError(resendError.message)
      }
    } catch {
      setError('Failed to resend code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function forgotPassword(email: string): Promise<boolean> {
    setLoading(true)
    setError(null)
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) {
        setError(resetError.message)
        return false
      }

      return true
    } catch {
      setError('An unexpected error occurred. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function resetPassword(newPassword: string): Promise<boolean> {
    setLoading(true)
    setError(null)
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })

      if (updateError) {
        setError(updateError.message)
        return false
      }

      return true
    } catch {
      setError('An unexpected error occurred. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    login,
    signup,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    clearError,
  }
}
