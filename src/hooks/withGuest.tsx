import CenterSpinner from "@/components/center-spinner";
import Unauthorized from "@/components/unauthorized";
import { useStore } from "@/store/useStore";

const withGuest = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const onlyGuest: React.FC<P> = (props) => {
    const { isAuthLoaded, isAuthenticated } = useStore();

    if (!isAuthLoaded()) {
      return <CenterSpinner />;
    }

    if (isAuthLoaded() && isAuthenticated()) {
      return <Unauthorized />;
    }

    return <Component {...props} />;
  };

  return onlyGuest;
};

export default withGuest;
