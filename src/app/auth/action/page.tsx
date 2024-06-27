"use client";

//http://localhost:3000/auth/action?mode=verifyEmail&oobCode=cHjCrWLEylXCytC9JF5cSdJN9nAX4llTIP8uSXSri-AAAAGQR_n1zQ&apiKey=AIzaSyARiP4nRlKxyzypkk5y1UiKZQCDSzE1G-I&lang=en

import CenteredError from "@/components/centered-error";
import { useSearchParams } from "next/navigation";
import VerifyEmailCode from "./_components/verify-email-code";
import { Suspense } from "react";

type ActionPageProps = {};

const ActionPage = (props: ActionPageProps) => {
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  if (mode === null || oobCode === null) {
    return <CenteredError errorCode={400} errorMessage="Invalid request" />;
  }

  if (mode === "verifyEmail" && oobCode !== null) {
    return <VerifyEmailCode code={oobCode} />;
  }

  <div>Forget password</div>;
};

const WithSuspense = () => (
  <Suspense>
    <ActionPage />
  </Suspense>
);

export default WithSuspense;
