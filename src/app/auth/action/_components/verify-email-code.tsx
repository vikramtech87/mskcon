import CenterSpinner from "@/components/center-spinner";
import FormCard from "@/components/form-card";
import { verifyEmail } from "@/services/authentication";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import EmailAlreadyVerified from "../../_components/email-already-verified";
import { Button } from "@/components/ui/button";

type VerifyEmailCodeProps = {
  code: string;
};

type VerifyEmailState = {
  completed: boolean;
  success: boolean;
};

type VerifyEmailAction =
  | { type: "successfulCompletion" }
  | { type: "failureCompletion" };

const reducer = (
  _: VerifyEmailState,
  action: VerifyEmailAction
): VerifyEmailState => {
  if (action.type === "failureCompletion") {
    return {
      completed: true,
      success: false,
    };
  }

  return {
    completed: true,
    success: true,
  };
};

const VerifyEmailCode = ({ code }: VerifyEmailCodeProps) => {
  const [state, dispatch] = useReducer(reducer, {
    completed: false,
    success: false,
  });

  const { authStore } = useStore();

  const emailVerified = authStore.authState?.authUser.emailVerified ?? false;

  useEffect(() => {
    const verify = async () => {
      const result = await verifyEmail(code);
      console.log(result);
      if (result.ok) {
        dispatch({ type: "successfulCompletion" });
      } else {
        dispatch({ type: "failureCompletion" });
      }
    };
    verify();
  }, [dispatch, code]);

  if (emailVerified) {
    return <EmailAlreadyVerified />;
  }

  if (state.completed === false) {
    return <CenterSpinner message="Verifying Email" />;
  }

  if (state.success === false) {
    return (
      <FormCard title="Error verifying Email">
        <div className="flex flex-col">
          <p>
            An error occured during email verification. Your email is already
            verified or try sending verification link again after signing in.
          </p>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard title="Email verified">
      <div className="flex-col flex">
        <p>Your email is successfully verified.</p>
        <div className="pt-8 flex flex-col">
          <Button>Continue with registration</Button>
        </div>
      </div>
    </FormCard>
  );
};

export default VerifyEmailCode;
