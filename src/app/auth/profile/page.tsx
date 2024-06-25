"use client";

import Container from "@/components/container";
import withAuth, { WithAuthProps } from "@/hooks/withAuth";
import React from "react";

type ProfilePageProps = {} & WithAuthProps;

const ProfilePage = ({ auth }: ProfilePageProps) => {
  return (
    <Container>
      <div>{auth.email}</div>
      <div>{auth.userId}</div>
      <div>{auth.isEmailVerified ? "Email verified" : "Email unverified"}</div>
    </Container>
  );
};

export default withAuth(ProfilePage);
