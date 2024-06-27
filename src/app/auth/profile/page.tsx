"use client";

import Container from "@/components/container";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import React from "react";

type ProfilePageProps = {} & WithAuthProps;

const ProfilePage = ({ auth }: ProfilePageProps) => {
  return (
    <Container>
      <div>{auth.authUser.email}</div>
      <div>{auth.authUser.uid}</div>
      <div>
        {auth.authUser.emailVerified ? "Email verified" : "Email unverified"}
      </div>
    </Container>
  );
};

export default WithAuth(ProfilePage);
