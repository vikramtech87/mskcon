import CenterSpinner from "@/components/center-spinner";
import Unauthorized from "@/components/unauthorized";
import { useStore } from "@/store/useStore";

const WithGuest = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const OnlyGuest: React.FC<P> = (props) => {
    const { isAuthLoaded, isAuthenticated } = useStore();

    if (!isAuthLoaded()) {
      return <CenterSpinner />;
    }

    if (isAuthLoaded() && isAuthenticated()) {
      return <Unauthorized />;
    }

    return <Component {...props} />;
  };

  return OnlyGuest;
};

export default WithGuest;
