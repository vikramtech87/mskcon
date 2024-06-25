"use client";

import withAuth, { WithAuthProps } from "@/hooks/withAuth";
import { logout } from "@/services/authentication";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const execute = async () => {
      const _ = await logout();
      router.push("/");
      router.refresh();
    };

    execute();
  }, []);

  return <div>LogoutPage</div>;
};

export default withAuth(LogoutPage);
