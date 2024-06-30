"use client";

import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import { logout } from "@/services/authentication";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type LogoutPageProps = {} & WithAuthProps;

const LogoutPage = (props: LogoutPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const execute = async () => {
      const _ = await logout();
      // router.push("/");
      // router.refresh();
    };

    execute();
  }, [router]);

  return <div>LogoutPage</div>;
};

export default WithAuth(LogoutPage);
