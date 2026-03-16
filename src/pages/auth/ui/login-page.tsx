import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/features/auth-by-email';
import { OtpForm } from '@/features/verify-otp';

type Step = 'form' | 'otp';

export function LoginPage() {
  const [step, setStep] = useState<Step>('form');
  const [emailToVerify, setEmailToVerify] = useState('');
  const navigate = useNavigate();

  if (step === 'otp') {
    return (
      <OtpForm
        email={emailToVerify}
        onVerifySuccess={() => navigate('/app')}
        onBack={() => setStep('form')}
      />
    );
  }

  return (
    <LoginForm
      onNeedsOtp={(email) => {
        setEmailToVerify(email);
        setStep('otp');
      }}
      onSuccess={() => navigate('/app')}
    />
  );
}

