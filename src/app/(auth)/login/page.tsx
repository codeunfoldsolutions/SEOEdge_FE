"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#1e1e1e]"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#4285f4] hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#959595] hover:text-[#1e1e1e] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 border-[#e4e4e4] rounded text-[#4285f4] focus:ring-[#4285f4]/20"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#959595]">
                Remember me
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#1e1e1e] text-white py-3 rounded-lg hover:bg-black transition-colors font-medium shadow-sm hover:shadow"
              >
                Sign In
              </button>
            </div>
            {/* 
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#e4e4e4] absolute w-full"></div>
              <span className="bg-white px-4 text-sm text-[#959595] relative">
                or continue with
              </span>
            </div> */}

            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-[#e4e4e4] py-3 rounded-lg hover:bg-[#f8f9fa] transition-colors font-medium"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                />
                <path
                  fill="#34A853"
                  d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                />
                <path
                  fill="#EA4335"
                  d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                />
              </svg>
              Sign In with Google
            </button> */}
          </form>

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
