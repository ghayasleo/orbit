// [FEATURES/VERIFY-OTP/UI] - otp-form
import { useEffect, useRef, useState } from "react";
import { useVerifyOtp } from "../api/use-verify-otp";
import { resendSignupOtp } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib";

interface OtpFormProps {
  email: string;
  avatarFile?: File | null;
  note?: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

const isDev = import.meta.env.MODE === "development";
const OTP_LENGTH = isDev ? 6 : 8;
const RESEND_COOLDOWN_S = 60;

export function OtpForm({
  email,
  avatarFile,
  note,
  onVerifySuccess,
  onBack,
}: OtpFormProps) {
  const { mutateAsync: verifyOtp, isPending: loading, error } = useVerifyOtp();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [cooldown, setCooldown] = useState(0);
  const [resendError, setResendError] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async (token: string) => {
    try {
      await verifyOtp({ email, token, avatarFile });
      onVerifySuccess();
    } catch {
      // Handled by React Query / local error state
    }
  };

  function handleChange(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (next.every((d) => d !== "")) {
      handleVerify(next.join(""));
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i] ?? "";
    }
    setDigits(next);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
    if (pasted.length === OTP_LENGTH) {
      handleVerify(pasted);
    }
  }

  async function handleResend() {
    try {
      setResendError(null);
      const { error } = await resendSignupOtp(email);
      if (error) throw error;
      setCooldown(RESEND_COOLDOWN_S);
      setDigits(Array(OTP_LENGTH).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } catch (err: unknown) {
      setResendError(err instanceof Error ? err.message : 'Failed to resend code');
    }
  }

  const displayError = error?.message || resendError;

  return (
    <div
      className={cn(
        "w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300",
        isDev ? "max-w-sm" : "max-w-md",
      )}
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-600 dark:text-violet-400"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent a {OTP_LENGTH}-digit code to{" "}
          <span className="font-medium text-foreground">{email}</span>.
          {note && (
            <span className="block mt-1 text-violet-600 dark:text-violet-400">
              {note}
            </span>
          )}
        </p>
      </div>

      {/* OTP inputs */}
      <div className="space-y-2">
        <div className="flex gap-2 justify-between" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[i] = el;
              }}
              id={`otp-input-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={loading}
              className={cn(
                "w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-background",
                "transition-all duration-150 outline-none",
                "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
                digit
                  ? "border-violet-400 dark:border-violet-500"
                  : "border-border",
                loading && "opacity-50 cursor-not-allowed",
              )}
            />
          ))}
        </div>

        {displayError && (
          <p className="text-sm text-destructive flex items-center gap-1.5 mt-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {displayError}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        className="w-full bg-violet-600 hover:bg-violet-700 text-white h-11 rounded-xl font-medium transition-all"
        onClick={() => handleVerify(digits.join(""))}
        disabled={loading || digits.some((d) => !d)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Verifying…
          </span>
        ) : (
          "Verify email"
        )}
      </Button>

      {/* Resend + Back */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          {cooldown > 0 ? (
            <span className="text-muted-foreground">Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors underline-offset-4 hover:underline"
            >
              Resend code
            </button>
          )}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
