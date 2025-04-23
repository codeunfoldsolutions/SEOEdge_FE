"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "@/lib/validations/auth";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  const [step, setStep] = useState(1); // 1: Request reset, 2: Set new password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get token from URL if available (for password reset step)
  const token = searchParams.get("token") || "";

  const date = new Date();

  // Effect to set step to 2 if token is present
  useEffect(() => {
    if (token) {
      setStep(2);
    }
  }, [token]);

  // Form for requesting password reset
  const forgotPasswordForm = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  // Extended schema for reset password form - no need for email field
  const resetPasswordFormSchema = z
    .object({
      password: resetPasswordValidation.shape.password,
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

  // Form for setting new password
  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
    },
    mode: "onSubmit",
  });

  // Mutation for requesting password reset
  const forgotPasswordMutation = useAuthMutation({
    mutationCallback: AuthAdapter.forgotPassword,
    onSuccess: () => {
      setFormError(null);
      toast.success(
        "Password reset link has been sent to your email. Please check your inbox."
      );
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Failed to send reset link. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordSchema) => {
    setFormError(null);
    try {
      await forgotPasswordMutation.mutateAsync(data);
    } catch (error) {
      // Error is handled in onError callback
      console.log(error);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    // Ensure token is available
    if (!token) {
      setFormError(
        "Reset token is missing. Please use the link from your email or request a new one."
      );
      toast.error(
        "Reset token is missing. Please use the link from your email."
      );
      return;
    }

    setFormError(null);
    setIsResetting(true);

    try {
      // Direct axios call with token in the Authorization header
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        { password: data.password }, // Only send password in payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      toast.success(
        "Password has been successfully reset. You can now log in with your new password."
      );

      // Redirect to login page after successful password reset
      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to reset password. Please try again or request a new reset link.";
      setFormError(errorMessage);
      toast.error(errorMessage);
      console.error(axiosError);
    } finally {
      setIsResetting(false);
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

          {formError && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {formError}
            </div>
          )}

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

              <Form {...forgotPasswordForm}>
                <form
                  onSubmit={forgotPasswordForm.handleSubmit(
                    handleForgotPassword
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-[#1e1e1e]">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={
                      forgotPasswordMutation.isPending ||
                      !forgotPasswordForm.formState.isValid
                    }
                    className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
                  >
                    {forgotPasswordMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </Form>
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

              <Form {...resetPasswordForm}>
                <form
                  onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
                  className="space-y-5"
                >
                  <FormField
                    control={resetPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-[#1e1e1e]">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              {...field}
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
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-[#959595]">
                          Password must be at least 8 characters long with
                          uppercase, lowercase, number, and special character
                        </FormDescription>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-[#1e1e1e]">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              {...field}
                              className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#959595] hover:text-[#1e1e1e] transition-colors"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              aria-label={
                                showConfirmPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={
                      isResetting ||
                      !resetPasswordForm.formState.isValid ||
                      !token
                    }
                    className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
                  >
                    {isResetting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            </>
          )}

          <div className="text-center mt-8">
            {step === 2 && !token && (
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
