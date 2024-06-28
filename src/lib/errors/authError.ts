export type SignupErrorCode = "auth/email-exists" | "auth/unknown" | "unknown";
export type LoginErrorCode =
  | "auth/invalid-credential"
  | "auth/unknown"
  | "unknown";
export type OobCodeErrorCode = "auth/invalid-code" | "auth/unknown" | "unknown";

export class AuthError extends Error {}

export class SignUpError extends AuthError {
  code: SignupErrorCode;

  constructor(code: SignupErrorCode) {
    super(code);
    this.code = code;
  }
}

export class LoginError extends AuthError {
  code: LoginErrorCode;

  constructor(code: LoginErrorCode) {
    super(code);
    this.code = code;
  }
}

export class EmailVerificationError extends AuthError {
  code: OobCodeErrorCode;

  constructor(code: OobCodeErrorCode) {
    super(code);
    this.code = code;
  }
}

export class PasswordResetError extends AuthError {
  code: OobCodeErrorCode;

  constructor(code: OobCodeErrorCode) {
    super(code);
    this.code = code;
  }
}
