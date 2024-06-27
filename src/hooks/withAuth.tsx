import CenterSpinner from "@/components/center-spinner";
import Unauthorized from "@/components/unauthorized";
import { AuthState, useStore } from "@/store/useStore";
import React from "react";

export type WithAuthProps = {
  auth: AuthState;
};

const WithAuth = <P extends object>(
  Component: React.ComponentType<P & WithAuthProps>
): React.ComponentType<P> => {
  const ComponentWithAuth = (props: P) => {
    const { authStore: auth, isAuthLoaded } = useStore();
    if (!isAuthLoaded()) {
      return <CenterSpinner />;
    }

    if (auth.authState === undefined) {
      return <Unauthorized />;
    }

    return <Component {...(props as P)} auth={auth.authState!} />;
  };
  return ComponentWithAuth;
};

export default WithAuth;
