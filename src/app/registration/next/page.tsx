"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useRouter } from "next/navigation";
import React from "react";

type NextPageProps = {} & WithAuthProps;

const NextPage = ({ auth: { authUser } }: NextPageProps) => {
  const router = useRouter();

  if (!authUser.emailVerified) {
    router.push("/auth/verify-email");
  }

  return <CenterSpinner message="Determining your next step" />;
};

export default WithAuth(NextPage);
