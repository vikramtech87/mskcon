"use client";

import PageContainer from "@/components/page-container";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import React from "react";

type PostersPageProps = {} & WithAuthProps;

const PostersPage = () => {
  return (
    <PageContainer title="Posters">
      <div></div>
    </PageContainer>
  );
};

export default WithAuth(PostersPage);
