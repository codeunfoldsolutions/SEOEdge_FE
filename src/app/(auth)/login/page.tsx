"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Define login schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const date = new Date();

  // Initialize form with validation
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Login mutation
  const loginMutation = useAuthMutation({
    mutationCallback: AuthAdapter.signIn,
    onSuccess: (data) => {
      setFormError(null);
      toast.success("Logged in successfully!");

      // If "Remember me" is checked, you might want to store some data
      if (rememberMe) {
        localStorage.setItem("rememberUser", form.getValues().email);
      } else {
        localStorage.removeItem("rememberUser");
      }

      // Redirect to dashboard or home page
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Invalid email or password. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
    },
  });

  // Handle form submission
  const handleLogin = async (data: LoginSchema) => {
    setFormError(null);
    try {
      await loginMutation.mutateAsync(data);
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
              Welcome Back
            </h1>
            <p className="text-[#959595]">
              Enter your email and password to access your account
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6"
            >
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#1e1e1e]">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-[#1e1e1e]">
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-[#4285f4] hover:underline font-medium"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
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
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />

              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="h-4 w-4 border-[#e4e4e4] rounded text-[#4285f4] focus:ring-[#4285f4]/20"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-[#959595]"
                >
                  Remember me
                </label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loginMutation.isPending || !form.formState.isValid}
                  className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-center mt-8 text-[#959595]">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#4285f4] font-medium hover:underline"
            >
              Sign Up
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
