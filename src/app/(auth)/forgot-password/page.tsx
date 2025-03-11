"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ResetPassword() {
  const [step, setStep] = useState(1); // 1: Request reset, 2: Set new password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const date = new Date();

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

          {step === 1 ? (
            <>
              {/* Step 1: Request Reset */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#1e1e1e] mb-2">
                  Reset Password
                </h1>
                <p className="text-[#959595] max-w-sm mx-auto">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password
                </p>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1e1e1e]"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Step 2: Set New Password */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#1e1e1e] mb-2">
                  Create New Password
                </h1>
                <p className="text-[#959595] max-w-sm mx-auto">
                  Your new password must be different from previously used
                  passwords
                </p>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-[#1e1e1e]"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder="Enter new password"
                      className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#959595] hover:text-[#1e1e1e] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-[#959595]">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-[#1e1e1e]"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmNewPassword"
                      placeholder="Confirm new password"
                      className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#959595] hover:text-[#1e1e1e] transition-colors"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}

          <div className="text-center mt-8">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#959595] hover:text-[#1e1e1e] flex items-center justify-center gap-1 mx-auto"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}
            <p className="text-[#959595] mt-2">
              <Link
                href="/login"
                className="text-[#4285f4] font-medium hover:underline"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-[#959595]">
        <p>© {date.getUTCFullYear()} SEO Edge. All rights reserved.</p>
      </div>
    </div>
  );
}
