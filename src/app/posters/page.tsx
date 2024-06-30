"use client";

import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import React from "react";

type PostersPageProps = {} & WithAuthProps;

const PostersPage = () => {
  return <div>PostersPage</div>;
};

export default WithAuth(PostersPage);
