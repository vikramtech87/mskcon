import CenterSpinner from "@/components/center-spinner";
import Unauthorized from "@/components/unauthorized";
import { AuthState, useStore } from "@/store/useStore";
import React from "react";

export type WithAuthProps = {
  auth: AuthState;
};

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P & WithAuthProps>
): React.FC<P> => {
  const componentWithAuth = (props: P) => {
    const { authStore: auth, isAuthLoaded } = useStore();
    if (!isAuthLoaded()) {
      return <CenterSpinner />;
    }

    if (auth.authState === undefined) {
      return <Unauthorized />;
    }

    return <Component {...props} auth={auth.authState} />;
  };
  return componentWithAuth;
};

export default withAuth;
