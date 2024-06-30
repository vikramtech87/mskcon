"use client";

import CenterSpinner from "@/components/center-spinner";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WithGuest = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const OnlyGuest: React.FC<P> = (props) => {
    const { isLoaded: isAuthLoaded, authState } = useStore(
      (state) => state.authStore
    );
    const router = useRouter();
    useEffect(() => {
      if (isAuthLoaded && authState !== undefined) {
        router.push("/");
        router.refresh();
      }
    }, [isAuthLoaded, authState, router]);

    if (!isAuthLoaded) {
      return <CenterSpinner />;
    }

    if (isAuthLoaded && authState !== undefined) {
      return <CenterSpinner />;
    }

    return <Component {...props} />;
  };

  return OnlyGuest;
};

export default WithGuest;
