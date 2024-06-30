import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import React from "react";

type NextProps = {} & WithAuthProps;

const Next = ({}: NextProps) => {
  return <div>Next</div>;
};

export default WithAuth(Next);
