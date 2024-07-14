"use client";

import CenterSpinner from "@/components/center-spinner";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { useStore } from "@/store/useStore";
import ProfileForm from "./_components/profile-form";

type ProfilePageProps = {} & WithAuthProps;

const ProfilePage = ({ auth: { authUser } }: ProfilePageProps) => {
  const { profileState, isLoaded: isProfileLoaded } = useStore(
    (state) => state.profileStore
  );

  if (!isProfileLoaded) {
    return <CenterSpinner />;
  }

  return <ProfileForm authUserId={authUser.uid} profileState={profileState} />;
};

export default WithAuth(ProfilePage, true);
