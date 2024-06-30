"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type NextPageProps = {} & WithAuthProps;

const NextPage = ({ auth: { authUser } }: NextPageProps) => {
  const router = useRouter();

  const { isLoaded: isProfileLoaded, profileState } = useStore(
    (state) => state.profileStore
  );

  useEffect(() => {
    if (!authUser.emailVerified) {
      router.push("/auth/verify-email");
      return;
    }

    if (
      authUser.emailVerified &&
      isProfileLoaded &&
      profileState === undefined
    ) {
      router.push("/registration/profile");
      return;
    }

    router.push("/registration/profile");
  }, [router, authUser, isProfileLoaded, profileState]);

  return <CenterSpinner message="Determining your next step" />;
};

export default WithAuth(NextPage);
