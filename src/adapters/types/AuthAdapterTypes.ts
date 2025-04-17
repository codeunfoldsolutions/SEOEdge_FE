export type SignUpPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type VerifyEmailPayload = {
  otp: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ResendOTPPayload = {
  email: string;
};

export type PasswordRecoveryPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  password: string;
};
