import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '@/features/auth-by-email'
import { OtpForm } from '@/features/verify-otp'

type Step = 'form' | 'otp'

export function SignupPage() {
  const [step, setStep] = useState<Step>('form')
  const [verifyData, setVerifyData] = useState<{ email: string; avatarFile: File | null } | null>(null)
  const navigate = useNavigate()

  if (step === 'otp' && verifyData) {
    return (
      <OtpForm
        email={verifyData.email}
        avatarFile={verifyData.avatarFile}
        onVerifySuccess={() => navigate('/app')}
        onBack={() => setStep('form')}
      />
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <RegisterForm
        onNeedsOtp={(email, avatarFile) => {
          setVerifyData({ email, avatarFile })
          setStep('otp')
        }}
      />
    </div>
  )
}
