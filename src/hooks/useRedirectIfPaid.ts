import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectIfPaid = () => {
  const { isLoaded, transactionState } = useStore(
    (state) => state.transactionStore
  );

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const initiated = transactionState.filter(
      ({ transactionStatus }) => transactionStatus === "INITIATED"
    );

    if (initiated.length > 0) {
      const { transactionId, regsitrationNumber } = initiated[0];
      console.log("Redirecting to get payment status");

      router.push(
        `/payment/confirmation?regno=${regsitrationNumber}&transid=${transactionId}`
      );
      return;
    }

    const successful = transactionState.filter(
      ({ transactionStatus }) => transactionStatus === "SUCCESS"
    );

    if (successful.length > 0) {
      router.push("/registration/confirmation");
    }
  }, [router, isLoaded, transactionState]);

  return isLoaded;
};

export default useRedirectIfPaid;
