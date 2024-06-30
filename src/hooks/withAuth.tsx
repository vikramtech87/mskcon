"use client";

import CenterSpinner from "@/components/center-spinner";
import { AuthState, useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export type WithAuthProps = {
  auth: AuthState;
};

const WithAuth = <P extends object>(
  Component: React.ComponentType<P & WithAuthProps>,
  emailVerified: boolean = false
): React.ComponentType<P> => {
  const ComponentWithAuth = (props: P) => {
    const { isLoaded: isAuthLoaded, authState } = useStore(
      (state) => state.authStore
    );

    const router = useRouter();
    useEffect(() => {
      if (authState === undefined) {
        router.push("/");
        router.refresh();
        return;
      }

      if (emailVerified && !authState.authUser.emailVerified) {
        router.push("/");
        router.refresh();
        return;
      }
    }, [router, authState]);

    if (!isAuthLoaded) {
      return <CenterSpinner />;
    }

    if (authState === undefined) {
      return <CenterSpinner />;
    }

    if (emailVerified && !authState.authUser.emailVerified) {
      return <CenterSpinner />;
    }

    return <Component {...(props as P)} auth={authState!} />;
  };
  return ComponentWithAuth;
};

export default WithAuth;
