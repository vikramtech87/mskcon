"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type NextPageProps = {} & WithAuthProps;

const NextPage = ({ auth: { authUser } }: NextPageProps) => {
  const router = useRouter();

  const { profileStore, mealStore, workshopStore } = useStore();

  useEffect(() => {
    if (!authUser.emailVerified) {
      router.push("/auth/verify-email");
      return;
    }

    const { isLoaded: isProfileLoaded, profileState } = profileStore;
    const { isLoaded: isMealLoaded, mealState } = mealStore;
    const { isLoaded: isWorkshopLoaded, workshopState } = workshopStore;

    const isLoaded = isProfileLoaded && isMealLoaded && isWorkshopLoaded;

    if (!isLoaded) {
      return;
    }

    if (workshopState !== undefined) {
      router.push("/registration/summary");
      return;
    }

    if (mealState !== undefined) {
      router.push("/registration/workshop");
      return;
    }

    if (profileState !== undefined) {
      router.push("/registration/meals");
      return;
    }

    router.push("/registration/profile");
    return;
  }, [router, authUser, profileStore, mealStore, workshopStore]);

  return <CenterSpinner message="Determining your next step" />;
};

export default WithAuth(NextPage);
