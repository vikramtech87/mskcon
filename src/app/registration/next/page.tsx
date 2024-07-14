"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type NextPageProps = {} & WithAuthProps;

const NextPage = ({ auth: { authUser } }: NextPageProps) => {
  const router = useRouter();

  const { profileStore, mealStore } = useStore();

  useEffect(() => {
    if (!authUser.emailVerified) {
      router.push("/auth/verify-email");
      return;
    }

    const { isLoaded: isProfileLoaded, profileState } = profileStore;
    const { isLoaded: isMealLoaded, mealState } = mealStore;

    if (
      authUser.emailVerified &&
      isProfileLoaded &&
      profileState === undefined
    ) {
      router.push("/registration/profile");
      return;
    }

    if (profileState !== undefined && mealState === undefined) {
      router.push("/registration/meals");
      return;
    }

    if (mealState !== undefined) {
      router.push("/registration/workshop");
      return;
    }
  }, [router, authUser, profileStore, mealStore]);

  return <CenterSpinner message="Determining your next step" />;
};

export default WithAuth(NextPage);
