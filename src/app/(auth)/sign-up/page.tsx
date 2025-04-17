"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerValidation } from "@/lib/validations/auth";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const date = new Date();

  // Form control for registration with password confirmation
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    mode: "onChange", // Validate on change for immediate feedback
  });

  const signUpMutation = useAuthMutation({
    mutationCallback: AuthAdapter.signUp,

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to create account. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleSignUp = async (data: RegisterSchema) => {
    if (!agreedToTerms) {
      setFormError("Please agree to the Terms of Service and Privacy Policy");
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setFormError(null);
    try {
      // Strip out confirmPassword before sending to API
      const { confirmPassword, ...signUpData } = data;
      await signUpMutation.mutateAsync(signUpData);

      setFormError(null);
      toast.success(
        "Account created successfully! Please verify your email address."
      );
      form.reset();

      // Store email in localStorage or session to use in verification page
      sessionStorage.setItem("verificationEmail", data.email);

      router.push("/verify-email");
    } catch (error) {
      // Error is handled in onError callback
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
              Create Account
            </h1>
            <p className="text-[#959595]">
              Sign up to get started with SEO Edge
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-5"
            >
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              {/* First Name and Last Name */}
              <div className="flex space-x-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          {...field}
                          className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          {...field}
                          className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
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
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
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

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                  className="h-4 w-4 border-[#e4e4e4] rounded text-[#4285f4] focus:ring-[#4285f4]/20"
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="text-[#959595]">
                    I agree to the{" "}
                    <Link href="#" className="text-[#4285f4] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#4285f4] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={signUpMutation.isPending || !form.formState.isValid}
                  className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
                >
                  {signUpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-center mt-8 text-[#959595]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4285f4] font-medium hover:underline"
            >
              Sign In
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
