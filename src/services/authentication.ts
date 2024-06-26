import {
  EmailVerificationError,
  OobCodeErrorCode,
  LoginError,
  LoginErrorCode,
  SignUpError,
  SignupErrorCode,
  PasswordResetError,
} from "@/lib/errors/authError";
import { Result, wrapInResult } from "@/lib/result";
import { FirebaseError } from "firebase/app";
import {
  applyActionCode,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase/client";

export const signUpWithEmailPassword = async (
  email: string,
  password: string
): Promise<Result<UserCredential, SignUpError>> => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return {
      ok: true,
      value: user,
    };
  } catch (error) {
    let errorCode: SignupErrorCode = "unknown";

    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        errorCode = "auth/email-exists";
      } else {
        errorCode = "auth/unknown";
        console.error(`Unknown firebase signup error: ${error.code}`);
      }
    } else {
      console.error(`Unknown signup error: ${error}`);
    }

    return {
      ok: false,
      error: new SignUpError(errorCode),
    };
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Result<UserCredential, LoginError>> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {
      ok: true,
      value: user,
    };
  } catch (error) {
    let errorCode: LoginErrorCode = "unknown";

    if (error instanceof FirebaseError) {
      const invalidCredentialsErrorCodes = [
        "auth/invalid-credential",
        "auth/user-not-found",
        "auth/wrong-password",
      ];
      if (invalidCredentialsErrorCodes.includes(error.code)) {
        errorCode = "auth/invalid-credential";
      } else {
        errorCode = "auth/unknown";
        console.error(`Unknown firebase login error: ${error}`);
      }
    } else {
      console.error(`Unknown login error: ${error}`);
    }

    return {
      ok: false,
      error: new LoginError(errorCode),
    };
  }
};

export const logout = async (): Promise<Result<void>> =>
  wrapInResult(signOut(auth));

export const verifyEmail = async (
  oobCode: string
): Promise<Result<void, EmailVerificationError>> => {
  try {
    await applyActionCode(auth, oobCode);
    return {
      ok: true,
      value: undefined,
    };
  } catch (error) {
    let errorCode: OobCodeErrorCode = "unknown";

    if (error instanceof FirebaseError) {
      const invalidCodeErrorCodes = [
        "auth/expired-action-code",
        "auth/invalid-action-code",
        "auth/user-disabled",
        "auth/user-not-found",
      ];
      if (invalidCodeErrorCodes.includes(error.code)) {
        errorCode = "auth/invalid-code";
      } else {
        errorCode = "auth/unknown";
        console.error(
          `Unknown firebase email verification code error: ${error.code}`
        );
      }
    } else {
      console.error(`Unknown email verification error: ${error}`);
    }

    return {
      ok: false,
      error: new EmailVerificationError(errorCode),
    };
  }
};

export const performPasswordReset = async (
  oobCode: string,
  newPassword: string
): Promise<Result<void, PasswordResetError>> => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return {
      ok: true,
      value: undefined,
    };
  } catch (error) {
    let errorCode: OobCodeErrorCode = "unknown";
    if (error instanceof FirebaseError) {
      const invalidCodeErrorCodes = [
        "auth/expired-action-code",
        "auth/invalid-action-code",
        "auth/user-disabled",
        "auth/user-not-found",
      ];
      if (invalidCodeErrorCodes.includes(error.code)) {
        errorCode = "auth/invalid-code";
      } else {
        errorCode = "auth/unknown";
        console.error(
          `Unknown firebase email verification code error: ${error.code}`
        );
      }
    } else {
      console.error(`Unknown email verification error: ${error}`);
    }

    return {
      ok: false,
      error: new PasswordResetError(errorCode),
    };
  }
};
