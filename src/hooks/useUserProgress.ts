import { UserProgress } from "@/lib/user-progress";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>("Loading");

  const { authStore, transactionStore } = useStore();
  const { isLoaded: isAuthLoaded, authState } = authStore;
  const { isLoaded: isTransactionLoaded, transactionState } = transactionStore;

  const isLoaded = isTransactionLoaded && isAuthLoaded;

  useEffect(() => {
    if (!isLoaded) {
      setProgress("Loading");
      return;
    }

    if (authState === undefined) {
      setProgress("Register");
      return;
    }

    const successfulTransactions = transactionState.filter(
      (t) => t.transactionStatus === "SUCCESS"
    );
    if (successfulTransactions.length > 0) {
      setProgress("Completed");
      return;
    }

    setProgress("Progress");
  }, [isLoaded, transactionState, authState, setProgress]);

  return progress;
};

export default useUserProgress;
