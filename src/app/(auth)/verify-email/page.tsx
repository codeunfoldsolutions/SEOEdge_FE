"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const date = new Date();

  useEffect(() => {
    // Retrieve email from session storage
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email is found, redirect to sign-up page
      toast.error("No email found for verification. Please sign up again.");
      router.push("/sign-up");
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const verifyEmailMutation = useAuthMutation({
    mutationCallback: AuthAdapter.verifyOTP,
    onSuccess: () => {
      setFormError(null);
      toast.success("Email verified successfully!");
      // Redirect to dashboard or login page after successful verification
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to verify email. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const resendOTPMutation = useAuthMutation({
    mutationCallback: AuthAdapter.resendOTP,
    onSuccess: () => {
      toast.success("A new verification code has been sent to your email.");
      // Reset OTP fields
      setOtp(["", "", "", "", "", ""]);
      // Reset timer
      setTimeLeft(60);
      setCanResend(false);
      // Focus first input
      inputRefs.current[0]?.focus();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to resend verification code. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current field is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (canResend && email) {
      try {
        await resendOTPMutation.mutateAsync({
          email,
        });
      } catch (error) {
        // Error handled in onError callback
        console.log(error);
      }
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if OTP is complete
    if (otp.some((digit) => digit === "")) {
      setFormError("Please enter the complete verification code");
      toast.error("Please enter the complete verification code");
      return;
    }

    if (!email) {
      setFormError("Email not found. Please sign up again.");
      toast.error("Email not found. Please sign up again.");
      return;
    }

    setFormError(null);
    try {
      await verifyEmailMutation.mutateAsync({
        email,
        otp: otp.join(""),
      });
    } catch (error) {
      // Error handled in onError callback
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f6ff] to-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src={"/seoedge logo.png"}
              width={140}
              height={40}
              alt="Logo"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1e1e1e] mb-2">
              Verify Your Email
            </h1>
            <p className="text-[#959595] max-w-sm mx-auto">
              We&apos;ve sent a verification code to{" "}
              <span className="font-medium text-[#1e1e1e]">{email}</span>.
              Please enter the code below to verify your account.
            </p>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleVerify} className="space-y-6">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {formError}
              </div>
            )}

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  disabled={verifyEmailMutation.isPending}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-[#959595]">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendOTPMutation.isPending}
                    className="text-[#4285f4] font-medium hover:underline disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {resendOTPMutation.isPending ? (
                      <>
                        <Loader2 className="inline mr-2 h-3 w-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Code"
                    )}
                  </button>
                ) : (
                  <>
                    Resend code in{" "}
                    <span className="font-medium text-[#1e1e1e]">
                      {timeLeft}s
                    </span>
                  </>
                )}
              </p>
            </div>

            <Button
              type="submit"
              disabled={
                verifyEmailMutation.isPending ||
                otp.some((digit) => digit === "")
              }
              className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
            >
              {verifyEmailMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-[#959595]">
            <Link
              href="/login"
              className="text-[#4285f4] font-medium hover:underline"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-[#959595]">
        <p>© {date.getUTCFullYear()} SEO Edge. All rights reserved.</p>
      </div>
    </div>
  );
}
