"use client";

import FormCard from "@/components/form-card";
import { Button } from "@/components/ui/button";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import EmailAlreadyVerified from "../_components/email-already-verified";

type VerifyEmailProps = {} & WithAuthProps;

const VerifyEmail = ({ auth: { authUser } }: VerifyEmailProps) => {
  const { emailVerified } = authUser;

  const [mailSent, setMailSent] = useState(false);

  const sendVerificationLink = async () => {
    await sendEmailVerification(authUser);
    setMailSent(true);
  };

  if (emailVerified) {
    return <EmailAlreadyVerified />;
  }

  if (mailSent) {
    return (
      <FormCard title="Verify Email">
        <p>
          A mail has been sent to your registered email address. If you do not
          receive the email, kindly check your spam / junk folder also.
        </p>
      </FormCard>
    );
  }

  return (
    <FormCard title="Verify Email">
      <div className="flex flex-col space-y-2">
        <p>
          You need to verify your email address before continuing with
          registration.
        </p>
        <div className="pt-6 flex flex-col">
          <Button onClick={() => sendVerificationLink()}>
            Send verification link
          </Button>
        </div>
      </div>
    </FormCard>
  );
};

export default WithAuth(VerifyEmail);
