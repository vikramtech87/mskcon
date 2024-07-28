"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useStore } from "@/store/useStore";
import ProfileForm from "./_components/profile-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useRedirectIfPaid from "@/hooks/useRedirectIfPaid";

type ProfilePageProps = {} & WithAuthProps;

const ProfilePage = ({ auth: { authUser } }: ProfilePageProps) => {
  const { profileStore } = useStore();

  const { profileState, isLoaded: isProfileLoaded } = profileStore;
  const isTransactionLoaded = useRedirectIfPaid();

  if (!isProfileLoaded || !isTransactionLoaded) {
    return <CenterSpinner />;
  }

  return (
    <ProfileForm
      authUserId={authUser.uid}
      authEmail={authUser.email!}
      profileState={profileState}
    />
  );
};

export default WithAuth(ProfilePage, true);
