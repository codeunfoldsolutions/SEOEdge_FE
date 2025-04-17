import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";
import {
  SignUpPayload,
  LoginPayload,
  ResendOTPPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
  PasswordRecoveryPayload,
} from "./types/AuthAdapterTypes";

// api service initilizer
const authService = new ApiService("/auth");
const useAuthMutation = TanstackWrapper.mutation;
const useAuthQuery = TanstackWrapper.query;

const AuthAdapter = {
  verifyOTP: async ({ payload }: MutationCallBackArgs<VerifyEmailPayload>) => {
    const response = await authService.mutate<VerifyEmailPayload, unknown>({
      slug: `verify-email`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },

  signUp: async ({ payload }: MutationCallBackArgs<SignUpPayload>) => {
    const response = await authService.mutate<SignUpPayload, unknown>({
      slug: `register`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },

  forgotPassword: async ({
    payload,
  }: MutationCallBackArgs<PasswordRecoveryPayload>) => {
    const response = await authService.mutate<PasswordRecoveryPayload, unknown>(
      {
        slug: `password-recovery`,
        payload,
        type: "JSON",
        method: "POST",
      }
    );
    return response;
  },

  resetPassword: async ({
    payload,
  }: MutationCallBackArgs<ResetPasswordPayload>) => {
    const response = await authService.mutate<ResetPasswordPayload, unknown>({
      slug: `reset-password`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },

  signIn: async ({ payload }: MutationCallBackArgs<LoginPayload>) => {
    const response = await authService.mutate<LoginPayload, unknown>({
      slug: `login`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },

  resendOTP: async ({ payload }: MutationCallBackArgs<ResendOTPPayload>) => {
    const response = await authService.mutate<ResendOTPPayload, unknown>({
      slug: `resend-otp`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { AuthAdapter, useAuthMutation, useAuthQuery };
